const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  const consoleErrors=[];const consoleWarnings=[];const networkFailures=[];const pageErrors=[];
  page.on('console', m=>{const e={url:page.url(),type:m.type(),text:m.text()}; if(m.type()==='error')consoleErrors.push(e); if(m.type()==='warning')consoleWarnings.push(e);});
  page.on('pageerror', e=>pageErrors.push({url:page.url(),message:e.message}));
  page.on('response', r=>{ if(r.status()>=400) networkFailures.push({page:page.url(),url:r.url(),status:r.status()});});
  page.on('requestfailed', r=>networkFailures.push({page:page.url(),url:r.url(),failure:r.failure()?.errorText}));
  await page.goto('http://127.0.0.1:5174/', { waitUntil:'networkidle' });
  await page.waitForTimeout(5000);
  await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
  await page.waitForTimeout(5000);
  console.log('PAGE ERRORS:', JSON.stringify(pageErrors));
  console.log('CONSOLE ERRORS:', JSON.stringify(consoleErrors));
  console.log('CONSOLE WARNINGS:', JSON.stringify(consoleWarnings));
  console.log('NETWORK FAILURES:', JSON.stringify(networkFailures));
  await browser.close();
})();
