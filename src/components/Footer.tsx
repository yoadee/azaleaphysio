'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

const services = [
  { href: '/services/physiotherapy', label: 'Physiotherapy' },
  { href: '/services/sports-injury', label: 'Sports Injury' },
  { href: '/services/acupuncture', label: 'Acupuncture' },
  { href: '/services/massage-therapy', label: 'Massage Therapy' },
  { href: '/services/occupational-therapy', label: 'Occupational Therapy' },
  { href: '/services/kinesiology', label: 'Kinesiology' },
  { href: '/services/osteopathy', label: 'Osteopathy' },
  { href: '/services/chiropractic', label: 'Chiropractic' },
  { href: '/services/weight-loss', label: 'Weight Loss Program' },
  { href: '/services/yoga-therapy', label: 'Yoga Therapy' },
  { href: '/services/elderly-care', label: 'Elderly Care (ECP)' },
]

const clinicLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/team', label: 'Meet the Team' },
  { href: '/locations', label: 'Locations' },
  { href: '/insurance', label: 'Insurance & Billing' },
  { href: '/icbc', label: 'ICBC Physiotherapy' },
  { href: '/worksafebc', label: 'WorkSafeBC' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/refer', label: 'Refer a Patient' },
  { href: '/careers', label: 'Careers' },
  { href: '/privacy', label: 'Privacy Policy' },
]

export default function Footer() {
  const pathname = usePathname()
  // The /fa Farsi section ships its own RTL footer; hide the English one there.
  if (pathname === '/fa' || pathname.startsWith('/fa/')) return null

  return (
    <footer style={{ background: 'var(--color-footer)' }} className="px-14 pt-16 pb-9">
      <div className="max-w-[1200px] mx-auto">

        {/* Brand sign — the full lockup; sits on near-black like the wall sign. */}
        <div className="pb-12 mb-12" style={{ borderBottom: '1px solid rgba(232,238,242,0.08)' }}>
          <Logo
            className="font-display text-[15px] sm:text-[16px] md:text-[18px] tracking-[0.1em] sm:tracking-[0.12em] uppercase text-dark-text"
            markClass="w-8 h-8 sm:w-[34px] sm:h-[34px]"
            subline
            gapClass="gap-3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 pb-12"
          style={{ borderBottom: '1px solid rgba(232,238,242,0.05)' }}>

          {/* Brand */}
          <div>
            <p className="font-display italic text-[14px] text-dark-text/55 mb-6 max-w-[280px]">
              Multidisciplinary physiotherapy, rooted on the North Shore since 2011.
            </p>
            <div className="text-[13px] text-dark-text/65 leading-[2.2]">
              <a href="mailto:info@azaleaphysio.com"
                className="block hover:text-dark-text transition-colors no-underline">
                info@azaleaphysio.com
              </a>
              <a href="tel:+16042813345"
                className="block hover:text-dark-text transition-colors no-underline">
                (604) 281-3345 · 16th Street
              </a>
              <a href="tel:+16042813122"
                className="block hover:text-dark-text transition-colors no-underline">
                (604) 281-3122 · Ocean Walk
              </a>
            </div>
            <div className="flex gap-5 mt-6">
              <a href="https://www.instagram.com/azaleaphysiowestvancouver/" target="_blank" rel="noopener noreferrer"
                className="text-[12px] tracking-[0.06em] text-dark-text/60 hover:text-dark-text no-underline transition-colors">
                Instagram
              </a>
              <a href="https://www.facebook.com/AzaleaPhysio/" target="_blank" rel="noopener noreferrer"
                className="text-[12px] tracking-[0.06em] text-dark-text/60 hover:text-dark-text no-underline transition-colors">
                Facebook
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-dark-text/55 mb-4">
              Services
            </h4>
            {services.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block text-[13px] text-dark-text/60 hover:text-dark-text no-underline mb-2 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Clinic */}
          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-dark-text/55 mb-4">
              Clinic
            </h4>
            {clinicLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block text-[13px] text-dark-text/60 hover:text-dark-text no-underline mb-2 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-dark-text/55 mb-4">
              16th Street
            </h4>
            <div className="text-[13px] text-dark-text/60 leading-[1.9] mb-6">
              <p>585 16th Street, West Vancouver</p>
              <a href="tel:+16042813345"
                className="block hover:text-dark-text transition-colors no-underline">
                (604) 281-3345
              </a>
              <p>Mon to Fri 8am to 7pm</p>
              <p>Sat 9am to 3pm</p>
            </div>
            <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-dark-text/55 mb-4">
              Ocean Walk
            </h4>
            <div className="text-[13px] text-dark-text/60 leading-[1.9]">
              <p>1884 Marine Drive, West Vancouver</p>
              <a href="tel:+16042813122"
                className="block hover:text-dark-text transition-colors no-underline">
                (604) 281-3122
              </a>
              <p>Mon to Fri 8:30am to 7pm</p>
              <p>Sat 9am to 3pm</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[11px] text-dark-text/45 tracking-[0.05em]">
          <span>© 2026 Azalea Physiotherapy. West Vancouver, BC.</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
