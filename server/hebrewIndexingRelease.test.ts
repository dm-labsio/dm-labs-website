import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = join(import.meta.dirname, "..");
const readSource = (relativePath: string) => readFileSync(join(projectRoot, relativePath), "utf8");

const hebrewRoutes = [
  "/he/",
  "/he/services/",
  "/he/process/",
  "/he/pricing/",
  "/he/contact/",
  "/he/faq/",
  "/he/templates/",
  "/he/privacy/",
  "/he/cookies/",
  "/he/terms/",
  "/he/services/custom-design/",
  "/he/services/mobile-first/",
  "/he/services/seo/",
  "/he/services/performance/",
  "/he/services/security/",
  "/he/services/turnaround/",
  "/he/services/maps/",
  "/he/services/forms/",
  "/he/services/social/",
];

describe("Hebrew indexing release", () => {
  it("allows completed Hebrew routes to override retired staging noindex flags", () => {
    const seoRoutes = readSource("client/src/lib/seoRoutes.ts");
    const seoHook = readSource("client/src/hooks/useSEO.ts");

    expect(seoRoutes).toContain("INDEXABLE_HEBREW_PATHS");
    expect(seoHook).toContain("isIndexableHebrewRoute(cleanPath) ? false : noindex");
  });

  it("lists precisely the 19 completed Hebrew canonical URLs, with no Hebrew blog entries", () => {
    const sitemap = readSource("client/public/sitemap.xml");
    const foundHebrewLocs = sitemap.match(/<loc>https:\/\/dm-labs\.io\/he\/[\s\S]*?<\/loc>/g) ?? [];

    expect(foundHebrewLocs).toHaveLength(19);
    for (const path of hebrewRoutes) {
      expect(sitemap).toContain(`<loc>https://dm-labs.io${path}</loc>`);
      expect(sitemap).toContain(`hreflang="he" href="https://dm-labs.io${path}"`);
      expect(sitemap).toContain(`hreflang="he-IL" href="https://dm-labs.io${path}"`);
    }
    expect(sitemap).not.toContain("https://dm-labs.io/he/blog/");
  });
});
