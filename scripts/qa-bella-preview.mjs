import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const base = process.env.BELLA_QA_URL || 'http://127.0.0.1:5173';
const browser = await chromium.launch({ headless: true });
try {
  for (const [name, width, height, reducedMotion] of [
    ['desktop', 1440, 1000, 'no-preference'],
    ['mobile', 390, 844, 'no-preference'],
    ['small-reduced', 320, 740, 'reduce'],
  ]) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${base}/preview/bella-salon/?from=%2F`, { waitUntil: 'networkidle' });
    const iframe = page.frameLocator('iframe[title="Bella Salon"]');
    await iframe.locator('h1').waitFor();
    const frame = page.frames().find(frame => frame !== page.mainFrame());
    await frame.evaluate(() => document.fonts.ready);
    await frame.waitForFunction(() => [...document.images].filter(img => img.loading !== 'lazy').every(img => img.complete && img.naturalWidth > 0));
    await frame.locator('h1').evaluate(el => Promise.all(el.getAnimations().map(animation => animation.finished)));
    const initialHistory = await page.evaluate(() => history.length);
    assert.equal(await iframe.locator('h1').innerText().then(text => text.replace(/\s+/g, ' ').trim()), 'A little more you.');
    assert(await frame.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({ path: `/private/tmp/bella-${name}-hero.png` });

    // Continuous decorative movement is controllable and respects OS preference.
    const motion = iframe.locator('.motion-toggle');
    if (reducedMotion === 'reduce') {
      assert.equal(await motion.getAttribute('aria-pressed'), 'true');
      assert(await motion.isDisabled());
      assert.equal(await iframe.locator('.ticker-track').evaluate(el => getComputedStyle(el).animationName), 'none');
    } else {
      assert.equal(await iframe.locator('.ticker-track').evaluate(el => getComputedStyle(el).animationPlayState), 'running');
      await motion.click();
      assert.equal(await iframe.locator('.ticker-track').evaluate(el => getComputedStyle(el).animationPlayState), 'paused');
      assert.equal(await motion.getAttribute('aria-pressed'), 'true');
    }

    // Local navigation must not pollute the preview's browser history.
    if (width > 360) await iframe.locator('.scroll-cue').click();
    else await iframe.locator('.text-link').click();
    assert.equal(await page.evaluate(() => history.length), initialHistory);
    await iframe.locator('.rituals').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/private/tmp/bella-${name}-rituals.png` });

    // All appointment buttons open an explicitly non-submitting demo.
    await iframe.locator('[data-book="Your kind of colour"]').click();
    assert(await iframe.locator('dialog').isVisible());
    assert.equal(await iframe.locator('select').inputValue(), 'Your kind of colour');
    await iframe.getByRole('button', { name: 'Preview next step' }).click();
    assert.match(await iframe.locator('#booking-result').textContent(), /hasn’t made a booking/);
    assert(await frame.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({ path: `/private/tmp/bella-${name}-booking.png` });
    await page.keyboard.press('Escape');
    assert.equal(await iframe.locator('dialog').isVisible(), false);
    assert.match(page.url(), /preview\/bella-salon/);

    await iframe.locator('#studio').scrollIntoViewIfNeeded();
    await frame.waitForFunction(() => [...document.images].every(img => img.complete && img.naturalWidth > 0));
    await page.screenshot({ path: `/private/tmp/bella-${name}-studio.png` });
    await iframe.locator('#your-moment').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/private/tmp/bella-${name}-closing.png` });
    assert.equal(await page.evaluate(() => history.length), initialHistory);
    assert.deepEqual(errors, []);
    await page.getByRole('button', { name: 'Close preview', exact: true }).click();
    await page.waitForURL(`${base}/`);
    console.log(JSON.stringify({ name, width, reducedMotion, images: 'loaded', overflow: false, booking: 'demo only', history: 'preserved', errors }));
    await context.close();
  }
} finally {
  await browser.close();
}
