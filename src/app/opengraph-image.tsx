import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// Site-wide social share card: azure brand panel with the logo mark, wordmark
// on the dark panel. Matches the site's square, high-contrast brand language.
export const alt = 'Azalea Physiotherapy — Multidisciplinary physiotherapy in West Vancouver'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const DARK = '#0F2230'
const STONE = '#E9EEF3'
const GOLD = '#D4AF37'
const AZURE = '#00AEFB'
const MUTED = '#9FB0BC'

// Logo mark as a recolourable data URI (the path has no own fill, so the
// wrapping <g fill> colours it).
const markInner = readFileSync(join(process.cwd(), 'public', 'logo-mark.svg'), 'utf8')
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
const mark = (color: string) =>
  'data:image/svg+xml;base64,' +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><g fill="${color}">${markInner}</g></svg>`,
  ).toString('base64')

async function loadGoogleFont(weight: number, italic: boolean) {
  const ital = italic ? '1' : '0'
  const api = `https://fonts.googleapis.com/css2?family=Spectral:ital,wght@${ital},${weight}`
  const css = await (await fetch(api, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:1.0)' } })).text()
  const url = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"]?truetype['"]?\)/)?.[1]
  if (!url) throw new Error('font url not found')
  return await (await fetch(url)).arrayBuffer()
}

export default async function OgImage() {
  const [titleFont, bodyFont] = await Promise.all([loadGoogleFont(600, true), loadGoogleFont(400, false)])

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: DARK }}>
        <div
          style={{
            width: 440,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: AZURE,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark('#FFFFFF')} width={300} height={300} alt="" />
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 70px',
          }}
        >
          <div style={{ display: 'flex', fontFamily: 'Spectral', fontStyle: 'italic', fontWeight: 600, fontSize: 78, color: STONE, lineHeight: 1.02, letterSpacing: '-0.02em' }}>
            Azalea
          </div>
          <div style={{ display: 'flex', fontFamily: 'Spectral', fontStyle: 'italic', fontWeight: 600, fontSize: 78, color: STONE, lineHeight: 1.02, letterSpacing: '-0.02em' }}>
            Physiotherapy
          </div>
          <div style={{ display: 'flex', fontFamily: 'Spectral', fontWeight: 400, fontSize: 30, color: MUTED, marginTop: 24, maxWidth: 460, lineHeight: 1.35 }}>
            The cause, not just the symptom. West Vancouver, since 2011.
          </div>
          <div style={{ display: 'flex', fontFamily: 'Spectral', fontWeight: 400, fontSize: 26, color: GOLD, marginTop: 36, letterSpacing: '0.04em' }}>
            azaleaphysio.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Spectral', data: titleFont, weight: 600, style: 'italic' },
        { name: 'Spectral', data: bodyFont, weight: 400, style: 'normal' },
      ],
    },
  )
}
