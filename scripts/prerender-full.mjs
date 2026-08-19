/**
 * prerender-full.mjs
 *
 * Full-page prerender using Playwright.
 *
 * Replaces prerender-meta.mjs. Instead of injecting a minimal metadata shell
 * into a generic SPA index.html, this script:
 *   1. Starts the production server (dist/index.js) on a random port
 *   2. Visits each route with a headless Chromium browser
 *   3. Waits for React to fully hydrate the page
 *   4. Captures the complete rendered DOM (including all article content,
 *      internal links, CTAs, schema markup, etc.)
 *   5. Writes that DOM as the route's index.html in dist/public/
 *
 * The output HTML contains the full real content before JavaScript runs,
 * which means:
 *   - Googlebot (deferred JS queue) sees the real page immediately
 *   - AI crawlers (GPTBot, ClaudeBot, PerplexityBot) that never execute JS
 *     see the full article body and all internal links
 *   - View Source shows the actual page, not a fallback snippet
 *
 * ROUTE_FALLBACKS in prerender-meta.mjs is no longer needed and can be
 * removed once this script is confirmed working in production.
 *
 * Usage (called automatically by `pnpm run build`):
 *   node scripts/prerender-full.mjs
 *
 * Requires:
 *   - pnpm add -D playwright @sparticuz/chromium
 *   - npx playwright install chromium (local builds only)
 *   - A completed Vite + esbuild build in dist/
 */

import { chromium as playwrightChromium } from "playwright";
import { spawn } from "child_process";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createServer } from "net";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST_DIR = join(ROOT, "dist", "public");
const SERVER_ENTRY = join(ROOT, "dist", "index.js");
const BASE_URL = "https://dm-labs.io";

// ─── All routes to prerender ──────────────────────────────────────────────────
// Keep this list in sync with prerender-meta.mjs EN_STATIC_ROUTES + EL_STATIC_ROUTES
// plus all EN blog slugs and EL blog slugs.
const EN_BLOG_SLUGS = [
  "website-cost-cyprus-2026-guide",
  "web-design-nail-salon-beauty-studio-cyprus",
  "yoga-pilates-studio-website-cyprus",
  "how-to-get-found-on-google-cyprus",
  "restaurant-website-design-cyprus",
  "wix-vs-professional-web-designer-cyprus",
  "web-design-greece-guide-2026",
  "geo-get-found-by-chatgpt-cyprus",
  "google-search-console-ai-seo-prompts",
];

const EL_BLOG_SLUGS = [
  "wix-vs-epaggelmatias-web-designer-kypros",
  "posso-kostizei-istoselidha-kypros",
  "istoselidha-nail-salon-beauty-studio-kypros",
  "istoselidha-yoga-pilates-studio-kypros",
  "pos-na-vretheite-google-kypros",
  "istoselidha-estiatorio-kypros",
  "web-design-ellada-odigos-2026",
  "geo-vrethite-apo-chatgpt-kypros",
];

const ROUTES = [
  // EN static
  "/",
  "/services",
  "/process",
  "/pricing",
  "/faq",
  "/contact",
  "/templates",
  "/blog",
  "/web-design-limassol",
  "/web-design-thessaloniki",
  "/web-design-nicosia",
  "/web-design-cyprus",
  "/web-design-crete",
  "/web-design-paphos",
  "/web-design-restaurants-cyprus",
  "/privacy",
  "/cookies",
  "/terms",
  // Hebrew staged routes: add each only after its full page content is complete.
  "/he",
  "/he/services",
  // EN services sub-pages
  "/services/custom-design",
  "/services/mobile-first",
  "/services/seo",
  "/services/performance",
  "/services/security",
  "/services/turnaround",
  "/services/maps",
  "/services/forms",
  "/services/social",
  // EN blog posts
  ...EN_BLOG_SLUGS.map((s) => `/blog/${s}`),
  // EL static
  "/el",
  "/el/services",
  "/el/process",
  "/el/pricing",
  "/el/faq",
  "/el/contact",
  "/el/blog",
  "/el/web-design-limassol",
  "/el/web-design-thessaloniki",
  "/el/web-design-nicosia",
  "/el/web-design-cyprus",
  "/el/web-design-crete",
  "/el/privacy",
  // /el/cookie-policy removed — 301 redirects to /el/cookies at server level
  "/el/cookies",
  "/el/terms",
  // EL services sub-pages
  "/el/services/custom-design",
  "/el/services/mobile-first",
  "/el/services/seo",
  "/el/services/performance",
  "/el/services/security",
  "/el/services/turnaround",
  "/el/services/maps",
  "/el/services/forms",
  "/el/services/social",
  // EL blog posts
  ...EL_BLOG_SLUGS.map((s) => `/el/blog/${s}`),
  "/el/templates",
].map((route) => route === "/" ? route : `${route.replace(/\/+$/, "")}/`);

