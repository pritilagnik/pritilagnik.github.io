import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Plane,
  Train,
  Car,
  Bus,
  Sparkles,
  ExternalLink,
  Send,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { EVENT_DETAILS, TRANSIT_GUIDE } from '../data/mahotsavData';
import { FullWidthMap } from './FullWidthMap';

export const ContactView: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-20 bg-stone-50/50 dark:bg-stone-900/30 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2">
            <Phone className="w-4 h-4 text-amber-600" />
            <span>Connect & Transit Guidance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 tracking-tight text-balance">
            Contact Organizers & How to Reach
          </h1>
          <p className="mt-3 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Reach out directly to the Central Reception Desk, connect on WhatsApp, or consult our comprehensive transit guide for arriving in Dotma, Kokrajhar.
          </p>
        </div>

        {/* 3 Contact Channels Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Official Secretariat Address */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider block mb-1">
                Central Secretariat Venue
              </span>
              <h3 className="text-lg font-serif-cinzel font-bold text-stone-900 dark:text-stone-100">
                Dotma Mahotsav Complex
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
                West Dangarkuthi, Dotma Circle, District Kokrajhar, Bodoland Territorial Region (BTR), Assam, India - 783347
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500">
              Coordinates: 26.4633° N, 90.1583° E
            </div>
          </div>

          {/* Card 2: Instant WhatsApp & Helpline */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                Direct WhatsApp & Call
              </span>
              <h3 className="text-lg font-serif-cinzel font-bold text-stone-900 dark:text-stone-100">
                Organizing Desk Helpline
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
                24/7 dedicated helpline for attendee registration, pilgrim reception, and logistics.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-2">
              <a
                href={`https://wa.me/${EVENT_DETAILS.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  "Hello, I would like to inquire about Priti-Lagnik Maha Mahotsav 2026, Dotma, Kokrajhar."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp Directly</span>
              </a>

              <a
                href={`tel:${EVENT_DETAILS.helplinePhone}`}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {EVENT_DETAILS.helplinePhone}</span>
              </a>
            </div>
          </div>

          {/* Card 3: Social Media Channels */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider block mb-1">
                Official Media Channels
              </span>
              <h3 className="text-lg font-serif-cinzel font-bold text-stone-900 dark:text-stone-100">
                Follow Updates & Broadcasts
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
                Connect directly on our social media handles for daily schedules, live streams, and seva announcements.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 grid grid-cols-2 gap-2 text-xs">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-blue-50 dark:bg-stone-800 text-blue-700 dark:text-blue-400 font-semibold hover:bg-blue-100 transition-colors"
              >
                <span>Facebook</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-pink-50 dark:bg-stone-800 text-pink-700 dark:text-pink-400 font-semibold hover:bg-pink-100 transition-colors"
              >
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold hover:bg-stone-200 transition-colors"
              >
                <span>Twitter / X</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-red-50 dark:bg-stone-800 text-red-700 dark:text-red-400 font-semibold hover:bg-red-100 transition-colors"
              >
                <span>YouTube Live</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Transit Guide Grid */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100">
              How to Reach Dotma, Kokrajhar
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              Comprehensive travel pathways by flight, train, private vehicle, and interstate bus services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* By Air */}
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center mb-4">
                  <Plane className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 mb-1">
                  {TRANSIT_GUIDE.byAir.title}
                </h3>
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 block mb-2">
                  {TRANSIT_GUIDE.byAir.nearest}
                </span>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {TRANSIT_GUIDE.byAir.details}
                </p>
              </div>
            </div>

            {/* By Train */}
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center mb-4">
                  <Train className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 mb-1">
                  {TRANSIT_GUIDE.byTrain.title}
                </h3>
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 block mb-2">
                  {TRANSIT_GUIDE.byTrain.nearest}
                </span>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {TRANSIT_GUIDE.byTrain.details}
                </p>
              </div>
            </div>

            {/* By Road */}
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center mb-4">
                  <Car className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 mb-1">
                  By Private Car & Taxi
                </h3>
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 block mb-2">
                  NH-27 & East-West Corridor
                </span>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {TRANSIT_GUIDE.byRoad.details} Dedicated parking bays with round-the-clock volunteer security are located beside Dotma High School field.
                </p>
              </div>
            </div>

            {/* By Bus */}
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center mb-4">
                  <Bus className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 mb-1">
                  By State & Deluxe Bus
                </h3>
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 block mb-2">
                  ASTC & Private Express
                </span>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  Regular day and sleeper buses run from ISBT Guwahati, Siliguri, Jalpaiguri, and Cooch Behar directly to Kokrajhar and Dotma bus stops.
                </p>
              </div>
            </div>
          </div>

          {/* Landmarks Box */}
          <div className="mt-8 p-6 rounded-2xl bg-amber-100/40 dark:bg-stone-850 border border-amber-300/60 dark:border-stone-800">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-serif-cinzel mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Prominent Local Landmarks in Dotma</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-stone-700 dark:text-stone-300">
              {TRANSIT_GUIDE.landmarks.map((landmark, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                  {landmark}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Direct Inquiry Message Form */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-white dark:bg-stone-850 rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-stone-800 shadow-lg">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100">
                Send Direct Message to Organizers
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                For special VIP delegations, volunteer inquiries, transport coordination, or cultural performance entries.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  Message Dispatched Successfully!
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 max-w-md mx-auto">
                  Thank you, {formState.name}. Our Central Reception Secretariat will contact you back on {formState.phone} within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 text-white mt-2"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Full Name"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="Mobile Number"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="Email (Optional)"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Subject
                    </label>
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="General Inquiry">General Event Inquiry</option>
                      <option value="Delegation Travel Assistance">Delegation Travel Assistance</option>
                      <option value="Volunteer Seva">Volunteer Seva Enrollment</option>
                      <option value="Cultural Performance Entry">Cultural Performance Entry</option>
                      <option value="Media & Press Accreditation">Media & Press Accreditation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Your Message / Question
                  </label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Write your details here..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-colors shadow-md flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry to Secretariat</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Full Width Map */}
      <FullWidthMap />
    </div>
  );
};
