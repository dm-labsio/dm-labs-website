import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.LUXE_QA_URL || "http://127.0.0.1:5175";
const out = "../output/website-refresh/luxe";
await mkdir(out, { recursive: true });
const b = await chromium.launch();
const report = { base, cases: [], errors: [] };
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
    for (const id of ["atelier", "pine", "horizon"]) {
      await p.locator(`[data-hero=${id}]`).click();
      await p.locator(`#hero-detail[data-property=${id}]`).waitFor();
      assert.equal(
        await p.locator(`[data-hero=${id}]`).getAttribute("aria-pressed"),
        "true"
      );
    }
    await p.locator("#setting").selectOption("city");
    assert.equal(await p.locator(".property-card").count(), 1);
    assert.match(await p.locator(".property-name").innerText(), /Atelier/);
    await p.locator("#bedrooms").selectOption("4");
    await p.locator("#empty").waitFor();
    await p.locator("#clear-filters").click();
    await p.waitForFunction(
      () => document.querySelectorAll(".property-card").length === 3
    );
    await p.locator("#budget").selectOption("2000000");
    assert.equal(await p.locator(".property-card").count(), 2);
    await p.locator("#budget").selectOption("0");
    await p.locator("#sort").selectOption("ascending");
    assert.match(
      await p.locator(".property-name").first().innerText(),
      /Atelier/
    );
    await p.locator("#sort").selectOption("descending");
    assert.match(
      await p.locator(".property-name").first().innerText(),
      /Horizon/
    );
    await p.locator("[data-save=horizon]").click();
    await p.locator("[data-save=atelier]").click();
    assert.equal(await p.locator("[data-saved-count]").innerText(), "2");
    await p.locator(".saved-toggle").click();
    await p.locator("#saved-dialog[open]").waitFor();
    assert.equal(await p.locator("#saved-grid article").count(), 2);
    assert.match(await p.locator("#saved-grid").innerText(), /€2,450,000/);
    await p.locator("#saved-grid [data-property=atelier]").click();
    await p.locator("#property-dialog[open]").waitFor();
    assert.match(await p.locator("#property-title").innerText(), /Atelier/);
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
    await p.locator("#detail-enquire").click();
    await p.locator("#property-dialog").waitFor({ state: "hidden" });
    assert.equal(await p.locator("#enquiry-home").inputValue(), "atelier");
    await p.locator("#enquiry-form button[type=submit]").click();
    assert.equal(await p.locator("#request-dialog[open]").count(), 0);
    await p.locator("[name=name]").fill("Alex Example");
    await p.locator("[name=email]").fill("alex@example.com");
    await p
      .locator("[name=message]")
      .fill("A quiet terrace <script>test</script>");
    await p.getByLabel("Video conversation", { exact: true }).check();
    await p.locator("#enquiry-form button[type=submit]").click();
    await p.locator("#request-dialog[open]").waitFor();
    assert.match(
      await p.locator("#request-summary").innerText(),
      /The City Atelier/
    );
    assert.match(
      await p.locator("#request-summary").innerText(),
      /Video conversation/
    );
    assert.equal(await p.locator("#request-summary script").count(), 0);
    await p.keyboard.press("Escape");
    await p.locator("#request-dialog").waitFor({ state: "hidden" });
    await p.waitForFunction(() => document.body.style.overflow === "");
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
    await p.screenshot({ path: `${out}/${width}-full.png`, fullPage: true });
    await p.reload();
    await p.locator("html[data-luxe-ready=true]").waitFor();
    assert.equal(await p.locator("[data-saved-count]").innerText(), "2");
    assert.equal(await p.locator("[name=email]").inputValue(), "");
    report.cases.push({
      width,
      overflow: "pass",
      hero: "pass",
      filters: "pass",
      shortlist: "pass",
      gallery: "pass",
      request: "pass",
      noSubmission: "pass",
      savedPersistence: "pass",
    });
    await p.close();
  }
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
  p.on("pageerror", e => report.errors.push(e.message));
  await p.goto(base + "/previews/luxe-realty.html");
  await p.locator("html[data-luxe-ready=true]").waitFor();
  await p.locator("[data-hero=atelier]").click();
  await p.locator(".shutter").first().waitFor();
  await p.locator("[data-hero=pine]").click();
  await p.locator("#hero-detail[data-property=pine]").waitFor();
  assert.equal(await p.locator(".shutter").count(), 0);
  await p.locator(".property-photo[data-property=horizon]").click();
  await p.route("**/coast-inside-1600.webp", r => r.abort());
  await p.locator("#photo-next").click();
  await p.locator("#gallery-error").waitFor();
  await p.unroute("**/coast-inside-1600.webp");
  await p.locator("#photo-prev").click();
  await p.locator("#photo-next").click();
  await p.waitForFunction(
    () => document.querySelector("#photo-count").textContent === "2 / 2"
  );
  await p.keyboard.press("Escape");
  assert.equal(await p.locator("#property-dialog[open]").count(), 0);
  report.motionAndFailure =
    "Shutter transition, rapid selection, failed image recovery and Escape close passed";
  await p.close();
  const blocked = await b.newPage();
  await blocked.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("blocked");
      },
    })
  );
  await blocked.goto(base + "/previews/luxe-realty.html");
  await blocked.locator("html[data-luxe-ready=true]").waitFor();
  await blocked.locator("[data-save=pine]").click();
  assert.equal(await blocked.locator("[data-saved-count]").innerText(), "1");
  await blocked.close();
  report.storageFallback = "pass";
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
