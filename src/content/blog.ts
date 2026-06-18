/**
 * Blog content model for the Azalea "Notes" section.
 *
 * Articles are authored as local typed data (the same pattern as src/lib/clinic.ts)
 * so the blog is fully live without CMS entry. The shape mirrors the Sanity `post`
 * schema (title, slug, excerpt, author, publishedAt, body, categories, seoTitle,
 * seoDescription) so it can migrate to Sanity later: body blocks map to Portable
 * Text, authorSlug maps to the practitioner reference, keyTakeaways/faqs become
 * Portable Text sections.
 *
 * Each article lives in src/content/posts/<slug>.ts and is registered in the
 * posts array in src/content/posts/index.ts.
 */
import type { Faq } from '@/lib/clinic'

// A single block of article body. Kept deliberately small and serialisable so it
// maps cleanly to Sanity Portable Text on migration.
export type ArticleBlock =
  | { type: 'p'; text: string } // paragraph; supports inline [label](/path) links and **bold**
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; title?: string; text: string } // highlighted note / key point
  | { type: 'quote'; text: string; cite?: string }

export type BlogCategory =
  | 'ICBC & Insurance'
  | 'Injuries & Conditions'
  | 'How Physiotherapy Works'
  | 'Recovery & Prevention'

export type BlogPost = {
  slug: string
  title: string // H1
  seoTitle?: string // <title> when it should differ from the H1
  excerpt: string // meta description + index card
  targetKeyword: string // primary keyword this piece targets (internal note)
  category: BlogCategory
  authorSlug: string // practitioner slug, for E-E-A-T attribution
  publishedAt: string // ISO date
  updatedAt?: string // ISO date; defaults to publishedAt
  readingMinutes: number
  // Answer-first summary. Each line is a self-contained, quotable claim (~15-20
  // words) for AI extraction. Rendered as a "Key takeaways" panel near the top.
  keyTakeaways: string[]
  body: ArticleBlock[]
  faqs: Faq[] // 4-6; answers 30-50 words. Feeds FAQPage JSON-LD.
  relatedServices?: string[] // service slugs, for internal links
  relatedConditions?: string[] // condition slugs
  cta?: { heading?: string; body?: string } // overrides the default closing CTA
}

// Rough reading time when an article omits one (200 wpm over body + takeaways).
export function estimateReadingMinutes(post: Pick<BlogPost, 'body' | 'keyTakeaways'>): number {
  const text =
    post.keyTakeaways.join(' ') +
    ' ' +
    post.body
      .map((b) => {
        if ('text' in b) return b.text
        if ('items' in b) return b.items.join(' ')
        return ''
      })
      .join(' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(3, Math.round(words / 200))
}
