import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' })
await page.waitForSelector('#kompetisi-resmi', { timeout: 15000 })
// pastikan reveal animation selesai
await page.evaluate(() => document.querySelector('#kompetisi-resmi').scrollIntoView())
await page.waitForTimeout(1500)

const gaps = await page.evaluate(() => {
  const cards = [...document.querySelectorAll('#kompetisi-resmi .grid > div')]
  return cards.map((card) => {
    const details = card.querySelector('.space-y-1\\.5')
    const button = card.querySelector('a')
    const cardBox = card.getBoundingClientRect()
    const dBox = details.getBoundingClientRect()
    const bBox = button.getBoundingClientRect()
    return {
      title: card.querySelector('h3')?.textContent.trim(),
      gapKontribusiKeButton: +(bBox.top - dBox.bottom).toFixed(1),
      cardHeight: +cardBox.height.toFixed(1),
    }
  })
})
console.log(JSON.stringify(gaps, null, 2))

await page.screenshot({ path: 'scratch/kompetisi-gap-after.png', clip: await page.evaluate(() => {
  const r = document.querySelector('#kompetisi-resmi .grid').getBoundingClientRect()
  return { x: r.x - 10, y: r.y - 10, width: r.width + 20, height: r.height + 20 }
}) })

await browser.close()
