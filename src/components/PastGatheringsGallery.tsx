import React, { useState } from 'react';
import { Sparkles, Maximize2, X, Users, Heart, Camera } from 'lucide-react';

interface HighlightItem {
  id: string;
  image: string;
  title: string;
  event: string;
  location: string;
  category: 'Seva' | 'Kirtan' | 'Youth' | 'Cultural';
  description: string;
}

const PAST_HIGHLIGHTS: HighlightItem[] = [
  {
    id: "h1",
    image: "/src/assets/images/past_commemoration_seva_1793101658716.jpg",
    title: "Maha Annadan Seva",
    event: "Kokrajhar Centenary Conclave",
    location: "Dotma, Assam",
    category: "Seva",
    description: "Disciplined volunteer distribution of hot satvik prasadam to thousands of pilgrims seated on banana and sal leaf mats."
  },
  {
    id: "h2",
    image: "/src/assets/images/cultural_concourse_assam_1793101657203.jpg",
    title: "Sattriya & Bodo Folk Devotional Evening",
    event: "Bodoland Harmony Festival",
    location: "Kokrajhar Open Amphitheater",
    category: "Cultural",
    description: "Soul-stirring devotional vocalists and khol players harmonizing traditional indigenous melodies in reverence to the Ideal."
  },
  {
    id: "h3",
    image: "/src/assets/images/hero_mahotsav_gathering_1793101656670.jpg",
    title: "Akhanda Usha Kirtan & Dawn Concord",
    event: "Advent Commemoration Assembly",
    location: "Dotma Central Mandap",
    category: "Kirtan",
    description: "Thousands of lit brass lamps and continuous chanting elevating the dawn spiritual ambiance."
  },
  {
    id: "h4",
    image: "/src/assets/images/thakur_spiritual_portrait_1793101656663.jpg",
    title: "Sacred Sanctum Darshan & Prayer",
    event: "Annual Satsang Convention",
    location: "Dotma Yatri Mandir",
    category: "Seva",
    description: "Reverent floral archways and quiet meditation assembly commemorating Sree Sree Thakur's universal blessings."
  }
];

export const PastGatheringsGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<HighlightItem | null>(null);

  const filtered = selectedCategory === 'All'
    ? PAST_HIGHLIGHTS
    : PAST_HIGHLIGHTS.filter(h => h.category === selectedCategory);

  return (
    <section className="py-16 sm:py-24 bg-amber-50/30 dark:bg-stone-900/40 border-t border-amber-200/50 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2">
            <Camera className="w-4 h-4 text-amber-600" />
            <span>Cherished Memories & Retrospective</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 tracking-tight text-balance">
            Past Commemorative Gatherings
          </h2>
          <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            A photographic retrospective celebrating milestones of devotion, unity, and selfless community seva in Assam.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {['All', 'Seva', 'Kirtan', 'Cultural'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-amber-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-60 overflow-hidden bg-stone-950">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-stone-900/80 text-amber-300 backdrop-blur-sm border border-amber-400/30">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              <div className="p-4 space-y-2">
                <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium block">
                  📍 {item.location} · {item.event}
                </span>
                <h4 className="text-base font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Preview */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-3xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-700">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800/80 hover:bg-stone-700 text-white transition-colors z-10"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[60vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[60vh] object-contain"
              />
            </div>

            <div className="p-6 text-white bg-stone-950">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-1">
                <span>{activeItem.category}</span>
                <span>·</span>
                <span>{activeItem.location}</span>
                <span>·</span>
                <span>{activeItem.event}</span>
              </div>
              <h3 className="text-xl font-serif-cinzel font-bold text-white mb-2">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
