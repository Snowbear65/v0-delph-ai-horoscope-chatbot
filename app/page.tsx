'use client'

import { useState } from 'react'
import { BirthdateForm } from '@/components/birthdate-form'
import { ZodiacDisplay } from '@/components/zodiac-display'
import { HoroscopeChat } from '@/components/horoscope-chat'
import { Button } from '@/components/ui/button'
import type { ZodiacSign } from '@/lib/zodiac'

export default function Home() {
  const [zodiacSign, setZodiacSign] = useState<ZodiacSign | null>(null)
  const [birthdate, setBirthdate] = useState<Date | null>(null)

  const handleBirthdateSubmit = (sign: ZodiacSign, date: Date) => {
    setZodiacSign(sign)
    setBirthdate(date)
  }

  const handleReset = () => {
    setZodiacSign(null)
    setBirthdate(null)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Decorative border pattern */}
      <div className="fixed inset-x-0 top-0 h-2 bg-primary/20" />
      <div className="fixed inset-x-0 bottom-0 h-2 bg-primary/20" />
      <div className="fixed inset-y-0 left-0 w-2 bg-primary/20" />
      <div className="fixed inset-y-0 right-0 w-2 bg-primary/20" />

      {!zodiacSign ? (
        // Welcome Screen with Birthdate Form
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-3xl text-primary">&#10022;</span>
              <span className="text-3xl text-primary">&#10022;</span>
              <span className="text-3xl text-primary">&#10022;</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl text-foreground tracking-wide mb-4 text-balance">
              Delph-AI
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl font-sans max-w-md mx-auto text-pretty">
              Your Celestial Oracle
            </p>
            <p className="text-muted-foreground/70 text-base md:text-lg font-sans max-w-lg mx-auto mt-4 text-pretty">
              Discover your cosmic destiny through the ancient wisdom of the zodiac, 
              brought to life by artificial intelligence.
            </p>
          </header>

          {/* Birthdate Form */}
          <BirthdateForm onSubmit={handleBirthdateSubmit} />

          {/* Decorative footer */}
          <footer className="mt-16 text-center text-muted-foreground/50 text-sm">
            <p>CS 335 Artificial Intelligence Project</p>
            <p className="mt-1">Art inspired by Alphonse Mucha</p>
          </footer>
        </div>
      ) : (
        // Chat Interface with Zodiac Display
        <div className="h-screen flex flex-col">
          {/* Header Bar */}
          <header className="flex items-center justify-between px-4 py-3 border-b-2 border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl text-primary">&#10022;</span>
              <h1 className="font-serif text-xl md:text-2xl text-foreground">
                Delph-AI
              </h1>
            </div>
            <Button
              onClick={handleReset}
              variant="outline"
              className="font-serif text-sm border-2"
            >
              New Reading
            </Button>
          </header>

          {/* Main Content */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar - Zodiac Display (collapsible on mobile) */}
            <aside className="md:w-80 lg:w-96 border-b-2 md:border-b-0 md:border-r-2 border-border bg-card/30 overflow-y-auto">
              <div className="p-6">
                <ZodiacDisplay zodiacSign={zodiacSign} birthdate={birthdate!} />
              </div>
            </aside>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col overflow-hidden bg-background">
              <HoroscopeChat zodiacSign={zodiacSign} birthdate={birthdate!} />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
