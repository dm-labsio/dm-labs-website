import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.argv[2] || "http://localhost:5190";
const out = process.argv[3] || "/private/tmp/dm-seasonal-scroll";
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const results = [];
try {
  for (const [path, width, reduced, saveData] of [
    ["/", 1440, false, false],
    ["/", 1024, false, false],
    ["/", 768, false, false],
    ["/el/", 390, false, false],
    ["/he/", 320, false, false],
    ["/", 390, true, false],
    ["/", 390, false, true],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: reduced ? "reduce" : "no-preference",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.addInitScript(
      ({ saveData }) => {
        localStorage.setItem(
          "dm_cookie_consent",
          '{"essential":true,"analytics":false}'
        );
        if (saveData)
          Object.defineProperty(navigator, "connection", {
            value: { saveData: true },
            configurable: true,
          });
      },
      { saveData }
    );
    await page.clock.setFixedTime(new Date("2026-10-15T12:00:00+03:00"));
    await page.goto(base + path);
    await page.locator(".seasonal-layer").waitFor();
    const counts = await page.locator("img[data-artwork]").evaluateAll(images =>
      images.reduce(
        (all, image) => ({
          ...all,
          [image.dataset.artwork]: (all[image.dataset.artwork] || 0) + 1,
        }),
        {}
      )
    );
    assert.equal(Object.keys(counts).length, 3);
    assert(
      Math.max(...Object.values(counts)) - Math.min(...Object.values(counts)) <=
        1,
      "Balanced distribution of all three cutouts"
    );
    assert.equal(await page.locator('img[src*="glass-pumpkins"]').count(), 0);
    const scenes = page.locator(".seasonal-scroll-scene");
    for (let index = 0; index < (await scenes.count()); index++) {
      const scene = scenes.nth(index);
      await scene.evaluate(el =>
        el.scrollIntoView({ block: "center", behavior: "instant" })
      );
      await page.waitForTimeout(150);
      await page.waitForFunction(index => {
        const image = document.querySelectorAll(".seasonal-single")[index];
        return image?.complete && image.naturalWidth > 0;
      }, index);
      const box = await scene.boundingBox();
      assert(
        box.x >= -1 && box.x + box.width <= width + 1,
        "Scene stays within viewport"
      );
      assert.equal(
        await scene.evaluate(el => getComputedStyle(el).pointerEvents),
        "none"
      );
      if (width < 1360) {
        assert(
          await scene.evaluate(el => {
            const section = el.parentElement.parentElement;
            const bottom = section.getBoundingClientRect().bottom;
            const padding = parseFloat(getComputedStyle(section).paddingBottom);
            return (
              el.querySelector("img").getBoundingClientRect().top >=
              bottom - padding - 1
            );
          }),
          "Compact artwork stays inside the empty bottom padding"
        );
      }
      if (reduced || saveData)
        assert.equal(await scene.getAttribute("data-motion"), "still");
      if (index === 0 && !reduced && !saveData) {
        assert.equal(await scene.getAttribute("data-motion"), "playing");
        assert(
          await scene.evaluate(
            el => el.getAnimations({ subtree: true }).length > 0
          ),
          "Scroll animation actually starts"
        );
        await page.waitForTimeout(4400);
        assert.equal(await scene.getAttribute("data-motion"), "still");
        assert.equal(
          await scene.evaluate(
            el => el.getAnimations({ subtree: true }).length
          ),
          0
        );
      }
      if (index === 1 && !reduced && !saveData) {
        assert.equal(await scene.getAttribute("data-motion"), "playing");
        await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
        await page.waitForTimeout(100);
        assert.equal(
          await scene.getAttribute("data-motion"),
          "still",
          "Leaving viewport cancels motion"
        );
        await scene.evaluate(el =>
          el.scrollIntoView({ block: "center", behavior: "instant" })
        );
        await page.waitForTimeout(100);
        assert.equal(
          await scene.getAttribute("data-motion"),
          "still",
          "No repeat on rescroll"
        );
      }
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1
        )
      );
      if (!reduced && !saveData) await page.waitForTimeout(500);
      await page.screenshot({
        path: `${out}/${path.replaceAll("/", "") || "en"}-${width}-section-${index}.png`,
      });
    }
    if (!reduced && !saveData) {
      await page.reload();
      await page.locator(".seasonal-layer").waitFor();
      await scenes
        .first()
        .evaluate(el =>
          el.scrollIntoView({ block: "center", behavior: "instant" })
        );
      await page.waitForTimeout(200);
      assert.equal(
        await scenes.first().getAttribute("data-motion"),
        "still",
        "No replay after reload"
      );
    }
    assert.deepEqual(errors, []);
    results.push({ path, width, reduced, saveData, counts, status: "pass" });
    console.log(JSON.stringify(results.at(-1)));
    await context.close();
  }
  await writeFile(`${out}/results.json`, JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
