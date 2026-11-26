import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Heart,
  ChevronRight,
  Users,
  CalendarDays
} from 'lucide-react';
import { PageTab, AboutSubTab, VisitorStats } from '../types';
import { EVENT_DETAILS } from '../data/mahotsavData';
import { LegalModal, LegalDocType } from './LegalModal';
import { recordVisitorVisit, subscribeToVisitorCounts } from '../services/visitorService';

interface FooterProps {
  onSelectTab: (tab: PageTab) => void;
  onSelectAboutSubTab: (subTab: AboutSubTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onSelectAboutSubTab }) => {
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType | null>(null);
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToVisitorCounts((stats) => {
      setVisitorStats(stats);
    });

    recordVisitorVisit().catch(() => {
      // Errors are logged structurally inside visitorService
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleNav = (tab: PageTab) => {
    onSelectTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutSub = (sub: AboutSubTab) => {
    onSelectTab('about');
    onSelectAboutSubTab(sub);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand & Mission column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-stone-950 font-bold">
                <Sparkles className="w-4 h-4 fill-stone-950" />
              </div>
              <span className="font-serif-cinzel font-bold text-lg text-white tracking-wide">
                Priti-Lagnik 2026
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              The grand spiritual, humanitarian, and cultural concourse held in Dotma, Kokrajhar, Assam. Dedicated to the existential ideals of Sree Sree Thakur: Unconditional Love, Divine Attachment, and Compassionate Seva.
            </p>

            <div className="pt-2 text-xs space-y-1.5 text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Dotma, Kokrajhar, Assam, India - 783347</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Helpline: {EVENT_DETAILS.helplinePhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{EVENT_DETAILS.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-serif-cinzel mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleAboutSub('overview')}
                  className="hover:text-amber-400 transition-colors"
                >
                  About the Event
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('events')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Events & Schedule
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Media & Video Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('accommodation')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Accommodation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('nearby')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Nearby Places to Visit
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Contact & Transit
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('status-check')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Check Pass Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin')}
                  className="text-amber-400/90 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Secretariat Admin</span>
                </button>
              </li>
            </ul>
          </div>

          {/* About Sub-Sections */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-serif-cinzel mb-4">
              Committees & Seva
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleAboutSub('overview')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Priti-Lagnik 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleAboutSub('committee')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Organising Committee
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleAboutSub('teams')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Volunteers & Seva Units
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleAboutSub('teams')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Maha Annadan Kitchen Seva
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleAboutSub('teams')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Shanti Sena & Traffic Control
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleAboutSub('teams')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Arogya Medical Camp
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleAboutSub('notices')}
                  className="text-amber-400/90 hover:text-amber-300 font-semibold transition-colors"
                >
                  Notices &amp; Announcements
                </button>
              </li>
            </ul>
          </div>

          {/* Social Media & Legal Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-serif-cinzel mb-4">
              Connect & Legal
            </h4>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
                  aria-label="Facebook"
                >
                  Facebook
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
                <a
                  href="https://www.youtube.com/@priti-lagnikmahamahotsav-2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
                  aria-label="YouTube"
                >
                  YouTube
                </a>
                <a
                  href={`https://wa.me/${EVENT_DETAILS.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 transition-colors"
                  aria-label="WhatsApp"
                >
                  WhatsApp
                </a>
              </div>

              <div className="pt-2 border-t border-stone-800 space-y-1.5 text-xs text-stone-400">
                <button
                  onClick={() => setActiveLegalDoc('terms')}
                  className="block hover:text-amber-400 text-left transition-colors"
                >
                  Terms of Attendance
                </button>
                <button
                  onClick={() => setActiveLegalDoc('privacy')}
                  className="block hover:text-amber-400 text-left transition-colors"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setActiveLegalDoc('volunteer')}
                  className="block hover:text-amber-400 text-left transition-colors"
                >
                  Volunteer Guidelines
                </button>
                <button
                  onClick={() => setActiveLegalDoc('disclaimer')}
                  className="block hover:text-amber-400 text-left transition-colors"
                >
                  Travel & Weather Advisory
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Centered Visitor Counter Strip (Daily & All-Time Visitors only) */}
        <div className="mt-10 pt-6 border-t border-stone-800 flex items-center justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-3 rounded-2xl bg-stone-950/75 border border-stone-800 shadow-inner">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <CalendarDays className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                  Today&apos;s Visitors
                </span>
                <span className="text-sm font-mono font-bold text-amber-300 tabular-nums">
                  {visitorStats ? visitorStats.dailyCount.toLocaleString() : '—'}
                </span>
              </div>
            </div>

            <div className="hidden sm:block h-7 w-px bg-stone-800" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                  All-Time Visitors
                </span>
                <span className="text-sm font-mono font-bold text-white tabular-nums">
                  {visitorStats ? visitorStats.allTimeCount.toLocaleString() : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and developer credit line */}
        <div className="mt-6 pt-6 border-t border-stone-800/70 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3">
          <span>
            © 2026 Priti-Lagnik Maha Mahotsav Central Organising Committee · Dotma, Kokrajhar, Assam, India - 783347.
          </span>
          <div className="flex items-center gap-1.5 text-stone-300">
            <span>Developed with</span>
            <span className="text-red-500 animate-pulse text-sm inline-block" role="img" aria-label="love">❤️</span>
            <span>in Kokrajhar by</span>
            <a
              href="https://www.narzary.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-4 hover:underline transition-colors"
            >
              Narzary
            </a>
          </div>
        </div>
      </div>

      {/* Legal Dialog Popup */}
      <LegalModal
        type={activeLegalDoc}
        onClose={() => setActiveLegalDoc(null)}
      />
    </footer>
  );
};
