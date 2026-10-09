import { chromium, webkit } from 'playwright';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
const base=process.env.WORK_QA_URL || 'http://127.0.0.1:5177';
const browser=await chromium.launch();
const consent=()=>localStorage.setItem('dm_cookie_consent',JSON.stringify({essential:true,analytics:false}));
async function check(browser,width,locale,engine='chromium'){
 const p=await browser.newPage({viewport:{width,height:900},isMobile:width<700,hasTouch:width<700});
 const errors=[],requests=[];p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(/dm-labs-introduction-.*\.mp4/.test(r.url()))requests.push(r.url())});
 await p.addInitScript(consent);await p.goto(base+locale+'/');
 await p.locator('.home-film-start').waitFor();await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
 await p.locator('.home-film').scrollIntoViewIfNeeded();await p.waitForTimeout(300);
 assert.equal(requests.length,0,'no intro MP4 before interaction');
 const layout=await p.evaluate(()=>{const h=document.querySelector('.home-hero').getBoundingClientRect(),v=document.querySelector('.home-film-frame').getBoundingClientRect();return {gap:v.top-h.bottom,overflow:document.documentElement.scrollWidth>innerWidth}});
 assert.ok(layout.gap>=0&&layout.gap<=32,`hero/video gap ${layout.gap}`);assert.equal(layout.overflow,false);
 await p.screenshot({path:`/tmp/home-film-cover-${engine}-${width}-${locale.replaceAll('/','')||'en'}.png`});
 await p.locator('.home-film-start').click();
 const video=p.locator('.home-film video');
 await p.waitForFunction(()=>document.querySelector('.home-film video').currentTime>.4);
 assert.ok(requests.some(url=>url.includes(width<768?'720p':'1080p')));
 await p.locator('.home-film-toggle').click();await p.waitForFunction(()=>document.querySelector('.home-film video').paused);
 const paused=await video.evaluate(v=>v.currentTime);await p.waitForTimeout(200);assert.ok(Math.abs((await video.evaluate(v=>v.currentTime))-paused)<.1);
 const seek=p.locator('.home-film-timeline input');await seek.focus();await seek.press('ArrowRight');assert.ok((await video.evaluate(v=>v.currentTime))>paused,'keyboard seek');
 await p.locator('.home-film-controls select').selectOption('1.5');assert.equal(await video.evaluate(v=>v.playbackRate),1.5);
 const mute=p.locator('.home-film-audio button').nth(1);await mute.click();assert.equal(await video.evaluate(v=>v.muted),true);await mute.click();assert.equal(await video.evaluate(v=>v.muted),false);
 if(width>=768){const volume=p.locator('.home-film-volume');await volume.focus();await volume.press('Home');assert.equal(await video.evaluate(v=>v.volume),0);await mute.click();assert.equal(await video.evaluate(v=>v.muted),false);assert.ok((await video.evaluate(v=>v.volume))>0);}
 await p.locator('.home-film-toggle').click();await p.waitForFunction(()=>!document.querySelector('.home-film video').paused);await p.waitForTimeout(250);
 assert.ok((await video.evaluate(v=>v.currentTime))>paused,'resume keeps position');
 // Native range End seeks to the end; the next Play is a true replay.
 await seek.focus();await seek.press('End');await p.waitForFunction(()=>document.querySelector('.home-film video').ended);
 await p.locator('.home-film-toggle').click();await p.waitForFunction(()=>{const v=document.querySelector('.home-film video');return !v.paused&&v.currentTime<2});
 if(engine==='chromium'&&width===1440){await p.locator('.home-film-options button').click();await p.waitForFunction(()=>!!document.fullscreenElement);await p.locator('.home-film-options button').click();await p.waitForFunction(()=>!document.fullscreenElement);}
 await p.locator('.home-film-toggle').click();
 if(width<768){const c=await p.locator('.home-film-controls').boundingBox(),v=await video.boundingBox();assert.ok(c.y>=v.y+v.height-1,'touch controls below video');}
 await p.screenshot({path:`/tmp/home-film-playing-${engine}-${width}-${locale.replaceAll('/','')||'en'}.png`});
 assert.deepEqual(errors,[]);console.log('PASS',engine,width,locale||'en','lazy source, spacing, play/pause, seek, mute, speed, replay, overflow');await p.close();
}
try{
 for(const [width,locale]of[[390,''],[320,'/he'],[768,'/el'],[1440,'']])await check(browser,width,locale);
 const p=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true,reducedMotion:'reduce'});await p.addInitScript(consent);
 await p.route('**/dm-labs-introduction-*.mp4',r=>r.abort());await p.goto(base+'/');await p.locator('.home-film-start').click();await p.locator('.home-film-error').waitFor();
 await p.unroute('**/dm-labs-introduction-*.mp4');await p.locator('.home-film-error button').click();await p.waitForFunction(()=>document.querySelector('.home-film video').currentTime>.2);
 assert.equal(await p.locator('.home-film-error').count(),0);console.log('PASS failure recovery and reduced-motion playback');await p.close();
}finally{await browser.close()}
if(existsSync(webkit.executablePath())){const safari=await webkit.launch();try{await check(safari,390,'','webkit')}finally{await safari.close()}}
