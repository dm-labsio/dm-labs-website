import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
const viteSource = readFileSync(resolve(serverDirectory, "_core/vite.ts"), "utf8");
const prerenderSource = readFileSync(resolve(serverDirectory, "../scripts/prerender-full.mjs"), "utf8");

describe("production preview route availability", () => {
  it("emits each valid demo as a visitor-facing static preview without making every preview-shaped URL valid", () => {
    expect(prerenderSource).toContain("const PREVIEW_ROUTES");
    expect(prerenderSource).toContain('"dr-elara-dental"');
    expect(prerenderSource).toContain("previewOk");
    expect(viteSource).not.toContain("/^\\/preview\\/[a-z0-9-]+$/");
    expect(viteSource).toContain("const VALID_PREVIEW_IDS");
    expect(viteSource).toContain('VALID_PREVIEW_IDS.has(urlPath.slice("/preview/".length))');
  });

  it("serves emitted preview files and retains the application shell only for other known dynamic routes", () => {
    expect(viteSource).toContain('const routeFile = path.resolve(distPath, urlPath.slice(1), "index.html");');
    expect(viteSource).toContain("if (fs.existsSync(routeFile)) {");
    expect(viteSource).toContain("if (isKnownRoute(urlPath)) {");
    expect(viteSource).toContain('return res.sendFile(path.resolve(distPath, "index.html"));');
  });
});
