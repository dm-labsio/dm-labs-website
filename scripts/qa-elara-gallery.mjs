import { chromium } from "playwright";
import assert from "node:assert/strict";
const base = process.env.ELARA_QA_URL || "http://127.0.0.1:5175";
const b = await chromium.launch();
try {
  for (const path of [
    "/",
    "/el/",
    "/he/",
    "/templates/",
    "/el/templates/",
    "/he/templates/",
  ]) {
    const p = await b.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
      acceptDownloads: true,
    });
    await p.addInitScript(() =>
      localStorage.setItem(
        "dm_cookie_consent",
        JSON.stringify({ essential: true, analytics: false })
      )
    );
    await p.goto(base + path);
    await p.waitForFunction(() =>
      Object.keys(
        document.querySelector(
          'a[href^="/preview/"], [data-example-industry]'
        ) || {}
      ).some(k => k.startsWith("__reactProps"))
    );
    await p.evaluate(() => document.fonts.ready);
    const gallery = path.includes("templates");
    const a = p.locator('a[href^="/preview/dr-elara-dental/"]');
    if (gallery) {
      await p.locator('[data-demo-card="dr-elara-dental"] button').click();
    } else await a.scrollIntoViewIfNeeded();
    const y = await p.evaluate(
      g => (g ? history.state.dmGalleryPosition.y : scrollY),
      gallery
    );
    await a.click();
    await p.waitForURL(/\/preview\/dr-elara-dental\//);
    const frame = p.frameLocator("iframe");
    await frame.locator("html[data-elara-ready=true]").waitFor();
    await frame.locator(".header [data-request]").click();
    await frame.locator("#request-name").fill("Alex Example");
    await frame.locator("#request-email").fill("alex@example.com");
    await frame.getByRole("button", { name: "Send demo request" }).click();
    await frame.locator("#request-result").waitFor();
    await frame.locator("#close-request").click();
    await p.getByRole("button", { name: "Close preview", exact: true }).click();
    await p.waitForURL(base + path);
    await p.waitForTimeout(700);
    assert.ok(
      Math.abs((await p.evaluate(() => scrollY)) - y) < 12,
      `${path} return position`
    );
    console.log(
      path,
      "cover → demo → appointment request → exact return passed"
    );
    await p.close();
  }
} finally {
  await b.close();
}
