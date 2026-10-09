import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const base = process.env.HARTLEY_QA_URL || "http://127.0.0.1:5175";
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 768, 1440]) {
    const p = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
      acceptDownloads: true,
    });
    const errors = [];
    p.on("pageerror", e => errors.push(e.message));
    let posts = 0;
    p.on("request", r => {
      if (r.method() === "POST") posts++;
    });
    await p.goto(base + "/previews/hartley.html");
    await p.waitForFunction(
      () => document.documentElement.dataset.hartleyReady === "true"
    );
    await p.evaluate(() => document.fonts.ready);
    assert.ok(
      await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1
      ),
      "overflow " + width
    );
    assert.equal(await p.locator(".arc, .arc-card, dialog").count(), 0);
    assert.equal(await p.locator(".hero button").count(), 0);
    await p.getByRole("link", { name: "See the menu", exact: true }).click();
    assert.equal(await p.evaluate(() => document.activeElement.id), "menu");
    assert.ok(
      await p
        .locator(".print-button")
        .evaluateAll(buttons =>
          buttons.every(b => getComputedStyle(b).borderRadius === "0px")
        )
    );
    await p.getByRole("tab", { name: "From the oven" }).click();
    await p.getByRole("heading", { name: "From the oven" }).waitFor();
    assert.match(await p.locator("#menu-photo").getAttribute("src"), /cake/);
    await p.keyboard.press("ArrowRight");
    await p
      .getByRole("heading", { name: "A little tea", exact: true })
      .waitFor();
    assert.equal(
      await p
        .getByRole("tab", { name: "A little tea", exact: true })
        .getAttribute("aria-selected"),
      "true"
    );
    await p.locator("#menu-next").click();
    await p
      .getByRole("heading", { name: "Coffee & company", exact: true })
      .waitFor();
    for (const [name, key, food] of [
      ["English Breakfast", "breakfast", "scone"],
      ["Earl Grey", "grey", "lemon"],
      ["Garden Mint", "mint", "cucumber"],
    ]) {
      await p.getByRole("button", { name, exact: true }).click();
      await p.waitForFunction(
        key => document.querySelector(".tea-visual").dataset.selection === key,
        key
      );
      assert.match(
        await p.locator("#tea-photo").getAttribute("src"),
        new RegExp("tea-" + key + "\\.webp$")
      );
      assert.match(
        await p.locator("#tea-photo").getAttribute("alt"),
        new RegExp(food, "i")
      );
      assert.match(
        await p.locator("#tea-photo-label").innerText(),
        new RegExp(name)
      );
      assert.equal(
        await p
          .locator('[data-tea="' + key + '"]')
          .getAttribute("aria-pressed"),
        "true"
      );
      if (width <= 600) {
        // The first tea is already selected before its photo has decoded.
        // Wait for the resulting scroll, not just its initial data-selection.
        await p.waitForFunction(() => {
          const image = document.querySelector("#tea-photo");
          const r = document
            .querySelector(".tea-visual")
            .getBoundingClientRect();
          return (
            image.complete &&
            image.naturalWidth > 0 &&
            r.top >= 0 &&
            r.bottom <= innerHeight + 1
          );
        });
        const picture = await p.locator(".tea-visual").boundingBox();
        assert.ok(
          picture.y >= 0 && picture.y + picture.height <= 901,
          "Mobile selection keeps photograph in view"
        );
      }
    }
    await p.locator('[data-tea="grey"]').click();
    await p.locator('[data-tea="breakfast"]').click();
    await p.waitForFunction(
      () =>
        document.querySelector(".tea-visual").dataset.selection === "breakfast"
    );
    assert.match(
      await p.locator("#tea-photo").getAttribute("src"),
      /tea-breakfast/
    );
    const dl = await Promise.all([
      p.waitForEvent("download"),
      p.getByRole("link", { name: "Keep the tea menu" }).click(),
    ]);
    assert.match(
      dl[0].suggestedFilename(),
      /^(Hartley-)?afternoon-tea-menu\.pdf$/
    );
    assert.equal(await dl[0].failure(), null);
    assert.equal(
      (await readFile(await dl[0].path())).subarray(0, 5).toString(),
      "%PDF-"
    );
    await p.getByRole("button", { name: "Wrap it for me" }).click();
    assert.equal(
      await p.locator("#parcel").getAttribute("data-wrapped"),
      "true"
    );
    await p.getByRole("button", { name: "Have another peek" }).click();
    assert.equal(
      await p.locator("#parcel").getAttribute("data-wrapped"),
      "false"
    );
    await p.locator(".visit-gallery").scrollIntoViewIfNeeded();
    assert.equal(
      await p.locator(".visit-gallery button, .visit-gallery a").count(),
      0
    );
    await p.waitForFunction(() =>
      [...document.querySelectorAll(".visit-gallery img")].every(
        i => i.complete && i.naturalWidth
      )
    );
    assert.ok(
      await p.locator(".visit-gallery img").evaluateAll(images =>
        images.every(i => {
          const r = i.getBoundingClientRect();
          return (
            getComputedStyle(i).objectFit === "contain" &&
            Math.abs(
              i.offsetWidth / i.offsetHeight - i.naturalWidth / i.naturalHeight
            ) < 0.02
          );
        })
      ),
      "Gallery shows complete photographs"
    );
    for (const s of [
      ".hero",
      ".hello",
      ".menu-section",
      ".tea-section",
      ".takeaway",
      ".visit",
      "footer",
    ]) {
      await p.locator(s).scrollIntoViewIfNeeded();
      await p.waitForTimeout(150);
    }
    await p.waitForFunction(() =>
      [...document.images]
        .filter(i => i.getClientRects().length)
        .every(i => i.complete && i.naturalWidth > 0)
    );
    assert.equal(posts, 0);
    assert.deepEqual(errors, []);
    assert.ok(
      await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1
      )
    );
    if (!process.env.HARTLEY_QA_URL) {
      await p.screenshot({
        path: `/tmp/hartley-qa-${width}.png`,
        fullPage: true,
      });
      if (width === 1440) {
        await p.evaluate(() => scrollTo(0, 0));
        await p.screenshot({
          path: "/tmp/hartley-cover.png",
          clip: { x: 0, y: 0, width: 1440, height: 890 },
        });
      }
    }
    console.log(
      "PASS",
      width,
      "hero menu link, straight-edged buttons, menu keyboard controls, three tea photographs, rapid switching, PDF, parcel flip, complete non-clickable gallery, no overflow or errors"
    );
    await p.close();
  }
  const p = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  await p.goto(base + "/previews/hartley.html");
  await p.mouse.move(1, 1);
  await p.waitForFunction(() => document.documentElement.dataset.hartleyReady);
  await p.mouse.move(1100, 300);
  await p.waitForTimeout(100);
  assert.notEqual(
    await p
      .locator(".float-coffee")
      .evaluate(e => e.style.getPropertyValue("--px")),
    "0px"
  );
  const before = await p.locator(".hero").getAttribute("data-scene");
  await p.waitForFunction(
    previous => document.querySelector(".hero").dataset.scene !== previous,
    before,
    { timeout: 10000 }
  );
  await p.waitForTimeout(1000);
  await p.emulateMedia({ reducedMotion: "reduce" });
  const stable = await p.locator(".hero").getAttribute("data-scene");
  await p.waitForTimeout(7200);
  assert.equal(await p.locator(".hero").getAttribute("data-scene"), stable);
  await p.emulateMedia({ reducedMotion: "no-preference" });
  await p.locator(".visit-gallery").scrollIntoViewIfNeeded();
  const offscreen = await p.locator(".hero").getAttribute("data-scene");
  await p.waitForTimeout(7200);
  assert.equal(await p.locator(".hero").getAttribute("data-scene"), offscreen);
  await p.close();
  console.log(
    "PASS kinetic headline, reduced-motion fallback and offscreen pause"
  );
} finally {
  await browser.close();
}
