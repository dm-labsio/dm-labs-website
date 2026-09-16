import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ headless: true });
try {
  for (const locale of ["en", "el", "he"]) {
  for (const width of [1440, 768, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(`${process.env.QA_BASE_URL || 'http://127.0.0.1:5173'}/${locale === 'en' ? '' : locale + '/'}pricing/`);
    const reject = page.getByRole('button', { name: 'Reject', exact: true });
    if (await reject.isVisible()) await reject.click();
    await page.locator('.journey-build-grid button').nth(1).click();
    await page.locator('.journey-billing-track button').nth(1).click();
    await page.locator('.pricing-editorial-care-card button').nth(0).click();
    assert.match(await page.locator('.journey-summary').innerText(), /750/);
    assert.match(await page.locator('.journey-summary').innerText(), /€749/);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false, `overflow at ${width}`);
    await page.locator('.journey-billing').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/tmp/dm-pricing-${locale}-${width}.png` });
    const selectedColor = await page.locator('.pricing-editorial-care-card button').nth(0).evaluate(el => getComputedStyle(el).backgroundColor);
    assert.equal(selectedColor, 'rgb(85, 50, 168)');
    await page.locator('.journey-billing-track button').nth(0).click();
    assert.match(await page.locator('.journey-summary').innerText(), /69/);
    await page.locator('.pricing-editorial-care-card button').nth(1).click();
    await page.locator('.journey-billing-track button').nth(1).click();
    assert.match(await page.locator('.journey-summary').innerText(), /1[,.]395/);
    await page.locator('.journey-summary a').click();
    await page.waitForURL('**/contact/**');
    const message = await page.locator('textarea').inputValue();
    assert.match(message, /Growth Website/);
    assert.match(message, /Complete Care/);
    assert.match(message, locale === 'el' ? /ετήσια/ : locale === 'he' ? /שנתי/ : /yearly/);
    assert.ok(page.url().includes(locale === 'en' ? '/contact/' : `/${locale}/contact/`));
    assert.deepEqual(errors, []);
    console.log(`PASS ${locale} ${width}px: selections, selected color, yearly/monthly prices, no overflow, localized contact handoff, no runtime errors`);
    await page.close();
  }
  }
} finally { await browser.close(); }
