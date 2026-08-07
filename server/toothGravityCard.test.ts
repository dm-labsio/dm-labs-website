import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(serverDirectory, "..");
const previewSource = readFileSync(resolve(projectRoot, "client/public/previews/dr-elara-dental.html"), "utf8");
const componentSource = readFileSync(resolve(projectRoot, "client/src/components/ui/tooth-gravity-card.tsx"), "utf8");

describe("Dr. Elara tooth gravity treatment", () => {
  it("inserts the orbit treatment only between the existing hero and Treatments section", () => {
    const heroEnd = previewSource.indexOf("</section>", previewSource.indexOf("<!-- HERO -->"));
    const orbitStart = previewSource.indexOf("<!-- TOOTH ORBIT -->");
    const treatmentsStart = previewSource.indexOf("<!-- SERVICES -->");

    expect(heroEnd).toBeGreaterThan(-1);
    expect(orbitStart).toBeGreaterThan(heroEnd);
    expect(treatmentsStart).toBeGreaterThan(orbitStart);
  });

  it("keeps the orbit accessible and reveals it from a button click", () => {
    expect(previewSource).toContain('class="tooth-orbit-stage"');
    expect(previewSource).toContain('aria-pressed="false"');
    expect(previewSource).toContain("stage.addEventListener('click', () => controller.toggle())");
    expect(previewSource).toContain("stage.setAttribute('aria-pressed', String(active))");
  });

  it("uses the shared Three.js source for autonomous 3D tooth motion and click-triggered orbits", () => {
    expect(previewSource).toContain("mountToothGravityScene");
    expect(previewSource).toContain("/previews/tooth-gravity-scene.js");
    expect(previewSource).toContain('class="tooth-scene-host"');
    expect(previewSource).not.toContain('class="tooth-model"');
    expect(componentSource).toContain("loadToothScene");
    expect(componentSource).toContain("mountToothGravityScene");
    expect(previewSource).toContain("reducedMotion: motion.matches");
  });

  it("disables tooth and orbit animation for reduced-motion users", () => {
    expect(previewSource).toContain("reducedMotion: motion.matches");
    expect(previewSource).toContain("Static model");
    expect(componentSource).toContain("prefers-reduced-motion: reduce");
    expect(componentSource).toContain("reducedMotion,");
  });
});
