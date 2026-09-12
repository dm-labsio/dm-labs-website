import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readSource = (relativePath: string) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

describe("prerendered client hydration", () => {
  it("always mounts with createRoot, since the prerendered snapshot was itself produced by createRoot, not real SSR", () => {
    const entry = readSource("client/src/main.tsx");
    const prerender = readSource("scripts/prerender-full.mjs");

    expect(prerender).toContain("Captures the complete rendered DOM");
    expect(entry).toContain('import { createRoot } from "react-dom/client"');
    expect(entry).not.toContain("hydrateRoot(root");
    expect(entry).not.toContain("root.hasChildNodes()");
    expect(entry).toContain("createRoot(root).render(<App />)");
  });
});
