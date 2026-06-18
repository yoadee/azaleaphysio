// Trace the cleaned B&W mask into a scalable single-color SVG.
// The mark ships in the nav + footer on every page, so optimise the path: find the
// highest optTolerance (fewest points) that still reads faithfully. Output uses
// currentColor so it inherits each section's ink color.
import sharp from 'sharp'
import potrace from 'potrace'
import { promisify } from 'node:util'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const work = join(root, 'logo', 'work')
const upscaled = join(work, 'mask-170-up.png')

await sharp(join(work, 'mask-170.png'))
  .resize({ width: 800, kernel: 'cubic' })
  .blur(0.7)
  .threshold(128)
  .toFile(upscaled)

const trace = promisify(potrace.trace)
const render = async (svg, bg, fg, name) => {
  const colored = svg.replace('fill="currentColor"', `fill="${fg}"`)
  await sharp(Buffer.from(colored)).resize({ width: 360 }).flatten({ background: bg }).png().toFile(join(work, name))
}

for (const tol of [0.4, 0.8, 1.4]) {
  const rawSvg = await trace(upscaled, {
    threshold: 128, color: '#000000', background: 'transparent',
    turdSize: 50, optCurve: true, optTolerance: tol, turnPolicy: 'minority',
  })
  const wh = rawSvg.match(/width="(\d+)" height="(\d+)"/)
  const [w, h] = wh ? [wh[1], wh[2]] : ['800', '800']
  const d = (rawSvg.match(/<path[^>]*\sd="([^"]+)"/) || [, ''])[1]
  const clean = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="currentColor" role="img" aria-hidden="true"><path fill-rule="evenodd" d="${d}"/></svg>\n`
  writeFileSync(join(work, `mark-${tol}.svg`), clean)
  await render(clean, '#1C1917', '#EDE9E4', `mark-${tol}-dark.png`)
  console.log(`tol ${tol}: path ${d.length} chars`)
}
