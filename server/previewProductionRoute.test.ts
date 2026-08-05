import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
const viteSource = readFileSync(resolve(serverDirectory, "_core/vite.ts"), "utf8");

describe("production preview route availability", () => {
  it("allows in-app preview IDs through the dynamic route guard", () => {
    expect(viteSource).toContain("/^\\/preview\\/[a-z0-9-]+$/");
  });

  it("serves the application shell for known dynamic routes without prerendered files", () => {
    expect(viteSource).toContain("if (isKnownRoute(urlPath)) {");
    expect(viteSource).toContain('return res.sendFile(path.resolve(distPath, "index.html"));');
  });
});
