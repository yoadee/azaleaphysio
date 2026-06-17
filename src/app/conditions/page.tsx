import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'
import { conditions } from '@/lib/clinic'

export const metadata: Metadata = {
  title: 'Conditions We Treat',
  description:
    'Back pain, knee pain, shoulder injuries, ICBC car accident injuries, sports injuries and more, treated in West Vancouver with direct billing and no referral.',
  alternates: { canonical: '/conditions' },
}

export default function ConditionsPage() {
  return (
    <>
      <RevealObserver />
      <PageHeader
        trail={[{ label: 'Conditions' }]}
        title="Start with the pain, not the paperwork."
        lead="Tell us where it hurts. These are the problems we treat most, each handled by the right discipline under one roof."
      />

      <section className="bg-bg px-6 sm:px-10 md:px-14 py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-px" style={{ background: 'var(--color-border)' }}>
          {conditions.map((c) => (
            <Link
              key={c.slug}
              href={`/conditions/${c.slug}`}
              className="bg-bg hover:bg-stone p-7 no-underline group transition-colors flex flex-col gap-2.5 reveal"
            >
              <p className="font-display italic text-[21px] font-light text-text leading-[1.25] group-hover:translate-x-1 transition-transform duration-300 ease-out">
                {c.name}
              </p>
              <p className="font-sans text-[14px] text-muted leading-[1.6]">{c.short}</p>
            </Link>
          ))}
        </div>
      </section>

      <BookCta />
    </>
  )
}
