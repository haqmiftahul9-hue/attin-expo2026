import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (err) => errors.push(String(err)))

async function gradeSelects() {
  return page.evaluate(() =>
    [...document.querySelectorAll('select[id^="kelas-peserta-"], select[name^="kelas_peserta_"]')].map((s) => ({
      id: s.id,
      options: [...s.options].map((o) => o.textContent),
    }))
  )
}

async function errorTexts() {
  return page.evaluate(() =>
    [...document.querySelectorAll('p')].map((p) => p.textContent?.trim()).filter((t) => t && t.includes('kelas'))
  )
}

console.log('===== TAHFIZH GRADE UI =====')
await page.goto('http://localhost:5174/pendaftaran/tahfizh', { waitUntil: 'networkidle' })
await page.evaluate(() => localStorage.clear())
await page.reload({ waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
console.log('awal (kosong):', JSON.stringify(await gradeSelects()))

await page.fill('input[placeholder="Nama Lengkap Putra"]', 'Ali bin Hasan')
await page.waitForTimeout(400)
console.log('setelah Pa:', JSON.stringify(await gradeSelects()))

await page.fill('input[placeholder="Nama Lengkap Putri"]', 'Fatimah az Zahra')
await page.waitForTimeout(400)
console.log('setelah Pa+Pi:', JSON.stringify(await gradeSelects()))

// Submit tanpa memilih kelas -> harus ada error validasi
await page.click('button[type="submit"]')
await page.waitForTimeout(800)
console.log('error setelah submit tanpa kelas:', JSON.stringify(await errorTexts()))

// Pilih kelas untuk Pa dan Pi
await page.selectOption('select[name="kelas_peserta_0"]', '2')
await page.selectOption('select[name="kelas_peserta_1"]', '4')
await page.waitForTimeout(300)
console.log('nilai terpilih:', JSON.stringify(await page.evaluate(() =>
  [...document.querySelectorAll('select[name^="kelas_peserta_"]')].map((s) => s.value)
)))

console.log('===== OLIMPIADE GRADE UI =====')
await page.goto('http://localhost:5174/pendaftaran/olimpiade', { waitUntil: 'networkidle' })
await page.evaluate(() => localStorage.clear())
await page.reload({ waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
await page.fill('input[placeholder="Nama Peserta ke-1"]', 'Budi')
await page.click('button:has-text("Tambah Nama Peserta")')
await page.waitForTimeout(300)
await page.fill('input[placeholder="Nama Peserta ke-2"]', 'Siti')
await page.waitForTimeout(400)
console.log('olimpiade 2 nama:', JSON.stringify(await gradeSelects()))

await page.click('button[type="submit"]')
await page.waitForTimeout(800)
console.log('error setelah submit tanpa kelas:', JSON.stringify(await errorTexts()))

await page.selectOption('select[name="kelas_peserta_0"]', '3')
await page.selectOption('select[name="kelas_peserta_1"]', '5')
await page.waitForTimeout(300)
console.log('nilai terpilih:', JSON.stringify(await page.evaluate(() =>
  [...document.querySelectorAll('select[name^="kelas_peserta_"]')].map((s) => s.value)
)))

console.log('===== KOLASE (tidak ada kelas) =====')
await page.goto('http://localhost:5174/pendaftaran/kolase', { waitUntil: 'networkidle' })
await page.evaluate(() => localStorage.clear())
await page.reload({ waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
await page.fill('input[placeholder="Nama Peserta ke-1"]', 'Anak TK')
await page.waitForTimeout(400)
console.log('kolase grade selects (harus kosong):', JSON.stringify(await gradeSelects()))

console.log('pageerrors:', JSON.stringify(errors))
await browser.close()
