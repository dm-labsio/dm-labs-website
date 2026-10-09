import { chromium } from "playwright";
import assert from "node:assert/strict";
const base = process.env.SUNDAY_QA_URL || "http://127.0.0.1:5177";
const browser = await chromium.launch();
try {
  for (const prefix of ["", "/el", "/he"]) {
    const p = await browser.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    await p.addInitScript(() =>
      localStorage.setItem(
        "dm_cookie_consent",
        JSON.stringify({ essential: true, analytics: false })
      )
    );
    await p.goto(base + prefix + "/templates/");
    await p.waitForFunction(() =>
      Object.keys(
        document.querySelector('[data-demo-card="sunday-boat"] button') || {}
      ).some(k => k.startsWith("__reactProps"))
    );
    assert.equal(await p.locator("[data-demo-card]").count(), 9);
    const card = p.locator('[data-demo-card="sunday-boat"]');
    await card.scrollIntoViewIfNeeded();
    await card.locator("img").evaluate(i => i.decode());
    await card.locator("button").click();
    const y = await p.evaluate(() => history.state.dmGalleryPosition.y);
    await p.locator('a[href^="/preview/sunday-boat/"]').click();
    await p.waitForURL(/\/preview\/sunday-boat\//);
    const f = p.frameLocator("iframe");
    await f.locator("html.intro-ready").waitFor({ state: "attached" });
    await f.locator("#next-plate").click();
    assert.equal(
      await f.locator('[data-plate="1"]').getAttribute("aria-pressed"),
      "true"
    );
    await f.locator(".header-ticket").click();
    await f.locator('[data-menu="1"]').click();
    assert.equal(await f.locator("#menu-panel-1").isVisible(), true);
    assert.match(
      await p.locator('meta[name="robots"]').getAttribute("content"),
      /noindex/
    );
    await p.getByRole("button", { name: "Close preview", exact: true }).click();
    await p.waitForURL(base + prefix + "/templates/");
    await p.waitForTimeout(700);
    assert.ok(
      Math.abs((await p.evaluate(() => scrollY)) - y) < 12,
      "Exact gallery return position"
    );
    console.log(
      `${prefix || "EN"}: nine demos, Sunday cover, working embedded menu and food fan, noindex, exact return scroll passed`
    );
    await p.close();
  }
  const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  let starts = 0;
  await p.exposeFunction("introStarted", () => starts++);
  await p.addInitScript(() => {
    new MutationObserver(() => {
      if (
        document.documentElement?.classList.contains("intro-ready") &&
        !window.__introRecorded
      ) {
        window.__introRecorded = true;
        window.introStarted();
      }
    }).observe(document, { attributes: true, childList: true, subtree: true });
  });
  await p.route("**/assets/index-*.js", async r => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    await r.continue();
  });
  await p.goto(base + "/preview/sunday-boat/");
  const f = p.frameLocator("iframe");
  await f.locator("html.intro-ready").waitFor({ state: "attached" });
  await f.locator('[data-plate="1"][aria-pressed="true"]').waitFor();
  assert.equal(starts, 1, "Only live viewer starts introduction");
  await f.locator("#next-plate").click();
  await p.waitForTimeout(3000);
  assert.equal(
    await f.locator('[data-plate="2"]').getAttribute("aria-pressed"),
    "true",
    "Manual selection is retained"
  );
  console.log(
    "Cold viewer: one introduction, short automatic card change, manual selection retained"
  );
} finally {
  await browser.close();
}
