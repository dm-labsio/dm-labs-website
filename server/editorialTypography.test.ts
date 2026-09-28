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
const blogSource = readFileSync(join(projectRoot, "client/src/pages/Blog.tsx"), "utf8");
const layoutSource = readFileSync(resolve(projectRoot, "client/src/components/Layout.tsx"), "utf8");
const brandStyles = readFileSync(resolve(projectRoot, "client/src/styles/typography.css"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");
const htmlSource = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");

describe("Brand typography migration", () => {
  it("uses one visible semantic homepage heading with natural wrapping", () => {
    expect(homeSource).toContain('<HomeHero language="en" />');
    const hero = readFileSync(resolve(projectRoot, "client/src/components/home/HomeHero.tsx"), "utf8");
    expect(hero).toContain('<h1 id="home-hero-heading"');
    expect(hero).not.toContain('className="sr-only"');
    expect(homeSource).not.toContain("EditorialFitLine");
    expect(homeSource).not.toContain('className="sr-only"');
    expect(processSource).not.toContain("EditorialFitLine");
  });
  it("applies the same typography scope to every marketing route", () => {
    expect(layoutSource).toContain('data-brand="dm-labs"');
    expect(layoutSource).not.toContain("EXCLUDED_ENGLISH_LOCATION_ROUTES");
    expect(layoutSource).not.toContain("english-commissioner-base");
    expect(stylesheet).toContain('@import "./styles/typography.css"');
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
    expect(brandStyles).toContain(".services-editorial-label");
    expect(stylesheet).toContain(".services-editorial .services-editorial-title");
    expect(stylesheet).toContain(".services-editorial .services-editorial-heading");
    expect(stylesheet).toContain(".services-editorial .services-editorial-serif");
    expect(brandStyles).toContain(".services-editorial-price");
    expect(stylesheet).toContain("@media (max-width: 767px) {");
  });

  it("uses the approved business-growth Services metadata", () => {
    expect(servicesSource).toContain('title: "Web Design Services for Business Growth | DM Labs"');
    expect(servicesSource).toContain('description: "Custom design, fast development, SEO foundations and ongoing care. Websites built to earn trust and help your business win more enquiries."');
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
    expect(servicesSource).toContain('services-editorial-care-price text-[#111315] mb-4">€69');
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
  });
});

describe("Process page editorial typography", () => {
  it("keeps the approved editorial treatment scoped to the Process page", () => {
    expect(processSource).toContain('className="process-editorial"');
    expect(processSource).toContain('className="process-editorial-hero-heading"');
    expect(stylesheet).toContain(".process-editorial .process-editorial-hero-heading");
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
  });

  it("preserves Process SEO metadata", () => {
    expect(processSource).toContain('title: "Our Process | How We Build Websites | DM-Labs.io"');
    expect(processSource).toContain('description: "From discovery call to launch in 5-14 days. See exactly how DM-Labs.io designs and builds your website, step by step."');
  });
});

describe("Pricing metadata", () => {
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
    expect(brandStyles).toContain("[data-brand] footer h4");
    expect(stylesheet).not.toContain(".preview-editorial");
  });

  it("uses the semantic display and label roles without hero gradient text", () => {
    expect(templatesSource).toContain("templates-editorial-label");
    expect(templatesSource).toContain("templates-editorial-title");
    expect(templatesSource).toContain("website <em>style</em>");
    expect(templatesSource).toContain("templates-editorial-cta-heading");
    expect(templatesSource).not.toContain("WebkitTextFillColor");
    expect(stylesheet).toContain('.templates-editorial .templates-editorial-label');
    expect(stylesheet).toContain(".templates-editorial .templates-editorial-title");
    expect(brandStyles).toContain("[data-brand] :is(h1, h2, h3, h4, h5, h6) :is(em, strong, span, a)");
  });

  it("keeps card surroundings readable and avoids standalone decorative dash copy", () => {
    expect(templatesSource).toContain("templates-editorial-card-note");
    expect(templatesSource).toContain("Design inspiration");
    expect(templatesSource).toContain("Built around your brand");
    expect(templatesSource).not.toContain("Design inspiration - pricing from €299");
    expect(templatesSource).not.toContain("Pricing from €299 - quote on request");
    expect(templatesSource).toContain("templates-editorial-custom-title");
    expect(templatesSource).toContain("templates-editorial-custom-copy");
    expect(templatesSource).toContain("templates-editorial-cta-button");
  });

  it("preserves the Examples index metadata and its existing preview links", () => {
    expect(templatesSource).toContain('title: "Website Examples | See Our Work | DM-Labs.io"');
    expect(templatesSource).toContain('canonicalPath: "/templates/"');
    expect(templatesSource).toContain('href={`/preview/${template.id}/`}');
  });
});

describe("Blog index editorial typography", () => {
  it("keeps the editorial layer isolated to the English Blog index for straightforward future replacement", () => {
    expect(blogSource).toContain('className="blog-editorial"');
    expect(blogSource).toContain("blog-editorial-title");
    expect(blogSource).toContain("blog-editorial-card");
    expect(blogSource).toContain("blog-editorial-cta-heading");
    expect(stylesheet).toContain("BLOG INDEX — MODULAR EDITORIAL LAYER");
    expect(stylesheet).toContain("This scope is deliberately isolated for replacement by the future Blog redesign.");
    expect(stylesheet).toContain(".blog-editorial {");
    expect(stylesheet).toContain(".blog-editorial .blog-editorial-card");
    expect(stylesheet).toContain(".blog-editorial .blog-editorial-cta-heading");
  });

  it("uses the approved semantic display and label roles without hero gradient text", () => {
    expect(blogSource).toContain("Resources and insights");
    expect(blogSource).toContain("The DM-Labs.io");
    expect(blogSource).toContain("<em>Blog</em>");
    expect(blogSource).not.toContain("brand-gradient-text");
    expect(stylesheet).toContain(".blog-editorial .blog-editorial-label");
    expect(brandStyles).toContain("overflow-wrap: break-word");
  });

  it("preserves post data, article destinations, images, and the existing contact CTA route", () => {
    expect(blogSource).toContain('import { POSTS } from "@/data/blogPosts"');
    expect(blogSource).toContain("POSTS.map((post, i) =>");
    expect(blogSource).toContain("href={`/blog/${post.slug}/`}");
    expect(blogSource).toContain("src={post.coverImage}");
    expect(blogSource).toContain("alt={post.title}");
    expect(blogSource).toContain('href="/contact/"');
  });

  it("preserves the Blog index metadata and removes the orphan-prone visual meta separator", () => {
    expect(blogSource).toContain('title: "Blog | Web Design Tips & Guides | DM-Labs.io"');
    expect(blogSource).toContain('description: "Practical guides, honest advice, and web design insights for businesses worldwide."');
    expect(blogSource).not.toContain('<span>·</span>');
  });
});
