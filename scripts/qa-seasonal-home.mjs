import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.argv[2] || "http://localhost:5190";
const out = process.argv[3] || "/private/tmp/dm-halloween-qa";
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const results = [];
const paths = { en: "/", el: "/el/", he: "/he/" };
const heading = {
  en: "Built to impress. Designed to convert.",
  el: "Εντυπωσιάζει με το καλημέρα. Και φέρνει πελάτες.",
  he: "בונים לכם אתר שיביא יותר לקוחות",
};
async function newPage(options = {}, date = "2026-10-15T12:00:00+03:00") {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  await page.clock.setFixedTime(new Date(date));
  return { page, context };
}
try {
  for (const language of ["en", "el", "he"])
    for (const width of [1440, 390, 320]) {
      const { page, context } = await newPage({
        viewport: { width, height: 1000 },
      });
      const errors = [];
      page.on("pageerror", e => errors.push(e.message));
      await page.goto(base + paths[language]);
      await page.locator(".seasonal-layer").waitFor();
      const cookie = page.getByRole("button", {
        name: { en: "Reject", el: "Απόρριψη", he: "לא, תודה" }[language],
        exact: true,
      });
      if (await cookie.isVisible()) await cookie.click();
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(() => {
        const image = document.querySelector(".seasonal-glass");
        return image?.complete && image.naturalWidth > 0;
      });
      assert.equal(
        (await page.locator("h1").innerText()).replace(/\s+/g, " ").trim(),
        heading[language]
      );
      assert.equal(await page.locator("h1").count(), 1);
      assert.equal(
        await page.locator('link[rel="canonical"]').getAttribute("href"),
        "https://dm-labs.io" + paths[language]
      );
      assert.equal(
        await page.locator(".seasonal-decor").getAttribute("aria-hidden"),
        "true"
      );
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1
        )
      );
      const banner = await page.locator(".seasonal-banner").boundingBox();
      const title = await page.locator("h1").boundingBox();
      assert(
        banner.y + banner.height < title.y,
        "Banner must not cover heading"
      );
      assert(banner.x >= 0 && banner.x + banner.width <= width + 1);
      // Verify the visible close target, not merely its DOM presence.
      assert(
        await page.locator(".seasonal-banner button").evaluate(b => {
          const r = b.getBoundingClientRect();
          return b.contains(
            document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)
          );
        }),
        "Close control must not be obscured"
      );
      await page.screenshot({ path: `${out}/${language}-${width}-hero.png` });
      await page.waitForFunction(
        () =>
          document.querySelector(".seasonal-layer")?.dataset.motion === "still"
      );
      assert.equal(
        await page.locator(".seasonal-particle").count(),
        0,
        "Particles clean up after the short animation"
      );
      await page.locator(".seasonal-banner a").click();
      await page.waitForURL(
        "**" + (language === "en" ? "/contact/" : `/${language}/contact/`)
      );
      assert.equal(await page.locator(".seasonal-layer").count(), 0);
      await page.goto(base + paths[language]);
      await page.locator(".seasonal-layer").waitFor();
      assert.equal(
        await page.locator(".seasonal-particle").count(),
        0,
        "No replay in same session"
      );
      await page.locator(".seasonal-banner button").click();
      assert.equal(await page.locator(".seasonal-layer").count(), 0);
      assert(
        await page
          .locator(".home-hero-primary")
          .evaluate(a => a === document.activeElement)
      );
      await page.reload();
      await page.waitForTimeout(600);
      assert.equal(
        await page.locator(".seasonal-layer").count(),
        0,
        "Dismissal persists in the session"
      );
      assert.deepEqual(errors, []);
      results.push({
        language,
        width,
        layout: "pass",
        navigation: "pass",
        dismissal: "pass",
        errors,
      });
      console.log(JSON.stringify(results.at(-1)));
      await context.close();
    }
  for (const scenario of [
    "reduced",
    "expired",
    "before",
    "other-route",
    "blocked-storage",
    "module-failure",
    "save-data",
    "offscreen",
  ]) {
    const { page, context } = await newPage(
      { reducedMotion: scenario === "reduced" ? "reduce" : "no-preference" },
      scenario === "expired"
        ? "2026-11-02T12:00:00Z"
        : scenario === "before"
          ? "2026-10-08T12:00:00Z"
          : undefined
    );
    const seasonalRequests = [];
    page.on("request", r => {
      if (/HalloweenLayer|glass-pumpkins/.test(r.url()))
        seasonalRequests.push(r.url());
    });
    if (scenario === "blocked-storage")
      await page.addInitScript(() =>
        Object.defineProperty(window, "sessionStorage", {
          get() {
            throw new Error("Storage blocked");
          },
        })
      );
    if (scenario === "save-data")
      await page.addInitScript(() =>
        Object.defineProperty(navigator, "connection", {
          value: { saveData: true },
        })
      );
    if (scenario === "module-failure")
      await page.route(/HalloweenLayer/, route => route.abort());
    await page.goto(base + (scenario === "other-route" ? "/services/" : "/"));
    await page.locator("h1").waitFor();
    if (
      ["expired", "before", "other-route", "module-failure"].includes(scenario)
    ) {
      await page.waitForTimeout(1800);
      assert.equal(await page.locator(".seasonal-layer").count(), 0);
      if (scenario !== "module-failure")
        assert.equal(
          seasonalRequests.length,
          0,
          "Inactive theme downloads nothing"
        );
    } else {
      await page.locator(".seasonal-layer").waitFor();
      if (["reduced", "save-data"].includes(scenario))
        assert.equal(await page.locator(".seasonal-particle").count(), 0);
      if (scenario === "offscreen") {
        await page.evaluate(() => scrollTo(0, 1600));
        await page.waitForFunction(
          () =>
            document.querySelector(".seasonal-layer")?.dataset.motion ===
            "still"
        );
        assert.equal(await page.locator(".seasonal-particle").count(), 0);
      }
    }
    console.log(`${scenario}: passed`);
    results.push({ scenario, passed: true });
    await context.close();
  }
  await writeFile(`${out}/results.json`, JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
