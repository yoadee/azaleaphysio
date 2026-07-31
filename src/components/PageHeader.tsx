import Image from 'next/image'
import Breadcrumbs, { type Crumb } from './Breadcrumbs'
import { SITE, locations } from '@/lib/clinic'
import { getGoogleRating } from '@/lib/googleRating'

/**
 * Standard inner-page header on the stone panel: breadcrumbs, an optional
 * eyebrow, the H1 in Spectral italic, an optional lead paragraph, and an optional
 * booking CTA. Conversion pages (service detail, etc.) pass `cta` so a visitor
 * arriving from an ad sees a Book action without scrolling.
 *
 * With `image`, the header becomes a split composition — text on stone left,
 * photograph right — echoing the home hero so photo-led pages share the same
 * visual grammar instead of dropping a banner below the header.
 */
export default async function PageHeader({
  title,
  lead,
  eyebrow,
  trail,
  cta = false,
  image,
}: {
  title: string
  lead?: string
  eyebrow?: string
  trail: Crumb[]
  cta?: boolean
  image?: { src: string; alt: string }
}) {
  const { rating, reviewCount } = cta ? await getGoogleRating() : { rating: SITE.googleRating, reviewCount: SITE.reviewCount }

  const textContent = (
    <>
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
            {rating} from {reviewCount} Google reviews
          </p>
        </div>
      )}
    </>
  )

  if (!image) {
    return (
      <header className="bg-stone px-6 sm:px-10 md:px-14 pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1200px] mx-auto">{textContent}</div>
      </header>
    )
  }

  return (
    <header className="bg-stone px-6 sm:px-10 md:px-14 pt-36 pb-0 md:pt-40">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1.15fr_1fr] md:gap-14 items-stretch">
        <div className="pb-12 md:pb-20">{textContent}</div>
        {/* Photo column: fills the text column's height on desktop (home-hero
            grammar), sits as a bottom-bleed 16:9 below the text on mobile.
            No reveal class here — this is the LCP image. */}
        <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[380px] -mx-6 sm:-mx-10 md:mx-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 45vw"
            priority
          />
        </div>
      </div>
    </header>
  )
}
