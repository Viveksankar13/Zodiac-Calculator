import React from 'react';
import { Link } from 'wouter';
import { Sparkles, Star, GitBranch } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 glass-card border-t border-white/5 bg-[#03050c]/90 py-12 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-6">
        {/* Branding & Icon */}
          <div className="flex justify-center items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span className="font-cinzel text-xl font-bold tracking-[0.25em] text-white">
            ACHARYA ZODIAC CALCULATOR
          </span>
          <Star className="w-4 h-4 text-purple-400 animate-pulse-slow" />
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 text-sm font-space text-white/50 tracking-wider">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Calculator</Link>
          <Link href="/horoscope" className="hover:text-cyan-400 transition-colors">Daily Horoscopes</Link>
          <Link href="/compatibility" className="hover:text-cyan-400 transition-colors">Love compatibility</Link>
          <Link href="/tarot" className="hover:text-cyan-400 transition-colors">Tarot Deck</Link>
        </div>

        {/* Copyright & Info */}
        <p className="text-xs font-space text-white/30 tracking-widest uppercase">
          © {new Date().getFullYear()} Acharya Zodiac Calculator Celestial Systems. Driven by Quantum Stellar Intelligence.
        </p>
      </div>
    </footer>
  );
}
