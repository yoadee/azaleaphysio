import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'
import Portrait from '@/components/Portrait'
import { team, formatLanguages } from '@/lib/clinic'

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the eight practitioners at Azalea Physiotherapy in West Vancouver. Physiotherapists, a chiropractor, kinesiologist, acupuncturist, massage therapist and counsellor. Several treat in Farsi.',
  alternates: { canonical: '/team' },
}

export default function TeamPage() {
  return (
    <>
      <RevealObserver />
      <PageHeader
        trail={[{ label: 'Team' }]}
        title="The people behind your recovery."
        lead="Eight practitioners, each with a specific focus, and several who treat in Farsi as well as English. This is who you will actually see."
      />

      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {team.map((p, i) => (
            <Link
              key={p.slug}
              href={`/team/${p.slug}`}
              className="group no-underline reveal"
              style={{ transitionDelay: `${Math.min(i, 4) * 60}ms` }}
            >
              <div className="mb-4">
                <Portrait p={p} />
              </div>
              <p className="font-display text-[18px] text-text mb-1">{p.name}</p>
              <p className="font-sans text-[11px] uppercase tracking-[0.1em] text-muted mb-2">{p.role}</p>
              <p className="font-sans text-[11px] text-muted">Treats in {formatLanguages(p.languages)}</p>
            </Link>
          ))}
        </div>
      </section>

      <BookCta heading="Book with the practitioner you want to see." />
    </>
  )
}
