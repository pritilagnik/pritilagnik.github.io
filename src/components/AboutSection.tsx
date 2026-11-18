import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Heart,
  Users,
  Compass,
  Utensils,
  Sparkles,
  MapPin,
  Calendar,
  Search,
  Megaphone,
  Pin,
  AlertTriangle,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { AboutSubTab, CommitteeMember, OrganisingTeam, NoticeItem } from '../types';
import {
  fetchCommitteeMembers,
  fetchOrganisingTeams
} from '../services/registrationService';
import { subscribeToNotices } from '../services/noticeService';
import { NoticeModal } from './NoticeModal';
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
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [selectedCommitteeCategory, setSelectedCommitteeCategory] = useState<string>('All');
  const [committeeSearch, setCommitteeSearch] = useState<string>('');
  const [noticeSearch, setNoticeSearch] = useState<string>('');
  const [selectedNoticeCategory, setSelectedNoticeCategory] = useState<string>('All');
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

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

    const unsubNotices = subscribeToNotices((allNotices) => {
      if (mounted) {
        setNotices(allNotices.filter((n) => n.isActive));
      }
    });

    return () => {
      mounted = false;
      unsubNotices();
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
        (m.location && m.location.toLowerCase().includes(searchLower));
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

          {/* Sub-navigation Tabs (Priti-Lagnik 2026 / Organising Committee / Volunteers / Notices & Announcements) */}
          <div className="mt-8 inline-flex flex-wrap justify-center gap-1 p-1.5 rounded-2xl bg-stone-200/90 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 shadow-sm">
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
                activeSubTab === 'teams' || activeSubTab === 'organising-teams'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white dark:hover:bg-stone-800/80'
              }`}
            >
              Volunteers
            </button>
            <button
              onClick={() => onSelectSubTab && onSelectSubTab('notices')}
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all inline-flex items-center gap-1.5 ${
                activeSubTab === 'notices'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white dark:hover:bg-stone-800/80'
              }`}
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>Notices &amp; Announcements</span>
              {notices.length > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  activeSubTab === 'notices'
                    ? 'bg-white/20 text-white'
                    : 'bg-amber-500/20 text-amber-800 dark:text-amber-300'
                }`}>
                  {notices.length}
                </span>
              )}
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

                          <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300">
                            <span className="truncate">{member.location ? `📍 ${member.location}` : '📍 Dotma, Kokrajhar'}</span>
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
        {(activeSubTab === 'teams' || activeSubTab === 'organising-teams') && (
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

                    <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300">
                      <span>Desk: {team.contactPerson}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* Tab 4: Notices & Announcements */}
        {activeSubTab === 'notices' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Search & Category Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-md">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={noticeSearch}
                  onChange={(e) => setNoticeSearch(e.target.value)}
                  placeholder="Search notices & announcements..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {['All', 'General', 'Schedule', 'Accommodation', 'Transport', 'Urgent', 'Seva'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedNoticeCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                      selectedNoticeCategory === cat
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-stone-100 dark:bg-stone-950 text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {(() => {
              const filteredNotices = notices.filter((n) => {
                const matchesCat = selectedNoticeCategory === 'All' || n.category === selectedNoticeCategory;
                const q = noticeSearch.trim().toLowerCase();
                const matchesSearch =
                  !q ||
                  n.title.toLowerCase().includes(q) ||
                  n.content.toLowerCase().includes(q) ||
                  n.category.toLowerCase().includes(q);
                return matchesCat && matchesSearch;
              });

              if (filteredNotices.length === 0) {
                return (
                  <div className="bg-white dark:bg-stone-900 rounded-2xl p-12 text-center border border-stone-200 dark:border-stone-800 shadow-sm">
                    <Megaphone className="w-10 h-10 text-amber-500/70 mx-auto mb-3" />
                    <h3 className="text-lg font-serif-cinzel font-bold text-stone-900 dark:text-stone-100">
                      No Notices &amp; Announcements Found
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-md mx-auto">
                      {notices.length === 0
                        ? 'Official bulletins, schedule updates, and travel advisories published by the Secretariat will appear here.'
                        : 'Try clearing your search or choosing a different category filter.'}
                    </p>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredNotices.map((notice) => {
                    const formattedDate = (() => {
                      try {
                        return new Date(notice.updatedAt || notice.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        });
                      } catch {
                        return notice.createdAt;
                      }
                    })();

                    return (
                      <article
                        key={notice.id}
                        onClick={() => setSelectedNotice(notice)}
                        className="cursor-pointer group bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-lg hover:border-amber-400 dark:hover:border-amber-500/60 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/90 text-amber-900 dark:text-amber-200 border border-amber-300/60 dark:border-amber-800">
                                {notice.category}
                              </span>
                              {notice.priority !== 'Normal' && (
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                                    notice.priority === 'Urgent'
                                      ? 'bg-red-100 dark:bg-red-950/90 text-red-700 dark:text-red-300 border-red-300 dark:border-red-800'
                                      : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                                  }`}
                                >
                                  {notice.priority === 'Urgent' && <AlertTriangle className="w-3 h-3" />}
                                  <span>{notice.priority}</span>
                                </span>
                              )}
                              {notice.isPinned && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/90 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800">
                                  <Pin className="w-3 h-3" />
                                  <span>Pinned</span>
                                </span>
                              )}
                            </div>

                            <span className="inline-flex items-center gap-1 text-[11px] text-stone-500 dark:text-stone-400">
                              <Calendar className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                              <span>{formattedDate}</span>
                            </span>
                          </div>

                          <h3 className="text-lg font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors leading-snug">
                            {notice.title}
                          </h3>

                          <p className="mt-2.5 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3 whitespace-pre-wrap">
                            {notice.content}
                          </p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                          <span className="text-stone-500 dark:text-stone-400 truncate max-w-[60%]">
                            {notice.createdBy ? `By ${notice.createdBy}` : 'Central Secretariat'}
                          </span>
                          <span className="inline-flex items-center gap-1 font-bold text-amber-700 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform">
                            {notice.linkUrl && <ExternalLink className="w-3 h-3" />}
                            <span>Read Full Notice</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}
      </div>

      <NoticeModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />
    </section>
  );
};
