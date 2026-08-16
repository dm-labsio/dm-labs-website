import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(serverDirectory, "..");
const previewSource = readFileSync(resolve(projectRoot, "client/public/previews/dr-elara-dental.html"), "utf8");
describe("Dr. Elara root canal treatment video", () => {
  it("inserts the video treatment only between the existing hero and Treatments section", () => {
    const heroEnd = previewSource.indexOf("</section>", previewSource.indexOf("<!-- HERO -->"));
    const treatmentStart = previewSource.indexOf("<!-- ROOT CANAL VIDEO -->");
    const treatmentsStart = previewSource.indexOf("<!-- SERVICES -->");

    expect(heroEnd).toBeGreaterThan(-1);
    expect(treatmentStart).toBeGreaterThan(heroEnd);
    expect(treatmentsStart).toBeGreaterThan(treatmentStart);
  });

  it("uses the supplied Vercel Blob root-canal MP4 with native mobile-friendly playback attributes", () => {
    expect(previewSource).toContain('class="root-canal-video"');
    expect(previewSource).toContain('https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dr-elara-root-canal-treatment_dc985187.mp4');
    expect(previewSource).toContain('muted autoplay loop playsinline controls preload="metadata"');
    expect(previewSource).toContain('aria-label="Animated explanation of root canal treatment"');
  });

  it("presents the supplied root-canal explanation and all four treatment steps below the video", () => {
    expect(previewSource).toContain("Root Canal <em>Treatment</em>");
    expect(previewSource).toContain("Gentle, modern care to save your natural tooth. Here’s what to expect:");
    expect(previewSource).toContain("Numbing &amp; Isolation");
    expect(previewSource).toContain("The infected tissue is carefully removed and the canal is disinfected.");
    expect(previewSource).toContain("The canal is sealed with a safe, biocompatible material.");
    expect(previewSource).toContain("A crown protects and restores your tooth to full strength.");
    expect(previewSource).toContain("Most patients feel little to no discomfort");
  });

  it("removes the prior Three.js tooth-orbit implementation from the dental preview", () => {
    expect(previewSource).not.toContain("mountToothGravityScene");
    expect(previewSource).not.toContain("tooth-gravity-scene.js");
    expect(previewSource).not.toContain('class="tooth-orbit-stage"');
  });
});
