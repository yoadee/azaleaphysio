import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'
import { locations, SITE } from '@/lib/clinic'

export const metadata: Metadata = {
  title: 'Locations & Hours',
  description:
    'Two Azalea Physiotherapy clinics in West Vancouver: 16th Street and Ocean Walk on Marine Drive. Addresses, phone numbers, hours and directions.',
  alternates: { canonical: '/locations' },
}

export default function LocationsPage() {
  return (
    <>
      <RevealObserver />
      <PageHeader
        trail={[{ label: 'Locations' }]}
        title="Two West Vancouver locations."
        lead="Both clinics serve the whole North Shore and offer the same disciplines. Choose by what is closest, or by the practitioner you want to see."
      />

      <section className="bg-bg px-6 sm:px-10 md:px-14 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((loc) => (
            <div key={loc.slug} className="bg-stone p-8 sm:p-10 reveal flex flex-col">
              <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-muted mb-3">{loc.area}</p>
              <h2 className="font-display italic text-[clamp(1.6rem,3vw,2rem)] font-light text-text mb-6">{loc.name}</h2>
              <div className="font-sans text-[15px] text-muted leading-[1.85] mb-6">
                <p>{loc.street}</p>
                <p>{loc.city} {loc.postal}</p>
                <a href={`tel:${loc.tel}`} className="block hover:text-text no-underline transition-colors font-semibold text-text mt-2">
                  {loc.telLabel}
                </a>
              </div>
              <div className="font-sans text-[14px] text-text mb-8" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
                {loc.hours.map((h) => (
                  <div key={h.days} className="flex justify-between py-1 max-w-[280px]">
                    <span className="text-muted">{h.days}</span>
                    <span>{h.time}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <a
                  href={SITE.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-rose hover:bg-rose-dark text-white font-sans text-[11px] font-bold tracking-[0.1em] uppercase px-7 py-3.5 transition-colors duration-200 min-h-[44px] no-underline"
                >
                  Book online
                </a>
                <a
                  href={loc.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-sans text-[11px] font-semibold tracking-[0.1em] uppercase px-7 py-3.5 text-text hover:bg-bg transition-colors duration-200 min-h-[44px] no-underline"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  Get directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BookCta />
    </>
  )
}
