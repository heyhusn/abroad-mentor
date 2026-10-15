'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LangToggle from '@/components/LangToggle';
import ThemeToggle from '@/components/ThemeToggle';

export default function MentorActionNeededPage() {
  const t = useTranslations('MentorDashboard');
  const [reuploaded, setReuploaded] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Top Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-700 text-white shadow-sm">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </span>
              <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
                Study Abroad Mentor
              </span>
            </Link>

            <span className="hidden text-xs text-slate-400 sm:inline-block">/</span>
            <span className="hidden text-xs font-medium text-slate-600 dark:text-slate-300 sm:inline-block">
              {t('appOverview')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/mentor/dashboard"
              className="rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              ← View Under Review (Screen 12)
            </Link>
            <ThemeToggle />
            <LangToggle />
            <div className="flex items-center gap-2 border-s border-slate-200 dark:border-slate-800 ps-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                AM
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Navigation Sidebar */}
          <aside className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">MAIN</p>
                <nav className="space-y-1">
                  <Link href="/mentor/dashboard" className="flex items-center gap-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 px-3 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    <span>📊</span>
                    <span>{t('appOverview')}</span>
                  </Link>
                  <Link href="#" className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <span>📅</span>
                    <span>{t('yourSessions')}</span>
                  </Link>
                </nav>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">EARNINGS</p>
                <nav className="space-y-1">
                  <Link href="#" className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <span>💳</span>
                    <span>{t('payouts')}</span>
                  </Link>
                  <Link href="/country-guides" className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <span>🌍</span>
                    <span>{t('countryGuides')}</span>
                  </Link>
                </nav>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">ACCOUNT</p>
                <nav className="space-y-1">
                  <Link href="#" className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <span>👤</span>
                    <span>{t('mentorProfile')}</span>
                  </Link>
                  <Link href="#" className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <span>⚙️</span>
                    <span>{t('settings')}</span>
                  </Link>
                </nav>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                <p className="text-xs font-bold text-slate-900 dark:text-white">{t('mentorName')}</p>
                <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">Action needed</p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-start">{t('greeting')}</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-start">{t('greetingSubtitle')}</p>
            </div>

            {/* SCREEN 13: ACTION NEEDED */}
            <div className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  {t('actionNeededTitle')}
                </h2>
                <span className="rounded-full bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-800 px-3 py-1 text-xs font-bold text-amber-900 dark:text-amber-300">
                  {t('actionNeededBadge')}
                </span>
              </div>

              {/* Warning notice box */}
              <div className="mt-5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/50 p-4">
                <div className="flex items-start gap-2.5">
                  <span className="text-amber-700 dark:text-amber-400 text-base">⚠️</span>
                  <div>
                    <p className="text-xs font-bold text-amber-900 dark:text-amber-200">{t('warningTitle')}</p>
                    <p className="mt-1 text-xs leading-relaxed text-amber-800 dark:text-amber-300">{t('warningDesc')}</p>
                  </div>
                </div>
              </div>

              {/* Re-upload Dropzone */}
              <div className="mt-6 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40 p-8 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mb-3">
                  📁
                </div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{t('reuploadTitle')}</p>
                <p className="mt-1 text-[11px] text-slate-400 max-w-sm">{t('reuploadSubtitle')}</p>

                {reuploaded ? (
                  <p className="mt-4 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-3 py-1.5 text-xs font-semibold">
                    ✓ New document uploaded! Our team will review within 12 hours.
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => setReuploaded(true)}
                    className="mt-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-sm"
                  >
                    Choose file
                  </button>
                )}
              </div>
            </div>

            {/* Bottom 2 Action Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                    📅
                  </div>
                  <div className="text-start">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">{t('hoursCardTitle')}</h3>
                    <p className="text-[11px] text-slate-400">{t('hoursCardSubtitle')}</p>
                  </div>
                </div>
                <span className="text-slate-400 text-sm">›</span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                    💬
                  </div>
                  <div className="text-start">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">{t('communityCardTitle')}</h3>
                    <p className="text-[11px] text-slate-400">{t('communityCardSubtitle')}</p>
                  </div>
                </div>
                <span className="text-slate-400 text-sm">›</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
