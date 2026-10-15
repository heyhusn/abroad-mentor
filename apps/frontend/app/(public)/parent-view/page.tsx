'use client';

import React from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function ParentViewPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* Read-Only Sidebar */}
      <aside className="w-60 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] flex flex-col justify-between min-h-screen text-start p-4">
        <div>
          <div className="flex items-center gap-2.5 mb-6">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-700 text-white font-bold text-xs">
              M
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              Study Abroad Mentor
            </span>
          </div>

          <div className="space-y-1 text-xs font-semibold">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold flex items-center gap-2">
              <span>👤</span>
              <span>Sara's activity</span>
            </div>
            <Link
              href="/settings"
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 block"
            >
              <span>⚙️</span>
              <span>Settings</span>
            </Link>
          </div>
        </div>

        {/* Parent Profile Badge */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">
            RK
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold truncate">Rashid K.</p>
            <p className="text-[10px] text-slate-400">Parent · read-only</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white">
            Parent view
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-10 max-w-5xl w-full mx-auto space-y-6 text-start">
          {/* Read-only Access Disclaimer */}
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-3">
            <span className="text-base">ℹ️</span>
            <div>
              <p className="font-bold">Read-only access, chosen by Sara</p>
              <p className="text-[11px] text-blue-800 dark:text-blue-300 mt-0.5">
                You can see Sara's bookings, payments and receipts. Her messages with mentors stay private. Sara can change this anytime.
              </p>
            </div>
          </div>

          {/* Student Profile Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white font-bold text-base">
                SK
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">Sara Khan</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Masters in Computer Science · Germany · Autumn 2027
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert('Sending prompt to Sara to book next session')}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition"
            >
              Remind Sara to book
            </button>
          </div>

          {/* Next Session Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Next session
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                ✓ Paid and held
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                AM
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Ayesha M. · TU Berlin · verified mentor
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  60-min video call · Today, 21:00 PKT · PKR 5,250 held in secure Safepay escrow
                </p>
              </div>
            </div>

            {/* Stepper Preview */}
            <div className="grid grid-cols-4 gap-2 pt-2 text-center text-[10px] font-bold">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">Requested</div>
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">Accepted</div>
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300">Paid &amp; Held</div>
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400">Session, review</div>
            </div>
          </div>

          {/* Two Columns: Bookings & Payments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bookings summary */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Bookings
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white">Usman K. · Scholarship essay review</p>
                    <p className="text-[11px] text-slate-400">Sat 24 Oct · PKR 4,200</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                    Waiting for payment
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-2">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white">Hira S. · 30-min call</p>
                    <p className="text-[11px] text-slate-400">Sun 18 Oct · PKR 3,150</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                    Session done
                  </span>
                </div>
              </div>
            </div>

            {/* Payments & Receipts */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Payments
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Paid in total</span>
                  <span className="font-bold text-slate-900 dark:text-white">PKR 12,570</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Held in escrow right now</span>
                  <span className="font-bold text-emerald-700">PKR 5,250</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Refunded</span>
                  <span className="font-bold text-slate-600">PKR 3,150</span>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => alert('Downloading official tax receipts (PDF)')}
                    className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1.5"
                  >
                    <span>📥</span>
                    <span>Download receipts (PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
