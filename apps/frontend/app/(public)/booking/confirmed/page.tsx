'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BookingConfirmedPage() {
  const t = useTranslations('BookingConfirmed');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        {/* Main Success Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-10 shadow-sm text-center">
          {/* Green Checkmark Circle */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            {t('title')}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {t('subtitle')}
          </p>

          {/* Session Details Box */}
          <div className="mt-8 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/80 bg-emerald-50/60 dark:bg-emerald-950/40 p-5 text-start sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white font-bold text-sm">
                AM
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Mentor: Ayesha M.</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Tue 24 Oct · 20:00 PKT
                </p>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
                  45 min 1-on-1 video call (PKR 3,000 paid)
                </p>
              </div>
            </div>

            <button
              type="button"
              className="mt-3 sm:mt-0 rounded-lg border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 shadow-sm hover:bg-emerald-50"
            >
              📅 {t('addToCalendar')}
            </button>
          </div>

          {/* Join Call CTA Button */}
          <div className="mt-6">
            <button
              type="button"
              className="w-full sm:w-auto rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-8 py-3 text-sm font-bold text-white shadow-md transition"
            >
              📹 {t('joinButton')}
            </button>
            <p className="mt-2 text-[11px] text-slate-400">
              {t('joinNote')}
            </p>
          </div>

          {/* What Happens Next Card */}
          <div className="mt-10 border-t border-slate-100 dark:border-slate-800 pt-8 text-start">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
              {t('checklistTitle')}
            </h2>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-xs">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 font-bold text-emerald-800 dark:text-emerald-300 text-[10px]">
                  1
                </span>
                <span className="text-slate-600 dark:text-slate-300 mt-0.5">{t('step1')}</span>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 font-bold text-emerald-800 dark:text-emerald-300 text-[10px]">
                  2
                </span>
                <span className="text-slate-600 dark:text-slate-300 mt-0.5">{t('step2')}</span>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 font-bold text-emerald-800 dark:text-emerald-300 text-[10px]">
                  3
                </span>
                <span className="text-slate-600 dark:text-slate-300 mt-0.5">{t('step3')}</span>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
            <Link
              href="/mentors"
              className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              ← {t('findMoreMentors')}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
