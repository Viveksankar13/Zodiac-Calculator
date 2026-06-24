import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getCardMeaning, getSpreadAdvice } from '@/lib/tarot-data';
import { Sparkles, Eye, RotateCcw } from 'lucide-react';

const tarotDeck = [
  { name: 'The Fool',          symbol: '🃏', color: 'from-amber-400 to-yellow-600' },
  { name: 'The Magician',      symbol: '🧙‍♂️', color: 'from-cyan-400 to-blue-600' },
  { name: 'The High Priestess',symbol: '🔮', color: 'from-purple-500 to-indigo-700' },
  { name: 'The Empress',       symbol: '👑', color: 'from-emerald-400 to-teal-600' },
  { name: 'The Emperor',       symbol: '⚔️', color: 'from-red-500 to-rose-700' },
  { name: 'The Lovers',        symbol: '💖', color: 'from-pink-400 to-rose-500' },
  { name: 'The Chariot',       symbol: '🛡️', color: 'from-blue-400 to-cyan-500' },
  { name: 'Strength',          symbol: '🦁', color: 'from-amber-500 to-orange-600' },
  { name: 'The Hermit',        symbol: '🕯️', color: 'from-slate-500 to-zinc-700' },
  { name: 'Wheel of Fortune',  symbol: '☸️', color: 'from-yellow-400 to-amber-600' },
  { name: 'Death',             symbol: '💀', color: 'from-zinc-800 to-black' },
  { name: 'The Tower',         symbol: '⚡', color: 'from-orange-600 to-red-800' },
  { name: 'The Star',          symbol: '🌟', color: 'from-cyan-300 to-purple-500' },
  { name: 'The Moon',          symbol: '🌙', color: 'from-indigo-900 to-slate-700' },
  { name: 'The Sun',           symbol: '☀️', color: 'from-amber-400 to-red-500' },
  { name: 'The World',         symbol: '🌍', color: 'from-emerald-500 to-blue-600' },
];

const positionLabels = ['Past', 'Present', 'Future'];

