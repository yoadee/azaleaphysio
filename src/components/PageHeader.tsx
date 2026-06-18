import Breadcrumbs, { type Crumb } from './Breadcrumbs'
import { SITE, locations } from '@/lib/clinic'

/**
 * Standard inner-page header on the stone panel: breadcrumbs, an optional
 * eyebrow, the H1 in Spectral italic, an optional lead paragraph, and an optional
 * booking CTA. Conversion pages (service detail, etc.) pass `cta` so a visitor
 * arriving from an ad sees a Book action without scrolling.
 */
export default function PageHeader({
  title,
  lead,
  eyebrow,
  trail,
  cta = false,
}: {
  title: string
  lead?: string
  eyebrow?: string
  trail: Crumb[]
  cta?: boolean
}) {
  return (
    <header className="bg-stone px-6 sm:px-10 md:px-14 pt-36 pb-16 md:pt-40 md:pb-20">
      <div className="max-w-[1200px] mx-auto">
        <Breadcrumbs trail={trail} />
        {eyebrow && (
          <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-muted mt-8 mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-light italic leading-[1.05] tracking-[-0.02em] text-text mt-7 max-w-[840px]">
          {title}
        </h1>
        {lead && (
          <p className="font-sans text-[17px] text-muted leading-[1.65] mt-7 max-w-[620px]">
            {lead}
          </p>
        )}
        {cta && (
          <div className="mt-9">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <a
                href={SITE.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-rose hover:bg-rose-dark text-white font-sans text-[12px] font-bold tracking-[0.1em] uppercase px-8 py-4 transition-colors duration-200 min-h-[48px] no-underline"
              >
                Book online
              </a>
              <a
                href={`tel:${locations[0].tel}`}
                className="inline-flex items-center font-sans text-[12px] font-semibold tracking-[0.08em] uppercase text-text hover:text-rose-dark px-2 py-4 transition-colors duration-200 min-h-[48px] no-underline"
              >
                or call {locations[0].telLabel}
              </a>
            </div>
            <p className="font-sans text-[13px] text-muted mt-4 flex items-center gap-2">
              <span className="text-gold" aria-hidden="true">★</span>
              {SITE.googleRating} from {SITE.reviewCount} Google reviews
            </p>
          </div>
        )}
      </div>
    </header>
  )
}
