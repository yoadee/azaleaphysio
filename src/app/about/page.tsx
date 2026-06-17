import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Azalea Physiotherapy has served West Vancouver and the North Shore since 2011. Twelve practitioners, ten disciplines, two locations, one connected team.',
  alternates: { canonical: '/about' },
}

const values = [
  { h: 'One team, one record', body: 'Your physiotherapist, kinesiologist, and acupuncturist share a hallway and a chart, not a fax machine. Care moves between them without a fresh referral.' },
  { h: 'Find the cause', body: 'We assess to find what is actually driving the problem, then treat that, rather than chasing the sore spot from visit to visit.' },
  { h: 'Plain language', body: 'You leave the first visit knowing what is wrong, what the plan is, and roughly how long it will take. No jargon, no mystery.' },
  { h: 'Rooted locally', body: 'Fourteen years on the North Shore, and several practitioners who treat in Farsi as well as English, for a community that is well rooted here.' },
]

export default function AboutPage() {
  return (
    <>
      <RevealObserver />
      <PageHeader
        trail={[{ label: 'About' }]}
        title="A clinic that grew up on the North Shore."
        lead="Azalea opened on 16th Street in 2011 with a simple idea: a patient should not have to drive across the Lower Mainland to assemble their own care."
      />

      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[760px] mx-auto flex flex-col gap-6 reveal">
          <p className="font-sans text-[18px] text-text leading-[1.8]">
            Fourteen years on, twelve practitioners treat under one roof, and a second clinic on Marine Drive serves the west side of the district. That breadth is the point. A knee that needs physiotherapy, kinesiology, and the occasional acupuncture session is treated by people who work from the same notes.
          </p>
          <p className="font-sans text-[18px] text-muted leading-[1.8]">
            We are not trying to be the biggest clinic on the North Shore. We are trying to be the one where your whole recovery happens in one place, handled by people who talk to each other about your case.
          </p>
        </div>
      </section>

      <section className="bg-dark px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-14">
            {values.map((v) => (
              <div key={v.h} className="reveal">
                <h2 className="font-display italic text-[24px] font-light text-dark-text mb-3">{v.h}</h2>
                <p className="font-sans text-[15px] text-dark-text/80 leading-[1.7] max-w-[440px]">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone px-6 sm:px-10 md:px-14 py-16">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <p className="font-display italic text-[clamp(1.5rem,3vw,2rem)] font-light text-text max-w-[560px]">
            Meet the twelve people who make that possible.
          </p>
          <Link href="/team" className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-text hover:text-rose-dark no-underline transition-colors shrink-0">
            See the team →
          </Link>
        </div>
      </section>

      <BookCta />
    </>
  )
}
