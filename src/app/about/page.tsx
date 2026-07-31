import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageHeader from '@/components/PageHeader'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'

export const metadata: Metadata = {
  title: 'About the Clinic & Our Approach',
  description:
    'Azalea Physiotherapy has served West Vancouver and the North Shore since 2011. Eight practitioners, eleven disciplines, two locations, one connected team.',
  alternates: { canonical: '/about' },
}

const values = [
  { h: 'Find the cause', body: 'Mary built the clinic around one principle: treat what is actually driving the problem, not just the sore spot. It is what patients come back for, and what they tell others about.' },
  { h: 'One team, one record', body: 'Your physiotherapist, kinesiologist, and acupuncturist share a hallway and a chart, not a fax machine. Care moves between them without a fresh referral.' },
  { h: 'Plain language', body: 'You leave the first visit knowing what is wrong, what the plan is, and roughly how long it will take. No jargon, no mystery.' },
  { h: 'Care in your language', body: 'Several practitioners treat in Farsi as well as English, so a community well rooted on the North Shore can be understood, not just treated.' },
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
            Mary Ghoroghi opened Azalea on 16th Street in 2011 and still treats patients most days. Her reputation, the one that brings people across the North Shore, is for finding the cause of a problem when other clinics have only treated the symptom, then explaining it in language that makes sense. That is the standard the whole clinic is built to.
          </p>
          <p className="font-sans text-[18px] text-muted leading-[1.8]">
            Fifteen years on, eight practitioners treat under one roof, and a second clinic on Marine Drive serves the west side of the district. That breadth is the point. A knee that needs physiotherapy, kinesiology, and the occasional acupuncture session is treated by people who share a hallway and a chart, not a fax machine, several of whom treat in Farsi as well as English.
          </p>
          <p className="font-sans text-[18px] text-muted leading-[1.8]">
            We are not trying to be the biggest clinic on the North Shore. We are trying to be the one where your whole recovery happens in one place, handled by people who talk to each other about your case.
          </p>
        </div>
        <div className="max-w-[1100px] mx-auto mt-14 md:mt-16">
          <div className="relative aspect-[16/9] overflow-hidden bg-stone reveal">
            <Image
              src="/about-clinic.webp"
              alt="The reception at Azalea Physiotherapy in West Vancouver, with the clinic logo on the wall"
              fill
              className="object-cover"
              sizes="(max-width: 1100px) 100vw, 1100px"
            />
          </div>
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
            Meet the people who make that possible.
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
