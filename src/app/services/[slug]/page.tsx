import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/PageHeader'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'
import Portrait from '@/components/Portrait'
import JsonLd from '@/components/JsonLd'
import {
  services,
  serviceBySlug,
  conditionBySlug,
  practitionerBySlug,
  team,
  testimonials,
  defaultGoodToKnow,
  locations,
} from '@/lib/clinic'
import { serviceSchema, faqPageSchema, howToSchema } from '@/lib/schema'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = serviceBySlug(slug)
  if (!s) return {}
  return {
    title: s.metaTitle ?? `${s.name} in West Vancouver`,
    description: `${s.excerpt} Direct billing and usually same-week. Book online or call.`,
    alternates: { canonical: `/services/${s.slug}` },
  }
}

// Pick practitioners whose role or focus relates to this service.
function relatedPractitioners(serviceName: string) {
  const key = serviceName.toLowerCase().split(' ')[0]
  const matched = team.filter(
    (p) =>
      p.role.toLowerCase().includes(key) ||
      p.focus.some((f) => f.toLowerCase().includes(key))
  )
  // No physio fallback: a service with no real match (e.g. one with no practitioner
  // of that discipline on the team yet) hides the section rather than mis-staffing it.
  return matched.slice(0, 3)
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = serviceBySlug(slug)
  if (!service) notFound()

  const related = service.relatedConditions
    .map(conditionBySlug)
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
  const people = service.practitioners?.length
    ? service.practitioners
        .map(practitionerBySlug)
        .filter((p): p is NonNullable<typeof p> => Boolean(p))
    : relatedPractitioners(service.name)
  const facts = service.goodToKnow ?? defaultGoodToKnow
  const quote = testimonials.find((t) => t.service === service.slug)
  // 4 conditions read cleaner as a 2x2 than a 3+1 orphan row; 3 or 6 stay 3-up.
  const condGridCols = related.length === 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <>
      <RevealObserver />
      <JsonLd data={serviceSchema(service)} />
      {service.firstVisit && (
        <JsonLd data={howToSchema(`Your first ${service.name.toLowerCase()} visit at Azalea`, service.firstVisit)} />
      )}
      {service.faqs && service.faqs.length > 0 && <JsonLd data={faqPageSchema(service.faqs)} />}

      <PageHeader
        trail={[{ label: 'Services', href: '/services' }, { label: service.name }]}
        eyebrow="Service"
        title={`${service.name} in West Vancouver`}
        lead={service.excerpt}
        cta
      />

      <div className="bg-bg px-6 sm:px-10 md:px-14 pt-10 md:pt-14">
        <div className="max-w-[1100px] mx-auto">
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-stone reveal">
            <Image
              src={`/images/generated/services/${service.slug}.jpg`}
              alt={`${service.name} at Azalea Physiotherapy in West Vancouver`}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1100px) 100vw, 1100px"
              priority
            />
          </div>
        </div>
      </div>

      {/* What we do + Good to know facts rail */}
      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20">
          <div className="reveal">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-text mb-7">
              What we do
            </h2>
            <p className="font-sans text-[18px] text-text leading-[1.75] max-w-[60ch]">{service.whatWeDo}</p>
            {service.approach && (
              <p className="font-sans text-[17px] text-muted leading-[1.75] max-w-[60ch] mt-6">{service.approach}</p>
            )}
          </div>

          <aside className="md:sticky md:top-28 md:self-start reveal">
            <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-6">
              Good to know
            </p>
            <dl style={{ borderTop: '1px solid var(--color-border)' }}>
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="py-4 flex flex-col gap-1"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <dt className="font-sans text-[12px] uppercase tracking-[0.1em] text-muted">{f.label}</dt>
                  <dd className="font-sans text-[15px] text-text leading-[1.5]">{f.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* Is this you? — checklist grid, distinct from the rail/sticky-heading sections */}
      <section className="bg-stone px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-text mb-12 md:mb-14 max-w-[640px] reveal">
            Is this you?
          </h2>
          <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-x-16">
            {service.whoThisHelps.map((item, i) => (
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

      {/* Your first visit — ordered sequence */}
      {service.firstVisit && service.firstVisit.length > 0 && (
        <section className="bg-dark px-6 sm:px-10 md:px-14 py-20 md:py-28">
          <div className="max-w-[1100px] mx-auto">
            <div className="max-w-[560px] mb-14 md:mb-20 reveal">
              <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-dark-text mb-6">
                Your first visit
              </h2>
              <p className="font-sans text-[16px] text-dark-text/75 leading-[1.7]">
                Most patients leave knowing exactly what is wrong, what is going to fix it, and roughly how long it
                should take.
              </p>
            </div>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {service.firstVisit.map((step, i) => (
                <li key={i} className="flex gap-6 reveal">
                  <span
                    className="font-display text-[22px] font-light text-gold leading-none pt-1 shrink-0 tabular-nums"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div style={{ borderTop: '1px solid rgba(237,233,228,0.14)' }} className="pt-4 grow">
                    <h3 className="font-display text-[20px] font-normal text-dark-text mb-2">{step.name}</h3>
                    <p className="font-sans text-[15px] text-dark-text/70 leading-[1.65] max-w-[42ch]">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Who you might see */}
      {people.length > 0 && (
        <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light tracking-[-0.02em] text-text mb-10 reveal">
              Who you might see
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-10">
              {people.map((p) => (
                <Link key={p.slug} href={`/team/${p.slug}`} className="no-underline group reveal">
                  <Portrait p={p} sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 340px" />
                  <div className="mt-4">
                    <p className="font-display text-[19px] text-text mb-1 group-hover:underline underline-offset-4 decoration-1 decoration-border">{p.name}</p>
                    <p className="font-sans text-[12px] uppercase tracking-[0.1em] text-muted mb-3">{p.role}</p>
                    {p.focus[0] && (
                      <p className="font-sans text-[14px] text-muted leading-[1.55]">{p.focus[0]}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Conditions we treat */}
      {related.length > 0 && (
        <section className="bg-stone px-6 sm:px-10 md:px-14 py-20 md:py-24">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light tracking-[-0.02em] text-text mb-10 reveal">
              Conditions we treat with this
            </h2>
            <div className={`grid grid-cols-1 ${condGridCols} gap-4`}>
              {related.map((c) => (
                <Link
                  key={c.slug}
                  href={`/conditions/${c.slug}`}
                  className="bg-bg border border-border hover:border-text/40 p-7 no-underline group transition-colors duration-300 flex flex-col gap-2 reveal"
                >
                  <p className="font-display italic text-[19px] font-light text-text transition-colors duration-300">{c.name}</p>
                  <p className="font-sans text-[14px] text-muted group-hover:text-text transition-colors duration-300 leading-[1.6]">{c.short}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ — per-service, feeds FAQPage schema */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-20">
            <div className="md:sticky md:top-28 md:self-start reveal">
              <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-text mb-5">
                Common questions
              </h2>
              <p className="font-sans text-[15px] text-muted leading-[1.7] mb-6 max-w-[260px]">
                What patients ask most before their first visit.
              </p>
              <a
                href={`tel:${locations[0].tel}`}
                className="font-sans text-[14px] text-text no-underline hover:underline underline-offset-4"
              >
                Have another question? Call {locations[0].telLabel}
              </a>
            </div>
            <dl style={{ borderTop: '1px solid var(--color-border)' }}>
              {service.faqs.map((f, i) => (
                <div key={i} className="py-7 reveal" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <dt className="font-display text-[20px] font-normal text-text leading-[1.3] mb-3 max-w-[44ch]">{f.q}</dt>
                  <dd className="font-sans text-[16px] text-muted leading-[1.7] max-w-[62ch]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Testimonial — service-matched social proof, placed at the decision point */}
      {quote && (
        <section className="bg-stone px-6 sm:px-10 md:px-14 py-20 md:py-28" style={{ borderTop: '1px solid var(--color-border)' }}>
          <figure className="max-w-[860px] mx-auto text-center reveal">
            <blockquote className="font-display italic text-[clamp(1.5rem,3vw,2.4rem)] font-light leading-[1.3] tracking-[-0.015em] text-text">
              “{quote.quote}”
            </blockquote>
            <figcaption className="font-sans text-[12px] uppercase tracking-[0.14em] text-muted mt-8">
              {quote.name}
              <span className="text-muted/70 normal-case tracking-normal">, {quote.detail}</span>
            </figcaption>
          </figure>
        </section>
      )}

      <BookCta />
    </>
  )
}
