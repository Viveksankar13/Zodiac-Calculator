// Offline horoscope data — rich static content per sign + deterministic ratings
// No AI needed. Ratings shift deterministically per day offset.

const horoscopeTexts = {
  Aries: {
    yesterday: "Yesterday's Mars energy propelled you forward with courageous clarity. Any challenges you faced were met with your signature boldness. Reflect on the doors that opened through your initiative.",
    today:     "The cosmos fires your ambition today, Aries. A surge of pioneering energy aligns with your natural drive. Act decisively on ideas that have been simmering — the celestial window is wide open.",
    tomorrow:  "Tomorrow brings a turning point in a key area of your life. Mars harmonises with Jupiter, amplifying your confidence and expanding your reach. Step into the arena — your moment of impact is near."
  },
  Taurus: {
    yesterday: "Venus graced your endeavours yesterday with beauty and persistence. Your steady hand navigated complexity with remarkable grace. Material goals and close relationships both benefited from your calm presence.",
    today:     "Today, Taurus, your connection to the tangible world deepens. Financial intuition is sharp; trust your instincts on decisions involving resources or comfort. A meaningful conversation could shift your perspective beautifully.",
    tomorrow:  "Tomorrow's alignment favours sensory pleasures and heartfelt connections. Venus lights up your relational sky, bringing warmth and appreciation. Invest time in what — and who — truly nourishes you."
  },
  Gemini: {
    yesterday: "Mercury sparked brilliant exchanges yesterday. Your conversations planted seeds of possibility that are still taking root. A piece of information you received may prove more significant than it seemed.",
    today:     "Your mind is a lightning rod today, Gemini. Multiple channels of thought converge into inspired ideas. Jot down everything — the synthesis of these threads could form the foundation of something remarkable.",
    tomorrow:  "Tomorrow invites you to bridge two worlds you've been navigating separately. Mercury's transit creates a rare clarity that cuts through confusion. Speak your truth with precision; others are genuinely ready to hear it."
  },
  Cancer: {
    yesterday: "The Moon's gentle guidance yesterday deepened your emotional intelligence. An act of care you extended to someone close created a ripple effect of warmth. Your instincts were particularly accurate.",
    today:     "Today your emotional antennae are exquisitely tuned, Cancer. Lean into your intuition — it knows more than your analytical mind is currently processing. Home and family matters carry special cosmic support.",
    tomorrow:  "Tomorrow the Moon moves into a powerful position that amplifies your nurturing gifts. A creative or relational project you've been quietly tending is ready to bloom. Trust the season of what you've grown."
  },
  Leo: {
    yesterday: "The Sun shone particularly brightly on your endeavours yesterday. Your warmth drew people toward you effortlessly. A moment of recognition — deserved and beautiful — may have affirmed your direction.",
    today:     "Today is made for your radiance, Leo. The cosmos invites you to lead, create, and be fully seen. Express yourself authentically and generously — your light has a magnetic effect on the people around you.",
    tomorrow:  "Tomorrow positions you at the centre of an exciting opportunity. The Sun trines a key planet in your favour, sharpening your personal magnetism. Step forward with confidence — the stage is yours."
  },
  Virgo: {
    yesterday: "Mercury's analytical influence yesterday sharpened your attention to detail. A systematic approach you took to a lingering problem yielded surprising clarity. Your precision is a gift to everyone around you.",
    today:     "Today, Virgo, your discernment is operating at a rare frequency. You see patterns and solutions that others miss entirely. Bring that precision to a practical challenge and watch it dissolve with elegance.",
    tomorrow:  "Tomorrow encourages you to trust your process. A project you've meticulously cultivated is approaching fruition. The universe confirms what you already sense: your careful preparation is about to pay off handsomely."
  },
  Libra: {
    yesterday: "Venus blessed your connections yesterday with grace and artistry. Balance was your superpower — you navigated competing needs with diplomatic finesse. Your aesthetic eye also found something worth preserving.",
    today:     "Today, Libra, harmony is both your mission and your reward. An important relationship dynamic reaches a point of greater equilibrium. Your gift for seeing all sides of a situation brings you closer to a meaningful resolution.",
    tomorrow:  "Tomorrow invites you to make a decision you've been gracefully deferring. Venus gives you the confidence to choose — and the clarity to know what you truly want. Beautiful outcomes await on the other side of your choice."
  },
  Scorpio: {
    yesterday: "Pluto's transformative current moved powerfully through your life yesterday. A truth surfaced that — though intense — carried the seeds of liberation. Your depth of perception revealed something others simply cannot see.",
    today:     "Today, Scorpio, your perception pierces straight to the essence of things. A mystery resolves, a pattern becomes unmistakable, a decision crystallises. Embrace the transformation rather than resisting it — this is your element.",
    tomorrow:  "Tomorrow carries the energy of profound renewal. Pluto aligns with a key sector of your chart, inviting you to release what no longer serves your evolution. The phoenix energy is strong — trust the process of becoming."
  },
  Sagittarius: {
    yesterday: "Jupiter's expansive reach broadened your horizons beautifully yesterday. An idea, journey, or conversation opened a door to new possibility. Your optimism and philosophical outlook magnetised good fortune.",
    today:     "The archer's arrow flies true today, Sagittarius. An adventure — of the mind, spirit, or physical world — awaits your wholehearted participation. Your enthusiasm is contagious and draws synchronicities your way.",
    tomorrow:  "Tomorrow's Jupiter alignment elevates your vision to inspiring new heights. A goal that once seemed distant moves perceptibly closer. The universe is conspiring in your favour — expand your belief in what's possible."
  },
  Capricorn: {
    yesterday: "Saturn's disciplined energy rewarded your patience and methodical effort yesterday. Progress on a long-term goal became measurable and real. Your integrity and commitment are building something that will stand the test of time.",
    today:     "Today, Capricorn, your ability to see the strategic long view is unmatched. A practical opportunity presents itself — evaluate it through your signature lens of quality over quantity. Your reputation opens doors worth entering.",
    tomorrow:  "Tomorrow's Saturn transit activates your most ambitious aspirations. The groundwork you've been laying with quiet determination is ready for the next stage. Authority and respect come to those who persist with purpose — and that is you."
  },
  Aquarius: {
    yesterday: "Uranus sparked a flash of innovative thinking yesterday that may still be resonating. An unconventional approach you took or considered has more merit than conventional wisdom would suggest. Follow the vision.",
    today:     "Today, Aquarius, your originality is your greatest cosmic asset. An insight that feels ahead of its time is precisely correct — your role is to be the first to see it and the first to act. The collective benefits from your vision.",
    tomorrow:  "Tomorrow invites radical authenticity. Uranus energises your chart in a way that celebrates your most distinctive qualities. A community or cause you care about is ready for your most innovative contribution."
  },
  Pisces: {
    yesterday: "Neptune's mystical current carried beautiful creative and spiritual gifts to your doorstep yesterday. Your imagination painted possibilities that transcend the ordinary. Someone you connected with mirrored your depth.",
    today:     "Today, Pisces, the boundary between your inner and outer worlds is luminously thin. Trust your dreams, your intuition, your creative impulses — they are messages from the cosmic intelligence that flows through you.",
    tomorrow:  "Tomorrow's Neptune alignment deepens your sensitivity to the sacred in everyday moments. An artistic, spiritual, or compassionate act you take will ripple further than you imagine. You are a vessel for something larger."
  }
};

