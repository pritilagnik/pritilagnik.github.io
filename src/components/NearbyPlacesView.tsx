import React, { useState } from 'react';
import {
  MapPin,
  Compass,
  Navigation,
  ExternalLink,
  Trees,
  Sun,
  Camera,
  Car,
  Clock,
  Info,
  Sparkles,
  Mountain,
  Waves,
  Landmark
} from 'lucide-react';

interface NearbyPlace {
  id: string;
  name: string;
  localName?: string;
  category: 'Wildlife' | 'Eco-Tourism' | 'Heritage' | 'Parks';
  distanceFromDotma: string;
  approxTravelTime: string;
  routeHint: string;
  description: string;
  highlights: string[];
  bestTime: string;
  mapQuery: string;
}

export const NEARBY_PLACES: NearbyPlace[] = [
  {
    id: 'chakrashila',
    name: 'Chakrashila Wildlife Sanctuary',
    localName: 'চক্ৰশিলা বন্যপ্ৰাণী অভয়াৰণ্য',
    category: 'Wildlife',
    distanceFromDotma: '25 Kms approx.',
    approxTravelTime: '35 - 45 mins',
    routeHint: 'Via Dotma-Kokrajhar Road towards Nayekgaon & Choibari',
    description: 'Renowned worldwide as the primary natural habitat of the endangered and charismatic Golden Langur (Trachypithecus geei). The sanctuary spans hilly forested tracts with perennial streams, rocky crags, and diverse wildlife including hornbills, leopards, and over 120 species of birds.',
    highlights: [
      'Golden Langur watching',
      'Nature trails & bird watching',
      'Scenic hills & waterfalls (seasonal)',
      'Rich indigenous flora & medicinal plants'
    ],
    bestTime: 'October to April (Daytime)',
    mapQuery: 'Chakrashila Wildlife Sanctuary Assam'
  },
  {
    id: 'raimona',
    name: 'Raimona National Park',
    localName: 'ৰাইমনা ৰাষ্ট্ৰীয় উদ্যান',
    category: 'Wildlife',
    distanceFromDotma: '42 Kms approx.',
    approxTravelTime: '1 hr 10 mins',
    routeHint: 'Via Serfanguri - Gossaigaon - Kachugaon - Raimona',
    description: "Assam's 6th National Park, blessed with pristine Ripu Reserve forests contiguous with Bhutan's Phibsoo Wildlife Sanctuary. Famous for Asian wild elephants, golden langurs, rare butterflies, Bengal tigers, and cloud-draped sub-Himalayan scenery.",
    highlights: [
      'Asian Elephants & Tiger buffer corridor',
      'Butterfly hotspot (over 150 species)',
      'Unspoiled riverine landscapes along the Sankosh river',
      'Forest rest house viewpoints'
    ],
    bestTime: 'November to May (Morning 6 AM - 4 PM)',
    mapQuery: 'Raimona National Park Kachugaon Assam'
  },
  {
    id: 'gaurang-park',
    name: 'Gaurang Park & Riverfront',
    localName: 'গৌৰাং পাৰ্ক, কোকৰাঝাৰ',
    category: 'Parks',
    distanceFromDotma: '16 Kms approx.',
    approxTravelTime: '25 mins',
    routeHint: 'Via Dotma - Titaguri - Kokrajhar Town center',
    description: 'A popular riverfront ecological park built along the winding banks of the sacred Gaurang River in Kokrajhar town. Features landscaped flowering gardens, paved jogging pathways, boating facilities, and evening illuminated fountains.',
    highlights: [
      'Riverfront walkway and sunset views',
      'Boating in Gaurang river',
      'Children play zone & family picnic spots',
      'Close proximity to Kokrajhar town dining'
    ],
    bestTime: 'Open throughout the day (9 AM – 6 PM)',
    mapQuery: 'Gaurang Park Kokrajhar Assam'
  },
  {
    id: 'diplai-beel',
    name: 'Diplai Beel & Dheer Beel',
    localName: 'দিপলাই বিল',
    category: 'Parks',
    distanceFromDotma: '22 Kms approx.',
    approxTravelTime: '35 mins',
    routeHint: 'Adjacent to southern foothill periphery of Chakrashila',
    description: 'A sprawling natural wetland and freshwater lake surrounded by rolling hillocks. During winter, thousands of migratory waterfowl from northern Eurasia and Siberia roost in the reeds, making it a birdwatcher’s paradise.',
    highlights: [
      'Winter migratory bird watching',
      'Traditional canoe boating with local fishermen',
      'Pristine freshwater wetland ecology',
      'Tranquil photographic viewpoints'
    ],
    bestTime: 'November to February (Early morning or sunset)',
    mapQuery: 'Diplai Beel Kokrajhar Assam'
  },
  {
    id: 'mahamaya-dham',
    name: 'Mahamaya Dham, Bogribari',
    localName: 'মহামায়া ধাম, বগৰীবাৰী',
    category: 'Heritage',
    distanceFromDotma: '28 Kms approx.',
    approxTravelTime: '40 mins',
    routeHint: 'Via Dotma - Bilasipara / Bogribari road link',
    description: 'A famous historical Hindu temple and venerated Shakti shrine revered by devotees across Western Assam and North Bengal. Located in a tranquil forest setting, centuries-old rituals and traditional fairs are held here in deep spiritual devotion.',
    highlights: [
      'Historic 400-year-old Shakti Peetha sanctuary',
      'Sacred temple pond and ancient banyan trees',
      'Devotional prayer assemblies',
      'Vibrant local spiritual market'
    ],
    bestTime: 'All seasons (Morning 6 AM – 7 PM)',
    mapQuery: 'Mahamaya Dham Bogribari Dhubri Assam'
  },
  {
    id: 'martyrs-memorial',
    name: 'Bodoland Martyrs’ Park & Memorial',
    localName: 'বড়োলেণ্ড শ্বহীদ উদ্যান, দেৱৰগাঁও',
    category: 'Heritage',
    distanceFromDotma: '18 Kms approx.',
    approxTravelTime: '25 mins',
    routeHint: 'Located at Debargaon near Bodoland University campus',
    description: 'A dignified cultural monument and memorial park built in homage to the pioneers and martyrs of the Bodoland movement. Set in spacious lush gardens with statues, ceremonial plazas, and historical plaques.',
    highlights: [
      'Bodoland historical commemorative plaza',
      'Architectural monument and statues',
      'Adjacent to Bodoland University campus',
      'Quiet and dignified reflective space'
    ],
    bestTime: 'Daily (9 AM – 5 PM)',
    mapQuery: 'Bodoland Martyrs Memorial Park Debargaon Kokrajhar'
  },
  {
    id: 'ultapani',
    name: 'Ultapani Reserve Forest & Natural Springs',
    localName: 'উল্টাপানী সংৰক্ষিত বনাঞ্চল',
    category: 'Eco-Tourism',
    distanceFromDotma: '55 Kms approx.',
    approxTravelTime: '1 hr 30 mins',
    routeHint: 'Via Kokrajhar - Bishmuri - Ultapani (Indo-Bhutan border route)',
    description: 'Nicknamed the "Natural Wonder of Bodoland" and "Butterfly Capital", Ultapani is home to perennial natural spring waters that appear to run in reverse elevation. The deep evergreen forest is packed with rare Himalayan orchids and crystal clear brooklets.',
    highlights: [
      'Legendary reverse water flow spring stream',
      'Over 200 rare Himalayan butterfly varieties',
      'Wild tropical orchids and medicinal plants',
      'Unmatched forest stillness and freshness'
    ],
    bestTime: 'October to March (Day trips with local escort)',
    mapQuery: 'Ultapani Reserve Forest Kokrajhar Assam'
  },
  {
    id: 'kalamati',
    name: 'Kalamati & Bhutan Foothills Eco-Trail',
    localName: 'কালামাটি ইকো-ট্যুৰিজম',
    category: 'Eco-Tourism',
    distanceFromDotma: '48 Kms approx.',
    approxTravelTime: '1 hr 20 mins',
    routeHint: 'Via Champa River - Bhur River foothills towards Saralpara',
    description: 'A breathtaking scenic destination along the Indo-Bhutan border riverbed characterized by unique black mineral soil (Kala Mati) and smooth boulders. Devotees and families visit for serene picnics and refreshing mountain stream air.',
    highlights: [
      'Indo-Bhutan Himalayan foothill panoramas',
      'Crystal clear mountain river stream',
      'Distinctive black stone geological riverbed',
      'Clean eco-tourism picnic spots'
    ],
    bestTime: 'November to March (Daylight hours)',
    mapQuery: 'Kalamati Picnic Spot Kokrajhar Assam'
  }
];

