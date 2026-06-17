import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import RevealObserver from '@/components/RevealObserver'
import { locations } from '@/lib/clinic'

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description:
    'Book physiotherapy at Azalea in West Vancouver. No referral needed, direct billing, and most new patients seen within the same week. Call either clinic.',
  alternates: { canonical: '/book' },
}

/*
 * BOOKING SYSTEM: not yet confirmed (Jane App assumed). Until it is wired up,
 * this page is a clear call path: both clinics by phone. When the system is
 * confirmed, embed or redirect here and update the tel CTAs across the site.
 */
export default function BookPage() {
  return (
    <>
      <RevealObserver />
      <PageHeader
        trail={[{ label: 'Book' }]}
        title="Book an appointment."
        lead="No referral needed, direct billing to most insurers, and usually an appointment within the week. Call the clinic closest to you and we will find you a time."
      />

      <section className="bg-bg px-6 sm:px-10 md:px-14 py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((loc) => (
            <div key={loc.slug} className="bg-stone p-8 sm:p-10 reveal flex flex-col">
              <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-muted mb-3">{loc.area}</p>
              <h2 className="font-display italic text-[clamp(1.6rem,3vw,2rem)] font-light text-text mb-5">{loc.name}</h2>
              <a
                href={`tel:${loc.tel}`}
                className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-light text-text hover:text-rose-dark transition-colors no-underline mb-6"
              >
                {loc.telLabel}
              </a>
              <div className="font-sans text-[14px] text-muted leading-[1.8] mb-8">
                <p>{loc.street}</p>
                <p>{loc.city} {loc.postal}</p>
                {loc.hours.map((h) => (
                  <p key={h.days}>{h.days} {h.time}</p>
                ))}
              </div>
              <a
                href={`tel:${loc.tel}`}
                className="inline-flex items-center justify-center bg-rose hover:bg-rose-dark text-white font-sans text-[11px] font-bold tracking-[0.1em] uppercase px-7 py-4 transition-colors duration-200 min-h-[48px] no-underline mt-auto self-start"
              >
                Call to book
              </a>
            </div>
          ))}
        </div>
        <div className="max-w-[1100px] mx-auto mt-12 reveal">
          <p className="font-sans text-[14px] text-muted leading-[1.7] max-w-[620px]">
            Prefer email? Reach us at{' '}
            <a href="mailto:info@azaleaphysio.com" className="text-text font-medium no-underline hover:text-rose-dark transition-colors">info@azaleaphysio.com</a>
            {' '}and we will get you booked. Online booking is coming soon.
          </p>
        </div>
      </section>
    </>
  )
}
