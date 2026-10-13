import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
page.on('pageerror', (err) => console.log('PAGEERROR:', String(err)))

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
    const labelEl = totalBox?.querySelector('.text-xs')
    const inputCount = document.querySelectorAll('input[placeholder^="Nama Peserta ke-"]').length
    return {
      jumlahPeserta: getRow('Jumlah Peserta'),
      totalBiaya: amountEl ? amountEl.textContent.trim() : null,
      totalLabel: labelEl ? labelEl.textContent.trim() : null,
      jumlahInputNama: inputCount,
    }
  })
}

async function testTahfizh() {
  console.log('===== TAHFIZH =====')
  await page.goto('http://localhost:5174/pendaftaran/tahfizh', { waitUntil: 'networkidle' })
  await page.evaluate(() => localStorage.clear())
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  console.log('awal:', JSON.stringify(await readSummary()))
  await page.fill('input[placeholder="Nama Lengkap Putra"]', 'Ali bin Hasan')
  await page.waitForTimeout(400)
  console.log('setelah Pa:', JSON.stringify(await readSummary()))
  await page.fill('input[placeholder="Nama Lengkap Putri"]', 'Fatimah az Zahra')
  await page.waitForTimeout(400)
  console.log('setelah Pa+Pi:', JSON.stringify(await readSummary()))
}

async function testPanahan() {
  console.log('===== PANAHAN =====')
  await page.goto('http://localhost:5174/pendaftaran/panahan', { waitUntil: 'networkidle' })
  await page.evaluate(() => localStorage.clear())
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  console.log('awal:', JSON.stringify(await readSummary()))
  await page.fill('input[placeholder="Nama Peserta ke-1"]', 'Peserta Satu')
  await page.click('button:has-text("Tambah Nama Peserta")')
  await page.waitForTimeout(300)
  await page.fill('input[placeholder="Nama Peserta ke-2"]', 'Peserta Dua')
  await page.click('button:has-text("Tambah Nama Peserta")')
  await page.waitForTimeout(300)
  await page.fill('input[placeholder="Nama Peserta ke-3"]', 'Peserta Tiga')
  await page.waitForTimeout(400)
  console.log('setelah 3 nama:', JSON.stringify(await readSummary()))
}

async function testKolase() {
  console.log('===== KOLASE =====')
  await page.goto('http://localhost:5174/pendaftaran/kolase', { waitUntil: 'networkidle' })
  await page.evaluate(() => localStorage.clear())
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  console.log('awal:', JSON.stringify(await readSummary()))
  await page.fill('input[placeholder="Nama Peserta ke-1"]', 'Anak Satu')
  await page.waitForTimeout(400)
  console.log('setelah 1 nama:', JSON.stringify(await readSummary()))
  await page.click('button:has-text("Tambah Nama Peserta")')
  await page.waitForTimeout(300)
  await page.fill('input[placeholder="Nama Peserta ke-2"]', 'Anak Dua')
  await page.waitForTimeout(400)
  console.log('setelah 2 nama:', JSON.stringify(await readSummary()))
  await page.click('button:has-text("Tambah Nama Peserta")')
  await page.waitForTimeout(300)
  await page.fill('input[placeholder="Nama Peserta ke-3"]', 'Anak Tiga')
  await page.waitForTimeout(400)
  console.log('setelah 3 nama:', JSON.stringify(await readSummary()))
  await page.screenshot({ path: 'scratch/kolase-fee-after-fix.png' })
}

async function testOlimpiadeDenganDraf() {
  console.log('===== OLIMPIADE (DRAF DIPULIHKAN) =====')
  // Simulasikan draf lama yang menyimpan nama tapi jumlah baris aneh
  await page.goto('http://localhost:5174/pendaftaran/olimpiade', { waitUntil: 'networkidle' })
  await page.evaluate(() => {
    localStorage.setItem(
      'attin:registration-draft-v2:olimpiade',
      JSON.stringify({ gender: 'Laki-laki', nama_lengkap: 'Draf Satu\nDraf Dua', nama_sekolah: 'SD Contoh' })
    )
  })
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  console.log('draf dipulihkan:', JSON.stringify(await readSummary()))
  // Tambah peserta baru pada draf
  await page.click('button:has-text("Tambah Nama Peserta")')
  await page.waitForTimeout(300)
  await page.fill('input[placeholder="Nama Peserta ke-3"]', 'Draf Tiga')
  await page.waitForTimeout(400)
  console.log('setelah tambah:', JSON.stringify(await readSummary()))
}

await testTahfizh()
await testPanahan()
await testKolase()
await testOlimpiadeDenganDraf()

await browser.close()
