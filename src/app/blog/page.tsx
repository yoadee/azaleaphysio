import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageHeader from '@/components/PageHeader'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'
import { posts } from '@/content/posts'
import { practitionerBySlug } from '@/lib/clinic'

export const metadata: Metadata = {
  title: 'Physiotherapy Notes & Articles',
  description:
    'Practical, evidence-informed writing on injuries, recovery, ICBC, and getting the most from physiotherapy, from the practitioners at Azalea in West Vancouver.',
  alternates: { canonical: '/blog' },
}

const CATEGORY_ORDER = ['ICBC & Insurance', 'Injuries & Conditions', 'How Physiotherapy Works', 'Recovery & Prevention']

export default function BlogPage() {
  const featured = posts[0]
  const rest = posts.slice(1)
  const featuredAuthor = featured ? practitionerBySlug(featured.authorSlug) : undefined

  // Group the remaining posts by category, in the preferred order.
  const grouped = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: rest.filter((p) => p.category === cat),
  })).filter((g) => g.items.length > 0)

  return (
    <>
      <RevealObserver />
      <PageHeader
        trail={[{ label: 'Notes' }]}
        title="Notes from the clinic."
        lead="Practical, evidence-informed writing on injuries, recovery, insurance, and getting the most from your treatment, from the practitioners who do the work."
      />

      {/* Featured (newest) */}
      {featured && (
        <section className="bg-bg px-6 sm:px-10 md:px-14 pt-16 md:pt-20 pb-4">
          <div className="max-w-[1100px] mx-auto">
            <Link
              href={`/blog/${featured.slug}`}
              className="group no-underline block reveal transition-colors hover:bg-stone"
              style={{ border: '1px solid var(--color-border)' }}
            >
              {featured.coverImage && (
                <div className="relative aspect-[2/1] overflow-hidden bg-stone">
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
                    sizes="(max-width: 1100px) 100vw, 1100px"
                  />
                </div>
              )}
              <div className="p-8 sm:p-10 md:p-12">
                <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-5">
                  Latest · {featured.category}
                </p>
                <h2 className="font-display italic text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.1] tracking-[-0.02em] text-text mb-4 max-w-[760px] group-hover:text-rose-dark transition-colors">
                  {featured.title}
                </h2>
                <p className="font-sans text-[17px] text-muted leading-[1.7] max-w-[620px] mb-5">{featured.excerpt}</p>
                <p className="font-sans text-[13px] text-muted">
                  {featuredAuthor ? `${featuredAuthor.name} · ` : ''}{featured.readingMinutes} min read
                </p>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Grouped list */}
      <section className="bg-bg px-6 sm:px-10 md:px-14 py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-16">
          {grouped.map(({ cat, items }) => (
            <div key={cat}>
              <h2 className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted mb-7 reveal">{cat}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((p) => {
                  const a = practitionerBySlug(p.authorSlug)
                  return (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group no-underline reveal transition-colors hover:bg-stone flex flex-col"
                      style={{ border: '1px solid var(--color-border)' }}
                    >
                      {p.coverImage && (
                        <div className="relative aspect-[16/10] overflow-hidden bg-stone">
                          <Image
                            src={p.coverImage}
                            alt={p.title}
                            fill
                            className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col gap-3 grow">
                        <p className="font-display italic text-[20px] font-light text-text leading-[1.25] group-hover:translate-x-1 transition-transform duration-300">
                          {p.title}
                        </p>
                        <p className="font-sans text-[14px] text-muted leading-[1.6] grow">{p.excerpt}</p>
                        <p className="font-sans text-[12px] text-muted/80">
                          {a ? `${a.name} · ` : ''}{p.readingMinutes} min read
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <BookCta />
    </>
  )
}
