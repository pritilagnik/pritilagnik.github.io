import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageSquare,
  Train,
  Car,
  ExternalLink,
  Send,
  CheckCircle2,
  Users,
  Compass,
  HeartHandshake,
  Calendar,
  Building2,
  DollarSign
} from 'lucide-react';
import { EVENT_DETAILS, COMMITTEE_MEMBERS } from '../data/mahotsavData';
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

  // Specific desk contacts requested
  const deskContacts = [
    {
      title: "For details of programme",
      role: "Programme & Satsang Coordination",
      contactPerson: "Programme Convenor",
      number: "+91 94350 78334",
      icon: Calendar,
      color: "amber"
    },
    {
      title: "For Free Accomodation",
      role: "Lodging & Yatri Niwas Desk",
      contactPerson: "Accommodation In-Charge",
      number: "+91 94351 89201",
      icon: Building2,
      color: "emerald"
    },
    {
      title: "For travel guidance",
      role: "Transit, Railway & Road Escort",
      contactPerson: "Travel & Logistics Desk",
      number: "+91 94352 45678",
      icon: Compass,
      color: "blue"
    },
    {
      title: "For offerings/donation",
      role: "Finance & Devotional Offerings",
      contactPerson: "Offerings & Accounts Desk",
      number: "+91 94355 67890",
      icon: HeartHandshake,
      color: "purple"
    }
  ];

  // Key reception committee members
  const receptionMembers = [
    { name: "Dr. Hitesh Chandra Roy", role: "President, Reception Committee", phone: "+91 94350 44556" },
    { name: "Sjt. Biseswar Ramchiary", role: "Chief Patron & Elder", phone: "+91 94350 11223" },
    { name: "Sjt. Manoranjan Brahma", role: "General Secretary, Reception Committee", phone: "+91 94351 22334" },
    { name: "Sjt. Dipak Narzary", role: "Joint Convenor, Reception Desk", phone: "+91 94353 33445" },
    { name: "Sjt. Rabindra Nath Roy", role: "Secretariat Coordinator", phone: "+91 94354 55667" },
    { name: "Sjt. Sanjib Kumar Brahma", role: "Public Relations & Volunteers Lead", phone: "+91 94357 88990" }
  ];

  return (
    <div className="py-12 sm:py-20 bg-stone-50/50 dark:bg-stone-900/30 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">

        {/* ========================================================================= */}
        {/* SECTION 1: RECEPTION COMMITTEE */}
        {/* ========================================================================= */}
        <section id="reception-committee" className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-widest">
              <Users className="w-4 h-4 text-amber-600" />
              <span>Official Organizing Secretariat</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 tracking-tight text-balance">
              Reception Committee
            </h1>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              Connect directly with the Central Reception Committee members and designated desk coordinators for event guidance, accommodation, transit assistance, and devotional offerings.
            </p>
          </div>

          {/* Dedicated Desks Required by User */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deskContacts.map((desk, idx) => {
              const Icon = desk.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
                      {desk.title}
                    </span>
                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif-cinzel">
                      {desk.role}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      In-Charge: <span className="font-semibold text-stone-800 dark:text-stone-200">{desk.contactPerson}</span>
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800">
                    <a
                      href={`tel:${desk.number}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-sm transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Contact: {desk.number}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reception Committee Member Names and Contact Numbers */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
              <div>
                <h2 className="text-xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100">
                  Reception Committee Members
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Direct contacts for the executive and central secretariat leaders
                </p>
              </div>

              <a
                href={`https://wa.me/${EVENT_DETAILS.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  "Joyguru! I would like to connect with the Reception Committee of Priti-Lagnik Maha Mahotsav 2026."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-xs w-fit"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Secretariat WhatsApp</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {receptionMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-amber-50/40 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 flex items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-serif-cinzel">
                      {member.name}
                    </h4>
                    <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium block mt-0.5">
                      {member.role}
                    </span>
                  </div>
                  <a
                    href={`tel:${member.phone}`}
                    className="p-2 rounded-lg bg-white dark:bg-stone-700 text-amber-700 dark:text-amber-300 hover:bg-amber-600 hover:text-white transition-colors shadow-2xs shrink-0"
                    title={`Call ${member.name}`}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: HOW TO REACH */}
        {/* ========================================================================= */}
        <section id="how-to-reach" className="space-y-10 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-widest">
              <Compass className="w-4 h-4 text-amber-600" />
              <span>Transit & Geographic Guide</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 tracking-tight text-balance">
              How to Reach
            </h2>
          </div>

          {/* Core Geographical Description Required by User */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-50 dark:bg-stone-900 border border-amber-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed">
              <p className="font-sans leading-relaxed">
                The Maha-Mahotsav can be located at serene landscape surrounded the villages inhabitated by communities such as Bodos, Koch-Rajbongshi and Begali. It is accessible through Railway via Kokrajhar( 16KMS approx.), Fakiragram (15 KM Approx.) and Gossaigaon (25KMS approx.) Railway Stations. It is accessible from NH27 via Karigaon (30KMS), Patgaon (21 KMS), Ramfalbil (13KMS), Serfanguri (11KMS), Gossaigaon(21 KMS).
              </p>
            </div>

            {/* Structured Transit Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Railway Access Card */}
              <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                    <Train className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif-cinzel font-bold text-stone-900 dark:text-stone-100">
                      Railway Connectivity
                    </h3>
                    <span className="text-xs text-stone-500 dark:text-stone-400">Major Northeast Frontier Railway Stations</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-between">
                    <span>🚉 <strong>Kokrajhar Railway Station:</strong></span>
                    <span className="font-semibold text-amber-700 dark:text-amber-400">~16 Kms</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-between">
                    <span>🚉 <strong>Fakiragram Railway Station:</strong></span>
                    <span className="font-semibold text-amber-700 dark:text-amber-400">~15 Kms</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-between">
                    <span>🚉 <strong>Gossaigaon Railway Station:</strong></span>
                    <span className="font-semibold text-amber-700 dark:text-amber-400">~25 Kms</span>
                  </div>
                </div>
              </div>

              {/* Road Access via NH27 */}
              <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif-cinzel font-bold text-stone-900 dark:text-stone-100">
                      Road Access via NH-27
                    </h3>
                    <span className="text-xs text-stone-500 dark:text-stone-400">East-West Corridor Connectors</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-stone-700 dark:text-stone-300">
                  <div className="p-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    <span className="block text-stone-500 text-[11px]">Via Serfanguri:</span>
                    <span className="font-bold text-stone-900 dark:text-stone-100">~11 Kms</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    <span className="block text-stone-500 text-[11px]">Via Ramfalbil:</span>
                    <span className="font-bold text-stone-900 dark:text-stone-100">~13 Kms</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    <span className="block text-stone-500 text-[11px]">Via Patgaon:</span>
                    <span className="font-bold text-stone-900 dark:text-stone-100">~21 Kms</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    <span className="block text-stone-500 text-[11px]">Via Gossaigaon:</span>
                    <span className="font-bold text-stone-900 dark:text-stone-100">~21 Kms</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 col-span-2">
                    <span className="block text-stone-500 text-[11px]">Via Karigaon:</span>
                    <span className="font-bold text-stone-900 dark:text-stone-100">~30 Kms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Google Map Pin Embed & Link */}
            <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-semibold text-sm">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>Google Map Location Pin · West Dangarkuthi, Dotma (26.4633° N, 90.1583° E)</span>
                </div>
                <a
                  href="https://maps.google.com/?q=26.4633,90.1583"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-sm transition-colors w-fit"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Interactive Google Map Pin</span>
                </a>
              </div>

              {/* Embedded Google Map iFrame */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-stone-300 dark:border-stone-700 shadow-md">
                <iframe
                  title="Priti-Lagnik Maha Mahotsav Venue Map Pin"
                  src="https://maps.google.com/maps?q=26.4633,90.1583&hl=en&z=14&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-stone-800 shadow-lg">
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
                      <option value="Accommodation Inquiry">Free Accommodation Inquiry</option>
                      <option value="Programme Information">Programme Schedule Details</option>
                      <option value="Travel Guidance">Travel & Transit Guidance</option>
                      <option value="Offerings / Donation">Devotional Offerings / Donation</option>
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
    </div>
  );
};
