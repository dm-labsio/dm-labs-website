import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

// ─── Known valid routes (production 404 guard) ────────────────────────────────
// Any path NOT in this set AND not matching a dynamic pattern returns HTTP 404.
// Keep in sync with App.tsx Route definitions.
const STATIC_ROUTES = new Set([
  "/",
  "/services",
  "/process",
  "/pricing",
  "/faq",
  "/contact",
  "/privacy",
  "/cookies",
  // /cookie-policy is removed — 301 redirects to /cookies (see REDIRECTS below)
  "/terms",
  // Hebrew staged routes: add children only after they have real page content.
  "/he",
  "/he/",
  "/he/services",
  "/he/services/",
  "/he/process",
  "/he/process/",
  "/he/pricing",
  "/he/pricing/",
  "/he/contact",
  "/he/contact/",
  "/he/faq",
  "/he/faq/",
  "/he/templates",
  "/he/templates/",
  "/he/privacy",
  "/he/privacy/",
  "/he/cookies",
  "/he/cookies/",
  "/he/terms",
  "/he/terms/",
  "/he/services/custom-design",
  "/he/services/custom-design/",
  "/he/services/mobile-first",
  "/he/services/mobile-first/",
  "/he/services/seo",
  "/he/services/seo/",
  "/he/services/performance",
  "/he/services/performance/",
  "/he/services/security",
  "/he/services/security/",
  "/he/services/turnaround",
  "/he/services/turnaround/",
  "/he/services/maps",
  "/he/services/maps/",
  "/he/services/forms",
  "/he/services/forms/",
  "/he/services/social",
  "/he/services/social/",
  "/he/blog",
  "/he/blog/",
  "/he/blog/website-cost-cyprus-2026-guide",
  "/he/blog/website-cost-cyprus-2026-guide/",
  "/he/blog/web-design-nail-salon-beauty-studio-cyprus",
  "/he/blog/web-design-nail-salon-beauty-studio-cyprus/",
  "/he/blog/yoga-pilates-studio-website-cyprus",
  "/he/blog/yoga-pilates-studio-website-cyprus/",
  "/he/blog/how-to-get-found-on-google-cyprus",
  "/he/blog/how-to-get-found-on-google-cyprus/",
  "/templates",
  "/examples",
  "/blog",
  "/web-design-limassol",
  "/web-design-thessaloniki",
  "/web-design-nicosia",
  "/web-design-cyprus",
  "/web-design-crete",
  "/web-design-paphos",
  "/web-design-restaurants-cyprus",
  "/404",
  // Services sub-pages
  "/services/custom-design",
  "/services/mobile-first",
  "/services/seo",
  "/services/performance",
  "/services/security",
  "/services/turnaround",
  "/services/maps",
  "/services/forms",
  "/services/social",
  // Greek
  "/el",
  "/el/",
  "/el/services",
  "/el/process",
  "/el/pricing",
  "/el/faq",
  "/el/contact",
  "/el/privacy",
  "/el/cookies",
  // /el/cookie-policy is removed — 301 redirects to /el/cookies (see REDIRECTS below)
  "/el/terms",
  "/el/blog",
  "/el/templates",
  "/el/examples",
  "/el/web-design-cyprus",
  "/el/web-design-crete",
  "/el/web-design-limassol",
  "/el/web-design-nicosia",
  "/el/web-design-thessaloniki",
  // Greek services sub-pages
  "/el/services/custom-design",
  "/el/services/mobile-first",
  "/el/services/seo",
  "/el/services/performance",
  "/el/services/security",
  "/el/services/turnaround",
  "/el/services/maps",
  "/el/services/forms",
  "/el/services/social",
  // Greek blog posts
  "/el/blog/wix-vs-epaggelmatias-web-designer-kypros",
  "/el/blog/posso-kostizei-istoselidha-kypros",
  "/el/blog/istoselidha-nail-salon-beauty-studio-kypros",
  "/el/blog/istoselidha-yoga-pilates-studio-kypros",
  "/el/blog/pos-na-vretheite-google-kypros",
  "/el/blog/istoselidha-estiatorio-kypros",
  "/el/blog/web-design-ellada-odigos-2026",
  "/el/blog/geo-vrethite-apo-chatgpt-kypros",
]);

// Dynamic route patterns (regex)
const DYNAMIC_PATTERNS = [
  /^\/blog\/[a-z0-9-]+$/,
  /^\/services\/[a-z0-9-]+$/,
  /^\/el\/services\/[a-z0-9-]+$/,
  /^\/previews\/[a-z0-9-]+\.html$/,
];

// Valid visitor-facing demo pages are prerendered separately from the 69
// canonical routes. Keep this explicit allowlist in sync with PreviewPage and
// scripts/prerender-full.mjs so unknown /preview/:id paths retain a real 404.
const VALID_PREVIEW_IDS = new Set([
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
]);

