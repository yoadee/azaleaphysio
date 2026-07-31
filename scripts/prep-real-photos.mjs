// One-off: process the real clinic photos in /images into web-ready assets.
// Output goes to public/images/real/ — integration into pages happens separately.
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import path from 'node:path'

const SRC = path.resolve('images')
const OUT = path.resolve('public/images/real')
mkdirSync(OUT, { recursive: true })

// Each entry: source file, output name, crop aspect + size, and where it's destined.
// Service pages render 16:9 at up to 1100px wide -> 1760x990 gives retina headroom.
const jobs = [
  // Ankle taping — sports injury page. Action is centered; attention crop.
  { src: 'AZALEA MASTERS-0143.jpg', out: 'sports-injury.jpg', w: 1760, h: 990 },
  // Acupuncture needling closeup (landscape) — acupuncture page.
  { src: 'AZALEA MASTERS-0111.jpg', out: 'acupuncture.jpg', w: 1760, h: 990 },
  // Recumbent bike session — kinesiology page.
  { src: 'AZALEA MASTERS-0001.jpg', out: 'kinesiology.jpg', w: 1760, h: 990 },
  // Gait training with elderly patient — elderly-care page (already near 16:9).
  { src: 'AZALEA MASTERS-0129.jpg', out: 'elderly-care.jpg', w: 1760, h: 990 },
  // Reception with logo wall — about page (rendered as webp there today).
  { src: 'AZALEA MASTERS-0151.jpg', out: 'about-reception.webp', w: 1760, h: 990, webp: true },
  // Ankle-weight exercise closeup (portrait) — spare, could suit occupational/physio contexts.
  { src: 'AZALEA MASTERS-0045.jpg', out: 'ankle-weights-portrait.jpg', w: 990, h: 1400 },
  // Acupuncture portrait variant — spare for tall layouts.
  { src: 'AZALEA MASTERS-0123.jpg', out: 'acupuncture-portrait.jpg', w: 990, h: 1400 },
]

for (const j of jobs) {
  const input = path.join(SRC, j.src)
  const output = path.join(OUT, j.out)
  let p = sharp(input)
    .rotate() // respect EXIF
    .resize(j.w, j.h, { fit: 'cover', position: sharp.strategy.attention })
    // Nudge toward the site's warm palette: tiny saturation lift + warmth.
    .modulate({ saturation: 1.04, brightness: 1.02 })
  p = j.webp ? p.webp({ quality: 82 }) : p.jpeg({ quality: 82, progressive: true, mozjpeg: true })
  const info = await p.toFile(output)
  console.log(`${j.out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`)
}
console.log('done')
