const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  const msgs=[];
  page.on('console', m=>msgs.push({type:m.type(),text:m.text(),url:page.url()}));
  page.on('pageerror', e=>msgs.push({type:'PAGEERROR',text:e.message,url:page.url()}));
  const pages=['/','/lomba/tahfizh','/pendaftaran/tahfizh','/pendaftaran/olimpiade','/admin/login','/admin'];
  for (const p of pages) {
    await page.goto('http://127.0.0.1:5174'+p, { waitUntil:'networkidle' });
    await page.waitForTimeout(3000);
  }
  // print unique
  const uniq = [...new Set(msgs.map(m=>m.type+': '+m.text))];
  console.log('ALL CONSOLE (unique):');
  uniq.forEach(u=>console.log(u));
  console.log('total msgs:', msgs.length);
  await browser.close();
})();
