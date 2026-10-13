import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (err) => errors.push(String(err)))

// Bersihkan draf tersimpan agar pengujian mulai dari keadaan kosong
await page.goto('http://localhost:5174/pendaftaran/olimpiade', { waitUntil: 'domcontentloaded' })
await page.evaluate(() => localStorage.removeItem('attin:registration-draft-v2:olimpiade'))
await page.reload({ waitUntil: 'networkidle' })
await page.waitForTimeout(2000)

async function readSummary() {
  return page.evaluate(() => {
    const rows = [...document.querySelectorAll('aside .flex.flex-col')]
    const getRow = (label) => {
      const row = rows.find((r) => r.textContent.includes(label))
      return row ? row.textContent.trim() : null
    }
    const totalBox = [...document.querySelectorAll('aside div')].find(
      (d) => d.querySelector('span')?.textContent === 'Total Biaya'
    )
    const amountEl = totalBox?.parentElement?.querySelector('.text-2xl')
    const inputCount = document.querySelectorAll('input[placeholder^="Nama Peserta ke-"]').length
    return {
      jumlahPeserta: getRow('Jumlah Peserta'),
      totalBiaya: amountEl ? amountEl.textContent.trim() : null,
      jumlahInputNama: inputCount,
    }
  })
}

console.log('--- KONDISI AWAL ---')
console.log(JSON.stringify(await readSummary(), null, 2))

// Ketik 1 nama
const input1 = page.locator('input[placeholder="Nama Peserta ke-1"]')
await input1.click()
await input1.type('Budi Santoso', { delay: 15 })
await page.waitForTimeout(500)
console.log('--- SETELAH 1 NAMA ---')
console.log(JSON.stringify(await readSummary(), null, 2))

// Tambah peserta ke-2
await page.click('button:has-text("Tambah Nama Peserta")')
await page.waitForTimeout(400)
const input2 = page.locator('input[placeholder="Nama Peserta ke-2"]')
await input2.click()
await input2.type('Siti Aminah', { delay: 15 })
await page.waitForTimeout(500)
console.log('--- SETELAH 2 NAMA ---')
console.log(JSON.stringify(await readSummary(), null, 2))

// Tambah peserta ke-3
await page.click('button:has-text("Tambah Nama Peserta")')
await page.waitForTimeout(400)
const input3 = page.locator('input[placeholder="Nama Peserta ke-3"]')
await input3.click()
await input3.type('Ahmad Fauzi', { delay: 15 })
await page.waitForTimeout(500)
console.log('--- SETELAH 3 NAMA ---')
console.log(JSON.stringify(await readSummary(), null, 2))

console.log('errors:', JSON.stringify(errors))
await page.screenshot({ path: 'scratch/fee-summary-test.png', fullPage: false })
await browser.close()
