// One-off: clean logo/images.jpg into a high-contrast B&W mask for tracing.
// The mark is two-tone (dark blue + light gold). A luminance threshold loses the
// gold (too close to the white bg), so instead mark every pixel that is FAR FROM
// WHITE as ink. That catches blue and gold equally and drops the near-white bg.
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'logo', 'images.jpg')
const out = join(root, 'logo', 'work')

const { data, info } = await sharp(src)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })
const { width, height, channels } = info
console.log('source:', width, 'x', height, 'ch', channels)

for (const T of [90, 130, 170]) {
  const mask = Buffer.alloc(width * height) // 1 channel, 0=black ink, 255=white bg
  for (let i = 0, p = 0; i < data.length; i += channels, p++) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const distFromWhite = 255 - r + (255 - g) + (255 - b)
    mask[p] = distFromWhite > T ? 0 : 255
  }
  await sharp(mask, { raw: { width, height, channels: 1 } })
    .median(2) // despeckle
    .png()
    .toFile(join(out, `mask-${T}.png`))
  console.log('wrote', `mask-${T}.png`)
}
