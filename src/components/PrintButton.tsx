'use client'

/**
 * Triggers the browser print dialog (Save as PDF) for the one-pager leaflet.
 * Marked .no-print so it never appears in the printed output.
 */
export default function PrintButton({ className = '' }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={`no-print ${className}`}>
      Print / Save as PDF
    </button>
  )
}
