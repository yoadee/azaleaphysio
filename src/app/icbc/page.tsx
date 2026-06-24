import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'
import JsonLd from '@/components/JsonLd'
import { locations, testimonials, type Faq } from '@/lib/clinic'
import { faqPageSchema, howToSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'ICBC Physiotherapy in West Vancouver | Direct Billing, No Referral',
  description:
    'ICBC covers 25 pre-approved physiotherapy visits in the first 12 weeks after a crash, with no referral needed. We bill ICBC directly. Book at either West Vancouver clinic.',
  alternates: {
    canonical: '/icbc',
    languages: { 'en-CA': '/icbc', fa: '/fa/icbc' },
  },
}

// Answer-first steps → HowTo JSON-LD. Mirrors how a patient actually starts.
const steps = [
  {
    name: 'Report your crash to ICBC',
    text: 'Open a claim with ICBC by phone or online and you are given a claim number. You can do this yourself; you do not need a lawyer or a doctor to start.',
  },
  {
    name: 'Book your physiotherapy',
    text: 'Call either clinic or book online. No doctor’s referral is required, and you do not need to wait for an adjuster to approve anything first.',
  },
  {
    name: 'Bring your claim number',
    text: 'Bring your ICBC claim number and the date of the accident to your first visit. That is all we need to bill ICBC directly.',
  },
  {
    name: 'Start treatment the same day',
    text: 'Your physiotherapist assesses the injury, explains what they have found, and begins treatment in the first session. We handle the ICBC paperwork from there.',
  },
]

const faqs: Faq[] = [
  {
    category: 'insurance',
    q: 'How many physiotherapy visits does ICBC cover?',
    a: 'ICBC pre-approves 25 physiotherapy visits in the first 12 weeks after a crash, for anyone injured in a motor vehicle accident in BC, regardless of who was at fault. If you need more treatment beyond that, your physiotherapist requests an extension on your behalf.',
  },
  {
    category: 'insurance',
    q: 'Do I need a doctor’s referral to start ICBC physiotherapy?',
    a: 'No. Under ICBC’s Enhanced Care, you can start physiotherapy with just your claim number, without a doctor’s referral and without waiting for adjuster approval. The 12-week window starts from the date of the accident, so it is worth booking early.',
  },
  {
    category: 'insurance',
    q: 'Will I have to pay anything upfront?',
    a: 'No. We bill ICBC directly for your covered visits, so there is nothing to pay upfront for the covered portion. Bring your claim number to your first visit and we take care of the billing.',
  },
  {
    category: 'insurance',
    q: 'How soon after my accident should I start?',
    a: 'As soon as you can. The 25 pre-approved visits sit inside a 12-week window that begins on the day of the crash, and soft-tissue injuries like whiplash respond better to early, guided movement than to rest. Booking in the first week or two gives you the most benefit from your coverage.',
  },
  {
    category: 'treatment',
    q: 'What injuries do you treat after a car accident?',
    a: 'Most commonly whiplash and neck pain, back pain, headaches, and soft-tissue strains to the shoulder, knee, or other joints. We assess what is actually injured, treat the pain, and rebuild the strength and movement so the problem does not linger or return.',
  },
  {
    category: 'insurance',
    q: 'Can I also get kinesiology or other treatment under my claim?',
    a: 'Often, yes. Alongside physiotherapy, ICBC pre-approves visits for chiropractic, massage therapy, acupuncture, kinesiology (active rehab), and counselling, each with its own visit limit in the first 12 weeks. Because we are multidisciplinary, your physiotherapist can bring the right ones into one coordinated plan rather than sending you to separate clinics.',
  },
]

const covered = [
  { label: 'Pre-approved visits', value: '25 physiotherapy visits in the first 12 weeks' },
  { label: 'Referral', value: 'Not required, just your claim number' },
  { label: 'Upfront cost', value: 'None for the covered portion, billed direct to ICBC' },
  { label: 'Also covered', value: 'Five more treatments, each pre-approved separately (below)' },
]

// ICBC Enhanced Care pre-approved visits per discipline, in the first 12 weeks.
const preApproved = [
  { service: 'Physiotherapy', sessions: 25 },
  { service: 'Chiropractic', sessions: 25 },
  { service: 'Massage therapy', sessions: 12 },
  { service: 'Acupuncture', sessions: 12 },
  { service: 'Kinesiology (active rehab)', sessions: 12 },
  { service: 'Counselling', sessions: 12 },
]

