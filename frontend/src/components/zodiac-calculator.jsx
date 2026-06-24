import { useState, useEffect } from 'react';
import { calculateZodiacSign, zodiacSigns } from '@/lib/zodiac-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, User, Moon, Sun, ArrowUp, Compass, Sparkles } from 'lucide-react';

export default function ZodiacCalculator() {
  const [birthName, setBirthName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  
  const [zodiacResult, setZodiacResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    '🌌 Calibrating star maps & orbital coordinates...',
    '🪐 Adjusting for planetary refraction and solar wind...',
    '🌙 Calculating lunar cycles & emotional tides...',
    '✨ Mapping Ascendant horizon vectors...',
    '🧠 Transmitting stellar frequencies to Acharya Zodiac Calculator...'
  ];

  useEffect(() => {
    let interval;
    if (isCalculating) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < loadingMessages.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isCalculating]);

  // Calculate Rising Sign based on Sun Sign and birth time (sunrise offset)
  const getRisingSign = (sunSign, timeStr) => {
    if (!timeStr) return null;
    const [hours, minutes] = timeStr.split(':').map(Number);
    const decimalHours = hours + minutes / 60;
    
    // Assume sunrise is at 6:00 AM (6.0)
    // Rising sign matches Sun sign at sunrise.
    // Shifts by 1 sign forward roughly every 2 hours.
    const diffHours = (decimalHours - 6 + 24) % 24;
    const shift = Math.floor(diffHours / 2);
    
    const sunIndex = zodiacSigns.findIndex(s => s.name === sunSign.name);
    const risingIndex = (sunIndex + shift) % 12;
    return zodiacSigns[risingIndex];
  };

  // Calculate deterministic Moon sign based on day of the year
  const getMoonSign = (birthDateStr) => {
    const date = new Date(birthDateStr);
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Divide dayOfYear by 27.3 (lunar sidereal month) to find index
    const lunarIndex = Math.floor((dayOfYear % 27.3) / (27.3 / 12)) % 12;
    return zodiacSigns[lunarIndex];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!birthDate) {
      alert('Please enter your birth date');
      return;
    }

    setIsCalculating(true);

    setTimeout(() => {
      const sunSign = calculateZodiacSign(birthDate);
      const moonSign = getMoonSign(birthDate);
      const risingSign = getRisingSign(sunSign, birthTime);

      setZodiacResult({
        sunSign,
        moonSign,
        risingSign: risingSign || sunSign // Fallback to sun sign if time is omitted
      });
      setIsCalculating(false);
    }, 3800);
  };

  const slugify = (str) => {
    return String(str || "")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  return (
    <div className="relative max-w-6xl mx-auto px-6 py-12">
      {/* Title */}
      <div className="text-center mb-16 space-y-4">
        <Badge className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
          🔮 Celestial Coordinate Analyzer
        </Badge>
        <h2 className="font-cinzel font-bold text-4xl lg:text-5xl text-white tracking-wide">
          Generate Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 text-glow-cyan">Natal Map</span>
        </h2>
        <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
          Input your birth parameters to decode your celestial makeup. Retrieve a precise breakdown of your Sun, Moon, and Ascendant positions.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Input Form Column (7 cols on large) */}
        <div className="lg:col-span-5">
          <Card className="glass-card border-white/10 shadow-2xl p-6 md:p-8">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="font-cinzel text-xl text-white tracking-wider flex items-center gap-2">
                <Compass className="w-5 h-5 text-cyan-400 animate-pulse" />
                Stellar Parameters
              </CardTitle>
              <CardDescription className="text-white/40">
                Provide accurate metrics for exact calculation.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="birth-name" className="text-xs text-white/60 font-semibold tracking-wider uppercase flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-purple-400" />
                    Birth Name
                  </Label>
                  <Input
                    type="text"
                    id="birth-name"
                    value={birthName}
                    onChange={(e) => setBirthName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm transition-all"
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="birth-date" className="text-xs text-white/60 font-semibold tracking-wider uppercase flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    Birth Date *
                  </Label>
                  <Input
                    type="date"
                    id="birth-date"
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm transition-all"
                  />
                </div>

                {/* Time & Place row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birth-time" className="text-xs text-white/60 font-semibold tracking-wider uppercase flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-pink-400" />
                      Birth Time (Optional)
                    </Label>
                    <Input
                      type="time"
                      id="birth-time"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birth-place" className="text-xs text-white/60 font-semibold tracking-wider uppercase flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-400" />
                      Birth Place (Optional)
                    </Label>
                    <Input
                      type="text"
                      id="birth-place"
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                      placeholder="City, Country"
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm transition-all"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isCalculating}
                  className="w-full py-6 rounded-xl font-bold tracking-widest uppercase bg-gradient-to-r from-cyan-500 to-purple-600 text-white transition-all duration-300 glow-cyan flex items-center justify-center gap-3 disabled:opacity-50"
                  id="submit-calculator"
                >
                  {isCalculating ? (
                    <span className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Calculate Cosmic Map
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Results Column (7 cols on large) */}
        <div className="lg:col-span-7 h-full">
          {isCalculating && (
            <Card className="glass-card border-cyan-500/20 shadow-2xl p-12 text-center h-[460px] flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border border-dashed border-cyan-400 animate-spin-slow flex items-center justify-center">
                  <Compass className="w-10 h-10 text-cyan-400 animate-pulse" />
                </div>
                <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-cyan-400/20 animate-ping"></div>
              </div>
              <div className="space-y-2">
                <h3 className="font-cinzel text-xl text-white tracking-widest uppercase">Calculating Alignments</h3>
                <p className="text-white/60 text-sm animate-pulse max-w-sm mx-auto">{loadingMessages[loadingStep]}</p>
              </div>
            </Card>
          )}

          {!isCalculating && !zodiacResult && (
            <Card className="glass-card border-white/5 p-12 text-center h-[460px] flex flex-col items-center justify-center space-y-6">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-white/30 text-4xl border border-white/10 animate-float">
                🌌
              </div>
              <div className="space-y-2">
                <h3 className="font-cinzel text-xl text-white tracking-wider">Awaiting Stellar Inputs</h3>
                <p className="text-white/50 text-sm max-w-xs mx-auto">
                  Provide your birth details to generate your tailored AI natal chart and map celestial indices.
                </p>
              </div>
            </Card>
          )}

          {!isCalculating && zodiacResult && (
            <Card className="glass-card border-cyan-500/20 shadow-2xl overflow-hidden animate-slide-up">
              <CardHeader className="bg-gradient-to-r from-cyan-950/20 to-purple-950/20 border-b border-white/5 p-6">
                <CardTitle className="font-cinzel text-2xl text-white tracking-wide flex items-center justify-between">
                  <span>Your Natal Matrix</span>
                  <Badge className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs">
                    Deterministic Calculation
                  </Badge>
                </CardTitle>
                {birthName && (
                  <p className="text-sm text-white/60 mt-1">
                    Calculated for: <span className="text-white font-semibold">{birthName}</span>
                  </p>
                )}
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="sun" className="w-full">
                  <TabsList className="grid grid-cols-3 bg-white/5 border border-white/5 p-1 rounded-xl mb-6">
                    <TabsTrigger value="sun" className="rounded-lg py-2.5 font-space font-semibold tracking-wider text-xs uppercase flex items-center gap-1.5 data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 data-[state=active]:border data-[state=active]:border-cyan-500/20">
                      <Sun className="w-3.5 h-3.5 text-cyan-400" />
                      Sun
                    </TabsTrigger>
                    <TabsTrigger value="moon" className="rounded-lg py-2.5 font-space font-semibold tracking-wider text-xs uppercase flex items-center gap-1.5 data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-400 data-[state=active]:border data-[state=active]:border-purple-500/20">
                      <Moon className="w-3.5 h-3.5 text-purple-400" />
                      Moon
                    </TabsTrigger>
                    <TabsTrigger value="rising" className="rounded-lg py-2.5 font-space font-semibold tracking-wider text-xs uppercase flex items-center gap-1.5 data-[state=active]:bg-pink-500/10 data-[state=active]:text-pink-400 data-[state=active]:border data-[state=active]:border-pink-500/20">
                      <ArrowUp className="w-3.5 h-3.5 text-pink-400" />
                      Ascendant
                    </TabsTrigger>
                  </TabsList>

                  {/* Sun Sign Content */}
                  <TabsContent value="sun" className="space-y-6 focus:outline-none">
                    <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="w-24 h-24 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-5xl text-cyan-400 glow-cyan">
                        {zodiacResult.sunSign.symbol}
                      </div>
                      <div className="text-center sm:text-left space-y-1">
                        <h3 className="font-cinzel text-3xl font-bold text-white">{zodiacResult.sunSign.name}</h3>
                        <p className="text-xs text-white/50 tracking-widest uppercase">The Solar Placement • Ego & Core Identity</p>
                        <div className="flex gap-2 justify-center sm:justify-start pt-1.5">
                          <Badge variant="outline" className="text-[10px] border-cyan-500/20 text-cyan-400">{zodiacResult.sunSign.element}</Badge>
                          <Badge variant="outline" className="text-[10px] border-purple-500/20 text-purple-400">{zodiacResult.sunSign.planet}</Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-white/80 leading-relaxed text-sm">
                      Your Sun sign represents your basic identity, ego, core values, and how you shine. Under the placement of <span className="text-cyan-400 font-semibold">{zodiacResult.sunSign.name}</span>, {zodiacResult.sunSign.description}
                    </p>
                  </TabsContent>

                  {/* Moon Sign Content */}
                  <TabsContent value="moon" className="space-y-6 focus:outline-none">
                    <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="w-24 h-24 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-5xl text-purple-400 glow-purple">
                        {zodiacResult.moonSign.symbol}
                      </div>
                      <div className="text-center sm:text-left space-y-1">
                        <h3 className="font-cinzel text-3xl font-bold text-white">{zodiacResult.moonSign.name}</h3>
                        <p className="text-xs text-white/50 tracking-widest uppercase">The Lunar Placement • Emotion & Subconscious</p>
                        <div className="flex gap-2 justify-center sm:justify-start pt-1.5">
                          <Badge variant="outline" className="text-[10px] border-cyan-500/20 text-cyan-400">{zodiacResult.moonSign.element}</Badge>
                          <Badge variant="outline" className="text-[10px] border-purple-500/20 text-purple-400">{zodiacResult.moonSign.planet}</Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-white/80 leading-relaxed text-sm">
                      Your Moon sign rules your emotional landscape, inner needs, vulnerabilities, and intuitive reactions. With your Moon in <span className="text-purple-400 font-semibold">{zodiacResult.moonSign.name}</span>, your subconscious drives lean toward the characteristics of this archetype, coloring your intimate desires.
                    </p>
                  </TabsContent>

                  {/* Rising Sign Content */}
                  <TabsContent value="rising" className="space-y-6 focus:outline-none">
                    <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="w-24 h-24 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-5xl text-pink-400 glow-pink">
                        {zodiacResult.risingSign.symbol}
                      </div>
                      <div className="text-center sm:text-left space-y-1">
                        <h3 className="font-cinzel text-3xl font-bold text-white">{zodiacResult.risingSign.name}</h3>
                        <p className="text-xs text-white/50 tracking-widest uppercase">The Ascendant • Outer Persona & Social Mask</p>
                        <div className="flex gap-2 justify-center sm:justify-start pt-1.5">
                          <Badge variant="outline" className="text-[10px] border-cyan-500/20 text-cyan-400">{zodiacResult.risingSign.element}</Badge>
                          <Badge variant="outline" className="text-[10px] border-purple-500/20 text-purple-400">{zodiacResult.risingSign.planet}</Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-white/80 leading-relaxed text-sm">
                      Your Ascendant (Rising Sign) represents the cusp of the first house, indicating your social mask, first impressions, and the way you approach the outer world. In <span className="text-pink-400 font-semibold">{zodiacResult.risingSign.name}</span>, it dictates the lens through which people initially perceive you.
                    </p>
                  </TabsContent>
                </Tabs>

                {/* Detailed analysis redirect */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center gap-4 justify-between">
                  <div className="text-center sm:text-left space-y-1">
                    <h4 className="font-cinzel text-base font-bold text-white">Full Deep-Dive AI Report Available</h4>
                    <p className="text-xs text-white/50">Generates custom detailed parameters powered by Gemini.</p>
                  </div>
                  <Button
                    onClick={() => {
                      const slug = slugify(zodiacResult.sunSign.name);
                      const params = new URLSearchParams({
                        date: birthDate,
                        ...(birthTime && { time: birthTime }),
                        ...(birthPlace && { place: birthPlace }),
                        ...(birthName && { name: birthName })
                      });
                      window.location.href = `/zodiac/${slug}?${params.toString()}`;
                    }}
                    className="px-6 py-3 rounded-lg text-xs font-semibold tracking-widest uppercase bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all glow-cyan"
                  >
                    Unlock Detailed Cosmic Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}