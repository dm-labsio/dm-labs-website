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

  it("prepares Hebrew document language, RTL direction, and a Hebrew-native font", () => {
    const context = readSource("client/src/contexts/LanguageContext.tsx");
    const shell = readSource("client/index.html");
    const styles = readSource("client/src/index.css");

    expect(context).toContain('type Lang = "en" | "el" | "he"');
    expect(context).toContain('document.documentElement.dir = lang === "he" ? "rtl" : "ltr"');
    expect(shell).toContain("family=Heebo");
    expect(styles).toContain('html[dir="rtl"] body');
  });

  it("keeps the approved Hebrew type hierarchy scoped to RTL routes", () => {
    const shell = readSource("client/index.html");
    const styles = readSource("client/src/index.css");

    expect(shell).toContain("family=Google+Sans");
    expect(shell).toContain("family=Heebo:wght@100..900");
    expect(shell).toContain("family=Huninn");
    expect(styles).toContain('--hebrew-body-font: "Google Sans", "Heebo"');
    expect(styles).toContain('--hebrew-display-font: "Heebo"');
    expect(styles).toContain('--hebrew-accent-font: "Huninn"');
    expect(styles).toContain('html[dir="rtl"] .editorial-home-shell');
    expect(styles).toContain('--pricing-sans: var(--hebrew-body-font)');
    expect(styles).toContain('--pricing-display: var(--hebrew-display-font)');
    expect(styles).toContain('--faq-display: var(--hebrew-display-font)');
    expect(styles).toContain('.hebrew-home :not(.hebrew-template-preview-mockup):not(.hebrew-template-preview-mockup *)');
    expect(styles).toContain('.hebrew-home :is(h1, h2, h3, h4, h5, h6, .font-bold, .font-extrabold, [class*="heading"], [class*="title"], [class*="price"])');
    expect(styles).toContain('html[dir="rtl"] .font-mono');
    expect(styles).toContain('html[dir="rtl"] h1');
    expect(styles).toContain('font-weight: 900');
    expect(styles).toContain('HEBREW HOMEPAGE TOKEN SYSTEM');
    expect(styles).toContain('--hebrew-token-lead-size: 18px');
    expect(styles).toContain('--hebrew-token-body-size: 14px');
    expect(styles).toContain('font-size: 42.9px !important;');
    expect(styles).toContain('font-size: 30px !important;');
    expect(styles).toContain('font-size: 36px !important;');
    expect(styles).toContain('font-weight: 700 !important;');
    expect(styles).not.toContain("-webkit-text-stroke");
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
    expect(cookieBanner).toContain('document.querySelector<HTMLElement>(".hero-scrub-scope--hebrew")');
    expect(cookieBanner).toContain('hero.dataset.released === "true"');
    expect(cookieBanner).toContain('let revealTimer = 0');
    expect(cookieBanner).toContain('hero.dataset.released === "true"');
    expect(cookieBanner).toContain('window.setTimeout(() => setVisible(true), 650)');
    expect(cookieBanner).toContain('if (window.matchMedia("(max-width: 767px)").matches)');
    expect(cookieBanner).toContain('const timer = window.setTimeout(() => setVisible(true), 1200);');
    expect(cookieBanner).toContain('setVisible(false);');
    expect(cookieBanner).toContain('window.addEventListener("scroll", revealAfterHero, { passive: true })');
    expect(cookieBanner).toContain('window.requestAnimationFrame(revealAfterHero)');
    expect(cookieBanner).toContain('flex items-center justify-center');
  });

  it("keeps the Hebrew pricing and header treatments visually contained", () => {
    const pricing = readSource("client/src/pages/he/PricingHe.tsx");
    const layout = readSource("client/src/components/Layout.tsx");
    const styles = readSource("client/src/index.css");

    expect(pricing).toContain('className="pricing-editorial-price-row"');
    expect(pricing).toContain('className="pricing-editorial-price-unit"');
    expect(pricing).not.toContain('<small> one-time</small>');
    expect(styles).toContain('overflow-wrap: anywhere;');
    expect(styles).toContain('.faq-editorial .faq-editorial-title em { white-space: normal; }');
    expect(styles).toContain('background: #f6f6f4;');
    expect(layout).toContain('border-[#E2E5EA] bg-[#F6F6F4] shadow-sm');
  });

  it("keeps Hebrew within the shared static-mobile Hero contract while preserving desktop media and language isolation", () => {
    const scrub = readSource("client/src/components/HomeHeroScrub.tsx");
    const home = readSource("client/src/pages/he/HomeHe.tsx");
    const cards = readSource("client/src/components/InteractiveExampleCard.tsx");
    const canvasSequence = readSource("client/src/components/HebrewMobileCanvasSequence.tsx");
    const styles = readSource("client/src/index.css");
    const layout = readSource("client/src/components/Layout.tsx");

    expect(home).toContain('<HomeHeroScrub variant="hebrew">');
    expect(scrub).toContain('variant?: "default" | "hebrew"');
    expect(scrub).toContain('const isStaticMobile = isMobileViewport && scope.dataset.mobileHero === "static";');
    expect(cards).toContain('interactive-example-card');
    expect(styles).toContain('html[dir="rtl"] .hero-scrub-scope--hebrew');
    expect(styles).toContain('html[dir="rtl"] .hero-scrub-scope--hebrew :is(.hero-scrub-poster, .hero-scrub-video)');
    expect(styles).toContain('html[dir="rtl"] .hebrew-home .interactive-example-card img');
    expect(scrub).toContain('data-mobile-hero="static"');
    expect(scrub).toContain('scope.dataset.video = "none";');
    expect(scrub).toContain('<source media="(min-width: 768px)" src={HERO_SCRUB_VIDEO_URL} type="video/mp4" />');
    expect(canvasSequence).toContain('scope.dataset.mobileHero === "static"');
    expect(canvasSequence).not.toContain('scope.dataset.released = "true"');
    expect(styles).toContain('html.js .hero-scrub-scope[data-mobile-hero="static"] .hero-scrub-copy');
    expect(scrub).toContain('<HebrewMobileCanvasSequence />');
    expect(styles).toContain('.hero-scrub-canvas');
    expect(layout).toContain('src="/media/icons/israel-flag-icon.webp"');
    expect(layout).toContain('width="20"');
    expect(layout).toContain('height="20"');
    expect(styles).toContain('html[dir="rtl"] .hero-scrub-scope--hebrew[data-mobile-hero="static"] .hero-scrub-poster');
    expect(styles).toContain('html[dir="rtl"] .hero-scrub-scope--hebrew[data-mobile-hero="static"] .hero-scrub-wash');
    expect(scrub).toContain('HEBREW_STATIC_MOBILE_HERO_ART_URL');
    expect(scrub).toContain('className="hero-scrub-hebrew-static-art"');
    expect(styles).toContain('hero-scrub-scope--hebrew[data-mobile-hero="static"] .hero-scrub-hebrew-static-art');
  });

  it("keeps the Hebrew pricing comparison and consent persistence aligned with shared behavior", () => {
    const pricing = readSource("client/src/pages/he/PricingHe.tsx");
    const cookieBanner = readSource("client/src/components/CookieBanner.tsx");

    expect(pricing).toContain('className="border-b border-[#E8EAF0]"');
    expect(pricing).toContain('bg-[#8B5CFF]/[0.03]');
    expect(pricing).toContain('<PlanCell value={row[1]} colour="#5B8CFF" />');
    expect(pricing).toContain('pricing-editorial-custom-grid');
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

    expect(layout).toContain("const isEnglish = !isGreek && !isHebrew;");
    expect(layout).toContain('aria-current={language.isActive ? "true" : undefined}');
    expect(layout).toContain("languageSwitchScrollRef");
    expect(layout).toContain("targetLang === \"el\" ? routes.el !== null : routes.he !== null");
    expect(layout).toContain("navigateLanguage(language.target, language.href)");
  });

  it("keeps the Hebrew Contact form structurally aligned with the shared contact contract", () => {
    const contact = readSource("client/src/pages/he/ContactHe.tsx");

    expect(contact).toContain('canonicalPath: "/he/contact/"');
    expect(contact).toContain("WEB3FORMS_URL");
    expect(contact).toContain("contact-editorial-form-card");
    expect(contact).toContain("contact-editorial-field-label");
    expect(contact).toContain("contact-editorial-submit");
    expect(contact).toContain('id="contact-he-email"');
    expect(contact).toContain('dir="ltr"');
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

  it("keeps Hebrew mobile-first as a complete, staged RTL service counterpart", () => {
    const mobileFirst = readSource("client/src/pages/he/MobileFirstHe.tsx");

    expect(mobileFirst).toContain('canonicalPath: "/he/services/mobile-first/"');
    expect(mobileFirst).toContain("noindex: true");
    expect(mobileFirst).toContain("פיתוח עם מובייל");
    expect(mobileFirst).toContain("פיתוח אתרים בגישת Mobile-First");
    expect(mobileFirst).toContain("FAQPage");
    expect(mobileFirst).toContain('href="/he/contact/"');
    expect(mobileFirst).toContain('href="/he/pricing/"');
    expect(mobileFirst).toContain('dir="rtl"');
  });

  it("keeps Hebrew SEO as a complete, staged RTL service counterpart", () => {
    const seo = readSource("client/src/pages/he/SeoHe.tsx");
    expect(seo).toContain('canonicalPath: "/he/services/seo/"');
    expect(seo).toContain("noindex: true");
    expect(seo).toContain("אופטימיזציית SEO");
    expect(seo).toContain("FAQPage");
    expect(seo).toContain('href="/he/contact/"');
    expect(seo).toContain('href="/he/pricing/"');
    expect(seo).toContain('dir="rtl"');
  });
});
