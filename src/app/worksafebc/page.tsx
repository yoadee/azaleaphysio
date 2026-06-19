import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'
import JsonLd from '@/components/JsonLd'
import { locations, type Faq } from '@/lib/clinic'
import { faqPageSchema, howToSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'WorkSafeBC Physiotherapy in West Vancouver | Direct Billing',
  description:
    'Hurt at work? We are a WorkSafeBC physiotherapy provider in West Vancouver. No referral needed, we bill WorkSafeBC directly, and we manage the reporting for your return to work.',
  alternates: { canonical: '/worksafebc' },
}

const steps = [
  {
    name: 'Report the injury to your employer',
    text: 'Tell your employer as soon as you are hurt, and report the injury to WorkSafeBC. Aim to do this within a few days so your claim is not delayed.',
  },
  {
    name: 'Get your claim number',
    text: 'Once WorkSafeBC opens your claim you are given a claim number. That is what lets us bill them directly for your treatment.',
  },
  {
    name: 'Book your assessment',
    text: 'Call either clinic or book online. No doctor’s referral is needed, and as a WorkSafeBC provider we can see you for your workplace injury straight away.',
  },
  {
    name: 'We manage the reporting',
    text: 'Your physiotherapist treats the injury and handles the WorkSafeBC documentation, including the reporting for a safe, graded return to your job.',
  },
]

const faqs: Faq[] = [
  {
    category: 'insurance',
    q: 'Do you direct-bill WorkSafeBC?',
    a: 'Yes. We are a WorkSafeBC physiotherapy provider, so once your claim is active we bill WorkSafeBC directly for your treatment. There is nothing for you to pay out of pocket for your covered care.',
  },
  {
    category: 'insurance',
    q: 'Do I need a doctor’s referral for WorkSafeBC physiotherapy?',
    a: 'No. You do not need a doctor’s referral to start physiotherapy for a workplace injury. You do need to see a clinic that holds a WorkSafeBC contract, which we do, and you need an active claim number.',
  },
  {
    category: 'insurance',
    q: 'How do I start a WorkSafeBC claim?',
    a: 'Report the injury to your employer right away, then report it to WorkSafeBC by phone or online (1.888.967.5377). Once your claim is opened you receive a claim number, which is all we need to begin treatment and bill them directly.',
  },
  {
    category: 'treatment',
    q: 'What if I am still working, or returning to work?',
    a: 'We treat the injury and document your recovery for WorkSafeBC, including a graded return-to-work plan where one is needed. The goal is to get you back to your job safely, at a pace your body can handle, not to rush it or drag it out.',
  },
  {
    category: 'treatment',
    q: 'What workplace injuries do you treat?',
    a: 'Back and neck strains, shoulder and rotator-cuff injuries, repetitive-strain and overuse injuries, knee and joint injuries, and soft-tissue injuries from a fall or lift. We assess the cause, treat the pain, and rebuild the strength your job demands.',
  },
  {
    category: 'insurance',
    q: 'Can I also see an occupational therapist for my claim?',
    a: 'Often, yes. Where your recovery depends on returning to specific work tasks, occupational therapy can be part of the plan, and we coordinate it with your physiotherapy under one roof rather than sending you to a separate clinic.',
  },
]

const covered = [
  { label: 'Provider status', value: 'WorkSafeBC-contracted physiotherapy clinic' },
  { label: 'Referral', value: 'Not required, just an active claim number' },
  { label: 'Upfront cost', value: 'None, billed directly to WorkSafeBC' },
  { label: 'Included', value: 'Treatment plus return-to-work reporting' },
]

export default function WorkSafeBcPage() {
  return (
    <>
      <RevealObserver />
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd data={howToSchema('How to start WorkSafeBC physiotherapy in West Vancouver', steps)} />

      <PageHeader
        trail={[{ label: 'WorkSafeBC Physiotherapy' }]}
        eyebrow="Hurt at work"
        title="WorkSafeBC physiotherapy in West Vancouver."
        lead="We are a WorkSafeBC physiotherapy provider. Once your claim is active you can start treatment with no referral, we bill WorkSafeBC directly, and we manage the reporting for a safe return to work."
        cta
      />

      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20">
          <div className="reveal">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-text mb-7">
              How WorkSafeBC coverage works
            </h2>
            <p className="font-sans text-[18px] text-text leading-[1.75] max-w-[60ch]">
              If you are injured on the job in BC, WorkSafeBC covers your physiotherapy once your claim is active. You
              do not need a doctor’s referral, but you do need to be treated at a clinic that holds a WorkSafeBC
              contract. We do, so you can start as soon as you have a claim number.
            </p>
            <p className="font-sans text-[17px] text-muted leading-[1.75] max-w-[60ch] mt-6">
              The faster you report the injury and begin treatment, the smoother the recovery and the claim. We treat
              the injury and take care of the WorkSafeBC paperwork, including the documentation for a graded return to
              your role. Where your job involves specific physical demands, the plan is built around getting you back
              to those, not just out of pain.
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

      <section className="bg-dark px-6 sm:px-10 md:px-14 py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[560px] mb-14 md:mb-20 reveal">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-dark-text mb-6">
              How to start
            </h2>
            <p className="font-sans text-[16px] text-dark-text/75 leading-[1.7]">
              Four steps from injury to treatment. We take over the reporting once you are in.
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
                <div style={{ borderTop: '1px solid rgba(232,238,242,0.14)' }} className="pt-4 grow">
                  <h3 className="font-display text-[20px] font-normal text-dark-text mb-2">{step.name}</h3>
                  <p className="font-sans text-[15px] text-dark-text/70 leading-[1.65] max-w-[42ch]">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light tracking-[-0.02em] text-text mb-10 reveal">
            Care for a workplace injury
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: '/conditions/workplace-injuries', name: 'Workplace injuries', desc: 'Strains, overuse, and lifting injuries, with a managed return to work.' },
              { href: '/services/physiotherapy', name: 'Physiotherapy', desc: 'The core assessment and hands-on treatment for your injury.' },
              { href: '/services/occupational-therapy', name: 'Occupational therapy', desc: 'When recovery depends on getting back to specific work tasks safely.' },
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

      <section className="bg-stone px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-20">
          <div className="md:sticky md:top-28 md:self-start reveal">
            <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-text mb-5">
              WorkSafeBC questions
            </h2>
            <p className="font-sans text-[15px] text-muted leading-[1.7] mb-6 max-w-[260px]">
              What injured workers ask most.
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

      <BookCta
        heading="Back to work, properly recovered."
        body="As a WorkSafeBC provider we bill them directly and manage the reporting. No referral, nothing to pay upfront, and usually an appointment inside the week."
      />
    </>
  )
}
