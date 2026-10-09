import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.argv[2] || "http://localhost:5192";
const out = process.argv[3] || "/private/tmp/dm-seasonal-banner";
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const results = [];
try {
  for (const language of ["en", "el", "he"]) {
    for (const width of [1440, 1024, 768, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 } });
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.addInitScript(() => {
        Date.now = () => Date.parse("2026-10-15T12:00:00Z");
        localStorage.setItem(
          "dm_cookie_consent",
          '{"essential":true,"analytics":false}'
        );
        window.bannerCLS = 0;
        new PerformanceObserver(list => {
          for (const entry of list.getEntries())
            if (!entry.hadRecentInput) window.bannerCLS += entry.value;
        }).observe({ type: "layout-shift", buffered: true });
      });
      let release;
      let noticed;
      const gate = new Promise(resolve => {
        release = resolve;
      });
      const requested = new Promise(resolve => {
        noticed = resolve;
      });
      await page.route("**/assets/HalloweenLayer-*.css", async route => {
        noticed();
        await gate;
        await route.continue();
      });
      await page.goto(base + (language === "en" ? "/" : `/${language}/`));
      await Promise.race([
        requested,
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Expected built seasonal CSS request")),
            15000
          )
        ),
      ]);
      await page.evaluate(() => document.fonts.ready);
      const before = await page.locator("h1").boundingBox();
      await page.waitForTimeout(200);
      assert.equal(
        await page.locator(".seasonal-layer, .seasonal-bats").count(),
        0,
        "Both seasonal entry points wait for their shared CSS"
      );
      // Isolate the banner's load from the existing locale/font first render.
      const initialCLS = await page.evaluate(() => window.bannerCLS);
      release();
      await page.locator(".seasonal-banner").waitFor();
      await page.waitForFunction(() => {
        const image = document.querySelector(".seasonal-banner-mark");
        return image?.complete && image.naturalWidth > 0;
      });
      const banner = await page.locator(".seasonal-banner").boundingBox();
      const eyebrow = await page.locator(".home-hero-eyebrow").boundingBox();
      const after = await page.locator("h1").boundingBox();
      assert(
        Math.abs(before.y - after.y) < 1,
        "Loading the banner does not move the heading"
      );
      assert(
        banner.y + banner.height < eyebrow.y,
        "Banner clears original hero copy"
      );
      assert(banner.x >= 0 && banner.x + banner.width <= width + 1);
      assert.equal(await page.locator(".seasonal-banner b").innerText(), "10%");
      for (const selector of [
        ".seasonal-banner a",
        ".seasonal-banner button",
      ]) {
        assert(
          await page.locator(selector).evaluate(el => {
            const r = el.getBoundingClientRect();
            return el.contains(
              document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)
            );
          }),
          "Banner controls are unobscured"
        );
      }
      await page.waitForTimeout(250);
      const cls = await page.evaluate(() => window.bannerCLS);
      const bannerCLS = cls - initialCLS;
      assert(bannerCLS < 0.01, `Banner caused layout shift: ${bannerCLS}`);
      assert.deepEqual(errors, []);
      await page.screenshot({ path: `${out}/${language}-${width}.png` });
      results.push({
        language,
        width,
        cls,
        initialCLS,
        bannerCLS,
        delayedCSS: "pass",
        controls: "pass",
      });
      console.log(JSON.stringify(results.at(-1)));
      await page.close();
    }
  }
  await writeFile(`${out}/results.json`, JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
