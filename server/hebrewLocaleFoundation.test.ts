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
    expect(getHreflangRouteSet("/services/mobile-first/")).toEqual({
      en: "/services/mobile-first",
      el: "/el/services/mobile-first",
      he: "/he/services/mobile-first",
    });
    expect(getHreflangRouteSet("/services/seo/")).toEqual({ en: "/services/seo", el: "/el/services/seo", he: "/he/services/seo" });
    expect(getHreflangRouteSet("/blog/google-search-console-ai-seo-prompts/")).toEqual({
      en: "/blog/google-search-console-ai-seo-prompts",
      el: null,
      he: null,
    });
    expect(getHebrewLanguageTogglePath("/terms/")).toBe("/he/terms");
    expect(getHebrewLanguageTogglePath("/blog/")).toBe("/he");
    expect(getHebrewLanguageTogglePath("/el/blog/")).toBe("/he");
  });

  it("uses route-derived language and the shared brand roles for Hebrew", () => {
    const context = readSource("client/src/contexts/LanguageContext.tsx");
    const styles = readSource("client/src/styles/typography.css");
    expect(context).toContain("const lang = getRouteLanguage(location)");
    expect(context).toContain('document.documentElement.dir = lang === "he" ? "rtl" : "ltr"');
    expect(styles).toContain(':lang(he)');
    expect(styles).toContain('--font-display: "Rubik"');
    expect(styles).toContain('--font-micro: "Open Sans"');
    expect(styles).toContain('--hero-tracking: 0');
    expect(styles).not.toContain("!important");
  });

  it("keeps Hebrew cookie consent compact at the side, with a simple mobile-entry delay", () => {
    const cookieBanner = readSource("client/src/components/CookieBanner.tsx");

    expect(cookieBanner).toContain('acceptAll: "אני מאשר/ת"');
    expect(cookieBanner).toContain('reject: "לא, תודה"');
    expect(cookieBanner).toContain('manage: "הגדרות"');
    expect(cookieBanner).toContain('cookieHref: "/he/cookies/"');
    expect(cookieBanner).toContain('privacyHref: "/he/privacy/"');
    expect(cookieBanner).toContain('w-[min(11.5rem,calc(100vw-1.5rem))]');
    expect(cookieBanner).toContain('left-3 right-auto text-right sm:bottom-5 sm:w-[min(16rem,calc(100vw-2rem))]');
    expect(cookieBanner).toContain('const timer = window.setTimeout(() => setVisible(true), 1200);');
    expect(cookieBanner).not.toContain('requestAnimationFrame');
    expect(cookieBanner).not.toContain('hero.dataset');
    expect(cookieBanner).toContain('flex items-center justify-center');
  });

  it("keeps the Hebrew pricing and header treatments visually contained", () => {
    const pricing = readSource("client/src/pages/he/PricingHe.tsx");
    const layout = readSource("client/src/components/Layout.tsx");
    const styles = readSource("client/src/index.css");

    const journey = readSource("client/src/components/pricing/PricingPage.tsx");
    expect(pricing).toContain('<PricingPage key="he" locale="he"');
    expect(journey).toContain('className="pricing-editorial-price-row"');
    expect(journey).toContain('className="pricing-price-unit"');
    expect(pricing).not.toContain('<small> one-time</small>');
    expect(readSource("client/src/styles/typography.css")).toContain('overflow-wrap: break-word');
    expect(layout).toContain('<SiteHeader location={location}');
  });

  it("uses the shared immediate Hebrew hero without changing example artwork or flag geometry", () => {
    const home = readSource("client/src/pages/he/HomeHe.tsx");
    const styles = readSource("client/src/index.css");
    const header = readSource("client/src/components/SiteHeader.tsx");
    expect(home).toContain('<HomeHero language="he" />');
    expect(styles).toContain('html[dir="rtl"] .hebrew-home .interactive-example-card img');
    expect(header).toContain('src="/media/icons/israel-flag-icon.webp"');
    expect(header).toContain('width="20"');
    expect(header).toContain('height="20"');
  });

  it("keeps the Hebrew pricing comparison and consent persistence aligned with shared behavior", () => {
    const pricing = readSource("client/src/pages/he/PricingHe.tsx");
    const cookieBanner = readSource("client/src/components/CookieBanner.tsx");

    expect(pricing).toContain('<PricingPage key="he" locale="he"');
    const sharedPricing = readSource("client/src/components/pricing/PricingPage.tsx");
    expect(sharedPricing).toContain('<th scope="row">');
    expect(sharedPricing).toContain('t.included : t.excluded');
    expect(cookieBanner).toContain('const COOKIE_KEY = "dm_cookie_consent"');
    expect(cookieBanner).toContain('const stored = localStorage.getItem(COOKIE_KEY)');
  });

  it("extends browser hreflang output without changing incomplete-route behavior", () => {
    const seoHook = readSource("client/src/hooks/useSEO.ts");

    expect(seoHook).toContain('hreflang: "he"');
    expect(seoHook).toContain('hreflang: "he-IL"');
    expect(seoHook).toContain("getHreflangRouteSet(cleanPath)");
    expect(seoHook).toContain("routes.he ?");
  });

  it("keeps the active language state exclusive and preserves reading position only for direct translations", () => {
    const layout = readSource("client/src/components/Layout.tsx");

    const header = readSource("client/src/components/SiteHeader.tsx");
    expect(header).toContain('aria-current={language === option.target ? "true" : undefined}');
    expect(layout).toContain("languageSwitchScrollRef");
    expect(layout).toContain("targetLang === \"el\" ? routes.el !== null : routes.he !== null");
    expect(header).toContain("onLanguageNavigate(option.target, getLanguageHref(option.target))");
  });

  it("keeps the Hebrew Contact form structurally aligned with the shared contact contract", () => {
    const contact = readSource("client/src/pages/he/ContactHe.tsx");

    expect(contact).toContain('canonicalPath: "/he/contact/"');
    expect(contact).toContain('<ContactPage locale="he" />');
    expect(contact).toContain("noindex: true");
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
    expect(router).toContain('<Route path="/he/services/mobile-first" component={MobileFirstHe} />');
    expect(router).toContain('<Route path="/he/services/seo" component={SeoHe} />');
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
    expect(prerender).toContain('"/he/services/mobile-first"');
    expect(prerender).toContain('"/he/services/seo"');
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
    expect(serverRoutes).toContain('"/he/services/mobile-first"');
    expect(serverRoutes).toContain('"/he/services/seo"');
    expect(router).toContain('<Route path="/he/services/performance" component={PerformanceHe} />');
    expect(prerender).toContain('"/he/services/performance"');
    expect(serverRoutes).toContain('"/he/services/performance"');
    expect(router).toContain('<Route path="/he/services/security" component={SecurityHe} />');
    expect(prerender).toContain('"/he/services/security"');
    expect(serverRoutes).toContain('"/he/services/security"');
    expect(router).toContain('<Route path="/he/services/turnaround" component={TurnaroundHe} />');
    expect(prerender).toContain('"/he/services/turnaround"');
    expect(serverRoutes).toContain('"/he/services/turnaround"');
    expect(router).toContain('<Route path="/he/services/maps" component={MapsHe} />');
    expect(prerender).toContain('"/he/services/maps"');
    expect(serverRoutes).toContain('"/he/services/maps"');
    expect(router).toContain('<Route path="/he/services/forms" component={FormsHe} />');
    expect(prerender).toContain('"/he/services/forms"');
    expect(serverRoutes).toContain('"/he/services/forms"');
    expect(router).toContain('<Route path="/he/services/social" component={SocialHe} />');
    expect(prerender).toContain('"/he/services/social"');
    expect(serverRoutes).toContain('"/he/services/social"');
    expect(router).not.toContain('path="/he/blog"');
    expect(prerender).not.toContain('"/he/blog"');
    expect(serverRoutes).not.toContain('"/he/blog"');
  });

  it("keeps Hebrew Terms complete, indexable, and free of visibility-gating effects", () => {
    const terms = readSource("client/src/pages/he/TermsHe.tsx");
    const seoRoutes = readSource("client/src/lib/seoRoutes.ts");

    expect(terms).toContain('canonicalPath: "/he/terms/"');
    expect(seoRoutes).toContain('"/terms": "/he/terms"');
    expect(terms.match(/<h2\b/g)).toHaveLength(16);
    expect(terms.match(/<h3\b/g)).toHaveLength(3);
    expect(terms).toContain('href="/he/privacy/"');
    expect(terms).toContain('href="/he/cookies/"');
    expect(terms).not.toContain("AnimateIn");
  });

  it("routes Hebrew custom design and mobile-first to shared localized service pages", () => {
    const seoRoutes = readSource("client/src/lib/seoRoutes.ts");
    for (const [name, id] of [["CustomDesignHe", "custom-design"], ["MobileFirstHe", "mobile-first"]]) {
      expect(readSource(`client/src/pages/he/${name}.tsx`)).toContain(`locale="he" serviceId="${id}"`);
      expect(seoRoutes).toContain(`"/services/${id}": "/he/services/${id}"`);
    }
  });

  it("keeps Hebrew SEO as a complete, indexable RTL service counterpart", () => {
    const seo = readSource("client/src/pages/he/SeoHe.tsx");
    const seoRoutes = readSource("client/src/lib/seoRoutes.ts");
    expect(seo).toContain('canonicalPath: "/he/services/seo/"');
    expect(seoRoutes).toContain('"/services/seo": "/he/services/seo"');
    expect(seo).toContain("אופטימיזציית SEO");
    expect(seo).toContain("FAQPage");
    expect(seo).toContain('href="/he/contact/"');
    expect(seo).toContain('href="/he/pricing/"');
    expect(seo).toContain('dir="rtl"');
  });
});
