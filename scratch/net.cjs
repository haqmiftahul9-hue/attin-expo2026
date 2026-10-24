const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  const bad=[];
  page.on('response', r=>{ if(r.status()>=400) bad.push({status:r.status(),url:r.url(),page:page.url()});});
  const pages=['/','/lomba/tahfizh','/pendaftaran/tahfizh','/pendaftaran/kolase','/admin/login'];
  for (const p of pages) {
    await page.goto('http://127.0.0.1:5174'+p, { waitUntil:'networkidle' });
    await page.waitForTimeout(2000);
  }
  console.log('BAD RESPONSES:', JSON.stringify(bad));
  await browser.close();
})();
