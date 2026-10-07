import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
// The browser uses this same calculation module.
// @ts-expect-error Standalone demo module is intentionally outside the TS application.
import { makeRecipe } from "../client/public/previews/nomad/recipes.mjs";
const root = resolve(import.meta.dirname, "../client/public/previews");
const html = readFileSync(resolve(root, "nomad-coffee.html"), "utf8");
const script = readFileSync(resolve(root, "nomad/nomad.mjs"), "utf8");

describe("Nomad coffee concept", () => {
  it("calculates useful quantities for each method, including the ice dilution", () => {
    expect(makeRecipe("filter", 20)).toMatchObject({
      dose: 20,
      water: 320,
      ice: 0,
      time: "3:00",
    });
    expect(makeRecipe("press", 30)).toMatchObject({
      dose: 30,
      water: 450,
      ice: 0,
      time: "4:00",
    });
    expect(makeRecipe("iced", 25)).toMatchObject({
      dose: 25,
      water: 250,
      ice: 150,
    });
    expect(makeRecipe("iced", 25).detail).toContain("150 g of ice");
    expect(makeRecipe("iced", 25).detail).toContain("250 g hot water total");
    expect(makeRecipe("filter", 15).water).toBe(240);
    expect(makeRecipe("filter", 40).water).toBe(640);
  });
  it("bounds the dose and falls back safely for malformed input", () => {
    expect(makeRecipe("filter", 0).dose).toBe(15);
    expect(makeRecipe("press", 500).dose).toBe(40);
    expect(makeRecipe("filter", "invalid").water).toBe(320);
    expect(makeRecipe("unknown", 20).water).toBe(320);
  });
  it("keeps a readable page and working recipe before scripts or video load", () => {
    expect(html).toContain("Small cup. Full character.");
    expect(html).toContain("320<span>g</span>");
    expect(html).toContain("noindex, nofollow");
    expect(html).toContain("Fictional brand and café concept");
    expect(html).not.toContain('href="#"');
    expect(html).not.toContain("images.unsplash.com");
    expect(html).not.toContain("autoplay");
    expect(html).toContain('preload="none"');
    expect(html.match(/<video[^>]*>/)?.[0]).not.toMatch(/\ssrc=/);
    expect(script).toContain("else video.pause()");
  });
  it("keeps custom photographic assets within a small initial-load budget", () => {
    const assets = resolve(root, "nomad/assets");
    const images = readdirSync(assets).filter(name => name.endsWith(".webp"));
    expect(images).toHaveLength(3);
    expect(
      images.reduce(
        (size, name) => size + statSync(resolve(assets, name)).size,
        0
      )
    ).toBeLessThan(300_000);
    expect(html).toContain('loading="lazy"');
    expect(html).toContain('fetchpriority="high"');
  });
});
