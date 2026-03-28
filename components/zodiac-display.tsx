'use client'

import Image from 'next/image'
import type { ZodiacSign } from '@/lib/zodiac'

interface ZodiacDisplayProps {
  zodiacSign: ZodiacSign
  birthdate: Date
}

export function ZodiacDisplay({ zodiacSign, birthdate }: ZodiacDisplayProps) {
  const formattedDate = birthdate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
      {/* Zodiac Image with ornate frame */}
      <div className="relative w-48 h-48 md:w-56 md:h-56">
        <div className="absolute inset-0 rounded-full border-4 border-primary/60 shadow-xl overflow-hidden">
          <Image
            src={zodiacSign.image}
            alt={`${zodiacSign.name} zodiac sign in Mucha art style`}
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Decorative ring */}
        <div className="absolute -inset-2 rounded-full border-2 border-primary/30 pointer-events-none" />
        <div className="absolute -inset-4 rounded-full border border-primary/15 pointer-events-none" />
      </div>

      {/* Zodiac Info */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          <span className="text-4xl text-primary">{zodiacSign.symbol}</span>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            {zodiacSign.name}
          </h2>
        </div>
        <p className="text-muted-foreground text-lg">{zodiacSign.dates}</p>
        <p className="text-sm text-muted-foreground/80">Born: {formattedDate}</p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="px-3 py-1 text-sm bg-secondary/20 text-secondary border border-secondary/40 rounded-full">
            {zodiacSign.element}
          </span>
        </div>
      </div>

      {/* Traits */}
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {zodiacSign.traits.map((trait) => (
          <span
            key={trait}
            className="px-3 py-1 text-sm bg-accent/10 text-accent border border-accent/30 rounded-full"
          >
            {trait}
          </span>
        ))}
      </div>
    </div>
  )
}
