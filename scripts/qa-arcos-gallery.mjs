import { chromium } from "playwright";
import assert from "node:assert/strict";
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const base = process.env.ARCOS_QA_URL || "http://127.0.0.1:5173";
const out = fileURLToPath(
  new URL("../../output/website-refresh/arcos/qa/", import.meta.url)
);
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const report = [];
try {
  for (const prefix of ["", "/el", "/he"]) {
    const p = await browser.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    const path = prefix + "/templates/";
    await p.goto(base + path + "?qa=arcos");
    await p.waitForURL(base + path);
    const card = p.locator('[data-demo-card="arcos-architecture"]');
    const heading = card.locator("button");
    await heading.waitFor();
    await heading.scrollIntoViewIfNeeded();
    await card.locator("img").evaluate(i => i.decode());
    await p.screenshot({
      path: out + "gallery-" + (prefix.slice(1) || "en") + ".png",
    });
    await heading.click();
    const returnY = await p.evaluate(() => history.state.dmGalleryPosition.y);
    const preview = p.locator('a[href^="/preview/arcos-architecture/"]');
    await preview.click();
    await p.waitForURL(/\/preview\/arcos-architecture\//);
    await p
      .frameLocator("iframe")
      .locator("html[data-arcos-ready=true]")
      .waitFor();
    assert.equal(
      await p.locator("meta[name=robots]").getAttribute("content"),
      "noindex, follow"
    );
    await p.getByRole("button", { name: "Close preview", exact: true }).click();
    await p.waitForURL(base + path);
    await p.waitForFunction(y => Math.abs(scrollY - y) < 12, returnY);
    assert.ok(await heading.isVisible());
    report.push({
      language: prefix.slice(1) || "en",
      cover: "passed",
      previewAndReturn: "passed",
      noindex: "passed",
    });
    await p.close();
  }
} finally {
  await browser.close();
}
await writeFile(out + "gallery-report.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
