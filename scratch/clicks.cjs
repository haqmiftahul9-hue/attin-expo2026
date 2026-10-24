const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const consoleErrors = [];
  const pageErrors = [];
  const networkFailures = [];

  page.on('console', msg => { if (msg.type()==='error') consoleErrors.push({url:page.url(),text:msg.text()}); });
  page.on('pageerror', err => pageErrors.push({url:page.url(),message:err.message}));
  page.on('response', resp => { if (resp.status()>=400) networkFailures.push({page:page.url(),url:resp.url(),status:resp.status()}); });

  await page.goto('http://127.0.0.1:5174/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // click all buttons
  const buttons = await page.$$('button');
  console.log('num buttons home:', buttons.length);
  for (let i=0;i<buttons.length;i++){
    try {
      await buttons[i].click({ timeout: 2000 });
      await page.waitForTimeout(300);
    } catch(e) { /* ignore */ }
  }

  console.log('PAGE ERRORS:', JSON.stringify(pageErrors));
  console.log('CONSOLE ERRORS:', JSON.stringify(consoleErrors));
  console.log('NETWORK FAILURES:', JSON.stringify(networkFailures));

  await browser.close();
})();
