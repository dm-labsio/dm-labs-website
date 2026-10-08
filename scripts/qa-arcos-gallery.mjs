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
    const heading = p.getByRole("heading", {
      name: "Arcos Architecture",
      exact: true,
    });
    await heading.waitFor();
    await heading.scrollIntoViewIfNeeded();
    await heading.evaluate(
      h =>
        new Promise(resolve => {
          const card = h.closest(".group");
          const check = () =>
            Number(getComputedStyle(card).opacity) > 0.99
              ? resolve()
              : requestAnimationFrame(check);
          check();
        })
    );
    await p
      .locator('img[src="/media/examples/arcos/cover.webp"]')
      .evaluate(i => i.decode());
    await p.screenshot({
      path: out + "gallery-" + (prefix.slice(1) || "en") + ".png",
    });
    await heading.click();
    const preview = p.locator('a[href^="/preview/arcos-architecture/"]');
    await preview.click();
    await p.waitForFunction(() => history.state?.previewSentinel === true);
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
