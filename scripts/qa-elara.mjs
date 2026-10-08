import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.ELARA_QA_URL || "http://127.0.0.1:5175";
const out = "../output/website-refresh/elara-clinical";
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const report = { base, cases: [], errors: [] };
try {
  for (const width of [320, 390, 768, 1440]) {
    const p = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
      hasTouch: width < 700,
    });
    p.on("pageerror", e => report.errors.push(e.message));
    const posts = [];
    p.on("request", r => {
      if (r.method() === "POST") posts.push(r.url());
    });
    await p.goto(base + "/previews/dr-elara-dental.html");
    await p.locator("html[data-elara-ready=true]").waitFor();
    await p.evaluate(() => document.fonts.ready);
    await p.waitForFunction(
      () => document.querySelector("#hero-image").naturalWidth > 0
    );
    assert.ok(
      await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1
      )
    );
    assert.ok(
      await p.evaluate(() =>
        [...document.querySelectorAll('a[href^="#"]')].every(a =>
          document.getElementById(a.getAttribute("href").slice(1))
        )
      ),
      "section links must resolve"
    );
    assert.equal(
      await p
        .locator("body")
        .evaluate(e => getComputedStyle(e).backgroundColor),
      "rgb(255, 255, 255)"
    );
    assert.equal(
      await p
        .locator("#hero-perspective")
        .evaluate(e => getComputedStyle(e).transform),
      "none"
    );
    assert.ok(
      await p.evaluate(
        () =>
          document.fonts.check("16px Sora") &&
          document.fonts.check('16px "Source Sans 3"')
      )
    );
    await p.screenshot({ path: `${out}/${width}-hero.png` });
    await p.locator('[data-view="1"]').click();
    await p.waitForFunction(
      () =>
        document.querySelector("#hero-image").complete &&
        document.querySelector("#hero-image").naturalWidth > 0
    );
    assert.match(await p.locator("#hero-image").getAttribute("src"), /detail/);
    await p.locator("#open-gallery").click();
    await p.locator("#gallery-next").click();
    assert.equal(await p.locator("#gallery-title").innerText(), "The practice");
    await p.locator("#close-gallery").press("ArrowLeft");
    assert.equal(await p.locator("#gallery-title").innerText(), "The detail");
    // The same pointer gesture handles mouse drags and touch swipes.
    const rect = await p.locator("#gallery-swipe").boundingBox();
    await p.mouse.move(rect.x + rect.width * 0.75, rect.y + rect.height * 0.5);
    await p.mouse.down();
    await p.mouse.move(rect.x + rect.width * 0.2, rect.y + rect.height * 0.5, {
      steps: 8,
    });
    await p.mouse.up();
    assert.equal(await p.locator("#gallery-title").innerText(), "The practice");
    await p.locator("#close-gallery").press("Escape");
    await p.waitForFunction(() => document.body.style.overflow === "");
    assert.ok(
      await p
        .locator("#open-gallery")
        .evaluate(e => e === document.activeElement)
    );
    await p.getByRole("tab", { name: /Your smile/ }).click();
    await p.getByRole("tab", { name: /Your smile/ }).press("ArrowDown");
    assert.equal(
      await p.locator("#tab-restore").getAttribute("aria-selected"),
      "true"
    );
    await p.locator("#care-book").click();
    assert.equal(
      await p.locator("#request-care").inputValue(),
      "Repair & restore"
    );
    await p.getByRole("button", { name: "Send demo request" }).click();
    assert.ok(await p.locator("#request-fields").isVisible());
    await p.locator("#request-name").fill("Alex Example");
    await p.locator("#request-email").fill("alex@example.com");
    await p.locator("#request-time").selectOption("Afternoon");
    await p.getByRole("button", { name: "Send demo request" }).click();
    await p.locator("#request-result").waitFor();
    assert.match(await p.locator("#request-summary").innerText(), /Afternoon/);
    await p.screenshot({ path: `${out}/${width}-request.png` });
    await p.locator("#edit-request").click();
    assert.equal(
      await p.locator("#request-email").inputValue(),
      "alex@example.com"
    );
    await p.locator("#close-request").click();
    await p.waitForFunction(() => document.body.style.overflow === "");
    assert.ok(
      await p.locator("#care-book").evaluate(e => e === document.activeElement)
    );
    assert.equal(await p.locator("#request-email").inputValue(), "");
    assert.deepEqual(posts, []);
    await p.locator("#care").scrollIntoViewIfNeeded();
    await p.screenshot({ path: `${out}/${width}-care.png` });
    const history = await p.evaluate(() => history.length);
    await p.locator('footer a[href="#main"]').click();
    assert.equal(await p.evaluate(() => history.length), history);
    await p.screenshot({ path: `${out}/${width}-full.png`, fullPage: true });
    report.cases.push({
      width,
      layout: "pass",
      whitePalette: "pass",
      fonts: "pass",
      gallery: "pass",
      tabs: "pass",
      requestValidation: "pass",
      requestFlow: "pass",
      noNetworkSubmission: "pass",
      focusAndHistory: "pass",
    });
    await p.close();
  }
  const p = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  p.on("pageerror", e => report.errors.push(e.message));
  await p.goto(base + "/previews/dr-elara-dental.html");
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(1000);
  const initial = await p
    .locator("#hero-perspective")
    .evaluate(e => getComputedStyle(e).transform);
  await p.evaluate(() => scrollTo(0, 550));
  await p.waitForTimeout(450);
  assert.notEqual(
    await p
      .locator("#hero-perspective")
      .evaluate(e => getComputedStyle(e).transform),
    initial
  );
  const button = p.locator(".header .button");
  const before = await button.boundingBox();
  await p.mouse.move(
    before.x + before.width * 0.8,
    before.y + before.height * 0.6
  );
  await p.waitForTimeout(250);
  const after = await button.boundingBox();
  assert.deepEqual(after, before);
  assert.notEqual(
    await button
      .locator(".magnetic-label")
      .evaluate(e => getComputedStyle(e).transform),
    "matrix(1, 0, 0, 1, 0, 0)"
  );
  report.motion =
    "scroll perspective changes; magnetic label moves with stable hitbox";
  await p.locator("#play-film").click();
  await p.waitForFunction(
    () => document.querySelector("#care-video").currentTime > 0,
    {},
    { timeout: 30000 }
  );
  await p.locator(".hero").scrollIntoViewIfNeeded();
  await p.waitForTimeout(500);
  assert.ok(await p.locator("#care-video").evaluate(v => v.paused));
  report.video = "plays on request; pauses offscreen";
  await p.route("**/*root-canal*.mp4", r => r.abort());
  await p.reload();
  await p.locator("#play-film").click();
  await p.locator("#film-error").waitFor();
  await p.unroute("**/*root-canal*.mp4");
  await p.locator("#retry-film").click();
  await p.waitForFunction(
    () => document.querySelector("#care-video").currentTime > 0,
    {},
    { timeout: 30000 }
  );
  report.videoRetry = "pass";
  assert.deepEqual(report.errors, []);
} finally {
  await writeFile(out + "/qa.json", JSON.stringify(report, null, 2));
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