// Preview demos are deliberate conversion assets, not canonical editorial pages.
// They are emitted separately from the 69 indexable routes so Vercel can serve
// each valid visitor-facing demo without a catch-all SPA rewrite.
const PREVIEW_ROUTES = [
  "bella-salon",
  "verde-restaurant",
  "pulse-gym",
  "dr-elara-dental",
  "nomad-coffee",
  "serenity-yoga",
  "luxe-realty",
  "little-stars-nursery",
  "arcos-architecture",
  "olio-deli",
  "horizon-law",
].map((id) => `/preview/${id}/`);

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Find a free TCP port */
function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = createServer();
    srv.listen(0, "127.0.0.1", () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
    srv.on("error", reject);
  });
}



/** Synchronous wait-for-port using polling */
async function waitForPortSync(port, timeout = 30_000) {
  const { Socket } = await import("net");
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const ok = await new Promise((res) => {
      const s = new Socket();
      s.setTimeout(500);
      s.connect(port, "127.0.0.1", () => { s.destroy(); res(true); });
      s.on("error", () => res(false));
      s.on("timeout", () => { s.destroy(); res(false); });
    });
    if (ok) return;
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`Port ${port} did not open within ${timeout}ms`);
}

/** Strip the data-seo-fallback main block that prerender-meta.mjs injects,
 *  so there is no duplicate content if both scripts are run. */
function stripFallbackBlock(html) {
  return html.replace(/<main data-seo-fallback="true"[\s\S]*?<\/main>/, "");
}

