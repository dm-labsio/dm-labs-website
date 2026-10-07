import { chromium } from "playwright";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { mkdir, writeFile } from "node:fs/promises";
import {
  services,
  slotsFor,
  isBookable,
  validAppointment,
} from "../client/public/previews/bella/booking.mjs";
const base = process.env.BELLA_QA_URL || "http://127.0.0.1:5173";
const out = fileURLToPath(
  new URL("../../output/website-refresh/bella-atelier/qa-v2/", import.meta.url)
);
await mkdir(out, { recursive: true });
const now = new Date(2026, 9, 7, 12);
for (const key of [
  "2026-10-07",
  "2026-10-04",
  "2026-10-11",
  "2026-02-30",
  "2027-01-01",
])
  assert.equal(isBookable(key, now), false);
assert.equal(isBookable("2026-10-08", now), true);
for (const key of ["2026-10-08", "2026-10-10"])
  for (const service of Object.keys(services))
    for (const time of slotsFor(key, service, now)) {
      const [h, m] = time.split(":").map(Number);
      assert.ok(
        h * 60 + m + services[service].minutes <=
          (key.endsWith("10") ? 16 : 18) * 60
      );
    }
assert.equal(
  validAppointment(
    { service: "colour", day: "2026-10-10", time: "16:30" },
    now
  ),
  false
);
assert.equal(
  validAppointment(
    { service: "invalid", day: "2026-10-08", time: "09:30" },
    now
  ),
  false
);
const browser = await chromium.launch({ headless: true });
const report = {
  base,
  bookingBoundaries: "passed",
  views: [],
  errors: [],
  assetFailures: [],
};
function observe(page) {
  page.on("pageerror", e => report.errors.push(e.message));
  page.on("response", r => {
    if (r.status() >= 400 && r.url().includes("/previews/bella"))
      report.assetFailures.push({ url: r.url(), status: r.status() });
  });
}
try {
  for (const width of [320, 390, 700, 768, 1024, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: width < 700 ? 844 : 1000 },
      reducedMotion: "reduce",
      hasTouch: width < 700,
      isMobile: width < 700,
    });
    observe(page);
    await page.goto(base + "/previews/bella-salon.html");
    await page.waitForFunction(
      () => document.documentElement.dataset.bellaReady === "true"
    );
    await page.evaluate(() => document.fonts.ready);
    const fonts = await page.evaluate(() =>
      [...document.fonts].filter(f => f.status === "loaded").map(f => f.family)
    );
    assert.ok(
      fonts.includes("Melodrama") && fonts.includes("Switzer"),
      JSON.stringify(fonts)
    );
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1
      ),
      `Overflow at ${width}`
    );
    await page.locator("[data-layout=sheet]").click();
    assert.equal(
      await page.locator("[data-layout=sheet]").getAttribute("aria-pressed"),
      "true"
    );
    await page.locator("[data-layout=expand]").click();
    for (const id of ["bob", "coils", "twist", "waves"]) {
      await page.locator(`[data-look=${id}]`).click();
      assert.ok(await page.locator("#look-dialog").isVisible());
      assert.match(
        await page.locator("#look-image").getAttribute("src"),
        new RegExp(`hair-${id}`)
      );
      await page.locator("#look-image").evaluate(el => el.decode());
      await page.locator("[data-close=look-dialog]").click();
      assert.equal(
        await page.evaluate(() => document.activeElement.dataset.look),
        id
      );
    }
    await page.locator("[data-look=bob]").click();
    await page.locator("#next-look").click();
    assert.match(await page.locator("#look-title").textContent(), /Light/);
    await page.keyboard.press("ArrowRight");
    assert.match(await page.locator("#look-title").textContent(), /sculpture/);
    await page.locator("#book-look").click();
    assert.ok(await page.locator("#booking-dialog").isVisible());
    assert.equal(await page.locator("#booking-service").inputValue(), "finish");
    assert.match(
      await page.locator("#selected-look").textContent(),
      /sculpture/
    );
    assert.ok(await page.locator("#review-booking").isDisabled());
    await page.locator("[data-day]:not(:disabled)").first().click();
    await page.locator("[data-time]").first().click();
    assert.ok(await page.locator("#review-booking").isEnabled());
    await page.locator("#booking-service").selectOption("colour");
    assert.ok(await page.locator("#review-booking").isDisabled());
    assert.ok(await page.locator("#selected-look").isHidden());
    await page.locator("[data-time]").first().click();
    await page.locator("#review-booking").click();
    assert.match(
      await page.locator("#review-summary").textContent(),
      /Colour & dimension/
    );
    await page.locator("#edit-booking").click();
    assert.ok(await page.locator("#booking-flow").isVisible());
    await page.locator("#review-booking").click();
    await page.locator("#confirm-booking").click();
    assert.ok(await page.locator("#booking-done").isVisible());
    await page
      .locator("#booking-dialog")
      .screenshot({ path: out + `booking-${width}.png` });
    await page.locator("#reset-booking").click();
    assert.ok(await page.locator("#review-booking").isDisabled());
    await page.keyboard.press("Escape");
    assert.ok(await page.locator("#booking-dialog").isHidden());
    for (const service of Object.keys(services)) {
      await page.locator(`.service-menu [data-book=${service}]`).click();
      assert.equal(
        await page.locator("#booking-service").inputValue(),
        service
      );
      await page.locator("[data-close=booking-dialog]").click();
    }
    for (const img of await page.locator("main img").all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(el => el.decode());
    }
    await page.locator("#looks").scrollIntoViewIfNeeded();
    await page
      .locator("#looks")
      .screenshot({ path: out + `gallery-${width}.png` });
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: out + `hero-${width}.png` });
    if ([390, 1440].includes(width))
      await page.screenshot({
        path: out + `page-${width}.png`,
        fullPage: true,
      });
    report.views.push({
      width,
      fonts,
      overflow: false,
      gallery: "passed",
      booking: "passed",
      focusReturn: "passed",
    });
    await page.close();
  }
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  observe(page);
  await page.goto(base + "/preview/bella-salon/");
  await page.waitForFunction(() => history.state?.previewSentinel === true);
  const frame = page.frameLocator("iframe");
  await frame.locator("html[data-bella-ready=true]").waitFor();
  await frame.locator(".hair-gallery").scrollIntoViewIfNeeded();
  await frame.locator("[data-look=bob]").hover();
  await page.waitForTimeout(750);
  const a = await frame.locator("[data-look=bob]").boundingBox(),
    b = await frame.locator("[data-look=coils]").boundingBox();
  assert.ok(a.width > b.width * 1.8, "Desktop gallery expands on hover");
  await frame.locator("[data-look=bob]").focus();
  await page.keyboard.press("ArrowRight");
  assert.equal(
    await frame
      .locator("[data-look=coils]")
      .evaluate(el => document.activeElement === el),
    true
  );
  await frame.locator("[data-look=coils]").click();
  await frame.locator("#book-look").click();
  assert.equal(await frame.locator("#booking-service").inputValue(), "texture");
  await frame.locator("[data-close=booking-dialog]").click();
  const iframe = page.frames().find(f => f.parentFrame());
  await iframe.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: out + "wrapper-desktop.png" });
  report.wrapper = "passed";
  report.desktopMotion = "passed";
  await page.close();
  assert.equal(report.errors.length, 0, JSON.stringify(report.errors));
  assert.equal(
    report.assetFailures.length,
    0,
    JSON.stringify(report.assetFailures)
  );
  await writeFile(out + "report.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
