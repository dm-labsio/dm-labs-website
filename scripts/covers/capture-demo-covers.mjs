import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const base = process.env.DEMO_CAPTURE_URL || 'http://127.0.0.1:5177';
const output = resolve(process.env.DEMO_CAPTURE_OUTPUT || '../output/demo-covers');
const ids = ['hartley', 'nomad-coffee', 'bella-salon', 'dr-elara-dental', 'pulse-gym', 'arcos-architecture', 'luxe-realty'];
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
try {
  for (const id of ids) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    await page.goto(`${base}/previews/${id}.html`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1200);
    const hero = page.locator('.hero').first();
    const box = await hero.boundingBox();
    // Capture-only art direction: fit the real header and hero to a consistent
    // canvas. These rules never ship to or change the interactive demo pages.
    await page.addStyleTag({ content: `
      .hero { box-sizing: border-box !important; height: ${900 - box.y}px !important; min-height: 0 !important; }
      ${id === 'arcos-architecture' ? `
        .hero { display: flex; flex-direction: column; }
        .hero-heading { padding-top: 30px; padding-bottom: 30px; }
        .hero-heading h1 { font-size: 96px; }
        .hero-image { flex: 1; min-height: 0; }
        .hero-image img { height: 100%; object-position: center 55%; }
      ` : ''}
    ` });
    await page.waitForFunction(() => [...document.images].filter(i => {
      const r = i.getBoundingClientRect();
      return r.top < innerHeight && r.bottom > 0 && r.width > 0 && i.currentSrc;
    }).every(i => i.complete && i.naturalWidth));
    await page.screenshot({ path: resolve(output, `${id}.png`) });
    console.log(`${id}: 1440 × 900`);
    await page.close();
  }
} finally { await browser.close(); }
