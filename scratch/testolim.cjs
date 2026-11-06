const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  const inserts=[];
  page.on('response', r=>{ if(r.url().includes('rest/v1/registrations')) inserts.push(r.status()); });
  await page.goto('http://127.0.0.1:5174/pendaftaran/olimpiade', { waitUntil:'networkidle' });
  await page.waitForTimeout(2000);
  const nameInput = await page.$('input[placeholder^="Nama Peserta"]');
  if (nameInput) await nameInput.fill('Peserta Olimpiade');
  await page.fill('[name="nama_sekolah"]', 'SD Olim');
  await page.fill('[name="alamat_sekolah"]', 'Alamat');
  await page.fill('[name="guru_pendamping"]', 'Guru');
  await page.fill('[name="nohp_pendamping"]', '081234567890');
  // select category (mata pelajaran)
  const catSelect = await page.$('[name="kategori_olimpiade"]');
  if (catSelect) await catSelect.selectOption('IPA');
  // grade
  const gradeSelect = await page.$('select[name^="kelas_peserta_"]');
  if (gradeSelect) await gradeSelect.selectOption('3');
  const fileInput = await page.$('input[type="file"]');
  if (fileInput) await fileInput.setInputFiles(path.resolve('scratch/test.png'));
  for (const cb of await page.$$('input[type="checkbox"]')) { try { await cb.check(); } catch(e){} }
  const submitBtn = await page.$('button[type="submit"]');
  if (submitBtn) await submitBtn.click();
  await page.waitForTimeout(7000);
  console.log('URL:', page.url());
  console.log('inserts:', JSON.stringify(inserts));
  await browser.close();
})();
