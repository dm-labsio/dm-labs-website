import { describe, expect, it } from "vitest";
import {
  getHreflangPair,
  normalizeRoutePath,
  withTrailingSlash,
} from "../client/src/lib/seoRoutes";

describe("SEO route mapping", () => {
  it("normalizes final canonical trailing-slash paths without retaining queries or fragments", () => {
    expect(normalizeRoutePath("/privacy/?source=footer#policy")).toBe("/privacy");
    expect(withTrailingSlash("/privacy")).toBe("/privacy/");
    expect(withTrailingSlash("/")).toBe("/");
  });

  it("maps the GEO English and Greek articles reciprocally", () => {
    expect(getHreflangPair("/blog/geo-get-found-by-chatgpt-cyprus/")).toEqual({
      en: "/blog/geo-get-found-by-chatgpt-cyprus",
      el: "/el/blog/geo-vrethite-apo-chatgpt-kypros",
    });
    expect(getHreflangPair("/el/blog/geo-vrethite-apo-chatgpt-kypros/")).toEqual({
      en: "/blog/geo-get-found-by-chatgpt-cyprus",
      el: "/el/blog/geo-vrethite-apo-chatgpt-kypros",
    });
  });

  it("maps the known Greek nail, privacy, and terms counterparts reciprocally", () => {
    expect(getHreflangPair("/el/blog/istoselidha-nail-salon-beauty-studio-kypros/")).toEqual({
      en: "/blog/web-design-nail-salon-beauty-studio-cyprus",
      el: "/el/blog/istoselidha-nail-salon-beauty-studio-kypros",
    });
    expect(getHreflangPair("/el/privacy/")).toEqual({ en: "/privacy", el: "/el/privacy" });
    expect(getHreflangPair("/el/terms/")).toEqual({ en: "/terms", el: "/el/terms" });
  });

  it("keeps intentionally English-only articles self-referencing", () => {
    expect(getHreflangPair("/blog/google-search-console-ai-seo-prompts/")).toEqual({
      en: "/blog/google-search-console-ai-seo-prompts",
      el: null,
    });
    expect(getHreflangPair("/web-design-paphos/")).toEqual({ en: "/web-design-paphos", el: null });
  });
});
