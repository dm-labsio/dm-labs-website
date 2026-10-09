import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.LUXE_QA_URL || "http://127.0.0.1:5175";
const out = "../output/website-refresh/luxe";
await mkdir(out, { recursive: true });
const b = await chromium.launch();
const report = { base, cases: [], errors: [] };
async function choose(p, key, value) {
  const menu = p.locator(`[data-filter="${key}"]`);
  if (!(await menu.getAttribute("open")) && !(await menu.evaluate(e => e.open)))
    await menu.locator("summary").click();
  await menu.locator(`input[value="${value}"]`).check();
  if (await menu.evaluate(e => e.open)) await p.keyboard.press("Escape");
}
async function ids(p, expected) {
  assert.deepEqual(
    await p
      .locator("[data-fan-home]")
      .evaluateAll(cards => cards.map(c => c.dataset.fanHome)),
    expected
  );
  assert.deepEqual(
    await p
      .locator(".property-card")
      .evaluateAll(cards => cards.map(c => c.dataset.home)),
    expected
  );
}
try {
  for (const width of [320, 390, 768, 1440]) {
    const p = await b.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
      hasTouch: width < 700,
    });
    const posts = [];
    p.on("pageerror", e => report.errors.push(e.message));
    p.on("request", r => {
      if (r.method() === "POST") posts.push(r.url());
    });
    await p.goto(base + "/previews/luxe-realty.html");
    await p.locator("html[data-luxe-ready=true]").waitFor();
    await p.evaluate(() => document.fonts.ready);
    assert.ok(
      await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1
      )
    );
    assert.ok(
      await p.evaluate(() =>
        [...document.querySelectorAll('a[href^="#"]')].every(a =>
          document.getElementById(a.hash.slice(1))
        )
      )
    );
    await p.screenshot({ path: `${out}/${width}-hero.png` });
    for (const index of [2, 4, 0]) {
      await p.locator(`[data-frame="${index}"]`).click();
      await p.waitForFunction(
        i =>
          document
            .querySelector(`[data-frame="${i}"]`)
            .getAttribute("aria-pressed") === "true",
        index
      );
    }
    assert.equal(
      await p
        .locator(
          "[data-save], [data-open-saved], #portfolio, #saved-dialog, #download-shortlist"
        )
        .count(),
      0
    );
    for (const key of ["location", "type", "beds", "price", "tags", "sort"]) {
      const menu = p.locator(`[data-filter="${key}"]`);
      await menu.locator("summary").click();
      assert.equal(await p.locator(".filter-menu[open]").count(), 1);
      const panel = await menu.locator(".filter-panel").boundingBox();
      assert.ok(
        panel.x >= 0 && panel.x + panel.width <= width + 1,
        key + " panel fits viewport"
      );
      await p.keyboard.press("Escape");
      assert.equal(await p.locator(".filter-menu[open]").count(), 0);
    }
    for (const [key, values, expected] of [
      ["location", ["horizon", "atelier"], ["horizon", "atelier"]],
      ["type", ["house", "penthouse"], ["horizon", "atelier", "pine"]],
      ["beds", ["2", "4plus"], ["horizon", "atelier", "pine"]],
      ["price", ["under1", "1to2"], ["atelier", "pine"]],
    ]) {
      const menu = p.locator(`[data-filter="${key}"]`);
      await menu.locator("summary").click();
      for (const value of values) {
        await menu.locator(`input[value="${value}"]`).check();
        assert.ok(
          await menu.evaluate(e => e.open),
          key + " remains open for multiple choices"
        );
      }
      await ids(p, expected);
      await menu.locator(".filter-clear").click();
      await ids(p, ["horizon", "atelier", "pine"]);
      await menu.locator(".filter-done").click();
      assert.equal(await menu.evaluate(e => e.open), false);
    }
    assert.equal(await p.locator('#sort-menu [data-filter="sort"]').count(), 1);
    assert.equal(
      await p.locator('#filter-menus input[type="radio"]').count(),
      0
    );
    await choose(p, "location", "atelier");
    await ids(p, ["atelier"]);
    await choose(p, "beds", "4plus");
    await p.locator("#empty").waitFor();
    await p.locator("#clear-filters").click();
    await ids(p, ["horizon", "atelier", "pine"]);
    await choose(p, "type", "house");
    await ids(p, ["horizon", "pine"]);
    await choose(p, "price", "1to2");
    await ids(p, ["pine"]);
    await p
      .getByRole("button", { name: "Remove €1–2 million filter", exact: true })
      .click();
    await ids(p, ["horizon", "pine"]);
    await p.locator("#reset-filters").click();
    for (const [tag, expected] of [
      ["sea-view", ["horizon"]],
      ["pool", ["horizon"]],
      ["garden", ["horizon", "pine"]],
      ["terrace", ["horizon", "atelier", "pine"]],
      ["rooftop", ["atelier"]],
      ["office", ["atelier", "pine"]],
      ["city-view", ["atelier"]],
      ["parking", ["pine"]],
    ]) {
      await choose(p, "tags", tag);
      await ids(p, expected);
      await p.locator("#reset-filters").click();
    }
    await choose(p, "tags", "garden");
    await choose(p, "tags", "office");
    await ids(p, ["pine"]);
    assert.match(
      await p.locator(".property-card .property-tags").innerText(),
      /Private garden/
    );
    await choose(p, "tags", "pool");
    await ids(p, []);
    await p.locator("#clear-filters").click();
    for (const [sort, expected] of [
      ["price-up", ["atelier", "pine", "horizon"]],
      ["price-down", ["horizon", "pine", "atelier"]],
      ["size-down", ["pine", "horizon", "atelier"]],
      ["size-up", ["atelier", "horizon", "pine"]],
      ["featured", ["horizon", "atelier", "pine"]],
    ]) {
      await choose(p, "sort", sort);
      await ids(p, expected);
    }
    await p.locator('[data-filter="location"] summary').click();
    await p.locator('[data-filter="type"] summary').click();
    assert.equal(await p.locator(".filter-menu[open]").count(), 1);
    await p.locator("#collection-title").click();
    assert.equal(await p.locator(".filter-menu[open]").count(), 0);
    await p.locator('.property-photo[data-property="atelier"]').click();
    await p.locator("#property-dialog[open]").waitFor();
    assert.match(
      await p.locator("#detail-tags").innerText(),
      /Rooftop terrace/
    );
    await p.locator("#photo-next").click();
    await p.waitForFunction(
      () => document.querySelector("#photo-count").textContent === "2 / 2"
    );
    assert.match(
      await p.locator("#detail-image").getAttribute("src"),
      /city-inside/
    );
    await p.locator("#photo-prev").click();
    await p.waitForFunction(
      () => document.querySelector("#photo-count").textContent === "1 / 2"
    );
    await p.keyboard.press("Escape");
    await p.waitForFunction(() => document.body.style.overflow === "");
    assert.equal(await p.locator("form").count(), 0);
    assert.deepEqual(posts, []);
    for (const id of ["atelier", "pine"]) {
      await p.locator(`[data-place=${id}]`).click();
      assert.equal(
        await p.locator(`[data-place=${id}]`).getAttribute("aria-expanded"),
        "true"
      );
      assert.equal(
        await p.locator("#place-open").getAttribute("data-property"),
        id
      );
    }
    await p.locator('.fan-card[data-property="pine"]').focus();
    await p.keyboard.press("Enter");
    await p.locator("#property-dialog[open]").waitFor();
    assert.match(await p.locator("#property-title").innerText(), /Pine/);
    await p.keyboard.press("Escape");
    await p.waitForFunction(() => document.body.style.overflow === "");
    await p.screenshot({ path: `${out}/${width}-full.png`, fullPage: true });
    await p.reload();
    await p.locator("html[data-luxe-ready=true]").waitFor();
    await ids(p, ["horizon", "atelier", "pine"]);
    assert.equal(await p.locator("form").count(), 0);
    report.cases.push({
      width,
      overflow: "pass",
      hero: "pass",
      filters: "pass",
      dropdownsAndTags: "pass",
      multiSelectionAndSyncedFan: "pass",
      gallery: "pass",
      removedCollection: "pass",
      noSubmission: "pass",
      sortOrders: "pass",
    });
    await p.close();
  }
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
  p.on("pageerror", e => report.errors.push(e.message));
  await p.goto(base + "/previews/luxe-realty.html");
  await p.locator("html[data-luxe-ready=true]").waitFor();
  await p.mouse.move(0, 0);
  await p.waitForFunction(
    () =>
      document
        .querySelector('[data-frame="1"]')
        .getAttribute("aria-pressed") === "true"
  );
  await p.locator('[data-frame="4"]').click();
  await p.waitForFunction(
    () =>
      document
        .querySelector('[data-frame="4"]')
        .getAttribute("aria-pressed") === "true"
  );
  await p.waitForTimeout(1700);
  assert.equal(
    await p.locator('[data-frame="4"]').getAttribute("aria-pressed"),
    "true"
  );
  await p.locator(".property-photo[data-property=atelier]").click();
  await p.route("**/city-inside-1600.webp", r => r.abort());
  await p.locator("#photo-next").click();
  await p.locator("#gallery-error").waitFor();
  await p.unroute("**/city-inside-1600.webp");
  await p.locator("#photo-prev").click();
  await p.locator("#photo-next").click();
  await p.waitForFunction(
    () => document.querySelector("#photo-count").textContent === "2 / 2"
  );
  await p.keyboard.press("Escape");
  assert.equal(await p.locator("#property-dialog[open]").count(), 0);
  report.motionAndFailure =
    "Automatic reel, held manual selection, failed image recovery and Escape close passed";
  await p.close();
  assert.deepEqual(report.errors, []);
  for (const path of ["/templates/", "/el/templates/", "/he/templates/"]) {
    const p = await b.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    await p.addInitScript(() =>
      localStorage.setItem(
        "dm_cookie_consent",
        JSON.stringify({ essential: true, analytics: false })
      )
    );
    await p.goto(base + path);
    await p.waitForFunction(() => {
      const title = [...document.querySelectorAll("h2,h3")].find(
        e => e.textContent === "Luxe Realty"
      );
      return (
        title && Object.keys(title).some(key => key.startsWith("__reactProps"))
      );
    });
    await p.getByRole("heading", { name: "Luxe Realty", exact: true }).click();
    const y = await p.evaluate(() => history.state.dmGalleryPosition.y);
    await p.locator('a[href^="/preview/luxe-realty/"]').click();
    await p.waitForURL(/\/preview\/luxe-realty\//);
    const f = p.frameLocator("iframe");
    await f.locator("html[data-luxe-ready=true]").waitFor();
    await f.locator(".hero-copy a").click();
    await f.locator(".property-photo").first().click();
    await f.locator("#property-dialog[open]").waitFor();
    await f.locator("#property-dialog [data-close]").click();
    await p.getByRole("button", { name: "Close preview", exact: true }).click();
    await p.waitForURL(base + path);
    await p.waitForTimeout(700);
    assert.ok(
      Math.abs((await p.evaluate(() => scrollY)) - y) < 12,
      path + " return position"
    );
    await p.close();
  }
  report.galleryLocales =
    "EN / EL / HE gallery → Luxe → property → close returns to original scroll position";
} finally {
  await writeFile(out + "/qa.json", JSON.stringify(report, null, 2));
  await b.close();
}
console.log(JSON.stringify(report, null, 2));
