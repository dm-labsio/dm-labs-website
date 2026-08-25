import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(serverDirectory, "..");
const heroSource = readFileSync(resolve(projectRoot, "client/src/components/HomeHeroScrub.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");
const homeSource = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const homeElSource = readFileSync(resolve(projectRoot, "client/src/pages/el/HomeEl.tsx"), "utf8");

describe("homepage Hero media behavior", () => {
  it("uses an immediate static mobile Hero in every locale", () => {
    expect(heroSource).toContain('const isStaticMobile = isMobileViewport && scope.dataset.mobileHero === "static";');
    expect(heroSource).toContain("if (isStaticMobile) {");
    expect(heroSource).toContain('scope.dataset.mode = "static";');
    expect(heroSource).toContain('scope.dataset.video = "none";');
    expect(heroSource).toContain('scope.style.setProperty("--hero-copy-progress", "1");');
    expect(heroSource).toContain('data-mobile-hero="static"');
    expect(heroSource).not.toContain('<source media={MOBILE_VIEWPORT_QUERY} src={MOBILE_HERO_SCRUB_VIDEO_URL} type="video/mp4" />');
    expect(heroSource).not.toContain("video.src = MOBILE_HERO_SCRUB_VIDEO_URL;");
  });

  it("keeps the existing video scrub available only on desktop", () => {
    expect(heroSource).toContain('HERO_SCRUB_VIDEO_URL = "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dm-labs-hero-tunnel-scrub_89732dad.mp4"');
    expect(heroSource).toContain('<source media="(min-width: 768px)" src={HERO_SCRUB_VIDEO_URL} type="video/mp4" />');
    expect(heroSource).toContain("const updateFromScroll = () => {");
    expect(heroSource).toContain("video.currentTime = desiredTime;");
    expect(homeSource).toContain("<HomeHeroScrub>");
    expect(homeElSource).toContain("<HomeHeroScrub>");
  });

  it("renders the static mobile Hero before JavaScript effects run", () => {
    expect(stylesheet).toContain('html.js .hero-scrub-scope[data-mobile-hero="static"] {');
    expect(stylesheet).toContain('html.js .hero-scrub-scope[data-mobile-hero="static"] .hero-scrub-stage');
    expect(stylesheet).toContain('html.js .hero-scrub-scope[data-mobile-hero="static"] .hero-scrub-copy');
    expect(stylesheet).toContain("height: auto;");
    expect(stylesheet).toContain("opacity: 1;");
    expect(stylesheet).toContain("pointer-events: auto;");
  });
});
