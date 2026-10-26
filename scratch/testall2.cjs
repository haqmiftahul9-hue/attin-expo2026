const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  for (const slug of ['tahfizh','futsal']) {
    const page = await context.newPage();
    const inserts=[];
    page.on('response', r=>{ if(r.url().includes('registrations') && r.url().includes('rest')) inserts.push(r.status()); });
    await page.goto('http://127.0.0.1:5174/pendaftaran/'+slug, { waitUntil:'networkidle' });
    await page.waitForTimeout(2000);
    const nameInput = await page.$('input[placeholder^="Nama Peserta"]');
    if (nameInput) await nameInput.fill('Peserta '+slug);
    // tahfizh uses nama_pa
    const pa = await page.$('[name="nama_pa"]');
    if (pa) await pa.fill('Putra '+slug);
    await page.fill('[name="nama_sekolah"]', 'SD '+slug);
    await page.fill('[name="alamat_sekolah"]', 'Alamat '+slug);
    await page.fill('[name="guru_pendamping"]', 'Guru '+slug);
    await page.fill('[name="nohp_pendamping"]', '081234567890');
    const fileInput = await page.$('input[type="file"]');
    if (fileInput) await fileInput.setInputFiles(path.resolve('scratch/test.png'));
    for (const cb of await page.$$('input[type="checkbox"]')) { try { await cb.check(); } catch(e){} }
    // select first option for selects
    for (const sel of await page.$$('select')) {
      const opts = await sel.$$('option');
      if (opts.length>1) { const v=await opts[1].getAttribute('value'); if(v!==null) await sel.selectOption(v).catch(()=>{}); }
    }
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) await submitBtn.click();
    await page.waitForTimeout(7000);
    console.log(`[${slug}] URL:${page.url()} inserts:${JSON.stringify(inserts)}`);
    await page.close();
  }
  await browser.close();
})();
