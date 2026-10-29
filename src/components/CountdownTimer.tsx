import React, { useState, useEffect } from 'react';
import { Calendar, Bell, Sparkles } from 'lucide-react';
import { EVENT_DETAILS } from '../data/mahotsavData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const [reminderSaved, setReminderSaved] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(EVENT_DETAILS.targetIsoDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCalendar = () => {
    // Generate .ics calendar file for downloading
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Priti-Lagnik Maha Mahotsav 2026//EN',
      'BEGIN:VEVENT',
      'UID:pritilagnik-2026-dotma@mahotsav.org',
      'DTSTAMP:20260101T000000Z',
      'DTSTART:20261220T003000Z',
      'DTEND:20261221T163000Z',
      'SUMMARY:Priti-Lagnik Maha Mahotsav 2026',
      'DESCRIPTION:Grand Spiritual and Cultural Confluence at West Dangarkuthi, Dotma, Kokrajhar, Assam, India - 783347',
      'LOCATION:West Dangarkuthi, Dotma, Kokrajhar, Assam 783347',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Priti_Lagnik_Maha_Mahotsav_2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setReminderSaved(true);
    setTimeout(() => setReminderSaved(false), 4000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto backdrop-blur-md bg-stone-900/80 dark:bg-stone-950/85 text-white rounded-2xl border border-amber-500/30 p-5 md:p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-amber-500/20 pb-4 mb-5">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Official Event Countdown</span>
          </div>
          <h3 className="text-lg md:text-xl font-serif-cinzel font-semibold text-stone-100 mt-1">
            Opening Auspicious Dawn · November 18, 2026
          </h3>
        </div>

        <button
          onClick={handleAddToCalendar}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors shadow-md whitespace-nowrap active:scale-95"
          title="Download calendar event file (.ics)"
        >
          {reminderSaved ? (
            <>
              <Bell className="w-4 h-4 text-stone-950" />
              <span>Calendar Event Saved!</span>
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4 text-stone-950" />
              <span>Add to Calendar (.ics)</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 md:gap-4 text-center">
        <div className="flex flex-col items-center justify-center p-3 md:p-4 rounded-xl bg-stone-800/80 border border-stone-700/60 shadow-inner">
          <span className="text-2xl md:text-4xl lg:text-5xl font-bold font-mono tabular-nums text-amber-400">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-[11px] md:text-xs font-medium uppercase tracking-wider text-stone-400 mt-1">
            Days
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-3 md:p-4 rounded-xl bg-stone-800/80 border border-stone-700/60 shadow-inner">
          <span className="text-2xl md:text-4xl lg:text-5xl font-bold font-mono tabular-nums text-amber-400">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-[11px] md:text-xs font-medium uppercase tracking-wider text-stone-400 mt-1">
            Hours
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-3 md:p-4 rounded-xl bg-stone-800/80 border border-stone-700/60 shadow-inner">
          <span className="text-2xl md:text-4xl lg:text-5xl font-bold font-mono tabular-nums text-amber-400">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-[11px] md:text-xs font-medium uppercase tracking-wider text-stone-400 mt-1">
            Minutes
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-3 md:p-4 rounded-xl bg-stone-800/80 border border-stone-700/60 shadow-inner">
          <span className="text-2xl md:text-4xl lg:text-5xl font-bold font-mono tabular-nums text-amber-300">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-[11px] md:text-xs font-medium uppercase tracking-wider text-stone-400 mt-1">
            Seconds
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-2">
        <span className="text-stone-300">
          📍 Dotma, Kokrajhar, Assam, India - 783347
        </span>
        <span className="text-amber-400/90 font-medium">
          5 Days of Universal Prayer, Satsang & Maha Annadan
        </span>
      </div>
    </div>
  );
};
