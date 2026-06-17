'use client'

import { useState } from 'react'
import type { Faq } from '@/lib/clinic'

/** Accessible accordion. First item open by default; smooth grid-rows reveal. */
export default function FaqAccordion({ items, startOpen = 0 }: { items: Faq[]; startOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(startOpen)

  return (
    <div style={{ borderTop: '1px solid var(--color-border)' }}>
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-start justify-between gap-5 py-6 text-start cursor-pointer bg-transparent border-none"
              >
                <span className="font-display italic text-[19px] font-light text-text leading-[1.35]">{f.q}</span>
                <span
                  className="font-sans text-[22px] text-muted shrink-0 mt-0.5 transition-transform duration-300 ease-out select-none"
                  style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
            </h3>
            <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
              <div className="overflow-hidden">
                <p className="font-sans text-[15px] text-muted leading-[1.8] pb-6 max-w-[640px]">{f.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
