import { ImageResponse } from 'next/og'

// Site-wide social share card: clean dark typographic panel. No logo art —
// wordmark, tagline, and URL only.
export const alt = 'Azalea Physiotherapy — Multidisciplinary physiotherapy in West Vancouver'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const DARK = '#0F2230'
const STONE = '#E9EEF3'
const GOLD = '#D4AF37'
const MUTED = '#9FB0BC'

async function loadGoogleFont(weight: number, italic: boolean) {
  const ital = italic ? '1' : '0'
  const api = `https://fonts.googleapis.com/css2?family=Spectral:ital,wght@${ital},${weight}`
  const css = await (await fetch(api, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:1.0)' } })).text()
  const url = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"]?truetype['"]?\)/)?.[1]
  if (!url) throw new Error('font url not found')
  return await (await fetch(url)).arrayBuffer()
}

const title = (fs: number) => ({
  display: 'flex',
  fontFamily: 'Spectral',
  fontStyle: 'italic',
  fontWeight: 600,
  fontSize: fs,
  color: STONE,
  lineHeight: 1.02,
  letterSpacing: '-0.02em',
})

export default async function OgImage() {
  const [titleFont, bodyFont] = await Promise.all([loadGoogleFont(600, true), loadGoogleFont(400, false)])

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: DARK, padding: '0 96px' }}>
        <div style={{ display: 'flex', width: 72, height: 5, background: GOLD, marginBottom: 40 }} />
        <div style={title(98)}>Azalea</div>
        <div style={title(98)}>Physiotherapy</div>
        <div style={{ display: 'flex', fontFamily: 'Spectral', fontWeight: 400, fontSize: 35, color: MUTED, marginTop: 28, maxWidth: 760 }}>
          Multidisciplinary physiotherapy in West Vancouver. The cause, not just the symptom.
        </div>
        <div style={{ display: 'flex', fontFamily: 'Spectral', fontWeight: 400, fontSize: 28, color: GOLD, marginTop: 40, letterSpacing: '0.04em' }}>
          azaleaphysio.com
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
