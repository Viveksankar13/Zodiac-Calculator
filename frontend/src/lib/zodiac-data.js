export const zodiacSigns = [
  {
    name: "Capricorn",
    symbol: "♑",
    dates: { start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
    element: "Earth",
    planet: "Saturn",
    color: "Brown",
    description: "Ambitious and disciplined, you are a natural leader with strong determination and practical wisdom.",
    detail_description: ""
  },
  {
    name: "Aquarius",
    symbol: "♒",
    dates: { start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
    element: "Air",
    planet: "Uranus",
    color: "Blue",
    description: "Independent and innovative, you march to the beat of your own drum with humanitarian ideals.",
    detail_description: ""
  },
  {
    name: "Pisces",
    symbol: "♓",
    dates: { start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
    element: "Water",
    planet: "Neptune",
    color: "Sea Green",
    description: "Intuitive and compassionate, you have a deep connection to emotions and spiritual creativity.",
    detail_description: ""
  },
  {
    name: "Aries",
    symbol: "♈",
    dates: { start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
    element: "Fire",
    planet: "Mars",
    color: "Red",
    description: "Bold and energetic, you are a natural pioneer who loves new challenges and adventures.",
    detail_description: ""
  },
  {
    name: "Taurus",
    symbol: "♉",
    dates: { start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
    element: "Earth",
    planet: "Venus",
    color: "Green",
    description: "Reliable and patient, you appreciate beauty, comfort, and the finer things in life.",
    detail_description: ""
  },
  {
    name: "Gemini",
    symbol: "♊",
    dates: { start: { month: 5, day: 21 }, end: { month: 6, day: 20 } },
    element: "Air",
    planet: "Mercury",
    color: "Yellow",
    description: "Curious and adaptable, you love communication, learning, and exploring new ideas.",
    detail_description: ""
  },
  {
    name: "Cancer",
    symbol: "♋",
    dates: { start: { month: 6, day: 21 }, end: { month: 7, day: 22 } },
    element: "Water",
    planet: "Moon",
    color: "Silver",
    description: "Nurturing and protective, you have strong intuition and deep emotional intelligence.",
    detail_description: ""
  },
  {
    name: "Leo",
    symbol: "♌",
    dates: { start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
    element: "Fire",
    planet: "Sun",
    color: "Gold",
    description: "Confident and generous, you naturally attract others with your warm, radiant personality.",
    detail_description: ""
  },
  {
    name: "Virgo",
    symbol: "♍",
    dates: { start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
    element: "Earth",
    planet: "Mercury",
    color: "Navy Blue",
    description: "Analytical and practical, you have an eye for detail and a desire for perfection.",
    detail_description: ""
  },
  {
    name: "Libra",
    symbol: "♎",
    dates: { start: { month: 9, day: 23 }, end: { month: 10, day: 22 } },
    element: "Air",
    planet: "Venus",
    color: "Pink",
    description: "Diplomatic and charming, you seek balance and harmony in all aspects of life.",
    detail_description: ""
  },
  {
    name: "Scorpio",
    symbol: "♏",
    dates: { start: { month: 10, day: 23 }, end: { month: 11, day: 21 } },
    element: "Water",
    planet: "Pluto",
    color: "Deep Red",
    description: "Intense and mysterious, you have powerful intuition and transformative energy.",
    detail_description: ""
  },
  {
    name: "Sagittarius",
    symbol: "♐",
    dates: { start: { month: 11, day: 22 }, end: { month: 12, day: 21 } },
    element: "Fire",
    planet: "Jupiter",
    color: "Purple",
    description: "Adventurous and optimistic, you love exploring new horizons and seeking truth.",
    detail_description: ""
  }
];

export function calculateZodiacSign(birthDate) {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  for (let sign of zodiacSigns) {
    const { start, end } = sign.dates;

    if ((month === start.month && day >= start.day) ||
      (month === end.month && day <= end.day)) {
      return sign;
    }
  }

  return zodiacSigns[0]; // Default to Capricorn
}
