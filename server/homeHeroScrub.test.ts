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

describe("homepage short scroll-scrub hero", () => {
  it("uses the supplied managed video and visible opening poster only on the English and Greek home heroes", () => {
    expect(heroSource).toContain('HERO_SCRUB_VIDEO_URL = "/manus-storage/dm-labs-hero-tunnel-scrub_89732dad.mp4"');
    expect(heroSource).toContain('HERO_SCRUB_OPENING_POSTER_URL = "/manus-storage/dm-labs-hero-tunnel-opening-poster_7b05ee6d.jpg"');
    expect(heroSource).toContain("poster={HERO_SCRUB_OPENING_POSTER_URL}");
    expect(heroSource).toContain("muted");
    expect(heroSource).toContain("playsInline");
    expect(heroSource).toContain('preload="auto"');
    expect(heroSource).not.toContain("autoPlay");
    expect(heroSource).not.toContain("loop");
    expect(heroSource).not.toContain("controls");
    expect(homeSource).toContain("<HomeHeroScrub>");
    expect(homeElSource).toContain("<HomeHeroScrub>");
  });

  it("hands the completed video into a centred, normal-flow hero before the trust strip", () => {
    expect(heroSource).toContain('className="hero-scrub-spacer"');
    expect(heroSource).toContain('className="hero-scrub-flow"');
    expect(heroSource).toContain('className="hero-scrub-flow-content"');
    expect(stylesheet).toContain(".hero-scrub-spacer {");
    expect(stylesheet).toContain("height: calc(100svh - 72px);");
    expect(stylesheet).toContain(".hero-scrub-flow {");
    expect(stylesheet).toContain("min-height: calc(100svh - 72px);");
    expect(stylesheet).toContain("display: flex;");
    expect(stylesheet).toContain("align-items: center;");
    expect(stylesheet).toContain("justify-content: center;");
    expect(stylesheet).toContain("text-align: center;");
    expect(heroSource).toContain("const VIDEO_COMPLETE_PROGRESS = 0.999;");
    expect(heroSource).toContain("scope.dataset.flowActive");
    expect(stylesheet).toContain('data-flow-active="true"');
  });

  it("records only a target in the scroll handler and uses a guarded rAF seek controller with a bounded speed", () => {
    const scrollStart = heroSource.indexOf("const updateFromScroll = () => {");
    const scrollEnd = heroSource.indexOf("const onSeeked = () => {");
    const controllerStart = heroSource.indexOf("const runController = (now: number) => {");
    const controllerEnd = heroSource.indexOf("const updateFromScroll = () => {");

    expect(scrollStart).toBeGreaterThan(-1);
    expect(scrollEnd).toBeGreaterThan(scrollStart);
    expect(controllerStart).toBeGreaterThan(-1);
    expect(controllerEnd).toBeGreaterThan(controllerStart);

    const scrollHandler = heroSource.slice(scrollStart, scrollEnd);
    const controller = heroSource.slice(controllerStart, controllerEnd);

    expect(scrollHandler).toContain("targetProgress = clamp");
    expect(scrollHandler).toContain("stage.offsetHeight");
    expect(scrollHandler).not.toContain("video.currentTime =");
    expect(controller).toContain("MAX_PROGRESS_SPEED");
    expect(controller).toContain("video.seeking");
    expect(controller).toContain("seekReady = false;");
    expect(controller).toContain("video.currentTime = desiredTime;");
    expect(heroSource).toContain("scope.dataset.active = String(progress < VIDEO_COMPLETE_PROGRESS);");
    expect(heroSource).toContain("scope.dataset.flowActive = String(progress >= VIDEO_COMPLETE_PROGRESS);");
    expect(heroSource).toContain('window.addEventListener("scroll", updateFromScroll, { passive: true });');
  });

  it("has poster, load-timeout, media-error, reduced-motion, and no-JavaScript fallbacks", () => {
    expect(htmlSource).toContain('rel="preload" as="image" href="/manus-storage/dm-labs-hero-tunnel-opening-poster_7b05ee6d.jpg"');
    expect(htmlSource).toContain('document.documentElement.classList.add("js")');
    expect(heroSource).toContain("window.setTimeout(activateFallback, 2500)");
    expect(heroSource).toContain('video.addEventListener("error", activateFallback, { once: true });');
    expect(heroSource).toContain('window.matchMedia("(prefers-reduced-motion: reduce)")');
    expect(heroSource).toContain('scope.dataset.mode = "fallback"');
    expect(stylesheet).toContain('html:not(.js) .hero-scrub-stage');
    expect(stylesheet).toContain('.hero-scrub-scope[data-mode="fallback"] .hero-scrub-stage');
    expect(stylesheet).toContain("html.js .hero-scrub-scope[data-mode=\"scrub\"]");
    expect(stylesheet).toContain("@media (prefers-reduced-motion: reduce)");
  });
});
