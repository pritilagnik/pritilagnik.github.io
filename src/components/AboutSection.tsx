import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Heart,
  Users,
  Compass,
  Phone,
  Utensils,
  Sparkles,
  MapPin,
  Calendar
} from 'lucide-react';
import { AboutSubTab, CommitteeMember, OrganisingTeam } from '../types';
import {
  fetchCommitteeMembers,
  fetchOrganisingTeams
} from '../services/registrationService';
import { EVENT_DETAILS } from '../data/mahotsavData';

interface AboutSectionProps {
  activeSubTab?: AboutSubTab;
  onSelectSubTab?: (subTab: AboutSubTab) => void;
  isStandalonePage?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  activeSubTab = 'overview',
  onSelectSubTab,
  isStandalonePage = false,
}) => {
  const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>([]);
  const [organisingTeams, setOrganisingTeams] = useState<OrganisingTeam[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [selectedCommitteeCategory, setSelectedCommitteeCategory] = useState<string>('All');

  useEffect(() => {
    let mounted = true;
    Promise.all([fetchCommitteeMembers(), fetchOrganisingTeams()])
      .then(([members, teams]) => {
        if (mounted) {
          setCommitteeMembers(members);
          setOrganisingTeams(teams);
          setLoadingData(false);
        }
      })
      .catch((err) => {
        console.warn('Error fetching dynamic committee/teams:', err);
        if (mounted) setLoadingData(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filteredCommittee = selectedCommitteeCategory === 'All'
    ? committeeMembers
    : committeeMembers.filter(m => m.category === selectedCommitteeCategory);

  return (
    <section id="about" className="py-16 sm:py-24 bg-amber-50/50 dark:bg-stone-900/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 tracking-tight text-balance">
            About Priti-Lagnik Maha Mahotsav
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed italic font-serif">
            "The ceremonial function which extols the being and begets prosperity is Utsav."
          </p>

          {/* Sub-navigation Tabs (Priti-Lagnik 2026 / Organising Committee / Volunteers) */}
          <div className="mt-8 inline-flex p-1.5 rounded-xl bg-stone-200/80 dark:bg-stone-800 border border-stone-300 dark:border-stone-700">
            <button
              onClick={() => onSelectSubTab && onSelectSubTab('overview')}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeSubTab === 'overview'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Priti-Lagnik 2026
            </button>
            <button
              onClick={() => onSelectSubTab && onSelectSubTab('committee')}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeSubTab === 'committee'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Organising Committee
            </button>
            <button
              onClick={() => onSelectSubTab && onSelectSubTab('teams')}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeSubTab === 'teams'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Volunteers
            </button>
          </div>
        </div>

        {/* Tab 1: Priti-Lagnik 2026 Overview */}
        {activeSubTab === 'overview' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* Story & Interactive Video Showcase Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Mission Prose */}
              <div className="lg:col-span-7 space-y-5 text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                <div className="space-y-4">
                  <p className="text-base sm:text-lg leading-relaxed text-stone-800 dark:text-stone-200">
                    Priti-Lagnik Maha-Mahotsav 2026 is the District-Level Utsav of Kokrajhar District, going to be organised on 20th December, 2026 (Sunday) to commemorate the 139th Birth Anniversary of Sree Sree Thakur Anukulchandra. The celebration is conceptualised under the divine blessings and guidance of our supremely beloved Sree Sree Acharyadev and the divine inspiration of revered Sree Sree Abindada.
                    <a
                      href="#past-gatherings"
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById('past-gatherings');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1 ml-2 font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 underline underline-offset-4 decoration-amber-400"
                    >
                      <span>Priti-Lagnik 2025</span>
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </p>
                </div>

                {/* 4 Core Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                  <div className="p-4 rounded-xl bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80">
                    <div className="flex items-center gap-2.5 text-amber-700 dark:text-amber-400 font-semibold text-sm mb-1.5">
                      <Heart className="w-4 h-4" />
                      <span>Universal Love (Priti)</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400">
                      Nurturing empathy, mutual reverence, and peace across communities.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80">
                    <div className="flex items-center gap-2.5 text-amber-700 dark:text-amber-400 font-semibold text-sm mb-1.5">
                      <Compass className="w-4 h-4" />
                      <span>Divine Communion (Lagnik)</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400">
                      Daily meditation, prayerful discipline, and character building.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80">
                    <div className="flex items-center gap-2.5 text-amber-700 dark:text-amber-400 font-semibold text-sm mb-1.5">
                      <Utensils className="w-4 h-4" />
                      <span>Maha Annadan Seva</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400">
                      Serving sacred, hygienic satvik prasad to over 100,000 pilgrims.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80">
                    <div className="flex items-center gap-2.5 text-amber-700 dark:text-amber-400 font-semibold text-sm mb-1.5">
                      <BookOpen className="w-4 h-4" />
                      <span>Swastyayani & Health</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400">
                      Existential health principles, yoga, pure nutrition, and eco-care.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Commemorative Emblem & Event Highlight Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 group bg-stone-900">
                  <img
                    src="/src/assets/images/priti_lagnik_logo.webp"
                    alt="Priti-Lagnik Maha Mahotsav Emblem"
                    referrerPolicy="no-referrer"
                    className="w-full h-80 sm:h-96 object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/50 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>District-Level Maha Mahotsav</span>
                    </span>
                    <h4 className="text-xl font-serif-cinzel font-bold text-white mb-2">
                      139th Birth Anniversary Commemoration
                    </h4>
                    <p className="text-xs text-stone-300 leading-relaxed mb-3">
                      Celebrated on 20th December, 2026 at West Dangarkuthi, Dotma, Kokrajhar under the divine blessings of Sree Sree Acharyadev.
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-amber-300 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Sunday, 20 December 2026 · West Dangarkuthi, Dotma</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Committee Members */}
        {activeSubTab === 'committee' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Filter buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {['All', 'Patron', 'Executive', 'Secretariat', 'Finance', 'Cultural'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCommitteeCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    selectedCommitteeCategory === cat
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-amber-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Committee Cards Grid */}
            {loadingData ? (
              <div className="text-center py-12 text-sm text-stone-500">Loading committee members...</div>
            ) : filteredCommittee.length === 0 ? (
              <div className="text-center py-12 text-sm text-stone-500">No committee members found in this category.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCommittee.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white dark:bg-stone-850 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 text-amber-950 font-bold text-lg flex items-center justify-center mb-4 shadow-sm">
                        {member.name.split(' ').slice(1, 3).map(n => n[0]).join('') || member.name[0]}
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
                        {member.category} Committee
                      </span>
                      <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif-cinzel">
                        {member.name}
                      </h4>
                      <p className="text-xs font-medium text-stone-600 dark:text-stone-400 mt-1">
                        {member.role}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400 flex items-center justify-between">
                      <span>📍 {member.location}</span>
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                          title="Call member"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Organising Teams */}
        {activeSubTab === 'teams' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {loadingData ? (
              <div className="text-center py-12 text-sm text-stone-500">Loading volunteer teams...</div>
            ) : organisingTeams.length === 0 ? (
              <div className="text-center py-12 text-sm text-stone-500">No volunteer teams found.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {organisingTeams.map((team) => (
                  <div
                    key={team.id}
                    className="bg-white dark:bg-stone-850 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                          {team.volunteersCount} Active Volunteers
                        </span>
                        <Users className="w-4 h-4 text-stone-400" />
                      </div>

                      <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-serif-cinzel">
                        {team.name}
                      </h4>

                      <div className="mt-2 text-xs text-stone-600 dark:text-stone-400 font-medium">
                        Lead: <span className="text-stone-900 dark:text-stone-200 font-semibold">{team.lead}</span>
                      </div>

                      <ul className="mt-4 space-y-2 text-xs text-stone-600 dark:text-stone-300">
                        {team.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-500 font-bold">·</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                      <span className="text-stone-500 dark:text-stone-400">Desk: {team.contactPerson}</span>
                      <a
                        href={`tel:${team.contactNumber}`}
                        className="inline-flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-400 hover:underline"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{team.contactNumber}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

