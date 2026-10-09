import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync, statSync } from "node:fs";
import {
  isSeasonActive,
  isSeasonalHomepage,
  SEASONAL_CONFIG,
  seasonalParticles,
} from "../client/src/components/home/seasonal/seasonalConfig";
import SeasonalHome from "../client/src/components/home/seasonal/SeasonalHome";

describe("Optional homepage seasonal layer", () => {
  it("has an explicit off switch and non-recurring date boundaries", () => {
    expect(isSeasonActive(Date.parse("2026-10-08T20:59:59Z"))).toBe(false);
    expect(isSeasonActive(Date.parse("2026-10-08T21:00:00Z"))).toBe(true);
    expect(isSeasonActive(Date.parse("2026-10-31T21:59:59Z"))).toBe(true);
    expect(isSeasonActive(Date.parse("2026-10-31T22:00:00Z"))).toBe(false);
    expect(isSeasonActive(Date.parse("2027-10-15T12:00:00Z"))).toBe(false);
    expect(
      isSeasonActive(Date.parse("2026-10-15T12:00:00Z"), {
        ...SEASONAL_CONFIG,
        enabled: false,
      })
    ).toBe(false);
  });
  it("can only activate on the three homepage paths", () => {
    for (const path of ["/", "/el", "/el/", "/he", "/he/"])
      expect(isSeasonalHomepage(path)).toBe(true);
    for (const path of [
      "/services/",
      "/el/contact/",
      "/he/blog/",
      "/preview/bella-salon/",
      "/en/",
      "/hell/",
    ])
      expect(isSeasonalHomepage(path)).toBe(false);
  });
  it("leaves original HTML independent of JavaScript and decorations", () => {
    for (const language of ["en", "el", "he"] as const)
      expect(
        renderToStaticMarkup(createElement(SeasonalHome, { language }))
      ).toBe("");
    const prerender = readFileSync("scripts/prerender-full.mjs", "utf8");
    expect(prerender).toContain('page.locator("[data-seasonal-runtime]")');
  });
  it("bounds deterministic particles and supports disabling them", () => {
    expect(seasonalParticles(false)).toEqual(seasonalParticles(false));
    expect(seasonalParticles(false)).toHaveLength(12);
    expect(seasonalParticles(true)).toHaveLength(5);
    expect(seasonalParticles(false).filter(p => p.kind === "bat")).toHaveLength(
      2
    );
    expect(
      seasonalParticles(false).filter(p => p.kind === "ghost")
    ).toHaveLength(1);
    expect(
      seasonalParticles(false, { ...SEASONAL_CONFIG.particles, enabled: false })
    ).toEqual([]);
    expect(
      seasonalParticles(false, {
        ...SEASONAL_CONFIG.particles,
        desktopCount: 10000,
      })
    ).toHaveLength(24);
    expect(SEASONAL_CONFIG.particles.durationMs).toBeLessThan(5000);
  });
  it("keeps media small and has no animation dependency or analytics calls", () => {
    expect(
      statSync(
        "client/public/media/seasonal/halloween-2026/glass-pumpkins-560.webp"
      ).size
    ).toBeLessThan(65_000);
    expect(
      statSync(
        "client/public/media/seasonal/halloween-2026/glass-pumpkins-280.webp"
      ).size
    ).toBeLessThan(22_000);
    const source = readFileSync(
      "client/src/components/home/seasonal/HalloweenLayer.tsx",
      "utf8"
    );
    expect(source).toContain('fetchPriority="low"');
    expect(source).toContain('aria-hidden="true"');
    expect(source).toContain("prefers-reduced-motion");
    expect(source).toContain("connection?.saveData");
    expect(source).not.toMatch(
      /requestAnimationFrame|setInterval\([^,]+,\s*(?:16|30)|posthog|fetch\(/
    );
    expect(source).not.toMatch(/limited.time|Κύπρος|קפריסין|—/i);
    expect(source).toContain("Monthly fees excluded.");
    expect(source).toContain("Contact us this October for 10% off");
    expect(
      readFileSync(
        "client/src/components/home/seasonal/HalloweenLayer.css",
        "utf8"
      )
    ).not.toContain("infinite");
  });
  it("keeps the authorised offer manual and homepage-only", () => {
    expect(SEASONAL_CONFIG.offer).toEqual({
      oneTimePercent: 10,
      monthlyPercent: 0,
      enquiryMonth: "2026-10",
    });
    const bats = readFileSync(
      "client/src/components/home/seasonal/SeasonalBats.tsx",
      "utf8"
    );
    expect(bats).not.toMatch(/COPY|seasonal-banner|10%|glass-pumpkins/);
    expect(bats).toContain("dm-season-hide");
    expect(bats).toContain("prefers-reduced-motion");
    expect(bats).toContain("connection?.saveData");
  });
});
