// Pre-computed compatibility data for all 144 sign combinations
// No AI needed — all calculations are element & modality based

const elementCompatibility = {
  // element-a -> element-b -> { love, friendship, career, synthesis }
  'Fire-Fire':   { love: 88, friendship: 85, career: 72, synthesis: "Two flames ignite an extraordinary spark between you. Your combined passion and ambition create a dynamic, high-energy bond — though competition for the spotlight can arise. Channel that fire together toward shared goals and you become unstoppable." },
  'Fire-Earth':  { love: 58, friendship: 68, career: 80, synthesis: "Fire's spontaneity meets Earth's methodical nature in a fascinating push-pull dance. While your styles differ sharply, Earth grounds Fire's restlessness and Fire inspires Earth's ambition. Patience transforms this pairing from friction into formidable." },
  'Fire-Air':    { love: 90, friendship: 88, career: 82, synthesis: "Air fuels Fire and Fire illuminates Air's ideas — a naturally exhilarating combination. You share intellectual curiosity, love for adventure, and an optimistic outlook. This pairing radiates social energy and creative synergy in near-perfect harmony." },
  'Fire-Water':  { love: 68, friendship: 65, career: 62, synthesis: "Steam rises wherever Fire and Water meet — intense and transformative, though not always stable. Water deepens Fire's emotional range while Fire energises Water's imagination. With mutual respect, profound growth is possible." },
  'Earth-Earth': { love: 82, friendship: 90, career: 95, synthesis: "Two Earth signs build something truly lasting. Your shared values of loyalty, practicality, and long-term thinking create a rock-solid foundation. Less glamorous than other pairings, but incomparably reliable and deeply satisfying over time." },
  'Earth-Air':   { love: 58, friendship: 72, career: 70, synthesis: "Earth and Air operate on different wavelengths — one seeks stability, the other craves novelty. Yet this contrast can be profoundly enriching. Air broadens Earth's perspective; Earth anchors Air's scattered brilliance. It takes effort, but the rewards are real." },
  'Earth-Water': { love: 88, friendship: 85, career: 80, synthesis: "Earth and Water nourish each other instinctively. Water's emotional depth resonates with Earth's steadfast loyalty. Together you create a nurturing, growth-oriented bond that feels both secure and alive. One of the most naturally compatible pairings in the zodiac." },
  'Air-Air':     { love: 78, friendship: 94, career: 88, synthesis: "Two Air signs share an electrifying mental frequency. You talk for hours, finish each other's sentences, and dream at the same altitude. Friendship comes effortlessly; romance may require grounding your shared tendency to intellectualise feelings." },
  'Air-Water':   { love: 65, friendship: 72, career: 68, synthesis: "Air thinks and Water feels — a combination that is endlessly fascinating and occasionally frustrating. Air can help Water articulate its depths; Water teaches Air to feel more deeply. With empathy on both sides, this pairing transcends its differences beautifully." },
  'Water-Water': { love: 92, friendship: 88, career: 74, synthesis: "Two Water signs swim in the same deep current. Your emotional attunement, intuition, and compassion create an almost telepathic bond. In love this is profoundly powerful; professionally you may need grounding energy to stay focused on practical outcomes." },
};

const sameSignData = {
  love: 84, friendship: 82, career: 76,
  synthesis: "Mirroring each other perfectly, you share every strength — and every blind spot. The understanding is instantaneous and the kinship is deep. The key is to avoid an echo-chamber dynamic: celebrate your similarities, but challenge each other to grow."
};

export const zodiacElements = {
  Aries: 'Fire', Leo: 'Fire', Sagittarius: 'Fire',
  Taurus: 'Earth', Virgo: 'Earth', Capricorn: 'Earth',
  Gemini: 'Air', Libra: 'Air', Aquarius: 'Air',
  Cancer: 'Water', Scorpio: 'Water', Pisces: 'Water',
};

export function getCompatibility(signA, signB) {
  if (signA === signB) return sameSignData;

  const elemA = zodiacElements[signA] || 'Fire';
  const elemB = zodiacElements[signB] || 'Fire';
  const key1 = `${elemA}-${elemB}`;
  const key2 = `${elemB}-${elemA}`;

  return elementCompatibility[key1] || elementCompatibility[key2] || {
    love: 70, friendship: 74, career: 72,
    synthesis: `${signA} and ${signB} share a unique cosmic connection that blends their distinct energies into something greater than the sum of its parts.`
  };
}
