import { chromium } from "playwright";
import assert from "node:assert/strict";
const base = process.env.SUNDAY_QA_URL || "http://127.0.0.1:5177";
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 768, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: width === 768 ? "no-preference" : "reduce",
    });
    const errors = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(base + "/previews/sunday-boat.html");
    await page.evaluate(() => document.fonts.ready);
    await page
      .locator(".hero img")
      .evaluateAll(imgs => Promise.all(imgs.map(i => i.decode())));
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth
      ),
      false
    );
    const title = await page.locator("h1").boundingBox();
    assert.ok(title.x >= 0 && title.x + title.width <= width);
    for (const i of [1, 2, 0]) {
      await page.locator("#next-plate").click();
      assert.equal(
        await page.locator(`[data-plate="${i}"]`).getAttribute("aria-pressed"),
        "true"
      );
    }
    await page.locator('[data-plate="0"]').focus();
    await page.keyboard.press("ArrowRight");
    assert.equal(
      await page.locator('[data-plate="1"]').getAttribute("aria-pressed"),
      "true"
    );
    await page.locator(".plate-fan").evaluate(el => {
      const start = new Touch({
        identifier: 1,
        target: el,
        clientX: 260,
        clientY: 500,
      });
      const end = new Touch({
        identifier: 1,
        target: el,
        clientX: 90,
        clientY: 510,
      });
      el.dispatchEvent(
        new TouchEvent("touchstart", { touches: [start], bubbles: true })
      );
      el.dispatchEvent(
        new TouchEvent("touchend", { changedTouches: [end], bubbles: true })
      );
    });
    assert.equal(
      await page.locator('[data-plate="2"]').getAttribute("aria-pressed"),
      "true"
    );
    await page.locator(".header-ticket").click();
    await page.waitForTimeout(width === 768 ? 650 : 50);
    assert.equal(new URL(page.url()).hash, "");
    for (const i of [1, 2, 0]) {
      await page.locator(`[data-menu="${i}"]`).click();
      assert.equal(await page.locator(`#menu-panel-${i}`).isVisible(), true);
      assert.equal(await page.locator("[role=tabpanel]:visible").count(), 1);
    }
    await page.locator('[data-menu="0"]').focus();
    await page.keyboard.press("End");
    assert.equal(
      await page.locator('[data-menu="2"]').getAttribute("aria-selected"),
      "true"
    );
    await page.locator(".place-scene").scrollIntoViewIfNeeded();
    await page.locator(".place-scene.ready").waitFor();
    assert.equal(await page.locator("[data-place],.view-photo").count(), 0);
    assert.ok(
      await page
        .locator(".place-scene img")
        .evaluateAll(imgs => imgs.every(i => i.complete && i.naturalWidth > 0))
    );
    const fade = await page.locator(".place-interior").evaluate(img => {
      const animation = img.getAnimations()[0];
      const base = img.parentElement.querySelector("#place-image");
      if (!animation)
        return { reduced: true, opacity: getComputedStyle(img).opacity };
      animation.pause();
      const samples = [
        0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000,
      ].map(time => {
        animation.currentTime = time;
        return {
          opacity: Number(getComputedStyle(img).opacity),
          baseOpacity: Number(getComputedStyle(base).opacity),
          top: img.getBoundingClientRect().top,
          height: img.getBoundingClientRect().height,
        };
      });
      animation.play();
      return { reduced: false, samples };
    });
    if (width === 768) {
      assert.equal(fade.reduced, false);
      const v = fade.samples;
      assert.equal(v[0].opacity, 0);
      assert.equal(v[4].opacity, 1);
      assert.equal(v[8].opacity, 0);
      for (let i = 1; i < 5; i++) assert.ok(v[i].opacity > v[i - 1].opacity);
      for (let i = 5; i < 9; i++) assert.ok(v[i].opacity < v[i - 1].opacity);
      assert.ok(
        v.every(
          s =>
            s.baseOpacity === 1 &&
            s.top === v[0].top &&
            s.height === v[0].height
        )
      );
    } else {
      assert.equal(fade.reduced, true);
      assert.equal(fade.opacity, "0");
    }
    // Removing the overlay must not remove the full-image interaction.
    await page.locator('[data-gallery="36-crispy-squid"]').click();
    await page.locator("#lightbox[open]").waitFor();
    await page.keyboard.press("Escape");
    await page.locator("#box-toggle").click();
    assert.equal(
      await page.locator("#box-toggle").getAttribute("aria-pressed"),
      "true"
    );
    await page.locator("#box-toggle").click();
    assert.equal(
      await page.locator("#box-toggle").getAttribute("aria-pressed"),
      "false"
    );
    const opener = page.locator('[data-gallery="31-merch-t-shirt"]');
    await opener.click();
    await page.locator("#lightbox[open]").waitFor();
    await page.locator("#lightbox-image").evaluate(async img => {
      for (let i = 0; i < 100 && !img.currentSrc; i++)
        await new Promise(r => setTimeout(r, 30));
      await img.decode();
    });
    await page.keyboard.press("ArrowRight");
    await page.waitForFunction(
      () =>
        document.querySelector("#lightbox-caption").textContent ===
        "The good cap"
    );
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("#lightbox").isVisible(), false);
    assert.equal(
      await opener.evaluate(b => b === document.activeElement),
      true
    );
    for (const id of [
      "#menu",
      "#place",
      ".table-section",
      "#takeaway",
      "#off-menu",
      "footer",
    ]) {
      await page.locator(id).scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth
        ),
        false,
        `${width} ${id}`
      );
    }
    // Decode all images before visual review; lazy images would otherwise stay pending.
    await page.evaluate(() => {
      for (const img of document.images) img.loading = "eager";
    });
    await page
      .locator("img")
      .evaluateAll(imgs =>
        Promise.all(imgs.filter(i => i.currentSrc).map(i => i.decode()))
      );
    await page.screenshot({
      path: `/tmp/sunday-full-${width}.png`,
      fullPage: true,
    });
    assert.deepEqual(errors, []);
    console.log(
      `Sunday Boat ${width}: menu, food fan, swipe, keyboard, restaurant crossfade, takeaway, lightbox, focus and overflow passed`
    );
    await page.close();
  }
} finally {
  await browser.close();
}
