import React, { useState } from 'react';
import { zodiacSigns } from '@/lib/zodiac-data';
import { getCompatibility } from '@/lib/compatibility-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';

export default function Compatibility() {
  const [signA, setSignA] = useState('');
  const [signB, setSignB] = useState('');
  const [result, setResult] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMatch = (e) => {
    e.preventDefault();
    if (!signA || !signB) { alert('Please select both signs.'); return; }

    // Brief visual animation, then compute offline
    setIsAnimating(true);
    setResult(null);
    setTimeout(() => {
      setResult(getCompatibility(signA, signB));
      setIsAnimating(false);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white font-space relative z-10">
      {/* Title */}
      <div className="text-center mb-16 space-y-4">
        <Badge className="bg-pink-500/10 border border-pink-500/30 text-pink-400 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
          ❤️ Love & Synergy Matcher
        </Badge>
        <h1 className="font-cinzel font-bold text-4xl lg:text-5xl text-white tracking-wide">
          Celestial{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            Synergy
          </span>
        </h1>
        <p className="text-lg text-white/60 max-w-xl mx-auto font-light">
          Compare the elemental frequencies of two zodiac signs — Love, Friendship, and Career compatibility calculated instantly.
        </p>
      </div>

      {/* Select Form */}
      <Card className="glass-card border-white/10 shadow-2xl p-6 md:p-8 mb-8">
        <form onSubmit={handleMatch} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8 items-center relative">
            {/* Connector heart */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 items-center justify-center z-20">
              <Heart className={`w-4 h-4 text-pink-400 ${isAnimating ? 'animate-ping' : ''}`} />
            </div>

            <div className="space-y-3 text-left">
              <label htmlFor="sign-a-select" className="text-xs text-white/60 font-semibold tracking-wider uppercase">
                Select Sign Alpha
              </label>
              <select
                id="sign-a-select"
                value={signA}
                onChange={(e) => { setSignA(e.target.value); setResult(null); }}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c0f1e] text-white focus:ring-2 focus:ring-pink-500 transition-all font-space outline-none cursor-pointer"
              >
                <option value="">-- Choose Sign Alpha --</option>
                {zodiacSigns.map((s) => (
                  <option key={`a-${s.name}`} value={s.name}>{s.symbol} {s.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3 text-left">
              <label htmlFor="sign-b-select" className="text-xs text-white/60 font-semibold tracking-wider uppercase">
                Select Sign Beta
              </label>
              <select
                id="sign-b-select"
                value={signB}
                onChange={(e) => { setSignB(e.target.value); setResult(null); }}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c0f1e] text-white focus:ring-2 focus:ring-pink-500 transition-all font-space outline-none cursor-pointer"
              >
                <option value="">-- Choose Sign Beta --</option>
                {zodiacSigns.map((s) => (
                  <option key={`b-${s.name}`} value={s.name}>{s.symbol} {s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center pt-2">
            <Button
              type="submit"
              disabled={isAnimating}
              id="analyze-compatibility-btn"
              className="px-12 py-5 rounded-xl font-bold tracking-widest uppercase text-sm bg-gradient-to-r from-pink-500 to-purple-600 text-white transition-all glow-pink flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
            >
              {isAnimating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Merging Fields…
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4" />
                  Analyze Compatibility
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>

      {/* Merging animation */}
      {isAnimating && (
        <Card className="glass-card border-pink-500/20 p-12 text-center h-[260px] flex flex-col items-center justify-center space-y-6">
          <div className="relative flex items-center justify-center w-24 h-24">
            <div className="absolute w-24 h-24 rounded-full border border-dashed border-pink-500 animate-spin-slow" />
            <div className="absolute w-16 h-16 rounded-full border border-dashed border-purple-500 animate-spin-reverse-slow" />
            <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
          </div>
          <p className="text-white/40 text-xs animate-pulse tracking-widest uppercase">
            Calculating elemental synergy…
          </p>
        </Card>
      )}

      {/* Result */}
      {!isAnimating && result && (
        <Card className="glass-card border-pink-500/20 shadow-2xl p-6 md:p-8 animate-slide-up space-y-8">
          <CardHeader className="p-0 text-center border-b border-white/5 pb-6">
            <CardTitle className="font-cinzel text-2xl tracking-wider uppercase flex items-center justify-center gap-4">
              <span>{zodiacSigns.find(s => s.name === signA)?.symbol} {signA}</span>
              <Heart className="w-6 h-6 text-pink-500 fill-pink-500 animate-pulse" />
              <span>{zodiacSigns.find(s => s.name === signB)?.symbol} {signB}</span>
            </CardTitle>
            <CardDescription className="text-white/40 mt-1">
              Elemental synastry profile — calculated offline using classical astrology.
            </CardDescription>
          </CardHeader>

          {/* Score Rings */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Love', score: result.love, color: '#f472b6' },
              { label: 'Friendship', score: result.friendship, color: '#c084fc' },
              { label: 'Career', score: result.career, color: '#22d3ee' },
            ].map(({ label, score, color }) => (
              <div key={label} className="glass-card p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-2">
                <span className="text-xs text-white/50 tracking-wider uppercase">{label}</span>
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <span className="text-lg font-bold" style={{ color }}>{score}%</span>
                  <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
                    <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="transparent" />
                    <circle cx="32" cy="32" r="28" stroke={color} strokeWidth="4" fill="transparent"
                      strokeDasharray={2 * Math.PI * 28}
                      strokeDashoffset={2 * Math.PI * 28 * (1 - score / 100)}
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Synthesis */}
          <div className="space-y-4 text-left border-t border-white/5 pt-6">
            <h4 className="font-cinzel text-lg font-bold text-pink-400 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-400" />
              Elemental Synthesis
            </h4>
            <p className="text-white/80 leading-relaxed text-base font-light bg-white/5 p-6 rounded-2xl border border-white/5">
              {result.synthesis}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
