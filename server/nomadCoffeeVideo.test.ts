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
    expect(previewSource).toContain('src="/manus-storage/nomad-coffee-scroll-video_09b84d3e.mp4"');
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
    expect(previewSource).toContain("video.currentTime = targetTime;");
    expect(previewSource).toContain("window.addEventListener('scroll', onScrollOrResize, { passive:true });");
    expect(previewSource).toContain("window.requestAnimationFrame(updateFromScroll)");
  });

  it("waits for valid metadata before scrubbing and retains the reduced-motion fallback", () => {
    expect(previewSource).toContain("video.addEventListener('loadedmetadata', onLoadedMetadata, { once:true });");
    expect(previewSource).toContain("if (!isFinite(video.duration) || video.duration <= 0) return;");
    expect(previewSource).toContain("metadataReady = true;");
    expect(previewSource).toContain("if (!metadataReady || reducedMotion) return;");
    expect(previewSource).toContain("prefers-reduced-motion: reduce");
    expect(previewSource).toContain("video.currentTime = Math.max(duration - 0.04, 0);");
    expect(previewSource).toContain("video.pause();");
    expect(previewSource).toContain("window.cancelAnimationFrame(rafId)");
  });
});
