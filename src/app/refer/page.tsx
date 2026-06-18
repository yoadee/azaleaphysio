import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import RevealObserver from '@/components/RevealObserver'
import JsonLd from '@/components/JsonLd'
import { SITE, locations, type Faq } from '@/lib/clinic'
import { faqPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Refer a Patient | Azalea Physiotherapy, West Vancouver',
  description:
    'For physicians, lawyers and partners referring to Azalea Physiotherapy. Same-week appointments, direct billing to ICBC, WorkSafeBC and extended health, a multidisciplinary team under one roof, and a progress report back to you.',
  alternates: { canonical: '/refer' },
}

// Framed for the referrer, not the patient: what referring to Azalea does for
// their patient and for them.
const reasons = [
  {
    title: 'Your patient is seen this week',
    body: 'Two North Shore locations, evenings to 7pm and Saturday hours, so your referral does not wait weeks for an opening.',
  },
  {
    title: 'You get a report back',
    body: 'With the patient’s consent, we send the referring provider our assessment findings and treatment plan, and updates on progress. You stay in the loop.',
  },
  {
    title: 'We handle the billing',
    body: 'Direct billing to ICBC, WorkSafeBC and most extended health plans, so there is nothing for your patient to pay upfront for covered care, and no admin handed back to you.',
  },
  {
    title: 'One coordinated, multidisciplinary plan',
    body: 'Physiotherapy, kinesiology and active rehab, osteopathy, acupuncture and occupational therapy under one roof, so complex cases are managed in one place rather than scattered across clinics.',
  },
  {
    title: 'Registered, accountable clinicians',
    body: 'Our physiotherapists are registered with the College of Physical Therapists of BC. Care is evidence-based and documented.',
  },
  {
    title: 'English and Farsi',
    body: 'A largely Farsi-speaking team, so Persian-speaking patients are assessed and guided in their own language. A genuine difference for the North Shore community.',
  },
]

const afterSteps = [
  {
    name: 'We contact your patient',
    text: 'As soon as we receive the referral, we reach out to your patient and book them in, usually within the week, at the location closest to them.',
  },
  {
    name: 'A full assessment',
    text: 'Their physiotherapist assesses the injury, explains what they have found, and begins treatment in the first visit. We look for the cause, not just the symptom.',
  },
  {
    name: 'Coordinated care, billed direct',
    text: 'If the case needs kinesiology, osteopathy or acupuncture, we bring it in under one plan and bill ICBC, WorkSafeBC or extended health directly.',
  },
  {
    name: 'A report back to you',
    text: 'With the patient’s consent, you receive our findings and plan, and progress updates through their course of care.',
  },
]

const faqs: Faq[] = [
  {
    category: 'general',
    q: 'Do my patients need a referral to be seen?',
    a: 'No. British Columbia has direct access, so a patient can book physiotherapy without a referral. A referral from you still helps us coordinate their care and report findings back to you, which is why we make formal referrals easy to send.',
  },
  {
    category: 'general',
    q: 'Will I get an update on my patient?',
    a: 'Yes. With the patient’s consent, we send the referring provider a report with our assessment findings and treatment plan, plus updates on progress through their care. Keeping you informed is part of how we work.',
  },
  {
    category: 'general',
    q: 'How quickly will my patient be seen?',
    a: 'Usually within the week. We have two West Vancouver locations open to 7pm on weekdays and Saturday mornings, so access is rarely the bottleneck for an urgent referral.',
  },
  {
    category: 'general',
    q: 'Do you direct bill ICBC, WorkSafeBC and extended health?',
    a: 'Yes. We bill ICBC and WorkSafeBC directly, and direct bill most extended health plans, so there is nothing for your patient to pay upfront for covered care and no paperwork handed back to your office.',
  },
  {
    category: 'general',
    q: 'What can you treat beyond physiotherapy?',
    a: 'We are multidisciplinary: physiotherapy, kinesiology and active rehabilitation, osteopathy, acupuncture and occupational therapy, coordinated under one plan. That makes us a single destination for complex or multi-faceted cases.',
  },
]

