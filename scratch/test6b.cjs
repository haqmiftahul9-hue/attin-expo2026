const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  let body='';
  page.on('response', async r => {
    if (r.url().includes('registrations') && r.status()>=400) {
      try { body = await r.text(); } catch(e){}
    }
  });
  await page.goto('http://127.0.0.1:5174/pendaftaran/tahfizh-kelas-6', { waitUntil:'networkidle' });
  await page.waitForTimeout(2000);
  const nameInput = await page.$('input[placeholder^="Nama Peserta"]');
  if (nameInput) await nameInput.fill('Anak Kelas 6B');
  await page.fill('[name="nama_sekolah"]', 'SD Test 6B');
  await page.fill('[name="alamat_sekolah"]', 'Alamat 6B');
  await page.fill('[name="guru_pendamping"]', 'Guru 6B');
  await page.fill('[name="nohp_pendamping"]', '081234567890');
  const fileInput = await page.$('input[type="file"]');
  if (fileInput) await fileInput.setInputFiles(path.resolve('scratch/test.png'));
  for (const cb of await page.$$('input[type="checkbox"]')) { try { await cb.check(); } catch(e){} }
  const submitBtn = await page.$('button[type="submit"]');
  if (submitBtn) await submitBtn.click();
  await page.waitForTimeout(6000);
  console.log('BODY:', body);
  await browser.close();
})();
