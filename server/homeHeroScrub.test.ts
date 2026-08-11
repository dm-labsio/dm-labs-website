import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(serverDirectory, "..");
const heroSource = readFileSync(resolve(projectRoot, "client/src/components/HomeHeroScrub.tsx"), "utf8");
const homeSource = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const homeElSource = readFileSync(resolve(projectRoot, "client/src/pages/el/HomeEl.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");
const htmlSource = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");

describe("homepage single-stage scroll-scrub hero", () => {
  it("uses the supplied desktop and mobile managed videos with responsive opening posters only on the English and Greek home heroes", () => {
    expect(heroSource).toContain('HERO_SCRUB_VIDEO_URL = "/manus-storage/dm-labs-hero-tunnel-scrub_89732dad.mp4"');
    expect(heroSource).toContain('HERO_SCRUB_OPENING_POSTER_URL = "/manus-storage/dm-labs-hero-tunnel-opening-poster_7b05ee6d.jpg"');
    expect(heroSource).toContain('MOBILE_HERO_SCRUB_VIDEO_URL = "/manus-storage/dm-labs-mobile-hero-scrub-fluid_658e00fd.mp4"');
    expect(heroSource).toContain('MOBILE_HERO_SCRUB_OPENING_POSTER_URL = "/manus-storage/dm-labs-mobile-hero-opening-poster_6fc35873.jpg"');
    expect(heroSource).toContain("poster={HERO_SCRUB_OPENING_POSTER_URL}");
    expect(heroSource).toContain("<source media={MOBILE_VIEWPORT_QUERY} srcSet={MOBILE_HERO_SCRUB_OPENING_POSTER_URL} />");
    expect(heroSource).toContain('<source media={MOBILE_VIEWPORT_QUERY} src={MOBILE_HERO_SCRUB_VIDEO_URL} type="video/mp4" />');
    expect(heroSource).toContain("muted");
    expect(heroSource).toContain("playsInline");
    expect(heroSource).toContain('preload="auto"');
    expect(heroSource).not.toContain("autoPlay");
    expect(heroSource).not.toContain("loop=");
    expect(heroSource).not.toContain("controls");
    expect(homeSource).toContain("<HomeHeroScrub>");
    expect(homeElSource).toContain("<HomeHeroScrub>");
  });

  it("keeps the final video frame and centred existing copy in one responsive stage while preserving a reversible natural release", () => {
    expect(heroSource).toContain('className="hero-scrub-stage"');
    expect(heroSource).toContain('className="hero-scrub-copy"');
    expect(heroSource).not.toContain('className="hero-scrub-spacer"');
    expect(heroSource).not.toContain('className="hero-scrub-flow"');
    expect(stylesheet).toContain("--hero-runway: clamp(520px, 75svh, 760px);");
    expect(stylesheet).toContain("height: calc(100svh - 72px + var(--hero-runway));");
    expect(stylesheet).toContain("position: fixed;");
    expect(stylesheet).toContain('data-released="true"');
    expect(stylesheet).toContain("position: absolute;");
    expect(stylesheet).toContain(".hero-scrub-copy {");
    expect(stylesheet).toContain("display: flex;");
    expect(stylesheet).toContain("align-items: center;");
    expect(stylesheet).toContain("justify-content: center;");
    expect(stylesheet).toContain("text-align: center;");
  });

  it("uses raw scroll progress for copy reveal while serializing guarded video seeks and gating release only on the actual final frame", () => {
    const scrollStart = heroSource.indexOf("const updateFromScroll = () => {");
    const scrollEnd = heroSource.indexOf("const onSeeked = () => {");
    const controllerStart = heroSource.indexOf("const runController = (now: number) => {");
    const controllerEnd = heroSource.indexOf("const updateFromScroll = () => {");
    const scrollHandler = heroSource.slice(scrollStart, scrollEnd);
    const controller = heroSource.slice(controllerStart, controllerEnd);

    expect(scrollStart).toBeGreaterThan(-1);
    expect(controllerStart).toBeGreaterThan(-1);
    expect(scrollHandler).toContain("scope.offsetHeight - stage.offsetHeight");
    expect(scrollHandler).toContain("const rawProgress = clamp");
    expect(scrollHandler).toContain("applyVisualProgress(rawProgress);");
    expect(scrollHandler).toContain("targetVideoProgress = clamp(rawProgress / VIDEO_SCRUB_END, 0, 1);");
    expect(scrollHandler).not.toContain("video.currentTime =");
    expect(controller).toContain("MAX_PROGRESS_SPEED");
    expect(controller).toContain("video.seeking");
    expect(controller).toContain("seekReady = false;");
    expect(controller).toContain("video.currentTime = desiredTime;");
    expect(heroSource).toContain("const VIDEO_SCRUB_END = 0.6;");
    expect(heroSource).toContain("const COPY_REVEAL_START = 0.68;");
    expect(heroSource).toContain("const COPY_REVEAL_END = 0.82;");
    expect(heroSource).toContain("scope.dataset.interactive = String(progress >= COPY_INTERACTIVE_START);");
    expect(heroSource).toContain("const FINAL_FRAME_TOLERANCE = 1 / 30;");
    expect(heroSource).toContain("const finalFrameVisible =");
    expect(heroSource).toContain("let finalFrameReady = false;");
    expect(heroSource).toContain("released = progress >= 1 && finalFrameReady;");
    expect(heroSource).toContain("if (finalFrameVisible && !finalFrameReady) {");
    expect(heroSource).toContain('const MOBILE_VIEWPORT_QUERY = "(max-width: 767px)";');
    expect(heroSource).toContain("const MOBILE_MAX_PROGRESS_SPEED = 0.5;");
    expect(heroSource).toContain("const MOBILE_SEEK_TOLERANCE = 1 / 24;");
    expect(heroSource).toContain("const progressElapsedSeconds = isMobileViewport ? Math.min(elapsedSeconds, 1 / 30) : elapsedSeconds;");
    expect(heroSource).toContain("const canAdvanceProgress = !isMobileViewport || (seekReady && !video.seeking);");
    expect(heroSource).toContain("(isMobileViewport ? MOBILE_MAX_PROGRESS_SPEED : MAX_PROGRESS_SPEED)");
    expect(heroSource).toContain('window.scrollTo({ top: holdBoundary, left: 0, behavior: "auto" });');
    expect(heroSource).toContain("rawProgress >= 1 && !finalFrameReady");
    expect(heroSource).toContain('"final-copy"');
    expect(stylesheet).toContain("--hero-copy-progress");
    expect(stylesheet).toContain("touch-action: pan-y;");
    expect(stylesheet).toContain("--hero-runway: clamp(640px, 100svh, 820px);");
  });

  it("has poster, load-timeout, media-error, reduced-motion, and no-JavaScript fallbacks", () => {
    expect(htmlSource).toContain('rel="preload" as="image" href="/manus-storage/dm-labs-hero-tunnel-opening-poster_7b05ee6d.jpg"');
    expect(htmlSource).toContain('href="/manus-storage/dm-labs-mobile-hero-opening-poster_6fc35873.jpg" media="(max-width: 767px)"');
    expect(htmlSource).toContain('document.documentElement.classList.add("js")');
    expect(heroSource).toContain("window.setTimeout(activateFallback, 2500)");
    expect(heroSource).toContain('video.addEventListener("error", activateFallback, { once: true });');
    expect(heroSource).toContain('window.matchMedia("(prefers-reduced-motion: reduce)")');
    expect(heroSource).toContain('scope.dataset.mode = "fallback"');
    expect(stylesheet).toContain("@media (prefers-reduced-motion: reduce)");
    expect(stylesheet).toContain("opacity: 1 !important;");
  });
});
