import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { getHebrewLanguageTogglePath, getHreflangRouteSet } from "../client/src/lib/seoRoutes";

const readSource = (relativePath: string) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

describe("Hebrew locale foundation", () => {
  it("maps reviewed Hebrew targets while keeping untranslated routes absent from hreflang", () => {
    expect(getHreflangRouteSet("/terms/")).toEqual({
      en: "/terms",
      el: "/el/terms",
      he: "/he/terms",
    });
    expect(getHreflangRouteSet("/services/custom-design/")).toEqual({
      en: "/services/custom-design",
      el: "/el/services/custom-design",
      he: "/he/services/custom-design",
    });
    expect(getHreflangRouteSet("/blog/google-search-console-ai-seo-prompts/")).toEqual({
      en: "/blog/google-search-console-ai-seo-prompts",
      el: null,
      he: null,
    });
    expect(getHebrewLanguageTogglePath("/terms/")).toBe("/he/terms");
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
    expect(router).toContain('<Route path="/he/terms" component={TermsHe} />');
    expect(router).toContain('<Route path="/he/services/custom-design" component={CustomDesignHe} />');
    expect(prerender).toContain('"/he"');
    expect(prerender).toContain('"/he/services"');
    expect(prerender).toContain('"/he/process"');
    expect(prerender).toContain('"/he/pricing"');
    expect(prerender).toContain('"/he/contact"');
    expect(prerender).toContain('"/he/faq"');
    expect(prerender).toContain('"/he/privacy"');
    expect(prerender).toContain('"/he/cookies"');
    expect(prerender).toContain('"/he/terms"');
    expect(prerender).toContain('"/he/services/custom-design"');
    expect(serverRoutes).toContain('"/he"');
    expect(serverRoutes).toContain('"/he/services"');
    expect(serverRoutes).toContain('"/he/process"');
    expect(serverRoutes).toContain('"/he/pricing"');
    expect(serverRoutes).toContain('"/he/contact"');
    expect(serverRoutes).toContain('"/he/faq"');
    expect(serverRoutes).toContain('"/he/privacy"');
    expect(serverRoutes).toContain('"/he/cookies"');
    expect(serverRoutes).toContain('"/he/terms"');
    expect(serverRoutes).toContain('"/he/services/custom-design"');
    expect(router).not.toMatch(/path="\/he\/services\/mobile-first/);
    expect(prerender).not.toMatch(/"\/he\/services\/mobile-first/);
    expect(serverRoutes).not.toMatch(/"\/he\/services\/mobile-first/);
    expect(router).not.toMatch(/path="\/he\/blog/);
    expect(prerender).not.toMatch(/"\/he\/blog/);
    expect(serverRoutes).not.toMatch(/"\/he\/blog/);
  });

  it("keeps Hebrew Terms complete, staged, and free of visibility-gating effects", () => {
    const terms = readSource("client/src/pages/he/TermsHe.tsx");

    expect(terms).toContain('canonicalPath: "/he/terms/"');
    expect(terms).toContain("noindex: true");
    expect(terms.match(/<h2\b/g)).toHaveLength(16);
    expect(terms.match(/<h3\b/g)).toHaveLength(3);
    expect(terms).toContain('href="/he/privacy/"');
    expect(terms).toContain('href="/he/cookies/"');
    expect(terms).not.toContain("AnimateIn");
  });

  it("keeps Hebrew custom design as a complete, staged RTL service counterpart", () => {
    const customDesign = readSource("client/src/pages/he/CustomDesignHe.tsx");

    expect(customDesign).toContain('canonicalPath: "/he/services/custom-design/"');
    expect(customDesign).toContain("noindex: true");
    expect(customDesign).toContain("עיצוב אתרים בהתאמה אישית");
    expect(customDesign).toContain("FAQPage");
    expect(customDesign).toContain('href="/he/contact/"');
    expect(customDesign).toContain('href="/he/pricing/"');
    expect(customDesign).toContain('dir="rtl"');
  });
});
