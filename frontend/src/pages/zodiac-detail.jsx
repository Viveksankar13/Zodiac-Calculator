import React, { useState, useEffect } from "react";
import { useRoute } from "wouter";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";
import { zodiacSigns, calculateZodiacSign } from "@/lib/zodiac-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Compass, Sparkles, Calendar, Moon, Sun, ArrowUp, ArrowLeft, RefreshCw } from 'lucide-react';

function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function ZodiacDetail() {
  const [match, params] = useRoute("/zodiac/:sign");
  const signSlug = params?.sign || "";
  const sign = zodiacSigns.find((s) => slugify(s.name) === signSlug);

  const [aiDescription, setAiDescription] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null); // null | 'quota' | 'generic'
  const [aiErrorMessage, setAiErrorMessage] = useState("");
  
  // URL Params State
  const [urlParams, setUrlParams] = useState({ name: "", date: "", time: "", place: "" });
  const [moonSign, setMoonSign] = useState(null);
  const [risingSign, setRisingSign] = useState(null);

  // Parse placements from URL
  useEffect(() => {
    if (!sign) return;

    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("name") || "";
    const date = queryParams.get("date") || "";
    const time = queryParams.get("time") || "";
    const place = queryParams.get("place") || "";

    setUrlParams({ name, date, time, place });

    if (date) {
      // Calculate Moon Sign
      const dateObj = new Date(date);
      const startOfYear = new Date(dateObj.getFullYear(), 0, 0);
      const diff = dateObj - startOfYear;
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);
      const lunarIndex = Math.floor((dayOfYear % 27.3) / (27.3 / 12)) % 12;
      setMoonSign(zodiacSigns[lunarIndex]);

      // Calculate Rising Sign
      if (time) {
        const [hours, minutes] = time.split(':').map(Number);
        const decimalHours = hours + minutes / 60;
        const diffHours = (decimalHours - 6 + 24) % 24;
        const shift = Math.floor(diffHours / 2);
        const sunIndex = zodiacSigns.findIndex(s => s.name === sign.name);
        const risingIndex = (sunIndex + shift) % 12;
        setRisingSign(zodiacSigns[risingIndex]);
      }
    }
  }, [sign]);

  const handleGenerateAi = async () => {
    if (!sign) return;

    setIsAiLoading(true);
    setAiError(null);
    setAiErrorMessage("");
    setAiDescription("");

    try {
      const fetchParams = new URLSearchParams({
        ...(urlParams.date && { date: urlParams.date }),
        ...(urlParams.time && { time: urlParams.time }),
      });

      const response = await fetch(`/api/zodiac/${sign.name}?${fetchParams}`);
      const data = await response.json();

      if (!response.ok) {
        const message = data?.detail || "The AI is currently clouded.";
        setAiError(response.status === 429 ? 'quota' : 'generic');
        setAiErrorMessage(message);
        return;
      }

      if (!data.detailed_description) {
        setAiError('generic');
        setAiErrorMessage("The AI is currently clouded.");
        return;
      }

      setAiDescription(data.detailed_description);
    } catch (error) {
      console.error("Error fetching AI description:", error);
      const message = error?.message || "The AI is currently clouded.";
      setAiError(message.toLowerCase().includes('quota') ? 'quota' : 'generic');
      setAiErrorMessage(message);
    } finally {
      setIsAiLoading(false);
    }
  };

  if (!match || !sign) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-white font-space relative z-10">
        <Card className="max-w-xl w-full glass-card border-white/10 p-8 text-center space-y-6">
          <CardHeader className="p-0">
            <CardTitle className="font-cinzel text-2xl text-white">Coordinate Lost</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-6">
            <p className="text-white/60">We could not match this celestial sector in our zodiac catalog.</p>
            <Button onClick={() => (window.location.href = "/")} className="px-6 py-3 rounded-lg text-xs font-bold tracking-widest uppercase bg-cyan-500/15 border border-cyan-500/35 text-cyan-400">
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-white font-space relative z-10">
      {/* Title */}
      <div className="text-center mb-12 space-y-4">
        <Badge className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
          📊 Comprehensive Analysis
        </Badge>
        <h1 className="font-cinzel font-bold text-4xl lg:text-5xl text-white tracking-wide">
          {sign.name} <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 text-glow-cyan">Placements</span>
        </h1>
        <p className="text-lg text-white/60 max-w-xl mx-auto font-light">
          {sign.description}
        </p>
      </div>

      {/* Main Grid */}
      <div className="space-y-8">
        {/* Core Attributes */}
        <Card className="glass-card border-white/10 shadow-2xl p-6 md:p-8">
          <div className="grid md:grid-cols-4 gap-6 items-center">
            {/* Symbol Globe */}
            <div className="text-center md:border-r border-white/5 md:pr-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-5xl glow-cyan animate-pulse">
                {sign.symbol}
              </div>
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-3 block">Zodiac Archetype</span>
            </div>

            {/* Element */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-white/50 uppercase tracking-wider block mb-1">Element</span>
              <span className="text-lg font-semibold text-cyan-400">{sign.element}</span>
            </div>

            {/* Planet */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-white/50 uppercase tracking-wider block mb-1">Ruling Planet</span>
              <span className="text-lg font-semibold text-purple-400">{sign.planet}</span>
            </div>

            {/* Color */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-white/50 uppercase tracking-wider block mb-1">Color Affinity</span>
              <span className="text-lg font-semibold text-pink-400">{sign.color}</span>
            </div>
          </div>
        </Card>

        {/* Calculated Placements Card (If birthday params were sent) */}
        {urlParams.date && (
          <Card className="glass-card border-cyan-500/20 shadow-2xl p-6 md:p-8 space-y-6">
            <h3 className="font-cinzel text-xl font-bold tracking-wider text-white border-b border-white/5 pb-3">
              Natal Chart Config
            </h3>
            {urlParams.name && (
              <p className="text-sm text-white/60">
                Subject Node: <span className="text-white font-semibold">{urlParams.name}</span>
              </p>
            )}
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Sun Sign */}
              <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex items-center gap-4">
                <Sun className="w-10 h-10 text-cyan-400" />
                <div>
                  <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider block">Sun Placement</span>
                  <span className="text-lg font-bold">{sign.name} {sign.symbol}</span>
                </div>
              </div>

              {/* Moon Sign */}
              {moonSign && (
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex items-center gap-4">
                  <Moon className="w-10 h-10 text-purple-400" />
                  <div>
                    <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider block">Moon Placement</span>
                    <span className="text-lg font-bold">{moonSign.name} {moonSign.symbol}</span>
                  </div>
                </div>
              )}

              {/* Rising Sign */}
              {risingSign && (
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex items-center gap-4">
                  <ArrowUp className="w-10 h-10 text-pink-400" />
                  <div>
                    <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider block">Ascendant (Rising)</span>
                    <span className="text-lg font-bold">{risingSign.name} {risingSign.symbol}</span>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* AI Detailed Analysis Section */}
        <Card className="glass-card border-purple-500/20 shadow-2xl p-6 md:p-8 text-left">
          <h4 className="text-cyan-400 font-cinzel font-bold text-2xl mb-8 flex items-center gap-2 border-b border-white/5 pb-4">
            <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
            AI Deep-Dive Analysis
          </h4>

          {/* Loading skeletons */}
          {isAiLoading && (
            <div className="space-y-4">
              {[12, 11, 10, 12, 9].map((w, i) => (
                <div key={i} className={`h-4 bg-white/10 rounded animate-pulse w-${w}/12`}></div>
              ))}
            </div>
          )}

          {/* Quota exceeded or generic error */}
          {!isAiLoading && aiError && (
            <div className="flex flex-col items-center justify-center text-center py-10 space-y-5">
              <div className={`w-16 h-16 rounded-full ${aiError === 'quota' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' : 'bg-red-500/10 border-red-500/20 text-red-400'} border flex items-center justify-center text-3xl`}>
                {aiError === 'quota' ? '⏳' : '🌑'}
              </div>
              <div className="space-y-2">
                <h3 className={`font-cinzel text-lg font-bold ${aiError === 'quota' ? 'text-yellow-400' : 'text-red-400'}`}>
                  {aiError === 'quota'
                    ? 'The AI is currently clouded, quota limit reached'
                    : 'The AI is currently clouded'}
                </h3>
                <p className="text-white/60 text-sm max-w-sm mx-auto leading-relaxed">
                  {aiErrorMessage || (aiError === 'quota'
                    ? 'The Gemini API limit was reached. Please try again later.'
                    : 'Please try again later or regenerate the analysis.')}
                </p>
              </div>
              <Button
                onClick={handleGenerateAi}
                className={`text-xs px-5 py-2 rounded-lg border ${aiError === 'quota' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/20' : 'border-red-500/30 text-red-400 bg-red-500/10 hover:bg-red-500/20'} transition-all tracking-widest uppercase`}
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Prompt to generate AI report when no analysis has been generated yet */}
          {!isAiLoading && !aiError && !aiDescription && (
            <div className="text-white/80 py-8 text-center space-y-4">
              <p className="text-lg font-medium">
                {urlParams.date
                  ? 'Your birth date is available. Generate a detailed Gemini AI deep-dive report now.'
                  : 'No birth date was provided. Generate a Gemini AI deep-dive report based on your zodiac sign.'}
              </p>
              <Button
                onClick={handleGenerateAi}
                className="text-xs px-5 py-3 rounded-lg border border-cyan-500/20 text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500 hover:text-white transition-all tracking-widest uppercase"
              >
                Generate Detailed AI Analysis
              </Button>
            </div>
          )}

          {/* Successful AI report */}
          {!isAiLoading && !aiError && aiDescription && (
            <div className="text-white/80 leading-relaxed text-base bg-[#05070f]/50 p-8 rounded-2xl border border-white/5 max-w-none prose prose-invert">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                  h2: ({ node, ...props }) => (
                    <h2 className="text-cyan-400 font-cinzel text-xl font-bold mt-8 mb-4 border-b border-cyan-400/20 pb-2 flex items-center gap-2" {...props} />
                  ),
                  p: ({ node, ...props }) => <p className="mb-4 last:mb-0 font-light" {...props} />
                }}
              >
                {aiDescription}
              </ReactMarkdown>
            </div>
          )}
        </Card>

        {/* Actions */}
        <div className="flex gap-4 pt-4 justify-center">
          <Button
            className="px-6 py-3 rounded-lg text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
            onClick={() => (window.location.href = "/")}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portal
          </Button>
          <Button
            className="px-6 py-3 rounded-lg text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-cyan-500 to-purple-600 text-white transition-all glow-cyan flex items-center gap-1.5"
            onClick={() => (window.location.href = "/#zodiac-calculator-section")}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Recalculate Chart
          </Button>
        </div>
      </div>
    </div>
  );
}