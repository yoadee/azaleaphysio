import Breadcrumbs, { type Crumb } from './Breadcrumbs'

/**
 * Standard inner-page header on the stone panel: breadcrumbs, an optional
 * eyebrow, the H1 in Spectral italic, and an optional lead paragraph.
 */
export default function PageHeader({
  title,
  lead,
  eyebrow,
  trail,
}: {
  title: string
  lead?: string
  eyebrow?: string
  trail: Crumb[]
}) {
  return (
    <header className="bg-stone px-6 sm:px-10 md:px-14 pt-36 pb-16 md:pt-40 md:pb-20">
      <div className="max-w-[1200px] mx-auto">
        <Breadcrumbs trail={trail} />
        {eyebrow && (
          <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-muted mt-8 mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-light italic leading-[1.05] tracking-[-0.02em] text-text mt-7 max-w-[840px]">
          {title}
        </h1>
        {lead && (
          <p className="font-sans text-[17px] text-muted leading-[1.65] mt-7 max-w-[620px]">
            {lead}
          </p>
        )}
      </div>
    </header>
  )
}
