import { chromium } from "playwright";

const baseUrl = process.env.PROCESS_EDITORIAL_BASE_URL ?? "http://127.0.0.1:5173";
const scenarios = [
  { name: "desktop", width: 1440, height: 960, reducedMotion: "no-preference" },
  { name: "mobile", width: 390, height: 844, reducedMotion: "no-preference" },
  { name: "reduced-motion", width: 390, height: 844, reducedMotion: "reduce" },
];

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const scenario of scenarios) {
    const page = await browser.newPage({ viewport: { width: scenario.width, height: scenario.height } });
    await page.emulateMedia({ reducedMotion: scenario.reducedMotion });
    await page.goto(`${baseUrl}/process/`, { waitUntil: "networkidle" });
    await page.waitForSelector(".process-editorial");

    const result = await page.evaluate(({ reducedMotion }) => {
      const root = document.querySelector(".process-editorial");
      const heading = document.querySelector(".process-editorial-hero-heading");
      const rail = document.querySelector(".process-editorial-rail");
      const step = document.querySelector(".process-editorial-step");
      const rootRect = root?.getBoundingClientRect();
      const headingRect = heading?.getBoundingClientRect();
      const railStyle = rail ? getComputedStyle(rail) : null;
      const stepStyle = step ? getComputedStyle(step) : null;

      return {
        hasRoot: Boolean(root),
        hasHeading: Boolean(heading),
        hasRail: Boolean(rail),
        hasFiveSteps: document.querySelectorAll(".process-editorial-step").length === 5,
        hasThreeTimelineCards: document.querySelectorAll(".process-editorial-timeline-card").length === 3,
        noHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth,
        headingContained: Boolean(rootRect && headingRect && headingRect.left >= rootRect.left - 1 && headingRect.right <= rootRect.right + 1),
        railAnimation: railStyle?.animationName ?? "",
        stepTransition: stepStyle?.transitionDuration ?? "",
        reducedMotion,
      };
    }, scenario);

    if (!result.hasRoot || !result.hasHeading || !result.hasRail || !result.hasFiveSteps || !result.hasThreeTimelineCards) {
      throw new Error(`${scenario.name}: Process editorial structure is incomplete`);
    }
    if (!result.noHorizontalOverflow || !result.headingContained) {
      throw new Error(`${scenario.name}: Process typography overflow detected`);
    }
    if (scenario.reducedMotion === "no-preference" && result.railAnimation !== "process-editorial-rail-flow") {
      throw new Error(`${scenario.name}: Expected subtle rail animation is not active`);
    }
    if (scenario.reducedMotion === "reduce" && result.railAnimation !== "none") {
      throw new Error(`${scenario.name}: Reduced-motion rail must not animate`);
    }

    results.push({ scenario: scenario.name, ...result });
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify({ ok: true, results }, null, 2));
