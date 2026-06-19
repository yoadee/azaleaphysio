import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/PageHeader'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'
import JsonLd from '@/components/JsonLd'
import { locations, services, SITE } from '@/lib/clinic'
import { locationSchema } from '@/lib/schema'

const locationBySlug = (slug: string) => locations.find((l) => l.slug === slug)

// Unique framing per location so the two pages do not read as duplicate content.
const blurbs: Record<string, { lead: string; body: string }> = {
  '16th-street': {
    lead: 'Our clinic at 585 16th Street sits in the heart of Ambleside, a few minutes from Marine Drive and easy to reach from across the North Shore.',
    body: 'This is where Azalea began. The full multidisciplinary team works from here, so whatever you come in for, the rest of your plan is in the same building rather than scattered across clinics. We are a short drive for patients across Ambleside, the British Properties, and central West Vancouver. Weekday hours run to 7pm and we open Saturday mornings, which makes it easier to fit treatment around work.',
  },
  'ocean-walk': {
    lead: 'Our Ocean Walk clinic on Marine Drive serves the west side of West Vancouver, with the same disciplines and the same direct billing as our 16th Street location.',
    body: 'If Marine Drive is the easier side of the North Shore for you, this is your clinic. It is an easy reach from Dundarave, the west side of the district, and out toward Horseshoe Bay and Lions Bay. It offers the same multidisciplinary care under one roof, the same same-week availability, and the same direct billing to ICBC, WorkSafeBC, and most extended health plans.',
  },
}

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const loc = locationBySlug(slug)
  if (!loc) return {}
  // Each location owns a distinct hyperlocal query (Ambleside vs Marine Drive) so
  // neither competes with /services/physiotherapy for the "physiotherapy west
  // vancouver" head term.
  const where = loc.slug === 'ocean-walk' ? 'on Marine Drive' : 'in Ambleside'
  const area = loc.slug === 'ocean-walk' ? 'Dundarave and the west side of West Vancouver' : 'Ambleside and central West Vancouver'
  return {
    title: `Physiotherapy ${where}, West Vancouver | ${loc.name}`,
    description: `${loc.name}: ${loc.street}, West Vancouver. Physiotherapy and multidisciplinary care for ${area}. Direct billing, no referral needed. ${loc.hours[0].days} ${loc.hours[0].time}. Call ${loc.telLabel}.`,
    alternates: { canonical: `/locations/${loc.slug}` },
  }
}

export default async function LocationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const loc = locationBySlug(slug)
  if (!loc) notFound()
  const other = locations.find((l) => l.slug !== loc.slug)
  const copy = blurbs[loc.slug]

  return (
    <>
      <RevealObserver />
      <JsonLd data={locationSchema(loc)} />

      <PageHeader
        trail={[{ label: 'Locations', href: '/locations' }, { label: loc.name }]}
        eyebrow={loc.area}
        title={`${loc.name}, West Vancouver.`}
        lead={copy?.lead}
        cta
      />

      {/* NAP + hours + directions */}
      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-12 md:gap-16">
          <div className="reveal">
            <h2 className="font-display italic text-[clamp(1.6rem,3vw,2.25rem)] font-light text-text mb-6">
              Visit us
            </h2>
            {copy?.body && <p className="font-sans text-[17px] text-text leading-[1.75] max-w-[60ch] mb-8">{copy.body}</p>}
            <div className="font-sans text-[16px] text-text leading-[1.9] mb-8">
              <p className="font-semibold">{loc.name}</p>
              <p className="text-muted">{loc.street}</p>
              <p className="text-muted">{loc.city} {loc.postal}</p>
              <a href={`tel:${loc.tel}`} className="block text-text font-semibold no-underline hover:text-rose-dark transition-colors mt-2">
                {loc.telLabel}
              </a>
              <a href={`mailto:${SITE.email}`} className="block text-muted no-underline hover:text-text transition-colors">
                {SITE.email}
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
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
                className="inline-flex items-center justify-center font-sans text-[11px] font-semibold tracking-[0.1em] uppercase px-7 py-3.5 text-text hover:bg-stone transition-colors duration-200 min-h-[44px] no-underline"
                style={{ border: '1px solid var(--color-border)' }}
              >
                Get directions
              </a>
            </div>
          </div>

          <aside className="md:sticky md:top-28 md:self-start reveal">
            <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-6">Hours</p>
            <div className="font-sans text-[15px] text-text" style={{ borderTop: '1px solid var(--color-border)' }}>
              {loc.hours.map((h) => (
                <div key={h.days} className="flex justify-between py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <span className="text-muted">{h.days}</span>
                  <span>{h.time}</span>
                </div>
              ))}
              <div className="flex justify-between py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <span className="text-muted">Sunday</span>
                <span className="text-muted/70">Closed</span>
              </div>
            </div>
            <dl className="mt-8 font-sans text-[14px]">
              <div className="flex flex-col gap-1 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <dt className="text-[12px] uppercase tracking-[0.1em] text-muted">Referral</dt>
                <dd className="text-text">Not required, book directly</dd>
              </div>
              <div className="flex flex-col gap-1 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <dt className="text-[12px] uppercase tracking-[0.1em] text-muted">Direct billing</dt>
                <dd className="text-text">ICBC, WorkSafeBC & most extended health</dd>
              </div>
              <div className="flex flex-col gap-1 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <dt className="text-[12px] uppercase tracking-[0.1em] text-muted">Languages</dt>
                <dd className="text-text">English & Farsi</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* What's offered here */}
      <section className="bg-stone px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light tracking-[-0.02em] text-text mb-4 reveal">
            What we offer here
          </h2>
          <p className="font-sans text-[16px] text-muted mb-10 max-w-[620px] reveal">
            All eleven disciplines are available at this location, coordinated under one roof.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="bg-bg border border-border hover:border-text/40 p-4 no-underline transition-colors duration-300 reveal"
              >
                <p className="font-display text-[16px] text-text leading-[1.3]">{s.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other location */}
      {other && (
        <section className="bg-bg px-6 sm:px-10 md:px-14 py-16 md:py-20">
          <div className="max-w-[1100px] mx-auto reveal">
            <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-4">Our other clinic</p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
              <div>
                <h3 className="font-display italic text-[24px] font-light text-text mb-1">{other.name}</h3>
                <p className="font-sans text-[15px] text-muted">{other.street}, {other.city} · {other.telLabel}</p>
              </div>
              <Link
                href={`/locations/${other.slug}`}
                className="font-sans text-[13px] font-semibold tracking-[0.06em] text-text no-underline hover:text-rose-dark transition-colors whitespace-nowrap"
              >
                View {other.name.replace(' Clinic', '')} →
              </Link>
            </div>
          </div>
        </section>
      )}

      <BookCta />
    </>
  )
}
