import { chromium } from "playwright";
import assert from "node:assert/strict";
const base = process.env.AWAY_QA_URL || "http://127.0.0.1:5177";
const browser = await chromium.launch();
const report = [];
for (const width of [320, 390, 768, 1440]) {
  const p = await browser.newPage({
    viewport: { width, height: 900 },
    reducedMotion: width === 768 ? "no-preference" : "reduce",
  });
  const errors = [];
  p.on("pageerror", e => errors.push(e.message));
  await p.goto(`${base}/previews/away.html`);
  await p.evaluate(() => document.fonts.ready);
  assert.equal(
    await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    false
  );
  for (const i of [1, 2, 0]) {
    await p.locator(`[data-hero="${i}"]`).click();
    await p.waitForFunction(
      i =>
        document
          .querySelector(`[data-hero="${i}"]`)
          .getAttribute("aria-pressed") === "true",
      i
    );
    await p.waitForTimeout(width === 768 ? 1400 : 100);
  }
  await p.locator(".menu-toggle").click();
  assert.equal(await p.locator("#site-nav").evaluate(n => n.inert), false);
  await p.keyboard.press("Escape");
  assert.equal(await p.locator("#site-nav").evaluate(n => n.inert), true);
  await p.locator(".hero-copy a").click();
  await p.waitForTimeout(800);
  assert.equal(new URL(p.url()).hash, "");
  for (const key of ["river", "bath", "canvas"]) {
    await p.locator(`[data-suite="${key}"]`).click();
    assert.equal(
      await p.locator("#suite-name").textContent(),
      `${key[0].toUpperCase() + key.slice(1)} Suite`
    );
    for (const view of [1, 2, 0])
      await p.locator(`[data-suite-view="${view}"]`).click();
  }
  await p.locator("#tab-canvas").focus();
  await p.keyboard.press("ArrowRight");
  assert.equal(
    await p.locator("#tab-river").getAttribute("aria-selected"),
    "true"
  );
  await p.locator(".suite-expand").click();
  assert.equal(await p.locator("#gallery").evaluate(d => d.open), true);
  await p.locator('[data-gallery-step="1"]').click();
  await p.keyboard.press("ArrowRight");
  assert.match(await p.locator("#gallery-caption").textContent(), /soak/);
  await p.keyboard.press("Escape");
  for (const season of ["winter", "autumn", "summer"]) {
    await p.locator(`[data-season="${season}"]`).click();
    assert.equal(
      await p.locator(`[data-season="${season}"]`).getAttribute("aria-pressed"),
      "true"
    );
  }
  for (const place of ["lodge", "water", "river", "suites"]) {
    await p.locator(`[data-place="${place}"]`).click();
    assert.equal(
      await p.locator(`[data-place="${place}"]`).getAttribute("aria-pressed"),
      "true"
    );
  }
  for (const day of ["water", "woods", "evening", "breakfast"])
    await p.locator(`[data-day="${day}"]`).click();
  await p.locator("[data-menu]").click();
  for (const type of ["dinner", "drinks", "breakfast"]) {
    await p.locator(`[data-menu-type="${type}"]`).click();
    assert.equal(await p.locator(".menu-item").count(), 3);
  }
  await p.locator("#menu-dialog [data-close]").click();
  await p.locator("#stay [data-plan]").click();
  const min = await p.locator("#arrival").getAttribute("min");
  const d = new Date(`${min}T12:00:00`);
  d.setDate(d.getDate() + 5);
  const end = d.toISOString().slice(0, 10);
  await p.locator("#arrival").fill(min);
  await p.locator("#departure").fill(end);
  await p.locator("#guest-minus").click();
  assert.equal(await p.locator("#guest-minus").isDisabled(), true);
  await p.locator("#guest-plus").click();
  assert.equal(await p.locator("#guest-plus").isDisabled(), true);
  await p.locator('input[name="suite"][value="bath"]').check();
  await p.locator('#stay-form button[type="submit"]').click();
  assert.equal(await p.locator("#stay-form").isVisible(), false);
  assert.match(
    await p.locator("#summary-dates").textContent(),
    /5 nights · 2 guests/
  );
  assert.equal(await p.locator("#summary-suite").textContent(), "Bath Suite");
  await p.screenshot({ path: `/tmp/away-planner-${width}.png` });
  await p.locator("#edit-stay").click();
  await p.locator("#stay-dialog > [data-close]").click();
  for (const section of ["intro", "comforts", "suites", "camp", "days", "table", "stay"]) {
    await p.locator(`#${section}`).scrollIntoViewIfNeeded();
    await p.waitForTimeout(200);
  }
  await p.evaluate(async () => {
    document.querySelectorAll("img[loading=lazy]").forEach(i => i.loading = "eager");
    await Promise.all(
      [...document.images]
        .filter(i => i.currentSrc)
        .map(i => i.decode().catch(() => {}))
    );
  });
  const broken = await p.evaluate(() =>
    [...document.images]
      .filter(i => i.currentSrc && !i.naturalWidth)
      .map(i => i.currentSrc)
  );
  assert.deepEqual(broken, []);
  assert.deepEqual(errors, []);
  assert.equal(
    await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    false
  );
  await p.screenshot({ path: `/tmp/away-${width}-loaded.png`, fullPage: true });
  report.push({ width, passed: true });
  console.log(`AWAY ${width}: passed`);
  await p.close();
}
await browser.close();
console.log(JSON.stringify(report));
