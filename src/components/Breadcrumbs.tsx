import Link from 'next/link'
import { SITE } from '@/lib/clinic'

export type Crumb = { label: string; href?: string }

/**
 * Visual breadcrumb trail plus matching BreadcrumbList JSON-LD.
 * Pass the full trail including the current page (last item, no href).
 */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const items = [{ label: 'Home', href: '/' }, ...trail]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE.url}${c.href === '/' ? '' : c.href}` } : {}),
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="font-sans text-[12px] tracking-[0.02em]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 list-none">
        {items.map((c, i) => {
          const last = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-x-2">
              {c.href && !last ? (
                <Link href={c.href} className="text-muted hover:text-text no-underline transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className="text-text" aria-current="page">{c.label}</span>
              )}
              {!last && <span className="text-muted/50" aria-hidden="true">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
