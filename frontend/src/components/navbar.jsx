import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Sparkles, Moon, HelpCircle } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { name: 'Oracle Calculator', href: '/' },
    { name: 'Daily Horoscope', href: '/horoscope' },
    { name: 'Love Synergy', href: '/compatibility' },
    { name: 'Tarot Oracle', href: '/tarot' },
  ];

  const isActive = (path) => location === path;

  return (
    <nav className="sticky top-0 z-50 w-full glass-card border-b border-white/5 bg-[#05070f]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center glow-cyan transition-transform duration-500 group-hover:rotate-180">
                <Moon className="w-5 h-5 text-white fill-white/10" />
              </div>
              <span className="font-cinzel text-xl font-bold tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-purple-300">
                ACHARYA ZODIAC CALCULATOR
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:block">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative font-space text-sm tracking-widest uppercase transition-all duration-300 py-2 ${
                    isActive(link.href)
                      ? 'text-cyan-400 font-semibold text-glow-cyan'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full glow-cyan" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white/75 hover:text-white hover:bg-white/5 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden glass-card border-t border-white/5 bg-[#05070f]/95 animate-slide-down">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl font-space text-base tracking-widest uppercase transition-colors ${
                  isActive(link.href)
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
