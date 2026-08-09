import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(serverDirectory, "..");
const homeSource = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const homeElSource = readFileSync(resolve(projectRoot, "client/src/pages/el/HomeEl.tsx"), "utf8");
const servicesSource = readFileSync(join(projectRoot, "client/src/pages/Services.tsx"), "utf8");
const processSource = readFileSync(join(projectRoot, "client/src/pages/Process.tsx"), "utf8");
const pricingSource = readFileSync(join(projectRoot, "client/src/pages/Pricing.tsx"), "utf8");
const templatesSource = readFileSync(join(projectRoot, "client/src/pages/Templates.tsx"), "utf8");
const faqSource = readFileSync(join(projectRoot, "client/src/pages/FAQ.tsx"), "utf8");
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

  it("keeps care-plan pricing within its two plan cards and removes inaccurate cancellation claims", () => {
    expect(servicesSource).toContain('className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8"');
    expect(servicesSource).toContain('services-editorial-care-price text-[#111315] mb-4">€49');
    expect(servicesSource).toContain('services-editorial-care-price text-[#111315] mb-4">€129');
    expect(servicesSource).not.toContain("Cancel anytime");
    expect(servicesSource).not.toContain("No contracts");
    expect(servicesSource).not.toContain("No commitments");
    expect(servicesSource).not.toContain('className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"');
    expect(servicesSource).toContain('className="max-w-4xl mx-auto"');
    expect(stylesheet).toContain(".services-editorial .services-editorial-care-price");
  });

  it("keeps the care heading free of a redundant price line or orphan-prone decorative dash", () => {
    expect(servicesSource).toContain('Website <em className="services-editorial-serif">Care</em> Plans');
    expect(servicesSource).not.toContain("from €49/mo");
    expect(servicesSource).not.toContain("Plans - <span");
    expect(stylesheet).toContain("Wrap rule: do not use decorative dashes, commas, or standalone");
  });
});

describe("Process page editorial typography", () => {
  it("keeps the approved editorial treatment scoped to the Process page", () => {
    expect(processSource).toContain('className="process-editorial"');
    expect(processSource).toContain('import EditorialFitLine from "@/components/EditorialFitLine"');
    expect(processSource).toContain('className="process-editorial-hero-heading"');
    expect(stylesheet).toContain(".process-editorial .process-editorial-hero-heading");
    expect(stylesheet).toContain("PROCESS PAGE EDITORIAL TYPOGRAPHY — PAGE 2 OF ROLLOUT");
  });

  it("uses authored display structure and reduced-motion-safe motion for the process journey", () => {
    expect(processSource).toContain("From Idea to");
    expect(processSource).toContain('className="process-editorial-hero-heading-emphasis"');
    expect(processSource).toContain('className="process-editorial-rail');
    expect(processSource).toContain('style={{ zIndex: 0 }}');
    expect(processSource).not.toContain("as quickly as possible - without");
    expect(processSource).not.toContain('Plans - <span');
    expect(stylesheet).toContain("@media (prefers-reduced-motion: no-preference)");
    expect(stylesheet).toContain("@media (prefers-reduced-motion: reduce)");
    expect(stylesheet).toContain("process-editorial-rail-flow");
    expect(stylesheet).toContain(".process-editorial .process-editorial-step-list");
    expect(stylesheet).toContain("font-family: var(--process-serif) !important;");
  });

  it("preserves Process SEO metadata", () => {
    expect(processSource).toContain('title: "Our Process | How We Build Websites | DM-Labs.io"');
    expect(processSource).toContain('description: "From discovery call to launch in 5-14 days. See exactly how DM-Labs.io designs and builds your website, step by step."');
  });
});

describe("Pricing page editorial typography", () => {
  it("keeps the approved editorial treatment scoped to the Pricing page", () => {
    expect(pricingSource).toContain('className="pricing-editorial"');
    expect(pricingSource).toContain('className="pricing-editorial-hero-heading"');
    expect(pricingSource).toContain("pricing-editorial-plan-card");
    expect(stylesheet).toContain(".pricing-editorial .pricing-editorial-hero-heading");
    expect(stylesheet).toContain(".pricing-editorial .pricing-editorial-plan-card");
  });

  it("keeps pricing readable and removes outdated care cancellation claims", () => {
    expect(pricingSource).toContain('className="pricing-editorial-plan-price"');
    expect(pricingSource).toContain('className="pricing-editorial-care-price"');
    expect(pricingSource).toContain('className="pricing-editorial-custom-grid');
    expect(pricingSource).not.toContain("pricing-editorial-custom-divider");
    expect(pricingSource).not.toContain("Cancel anytime, no contract");
    expect(pricingSource).not.toContain("brand-gradient-text");
    expect(pricingSource).not.toContain("Packages from €299");
  });

  it("preserves Pricing SEO metadata", () => {
    expect(pricingSource).toContain('title: "Web Design Pricing | Website Cost & Packages | DM-Labs.io"');
    expect(pricingSource).toContain('description: "How much does a website cost? Explore clear web design pricing');
  });
});

