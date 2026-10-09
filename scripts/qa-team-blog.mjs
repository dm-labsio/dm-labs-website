import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const base=process.env.WORK_QA_URL||'http://127.0.0.1:5179';
const browser=await chromium.launch();
try {
 for(const prefix of ['', '/el','/he']) for(const width of [390,1440]) {
  const page=await browser.newPage({viewport:{width,height:900},isMobile:width<700,hasTouch:width<700});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>localStorage.setItem('dm_cookie_consent',JSON.stringify({essential:true,analytics:false})));
  await page.goto(base+prefix+'/');await page.locator('.team-portrait-card').first().waitFor();
  await page.locator('.team-showcase').scrollIntoViewIfNeeded();await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(400);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.screenshot({path:`/tmp/team-${prefix.slice(1)||'en'}-${width}.png`});
  for(let i=0;i<2;i++) {
   const trigger=page.locator('.team-portrait-card').nth(i);await trigger.scrollIntoViewIfNeeded();const scrollBefore=await page.evaluate(()=>scrollY);await trigger.click();
   const modal=page.getByRole('dialog');await modal.waitFor();await page.waitForTimeout(400);await page.keyboard.press('Tab');assert.equal(await modal.evaluate(e=>e.contains(document.activeElement)),true);assert.ok((await modal.innerText()).length>250);
   assert.equal(await modal.locator('a').getAttribute('href'),prefix+'/contact/');
   assert.equal(await modal.evaluate(e=>e.scrollWidth>e.clientWidth),false);
   if(i===0)await page.screenshot({path:`/tmp/team-bio-${prefix.slice(1)||'en'}-${width}.png`});
   if(i===0)await page.keyboard.press('Escape');else await modal.locator('.team-bio-close').click();await modal.waitFor({state:'hidden'});await page.waitForTimeout(150);
   assert.equal(await trigger.evaluate(e=>document.activeElement===e),true);assert.ok(Math.abs((await page.evaluate(()=>scrollY))-scrollBefore)<3);
  }
  await page.locator('.team-portrait-card').first().click();await page.locator('.team-bio-contact').click();await page.waitForURL(base+prefix+'/contact/');
  await page.goto(base+prefix+'/blog/');await page.locator('.blog-index-card').first().waitFor();await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('h1').count(),1);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const total=await page.locator('.blog-index-card').count();assert.ok(total>0);
  const dates=await page.locator('.blog-index-meta time').evaluateAll(es=>es.map(e=>e.getAttribute('datetime')));assert.deepEqual(dates,[...dates].sort().reverse());
  await page.screenshot({path:`/tmp/blog-${prefix.slice(1)||'en'}-${width}.png`});
  const second=page.locator('.blog-index-card').nth(Math.min(1,total-1));
  if(width>900){await second.hover();assert.equal(await second.getAttribute('data-active'),'true');assert.equal(await page.locator('.blog-preview-art > img').getAttribute('src'),await second.locator('.blog-preview-toggle img').getAttribute('src')); }
  const preview=second.locator('.blog-preview-toggle');if(await preview.getAttribute('aria-expanded')==='true')await preview.click();await preview.click();assert.equal(await preview.getAttribute('aria-expanded'),'true');
  assert.equal(await second.locator('.blog-inline-preview').evaluate(e=>e.hasAttribute('inert')),false);
  await second.locator('.blog-index-read').scrollIntoViewIfNeeded();await page.waitForTimeout(500);
  await page.screenshot({path:`/tmp/blog-expanded-${prefix.slice(1)||'en'}-${width}.png`});
  const articleHref=await second.locator('h2 a').getAttribute('href');assert.equal(await second.locator('.blog-index-read').getAttribute('href'),articleHref);
  await preview.click();assert.equal(await preview.getAttribute('aria-expanded'),'false');
  const filter=page.locator('.blog-topics button').nth(1);const category=await filter.innerText();await filter.click();
  const cats=await page.locator('.blog-row-heading .blog-index-category').allTextContents();assert.ok(cats.length&&cats.every(t=>t===category));
  await page.locator('#article-search').fill('no-match-xyz');assert.equal(await page.locator('.blog-index-card').count(),0);
  await page.locator('.blog-index-empty button').click();assert.equal(await page.locator('.blog-index-card').count(),total);
  await page.locator('.blog-index-card h2 a').first().click();await page.waitForURL(/\/blog\/.+\//);assert.equal(await page.locator('h1').count(),1);
  assert.deepEqual(errors,[]);console.log('PASS team dialogs, focus restore, blog previews/filter/search/order/navigation',prefix||'en',width);await page.close();
 }
 const page=await browser.newPage({viewport:{width:320,height:800},reducedMotion:'reduce'});await page.goto(base+'/he/blog/');await page.locator('.blog-preview-toggle').first().click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.ok(await page.locator('.blog-inline-preview').first().evaluate(e=>parseFloat(getComputedStyle(e).transitionDuration)<=0.001));await page.close();console.log('PASS 320px Hebrew and reduced motion');
}finally{await browser.close()}
