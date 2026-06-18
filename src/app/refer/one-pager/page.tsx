import type { Metadata } from 'next'
import Link from 'next/link'
import PrintButton from '@/components/PrintButton'
import { SITE, locations } from '@/lib/clinic'

export const metadata: Metadata = {
  title: 'Referral One-Pager | Azalea Physiotherapy',
  description: 'A printable one-page referral summary for partners referring to Azalea Physiotherapy.',
  // Print artifact, not a page to rank. Keep it out of the index.
  robots: { index: false, follow: true },
}

const whyRefer = [
  'Same-week appointments, two North Shore locations, open to 7pm and Saturdays',
  'A progress report back to you, with the patient’s consent',
  'Direct billing to ICBC, WorkSafeBC and most extended health plans',
  'Multidisciplinary team under one roof, one coordinated plan',
  'Physiotherapists registered with the College of Physical Therapists of BC',
  'Care in English and Farsi',
]

const treats = [
  'Back and neck pain',
  'ICBC car-accident and whiplash injuries',
  'WorkSafeBC and workplace injuries',
  'Knee, shoulder and joint injuries',
  'Post-surgical rehabilitation',
  'Sports injuries and return to sport',
]

export default function ReferOnePager() {
  return (
    <div className="bg-stone min-h-screen px-4 py-10 print:p-0 print:bg-white">
      {/* Print styles: hide site chrome and the controls, fit one Letter page. */}
      <style>{`
        @media print {
          header[role="banner"], footer, .no-print { display: none !important; }
          @page { size: letter; margin: 14mm; }
          html, body { background: #ffffff !important; }
          .onepager { box-shadow: none !important; border: none !important; margin: 0 !important; max-width: none !important; }
        }
      `}</style>

      {/* Controls (screen only) */}
      <div className="no-print max-w-[760px] mx-auto mb-6 flex items-center justify-between gap-4">
        <Link
          href="/refer"
          className="font-sans text-[13px] text-muted hover:text-text no-underline tracking-[0.04em]"
        >
          ← Back to referrals
        </Link>
        <PrintButton className="inline-flex items-center bg-rose hover:bg-rose-dark text-white font-sans text-[12px] font-bold tracking-[0.1em] uppercase px-7 py-3 transition-colors duration-200 cursor-pointer" />
      </div>

      {/* The leaflet */}
      <article
        className="onepager max-w-[760px] mx-auto p-12 md:p-14 shadow-sm"
        style={{ background: '#ffffff', border: '1px solid var(--color-border)' }}
      >
        {/* Brand */}
        <header className="text-center pb-7 mb-8" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <p className="font-display text-[24px] tracking-[0.16em] uppercase text-text leading-none">
            Azalea Physiotherapy
          </p>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted mt-3">
            Advanced Health Centre · West Vancouver
          </p>
          <p className="font-display italic text-[16px] font-light text-text mt-5">
            We find the cause, not just the symptom.
          </p>
        </header>

        <p className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-muted text-center mb-2">
          For referring partners
        </p>
        <h1 className="font-display italic text-[30px] font-light text-text text-center leading-[1.1] tracking-[-0.01em] mb-9">
          Refer with confidence.
        </h1>

        {/* Two columns: why refer + what we treat */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7 mb-9">
          <div>
            <h2 className="font-sans text-[11px] font-bold tracking-[0.16em] uppercase text-text mb-3">
              Why refer to Azalea
            </h2>
            <ul className="space-y-2">
              {whyRefer.map((item) => (
                <li key={item} className="font-sans text-[13px] text-muted leading-[1.5] flex gap-2">
                  <span className="text-gold leading-[1.5]" aria-hidden="true">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-sans text-[11px] font-bold tracking-[0.16em] uppercase text-text mb-3">
              What we treat
            </h2>
            <ul className="space-y-2">
              {treats.map((item) => (
                <li key={item} className="font-sans text-[13px] text-muted leading-[1.5] flex gap-2">
                  <span className="text-gold leading-[1.5]" aria-hidden="true">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* How to refer */}
        <div className="pt-8 mb-2" style={{ borderTop: '1px solid var(--color-border)' }}>
          <h2 className="font-sans text-[11px] font-bold tracking-[0.16em] uppercase text-text mb-4 text-center">
            How to refer
          </h2>
          <p className="font-sans text-[12px] text-muted leading-[1.5] text-center max-w-[52ch] mx-auto mb-6">
            Call or fax the clinic closest to your patient. For anything with patient health information, please use
            phone or fax rather than email.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {locations.map((loc) => (
              <div key={loc.slug} className="text-center sm:text-left">
                <p className="font-display text-[16px] text-text mb-1">{loc.name.replace(' Clinic', '')}</p>
                <p className="font-sans text-[13px] text-muted leading-[1.7]">
                  {loc.street}, {loc.city} {loc.postal}
                  <br />
                  Tel {loc.telLabel} · Fax {loc.fax}
                  <br />
                  {loc.hours.map((h) => `${h.days} ${h.time}`).join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer strip */}
        <footer
          className="mt-9 pt-6 text-center"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="font-sans text-[11px] text-muted leading-[1.7]">
            CPTBC-registered physiotherapists · Direct billing ICBC, WorkSafeBC and extended health · English &amp; Farsi
          </p>
          <p className="font-sans text-[12px] text-text font-medium tracking-[0.04em] mt-3">
            {SITE.email} · azaleaphysio.com/refer
          </p>
        </footer>
      </article>
    </div>
  )
}
