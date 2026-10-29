import React, { useState } from 'react';
import { Sparkles, Quote, BookOpen, ChevronRight, X, Heart } from 'lucide-react';
import { THAKUR_PROFILES } from '../data/mahotsavData';
import { ThakurProfile } from '../types';

export const ThakurCards: React.FC = () => {
  const [selectedThakur, setSelectedThakur] = useState<ThakurProfile | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-stone-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Divine Guidance & Mentorship</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 tracking-tight text-balance">
            Revered Mentors & Spiritual Guides
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Honoring the sacred lineage whose life-affirming ideals, humanitarian compassion, and social reformations form the spiritual foundation of Priti-Lagnik.
          </p>
        </div>

        {/* 4 Thakur Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {THAKUR_PROFILES.map((thakur) => (
            <div
              key={thakur.id}
              className="group bg-amber-50/40 dark:bg-stone-900/90 rounded-2xl overflow-hidden border border-amber-200/60 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Portrait Header */}
                <div className="relative h-72 overflow-hidden bg-stone-900">
                  <img
                    src={thakur.image}
                    alt={thakur.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
                  
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 bg-stone-900/70 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                      {thakur.period}
                    </span>
                    <h3 className="text-lg font-serif-cinzel font-bold text-white mt-1.5 leading-snug">
                      {thakur.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4">
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                    {thakur.title}
                  </p>

                  <div className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    <strong className="text-stone-900 dark:text-stone-100 block mb-1">
                      Event Contribution:
                    </strong>
                    {thakur.keyContribution}
                  </div>

                  {/* Sacred Quote */}
                  <div className="p-3 rounded-xl bg-amber-100/40 dark:bg-stone-800/60 border border-amber-200/50 dark:border-stone-700/60 text-xs italic text-stone-700 dark:text-stone-300">
                    <Quote className="w-3.5 h-3.5 text-amber-600 mb-1 inline-block mr-1" />
                    <span>"{thakur.quote}"</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => setSelectedThakur(thakur)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-stone-900 hover:bg-amber-600 dark:bg-stone-800 dark:hover:bg-amber-500 text-white text-xs font-semibold transition-colors shadow-sm active:scale-95"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Learn Life & Teachings</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedThakur && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="relative h-48 sm:h-56 overflow-hidden bg-stone-950 shrink-0">
              <img
                src={selectedThakur.image}
                alt={selectedThakur.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
              
              <button
                onClick={() => setSelectedThakur(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs font-mono text-amber-300">
                  {selectedThakur.period}
                </span>
                <h3 className="text-2xl font-serif-cinzel font-bold text-white">
                  {selectedThakur.name}
                </h3>
                <p className="text-xs text-amber-200 font-medium mt-0.5">
                  {selectedThakur.title}
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-stone-800/80 border border-amber-200 dark:border-stone-700 italic text-stone-800 dark:text-amber-200 text-xs">
                "{selectedThakur.quote}"
              </div>

              <div>
                <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-base mb-2">
                  Biography & Guidance
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {selectedThakur.detailedBio}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-base mb-2">
                  Key Tenets for Priti-Lagnik
                </h4>
                <ul className="space-y-2">
                  {selectedThakur.teachings.map((teaching, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{teaching}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 flex justify-end">
              <button
                onClick={() => setSelectedThakur(null)}
                className="px-5 py-2 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
