import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(serverDirectory, "..");
const homeSource = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const homeElSource = readFileSync(resolve(projectRoot, "client/src/pages/el/HomeEl.tsx"), "utf8");
const fitLineSource = readFileSync(resolve(projectRoot, "client/src/components/EditorialFitLine.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");
const htmlSource = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");

describe("English homepage editorial typography", () => {
  it("loads the approved editorial families while preserving the existing fallback family", () => {
    expect(htmlSource).toContain("family=Anybody:wdth,wght@80..132,700..900");
    expect(htmlSource).toContain("family=Commissioner:wght@100..700");
    expect(htmlSource).toContain("family=DM+Mono:wght@300;400;500");
    expect(htmlSource).toContain("family=Instrument+Serif:ital@0;1");
    expect(htmlSource).toContain("family=Inter:wght@400;500;600;700");
  });

  it("uses the fitted display treatment only on the English homepage", () => {
    expect(homeSource).toContain('className="editorial-home"');
    expect(homeSource).toContain("<EditorialFitLine");
    expect(homeSource).toContain("editorial-section-heading");
    expect(homeSource).toContain("editorial-price");
    expect(homeElSource).not.toContain("EditorialFitLine");
    expect(homeElSource).not.toContain("editorial-home");
  });

  it("keeps one correctly-cased semantic hero heading and hides the fitted fragments from assistive technology", () => {
    expect(homeSource).toContain('<h1 className="sr-only">Your business is great. Your website should make that obvious.</h1>');
    expect(homeSource).toContain('<div className="editorial-hero-fit" aria-hidden="true">');
    expect(homeSource).toContain('<em className="editorial-serif">obvious.</em>');
  });

  it("fits with Anybody's real width axis and refits for loaded fonts and container changes", () => {
    expect(fitLineSource).toContain("const WIDTH_MIN = 80;");
    expect(fitLineSource).toContain("const WIDTH_MAX = 132;");
    expect(fitLineSource).toContain("fontVariationSettings");
    expect(fitLineSource).toContain("document.fonts?.ready.then(requestFit)");
    expect(fitLineSource).toContain("new ResizeObserver(requestFit)");
    expect(fitLineSource).not.toContain("scaleX");
  });

  it("contains editorial rules within the English homepage and raises light lead text on small screens", () => {
    expect(stylesheet).toContain(".editorial-home {");
    expect(stylesheet).toContain(".editorial-home .editorial-label");
    expect(stylesheet).toContain(".editorial-home .editorial-section-heading");
    expect(stylesheet).toContain(".editorial-home .editorial-price");
    expect(stylesheet).toContain("font-weight: 150;");
    expect(stylesheet).toContain("font-weight: 300;");
    expect(stylesheet).toContain("@media (max-width: 767px)");
  });
});
