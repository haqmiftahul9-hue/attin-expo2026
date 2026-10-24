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
    if (msg.type() === 'error') consoleErrors.push({ url: page.url(), text: msg.text() });
    if (msg.type() === 'warning') consoleWarnings.push({ url: page.url(), text: msg.text() });
  });
  page.on('pageerror', err => pageErrors.push({ url: page.url(), message: err.message, stack: err.stack }));
  page.on('response', resp => {
    if (resp.status() >= 400) {
      networkFailures.push({ url: page.url(), request: resp.url(), status: resp.status(), statusText: resp.statusText() });
    }
  });
  page.on('requestfailed', req => {
    networkFailures.push({ url: page.url(), request: req.url(), failure: req.failure()?.errorText });
  });

  const routes = [
    '/',
    '/lomba/tahfizh',
    '/pendaftaran/tahfizh',
    '/pendaftaran/olimpiade',
    '/pendaftaran/panahan',
    '/pendaftaran/kolase',
    '/pendaftaran/pra-tka',
    '/pendaftaran/futsal',
    '/pendaftaran/baca-puisi',
    '/admin/login',
  ];

  const results = {};
  for (const r of routes) {
    console.log('VISITING', r);
    try {
      await page.goto('http://127.0.0.1:5174' + r, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1500);
      results[r] = { title: await page.title(), ok: true };
    } catch (e) {
      results[r] = { ok: false, error: e.message };
    }
  }

  console.log('\n=== SUMMARY ===');
  console.log(JSON.stringify(results, null, 2));
  console.log('\n=== PAGE ERRORS ===');
  console.log(JSON.stringify(pageErrors, null, 2));
  console.log('\n=== CONSOLE ERRORS ===');
  console.log(JSON.stringify(consoleErrors, null, 2));
  console.log('\n=== CONSOLE WARNINGS (first 30) ===');
  console.log(JSON.stringify(consoleWarnings.slice(0,30), null, 2));
  console.log('\n=== NETWORK FAILURES ===');
  console.log(JSON.stringify(networkFailures, null, 2));

  await browser.close();
})();
