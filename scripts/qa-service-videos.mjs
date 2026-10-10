import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const media=JSON.parse(readFileSync(new URL('../docs/brand-refresh/service-videos-v3.json',import.meta.url)));
const base=process.env.WORK_QA_URL||'http://127.0.0.1:5179';
const browser=await chromium.launch();
try{
for(const locale of ['', '/el','/he']) for(const width of [390,1440]){
 const p=await browser.newPage({viewport:{width,height:900},hasTouch:width<700,isMobile:width<700});
 const errors=[], requests=[];p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(r.url().includes('/brand-refresh/v3/')&&r.url().endsWith('.mp4'))requests.push(r.url())});
 await p.addInitScript(()=>localStorage.setItem('dm_cookie_consent',JSON.stringify({essential:true,analytics:false})));
 await p.goto(base+locale+'/');await p.waitForLoadState('networkidle');
 assert.equal(requests.length,0,'No service videos download on initial load');
 const cards=p.locator('.home-service-card');assert.equal(await cards.count(),6);
 for(let i=0;i<6;i++){
  const card=cards.nth(i);await card.scrollIntoViewIfNeeded();await p.waitForTimeout(550);
  if(width>=1000)await card.hover();else await card.locator('h3 button').click();
  const v=card.locator('video');await p.waitForFunction(i=>{const v=document.querySelectorAll('.home-service-card video')[i];return v.readyState>=2&&!v.paused&&v.currentTime>0},i);
  assert.equal(await v.getAttribute('src'),media[i].video);
  assert.equal(await card.locator('img').getAttribute('src'),media[i].poster);
  assert.equal(await p.locator('.home-service-card video[src]').count(),1);
  assert.equal(await v.evaluate(v=>v.loop&&v.muted&&v.playsInline),true);
  assert.equal(await v.evaluate(v=>getComputedStyle(v).objectFit),'contain');
  assert.equal(await v.evaluate(v=>v.videoWidth),960);
  await v.evaluate(v=>{v.currentTime=v.duration-.2});
  await p.waitForFunction(i=>{const v=document.querySelectorAll('.home-service-card video')[i];return v.currentTime<1&&!v.paused},i);
  assert.equal(await card.locator('.home-service-card-link').getAttribute('href'),locale+'/services/'+media[i].service+'/');
  if(i===1)await card.screenshot({path:`/tmp/service-video-${locale.slice(1)||'en'}-${width}.png`});
 }
 await p.mouse.move(0,0);await p.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await p.waitForTimeout(350);
 assert.equal(await cards.last().locator('video').evaluate(v=>v.paused),true,'Offscreen video pauses');
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 assert.deepEqual(errors,[]);console.log('PASS service mapping, loading, playback, loop, uncropped framing, links, offscreen pause',locale||'en',width);await p.close();
}
for(const mode of ['reduced','saveData']){
 const p=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true,reducedMotion:mode==='reduced'?'reduce':'no-preference'});
 await p.addInitScript(mode=>{localStorage.setItem('dm_cookie_consent',JSON.stringify({essential:true,analytics:false}));if(mode==='saveData')Object.defineProperty(navigator,'connection',{value:{saveData:true},configurable:true})},mode);
 await p.goto(base+'/');await p.waitForLoadState('networkidle');const card=p.locator('.home-service-card').first();await card.scrollIntoViewIfNeeded();await card.locator('h3 button').click();
 assert.equal(await card.locator('h3 button').getAttribute('aria-expanded'),'true');assert.equal(await card.locator('video').getAttribute('src'),null);
 assert.equal(await card.locator('img').evaluate(i=>i.complete&&i.naturalWidth>0),true);console.log('PASS poster and accessible service content with',mode);await p.close();
}
}finally{await browser.close()}
