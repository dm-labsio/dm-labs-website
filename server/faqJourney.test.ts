import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import FAQPage from "../client/src/components/faq/FAQPage";
import { FAQ_CONTENT, FAQ_TOPICS, faqRoute, faqSchema } from "../client/src/components/faq/faqContent";
import { getHreflangRouteSet } from "../client/src/lib/seoRoutes";

const ids = FAQ_TOPICS.flatMap(topic => [...topic.questions]);
describe("multilingual FAQ journey", () => {
  it("keeps every existing question topic in one equivalent locale inventory", () => {
    expect(new Set(ids).size).toBe(22);
    for (const locale of ["en", "el", "he"] as const) {
      expect(Object.keys(FAQ_CONTENT[locale]).sort()).toEqual([...ids].sort());
      for (const item of Object.values(FAQ_CONTENT[locale])) {
        expect(item.q.trim().length).toBeGreaterThan(5);
        expect(item.a.trim().length).toBeGreaterThan(40);
        if (item.link) {
          const path = faqRoute(locale, item.link.path);
          expect(getHreflangRouteSet(path)[locale]).toBe(path.slice(0, -1));
        }
      }
    }
  });
  it.each(["en", "el", "he"] as const)("keeps the displayed answers and search metadata identical in %s", locale => {
    const schema = faqSchema(locale);
    expect(schema.inLanguage).toBe(locale);
    expect(schema.mainEntity).toHaveLength(22);
    schema.mainEntity.forEach((item, index) => {
      expect(item.name).toBe(FAQ_CONTENT[locale][ids[index]].q);
      expect(item.acceptedAnswer.text).toBe(FAQ_CONTENT[locale][ids[index]].a);
    });
  });
  it.each(["en", "el", "he"] as const)("renders native disclosures, working topic anchors and locale links in %s", locale => {
    const html = renderToStaticMarkup(React.createElement(FAQPage, { locale }));
    expect(html.match(/<details\b/g)).toHaveLength(22);
    expect(html.match(/<summary>/g)).toHaveLength(22);
    expect(html.match(/ open=""/g)).toHaveLength(1);
    for (const topic of FAQ_TOPICS) {
      expect(html).toContain(`href="#${topic.id}"`);
      expect(html).toContain(`id="${topic.id}" tabindex="-1"`);
    }
    expect(html).toContain(`href="${faqRoute(locale, "contact")}"`);
    expect(html).toContain(`href="${faqRoute(locale, "pricing")}"`);
    expect(html).toContain(`lang="${locale}" dir="${locale === "he" ? "rtl" : "ltr"}"`);
    expect(html).toContain('<bdi lang="en" dir="ltr">€1,499</bdi>');
    expect(html).not.toContain('max-height:600');
  });
  it("preserves package and care amounts in every locale without the retired Greek claims", () => {
    for (const locale of ["en", "el", "he"] as const) {
      for (const price of ["€299", "€749", "€1,499", "€69"]) expect(FAQ_CONTENT[locale].price.a).toContain(price);
      for (const price of ["€69", "€129"]) expect(FAQ_CONTENT[locale]["care-plans"].a).toContain(price);
      expect(FAQ_CONTENT[locale].cancel.a).toContain("30");
    }
    const greek = JSON.stringify(FAQ_CONTENT.el);
    for (const retired of ["€10-15", "Χωρίς συμβόλαια", "Πληρώνετε μόνο τη διαφορά", "δωρεάν για τον πρώτο μήνα"]) expect(greek).not.toContain(retired);
  });
});
