const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  const inserts=[];
  page.on('response', r=>{ if(r.url().includes('rest/v1/registrations')) inserts.push(r.status()); });
  await page.goto('http://127.0.0.1:5174/pendaftaran/olimpiade', { waitUntil:'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);
  // add two names
  const addBtn = await page.$('button:has-text("Tambah Nama Peserta")');
  if (addBtn) await addBtn.click();
  await page.waitForTimeout(500);
  const nameInputs = await page.$$('input[placeholder^="Nama Peserta"]');
  if (nameInputs[0]) await nameInputs[0].fill('Siswa Satu');
  if (nameInputs[1]) await nameInputs[1].fill('Siswa Dua');
  await page.fill('[name="nama_sekolah"]', 'SD Olim');
  await page.fill('[name="alamat_sekolah"]', 'Alamat');
  await page.fill('[name="guru_pendamping"]', 'Guru');
  await page.fill('[name="nohp_pendamping"]', '081234567890');
  // select subjects per student
  const subjSelects = await page.$$('select[name^="mata_pelajaran_"]');
  console.log('num subject selects:', subjSelects.length);
  if (subjSelects[0]) await subjSelects[0].selectOption('IPA');
  if (subjSelects[1]) await subjSelects[1].selectOption('Matematika');
  // grades
  const gradeSelects = await page.$$('select[name^="kelas_peserta_"]');
  if (gradeSelects[0]) await gradeSelects[0].selectOption('3');
  if (gradeSelects[1]) await gradeSelects[1].selectOption('4');
  const fileInput = await page.$('input[type="file"]');
  if (fileInput) await fileInput.setInputFiles(path.resolve('scratch/test.png'));
  for (const cb of await page.$$('input[type="checkbox"]')) { try { await cb.check(); } catch(e){} }
  const submitBtn = await page.$('button[type="submit"]');
  if (submitBtn) await submitBtn.click();
  await page.waitForTimeout(8000);
  console.log('URL:', page.url());
  console.log('inserts:', JSON.stringify(inserts));
  await browser.close();
})();
