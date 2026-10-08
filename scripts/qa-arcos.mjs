import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const base = process.env.ARCOS_QA_URL || "http://127.0.0.1:5173";
const out = fileURLToPath(
  new URL("../../output/website-refresh/arcos/qa/", import.meta.url)
);
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const report = { base, views: [], errors: [], failures: [] };
function observe(p) {
  p.on("pageerror", e => report.errors.push(e.message));
  p.on("response", r => {
    if (
      r.status() >= 400 &&
      (r.url().includes("/previews/arcos") ||
        r.url().includes("/media/examples/arcos"))
    )
      report.failures.push({ url: r.url(), status: r.status() });
  });
}
async function ready(p) {
  await p.waitForFunction(
    () => document.documentElement.dataset.arcosReady === "true"
  );
  await p.evaluate(() => document.fonts.ready);
}
async function flow(p, scope = p) {
  for (const key of ["living", "threshold", "courtyard"]) {
    await scope.locator(`[data-space="${key}"]`).click();
    assert.equal(
      await scope.locator(`[data-space="${key}"]`).getAttribute("aria-pressed"),
      "true"
    );
    assert.equal(
      await scope.locator("#space-image").getAttribute("src"),
      "/media/examples/arcos/" +
        { living: "interior", threshold: "detail", courtyard: "courtyard" }[
          key
        ] +
        "-768.webp"
    );
  }
  await scope.locator("[data-save-space]").click();
  assert.match(
    await scope.locator("#saved-ideas").innerText(),
    /An open courtyard/
  );
  for (const material of ["lime", "oak", "stone"]) {
    await scope.locator(`[data-material="${material}"]`).click();
    assert.equal(
      await scope
        .locator(`[data-material="${material}"]`)
        .getAttribute("aria-pressed"),
      "true"
    );
    await scope.locator("#save-material").click();
  }
  assert.equal(await scope.locator(".idea").count(), 4);
  await scope.getByRole("button", { name: "Remove Oak", exact: true }).click();
  assert.equal(await scope.locator(".idea").count(), 3);
  await scope.getByLabel("A renovation", { exact: true }).check();
  await scope.getByLabel("Natural light", { exact: true }).check();
  await scope
    .locator("#brief-note")
    .fill("Keep the original stone. <script>literal text only</script>");
  await scope
    .getByRole("button", { name: "Create my sample brief", exact: true })
    .click();
  assert.equal(await scope.locator("#brief-result").isVisible(), true);
  assert.match(
    await scope.locator("#brief-summary").innerText(),
    /A renovation/
  );
  assert.match(
    await scope.locator("#brief-summary").innerText(),
    /<script>literal text only<\/script>/
  );
  const downloaded = p.waitForEvent("download");
  await scope.locator("#download-brief").click();
  const d = await downloaded;
  assert.equal(d.suggestedFilename(), "arcos-project-brief.txt");
  const text = await readFile(await d.path(), "utf8");
  assert.match(text, /A renovation/);
  assert.match(text, /Limestone/);
  assert.doesNotMatch(text, /Saved ideas:.*Oak/);
  await scope.locator("#edit-brief").click();
  await scope.getByLabel("An interior", { exact: true }).check();
  assert.match(
    await scope.locator("#brief-summary").innerText(),
    /An interior/
  );
  await scope.locator(".hero-image").click();
  assert.equal(await scope.locator("#image-dialog").isVisible(), true);
  await scope.locator("#next-image").click();
  assert.match(
    await scope.locator("#lightbox-image").getAttribute("src"),
    /interior/
  );
  await scope.locator("#close-image").press("ArrowRight");
  assert.match(
    await scope.locator("#lightbox-image").getAttribute("src"),
    /detail/
  );
  await scope.locator("#previous-image").click();
  assert.match(
    await scope.locator("#lightbox-image").getAttribute("src"),
    /interior/
  );
  await scope.locator("#close-image").press("Escape");
  assert.equal(await scope.locator("#image-dialog").isVisible(), false);
}
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
    await p.goto(base + "/previews/arcos-architecture.html");
    await ready(p);
    await p.locator(".hero-image img").evaluate(i => i.decode());
    assert.ok(
      await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1
      )
    );
    assert.equal(await p.locator('a[href="#"]').count(), 0);
    await p.screenshot({ path: out + `hero-${width}.png` });
    if (width < 700) {
      await p.locator("#menu-toggle").click();
      await p.locator('#navigation a[href="#house"]').click();
      assert.equal(
        await p.locator("#menu-toggle").getAttribute("aria-expanded"),
        "false"
      );
      assert.equal(await p.evaluate(() => document.activeElement.id), "house");
    }
    await flow(p);
    for (const id of ["house", "materials", "brief"]) {
      await p.locator("#" + id).scrollIntoViewIfNeeded();
      await p.locator("#" + id).screenshot({
        path: out + `${id}-${width}.png`,
        style: ".site-header{visibility:hidden}",
      });
    }
    for (const btn of await p.locator(".image-grid .image-open").all()) {
      await btn.click();
      assert.equal(await p.locator("#image-dialog").isVisible(), true);
      await p.locator("#close-image").click();
    }
    await p.evaluate(async () => {
      for (const i of document.images) {
        if (!i.getAttribute("src")) continue;
        i.loading = "eager";
        await i.decode();
      }
    });
    assert.ok(
      await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1
      )
    );
    report.views.push({
      width,
      images: "passed",
      brief: "passed",
      download: "passed",
      plan: "passed",
      materials: "passed",
      lightbox: "passed",
      overflow: false,
    });
    await p.close();
  }
  const p = await browser.newPage({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
    acceptDownloads: true,
  });
  observe(p);
  await p.goto(base + "/preview/arcos-architecture/");
  await p.waitForFunction(() => history.state?.previewSentinel === true);
  const f = p.frameLocator("iframe");
  await f.locator('html[data-arcos-ready="true"]').waitFor();
  const initialHistory = await p.evaluate(() => history.length);
  await f.locator("#menu-toggle").click();
  await f.locator('#navigation a[href="#materials"]').click();
  assert.equal(
    await f.locator("#menu-toggle").getAttribute("aria-expanded"),
    "false"
  );
  await flow(p, f);
  assert.equal(await p.evaluate(() => history.length), initialHistory);
  assert.match(
    await p.locator("iframe").getAttribute("sandbox"),
    /allow-downloads/
  );
  report.wrapper = "passed";
  await p.close();
  const motion = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  observe(motion);
  await motion.goto(base + "/previews/arcos-architecture.html");
  await ready(motion);
  await motion.locator("#materials").scrollIntoViewIfNeeded();
  const surface = motion.locator("#lens-surface");
  const box = await surface.boundingBox();
  await motion.mouse.move(box.x + box.width * 0.45, box.y + box.height * 0.5);
  assert.ok(
    Math.abs(
      parseFloat(await motion.locator(".lens").evaluate(n => n.style.left)) -
        box.width * 0.45
    ) < 3
  );
  await motion.emulateMedia({ reducedMotion: "reduce" });
  await motion.waitForFunction(
    () =>
      Math.abs(
        parseFloat(document.querySelector(".lens").style.left) -
          document.querySelector("#lens-surface").getBoundingClientRect()
            .width *
            0.25
      ) < 3
  );
  const pos = await motion.locator(".lens").evaluate(n => n.style.left);
  await motion.mouse.move(box.x + box.width * 0.65, box.y + box.height * 0.4);
  assert.equal(await motion.locator(".lens").evaluate(n => n.style.left), pos);
  report.pointerAndReducedMotion = "passed";
  await motion.close();
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.failures, []);
} finally {
  await writeFile(out + "report.json", JSON.stringify(report, null, 2));
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
