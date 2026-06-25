import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'
import JsonLd from '@/components/JsonLd'
import { howToSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Your First Physiotherapy Visit',
  description:
    'Exactly what happens at your first physiotherapy visit at Azalea in West Vancouver, step by step. No referral needed, and treatment starts the same day.',
  alternates: { canonical: '/what-to-expect' },
}

const steps = [
  { name: 'Book', text: 'Reserve by phone. No referral is needed, and most new patients are seen within the same week.' },
  { name: 'Check in', text: 'Arrive ten minutes early to fill in a short intake form. Bring your insurance details so we can set up direct billing before you are seen.' },
  { name: 'Tell us the story', text: 'Your practitioner asks how the injury happened, what makes it better or worse, and what you are hoping to get back to.' },
  { name: 'Get assessed', text: 'They examine how the area moves and where it hurts, to find the cause rather than just the sore spot. Wear or bring clothing you can move in.' },
  { name: 'Hear the plan in plain language', text: 'Your practitioner explains what they found, what is likely going on, and how many visits it should take.' },
  { name: 'Start treatment the same day', text: 'Most first visits include hands-on treatment and a few exercises to begin at home. You do not leave with only a diagnosis.' },
  { name: 'Book your follow-up', text: 'We schedule the next visit and set up any direct billing before you go.' },
]

const bring = [
  'A piece of photo ID',
  'Your insurance or extended health details',
  'Your ICBC or WorkSafeBC claim number, if you have one',
  'Clothing you can move comfortably in',
  'Any relevant scans, reports or surgical notes, if you have them',
]

export default function WhatToExpectPage() {
  return (
    <>
      <RevealObserver />
      <JsonLd data={howToSchema('Your first physiotherapy visit at Azalea', steps)} />
      <PageHeader
        trail={[{ label: 'Your First Visit' }]}
        title="Your first visit."
        lead="If you have never been to a physiotherapist, or your last one was not much help, here is exactly what happens, start to finish. There is nothing to prepare for and no test to pass. Just come as you are."
      />

      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[820px] mx-auto">
          <ol className="list-none" style={{ borderTop: '1px solid var(--color-border)' }}>
            {steps.map((s, i) => (
              <li
                key={i}
                className="grid grid-cols-[44px_1fr] sm:grid-cols-[72px_1fr] gap-4 sm:gap-8 py-8 reveal"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <span className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-light text-gold leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="font-display italic text-[22px] font-light text-text mb-2">{s.name}</h2>
                  <p className="font-sans text-[16px] text-muted leading-[1.7] max-w-[560px]">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-stone px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[820px] mx-auto reveal">
          <h2 className="font-display italic text-[clamp(1.75rem,3.4vw,2.5rem)] font-light tracking-[-0.02em] text-text mb-8">What to bring</h2>
          <ul className="list-none grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
            {bring.map((b, i) => (
              <li key={i} className="font-sans text-[16px] text-text leading-[1.6] py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                {b}
              </li>
            ))}
          </ul>
          <p className="font-sans text-[15px] text-muted leading-[1.75] mt-10 max-w-[620px]">
            First visits run about 45 to 60 minutes. When you are ready, call the clinic closest to you. 16th Street at (604) 281-3345, or Ocean Walk at (604) 281-3122.
          </p>
        </div>
      </section>

      <BookCta heading="Ready when you are." />
    </>
  )
}
