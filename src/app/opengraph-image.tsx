import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// Site-wide social share card: editorial layout with the real two-tone Azalea
// mark bleeding off the right on a light field, Spectral wordmark on the left.
export const alt = 'Azalea Physiotherapy — Multidisciplinary physiotherapy in West Vancouver'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const DARK = '#0F2230'
const SLATE = '#4C5A65'
const GOLD = '#D4AF37'
const AZURE = '#00AEFB'

const markColor =
  'data:image/png;base64,' +
  readFileSync(join(process.cwd(), 'public', 'logo-mark-color.png')).toString('base64')

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
  color: DARK,
  lineHeight: 1.0,
  letterSpacing: '-0.02em',
})

export default async function OgImage() {
  const [titleFont, bodyFont] = await Promise.all([loadGoogleFont(600, true), loadGoogleFont(400, false)])

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markColor} height={760} alt="" style={{ position: 'absolute', right: -120, top: -70 }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 84px' }}>
          <div style={{ display: 'flex', width: 72, height: 5, background: GOLD, marginBottom: 36 }} />
          <div style={title(98)}>Azalea</div>
          <div style={title(98)}>Physiotherapy</div>
          <div style={{ display: 'flex', fontFamily: 'Spectral', fontWeight: 400, fontSize: 33, color: SLATE, marginTop: 26, maxWidth: 560 }}>
            The cause, not just the symptom.
          </div>
        </div>
        <div style={{ display: 'flex', position: 'absolute', bottom: 60, left: 84, fontFamily: 'Spectral', fontWeight: 400, fontSize: 27, color: AZURE, letterSpacing: '0.04em' }}>
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
