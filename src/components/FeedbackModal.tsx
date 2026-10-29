import React, { useState } from 'react';
import {
  X,
  Star,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Heart
} from 'lucide-react';
import { FeedbackRecord } from '../types';
import { saveFeedback, getRegistrationById } from '../services/registrationService';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [participantId, setParticipantId] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [phone, setPhone] = useState('');
  const [overallRating, setOverallRating] = useState(5);
  const [prasadamRating, setPrasadamRating] = useState(5);
  const [accommodationRating, setAccommodationRating] = useState(5);
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [verifyingId, setVerifyingId] = useState(false);

  if (!isOpen) return null;

  const handleVerifyId = async () => {
    if (!participantId.trim()) return;
    setVerifyingId(true);
    setErrorMsg('');
    try {
      const reg = await getRegistrationById(participantId.trim());
      if (reg) {
        setParticipantName(reg.fullName);
        setPhone(reg.phone);
      } else {
        setErrorMsg('Participant ID not found in registry. You can still submit feedback with your name.');
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setVerifyingId(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!participantName.trim()) {
      setErrorMsg('Please enter your Name or verify via Registration ID.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const feedbackRecord: FeedbackRecord = {
      id: `FB-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      participantId: participantId.trim() || undefined,
      participantName: participantName.trim(),
      phone: phone.trim(),
      overallRating,
      prasadamRating,
      accommodationRating,
      comments: comments.trim(),
      submittedAt: new Date().toISOString()
    };

    try {
      await saveFeedback(feedbackRecord);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setParticipantId('');
        setParticipantName('');
        setPhone('');
        setComments('');
      }, 2500);
    } catch (err) {
      setErrorMsg('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-300 dark:border-stone-800 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif-cinzel text-stone-900 dark:text-stone-100">
              Attendee Feedback & Seva Ratings
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Priti-Lagnik Maha Mahotsav 2026 · West Dangarkuthi, Dotma
            </p>
          </div>
        </div>

        {success ? (
          <div className="py-10 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Dhanyavad! Feedback Received
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 max-w-sm mx-auto">
              Your valuable suggestions have been recorded for the Reception Committee to further elevate our seva.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Participant ID Verification */}
            <div className="p-3.5 bg-amber-50/70 dark:bg-stone-800/60 rounded-2xl border border-amber-200 dark:border-stone-700 space-y-2">
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                Registered Participant ID (Optional):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={participantId}
                  onChange={(e) => setParticipantId(e.target.value)}
                  placeholder="e.g. PLM26-839201"
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono"
                />
                <button
                  type="button"
                  onClick={handleVerifyId}
                  disabled={verifyingId || !participantId.trim()}
                  className="px-3 py-2 text-xs font-semibold rounded-xl bg-amber-600 hover:bg-amber-500 text-white disabled:bg-stone-400 transition-colors"
                >
                  {verifyingId ? 'Verifying...' : 'Verify'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Mobile Number"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>

            {/* Ratings */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-700 dark:text-stone-300">
                  Overall Event Organization:
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setOverallRating(star)}
                      className={`p-1 transition-colors ${
                        star <= overallRating ? 'text-amber-500 fill-amber-500' : 'text-stone-300 dark:text-stone-600'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-700 dark:text-stone-300">
                  Anandabazar Prasadam & Cleanliness:
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setPrasadamRating(star)}
                      className={`p-1 transition-colors ${
                        star <= prasadamRating ? 'text-amber-500 fill-amber-500' : 'text-stone-300 dark:text-stone-600'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-700 dark:text-stone-300">
                  Accommodation & Reception Seva:
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setAccommodationRating(star)}
                      className={`p-1 transition-colors ${
                        star <= accommodationRating ? 'text-amber-500 fill-amber-500' : 'text-stone-300 dark:text-stone-600'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Suggestions, Experiences & Spiritual Remarks:
              </label>
              <textarea
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share your thoughts, suggestions for future assemblies, or volunteer appreciation..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:bg-stone-400 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