describe("Examples index editorial typography", () => {
  it("limits the accent treatment to the /templates/ catalogue and its route-scoped shared footer", () => {
    expect(templatesSource).toContain('className="min-h-screen templates-editorial"');
    expect(layoutSource).toContain('const isStandalonePreview = normalizedLocation.startsWith("/preview/");');
    expect(layoutSource).toContain('const isTemplatesIndex = normalizedLocation === "/templates";');
    expect(layoutSource).toContain('isTemplatesIndex ? "templates-editorial-shell" : ""');
    expect(stylesheet).toContain(".templates-editorial {");
    expect(stylesheet).toContain(".templates-editorial-shell footer h4");
    expect(stylesheet).not.toContain(".preview-editorial");
  });

  it("uses the approved display, mono-label, and serif-accent roles without hero gradient text", () => {
    expect(templatesSource).toContain("templates-editorial-label");
    expect(templatesSource).toContain("templates-editorial-title");
    expect(templatesSource).toContain("website <em>style</em>");
    expect(templatesSource).toContain("templates-editorial-cta-heading");
    expect(templatesSource).not.toContain("WebkitTextFillColor");
    expect(stylesheet).toContain('.templates-editorial .templates-editorial-label');
    expect(stylesheet).toContain('font-family: "DM Mono", monospace;');
    expect(stylesheet).toContain(".templates-editorial .templates-editorial-title");
    expect(stylesheet).toContain(".templates-editorial .templates-editorial-title em");
  });

  it("keeps card surroundings readable and avoids standalone decorative dash copy", () => {
    expect(templatesSource).toContain("templates-editorial-card-note");
    expect(templatesSource).toContain("Design inspiration");
    expect(templatesSource).toContain("Pricing from €299");
    expect(templatesSource).not.toContain("Design inspiration - pricing from €299");
    expect(templatesSource).not.toContain("Pricing from €299 - quote on request");
    expect(templatesSource).toContain("templates-editorial-custom-title");
    expect(templatesSource).toContain("templates-editorial-custom-copy");
    expect(templatesSource).toContain("templates-editorial-cta-button");
  });

  it("preserves the Examples index metadata and its existing preview links", () => {
    expect(templatesSource).toContain('title: "Website Examples | See Our Work | DM-Labs.io"');
    expect(templatesSource).toContain('canonicalPath: "/templates"');
    expect(templatesSource).toContain('href={`/preview/${template.id}`}');
  });
});

describe("FAQ page editorial typography", () => {
  it("scopes the approved editorial treatment to the English FAQ page", () => {
    expect(faqSource).toContain('className="faq-editorial"');
    expect(faqSource).toContain("faq-editorial-title");
    expect(faqSource).toContain("faq-editorial-label");
    expect(faqSource).toContain("faq-editorial-question-copy");
    expect(faqSource).toContain("faq-editorial-cta-heading");
    expect(stylesheet).toContain(".faq-editorial {");
    expect(stylesheet).toContain(".faq-editorial .faq-editorial-title");
    expect(stylesheet).toContain(".faq-editorial .faq-editorial-question-copy");
    expect(stylesheet).toContain(".faq-editorial .faq-editorial-cta-heading");
  });

  it("uses the display, mono-label, and restrained serif roles without gradient headline text", () => {
    expect(faqSource).toContain("Frequently asked");
    expect(faqSource).toContain("<em>questions</em>");
    expect(faqSource).not.toContain("brand-gradient-text");
    expect(stylesheet).toContain('.faq-editorial .faq-editorial-label');
    expect(stylesheet).toContain(".faq-editorial .faq-editorial-title em");
    expect(stylesheet).toContain("font-family: var(--faq-display);");
  });

  it("preserves accordion interaction and removes inaccurate no-contract cancellation copy", () => {
    expect(faqSource).toContain("onClick={() => setOpen(!open)}");
    expect(faqSource).toContain("aria-expanded={open}");
    expect(faqSource).toContain('style={{ maxHeight: open ? "600px" : "0", opacity: open ? 1 : 0 }}');
    expect(faqSource).toContain("Can I change or cancel a care plan?");
    expect(faqSource).not.toContain("have no contract and can be cancelled anytime");
    expect(faqSource).not.toContain("Cancel anytime");
  });

  it("preserves the existing FAQ metadata and FAQPage structured-data generation", () => {
    expect(faqSource).toContain('title: "Website Design FAQ | DM-Labs.io"');
    expect(faqSource).toContain('description: "Answers to common questions about DM-Labs.io website packages, pricing, SEO foundations, website care, and project scope."');
    expect(faqSource).toContain('"@type": "FAQPage"');
    expect(faqSource).toContain('"@type": "Question"');
    expect(faqSource).toContain('"@type": "Answer"');
  });
});
