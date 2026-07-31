'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SITE, insurersFeatured, services as allServices } from '@/lib/clinic'
import JsonLd from '@/components/JsonLd'

// Derived from the canonical services list so every discipline (incl. massage)
// is linked from the homepage and new services appear automatically.
const services = allServices.map((s) => ({ href: `/services/${s.slug}`, label: s.name }))

const conditions = [
  { href: '/conditions/back-neck-pain', label: 'Back & Neck Pain', desc: 'Desk strain, disc trouble, and the ache that will not settle.' },
  { href: '/conditions/knee-pain', label: 'Knee Pain', desc: 'From sports injuries to recovery after surgery.' },
  { href: '/conditions/shoulder-injuries', label: 'Shoulder Injuries', desc: 'Rotator cuff, frozen shoulder, and impingement.' },
  { href: '/conditions/car-accident-icbc', label: 'Car Accident Injuries', desc: 'Whiplash and soft-tissue recovery, billed straight to ICBC.' },
  { href: '/conditions/sports-injuries', label: 'Sports Injuries', desc: 'Sprains, strains, and the return to your sport.' },
  { href: '/conditions/post-surgical-rehab', label: 'Post-Surgical Rehab', desc: 'Structured recovery after knee, hip, or shoulder surgery.' },
  { href: '/conditions/workplace-injuries', label: 'Workplace Injuries', desc: 'WorkSafeBC claims and a managed return to work.' },
  { href: '/conditions/arthritis-joint-pain', label: 'Arthritis & Joint Pain', desc: 'Keeping stiff, painful joints moving.' },
  { href: '/conditions/headaches-jaw-pain', label: 'Headaches & Jaw Pain', desc: 'Tension headaches and TMJ that physiotherapy can ease.' },
  { href: '/conditions/balance-mobility', label: 'Balance & Mobility', desc: 'Fall prevention and staying independent at home.' },
]

const team = [
  { name: 'Mary Ghoroghi', role: 'Registered Physiotherapist', img: '/images/existing/team-Mary-Gheissari.jpg', href: '/team/mary-ghoroghi' },
  { name: 'Braedan Lalor', role: 'Physiotherapist', img: '/images/existing/team-Braedan.jpg', href: '/team/braedan-lalor' },
  { name: 'Noushin Nouri', role: 'Registered Physiotherapist', img: '/images/existing/team-Noushin.jpg', href: '/team/noushin-nouri' },
  { name: 'Faranak Shekoohi', role: 'Kinesiologist', img: '/images/existing/team-Faranak-Shekoohi.jpg', href: '/team/faranak-shekoohi' },
  { name: 'Kambiz Navirian', role: 'Acupuncturist', img: '/images/existing/team-kambiz.jpg', href: '/team/kambiz-navirian' },
  { name: 'Asal Akbari', role: 'Registered Clinical Counsellor', img: '/images/existing/team-asal.jpg', href: '/team/asal-akbari' },
]

