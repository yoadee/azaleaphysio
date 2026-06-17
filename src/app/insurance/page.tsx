import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'
import JsonLd from '@/components/JsonLd'
import { faqPageSchema } from '@/lib/schema'
import { insurers, type Faq } from '@/lib/clinic'

export const metadata: Metadata = {
  title: 'Insurance & Direct Billing',
  description:
    'Azalea direct-bills ICBC, WorkSafeBC and the major extended health plans in West Vancouver, so you pay only the portion your plan does not cover.',
  alternates: { canonical: '/insurance' },
}

const insuranceFaqs: Faq[] = [
  {
    category: 'insurance',
    q: 'Do I pay anything upfront if you direct-bill my insurance?',
    a: 'Usually not for the covered portion. We bill your insurer directly and you pay only the balance your plan does not cover, often nothing for ICBC and WorkSafeBC claims, and a small co-pay for many extended health plans.',
  },
  {
    category: 'insurance',
    q: 'What if you cannot direct-bill my specific insurer?',
    a: 'You pay at the visit and we give you a detailed receipt formatted for reimbursement. You submit it to your insurer and they pay you back according to your policy.',
  },
  {
    category: 'insurance',
    q: 'Does my extended health plan need a doctor’s referral?',
    a: 'Sometimes. BC does not require a referral to receive physiotherapy, but some extended health policies require one to reimburse you. Check your plan booklet, or call your insurer’s member line, before your first visit.',
  },
]

const plans = [
  { plan: 'ICBC (car accidents)', bill: 'Billed directly', upfront: 'Nothing upfront', note: 'Start with a claim number, no adjuster approval needed' },
  { plan: 'WorkSafeBC (work injuries)', bill: 'Billed directly', upfront: 'Nothing upfront', note: 'We coordinate reporting and return-to-work documents' },
  { plan: 'Extended health plans', bill: 'Billed directly where possible', upfront: 'Co-pay only, if any', note: 'Coverage and visit caps vary by policy' },
]

