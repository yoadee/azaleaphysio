// Produce the final, slimmed logo mark as an external SVG used via CSS mask.
// Rounding coords to integers (800px viewBox) is lossless at display sizes and
// roughly halves the file. The fill is solid black so it works as an alpha mask;
// the rendered color comes from the masked element's background-color.
import sharp from 'sharp'
import potrace from 'potrace'
import { promisify } from 'node:util'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const work = join(root, 'logo', 'work')

const trace = promisify(potrace.trace)
const rawSvg = await trace(join(work, 'mask-170-up.png'), {
  threshold: 128, color: '#000000', background: 'transparent',
  turdSize: 50, optCurve: true, optTolerance: 1.0, turnPolicy: 'minority',
})
const wh = rawSvg.match(/width="(\d+)" height="(\d+)"/)
const [w, h] = wh ? [wh[1], wh[2]] : ['800', '800']
let d = (rawSvg.match(/<path[^>]*\sd="([^"]+)"/) || [, ''])[1]
// Round every number to an integer.
d = d.replace(/-?\d+\.\d+/g, (n) => Math.round(parseFloat(n)).toString())

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><path fill-rule="evenodd" d="${d}"/></svg>\n`
writeFileSync(join(root, 'public', 'logo-mark.svg'), svg)
console.log('public/logo-mark.svg  path:', d.length, 'chars  total:', svg.length, 'bytes')

// Final visual proof on dark + light, rendered through a currentColor wrapper.
const proof = (fg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="${fg}"><path fill-rule="evenodd" d="${d}"/></svg>`
await sharp(Buffer.from(proof('#EDE9E4'))).resize({ width: 320 }).flatten({ background: '#1C1917' }).png().toFile(join(work, 'final-dark.png'))
await sharp(Buffer.from(proof('#1C1917'))).resize({ width: 320 }).flatten({ background: '#EDEAE6' }).png().toFile(join(work, 'final-stone.png'))
console.log('wrote final proofs')
