import { describe, expect, it } from "vitest";
import { brandProjects } from "../client/src/components/work/brandingData";
import {
  brandAssetAlt,
  brandImages,
  brandCaseSchema,
  brandPath,
  workCollectionSchema,
} from "../client/src/components/work/brandMetadata";
import { getHreflangRouteSet } from "../client/src/lib/seoRoutes";
import { createImageSitemap } from "../scripts/image-sitemap.mjs";
import { existsSync } from "node:fs";
import { join } from "node:path";

describe("Crawlable portfolio", () => {
  it.each(["en", "el", "he"] as const)(
    "describes every brand image and uses real language targets: %s",
    locale => {
      for (const brand of brandProjects) {
        for (const name of [
          brand.cover,
          brand.detail,
          "symbol",
          ...brand.stack,
          ...brand.images.map(([name]) => name),
        ])
          expect(brandAssetAlt(brand.id, name, locale).length).toBeGreaterThan(
            brand.name.length + 5
          );
        for (const image of brandImages(brand, locale)) {
          expect(
            existsSync(
              join(
                import.meta.dirname,
                "../client/public",
                new URL(image.contentUrl).pathname
              )
            )
          ).toBe(true);
          expect(image.width).toBeGreaterThan(0);
          expect(image.height).toBeGreaterThan(0);
        }
        const schema = brandCaseSchema(brand, locale);
        expect(schema.genre).toBe("Brand identity concept");
        expect(schema.inLanguage).toBe(locale);
        const routes = getHreflangRouteSet(brandPath(brand.id, locale));
        for (const language of ["en", "el", "he"] as const)
          expect(routes[language] + "/").toBe(brandPath(brand.id, language));
      }
      const items = workCollectionSchema(locale).itemListElement;
      expect(
        items.filter(({ item }) => item["@type"] === "CreativeWork")
      ).toHaveLength(12);
      expect(
        items.filter(({ item }) => item["@type"] === "VideoObject")
      ).toHaveLength(8);
    }
  );
  it("generates image sitemaps from actual canonical content and escapes XML", () => {
    const xml = createImageSitemap([
      {
        url: "https://dm-labs.io/templates/",
        contentImages: [
          {
            src: "/media/example.webp?a=1&b=2",
            alt: "Example",
            variants: ["/media/example-small.webp"],
          },
          { src: "/media/example-small.webp", alt: "Example", variants: [] },
          {
            src: "https://unverified.example/image.jpg",
            alt: "External",
            variants: [],
          },
        ],
      },
    ]);
    expect(xml).toContain("?a=1&amp;b=2");
    expect(xml.match(/<image:image>/g)).toHaveLength(2);
    expect(xml).not.toContain("unverified.example");
    expect(xml).not.toContain("image:caption"); // deprecated Google sitemap field
  });
});
