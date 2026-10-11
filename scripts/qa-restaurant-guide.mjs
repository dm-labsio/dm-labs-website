import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
const base = process.env.GUIDE_QA_URL || 'http://127.0.0.1:5191';
const out = '/tmp/dm-restaurant-guide-qa';
mkdirSync(out, {recursive:true});
const paths = {en:'/blog/restaurant-cafe-first-website-guide/',el:'/el/blog/proti-istoselida-estiatoriou-cafe-odigos/',he:'/he/blog/restaurant-cafe-website-planning-guide/'};
const browser=await chromium.launch();
const results=[];
try {
 for(const [locale,path] of Object.entries(paths)) for(const width of [320,390,768,1440]) {
  const page=await browser.newPage({viewport:{width,height:900},isMobile:width<700,hasTouch:width<700});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(()=>localStorage.setItem('dm_cookie_consent',JSON.stringify({essential:true,analytics:false})));
  const response=await page.goto(base+path);assert.equal(response.status(),200);
  await page.locator('.restaurant-guide').waitFor();await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(700);
  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.locator('html').getAttribute('lang'),locale);
  assert.equal((await page.locator('html').getAttribute('dir'))||'ltr',locale==='he'?'rtl':'ltr');
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://dm-labs.io'+path);
  const alternates=await page.locator('link[hreflang]').evaluateAll(es=>Object.fromEntries(es.map(e=>[e.hreflang,e.href])));
  for(const [lang,p] of Object.entries(paths)) assert.equal(alternates[lang],'https://dm-labs.io'+p);
  const schema=JSON.parse(await page.locator('#article-jsonld-schema').textContent());
  assert.equal(schema.inLanguage,locale);assert.equal(schema['@type'],'BlogPosting');
  assert.equal(schema.headline,(await page.locator('h1').innerText()).trim());
  assert.ok(schema.image.startsWith('https://dm-labs.io/media/blog/'));
  assert.equal(await page.locator('#article-faq-jsonld-schema').count(),0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await page.screenshot({path:`${out}/${locale}-${width}-hero.png`});
  for(const img of await page.locator('.blog-article-image img, .restaurant-guide img').all()) {
   await img.scrollIntoViewIfNeeded();await img.evaluate(e=>e.decode());
   assert.ok(await img.getAttribute('alt'));
   assert.ok(await img.evaluate(e=>e.naturalWidth>0));
  }
  for(const link of await page.locator('.restaurant-guide .blog-toc a').all()) {
   const href=await link.getAttribute('href');assert.equal(await page.locator(href).count(),1);
  }
  const first=page.locator('.blog-toc a').first();await first.click();await page.waitForTimeout(400);
  const target=page.locator(await first.getAttribute('href'));
  assert.ok((await target.boundingBox()).y>=60);
  await page.screenshot({path:`${out}/${locale}-${width}-body.png`});
  assert.equal(await page.locator('.restaurant-guide a.blog-cta-btn').getAttribute('href'),`${locale==='en'?'':'/'+locale}/contact/`);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  assert.deepEqual(errors,[]);
  results.push({locale,width,status:'pass'});await page.close();
 }
 const page=await browser.newPage({viewport:{width:390,height:844}});
 for(const [locale,path] of Object.entries(paths)) {
  const prefix=locale==='en'?'':'/'+locale;
  await page.goto(base+prefix+'/blog/');await page.locator('.blog-index-card').first().waitFor();
  const link=page.locator('.blog-index-card h2 a').first();assert.equal(await link.getAttribute('href'),path);
  await link.click();await page.locator('.restaurant-guide').waitFor();
  const next=locale==='en'?'el':locale==='el'?'he':'en';
  await page.locator('.site-language-trigger').first().click();
  await page.locator(`.site-language-menu a[lang="${next}"]`).click();
  await page.waitForURL(base+paths[next]);assert.equal(await page.locator('html').getAttribute('lang'),next);
 }
 await page.close();
 if(process.env.GUIDE_QA_STATIC==='1') {
  const c=await browser.newContext({javaScriptEnabled:false});
  for(const [locale,path] of Object.entries(paths)) {
   const p=await c.newPage();const r=await p.goto(base+path);assert.equal(r.status(),200);
   assert.ok((await p.locator('.restaurant-guide').textContent()).length>6000);
   assert.ok(await p.locator('.restaurant-guide h2').count()>=8);await p.close();
  }
  await c.close();
 }
 writeFileSync(out+'/results.json',JSON.stringify({base,results,blogDiscoveryAndLanguageSwitching:'pass'},null,2));
 console.log('PASS 12 article viewports, images, metadata, RTL, anchors, blog discovery and reciprocal language switching');
}finally{await browser.close()}
