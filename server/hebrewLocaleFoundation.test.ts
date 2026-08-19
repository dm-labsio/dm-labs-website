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

  it("exposes only reviewed Hebrew routes and no invented child routes", () => {
    const router = readSource("client/src/App.tsx");
    const prerender = readSource("scripts/prerender-full.mjs");
    const serverRoutes = readSource("server/_core/vite.ts");

    expect(router).toContain('<Route path="/he" component={HomeHe} />');
    expect(router).toContain('<Route path="/he/services" component={ServicesHe} />');
    expect(router).toContain('<Route path="/he/process" component={ProcessHe} />');
    expect(router).toContain('<Route path="/he/pricing" component={PricingHe} />');
    expect(router).toContain('<Route path="/he/contact" component={ContactHe} />');
    expect(router).toContain('<Route path="/he/faq" component={FAQHe} />');
    expect(router).toContain('<Route path="/he/privacy" component={PrivacyHe} />');
    expect(router).toContain('<Route path="/he/cookies" component={CookiePolicyHe} />');
    expect(prerender).toContain('"/he"');
    expect(prerender).toContain('"/he/services"');
    expect(prerender).toContain('"/he/process"');
    expect(prerender).toContain('"/he/pricing"');
    expect(prerender).toContain('"/he/contact"');
    expect(prerender).toContain('"/he/faq"');
    expect(prerender).toContain('"/he/privacy"');
    expect(prerender).toContain('"/he/cookies"');
    expect(serverRoutes).toContain('"/he"');
    expect(serverRoutes).toContain('"/he/services"');
    expect(serverRoutes).toContain('"/he/process"');
    expect(serverRoutes).toContain('"/he/pricing"');
    expect(serverRoutes).toContain('"/he/contact"');
    expect(serverRoutes).toContain('"/he/faq"');
    expect(serverRoutes).toContain('"/he/privacy"');
    expect(serverRoutes).toContain('"/he/cookies"');
    expect(router).not.toMatch(/path="\/he\/(?:blog|terms)/);
    expect(prerender).not.toMatch(/"\/he\/(?:blog|terms)/);
    expect(serverRoutes).not.toMatch(/"\/he\/(?:blog|terms)/);
  });
});
