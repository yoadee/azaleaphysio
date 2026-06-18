'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from './Logo'
import { SITE } from '@/lib/clinic'

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/team', label: 'Team' },
  { href: '/locations', label: 'Locations' },
  { href: '/about', label: 'About' },
  { href: '/insurance', label: 'Insurance' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        role="banner"
        className={[
          'z-50 w-full px-14 flex items-center justify-between transition-all duration-300',
          scrolled
            ? 'fixed top-0 bg-dark py-5 shadow-sm'
            : 'absolute top-0 inset-x-0 py-8',
        ].join(' ')}
      >
        <Link
          href="/"
          aria-label="Azalea Physiotherapy, home"
          className={[
            'no-underline transition-colors duration-200',
            scrolled ? 'text-dark-text' : 'text-text',
          ].join(' ')}
        >
          <Logo
            className="font-display text-[17px] tracking-[0.1em] uppercase"
            markSize={28}
          />
        </Link>

        {/* Desktop nav */}
        <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-9">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={[
                'text-[11px] font-semibold tracking-[0.1em] uppercase no-underline transition-colors duration-200',
                scrolled ? 'text-dark-text/85 hover:text-dark-text' : 'text-text/90 hover:text-text',
              ].join(' ')}
            >
              {label}
            </Link>
          ))}
          <a
            href={SITE.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-rose hover:bg-rose-dark text-white text-[11px] font-bold tracking-[0.1em] uppercase px-6 py-[10px] transition-colors duration-200"
          >
            Book Now
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 min-w-[44px] min-h-[44px] items-center justify-center"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={['block w-5 h-px transition-colors duration-200', scrolled ? 'bg-dark-text' : 'bg-text'].join(' ')}
            />
          ))}
        </button>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Navigation menu"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-dark flex flex-col px-10 py-12"
        >
          <div className="flex justify-between items-center mb-16">
            <Logo className="font-display text-[17px] tracking-[0.1em] uppercase text-dark-text" markSize={28} />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-dark-text/50 hover:text-dark-text transition-colors text-xl"
            >
              ✕
            </button>
          </div>

          <nav role="navigation" aria-label="Mobile navigation" className="flex flex-col gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-[32px] font-light italic text-dark-text/70 hover:text-dark-text no-underline transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto">
            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="inline-block bg-rose hover:bg-rose-dark text-white text-[12px] font-bold tracking-[0.1em] uppercase px-10 py-4 transition-colors duration-200 min-h-[44px]"
            >
              Book Now
            </a>
            <p className="text-dark-text/35 text-[12px] mt-4 leading-relaxed">
              16th Street: (604) 281-3345<br />
              Ocean Walk: (604) 281-3122
            </p>
          </div>
        </div>
      )}
    </>
  )
}
