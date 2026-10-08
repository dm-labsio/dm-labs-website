import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.ARCOS_QA_URL || "http://127.0.0.1:5173";
const out = fileURLToPath(
  new URL("../../output/website-refresh/arcos/qa/", import.meta.url)
);
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const report = { base, viewports: [], errors: [], failedAssets: [] };
const view = async s =>
  JSON.parse(await s.locator("#tour-dialog").getAttribute("data-view"));
const ready = async s =>
  s
    .locator('#tour-dialog[data-engine="3d"][data-tour-ready="true"]')
    .waitFor({ timeout: 60000 });
async function check(p, s = p, width = 1440) {
  await s.locator("#open-tour").click();
  await ready(s);
  assert.equal(await s.locator("#panorama canvas").count(), 1);
  const start = await view(s);
  assert.equal(start.stop, 0);
  await s.locator("#panorama").press("ArrowRight");
  assert.ok((await view(s)).yaw > start.yaw + 0.4);
  await s.locator("[data-tour-action=reset]").click();
  const b = await s.locator("#panorama").boundingBox();
  await p.mouse.move(b.x + b.width * 0.65, b.y + b.height * 0.25);
  await p.mouse.down();
  await p.mouse.move(b.x + b.width * 0.35, b.y + b.height * 0.25, { steps: 8 });
  await p.mouse.up();
  assert.ok(Math.abs((await view(s)).yaw - start.yaw) > 0.25);
  await s.locator("[data-tour-action=reset]").click();
  await s.locator("[data-tour-scene=courtyard]").click();
  await ready(s);
  let v = await view(s);
  assert.equal(v.stop, 2);
  assert.ok(Math.abs(v.yaw - start.yaw) < 0.0001);
  assert.equal(v.y, 1.6);
  await s.locator("#toggle-tour-map").click();
  assert.equal(await s.locator("#tour-map").isVisible(), true);
  assert.ok(
    Math.abs(
      Number(await s.locator("#tour-map-dot").getAttribute("cx")) - 315
    ) < 0.1
  );
  await s.locator("#toggle-tour-map").click();
  await s.locator("[data-tour-scene=dining]").click();
  await ready(s);
  v = await view(s);
  assert.equal(v.stop, 5);
  assert.equal(v.x, 0);
  assert.ok(Math.abs(v.z + 4.6) < 0.0001);
  assert.equal(
    await s.locator("[data-tour-action=forward]").isDisabled(),
    true
  );
  await s.locator("[data-tour-scene=living]").click();
  await ready(s);
  v = await view(s);
  assert.equal(v.stop, 0);
  assert.equal(v.x, start.x);
  await p.mouse.move(0, 0);
  await p.screenshot({ path: out + `3d-${width}.png` });
  assert.ok(
    await s.locator("#tour-dialog").evaluate(d => {
      const r = d.getBoundingClientRect();
      return (
        d.scrollWidth <= d.clientWidth + 1 &&
        [...d.querySelectorAll(".tour-toolbar button,#close-tour")].every(e => {
          const b = e.getBoundingClientRect();
          return (
            b.left >= r.left &&
            b.right <= r.right + 1 &&
            b.top >= r.top &&
            b.bottom <= r.bottom + 1
          );
        })
      );
    })
  );
  await s.locator("#close-tour").click();
  await s.locator("#panorama canvas").waitFor({ state: "detached" });
  assert.equal(
    await s.locator("#open-tour").evaluate(e => e === document.activeElement),
    true
  );
  await s.locator("#open-tour").click();
  await ready(s);
  await s.locator("#close-tour").press("Escape");
  await s.locator("#panorama canvas").waitFor({ state: "detached" });
}
try {
  for (const width of [320, 390, 768, 1440]) {
    const p = await browser.newPage({
      viewport: { width, height: width < 700 ? 844 : 1000 },
      reducedMotion: "reduce",
      hasTouch: width < 700,
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
    assert.equal(requests.filter(u => /house\.glb|three-0/.test(u)).length, 0);
    await check(p, p, width);
    report.viewports.push(width);
    await p.close();
  }
  const moving = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  await moving.goto(base + "/previews/arcos-architecture.html");
  await moving.locator("#open-tour").click();
  await ready(moving);
  const before = await view(moving);
  const samples = await moving.locator("#tour-dialog").evaluate(async d => {
    const positions = [];
    document.querySelector("[data-tour-action=forward]").click();
    await new Promise(resolve => {
      function sample() {
        positions.push(JSON.parse(d.dataset.view));
        if (d.dataset.tourReady === "true") resolve();
        else requestAnimationFrame(sample);
      }
      requestAnimationFrame(sample);
    });
    return positions;
  });
  assert.ok(samples.some(v => v.x > before.x && v.x < -3.25));
  assert.ok(samples.every(v => v.y === before.y && v.yaw === before.yaw));
  assert.equal((await view(moving)).stop, 1);
  await moving.locator("[data-tour-action=forward]").click();
  await moving.waitForTimeout(100);
  await moving.locator("#close-tour").click();
  await moving.locator("#open-tour").click();
  await ready(moving);
  assert.equal((await view(moving)).stop, 0);
  report.continuousMovement = "passed";
  await moving.close();
  const failure = await browser.newPage();
  await failure.route("**/house.glb", r => r.abort());
  await failure.goto(base + "/previews/arcos-architecture.html");
  await failure.locator("#open-tour").click();
  await failure.locator("#retry-tour").waitFor();
  await failure.unroute("**/house.glb");
  await failure.locator("#retry-tour").click();
  await ready(failure);
  report.retry = "passed";
  await failure.close();
  const early = await browser.newPage();
  await early.route("**/house.glb", async r => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    await r.continue();
  });
  await early.goto(base + "/previews/arcos-architecture.html");
  await early.locator("#open-tour").click();
  await early.locator("#close-tour").click();
  await early.waitForTimeout(1800);
  assert.equal(await early.locator("#panorama canvas").count(), 0);
  await early.locator("#open-tour").click();
  await ready(early);
  report.earlyClose = "passed";
  await early.close();
  const landscape = await browser.newPage({
    viewport: { width: 844, height: 390 },
    reducedMotion: "reduce",
  });
  await landscape.goto(base + "/previews/arcos-architecture.html");
  await landscape.locator("#open-tour").click();
  await ready(landscape);
  assert.ok(
    await landscape
      .locator("#tour-dialog")
      .evaluate(d => d.scrollHeight <= d.clientHeight + 1)
  );
  await landscape.screenshot({ path: out + "3d-landscape.png" });
  await landscape.close();
  report.landscape = "passed";
  const touch = await browser.newPage({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
  });
  await touch.goto(base + "/previews/arcos-architecture.html");
  await touch.locator("#open-tour").tap();
  await ready(touch);
  const initial = await view(touch),
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
  assert.ok(Math.abs((await view(touch)).yaw - initial.yaw) > 0.25);
  report.touchDrag = "passed";
  await touch.close();
  const wrapper = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  await wrapper.goto(base + "/preview/arcos-architecture/");
  const frame = wrapper.frameLocator("iframe");
  await frame.locator("html[data-arcos-ready=true]").waitFor();
  await check(wrapper, frame, "wrapper");
  await wrapper.close();
  report.wrapper = "passed";
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.failedAssets, []);
} finally {
  await writeFile(out + "3d-report.json", JSON.stringify(report, null, 2));
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
