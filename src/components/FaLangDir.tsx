'use client'

import { useEffect } from 'react'

/**
 * The site has a single root layout that hard-codes <html lang="en" dir="ltr">.
 * On the Farsi /fa routes the visible content is already RTL (the section wraps
 * everything in dir="rtl" lang="fa"), but this flips the document element too so
 * the scrollbar side and document language are correct, then restores on unmount.
 */
export default function FaLangDir() {
  useEffect(() => {
    const html = document.documentElement
    const prevLang = html.lang
    const prevDir = html.dir
    html.lang = 'fa'
    html.dir = 'rtl'
    return () => {
      html.lang = prevLang
      html.dir = prevDir
    }
  }, [])
  return null
}
