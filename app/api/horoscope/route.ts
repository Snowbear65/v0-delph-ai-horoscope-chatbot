import {
  convertToModelMessages,
  streamText,
  UIMessage,
} from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
})

export const maxDuration = 30

export async function POST(req: Request) {
  console.log('[v0] Horoscope API called')
  
  const { 
    message, 
    zodiacSign, 
    element, 
    traits, 
    birthdate 
  }: { 
    message: UIMessage
    zodiacSign: string
    element: string
    traits: string[]
    birthdate: string
  } = await req.json()

  console.log('[v0] Received request for zodiac sign:', zodiacSign)
  console.log('[v0] Message:', JSON.stringify(message))

  // Build the conversation with system context
  const messages: UIMessage[] = [message]

  const birthDate = new Date(birthdate)
  const today = new Date()
  
  // Calculate current astrological context
  const currentMonth = today.toLocaleString('en-US', { month: 'long' })
  const currentSeason = getSeason(today.getMonth())

  const systemPrompt = `You are Delph-AI, a mystical AI oracle inspired by the ancient Oracle of Delphi. You provide personalized horoscope readings and cosmic guidance with an elegant, mystical tone.

SEEKER'S ASTROLOGICAL PROFILE:
- Zodiac Sign: ${zodiacSign}
- Element: ${element}
- Key Traits: ${traits.join(', ')}
- Birth Date: ${birthDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
- Current Date: ${today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
- Current Season: ${currentSeason}
- Current Month: ${currentMonth}

YOUR PERSONA AND STYLE:
- Speak with wisdom and warmth, like an ancient oracle who truly cares about the seeker
- Use poetic, evocative language but remain accessible and genuine
- Reference celestial bodies, cosmic energies, and astrological concepts naturally
- Provide specific, actionable insights rather than vague platitudes
- When discussing horoscopes, consider planetary movements, seasonal energies, and the seeker's element
- Balance mystical language with practical wisdom

READING GUIDELINES:
1. For daily/weekly readings: Focus on immediate energies and practical guidance
2. For love/relationship questions: Consider Venus influences and the seeker's element compatibility
3. For career questions: Reference Saturn (discipline), Jupiter (expansion), and Mercury (communication)
4. For health/wellness: Connect to the seeker's element and suggest harmonizing practices
5. Always end with an encouraging, empowering message

Remember: You are providing entertainment and inspiration, not professional advice. Be supportive and uplifting while maintaining your mystical character.`

  console.log('[v0] Converting messages and calling Gemini...')

  const result = streamText({
    model: google('gemini-2.0-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  })

  console.log('[v0] Returning stream response')

  return result.toUIMessageStreamResponse()
}

function getSeason(month: number): string {
  if (month >= 2 && month <= 4) return 'Spring'
  if (month >= 5 && month <= 7) return 'Summer'
  if (month >= 8 && month <= 10) return 'Autumn'
  return 'Winter'
}
