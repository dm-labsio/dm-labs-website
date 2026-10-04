import React from "react";
import { Router } from "wouter";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import BlogIndex, { blogArticles, filterArticles } from "../client/src/components/blog/BlogIndex";
import { POSTS } from "../client/src/data/blogPosts";
import { POSTS_EL } from "../client/src/data/blogPostsEl";
import { POSTS_HE } from "../client/src/data/blogPostsHe";

const escape = (value: string) => renderToStaticMarkup(React.createElement(React.Fragment, null, value));
describe("Compact multilingual blog index", () => {
  it.each(["en", "el", "he"] as const)("preserves every %s article and its localized destination", locale => {
    const articles = blogArticles(locale);
    const source = locale === "en" ? POSTS : locale === "el" ? POSTS_EL : POSTS_HE;
    const html = renderToStaticMarkup(React.createElement(Router, { ssrPath: locale === "en" ? "/blog/" : "/el/blog/", children: React.createElement(BlogIndex, { locale }) }));
    expect(articles).toHaveLength(source.length);
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html.match(/<article\b/g)).toHaveLength(source.length);
    for (const post of articles) {
      expect(html).toContain(`href="${post.href}"`);
      expect(html).toContain(escape(post.title));
      expect(html).toContain(escape(post.coverImage));
    }
    expect(html).toContain('type="search"');
    expect(html).toContain('aria-controls="blog-articles"');
    expect(html).toContain(`href="${locale === "en" ? "" : `/${locale}`}/contact/"`);
    expect(html).not.toMatch(/<video|opacity:0|—/);
  });
  it.each([["en", "2026-10-04"], ["el", "2026-10-04"], ["he", "2026-10-04"]] as const)("shows the latest %s publication first without changing the source data", (locale, latestDate) => {
    const source = locale === "en" ? POSTS : locale === "el" ? POSTS_EL : POSTS_HE;
    const originalOrder = source.map(post => post.slug);
    const articles = blogArticles(locale);
    expect(articles[0].date).toBe(latestDate);
    expect(articles.every((post, index) => index === 0 || post.date <= articles[index - 1].date)).toBe(true);
    expect(source.map(post => post.slug)).toEqual(originalOrder);
    const filtered = filterArticles(articles, "SEO");
    expect(filtered.every((post, index) => index === 0 || post.date <= filtered[index - 1].date)).toBe(true);
  });
  it("supports Greek searches without accents and searches across title, topic and excerpt", () => {
    const greek = blogArticles("el");
    expect(filterArticles(greek, "ΙΣΤΟΣΕΛΙΔΑ")).toEqual(filterArticles(greek, "ιστοσελίδα"));
    expect(filterArticles(greek, "ΙΣΤΟΣΕΛΙΔΑ").length).toBeGreaterThan(0);
    const english = blogArticles("en");
    expect(filterArticles(english, "   ")).toEqual(english);
    expect(filterArticles(english, "not-a-real-topic-xyz")).toEqual([]);
    const multi = filterArticles(english, "SEO Google");
    expect(multi.length).toBeGreaterThan(0);
    expect(multi.every(article => /seo/i.test(`${article.title} ${article.category} ${article.excerpt}`) && /google/i.test(`${article.title} ${article.category} ${article.excerpt}`))).toBe(true);
  });
});
