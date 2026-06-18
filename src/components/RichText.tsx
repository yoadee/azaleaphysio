import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'

// Matches an inline markdown link [label](href) or **bold** run.
const TOKEN = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g
const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/
const BOLD = /^\*\*([^*]+)\*\*$/

/**
 * Renders a plain string with lightweight inline formatting: internal/external
 * links via [label](/path) and emphasis via **bold**. Keeps article body data
 * serialisable (plain strings) while still allowing the internal links that carry
 * SEO and booking intent.
 */
export function renderInline(text: string): ReactNode[] {
  return text.split(TOKEN).map((part, i) => {
    const link = part.match(LINK)
    if (link) {
      const [, label, href] = link
      if (href.startsWith('/')) {
        return (
          <Link
            key={i}
            href={href}
            className="text-text underline underline-offset-[3px] decoration-border hover:decoration-text transition-colors"
          >
            {label}
          </Link>
        )
      }
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text underline underline-offset-[3px] decoration-border hover:decoration-text transition-colors"
        >
          {label}
        </a>
      )
    }
    const bold = part.match(BOLD)
    if (bold) {
      return (
        <strong key={i} className="font-semibold text-text">
          {bold[1]}
        </strong>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}
