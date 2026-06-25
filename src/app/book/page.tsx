import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import RevealObserver from '@/components/RevealObserver'
import { SITE, locations } from '@/lib/clinic'

export const metadata: Metadata = {
  title: 'Book a Physiotherapy Appointment',
  description:
    'Book physiotherapy at Azalea in West Vancouver online or by phone. No referral needed, direct billing, and most new patients seen within the same week.',
  alternates: { canonical: '/book' },
}

export default function BookPage() {
  return (
    <>
      <RevealObserver />
      <PageHeader
        trail={[{ label: 'Book' }]}
        title="Book an appointment."
        lead="No referral needed, direct billing to most insurers, and usually an appointment within the week. Book online in a minute, or call the clinic closest to you."
      />

      {/* Primary: online booking */}
      <section className="bg-bg px-6 sm:px-10 md:px-14 py-16 md:py-20">
        <div className="max-w-[760px] mx-auto reveal">
          <div className="bg-stone p-8 sm:p-12 flex flex-col items-start">
            <h2 className="font-display italic text-[clamp(1.75rem,3.5vw,2.5rem)] font-light text-text mb-4">
              Book online
            </h2>
            <p className="font-sans text-[16px] text-muted leading-[1.7] mb-6 max-w-[520px]">
              Choose your clinic, practitioner, and time in our secure booking portal. New and returning patients welcome. It takes about two minutes.
            </p>
            <p className="font-sans text-[14px] text-text leading-[1.7] mb-8 max-w-[520px]">
              Have your insurance details handy if you would like us to set up direct billing, and your ICBC or WorkSafeBC claim number if you have one. No referral needed either way.
            </p>
            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-rose hover:bg-rose-dark text-white font-sans text-[12px] font-bold tracking-[0.12em] uppercase px-10 py-5 transition-colors duration-200 min-h-[52px] no-underline"
            >
              Open the booking portal
            </a>
          </div>
        </div>
      </section>

      {/* Alternative: by phone, per clinic */}
      <section className="bg-stone px-6 sm:px-10 md:px-14 py-16 md:py-24" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-display italic text-[clamp(1.6rem,3vw,2rem)] font-light text-text mb-10 reveal">
            Or call us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((loc) => (
              <div key={loc.slug} className="bg-bg p-8 sm:p-10 reveal flex flex-col" style={{ border: '1px solid var(--color-border)' }}>
                <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-muted mb-3">{loc.area}</p>
                <h3 className="font-display italic text-[clamp(1.5rem,3vw,1.85rem)] font-light text-text mb-5">{loc.name}</h3>
                <a
                  href={`tel:${loc.tel}`}
                  className="font-display text-[clamp(1.6rem,4vw,2.25rem)] font-light text-text hover:text-rose-dark transition-colors no-underline mb-6"
                >
                  {loc.telLabel}
                </a>
                <div className="font-sans text-[14px] text-muted leading-[1.8] mt-auto">
                  <p>{loc.street}</p>
                  <p>{loc.city} {loc.postal}</p>
                  {loc.hours.map((h) => (
                    <p key={h.days}>{h.days} {h.time}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="font-sans text-[14px] text-muted leading-[1.7] max-w-[620px] mt-10 reveal">
            Prefer email? Reach us at{' '}
            <a href={`mailto:${SITE.email}`} className="text-text font-medium no-underline hover:text-rose-dark transition-colors">{SITE.email}</a>
            {' '}and we will get you booked.
          </p>
        </div>
      </section>
    </>
  )
}
