'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface SessionOption {
  id: string;
  title: string;
  desc: string;
  price: string;
  numericPrice: number;
}

const SESSIONS: SessionOption[] = [
  {
    id: 'free_intro',
    title: 'Free 15-min intro call',
    desc: "Say hello and check you're a good fit",
    price: 'Free',
    numericPrice: 0,
  },
  {
    id: '30min',
    title: '30-min video call',
    desc: 'Quick questions and a shortlist check',
    price: 'PKR 3,000',
    numericPrice: 3000,
  },
  {
    id: '60min',
    title: '60-min video call',
    desc: 'Full application walk-through',
    price: 'PKR 5,000',
    numericPrice: 5000,
  },
  {
    id: 'sop_review',
    title: 'SOP + CV review',
    desc: '2 rounds of written feedback in 5 days',
    price: 'PKR 9,000',
    numericPrice: 9000,
  },
];

interface TimeSlot {
  id: string;
  day: string;
  pktTime: string;
  subtext: string;
}

const TIME_SLOTS: TimeSlot[] = [
  { id: 't1', day: 'Mon 19 Oct', pktTime: '21:00 PKT', subtext: 'Under 36 hours away' },
  { id: 't2', day: 'Tue 20 Oct', pktTime: '20:00 PKT', subtext: '17:00 Berlin' },
  { id: 't3', day: 'Tue 20 Oct', pktTime: '21:00 PKT', subtext: '18:00 Berlin' },
  { id: 't4', day: 'Wed 21 Oct', pktTime: '21:00 PKT', subtext: '18:00 Berlin' },
  { id: 't5', day: 'Sat 24 Oct', pktTime: '15:00 PKT', subtext: '12:00 Berlin' },
  { id: 't6', day: 'Sun 25 Oct', pktTime: '16:00 PKT', subtext: '12:00 Berlin' },
];

