import React, { useState } from 'react';
import { ShieldCheck, Play, X, ExternalLink, Building, HeartHandshake } from 'lucide-react';
import { TRUSTED_ORGANIZATIONS } from '../data/mahotsavData';

export const TrustedOrganizations: React.FC = () => {
  const [partnerVideoOpen, setPartnerVideoOpen] = useState(false);
  const [activePartnerName, setActivePartnerName] = useState('');

  const handleOpenVideo = (name: string) => {
    setActivePartnerName(name);
    setPartnerVideoOpen(true);
  };

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-stone-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2">
            <HeartHandshake className="w-4 h-4 text-amber-600" />
            <span>Harmonious Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 tracking-tight text-balance">
            Organizations In Association & Trust
          </h2>
          <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Joined in selfless seva by leading socio-cultural councils, healthcare missions, student assemblies, and fraternal Satsang institutions.
          </p>
        </div>

        {/* Organization Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRUSTED_ORGANIZATIONS.map((org, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
                    <Building className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                    Est. {org.established}
                  </span>
                </div>

                <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif-cinzel">
                  {org.name}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                  {org.role}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Seva Partner</span>
                </span>
                <button
                  onClick={() => handleOpenVideo(org.name)}
                  className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-semibold hover:underline"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Message</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partner Video Modal */}
      {partnerVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-700">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 text-white">
              <div>
                <h4 className="font-serif-cinzel font-semibold text-amber-300">
                  {activePartnerName} · Solidarity Message
                </h4>
                <p className="text-xs text-stone-400">
                  Support video message for Priti-Lagnik Maha Mahotsav 2026
                </p>
              </div>
              <button
                onClick={() => setPartnerVideoOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                controls
                autoPlay
                className="w-full h-full object-contain"
                poster="/src/assets/images/cultural_concourse_assam_1793101657203.jpg"
              >
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                  type="video/mp4"
                />
              </video>
            </div>

            <div className="p-4 bg-stone-950 text-right">
              <button
                onClick={() => setPartnerVideoOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-xs font-medium"
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
