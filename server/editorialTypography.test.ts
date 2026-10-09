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

describe("Services and process metadata", () => {
  it("retains Services metadata and keeps Process timing project-specific", () => {
    expect(servicesSource).toContain('title: "Web Design Services for Business Growth | DM Labs"');
    expect(servicesSource).toContain('Custom design, fast development, SEO foundations and ongoing care.');
    expect(processSource).toContain('title: "Our Process | How We Build Websites | DM-Labs.io"');
    expect(processSource).toContain('with a schedule agreed around your project');
  });
});

describe("Pricing metadata", () => {
  it("preserves Pricing SEO metadata", () => {
    expect(pricingSource).toContain('title: "Web Design Pricing | Website Cost & Packages | DM-Labs.io"');
    expect(pricingSource).toContain('description: "How much does a website cost? Explore clear web design pricing');
  });
});

describe("Our Work typography and metadata", () => {
  const page = readFileSync(join(projectRoot, "client/src/components/work/OurWorkPage.tsx"), "utf8");
  const gallery = readFileSync(join(projectRoot, "client/src/components/work/WorkGallery.tsx"), "utf8");
  const workStyles = readFileSync(join(projectRoot, "client/src/components/work/our-work.css"), "utf8");
  it("shares the brand type roles without gradient text or fixed price claims", () => {
    expect(page).toContain('<h1>{copy.title}</h1>');
    expect(page).toContain('className="brand-micro"');
    expect(workStyles).not.toContain("WebkitTextFillColor");
    expect(workStyles).toContain("var(--font-body)");
    expect(page).not.toContain("€299");
  });
  it("preserves the index canonical and direct preview destinations", () => {
    expect(templatesSource).toContain('title: "Our Work | Website Demos | DM-Labs.io"');
    expect(templatesSource).toContain('canonicalPath: "/templates/"');
    expect(gallery).toContain('href={`/preview/${project.id}/`}');
    expect(page).not.toContain("TemplateModal");
  });
});

describe("Blog index metadata", () => {
  it("preserves the existing search metadata while sharing the compact index", () => {
    expect(blogSource).toContain('title: "Blog | Web Design Tips & Guides | DM-Labs.io"');
    expect(blogSource).toContain('description: "Practical guides, honest advice, and web design insights for businesses worldwide."');
    expect(blogSource).toContain('<BlogIndex locale="en"');
  });
});
