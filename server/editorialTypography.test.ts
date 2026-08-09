import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(serverDirectory, "..");
const homeSource = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const homeElSource = readFileSync(resolve(projectRoot, "client/src/pages/el/HomeEl.tsx"), "utf8");
const servicesSource = readFileSync(resolve(projectRoot, "client/src/pages/Services.tsx"), "utf8");
const fitLineSource = readFileSync(resolve(projectRoot, "client/src/components/EditorialFitLine.tsx"), "utf8");
const layoutSource = readFileSync(resolve(projectRoot, "client/src/components/Layout.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");
const htmlSource = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");

describe("English homepage editorial typography", () => {
  it("loads the approved production font ranges while preserving Inter for routes not yet migrated", () => {
    expect(htmlSource).toContain("family=Anybody:wdth,wght@80..132,750..800");
    expect(htmlSource).toContain("family=Commissioner:wght@150..650");
    expect(htmlSource).toContain("family=DM+Mono:wght@400");
    expect(htmlSource).toContain("family=Instrument+Serif:ital@1");
    expect(htmlSource).toContain("family=Inter:wght@400;500;600;700");
  });

  it("scopes Commissioner as the English base without affecting Greek or excluded location pages", () => {
    expect(stylesheet).toContain(".english-commissioner-base {");
    expect(stylesheet).toContain("--english-primary-sans: 'Commissioner', Inter");
    expect(stylesheet).toContain(".english-commissioner-base :where(");
    expect(layoutSource).toContain("const EXCLUDED_ENGLISH_LOCATION_ROUTES = new Set([");
    expect(layoutSource).toContain('const isStandalonePreview = normalizedLocation.startsWith("/preview/");');
    expect(layoutSource).toContain('const isEnglishTypographyRoute = !isGreek && !isStandalonePreview && !EXCLUDED_ENGLISH_LOCATION_ROUTES.has(normalizedLocation);');
    expect(layoutSource).toContain('isEnglishTypographyRoute ? "english-commissioner-base" : ""');
    expect(homeElSource).not.toContain("english-commissioner-base");
  });

  it("uses the fitted display treatment only on the English homepage", () => {
    expect(homeSource).toContain('className="editorial-home"');
    expect(homeSource).toContain("<EditorialFitLine");
    expect(homeSource).toContain("editorial-section-heading");
    expect(homeSource).toContain("editorial-price");
    expect(homeElSource).not.toContain("EditorialFitLine");
    expect(homeElSource).not.toContain("editorial-home");
  });

  it("keeps one correctly-cased semantic hero heading and hides the fitted fragments from assistive technology", () => {
    expect(homeSource).toContain('<h1 className="sr-only">Your business is great. Your website should make that obvious.</h1>');
    expect(homeSource).toContain('<div className="editorial-hero-fit" aria-hidden="true">');
    expect(homeSource).toContain('<em className="editorial-serif">obvious.</em>');
  });

  it("fits with Anybody's real width axis and refits for loaded fonts and container changes", () => {
    expect(fitLineSource).toContain("const WIDTH_MIN = 80;");
    expect(fitLineSource).toContain("const WIDTH_MAX = 132;");
    expect(fitLineSource).toContain("const DISPLAY_WEIGHT = 750;");
    expect(fitLineSource).toContain("fontVariationSettings");
    expect(fitLineSource).toContain("document.fonts?.ready.then(requestFit)");
    expect(fitLineSource).toContain("new ResizeObserver(requestFit)");
    expect(fitLineSource).not.toContain("scaleX");
  });

  it("contains editorial rules within the English homepage and raises light lead text on small screens", () => {
    expect(stylesheet).toContain(".editorial-home,\n.editorial-home-shell {");
    expect(stylesheet).toContain(".editorial-home .editorial-label");
    expect(stylesheet).toContain(".editorial-home .editorial-section-heading");
    expect(stylesheet).toContain(".editorial-home .editorial-price");
    expect(stylesheet).toContain("font-variation-settings: 'wdth' 108, 'wght' 760;");
    expect(stylesheet).toContain(".editorial-home-shell .editorial-home-nav-link");
    expect(stylesheet).toContain(".editorial-home-shell .editorial-home-language-toggle");
    expect(stylesheet).toContain("font-variation-settings: 'wdth' 104, 'wght' 750;");
    expect(stylesheet).toContain("font-weight: 150;");
    expect(stylesheet).toContain("font-weight: 300;");
    expect(stylesheet).toContain("@media (max-width: 767px)");
  });

  it("limits the shared header and navigation treatment to the English homepage route", () => {
    expect(layoutSource).toContain('const isEnglishHomepage = normalizedLocation === "/";');
    expect(layoutSource).toContain('isEnglishHomepage ? "editorial-home-shell" : ""');
    expect(layoutSource).toContain('isEnglishHomepage ? "editorial-home-header" : ""');
    expect(layoutSource).toContain('isEnglishHomepage ? "editorial-home-nav-link" : ""');
    expect(layoutSource).toContain('isEnglishHomepage ? "editorial-home-header-cta" : ""');
    expect(layoutSource).toContain('isEnglishHomepage ? "editorial-home-mobile-menu" : ""');
  });
});

describe("Services page editorial typography", () => {
  it("keeps the Services page as the only non-home route with the approved accent treatment", () => {
    expect(servicesSource).toContain('className="services-editorial"');
    expect(servicesSource).toContain('className="services-editorial-title');
    expect(servicesSource).toContain('className="services-editorial-heading');
    expect(servicesSource).toContain('className="services-editorial-label');
    expect(servicesSource).toContain('className="services-editorial-price');
    expect(servicesSource).toContain('className="services-editorial-serif');
  });

  it("scopes the Services display, mono label, serif emphasis, and mobile safeguards to that page", () => {
    expect(stylesheet).toContain(".services-editorial {");
    expect(stylesheet).toContain(".services-editorial .services-editorial-label");
    expect(stylesheet).toContain(".services-editorial .services-editorial-title");
    expect(stylesheet).toContain(".services-editorial .services-editorial-heading");
    expect(stylesheet).toContain(".services-editorial .services-editorial-serif");
    expect(stylesheet).toContain(".services-editorial .services-editorial-price");
    expect(stylesheet).toContain("@media (max-width: 767px) {");
  });

  it("does not alter the Services SEO metadata declaration", () => {
    expect(servicesSource).toContain('title: "Web Design Services Paphos & Cyprus | DM-Labs.io"');
    expect(servicesSource).toContain('description: "Custom website design in Paphos and across Cyprus. Launch, Growth and Pro website packages from €299, plus ongoing care."');
  });

  it("keeps package pricing readable and heading punctuation out of isolated wrap lines", () => {
    expect(servicesSource).toContain("services-editorial-package-card");
    expect(servicesSource).toContain('className="services-editorial-package-meta"');
    expect(servicesSource).toContain('className="services-editorial-package-copy');
    expect(servicesSource).toContain('className="services-editorial-heading-line"');
    expect(servicesSource).not.toContain('Need</em>, Nothing');
    expect(stylesheet).toContain(".services-editorial .services-editorial-package-meta .services-editorial-label");
    expect(stylesheet).toContain(".services-editorial .services-editorial-heading-line");
  });
});
