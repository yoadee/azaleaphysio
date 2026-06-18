import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/PageHeader'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'
import JsonLd from '@/components/JsonLd'
import { conditions, conditionBySlug, serviceBySlug } from '@/lib/clinic'
import { faqPageSchema } from '@/lib/schema'

export function generateStaticParams() {
  return conditions.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const c = conditionBySlug(slug)
  if (!c) return {}
  return {
    title: `${c.name} Treatment in West Vancouver`,
    description: c.intro,
    alternates: { canonical: `/conditions/${c.slug}` },
  }
}

const insuranceCallouts = {
  icbc: {
    href: '/icbc',
    eyebrow: 'Injured in a crash?',
    heading: 'ICBC covers your treatment',
    body: 'After a car accident, ICBC pre-approves 25 physiotherapy visits in your first 12 weeks, with no referral needed. Bring your claim number and we bill ICBC directly.',
    cta: 'See how ICBC physiotherapy works',
  },
  worksafebc: {
    href: '/worksafebc',
    eyebrow: 'Hurt at work?',
    heading: 'WorkSafeBC covers your treatment',
    body: 'We are a WorkSafeBC provider. Once your claim is active we bill them directly and manage the reporting for a safe return to work.',
    cta: 'See how WorkSafeBC physiotherapy works',
  },
} as const

export default async function ConditionDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = conditionBySlug(slug)
  if (!c) notFound()

  const services = c.relatedServices
    .map(serviceBySlug)
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
  const callout = c.insuranceCallout ? insuranceCallouts[c.insuranceCallout] : null

  return (
    <>
      <RevealObserver />
      {c.faqs && c.faqs.length > 0 && <JsonLd data={faqPageSchema(c.faqs)} />}
      <PageHeader
        trail={[{ label: 'Conditions', href: '/conditions' }, { label: c.name }]}
        eyebrow="Condition"
        title={`${c.name} in West Vancouver`}
        lead={c.intro}
        cta
      />

      {/* How we treat it — answer-first approach + recovery */}
      {(c.approach || c.recovery) && (
        <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20">
            {c.approach && (
              <div className="reveal">
                <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-text mb-7">
                  How we treat {c.name.toLowerCase()}
                </h2>
                <p className="font-sans text-[18px] text-text leading-[1.75] max-w-[60ch]">{c.approach}</p>
              </div>
            )}
            {c.recovery && (
              <aside className="md:sticky md:top-28 md:self-start reveal">
                <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-4">
                  How long recovery takes
                </p>
                <p className="font-sans text-[16px] text-text leading-[1.7]" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
                  {c.recovery}
                </p>
              </aside>
            )}
          </div>
        </section>
      )}

      {/* Is this you — symptoms checklist */}
      {c.symptoms && c.symptoms.length > 0 && (
        <section className="bg-stone px-6 sm:px-10 md:px-14 py-20 md:py-24">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-text mb-12 md:mb-14 max-w-[640px] reveal">
              Is this you?
            </h2>
            <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-x-16">
              {c.symptoms.map((item, i) => (
                <li
                  key={i}
                  className="font-sans text-[17px] text-text leading-[1.6] py-6 reveal"
                  style={{ borderTop: '1px solid var(--color-border)' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Insurance callout band */}
      {callout && (
        <section className="bg-dark px-6 sm:px-10 md:px-14 py-16 md:py-20">
          <div className="max-w-[1100px] mx-auto reveal">
            <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-4">{callout.eyebrow}</p>
            <h2 className="font-display italic text-[clamp(1.6rem,3vw,2.25rem)] font-light leading-[1.1] tracking-[-0.02em] text-dark-text mb-5 max-w-[640px]">
              {callout.heading}
            </h2>
            <p className="font-sans text-[16px] text-dark-text/75 leading-[1.7] mb-7 max-w-[560px]">{callout.body}</p>
            <Link
              href={callout.href}
              className="font-sans text-[13px] font-semibold tracking-[0.06em] text-dark-text no-underline hover:text-gold transition-colors"
            >
              {callout.cta} →
            </Link>
          </div>
        </section>
      )}

      {/* Services we treat it with */}
      {services.length > 0 && (
        <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light tracking-[-0.02em] text-text mb-4 reveal">
              {c.approach ? 'The disciplines we use' : 'How we treat it'}
            </h2>
            <p className="font-sans text-[16px] text-muted mb-10 max-w-[620px] reveal">
              Often more than one discipline plays a part. These are the services we reach for most with {c.name.toLowerCase()}.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group no-underline p-7 reveal transition-colors hover:bg-stone"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <p className="font-display italic text-[21px] font-light text-text mb-2 group-hover:translate-x-1 transition-transform duration-300 ease-out">{s.name}</p>
                  <p className="font-sans text-[14px] text-muted leading-[1.6]">{s.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ — feeds FAQPage schema */}
      {c.faqs && c.faqs.length > 0 && (
        <section className="bg-stone px-6 sm:px-10 md:px-14 py-20 md:py-24">
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-20">
            <div className="md:sticky md:top-28 md:self-start reveal">
              <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-text mb-5">
                Common questions
              </h2>
              <p className="font-sans text-[15px] text-muted leading-[1.7] max-w-[260px]">
                What patients ask most about {c.name.toLowerCase()}.
              </p>
            </div>
            <dl style={{ borderTop: '1px solid var(--color-border)' }}>
              {c.faqs.map((f, i) => (
                <div key={i} className="py-7 reveal" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <dt className="font-display text-[20px] font-normal text-text leading-[1.3] mb-3 max-w-[44ch]">{f.q}</dt>
                  <dd className="font-sans text-[16px] text-muted leading-[1.7] max-w-[62ch]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <BookCta heading={`Book treatment for ${c.name.toLowerCase()}.`} />
    </>
  )
}
