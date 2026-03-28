'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { getZodiacSign, type ZodiacSign } from '@/lib/zodiac'

interface BirthdateFormProps {
  onSubmit: (zodiacSign: ZodiacSign, birthdate: Date) => void
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate()
}

export function BirthdateForm({ onSubmit }: BirthdateFormProps) {
  const currentYear = new Date().getFullYear()
  const [day, setDay] = useState<number | ''>('')
  const [month, setMonth] = useState<number | ''>('')
  const [year, setYear] = useState<number | ''>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (day && month && year) {
      const zodiacSign = getZodiacSign(day, month)
      const birthdate = new Date(year, month - 1, day)
      onSubmit(zodiacSign, birthdate)
    }
  }

  const maxDays = month && year ? getDaysInMonth(month, year) : 31

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
            Enter Your Birth Date
          </h2>
          <p className="text-muted-foreground text-lg">
            The stars await to reveal your destiny
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {/* Day Select */}
          <div className="flex flex-col gap-2">
            <label className="font-serif text-sm text-muted-foreground uppercase tracking-wide">
              Day
            </label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value ? parseInt(e.target.value) : '')}
              className="w-full h-12 px-3 bg-card border-2 border-border rounded-lg text-foreground text-lg font-sans focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors cursor-pointer"
              required
            >
              <option value="">--</option>
              {Array.from({ length: maxDays }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Month Select */}
          <div className="flex flex-col gap-2">
            <label className="font-serif text-sm text-muted-foreground uppercase tracking-wide">
              Month
            </label>
            <select
              value={month}
              onChange={(e) => {
                setMonth(e.target.value ? parseInt(e.target.value) : '')
                // Reset day if it exceeds new month's days
                if (day && year && e.target.value) {
                  const newMaxDays = getDaysInMonth(parseInt(e.target.value), year)
                  if (day > newMaxDays) setDay('')
                }
              }}
              className="w-full h-12 px-3 bg-card border-2 border-border rounded-lg text-foreground text-lg font-sans focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors cursor-pointer"
              required
            >
              <option value="">--</option>
              {months.map((m, i) => (
                <option key={m} value={i + 1}>{m}</option>
              ))}
            </select>
          </div>

          {/* Year Select */}
          <div className="flex flex-col gap-2">
            <label className="font-serif text-sm text-muted-foreground uppercase tracking-wide">
              Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value ? parseInt(e.target.value) : '')}
              className="w-full h-12 px-3 bg-card border-2 border-border rounded-lg text-foreground text-lg font-sans focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors cursor-pointer"
              required
            >
              <option value="">--</option>
              {Array.from({ length: 100 }, (_, i) => currentYear - i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!day || !month || !year}
          className="w-full h-14 text-lg font-serif bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary/50 shadow-lg transition-all duration-300 disabled:opacity-50"
        >
          Reveal My Destiny
        </Button>
      </div>
    </form>
  )
}
