'use client'

import { useEffect } from 'react'

/**
 * Drop once per page. Observes every `.reveal` element and adds `.is-visible`
 * as it scrolls in. Content is visible by default (see globals.css: the hidden
 * start state only applies under `html.js`), so this is pure enhancement and
 * never gates content for crawlers or no-JS.
 */
export default function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.is-visible)')
    if (!els.length) return
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

  return null
}
