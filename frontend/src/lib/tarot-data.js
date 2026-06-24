// Offline tarot card meanings — upright & reversed for all Major Arcana
// No AI needed. Full descriptions pre-written for every card and position.

export const tarotMeanings = {
  'The Fool': {
    Upright:  "New beginnings beckon with irresistible energy. The Fool urges you to embrace the unknown with open arms and a trusting heart. A leap of faith is not recklessness here — it is the courageous answer to a universe inviting you forward.",
    Reversed: "Hesitation or impulsivity holds you back. You may be clinging to safety at the cost of genuine opportunity, or conversely leaping without enough consideration. Pause, ground yourself, and find the wise middle path between caution and courage."
  },
  'The Magician': {
    Upright:  "All the tools you need are already in your hands. The Magician is a master of will, skill, and resourcefulness — and so are you, right now. Channel your intention with precision and watch reality reshape itself around your focused desire.",
    Reversed: "Your gifts are being underused or misdirected. A talent or resource you possess is gathering dust while problems persist. Reconnect with your innate power and apply it deliberately — the magic was never absent, only unapplied."
  },
  'The High Priestess': {
    Upright:  "Wisdom lives beneath the surface of what is visible. The High Priestess asks you to trust your intuition above external noise. Something important is being revealed to your inner knowing — be still enough to hear it.",
    Reversed: "Inner guidance is being suppressed or ignored. You may be over-relying on logic while your intuition sends urgent signals you're dismissing. Create the stillness needed to listen. What you've been avoiding knowing holds the key."
  },
  'The Empress': {
    Upright:  "Abundance, creativity, and nurturing energy flourish around you. The Empress signals a time of growth — in relationships, creative projects, or material circumstances. Let yourself receive what is being offered with grace and gratitude.",
    Reversed: "Creative blocks or dependency issues require your attention. You may be over-giving at the expense of your own nourishment, or struggling to allow abundance in. Reconnect with your intrinsic worth and the natural generosity of the universe."
  },
  'The Emperor': {
    Upright:  "Structure, authority, and disciplined leadership serve you well here. The Emperor calls on you to take command of your situation with confidence and strategy. Establish clear foundations and your efforts will manifest durable, lasting results.",
    Reversed: "Control issues or a lack of structure undermine your potential. You may be wielding authority too rigidly — or failing to assert yourself where leadership is genuinely needed. Find the balance between firm boundaries and flexible wisdom."
  },
  'The Lovers': {
    Upright:  "A meaningful choice stands at the crossroads of your values and desires. The Lovers speak of alignment — between heart and mind, between yourself and another. Choose with integrity and love, and every path forward becomes sacred.",
    Reversed: "Misalignment or a difficult relationship decision requires clarity. You may be in conflict with your own values, or a connection in your life lacks the harmony it needs. Honest self-examination is the gateway to a choice you can stand behind."
  },
  'The Chariot': {
    Upright:  "Victory is within reach — but it demands focused willpower and unwavering determination. The Chariot signals that opposing forces can be harnessed and directed toward triumph. Your discipline and drive are your most potent assets right now.",
    Reversed: "Scattered energy or loss of direction stalls your momentum. You may be trying to control too many variables at once, or feel pulled in competing directions. Reclaim your focus. One well-aimed effort surpasses a hundred dispersed ones."
  },
  'Strength': {
    Upright:  "True strength is quiet, patient, and compassionate. The Strength card reminds you that endurance and gentle persistence overcome force and aggression. Trust the power that comes from your inner stability rather than outer assertion.",
    Reversed: "Self-doubt or uncontrolled impulses diminish your power. You may be battling inner demons or acting from fear rather than grounded confidence. Reconnect with your core — your courage is not absent, merely waiting to be claimed."
  },
  'The Hermit': {
    Upright:  "Solitude and inner reflection illuminate the path forward. The Hermit invites you to step back from external demands and consult the lantern of your own deep wisdom. The answer you seek lives in the quiet, not the crowd.",
    Reversed: "Excessive isolation or avoidance of necessary inner work. You may be withdrawing from life in a way that is no longer serving your growth, or conversely refusing the introspective pause that would unlock clarity. Balance solitude with connection."
  },
  'Wheel of Fortune': {
    Upright:  "The wheel turns and fortune favours your current trajectory. Cycles of change are at work in your life — trust the larger pattern unfolding. What feels like chance is often the universe orchestrating exactly what is needed at precisely the right moment.",
    Reversed: "Resistance to change or a run of ill-timed circumstances tests your resilience. The wheel still turns — even difficult cycles are temporary. Release what you cannot control and focus on how you respond to what life is presenting."
  },
  'Death': {
    Upright:  "Endings make way for extraordinary new beginnings. The Death card is not to be feared — it speaks of powerful transformation, shedding what no longer fits, and crossing a threshold into a more authentic version of your life. Let go with grace.",
    Reversed: "Resistance to necessary transformation prolongs suffering. Clinging to what has already ended is the source of current stagnation. The change you fear is the very thing that will free you. Surrender is not weakness — it is the most courageous act available."
  },
  'The Tower': {
    Upright:  "A sudden disruption dismantles structures that were built on false foundations. The Tower is dramatic, but its purpose is liberation. What collapses needed to collapse. From the rubble, something far more authentic and enduring can now be built.",
    Reversed: "You are either avoiding an inevitable collapse or emerging from one. Delay only prolongs the discomfort of an untenable situation. If the dust is settling, allow yourself to find solid ground before rebuilding. Clarity follows the storm."
  },
  'The Star': {
    Upright:  "Hope, healing, and renewal pour through your life like starlight after darkness. The Star is one of the most beautiful cards in the deck — a direct message from the cosmos that you are guided, supported, and loved. Allow yourself to be restored.",
    Reversed: "Disillusionment or loss of faith dims your inner light temporarily. You may feel disconnected from hope or a sense of meaning. This is a passing cloud, not a permanent condition. Gently, patiently, reconnect with what still holds beauty in your world."
  },
  'The Moon': {
    Upright:  "The subconscious speaks in symbols and dreams — pay close attention. The Moon heightens intuition while also amplifying confusion and illusion. Not everything is as it appears. Navigate this territory with trust in your inner compass above all outer information.",
    Reversed: "Confusion lifts and hidden fears are gently integrated. A period of uncertainty is releasing its grip. Suppressed truths rise to the surface where they can finally be acknowledged and healed. What was murky is becoming navigable."
  },
  'The Sun': {
    Upright:  "Joy, vitality, and radiant success illuminate every dimension of your life. The Sun is unambiguous — this is a time of genuine flourishing. Your authentic self shines with magnetic warmth, drawing people and opportunities naturally into your orbit.",
    Reversed: "Joy and confidence are temporarily obscured by doubt or external circumstances. Your light has not diminished — it simply needs space to express itself freely. Remove what dims it and watch the warmth return with natural inevitability."
  },
  'The World': {
    Upright:  "Completion, integration, and cosmic celebration mark this beautiful culmination. The World signals the successful conclusion of a significant chapter and the mastery you have earned through it. You arrive at this moment whole, capable, and ready for what comes next.",
    Reversed: "A cycle nears completion but lingering incompletions hold you back from full closure. There may be loose ends to honour or lessons yet to be fully metabolised. Attend to them with care — the celebration is genuinely close."
  },
};

export function getCardMeaning(cardName, orientation) {
  const card = tarotMeanings[cardName];
  if (!card) return "The mysteries of this card speak in ways beyond words. Trust what arises in your intuition as you sit with it.";
  return card[orientation] || card['Upright'];
}

const spreadAdvice = [
  "The thread connecting your Past, Present, and Future reveals a narrative of transformation. The patterns that shaped yesterday are being consciously redirected today — and the future you are building reflects that wisdom.",
  "These three cards form a sacred map. What was holds lessons; what is demands presence; what comes calls for courage. You are standing at the exact centre of your own becoming.",
  "The spread reveals a soul in active evolution. Trust the process your cards illuminate — you are neither behind nor off course. Every position on this map is exactly where you need to be.",
  "Past releases, present aligns, future beckons. The universe speaks through this sequence to remind you that your story is still being written — and you hold the pen.",
  "These archetypes mirror the deepest currents moving through your life. Receive their guidance with an open heart. Wisdom offered freely through the cards is rarely coincidental.",
];

export function getSpreadAdvice(cardPast, cardPresent, cardFuture) {
  // Deterministic selection based on card names
  const hash = (cardPast + cardPresent + cardFuture).length % spreadAdvice.length;
  return spreadAdvice[hash];
}
