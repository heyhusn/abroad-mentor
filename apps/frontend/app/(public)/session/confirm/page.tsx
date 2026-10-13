'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StudentSidebar from '@/components/StudentSidebar';
import ThemeToggle from '@/components/ThemeToggle';

export default function ConfirmRateDisputePage() {
  const router = useRouter();
  const [tab, setTab] = useState<'well' | 'dispute'>('well');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Quick feedback tags
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Clear answers',
    'Useful resources',
    'On time',
  ]);

  const [reviewText, setReviewText] = useState('');
  const [disputeReason, setDisputeReason] = useState('mentor_absent');
  const [disputeDetails, setDisputeDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const availableTags = [
    'Clear answers',
    'Useful resources',
    'On time',
    'Friendly',
    'Honest about my chances',
    'Helped with SOP',
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleConfirmAndRelease = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push('/bookings');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      <StudentSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Link
              href="/bookings"
              className="font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              My bookings
            </Link>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="font-bold text-slate-900 dark:text-white">Confirm your session</span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                SK
              </span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 sm:p-10 max-w-5xl w-full mx-auto space-y-8 text-start">
          <div>
            <Link
              href="/bookings"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 mb-3"
            >
              ← My bookings
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              How was your session with Ayesha?
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              60-min video call · Today, 21:00 - 21:48 PKT
            </p>
          </div>

          {/* Submitted notification toast */}
          {submitted && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-3">
              <span className="text-lg">🎉</span>
              <div>
                <p className="font-bold">Thank you! Your feedback has been submitted.</p>
                <p className="text-[11px] mt-0.5">Session confirmed and payment released from escrow to Ayesha.</p>
              </div>
            </div>
          )}

          {/* Two Columns: Review/Dispute Form & Escrow Payment Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Review Form or Dispute Form */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
              {/* Tab Selector: It went well vs Something went wrong */}
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <button
                  type="button"
                  onClick={() => setTab('well')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    tab === 'well'
                      ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>✨</span>
                  <span>It went well</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTab('dispute')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    tab === 'dispute'
                      ? 'bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>⚠️</span>
                  <span>Something went wrong</span>
                </button>
              </div>

              {/* TAB 1: IT WENT WELL (RATING & REVIEW) */}
              {tab === 'well' && (
                <form onSubmit={handleConfirmAndRelease} className="space-y-6">
                  {/* Star Rating */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                      Your rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setRating(star)}
                          className="text-2xl sm:text-3xl transition-transform hover:scale-110 focus:outline-hidden"
                        >
                          {(hoverRating !== null ? star <= hoverRating : star <= rating) ? (
                            <span className="text-amber-400">★</span>
                          ) : (
                            <span className="text-slate-200 dark:text-slate-700">★</span>
                          )}
                        </button>
                      ))}
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-2">
                        {rating} of 5 · Excellent
                      </span>
                    </div>
                  </div>

                  {/* Feedback Chips */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                      What went well?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                              isSelected
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent'
                            }`}
                          >
                            {isSelected && <span className="mr-1">✓</span>}
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Written Review */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                      Review <span className="font-normal text-slate-400">(Optional · shown on Ayesha’s public profile)</span>
                    </label>
                    <textarea
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="What helped you most? e.g. Clear advice on TU Berlin requirements and how to organize the blocked account..."
                      className="w-full text-xs rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-4 text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-600 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
                  >
                    Confirm session and release payment
                  </button>
                </form>
              )}

              {/* TAB 2: DISPUTE (SOMETHING WENT WRONG) */}
              {tab === 'dispute' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                    <p className="font-bold">🛡️ Safepay Escrow Guarantee</p>
                    <p className="mt-1">
                      Your payment of PKR 5,250 is currently safe in escrow. If the mentor did not show up or there was a major issue, funds will NOT be released until reviewed.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                      What was the issue?
                    </label>
                    <select
                      value={disputeReason}
                      onChange={(e) => setDisputeReason(e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="mentor_absent">Mentor did not show up</option>
                      <option value="left_early">Mentor left earlier than scheduled time</option>
                      <option value="tech_issue">Persistent technical or audio/video issues</option>
                      <option value="unprepared">Mentor was unprepared / not relevant to my study goals</option>
                      <option value="other">Other issue</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                      Additional details
                    </label>
                    <textarea
                      rows={4}
                      value={disputeDetails}
                      onChange={(e) => setDisputeDetails(e.target.value)}
                      placeholder="Please explain what happened so our support team can verify the session recording/logs..."
                      className="w-full text-xs rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-4 text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:ring-2 focus:ring-amber-500 transition"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        alert('Dispute raised. Payment is held in escrow.');
                        router.push('/bookings');
                      }}
                      className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition"
                    >
                      Submit dispute &amp; freeze payment
                    </button>
                    <button
                      type="button"
                      onClick={() => setTab('well')}
                      className="text-xs text-slate-500 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Escrow & Attendance Card */}
            <div className="lg:col-span-4 space-y-5">
              {/* Payment Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Payment</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                    In escrow
                  </span>
                </div>

                <div className="flex items-baseline justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="text-xs text-slate-600 dark:text-slate-400">You paid</span>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white">PKR 5,250</span>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  When you confirm, we release the payment to Ayesha. If you do nothing, the session confirms automatically in 72 hours.
                </p>
              </div>

              {/* Attendance Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-3">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Attendance</span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">You joined</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">20:59 - 21:48</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Ayesha joined</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">21:01 - 21:48</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-2 font-bold">
                    <span className="text-slate-800 dark:text-slate-200">Total duration</span>
                    <span className="text-emerald-700 dark:text-emerald-400">47 mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
