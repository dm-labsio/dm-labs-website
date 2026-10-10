import { chromium } from "playwright";
import assert from "node:assert/strict";
const base = process.env.WORK_QA_URL || "http://127.0.0.1:5177";
const route = process.env.WORK_QA_PAGE || "/templates/";
const browser = await chromium.launch();
const phase = p =>
  p
    .locator(".work-carousel")
    .getAttribute("data-carousel-position")
    .then(Number);
const cookie = () =>
  localStorage.setItem(
    "dm_cookie_consent",
    JSON.stringify({ essential: true, analytics: false })
  );
try {
  for (const [width, locale, touch] of [
    [390, "", true],
    [320, "/he", true],
    [768, "/el", true],
    [1440, "", false],
  ]) {
    const p = await browser.newPage({
      viewport: { width, height: 900 },
      hasTouch: touch,
      isMobile: touch,
      reducedMotion: "no-preference",
    });
    const errors = [];
    p.on("pageerror", e => errors.push(e.message));
    await p.addInitScript(cookie);
    await p.goto(base + locale + route);
    await p.locator(".work-carousel.is-ready").waitFor();
    await p.evaluate(() => document.fonts.ready);
    assert.equal(await p.locator('.site-header-home').count(), 0);
    if (width < 1440) {
      assert.equal(await p.locator('.site-desktop-nav').isVisible(), false);
      await p.locator('.site-menu-trigger').click();
      const home = p.locator('.site-menu-panel .site-menu-link').first();
      assert.equal(await home.getAttribute('href'), locale + '/');
      assert.equal(await home.isVisible(), true);
      await p.keyboard.press('Escape');
      await p.locator('.site-menu-panel').waitFor({ state: 'hidden' });
    } else {
      assert.equal(await p.locator('.site-desktop-nav a').first().getAttribute('href'), locale + '/');
      assert.equal(await p.locator('.site-desktop-nav').isVisible(), true);
    }
    assert.equal(await p.locator("h1").count(), 1);
    assert.equal(await p.locator(".work-arc-card").count(), 9);
    await p.locator(".work-service").scrollIntoViewIfNeeded();
    await p
      .locator(".work-arc-card img")
      .evaluateAll(imgs => Promise.all(imgs.map(i => i.decode())));
    assert.equal(
      await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false
    );
    const start = await phase(p);
    await p.waitForTimeout(850);
    assert.ok((await phase(p)) > start + 0.02, "idle auto motion");
    const card = p.locator('[data-project="sunday-boat"]');
    const initialBox = await card.boundingBox();
    if (touch)
      await p.touchscreen.tap(
        initialBox.x + initialBox.width / 2,
        initialBox.y + initialBox.height / 3
      );
    else
      await p.mouse.move(
        initialBox.x + initialBox.width / 2,
        initialBox.y + initialBox.height / 3
      );
    assert.ok((await card.getAttribute("class")).includes("is-selected"));
    assert.ok(p.url().endsWith(route), "first tap stays in gallery");
    await p.waitForTimeout(650);
    const stopped = await phase(p);
    await p.waitForTimeout(550);
    assert.ok(
      Math.abs((await phase(p)) - stopped) < 0.003,
      "pause at selection"
    );
    const scroll = await p.evaluate(() => scrollY);
    const openBox = await card.boundingBox();
    if (touch)
      await p.touchscreen.tap(
        openBox.x + openBox.width / 2,
        openBox.y + openBox.height / 3
      );
    else
      await p.mouse.click(
        openBox.x + openBox.width / 2,
        openBox.y + openBox.height / 3
      );
    await p.waitForURL(/\/preview\/sunday-boat\//);
    await p.locator("iframe").waitFor();
    assert.equal(await p.locator("iframe").count(), 1);
    await p.getByRole("button", { name: "Close preview", exact: true }).click();
    await p.waitForURL(base + locale + route);
    await p.locator(".work-carousel.is-ready").waitFor();
    await p.waitForTimeout(200);
    assert.ok(
      Math.abs((await p.evaluate(() => scrollY)) - scroll) < 3,
      "restore vertical position"
    );
    assert.ok(
      Math.abs((await phase(p)) - stopped) < 0.008,
      "restore carousel phase"
    );
    const stage = p.locator(".work-arc-stage");
    const box = await stage.boundingBox();
    const beforeDrag = await phase(p);
    if (touch) {
      const cdp = await p.context().newCDPSession(p);
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [{ x: width * 0.7, y: Math.max(160, box.y + 150) }],
      });
      for (let i = 1; i <= 8; i++)
        await cdp.send("Input.dispatchTouchEvent", {
          type: "touchMove",
          touchPoints: [
            {
              x: width * 0.7 - i * width * 0.05,
              y: Math.max(160, box.y + 150),
            },
          ],
        });
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchEnd",
        touchPoints: [],
      });
      await cdp.detach();
    } else {
      await p.mouse.move(width * 0.7, Math.max(160, box.y + 150));
      await p.mouse.down();
      await p.mouse.move(width * 0.3, Math.max(160, box.y + 150), { steps: 8 });
      await p.mouse.up();
    }
    assert.ok(p.url().endsWith(route), "swipe never opens demo");
    assert.ok(
      Math.abs((await phase(p)) - beforeDrag) > 0.2,
      "drag moves cards"
    );
    // Native browser Back must restore the same position as the X button.
    await p.mouse.move(0, 0);
    await p.waitForTimeout(150);
    await p.locator(".work-gallery-controls button").last().click();
    await p.waitForTimeout(600);
    const selected = p.locator(".work-arc-card.is-selected");
    const id = await selected.getAttribute("data-project");
    await selected.focus();
    await selected.press("Enter");
    await p.waitForURL(new RegExp("/preview/" + id + "/"));
    const saved = await p.evaluate(() => history.state.dmPreviewOrigin);
    assert.equal(saved, locale + route);
    await p.goBack();
    await p.waitForURL(base + locale + route);
    await p.locator(".work-carousel.is-ready").waitFor();
    await p.locator(".work-service").screenshot({
      path: `/tmp/${route === "/" ? "home" : "our-work"}-${width}${locale.replace("/", "-")}.png`,
    });
    assert.deepEqual(errors, []);
    console.log(
      `${width} ${locale || "en"}: autoplay, pause/lift, direct viewer, X/Back restoration, drag, links and overflow passed`
    );
    await p.close();
  }
  // Cross the last/first boundary under autoplay, and check reduced motion separately.
  for (const reduced of [false, true]) {
    const p = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      reducedMotion: reduced ? "reduce" : "no-preference",
    });
    await p.addInitScript(route => {
      localStorage.setItem(
        "dm_cookie_consent",
        JSON.stringify({ essential: true, analytics: false })
      );
      history.replaceState(
        {
          dmPreviewSource: {
            url: route,
            x: 0,
            y: 240,
            href: "/preview/arcos-architecture/",
            workGallery: { position: 8.96, selected: "" },
          },
        },
        ""
      );
    }, route);
    await p.goto(base + route);
    await p.locator(".work-carousel.is-ready").waitFor();
    await p.locator(".work-service").scrollIntoViewIfNeeded();
    await p.mouse.move(0, 0);
    await p.waitForTimeout(3650);
    const samples = await p.locator(".work-arc-stage").evaluate(async stage => {
      const frames = [];
      for (let i = 0; i < 75; i++) {
        await new Promise(requestAnimationFrame);
        frames.push(
          [...stage.querySelectorAll(".work-arc-card")].map(c => ({
            id: c.dataset.project,
            x: c.getBoundingClientRect().x,
            opacity: getComputedStyle(c).opacity,
          }))
        );
      }
      return frames;
    });
    let maxJump = 0;
    for (let i = 1; i < samples.length; i++)
      for (let j = 0; j < 9; j++) {
        const a = samples[i - 1][j],
          b = samples[i][j];
        if (
          a.opacity === "1" &&
          b.opacity === "1" &&
          a.x > -300 &&
          a.x < 1440 &&
          b.x > -300 &&
          b.x < 1440
        )
          maxJump = Math.max(maxJump, Math.abs(a.x - b.x));
      }
    assert.ok(maxJump < 5, "seamless wrap");
    if (reduced) assert.equal(maxJump, 0, "reduced motion is stationary");
    else assert.ok((await phase(p)) > 9, "crossed seam");
    console.log(
      `${reduced ? "Reduced motion" : "Loop boundary"} passed; maximum visible movement/frame ${maxJump.toFixed(2)}px`
    );
    await p.close();
  }
} finally {
  await browser.close();
}
