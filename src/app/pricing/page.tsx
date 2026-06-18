import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'
import JsonLd from '@/components/JsonLd'
import { locations, type Faq } from '@/lib/clinic'
import { faqPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Physiotherapy Pricing in West Vancouver | Fees & Direct Billing',
  description:
    'Transparent physiotherapy fees in West Vancouver: assessments from $110, follow-ups from $90. Most extended health plans reimburse a share, and ICBC and WorkSafeBC visits are covered in full.',
  alternates: { canonical: '/pricing' },
}

type Fee = { service: string; initial: string; followUp: string; note?: string }

// Only physiotherapy fees are confirmed. Sports-injury physiotherapy shares the
// same registered-physiotherapy fee structure. Other disciplines are intentionally
// not given invented numbers; their fees are confirmed at booking until Mary
// supplies exact figures (see note below the table).
const fees: Fee[] = [
  { service: 'Physiotherapy', initial: '$110 to $135', followUp: '$90 to $110', note: 'Most common starting point' },
  { service: 'Sports injury physiotherapy', initial: '$110 to $135', followUp: '$90 to $110' },
]

const faqs: Faq[] = [
  {
    category: 'insurance',
    q: 'How much does physiotherapy cost in West Vancouver?',
    a: 'At Azalea, an initial physiotherapy assessment runs roughly $110 to $135 and follow-up visits roughly $90 to $110, depending on the length of the appointment and the practitioner. Most extended health plans reimburse a significant share of that, and ICBC and WorkSafeBC visits are typically covered in full.',
  },
  {
    category: 'insurance',
    q: 'Do you direct-bill my insurance?',
    a: 'Yes. We direct-bill ICBC, WorkSafeBC, and most major extended health plans, including Pacific Blue Cross, Sun Life, Manulife, Canada Life, Green Shield, Desjardins and Beneva. You pay only the portion your plan does not cover, and our insurance page lists every provider we bill.',
  },
  {
    category: 'insurance',
    q: 'Is there any cost for ICBC or WorkSafeBC visits?',
    a: 'For covered visits, no. After a car accident, ICBC pre-approves 25 physiotherapy visits in your first 12 weeks and we bill ICBC directly. For a workplace injury, WorkSafeBC covers your treatment once your claim is active. In both cases there is nothing to pay upfront for the covered portion.',
  },
  {
    category: 'booking',
    q: 'Do I need a referral, and does that change the cost?',
    a: 'No referral is needed to book in BC. Some extended health plans ask for a doctor’s referral before they reimburse you, so it is worth checking your own policy. The clinic fee is the same either way.',
  },
  {
    category: 'insurance',
    q: 'Why are the fees shown as a range?',
    a: 'Because the right appointment length varies. A longer initial assessment for a complex problem costs more than a brief follow-up. We confirm your exact fee when you book, so there are no surprises, and our front desk will tell you what your plan is likely to cover.',
  },
]

export default function PricingPage() {
  return (
    <>
      <RevealObserver />
      <JsonLd data={faqPageSchema(faqs)} />

      <PageHeader
        trail={[{ label: 'Pricing' }]}
        eyebrow="Fees & billing"
        title="Clear pricing, billed to your insurer."
        lead="A physiotherapy assessment runs roughly $110 to $135 and follow-ups from $90. Most extended health plans reimburse a share, and ICBC and WorkSafeBC visits are covered in full with nothing to pay upfront."
        cta
      />

      {/* Fee table */}
      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-text mb-4 reveal">
            What it costs
          </h2>
          <p className="font-sans text-[16px] text-muted leading-[1.7] mb-10 max-w-[620px] reveal">
            Typical ranges below. Your exact fee depends on the length of the visit and the practitioner, and we
            confirm it when you book. These are clinic fees before any insurance reimbursement.
          </p>

          <div className="reveal" style={{ borderTop: '1px solid var(--color-border)' }}>
            <div className="hidden sm:grid grid-cols-[1.6fr_1fr_1fr] gap-6 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <span className="font-sans text-[12px] uppercase tracking-[0.1em] text-muted">Service</span>
              <span className="font-sans text-[12px] uppercase tracking-[0.1em] text-muted">Initial visit</span>
              <span className="font-sans text-[12px] uppercase tracking-[0.1em] text-muted">Follow-up</span>
            </div>
            {fees.map((f) => (
              <div
                key={f.service}
                className="grid grid-cols-1 sm:grid-cols-[1.6fr_1fr_1fr] gap-1 sm:gap-6 py-5"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <span className="font-display text-[18px] text-text leading-[1.4]">
                  {f.service}
                  {f.note && <span className="font-sans text-[12px] text-muted block sm:inline sm:ms-3 normal-case">{f.note}</span>}
                </span>
                <span className="font-sans text-[16px] text-text">
                  <span className="sm:hidden text-muted text-[13px] me-2">Initial:</span>{f.initial}
                </span>
                <span className="font-sans text-[16px] text-text">
                  <span className="sm:hidden text-muted text-[13px] me-2">Follow-up:</span>{f.followUp}
                </span>
              </div>
            ))}
          </div>

          <p className="font-sans text-[14px] text-muted leading-[1.7] mt-8 max-w-[620px] reveal">
            Acupuncture, osteopathy, kinesiology, chiropractic, occupational therapy, yoga therapy, and our weight-loss
            and elderly-care programs are priced by visit length and practitioner. Call either clinic for an exact fee,
            or see the relevant{' '}
            <Link href="/services" className="text-text underline underline-offset-4 decoration-border hover:decoration-text">service page</Link>.
          </p>
        </div>
      </section>

      {/* Insurance reassurance */}
      <section className="bg-stone px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { h: 'Extended health', b: 'We direct-bill most major plans, so you pay only the portion your plan does not cover. Bring your plan details to your first visit.' },
            { h: 'ICBC', b: '25 physiotherapy visits are pre-approved in your first 12 weeks after a crash, billed directly to ICBC. Nothing to pay upfront.' },
            { h: 'WorkSafeBC', b: 'Once your claim is active, your treatment is covered and billed directly to WorkSafeBC. Nothing to pay upfront.' },
          ].map((c) => (
            <div key={c.h} className="reveal">
              <h3 className="font-display italic text-[22px] font-light text-text mb-3">{c.h}</h3>
              <p className="font-sans text-[15px] text-muted leading-[1.7]">{c.b}</p>
            </div>
          ))}
        </div>
        <div className="max-w-[1000px] mx-auto mt-10 reveal">
          <Link
            href="/insurance"
            className="font-sans text-[14px] text-text no-underline hover:underline underline-offset-4"
          >
            See every insurer we direct-bill →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-20">
          <div className="md:sticky md:top-28 md:self-start reveal">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-text mb-5">
              Pricing questions
            </h2>
            <p className="font-sans text-[15px] text-muted leading-[1.7] mb-6 max-w-[260px]">
              What patients ask about cost and coverage.
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

      <BookCta />
    </>
  )
}
