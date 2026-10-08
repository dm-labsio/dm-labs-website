import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const base=process.env.RETURN_QA_URL||'http://127.0.0.1:5173';
const browser=await chromium.launch();
const report={base,cases:[],errors:[]};
const ready=p=>p.waitForFunction(()=>Object.keys(document.querySelector('a[href^="/preview/"], [data-example-industry]')||{}).some(k=>k.startsWith('__reactProps')));
try {
 for(const width of [390,1440]) for(const path of ['/','/el/','/he/','/templates/','/el/templates/','/he/templates/']) {
  const p=await browser.newPage({viewport:{width,height:844},reducedMotion:'reduce',hasTouch:width<700});
  await p.addInitScript(()=>localStorage.setItem('dm_cookie_consent',JSON.stringify({essential:true,analytics:false})));
  p.on('pageerror',e=>report.errors.push(e.message));
  await p.goto(base+path);await ready(p);await p.evaluate(()=>document.fonts.ready);
  const selector='a[href^="/preview/nomad-coffee/"]';
  const link=p.locator(selector).first();
  const gallery=path.includes('templates');
  const card=p.getByRole('heading',{name:/Nomad Coffee/}).first();
  await (gallery ? card : link).scrollIntoViewIfNeeded();await p.waitForTimeout(300);
  let sourceY=await p.evaluate(()=>scrollY);assert.ok(sourceY>300);
  for(const action of ['close','back']){
   if(gallery) { await card.click(); sourceY=await p.evaluate(()=>history.state.dmGalleryPosition.y); }
   const sourceHistory=await p.evaluate(()=>history.length);
   await link.click();await p.waitForURL(/\/preview\/nomad-coffee\//);
   await p.frameLocator('iframe').locator('body').waitFor();
   // In-demo section links must not create extra Back steps.
   const anchor=p.frameLocator('iframe').locator('a[href^="#"]:not(.skip)').first();
   if(await anchor.count()) await anchor.click();
   if(action==='close') await p.getByRole('button',{name:'Close preview',exact:true}).click();else await p.goBack();
   await p.waitForURL(base+path);await ready(p);await p.waitForTimeout(550);
   assert.ok(Math.abs(await p.evaluate(()=>scrollY)-sourceY)<12,`${path} ${width} ${action}: ${await p.evaluate(()=>scrollY)} vs ${sourceY}; state ${JSON.stringify(await p.evaluate(()=>history.state))}`);
   assert.ok(await p.evaluate(()=>history.length)<=sourceHistory+1,'must not add sentinel or close entries');
   assert.equal(await p.evaluate(()=>document.body.style.overflow),'');
   report.cases.push({path,width,action,scrollY:sourceY,status:'passed'});
  }
  await p.close();
 }
 const p=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await p.addInitScript(()=>localStorage.setItem('dm_cookie_consent',JSON.stringify({essential:true,analytics:false})));
 await p.goto(base+'/templates/');await ready(p);
 // Keep the selected gallery category as well as the scroll position.
 await p.getByRole('button',{name:/beauty/i}).first().click();
 await p.getByRole('heading',{name:/Bella/}).first().scrollIntoViewIfNeeded();
 const filter=await p.locator('[data-example-industry]').getAttribute('data-example-industry');
 const before=await p.evaluate(()=>scrollY);
 await p.getByRole('heading',{name:/Bella/}).first().click();
 await p.locator('a[href^="/preview/bella-salon/"]').click();await p.waitForURL(/\/preview\/bella/);
 await p.reload();await p.waitForFunction(()=>Object.keys(document.querySelector('[aria-label="Close preview"]')||{}).some(k=>k.startsWith('__reactProps')));await p.getByRole('button',{name:'Close preview',exact:true}).click();
 await ready(p);await p.waitForTimeout(500);
 assert.equal(await p.locator('[data-example-industry]').getAttribute('data-example-industry'),filter);
 assert.ok(Math.abs(await p.evaluate(()=>scrollY)-before)<12);
 report.filterAndReload='passed';
 await p.goto(base+'/preview/nomad-coffee/?from=%2Fel%2Ftemplates%2F');
 await p.waitForFunction(()=>Object.keys(document.querySelector('[aria-label="Close preview"]')||{}).some(k=>k.startsWith('__reactProps')));
 await p.getByRole('button',{name:'Close preview',exact:true}).click();await p.waitForURL(base+'/el/templates/');
 report.directEntry='passed';
 assert.deepEqual(report.errors,[]);
}finally{
 await mkdir('../output/website-refresh/preview-return',{recursive:true});
 await writeFile('../output/website-refresh/preview-return/qa.json',JSON.stringify(report,null,2));
 await browser.close();
}
console.log(JSON.stringify(report,null,2));
