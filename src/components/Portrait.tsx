import Image from 'next/image'
import type { Practitioner } from '@/lib/clinic'

const initials = (name: string) =>
  name
    .replace(/^Dr\.?\s+/i, '')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')

/** Practitioner portrait with a typographic fallback when no photo exists. */
export default function Portrait({ p, sizes }: { p: Practitioner; sizes?: string }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden bg-border">
      {p.img ? (
        <Image
          src={p.img}
          alt={`${p.name}, ${p.role} at Azalea Physiotherapy`}
          fill
          className="object-cover object-top grayscale group-hover:grayscale-0 transition-[filter,transform] duration-500 ease-out group-hover:scale-[1.03]"
          sizes={sizes ?? '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-stone">
          <span className="font-display italic text-[clamp(2rem,5vw,3rem)] font-light text-muted select-none">
            {initials(p.name)}
          </span>
        </div>
      )}
    </div>
  )
}
