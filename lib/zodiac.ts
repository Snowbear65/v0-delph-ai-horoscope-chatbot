export interface ZodiacSign {
  name: string
  symbol: string
  element: string
  dates: string
  image: string
  traits: string[]
}

export const zodiacSigns: ZodiacSign[] = [
  {
    name: 'Aries',
    symbol: '♈',
    element: 'Fire',
    dates: 'March 21 - April 19',
    image: '/zodiac/aries.jpg',
    traits: ['Courageous', 'Determined', 'Confident', 'Enthusiastic'],
  },
  {
    name: 'Taurus',
    symbol: '♉',
    element: 'Earth',
    dates: 'April 20 - May 20',
    image: '/zodiac/taurus.jpg',
    traits: ['Reliable', 'Patient', 'Practical', 'Devoted'],
  },
  {
    name: 'Gemini',
    symbol: '♊',
    element: 'Air',
    dates: 'May 21 - June 20',
    image: '/zodiac/gemini.jpg',
    traits: ['Gentle', 'Affectionate', 'Curious', 'Adaptable'],
  },
  {
    name: 'Cancer',
    symbol: '♋',
    element: 'Water',
    dates: 'June 21 - July 22',
    image: '/zodiac/cancer.jpg',
    traits: ['Tenacious', 'Imaginative', 'Loyal', 'Emotional'],
  },
  {
    name: 'Leo',
    symbol: '♌',
    element: 'Fire',
    dates: 'July 23 - August 22',
    image: '/zodiac/leo.jpg',
    traits: ['Creative', 'Passionate', 'Generous', 'Warm-hearted'],
  },
  {
    name: 'Virgo',
    symbol: '♍',
    element: 'Earth',
    dates: 'August 23 - September 22',
    image: '/zodiac/virgo.jpg',
    traits: ['Loyal', 'Analytical', 'Kind', 'Hardworking'],
  },
  {
    name: 'Libra',
    symbol: '♎',
    element: 'Air',
    dates: 'September 23 - October 22',
    image: '/zodiac/libra.jpg',
    traits: ['Cooperative', 'Diplomatic', 'Gracious', 'Fair-minded'],
  },
  {
    name: 'Scorpio',
    symbol: '♏',
    element: 'Water',
    dates: 'October 23 - November 21',
    image: '/zodiac/scorpio.jpg',
    traits: ['Resourceful', 'Brave', 'Passionate', 'Stubborn'],
  },
  {
    name: 'Sagittarius',
    symbol: '♐',
    element: 'Fire',
    dates: 'November 22 - December 21',
    image: '/zodiac/sagittarius.jpg',
    traits: ['Generous', 'Idealistic', 'Great sense of humor'],
  },
  {
    name: 'Capricorn',
    symbol: '♑',
    element: 'Earth',
    dates: 'December 22 - January 19',
    image: '/zodiac/capricorn.jpg',
    traits: ['Responsible', 'Disciplined', 'Self-control', 'Good managers'],
  },
  {
    name: 'Aquarius',
    symbol: '♒',
    element: 'Air',
    dates: 'January 20 - February 18',
    image: '/zodiac/aquarius.jpg',
    traits: ['Progressive', 'Original', 'Independent', 'Humanitarian'],
  },
  {
    name: 'Pisces',
    symbol: '♓',
    element: 'Water',
    dates: 'February 19 - March 20',
    image: '/zodiac/pisces.jpg',
    traits: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle'],
  },
]

export function getZodiacSign(day: number, month: number): ZodiacSign {
  // Month is 1-indexed (1 = January, 12 = December)
  const zodiacDates: Array<{ sign: number; endDay: number }> = [
    { sign: 9, endDay: 19 },  // January: Capricorn until 19, then Aquarius
    { sign: 10, endDay: 18 }, // February: Aquarius until 18, then Pisces
    { sign: 11, endDay: 20 }, // March: Pisces until 20, then Aries
    { sign: 0, endDay: 19 },  // April: Aries until 19, then Taurus
    { sign: 1, endDay: 20 },  // May: Taurus until 20, then Gemini
    { sign: 2, endDay: 20 },  // June: Gemini until 20, then Cancer
    { sign: 3, endDay: 22 },  // July: Cancer until 22, then Leo
    { sign: 4, endDay: 22 },  // August: Leo until 22, then Virgo
    { sign: 5, endDay: 22 },  // September: Virgo until 22, then Libra
    { sign: 6, endDay: 22 },  // October: Libra until 22, then Scorpio
    { sign: 7, endDay: 21 },  // November: Scorpio until 21, then Sagittarius
    { sign: 8, endDay: 21 },  // December: Sagittarius until 21, then Capricorn
  ]

  const monthIndex = month - 1
  const { sign, endDay } = zodiacDates[monthIndex]
  
  if (day <= endDay) {
    return zodiacSigns[sign]
  } else {
    return zodiacSigns[(sign + 1) % 12]
  }
}
