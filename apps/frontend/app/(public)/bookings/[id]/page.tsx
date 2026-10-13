'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/StudentSidebar';
import ThemeToggle from '@/components/ThemeToggle';

export default function BookingDetailsPage() {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [rescheduleSent, setRescheduleSent] = useState(false);

  // Checkbox checklist states
  const [tasks, setTasks] = useState({
    docSent: true,
    questionsWritten: false,
    cameraTested: false,
  });

  // Reschedule slots selection
  const [rescheduleSlots, setRescheduleSlots] = useState<string[]>(['s2', 's3']);
  const [rescheduleMessage, setRescheduleMessage] = useState(
    'Navigating my university exam schedule - hoping Thursday or Friday works! Thank you so much.'
  );
  const [cancelReason, setCancelReason] = useState('My plans changed');

  const toggleSlot = (id: string) => {
    if (rescheduleSlots.includes(id)) {
      setRescheduleSlots(rescheduleSlots.filter((s) => s !== id));
    } else {
      if (rescheduleSlots.length < 3) setRescheduleSlots([...rescheduleSlots, id]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      <StudentSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Link
              href="/bookings"
              className="font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              My bookings
            </Link>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="font-bold text-slate-900 dark:text-white">Booking #4812</span>
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

        {/* Booking Details Main (Screen 3) */}
        <main className="flex-1 p-6 sm:p-8 max-w-6xl w-full mx-auto space-y-6 text-start">
          {/* Back link */}
          <Link
            href="/bookings"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400"
          >
            <span>←</span>
            <span>My bookings</span>
          </Link>

          {/* Cancellation Notice Banner if Cancelled */}
          {isCancelled && (
            <div className="rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 p-4 text-xs text-rose-800 dark:text-rose-300 font-semibold">
              ⚠️ This booking has been cancelled. A 100% refund of PKR 5,250 has been issued to your original payment card.
            </div>
          )}

          {/* Reschedule Confirmation Banner */}
          {rescheduleSent && (
            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 p-4 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
              ✓ Reschedule request sent to Ayesha M. with 2 proposed slots. Your current slot remains reserved until she confirms.
            </div>
          )}

          {/* Booking Title & Stepper Header Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  BOOKING ID #4812
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                  60-min video call with Ayesha M.
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Tue 20 Oct · 21:00 - 22:00 PKT (18:00 Berlin)
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 self-start">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                <span>Confirmed (paid)</span>
              </span>
            </div>

            {/* Stepper (Requested -> Accepted -> Paid & held -> Meet on video -> Completed) */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-[10px]">✓</span>
                  <span className="hidden sm:inline">Requested</span>
                </div>
                <span className="text-slate-300 dark:text-slate-700">──</span>
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-[10px]">✓</span>
                  <span className="hidden sm:inline">Accepted</span>
                </div>
                <span className="text-slate-300 dark:text-slate-700">──</span>
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-[10px]">✓</span>
                  <span className="hidden sm:inline">Paid &amp; held</span>
                </div>
                <span className="text-slate-300 dark:text-slate-700">──</span>
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white text-[10px]">4</span>
                  <span className="hidden sm:inline">Meet on video</span>
                </div>
                <span className="text-slate-300 dark:text-slate-700">──</span>
                <div className="flex items-center gap-2 text-slate-400 font-medium">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-[10px]">5</span>
                  <span className="hidden sm:inline">Completed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Prep Checklist & Activity */}
            <div className="lg:col-span-7 space-y-6">
              {/* Before your session checklist */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Before your session
                </h2>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tasks.docSent}
                      onChange={(e) => setTasks({ ...tasks, docSent: e.target.checked })}
                      className="mt-0.5 h-4 w-4 rounded accent-emerald-600"
                    />
                    <span className="text-xs text-slate-700 dark:text-slate-300">
                      Send Ayesha your CV/SOP (done in Messages)
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tasks.questionsWritten}
                      onChange={(e) => setTasks({ ...tasks, questionsWritten: e.target.checked })}
                      className="mt-0.5 h-4 w-4 rounded accent-emerald-600"
                    />
                    <span className="text-xs text-slate-700 dark:text-slate-300">
                      Write down your 3 most important questions
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tasks.cameraTested}
                      onChange={(e) => setTasks({ ...tasks, cameraTested: e.target.checked })}
                      className="mt-0.5 h-4 w-4 rounded accent-emerald-600"
                    />
                    <span className="text-xs text-slate-700 dark:text-slate-300">
                      Test your camera and mic in the lobby
                    </span>
                  </label>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    className="rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-xs transition"
                  >
                    Go to the lobby
                  </button>

                  <Link
                    href="/messages/ayesha-m"
                    className="rounded-xl border border-slate-200 dark:border-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    Message Ayesha
                  </Link>

                  <button
                    type="button"
                    className="rounded-xl border border-slate-200 dark:border-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    Add to calendar
                  </button>
                </div>
              </div>

              {/* Activity Timeline Card */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Activity
                </h2>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-start gap-3">
                    <span className="text-[11px] text-slate-400 shrink-0 w-28">Tue 20 Oct, 20:14</span>
                    <span className="text-slate-700 dark:text-slate-300">
                      Payment of PKR 5,250 received and held in escrow
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-[11px] text-slate-400 shrink-0 w-28">Sun 18 Oct, 19:40</span>
                    <span className="text-slate-700 dark:text-slate-300">
                      Ayesha accepted slot Tue 20 Oct, 21:00 PKT
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-[11px] text-slate-400 shrink-0 w-28">Sat 17 Oct, 22:05</span>
                    <span className="text-slate-700 dark:text-slate-300">
                      You requested a 60-min video call and suggested 3 times
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Pricing & Manage Actions */}
            <aside className="lg:col-span-5 space-y-4">
              {/* Order Summary */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                  Summary
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">60-min video call</span>
                    <span className="font-semibold text-slate-900 dark:text-white">PKR 5,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Service fee (5%)</span>
                    <span className="font-semibold text-slate-900 dark:text-white">PKR 250</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-2.5 text-sm font-bold">
                    <span>Total</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">PKR 5,250</span>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                  🔒 We hold your payment until you confirm the session. If the mentor doesn&apos;t show, you get a full refund.
                </div>
              </div>

              {/* Need to change something? (Reschedule & Cancel triggers) */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-3.5">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  Need to change something?
                </h3>

                <button
                  type="button"
                  onClick={() => setShowRescheduleModal(true)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 py-2.5 px-3 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  Ask to reschedule
                </button>

                <button
                  type="button"
                  onClick={() => setShowCancelModal(true)}
                  className="w-full text-center text-xs font-semibold text-rose-600 hover:underline pt-1"
                >
                  Cancel booking
                </button>

                <p className="text-[11px] text-slate-400 text-center leading-snug">
                  Free cancellation until Mon 19 Oct, 21:00 PKT.
                </p>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {/* MODAL 1: CANCEL BOOKING POP-UP (Screen 4) */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-2xl text-start">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Cancel this booking?
            </h3>

            {/* Refund Highlight Box */}
            <div className="mt-4 rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/80 dark:bg-emerald-950/40 p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  You get back:
                </span>
                <span className="text-sm font-extrabold text-emerald-900 dark:text-emerald-300">
                  PKR 5,250
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 dark:text-emerald-400 leading-relaxed">
                As per policy, cancelling earlier than 24 hours before the session receives a 100% refund.
              </p>
            </div>

            {/* Reason selector */}
            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Reason (optional, shared with Ayesha)
              </label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                <option value="My plans changed">My plans changed</option>
                <option value="Time no longer works">Time no longer works</option>
                <option value="Found another mentor">Found another mentor</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <p className="mt-3 text-[11px] text-slate-400">
              Refunds return to your original card in 2-5 working days.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Keep booking
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCancelled(true);
                  setShowCancelModal(false);
                }}
                className="rounded-xl bg-rose-600 hover:bg-rose-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition"
              >
                Cancel and refund PKR 5,250
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: RESCHEDULE POP-UP (Screen 5) */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-2xl text-start">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Ask to reschedule
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Suggest up to 3 new times. Your current slot remains held until Ayesha accepts.
            </p>

            {/* Slots Grid */}
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {[
                { id: 's1', day: 'Thu 22 Oct', time: '20:00 PKT', sub: '17:00 Berlin' },
                { id: 's2', day: 'Thu 22 Oct', time: '21:00 PKT', sub: '18:00 Berlin' },
                { id: 's3', day: 'Fri 23 Oct', time: '21:00 PKT', sub: '18:00 Berlin' },
                { id: 's4', day: 'Sat 24 Oct', time: '16:00 PKT', sub: '13:00 Berlin' },
              ].map((slot) => {
                const isSelected = rescheduleSlots.includes(slot.id);
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => toggleSlot(slot.id)}
                    className={`rounded-xl border p-3 text-left transition ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/60 dark:border-emerald-500 dark:bg-emerald-950/50'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{slot.day}</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                      {slot.time}
                    </div>
                    <div className="text-[10px] text-slate-400">{slot.sub}</div>
                  </button>
                );
              })}
            </div>

            {/* Optional message textarea */}
            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Message to Ayesha (optional)
              </label>
              <textarea
                rows={3}
                value={rescheduleMessage}
                onChange={(e) => setRescheduleMessage(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowRescheduleModal(false)}
                className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setRescheduleSent(true);
                  setShowRescheduleModal(false);
                }}
                className="rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 px-5 py-2 text-xs font-bold text-white shadow-xs transition"
              >
                Send {rescheduleSlots.length} new times
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
