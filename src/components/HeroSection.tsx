import React from 'react';
import { ArrowDown, Calendar, MapPin, Users, HeartHandshake, Sparkles } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';
import { EVENT_DETAILS } from '../data/mahotsavData';

interface HeroSectionProps {
  onDiscoverMore: () => void;
  onOpenRegister: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onDiscoverMore,
  onOpenRegister,
}) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-stone-950">
      {/* Background with real Thakur photo blended with sacred amber gradient backdrop */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/90 to-amber-950/70 z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 opacity-35 lg:opacity-45 overflow-hidden">
          <img
            src="/src/assets/images/sree_sree_thakur.webp"
            alt="Sree Sree Thakur Anukulchandra Divine Countenance"
            className="w-full h-full object-cover object-top scale-105"
          />
        </div>
        {/* Measured dark scrim for high contrast typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/50 z-20" />
      </div>

      {/* Top Banner highlight ribbon */}
      <div className="relative z-30 w-full pt-8 sm:pt-12 px-4 sm:px-6 lg:px-8 text-center">
        {/* Official Priti Lagnik Logo Centered */}
        <div className="flex justify-center mb-4">
          <div className="p-1 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 shadow-xl ring-4 ring-amber-400/20">
            <img
              src="/src/assets/images/priti_lagnik_logo.webp"
              alt="Official Priti-Lagnik Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-full shadow-inner"
            />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-medium tracking-wider uppercase mb-3 animate-in fade-in duration-500">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Sacred Spiritual Confluence · Dotma 2026</span>
        </div>

        {/* Marquee Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-cinzel font-bold text-white tracking-wide max-w-5xl mx-auto drop-shadow-md leading-tight text-balance">
          Priti-Lagnik Maha Mahotsav 2026
        </h1>

        <p className="mt-4 text-base sm:text-lg md:text-xl text-stone-200 font-light max-w-3xl mx-auto text-balance leading-relaxed">
          Celebrating Divine Love (Priti), Existential Communion (Lagnik), and Universal Seva under the sacred inspiration of Sree Sree Thakur.
        </p>

        {/* Key Event Highlights Row */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-amber-200/90 font-medium">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>20 December 2026 (Main Celebration)</span>
          </div>
          <span className="text-amber-500/60 hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>West Dangarkuthi, Dotma, Kokrajhar, Assam - 783347</span>
          </div>
          <span className="text-amber-500/60 hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-amber-400" />
            <span>100,000+ Expected Attendees</span>
          </div>
        </div>

        {/* Action Buttons: Discover More & Register */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onDiscoverMore}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <span>Discover more</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenRegister}
            className="flex items-center gap-2 px-7 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-xl ring-2 ring-amber-400/50"
          >
            <HeartHandshake className="w-4 h-4 text-stone-950" />
            <span>Register as Attendee</span>
          </button>
        </div>
      </div>

      {/* Embedded Live Countdown Timer targeting Dec 20, 2026 */}
      <div className="relative z-30 w-full px-4 sm:px-6 lg:px-8 my-8 sm:my-10">
        <CountdownTimer />
      </div>
    </section>
  );
};
