import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const base = process.env.ARCOS_QA_URL || "http://127.0.0.1:5173";
const out = fileURLToPath(
  new URL("../../output/website-refresh/arcos/qa/", import.meta.url)
);
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const report = { base, views: [], errors: [] };
async function ready(p, key = "living") {
  await p
    .locator(`#tour-dialog[data-tour-ready=true][data-scene=${key}]`)
    .waitFor();
}
try {
  for (const width of [320, 390, 1440]) {
    const p = await browser.newPage({
      viewport: { width, height: width < 700 ? 844 : 1000 },
      hasTouch: width < 700,
    });
    p.on("pageerror", e => report.errors.push(e.message));
    await p.goto(base + "/previews/arcos-architecture.html");
    assert.deepEqual(
      await p
        .locator("main>section")
        .evaluateAll(nodes => nodes.slice(0, 3).map(n => n.id)),
      ["home", "tour", "house"]
    );
    assert.equal(
      await p
        .getByText("Ground floor · Furnished concept", { exact: true })
        .count(),
      0
    );
    assert.equal(await p.locator("#tour-instructions").count(), 0);
    await p.locator("[data-open-tour]").click();
    await ready(p);
    assert.equal(await p.locator(".tour-hotspot").innerText(), "");
    assert.equal(
      await p.locator("[data-tour-action=forward]").isEnabled(),
      true
    );
    assert.equal(await p.locator("[data-tour-action=back]").isEnabled(), false);
    const before = JSON.parse(
      await p.locator("#tour-dialog").getAttribute("data-view")
    );
    await p.locator("[data-tour-action=forward]").click();
    await p.locator("#tour-stage[data-moving=walking]").waitFor();
    assert.equal(
      await p.locator("#tour-loading").isVisible(),
      false,
      "No opaque loader during movement"
    );
    await p.locator("#tour-stage[data-moving=arriving]").waitFor();
    assert.equal(await p.locator("#tour-transition").isVisible(), true);
    assert.ok(
      await p
        .locator("#tour-transition")
        .evaluate(i => i.src.startsWith("data:image/"))
    );
    await ready(p, "courtyard");
    assert.equal(await p.locator("#tour-transition").isVisible(), false);
    assert.equal(
      await p.locator("[data-tour-action=forward]").isEnabled(),
      false
    );
    assert.equal(await p.locator("[data-tour-action=back]").isEnabled(), true);
    await p.screenshot({ path: out + `walkthrough-${width}.png` });
    await p.locator("[data-tour-action=back]").click();
    await ready(p, "living");
    await p.locator("#close-tour").click();
    await p.waitForFunction(() =>
      document.activeElement?.hasAttribute("data-open-tour")
    );
    const sizes = [];
    for (const key of ["stone", "lime", "oak"]) {
      await p.locator(`[data-material=${key}]`).click();
      sizes.push(
        await p.locator("#lens-surface").evaluate(surface => {
          const lens = surface.querySelector(".lens"),
            r = surface.getBoundingClientRect();
          return {
            left: parseFloat(lens.style.left),
            top: parseFloat(lens.style.top),
            width: lens.offsetWidth,
            zoom: parseFloat(lens.style.backgroundSize) / r.width,
          };
        })
      );
    }
    assert.ok(sizes.every(s => Math.abs(s.zoom - 4) < 0.02));
    assert.ok(
      new Set(sizes.map(s => Math.round(s.top))).size === 3,
      "Each material has its own focal location"
    );
    assert.ok(sizes[0].width > (width < 700 ? 128 : 170));
    await p.locator("#lens-surface").press("Enter");
    assert.equal(
      await p.locator("#lens-surface").getAttribute("aria-pressed"),
      "false"
    );
    await p.locator("#lens-surface").press("Space");
    assert.equal(
      await p.locator("#lens-surface").getAttribute("aria-pressed"),
      "true"
    );
    await p
      .locator("#materials")
      .screenshot({
        path: out + `material-closeup-${width}.png`,
        style: ".site-header,.skip-link{visibility:hidden}",
      });
    assert.ok(
      await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1
      )
    );
    report.views.push({
      width,
      movement: "passed",
      heroEntry: "passed",
      materialZoom: "passed",
    });
    await p.close();
  }
  const p = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await p.goto(base + "/previews/arcos-architecture.html");
  await p.locator("[data-open-tour]").click();
  await ready(p);
  // Closing during the glide cancels all pending travel and preserves a clean next entry.
  await p.locator(".tour-hotspot").click();
  await p.locator("#tour-stage[data-moving=walking]").waitFor();
  await p.locator("#close-tour").click();
  await p.locator("#panorama canvas").waitFor({ state: "detached" });
  await p.locator("[data-open-tour]").click();
  await ready(p);
  // Reduced-motion changes during travel must not leave the dialog frozen.
  await p.locator("[data-tour-action=forward]").click();
  await p.locator("#tour-stage[data-moving=walking]").waitFor();
  await p.emulateMedia({ reducedMotion: "reduce" });
  await ready(p);
  await p.locator("[data-tour-action=forward]").click();
  await ready(p, "courtyard");
  assert.equal(await p.locator("#tour-transition").isVisible(), false);
  report.interruptedMovement = "passed";
  await p.close();
  assert.deepEqual(report.errors, []);
} finally {
  await writeFile(
    out + "walkthrough-report.json",
    JSON.stringify(report, null, 2)
  );
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
