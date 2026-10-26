const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  const consoleErrors=[];const networkFailures=[];const pageErrors=[];
  page.on('console', m=>{ if(m.type()==='error') consoleErrors.push(m.text()); });
  page.on('pageerror', e=>pageErrors.push(e.message));
  page.on('response', r=>{ if(r.status()>=400) networkFailures.push({status:r.status(),url:r.url()}); });

  await page.goto('http://127.0.0.1:5174/pendaftaran/tahfizh-kelas-6', { waitUntil:'networkidle' });
  await page.waitForTimeout(2000);
  // fill
  const nameInput = await page.$('input[placeholder^="Nama Peserta"]');
  if (nameInput) await nameInput.fill('Anak Kelas 6');
  await page.fill('[name="nama_sekolah"]', 'SD Test 6');
  await page.fill('[name="alamat_sekolah"]', 'Alamat 6');
  await page.fill('[name="guru_pendamping"]', 'Guru 6');
  await page.fill('[name="nohp_pendamping"]', '081234567890');
  const fileInput = await page.$('input[type="file"]');
  if (fileInput) await fileInput.setInputFiles(path.resolve('scratch/test.png'));
  for (const cb of await page.$$('input[type="checkbox"]')) { try { await cb.check(); } catch(e){} }
  const submitBtn = await page.$('button[type="submit"]');
  if (submitBtn) await submitBtn.click();
  await page.waitForTimeout(8000);
  console.log('URL:', page.url());
  console.log('consoleErrors:', consoleErrors);
  console.log('networkFailures:', JSON.stringify(networkFailures));
  console.log('pageErrors:', pageErrors);
  await browser.close();
})();
