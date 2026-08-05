import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
const previewSource = readFileSync(
  resolve(serverDirectory, "../client/public/previews/nomad-coffee.html"),
  "utf8",
);

describe("Nomad Coffee scroll-responsive film", () => {
  it("embeds the supplied managed video as an accessible autoplaying inline visual", () => {
    expect(previewSource).toContain('id="coffee-scroll-video"');
    expect(previewSource).toContain('src="/manus-storage/nomad-coffee-scroll-video_09b84d3e.mp4"');
    expect(previewSource).toContain("autoplay muted loop playsinline preload=\"auto\"");
    expect(previewSource).toContain('aria-labelledby="coffee-film-title"');
  });

  it("uses requestAnimationFrame and playback-rate modulation rather than scroll scrubbing", () => {
    expect(previewSource).toContain("window.addEventListener('scroll', onScroll, { passive:true });");
    expect(previewSource).toContain("window.requestAnimationFrame(tick)");
    expect(previewSource).toContain("video.playbackRate = rate");
    expect(previewSource).not.toContain("video.currentTime");
  });

  it("waits for valid metadata before scroll-rate work and retains the reduced-motion fallback", () => {
    expect(previewSource).toContain("video.addEventListener('loadedmetadata', onLoadedMetadata, { once:true });");
    expect(previewSource).toContain("if (!isFinite(video.duration) || video.duration <= 0) return;");
    expect(previewSource).toContain("if (!metadataReady) return;");
    expect(previewSource).toContain("if (!metadataReady) {");
    expect(previewSource).toContain("prefers-reduced-motion: reduce");
    expect(previewSource).toContain("var boostRate = 1.7;");
    expect(previewSource).toContain("reducedMotion ? baseRate");
    expect(previewSource).toContain("window.cancelAnimationFrame(rafId)");
  });
});
