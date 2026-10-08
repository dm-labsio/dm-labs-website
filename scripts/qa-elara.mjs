import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.ELARA_QA_URL || "http://127.0.0.1:5175";
const out = "../output/website-refresh/elara-interactive";
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
      () => document.querySelector("#scan-art").dataset.ready === "true"
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
    assert.ok(
      await p.evaluate(
        () =>
          document.fonts.check("16px Sora") &&
          document.fonts.check('16px "Source Sans 3"')
      )
    );
    await p.screenshot({ path: `${out}/${width}-hero.png` });
    assert.equal(await p.locator("#gallery-dialog").count(), 0);
    await p.locator("#scan-range").fill("100");
    assert.equal(await p.locator("#scan-mode").innerText(), "Digital");
    await p.locator("#scan-range").press("Home");
    assert.equal(await p.locator("#scan-range").inputValue(), "0");
    await p.locator("#anatomy-range").fill("100");
    assert.equal(
      await p
        .locator("#tooth-diagram")
        .evaluate(e => e.style.getPropertyValue("--reveal")),
      "100%"
    );
    await p.locator("#layer-enamel").click();
    await p.locator("#layer-enamel").press("End");
    assert.equal(
      await p.locator("#layer-pulp").getAttribute("aria-selected"),
      "true"
    );
    assert.match(
      await p.locator("#layer-description").innerText(),
      /blood vessels/
    );
    const d = await p.locator("#tooth-diagram").boundingBox();
    await p.mouse.move(d.x + d.width * 0.8, d.y + d.height * 0.5);
    await p.mouse.down();
    await p.mouse.move(d.x + d.width * 0.25, d.y + d.height * 0.5, {
      steps: 8,
    });
    await p.mouse.up();
    assert.ok(Number(await p.locator("#anatomy-range").inputValue()) < 30);
    await p
      .locator("#anatomy")
      .screenshot({ path: `${out}/${width}-anatomy.png` });
    await p.getByLabel("Talk me through it.", { exact: false }).check();
    await p.getByLabel("Take it at my pace.", { exact: false }).check();
    assert.match(
      await p.locator("#visit-notes").innerText(),
      /Talk me through each step.*Take it at my pace/
    );
    await p
      .locator("#practice")
      .screenshot({ path: `${out}/${width}-visit.png` });
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
    assert.match(
      await p.locator("#request-preferences").innerText(),
      /Take it at my pace/
    );
    await p.getByRole("button", { name: "Send demo request" }).click();
    assert.ok(await p.locator("#request-fields").isVisible());
    await p.locator("#request-name").fill("Alex Example");
    await p.locator("#request-email").fill("alex@example.com");
    await p.locator("#request-time").selectOption("Afternoon");
    await p.getByRole("button", { name: "Send demo request" }).click();
    await p.locator("#request-result").waitFor();
    assert.match(await p.locator("#request-summary").innerText(), /Afternoon/);
    assert.match(
      await p.locator("#request-summary").innerText(),
      /Take it at my pace/
    );
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
      particleScan: "pass",
      anatomyDragAndKeyboard: "pass",
      visitPreferencesInRequest: "pass",
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
  await p.locator("#scan-art[data-ready=true]").waitFor();
  await p.waitForTimeout(2600);
  assert.equal(await p.locator("#scan-range").inputValue(), "0");
  await p.locator("#scan-range").fill("100");
  const initial = await p
    .locator("#tooth-particles")
    .evaluate(e => e.toDataURL());
  const art = await p.locator("#scan-art").boundingBox();
  await p.mouse.move(art.x + art.width * 0.55, art.y + art.height * 0.4);
  await p.waitForTimeout(300);
  assert.notEqual(
    await p.locator("#tooth-particles").evaluate(e => e.toDataURL()),
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
    "arrival scan settles; particles respond to pointer; magnetic label moves with stable hitbox";
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
