import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import RevealObserver from '@/components/RevealObserver'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Azalea Physiotherapy collects, uses and protects your personal and health information, in line with BC’s Personal Information Protection Act.',
  alternates: { canonical: '/privacy' },
  robots: { index: false, follow: true },
}

const sections = [
  {
    h: 'What we collect',
    body: 'We collect the personal and health information needed to provide your care and to bill your insurer: your contact details, medical history relevant to treatment, assessment findings, and insurance or claim information.',
  },
  {
    h: 'How we use it',
    body: 'Your information is used to assess and treat you, to coordinate care between practitioners at the clinic, to bill ICBC, WorkSafeBC, or your extended health plan, and to contact you about appointments. We do not sell your information.',
  },
  {
    h: 'Who can see it',
    body: 'Your record is available to the practitioners involved in your care and to the administrative staff who manage booking and billing. We share information with insurers only as needed to process your claim, and otherwise only with your consent or where required by law.',
  },
  {
    h: 'How we protect it',
    body: 'Records are stored securely, access is limited to those who need it, and we retain health records for the period required by BC regulation. You can ask to see your record or to correct it at any time.',
  },
  {
    h: 'Contact',
    body: 'For any question about your information, or to request access or a correction, contact us at info@azaleaphysio.com or call either clinic.',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <RevealObserver />
      <PageHeader
        trail={[{ label: 'Privacy' }]}
        title="Privacy policy."
        lead="Azalea handles your personal and health information in line with British Columbia’s Personal Information Protection Act. Here is what that means in practice."
      />

      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[760px] mx-auto flex flex-col gap-12">
          {sections.map((s) => (
            <div key={s.h} className="reveal">
              <h2 className="font-display italic text-[clamp(1.4rem,2.6vw,1.85rem)] font-light tracking-[-0.02em] text-text mb-3">{s.h}</h2>
              <p className="font-sans text-[16px] text-muted leading-[1.8] max-w-[640px]">{s.body}</p>
            </div>
          ))}
          <p className="font-sans text-[13px] text-muted/80 pt-4">Last updated: June 2026.</p>
        </div>
      </section>
    </>
  )
}
