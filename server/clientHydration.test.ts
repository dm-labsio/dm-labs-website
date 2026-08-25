import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readSource = (relativePath: string) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

describe("prerendered client hydration", () => {
  it("hydrates the static route markup instead of replacing the root on first load", () => {
    const entry = readSource("client/src/main.tsx");
    const prerender = readSource("scripts/prerender-full.mjs");

    expect(prerender).toContain("Captures the complete rendered DOM");
    expect(entry).toContain('import { createRoot, hydrateRoot } from "react-dom/client"');
    expect(entry).toContain("if (root.hasChildNodes())");
    expect(entry).toContain("hydrateRoot(root, <App />)");
    expect(entry).toContain("createRoot(root).render(<App />)");
  });
});
