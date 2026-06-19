import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'
import Breadcrumbs from '@/components/Breadcrumbs'
import Portrait from '@/components/Portrait'
import JsonLd from '@/components/JsonLd'
import { team, practitionerBySlug, SITE } from '@/lib/clinic'
import { practitionerSchema } from '@/lib/schema'

export function generateStaticParams() {
  return team.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = practitionerBySlug(slug)
  if (!p) return {}
  return {
    title: `${p.name}, ${p.role}`,
    description: p.bio,
    alternates: { canonical: `/team/${p.slug}` },
  }
}

export default async function PractitionerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = practitionerBySlug(slug)
  if (!p) notFound()

  return (
    <>
      <RevealObserver />
      <JsonLd data={practitionerSchema(p)} />

      <section className="bg-stone px-6 sm:px-10 md:px-14 pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1100px] mx-auto">
          <Breadcrumbs trail={[{ label: 'Team', href: '/team' }, { label: p.name }]} />
          <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] gap-10 md:gap-16 mt-10 items-start">
            <div className="max-w-[320px] md:max-w-none mx-auto md:mx-0 w-full group">
              <Portrait p={p} sizes="(max-width: 768px) 320px, 380px" />
            </div>
            <div>
              <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-light italic leading-[1.05] tracking-[-0.02em] text-text mb-3">
                {p.name}
              </h1>
              <p className="font-sans text-[13px] uppercase tracking-[0.12em] text-muted mb-1">{p.role}</p>
              <p className="font-sans text-[14px] text-muted mb-3">{p.credentials}</p>
              {p.languages.includes('Farsi') && (
                <span className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.08em] uppercase text-text px-3 py-1.5 mb-8" style={{ border: '1px solid var(--color-border)' }}>
                  Treats in English & Farsi
                </span>
              )}
              <p className="font-sans text-[17px] text-text leading-[1.75] mb-6 mt-6 max-w-[560px]">{p.bio}</p>
              {p.registration && (
                <p className="font-sans text-[13px] text-muted leading-[1.6] mb-10 max-w-[480px] flex items-start gap-2">
                  <span className="text-gold mt-px" aria-hidden="true">✓</span>
                  {p.registration}
                </p>
              )}
              <a
                href={SITE.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-rose hover:bg-rose-dark text-white font-sans text-[12px] font-bold tracking-[0.1em] uppercase px-8 py-4 transition-colors duration-200 min-h-[48px] no-underline"
              >
                Book with {p.name.replace(/^Dr\.?\s+/, '').split(' ')[0]}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg px-6 sm:px-10 md:px-14 py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10">
          <div className="reveal">
            <h2 className="font-sans text-[11px] uppercase tracking-[0.16em] text-muted mb-5">Focus areas</h2>
            <ul className="list-none flex flex-col gap-3">
              {p.focus.map((f, i) => (
                <li key={i} className="font-display italic text-[20px] font-light text-text">{f}</li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <h2 className="font-sans text-[11px] uppercase tracking-[0.16em] text-muted mb-5">Languages</h2>
            <p className="font-display italic text-[20px] font-light text-text">{p.languages.join(', ')}</p>
          </div>
        </div>
      </section>

      <section className="bg-stone px-6 sm:px-10 md:px-14 py-14" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-[1100px] mx-auto flex items-center justify-between gap-6">
          <p className="font-display italic text-[18px] font-light text-text">See the rest of the team</p>
          <Link href="/team" className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-text hover:text-rose-dark no-underline transition-colors">
            All eight →
          </Link>
        </div>
      </section>

      <BookCta />
    </>
  )
}