export default function MentorProfilePage() {
  const router = useRouter();

  // Selected session (default is 60-min video call per Figma screenshot)
  const [selectedSessionId, setSelectedSessionId] = useState('60min');

  // Selected time slots (default has Tue 20 Oct and Wed 21 Oct selected per Figma screenshot)
  const [selectedSlotIds, setSelectedSlotIds] = useState<string[]>(['t3', 't4']);

  // Modal pop-up state
  const [showRequestModal, setShowRequestModal] = useState(false);

  const selectedSession = SESSIONS.find((s) => s.id === selectedSessionId) || SESSIONS[2];

  const handleToggleSlot = (slotId: string) => {
    if (selectedSlotIds.includes(slotId)) {
      setSelectedSlotIds(selectedSlotIds.filter((id) => id !== slotId));
    } else {
      if (selectedSlotIds.length < 3) {
        setSelectedSlotIds([...selectedSlotIds, slotId]);
      }
    }
  };

  const selectedSlotsText = selectedSlotIds
    .map((id) => {
      const slot = TIME_SLOTS.find((s) => s.id === id);
      return slot ? `${slot.day}, ${slot.pktTime}` : '';
    })
    .filter(Boolean)
    .join(' · ');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 text-start">
          <Link href="/mentors" className="hover:underline hover:text-emerald-700 dark:hover:text-emerald-400">
            Find mentors
          </Link>
          <span>/</span>
          <Link href="/mentors" className="hover:underline hover:text-emerald-700 dark:hover:text-emerald-400">
            Germany
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-800 dark:text-white">Ayesha M.</span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column (Main Profile) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Header Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs text-start">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-xl font-bold text-emerald-800 dark:text-emerald-300">
                  AM
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      Ayesha M.
                    </h1>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    MSc Computer Science · TU Berlin · 2nd year
                  </p>

                  {/* Badges */}
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                      ✓ Verified
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                      ★ Top mentor
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                      <span>🇵🇰</span>
                      <span className="text-slate-400 text-[10px]">⤳</span>
                      <span>🇩🇪</span>
                      <span>Germany</span>
                    </span>
                  </div>

                  {/* 3 Stats Columns */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Rating
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-slate-200">
                        <span className="text-amber-500">★ 4.9</span>
                        <span className="text-slate-400 font-normal">from 27 reviews</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Languages
                      </div>
                      <div className="mt-1 text-xs font-semibold text-slate-800 dark:text-slate-200">
                        Urdu, English, German (B1)
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Replies
                      </div>
                      <div className="mt-1 text-xs font-semibold text-slate-800 dark:text-slate-200">
                        Usually within a day
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Ayesha Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs text-start">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2.5">
                About Ayesha
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                I did my BS at FAST Lahore and applied to German universities through uni-assist in 2024. I got offers from TU Berlin and Saarland. I can help you build a realistic shortlist, check your documents against each programme&apos;s requirements, and plan your blocked account, visa appointment and first month in Berlin.
              </p>

              {/* Tag pills */}
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  'Programme shortlist',
                  'uni-assist',
                  'SOP and CV',
                  'Blocked account',
                  'Visa appointment',
                  'Housing in Berlin',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* How booking works Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs text-start">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                How booking works
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    step: '1',
                    title: 'Send a request',
                    desc: 'Pick a session and suggest up to 3 times.',
                  },
                  {
                    step: '2',
                    title: 'Pay when accepted',
                    desc: "We hold the money. The mentor isn't paid yet.",
                  },
                  {
                    step: '3',
                    title: 'Meet on video',
                    desc: 'Join from your booking page. Audio-only works too.',
                  },
                  {
                    step: '4',
                    title: 'Confirm and review',
                    desc: 'Then we release the payment to the mentor.',
                  },
                ].map((s) => (
                  <div key={s.step} className="space-y-1.5">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 font-bold text-emerald-800 dark:text-emerald-300 text-xs">
                      {s.step}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      {s.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs text-start">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Reviews</h2>
                <span className="text-xs text-slate-400 font-medium">
                  27 reviews from booked sessions
                </span>
              </div>

              <div className="space-y-4">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">Sana, Lahore</span>
                    <span className="text-slate-400">60-min video call · September 2026</span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    She went through my shortlist programme by programme and told me which ones I didn&apos;t meet the requirements for. Saved me two application fees.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">Ali, Islamabad</span>
                    <span className="text-slate-400">SOP + CV review · August 2026</span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Clear written feedback on both drafts and quick replies in chat.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Book a session (Figma Screen 5) */}
          <aside className="lg:col-span-5">
            <div className="sticky top-20 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm text-start">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Book a session
              </h2>

              {/* Sessions Selector */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Session
                </label>
                <div className="space-y-2">
                  {SESSIONS.map((session) => {
                    const isSelected = selectedSessionId === session.id;
                    return (
                      <label
                        key={session.id}
                        onClick={() => setSelectedSessionId(session.id)}
                        className={`flex cursor-pointer items-start justify-between rounded-xl border p-3 transition ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/50 dark:border-emerald-500 dark:bg-emerald-950/40'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <input
                            type="radio"
                            name="session"
                            checked={isSelected}
                            onChange={() => setSelectedSessionId(session.id)}
                            className="mt-0.5 accent-emerald-600"
                          />
                          <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">
                              {session.title}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              {session.desc}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white shrink-0">
                          {session.price}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Suggest up to 3 times */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Suggest up to 3 times
                  </h3>
                  <span className="text-[11px] text-slate-400">Pakistan time</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedSlotIds.includes(slot.id);
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => handleToggleSlot(slot.id)}
                        className={`rounded-xl border p-2.5 text-left transition ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/60 dark:border-emerald-500 dark:bg-emerald-950/50'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{slot.day}</div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                          {slot.pktTime}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{slot.subtext}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price summary row */}
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-xs">
                <span className="text-slate-600 dark:text-slate-400 font-medium">
                  {selectedSession.title}
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {selectedSession.price}
                </span>
              </div>

              {/* Request booking button */}
              <button
                type="button"
                onClick={() => setShowRequestModal(true)}
                className="mt-4 w-full rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 py-3 text-xs font-bold text-white shadow-xs transition"
              >
                Request booking · {selectedSlotIds.length} {selectedSlotIds.length === 1 ? 'time' : 'times'} →
              </button>

              <p className="mt-2 text-center text-[11px] text-slate-400">
                You pay only after Ayesha accepts. A 5% service fee is added at checkout.
              </p>

              {/* Ask a Senior in writing link (Screen 7 shortcut) */}
              <div className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-3 text-center">
                <Link
                  href="/ask-senior"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  <span>💬</span>
                  <span>Just one question? Ask Ayesha in writing for PKR 1,200</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* POP-UP MODAL: Request sent to Ayesha (Figma Screen 6) */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-2xl text-start">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowRequestModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm p-1"
            >
              ✕
            </button>

            {/* Paper plane icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-xl">
              ✈️
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              Request sent to Ayesha
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              She usually replies within a day. We&apos;ll email you when she picks a time.
            </p>

            {/* Summary Box */}
            <div className="mt-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 p-3.5 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                <span>{selectedSession.title}</span>
                <span>{selectedSession.price}</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Your times: {selectedSlotsText || 'Tue 20 Oct, 21:00 PKT · Wed 21 Oct, 21:00 PKT'}
              </p>
            </div>

            {/* Bullets */}
            <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Nothing to pay yet. You pay after she accepts.</span>
              </div>
              <div className="flex items-start gap-2">
                <span>⏱️</span>
                <span>
                  If she doesn&apos;t reply in 48 hours, the request closes and you can pick another mentor.
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => router.push('/messages/ayesha-m')}
                className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:underline px-2 py-1"
              >
                Message Ayesha
              </button>
              <button
                type="button"
                onClick={() => router.push('/booking/confirmed')}
                className="rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-xs transition"
              >
                View my bookings
              </button>
            </div>

            {/* Prototype Skip Shortcut to Checkout */}
            <div className="mt-5 border-t border-slate-100 dark:border-slate-800 pt-3 text-center">
              <Link
                href="/payment"
                className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                Prototype: skip ahead to &quot;Ayesha accepted&quot; →
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