export default function Tarot() {
  const [drawnCards, setDrawnCards]   = useState([]);
  const [flipped, setFlipped]         = useState([false, false, false]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [reading, setReading]         = useState(null);

  const drawSpread = () => {
    setIsShuffling(true);
    setReading(null);
    setFlipped([false, false, false]);

    setTimeout(() => {
      const shuffled  = [...tarotDeck].sort(() => 0.5 - Math.random());
      const selected  = shuffled.slice(0, 3).map((card) => ({
        ...card,
        orientation: Math.random() > 0.3 ? 'Upright' : 'Reversed',
      }));
      setDrawnCards(selected);
      setIsShuffling(false);
    }, 1400);
  };

  const flipCard = (idx) => {
    setFlipped((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  // Once all 3 cards are flipped, generate offline reading instantly
  const allFlipped = drawnCards.length === 3 && flipped.every(Boolean);

  const revealReading = () => {
    const [past, present, future] = drawnCards;
    setReading({
      past_meaning:    getCardMeaning(past.name,    past.orientation),
      present_meaning: getCardMeaning(present.name, present.orientation),
      future_meaning:  getCardMeaning(future.name,  future.orientation),
      overall_advice:  getSpreadAdvice(past.name, present.name, future.name),
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-white font-space relative z-10">
      {/* Title */}
      <div className="text-center mb-12 space-y-4">
        <Badge className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
          🃏 Three-Card Tarot Reading
        </Badge>
        <h1 className="font-cinzel font-bold text-4xl lg:text-5xl text-white tracking-wide">
          Tarot{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            Oracle
          </span>
        </h1>
        <p className="text-lg text-white/60 max-w-xl mx-auto font-light">
          Shuffle the deck and draw three cards to illuminate your Past, Present, and Future.
          All readings are instant — no API required.
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-14">
        <Button
          onClick={drawSpread}
          disabled={isShuffling}
          id="shuffle-draw"
          className="px-8 py-5 rounded-xl font-bold tracking-widest uppercase text-xs bg-gradient-to-r from-cyan-500 to-purple-600 text-white transition-all glow-cyan flex items-center gap-2 disabled:opacity-50"
        >
          <RotateCcw className={`w-4 h-4 ${isShuffling ? 'animate-spin' : ''}`} />
          {drawnCards.length > 0 ? 'Reshuffle & Draw' : 'Draw Spread'}
        </Button>

        {allFlipped && !reading && (
          <Button
            onClick={revealReading}
            id="reveal-reading-btn"
            className="px-8 py-5 rounded-xl font-bold tracking-widest uppercase text-xs bg-gradient-to-r from-pink-500 to-rose-600 text-white glow-pink flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Reveal Reading
          </Button>
        )}
      </div>

      {/* Shuffling animation */}
      {isShuffling && (
        <div className="h-[300px] flex flex-col items-center justify-center space-y-6">
          <div className="w-16 h-24 border border-cyan-400/30 rounded-xl bg-white/5 animate-pulse flex items-center justify-center text-3xl">
            🔮
          </div>
          <p className="text-white/40 text-xs tracking-widest uppercase animate-pulse">
            Shuffling major arcana deck…
          </p>
        </div>
      )}

      {/* Idle */}
      {!isShuffling && drawnCards.length === 0 && (
        <Card className="glass-card border-white/5 p-16 text-center h-[300px] flex flex-col items-center justify-center space-y-6">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-4xl border border-white/10 animate-float">
            🃏
          </div>
          <div className="space-y-2">
            <h3 className="font-cinzel text-xl text-white tracking-wider">The Deck Awaits</h3>
            <p className="text-white/50 text-sm max-w-sm mx-auto">
              Click <span className="text-cyan-300 font-semibold">Draw Spread</span> to lay your three cards.
            </p>
          </div>
        </Card>
      )}

      {/* Card Board */}
      {!isShuffling && drawnCards.length === 3 && (
        <div className="grid md:grid-cols-3 gap-8 justify-center mb-14 perspective-1000">
          {drawnCards.map((card, idx) => {
            const isFlipped  = flipped[idx];
            const isReversed = card.orientation === 'Reversed';

            return (
              <div key={idx} className="flex flex-col items-center space-y-4">
                <span className="text-xs text-white/55 tracking-widest uppercase font-semibold">
                  {positionLabels[idx]}
                </span>

                {/* 3D Flip Card */}
                <div
                  onClick={() => !isFlipped && flipCard(idx)}
                  className={`relative w-48 h-72 cursor-pointer transition-transform duration-700 preserve-3d ${
                    isFlipped ? 'rotate-y-180' : 'hover:scale-105'
                  }`}
                >
                  {/* Face-down back */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#0c0f20] to-[#04060d] border-2 border-cyan-500/20 flex flex-col items-center justify-center p-4 backface-hidden shadow-2xl">
                    <div className="w-12 h-12 rounded-full border border-cyan-500/10 flex items-center justify-center text-cyan-500/40 text-xl animate-pulse">
                      ✨
                    </div>
                    <span className="text-[10px] text-cyan-400/40 mt-4 tracking-widest uppercase font-semibold">
                      Click to Flip
                    </span>
                  </div>

                  {/* Face-up front */}
                  <div className={`absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br ${card.color} border-2 border-white/20 flex flex-col items-center justify-between p-6 backface-hidden rotate-y-180 shadow-2xl`}>
                    <div className="w-full flex justify-between items-center text-xs font-semibold tracking-wider text-white/80">
                      <span>{card.symbol}</span>
                      <span className="text-[10px] uppercase">{card.orientation}</span>
                    </div>
                    <div className={`text-6xl my-auto transition-transform ${isReversed ? 'rotate-180' : ''}`}>
                      {card.symbol}
                    </div>
                    <div className="text-center w-full">
                      <h4 className="font-cinzel text-lg font-bold tracking-wider">{card.name}</h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reading Result — offline, instant */}
      {reading && (
        <Card className="glass-card border-cyan-500/20 shadow-2xl p-6 md:p-8 animate-slide-up space-y-8">
          <CardHeader className="p-0 border-b border-white/5 pb-6">
            <CardTitle className="font-cinzel text-2xl tracking-wider text-cyan-400 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Your Three-Card Reading
            </CardTitle>
            <CardDescription className="text-white/40">
              Classical Major Arcana interpretations — calculated offline.
            </CardDescription>
          </CardHeader>

          {/* Card Meanings */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { pos: 'Past',    card: drawnCards[0], meaning: reading.past_meaning,    color: 'text-cyan-300' },
              { pos: 'Present', card: drawnCards[1], meaning: reading.present_meaning, color: 'text-purple-300' },
              { pos: 'Future',  card: drawnCards[2], meaning: reading.future_meaning,  color: 'text-pink-300' },
            ].map(({ pos, card, meaning, color }) => (
              <div key={pos} className="bg-white/5 p-5 rounded-2xl border border-white/5 space-y-3">
                <span className="text-xs text-white/40 tracking-wider uppercase font-bold">{pos}</span>
                <h4 className={`font-cinzel text-base font-bold ${color}`}>
                  {card.name} <span className="text-[10px] text-white/30">({card.orientation})</span>
                </h4>
                <p className="text-white/70 text-sm leading-relaxed font-light">{meaning}</p>
              </div>
            ))}
          </div>

          {/* Overall Advice */}
          <div className="space-y-4 text-left border-t border-white/5 pt-6">
            <h4 className="font-cinzel text-lg font-bold text-pink-400 flex items-center gap-2">
              <Eye className="w-5 h-5 text-pink-400" />
              Spread Synthesis
            </h4>
            <p className="text-white/80 leading-relaxed text-base font-light bg-white/5 p-6 rounded-2xl border border-white/5">
              {reading.overall_advice}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
