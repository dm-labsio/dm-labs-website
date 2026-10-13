import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readSource = (relativePath: string) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

describe("prerendered client hydration", () => {
  const entry = readSource("client/src/main.tsx");
  const prerender = readSource("scripts/prerender-full.mjs");

  it("hydrates only snapshots produced by react-dom/server and verified at build time", () => {
    expect(prerender).toContain("Captures the complete rendered DOM");
    // Snapshots are server-rendered HTML adopted in the build browser, so
    // useId values match what hydrateRoot expects (a createRoot snapshot never can).
    expect(entry).toContain('await import("react-dom/server")');
    expect(entry).toContain("root.innerHTML = renderToString(app);");
    // Visitors hydrate only pages the build marked, with the same currency.
    expect(entry).toContain('root.dataset.hydratable === "true"');
    expect(entry).toContain("canHydrate && savedCurrency === currency");
    expect(entry).toContain("hydrateRoot(root, app, { onRecoverableError: reportMismatch });");
    // Everything else keeps the original full client render.
    expect(entry).toContain("createRoot(root).render(app);");
  });

  it("re-checks every saved page as a visitor and keeps the client render where it cannot hydrate", () => {
    expect(prerender).toContain("Hydration check");
    expect(prerender).toContain('data-hydratable="false"');
    expect(prerender).toContain("window.__DM_APP_READY__ === true");
    expect(entry).toContain("__DM_APP_READY__ = true");
    // Vercel's Chromium runs single-process and dies on a second context.
    const check = prerender.slice(prerender.indexOf("── Hydration check"));
    expect(check).not.toContain("newContext(");
    expect(check).toContain('name: "dm_hydration_check"');
    expect(prerender).toContain('document.cookie.includes("dm_hydration_check=1")');
  });

  it("renders the same first frame for every motion preference", () => {
    // Home pages are saved with reduced motion, the rest without, so entrance
    // states must not depend on it; only the reveal timing may.
    const animateIn = readSource("client/src/components/AnimateIn.tsx");
    expect(animateIn).not.toMatch(/variants=\{\s*reduce/);
    expect(animateIn).toContain("...(reduce && STILL)");
    // Half-played artwork entrances are never saved into the page.
    const serviceMotion = readSource(
      "client/src/components/services/useServiceMotion.ts"
    );
    expect(serviceMotion).toContain("isStaticSnapshot()");
  });
});
