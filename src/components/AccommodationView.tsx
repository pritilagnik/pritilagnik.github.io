import React, { useState, useEffect } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  MessageSquare,
  Sparkles,
  Users,
  Check,
  ShieldAlert,
  Send,
  CheckCircle2,
  X
} from 'lucide-react';
import { fetchAccommodations } from '../services/registrationService';
import { EVENT_DETAILS } from '../data/mahotsavData';
import { AccommodationOption } from '../types';

interface AccommodationViewProps {
  onNavigateRegister?: () => void;
}

export const AccommodationView: React.FC<AccommodationViewProps> = ({ onNavigateRegister }) => {
  const [accommodations, setAccommodations] = useState<AccommodationOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('All');
  const [selectedAcc, setSelectedAcc] = useState<AccommodationOption | null>(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    name: '',
    phone: '',
    guests: 2,
    checkIn: '2026-12-19',
    notes: '',
  });

  useEffect(() => {
    let isMounted = true;
    fetchAccommodations()
      .then((data) => {
        if (isMounted) {
          setAccommodations(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Error fetching accommodations:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const types = ['All', 'Ashram Niwas', 'Guest House', 'Hotel', 'Tent Village'];

  const filteredAccommodations = filterType === 'All'
    ? accommodations
    : accommodations.filter(a => a.type === filterType);

  const handleOpenInquiry = (acc: AccommodationOption) => {
    setSelectedAcc(acc);
    setInquirySent(false);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryData.name || !inquiryData.phone) return;

    setInquirySent(true);
    setTimeout(() => {
      // Auto close after 3s
      setTimeout(() => {
        setSelectedAcc(null);
        setInquirySent(false);
      }, 2500);
    }, 500);
  };

  const handleGoToRegistration = () => {
    if (onNavigateRegister) {
      onNavigateRegister();
    } else {
      const el = document.getElementById('register');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-stone-50/50 dark:bg-stone-900/30 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Section: Pilgrim Lodging & Stay Facilities updated text */}
          <div className="p-4 rounded-2xl bg-amber-100/70 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700/70 text-xs sm:text-sm text-amber-900 dark:text-amber-200 text-center max-w-2xl mx-auto mb-6 shadow-xs leading-relaxed">
            <Sparkles className="w-4 h-4 text-amber-600 inline mr-1.5 -mt-0.5" />
            <span>
              Free Accomodation will be arranged for Guest/Participants from outside BTR (Bodoland Territorial Region) on request. However, the free accomodation facility is limited and early registration is requested.
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 tracking-tight text-balance">
            Accommodation & Hotel Guidance
          </h1>

          {/* Section: From free on-site Yatri Ashram dormitories... updated text */}
          <p className="mt-3 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed font-medium">
            Hotel/Guest House Guidance for self-arranged accomodation
          </p>

          {/* Destination Link to: Registration link for free accomodation */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleGoToRegistration}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              <Users className="w-4 h-4" />
              <span>Registration link for free accomodation</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                filterType === t
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white dark:bg-stone-850 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-amber-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Accommodation Cards Grid */}
        {loading ? (
          <div className="text-center py-16 text-sm text-stone-500">
            <Sparkles className="w-6 h-6 text-amber-500 animate-spin mx-auto mb-2" />
            Loading accommodation options...
          </div>
        ) : filteredAccommodations.length === 0 ? (
          <div className="text-center py-16 text-sm text-stone-500">
            No accommodation options listed in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredAccommodations.map((acc) => (
              <div
                key={acc.id}
                className="bg-white dark:bg-stone-850 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    {acc.type}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      acc.bookingStatus === 'Available'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                    }`}
                  >
                    {acc.bookingStatus}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-serif-cinzel text-stone-900 dark:text-stone-100 leading-snug">
                  {acc.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{acc.distance} · {acc.location}</span>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-stone-500 dark:text-stone-400">Capacity:</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{acc.capacity}</span>
                </div>

                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="text-stone-500 dark:text-stone-400">Tariff:</span>
                  <span className="font-bold text-amber-700 dark:text-amber-400">{acc.tariff}</span>
                </div>

                {/* Amenities */}
                <div className="mt-4 space-y-1.5">
                  <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
                    Key Facilities:
                  </span>
                  <ul className="space-y-1 text-xs text-stone-600 dark:text-stone-300">
                    {acc.amenities.map((am, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{am}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-2">
                <div className="text-xs text-stone-500 dark:text-stone-400 mb-1">
                  Contact: <span className="text-stone-900 dark:text-stone-200 font-medium">{acc.contactName}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${acc.phone}`}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 text-xs font-semibold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-stone-600 dark:text-stone-300" />
                    <span>Call Desk</span>
                  </a>

                  <a
                    href={`https://wa.me/${acc.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello, I would like to inquire about accommodation booking at ${acc.name} for Priti-Lagnik Maha Mahotsav 2026, Dotma.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <button
                  onClick={() => handleOpenInquiry(acc)}
                  className="w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  Request Reservation Assistance
                </button>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Reservation Assistance Modal */}
      {selectedAcc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-800">
            <button
              onClick={() => setSelectedAcc(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {inquirySent ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-bold font-serif-cinzel text-stone-900 dark:text-stone-100">
                  Inquiry Dispatched!
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  The Mahotsav Accommodation desk for <strong>{selectedAcc.name}</strong> has received your inquiry. They will contact you shortly on WhatsApp/Phone.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    Direct Stay Request
                  </span>
                  <h3 className="text-lg font-bold font-serif-cinzel text-stone-900 dark:text-stone-100">
                    {selectedAcc.name}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Tariff: {selectedAcc.tariff} · {selectedAcc.distance}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryData.name}
                    onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={inquiryData.phone}
                      onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                      placeholder="10-digit mobile"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Guests Count
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={inquiryData.guests}
                      onChange={(e) => setInquiryData({ ...inquiryData, guests: parseInt(e.target.value) || 1 })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={inquiryData.checkIn}
                    onChange={(e) => setInquiryData({ ...inquiryData, checkIn: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-colors shadow-md flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Stay Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
