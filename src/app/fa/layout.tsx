import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import Link from 'next/link'
import Logo from '@/components/Logo'
import FaLangDir from '@/components/FaLangDir'
import { SITE, locations } from '@/lib/clinic'

// Proper Persian webfont. Spectral/Satoshi are Latin-only and render Farsi via an
// inconsistent system fallback, so the Farsi section gets Vazirmatn instead. The
// warm-stone palette, rose CTA and spacing carry the brand; the typeface adapts.
const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-vazirmatn',
})

export const metadata: Metadata = {
  title: {
    default: 'فیزیوتراپی فارسی‌زبان در وست ونکوور | آزالیا',
    template: '%s | آزالیا فیزیوتراپی',
  },
}

export default function FaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className={`${vazirmatn.variable} bg-bg`} style={{ fontFamily: 'var(--font-vazirmatn), sans-serif' }}>
      <FaLangDir />

      {/* Farsi header — focused chrome: brand, call, book. No links into the
          English site, by design. */}
      <header className="absolute top-0 inset-x-0 z-50 px-6 sm:px-10 md:px-14 py-7 flex items-center justify-between">
        <Link href="/fa" aria-label="آزالیا فیزیوتراپی، خانه" className="no-underline text-text">
          <Logo className="font-display text-[17px] tracking-[0.1em] uppercase" markSize={28} />
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href={`tel:${locations[0].tel}`}
            className="hidden sm:inline-flex items-center text-[13px] font-medium text-text hover:text-rose-dark transition-colors no-underline"
          >
            {locations[0].telLabel}
          </a>
          <a
            href={SITE.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-rose hover:bg-rose-dark text-white text-[12px] font-bold px-6 py-[10px] transition-colors duration-200 no-underline"
          >
            رزرو نوبت
          </a>
        </div>
      </header>

      {children}

      {/* Farsi footer — NAP + phones for both clinics, kept in the language. */}
      <footer className="bg-dark px-6 sm:px-10 md:px-14 py-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] gap-10 pb-10" style={{ borderBottom: '1px solid rgba(232,238,242,0.1)' }}>
            <div>
              <Logo className="font-display text-[18px] tracking-[0.12em] uppercase text-dark-text" markSize={30} />
              <p className="text-[14px] text-dark-text/70 leading-[1.9] mt-5 max-w-[300px]">
                کلینیک فیزیوتراپی چندتخصصی در وست ونکوور، با تیمی که به فارسی و انگلیسی درمان می‌کند. از سال ۲۰۱۱ در نورت شور.
              </p>
            </div>
            {locations.map((loc, i) => (
              <div key={loc.slug}>
                <p className="font-display text-[16px] text-dark-text mb-3">
                  {i === 0 ? 'کلینیک خیابان ۱۶' : 'کلینیک اوشن واک'}
                </p>
                <div className="text-[14px] text-dark-text/65 leading-[2]" dir="ltr" style={{ textAlign: 'right' }}>
                  <p>{loc.street}</p>
                  <p>{loc.city} {loc.postal}</p>
                  <a href={`tel:${loc.tel}`} className="block text-dark-text/85 hover:text-dark-text no-underline transition-colors mt-1">
                    {loc.telLabel}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-6 flex flex-col sm:flex-row justify-between gap-2 text-[12px] text-dark-text/45">
            <span>© ۲۰۲۶ آزالیا فیزیوتراپی، وست ونکوور</span>
            <Link href="/" className="text-dark-text/55 hover:text-dark-text no-underline transition-colors">
              English site →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
