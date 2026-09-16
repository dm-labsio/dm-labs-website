import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ headless: true });
try {
  for (const width of [1440, 768, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(`${process.env.QA_BASE_URL || 'http://127.0.0.1:5173'}/pricing/`);
    const reject = page.getByRole('button', { name: 'Reject', exact: true });
    if (await reject.isVisible()) await reject.click();
    await page.getByRole('button', { name: 'Choose Growth', exact: true }).click();
    await page.getByRole('button', { name: 'Yearly Save ~10%', exact: true }).click();
    await page.getByRole('button', { name: 'Choose Basic Care', exact: true }).click();
    assert.match(await page.locator('.journey-summary').innerText(), /€750/);
    assert.match(await page.locator('.journey-summary').innerText(), /€749/);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false, `overflow at ${width}`);
    await page.locator('.journey-billing').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/tmp/dm-pricing-${width}.png` });
    await page.getByRole('button', { name: 'Monthly', exact: true }).click();
    assert.match(await page.locator('.journey-summary').innerText(), /€69/);
    await page.getByRole('button', { name: 'Choose Complete Care', exact: true }).click();
    await page.getByRole('button', { name: 'Yearly Save ~10%', exact: true }).click();
    assert.match(await page.locator('.journey-summary').innerText(), /€1,395/);
    await page.getByRole('link', { name: 'Let’s build your website' }).click();
    await page.waitForURL('**/contact/**');
    assert.match(await page.locator('textarea').inputValue(), /Growth Website with Complete Care, billed yearly/);
    assert.deepEqual(errors, []);
    console.log(`PASS ${width}px: selections, yearly/monthly prices, no overflow, contact handoff, no runtime errors`);
    await page.close();
  }
} finally { await browser.close(); }
