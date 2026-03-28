'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import type { ZodiacSign } from '@/lib/zodiac'

interface HoroscopeChatProps {
  zodiacSign: ZodiacSign
  birthdate: Date
}

export function HoroscopeChat({ zodiacSign, birthdate }: HoroscopeChatProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ 
      api: '/api/horoscope',
      prepareSendMessagesRequest: ({ id, messages }) => ({
        body: {
          message: messages[messages.length - 1],
          id,
          zodiacSign: zodiacSign.name,
          element: zodiacSign.element,
          traits: zodiacSign.traits,
          birthdate: birthdate.toISOString(),
        },
      }),
    }),
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Send initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      sendMessage({ text: 'Hello, I would like to know my horoscope reading.' })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput('')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-4 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-sm'
                  : 'bg-card border-2 border-border text-foreground rounded-bl-sm'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2 text-sm text-primary font-serif">
                  <span className="text-lg">&#10022;</span>
                  Delph-AI
                </div>
              )}
              <div className="text-base leading-relaxed whitespace-pre-wrap">
                {message.parts.map((part, index) => {
                  if (part.type === 'text') {
                    return <span key={index}>{part.text}</span>
                  }
                  return null
                })}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <div className="bg-card border-2 border-border rounded-2xl rounded-bl-sm px-5 py-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Spinner className="w-5 h-5" />
                <span className="font-serif">The stars are aligning...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t-2 border-border bg-card/50 p-4">
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your destiny..."
            disabled={isLoading}
            className="flex-1 h-12 px-4 bg-background border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors disabled:opacity-50"
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="h-12 px-6 font-serif bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
          >
            {isLoading ? <Spinner className="w-5 h-5" /> : 'Ask'}
          </Button>
        </form>
        <p className="text-center text-xs text-muted-foreground mt-3">
          Ask about love, career, health, or any cosmic guidance
        </p>
      </div>
    </div>
  )
}
