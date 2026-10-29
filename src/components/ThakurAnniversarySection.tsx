import React, { useState } from 'react';
import { Sparkles, Clock, Calendar, ChevronDown, ChevronUp, Bell, HeartHandshake, Sun } from 'lucide-react';
import { BIRTH_ANNIVERSARY_INFO } from '../data/mahotsavData';

export const ThakurAnniversarySection: React.FC = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="py-16 sm:py-24 bg-amber-100/40 dark:bg-stone-900/60 border-y border-amber-200/60 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Visual Artwork Frame */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-300/80 dark:border-amber-500/30">
              <img
                src="/src/assets/images/sree_sree_thakur.webp"
                alt="Sree Sree Thakur Advent Commemoration"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-amber-300 text-xs font-mono tracking-widest uppercase">
                  {BIRTH_ANNIVERSARY_INFO.edition}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-cinzel font-bold text-white mt-1">
                  Sacred Advent & Divine Janmotsav
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  Commemorated with 100,000+ devotees in Dotma
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Celebratory Information */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-800 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sun className="w-4 h-4 text-amber-600 animate-spin-slow" />
                <span>Special Commemorative Highlight</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 tracking-tight text-balance">
                Thakur Birth Anniversary Celebration
              </h2>
              <p className="mt-2 text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                The divine advent of Sree Sree Thakur represents the awakening of conscious, active living. In this Maha Mahotsav, the Janmotsav will be celebrated across multiple days with devotional fervor, dawn processions, and community feasting.
              </p>
            </div>

            {/* Commemorative Highlights 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BIRTH_ANNIVERSARY_INFO.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-800 shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs text-amber-700 dark:text-amber-400 font-semibold mb-1">
                    <span>{item.title}</span>
                    <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Expandable "Learn More" Accordion */}
            <div className="pt-2">
              <button
                onClick={() => setShowMore(!showMore)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-colors shadow-sm active:scale-95"
              >
                <span>{showMore ? "Collapse Spiritual Significance" : "Learn More About Birth Anniversary Significance"}</span>
                {showMore ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showMore && (
                <div className="mt-4 p-5 rounded-xl bg-white dark:bg-stone-850 border border-amber-300 dark:border-stone-700 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed space-y-3 animate-in fade-in duration-300">
                  <p>{BIRTH_ANNIVERSARY_INFO.significanceText}</p>
                  <div className="pt-2 border-t border-stone-200 dark:border-stone-700 flex flex-wrap gap-4 text-xs font-medium text-stone-600 dark:text-stone-400">
                    <span>🕊️ Mass congregational harmony</span>
                    <span>🌿 Clean satvik living</span>
                    <span>📖 Spiritual discourses</span>
                    <span>🤝 Youth character building</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
