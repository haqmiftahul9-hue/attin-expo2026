const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const consoleErrors = [];
  const consoleWarnings = [];
  const networkFailures = [];
  const pageErrors = [];

  page.on('console', msg => {
    const e = { url: page.url(), type: msg.type(), text: msg.text() };
    if (msg.type() === 'error') consoleErrors.push(e);
    if (msg.type() === 'warning') consoleWarnings.push(e);
  });
  page.on('pageerror', err => pageErrors.push({ url: page.url(), message: err.message }));
  page.on('response', resp => {
    if (resp.status() >= 400) networkFailures.push({ page: page.url(), request: resp.url(), status: resp.status(), statusText: resp.statusText() });
  });
  page.on('requestfailed', req => networkFailures.push({ page: page.url(), request: req.url(), failure: req.failure()?.errorText }));

  // Admin login
  await page.goto('http://127.0.0.1:5174/admin/login', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  console.log('login inputs:', await page.$$eval('input', els=>els.map(e=>({type:e.type,name:e.name,id:e.id,placeholder:e.placeholder}))));
  // try submit empty
  const btn = await page.$('button[type="submit"]');
  if (btn) { await btn.click(); await page.waitForTimeout(2000); }
  console.log('after empty submit url:', page.url());

  // fill dummy
  const emailInput = await page.$('input[type="email"], input[name="email"]');
  const passInput = await page.$('input[type="password"], input[name="password"]');
  if (emailInput) await emailInput.fill('test@test.com');
  if (passInput) await passInput.fill('password123');
  if (btn) { await btn.click(); await page.waitForTimeout(4000); }
  console.log('after dummy submit url:', page.url());

  console.log('PAGE ERRORS:', JSON.stringify(pageErrors));
  console.log('CONSOLE ERRORS:', JSON.stringify(consoleErrors));
  console.log('CONSOLE WARNINGS:', JSON.stringify(consoleWarnings));
  console.log('NETWORK FAILURES:', JSON.stringify(networkFailures));

  await browser.close();
})();
