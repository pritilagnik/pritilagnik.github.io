/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageTab, AboutSubTab } from './types';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { DynamicGallery } from './components/DynamicGallery';
import { RegistrationForm } from './components/RegistrationForm';
import { ThakurCards } from './components/ThakurCards';
import { ThakurAnniversarySection } from './components/ThakurAnniversarySection';
import { PastGatheringsGallery } from './components/PastGatheringsGallery';
import { TrustedOrganizations } from './components/TrustedOrganizations';
import { FullWidthMap } from './components/FullWidthMap';
import { EventsView } from './components/EventsView';
import { AccommodationView } from './components/AccommodationView';
import { ContactView } from './components/ContactView';
import { FeedbackModal } from './components/FeedbackModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>('home');
  const [aboutSubTab, setAboutSubTab] = useState<AboutSubTab>('overview');
  const [feedbackOpen, setFeedbackOpen] = useState<boolean>(false);

  // Status check and admin live on their own tablet-minimum pages.
  const navigateTab = (tab: PageTab) => {
    if (tab === 'status-check') window.location.href = './status.html';
    else if (tab === 'admin') window.location.href = './admin.html';
    else setCurrentTab(tab);
  };

  const scrollToRegistration = () => {
    if (currentTab !== 'home') {
      setCurrentTab('home');
      setTimeout(() => {
        const el = document.getElementById('register');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('register');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-amber-50/20 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
        {/* Top Navigation Bar with Language Switcher, Mobile Quick Bar & Hamburger */}
        <Navbar
          currentTab={currentTab}
          onSelectTab={navigateTab}
          aboutSubTab={aboutSubTab}
          onSelectAboutSubTab={setAboutSubTab}
          onOpenRegister={scrollToRegistration}
          onOpenFeedback={() => setFeedbackOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {currentTab === 'home' && (
            <>
              {/* 1. Hero Section with Big Feature Image, Event Highlights, Countdown Timer & Discover More */}
              <HeroSection
                onDiscoverMore={scrollToAbout}
                onOpenRegister={scrollToRegistration}
              />

              {/* 2. About the Event (Mission, History, Videos & Photos) */}
              <AboutSection
                activeSubTab="overview"
                onSelectSubTab={(sub) => {
                  setAboutSubTab(sub);
                  setCurrentTab('about');
                }}
              />

              {/* 3. Dynamic Gallery & Registration Form for Interested Participants */}
              <DynamicGallery
                title="Dynamic Festival Gallery"
                subtitle="Watch featured documentary footage and explore photo thumbnails from celebratory assemblies."
              />
              <RegistrationForm onNavigateStatusCheck={() => navigateTab('status-check')} />

              {/* 4. Several Cards for Thakurs showcasing profiles and specific contributions */}
              <ThakurCards />

              {/* 5. Thakur Birth Anniversary Celebration Feature & Learning More */}
              <ThakurAnniversarySection />

              {/* 6. Photo Gallery Showcasing Highlights from Past Commemorative Events */}
              <PastGatheringsGallery />

              {/* 7. Organizations Trusted By / In Association With Gallery */}
              <TrustedOrganizations />

              {/* 8. Full Width Map for the Venue: West Dangarkuthi, Dotma, Kokrajhar, Assam, India - 783347 */}
              <FullWidthMap />
            </>
          )}

          {/* Dedicated About Page (Overview, Committee Members & Organising Teams) */}
          {currentTab === 'about' && (
            <div className="min-h-[80vh] py-6">
              <AboutSection
                activeSubTab={aboutSubTab}
                onSelectSubTab={setAboutSubTab}
                isStandalonePage={true}
              />
            </div>
          )}

          {/* Dedicated Events Page (Interactive Calendar, Timetable, Days, Downloadable Documents) */}
          {currentTab === 'events' && <EventsView />}

          {/* Dedicated Gallery Page (Feature Video/Image + Categorized Thumbnails + Lightbox) */}
          {currentTab === 'gallery' && (
            <div className="py-6">
              <DynamicGallery
                title="Official Media & Visual Archive"
                subtitle="Watch full festival video broadcasts, morning prayer recitals, and commemorative photo collections."
              />
              <PastGatheringsGallery />
            </div>
          )}

          {/* Dedicated Accommodation Page (Hotel & Ashram Niwas Contacts, Tariffs, Amenities, WhatsApp Booking) */}
          {currentTab === 'accommodation' && <AccommodationView />}

          {/* Dedicated Contact Page (Address, WhatsApp, Social Media, Detailed Map, Transit Guide: Airport, Railway, Landmarks) */}
          {currentTab === 'contact' && <ContactView />}

        </main>

        {/* Attendee Feedback Modal */}
        <FeedbackModal
          isOpen={feedbackOpen}
          onClose={() => setFeedbackOpen(false)}
        />

        {/* Footer with All Navigation Links, Social Media & Legal Pages */}
        <Footer
          onSelectTab={navigateTab}
          onSelectAboutSubTab={setAboutSubTab}
        />
      </div>
    </LanguageProvider>
    </ThemeProvider>
  );
}
