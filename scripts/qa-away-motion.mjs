import { chromium } from "playwright";
import assert from "node:assert/strict";
const base = process.env.AWAY_QA_URL || "http://127.0.0.1:5177";
const browser = await chromium.launch();
for (const width of [390, 1440]) {
  const page = await browser.newPage({
    viewport: { width, height: 900 },
    reducedMotion: "no-preference",
  });
  let errors = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto(`${base}/previews/away.html`);
  await page.evaluate(() => document.fonts.ready);
  // Freeze only the visual arrival to inspect the sequence at exact stages.
  await page.evaluate(() =>
    document.getAnimations().forEach(a => {
      a.pause();
      a.currentTime = 550;
    })
  );
  await page.screenshot({ path: `/tmp/away-opening-${width}.png` });
  await page.evaluate(() =>
    document.getAnimations().forEach(a => {
      a.currentTime = 1700;
    })
  );
  await page.screenshot({ path: `/tmp/away-opening-mid-${width}.png` });
  await page.evaluate(() =>
    document.getAnimations().forEach(a => {
      a.currentTime = 5000;
      a.play();
    })
  );
  await page
    .locator('[data-hero="1"][aria-pressed="true"]')
    .waitFor({ timeout: 15000 });
  await page.locator('[data-hero="0"]').click();
  await page.waitForTimeout(1500);
  await page.locator("#intro").scrollIntoViewIfNeeded();
  await page.locator(".intro-photo img").evaluate(i => i.decode());
  await page.waitForTimeout(1000);
  const cup = await page
    .locator(".intro-photo img")
    .evaluate(i => ({
      natural: i.naturalWidth / i.naturalHeight,
      display: i.clientWidth / i.clientHeight,
      fit: getComputedStyle(i).objectFit,
    }));
  assert.ok(Math.abs(cup.natural - cup.display) < 0.01);
  assert.equal(cup.fit, "contain");
  await page.screenshot({ path: `/tmp/away-cup-${width}.png` });
  await page.locator("#comforts").scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  for (const key of ["chair", "bed", "ritual", "woods", "bath", "linen"]) {
    await page.locator(`[data-comfort="${key}"]`).click();
    await page.waitForTimeout(400);
    assert.equal(
      await page
        .locator(`[data-comfort="${key}"]`)
        .getAttribute("aria-pressed"),
      "true"
    );
  }
  await page.locator("#comfort-image").evaluate(i => i.decode());
  await page.screenshot({ path: `/tmp/away-comforts-${width}.png` });
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth
    ),
    false
  );
  assert.deepEqual(errors, []);
  console.log({ width, cup, passed: true });
  await page.close();
}
const p = await browser.newPage({
  viewport: { width: 320, height: 700 },
  reducedMotion: "reduce",
});
await p.goto(`${base}/previews/away.html`);
assert.equal(await p.locator(".arrival-left").isVisible(), false);
assert.equal(
  await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
  false
);
await p.waitForTimeout(9000);
assert.equal(
  await p.locator('[data-hero="0"]').getAttribute("aria-pressed"),
  "true"
);
console.log("Reduced motion: passed");
await browser.close();
