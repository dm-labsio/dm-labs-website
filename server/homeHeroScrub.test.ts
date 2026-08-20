import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(serverDirectory, "..");
const heroSource = readFileSync(resolve(projectRoot, "client/src/components/HomeHeroScrub.tsx"), "utf8");
const heroStylesheet = readFileSync(resolve(projectRoot, "client/src/components/HomeHeroScrub.css"), "utf8");
const homeSource = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const homeElSource = readFileSync(resolve(projectRoot, "client/src/pages/el/HomeEl.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");
const htmlSource = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");

describe("homepage single-stage scroll-scrub hero", () => {
  it("uses the supplied desktop and mobile Vercel Blob videos with responsive local opening posters only on the English and Greek home heroes", () => {
    expect(heroSource).toContain('HERO_SCRUB_VIDEO_URL = "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm-labs-hero-tunnel-scrub_89732dad.mp4"');
    expect(heroSource).toContain('HERO_SCRUB_OPENING_POSTER_URL = "/media/hero/dm-labs-hero-tunnel-opening-poster_7b05ee6d.webp"');
    expect(heroSource).toContain('MOBILE_HERO_SCRUB_VIDEO_URL = "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm-labs-mobile-hero-scrub-fluid_658e00fd.mp4"');
    expect(heroSource).toContain('MOBILE_HERO_SCRUB_OPENING_POSTER_URL = "/media/hero/dm-labs-mobile-hero-opening-poster_6fc35873.webp"');
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

  it("keeps one persistent hero layer through hold, natural-flow release, and reverse re-entry", () => {
    expect(heroSource).toContain('className="hero-scrub-stage"');
    expect(heroSource).toContain('className="hero-scrub-copy"');
    expect(heroSource).not.toContain('className="hero-scrub-spacer"');
    expect(heroSource).not.toContain('className="hero-scrub-flow"');
    expect(stylesheet).toContain("--hero-runway: clamp(520px, 75svh, 760px);");
    expect(stylesheet).toContain("height: calc(100svh - 72px + var(--hero-runway));");
    expect(heroStylesheet).toContain("position: fixed !important;");
    expect(heroStylesheet).toContain('data-released="true"');
    expect(heroStylesheet).toContain("position: absolute !important;");
    expect(heroStylesheet).toContain("opacity: 1;");
    expect(heroStylesheet).toContain("pointer-events: auto;");
    expect(stylesheet).toContain(".hero-scrub-copy {");
    expect(stylesheet).toContain("display: flex;");
    expect(stylesheet).toContain("align-items: center;");
    expect(stylesheet).toContain("justify-content: center;");
    expect(stylesheet).toContain("text-align: center;");
  });

  it("uses one continuous late-reveal, readable-hold, and reversible release timeline", () => {
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
    expect(heroSource).toContain("const MOBILE_VIDEO_OPENING_PROGRESS = 0.05;");
    expect(heroSource).toContain("const VIDEO_SCRUB_END = 0.6;");
    expect(heroSource).toContain("const COPY_REVEAL_START = 0.66;");
    expect(heroSource).toContain("const COPY_REVEAL_END = 0.8;");
    expect(heroSource).toContain("scope.dataset.interactive = String(progress >= COPY_INTERACTIVE_START);");
    expect(heroSource).toContain("const FINAL_FRAME_TOLERANCE = 1 / 30;");
    expect(heroSource).toContain("const finalFrameVisible =");
    expect(heroSource).toContain("let finalFrameReady = false;");
    expect(heroSource).toContain("released = progress >= 1 && finalFrameReady;");
    expect(heroSource).toContain("if (finalFrameVisible && !finalFrameReady) {");
    expect(heroSource).toContain('scope.dataset.finalReady = "true";');
    expect(heroSource).toContain("applyVisualProgress(scrollProgress);");
    expect(heroSource).not.toContain("releaseArmed");
    expect(heroSource).not.toContain("finalBoundaryReached");
    expect(heroSource).not.toContain("RELEASE_REARM_PROGRESS");
    expect(heroSource).not.toContain("applyRenderedProgress");
    expect(heroSource).toContain('const MOBILE_VIEWPORT_QUERY = "(max-width: 767px)";');
    expect(heroSource).toContain("const MOBILE_MAX_PROGRESS_SPEED = 0.5;");
    expect(heroSource).toContain("const MOBILE_SEEK_TOLERANCE = 1 / 24;");
    expect(heroSource).toContain("const progressElapsedSeconds = isMobileViewport ? Math.min(elapsedSeconds, 1 / 30) : elapsedSeconds;");
    expect(heroSource).toContain("const canAdvanceProgress = !isMobileViewport || (seekReady && !video.seeking);");
    expect(heroSource).toContain('const isHebrewMobile = isMobileViewport && variant === "hebrew";');
    expect(heroSource).toContain("const HEBREW_MOBILE_MAX_PROGRESS_SPEED = 0.42;");
    expect(heroSource).toContain("(isHebrewMobile ? HEBREW_MOBILE_MAX_PROGRESS_SPEED : isMobileViewport ? MOBILE_MAX_PROGRESS_SPEED : MAX_PROGRESS_SPEED)");
    expect(heroSource).toContain('window.scrollTo({ top: holdBoundary, left: 0, behavior: "auto" });');
    expect(heroSource).toContain("rawProgress >= 1 && !finalFrameReady");
    expect(stylesheet).toContain("--hero-copy-progress: 0;");
    expect(stylesheet).toContain("transition: opacity 180ms cubic-bezier(0.23, 1, 0.32, 1), transform 220ms cubic-bezier(0.23, 1, 0.32, 1);");
    expect(stylesheet).toContain("touch-action: pan-y;");
    expect(stylesheet).toContain("--hero-runway: clamp(640px, 100svh, 820px);");
  });

  it("starts without a copy flash and retains poster, timeout, error, reduced-motion, and no-JavaScript fallbacks", () => {
    expect(htmlSource).toContain('rel="preload" as="image" href="/media/hero/dm-labs-hero-tunnel-opening-poster_7b05ee6d.webp"');
    expect(htmlSource).toContain('href="/media/hero/dm-labs-mobile-hero-opening-poster_6fc35873.webp" media="(max-width: 767px)"');
    expect(htmlSource).toContain('document.documentElement.classList.add("js")');
    expect(heroSource).toContain("window.setTimeout(activateFallback, isHebrewMobile ? 2800 : 2500)");
    expect(heroSource).toContain("const openingTime = duration * openingProgress;");
    expect(heroSource).toContain("if (!initialFrameReady) {");
    expect(heroSource).toContain('video.addEventListener("error", activateFallback, { once: true });');
    expect(heroSource).toContain('window.matchMedia("(prefers-reduced-motion: reduce)")');
    expect(heroSource).toContain('scope.dataset.mode = "fallback"');
    expect(stylesheet).toContain("@media (prefers-reduced-motion: reduce)");
    expect(stylesheet).toContain("opacity: 1 !important;");
  });
});
