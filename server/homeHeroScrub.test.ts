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
  it("uses the supplied managed video and final-frame poster only on the English and Greek home heroes", () => {
    expect(heroSource).toContain('HERO_SCRUB_VIDEO_URL = "/manus-storage/dm-labs-hero-tunnel-scrub_89732dad.mp4"');
    expect(heroSource).toContain('HERO_SCRUB_POSTER_URL = "/manus-storage/dm-labs-hero-tunnel-poster_dff033fd.jpg"');
    expect(heroSource).toContain("poster={HERO_SCRUB_POSTER_URL}");
    expect(heroSource).toContain("muted");
    expect(heroSource).toContain("playsInline");
    expect(heroSource).toContain('preload="auto"');
    expect(heroSource).not.toContain("autoPlay");
    expect(heroSource).not.toContain("loop");
    expect(heroSource).not.toContain("controls");
    expect(homeSource).toContain("<HomeHeroScrub>");
    expect(homeElSource).toContain("<HomeHeroScrub>");
  });

  it("keeps the scrub runway compact while making the final hero copy centred and interactive only at the end", () => {
    expect(stylesheet).toContain('height: 100svh;');
    expect(stylesheet).toContain("display: flex;");
    expect(stylesheet).toContain("align-items: center;");
    expect(stylesheet).toContain("justify-content: center;");
    expect(stylesheet).toContain("text-align: center;");
    expect(heroSource).toContain("const REVEAL_START = 0.82;");
    expect(heroSource).toContain("const INTERACTION_START = 0.9;");
    expect(stylesheet).toContain('data-interactive="true"');
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
    expect(scrollHandler).not.toContain("video.currentTime =");
    expect(controller).toContain("MAX_PROGRESS_SPEED");
    expect(controller).toContain("video.seeking");
    expect(controller).toContain("seekReady = false;");
    expect(controller).toContain("video.currentTime = desiredTime;");
    expect(scrollHandler).toContain("scope.dataset.active = String(scopeRect.bottom > 0);");
    expect(heroSource).toContain('window.addEventListener("scroll", updateFromScroll, { passive: true });');
  });

  it("has poster, load-timeout, media-error, reduced-motion, and no-JavaScript fallbacks", () => {
    expect(htmlSource).toContain('rel="preload" as="image" href="/manus-storage/dm-labs-hero-tunnel-poster_dff033fd.jpg"');
    expect(htmlSource).toContain('document.documentElement.classList.add("js")');
    expect(heroSource).toContain("window.setTimeout(activateFallback, 2500)");
    expect(heroSource).toContain('video.addEventListener("error", activateFallback, { once: true });');
    expect(heroSource).toContain('window.matchMedia("(prefers-reduced-motion: reduce)")');
    expect(heroSource).toContain('scope.dataset.mode = "fallback"');
    expect(stylesheet).toContain("html.js .hero-scrub-scope[data-mode=\"scrub\"]");
    expect(stylesheet).toContain("@media (prefers-reduced-motion: reduce)");
  });
});
