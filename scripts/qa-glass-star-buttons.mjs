import { chromium } from "playwright";
import assert from "node:assert/strict";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:5175";
const browser = await chromium.launch({ headless: true });
try {
  for (const locale of ["en", "el", "he"]) {
    for (const width of [1440, 390]) {
      const prefix = locale === "en" ? "" : `${locale}/`;
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: "reduce", isMobile: width < 768, hasTouch: width < 768 });
      const errors = [];
      page.on("pageerror", e => errors.push(e.message));
      await page.goto(`${base}/${prefix}contact/`, { waitUntil: "networkidle" });
      const banner = page.getByRole("dialog", { name: "Cookie consent" });
      await banner.waitFor();
      const accept = banner.locator("button.star-button").first();
      assert.equal(await accept.locator(".star-button__star").count(), 6);
      assert.equal(await accept.evaluate(el => el.tagName), "BUTTON");
      await accept.click();
      assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem("dm_cookie_consent")).analytics), true);
      const submit = page.locator('form button[type="submit"]');
      assert.equal(await submit.count(), 1);
      assert.ok(await submit.getAttribute("class").then(c => c.includes("star-button")));
      await submit.click();
      assert.ok(await page.locator("form :invalid").count() > 0, "native validation still prevents empty submission");

      await page.goto(`${base}/${prefix}`, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator(".home-starfield").count(), 0);
      assert.equal(await page.locator(".btn-primary:not(.star-button)").count(), 0);
      assert.equal(await page.locator("button button, a button, button a").count(), 0);
      assert.equal(await page.locator("vite-error-overlay").count(), 0);
      const hero = page.locator(".hero-scrub-copy .star-button").first();
      const name = await hero.innerText();
      assert.ok(name.trim().length > 0);
      await page.emulateMedia({ reducedMotion: "no-preference" });

      if (width === 1440) {
        const header = page.locator("header .star-button").first();
        await header.hover();
        await page.waitForTimeout(1100);
        assert.equal(await header.locator(".star-button__star").first().evaluate(el => getComputedStyle(el).opacity), "1");
        assert.ok(await header.locator(".star-button__star").evaluateAll(stars => stars.every(el => el.getBoundingClientRect().top >= 0)), "header stars fit viewport");
        await page.mouse.move(1, 500);
        await page.keyboard.press("Tab");
        await header.focus();
        assert.equal(await header.evaluate(el => el.matches(":focus-visible")), true);
        assert.equal(await header.evaluate(el => getComputedStyle(el).outlineStyle), "solid");
        await hero.hover();
        await page.waitForTimeout(1100);
      } else {
        assert.equal(await hero.locator(".star-button__star").first().evaluate(el => getComputedStyle(el).opacity), "0");
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
      await page.screenshot({ path: `/tmp/dm-glass-${locale}-${width}.png` });
      await page.emulateMedia({ reducedMotion: "reduce" });
      assert.equal(await hero.locator(".star-button__stars").evaluate(el => getComputedStyle(el).display), "none");
      assert.deepEqual(errors, []);
      console.log(`PASS ${locale} ${width}px: glass CTAs, no starfield, semantics, consent, form validation, hover/focus or touch, reduced motion, no overflow/errors`);
      await page.close();
    }
  }
  // Exercise preferences and reject separately, without contacting any form service.
  const page = await browser.newPage({ reducedMotion: "reduce" });
  await page.goto(`${base}/contact/`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Manage", exact: true }).click();
  await page.getByRole("button", { name: "Save Preferences", exact: true }).click();
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem("dm_cookie_consent")).analytics), false);
  await page.evaluate(() => localStorage.removeItem("dm_cookie_consent"));
  await page.reload({ waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Reject", exact: true }).click();
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem("dm_cookie_consent")).analytics), false);
  console.log("PASS cookie preferences and rejection remain functional");
  await page.close();
} finally {
  await browser.close();
}
