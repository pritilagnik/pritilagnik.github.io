import React from 'react';
import { X, ShieldCheck, FileText, UserCheck, AlertCircle } from 'lucide-react';

export type LegalDocType = 'terms' | 'privacy' | 'volunteer' | 'disclaimer';

interface LegalModalProps {
  type: LegalDocType | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap: Record<LegalDocType, { title: string; subtitle: string; body: React.ReactNode }> = {
    terms: {
      title: 'Terms of Attendance & Code of Conduct',
      subtitle: 'Guidelines for pilgrims, attendees, and delegations at Priti-Lagnik Maha Mahotsav 2026',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          <p>
            Welcome to the <strong>Priti-Lagnik Maha Mahotsav 2026</strong>. By registering or attending the festival in Dotma, Kokrajhar, all participants agree to observe the following codes of conduct:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Sanctity & Reverence:</strong> The entire venue is a sacred spiritual zone. Maintain quietude, discipline, and reverence inside prayer pandals and sanctum areas.</li>
            <li><strong>Satvik Environment:</strong> Consumption or possession of alcohol, tobacco, non-vegetarian food, and intoxicants is strictly prohibited across all festival grounds and accommodations.</li>
            <li><strong>Zero Plastic & Cleanliness:</strong> Dotma Mahotsav follows an eco-conscious green pledge. Please dispose of waste in designated organic/recyclable bins.</li>
            <li><strong>ID & Digital Pass:</strong> Attendees must carry their digital pass or physical badge issued at the Reception counter for access to Annadan langar and dormitory facilities.</li>
          </ul>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy Policy & Data Use',
      subtitle: 'How attendee registrations and contact information are protected',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          <p>
            The Central Organising Committee values your trust and privacy. Information collected during delegate registration (name, phone number, address, arrival details) is handled with strict confidentiality:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Logistics Only:</strong> Data is strictly utilized for festival logistics, accommodation assignment, crowd safety, and emergency contacts.</li>
            <li><strong>No Third-Party Sharing:</strong> Your personal data will never be commercialized, sold, or shared with commercial marketing entities.</li>
            <li><strong>Local Storage:</strong> Digital pass records are stored client-side in your device browser for offline verification and convenience.</li>
          </ul>
        </div>
      ),
    },
    volunteer: {
      title: 'Volunteer Seva Charter & Guidelines',
      subtitle: 'Duties, discipline, and responsibilities for Shanti Sena & Seva workers',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          <p>
            Volunteers are the living heart of the Maha Mahotsav. As ambassadors of Sree Sree Thakur's ideology of selfless seva:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Kindness to Pilgrims:</strong> Treat all elders, children, and visitors with utmost humility, gentleness, and warm courtesy.</li>
            <li><strong>Reporting & Punctuality:</strong> Arrive at your assigned station (Annadan kitchen, reception desk, traffic corridor) 30 minutes prior to scheduled shifts.</li>
            <li><strong>Emergency Protocol:</strong> In case of medical distress or overcrowding, immediately signal the nearest Arogya Medical Bay or Shanti Sena supervisor.</li>
          </ul>
        </div>
      ),
    },
    disclaimer: {
      title: 'General Disclaimer & Travel Advisory',
      subtitle: 'Information regarding event schedules, weather, and venue advisories',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          <p>
            While the Organising Committee makes every effort to adhere to publicized schedules, program timings, venue allocations, and speaker listings may undergo minor adjustments based on weather or local administrative advisories.
          </p>
          <p>
            Visitors are advised to carry light woolens for the November climate in Kokrajhar, Assam, as mornings and late evenings can be brisk.
          </p>
        </div>
      ),
    },
  };

  const item = contentMap[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-800 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4 mb-4">
          <div>
            <h3 className="font-serif-cinzel font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100">
              {item.title}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {item.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
            aria-label="Close legal modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto pr-2 py-2">
          {item.body}
        </div>

        <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 text-white transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
