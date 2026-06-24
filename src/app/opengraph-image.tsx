import { ImageResponse } from 'next/og'

// Site-wide social share card. Dark brand panel + Spectral wordmark, matching
// the on-page dark CTA bands. Applies to OpenGraph and (via fallback) Twitter.
export const alt = 'Azalea Physiotherapy — Multidisciplinary physiotherapy in West Vancouver'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const DARK = '#0F2230'
const STONE = '#E9EEF3'
const GOLD = '#D4AF37'
const MUTED = '#9FB0BC'

// Pull a Satori-compatible (truetype) font file from Google Fonts. The old
// User-Agent makes Google serve TTF instead of WOFF2, which Satori cannot read.
async function loadGoogleFont(family: string, weight: number, italic: boolean) {
  const ital = italic ? '1' : '0'
  const api = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:ital,wght@${ital},${weight}`
  const css = await (await fetch(api, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:1.0)' } })).text()
  const url = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"]?truetype['"]?\)/)?.[1]
  if (!url) throw new Error('font url not found')
  return await (await fetch(url)).arrayBuffer()
}

export default async function OgImage() {
  const [titleFont, bodyFont] = await Promise.all([
    loadGoogleFont('Spectral', 600, true),
    loadGoogleFont('Spectral', 400, false),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: DARK,
          padding: '88px 96px',
        }}
      >
        <div style={{ width: 72, height: 5, background: GOLD, marginBottom: 44 }} />
        <div
          style={{
            fontFamily: 'Spectral',
            fontStyle: 'italic',
            fontWeight: 600,
            fontSize: 104,
            color: STONE,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          Azalea Physiotherapy
        </div>
        <div
          style={{
            fontFamily: 'Spectral',
            fontWeight: 400,
            fontSize: 38,
            color: MUTED,
            marginTop: 28,
            maxWidth: 880,
            lineHeight: 1.4,
          }}
        >
          Multidisciplinary physiotherapy in West Vancouver. The cause, not just the symptom.
        </div>
        <div
          style={{
            fontFamily: 'Spectral',
            fontWeight: 400,
            fontSize: 30,
            color: GOLD,
            marginTop: 'auto',
            letterSpacing: '0.04em',
          }}
        >
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
