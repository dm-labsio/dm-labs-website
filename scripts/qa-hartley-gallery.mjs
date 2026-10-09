import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const base = process.env.HARTLEY_QA_URL || "http://127.0.0.1:5175";
const browser = await chromium.launch();
try {
  for (const [prefix, title] of [
    ["", "Our Work"],
    ["/el", "Η δουλειά μας"],
    ["/he", "העבודות שלנו"],
  ]) {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
      acceptDownloads: true,
    });
    await page.addInitScript(() =>
      localStorage.setItem(
        "dm_cookie_consent",
        JSON.stringify({ essential: true, analytics: false })
      )
    );
    await page.goto(base + prefix + "/templates/");
    await page.getByRole("heading", { name: title, exact: true }).waitFor();
    await page.waitForFunction(() =>
      Object.keys(document.querySelector("h3.text-lg") || {}).some(key =>
        key.startsWith("__reactProps")
      )
    );
    await page.evaluate(() => document.fonts.ready);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1
      )
    );
    assert.ok((await page.title()).includes(title));
    assert.equal(await page.locator("h3.text-lg").count(), 7);
    await page.locator('[data-demo-card="hartley"] button').click();
    const y = await page.evaluate(() => history.state.dmGalleryPosition.y);
    await page.locator('a[href^="/preview/hartley/"]').click();
    await page.waitForURL(/\/preview\/hartley\//);
    const frame = page.frameLocator("iframe");
    await frame.locator("html[data-hartley-ready=true]").waitFor();
    await frame.getByRole("link", { name: "Find your usual" }).click();
    await frame.getByRole("tab", { name: "From the oven" }).click();
    await frame.getByRole("heading", { name: "From the oven" }).waitFor();
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      frame.getByRole("link", { name: "Keep the tea menu" }).click(),
    ]);
    assert.match(
      download.suggestedFilename(),
      /^(Hartley-)?afternoon-tea-menu\.pdf$/
    );
    assert.equal(await download.failure(), null);
    assert.equal(
      (await readFile(await download.path())).subarray(0, 5).toString(),
      "%PDF-"
    );
    await page
      .getByRole("button", { name: "Close preview", exact: true })
      .click();
    await page.waitForURL(base + prefix + "/templates/");
    await page.waitForTimeout(700);
    assert.ok(
      Math.abs((await page.evaluate(() => scrollY)) - y) < 12,
      "return position"
    );
    console.log(
      "PASS",
      prefix || "EN",
      "Our Work title, seven demos, Hartley opens, menu and PDF work inside wrapper, exact return scroll"
    );
    await page.close();
  }
} finally {
  await browser.close();
}