const faqs = [
  {
    q: 'Do I need a referral to book?',
    a: 'No. Physiotherapy in British Columbia does not require a doctor’s referral, so you can book with Azalea directly. A few extended health plans ask for a referral before they reimburse you, so it is worth a quick check of your own policy.',
  },
  {
    q: 'Do you direct-bill my insurance?',
    a: 'Yes. We direct-bill ICBC, WorkSafeBC, and most major extended health and benefit plans, including Pacific Blue Cross, Sun Life, Manulife, Canada Life, Green Shield, Desjardins and Beneva. You pay only the portion your plan does not cover, and our insurance page lists every provider we bill.',
  },
  {
    q: 'What happens at my first visit?',
    a: 'A full assessment, then treatment the same day. Your practitioner reviews your history, examines the injury, explains what they have found in plain language, and begins hands-on treatment. Plan for 45 to 60 minutes.',
  },
  {
    q: 'Can you treat my ICBC or WorkSafeBC claim?',
    a: 'Yes, and we handle the billing for both. Once you have an ICBC claim number you can start treatment without an adjuster’s approval, and we coordinate the paperwork from there.',
  },
  {
    q: 'Which of your two locations should I choose?',
    a: 'Either one. Both clinics serve the whole North Shore and offer the same disciplines. The 16th Street clinic sits in central West Vancouver, and Ocean Walk on Marine Drive suits the west side. Pick whichever is closer, or the practitioner you want to see.',
  },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Live Google rating (16th Street clinic). Starts from the hardcoded fallback so
  // it renders instantly, then swaps to the live figure from the cached API route.
  const [gr, setGr] = useState<{ rating: number | string; reviewCount: string }>({
    rating: SITE.googleRating,
    reviewCount: SITE.reviewCount,
  })

  useEffect(() => {
    let active = true
    fetch('/api/google-rating')
      .then((r) => r.json())
      .then((d) => {
        if (active && d && typeof d.rating !== 'undefined') {
          setGr({ rating: d.rating, reviewCount: d.reviewCount })
        }
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <div className="pb-20 md:pb-0">
      <JsonLd data={faqSchema} />

      {/* ─── 1. Hero ─────────────────────────────────────────── */}
      <section className="relative md:min-h-screen grid grid-cols-1 md:grid-cols-[58fr_42fr]">
        <div className="bg-stone flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 pt-36 pb-14 md:pt-44 md:pb-20">
          <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-8">
            West Vancouver · Since 2011
          </p>
          <h1 className="font-display text-[clamp(2.5rem,8vw,4.75rem)] font-light italic leading-[1.04] tracking-[-0.02em] text-text mb-7 max-w-[620px]">
            The cause, not just the symptom.
          </h1>
          <p className="font-sans text-[17px] text-muted leading-[1.65] mb-10 max-w-[480px]">
            West Vancouver comes to Azalea to find what is actually driving the pain, not just to quiet it. Eight practitioners and eleven disciplines under one roof, in English or Farsi.
          </p>
          <div className="flex flex-col gap-5 mb-10">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={SITE.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-rose hover:bg-rose-dark text-white font-sans text-[12px] font-bold tracking-[0.1em] uppercase px-8 py-4 transition-colors duration-200 min-h-[48px]"
              >
                Book online
              </a>
              <a
                href="tel:+16042813345"
                className="inline-flex items-center font-sans text-[12px] font-semibold tracking-[0.08em] uppercase text-text hover:text-rose-dark px-4 py-4 transition-colors duration-200 min-h-[48px]"
              >
                or call (604) 281-3345
              </a>
            </div>
            <p className="font-sans text-[13px] text-muted leading-relaxed max-w-[400px]">
              No referral needed. Direct billing. Usually seen within the week.
            </p>
          </div>
          <div className="flex items-center gap-3 mb-12">
            <span className="text-gold text-[15px] tracking-tight" aria-hidden="true">★★★★★</span>
            <span className="font-sans text-[13px] text-text font-medium">{gr.rating} out of 5, from {gr.reviewCount} Google reviews</span>
          </div>
          <div
            className="grid grid-cols-4 gap-4 pt-9"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            {[
              { n: '8', label: 'Practitioners' },
              { n: '11', label: 'Disciplines' },
              { n: '15', label: 'Years open' },
              { n: '2', label: 'Locations' },
            ].map(({ n, label }) => (
              <div key={label}>
                <p className="font-display text-[32px] font-light text-text leading-none mb-1.5">{n}</p>
                <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden md:block min-h-[520px]">
          <Image
            src="/images/generated/hero-option-1.jpg"
            alt="A physiotherapist guiding a patient through a resistance-band exercise at Azalea Physiotherapy"
            fill
            className="object-cover object-center"
            priority
            sizes="42vw"
          />
          {/* Light scrim at the top so the dark nav links stay legible over the photo */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-stone/85 to-transparent pointer-events-none"
          />
        </div>
      </section>

      {/* ─── 2. Trust strip ──────────────────────────────────── */}
      <section className="bg-dark px-6 sm:px-10 md:px-14 py-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {[
            { value: 'Direct billing', desc: 'We bill your insurer directly, so there is nothing to pay upfront for the covered portion.' },
            { value: 'No referral', desc: 'Physiotherapy in BC does not need a doctor’s note. Book with us directly.' },
            { value: 'Same-week visits', desc: 'Most new patients are seen within the same week they call.' },
            { value: 'Farsi spoken', desc: 'Several of our practitioners treat in Persian as well as English.' },
          ].map(({ value, desc }) => (
            <div key={value} className="reveal">
              <p className="font-display italic text-[23px] text-dark-text mb-3">{value}</p>
              <p className="font-sans text-[14px] text-dark-text/75 leading-[1.65]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 3. Insurance strip ──────────────────────────────── */}
      <section
        className="bg-bg px-6 sm:px-10 md:px-14 py-10"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row lg:items-center gap-x-12 gap-y-5">
          <p className="font-sans text-[13px] text-text font-medium shrink-0">
            Direct billing accepted from
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {insurersFeatured.map((name) => (
              <span key={name} className="font-sans text-[14px] font-medium text-muted whitespace-nowrap">
                {name}
              </span>
            ))}
            <Link
              href="/insurance"
              className="font-sans text-[14px] font-medium text-text hover:text-rose-dark no-underline transition-colors whitespace-nowrap"
            >
              and many more →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 4. Services ─────────────────────────────────────── */}
      <section className="bg-bg px-6 sm:px-10 md:px-14 py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-12 md:gap-16">
            <div className="md:sticky md:top-28 md:self-start">
              <h2 className="font-display italic text-[clamp(2rem,4vw,2.75rem)] font-light leading-[1.08] tracking-[-0.02em] text-text mb-6 reveal">
                Eleven disciplines.<br />One address.
              </h2>
              <p className="font-sans text-[15px] text-muted leading-[1.75] mb-4 reveal">
                Most clinics send you elsewhere the moment your case crosses a line. We do not. Physiotherapy, massage therapy, acupuncture, kinesiology and seven more disciplines work from the same building, so your treatment plan moves between them without a fresh referral or a new waiting list.
              </p>
              <p className="font-display italic text-[17px] text-text reveal">
                One team, one record, one recovery.
              </p>
            </div>
            <ul className="list-none" style={{ borderTop: '1px solid var(--color-border)' }}>
              {services.map(({ href, label }) => (
                <li key={href} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <Link
                    href={href}
                    className="group flex items-center justify-between gap-6 py-[18px] no-underline transition-colors duration-200"
                  >
                    <span className="font-display italic text-[clamp(1.25rem,2.4vw,1.6rem)] font-light text-text transition-transform duration-300 ease-out group-hover:translate-x-2">
                      {label}
                    </span>
                    <span
                      className="font-sans text-[18px] text-muted opacity-0 -translate-x-2 transition-[opacity,transform] duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── 5. Conditions ───────────────────────────────────── */}
      <section className="bg-stone px-6 sm:px-10 md:px-14 py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-14 reveal max-w-[640px]">
            <h2 className="font-display italic text-[clamp(2rem,4vw,2.75rem)] font-light leading-[1.08] tracking-[-0.02em] text-text mb-4">
              Start with the pain, not the paperwork.
            </h2>
            <p className="font-sans text-[16px] text-muted">
              Tell us where it hurts. These are the problems we treat most.
            </p>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-px"
            style={{ background: 'var(--color-border)' }}
          >
            {conditions.map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="bg-stone hover:bg-bg p-7 no-underline group transition-colors duration-200 flex flex-col gap-2.5"
              >
                <p className="font-display italic text-[20px] font-light text-text leading-[1.25] transition-transform duration-300 ease-out group-hover:translate-x-1">
                  {label}
                </p>
                <p className="font-sans text-[14px] text-muted leading-[1.6]">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. About ────────────────────────────────────────── */}
      <section className="bg-dark">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-[42fr_58fr]">
          <div className="relative min-h-[360px] md:min-h-0 overflow-hidden">
            <Image
              src="/images/generated/clinic-about.jpg"
              alt="The daylit rehab gym at Azalea Physiotherapy, with treatment tables, weights and mirrors"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
          </div>
          <div className="px-6 sm:px-10 md:px-14 py-20 md:py-24 flex flex-col justify-center">
            <h2 className="font-display italic text-[clamp(2rem,4vw,2.75rem)] font-light leading-[1.08] tracking-[-0.02em] text-dark-text mb-8 reveal">
              A clinic that grew up on the North Shore.
            </h2>
            <p className="font-sans text-[15px] text-dark-text/80 leading-[1.8] mb-5 reveal">
              Azalea opened on 16th Street in 2011 with a simple idea: a patient should not have to drive across the Lower Mainland to assemble their own care. Fifteen years on, eight practitioners treat under one roof, and a second clinic on Marine Drive serves the west side of the district.
            </p>
            <p className="font-sans text-[15px] text-dark-text/80 leading-[1.8] mb-14 reveal">
              That breadth is the point. A knee that needs physiotherapy, kinesiology, and the occasional acupuncture session is treated by people who share a hallway, not a fax machine. Several of our practitioners also treat in Farsi, which matters to a community well rooted on the North Shore.
            </p>
            <div
              className="grid grid-cols-3 gap-8 pt-10"
              style={{ borderTop: '1px solid rgba(237,233,228,0.12)' }}
            >
              {[
                { n: '15', label: 'Years on the North Shore' },
                { n: '8', label: 'Practitioners under one roof' },
                { n: '2', label: 'West Vancouver locations' },
              ].map(({ n, label }) => (
                <div key={label} className="reveal">
                  <p className="font-display text-[clamp(2.5rem,5vw,3rem)] font-light text-gold leading-none mb-2.5">{n}</p>
                  <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-dark-text/60 leading-[1.5]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. Team ─────────────────────────────────────────── */}
      <section className="bg-stone px-6 sm:px-10 md:px-14 py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-5">
            <div className="reveal max-w-[560px]">
              <h2 className="font-display italic text-[clamp(2rem,4vw,2.75rem)] font-light leading-[1.08] tracking-[-0.02em] text-text mb-4">
                The people behind your recovery.
              </h2>
              <p className="font-sans text-[16px] text-muted">
                Eight practitioners, each with a specific focus, and several who treat in Farsi as well as English. This is who you will actually see.
              </p>
            </div>
            <Link
              href="/team"
              className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-text hover:text-rose-dark no-underline transition-colors shrink-0 reveal"
            >
              Meet all eight →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-9">
            {team.map(({ name, role, img, href }, i) => (
              <Link
                key={href}
                href={href}
                className="reveal group no-underline"
                style={{ transitionDelay: `${Math.min(i, 4) * 60}ms` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-border">
                  <Image
                    src={img}
                    alt={`${name}, ${role} at Azalea Physiotherapy`}
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-[filter,transform] duration-[400ms] ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <p className="font-display text-[18px] font-normal text-text mb-1">{name}</p>
                <p className="font-sans text-[11px] uppercase tracking-[0.1em] text-muted">{role}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. Testimonial ──────────────────────────────────── */}
      <section className="bg-dark px-6 sm:px-10 md:px-14 py-28">
        <figure className="max-w-[820px] mx-auto text-center reveal">
          <blockquote className="font-display italic text-[clamp(1.6rem,3.4vw,2.25rem)] font-light leading-[1.4] text-dark-text mb-9">
            &#8220;I visited Azalea with my chronic pain. She was able to diagnose the cause, and with the correct treatments my 5-year lasting pain was gone. Her knowledge and experience are outstanding.&#8221;
          </blockquote>
          <figcaption className="font-sans text-[12px] uppercase tracking-[0.16em] text-dark-text/65">
            Tomáš Majzel &nbsp;·&nbsp; Verified Google review
          </figcaption>
        </figure>
      </section>

      {/* ─── 9. FAQ ──────────────────────────────────────────── */}
      <section className="bg-bg px-6 sm:px-10 md:px-14 py-24">
        <div className="max-w-[820px] mx-auto">
          <h2 className="font-display italic text-[clamp(2rem,4vw,2.75rem)] font-light tracking-[-0.02em] text-text mb-12 reveal">
            Questions, answered.
          </h2>
          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {faqs.map(({ q, a }, i) => {
              const open = openFaq === i
              return (
                <div key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <h3>
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      className="w-full flex items-start justify-between gap-5 py-6 text-start cursor-pointer bg-transparent border-none"
                    >
                      <span className="font-display italic text-[19px] font-light text-text leading-[1.35]">{q}</span>
                      <span
                        className="font-sans text-[22px] text-muted shrink-0 mt-0.5 transition-transform duration-300 ease-out select-none"
                        style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="font-sans text-[15px] text-muted leading-[1.8] pb-6 max-w-[640px]">{a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── 10. Locations ───────────────────────────────────── */}
      <section
        className="bg-bg px-6 sm:px-10 md:px-14 py-24"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display italic text-[clamp(2rem,4vw,2.75rem)] font-light tracking-[-0.02em] text-text mb-12 reveal">
            Two West Vancouver locations.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: '16th Street Clinic',
                addr1: 'Unit 207, 585 16th Street',
                addr2: 'West Vancouver, BC V7V 3R8',
                tel: '+16042813345',
                telLabel: '(604) 281-3345',
                hours: 'Mon to Fri 8am to 7pm · Sat 9am to 3pm',
                maps: 'https://maps.google.com/?q=585+16th+Street+West+Vancouver+BC',
              },
              {
                name: 'Ocean Walk Clinic',
                addr1: '1884 Marine Drive',
                addr2: 'West Vancouver, BC V7V 1J6',
                tel: '+16042813122',
                telLabel: '(604) 281-3122',
                hours: 'Mon to Fri 8:30am to 7pm · Sat 9am to 3pm',
                maps: 'https://maps.google.com/?q=1884+Marine+Drive+West+Vancouver+BC',
              },
            ].map((loc) => (
              <div key={loc.name} className="bg-stone p-8 sm:p-10 reveal">
                <p className="font-display italic text-[24px] font-light text-text mb-5">{loc.name}</p>
                <div className="font-sans text-[15px] text-muted leading-[1.85] mb-8">
                  <p>{loc.addr1}</p>
                  <p>{loc.addr2}</p>
                  <a href={`tel:${loc.tel}`} className="block hover:text-text no-underline transition-colors font-semibold text-text mt-2">
                    {loc.telLabel}
                  </a>
                  <p className="mt-2 text-[13px] text-muted">{loc.hours}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={SITE.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-rose hover:bg-rose-dark text-white font-sans text-[11px] font-bold tracking-[0.1em] uppercase px-7 py-3.5 transition-colors duration-200 min-h-[44px] no-underline"
                  >
                    Book online
                  </a>
                  <a
                    href={loc.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center font-sans text-[11px] font-semibold tracking-[0.1em] uppercase px-7 py-3.5 text-text hover:bg-bg transition-colors duration-200 min-h-[44px] no-underline"
                    style={{ border: '1px solid var(--color-border)' }}
                  >
                    Get directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 11. Final CTA ───────────────────────────────────── */}
      <section className="bg-dark px-6 sm:px-10 md:px-14 py-28">
        <div className="max-w-[720px] mx-auto text-center reveal">
          <h2 className="font-display italic text-[clamp(2.5rem,6vw,4rem)] font-light leading-[1.05] tracking-[-0.02em] text-dark-text mb-6">
            Let&#8217;s find out what is actually wrong.
          </h2>
          <p className="font-sans text-[16px] text-dark-text/80 leading-[1.7] mb-10 max-w-[480px] mx-auto">
            No referral, no insurance bill to pay upfront, and usually an appointment inside the week. Book online, or call the clinic closest to you.
          </p>
          <a
            href={SITE.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-rose hover:bg-rose-dark text-white font-sans text-[12px] font-bold tracking-[0.12em] uppercase px-12 py-5 transition-colors duration-200 mb-9 min-h-[52px] no-underline"
          >
            Book online
          </a>
          <p className="font-sans text-[13px] text-dark-text/65">
            16th Street <a href="tel:+16042813345" className="text-dark-text font-medium no-underline hover:text-gold transition-colors">(604) 281-3345</a>
            <span className="px-3 text-dark-text/30">·</span>
            Ocean Walk <a href="tel:+16042813122" className="text-dark-text font-medium no-underline hover:text-gold transition-colors">(604) 281-3122</a>
          </p>
        </div>
      </section>

      {/* ─── Mobile sticky call bar ─────────────────────────── */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden flex" style={{ background: 'var(--color-dark)', borderTop: '1px solid rgba(237,233,228,0.1)' }}>
        <a
          href="tel:+16042813345"
          className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 no-underline active:bg-dark-text/10 transition-colors"
        >
          <span className="font-sans text-[9px] font-semibold tracking-[0.14em] uppercase text-dark-text/70">16th Street</span>
          <span className="font-sans text-[14px] font-semibold text-dark-text">(604) 281-3345</span>
        </a>
        <div style={{ width: '1px', background: 'rgba(237,233,228,0.1)' }} />
        <a
          href="tel:+16042813122"
          className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 no-underline active:bg-dark-text/10 transition-colors"
        >
          <span className="font-sans text-[9px] font-semibold tracking-[0.14em] uppercase text-dark-text/70">Ocean Walk</span>
          <span className="font-sans text-[14px] font-semibold text-dark-text">(604) 281-3122</span>
        </a>
      </div>

    </div>
  )
}
