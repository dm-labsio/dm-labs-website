import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";

const base = process.argv[2] || "http://localhost:5190";
const out = process.argv[3] || "/private/tmp/dm-seasonal-photos";
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
try {
  for (const language of ["en", "el", "he"])
    for (const width of [1440, 390, 320]) {
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.clock.setFixedTime(new Date("2026-10-15T12:00:00Z"));
      await page.addInitScript(() =>
        localStorage.setItem(
          "dm_cookie_consent",
          '{"essential":true,"analytics":false}'
        )
      );
      await page.goto(base + (language === "en" ? "/" : `/${language}/`));
      await page.locator(".seasonal-photo-ornament").first().waitFor();
      assert.equal(await page.locator(".seasonal-photo-ornament").count(), 2);
      await page.locator(".home-team").scrollIntoViewIfNeeded();
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(() =>
        [...document.querySelectorAll(".team-profile-photo")].every(
          img => img.complete && img.naturalWidth > 0
        )
      );
      const before = await page
        .locator(".team-profile-photo-frame")
        .evaluateAll(frames =>
          frames.map(frame => {
            const box = frame.getBoundingClientRect();
            const overlay = frame.querySelector(".seasonal-photo-ornament");
            const webs = [...overlay.querySelectorAll("svg")].map(svg => {
              const r = svg.getBoundingClientRect();
              return {
                inside:
                  r.left >= box.left - 1 &&
                  r.right <= box.right + 1 &&
                  r.top >= box.top - 1 &&
                  r.bottom <= box.bottom + 1,
                coversCentre:
                  r.left < box.left + box.width / 2 &&
                  r.right > box.left + box.width / 2 &&
                  r.top < box.top + box.height / 2 &&
                  r.bottom > box.top + box.height / 2,
              };
            });
            return {
              width: box.width,
              height: box.height,
              pointer: getComputedStyle(overlay).pointerEvents,
              hidden: overlay.getAttribute("aria-hidden"),
              webs,
            };
          })
        );
      for (const frame of before) {
        assert.equal(frame.pointer, "none");
        assert.equal(frame.hidden, "true");
        assert(frame.webs.every(web => web.inside && !web.coversCentre));
      }
      for (let index = 0; index < 2; index++) {
        await page.locator(".team-profile").nth(index).scrollIntoViewIfNeeded();
        await page.waitForTimeout(900); // Let the existing card entrance finish before visual review.
        await page
          .locator(".team-profile")
          .nth(index)
          .screenshot({ path: `${out}/${language}-${width}-${index}.png` });
      }
      if (width < 768) {
        const toggle = page.locator(".team-profile-toggle").first();
        await toggle.click();
        assert.equal(await toggle.getAttribute("aria-expanded"), "true");
        await toggle.click();
      }
      await page.evaluate(() => scrollTo(0, 0));
      await page.locator(".seasonal-banner button").click();
      assert.equal(await page.locator(".seasonal-photo-ornament").count(), 0);
      const after = await page
        .locator(".team-profile-photo-frame")
        .evaluateAll(frames =>
          frames.map(frame => {
            const r = frame.getBoundingClientRect();
            return { width: r.width, height: r.height };
          })
        );
      assert(
        after.every(
          (frame, index) =>
            Math.abs(frame.width - before[index].width) < 0.1 &&
            Math.abs(frame.height - before[index].height) < 0.1
        ),
        "Decorations must not alter card dimensions (allow subpixel rounding)"
      );
      assert.deepEqual(errors, []);
      console.log(
        `${language} ${width}: photo corners, portraits, controls, layout and dismissal passed`
      );
      await context.close();
    }
} finally {
  await browser.close();
}
