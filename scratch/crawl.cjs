const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const consoleErrors = [];
  const consoleWarnings = [];
  const networkFailures = [];
  const pageErrors = [];
  const allRequests = [];

  page.on('console', msg => {
    const e = { url: page.url(), type: msg.type(), text: msg.text() };
    if (msg.type() === 'error') consoleErrors.push(e);
    if (msg.type() === 'warning') consoleWarnings.push(e);
  });
  page.on('pageerror', err => pageErrors.push({ url: page.url(), message: err.message }));
  page.on('response', resp => {
    allRequests.push({ page: page.url(), url: resp.url(), status: resp.status() });
    if (resp.status() >= 400) networkFailures.push({ page: page.url(), request: resp.url(), status: resp.status(), statusText: resp.statusText() });
  });
  page.on('requestfailed', req => networkFailures.push({ page: page.url(), request: req.url(), failure: req.failure()?.errorText }));

  // Crawl all internal links from home
  await page.goto('http://127.0.0.1:5174/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  const hrefs = await page.$$eval('a', as => [...new Set(as.map(a=>a.getAttribute('href')).filter(Boolean))]);
  console.log('HOME LINKS:', JSON.stringify(hrefs));
  for (const h of hrefs) {
    if (!h.startsWith('/') || h.startsWith('//')) continue;
    try {
      const resp = await page.goto('http://127.0.0.1:5174'+h, { waitUntil: 'networkidle', timeout: 20000 });
      console.log('LINK', h, resp && resp.status());
      await page.waitForTimeout(500);
    } catch(e) { console.log('LINK ERR', h, e.message); }
  }

  // Test kolase form fill + submit
  console.log('\n=== KOLASE FORM TEST ===');
  await page.goto('http://127.0.0.1:5174/pendaftaran/kolase', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // fill common fields
  await page.fill('#field-nama_lengkap, [name="nama_lengkap"]', 'Anak Test\n').catch(()=>{});
  // Actually kolase has nama_lengkap required
  const nl = await page.$('[name="nama_lengkap"], #field-nama_lengkap');
  console.log('nama_lengkap field found:', !!nl);

  // dump input names present
  const inputNames = await page.$$eval('input,select,textarea', els => els.map(e=>e.name||e.id).filter(Boolean));
  console.log('FORM FIELDS:', JSON.stringify(inputNames));

  fs.writeFileSync('scratch/report.json', JSON.stringify({consoleErrors,consoleWarnings,pageErrors,networkFailures}, null, 2));
  console.log('\n=== PAGE ERRORS ===', JSON.stringify(pageErrors));
  console.log('=== CONSOLE ERRORS ===', JSON.stringify(consoleErrors));
  console.log('=== CONSOLE WARNINGS ===', JSON.stringify(consoleWarnings));
  console.log('=== NETWORK FAILURES ===', JSON.stringify(networkFailures));

  await browser.close();
})();
