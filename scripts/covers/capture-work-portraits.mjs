import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
const output = resolve("../output/work-portraits");
await mkdir(output, { recursive: true });
const styles = {
  "sunday-boat": `.hero {height:830px!important;min-height:0!important} .hero h1{font-size:120px!important} .hero-copy{padding-top:25px!important} .hero-copy>.ticket,.hero-end,.fan-controls{display:none!important} .plate-fan{height:390px!important} .plate-card{width:65%!important} .hero-stage{margin-top:48px!important}`,
  away: `.hero{height:900px!important;min-height:0!important}`,
  hartley: `.hero{height:830px!important;min-height:0!important} .hero-copy{padding-top:60px!important} .hero-lead{font-size:48px!important} .hero-word{font-size:100px!important} .float-coffee{height:230px!important;bottom:95px!important} .float-tea{height:220px!important;bottom:105px!important} .float-bakes{height:210px!important;bottom:65px!important} .float-place{height:240px!important;bottom:65px!important} .hero-signoff{bottom:30px!important}`,
  "nomad-coffee": `.hero{height:810px!important;min-height:0!important;display:flex!important;flex-direction:column!important} .hero-copy{padding:32px 24px!important} .hero h1{font-size:83px!important} .hero-image{flex:1!important;min-height:0!important;display:flex!important;flex-direction:column!important} .hero-film-stage{flex:1!important;aspect-ratio:auto!important} .hero-image figcaption{display:none!important}`,
  "bella-salon": `.hero{height:834px!important;min-height:0!important}`,
  "dr-elara-dental": `.hero{min-height:789px!important}`,
  "pulse-gym": `.hero{min-height:900px!important;height:900px!important} .hero h1{font-size:82px!important}`,
  "arcos-architecture": `.hero{height:832px!important;display:flex!important;flex-direction:column!important} .hero-image{flex:1!important;min-height:0!important} .hero-image img{height:100%!important}`,
  "luxe-realty": `.hero{height:834px!important;min-height:0!important}`,
};
const browser = await chromium.launch();
try {
  for (const [id, css] of Object.entries(styles)) {
    const page = await browser.newPage({
      viewport: { width: 600, height: 900 },
      reducedMotion: "reduce",
    });
    await page.goto(
      `${process.env.DEMO_CAPTURE_URL || "http://127.0.0.1:5177"}/previews/${id}.html`
    );
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: css });
    await page.waitForFunction(() =>
      [...document.images]
        .filter(
          i =>
            i.getBoundingClientRect().top < 900 &&
            i.getBoundingClientRect().bottom > 0 &&
            i.currentSrc
        )
        .every(i => i.complete && i.naturalWidth)
    );
    await page.waitForTimeout(600);
    await page.screenshot({ path: resolve(output, `${id}.png`) });
    console.log(`${id}: composed portrait 600×900`);
    await page.close();
  }
} finally {
  await browser.close();
}
