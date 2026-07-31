// One-off: rebuild all logo assets from the true vector source (azalea_logo.ai,
// which is PDF-compatible). Renders with MuPDF (WASM), so no native tools needed.
import * as mupdf from 'mupdf'
import sharp from 'sharp'
import potrace from 'potrace'
import pngToIco from 'png-to-ico'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'

const outDir = path.resolve('public')
mkdirSync(path.resolve('public/images/brand'), { recursive: true })

// 1. Render the .ai (PDF) page at high resolution with alpha.
const doc = mupdf.Document.openDocument(readFileSync('images/azalea_logo.ai'), 'application/pdf')
const page = doc.loadPage(0)
const [x0, y0, x1, y1] = page.getBounds()
const pageW = x1 - x0, pageH = y1 - y0
console.log(`AI page bounds: ${pageW.toFixed(1)} x ${pageH.toFixed(1)} pt`)
const SCALE = 6000 / pageW // ~6000px wide master render
const pix = page.toPixmap(mupdf.Matrix.scale(SCALE, SCALE), mupdf.ColorSpace.DeviceRGB, true)
const masterPng = Buffer.from(pix.asPNG())
writeFileSync('public/images/brand/logo-full-master.png', masterPng)
const masterMeta = await sharp(masterPng).metadata()
console.log(`master render: ${masterMeta.width}x${masterMeta.height}`)

// 2. Trim transparent border -> tight full lockup.
const fullTrim = await sharp(masterPng).trim().png().toBuffer()
const fullMeta = await sharp(fullTrim).metadata()
console.log(`trimmed lockup: ${fullMeta.width}x${fullMeta.height}`)
await sharp(fullTrim).resize({ width: 2400 }).png().toFile('public/images/brand/logo-full.png')

// 3. Isolate the MARK (the figure above the text). In the lockup the mark sits
//    top-center; text starts lower. Crop the top ~66% then trim again.
const markStrip = await sharp(fullTrim)
  // Row-scan showed: mark ends at 68.2% height, text starts at 73.8%. Cut in the gap.
  .extract({ left: 0, top: 0, width: fullMeta.width, height: Math.round(fullMeta.height * 0.70) })
  .png()
  .toBuffer()
// Separate pipeline: sharp would otherwise run trim() BEFORE extract().
const markRegion = await sharp(markStrip).trim().png().toBuffer()
const markMeta = await sharp(markRegion).metadata()
console.log(`mark: ${markMeta.width}x${markMeta.height}`)

// 4. Replace the blurry logo-mark-color.png with a crisp render (1200px tall).
await sharp(markRegion).resize({ height: 1200 }).png().toFile(path.join(outDir, 'logo-mark-color.png'))

// 5. Re-trace a clean single-color silhouette SVG for the CSS mask (Logo.tsx).
//    Flatten onto white; both brand colors are far darker than white, so a
//    threshold binarization captures the exact silhouette.
const traceInput = await sharp(markRegion)
  .flatten({ background: '#ffffff' })
  .resize({ height: 2000 })
  .png()
  .toFile('scripts/_trace-input.png')
await new Promise((resolve, reject) => {
  potrace.trace('scripts/_trace-input.png', { threshold: 235, turdSize: 8, optTolerance: 0.3 }, (err, svg) => {
    if (err) return reject(err)
    writeFileSync(path.join(outDir, 'logo-mark.svg'), svg)
    console.log(`logo-mark.svg written (${(svg.length / 1024).toFixed(1)}KB)`)
    resolve()
  })
})

// 6. Favicon set from the crisp mark, centered on a square with padding.
async function squareIcon(size, pad = 0.12) {
  const inner = Math.round(size * (1 - pad * 2))
  const markBuf = await sharp(markRegion)
    .resize({ width: inner, height: inner, fit: 'inside' })
    .png()
    .toBuffer()
  const m = await sharp(markBuf).metadata()
  return sharp({
    create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: markBuf, left: Math.round((size - m.width) / 2), top: Math.round((size - m.height) / 2) }])
    .png()
    .toBuffer()
}
writeFileSync('src/app/icon.png', await squareIcon(512))
writeFileSync('src/app/apple-icon.png', await squareIcon(180, 0.16))
const ico = await pngToIco([await squareIcon(16, 0.06), await squareIcon(32, 0.08), await squareIcon(48, 0.08)])
writeFileSync('src/app/favicon.ico', ico)
console.log('icons written: icon.png 512, apple-icon.png 180, favicon.ico 16/32/48')
console.log('done')
