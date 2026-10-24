const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  const consoleErrors=[];const consoleWarnings=[];const networkFailures=[];const pageErrors=[];
  page.on('console', m=>{const e={url:page.url(),type:m.type(),text:m.text()}; if(m.type()==='error')consoleErrors.push(e); if(m.type()==='warning')consoleWarnings.push(e);});
  page.on('pageerror', e=>pageErrors.push({url:page.url(),message:e.message}));
  page.on('response', r=>{ if(r.status()>=400) networkFailures.push({page:page.url(),url:r.url(),status:r.status()});});
  page.on('requestfailed', r=>networkFailures.push({page:page.url(),url:r.url(),failure:r.failure()?.errorText}));

  const pages = ['/', '/lomba/tahfizh','/lomba/olimpiade','/lomba/panahan','/lomba/kolase','/lomba/pra-tka','/lomba/futsal','/lomba/baca-puisi'];
  for (const p of pages) {
    await page.goto('http://127.0.0.1:5174'+p, { waitUntil:'networkidle' });
    await page.waitForTimeout(1500);
    // click all buttons
    const btns = await page.$$('button, [role="button"], summary, details');
    for (const b of btns) { try { await b.click({timeout:1000}); await page.waitForTimeout(200);}catch(e){} }
    // click all links internal
    const links = await page.$$('a');
    for (const l of links) { try { const href=await l.getAttribute('href'); if(href && href.startsWith('#')) { await l.click({timeout:1000}); await page.waitForTimeout(200);} }catch(e){} }
    await page.waitForTimeout(500);
  }
  console.log('PAGE ERRORS:', JSON.stringify(pageErrors));
  console.log('CONSOLE ERRORS:', JSON.stringify(consoleErrors));
  console.log('CONSOLE WARNINGS:', JSON.stringify(consoleWarnings));
  console.log('NETWORK FAILURES:', JSON.stringify(networkFailures));
  await browser.close();
})();
