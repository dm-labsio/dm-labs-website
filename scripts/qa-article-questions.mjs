import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.argv[2] || "http://localhost:5193";
const output = process.argv[3] || "/private/tmp/dm-article-questions-qa";
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const results = [];
const slug = "/blog/doctor-website-design-orthopaedics-case-study/";
try {
  for (const locale of ["en", "el", "he"])
    for (const width of [1440, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 } });
      const errors = [];
      const sent = [];
      page.on("pageerror", e => errors.push(e.message));
      await page.addInitScript(() =>
        localStorage.setItem(
          "dm_cookie_consent",
          '{"essential":true,"analytics":false}'
        )
      );
      await page.route("https://api.web3forms.com/submit", async route => {
        sent.push(route.request().postDataJSON());
        await new Promise(r => setTimeout(r, 300));
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true }),
        });
      });
      const path = (locale === "en" ? "" : `/${locale}`) + slug;
      await page.goto(base + path);
      await page.locator("#article-questions").waitFor();
      assert.equal(await page.locator("h1").count(), 1);
      assert.equal(
        await page.locator('link[rel="canonical"]').getAttribute("href"),
        "https://dm-labs.io" + path
      );
      assert.equal(sent.length, 0, "No draft or page-load email");
      assert.equal(
        await page.locator(".article-question-details[open]").count(),
        0
      );
      await page.locator(".article-question-details summary").click();
      await page.locator(".article-question-submit").click();
      assert.equal(
        await page
          .locator("#aq-name")
          .evaluate(e => e === document.activeElement),
        true
      );
      assert.equal(await page.locator(".article-question-error").count(), 4);
      await page.locator("#aq-name").fill("QA Reader");
      await page.locator("#aq-email").fill("qa@example.test");
      await page
        .locator("#aq-question")
        .fill(
          "<script>window.questionXss=true</script> Is this sent privately?"
        );
      await page.locator(".article-question-submit").click();
      assert.equal(sent.length, 0, "No submit without consent");
      await page.locator("#aq-consent").check();
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1
        )
      );
      await page
        .locator("#article-questions")
        .screenshot({ path: `${output}/${locale}-${width}.png` });
      await page.locator(".article-question-submit").click();
      assert.equal(
        await page.locator(".article-question-submit").isDisabled(),
        true
      );
      await page.locator(".article-question-notice[role=status]").waitFor();
      assert.equal(sent.length, 1);
      assert.equal(sent[0].article_url, "https://dm-labs.io" + path);
      assert.equal(sent[0].language, locale);
      assert.equal(
        await page.locator(".article-question-answer").count(),
        0,
        "Sending never creates public content"
      );
      assert.equal(await page.evaluate(() => window.questionXss), undefined);
      assert.equal(
        await page
          .locator(".article-question-private")
          .evaluate(
            e =>
              e.classList.contains("ph-no-capture") &&
              e.classList.contains("ph-mask")
          ),
        true
      );
      assert.deepEqual(errors, []);
      results.push({
        locale,
        width,
        submission: "mocked pass",
        private: true,
        overflow: false,
        pageErrors: errors,
      });
      await page.close();
    }
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  await page.addInitScript(() =>
    localStorage.setItem(
      "dm_cookie_consent",
      '{"essential":true,"analytics":false}'
    )
  );
  let attempts = 0;
  let mode = "fail";
  await page.route("https://api.web3forms.com/submit", async route => {
    attempts++;
    if (mode === "offline") return route.abort("internetdisconnected");
    await route.fulfill({
      status: 429,
      contentType: "application/json",
      body: '{"success":false}',
    });
  });
  await page.goto(base + slug);
  await page.locator(".article-question-details summary").click();
  await page.locator("#aq-name").fill("QA Reader");
  await page.locator("#aq-email").fill("qa@example.test");
  await page.locator("#aq-question").fill("My private draft");
  await page.locator("#aq-consent").check();
  await page.locator(".article-question-submit").click();
  await page.locator('[role="alert"]').waitFor();
  assert.equal(
    await page.locator("#aq-question").inputValue(),
    "My private draft"
  );
  assert.equal(
    await page.locator('.article-question-notice[role="status"]').count(),
    0
  );
  await page.locator(".article-question-submit").click();
  assert.equal(attempts, 1, "Rapid retry blocked");
  await page.evaluate(() => {
    const original = Date.now;
    Date.now = () => original() + 20_000;
  });
  mode = "offline";
  await page.locator(".article-question-submit").click();
  await page.locator('[role="alert"]').waitFor();
  assert.equal(attempts, 2);
  assert.equal(
    await page.locator("#aq-question").inputValue(),
    "My private draft"
  );
  // Navigation must clear all private draft state and select the new article context.
  await page.goto(base + "/el/blog/posso-kostizei-istoselidha-kypros/");
  assert.equal(await page.locator("#article-questions").count(), 1);
  assert.equal(await page.locator("#aq-question").inputValue(), "");
  for (const path of [
    "/blog/",
    "/el/blog/",
    "/he/blog/",
    "/pricing/",
    "/blog/not-a-real-article/",
  ]) {
    await page.goto(base + path);
    assert.equal(await page.locator("#article-questions").count(), 0, path);
  }
  for (const locale of ["en", "el", "he"]) {
    await page.goto(
      base +
        (locale === "en" ? "" : `/${locale}`) +
        "/privacy/#article-questions-privacy"
    );
    assert.equal(await page.locator("#article-questions-privacy").count(), 1);
  }
  await page.close();
  const nojs = await browser.newPage({ javaScriptEnabled: false });
  await nojs.goto(base + slug);
  assert.equal(await nojs.locator("#article-questions").count(), 1);
  assert.equal(
    await nojs.locator('.article-question-direct a[href^="mailto:"]').count(),
    1
  );
  assert.equal(
    await nojs.locator(".article-question-submit").isDisabled(),
    true
  );
  assert.equal(await nojs.locator("#aq-email").isDisabled(), true);
  await nojs.close();
  results.push({
    failures: "429 and offline preserve draft",
    cooldown: "pass",
    routes: "pass",
    privacy: "all locales",
    noJS: "email fallback",
  });
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
