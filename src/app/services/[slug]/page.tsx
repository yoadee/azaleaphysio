import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/PageHeader'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'
import JsonLd from '@/components/JsonLd'
import { services, serviceBySlug, conditionBySlug, team } from '@/lib/clinic'
import { serviceSchema } from '@/lib/schema'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = serviceBySlug(slug)
  if (!s) return {}
  return {
    title: `${s.name} in West Vancouver`,
    description: s.excerpt,
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
  return (matched.length ? matched : team.filter((p) => p.role.toLowerCase().includes('physio'))).slice(0, 3)
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = serviceBySlug(slug)
  if (!service) notFound()

  const related = service.relatedConditions
    .map(conditionBySlug)
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
  const people = relatedPractitioners(service.name)

  return (
    <>
      <RevealObserver />
      <JsonLd data={serviceSchema(service)} />

      <PageHeader
        trail={[{ label: 'Services', href: '/services' }, { label: service.name }]}
        eyebrow="Service"
        title={`${service.name} in West Vancouver`}
        lead={service.excerpt}
      />

      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-12 md:gap-20">
          <div className="md:sticky md:top-28 md:self-start reveal">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-text">
              Is this you?
            </h2>
          </div>
          <ul className="list-none" style={{ borderTop: '1px solid var(--color-border)' }}>
            {service.whoThisHelps.map((item, i) => (
              <li
                key={i}
                className="font-sans text-[17px] text-text leading-[1.6] py-6 reveal"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-stone px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[760px] mx-auto reveal">
          <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-text mb-7">
            What we do
          </h2>
          <p className="font-sans text-[18px] text-text leading-[1.75]">{service.whatWeDo}</p>
        </div>
      </section>

      {people.length > 0 && (
        <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light tracking-[-0.02em] text-text mb-10 reveal">
              Who you might see
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-8">
              {people.map((p) => (
                <Link key={p.slug} href={`/team/${p.slug}`} className="no-underline group reveal">
                  <p className="font-display text-[19px] text-text mb-1 group-hover:text-rose-dark transition-colors">{p.name}</p>
                  <p className="font-sans text-[12px] uppercase tracking-[0.1em] text-muted">{p.role}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-stone px-6 sm:px-10 md:px-14 py-20 md:py-24" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="max-w-[1100px] mx-auto">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light tracking-[-0.02em] text-text mb-10 reveal">
              Conditions we treat with this
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((c) => (
                <Link
                  key={c.slug}
                  href={`/conditions/${c.slug}`}
                  className="bg-stone hover:bg-bg p-7 no-underline group transition-colors flex flex-col gap-2"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <p className="font-display italic text-[19px] font-light text-text group-hover:translate-x-1 transition-transform duration-300 ease-out">{c.name}</p>
                  <p className="font-sans text-[14px] text-muted leading-[1.6]">{c.short}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <BookCta heading={`Book ${service.name.toLowerCase()} in West Vancouver.`} />
    </>
  )
}
