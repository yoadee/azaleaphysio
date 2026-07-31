// One-off: place all final images (real photos + Higgsfield generations) into
// their production paths. v2: generated set is nano_banana_2/pro (nb-*.png) after
// Abtin rejected the soul_2 quality. Keeps existing file paths, minimal code churn.
import sharp from 'sharp'
import { mkdirSync, copyFileSync } from 'node:fs'

mkdirSync('public/images/generated/services', { recursive: true })

const SVC = { w: 1760, h: 990 } // service pages render 16:9 at up to 1100px

// Subtle warm grade so the neutral-cool AI renders sit comfortably on the site's
// warm-stone palette: +3% red, -3% blue, saturation eased to 0.97. Applied to
// generated images only; the real clinic photos are already warm-toned.
const warm = (p) =>
  p
    .recomb([
      [1.03, 0, 0],
      [0, 1.0, 0],
      [0, 0, 0.97],
    ])
    .modulate({ saturation: 0.97 })

async function toServiceJpg(src, out) {
  const info = await warm(
    sharp(src).resize(SVC.w, SVC.h, { fit: 'cover', position: sharp.strategy.attention })
  )
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(out)
  console.log(`${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`)
}

async function toPortraitJpg(src, out, width = 1400) {
  const info = await warm(sharp(src).resize({ width }))
    .jpeg({ quality: 84, progressive: true, mozjpeg: true })
    .toFile(out)
  console.log(`${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`)
}

// ── Heroes (2:3) ─────────────────────────────────────────
await toPortraitJpg('scripts/gen/nb-hero1.png', 'public/images/generated/clinic-hero.jpg') // knee manual therapy
await toPortraitJpg('scripts/gen/nb-hero2-clean.png', 'public/images/generated/hero-option-1.jpg') // band exercise
await toPortraitJpg('scripts/gen/nb-gym23.png', 'public/images/generated/hero-option-2.jpg') // sunlit empty gym w/ mountains

// ── Home about section (16:9 wide gym) + about page ─────
await toServiceJpg('scripts/gen/nb-gym169.png', 'public/images/generated/clinic-about.jpg')
copyFileSync('public/images/real/about-reception.webp', 'public/about-clinic.webp') // real reception photo
console.log('about-clinic.webp  <- real reception photo')

// ── Service images ───────────────────────────────────────
// Real photos (already 1760x990 jpg) — straight copies.
for (const s of ['sports-injury', 'acupuncture', 'kinesiology', 'elderly-care']) {
  copyFileSync(`public/images/real/${s}.jpg`, `public/images/generated/services/${s}.jpg`)
  console.log(`services/${s}.jpg  <- real photo`)
}
// Generated 16:9 shots -> production size.
await toServiceJpg('scripts/gen/nb-physio.png', 'public/images/generated/services/physiotherapy.jpg')
await toServiceJpg('scripts/gen/nb-massage.png', 'public/images/generated/services/massage-therapy.jpg')
await toServiceJpg('scripts/gen/nb-ot.png', 'public/images/generated/services/occupational-therapy.jpg')
await toServiceJpg('scripts/gen/nb-osteo.png', 'public/images/generated/services/osteopathy.jpg')
await toServiceJpg('scripts/gen/nb-chiro.png', 'public/images/generated/services/chiropractic.jpg')
await toServiceJpg('scripts/gen/nb-weightloss3.png', 'public/images/generated/services/weight-loss.jpg')
await toServiceJpg('scripts/gen/nb-yoga.png', 'public/images/generated/services/yoga-therapy.jpg')

console.log('done')
