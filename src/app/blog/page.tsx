import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'

export const metadata: Metadata = {
  title: 'Notes & Articles',
  description:
    'Practical notes on recovery, injury prevention and getting the most from physiotherapy, from the team at Azalea in West Vancouver.',
  alternates: { canonical: '/blog' },
}

// Blog posts are Sanity-driven (see the `post` schema). Until the first posts
// are published, this index shows a considered empty state rather than a 404.
const posts: { slug: string; title: string; excerpt: string; date: string }[] = []

export default function BlogPage() {
  return (
    <>
      <RevealObserver />
      <PageHeader
        trail={[{ label: 'Notes' }]}
        title="Notes from the clinic."
        lead="Practical writing on recovery, injury prevention, and getting the most from your treatment. New pieces from our practitioners are on the way."
      />

      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-28">
        <div className="max-w-[760px] mx-auto reveal">
          {posts.length === 0 ? (
            <div className="text-center py-10">
              <p className="font-display italic text-[clamp(1.5rem,3vw,2rem)] font-light text-text mb-4">
                The first articles are being written.
              </p>
              <p className="font-sans text-[16px] text-muted leading-[1.7] max-w-[480px] mx-auto">
                In the meantime, the{' '}
                <a href="/what-to-expect" className="text-text font-medium no-underline hover:text-rose-dark transition-colors">first-visit guide</a>
                {' '}and the{' '}
                <a href="/faq" className="text-text font-medium no-underline hover:text-rose-dark transition-colors">FAQ</a>
                {' '}cover the questions we hear most.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <BookCta />
    </>
  )
}
