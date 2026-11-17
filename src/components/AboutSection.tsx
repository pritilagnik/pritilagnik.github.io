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
  Calendar,
  Search
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
  const [committeeSearch, setCommitteeSearch] = useState<string>('');

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

  const availableCategories = ['All', ...Array.from(new Set(committeeMembers.map(m => m.category))).sort()];

  // Sort and group committee members hierarchically
  const sortedAndGroupedCommittee = React.useMemo(() => {
    const filtered = committeeMembers.filter(m => {
      const matchesCat = selectedCommitteeCategory === 'All' || m.category === selectedCommitteeCategory;
      const searchLower = committeeSearch.trim().toLowerCase();
      const matchesSearch = !searchLower ||
        m.name.toLowerCase().includes(searchLower) ||
        m.role.toLowerCase().includes(searchLower) ||
        m.category.toLowerCase().includes(searchLower) ||
        (m.location && m.location.toLowerCase().includes(searchLower)) ||
        (m.phone && m.phone.toLowerCase().includes(searchLower));
      return matchesCat && matchesSearch;
    });

    const sortMembers = (list: CommitteeMember[]) => {
      return [...list].sort((a, b) => {
        const orderA = a.sortOrder ?? 99;
        const orderB = b.sortOrder ?? 99;
        if (orderA !== orderB) return orderA - orderB;
        return a.name.localeCompare(b.name);
      });
    };

    if (selectedCommitteeCategory !== 'All') {
      return [
        {
          categoryName: selectedCommitteeCategory,
          members: sortMembers(filtered)
        }
      ];
    }

    const categoryMap = new Map<string, CommitteeMember[]>();
    filtered.forEach(m => {
      const cat = m.category || 'Main Committee';
      if (!categoryMap.has(cat)) categoryMap.set(cat, []);
      categoryMap.get(cat)!.push(m);
    });

    const categoriesOrdered = Array.from(categoryMap.keys()).sort((a, b) => {
      if (a === 'Main Committee') return -1;
      if (b === 'Main Committee') return 1;
      return a.localeCompare(b);
    });

    return categoriesOrdered.map(cat => ({
      categoryName: cat,
      members: sortMembers(categoryMap.get(cat)!)
    }));
  }, [committeeMembers, selectedCommitteeCategory, committeeSearch]);

  const totalFilteredCount = sortedAndGroupedCommittee.reduce((sum, g) => sum + g.members.length, 0);

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
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-stone-200/90 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 shadow-sm">
            <button
              onClick={() => onSelectSubTab && onSelectSubTab('overview')}
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeSubTab === 'overview'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white dark:hover:bg-stone-800/80'
              }`}
            >
              Priti-Lagnik 2026
            </button>
            <button
              onClick={() => onSelectSubTab && onSelectSubTab('committee')}
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeSubTab === 'committee'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white dark:hover:bg-stone-800/80'
              }`}
            >
              Organising Committee
            </button>
            <button
              onClick={() => onSelectSubTab && onSelectSubTab('teams')}
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeSubTab === 'teams'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white dark:hover:bg-stone-800/80'
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
                      href="https://pritilagnikmahamahotsav.in/index"
                      className="inline-flex items-center gap-1 ml-2 font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 underline underline-offset-4 decoration-amber-400"
                    >
                      <span>Priti-Lagnik 2025</span>
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </p>
                </div>

                {/* 4 Core Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                  <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                    <div className="flex items-center gap-2.5 text-amber-700 dark:text-amber-400 font-semibold text-sm mb-1.5">
                      <Heart className="w-4 h-4" />
                      <span>Universal Love (Priti)</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300">
                      Nurturing empathy, mutual reverence, and peace across communities.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                    <div className="flex items-center gap-2.5 text-amber-700 dark:text-amber-400 font-semibold text-sm mb-1.5">
                      <Compass className="w-4 h-4" />
                      <span>Divine Communion (Lagnik)</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300">
                      Daily meditation, prayerful discipline, and character building.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                    <div className="flex items-center gap-2.5 text-amber-700 dark:text-amber-400 font-semibold text-sm mb-1.5">
                      <Utensils className="w-4 h-4" />
                      <span>Maha Annadan Seva</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300">
                      Serving sacred, hygienic satvik prasad to over 100,000 pilgrims.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                    <div className="flex items-center gap-2.5 text-amber-700 dark:text-amber-400 font-semibold text-sm mb-1.5">
                      <BookOpen className="w-4 h-4" />
                      <span>Swastyayani & Health</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300">
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
            {/* Search and Category Control Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-md">
              {/* Search input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={committeeSearch}
                  onChange={(e) => setCommitteeSearch(e.target.value)}
                  placeholder="Search office bearers, roles..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Dynamic Category Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <select
                  value={selectedCommitteeCategory}
                  onChange={(e) => setSelectedCommitteeCategory(e.target.value)}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-amber-50 dark:bg-stone-950 text-amber-950 dark:text-stone-100 border border-amber-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {availableCategories.map(cat => (
                    <option key={cat} value={cat} className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100">
                      {cat === 'All' ? 'All Sub-Committees & Main Committee' : cat}
                    </option>
                  ))}
                </select>

                <span className="text-xs font-medium text-stone-500 dark:text-stone-400 whitespace-nowrap px-2">
                  Showing {totalFilteredCount} of {committeeMembers.length} Office Bearers
                </span>
              </div>
            </div>

            {/* Committee Cards Grid with Hierarchical Category Grouping */}
            {loadingData ? (
              <div className="text-center py-12 text-sm text-stone-500">Loading committee members...</div>
            ) : totalFilteredCount === 0 ? (
              <div className="text-center py-12 text-sm text-stone-500">No committee members found matching your filter.</div>
            ) : (
              <div className="space-y-12">
                {sortedAndGroupedCommittee.map((group) => (
                  <div key={group.categoryName} className="space-y-4">
                    {/* Category Header */}
                    <div className="flex items-center justify-between border-b border-amber-300/60 dark:border-stone-800 pb-2.5">
                      <h3 className="text-lg sm:text-xl font-serif-cinzel font-bold text-stone-900 dark:text-amber-300 flex items-center gap-2">
                        <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        <span>{group.categoryName}</span>
                      </h3>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300/50 dark:border-amber-800/60">
                        {group.members.length} Member{group.members.length > 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Category Members Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {group.members.map((member) => (
                        <div
                          key={member.id}
                          className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative"
                        >
                          <div>
                            {/* Avatar initial beside Full Name (Full Width) */}
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-500 text-stone-950 font-extrabold text-sm flex items-center justify-center shadow-sm shrink-0 border border-amber-300 dark:border-amber-400/40">
                                {member.name.split(' ').filter(n => !['Sjt.', 'Dr.', 'Shri', 'Smt.'].includes(n))[0]?.[0] || member.name[0]}
                              </div>
                              <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif-cinzel leading-snug break-words flex-1">
                                {member.name}
                              </h4>
                            </div>

                            {/* Category Badge just ABOVE Role / Position */}
                            <div className="mt-2 mb-1.5 flex items-center justify-between gap-1">
                              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/90 text-amber-900 dark:text-amber-200 border border-amber-300/50 dark:border-amber-700/60" title={member.category}>
                                {member.category}
                              </span>
                              {member.sortOrder !== undefined && member.sortOrder < 99 && (
                                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-400/30">
                                  #{member.sortOrder}
                                </span>
                              )}
                            </div>

                            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                              {member.role}
                            </p>
                          </div>

                          <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300 flex items-center justify-between">
                            <span className="truncate pr-2">{member.location ? `📍 ${member.location}` : '📍 Dotma, Kokrajhar'}</span>
                            {member.phone && (
                              <a
                                href={`tel:${member.phone}`}
                                className="font-semibold text-amber-700 dark:text-amber-300 hover:text-amber-600 dark:hover:text-amber-200 transition-colors shrink-0 flex items-center gap-1.5 bg-amber-50 dark:bg-stone-800 px-2 py-1 rounded-lg border border-amber-200/60 dark:border-stone-700"
                                title="Call member"
                              >
                                <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                                <span>{member.phone}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
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
                    className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-100 dark:bg-amber-950/90 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/50">
                          {team.volunteersCount} Active Volunteers
                        </span>
                        <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      </div>

                      <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-serif-cinzel">
                        {team.name}
                      </h4>

                      <div className="mt-2 text-xs text-stone-600 dark:text-stone-300 font-medium">
                        Lead: <span className="text-amber-800 dark:text-amber-300 font-semibold">{team.lead}</span>
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

                    <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-600 dark:text-stone-300">
                      <span>Desk: {team.contactPerson}</span>
                      <a
                        href={`tel:${team.contactNumber}`}
                        className="inline-flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-300 hover:underline"
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
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