export const NearbyPlacesView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Wildlife', 'Eco-Tourism', 'Parks', 'Heritage'];

  const filteredPlaces = NEARBY_PLACES.filter((place) => {
    const matchesCategory = selectedCategory === 'All' || place.category === selectedCategory;
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (place.localName && place.localName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-20 bg-stone-50/50 dark:bg-stone-900/30 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <Compass className="w-4 h-4 text-amber-600" />
            <span>Discover Bodoland Territorial Region (BTR) & Assam</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 tracking-tight text-balance">
            Nearby Places to Visit
          </h1>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Visiting devotees and delegations participating in Priti-Lagnik Maha Mahotsav 2026 can explore these magnificent wildlife sanctuaries, national parks, riverfronts, and sacred heritage shrines situated around Dotma and Kokrajhar district.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 mr-1 flex items-center gap-1">
              <Trees className="w-3.5 h-3.5" />
              <span>Category:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search places, wildlife, parks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Tourist Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:border-amber-400 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Badge Row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300">
                    {place.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400 font-mono bg-amber-50 dark:bg-stone-800 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-stone-700">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{place.distanceFromDotma}</span>
                  </div>
                </div>

                {/* Title & Local Name */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 leading-snug">
                    {place.name}
                  </h2>
                  {place.localName && (
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-medium block mt-0.5">
                      {place.localName}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {place.description}
                </p>

                {/* Highlights List */}
                <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-stone-800 dark:text-stone-200 block uppercase tracking-wider">
                    Key Highlights:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-600 dark:text-stone-300">
                    {place.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                        <span className="line-clamp-1">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Route hint & Best time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="flex items-start gap-1.5 text-stone-500 dark:text-stone-400">
                    <Car className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>Travel: {place.approxTravelTime}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-stone-500 dark:text-stone-400">
                    <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>Best: {place.bestTime}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-3">
                <span className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">
                  Route: {place.routeHint}
                </span>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(place.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Travel Tips Banner */}
        <div className="p-6 rounded-3xl bg-amber-100/60 dark:bg-stone-900 border border-amber-300/80 dark:border-stone-700 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-amber-950 dark:text-amber-200">
          <div className="flex items-center gap-3">
            <Info className="w-6 h-6 text-amber-700 dark:text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-sm block">Visiting Advisory for Festival Delegates</span>
              <span>All forest entries (Chakrashila, Raimona, Ultapani) follow eco-tourism guidelines. Please carry valid government ID proofs and respect wildlife tranquility. Local taxi stands and e-rickshaws are available outside Dotma and Kokrajhar railway stations.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
