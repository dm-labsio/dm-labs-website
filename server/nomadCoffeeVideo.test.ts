import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
const previewSource = readFileSync(
  resolve(serverDirectory, "../client/public/previews/nomad-coffee.html"),
  "utf8",
);

describe("Nomad Coffee scroll-driven hero", () => {
  it("uses the supplied stored video as the page-first hero rather than a separate middle section", () => {
    expect(previewSource).toContain('id="coffee-scroll-video"');
    expect(previewSource).toContain('src="/manus-storage/nomad-coffee-scroll-video-all-intra_ab16c684.mp4"');
    expect(previewSource).toContain('<section class="scroll-video-hero" id="coffee-film-hero"');
    expect(previewSource).toContain("muted playsinline preload=\"auto\"");
    expect(previewSource).not.toContain("autoplay muted loop");
    expect(previewSource).not.toContain('<section class="coffee-film"');
    expect(previewSource.indexOf('id="coffee-film-hero"')).toBeLessThan(previewSource.indexOf("<!-- HERO -->"));
  });

  it("keeps the hero fixed throughout the scroll span and releases it only when the existing page reaches the viewport", () => {
    expect(previewSource).toContain(".scroll-video-hero { --hero-progress:0; position:relative; height:520vh;");
    expect(previewSource).toContain(".scroll-video-hero-stage { position:fixed; inset:0; z-index:10;");
    expect(previewSource).toContain('.scroll-video-hero[data-active="false"] .scroll-video-hero-stage { display:none; }');
    expect(previewSource).toContain("var progress = clamp(-sceneRect.top / scrollSpan, 0, 1);");
    expect(previewSource).toContain("scene.setAttribute('data-active', sceneRect.bottom > 0 ? 'true' : 'false');");
    expect(previewSource).toContain("var targetTime = 0;");
    expect(previewSource).toContain("function runSeekController() {");
    expect(previewSource).toContain("if (!metadataReady || reducedMotion || !seekReady || video.seeking) return;");
    expect(previewSource).toContain("seekReady = false;");
    expect(previewSource).toContain("video.currentTime = targetTime;");
    expect(previewSource).toContain("function updateTargetTime(nextTime) {");
    expect(previewSource).toContain("targetTime = clamp(nextTime, 0, duration);");
    expect(previewSource).toContain("function onSeeked() {");
    expect(previewSource).toContain("seekReady = true;");
    expect(previewSource).toContain("video.addEventListener('seeked', onSeeked);");
    expect(previewSource).toContain("updateTargetTime(Math.min(Math.max(duration - 0.04, 0), duration * progress));");
    expect(previewSource).toContain("window.addEventListener('scroll', onScrollOrResize, { passive:true });");
    expect(previewSource).toContain("seekControllerRafId = window.requestAnimationFrame(runSeekController);");
    expect(previewSource).toContain("window.cancelAnimationFrame(seekControllerRafId);");
  });

  it("updates only the latest target during scroll and issues one guarded seek at a time", () => {
    const scrollUpdateStart = previewSource.indexOf("function updateFromScroll() {");
    const scrollUpdateEnd = previewSource.indexOf("function queueUpdate() {");
    const seekControllerStart = previewSource.indexOf("function runSeekController() {");
    const seekControllerEnd = previewSource.indexOf("function updateTargetTime(nextTime) {");

    expect(scrollUpdateStart).toBeGreaterThan(-1);
    expect(scrollUpdateEnd).toBeGreaterThan(scrollUpdateStart);
    expect(seekControllerStart).toBeGreaterThan(-1);
    expect(seekControllerEnd).toBeGreaterThan(seekControllerStart);

    const scrollUpdate = previewSource.slice(scrollUpdateStart, scrollUpdateEnd);
    const seekController = previewSource.slice(seekControllerStart, seekControllerEnd);

    expect(scrollUpdate).toContain("updateTargetTime(");
    expect(scrollUpdate).not.toContain("video.currentTime =");
    expect(seekController).toContain("video.seeking");
    expect(seekController).toContain("seekReady = false;");
    expect(seekController).toContain("video.currentTime = targetTime;");
    expect(previewSource).toContain("video.addEventListener('seeked', onSeeked);");
    expect(previewSource).toContain("function onSeeked() {");
    expect(previewSource).toContain("seekReady = true;");
  });

  it("waits for valid metadata before scrubbing and retains the reduced-motion fallback", () => {
    expect(previewSource).toContain("video.addEventListener('loadedmetadata', onLoadedMetadata, { once:true });");
    expect(previewSource).toContain("if (!isFinite(video.duration) || video.duration <= 0) return;");
    expect(previewSource).toContain("metadataReady = true;");
    expect(previewSource).toContain("if (!metadataReady || reducedMotion) return;");
    expect(previewSource).toContain("prefers-reduced-motion: reduce");
    expect(previewSource).toContain("video.currentTime = Math.max(duration - 0.04, 0);");
    expect(previewSource).toContain("video.pause();");
    expect(previewSource).toContain("window.cancelAnimationFrame(scrollRafId);");
    expect(previewSource).toContain("window.cancelAnimationFrame(seekControllerRafId);");
  });
});
