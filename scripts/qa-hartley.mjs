import { chromium } from "playwright";
import assert from "node:assert/strict";
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
    const old = await p.locator("#scene-caption").innerText();
    await p.locator("#scene-next").click();
    assert.notEqual(await p.locator("#scene-caption").innerText(), old);
    await p.locator(".arc").focus();
    await p.keyboard.press("ArrowLeft");
    assert.equal(await p.locator("#scene-caption").innerText(), old);
    const arc = await p.locator(".arc").boundingBox();
    await p.mouse.move(arc.x + arc.width * 0.6, arc.y + 100);
    await p.mouse.down();
    await p.mouse.move(arc.x + arc.width * 0.2, arc.y + 100, { steps: 5 });
    await p.mouse.up();
    assert.notEqual(await p.locator("#scene-caption").innerText(), old);
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
    await p.getByRole("button", { name: "Garden Mint", exact: true }).click();
    assert.match(await p.locator("#tea-detail").innerText(), /caffeine-free/);
    const dl = await Promise.all([
      p.waitForEvent("download"),
      p.getByRole("link", { name: "Keep the tea menu" }).click(),
    ]);
    assert.equal(dl[0].suggestedFilename(), "Hartley-afternoon-tea-menu.pdf");
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
    await p.locator('[data-photo="gallery"]').click();
    assert.ok(await p.locator("dialog").isVisible());
    await p.keyboard.press("Escape");
    assert.ok(!(await p.locator("dialog").isVisible()));
    assert.equal(
      await p.evaluate(() => document.activeElement.dataset.photo),
      "gallery"
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
        .filter(i => i.id !== "large-photo" && i.getClientRects().length)
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
      "arc controls and swipe, menu tabs and keyboard, tea pairing, PDF, parcel flip, gallery, images, no overflow or errors"
    );
    await p.close();
  }
  const p = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  await p.goto(base + "/previews/hartley.html");
  await p.mouse.move(1, 1);
  await p.waitForFunction(() => document.documentElement.dataset.hartleyReady);
  const before = await p.locator("#scene-caption").innerText();
  await p.waitForTimeout(6500);
  assert.notEqual(await p.locator("#scene-caption").innerText(), before);
  await p.emulateMedia({ reducedMotion: "reduce" });
  const stable = await p.locator("#scene-caption").innerText();
  await p.waitForTimeout(6500);
  assert.equal(await p.locator("#scene-caption").innerText(), stable);
  await p.close();
  console.log("PASS motion loop and reduced-motion fallback");
} finally {
  await browser.close();
}
