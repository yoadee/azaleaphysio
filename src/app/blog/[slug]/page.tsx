import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import BookCta from '@/components/BookCta'
import RevealObserver from '@/components/RevealObserver'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { renderInline } from '@/components/RichText'
import { posts, postBySlug, relatedPosts } from '@/content/posts'
import { practitionerBySlug, serviceBySlug, conditionBySlug, SITE, locations } from '@/lib/clinic'
import { articleSchema, faqPageSchema } from '@/lib/schema'
import type { ArticleBlock } from '@/content/blog'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

const dateLabel = (iso: string) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = postBySlug(slug)
  if (!post) return {}
  const author = practitionerBySlug(post.authorSlug)
  return {
    title: post.seoTitle ?? post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.seoTitle ?? post.title,
      description: post.excerpt,
      url: `${SITE.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: author ? [author.name] : undefined,
      images: post.coverImage
        ? [{ url: `${SITE.url}${post.coverImage}`, width: 1280, height: 720, alt: post.title }]
        : undefined,
    },
  }
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="font-display italic text-[clamp(1.6rem,3vw,2.1rem)] font-light leading-[1.15] tracking-[-0.02em] text-text mt-14 mb-5 reveal">
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 className="font-display text-[20px] font-normal text-text mt-9 mb-3 reveal">{block.text}</h3>
      )
    case 'p':
      return (
        <p className="font-sans text-[17px] text-text/90 leading-[1.8] mb-6 reveal">{renderInline(block.text)}</p>
      )
    case 'ul':
      return (
        <ul className="list-none flex flex-col gap-3 mb-7 reveal">
          {block.items.map((it, i) => (
            <li key={i} className="font-sans text-[17px] text-text/90 leading-[1.7] ps-6 relative">
              <span className="absolute inset-inline-start-0 text-gold" aria-hidden="true">
                —
              </span>
              {renderInline(it)}
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="list-none flex flex-col gap-4 mb-7 reveal counter-reset">
          {block.items.map((it, i) => (
            <li key={i} className="font-sans text-[17px] text-text/90 leading-[1.7] flex gap-4">
              <span className="font-display text-[18px] text-gold leading-tight shrink-0 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{renderInline(it)}</span>
            </li>
          ))}
        </ol>
      )
    case 'callout':
      return (
        <aside className="bg-stone border-s-2 border-gold px-6 py-5 mb-7 reveal">
          {block.title && (
            <p className="font-sans text-[11px] font-semibold tracking-[0.14em] uppercase text-muted mb-2">
              {block.title}
            </p>
          )}
          <p className="font-sans text-[16px] text-text leading-[1.7]">{renderInline(block.text)}</p>
        </aside>
      )
    case 'quote':
      return (
        <figure className="my-9 reveal">
          <blockquote className="font-display italic text-[clamp(1.4rem,2.6vw,1.9rem)] font-light leading-[1.4] text-text ps-6 border-s-2 border-border">
            {block.text}
          </blockquote>
          {block.cite && <figcaption className="font-sans text-[13px] text-muted mt-3 ps-6">{block.cite}</figcaption>}
        </figure>
      )
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = postBySlug(slug)
  if (!post) notFound()

  const author = practitionerBySlug(post.authorSlug)
  const services = (post.relatedServices ?? [])
    .map(serviceBySlug)
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
  const conditions = (post.relatedConditions ?? [])
    .map(conditionBySlug)
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
  const related = relatedPosts(post.slug)

  return (
    <>
      <RevealObserver />
      <JsonLd
        data={articleSchema({
          slug: post.slug,
          title: post.title,
          description: post.excerpt,
          authorName: author?.name ?? SITE.name,
          authorRole: author?.role ?? 'Physiotherapist',
          authorSlug: post.authorSlug,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
        })}
      />
      {post.faqs.length > 0 && <JsonLd data={faqPageSchema(post.faqs)} />}

      {/* Header */}
      <header className="bg-stone px-6 sm:px-10 md:px-14 pt-36 pb-14 md:pt-40 md:pb-16">
        <div className="max-w-[760px] mx-auto">
          <Breadcrumbs trail={[{ label: 'Notes', href: '/blog' }, { label: post.title }]} />
          <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-muted mt-8 mb-4">
            {post.category}
          </p>
          <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-light italic leading-[1.08] tracking-[-0.02em] text-text">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-7 font-sans text-[13px] text-muted">
            {author && (
              <Link href={`/team/${author.slug}`} className="text-text font-medium no-underline hover:text-rose-dark transition-colors">
                {author.name}
              </Link>
            )}
            {author && <span className="text-muted/50" aria-hidden="true">·</span>}
            <span>{author?.role ?? 'Azalea Physiotherapy'}</span>
            <span className="text-muted/50" aria-hidden="true">·</span>
            <time dateTime={post.publishedAt}>{dateLabel(post.publishedAt)}</time>
            <span className="text-muted/50" aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </div>
      </header>

      {/* Cover image — matches the article column width, quiet editorial banner */}
      {post.coverImage && (
        <div className="bg-bg px-6 sm:px-10 md:px-14 pt-10 md:pt-12">
          <div className="max-w-[760px] mx-auto">
            <div className="relative aspect-[16/9] overflow-hidden bg-stone reveal">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 760px) 100vw, 760px"
              />
            </div>
          </div>
        </div>
      )}

      {/* Key takeaways — answer-first AEO panel */}
      {post.keyTakeaways.length > 0 && (
        <section className="bg-bg px-6 sm:px-10 md:px-14 pt-12 md:pt-16">
          <div className="max-w-[760px] mx-auto">
            <div className="bg-dark px-7 py-8 md:px-9 md:py-9 reveal">
              <p className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase text-gold mb-5">
                Key takeaways
              </p>
              <ul className="list-none flex flex-col gap-4">
                {post.keyTakeaways.map((t, i) => (
                  <li key={i} className="font-sans text-[15px] text-dark-text/90 leading-[1.6] ps-6 relative">
                    <span className="absolute inset-inline-start-0 text-gold" aria-hidden="true">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Body */}
      <article className="bg-bg px-6 sm:px-10 md:px-14 pt-10 md:pt-12 pb-16 md:pb-20">
        <div className="max-w-[760px] mx-auto">
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </article>

      {/* FAQ — feeds FAQPage schema */}
      {post.faqs.length > 0 && (
        <section className="bg-stone px-6 sm:px-10 md:px-14 py-16 md:py-20">
          <div className="max-w-[760px] mx-auto">
            <h2 className="font-display italic text-[clamp(1.6rem,3vw,2.1rem)] font-light tracking-[-0.02em] text-text mb-8 reveal">
              Common questions
            </h2>
            <dl style={{ borderTop: '1px solid var(--color-border)' }}>
              {post.faqs.map((f, i) => (
                <div key={i} className="py-6 reveal" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <dt className="font-display text-[19px] font-normal text-text leading-[1.35] mb-2.5 max-w-[44ch]">{f.q}</dt>
                  <dd className="font-sans text-[16px] text-muted leading-[1.75] max-w-[64ch]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Related services / conditions — internal links carrying booking intent */}
      {(services.length > 0 || conditions.length > 0) && (
        <section className="bg-bg px-6 sm:px-10 md:px-14 py-16 md:py-20">
          <div className="max-w-[760px] mx-auto">
            <h2 className="font-sans text-[11px] uppercase tracking-[0.16em] text-muted mb-7 reveal">How we can help</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((s) => (
                <Link
                  key={`s-${s.slug}`}
                  href={`/services/${s.slug}`}
                  className="group no-underline p-6 reveal transition-colors hover:bg-stone flex flex-col gap-1.5"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-muted">Service</p>
                  <p className="font-display italic text-[20px] font-light text-text group-hover:translate-x-1 transition-transform duration-300">{s.name}</p>
                </Link>
              ))}
              {conditions.map((c) => (
                <Link
                  key={`c-${c.slug}`}
                  href={`/conditions/${c.slug}`}
                  className="group no-underline p-6 reveal transition-colors hover:bg-stone flex flex-col gap-1.5"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-muted">Condition</p>
                  <p className="font-display italic text-[20px] font-light text-text group-hover:translate-x-1 transition-transform duration-300">{c.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Author strip — E-E-A-T */}
      {author && (
        <section className="bg-stone px-6 sm:px-10 md:px-14 py-12" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="max-w-[760px] mx-auto reveal">
            <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-muted mb-3">Written by</p>
            <Link href={`/team/${author.slug}`} className="no-underline group">
              <p className="font-display italic text-[22px] font-light text-text group-hover:text-rose-dark transition-colors">{author.name}</p>
            </Link>
            <p className="font-sans text-[13px] uppercase tracking-[0.1em] text-muted mt-1 mb-3">{author.role}</p>
            {/* Author strip shows the credentials paragraph only; full bio lives on the team page.
                text-text/70 (not text-muted): muted on stone falls just under AA contrast. */}
            <p className="font-sans text-[15px] text-text/70 leading-[1.7] max-w-[600px]">{author.bio.split('\n\n')[0]}</p>
          </div>
        </section>
      )}

      {/* Related reading */}
      {related.length > 0 && (
        <section className="bg-bg px-6 sm:px-10 md:px-14 py-16 md:py-20">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="font-display italic text-[clamp(1.6rem,3vw,2.1rem)] font-light tracking-[-0.02em] text-text mb-8 reveal">
              Keep reading
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group no-underline p-6 reveal transition-colors hover:bg-stone flex flex-col gap-2"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-muted">{p.category}</p>
                  <p className="font-display italic text-[19px] font-light text-text leading-[1.25]">{p.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <BookCta heading={post.cta?.heading} body={post.cta?.body} />
    </>
  )
}
