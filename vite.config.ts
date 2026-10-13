import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import visitorCurrency from "./api/visitor-currency";
import { seasonalSpaceBootstrap } from "./client/src/components/home/seasonal/seasonalConfig";

const localCurrency: Plugin = {
  name: "local-visitor-currency",
  configureServer(server) {
    server.middlewares.use("/api/visitor-currency", (req, res) => {
      // Local development fixture only, never a public currency override.
      req.headers["x-vercel-ip-country"] = process.env.DM_QA_COUNTRY ?? "";
      visitorCurrency(req, res);
    });
  },
};
const seasonalSpace: Plugin = {
  name: "seasonal-space-before-paint",
  transformIndexHtml() {
    const script = seasonalSpaceBootstrap();
    return script
      ? [
          {
            tag: "script",
            attrs: { "data-seasonal-space-bootstrap": "" },
            children: script,
            injectTo: "head-prepend" as const,
          },
        ]
      : [];
  },
};
// Writes page-chunks.json: for each page (client/src/pageRoutes.ts), the code
// files it needs beyond the main bundle. RoutePrefetch uses it to download
// the main menu pages in idle time without running them.
const clientSrc = path.resolve(import.meta.dirname, "client", "src");
const pageChunkMap: Plugin = {
  name: "page-chunk-map",
  apply: "build",
  generateBundle(_options, bundle) {
    const chunks = Object.values(bundle).filter(item => item.type === "chunk");
    const byFile = new Map(chunks.map(chunk => [chunk.fileName, chunk]));
    const collect = (file: string, into: Set<string>) => {
      if (into.has(file)) return;
      into.add(file);
      for (const next of byFile.get(file)?.imports ?? []) collect(next, into);
    };
    const preloaded = new Set<string>();
    for (const chunk of chunks)
      if (chunk.isEntry) collect(chunk.fileName, preloaded);
    const map: Record<string, string[]> = {};
    for (const chunk of chunks) {
      if (!chunk.isDynamicEntry || !chunk.facadeModuleId) continue;
      const key = path
        .relative(clientSrc, chunk.facadeModuleId)
        .replace(/\\/g, "/")
        .replace(/\.tsx?$/, "");
      const files = new Set<string>();
      collect(chunk.fileName, files);
      map[key] = Array.from(files).filter(file => !preloaded.has(file));
    }
    this.emitFile({
      type: "asset",
      fileName: "page-chunks.json",
      source: JSON.stringify(map),
    });
  },
};
const plugins = [
  react(),
  tailwindcss(),
  localCurrency,
  seasonalSpace,
  pageChunkMap,
];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Pages download their code on demand (client/src/pageRoutes.ts), but all
    // styles stay in one stylesheet so the cascade order never depends on
    // which page loaded first.
    cssCodeSplit: false,
  },
  server: {
    host: true,
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
