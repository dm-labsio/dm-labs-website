import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const read = (relativePath: string) => readFileSync(resolve(root, relativePath), "utf8");

const indexHtml = read("client/index.html");
const previewPage = read("client/src/pages/PreviewPage.tsx");
const viteServer = read("server/_core/vite.ts");
const vercelConfig = read("vercel.json");
const home = read("client/src/pages/Home.tsx");
const blogPost = read("client/src/pages/BlogPost.tsx");
const serviceDetail = read("client/src/pages/ServiceDetail.tsx");
const seoHook = read("client/src/hooks/useSEO.ts");
const homePage = read("client/src/pages/Home.tsx");
const templates = read("client/src/pages/Templates.tsx");
const prerender = read("scripts/prerender-full.mjs");
const staticPreviews = [
  "arcos-architecture",
  "horizon-law",
  "little-stars-nursery",
  "luxe-realty",
  "olio-deli",
].map(name => read(`client/public/previews/${name}.html`));

describe("SEO integrity", () => {
  it("keeps preview mock-ups discoverable by visitors but non-indexable without canonical or hreflang signals", () => {
    expect(previewPage).toContain('robots.content = "noindex, follow"');
    expect(previewPage).toContain("document.querySelector('link[rel=\"canonical\"]')?.remove()");
    expect(previewPage).toContain("link[rel=\"alternate\"][hreflang]");
    expect(viteServer).toContain("function previewNoindexHtml");
    expect(viteServer).toContain('urlPath.startsWith("/preview/")');
    expect(vercelConfig).toContain('"source": "/preview/(.*)"');
    expect(vercelConfig).toContain('"source": "/previews/(.*)"');
    expect(vercelConfig).toContain('"value": "noindex, follow"');
    for (const html of staticPreviews) {
      expect(html).toContain('name="robots" content="noindex, nofollow"');
      expect(html).not.toContain('rel="canonical"');
      expect(html).not.toContain('name="keywords"');
    }
  });

  it("removes harmful viewport locking and obsolete keywords metadata", () => {
    expect(indexHtml).not.toContain("maximum-scale");
    expect(indexHtml).not.toContain('name="keywords"');
  });

  it("uses only authorized service, founder, FAQ, article, and breadcrumb markup without review markup", () => {
    expect(home).toContain('"@type": "ProfessionalService"');
    expect(home).toContain('"name": "Anastacia B."');
    expect(home).toContain('"name": "Tom B."');
    expect(home).toContain('"name": "Greece"');
    expect(blogPost).toContain('"@type": "BlogPosting"');
    expect(blogPost).toContain('"@type": "Person"');
    expect(serviceDetail).toContain('"@type": "Service"');
    expect(serviceDetail).toContain('"@type": "FAQPage"');
    expect(seoHook).toContain('"@type": "BreadcrumbList"');
    for (const source of [home, blogPost, serviceDetail, seoHook]) {
      expect(source).not.toContain('"@type": "Review"');
      expect(source).not.toContain('"@type": "AggregateRating"');
      expect(source).not.toContain('"reviewRating"');
    }
  });

  it("keeps emitted preview links on their final slash-safe route while preserving the explicit legacy redirect map", () => {
    expect(homePage).toContain('href={`/preview/${tpl.id}/?from=%2F`}');
    expect(templates).toContain('href={`/preview/${template.id}/`}');
    expect(viteServer).toContain('"/examples": "/templates/"');
    expect(viteServer).toContain('"/cookie-policy": "/cookies/"');
  });

  it("keeps all 69 prerenders independent of persistent analytics network activity", () => {
    expect(prerender).toContain('waitUntil: "domcontentloaded"');
    expect(prerender).toContain("Vercel Analytics intentionally keeps a request open");
    expect(prerender).not.toContain('waitUntil: "networkidle"');
    expect(prerender).toContain("return root.children.length > 0;");
  });
});
