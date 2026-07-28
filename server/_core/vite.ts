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
  "/cookie-policy",
  "/terms",
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
  "/el/cookie-policy",
  "/el/terms",
  "/el/blog",
  "/el/templates",
  "/el/examples",
  "/el/web-design-cyprus",
  "/el/web-design-crete",
  "/el/web-design-limassol",
  "/el/web-design-nicosia",
  "/el/web-design-thessaloniki",
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

// ─── Permanent 301 redirects ──────────────────────────────────────────────────
const REDIRECTS: Record<string, string> = {
  // Greek slugs incorrectly served on English paths
  "/blog/geo-vrethite-apo-chatgpt-kypros": "/el/blog/geo-vrethite-apo-chatgpt-kypros",
  "/blog/pos-na-vretheite-google-kypros": "/el/blog/pos-na-vretheite-google-kypros",
  "/blog/istoselidha-nail-salon-beauty-studio-kypros": "/el/blog/istoselidha-nail-salon-beauty-studio-kypros",
  "/blog/posso-kostizei-istoselidha-kypros": "/el/blog/posso-kostizei-istoselidha-kypros",
  "/blog/web-design-ellada-odigos-2026": "/el/blog/web-design-ellada-odigos-2026",
  "/blog/istoselidha-yoga-pilates-studio-kypros": "/el/blog/istoselidha-yoga-pilates-studio-kypros",
  // Slug drift
  "/blog/local-seo-google-cyprus": "/blog/how-to-get-found-on-google-cyprus",
  "/blog/website-yoga-pilates-studio-cyprus": "/blog/yoga-pilates-studio-website-cyprus",
  // Legacy paths
  "/examples": "/templates",
  "/el/examples": "/el/templates",
  // Literal $ artefact
  "/$": "/",
};

function isKnownRoute(urlPath: string): boolean {
  if (STATIC_ROUTES.has(urlPath)) return true;
  for (const pattern of DYNAMIC_PATTERNS) {
    if (pattern.test(urlPath)) return true;
  }
  return false;
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
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
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

  // ── 1. Trailing-slash 301 (Task 4) ─────────────────────────────────────────
  // Redirect /path/ → /path for every path except the root /.
  app.use((req, res, next) => {
    const rawPath = (req.path || "/");
    if (rawPath !== "/" && rawPath.endsWith("/")) {
      const clean = rawPath.slice(0, -1);
      const qs = req.originalUrl.includes("?") ? req.originalUrl.slice(req.originalUrl.indexOf("?")) : "";
      return res.redirect(301, clean + qs);
    }
    next();
  });

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

    // Unknown path: return HTTP 404 with the 404 page (or root fallback)
    const notFoundFile = path.resolve(distPath, "404", "index.html");
    if (fs.existsSync(notFoundFile)) {
      return res.status(404).sendFile(notFoundFile);
    }
    // Absolute fallback: root index.html with 404 status
    res.status(404).sendFile(path.resolve(distPath, "index.html"));
  });
}
