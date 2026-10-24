const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  const consoleErrors=[];const consoleWarnings=[];const networkFailures=[];const pageErrors=[];
  const supabaseResponses=[];
  page.on('console', m=>{const e={url:page.url(),type:m.type(),text:m.text()}; if(m.type()==='error')consoleErrors.push(e); if(m.type()==='warning')consoleWarnings.push(e);});
  page.on('pageerror', e=>pageErrors.push({url:page.url(),message:e.message}));
  page.on('response', r=>{ const u=r.url(); if(u.includes('supabase')) supabaseResponses.push({status:r.status(),url:u}); if(r.status()>=400) networkFailures.push({page:page.url(),url:u,status:r.status(),statusText:r.statusText()});});
  page.on('requestfailed', r=>networkFailures.push({page:page.url(),url:r.url(),failure:r.failure()?.errorText}));

  await page.goto('http://127.0.0.1:5174/pendaftaran/kolase', { waitUntil:'networkidle' });
  await page.waitForTimeout(2000);

  // fill nama peserta input (first unnamed)
  const nameInput = await page.$('input[placeholder^="Nama Peserta"]');
  if (nameInput) await nameInput.fill('Anak Test Kolase');
  await page.fill('[name="nama_sekolah"]', 'SD Test');
  await page.fill('[name="alamat_sekolah"]', 'Alamat Test');
  await page.fill('[name="guru_pendamping"]', 'Guru Test');
  await page.fill('[name="nohp_pendamping"]', '081234567890');
  await page.fill('[name="bank_pengirim"]', 'BSI');
  await page.fill('[name="nama_pemilik_rekening"]', 'Ortu Test');
  // file upload
  const fileInput = await page.$('[name="bukti_transfer"]');
  if (fileInput) await fileInput.setInputFiles(path.resolve('scratch/test.png'));
  // checkboxes
  for (const cb of await page.$$('input[type="checkbox"]')) {
    await cb.check().catch(()=>{});
  }
  await page.waitForTimeout(500);
  // submit
  const submitBtn = await page.$('button[type="submit"]');
  console.log('submit btn found:', !!submitBtn);
  if (submitBtn) await submitBtn.click();
  await page.waitForTimeout(8000);
  console.log('URL after submit:', page.url());
  console.log('SUPABASE RESPONSES:', JSON.stringify(supabaseResponses));
  console.log('PAGE ERRORS:', JSON.stringify(pageErrors));
  console.log('CONSOLE ERRORS:', JSON.stringify(consoleErrors));
  console.log('CONSOLE WARNINGS:', JSON.stringify(consoleWarnings));
  console.log('NETWORK FAILURES:', JSON.stringify(networkFailures));
  await browser.close();
})();
