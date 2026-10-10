import { chromium, webkit } from 'playwright';
import assert from 'node:assert/strict';
const browser=await (process.env.QA_BROWSER === 'webkit' ? webkit : chromium).launch();
for(const locale of ['', '/el', '/he']){
const p=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
await p.addInitScript(()=>{
  localStorage.setItem('dm_cookie_consent',JSON.stringify({essential:true,analytics:false}));
  const original=HTMLMediaElement.prototype.play;
  let allow=false;
  document.addEventListener('click',()=>{allow=true},{capture:true});
  HTMLMediaElement.prototype.play=function(){
    if(!allow){this.pause();return Promise.reject(new DOMException('Test autoplay denial','NotAllowedError'));}
    return original.call(this);
  };
});
await p.goto((process.env.QA_URL||'http://localhost:5182')+locale+'/');await p.waitForLoadState('networkidle');
await p.locator('.home-service-cards').scrollIntoViewIfNeeded();
const card=p.locator('.home-service-card').first();
await card.locator('.home-service-card-play').waitFor();
assert.equal(await card.locator('h3 button').getAttribute('aria-expanded'),'false');
await card.locator('.home-service-card-play').click();
await p.waitForFunction(()=>!document.querySelector('.home-service-card video').paused&&document.querySelector('.home-service-card video').currentTime>0);
assert.equal(await card.locator('.home-service-card-play').count(),0);
assert.equal(await card.locator('h3 button').getAttribute('aria-expanded'),'false');
console.log('PASS Safari autoplay denial, visible Play fallback, trusted tap recovery',locale||'en');await p.close();
}await browser.close();
