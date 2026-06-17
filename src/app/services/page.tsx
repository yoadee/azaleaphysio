import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'
import { services } from '@/lib/clinic'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Ten disciplines under one roof in West Vancouver: physiotherapy, sports injury, acupuncture, kinesiology, osteopathy, chiropractic and more. No referral needed.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <RevealObserver />
      <PageHeader
        trail={[{ label: 'Services' }]}
        title="Ten disciplines. One address."
        lead="Most clinics send you elsewhere the moment your case crosses a line. We do not. Your treatment plan moves between disciplines without a fresh referral or a new waiting list."
      />

      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto" style={{ borderTop: '1px solid var(--color-border)' }}>
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group block no-underline py-8 md:py-9 reveal"
              style={{ borderBottom: '1px solid var(--color-border)' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-3 md:gap-12 items-baseline">
                <h2 className="font-display italic text-[clamp(1.6rem,3vw,2.25rem)] font-light text-text transition-transform duration-300 ease-out group-hover:translate-x-2">
                  {s.name}
                </h2>
                <div className="flex items-start justify-between gap-6">
                  <p className="font-sans text-[15px] text-muted leading-[1.7] max-w-[520px]">{s.excerpt}</p>
                  <span
                    className="font-sans text-[18px] text-muted shrink-0 opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 hidden md:inline"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <BookCta />
    </>
  )
}
