import type { CSSProperties } from 'react'

/**
 * Azalea brand lockup: the figure mark, the wordmark, and an optional
 * "Advanced Health Centre" subline centered between two rule lines (as on the
 * physical sign).
 *
 * The mark is the clinic's real logo, traced to a single-color silhouette
 * (public/logo-mark.svg) and rendered through a CSS mask so it takes its color
 * from `currentColor`: ink on light/stone surfaces, off-white on dark ones. Color,
 * font, size and tracking for the wordmark come from the parent via `className`;
 * the subline scales off the wordmark's font-size.
 *
 * Size the mark with `markSize` (px number) or, for responsive control,
 * `markClass` (Tailwind width/height utilities), which wins when provided.
 */
const MASK: CSSProperties = {
  WebkitMaskImage: 'url(/logo-mark.svg)',
  maskImage: 'url(/logo-mark.svg)',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
}

export default function Logo({
  className = '',
  wordmark = true,
  subline = false,
  markSize = 26,
  markClass,
  gapClass = 'gap-2.5',
}: {
  className?: string
  wordmark?: boolean
  subline?: boolean
  markSize?: number
  markClass?: string
  gapClass?: string
}) {
  const sizeStyle: CSSProperties = markClass ? {} : { width: markSize, height: markSize }
  return (
    <span className={`inline-flex items-center ${gapClass} ${className}`}>
      <span
        aria-hidden="true"
        className={`shrink-0 block ${markClass ?? ''}`}
        style={{ ...MASK, ...sizeStyle, backgroundColor: 'currentColor' }}
      />
      {wordmark && (
        <span className="inline-flex flex-col justify-center">
          <span className="leading-none">Azalea Physiotherapy</span>
          {subline && (
            <span className="flex items-center gap-3 mt-[0.6em]">
              <span className="h-px flex-1 bg-current opacity-25" />
              <span className="font-sans not-italic font-medium uppercase text-[0.46em] tracking-[0.28em] opacity-80 leading-none whitespace-nowrap">
                Advanced Health Centre
              </span>
              <span className="h-px flex-1 bg-current opacity-25" />
            </span>
          )}
        </span>
      )}
    </span>
  )
}