export default function ReferPage() {
  return (
    <>
      <RevealObserver />
      <JsonLd data={faqPageSchema(faqs)} />

      <PageHeader
        trail={[{ label: 'Refer a Patient' }]}
        eyebrow="For referring partners"
        title="Refer a patient to Azalea."
        lead="For physicians, specialists, legal partners and allied providers. Send us a patient and we look after the rest: a same-week appointment, direct billing, a coordinated multidisciplinary plan, and a report back to you."
      />

      {/* Why refer — benefits framed for the referrer */}
      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[620px] mb-14 reveal">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-text mb-6">
              Why partners refer to us
            </h2>
            <p className="font-sans text-[18px] text-text leading-[1.75]">
              When you refer a patient, your name is on that recommendation. We treat it that way: fast access,
              clear communication, and care that reflects well on you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
            {reasons.map((r) => (
              <div key={r.title} className="reveal" style={{ borderTop: '1px solid var(--color-border)' }}>
                <h3 className="font-display text-[20px] font-normal text-text leading-[1.3] pt-5 mb-2 max-w-[34ch]">
                  {r.title}
                </h3>
                <p className="font-sans text-[15px] text-muted leading-[1.7] max-w-[46ch]">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to refer — the action, on the dark panel */}
      <section className="bg-dark px-6 sm:px-10 md:px-14 py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[620px] mb-14 reveal">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-dark-text mb-6">
              How to refer
            </h2>
            <p className="font-sans text-[16px] text-dark-text/75 leading-[1.7]">
              The quickest route is a phone call. For anything with patient health information, please fax or call
              rather than email, so your patient’s details stay on a secure clinical channel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {locations.map((loc) => (
              <div key={loc.slug} className="reveal" style={{ borderTop: '1px solid rgba(237,233,228,0.14)' }}>
                <h3 className="font-display text-[20px] font-normal text-dark-text pt-5 mb-4">
                  {loc.name.replace(' Clinic', '')}
                </h3>
                <dl className="space-y-3">
                  <div className="flex items-baseline gap-4">
                    <dt className="font-sans text-[11px] uppercase tracking-[0.16em] text-dark-text/50 w-12 shrink-0">Call</dt>
                    <dd>
                      <a
                        href={`tel:${loc.tel}`}
                        className="font-sans text-[16px] text-dark-text font-medium no-underline hover:text-gold transition-colors"
                      >
                        {loc.telLabel}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <dt className="font-sans text-[11px] uppercase tracking-[0.16em] text-dark-text/50 w-12 shrink-0">Fax</dt>
                    <dd className="font-sans text-[16px] text-dark-text/80">{loc.fax}</dd>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <dt className="font-sans text-[11px] uppercase tracking-[0.16em] text-dark-text/50 w-12 shrink-0">Hours</dt>
                    <dd className="font-sans text-[14px] text-dark-text/70 leading-[1.6]">
                      {loc.hours.map((h) => (
                        <span key={h.days} className="block">
                          {h.days} {h.time}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          <div
            className="mt-14 pt-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10"
            style={{ borderTop: '1px solid rgba(237,233,228,0.14)' }}
          >
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-dark-text/50 mb-2">General enquiries</p>
              <a
                href={`mailto:${SITE.email}`}
                className="font-sans text-[16px] text-dark-text font-medium no-underline hover:text-gold transition-colors"
              >
                {SITE.email}
              </a>
            </div>
            <Link
              href="/refer/one-pager"
              className="inline-flex items-center self-start bg-rose hover:bg-rose-dark text-white font-sans text-[12px] font-bold tracking-[0.1em] uppercase px-8 py-4 transition-colors duration-200 min-h-[48px] no-underline"
            >
              Download the referral one-pager
            </Link>
          </div>
        </div>
      </section>

      {/* What happens after — the loop that earns repeat referrals */}
      <section className="bg-stone px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[560px] mb-14 reveal">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-text mb-6">
              What happens after you refer
            </h2>
            <p className="font-sans text-[16px] text-muted leading-[1.7]">
              Four steps from your referral to a report back on your desk.
            </p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {afterSteps.map((step, i) => (
              <li key={i} className="flex gap-6 reveal">
                <span
                  className="font-display text-[22px] font-light text-gold leading-none pt-1 shrink-0 tabular-nums"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ borderTop: '1px solid var(--color-border)' }} className="pt-4 grow">
                  <h3 className="font-display text-[20px] font-normal text-text mb-2">{step.name}</h3>
                  <p className="font-sans text-[15px] text-muted leading-[1.65] max-w-[42ch]">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Referrer FAQ — FAQPage schema */}
      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-20">
          <div className="md:sticky md:top-28 md:self-start reveal">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-text mb-5">
              Questions from referrers
            </h2>
            <p className="font-sans text-[15px] text-muted leading-[1.7] mb-6 max-w-[260px]">
              What partners ask before sending us their first patient.
            </p>
            <a
              href={`tel:${locations[0].tel}`}
              className="font-sans text-[14px] text-text no-underline hover:underline underline-offset-4"
            >
              Prefer to talk it through? Call {locations[0].telLabel}
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

      {/* Closing — referrer-focused, not the patient booking band */}
      <section className="bg-dark px-6 sm:px-10 md:px-14 py-24 md:py-28">
        <div className="max-w-[720px] mx-auto text-center reveal">
          <h2 className="font-display italic text-[clamp(2rem,4.5vw,3rem)] font-light leading-[1.1] tracking-[-0.02em] text-dark-text mb-6">
            Have a patient in mind?
          </h2>
          <p className="font-sans text-[16px] text-dark-text/80 leading-[1.7] mb-10 max-w-[480px] mx-auto">
            Call the clinic closest to your patient, or send us a fax. We will take it from there and keep you informed.
          </p>
          <p className="font-sans text-[15px] text-dark-text/75">
            {locations.map((loc, i) => (
              <span key={loc.slug}>
                {i > 0 && <span className="px-3 text-dark-text/30">·</span>}
                {loc.name.replace(' Clinic', '')}{' '}
                <a
                  href={`tel:${loc.tel}`}
                  className="text-dark-text font-medium no-underline hover:text-gold transition-colors"
                >
                  {loc.telLabel}
                </a>
              </span>
            ))}
          </p>
        </div>
      </section>
    </>
  )
}
