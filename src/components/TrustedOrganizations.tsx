import React from 'react';
import { ShieldCheck, Building, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { TRUSTED_ORGANIZATIONS } from '../data/mahotsavData';

export const TrustedOrganizations: React.FC = () => {
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
                <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Active Association</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

