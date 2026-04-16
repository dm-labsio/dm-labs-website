/**
 * D&M Labs — Post-Build Meta Injection Script
 * ============================================
 * Runs AFTER `vite build` to inject per-route <title>, <meta description>,
 * <link rel="canonical">, og:title, og:description, og:url, and twitter:*
 * tags into separate index.html files for each static route.
 *
 * This fixes the core CSR SEO problem: Google's first-pass crawl sees the
 * correct meta tags in the HTML shell before JavaScript executes.
 *
 * Usage: node scripts/prerender-meta.mjs
 * Called automatically via: pnpm run build (see package.json)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "../dist/public");
const BASE_URL = "https://dm-labs.io";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

// ─── Route definitions ────────────────────────────────────────────────────────
// Each entry defines the URL path and its SEO meta data.
// Blog posts are expanded from the BLOG_POSTS array below.

const BLOG_POSTS = [
  {
    slug: "website-cost-cyprus-2026-guide",
    title: "Website Cost Cyprus 2026 | Honest Pricing Guide",
    description: "Wondering about website cost in Cyprus? We break down every price range honestly - from DIY builders to agencies - so you know exactly what to expect.",
  },
  {
    slug: "web-design-nail-salon-beauty-studio-cyprus",
    title: "Web Design Nail Salon Cyprus | Beauty Studio Websites",
    description: "Nail salon or beauty studio in Cyprus? Here is exactly what your website needs to attract clients and show up on Google - from €249.",
  },
  {
    slug: "yoga-pilates-studio-website-cyprus",
    title: "Website for Yoga Studio Cyprus | Pilates Web Design",
    description: "Running a yoga or Pilates studio in Cyprus? Here is why Instagram alone is not enough and what your website needs to fill classes consistently.",
  },
  {
    slug: "how-to-get-found-on-google-cyprus",
    title: "How to Get Found on Google Cyprus | Local SEO Guide",
    description: "A plain-English guide to local SEO in Cyprus. Learn how to get your small business on Google Maps and in search results - step by step.",
  },
  {
    slug: "restaurant-website-design-cyprus",
    title: "Restaurant Website Design Cyprus | Why You Need More Than Facebook",
    description: "Running a restaurant in Cyprus? Here is why a Facebook page is not enough and what your website needs to attract diners, drive reservations, and beat the competition.",
  },
];

const STATIC_ROUTES = [
  {
    path: "/",
    title: "D&M Labs | Professional Website Design from €299",
    description: "D&M Labs builds custom, mobile-first websites for businesses. Fast delivery, SEO-ready, starting from €299.",
  },
  {
    path: "/services",
    title: "Web Design Services Cyprus | D&M Labs",
    description: "Professional web design services in Cyprus. Custom websites, mobile-first development, SEO optimisation, and ongoing maintenance. From €299.",
  },
  {
    path: "/process",
    title: "Our Process | How We Build Websites | D&M Labs",
    description: "From discovery call to launch in 5-14 days. See exactly how D&M Labs designs and builds your website, step by step.",
  },
  {
    path: "/pricing",
    title: "Website Pricing Cyprus | D&M Labs",
    description: "Transparent website pricing for businesses in Cyprus. Starter from €299, Business €399, Premium €699. No hidden fees.",
  },
  {
    path: "/faq",
    title: "FAQ | D&M Labs Web Design",
    description: "Answers to the most common questions about working with D&M Labs. Pricing, timelines, process, and more.",
  },
  {
    path: "/contact",
    title: "Contact D&M Labs | Get a Free Website Quote",
    description: "Get in touch with D&M Labs for a free website consultation. We reply within 24 hours. WhatsApp, email, or contact form.",
  },
  {
    path: "/examples",
    title: "Website Examples | See Our Work | D&M Labs",
    description: "Browse real website examples built by D&M Labs for restaurants, salons, dental clinics, yoga studios, and more. Starting from €299.",
  },
  {
    path: "/blog",
    title: "Blog | Web Design Tips & Guides | D&M Labs",
    description: "Practical guides, honest advice, and web design insights for businesses in Cyprus and beyond.",
  },
  {
    path: "/web-design-limassol",
    title: "Web Design Limassol | Websites from €299 | D&M Labs",
    description: "D&M Labs builds professional websites for Limassol businesses from €299. Mobile-first, SEO-ready, fast delivery. Get online today.",
  },
  {
    path: "/web-design-thessaloniki",
    title: "Web Design Thessaloniki | Professional Websites from €249 | D&M Labs",
    description: "Professional web design for businesses in Thessaloniki. Custom websites built in 5-14 days from €249. Mobile-first, SEO-optimised, no hidden fees. Get a free consultation.",
  },
  {
    path: "/web-design-nicosia",
    title: "Web Design Nicosia | Professional Websites from €249 | D&M Labs",
    description: "Professional web design for businesses in Nicosia, Cyprus. Custom websites built in 5-14 days from €249. Mobile-first, SEO-optimised, no hidden fees. Free consultation.",
  },
  // Legal pages — minimal SEO, just correct canonical
  {
    path: "/privacy",
    title: "Privacy Policy | D&M Labs",
    description: "Privacy policy for D&M Labs web design services.",
  },
  {
    path: "/cookies",
    title: "Cookie Policy | D&M Labs",
    description: "Cookie policy for D&M Labs web design services.",
  },
  {
    path: "/terms",
    title: "Terms of Service | D&M Labs",
    description: "Terms of service for D&M Labs web design services.",
  },
  // Blog posts
  ...BLOG_POSTS.map((post) => ({
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.description,
  })),
];

// ─── HTML injection helper ────────────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectMetaTags(html, { path: routePath, title, description }) {
  const canonicalUrl = `${BASE_URL}${routePath}`;
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const safeCanonical = escapeHtml(canonicalUrl);
  const safeOgImage = escapeHtml(DEFAULT_OG_IMAGE);

  // Build the complete meta block to inject
  const metaBlock = `
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDesc}" />
  <link rel="canonical" href="${safeCanonical}" />
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${safeDesc}" />
  <meta property="og:url" content="${safeCanonical}" />
  <meta property="og:image" content="${safeOgImage}" />
  <meta property="og:type" content="${routePath.startsWith("/blog/") ? "article" : "website"}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeDesc}" />
  <meta name="twitter:image" content="${safeOgImage}" />`;

  // Remove any existing title, description, canonical, og:*, twitter:* tags
  let result = html;

  // Remove existing <title>...</title>
  result = result.replace(/<title>[^<]*<\/title>/gi, "");

  // Remove existing meta name="description"
  result = result.replace(/<meta\s+name="description"[^>]*>/gi, "");

  // Remove existing canonical link
  result = result.replace(/<link\s+rel="canonical"[^>]*>/gi, "");

  // Remove existing og:* meta tags
  result = result.replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, "");

  // Remove existing twitter:* meta tags
  result = result.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, "");

  // Inject the new meta block right after <head>
  result = result.replace(/<head>/, `<head>${metaBlock}`);

  return result;
}

// ─── Main execution ───────────────────────────────────────────────────────────

function main() {
  // Read the base index.html from the build output
  const baseHtmlPath = path.join(DIST_DIR, "index.html");

  if (!fs.existsSync(baseHtmlPath)) {
    console.error(`❌ Build output not found at ${baseHtmlPath}`);
    console.error("   Run 'pnpm run build' first, then this script.");
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, "utf-8");
  let successCount = 0;
  let errorCount = 0;

  for (const route of STATIC_ROUTES) {
    try {
      // Determine the output directory for this route
      const routeDir =
        route.path === "/"
          ? DIST_DIR
          : path.join(DIST_DIR, ...route.path.split("/").filter(Boolean));

      // Create directory if it doesn't exist
      fs.mkdirSync(routeDir, { recursive: true });

      // Inject meta tags into a copy of the base HTML
      const injectedHtml = injectMetaTags(baseHtml, route);

      // Write the route-specific index.html
      const outputPath = path.join(routeDir, "index.html");
      fs.writeFileSync(outputPath, injectedHtml, "utf-8");

      console.log(`✅ ${route.path} → ${outputPath.replace(DIST_DIR, "")}`);
      successCount++;
    } catch (err) {
      console.error(`❌ Failed for ${route.path}: ${err.message}`);
      errorCount++;
    }
  }

  console.log(`\n📊 Pre-render complete: ${successCount} routes OK, ${errorCount} errors`);

  if (errorCount > 0) {
    process.exit(1);
  }
}

main();
