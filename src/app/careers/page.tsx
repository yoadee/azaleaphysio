import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import RevealObserver from '@/components/RevealObserver'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join Azalea Physiotherapy in West Vancouver. We hire physiotherapists, kinesiologists and allied practitioners who want to work as part of a connected team.',
  alternates: { canonical: '/careers' },
}

export default function CareersPage() {
  return (
    <>
      <RevealObserver />
      <PageHeader
        trail={[{ label: 'Careers' }]}
        title="Work at Azalea."
        lead="We are a multidisciplinary clinic that treats as one team. If that is how you like to practise, we would like to hear from you."
      />

      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[760px] mx-auto flex flex-col gap-6 reveal">
          <p className="font-sans text-[18px] text-text leading-[1.8]">
            Azalea brings physiotherapy, kinesiology, osteopathy, acupuncture, and more under one roof across two West Vancouver locations. Practitioners here share notes and patients, so your work fits into a fuller plan rather than standing alone.
          </p>
          <p className="font-sans text-[16px] text-muted leading-[1.8]">
            We hire for clinical depth and for the willingness to talk to colleagues about a shared case. Roles open across disciplines, and we particularly value practitioners who treat in Farsi as well as English.
          </p>
          <div className="mt-6 p-8 bg-stone reveal">
            <p className="font-display italic text-[20px] font-light text-text mb-3">Interested?</p>
            <p className="font-sans text-[15px] text-muted leading-[1.7] mb-5">
              Send a short note and your CV. We read every application and reply to the ones that fit.
            </p>
            <a
              href="mailto:info@azaleaphysio.com?subject=Careers at Azalea"
              className="inline-flex items-center bg-rose hover:bg-rose-dark text-white font-sans text-[11px] font-bold tracking-[0.1em] uppercase px-7 py-4 transition-colors duration-200 min-h-[48px] no-underline"
            >
              Email us your CV
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
