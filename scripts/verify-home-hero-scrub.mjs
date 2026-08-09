import { chromium } from "playwright";

const baseUrl = process.env.HERO_SCRUB_BASE_URL ?? "http://127.0.0.1:5173";
const browser = await chromium.launch({ headless: true });
const failures = [];
const results = [];

async function inspectScenario({ name, viewport, reducedMotion = "no-preference" }) {
  const context = await browser.newContext({ viewport, reducedMotion });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.waitForSelector(".hero-scrub-scope");

  if (reducedMotion === "reduce") {
    await page.waitForFunction(() => document.querySelector(".hero-scrub-scope")?.dataset.mode === "fallback");
  } else {
    await page.waitForFunction(() => document.querySelector(".hero-scrub-scope")?.dataset.ready === "true");
    await page.evaluate(() => {
      const scope = document.querySelector(".hero-scrub-scope");
      if (!scope) throw new Error("Missing hero scope");
      window.scrollTo(0, scope.getBoundingClientRect().top + window.scrollY + scope.offsetHeight - 2);
    });
    await page.waitForFunction(() => {
      const scope = document.querySelector(".hero-scrub-scope");
      const video = document.querySelector(".hero-scrub-video");
      return scope && video && getComputedStyle(scope).getPropertyValue("--hero-copy-progress").trim() === "1.0000" && video.currentTime > 5.7;
    });
  }

  const state = await page.evaluate(() => {
    const scope = document.querySelector(".hero-scrub-scope");
    const stage = document.querySelector(".hero-scrub-stage");
    const copy = document.querySelector(".hero-scrub-copy");
    const h1 = document.querySelector(".hero-scrub-copy h1");
    const video = document.querySelector(".hero-scrub-video");
    if (!scope || !stage || !copy || !h1 || !video) throw new Error("Hero elements missing");
    const rect = h1.getBoundingClientRect();
    return {
      mode: scope.dataset.mode,
      active: scope.dataset.active,
      progress: getComputedStyle(scope).getPropertyValue("--hero-progress").trim(),
      copyProgress: getComputedStyle(scope).getPropertyValue("--hero-copy-progress").trim(),
      copyOpacity: getComputedStyle(copy).opacity,
      videoDisplay: getComputedStyle(video).display,
      videoTime: video.currentTime,
      duration: video.duration,
      headingRect: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom },
      stageRect: stage.getBoundingClientRect().toJSON(),
      viewport: { width: innerWidth, height: innerHeight },
    };
  });

  await page.screenshot({ path: `/home/ubuntu/${name}-hero-scrub.png` });
  await context.close();

  const visible = state.headingRect.left >= 0 && state.headingRect.right <= state.viewport.width && state.headingRect.top >= 0 && state.headingRect.bottom <= state.viewport.height;
  const pass = reducedMotion === "reduce"
    ? state.mode === "fallback" && state.copyOpacity === "1" && state.videoDisplay === "none" && visible
    : state.mode === "scrub" && state.active === "true" && state.progress === "1.0000" && state.copyProgress === "1.0000" && state.copyOpacity === "1" && state.videoTime > state.duration * 0.95 && visible;

  results.push({ name, pass, state, consoleErrors });
  if (!pass) failures.push(`${name} visual state did not meet the required hero constraints`);
  if (consoleErrors.length) failures.push(`${name} reported console errors: ${consoleErrors.join(" | ")}`);
}

await inspectScenario({ name: "desktop", viewport: { width: 1280, height: 900 } });
await inspectScenario({ name: "mobile", viewport: { width: 375, height: 812 } });
await inspectScenario({ name: "reduced-motion", viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });

await browser.close();
console.log(JSON.stringify({ baseUrl, results }, null, 2));
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
