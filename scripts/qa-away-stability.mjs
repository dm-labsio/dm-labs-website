import { chromium } from "playwright";
import assert from "node:assert/strict";

// Run against the built site, not only Vite: the original replay was in saved HTML.
const base = process.env.AWAY_QA_URL || "http://127.0.0.1:5178";
const browser = await chromium.launch();
try {
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const starts = [],
      errors = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.exposeFunction("reportAwayArrival", () =>
      starts.push(Date.now())
    );
    await page.addInitScript(() =>
      document.addEventListener("animationstart", e => {
        if (e.animationName === "forest-left") window.reportAwayArrival();
      })
    );
    // Simulate a cold connection: the static poster must never execute the intro.
    await page.route("**/assets/index-*.js", async route => {
      await new Promise(resolve => setTimeout(resolve, 1600));
      await route.continue();
    });
    await page.route("**/previews/away/assets/*.woff", async route => {
      await new Promise(resolve => setTimeout(resolve, 600));
      await route.continue();
    });
    const response = await page.goto(`${base}/preview/away/`, {
      waitUntil: "domcontentloaded",
    });
    const html = await response.text();
    assert.match(html, /data-away-poster/);
    assert.doesNotMatch(
      html,
      /<iframe\b/,
      "Saved HTML must not run an opening before React mounts"
    );
    const frame = page.frameLocator('iframe[title="AWAY"]');
    await frame.locator("html.hero-ready").waitFor({ state: "attached" });
    await page.waitForTimeout(5000);
    assert.equal(
      starts.length,
      1,
      "Exactly one opening on a delayed fresh visit"
    );
    assert.equal(await page.locator("[data-away-poster]").isVisible(), false);
    const hero = frame.locator(".hero");
    const baseline = await frame
      .locator(".hero-scene")
      .evaluate(e => getComputedStyle(e).transform);
    // Sample every painted frame during repeated down/up reversals.
    const coverage = await hero.evaluate(async el => {
      const scene = el.querySelector(".hero-scene");
      const gaps = [];
      let running = true;
      const sample = () => {
        const h = el.getBoundingClientRect(),
          s = scene.getBoundingClientRect();
        if (
          s.top > h.top + 1 ||
          s.bottom < h.bottom - 1 ||
          s.left > h.left + 1 ||
          s.right < h.right - 1
        )
          gaps.push({ hero: h.toJSON(), scene: s.toJSON() });
        if (running) requestAnimationFrame(sample);
      };
      sample();
      for (const y of [650, 0, 420, 0, 700, 0]) {
        scrollTo({ top: y, behavior: "instant" });
        await new Promise(resolve => setTimeout(resolve, 170));
      }
      running = false;
      return gaps;
    });
    assert.deepEqual(
      coverage,
      [],
      "Backdrop must cover the hero throughout reverse scrolling"
    );
    for (const [x, y] of [
      [30, 200],
      [width - 30, 750],
      [width / 2, 300],
      [5, 50],
    ])
      await page.mouse.move(x, y, { steps: 4 });
    assert.equal(
      await frame
        .locator(".hero-scene")
        .evaluate(e => getComputedStyle(e).transform),
      baseline
    );
    // Rapid selections must settle on the final choice with a decoded base image.
    await hero.evaluate(async () => {
      for (const i of [1, 2, 0, 2]) {
        document.querySelector(`[data-hero="${i}"]`).click();
        await new Promise(resolve => setTimeout(resolve, 90));
      }
    });
    await frame.locator("#hero-base img").evaluate(async img => {
      for (let i = 0; i < 60; i++) {
        if (img.alt.includes("snow") && img.complete && img.naturalWidth)
          return;
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      throw new Error("Final scene failed to settle");
    });
    await page.screenshot({ path: `/tmp/away-stable-${width}.png` });
    assert.equal(
      await hero.evaluate(
        () => document.documentElement.scrollWidth > innerWidth
      ),
      false
    );
    assert.deepEqual(errors, []);
    // Reload must still play exactly once, not once from each viewer instance.
    starts.length = 0;
    await page.reload({ waitUntil: "domcontentloaded" });
    await frame.locator("html.hero-ready").waitFor({ state: "attached" });
    await page.waitForTimeout(300);
    assert.equal(starts.length, 1);
    await page
      .getByRole("button", { name: "Close preview", exact: true })
      .click();
    await page.waitForURL(url => !url.pathname.startsWith("/preview/"));
    console.log(
      `AWAY ${width}: single cold/reload entrance, no scroll or pointer gaps, rapid scene changes, close navigation passed`
    );
    await page.close();
  }
  const page = await browser.newPage({
    viewport: { width: 320, height: 700 },
    reducedMotion: "reduce",
  });
  await page.goto(`${base}/preview/away/`);
  const frame = page.frameLocator("iframe");
  await frame.locator("html.hero-ready").waitFor({ state: "attached" });
  assert.equal(await frame.locator(".arrival-left").isVisible(), false);
  assert.equal(
    await frame
      .locator(".hero")
      .evaluate(() => document.documentElement.scrollWidth > innerWidth),
    false
  );
  console.log(
    "AWAY 320 reduced motion: no entrance, no overflow, viewer ready"
  );
} finally {
  await browser.close();
}
