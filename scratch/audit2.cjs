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
    if (resp.status() >= 400) networkFailures.push({ page: page.url(), request: resp.url(), status: resp.status() });
  });
  page.on('requestfailed', req => networkFailures.push({ page: page.url(), request: req.url(), failure: req.failure()?.errorText }));

  const slugs = ['tahfizh','olimpiade','panahan','kolase','pra-tka','futsal','baca-puisi'];
  const routes = ['/', ...slugs.map(s=>'/lomba/'+s), ...['tahfizh','olimpiade','panahan','kolase','pra-tka','futsal','baca-puisi'].map(s=>'/pendaftaran/'+s), '/admin/login'];

  for (const r of routes) {
    console.log('VISITING', r);
    try {
      await page.goto('http://127.0.0.1:5174' + r, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(800);
    } catch (e) {
      console.log('NAV ERROR', r, e.message);
    }
  }

  // Test interactions on home: click menu links
  console.log('\n--- HOME INTERACTION ---');
  await page.goto('http://127.0.0.1:5174/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  // click all anchor/buttons
  const links = await page.locator('a').all();
  console.log('num links home:', links.length);

  console.log('\n=== PAGE ERRORS ===');
  console.log(JSON.stringify(pageErrors, null, 2));
  console.log('\n=== CONSOLE ERRORS ===');
  console.log(JSON.stringify(consoleErrors, null, 2));
  console.log('\n=== CONSOLE WARNINGS ===');
  console.log(JSON.stringify(consoleWarnings, null, 2));
  console.log('\n=== NETWORK FAILURES ===');
  console.log(JSON.stringify(networkFailures, null, 2));

  await browser.close();
})();