/** Write route HTML to the correct dist/public path */
function writeRouteHtml(route, html) {
  const segments = route === "/" ? [] : route.split("/").filter(Boolean);
  const dir = join(DIST_DIR, ...segments);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html, "utf-8");
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Validate build output exists
  if (!existsSync(SERVER_ENTRY)) {
    console.error(`ERROR: ${SERVER_ENTRY} not found. Run 'pnpm run build' first.`);
    process.exit(1);
  }

  const port = await getFreePort();
  console.log(`Starting production server on port ${port}…`);

  // Start the production server
  const server = spawn("node", [SERVER_ENTRY], {
    env: { ...process.env, PORT: String(port), NODE_ENV: "production" },
    stdio: ["ignore", "pipe", "pipe"],
  });

  server.stdout.on("data", (d) => process.stdout.write(`[server] ${d}`));
  server.stderr.on("data", (d) => process.stderr.write(`[server] ${d}`));

  let serverExited = false;
  server.on("exit", (code) => {
    serverExited = true;
    if (code !== 0 && code !== null) {
      console.error(`Server exited with code ${code}`);
    }
  });

  try {
    await waitForPortSync(port, 30_000);
    console.log(`Server ready on port ${port}`);

    const localChromiumArgs = [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ];
    let browserLaunchOptions = { args: localChromiumArgs };

    // Vercel's build image has no apt package manager or Chromium shared
    // libraries. Use a Chromium 149 build that bundles its AL2023-compatible
    // libraries and matches Playwright's Chromium 149 manifest. Local and
    // Manus builds continue to use Playwright's installed browser unchanged.
    if (process.env.VERCEL) {
      const { default: serverlessChromium } = await import(
        "@sparticuz/chromium"
      );
      serverlessChromium.setGraphicsMode = false;
      browserLaunchOptions = {
        args: [...new Set([...serverlessChromium.args, ...localChromiumArgs])],
        executablePath: await serverlessChromium.executablePath(),
        headless: true,
      };
    }

    const browser = await playwrightChromium.launch(browserLaunchOptions);
    const context = await browser.newContext({
      // Disable JS-triggered navigation away from the page
      javaScriptEnabled: true,
    });

    let ok = 0;
    let errors = 0;

    for (const route of ROUTES) {
      const url = `http://127.0.0.1:${port}${route}`;
      const page = await context.newPage();

      try {
        // Vercel Analytics intentionally keeps a request open, so wait for the
        // document and then use the explicit React hydration check below.
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });

        // Wait for the root div to have real content (React hydration complete)
        await page.waitForFunction(
          () => {
            const root = document.getElementById("root");
            if (!root) return false;
            // Consider hydrated when root has at least one element child
            // and the page title has been set by useSEO
            return root.children.length > 0;
          },
          { timeout: 15_000 }
        );

        // Small extra wait for any deferred content (images, lazy components)
        await page.waitForTimeout(200);

        // Get the full serialised DOM
        let html = await page.content();

        // Remove the fallback block if prerender-meta.mjs was also run
        html = stripFallbackBlock(html);

        writeRouteHtml(route, html);
        console.log(`OK  ${route}`);
        ok++;
      } catch (err) {
        console.error(`ERR ${route}: ${err.message}`);
        errors++;
      } finally {
        await page.close();
      }
    }

    // Valid demos remain fully usable for visitors clicking “See example”, but
    // PreviewPage injects noindex and removes canonical/hreflang signals before
    // this static snapshot is captured. They intentionally do not change the
    // 69-route canonical prerender count above.
    let previewOk = 0;
    for (const route of PREVIEW_ROUTES) {
      const url = `http://127.0.0.1:${port}${route}`;
      const page = await context.newPage();

      try {
        const response = await page.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: 30_000,
        });
        if (!response || response.status() !== 200) {
          throw new Error(`Expected HTTP 200, received ${response?.status() ?? "no response"}`);
        }

        await page.waitForFunction(
          () => {
            const robots = document.querySelector('meta[name="robots"]');
            const iframe = document.querySelector("iframe[title]");
            return (
              iframe instanceof HTMLIFrameElement &&
              robots?.getAttribute("content") === "noindex, follow" &&
              !document.querySelector('link[rel="canonical"]')
            );
          },
          { timeout: 15_000 },
        );

        let html = await page.content();
        html = stripFallbackBlock(html);
        writeRouteHtml(route, html);
        console.log(`OK  ${route} (preview)`);
        previewOk++;
      } catch (err) {
        console.error(`ERR ${route} (preview): ${err.message}`);
        errors++;
      } finally {
        await page.close();
      }
    }

    // Vercel serves a root-level 404.html with an actual HTTP 404 for unknown
    // static paths. Capture the real hydrated NotFound route after all 69
    // canonical pages so this extra artifact does not alter the route count.
    const notFoundPage = await context.newPage();
    try {
      const response = await notFoundPage.goto(
        `http://127.0.0.1:${port}/__vercel-static-404__/`,
        { waitUntil: "domcontentloaded", timeout: 30_000 }
      );

      if (!response || response.status() !== 404) {
        throw new Error(`Expected HTTP 404, received ${response?.status() ?? "no response"}`);
      }

      await notFoundPage.waitForFunction(
        () => {
          const robots = document.querySelector('meta[name="robots"]');
          const heading = document.querySelector("h1");
          return (
            document.title === "Page Not Found | DM-Labs.io" &&
            heading?.textContent?.trim() === "Page Not Found" &&
            robots?.getAttribute("content") === "noindex, nofollow" &&
            !document.querySelector('link[rel="canonical"]')
          );
        },
        { timeout: 15_000 }
      );

      let notFoundHtml = await notFoundPage.content();
      notFoundHtml = stripFallbackBlock(notFoundHtml);
      writeFileSync(join(DIST_DIR, "404.html"), notFoundHtml, "utf-8");
      console.log("OK  /404.html (root static 404 artifact)");
    } catch (err) {
      console.error(`ERR /404.html: ${err.message}`);
      errors++;
    } finally {
      await notFoundPage.close();
    }

    await browser.close();
    console.log(`\nPrerender complete: ${ok} canonical OK, ${previewOk} preview OK, ${errors} errors`);

    if (errors > 0) {
      process.exit(1);
    }
  } finally {
    if (!serverExited) {
      server.kill("SIGTERM");
    }
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
