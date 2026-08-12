import { chromium, devices } from "playwright";

const baseUrl = process.env.HERO_SCRUB_BASE_URL ?? "http://127.0.0.1:5173";

async function sample(page) {
  return page.evaluate(() => {
    const scope = document.querySelector(".hero-scrub-scope");
    const stage = document.querySelector(".hero-scrub-stage");
    const copy = document.querySelector(".hero-scrub-copy");
    const video = document.querySelector(".hero-scrub-video");
    if (!scope || !stage || !copy || !video) throw new Error("Hero elements missing");
    const stageRect = stage.getBoundingClientRect();
    return {
      y: window.scrollY,
      ready: scope.dataset.ready,
      released: scope.dataset.released,
      phase: scope.dataset.phase,
      progress: Number(getComputedStyle(scope).getPropertyValue("--hero-progress")),
      copyOpacity: Number(getComputedStyle(copy).opacity),
      stagePosition: getComputedStyle(stage).position,
      stageOpacity: Number(getComputedStyle(stage).opacity),
      stageTop: stageRect.top,
      videoTime: video.currentTime,
    };
  });
}

async function runScenario(name, contextOptions) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => document.querySelector(".hero-scrub-scope")?.dataset.ready === "true");

  const geometry = await page.evaluate(() => {
    const scope = document.querySelector(".hero-scrub-scope");
    const stage = document.querySelector(".hero-scrub-stage");
    if (!scope || !stage) throw new Error("Hero elements missing");
    return {
      start: Math.max(scope.getBoundingClientRect().top + window.scrollY - 72, 0),
      span: scope.offsetHeight - stage.offsetHeight,
    };
  });

  await page.evaluate(({ start, span }) => window.scrollTo(0, start + span * 0.85), geometry);
  await page.waitForFunction(() => document.querySelector(".hero-scrub-scope")?.dataset.phase === "final-copy");
  const finalCopy = await sample(page);

  await page.evaluate(({ start, span }) => window.scrollTo(0, start + span * 1.2), geometry);
  await page.waitForFunction(() => document.querySelector(".hero-scrub-scope")?.dataset.released === "true");
  const released = await sample(page);

  await page.evaluate(({ start, span }) => window.scrollTo(0, start + span * 0.45), geometry);
  const reverse = [];
  for (let index = 0; index < 12; index += 1) {
    await page.waitForTimeout(35);
    reverse.push(await sample(page));
  }

  await context.close();
  await browser.close();
  return { name, geometry, finalCopy, released, reverse };
}

const results = [];
results.push(await runScenario("desktop", { viewport: { width: 1280, height: 900 } }));
results.push(await runScenario("mobile", devices["Pixel 7"]));
console.log(JSON.stringify({ baseUrl, results }, null, 2));
