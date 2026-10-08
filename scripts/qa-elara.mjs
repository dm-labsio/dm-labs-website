import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.ELARA_QA_URL || "http://127.0.0.1:5175";
const out = "../output/website-refresh/elara";
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const report = { base, cases: [], errors: [] };
try {
  for (const width of [320, 390, 768, 1440]) {
    const p = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
      hasTouch: width < 700,
      acceptDownloads: true,
    });
    p.on("pageerror", e => report.errors.push(e.message));
    await p.goto(base + "/previews/dr-elara-dental.html");
    await p.locator("html[data-elara-ready=true]").waitFor();
    await p.evaluate(() => document.fonts.ready);
    assert.ok(
      await p
        .locator(".clinic img")
        .evaluate(img => img.complete && img.naturalWidth > 0)
    );
    assert.equal(await p.locator("#care-video").evaluate(v => v.paused), true);
    assert.ok(
      await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1
      ),
      "page overflow"
    );
    await p.screenshot({ path: `${out}/${width}-hero.png` });
    await p.getByRole("tab", { name: /Your smile/ }).click();
    await p
      .getByRole("tabpanel")
      .getByRole("heading", { name: /feels like you/ })
      .waitFor();
    await p.getByRole("tab", { name: /Your smile/ }).press("ArrowDown");
    assert.equal(
      await p.locator("#tab-restore").getAttribute("aria-selected"),
      "true"
    );
    await p.locator("#care-book").click();
    assert.equal(
      await p.locator("#visit-care").inputValue(),
      "Repair & restore"
    );
    await p.locator("#close-booking").press("Escape");
    assert.equal(await p.locator("#booking").evaluate(d => d.open), false);
    await p.locator(".comfort input").nth(0).check();
    await p.locator(".comfort input").nth(2).check();
    assert.match(await p.locator("#comfort-note").innerText(), /each step/);
    await p.locator(".comfort [data-book]").click();
    assert.match(
      await p.locator("#booking-comfort").innerText(),
      /pause signal/
    );
    await p.locator("#visit-care").selectOption("Growing smiles");
    await p.locator("input[name=date]").nth(2).check();
    await p.locator('input[name=time][value="16:30"]').check();
    await p.getByRole("button", { name: "Preview my visit" }).click();
    assert.match(
      await p.locator("#visit-summary").innerText(),
      /Growing smiles/
    );
    assert.match(await p.locator("#visit-summary").innerText(), /16:30/);
    await p.screenshot({ path: `${out}/${width}-planner.png` });
    const downloadPromise = p.waitForEvent("download");
    await p.locator("#save-plan").click();
    const download = await downloadPromise;
    assert.equal(download.suggestedFilename(), "elara-sample-visit.txt");
    await p.locator("#edit-plan").click();
    assert.equal(await p.locator("#visit-care").inputValue(), "Growing smiles");
    await p.locator("#close-booking").click();
    await p.waitForFunction(() => document.body.style.overflow === "");
    assert.ok(
      await p
        .locator(".comfort [data-book]")
        .evaluate(e => document.activeElement === e)
    );
    assert.equal(await p.evaluate(() => document.body.style.overflow), "");
    await p.locator("#care").scrollIntoViewIfNeeded();
    await p.screenshot({ path: `${out}/${width}-care.png` });
    const history = await p.evaluate(() => history.length);
    await p.locator('footer a[href="#main"]').click();
    assert.equal(await p.evaluate(() => history.length), history);
    await p.screenshot({ path: `${out}/${width}-full.png`, fullPage: true });
    report.cases.push({
      width,
      layout: "pass",
      tabs: "pass",
      comfort: "pass",
      planner: "pass",
      download: "pass",
      focus: "pass",
      history: "pass",
    });
    await p.close();
  }
  const p = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await p.goto(base + "/previews/dr-elara-dental.html");
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
