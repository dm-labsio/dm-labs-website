import { describe, expect, it } from "vitest";
import { absoluteImageUrl, ORGANIZATION_ID, pageSchema, serviceSchemaData } from "../client/src/lib/structuredData";
import { POSTS } from "../client/src/data/blogPosts";
import { validateSeoCollection } from "../scripts/seo-document-audit.mjs";

describe("structured content and SEO release checks", () => {
  it("resolves local images to production URLs without changing remote image parameters", () => {
    expect(absoluteImageUrl("/media/article.webp")).toBe("https://dm-labs.io/media/article.webp");
    expect(absoluteImageUrl("https://images.unsplash.com/photo?q=80&w=1200")).toBe("https://images.unsplash.com/photo?q=80&w=1200");
  });

  it.each(["en", "el", "he"] as const)("links %s pages to one studio and only offers visible packages on package pages", locale => {
    const prefix = locale === "en" ? "" : `/${locale}`;
    const args = ["Title", "Description", locale, "/cover.png", "Cover"] as const;
    const graph = pageSchema(`https://dm-labs.io${prefix}/pricing/`, ...args)["@graph"];
    const organization = graph[0];
    expect(organization["@id"]).toBe(ORGANIZATION_ID);
    expect(organization.hasOfferCatalog?.itemListElement.map(item => item.price)).toEqual([299, 749, 1499]);
    expect(organization).not.toHaveProperty("address");
    expect(graph[2]).toMatchObject({ url: `https://dm-labs.io${prefix}/pricing/`, inLanguage: locale });
    expect(pageSchema(`https://dm-labs.io${prefix}/privacy/`, ...args)["@graph"][0]).not.toHaveProperty("hasOfferCatalog");
    expect(pageSchema(`https://dm-labs.io${prefix}/services/`, ...args)["@graph"][0]).not.toHaveProperty("hasOfferCatalog");
  });

  it("describes a regional service without inventing a city office, and preserves its actual FAQ text", () => {
    const graph = serviceSchemaData("https://dm-labs.io/el/web-design-nicosia/", "el", "Σχεδιασμός", "Περιγραφή", [{ q: "Ερώτηση;", a: "Απάντηση." }])["@graph"];
    expect(graph[0]).toMatchObject({ "@type": "Service", provider: { "@id": ORGANIZATION_ID } });
    expect(graph[0]).not.toHaveProperty("address");
    expect(graph[1]).toMatchObject({ "@type": "FAQPage", inLanguage: "el", mainEntity: [{ name: "Ερώτηση;", acceptedAnswer: { text: "Απάντηση." } }] });
  });

  it("renders every article FAQ from the same answers used by its schema", () => {
    for (const post of POSTS.filter(post => post.faq?.length)) {
      expect(post.content).not.toContain("<!-- article-faq -->");
      for (const faq of post.faq!) {
        expect(post.content).toContain(`<h3>${faq.question}</h3>`);
        expect(post.content).toContain(`<p>${faq.answer}</p>`);
      }
    }
  });

  it("rejects missing translations, duplicate metadata and sitemap gaps", () => {
    const en = "https://dm-labs.io/";
    const el = "https://dm-labs.io/el/";
    const base = { title: "A", description: "A description", errors: [], alternates: [["en", en], ["el", el]] };
    const pages = [{ ...base, url: en }, { ...base, url: el, title: "B", description: "B description" }];
    expect(validateSeoCollection(pages, [en, el])).toEqual([]);
    expect(validateSeoCollection([pages[0]], [en, el]).join(" ")).toMatch(/Missing hreflang destination.*Sitemap URL not prerendered/);
    expect(validateSeoCollection([pages[0], { ...pages[1], title: "A" }], [en, el]).join(" ")).toContain("Duplicate title");
    expect(validateSeoCollection(pages, [en]).join(" ")).toContain("Missing sitemap URL");
  });
});