// ─── Permanent 301 redirects ──────────────────────────────────────────────────
const REDIRECTS: Record<string, string> = {
  // Greek slugs incorrectly served on English paths
  "/blog/geo-vrethite-apo-chatgpt-kypros": "/el/blog/geo-vrethite-apo-chatgpt-kypros/",
  "/blog/pos-na-vretheite-google-kypros": "/el/blog/pos-na-vretheite-google-kypros/",
  "/blog/istoselidha-nail-salon-beauty-studio-kypros": "/el/blog/istoselidha-nail-salon-beauty-studio-kypros/",
  "/blog/posso-kostizei-istoselidha-kypros": "/el/blog/posso-kostizei-istoselidha-kypros/",
  "/blog/web-design-ellada-odigos-2026": "/el/blog/web-design-ellada-odigos-2026/",
  "/blog/istoselidha-yoga-pilates-studio-kypros": "/el/blog/istoselidha-yoga-pilates-studio-kypros/",
  // Verified GSC legacy paths
  "/blog/wix-vs-epaggelmatias-web-designer-kypros": "/el/blog/wix-vs-epaggelmatias-web-designer-kypros/",
  "/el/web-design-paphos": "/el/web-design-cyprus/",
  "/el/web-design-restaurants-cyprus": "/el/web-design-cyprus/",
  // Slug drift
  "/blog/local-seo-google-cyprus": "/blog/how-to-get-found-on-google-cyprus/",
  "/blog/website-yoga-pilates-studio-cyprus": "/blog/yoga-pilates-studio-website-cyprus/",
  // Legacy paths
  "/examples": "/templates/",
  "/el/examples": "/el/templates/",
  // Cookie policy consolidation: /cookie-policy → /cookies
  "/cookie-policy": "/cookies/",
  "/el/cookie-policy": "/el/cookies/",
  // Literal $ artefact
  "/$": "/",
};

function isKnownRoute(urlPath: string): boolean {
  if (STATIC_ROUTES.has(urlPath)) return true;
  if (urlPath.startsWith("/preview/")) {
    return VALID_PREVIEW_IDS.has(urlPath.slice("/preview/".length));
  }
  for (const pattern of DYNAMIC_PATTERNS) {
    if (pattern.test(urlPath)) return true;
  }
  return false;
}

function previewNoindexHtml(html: string) {
  let output = html.replace(
    /<meta name="robots"[^>]*>/,
    '<meta name="robots" content="noindex, follow" />',
  );
  if (!output.includes('name="robots"')) {
    output = output.replace("</head>", '  <meta name="robots" content="noindex, follow" />\n</head>');
  }
  output = output.replace(/<link rel="canonical"[^>]*>\n?/g, "");
  output = output.replace(/<link rel="alternate"[^>]*hreflang[^>]*>\n?/g, "");
  return output;
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      const urlPath = url.split("?")[0].replace(/\/$/, "") || "/";
      const html = urlPath.startsWith("/preview/") ? previewNoindexHtml(page) : page;
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // NOTE: Trailing-slash normalisation is delegated to the hosting edge
  // before this application. Adding a redirect here as well can cause an infinite
  // redirect loop (/path → /path/ → /path → …). Do NOT add trailing-slash
  // redirect middleware in this file.

  // ── 2. Permanent 301 redirects (Task 2) ────────────────────────────────────
  app.use((req, res, next) => {
    const urlPath = (req.path || "/").replace(/\/$/, "") || "/";
    const target = REDIRECTS[urlPath];
    if (target) {
      return res.redirect(301, target);
    }
    next();
  });

  app.use(express.static(distPath));

  // ── 3. SPA routing with real 404 (Task 1) ──────────────────────────────────
  app.use("*", (req, res) => {
    const urlPath = (req.originalUrl || req.path || "/").split("?")[0].replace(/\/$/, "") || "/";

    // Serve prerendered file if it exists
    if (urlPath !== "/") {
      const routeFile = path.resolve(distPath, urlPath.slice(1), "index.html");
      if (fs.existsSync(routeFile)) {
        return res.sendFile(routeFile);
      }
    } else {
      // Root always gets the root index.html
      return res.sendFile(path.resolve(distPath, "index.html"));
    }

    // Dynamic application routes without a prerendered HTML file still need the
    // root shell so the client router can render their in-app experience.
    if (isKnownRoute(urlPath)) {
      return res.sendFile(path.resolve(distPath, "index.html"));
    }

    // Unknown path: return HTTP 404 with correct metadata injected server-side.
    // We patch the root index.html to replace the homepage title/canonical/robots
    // so that Googlebot sees the correct values even before JavaScript runs.
    const rootHtmlPath = path.resolve(distPath, "index.html");
    try {
      let html = fs.readFileSync(rootHtmlPath, "utf-8");
      // Replace title
      const notFoundTitle = urlPath === "/he" || urlPath.startsWith("/he/")
        ? "הדף לא נמצא | DM-Labs.io"
        : urlPath === "/el" || urlPath.startsWith("/el/")
          ? "Σελίδα Δεν Βρέθηκε | DM-Labs.io"
          : "Page Not Found | DM-Labs.io";
      html = html.replace(
        /<title>[^<]*<\/title>/,
        `<title>${notFoundTitle}</title>`
      );
      // Replace or inject robots meta
      if (html.includes('name="robots"')) {
        html = html.replace(
          /<meta name="robots"[^>]*>/,
          '<meta name="robots" content="noindex, nofollow" />'
        );
      } else {
        html = html.replace(
          "</head>",
          '  <meta name="robots" content="noindex, nofollow" />\n</head>'
        );
      }
      // Remove canonical link tag (404 pages should not have a canonical)
      html = html.replace(/<link rel="canonical"[^>]*>\n?/g, "");
      return res.status(404).set({ "Content-Type": "text/html" }).end(html);
    } catch {
      // If we can't read the file, send a minimal 404 response
      return res.status(404).send("<html><head><title>Page Not Found | DM-Labs.io</title><meta name=\"robots\" content=\"noindex, nofollow\"></head><body><h1>404 Not Found</h1></body></html>");
    }
  });
}
