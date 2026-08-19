import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const vercelConfig = JSON.parse(
  readFileSync(resolve(projectRoot, "vercel.json"), "utf8")
) as {
  $schema: string;
  installCommand: string;
  buildCommand: string;
  outputDirectory: string;
  trailingSlash: boolean;
  routes: Array<{
    src: string;
    status: number;
    headers: Record<string, string>;
  }>;
  headers: Array<{
    source: string;
    headers: Array<{ key: string; value: string }>;
  }>;
  redirects?: unknown;
  rewrites?: unknown;
};
const packageJson = JSON.parse(
  readFileSync(resolve(projectRoot, "package.json"), "utf8")
) as {
  scripts: Record<string, string>;
  engines: Record<string, string>;
  devDependencies: Record<string, string>;
  packageManager: string;
};
const staticServer = readFileSync(
  resolve(projectRoot, "server/_core/vite.ts"),
  "utf8"
);
const prerenderSource = readFileSync(
  resolve(projectRoot, "scripts/prerender-full.mjs"),
  "utf8"
);

function extractExpressRedirects(source: string): Record<string, string> {
  const block = source.match(
    /const REDIRECTS: Record<string, string> = \{([\s\S]*?)\n\};/
  )?.[1];
  if (!block) throw new Error("Express REDIRECTS map was not found");

  return Object.fromEntries(
    [...block.matchAll(/"([^"]+)"\s*:\s*"([^"]+)"/g)].map(match => [
      match[1],
      match[2],
    ])
  );
}

function extractQuotedItems(source: string, pattern: RegExp): string[] {
  const block = source.match(pattern)?.[1] ?? "";
  return [...block.matchAll(/["']([^"']+)["']/g)].map(match => match[1]);
}

describe("Vercel static deployment configuration", () => {
  it("pins the static build output, Node, pnpm, Chromium, trailing slashes, and no rewrites", () => {
    expect(vercelConfig.$schema).toBe("https://openapi.vercel.sh/vercel.json");
    expect(vercelConfig.installCommand).toBe("pnpm install --frozen-lockfile");
    expect(vercelConfig.buildCommand).toBe("pnpm build");
    expect(vercelConfig.outputDirectory).toBe("dist/public");
    expect(vercelConfig.trailingSlash).toBe(true);
    expect(vercelConfig.redirects).toBeUndefined();
    expect(vercelConfig.rewrites).toBeUndefined();
    expect(packageJson.engines.node).toBe("24.x");
    expect(packageJson.packageManager).toMatch(/^pnpm@10\.4\.1\+/);
    expect(packageJson.devDependencies["@sparticuz/chromium"]).toBe("149.0.0");
  });

  it("ports every Express legacy redirect one-for-one as a pre-normalization 301 route", () => {
    const expressRedirects = extractExpressRedirects(staticServer);
    const vercelRedirects = Object.fromEntries(
      vercelConfig.routes.map(({ src, headers }) => {
        const literalSource = src
          .replace(/^\^/, "")
          .replace(/\/\?\$$/, "")
          .replace(/\\\$/g, "$");
        return [literalSource, headers.Location];
      })
    );

    expect(Object.keys(expressRedirects)).toHaveLength(16);
    expect(vercelConfig.routes).toHaveLength(16);
    expect(vercelConfig.routes.every(rule => rule.status === 301)).toBe(true);
    expect(vercelConfig.routes.every(rule => rule.src.endsWith("/?$"))).toBe(
      true
    );
    expect(vercelConfig.routes.every(rule => !rule.src.includes(".*"))).toBe(
      true
    );
    expect(vercelRedirects).toEqual(expressRedirects);
  });

  it("sets a one-year immutable cache header for every local media asset", () => {
    expect(vercelConfig.headers).toContainEqual({
      source: "/media/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    });
    expect(vercelConfig.headers).toContainEqual({
      source: "/preview/(.*)",
      headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
    });
    expect(vercelConfig.headers).toContainEqual({
      source: "/previews/(.*)",
      headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
    });
  });

  it("keeps the esbuild-backed prerender command and emits root 404.html after 76 routes", () => {
    expect(packageJson.scripts.build).toBe(
      "vite build && esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist && node scripts/prerender-full.mjs"
    );
    expect(prerenderSource).toMatch(
      /const \{ default: serverlessChromium \} = await import\(\s*"@sparticuz\/chromium"\s*\)/
    );
    expect(prerenderSource).toContain(
      "const browser = await playwrightChromium.launch(browserLaunchOptions)"
    );

    const englishBlogSlugs = extractQuotedItems(
      prerenderSource,
      /const EN_BLOG_SLUGS = \[([\s\S]*?)\];/
    );
    const greekBlogSlugs = extractQuotedItems(
      prerenderSource,
      /const EL_BLOG_SLUGS = \[([\s\S]*?)\];/
    );
    const literalRoutes = extractQuotedItems(
      prerenderSource,
      /const ROUTES = \[([\s\S]*?)\]\.map/
    ).filter(route => route.startsWith("/"));

    expect(
      literalRoutes.length + englishBlogSlugs.length + greekBlogSlugs.length
    ).toBe(79);
    expect(prerenderSource.indexOf("for (const route of ROUTES)")).toBeLessThan(
      prerenderSource.indexOf("const notFoundPage = await context.newPage()")
    );
    expect(prerenderSource).toContain("response.status() !== 404");
    expect(prerenderSource).toContain(
      'robots?.getAttribute("content") === "noindex, nofollow"'
    );
    expect(prerenderSource).toContain(
      "!document.querySelector('link[rel=\"canonical\"]')"
    );
    expect(prerenderSource).toContain(
      'writeFileSync(join(DIST_DIR, "404.html"), notFoundHtml, "utf-8")'
    );
  });
});
