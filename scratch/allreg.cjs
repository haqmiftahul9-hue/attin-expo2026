const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });

  const slugs = ['tahfizh','olimpiade','panahan','kolase','pra-tka','futsal','baca-puisi'];
  for (const slug of slugs) {
    const page = await context.newPage();
    const consoleErrors=[];const networkFailures=[];const pageErrors=[];
    page.on('console', m=>{ if(m.type()==='error') consoleErrors.push(m.text()); });
    page.on('pageerror', e=>pageErrors.push(e.message));
    page.on('response', r=>{ if(r.status()>=400) networkFailures.push({status:r.status(),url:r.url()}); });

    await page.goto('http://127.0.0.1:5174/pendaftaran/'+slug, { waitUntil:'networkidle' });
    await page.waitForTimeout(2000);

    // fill text inputs/selects
    const inputs = await page.$$('input[type="text"], input[type="email"], input[type="tel"], input[type="date"], input:not([type])');
    for (const inp of inputs) {
      const nm = await inp.getAttribute('name');
      const id = await inp.getAttribute('id');
      if (nm === 'competition_id' || nm === 'competition_slug') continue;
      if (id && id.includes('admin')) continue;
      try { await inp.fill('Test Value'); } catch(e){}
    }
    // selects
    const selects = await page.$$('select');
    for (const sel of selects) {
      const opts = await sel.$$('option');
      if (opts.length > 1) {
        const val = await opts[1].getAttribute('value');
        if (val !== null) await sel.selectOption(val).catch(()=>{});
      }
    }
    // unnamed nama peserta inputs
    const unnamed = await page.$$('input:not([name])');
    for (const inp of unnamed) {
      try { await inp.fill('Anak Test'); } catch(e){}
    }
    // textareas
    const tas = await page.$$('textarea');
    for (const t of tas) { try { await t.fill('Test'); } catch(e){} }
    // file
    const fileInput = await page.$('input[type="file"]');
    if (fileInput) await fileInput.setInputFiles(path.resolve('scratch/test.png')).catch(()=>{});
    // checkboxes
    for (const cb of await page.$$('input[type="checkbox"]')) { try { await cb.check(); } catch(e){} }
    // radios first
    const radios = await page.$$('input[type="radio"]');
    if (radios.length) { try { await radios[0].check(); } catch(e){} }

    await page.waitForTimeout(500);
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) await submitBtn.click().catch(()=>{});
    await page.waitForTimeout(6000);
    console.log(`[${slug}] URL: ${page.url()} | consoleErrors:${consoleErrors.length} netFail:${networkFailures.length} pageErrors:${pageErrors.length}`);
    if (consoleErrors.length) console.log('  CE:', consoleErrors);
    if (networkFailures.length) console.log('  NF:', JSON.stringify(networkFailures));
    if (pageErrors.length) console.log('  PE:', pageErrors);
    await page.close();
  }
  await browser.close();
})();
