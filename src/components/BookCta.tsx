import { locations } from '@/lib/clinic'

/**
 * Reusable dark booking band for the foot of inner pages. Single primary CTA
 * (lowest-friction at the highest-intent moment), both clinic numbers below.
 */
export default function BookCta({
  heading = 'Let’s find out what is actually wrong.',
  body = 'No referral, no insurance bill to pay upfront, and usually an appointment inside the week. Call the clinic closest to you.',
}: {
  heading?: string
  body?: string
}) {
  return (
    <section className="bg-dark px-6 sm:px-10 md:px-14 py-24 md:py-28">
      <div className="max-w-[720px] mx-auto text-center reveal">
        <h2 className="font-display italic text-[clamp(2.25rem,5vw,3.5rem)] font-light leading-[1.06] tracking-[-0.02em] text-dark-text mb-6">
          {heading}
        </h2>
        <p className="font-sans text-[16px] text-dark-text/80 leading-[1.7] mb-10 max-w-[480px] mx-auto">
          {body}
        </p>
        <a
          href={`tel:${locations[0].tel}`}
          className="inline-flex items-center bg-rose hover:bg-rose-dark text-white font-sans text-[12px] font-bold tracking-[0.12em] uppercase px-12 py-5 transition-colors duration-200 mb-9 min-h-[52px] no-underline"
        >
          Book an appointment
        </a>
        <p className="font-sans text-[13px] text-dark-text/65">
          {locations.map((loc, i) => (
            <span key={loc.slug}>
              {i > 0 && <span className="px-3 text-dark-text/30">·</span>}
              {loc.name.replace(' Clinic', '')}{' '}
              <a
                href={`tel:${loc.tel}`}
                className="text-dark-text font-medium no-underline hover:text-gold transition-colors"
              >
                {loc.telLabel}
              </a>
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
