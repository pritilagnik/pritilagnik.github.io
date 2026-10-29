import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  Sparkles,
  UserCheck,
  Calendar,
  Users,
  Image as ImageIcon,
  Building2,
  PhoneCall,
  Search,
  Globe,
  MessageSquare
} from 'lucide-react';
import { PageTab, AboutSubTab } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  aboutSubTab: AboutSubTab;
  onSelectAboutSubTab: (subTab: AboutSubTab) => void;
  onOpenRegister: () => void;
  onOpenFeedback?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  aboutSubTab,
  onSelectAboutSubTab,
  onOpenRegister,
  onOpenFeedback
}) => {
  const { lang, setLang, availableLanguages, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAboutDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (tab: PageTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutSubClick = (subTab: AboutSubTab) => {
    onSelectTab('about');
    onSelectAboutSubTab(subTab);
    setAboutDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-amber-50/90 dark:bg-stone-900/95 backdrop-blur-md border-b border-amber-200/50 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4 md:gap-8">
          {/* Zone 1: Brand Wordmark with Real Priti Lagnik Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left text-stone-900 dark:text-stone-100 whitespace-nowrap shrink-0 group focus:outline-none"
          >
            <img
              src="/src/assets/images/priti_lagnik_logo.webp"
              alt="Priti Lagnik Logo"
              className="w-10 h-10 object-contain rounded-full shadow-sm ring-2 ring-amber-400 group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="font-serif-cinzel font-bold text-base sm:text-lg tracking-wide block leading-none text-stone-900 dark:text-stone-100">
                Priti-Lagnik 2026
              </span>
              <span className="text-[10px] tracking-wider uppercase text-amber-700 dark:text-amber-400 font-medium block mt-0.5">
                West Dangarkuthi, Dotma
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-600 dark:hover:text-amber-400 ${
                currentTab === 'home'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              {t('home')}
            </button>

            {/* About with Submenu (Committee and Organising Teams) */}
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className={`flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 hover:text-amber-600 dark:hover:text-amber-400 ${
                  currentTab === 'about'
                    ? 'text-amber-600 dark:text-amber-400 font-semibold'
                    : 'text-stone-700 dark:text-stone-300'
                }`}
              >
                <span>{t('about')}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-white dark:bg-stone-850 shadow-xl border border-stone-200 dark:border-stone-700 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={() => handleAboutSubClick('overview')}
                    className="w-full text-left px-4 py-2.5 text-xs text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-800 transition-colors"
                  >
                    Maha Mahotsav Overview
                  </button>
                  <button
                    onClick={() => handleAboutSubClick('committee')}
                    className="w-full text-left px-4 py-2.5 text-xs text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-800 transition-colors"
                  >
                    Executive & Advisory Committee
                  </button>
                  <button
                    onClick={() => handleAboutSubClick('organising-teams')}
                    className="w-full text-left px-4 py-2.5 text-xs text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-800 transition-colors"
                  >
                    Organising & Seva Teams
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('events')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-600 dark:hover:text-amber-400 ${
                currentTab === 'events'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              {t('events')}
            </button>

            <button
              onClick={() => handleNavClick('gallery')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-600 dark:hover:text-amber-400 ${
                currentTab === 'gallery'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              {t('gallery')}
            </button>

            <button
              onClick={() => handleNavClick('accommodation')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-600 dark:hover:text-amber-400 ${
                currentTab === 'accommodation'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              {t('accommodation')}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-600 dark:hover:text-amber-400 ${
                currentTab === 'contact'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              {t('contact')}
            </button>
          </nav>

          {/* Zone 3: Actions (Language switcher, Theme switch, Feedback, Check Status, Register) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Language Switcher (Order: Hindi, English, Bodo, Bengali, Assamese) */}
            <div className="relative shrink-0" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="px-2 sm:px-2.5 py-1 text-xs font-bold rounded-lg border border-amber-300 dark:border-stone-700 bg-amber-100/70 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-amber-200 dark:hover:bg-stone-700 transition-colors flex items-center gap-1.5 shrink-0"
                title="Select Language / भाषा चुनें"
              >
                <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span className="hidden sm:inline">{availableLanguages.find(l => l.code === lang)?.nativeName || 'हिन्दी'}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {langDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-44 rounded-xl bg-white dark:bg-stone-850 shadow-xl border border-stone-200 dark:border-stone-700 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-stone-400 border-b border-stone-100 dark:border-stone-800 mb-1">
                    Select Language
                  </div>
                  {availableLanguages.map((item) => {
                    const isSelected = item.code === lang;
                    return (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLang(item.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-amber-100/70 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold'
                            : 'text-stone-700 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-800'
                        }`}
                      >
                        <span className="font-medium">{item.nativeName}</span>
                        <span className="text-[10px] text-stone-400">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dark / Light Mode Switcher */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="p-1.5 sm:p-2 rounded-lg text-stone-600 hover:text-amber-600 dark:text-stone-300 dark:hover:text-amber-400 hover:bg-amber-100/60 dark:hover:bg-stone-800 transition-colors focus:outline-none"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
            </button>

            {/* Attendee Feedback Modal Trigger */}
            {onOpenFeedback && (
              <button
                onClick={onOpenFeedback}
                className="hidden lg:flex items-center gap-1 p-2 rounded-lg text-xs font-semibold text-stone-600 hover:text-amber-600 dark:text-stone-300 hover:bg-amber-100/60 dark:hover:bg-stone-800 transition-colors"
                title="Submit Attendee Feedback"
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                <span>Feedback</span>
              </button>
            )}

            {/* Check Status Button */}
            <button
              onClick={() => handleNavClick('status-check')}
              className={`hidden md:flex px-2.5 py-1.5 rounded-lg text-xs font-semibold items-center gap-1 transition-colors ${
                currentTab === 'status-check'
                  ? 'bg-amber-600 text-white'
                  : 'text-amber-700 dark:text-amber-400 hover:bg-amber-100/60 dark:hover:bg-stone-800'
              }`}
              title="Check Registration & Pass Status"
            >
              <span>{t('check_status')}</span>
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`hidden md:flex px-2 py-1.5 rounded-lg text-xs font-semibold items-center gap-1 transition-colors ${
                currentTab === 'admin'
                  ? 'bg-stone-900 text-white dark:bg-amber-500 dark:text-stone-950'
                  : 'text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title="Secretariat Admin Portal"
            >
              <span>Admin</span>
            </button>

            {/* Desktop Register Button */}
            <button
              onClick={onOpenRegister}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 text-white transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{t('register')}</span>
            </button>

            {/* Hamburger Icon for Mobile Drawer */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-amber-100/60 dark:hover:bg-stone-800 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Quick Bar (Requirement: In mobile only Home, About, Events and Accommodation should show directly) */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-amber-200/40 dark:border-stone-800/80 text-xs font-medium">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-2 py-1 transition-colors ${
              currentTab === 'home'
                ? 'text-amber-600 dark:text-amber-400 font-semibold'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            {t('home')}
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`px-2 py-1 transition-colors ${
              currentTab === 'about'
                ? 'text-amber-600 dark:text-amber-400 font-semibold'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            {t('about')}
          </button>
          <button
            onClick={() => handleNavClick('events')}
            className={`px-2 py-1 transition-colors ${
              currentTab === 'events'
                ? 'text-amber-600 dark:text-amber-400 font-semibold'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            {t('events')}
          </button>
          <button
            onClick={() => handleNavClick('accommodation')}
            className={`px-2 py-1 transition-colors ${
              currentTab === 'accommodation'
                ? 'text-amber-600 dark:text-amber-400 font-semibold'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            {t('accommodation')}
          </button>
        </div>
      </div>

      {/* Full Mobile Drawer when Hamburger is clicked */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-stone-900/98 backdrop-blur-lg border-b border-stone-200 dark:border-stone-800 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentTab === 'home'
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <span>Home</span>
            </button>

            {/* About & Sub-sections */}
            <div className="pl-3 border-l-2 border-amber-300 dark:border-stone-700 my-1 space-y-1">
              <button
                onClick={() => handleAboutSubClick('overview')}
                className={`w-full text-left py-2 text-sm font-medium flex items-center justify-between ${
                  currentTab === 'about' && aboutSubTab === 'overview'
                    ? 'text-amber-700 dark:text-amber-400 font-semibold'
                    : 'text-stone-700 dark:text-stone-300'
                }`}
              >
                <span>About Maha Mahotsav</span>
              </button>
              <button
                onClick={() => handleAboutSubClick('committee')}
                className={`w-full text-left py-2 text-sm font-medium flex items-center justify-between ${
                  currentTab === 'about' && aboutSubTab === 'committee'
                    ? 'text-amber-700 dark:text-amber-400 font-semibold'
                    : 'text-stone-700 dark:text-stone-300'
                }`}
              >
                <span>Committee Members</span>
              </button>
              <button
                onClick={() => handleAboutSubClick('organising-teams')}
                className={`w-full text-left py-2 text-sm font-medium flex items-center justify-between ${
                  currentTab === 'about' && aboutSubTab === 'organising-teams'
                    ? 'text-amber-700 dark:text-amber-400 font-semibold'
                    : 'text-stone-700 dark:text-stone-300'
                }`}
              >
                <span>Organising Teams & Seva Units</span>
              </button>
            </div>

            <button
              onClick={() => handleNavClick('events')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentTab === 'events'
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Events & Detailed Schedules</span>
            </button>

            <button
              onClick={() => handleNavClick('gallery')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentTab === 'gallery'
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-amber-600" />
              <span>Media & Gallery</span>
            </button>

            <button
              onClick={() => handleNavClick('accommodation')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentTab === 'accommodation'
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-600" />
              <span>Accommodation & Lodging</span>
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentTab === 'contact'
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-amber-600" />
              <span>Contact & Venue Transit</span>
            </button>

            <button
              onClick={() => handleNavClick('status-check')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentTab === 'status-check'
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Search className="w-4 h-4 text-amber-600" />
              <span>Check Status & Print Passes</span>
            </button>

            {onOpenFeedback && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFeedback();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <MessageSquare className="w-4 h-4 text-amber-600" />
                <span>Submit Feedback & Review</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentTab === 'admin'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <UserCheck className="w-4 h-4 text-amber-600" />
              <span>Admin Secretariat Portal</span>
            </button>
          </div>

          {/* Mobile Language Selector (Hindi, English, Bodo, Bengali, Assamese) */}
          <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800">
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span>Select Language / भाषा</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {availableLanguages.map((item) => {
                const isSelected = item.code === lang;
                return (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLang(item.code);
                    }}
                    className={`px-1.5 py-1.5 rounded-lg text-center text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-400/40'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    <span className="block text-[11px] leading-tight truncate">{item.nativeName}</span>
                    <span className="block text-[9px] opacity-75 font-normal truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme switcher for mobile */}
          <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-300">
              Appearance Theme
            </span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-stone-700" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-800 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 text-white shadow-sm"
            >
              <UserCheck className="w-4 h-4" />
              <span>Register as Attendee / Delegation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
