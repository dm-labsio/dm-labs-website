import { chromium, devices, webkit } from "playwright";

const baseUrl = process.env.HERO_SCRUB_BASE_URL ?? "http://127.0.0.1:5173";
const failures = [];
const results = [];

async function inspectScenario({ name, browserType = chromium, contextOptions, reducedMotion = "no-preference" }) {
  const browser = await browserType.launch({ headless: true });
  const context = await browser.newContext({ ...contextOptions, reducedMotion });
  const consoleErrors = [];
  let releaseState = null;
  let reverseState = null;
  let repeatReleaseState = null;
  let mobileProgression = null;
  let startupState = null;
  let lateRevealState = null;
  let boundaryHoldState = null;
  const expectsMobileScrub = Boolean(contextOptions?.isMobile);

  const startupPage = await context.newPage();
  await startupPage.route("**/*hero*scrub*.mp4", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    await route.continue();
  });
  await startupPage.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
  await startupPage.waitForSelector(".hero-scrub-scope");
  startupState = await startupPage.evaluate(() => {
    const scope = document.querySelector(".hero-scrub-scope");
    const copy = document.querySelector(".hero-scrub-copy");
    if (!scope || !copy) throw new Error("Hero startup elements missing");
    return {
      ready: scope.dataset.ready,
      phase: scope.dataset.phase,
      copyOpacity: Number(getComputedStyle(copy).opacity),
    };
  });
  await startupPage.close();

  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.waitForSelector(".hero-scrub-scope");

  const scrollToProgress = async (progress) => {
    await page.evaluate((nextProgress) => {
      const scope = document.querySelector(".hero-scrub-scope");
      const stage = document.querySelector(".hero-scrub-stage");
      if (!scope || !stage) throw new Error("Hero elements missing for transition check");
      const span = scope.offsetHeight - stage.offsetHeight;
      const start = Math.max(scope.getBoundingClientRect().top + window.scrollY - 72, 0);
      window.scrollTo(0, start + span * nextProgress);
    }, progress);
  };

  if (reducedMotion === "reduce") {
    await page.waitForFunction(() => document.querySelector(".hero-scrub-scope")?.dataset.mode === "fallback");
  } else {
    await page.waitForFunction(() => document.querySelector(".hero-scrub-scope")?.dataset.ready === "true");
    if (expectsMobileScrub) {
      await page.locator(".hero-scrub-stage").tap({ position: { x: 12, y: 12 } });
      const snapshots = [];
      for (const progress of [0.08, 0.16, 0.24, 0.32, 0.4, 0.5]) {
        const previousTime = snapshots.at(-1);
        await page.evaluate((nextProgress) => {
          const scope = document.querySelector(".hero-scrub-scope");
          const stage = document.querySelector(".hero-scrub-stage");
          if (!scope || !stage) throw new Error("Mobile hero elements missing for progression check");
          const span = scope.offsetHeight - stage.offsetHeight;
          const start = Math.max(scope.getBoundingClientRect().top + window.scrollY - 72, 0);
          window.scrollTo(0, start + span * nextProgress);
        }, progress);
        if (previousTime === undefined) {
          await page.waitForTimeout(120);
        } else {
          await page.waitForFunction((lastTime) => {
            const video = document.querySelector(".hero-scrub-video");
            return video && Math.abs(video.currentTime - lastTime) >= 1 / 100;
          }, previousTime, { timeout: 1200 });
        }
        snapshots.push(await page.$eval(".hero-scrub-video", (video) => video.currentTime));
      }
      mobileProgression = {
        snapshots,
        uniqueFrames: new Set(snapshots.map((time) => time.toFixed(3))).size,
        maxStep: Math.max(...snapshots.slice(1).map((time, index) => time - snapshots[index]), 0),
      };
    }

    await scrollToProgress(0.75);
    await page.waitForFunction(() => {
      const scope = document.querySelector(".hero-scrub-scope");
      const copy = document.querySelector(".hero-scrub-copy");
      const opacity = copy ? Number(getComputedStyle(copy).opacity) : 0;
      return scope?.dataset.phase === "copy-reveal" && scope?.dataset.released === "false" && opacity >= 0.4 && opacity <= 0.65;
    });
    lateRevealState = await page.evaluate(() => {
      const scope = document.querySelector(".hero-scrub-scope");
      const copy = document.querySelector(".hero-scrub-copy");
      return {
        released: scope?.dataset.released,
        phase: scope?.dataset.phase,
        copyOpacity: copy ? Number(getComputedStyle(copy).opacity) : null,
      };
    });

    await scrollToProgress(0.85);
    await page.waitForFunction(() => {
      const scope = document.querySelector(".hero-scrub-scope");
      const video = document.querySelector(".hero-scrub-video");
      const copy = document.querySelector(".hero-scrub-copy");
      return scope && video && copy && scope.dataset.phase === "final-copy" && scope.dataset.released === "false" && video.currentTime >= video.duration - (1 / 30) && Number(getComputedStyle(copy).opacity) >= 0.98;
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
      finalReady: scope.dataset.finalReady,
      progress: getComputedStyle(scope).getPropertyValue("--hero-progress").trim(),
      copyOpacity: getComputedStyle(copy).opacity,
      stageDisplay: getComputedStyle(stage).display,
      stagePosition: getComputedStyle(stage).position,
      stageOpacity: Number(getComputedStyle(stage).opacity),
      videoTime: video.currentTime,
      duration: video.duration,
      videoSource: video.currentSrc,
      scopeBottom: scope.getBoundingClientRect().bottom,
      headingRect: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom },
      viewport: { width: innerWidth, height: innerHeight },
    };
  });

  if (reducedMotion !== "reduce") {
    await scrollToProgress(1);
    await page.waitForFunction(() => {
      const scope = document.querySelector(".hero-scrub-scope");
      const stage = document.querySelector(".hero-scrub-stage");
      const copy = document.querySelector(".hero-scrub-copy");
      return scope?.dataset.finalReady === "true" && scope?.dataset.released === "false" && stage && copy && Number(getComputedStyle(stage).opacity) >= 0.98 && Number(getComputedStyle(copy).opacity) >= 0.98;
    });
    boundaryHoldState = await page.evaluate(() => {
      const scope = document.querySelector(".hero-scrub-scope");
      const stage = document.querySelector(".hero-scrub-stage");
      const copy = document.querySelector(".hero-scrub-copy");
      return {
        released: scope?.dataset.released,
        phase: scope?.dataset.phase,
        finalReady: scope?.dataset.finalReady,
        stageOpacity: stage ? Number(getComputedStyle(stage).opacity) : null,
        copyOpacity: copy ? Number(getComputedStyle(copy).opacity) : null,
      };
    });

    await scrollToProgress(1.08);
    await page.waitForFunction(() => {
      const scope = document.querySelector(".hero-scrub-scope");
      const stage = document.querySelector(".hero-scrub-stage");
      return scope?.dataset.released === "true" && stage && Number(getComputedStyle(stage).opacity) <= 0.02;
    });
    releaseState = await page.evaluate(() => {
      const scope = document.querySelector(".hero-scrub-scope");
      const stage = document.querySelector(".hero-scrub-stage");
      return {
        released: scope?.dataset.released,
        phase: scope?.dataset.phase,
        stagePosition: stage ? getComputedStyle(stage).position : null,
        stageTop: stage?.getBoundingClientRect().top,
        stageOpacity: stage ? Number(getComputedStyle(stage).opacity) : null,
      };
    });

    await scrollToProgress(0.85);
    await page.waitForFunction(() => {
      const scope = document.querySelector(".hero-scrub-scope");
      const stage = document.querySelector(".hero-scrub-stage");
      return scope?.dataset.phase === "final-copy" && stage && Number(getComputedStyle(stage).opacity) >= 0.98;
    });
    reverseState = await page.evaluate(() => {
      const scope = document.querySelector(".hero-scrub-scope");
      const stage = document.querySelector(".hero-scrub-stage");
      return {
        released: scope?.dataset.released,
        phase: scope?.dataset.phase,
        stagePosition: stage ? getComputedStyle(stage).position : null,
        stageTop: stage?.getBoundingClientRect().top,
        stageOpacity: stage ? Number(getComputedStyle(stage).opacity) : null,
        scopeBottom: scope?.getBoundingClientRect().bottom,
      };
    });

    await scrollToProgress(1);
    await page.waitForFunction(() => document.querySelector(".hero-scrub-scope")?.dataset.released === "false");
    await scrollToProgress(1.08);
    await page.waitForFunction(() => {
      const scope = document.querySelector(".hero-scrub-scope");
      const stage = document.querySelector(".hero-scrub-stage");
      return scope?.dataset.released === "true" && stage && Number(getComputedStyle(stage).opacity) <= 0.02;
    });
    repeatReleaseState = await page.evaluate(() => {
      const scope = document.querySelector(".hero-scrub-scope");
      const stage = document.querySelector(".hero-scrub-stage");
      return {
        released: scope?.dataset.released,
        phase: scope?.dataset.phase,
        stagePosition: stage ? getComputedStyle(stage).position : null,
        stageOpacity: stage ? Number(getComputedStyle(stage).opacity) : null,
      };
    });
  }

  const visible = state.headingRect.left >= 0 && state.headingRect.right <= state.viewport.width && state.headingRect.top >= 0 && state.headingRect.bottom <= state.viewport.height;
  const flashFreeStartup = reducedMotion === "reduce" || (startupState?.ready === "false" && startupState?.copyOpacity === 0);
  const pass = reducedMotion === "reduce"
    ? state.mode === "fallback" && state.copyOpacity === "1" && visible
    : flashFreeStartup && lateRevealState?.released === "false" && lateRevealState?.phase === "copy-reveal" && lateRevealState?.copyOpacity >= 0.4 && lateRevealState?.copyOpacity <= 0.65 && state.mode === "scrub" && state.released === "false" && state.phase === "final-copy" && state.finalReady === "true" && state.stageDisplay !== "none" && state.stagePosition === "fixed" && state.stageOpacity >= 0.98 && Number(state.progress) >= 0.8 && Number(state.copyOpacity) >= 0.98 && state.videoTime >= state.duration - (1 / 30) && state.scopeBottom > 0 && visible && boundaryHoldState?.released === "false" && boundaryHoldState?.phase === "final-copy" && boundaryHoldState?.finalReady === "true" && boundaryHoldState?.stageOpacity >= 0.98 && boundaryHoldState?.copyOpacity >= 0.98 && (expectsMobileScrub ? state.videoSource.includes("dm-labs-mobile-hero-scrub-fluid_658e00fd.mp4") && mobileProgression?.uniqueFrames >= 4 && mobileProgression?.maxStep <= 0.35 : state.videoSource.includes("dm-labs-hero-tunnel-scrub_89732dad.mp4")) && releaseState?.released === "true" && releaseState?.phase === "released" && releaseState?.stagePosition === "fixed" && releaseState?.stageOpacity <= 0.02 && Math.abs((releaseState?.stageTop ?? 0) - 72) <= 1 && reverseState?.released === "false" && reverseState?.phase === "final-copy" && reverseState?.stagePosition === "fixed" && reverseState?.stageOpacity >= 0.98 && Math.abs((reverseState?.stageTop ?? 0) - 72) <= 1 && reverseState?.scopeBottom > 0 && repeatReleaseState?.released === "true" && repeatReleaseState?.stagePosition === "fixed" && repeatReleaseState?.stageOpacity <= 0.02;

  results.push({ name, pass, startupState, lateRevealState, state, mobileProgression, boundaryHoldState, releaseState, reverseState, repeatReleaseState, consoleErrors });
  if (!pass) failures.push(`${name} visual state did not meet the required hero constraints`);
  if (consoleErrors.length) failures.push(`${name} reported console errors: ${consoleErrors.join(" | ")}`);
  await context.close();
  await browser.close();
}

await inspectScenario({ name: "desktop", contextOptions: { viewport: { width: 1280, height: 900 } } });
await inspectScenario({ name: "iphone-webkit", browserType: webkit, contextOptions: devices["iPhone 13"] });
await inspectScenario({
  name: "galaxy-android",
  contextOptions: {
    viewport: { width: 360, height: 800 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: "Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Mobile Safari/537.36",
  },
});
await inspectScenario({ name: "reduced-motion", contextOptions: { viewport: { width: 1280, height: 900 } }, reducedMotion: "reduce" });

console.log(JSON.stringify({ baseUrl, results }, null, 2));
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