export default function InsurancePage() {
  return (
    <>
      <RevealObserver />
      <JsonLd data={faqPageSchema(insuranceFaqs)} />
      <PageHeader
        trail={[{ label: 'Insurance' }]}
        title="Insurance and direct billing."
        lead="Yes, Azalea direct-bills most insurers, so you do not pay the covered portion upfront. We bill ICBC, WorkSafeBC and the major extended health plans, settle with them on your behalf, and you cover only the balance your plan does not, if any."
      />

      {/* Comparison table — AI parses tables reliably */}
      <section className="bg-bg px-6 sm:px-10 md:px-14 py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto reveal overflow-x-auto">
          <table className="w-full border-collapse text-start min-w-[640px]">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-text)' }}>
                {['Plan', 'Billing', 'You pay', 'Good to know'].map((h) => (
                  <th key={h} scope="col" className="font-sans text-[11px] uppercase tracking-[0.12em] text-muted font-semibold text-start py-4 pe-6">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plans.map((row) => (
                <tr key={row.plan} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="font-display italic text-[18px] font-light text-text py-5 pe-6 align-top">{row.plan}</td>
                  <td className="font-sans text-[14px] text-text py-5 pe-6 align-top">{row.bill}</td>
                  <td className="font-sans text-[14px] text-text py-5 pe-6 align-top">{row.upfront}</td>
                  <td className="font-sans text-[14px] text-muted py-5 align-top leading-[1.6]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Detail sections */}
      <section className="bg-stone px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[760px] mx-auto flex flex-col gap-16">
          {[
            {
              h: 'ICBC claims',
              body: 'ICBC covers physiotherapy for injuries from a motor vehicle accident, and you can start treatment without an adjuster’s pre-approval. Under BC’s Enhanced Care, you are pre-authorized for a set number of visits in the weeks after your accident, billed directly to ICBC.',
              steps: ['Report your accident to ICBC and get your claim number.', 'Call either clinic and tell us you have an ICBC claim.', 'Book your first assessment. No referral or lawyer needed to begin.'],
              bring: ['Your ICBC claim number', 'Your date of accident', 'A piece of photo ID', 'Your BC Services Card'],
            },
            {
              h: 'WorkSafeBC claims',
              body: 'WorkSafeBC covers physiotherapy for injuries that happened at work, and we bill them directly. Once your claim is open, we coordinate the treatment plan and reporting with WorkSafeBC, including the documentation for a managed return to work.',
              steps: ['Report your injury to your employer and to WorkSafeBC, and get your claim number.', 'Call either clinic and tell us it is a WorkSafeBC claim.', 'Book your assessment. We handle the billing and reporting from there.'],
              bring: ['Your WorkSafeBC claim number', 'Your date of injury', 'A piece of photo ID'],
            },
          ].map((sec) => (
            <div key={sec.h} className="reveal">
              <h2 className="font-display italic text-[clamp(1.6rem,3vw,2.25rem)] font-light tracking-[-0.02em] text-text mb-5">{sec.h}</h2>
              <p className="font-sans text-[16px] text-text leading-[1.75] mb-7">{sec.body}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-sans text-[11px] uppercase tracking-[0.14em] text-muted mb-4">How to start</h3>
                  <ol className="list-none flex flex-col gap-3">
                    {sec.steps.map((s, i) => (
                      <li key={i} className="font-sans text-[14px] text-text leading-[1.6] flex gap-3">
                        <span className="font-display text-[15px] text-rose-dark shrink-0">{i + 1}</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="font-sans text-[11px] uppercase tracking-[0.14em] text-muted mb-4">What to bring</h3>
                  <ul className="list-none flex flex-col gap-2">
                    {sec.bring.map((b, i) => (
                      <li key={i} className="font-sans text-[14px] text-text leading-[1.6]">{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Extended health + pricing */}
      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[760px] mx-auto flex flex-col gap-14">
          <div className="reveal">
            <h2 className="font-display italic text-[clamp(1.6rem,3vw,2.25rem)] font-light tracking-[-0.02em] text-text mb-5">Extended health plans</h2>
            <p className="font-sans text-[16px] text-text leading-[1.75] mb-5">
              We direct-bill most major extended health insurers. We submit the claim at the desk and you pay only what your plan does not cover, rather than the full fee followed by a wait for reimbursement.
            </p>
            <p className="font-sans text-[16px] text-muted leading-[1.75] mb-6">
              Coverage varies by policy. Some plans need a doctor’s referral to reimburse, and most cap the number of visits or dollar amount per year. We tell you what your plan returns before you commit to a course of treatment. If we cannot direct-bill your insurer, we give you a receipt formatted for an easy claim.
            </p>
            <div className="flex flex-wrap gap-x-7 gap-y-2 pt-2">
              {insurers.map((name) => (
                <span key={name} className="font-sans text-[14px] font-medium text-muted">{name}</span>
              ))}
            </div>
          </div>
          <div className="reveal">
            <h2 className="font-display italic text-[clamp(1.6rem,3vw,2.25rem)] font-light tracking-[-0.02em] text-text mb-5">Pricing</h2>
            <p className="font-sans text-[16px] text-text leading-[1.75]">
              We publish our fees because you should not have to call to find out. An initial physiotherapy assessment runs roughly $110 to $135, and follow-up visits roughly $90 to $110, depending on length and practitioner. Most extended health plans reimburse a significant share, and where we direct-bill, you pay only the balance at the desk. ICBC and WorkSafeBC visits are typically covered in full, with nothing to pay upfront.
            </p>
          </div>
        </div>
      </section>

      {/* Insurance FAQ */}
      <section className="bg-stone px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[760px] mx-auto">
          <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light tracking-[-0.02em] text-text mb-10 reveal">Insurance questions</h2>
          <dl className="list-none" style={{ borderTop: '1px solid var(--color-border)' }}>
            {insuranceFaqs.map((f, i) => (
              <div key={i} className="py-6 reveal" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <dt className="font-display italic text-[19px] font-light text-text mb-3">{f.q}</dt>
                <dd className="font-sans text-[15px] text-muted leading-[1.8]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <BookCta />
    </>
  )
}
