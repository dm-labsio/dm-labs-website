import { chromium } from "playwright";
import assert from "node:assert/strict";
const base = process.env.WORK_QA_URL || "http://127.0.0.1:5179";
const browser = await chromium.launch();
try {
  for (const prefix of ["", "/el", "/he"])
    for (const width of [390, 1440]) {
      const page = await browser.newPage({
        viewport: { width, height: 900 },
        isMobile: width < 700,
        hasTouch: width < 700,
      });
      const errors = [],
        videos = [];
      page.on("pageerror", e => errors.push(e.message));
      page.on("request", r => {
        if (r.url().includes("/work-films/") && r.url().endsWith(".mp4"))
          videos.push(r.url());
      });
      await page.addInitScript(() =>
        localStorage.setItem(
          "dm_cookie_consent",
          JSON.stringify({ essential: true, analytics: false })
        )
      );
      await page.goto(base + prefix + "/templates/");
      await page.waitForLoadState("networkidle");
      await page.locator("#brand-films").scrollIntoViewIfNeeded();
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(500);
      assert.equal(await page.locator(".film-cover").count(), 8);
      assert.equal(
        videos.length,
        0,
        "No videos should load before interaction"
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth
        ),
        false
      );
      const schemas = await page
        .locator('script[type="application/ld+json"]')
        .allTextContents();
      const videoCount = schemas.join("").match(/"@type":"VideoObject"/g) || [];
      assert.equal(videoCount.length, 8);
      await page.screenshot({
        path: `/tmp/films-${prefix.slice(1) || "en"}-${width}.png`,
      });
      for (let i = 0; i < 8; i++) {
        const trigger = page.locator(".film-cover").nth(i);
        await trigger.scrollIntoViewIfNeeded();
        await page.waitForTimeout(750);
        const before = await page.evaluate(() => scrollY);
        await trigger.click();
        const modal = page.locator(".film-dialog");
        await modal.waitFor();
        await page.waitForTimeout(250);
        assert.equal(
          await modal.evaluate(e => e.scrollWidth > e.clientWidth),
          false
        );
        assert.equal(
          await modal.locator(".film-contact").getAttribute("href"),
          prefix + "/contact/"
        );
        const selectedClip = await trigger.getAttribute("data-clip");
        assert.ok(
          (await modal.locator("video").getAttribute("src")).endsWith(
            `/${selectedClip}.mp4`
          ),
          "Every cover opens its own film"
        );
        const cover = await trigger.evaluate(el => {
          const r = el.getBoundingClientRect(),
            img = el.querySelector("img");
          return {
            ratio: r.width / r.height,
            expected:
              Number(img.getAttribute("width")) /
              Number(img.getAttribute("height")),
            fit: getComputedStyle(img).objectFit,
            cursor: getComputedStyle(el).cursor,
          };
        });
        assert.ok(
          Math.abs(cover.ratio - cover.expected) < 0.02,
          "Covers preserve the actual video proportions"
        );
        assert.equal(cover.fit, "contain");
        assert.equal(cover.cursor, "pointer");
        assert.equal(
          await trigger.locator("svg,span").count(),
          0,
          "No covering icons or labels"
        );
        const clips = modal.locator(".film-clip-list button");
        for (let j = 0; j < (await clips.count()); j++) {
          await clips.nth(j).click();
          await page.waitForFunction(() => {
            const v = document.querySelector(".film-player video");
            return v && v.readyState >= 2 && v.videoWidth > 0;
          });
          assert.equal(await clips.nth(j).getAttribute("aria-pressed"), "true");
          assert.equal(await modal.locator("video").count(), 1);
          const data = await modal.locator("video").evaluate(v => ({
            width: v.videoWidth,
            height: v.videoHeight,
            error: v.error?.message,
            objectFit: getComputedStyle(v).objectFit,
            duration: v.duration,
            controls: v.controls,
            playsInline: v.playsInline,
            src: v.currentSrc,
          }));
          assert.equal(data.error, undefined);
          assert.equal(data.objectFit, "contain");
          assert.ok(data.duration > 10 && data.duration < 50);
          assert.equal(data.controls, true);
          assert.equal(data.playsInline, true);
          assert.ok(
            Math.abs(
              data.width / data.height -
                (data.src.includes("landscape") ? 16 / 9 : 9 / 16)
            ) < 0.01
          );
          await modal.locator("video").evaluate(async v => {
            v.currentTime = 2;
            await v.play();
          });
          await page.waitForTimeout(150);
          assert.equal(
            await modal.locator("video").evaluate(v => v.paused),
            false
          );
          await modal.locator("video").evaluate(v => v.pause());
        }
        await page.keyboard.press("Tab");
        assert.equal(
          await modal.evaluate(e => e.contains(document.activeElement)),
          true
        );
        if (i === 2)
          await page.screenshot({
            path: `/tmp/films-player-${prefix.slice(1) || "en"}-${width}.png`,
          });
        if (i === 0) await page.goBack();
        else await modal.locator(".film-close").click();
        await modal.waitFor({ state: "hidden" });
        await page.waitForTimeout(300);
        assert.equal(await page.locator(".film-player video").count(), 0);
        assert.ok(
          Math.abs((await page.evaluate(() => scrollY)) - before) < 4,
          "Return scroll position"
        );
        assert.equal(
          await trigger.evaluate(e => document.activeElement === e),
          true,
          "Restore focus"
        );
        assert.equal(new URL(page.url()).searchParams.has("film"), false);
      }
      assert.deepEqual(errors, []);
      console.log(
        "PASS eight individual covers, exact clip selection, audio-capable playback, aspect ratios, clip switches, back/close, scroll/focus",
        prefix || "en",
        width
      );
      await page.close();
    }
  const page = await browser.newPage({
    viewport: { width: 320, height: 800 },
    reducedMotion: "reduce",
  });
  await page.goto(base + "/he/templates/?film=dm-labs&clip=dm-treat");
  await page.waitForLoadState("networkidle");
  await page.locator(".film-dialog").waitFor();
  assert.equal(
    await page
      .locator(".film-dialog")
      .evaluate(e => e.scrollWidth > e.clientWidth),
    false
  );
  assert.ok(
    (await page.locator(".film-player video").getAttribute("src")).includes(
      "dm-treat"
    )
  );
  await page.keyboard.press("Escape");
  await page.locator(".film-dialog").waitFor({ state: "hidden" });
  assert.equal(new URL(page.url()).searchParams.has("film"), false);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth
    ),
    false
  );
  assert.ok(
    await page
      .locator(".film-cover")
      .first()
      .evaluate(e => parseFloat(getComputedStyle(e).transitionDuration) < 0.001)
  );
  await page.close();
  console.log("PASS 320px RTL, reduced motion, deep link and Escape");
} finally {
  await browser.close();
}
