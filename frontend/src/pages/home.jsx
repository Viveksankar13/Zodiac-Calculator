import React, { useState } from 'react';
import { Link } from 'wouter';
import ZodiacCalculator from '@/components/zodiac-calculator';
import { zodiacSigns } from '@/lib/zodiac-data';
import { Sparkles, Heart, Compass, Eye, ArrowRight } from 'lucide-react';

export default function Home() {
  const [hoveredSign, setHoveredSign] = useState(null);

  const slugify = (str) => {
    return String(str || "")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const handleScrollToCalculator = () => {
    const el = document.getElementById('zodiac-calculator-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // SVG parameters for the interactive zodiac wheel
  const size = 320;
  const center = size / 2;
  const radius = size / 2 - 10;
  const innerRadius = 70;

  return (
    <div className="min-h-screen text-white font-space relative pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-16 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 justify-between">
        <div className="space-y-6 flex-1 text-left max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            AI-Driven Cosmic Oracle
          </div>
          <h1 className="font-cinzel text-5xl md:text-6xl font-bold tracking-wide leading-tight">
            Unlock Your <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 text-glow-cyan">
              Cosmic Blueprint
            </span>
          </h1>
          <p className="text-lg text-white/70 leading-relaxed font-light">
            Decipher the hidden currents of the cosmos. Our quantum intelligence maps planetary coordinates, lunar houses, and tarot vectors to provide deep, custom-tailored self-realization reports.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleScrollToCalculator}
              className="px-8 py-4 rounded-xl font-bold tracking-wider uppercase text-sm bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition-all duration-300 glow-cyan flex items-center justify-center gap-2"
            >
              Reveal My Sign
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/tarot"
              className="px-8 py-4 rounded-xl font-bold tracking-wider uppercase text-sm glass-card hover:bg-white/5 transition-all text-center flex items-center justify-center gap-2"
            >
              Consult Tarot
            </Link>
          </div>
        </div>

        {/* Interactive Zodiac Wheel */}
        <div className="flex-grow flex flex-col items-center justify-center relative">
          <div className="relative w-[340px] h-[340px] flex items-center justify-center bg-white/5 rounded-full p-4 glass-card border border-white/10 glow-cyan">
            {/* Spinning Outer Ring Decoration */}
            <div className="absolute inset-2 border border-dashed border-cyan-500/20 rounded-full animate-spin-slow pointer-events-none" />
            <div className="absolute inset-6 border border-purple-500/10 rounded-full animate-spin-reverse-slow pointer-events-none" />

            {/* SVG Wheel */}
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${size} ${size}`}
              className="relative z-10 select-none overflow-visible"
            >
              {/* Draw Zodiac Segments */}
              {zodiacSigns.map((sign, idx) => {
                const anglePerSign = 360 / 12;
                const startAngle = idx * anglePerSign - 90;
                const endAngle = (idx + 1) * anglePerSign - 90;

                // Helper to get coordinates
                const getCoords = (angle, r) => {
                  const rad = (angle * Math.PI) / 180;
                  return {
                    x: center + r * Math.cos(rad),
                    y: center + r * Math.sin(rad),
                  };
                };

                const p1 = getCoords(startAngle, radius);
                const p2 = getCoords(endAngle, radius);
                const p3 = getCoords(endAngle, innerRadius);
                const p4 = getCoords(startAngle, innerRadius);

                // Check if currently hovered
                const isHovered = hoveredSign && hoveredSign.name === sign.name;

                return (
                  <g
                    key={sign.name}
                    className="cursor-pointer transition-all duration-300 group"
                    onMouseEnter={() => setHoveredSign(sign)}
                    onMouseLeave={() => setHoveredSign(null)}
                    onClick={() => {
                      window.location.href = `/zodiac/${slugify(sign.name)}`;
                    }}
                  >
                    {/* Segment Area */}
                    <path
                      d={`M ${p1.x} ${p1.y} A ${radius} ${radius} 0 0 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${innerRadius} ${innerRadius} 0 0 0 ${p4.x} ${p4.y} Z`}
                      fill={isHovered ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.01)'}
                      stroke={isHovered ? 'rgba(6, 182, 212, 0.5)' : 'rgba(255, 255, 255, 0.08)'}
                      strokeWidth={isHovered ? '2' : '1'}
                      className="transition-colors duration-300"
                    />

                    {/* Symbol Text label position */}
                    {(() => {
                      const midAngle = startAngle + anglePerSign / 2;
                      // Place symbol closer to the outer border
                      const textPos = getCoords(midAngle, (radius + innerRadius) / 2);
                      return (
                        <text
                          x={textPos.x}
                          y={textPos.y}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill={isHovered ? '#22d3ee' : '#ffffff'}
                          fontSize={isHovered ? '18' : '14'}
                          className="transition-all duration-300 pointer-events-none select-none font-sans"
                        >
                          {sign.symbol}
                        </text>
                      );
                    })()}
                  </g>
                );
              })}

              {/* Center Ring Info Display */}
              <circle cx={center} cy={center} r={innerRadius - 4} fill="#05070f" stroke="rgba(255,255,255,0.1)" />
              <circle cx={center} cy={center} r={innerRadius - 8} fill="#0d1127" />

              {/* Display hovered details */}
              <text
                x={center}
                y={center - 10}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={hoveredSign ? '#22d3ee' : '#a78bfa'}
                fontSize="11"
                fontWeight="600"
                className="font-space uppercase tracking-widest pointer-events-none select-none"
              >
                {hoveredSign ? hoveredSign.name : 'Select'}
              </text>
              <text
                x={center}
                y={center + 12}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#ffffff"
                fontSize="24"
                className="pointer-events-none select-none"
              >
                {hoveredSign ? hoveredSign.symbol : '🔮'}
              </text>
            </svg>
          </div>
          <p className="text-xs text-white/40 mt-4 tracking-wider uppercase">
            Hover & Click the Wheel to explore signs directly
          </p>
        </div>
      </section>

      {/* Feature Pillars Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6 relative z-10">
        {/* Daily Horoscope */}
        <Link href="/horoscope" className="glass-card p-8 rounded-2xl glass-card-hover text-left block">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 glow-purple">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-cinzel text-xl font-bold tracking-wide mb-3">Daily Horoscope</h3>
          <p className="text-sm text-white/60 leading-relaxed mb-6">
            Review celestial transits and receive specialized forecasts for Love, Luck, Career, and Vitality updated every day.
          </p>
          <div className="text-sm font-semibold text-purple-400 flex items-center gap-1">
            Explore Horoscopes <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Love Synergy Compatibility */}
        <Link href="/compatibility" className="glass-card p-8 rounded-2xl glass-card-hover text-left block">
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-6 glow-pink">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-cinzel text-xl font-bold tracking-wide mb-3">Love & Synergy</h3>
          <p className="text-sm text-white/60 leading-relaxed mb-6">
            Assess energetic intersections and alignment percentages between your chart and another to evaluate synergy.
          </p>
          <div className="text-sm font-semibold text-pink-400 flex items-center gap-1">
            Test Compatibility <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Tarot Oracle */}
        <Link href="/tarot" className="glass-card p-8 rounded-2xl glass-card-hover text-left block">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 glow-cyan">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="font-cinzel text-xl font-bold tracking-wide mb-3">Tarot Spread</h3>
          <p className="text-sm text-white/60 leading-relaxed mb-6">
            Pose queries to the ether, shuffle our Major Arcana deck, and pull a 3-card spread analyzing your Past, Present, and Future.
          </p>
          <div className="text-sm font-semibold text-cyan-400 flex items-center gap-1">
            Consult Oracle <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </section>

      {/* Main Calculator Section */}
      <section id="zodiac-calculator-section" className="max-w-7xl mx-auto px-6 pt-16">
        <ZodiacCalculator />
      </section>
    </div>
  );
}
