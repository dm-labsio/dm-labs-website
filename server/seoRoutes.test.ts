import { describe, expect, it } from "vitest";
import {
  getGreekLanguageTogglePath,
  getHreflangPair,
  getHreflangRouteSet,
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

  it("uses Greek Cyprus only as a visitor toggle fallback for missing location translations", () => {
    expect(getHreflangPair("/web-design-restaurants-cyprus/")).toEqual({
      en: "/web-design-restaurants-cyprus",
      el: null,
    });
    expect(getGreekLanguageTogglePath("/web-design-paphos/")).toBe("/el/web-design-cyprus");
    expect(getGreekLanguageTogglePath("/web-design-restaurants-cyprus/")).toBe("/el/web-design-cyprus");
    expect(getGreekLanguageTogglePath("/blog/google-search-console-ai-seo-prompts/")).toBe("/el");
  });

  it("emits Hebrew alternates only for completed mapped routes and never for current blog routes", () => {
    expect(getHreflangRouteSet("/pricing/")).toEqual({
      en: "/pricing",
      el: "/el/pricing",
      he: "/he/pricing",
    });
    expect(getHreflangRouteSet("/he/services/social/")).toEqual({
      en: "/services/social",
      el: "/el/services/social",
      he: "/he/services/social",
    });
    expect(getHreflangRouteSet("/blog/website-cost-cyprus-2026-guide/")).toEqual({
      en: "/blog/website-cost-cyprus-2026-guide",
      el: "/el/blog/posso-kostizei-istoselidha-kypros",
      he: null,
    });
  });
});
