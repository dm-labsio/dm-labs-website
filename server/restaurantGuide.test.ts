import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { blogArticles } from "../client/src/components/blog/BlogIndex";
import { getHreflangRouteSet, isIndexableHebrewRoute } from "../client/src/lib/seoRoutes";
import { questionArticlePath } from "../client/src/lib/articleQuestions";
import { isKnownRoute } from "./_core/vite";
import { RESTAURANT_GUIDE_EN, RESTAURANT_GUIDE_EL, RESTAURANT_GUIDE_HE } from "../client/src/data/restaurantWebsiteGuide";

const editions = { en: RESTAURANT_GUIDE_EN, el: RESTAURANT_GUIDE_EL, he: RESTAURANT_GUIDE_HE };
const paths = { en: `/blog/${editions.en.slug}`, el: `/el/blog/${editions.el.slug}`, he: `/he/blog/${editions.he.slug}` };

describe("restaurant guide language and discovery integration", () => {
  it.each(["en", "el", "he"] as const)("serves and cross-links the complete %s edition", locale => {
    const post = editions[locale];
    expect(isKnownRoute(paths[locale])).toBe(true);
    expect(getHreflangRouteSet(paths[locale])).toEqual(paths);
    expect(questionArticlePath(paths[locale])).toBe(`${paths[locale]}/`);
    expect(blogArticles(locale)[0].href).toBe(`${paths[locale]}/`);
    expect(post.language).toBe(locale);
    expect(post.content).not.toContain("—");
    expect((post.content.match(/<h2\b/g) ?? []).length).toBeGreaterThanOrEqual(8);
    const ids = [...post.content.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    for (const [, anchor] of post.content.matchAll(/href="#([^"]+)"/g)) expect(ids).toContain(anchor);
    for (const src of [post.coverImage, post.heroImage!, ...[...post.content.matchAll(/src="([^"]+)"/g)].map(match => match[1])]) {
      expect(existsSync(resolve(import.meta.dirname, "../client/public", src.slice(1)))).toBe(true);
    }
    expect(post.imageAlt).toBeTruthy();
    expect(post.heroImageAlt).toBeTruthy();
    // Visible editorial Q&A is not marked as promotional FAQ rich-result bait.
    expect(post.faq).toBeUndefined();
  });
  it("makes Hebrew indexable without inventing a translation of the older restaurant article", () => {
    expect(isIndexableHebrewRoute(paths.he)).toBe(true);
    expect(getHreflangRouteSet("/blog/restaurant-website-design-cyprus/").he).toBeNull();
  });
});
