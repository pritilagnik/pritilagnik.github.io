import React, { useState, useEffect } from 'react';
import {
  Megaphone,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { NoticeItem } from '../types';
import { subscribeToNotices } from '../services/noticeService';

interface NoticeTickerProps {
  onOpenNotice: (notice: NoticeItem) => void;
  onViewAllNotices: () => void;
}

export const NoticeTicker: React.FC<NoticeTickerProps> = ({
  onOpenNotice,
  onViewAllNotices,
}) => {
  const [tickerNotices, setTickerNotices] = useState<NoticeItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToNotices((allNotices) => {
      const activeTicker = allNotices.filter((n) => n.isActive && n.showInTicker);
      setTickerNotices(activeTicker);
      setActiveIndex(0);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (tickerNotices.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tickerNotices.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [tickerNotices.length, isPaused]);

  const currentNotice = tickerNotices[activeIndex] || null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tickerNotices.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + tickerNotices.length) % tickerNotices.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tickerNotices.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % tickerNotices.length);
  };

  if (!currentNotice) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-4">
        <div
          onClick={onViewAllNotices}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onViewAllNotices();
            }
          }}
          className="group cursor-pointer backdrop-blur-md bg-stone-900/75 dark:bg-stone-950/85 hover:bg-stone-900/90 border border-amber-500/30 hover:border-amber-400/60 rounded-xl px-4 py-2.5 shadow-lg flex items-center justify-between gap-3 transition-all"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold uppercase tracking-wider shrink-0">
              <Megaphone className="w-3.5 h-3.5 text-amber-400" />
              <span>Notices</span>
            </span>
            <p className="text-xs sm:text-sm text-stone-200 truncate">
              Official Notices &amp; Announcements Board · Click to view Secretariat updates
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 group-hover:text-amber-300 shrink-0">
            <span>All Notices</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    );
  }

  const isUrgent = currentNotice.priority === 'Urgent';

  return (
    <div
      className="w-full max-w-4xl mx-auto mt-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="backdrop-blur-md bg-stone-900/85 dark:bg-stone-950/90 border border-amber-500/40 rounded-xl px-3 sm:px-4 py-2.5 shadow-xl flex items-center justify-between gap-2 sm:gap-3 transition-colors">
        {/* Left badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
              isUrgent
                ? 'bg-red-500/20 text-red-300 border-red-400/40 animate-pulse'
                : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
            }`}
          >
            {isUrgent ? (
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <Megaphone className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span className="hidden xs:inline">Latest Notice</span>
          </span>
        </div>

        {/* Clickable active announcement */}
        <button
          type="button"
          onClick={() => onOpenNotice(currentNotice)}
          className="flex-1 min-w-0 text-left group flex items-center gap-2 py-0.5 focus:outline-none"
          title="Click to read full notice & announcement"
        >
          <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-800 text-amber-300 border border-stone-700 shrink-0">
            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            <span>{currentNotice.category}</span>
          </span>

          <span className="text-xs sm:text-sm font-medium text-white group-hover:text-amber-300 truncate transition-colors underline-offset-4 group-hover:underline">
            {currentNotice.title}
          </span>

          <span className="hidden sm:inline text-[11px] text-amber-400/90 font-semibold shrink-0 group-hover:translate-x-0.5 transition-transform">
            Read &rarr;
          </span>
        </button>

        {/* Controls: Prev/Next + All Notices */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {tickerNotices.length > 1 && (
            <div className="flex items-center gap-0.5 bg-stone-800/80 rounded-lg p-0.5 border border-stone-700/70">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous announcement"
                className="p-1 rounded-md text-stone-300 hover:text-amber-300 hover:bg-stone-700/70 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono text-stone-400 px-1 tabular-nums">
                {activeIndex + 1}/{tickerNotices.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next announcement"
                className="p-1 rounded-md text-stone-300 hover:text-amber-300 hover:bg-stone-700/70 transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={onViewAllNotices}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-[11px] font-semibold transition-colors"
          >
            <span>All Notices</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
