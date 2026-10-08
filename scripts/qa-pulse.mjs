import { chromium } from "playwright";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import {
  sessions,
  clashes,
  validVisit,
  nextMonday,
  calendarFor,
  cyprusDate,
  addDays,
} from "../client/public/previews/pulse/data.mjs";
const base = process.env.PULSE_QA_URL || "http://127.0.0.1:5173";
const out = fileURLToPath(
  new URL("../../output/website-refresh/pulse/qa/", import.meta.url)
);
await mkdir(out, { recursive: true });
const now = new Date("2026-10-07T12:00:00Z");
assert.equal(nextMonday(now), "2026-10-12");
assert.equal(validVisit("2026-10-07", "10:00", now), false);
assert.equal(validVisit("2026-11-07", "10:00", now), false);
assert.equal(validVisit("2026-10-08", "10:00", now), true);
assert.equal(validVisit("2026-10-08", "02:00", now), false);
assert.equal(
  validVisit("2026-02-30", "10:00", new Date("2026-02-15T12:00:00Z")),
  false
);
const strength = sessions.find(s => s.id === "strength-0-12:00"),
  functional = sessions.find(s => s.id === "functional-0-12:00");
assert.ok(clashes(strength, functional));
assert.equal(clashes(strength, { ...functional, time: "13:00" }), false);
assert.match(
  calendarFor([strength], "2026-10-12", now),
  /DTSTART:20261012T090000Z/
);
assert.match(
  calendarFor([strength], "2026-11-02", now),
  /DTSTART:20261102T100000Z/
);
assert.match(
  calendarFor([strength], "2026-11-02", now),
  /DTEND:20261102T110000Z/
);
const browser = await chromium.launch();
const report = {
  base,
  dataChecks: "passed",
  views: [],
  errors: [],
  failures: [],
};
const observe = p => {
  p.on("pageerror", e => report.errors.push(e.message));
  p.on("response", r => {
    if (
      r.status() >= 400 &&
      (r.url().includes("/previews/pulse") ||
        r.url().includes("images.unsplash.com"))
    )
      report.failures.push({ url: r.url(), status: r.status() });
  });
};
try {
  for (const width of [320, 390, 768, 1024, 1440]) {
    const p = await browser.newPage({
      viewport: { width, height: width < 700 ? 844 : 1000 },
      reducedMotion: "reduce",
      hasTouch: width < 700,
      isMobile: width < 700,
      acceptDownloads: true,
    });
    observe(p);
    await p.goto(base + "/previews/pulse-gym.html");
    await p.waitForFunction(
      () => document.documentElement.dataset.pulseReady === "true"
    );
    await p.evaluate(() => document.fonts.ready);
    assert.equal(await p.locator('a[href="#"]').count(), 0);
    assert.ok(
      await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1
      )
    );
    if (width <= 800) {
      await p.locator(".menu-toggle").click();
      assert.equal(
        await p.locator(".menu-toggle").getAttribute("aria-expanded"),
        "true"
      );
      await p.locator('#nav-links a[href="#schedule"]').click();
      assert.equal(
        await p.locator(".menu-toggle").getAttribute("aria-expanded"),
        "false"
      );
    }
    for (const type of [
      "strength",
      "hiit",
      "boxing",
      "functional",
      "yoga",
      "run",
    ]) {
      await p.locator(`[data-class=${type}]`).click();
      assert.equal(await p.locator("#class-filter").inputValue(), type);
      assert.ok((await p.locator(".session-row").count()) > 0);
    }
    await p.locator("#reset-filters").click();
    await p.locator("#day-0").click();
    await p.locator('[data-session="strength-0-12:00"]').click();
    assert.equal(await p.locator("#plan-count").textContent(), "1");
    await p.locator('[data-session="functional-0-12:00"]').click();
    assert.equal(await p.locator("#plan-count").textContent(), "1");
    assert.match(await p.locator("#planner-status").textContent(), /overlaps/);
    await p.locator("#day-0").focus();
    await p.keyboard.press("ArrowRight");
    assert.equal(
      await p.locator("#day-1").getAttribute("aria-selected"),
      "true"
    );
    await p.keyboard.press("End");
    assert.equal(
      await p.locator("#day-6").getAttribute("aria-selected"),
      "true"
    );
    await p.keyboard.press("Home");
    assert.equal(
      await p.locator("#day-0").getAttribute("aria-selected"),
      "true"
    );
    const download = await Promise.all([
      p.waitForEvent("download"),
      p.locator("#download-week").click(),
    ]);
    const file = await download[0].path();
    const ics = await readFile(file, "utf8");
    assert.match(ics, /BEGIN:VCALENDAR/);
    assert.match(ics, /SUMMARY:Demo: Strength & Power/);
    assert.equal((ics.match(/BEGIN:VEVENT/g) || []).length, 1);
    await p.reload();
    await p.waitForFunction(
      () => document.documentElement.dataset.pulseReady === "true"
    );
    assert.equal(await p.locator("#plan-count").textContent(), "1");
    await p.locator("#clear-plan").click();
    assert.equal(await p.locator("#plan-count").textContent(), "0");
    assert.ok(await p.locator("#download-week").isDisabled());
    await p.locator("#class-filter").selectOption("boxing");
    await p.locator("#coach-filter").selectOption("maria");
    assert.match(await p.locator("#day-sessions").textContent(), /No matching/);
    await p.locator("#reset-filters").click();
    for (const coach of ["alex", "maria", "nikos"]) {
      await p.locator(`[data-coach=${coach}]`).click();
      assert.ok(await p.locator("#coach-dialog").isVisible());
      await p.locator("#coach-sessions").click();
      assert.equal(await p.locator("#coach-filter").inputValue(), coach);
      assert.ok((await p.locator(".session-row").count()) > 0);
    }
    for (const name of ["Starter", "Performance", "Elite"]) {
      await p.locator(`.price-btn[data-join=${name}]`).click();
      assert.equal(await p.locator("#membership").inputValue(), name);
      assert.ok(await p.locator("#visit-dialog").isVisible());
      await p.keyboard.press("Escape");
    }
    await p.locator(".nav-cta").click();
    assert.equal(await p.locator("#membership").inputValue(), "Performance");
    await p.locator("[data-close=visit-dialog]").click();
    for (const sel of [
      ".hero [data-visit=trial]",
      ".cta [data-visit=trial]",
      ".cta [data-visit=tour]",
    ]) {
      await p.locator(sel).click();
      assert.ok(await p.locator("#membership-field").isHidden());
      await p.locator("#visit-date").fill(addDays(cyprusDate(), 2));
      await p.locator("#visit-time").selectOption("13:00");
      await p.locator("#visit-form button[type=submit]").click();
      assert.ok(await p.locator("#visit-done").isVisible());
      assert.match(await p.locator("#pass-date").textContent(), /13:00/);
      await p.locator("#edit-visit").click();
      assert.ok(await p.locator("#visit-form").isVisible());
      await p.locator("#visit-form button[type=submit]").click();
      await p.locator("#pass-schedule").click();
      assert.ok(await p.locator("#visit-dialog").isHidden());
    }
    for (const type of ["nutrition", "contact"]) {
      await p.locator(`[data-info=${type}]`).click();
      assert.ok(await p.locator("#info-dialog").isVisible());
      await p.locator("#info-tour").click();
      assert.match(
        await p.locator("#visit-title").textContent(),
        /look around/
      );
      await p.locator("[data-close=visit-dialog]").click();
    }
    await p.locator("footer [data-visit=tour]").click();
    await p.keyboard.press("Escape");
    assert.equal(
      await p
        .locator("footer [data-visit=tour]")
        .evaluate(el => el === document.activeElement),
      true
    );
    for (const img of await p.locator("section img").all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(el => el.decode());
    }
    await p.locator("#reset-filters").click();
    await p.locator("#day-0").click();
    await p.locator('[data-session="strength-0-07:00"]').click();
    await p.locator("#schedule").screenshot({
      path: out + `schedule-${width}.png`,
      style: "nav{visibility:hidden}.skip{visibility:hidden}",
    });
    await p.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await p.screenshot({ path: out + `hero-${width}.png` });
    await p.locator(".cta [data-visit=trial]").click();
    await p.locator("#visit-date").fill(addDays(cyprusDate(), 2));
    await p.locator("#visit-time").selectOption("10:00");
    await p.locator("#visit-form button[type=submit]").click();
    await p
      .locator("#visit-dialog")
      .screenshot({ path: out + `pass-${width}.png` });
    report.views.push({
      width,
      planner: "passed",
      calendar: "passed",
      buttons: "passed",
      dialogs: "passed",
      overflow: false,
    });
    await p.close();
  }
  const p = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  observe(p);
  await p.goto(base + "/preview/pulse-gym/");
  await p.waitForFunction(() => history.state?.previewSentinel === true);
  const f = p.frameLocator("iframe");
  await f.locator("html[data-pulse-ready=true]").waitFor();
  await f.locator(".hero [data-visit=trial]").click();
  assert.ok(await f.locator("#visit-dialog").isVisible());
  await f.locator("[data-close=visit-dialog]").click();
  await f.locator("[data-coach=alex]").hover({ position: { x: 30, y: 30 } });
  assert.notEqual(
    await f
      .locator("[data-coach=alex]")
      .evaluate(el => getComputedStyle(el).transform),
    "none"
  );
  await f.locator("[data-coach=alex]").click();
  await f.locator("#coach-sessions").click();
  assert.equal(await f.locator("#coach-filter").inputValue(), "alex");
  await f.locator("#reset-filters").click();
  await f.locator("#day-0").click();
  await f.locator('[data-session="strength-0-07:00"]').click();
  const wrappedDownload = await Promise.all([
    p.waitForEvent("download"),
    f.locator("#download-week").click(),
  ]);
  assert.match(
    await readFile(await wrappedDownload[0].path(), "utf8"),
    /BEGIN:VCALENDAR/
  );
  const historyLength = await p.evaluate(() => history.length);
  await p.setViewportSize({ width: 390, height: 844 });
  await f.locator(".menu-toggle").click();
  await f.locator('#nav-links a[href="#classes"]').click();
  assert.equal(
    await f.locator(".menu-toggle").getAttribute("aria-expanded"),
    "false"
  );
  assert.equal(await p.evaluate(() => history.length), historyLength);
  await f.locator("#lineup-jump").click();
  assert.equal(
    await f
      .locator("#plan-title")
      .evaluate(el => document.activeElement === el),
    true
  );
  await p.setViewportSize({ width: 1440, height: 1000 });
  const frame = p.frames().find(f => f.parentFrame());
  await frame.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await p.screenshot({ path: out + "wrapper-desktop.png" });
  report.wrapper = "passed";
  report.pointerMotion = "passed";
  report.wrapperDownload = "passed";
  report.wrapperMobileNavigation = "passed";
  await p.goto(base + "/preview/bella-salon/");
  await p.waitForFunction(() => history.state?.previewSentinel === true);
  const bella = p.frameLocator("iframe");
  await bella.locator("html[data-bella-ready=true]").waitFor();
  assert.ok(
    !(await p.locator("iframe").getAttribute("sandbox")).includes(
      "allow-downloads"
    )
  );
  await bella.locator('.site-header a[href="#looks"]').click();
  assert.ok(await bella.locator("#looks").isVisible());
  report.existingDemoWrapper = "passed";
  await p.close();
  assert.equal(report.errors.length, 0, JSON.stringify(report.errors));
  assert.equal(report.failures.length, 0, JSON.stringify(report.failures));
  await writeFile(out + "report.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