// Deterministic ratings: base per element, shifted by day
const elementBase = {
  Fire:  { love: 4, career: 4, health: 3, luck: 5 },
  Earth: { love: 3, career: 5, health: 4, luck: 3 },
  Air:   { love: 4, career: 4, health: 3, luck: 4 },
  Water: { love: 5, career: 3, health: 4, luck: 4 },
};

const dayOffsets = {
  yesterday: { love: 0, career: -1, health: 0, luck: -1 },
  today:     { love: 0, career:  0, health: 0, luck:  0 },
  tomorrow:  { love: 1, career:  1, health: 0, luck:  1 },
};

const zodiacElements = {
  Aries: 'Fire', Leo: 'Fire', Sagittarius: 'Fire',
  Taurus: 'Earth', Virgo: 'Earth', Capricorn: 'Earth',
  Gemini: 'Air', Libra: 'Air', Aquarius: 'Air',
  Cancer: 'Water', Scorpio: 'Water', Pisces: 'Water',
};

function clamp(val) {
  return Math.min(5, Math.max(1, val));
}

export function getOfflineHoroscope(signName, day = 'today') {
  const texts = horoscopeTexts[signName] || horoscopeTexts['Aries'];
  const horoscope_text = texts[day] || texts['today'];

  const element = zodiacElements[signName] || 'Fire';
  const base    = elementBase[element];
  const offsets = dayOffsets[day] || dayOffsets['today'];

  return {
    love_rating:    clamp(base.love    + offsets.love),
    career_rating:  clamp(base.career  + offsets.career),
    health_rating:  clamp(base.health  + offsets.health),
    luck_rating:    clamp(base.luck    + offsets.luck),
    horoscope_text,
  };
}
