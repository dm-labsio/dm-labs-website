import { chromium } from "playwright";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.ARCOS_QA_URL || "http://127.0.0.1:5173";
const out = fileURLToPath(
  new URL("../../output/website-refresh/arcos/qa/", import.meta.url)
);
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const report = { base, views: [], errors: [], failedAssets: [] };
const readView = async scope =>
  JSON.parse(await scope.locator("#tour-dialog").getAttribute("data-view"));
async function tourReady(scope, key = "living") {
  await scope
    .locator(`#tour-dialog[data-tour-ready="true"][data-scene="${key}"]`)
    .waitFor();
}
async function run(p, scope = p, width = 390, wrapped = false) {
  await scope.locator("#open-tour").click();
  await tourReady(scope);
  assert.equal(await scope.locator("#panorama canvas").count(), 1);
  let view = await readView(scope);
  await scope.locator("[data-tour-action=left]").click();
  assert.ok((await readView(scope)).yaw < view.yaw - 5);
  await scope.locator("[data-tour-action=right]").click();
  await scope.locator("[data-tour-action=in]").click();
  assert.ok((await readView(scope)).fov < view.fov);
  await scope.locator("[data-tour-action=reset]").click();
  assert.ok(Math.abs((await readView(scope)).yaw) < 1);
  await scope.locator("#panorama").focus();
  await scope.locator("#panorama").press("ArrowRight");
  assert.ok((await readView(scope)).yaw > 5);
  await scope.locator("#panorama").press("Home");
  assert.ok(Math.abs((await readView(scope)).yaw) < 1);
  const box = await scope.locator("#panorama").boundingBox();
  await p.mouse.move(box.x + box.width * 0.65, box.y + box.height * 0.25);
  await p.mouse.down();
  await p.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.25, {
    steps: 8,
  });
  await p.mouse.up();
  await p.waitForTimeout(350);
  assert.ok(
    Math.abs((await readView(scope)).yaw) > 2,
    `Dragging must change the view at ${width}px: ${JSON.stringify(await readView(scope))}`
  );
  await scope.locator("[data-tour-action=reset]").click();
  // In-scene controls actually change the image and return in both directions.
  await scope.locator(".tour-hotspot").click();
  await tourReady(scope, "courtyard");
  assert.equal(
    await scope
      .locator("[data-tour-scene=courtyard]")
      .getAttribute("aria-pressed"),
    "true"
  );
  await p.mouse.move(0, 0);
  await p.screenshot({
    path: out + `tour-${wrapped ? "wrapper-" : ""}${width}.png`,
  });
  await scope.locator(".tour-hotspot").click();
  await tourReady(scope, "living");
  await scope.locator("[data-tour-scene=courtyard]").click();
  await tourReady(scope, "courtyard");
  await scope.locator("[data-tour-scene=living]").click();
  await tourReady(scope, "living");
  // All controls stay within the dialog even on short and narrow displays.
  const fits = await scope.locator("#tour-dialog").evaluate(d => {
    const r = d.getBoundingClientRect();
    return (
      [...d.querySelectorAll(".tour-toolbar button,#close-tour")].every(b => {
        const q = b.getBoundingClientRect();
        return (
          q.left >= r.left &&
          q.right <= r.right + 1 &&
          q.top >= r.top &&
          q.bottom <= r.bottom
        );
      }) && d.scrollWidth <= d.clientWidth + 1
    );
  });
  assert.ok(fits, "Tour controls must not overlap or escape the dialog");
  await scope.locator("#close-tour").press("Escape");
  assert.equal(await scope.locator("#tour-dialog").isVisible(), false);
  assert.equal(
    await scope
      .locator("#open-tour")
      .evaluate(e => document.activeElement === e),
    true
  );
  await scope.locator("#panorama canvas").waitFor({ state: "detached" });
  assert.equal(
    await scope.locator("#panorama canvas").count(),
    0,
    "Closing must release WebGL"
  );
  await scope.locator("#open-tour").click();
  await tourReady(scope);
  await scope.locator("#close-tour").click();
  await scope.locator("#enlarge-plan").click();
  assert.equal(await scope.locator("#plan-dialog").isVisible(), true);
  await scope.locator("#plan-dialog img").evaluate(i => i.decode());
  if (width < 700) {
    const scroller = scope.locator(".large-plan-scroll");
    assert.ok(await scroller.evaluate(n => n.scrollWidth > n.clientWidth));
    await scroller.evaluate(n => (n.scrollLeft = n.scrollWidth));
    assert.ok(await scroller.evaluate(n => n.scrollLeft > 0));
  }
  await scope.locator("#close-plan").press("Escape");
  assert.equal(
    await scope
      .locator("#enlarge-plan")
      .evaluate(e => document.activeElement === e),
    true
  );
  const clear = await scope.locator(".drawing-panel").evaluate(n => {
    const drawing = n.querySelector(".plan").getBoundingClientRect();
    return [...n.querySelectorAll("button")].every(
      b => b.getBoundingClientRect().top >= drawing.bottom - 1
    );
  });
  assert.ok(clear, "Plan controls must not cover the drawing");
}
try {
  for (const width of [320, 390, 768, 1024, 1440]) {
    const p = await browser.newPage({
      viewport: { width, height: width < 700 ? 844 : 1000 },
      hasTouch: width < 700,
      reducedMotion: "reduce",
    });
    p.on("pageerror", e => report.errors.push(e.message));
    p.on("response", r => {
      if (r.status() >= 400 && /arcos/.test(r.url()))
        report.failedAssets.push(r.url());
    });
    const requests = [];
    p.on("request", r => requests.push(r.url()));
    await p.goto(base + "/previews/arcos-architecture.html");
    await p.locator("html[data-arcos-ready=true]").waitFor();
    assert.equal(
      requests.filter(u => /tour-.*webp|pannellum/.test(u)).length,
      0,
      "Tour must be lazy"
    );
    await run(p, p, width);
    await p
      .locator("#house")
      .screenshot({
        path: out + `refined-plan-${width}.png`,
        style: ".site-header,.skip-link{visibility:hidden}",
      });
    assert.ok(
      await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1
      )
    );
    report.views.push({
      width,
      tour: "passed",
      plan: "passed",
      overflow: false,
    });
    await p.close();
  }
  const p = await browser.newPage({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    reducedMotion: "reduce",
  });
  await p.goto(base + "/preview/arcos-architecture/");
  await p.waitForFunction(() => history.state?.previewSentinel === true);
  const frame = p.frameLocator("iframe");
  await frame.locator("html[data-arcos-ready=true]").waitFor();
  await run(p, frame, 390, true);
  report.wrapper = "passed";
  await p.close();
  // Simulated image failure stays recoverable and does not take down the page.
  const failure = await browser.newPage();
  await failure.route("**/tour-living.webp", r => r.abort());
  await failure.goto(base + "/previews/arcos-architecture.html");
  await failure.locator("#open-tour").click();
  await failure.locator("#retry-tour").waitFor();
  assert.match(
    await failure.locator("#tour-loading").innerText(),
    /could not load/
  );
  await failure.unroute("**/tour-living.webp");
  await failure.locator("#retry-tour").click();
  await tourReady(failure);
  await failure.locator("#close-tour").click();
  report.imageFailureRecovery = "passed";
  // A slow library request followed by an early close must not leave a renderer alive.
  await failure.close();
  const early = await browser.newPage();
  await early.route("**/pannellum-2.5.7.js", async r => {
    await new Promise(resolve => setTimeout(resolve, 500));
    await r.continue();
  });
  await early.goto(base + "/previews/arcos-architecture.html");
  await early.locator("#open-tour").click();
  await early.locator("#close-tour").click();
  await early.waitForTimeout(900);
  assert.equal(await early.locator("#panorama canvas").count(), 0);
  await early.locator("#open-tour").click();
  await tourReady(early);
  await early.close();
  report.earlyClose = "passed";
  // Landscape mobile: toolbar must fit without obscuring the viewport.
  const landscape = await browser.newPage({
    viewport: { width: 844, height: 390 },
    reducedMotion: "reduce",
  });
  await landscape.goto(base + "/previews/arcos-architecture.html");
  await landscape.locator("#open-tour").click();
  await tourReady(landscape);
  assert.ok(
    await landscape
      .locator("#tour-dialog")
      .evaluate(d => d.scrollHeight <= d.clientHeight + 1)
  );
  await landscape.close();
  report.landscape = "passed";
  // Real touch events in Chromium, beyond merely resizing the window.
  const touch = await browser.newPage({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
  });
  await touch.goto(base + "/previews/arcos-architecture.html");
  await touch.locator("#open-tour").tap();
  await tourReady(touch);
  const before = await readView(touch),
    r = await touch.locator("#panorama").boundingBox(),
    cdp = await touch.context().newCDPSession(touch);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: r.x + r.width * 0.7, y: r.y + r.height * 0.3 }],
  });
  for (let i = 1; i <= 8; i++)
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [
        { x: r.x + r.width * (0.7 - i * 0.05), y: r.y + r.height * 0.3 },
      ],
    });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await touch.waitForTimeout(350);
  assert.ok(Math.abs((await readView(touch)).yaw - before.yaw) > 3);
  await touch.close();
  report.touchDrag = "passed";
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.failedAssets, []);
} finally {
  await writeFile(out + "tour-report.json", JSON.stringify(report, null, 2));
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
