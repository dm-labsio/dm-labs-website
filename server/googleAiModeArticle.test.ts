import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getPostBySlug } from "../client/src/data/blogPosts";
import { getHreflangPair } from "../client/src/lib/seoRoutes";

const ROOT = resolve(import.meta.dirname, "..");
const ARTICLE_SLUG = "google-ai-mode-near-me-cyprus";

describe("Google AI Mode Cyprus article", () => {
  it("keeps the requested indexable English-only article data, CTA, citations, and FAQ schema source", () => {
    const post = getPostBySlug(ARTICLE_SLUG);

    expect(post).toMatchObject({
      slug: ARTICLE_SLUG,
      metaTitle: 'Google AI Answers "Near Me" Searches in Cyprus (2026)',
      date: "2026-09-12",
      dateModified: "2026-09-12",
      category: "SEO & GEO",
      author: "DM-Labs.io",
      authorType: "Organization",
      language: "en",
    });
    expect(post?.content).toContain("checked <strong>12 September 2026 / at the time of writing</strong>");
    expect(post?.content).toContain("PPC Land");
    expect(post?.content).toContain("every business-data value in this example must be replaced");
    expect(post?.content).toContain("Request an AI Answer Check");
    expect(post?.content).not.toMatch(/free AI Answer Check|free, no commitment|no sales call/i);
    expect(post?.content).toContain("Greek-language AI Mode went live in Greece on <strong>8 October 2025</strong>");
    expect(post?.content).toContain("published in <strong>July 2025</strong> and covering <strong>May 2024 to May 2025</strong>");
    expect(post?.content).toContain("ChatGPT builds its answer from mentions.");
    expect(post?.content).toContain("If you can't select it with your cursor, assume Google can't use it.");
    expect(post?.faq).toHaveLength(6);
  });

  it("registers the new route as English-only in SEO, prerendering, and the sitemap", () => {
    expect(getHreflangPair(`/blog/${ARTICLE_SLUG}/`)).toEqual({
      en: `/blog/${ARTICLE_SLUG}`,
      el: null,
    });

    const sitemap = readFileSync(resolve(ROOT, "client/public/sitemap.xml"), "utf8");
    const prerender = readFileSync(resolve(ROOT, "scripts/prerender-full.mjs"), "utf8");
    const vercel = readFileSync(resolve(ROOT, "vercel.json"), "utf8");
    expect(sitemap).toContain(`https://dm-labs.io/blog/${ARTICLE_SLUG}/`);
    expect(sitemap).toContain(`hreflang="x-default" href="https://dm-labs.io/blog/${ARTICLE_SLUG}/"`);
    expect(sitemap).not.toMatch(/\/previews?\//i);
    expect(prerender).toContain(`"${ARTICLE_SLUG}"`);
    expect(vercel).toContain('"source": "/preview/(.*)"');
    expect(vercel).toContain('"key": "X-Robots-Tag"');
    expect(vercel).toContain('"value": "noindex, follow"');
  });

  it("creates the reciprocal internal link from the existing GEO article", () => {
    const geoPost = getPostBySlug("geo-get-found-by-chatgpt-cyprus");
    expect(geoPost?.content).toContain(`/blog/${ARTICLE_SLUG}/`);
  });
});
