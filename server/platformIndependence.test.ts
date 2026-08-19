import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const packageJson = JSON.parse(readFileSync(resolve(projectRoot, "package.json"), "utf8"));
const appSource = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
const htmlShell = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");
const viteConfig = readFileSync(resolve(projectRoot, "vite.config.ts"), "utf8");
const serverEntry = readFileSync(resolve(projectRoot, "server/_core/index.ts"), "utf8");
const staticServer = readFileSync(resolve(projectRoot, "server/_core/vite.ts"), "utf8");
const seoHook = readFileSync(resolve(projectRoot, "client/src/hooks/useSEO.ts"), "utf8");
const prerenderSource = readFileSync(resolve(projectRoot, "scripts/prerender-full.mjs"), "utf8");

const removedPaths = [
  "client/public/__manus__",
  "client/src/_core",
  "client/src/const.ts",
  "client/src/lib/trpc.ts",
  "drizzle",
  "drizzle.config.ts",
  "server/db.ts",
  "server/routers.ts",
  "server/_core/oauth.ts",
  "server/_core/sdk.ts",
  "server/_core/context.ts",
  "server/_core/trpc.ts",
  "server/_core/systemRouter.ts",
  "shared",
];

const removedPackages = [
  "@builder.io/vite-plugin-jsx-loc",
  "@trpc/client",
  "@trpc/react-query",
  "@trpc/server",
  "drizzle-kit",
  "drizzle-orm",
  "mysql2",
  "vite-plugin-manus-runtime",
];

function collectTextFiles(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return collectTextFiles(path);
    return [path];
  });
}

const textExtensions = new Set([".css", ".html", ".js", ".json", ".mjs", ".ts", ".tsx"]);
const runtimeFiles = [
  ...collectTextFiles(resolve(projectRoot, "client")),
  ...collectTextFiles(resolve(projectRoot, "server/_core")),
  ...collectTextFiles(resolve(projectRoot, "scripts")),
  resolve(projectRoot, "vite.config.ts"),
].filter(path => textExtensions.has(extname(path).toLowerCase()) && !path.includes("/public/media/"));
const runtimeSource = runtimeFiles.map(path => readFileSync(path, "utf8")).join("\n");

function extractQuotedItems(source: string, pattern: RegExp): string[] {
  const block = source.match(pattern)?.[1] ?? "";
  return [...block.matchAll(/["']([^"']+)["']/g)].map(match => match[1]);
}

describe("platform-independent production stack", () => {
  it("removes the unused authentication, database, runtime, and debug scaffold", () => {
    removedPaths.forEach(path => expect(existsSync(resolve(projectRoot, path)), path).toBe(false));

    const manifest = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };
    removedPackages.forEach(name => expect(manifest[name], name).toBeUndefined());
    expect(packageJson.scripts["db:push"]).toBeUndefined();

    const forbiddenRuntimeTokens = [
      ["__", "manus__"].join(""),
      ["manus", "-runtime"].join(""),
      ["vite-plugin-", "manus-runtime"].join(""),
      ["VITE_ANALYTICS", "_ENDPOINT"].join(""),
      ["VITE_ANALYTICS", "_WEBSITE_ID"].join(""),
      ["/", "umami"].join(""),
      ["DATABASE", "_URL"].join(""),
      ["OAUTH_SERVER", "_URL"].join(""),
      ["VITE_OAUTH", "_PORTAL_URL"].join(""),
    ];
    forbiddenRuntimeTokens.forEach(token => expect(runtimeSource, token).not.toContain(token));

    expect(serverEntry).not.toMatch(/oauth|trpc|registerChatRoutes|createContext/i);
    expect(viteConfig).not.toMatch(/transformIndexHtml|configureServer|jsxLocPlugin/i);
  });

  it("replaces Umami with one official Vercel Analytics React component", () => {
    expect(packageJson.dependencies["@vercel/analytics"]).toMatch(/^\^2\./);
    expect(htmlShell).not.toMatch(/umami|VITE_ANALYTICS/i);
    expect(appSource).toContain('import { Analytics } from "@vercel/analytics/react";');
    expect(appSource).toContain('<Analytics mode={import.meta.env.MODE === "production" ? "production" : "development"} />');
    expect(appSource.match(/<Analytics\b/g)).toHaveLength(1);
  });

  it("preserves the production build, output directory, and 83-route prerender contract", () => {
    expect(packageJson.scripts.build).toBe(
      "vite build && esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist && node scripts/prerender-full.mjs",
    );
    expect(viteConfig).toContain('outDir: path.resolve(import.meta.dirname, "dist/public")');
    expect(prerenderSource).toContain('const DIST_DIR = join(ROOT, "dist", "public")');
    expect(prerenderSource).toContain('const SERVER_ENTRY = join(ROOT, "dist", "index.js")');

    const englishBlogSlugs = extractQuotedItems(prerenderSource, /const EN_BLOG_SLUGS = \[([\s\S]*?)\];/);
    const greekBlogSlugs = extractQuotedItems(prerenderSource, /const EL_BLOG_SLUGS = \[([\s\S]*?)\];/);
    const literalRoutes = extractQuotedItems(prerenderSource, /const ROUTES = \[([\s\S]*?)\]\.map/)
      .filter(route => route.startsWith("/"));

    expect(literalRoutes.length + englishBlogSlugs.length + greekBlogSlugs.length).toBe(83);
    expect(prerenderSource).toContain('`${route.replace(/\\/+$/, "")}/`');
  });

  it("preserves canonical trailing slashes and real unknown-route 404 responses", () => {
    expect(seoHook).toContain("const finalPath = withTrailingSlash(cleanPath)");
    expect(staticServer).toContain("const urlPath = (req.originalUrl || req.path || \"/\").split(\"?\")[0].replace(/\\\/$/, \"\") || \"/\"");
    expect(staticServer).toContain("return res.status(404)");
    expect(staticServer).toContain('content="noindex, nofollow"');
    expect(staticServer).toContain('html = html.replace(/<link rel="canonical"[^>]*>\\n?/g, "")');
  });
});
