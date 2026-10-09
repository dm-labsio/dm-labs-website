import { readFileSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
import { chromium } from "playwright";
const base = process.env.WORK_QA_URL || "http://127.0.0.1:5180";
const preview = new URL(base).hostname.endsWith(".vercel.app");
const report = JSON.parse(readFileSync("dist/seo-audit.json", "utf8"));
const errors = [];
async function pool(items, work) {
  const queue = [...items];
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      while (queue.length) {
        const item = queue.shift();
        try {
          await work(item);
        } catch (e) {
          errors.push(`${item}: ${e.message}`);
        }
      }
    })
  );
}
await pool(
  report.pages.map(page => page.url),
  async url => {
    const response = await fetch(base + new URL(url).pathname, {
      signal: AbortSignal.timeout(20000),
    });
    assert.equal(response.status, 200);
    if (preview)
      assert.match(response.headers.get("x-robots-tag") || "", /noindex/);
    const html = await response.text();
    assert.ok(
      html.includes(`rel="canonical" href="${url}"`),
      "canonical present in initial HTML"
    );
    assert.match(html, /<h1[\s>]/);
    assert.ok(
      !/<meta name="robots" content="[^\"]*noindex/.test(html),
      "canonical page content remains production-indexable"
    );
  }
);
const imageUrls = [
  ...new Set(
    report.pages
      .flatMap(p => p.assets)
      .map(url => new URL(url, "https://dm-labs.io/").href)
  ),
].filter(url => /\.(?:webp|png|jpe?g|svg|avif)(?:\?|$)/i.test(url));
const localImages = imageUrls.filter(
  url => new URL(url).origin === "https://dm-labs.io"
);
await pool(localImages, async url => {
  const response = await fetch(base + new URL(url).pathname, {
    method: "HEAD",
    signal: AbortSignal.timeout(20000),
  });
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") || "", /^image\//);
});
const browser = await chromium.launch();
try {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  for (const prefix of ["", "/el", "/he"]) {
    const page = await context.newPage();
    await page.goto(base + prefix + "/templates/");
    assert.equal(await page.locator("a[data-brand-project][href]").count(), 3);
    await page.locator('a[data-brand="hartley"]').click();
    assert.ok(page.url().endsWith(prefix + "/templates/branding/hartley/"));
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(await page.locator(".brand-application-grid img").count(), 6);
    await page.close();
  }
  await context.close();
  for (const [width, prefix] of [
    [390, ""],
    [320, "/he"],
    [1440, "/el"],
  ]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const pageErrors = [];
    page.on("pageerror", e => pageErrors.push(e.message));
    await page.goto(base + prefix + "/templates/branding/sunday-boat/");
    await page.locator("h1").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth
      ),
      false
    );
    const images = await page.locator(".brand-story img").evaluateAll(imgs =>
      Promise.all(
        imgs.map(async img => {
          img.loading = "eager";
          await img.decode();
          return img.naturalWidth > 0;
        })
      )
    );
    assert.ok(images.every(Boolean));
    assert.deepEqual(pageErrors, []);
    await page.screenshot({ path: `/tmp/brand-seo-page-${width}.png` });
    await page.close();
  }
} finally {
  await browser.close();
}
const sitemap = await fetch(base + "/sitemap-images.xml");
assert.equal(sitemap.status, 200);
const imageXml = await sitemap.text();
assert.ok(imageXml.includes("/media/branding/"));
assert.ok(!imageXml.includes("<loc>https://dm-labs.io/preview/"));
const missing = await fetch(base + "/templates/branding/not-a-real-brand/");
assert.equal(missing.status, 404);
writeFileSync(
  "/tmp/seo-crawl-report.json",
  JSON.stringify(
    {
      base,
      pages: report.pages.length,
      localImages: localImages.length,
      externalImagesNotChecked: imageUrls.length - localImages.length,
      errors,
    },
    null,
    2
  )
);
assert.deepEqual(errors, []);
console.log(
  `PASS ${report.pages.length} canonical HTTP pages; ${localImages.length} local images; no-JavaScript branding links/content; mobile/RTL; image sitemap; real 404${preview ? "; Preview noindex headers" : ""}`
);
