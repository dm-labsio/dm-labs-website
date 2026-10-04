import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getPostBySlug } from "../client/src/data/blogPosts";
import { POSTS_EL } from "../client/src/data/blogPostsEl";
import { getHreflangRouteSet } from "../client/src/lib/seoRoutes";

const root = resolve(import.meta.dirname, "..");
const slug = "doctor-website-design-orthopaedics-case-study";
const post = getPostBySlug(slug)!;

describe("Dr George orthopaedic website case study", () => {
  it("preserves the requested title, metadata, factual client context, and consultation CTA", () => {
    expect(post).toMatchObject({
      title: "What Makes a Specialist Doctor’s Website Easier to Use?",
      metaTitle: "Doctor Website Design: A Case Study in Orthopaedics",
      metaDescription: "See how Dr George Konstantinidis’s website organizes specialist services, clinic locations, patient information, and booking details in three languages.",
      language: "en", authorType: "Organization", date: "2026-10-04",
    });
    expect(post.content).toContain("consultant orthopaedic surgeon in Cyprus");
    expect(post.content).toContain("Limassol, Paphos, and Nicosia");
    expect(post.content).toContain("English, Greek, and Russian");
    expect(post.content).toContain('href="/contact/"');
    expect(post.content).not.toMatch(/utm_source|guaranteed|\d+%/i);
    for (const path of ["/specialties", "/about", "/patient-info", "/locations"]) {
      expect(post.content).toContain(`https://dr-george-orthopaedics.com${path}`);
    }
  });

  it("registers only the English route until QA approval", () => {
    expect(getHreflangRouteSet(`/blog/${slug}/`)).toEqual({en: `/blog/${slug}`, el: null, he: null});
    expect(POSTS_EL.some(p => p.slug === slug)).toBe(false);
    for (const file of ["scripts/prerender-full.mjs", "scripts/prerender-meta.mjs", "client/public/sitemap.xml"]) {
      expect(readFileSync(resolve(root, file), "utf8")).toContain(slug);
    }
    const sitemap = readFileSync(resolve(root, "client/public/sitemap.xml"), "utf8");
    expect(sitemap).not.toContain(`/el/blog/${slug}`);
    expect(sitemap).not.toContain(`/he/blog/${slug}`);
  });

  it("ships real local captures and an accessible, on-demand walkthrough without autoplay", () => {
    const images = [...post.content.matchAll(/<img\b[^>]+>/g)].map(m => m[0]);
    expect(images).toHaveLength(5);
    for (const image of images) {
      expect(image).toMatch(/alt="[^"]+"/);
      expect(image).toContain('loading="lazy"');
      expect(image).toMatch(/width="\d+" height="\d+"/);
    }
    const paths = new Set([post.coverImage, ...[...post.content.matchAll(/(?:src|poster)="(\/media\/[^\"]+)"/g)].map(m => m[1])]);
    expect(paths.size).toBe(7);
    for (const path of paths) {
      const file = resolve(root, "client/public", path.slice(1));
      expect(existsSync(file), path).toBe(true);
      expect(statSync(file).size).toBeGreaterThan(1000);
      expect(statSync(file).size).toBeLessThan(path.endsWith(".mp4") ? 5_000_000 : 1_000_000);
    }
    expect(post.content).toContain('<video controls playsinline preload="none"');
    expect(post.content).not.toContain("autoplay");
    expect(post.content).toContain('id="dr-george-video-description"');
    expect(post.content).toContain("No appointment is submitted");
  });
});
