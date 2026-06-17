import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/PageHeader'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'
import { conditions, conditionBySlug, serviceBySlug } from '@/lib/clinic'

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

export default async function ConditionDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = conditionBySlug(slug)
  if (!c) notFound()

  const services = c.relatedServices
    .map(serviceBySlug)
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  return (
    <>
      <RevealObserver />
      <PageHeader
        trail={[{ label: 'Conditions', href: '/conditions' }, { label: c.name }]}
        eyebrow="Condition"
        title={`${c.name} in West Vancouver`}
        lead={c.intro}
      />

      {services.length > 0 && (
        <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light tracking-[-0.02em] text-text mb-4 reveal">
              How we treat it
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

      <BookCta heading={`Book treatment for ${c.name.toLowerCase()}.`} />
    </>
  )
}
