import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 860 } })
const errors = []
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text())
})
page.on('pageerror', (err) => errors.push(String(err)))

await page.goto('http://localhost:5174/__proof-test', { waitUntil: 'networkidle' })
await page.waitForTimeout(4000)

const result = await page.evaluate(() => {
  const dialog = document.querySelector('[role="dialog"]')
  const text = document.body.innerText
  return {
    hasDialog: !!dialog,
    hasTitle: text.includes('TEST-001'),
    hasSubtitle: text.includes('Budi Santoso'),
    hasLoadingText: text.includes('Memuat bukti pembayaran'),
    hasErrorText: text.includes('Gagal memuat bukti pembayaran') || text.includes('belum mengunggah'),
    dialogButtons: dialog
      ? [...dialog.querySelectorAll('a, button')].map((el) => el.textContent.trim()).filter(Boolean)
      : [],
  }
})

console.log(JSON.stringify({ result, errors }, null, 2))
await page.screenshot({ path: 'scratch/proof-modal-test.png' })
await browser.close()
