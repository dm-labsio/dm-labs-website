import { chromium, devices, webkit } from "playwright";

const baseUrl = process.env.HERO_SCRUB_BASE_URL ?? "http://127.0.0.1:5173";
const failures = [];
const results = [];

async function inspectScenario({ name, browserType = chromium, contextOptions, reducedMotion = "no-preference" }) {
  const browser = await browserType.launch({ headless: true });
  const context = await browser.newContext({ ...contextOptions, reducedMotion });
  const page = await context.newPage();
  const consoleErrors = [];
  let releaseState = null;
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
      const stage = document.querySelector(".hero-scrub-stage");
      if (!stage) throw new Error("Missing hero stage");
      const scrollSpan = scope.offsetHeight - stage.offsetHeight;
      const scrubStart = Math.max(scope.getBoundingClientRect().top + window.scrollY - 72, 0);
      window.scrollTo(0, scrubStart + scrollSpan * 1.6);
    });
    await page.waitForFunction(() => {
      const scope = document.querySelector(".hero-scrub-scope");
      const video = document.querySelector(".hero-scrub-video");
      return scope && video && scope.dataset.phase === "final-hold" && scope.dataset.released === "false" && video.currentTime >= video.duration - (1 / 30);
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
      released: scope.dataset.released,
      phase: scope.dataset.phase,
      progress: getComputedStyle(scope).getPropertyValue("--hero-progress").trim(),
      copyOpacity: getComputedStyle(copy).opacity,
      stageDisplay: getComputedStyle(stage).display,
      stagePosition: getComputedStyle(stage).position,
      videoTime: video.currentTime,
      duration: video.duration,
      scopeBottom: scope.getBoundingClientRect().bottom,
      headingRect: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom },
      stageRect: stage.getBoundingClientRect().toJSON(),
      viewport: { width: innerWidth, height: innerHeight },
    };
  });

  if (reducedMotion !== "reduce") {
    await page.waitForTimeout(1200);
    releaseState = await page.evaluate(() => {
      const scope = document.querySelector(".hero-scrub-scope");
      const stage = document.querySelector(".hero-scrub-stage");
      return {
        released: scope?.dataset.released,
        phase: scope?.dataset.phase,
        stagePosition: stage ? getComputedStyle(stage).position : null,
      };
    });
  }

  await page.screenshot({ path: `/home/ubuntu/${name}-hero-scrub.png` });
  await context.close();

  const visible = state.headingRect.left >= 0 && state.headingRect.right <= state.viewport.width && state.headingRect.top >= 0 && state.headingRect.bottom <= state.viewport.height;
  const pass = reducedMotion === "reduce"
    ? state.mode === "fallback" && state.copyOpacity === "1" && visible
    : state.mode === "scrub" && state.released === "false" && state.phase === "final-hold" && state.stageDisplay !== "none" && state.stagePosition === "fixed" && Number(state.progress) >= 1 && state.copyOpacity === "1" && state.videoTime >= state.duration - (1 / 30) && state.scopeBottom > 0 && visible && releaseState?.released === "true" && releaseState?.phase === "released" && releaseState?.stagePosition === "absolute";

  results.push({ name, pass, state, releaseState, consoleErrors });
  if (!pass) failures.push(`${name} visual state did not meet the required hero constraints`);
  if (consoleErrors.length) failures.push(`${name} reported console errors: ${consoleErrors.join(" | ")}`);
  await browser.close();
}

await inspectScenario({ name: "desktop", contextOptions: { viewport: { width: 1280, height: 900 } } });
await inspectScenario({ name: "iphone-webkit", browserType: webkit, contextOptions: devices["iPhone 13"] });
await inspectScenario({ name: "galaxy-android", contextOptions: {
  viewport: { width: 360, height: 800 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  userAgent: "Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Mobile Safari/537.36",
} });
await inspectScenario({ name: "reduced-motion", contextOptions: { viewport: { width: 1280, height: 900 } }, reducedMotion: "reduce" });
console.log(JSON.stringify({ baseUrl, results }, null, 2));
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
