import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'
import FaqAccordion from '@/components/FaqAccordion'
import JsonLd from '@/components/JsonLd'
import { faqs } from '@/lib/clinic'
import { faqPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Referrals, insurance, ICBC claims, first visits, pricing and locations. Common questions about physiotherapy at Azalea in West Vancouver, answered.',
  alternates: { canonical: '/faq' },
}

const groups: { title: string; key: string }[] = [
  { title: 'Booking', key: 'booking' },
  { title: 'Insurance and billing', key: 'insurance' },
  { title: 'Treatment', key: 'treatment' },
  { title: 'General', key: 'general' },
]

export default function FaqPage() {
  return (
    <>
      <RevealObserver />
      <JsonLd data={faqPageSchema(faqs)} />
      <PageHeader
        trail={[{ label: 'FAQ' }]}
        title="Questions, answered."
        lead="The things new patients ask most, about referrals, insurance, ICBC, and what a first visit actually involves."
      />

      <section className="bg-bg px-6 sm:px-10 md:px-14 py-16 md:py-24">
        <div className="max-w-[820px] mx-auto flex flex-col gap-16">
          {groups.map((g) => {
            const items = faqs.filter((f) => f.category === g.key)
            if (!items.length) return null
            return (
              <div key={g.key} className="reveal">
                <h2 className="font-sans text-[11px] uppercase tracking-[0.16em] text-muted mb-5">{g.title}</h2>
                <FaqAccordion items={items} startOpen={null} />
              </div>
            )
          })}
        </div>
      </section>

      <BookCta />
    </>
  )
}
