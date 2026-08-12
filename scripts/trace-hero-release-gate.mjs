import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(process.env.HERO_SCRUB_BASE_URL ?? "http://127.0.0.1:5173", { waitUntil: "networkidle" });
await page.waitForFunction(() => document.querySelector(".hero-scrub-scope")?.dataset.ready === "true");

const scrollToProgress = async (progress) => {
  await page.evaluate((nextProgress) => {
    const scope = document.querySelector(".hero-scrub-scope");
    const stage = document.querySelector(".hero-scrub-stage");
    const span = scope.offsetHeight - stage.offsetHeight;
    const start = Math.max(scope.getBoundingClientRect().top + window.scrollY - 72, 0);
    window.scrollTo(0, start + span * nextProgress);
  }, progress);
  await page.waitForTimeout(250);
  return page.evaluate(() => {
    const scope = document.querySelector(".hero-scrub-scope");
    const stage = document.querySelector(".hero-scrub-stage");
    return {
      scrollY: window.scrollY,
      progress: getComputedStyle(scope).getPropertyValue("--hero-progress").trim(),
      phase: scope.dataset.phase,
      released: scope.dataset.released,
      finalReady: scope.dataset.finalReady,
      stageOpacity: Number(getComputedStyle(stage).opacity),
    };
  });
};

const states = [];
states.push({ at: 0.85, ...(await scrollToProgress(0.85)) });
await page.waitForFunction(() => document.querySelector(".hero-scrub-scope")?.dataset.finalReady === "true");
states.push({ at: 1, ...(await scrollToProgress(1)) });
states.push({ at: 1.08, ...(await scrollToProgress(1.08)) });
states.push({ at: 1.16, ...(await scrollToProgress(1.16)) });
console.log(JSON.stringify(states, null, 2));
await browser.close();
