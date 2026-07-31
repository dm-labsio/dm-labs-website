import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const trailSource = readFileSync(
  resolve(process.cwd(), "client", "src", "components", "NeonCursorTrail.tsx"),
  "utf8",
);

describe("NeonCursorTrail", () => {
  it("renders a continuous tapered ribbon instead of individual particle dots", () => {
    expect(trailSource).toContain("quadraticCurveTo");
    expect(trailSource).toContain("MAX_TRAIL_POINTS = 38");
    expect(trailSource).toContain("TRAIL_LIFE = 560");
    expect(trailSource).not.toContain("particlesRef");
    expect(trailSource).not.toContain("Math.random");
  });

  it("retains the click ripple effect in the active neon palette", () => {
    expect(trailSource).toContain("const ripplesRef");
    expect(trailSource).toContain("const spawnRipple");
    expect(trailSource).toContain('window.addEventListener("pointerdown", spawnRipple');
    expect(trailSource).toContain("RIPPLE_LIFE = 520");
  });

  it("uses a non-interactive full-screen canvas and requestAnimationFrame scheduling", () => {
    expect(trailSource).toContain('pointerEvents: "none"');
    expect(trailSource).toContain('position: "fixed"');
    expect(trailSource).toContain("requestAnimationFrame(draw)");
    expect(trailSource).toContain("cancelAnimationFrame(animationRef.current)");
    expect(trailSource).not.toContain("useState");
  });
});
