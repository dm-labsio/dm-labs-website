import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { getHebrewLanguageTogglePath, getHreflangRouteSet } from "../client/src/lib/seoRoutes";

const readSource = (relativePath: string) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

describe("Hebrew locale foundation", () => {
  it("keeps Hebrew absent from hreflang until a real translated target is mapped", () => {
    expect(getHreflangRouteSet("/terms/")).toEqual({
      en: "/terms",
      el: "/el/terms",
      he: null,
    });
    expect(getHreflangRouteSet("/blog/google-search-console-ai-seo-prompts/")).toEqual({
      en: "/blog/google-search-console-ai-seo-prompts",
      el: null,
      he: null,
    });
    expect(getHebrewLanguageTogglePath("/terms/")).toBe("/he");
  });

  it("prepares Hebrew document language, RTL direction, and a Hebrew-native font", () => {
    const context = readSource("client/src/contexts/LanguageContext.tsx");
    const shell = readSource("client/index.html");
    const styles = readSource("client/src/index.css");

    expect(context).toContain('type Lang = "en" | "el" | "he"');
    expect(context).toContain('document.documentElement.dir = lang === "he" ? "rtl" : "ltr"');
    expect(shell).toContain("family=Heebo");
    expect(styles).toContain('html[dir="rtl"] body');
  });

  it("extends browser hreflang output without changing incomplete-route behavior", () => {
    const seoHook = readSource("client/src/hooks/useSEO.ts");

    expect(seoHook).toContain('hreflang: "he"');
    expect(seoHook).toContain('hreflang: "he-IL"');
    expect(seoHook).toContain("getHreflangRouteSet(cleanPath)");
    expect(seoHook).toContain("routes.he ?");
  });

  it("exposes only the reviewed Hebrew homepage and no invented child routes", () => {
    const router = readSource("client/src/App.tsx");
    const prerender = readSource("scripts/prerender-full.mjs");
    const serverRoutes = readSource("server/_core/vite.ts");

    expect(router).toContain('<Route path="/he" component={HomeHe} />');
    expect(prerender).toContain('"/he"');
    expect(serverRoutes).toContain('"/he"');
    expect(router).not.toMatch(/path="\/he\/(?:services|process|pricing|faq|contact|blog|terms|privacy|cookies)/);
    expect(prerender).not.toMatch(/"\/he\/(?:services|process|pricing|faq|contact|blog|terms|privacy|cookies)/);
    expect(serverRoutes).not.toMatch(/"\/he\/(?:services|process|pricing|faq|contact|blog|terms|privacy|cookies)/);
  });
});
