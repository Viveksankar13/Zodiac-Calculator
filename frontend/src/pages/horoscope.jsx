import React, { useState } from 'react';
import { zodiacSigns } from '@/lib/zodiac-data';
import { getOfflineHoroscope } from '@/lib/horoscope-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Briefcase, Star, Activity } from 'lucide-react';

export default function Horoscope() {
  const [selectedSign, setSelectedSign] = useState(zodiacSigns[0].name);
  const [selectedDay, setSelectedDay] = useState('today');
  const [horoscopeData, setHoroscopeData] = useState(null);

  const days = [
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Today',     value: 'today'     },
    { label: 'Tomorrow',  value: 'tomorrow'  },
  ];

  // Instant — no API, no loading state needed
  const handleGetForecast = () => {
    setHoroscopeData(getOfflineHoroscope(selectedSign, selectedDay));
  };

  const currentSign = zodiacSigns.find(s => s.name === selectedSign) || zodiacSigns[0];

  const renderStars = (rating) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`w-4 h-4 ${s <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/10'}`} />
      ))}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-white font-space relative z-10">
      {/* Title */}
      <div className="text-center mb-12 space-y-4">
        <Badge className="bg-purple-500/10 border border-purple-500/30 text-purple-400 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
          🪐 Daily Cosmic Transits
        </Badge>
        <h1 className="font-cinzel font-bold text-4xl lg:text-5xl text-white tracking-wide">
          Stellar{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Horoscopes
          </span>
        </h1>
        <p className="text-lg text-white/60 max-w-xl mx-auto font-light">
          Choose your sign and day, then reveal your personalised cosmic forecast — instantly, offline.
        </p>
      </div>

      {/* Sign Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-3 mb-10">
        {zodiacSigns.map((sign) => {
          const isSelected = selectedSign === sign.name;
          return (
            <button
              key={sign.name}
              onClick={() => { setSelectedSign(sign.name); setHoroscopeData(null); }}
              className={`p-3 rounded-xl flex flex-col items-center justify-center border text-center transition-all ${
                isSelected
                  ? 'bg-purple-500/15 border-purple-500/50 glow-purple text-purple-300 scale-105'
                  : 'bg-white/5 border-white/5 hover:border-white/20'
              }`}
            >
              <span className="text-2xl mb-1">{sign.symbol}</span>
              <span className="text-[10px] font-semibold tracking-widest uppercase select-none">{sign.name.slice(0, 3)}</span>
            </button>
          );
        })}
      </div>

      {/* Day pills + Fetch button */}
      <div className="glass-card border border-white/10 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="flex gap-2">
          {days.map((d) => (
            <button
              key={d.value}
              onClick={() => { setSelectedDay(d.value); setHoroscopeData(null); }}
              className={`py-2 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                selectedDay === d.value
                  ? 'bg-purple-500/15 border-purple-500/50 text-purple-300 font-bold'
                  : 'bg-white/5 border-white/5 hover:bg-white/10'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <Button
          onClick={handleGetForecast}
          id="get-forecast-btn"
          className="px-8 py-3 rounded-xl font-bold tracking-widest uppercase text-xs bg-gradient-to-r from-purple-500 to-cyan-600 text-white glow-purple flex items-center gap-2 whitespace-nowrap"
        >
          <Sparkles className="w-4 h-4" />
          Get {currentSign.name} Forecast
        </Button>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: Profile + Ratings */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="glass-card border-white/10 shadow-2xl p-6">
            <h3 className="font-cinzel text-lg tracking-wider text-white mb-6 uppercase border-b border-white/5 pb-3">
              Sign Profile
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/50 uppercase">Ruler</span>
                <span className="text-sm font-semibold">{currentSign.planet}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/50 uppercase">Element</span>
                <span className="text-sm font-semibold">{currentSign.element}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/50 uppercase">Color Affinity</span>
                <span className="text-sm font-semibold">{currentSign.color}</span>
              </div>
            </div>
          </Card>

          {horoscopeData && (
            <Card className="glass-card border-white/10 shadow-2xl p-6 space-y-5">
              <h3 className="font-cinzel text-lg tracking-wider text-white border-b border-white/5 pb-3 uppercase">Ratings</h3>
              <div className="space-y-4">
                {[
                  { label: 'Love',   icon: <Heart className="w-3.5 h-3.5 text-pink-400" />,    rating: horoscopeData.love_rating },
                  { label: 'Career', icon: <Briefcase className="w-3.5 h-3.5 text-cyan-400" />,  rating: horoscopeData.career_rating },
                  { label: 'Health', icon: <Activity className="w-3.5 h-3.5 text-green-400" />, rating: horoscopeData.health_rating },
                  { label: 'Luck',   icon: <Star className="w-3.5 h-3.5 text-yellow-400" />,   rating: horoscopeData.luck_rating },
                ].map(({ label, icon, rating }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs text-white/60 uppercase flex items-center gap-1.5">{icon}{label}</span>
                    {renderStars(rating)}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right: Forecast */}
        <div className="lg:col-span-8">
          {!horoscopeData && (
            <Card className="glass-card border-white/5 p-12 text-center h-[380px] flex flex-col items-center justify-center space-y-6">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-4xl border border-white/10 animate-pulse">
                🪐
              </div>
              <div className="space-y-2">
                <h3 className="font-cinzel text-xl text-white tracking-wider">Awaiting Your Request</h3>
                <p className="text-white/50 text-sm max-w-xs mx-auto">
                  Choose your sign and day above, then click{' '}
                  <span className="text-purple-300 font-semibold">Get Forecast</span>.
                </p>
              </div>
            </Card>
          )}

          {horoscopeData && (
            <Card className="glass-card border-purple-500/20 shadow-2xl p-6 md:p-8 animate-slide-up space-y-6">
              <CardHeader className="p-0 border-b border-white/5 pb-6">
                <CardTitle className="font-cinzel text-3xl font-bold tracking-wide flex items-center gap-3">
                  <span className="text-4xl">{currentSign.symbol}</span>
                  <div>
                    <h2 className="text-white font-bold text-2xl">{selectedSign} Forecast</h2>
                    <span className="text-xs text-white/40 font-semibold uppercase tracking-wider">
                      Astral alignments for {selectedDay}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-left space-y-4">
                <h4 className="font-cinzel text-lg font-bold text-purple-400 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  Cosmic Analysis
                </h4>
                <p className="text-white/80 leading-relaxed text-base font-light bg-white/5 p-6 rounded-2xl border border-white/5">
                  {horoscopeData.horoscope_text}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
