import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Phone, ExternalLink, Bus, Train, Plane } from 'lucide-react';
import { EVENT_DETAILS } from '../data/mahotsavData';

export const FullWidthMap: React.FC = () => {
  const [activeVenuePoint, setActiveVenuePoint] = useState<string>('mandap');

  const venuePins = [
    { id: 'mandap', name: 'Central Mandap & Main Sanctum', info: 'Dotma HS Grounds, Central Stage & Prayer Pandal' },
    { id: 'annadan', name: 'Maha Annadan (Langar) Pavilion', info: 'North Field, 80,000+ meals capacity daily' },
    { id: 'niwas', name: 'Yatri Niwas & Pilgrim Dorms', info: 'East Wing, 2,500 bedding capacity & reception' },
    { id: 'medical', name: 'Arogya Medical Bay & Ambulance', info: 'Gate 2 corridor connected to Circle Road' },
    { id: 'parking', name: 'Designated Bus & Car Parking', info: 'Dotma Bypass Field, 1,000+ vehicle capacity' }
  ];

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "West Dangarkuthi, Dotma, Kokrajhar, Assam, India 783347"
  )}`;

  return (
    <section id="venue-map" className="relative w-full bg-stone-900 text-white overflow-hidden py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Official Event Venue & Navigation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-cinzel font-bold text-white tracking-tight">
              Venue Location & Directions
            </h2>
            <p className="mt-1 text-stone-300 text-sm max-w-2xl">
              West Dangarkuthi, Dotma, Kokrajhar, Bodoland Territorial Region (BTR), Assam, India - PIN 783347
            </p>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg whitespace-nowrap active:scale-95"
          >
            <Navigation className="w-4 h-4" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>

        {/* Quick venue zones selector */}
        <div className="mt-6 flex flex-wrap gap-2">
          {venuePins.map((pin) => (
            <button
              key={pin.id}
              onClick={() => setActiveVenuePoint(pin.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeVenuePoint === pin.id
                  ? 'bg-amber-500 text-stone-950 font-semibold shadow-md'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{pin.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Full-width Map Container */}
      <div className="relative w-full h-[450px] sm:h-[520px] bg-stone-950 border-y border-stone-800">
        <iframe
          title="Dotma Kokrajhar Venue Map"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src="https://www.openstreetmap.org/export/embed.html?bbox=89.9500%2C26.3500%2C90.3500%2C26.6000&amp;layer=mapnik&amp;marker=26.4633%2C90.1583"
          className="w-full h-full filter saturate-[0.85] contrast-[1.1]"
        />

        {/* Floating Venue Legend Overlay Card */}
        <div className="absolute top-4 left-4 sm:left-8 max-w-sm w-full bg-stone-950/90 backdrop-blur-md border border-amber-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl text-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm border-b border-stone-800 pb-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Central Mahotsav Grounds</span>
          </div>

          <p className="text-stone-300 leading-relaxed">
            {venuePins.find(p => p.id === activeVenuePoint)?.info || "Central Mahotsav Grounds, Dotma, Kokrajhar"}
          </p>

          <div className="pt-2 border-t border-stone-800 space-y-1.5 text-stone-300 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Train className="w-3.5 h-3.5 text-amber-400" />
                <span>Fakiragram Jn (Closest)</span>
              </span>
              <span className="font-mono text-amber-300 font-semibold">7 km (12 min)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Train className="w-3.5 h-3.5 text-amber-400" />
                <span>Kokrajhar Station</span>
              </span>
              <span className="font-mono text-amber-300 font-semibold">18 km (22 min)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-amber-400" />
                <span>Rupsi Airport (RUP)</span>
              </span>
              <span className="font-mono text-amber-300 font-semibold">55 km (1.1 hr)</span>
            </div>
          </div>
        </div>

        {/* Venue Helpline Floating Ribbon */}
        <div className="absolute bottom-4 right-4 sm:right-8 bg-stone-950/90 backdrop-blur-md border border-stone-700 rounded-xl px-4 py-2.5 text-xs flex items-center gap-3">
          <span className="text-stone-300 hidden sm:inline">Venue Helpdesk & Traffic:</span>
          <a
            href={`tel:${EVENT_DETAILS.helplinePhone}`}
            className="flex items-center gap-1 text-amber-400 font-bold hover:underline"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{EVENT_DETAILS.helplinePhone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
