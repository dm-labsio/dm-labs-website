import { chromium } from "playwright";
import assert from "node:assert/strict";
const base = process.env.WORK_QA_URL || "http://127.0.0.1:5177";
const browser = await chromium.launch();
try {
  for (const [width, locale] of [
    [390, ""],
    [320, "/he"],
    [768, "/el"],
    [1440, ""],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      isMobile: width < 700,
      hasTouch: width < 700,
    });
    const errors = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.addInitScript(() =>
      localStorage.setItem(
        "dm_cookie_consent",
        JSON.stringify({ essential: true, analytics: false })
      )
    );
    await page.goto(base + locale + "/templates/");
    await page.locator("#branding").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    assert.equal(await page.locator("[data-brand-project]").count(), 3);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth
      ),
      false
    );
    for (const [index, id] of ["hartley", "away", "sunday-boat"].entries()) {
      if (width < 700) {
        await page.locator(".brand-mobile-nav button").nth(index).click();
        await page.waitForTimeout(800);
      }
      const card = page.locator(`[data-brand-project][data-brand="${id}"]`);
      await card.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      const before = await page.evaluate(() => ({
        y: scrollY,
        x: document.querySelector(".brand-projects").scrollLeft,
      }));
      const box = await card.boundingBox();
      if (width < 700)
        await page.touchscreen.tap(
          box.x + box.width / 2,
          box.y + box.height / 2
        );
      else
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      await page.locator(".brand-dialog[open]").waitFor();
      await page.waitForTimeout(450);
      assert.equal(new URL(page.url()).searchParams.get("brand"), id);
      assert.equal(
        await page.evaluate(() => document.body.style.overflow),
        "hidden"
      );
      assert.equal(
        await page
          .locator(".brand-dialog")
          .evaluate(e => e.scrollWidth > e.clientWidth),
        false
      );
      assert.equal(
        await page
          .locator(".brand-close")
          .evaluate(e => e === document.activeElement),
        true
      );
      if (width === 390 || width === 1440)
        await page.screenshot({ path: `/tmp/branding-${id}-${width}.png` });
      const height = await page
        .locator(".brand-dialog")
        .evaluate(e => e.scrollHeight);
      for (let y = 600; y < height; y += 650) {
        await page
          .locator(".brand-dialog")
          .evaluate((e, y) => e.scrollTo(0, y), y);
        await page.waitForTimeout(90);
      }
      await page
        .locator(".brand-dialog img:visible")
        .evaluateAll(imgs => Promise.all(imgs.map(i => i.decode())));
      assert.equal(
        await page
          .locator(".brand-dialog img:visible")
          .evaluateAll(imgs => imgs.every(i => i.naturalWidth > 0)),
        true
      );
      if (index === 0) {
        await page.locator(".brand-story-footer button").last().click();
        assert.equal(new URL(page.url()).searchParams.get("brand"), "away");
        assert.equal(
          await page.locator(".brand-dialog").evaluate(e => e.scrollTop),
          0
        );
        await page.locator(".brand-close").click();
      } else if (index === 1) {
        await page.goBack();
      } else {
        await page.keyboard.press("Escape");
      }
      await page.locator(".brand-dialog[open]").waitFor({ state: "detached" });
      await page.waitForTimeout(350);
      assert.equal(new URL(page.url()).searchParams.has("brand"), false);
      const after = await page.evaluate(() => ({
        y: scrollY,
        x: document.querySelector(".brand-projects").scrollLeft,
      }));
      assert.ok(
        Math.abs(before.y - after.y) < 3,
        `scroll restore ${width}/${id}: ${JSON.stringify({ before, after })}`
      );
      assert.ok(Math.abs(before.x - after.x) < 3, "rail position restored");
      assert.equal(
        await card.evaluate(e => e === document.activeElement),
        true
      );
    }
    assert.deepEqual(errors, []);
    console.log(
      "PASS",
      width,
      locale || "en",
      "all projects, assets, focus, X/Back/Escape, exact return"
    );
    await page.close();
  }
  const direct = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  await direct.goto(base + "/templates/?brand=away");
  await direct.locator(".brand-dialog[open]").waitFor();
  assert.equal(
    await direct
      .locator(".brand-dialog")
      .evaluate(e => getComputedStyle(e).animationName),
    "none"
  );
  await direct.locator(".brand-close").click();
  await direct.locator(".brand-dialog[open]").waitFor({ state: "detached" });
  assert.ok(direct.url().endsWith("/templates/"));
  await direct.goto(base + "/templates/?brand=unknown");
  assert.equal(await direct.locator(".brand-dialog[open]").count(), 0);
  console.log("PASS direct links, invalid project, reduced motion");
} finally {
  await browser.close();
}
