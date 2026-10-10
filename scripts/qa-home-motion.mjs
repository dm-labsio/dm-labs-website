import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const base = process.env.WORK_QA_URL || 'http://localhost:5182';
const browser = await chromium.launch();
const consent = () => localStorage.setItem('dm_cookie_consent', JSON.stringify({essential:true,analytics:false}));
try {
  for (const locale of ['', '/el', '/he']) for (const width of [320, 390, 768, 1440]) {
    const p = await browser.newPage({viewport:{width,height:900},hasTouch:width<1000,isMobile:width<768});
    const errors = [], requests = [];
    p.on('pageerror', e=>errors.push(e.message));
    p.on('request', r=>{if(r.url().includes('/brand-refresh/v3/')&&r.url().endsWith('.mp4')) requests.push(r.url());});
    await p.addInitScript(consent);
    await p.goto(base+locale+'/');await p.waitForLoadState('networkidle');
    assert.equal(requests.length,0,'Service videos must not load at the hero');
    assert.equal(await p.locator('h1').count(),1);
    assert.equal(await p.locator('.home-hero-primary').getAttribute('href'),locale+'/contact/');
    assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    const layout = await p.evaluate(()=>{
      const box=s=>document.querySelector(s)?.getBoundingClientRect();
      return {bannerBottom:box('.seasonal-banner')?.bottom,eyebrowTop:box('.home-hero-eyebrow').top};
    });
    if(layout.bannerBottom) assert.ok(layout.bannerBottom<layout.eyebrowTop,'Offer must not overlap hero copy');
    const sculpture = p.locator('.home-hero-sculpture');
    const transform = await sculpture.evaluate(e=>getComputedStyle(e).transform);
    await p.waitForTimeout(400);
    assert.notEqual(await sculpture.evaluate(e=>getComputedStyle(e).transform),transform,'Hero floats without a pointer');
    if(width===390||width===1440) await p.screenshot({path:`/tmp/home-motion-${locale.slice(1)||'en'}-${width}.png`});
    const ambient = p.locator('[data-seasonal-runtime="halloween"]');
    if(await ambient.count()) {
      assert.equal(await ambient.getAttribute('data-ambient'),'playing');
      assert.equal(await p.locator('.seasonal-banner-mark').evaluate(e=>getComputedStyle(e).animationPlayState),'running');
    }
    const ribbon=p.locator('.home-service-ribbon');await ribbon.scrollIntoViewIfNeeded();await p.mouse.move(0,0);await p.waitForTimeout(250);
    const track=ribbon.locator('.home-service-ribbon-track');
    const start=await track.evaluate(e=>getComputedStyle(e).transform);await p.waitForTimeout(350);
    assert.notEqual(await track.evaluate(e=>getComputedStyle(e).transform),start,'Ribbon moves');
    assert.equal(await ribbon.locator('.home-service-ribbon-copy[aria-hidden="true"]').count(),1);
    const sizing=await track.evaluate(e=>({track:e.getBoundingClientRect().width,copy:e.firstElementChild.getBoundingClientRect().width}));
    assert.ok(Math.abs(sizing.track-2*sizing.copy)<1,'Loop copies join without a gap');
    await ribbon.locator('button').click();await p.mouse.move(0,0);
    assert.equal(await track.evaluate(e=>getComputedStyle(e).animationPlayState),'paused');
    await ribbon.locator('button').click();await p.mouse.move(0,0);
    assert.equal(await track.evaluate(e=>getComputedStyle(e).animationPlayState),'running');
    const cards=p.locator('.home-service-card');await p.locator('.home-service-cards').scrollIntoViewIfNeeded();
    if(width<768) {
      for(let i=0;i<6;i++) {
        if(i) await p.locator('.home-service-carousel-controls button').last().click();
        await p.waitForFunction(i=>{const v=document.querySelectorAll('.home-service-card video')[i];return !!v.getAttribute('src')&&!v.paused&&v.currentTime>0},i);
        assert.equal(await cards.nth(i).locator('h3 button').getAttribute('aria-expanded'),'false','Autoplay must not expand copy');
        assert.equal(await p.locator('.home-service-card video[src]').count(),1,'Only visible card downloads and plays');
      }
      await cards.last().locator('h3 button').click();
      assert.equal(await cards.last().locator('h3 button').getAttribute('aria-expanded'),'true');
      assert.ok((await cards.last().locator('a').getAttribute('href')).startsWith(locale+'/services/'));
    } else {
      assert.equal(await p.locator('.home-service-card video[src]').count(),0);
      await cards.first().locator('h3 button').click();
      await p.waitForFunction(()=>!document.querySelector('.home-service-card video').paused);
    }
    await p.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await p.waitForTimeout(400);
    assert.equal(await cards.locator('video').evaluateAll(vs=>vs.every(v=>v.paused)),true,'Offscreen videos stop');
    assert.deepEqual(errors,[]);
    console.log('PASS layout, hero/season motion, ribbon loop/control, service autoplay, offscreen pause',locale||'en',width);
    await p.close();
  }
  for(const mode of ['reduce','saveData']) {
    const p=await browser.newPage({viewport:{width:390,height:900},isMobile:true,hasTouch:true,reducedMotion:mode==='reduce'?'reduce':'no-preference'});
    await p.addInitScript(consent);
    if(mode==='saveData') await p.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true},configurable:true}));
    await p.goto(base+'/');await p.waitForLoadState('networkidle');
    await p.locator('.home-service-ribbon').scrollIntoViewIfNeeded();
    assert.equal(await p.locator('.home-service-ribbon').getAttribute('data-motion'),'paused');
    await p.locator('.home-service-cards').scrollIntoViewIfNeeded();await p.locator('.home-service-card h3 button').first().click();
    assert.equal(await p.locator('.home-service-card video[src]').count(),0);
    assert.equal(await p.locator('.home-service-card h3 button').first().getAttribute('aria-expanded'),'true');
    console.log('PASS accessible static content and no service video download',mode);await p.close();
  }
  // Changing the preference mid-visit stops motion immediately and restores autoplay on opt-in.
  const p=await browser.newPage({viewport:{width:390,height:900},isMobile:true,hasTouch:true});
  await p.addInitScript(consent);await p.goto(base+'/');await p.waitForLoadState('networkidle');await p.locator('.home-service-cards').scrollIntoViewIfNeeded();
  await p.waitForFunction(()=>!document.querySelector('.home-service-card video').paused);
  await p.emulateMedia({reducedMotion:'reduce'});await p.waitForTimeout(200);
  assert.equal(await p.locator('.home-service-card video[src]').count(),0);
  await p.emulateMedia({reducedMotion:'no-preference'});await p.waitForFunction(()=>!document.querySelector('.home-service-card video').paused);
  console.log('PASS live motion preference change');await p.close();
} finally { await browser.close(); }