export default function IcbcPage() {
  const quote = testimonials.find((t) => t.service === 'physiotherapy')

  return (
    <>
      <RevealObserver />
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd data={howToSchema('How to start ICBC physiotherapy in West Vancouver', steps)} />

      <PageHeader
        trail={[{ label: 'ICBC Physiotherapy' }]}
        eyebrow="After a car accident"
        title="ICBC physiotherapy in West Vancouver."
        lead="Injured in a crash? ICBC pre-approves 25 physiotherapy visits in your first 12 weeks, with no referral needed. Bring your claim number and we bill ICBC directly, so there is nothing to pay upfront for your covered visits."
        cta
      />

      {/* What's covered — facts rail + plain explanation */}
      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20">
          <div className="reveal">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-text mb-7">
              What ICBC covers
            </h2>
            <p className="font-sans text-[18px] text-text leading-[1.75] max-w-[60ch]">
              After a motor vehicle accident in BC, ICBC’s Enhanced Care covers 25 physiotherapy visits in the first
              12 weeks for everyone injured, no matter who caused the crash. You do not need a doctor’s note or adjuster
              approval to begin. All it takes to start is a claim number.
            </p>
            <p className="font-sans text-[17px] text-muted leading-[1.75] max-w-[60ch] mt-6">
              The 12-week window starts on the day of the accident, so the sooner you book, the more of your coverage
              you actually use, and the better whiplash and soft-tissue injuries respond. If your recovery needs more
              than the pre-approved visits, we request the extension for you. ICBC also pre-approves a set number of
              visits for several other treatments, listed below, which we coordinate under one roof.
            </p>
          </div>

          <aside className="md:sticky md:top-28 md:self-start reveal">
            <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-6">
              At a glance
            </p>
            <dl style={{ borderTop: '1px solid var(--color-border)' }}>
              {covered.map((f) => (
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

      {/* Pre-approved visits by treatment — multidisciplinary coverage at a glance */}
      <section className="bg-stone px-6 sm:px-10 md:px-14 py-20 md:py-24" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[640px] mb-12 md:mb-16 reveal">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-text mb-6">
              What ICBC pre-approves, by treatment
            </h2>
            <p className="font-sans text-[17px] text-muted leading-[1.75]">
              Enhanced Care pre-approves a set number of visits for each type of treatment in the first 12 weeks, with no
              referral and no adjuster approval needed. Because we are multidisciplinary, your physiotherapist can bring
              more than one of these into a single, coordinated plan.
            </p>
          </div>

          <dl
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px reveal"
            style={{ backgroundColor: 'var(--color-border)', border: '1px solid var(--color-border)' }}
          >
            {preApproved.map((s) => (
              <div key={s.service} className="bg-stone flex items-baseline justify-between gap-4 px-7 py-7">
                <dt className="font-display text-[19px] font-normal text-text leading-tight">{s.service}</dt>
                <dd className="font-display text-[clamp(2.25rem,4vw,3rem)] font-light text-text tabular-nums leading-none shrink-0">
                  {s.sessions}
                </dd>
              </div>
            ))}
          </dl>

          <p className="font-sans text-[14px] text-muted leading-[1.7] mt-8 max-w-[640px] reveal">
            These are the visits ICBC pre-approves up front. If your recovery needs more, your practitioner requests an
            extension on your behalf, no out-of-pocket guesswork on your end.
          </p>
        </div>
      </section>

      {/* How to start — ordered sequence */}
      <section className="bg-dark px-6 sm:px-10 md:px-14 py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[560px] mb-14 md:mb-20 reveal">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-dark-text mb-6">
              How to start
            </h2>
            <p className="font-sans text-[16px] text-dark-text/75 leading-[1.7]">
              Four steps from accident to treatment. Most patients are in for their first appointment within the week.
            </p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {steps.map((step, i) => (
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

      {/* Cross-links to related care */}
      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light tracking-[-0.02em] text-text mb-10 reveal">
            Care after your crash
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: '/conditions/whiplash', name: 'Whiplash', desc: 'The most common car-accident injury, and one that responds best to early treatment.' },
              { href: '/conditions/car-accident-icbc', name: 'Car accident injuries', desc: 'Soft-tissue and joint injuries from a collision, billed straight to ICBC.' },
              { href: '/services/kinesiology', name: 'Active rehab', desc: 'The kinesiology-led strength work ICBC covers alongside physiotherapy.' },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="bg-bg border border-border hover:border-text/40 p-7 no-underline group transition-colors duration-300 flex flex-col gap-2 reveal"
              >
                <p className="font-display italic text-[19px] font-light text-text">{c.name}</p>
                <p className="font-sans text-[14px] text-muted group-hover:text-text transition-colors duration-300 leading-[1.6]">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — FAQPage schema */}
      <section className="bg-stone px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-20">
          <div className="md:sticky md:top-28 md:self-start reveal">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-text mb-5">
              ICBC questions
            </h2>
            <p className="font-sans text-[15px] text-muted leading-[1.7] mb-6 max-w-[260px]">
              What patients ask most after a crash.
            </p>
            <a
              href={`tel:${locations[0].tel}`}
              className="font-sans text-[14px] text-text no-underline hover:underline underline-offset-4"
            >
              Have another question? Call {locations[0].telLabel}
            </a>
          </div>
          <dl style={{ borderTop: '1px solid var(--color-border)' }}>
            {faqs.map((f, i) => (
              <div key={i} className="py-7 reveal" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <dt className="font-display text-[20px] font-normal text-text leading-[1.3] mb-3 max-w-[44ch]">{f.q}</dt>
                <dd className="font-sans text-[16px] text-muted leading-[1.7] max-w-[62ch]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {quote && (
        <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-28" style={{ borderTop: '1px solid var(--color-border)' }}>
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

      <BookCta
        heading="Start your ICBC recovery this week."
        body="Bring your claim number, we handle the rest. No referral, nothing to pay upfront for covered visits, and usually an appointment inside the week."
      />
    </>
  )
}
