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
  new URL("../../output/website-refresh/bella-atelier/qa/", import.meta.url)
);
await mkdir(out, { recursive: true });
const now = new Date(2026, 9, 7, 12);
assert.equal(isBookable("2026-10-07", now), false);
assert.equal(isBookable("2026-10-04", now), false);
assert.equal(isBookable("2026-10-11", now), false);
assert.equal(isBookable("2026-02-30", now), false);
assert.equal(isBookable("2027-01-01", now), false);
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
  bookingBoundaryChecks: "passed",
  views: [],
  errors: [],
  assetFailures: [],
};
try {
  for (const width of [320, 390, 700, 768, 1024, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: width < 700 ? 844 : 1000 },
      reducedMotion: "reduce",
    });
    page.on("pageerror", e =>
      report.errors.push({ width, message: e.message })
    );
    page.on("response", r => {
      if (r.status() >= 400 && r.url().includes("/previews/bella"))
        report.assetFailures.push({ url: r.url(), status: r.status() });
    });
    await page.goto(base + "/previews/bella-salon.html");
    await page.evaluate(() => document.fonts.ready);
    assert.ok(
      await page.evaluate(
        () =>
          document.fonts.check("20px Gambarino") &&
          document.fonts.check('20px "General Sans"')
      )
    );
    const overflow = await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
      offenders: [...document.querySelectorAll("body *")]
        .filter(e => {
          const r = e.getBoundingClientRect();
          return (
            r.width &&
            (r.right > innerWidth + 1 || r.left < -1) &&
            getComputedStyle(e).position !== "fixed" &&
            e.tagName !== "IMG"
          );
        })
        .map(e => e.className)
        .slice(0, 10),
    }));
    assert.ok(overflow.scroll <= width + 1, JSON.stringify(overflow));
    await page.locator(".hero-photo").click();
    assert.ok(await page.locator("#look-dialog").isVisible());
    await page.locator('[data-view="detail"]').click();
    assert.match(
      await page.locator("#look-image").getAttribute("src"),
      /curls-detail/
    );
    await page.locator("#book-look").click();
    await page.waitForFunction(
      () => document.activeElement.id === "booking-service"
    );
    assert.equal(
      await page.locator("#booking-service").inputValue(),
      "texture"
    );
    assert.ok(await page.locator("#review-booking").isDisabled());
    await page.locator("[data-day]:not(:disabled)").first().click();
    await page.locator("[data-time]").first().click();
    assert.ok(await page.locator("#review-booking").isEnabled());
    await page.locator("#booking-service").selectOption("colour");
    assert.ok(await page.locator("#review-booking").isDisabled());
    assert.equal(
      await page.locator("[data-time][aria-pressed=true]").count(),
      0
    );
    await page.locator("[data-time]").first().click();
    await page.locator("#review-booking").click();
    assert.match(
      await page.locator("#review-details").innerText(),
      /Colour & dimension/
    );
    await page.locator("#confirm-booking").click();
    assert.ok(await page.locator("#complete-stage").isVisible());
    if (width === 390 || width === 1440)
      await page.screenshot({ path: out + `confirmation-${width}.png` });
    await page.locator("#start-again").click();
    assert.ok(await page.locator("#review-booking").isDisabled());
    await page.locator('[data-service="finish"]').click();
    assert.match(
      await page.locator("#service-image").getAttribute("src"),
      /tools/
    );
    if (width <= 700)
      assert.equal(
        await page
          .locator(".service-visual")
          .evaluate(e => e.parentElement.dataset.serviceRow),
        "finish"
      );
    await page.locator('[data-service="colour"]').click();
    assert.match(
      await page.locator("#service-image").getAttribute("src"),
      /curls-detail/
    );
    await page.locator(".look-bob").click();
    assert.ok(await page.locator("#look-views").isHidden());
    await page.keyboard.press("Escape");
    assert.ok(await page.locator("#look-dialog").isHidden());
    assert.equal(
      await page
        .locator(".look-bob")
        .evaluate(e => e === document.activeElement),
      true
    );
    for (const section of ["#looks", "#services", "#appointment"]) {
      await page.locator(section).scrollIntoViewIfNeeded();
      if (width === 390 || width === 1440)
        await page.screenshot({
          path: out + `${section.slice(1)}-${width}.png`,
        });
    }
    assert.equal(
      await page
        .locator("img")
        .evaluateAll(
          images =>
            images.filter(
              img =>
                img.getAttribute("src") &&
                !img.closest("dialog") &&
                (!img.complete || !img.naturalWidth)
            ).length
        ),
      0
    );
    await page.evaluate(() => window.scrollTo(0, 0));
    if (width === 390 || width === 1440) {
      await page.screenshot({ path: out + `hero-${width}.png` });
      await page.screenshot({
        path: out + `full-${width}.png`,
        fullPage: true,
      });
    }
    report.views.push({
      width,
      overflow: false,
      booking: "passed",
      lookbook: "passed",
      servicePreview: "passed",
      fonts: "loaded",
    });
    await page.close();
  }
  // Real wrapper route, including srcdoc module resolution and return navigation.
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  page.on("pageerror", e =>
    report.errors.push({ wrapper: true, message: e.message })
  );
  await page.goto(base + "/preview/bella-salon/");
  const frame = page.frameLocator("iframe");
  await frame.locator(".hero-photo").click();
  await frame.locator("#book-look").click();
  assert.equal(await frame.locator("#booking-service").inputValue(), "texture");
  await frame.locator("[data-day]:not(:disabled)").first().click();
  await frame.locator("[data-time]").first().click();
  await frame.locator("#review-booking").click();
  await frame.locator("#confirm-booking").click();
  assert.ok(await frame.locator("#complete-stage").isVisible());
  await frame.locator('.dialog-close[data-close="review-dialog"]').click();
  await frame.locator(".wordmark").click();
  await page.screenshot({ path: out + "wrapper-desktop.png" });
  report.wrapper = "passed";
  await page.close();
  assert.equal(report.errors.length, 0, JSON.stringify(report.errors));
  assert.equal(
    report.assetFailures.length,
    0,
    JSON.stringify(report.assetFailures)
  );
  console.log(JSON.stringify(report, null, 2));
  await writeFile(out + "report.json", JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
