import React, { useEffect } from 'react';
import {
  X,
  Megaphone,
  Pin,
  Calendar,
  ExternalLink,
  ArrowRight,
  UserCheck,
  AlertTriangle
} from 'lucide-react';
import { NoticeItem } from '../types';

interface NoticeModalProps {
  notice: NoticeItem | null;
  onClose: () => void;
  onViewAllNotices?: () => void;
}

export const NoticeModal: React.FC<NoticeModalProps> = ({
  notice,
  onClose,
  onViewAllNotices,
}) => {
  useEffect(() => {
    if (!notice) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [notice, onClose]);

  if (!notice) return null;

  const formattedDate = (() => {
    try {
      return new Date(notice.updatedAt || notice.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return notice.createdAt;
    }
  })();

  const safeHref = (() => {
    const raw = (notice.linkUrl || '').trim();
    if (!raw) return '';
    if (raw.startsWith('https://') || raw.startsWith('http://') || raw.startsWith('/')) {
      return raw;
    }
    return '';
  })();

  const priorityBadgeClass =
    notice.priority === 'Urgent'
      ? 'bg-red-100 dark:bg-red-950/90 text-red-700 dark:text-red-300 border-red-300 dark:border-red-800'
      : notice.priority === 'Important'
      ? 'bg-amber-100 dark:bg-amber-950/90 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-amber-200 dark:border-stone-800 space-y-5 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/90 text-amber-900 dark:text-amber-300 border border-amber-300/60 dark:border-amber-800">
                <Megaphone className="w-3 h-3" />
                <span>{notice.category}</span>
              </span>

              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${priorityBadgeClass}`}>
                {notice.priority === 'Urgent' && <AlertTriangle className="w-3 h-3" />}
                <span>{notice.priority}</span>
              </span>

              {notice.isPinned && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/90 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800">
                  <Pin className="w-3 h-3" />
                  <span>Pinned</span>
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 leading-snug">
              {notice.title}
            </h3>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500 dark:text-stone-400">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Published: {formattedDate}</span>
              </span>
              {notice.createdBy && (
                <span className="inline-flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{notice.createdBy}</span>
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close notice"
            className="p-2 rounded-xl text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Full Notice Body */}
        <div className="max-h-[55vh] overflow-y-auto pr-1 text-sm sm:text-base text-stone-700 dark:text-stone-200 leading-relaxed whitespace-pre-wrap">
          {notice.content}
        </div>

        {/* Optional External Link */}
        {safeHref && (
          <div className="pt-2">
            <a
              href={safeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-800/70 text-xs font-bold hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Reference Link / Attachment</span>
            </a>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
          {onViewAllNotices ? (
            <button
              onClick={() => {
                onClose();
                onViewAllNotices();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-sm transition-colors"
            >
              <span>View All Notices & Announcements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
