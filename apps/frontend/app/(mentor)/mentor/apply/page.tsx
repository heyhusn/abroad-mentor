'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LangToggle from '@/components/LangToggle';
import ThemeToggle from '@/components/ThemeToggle';

export default function MentorApplicationPage() {
  const t = useTranslations('MentorApplication');
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'upload' | 'email'>('upload');
  const [hasFile, setHasFile] = useState(true);

  const steps = [
    { num: 1, labelKey: 'stepAbout', completed: true },
    { num: 2, labelKey: 'stepStudies', completed: true },
    { num: 3, labelKey: 'stepPricing', completed: true },
    { num: 4, labelKey: 'stepVerify', active: true },
    { num: 5, labelKey: 'stepPayout' },
  ];

  const handleSaveAndContinue = () => {
    router.push('/mentor/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Navbar */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
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
              {t('headerTitle')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LangToggle />
          </div>
        </div>
      </header>

      {/* Main Grid: Left Stepper & Right Form Card */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Stepper Sidebar */}
          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">{t('sidebarTitle')}</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t('sidebarSubtitle')}</p>

              <nav className="mt-6 space-y-4">
                {steps.map((s) => (
                  <div key={s.num} className="flex items-center gap-3">
                    {s.completed ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 text-xs font-bold">
                        ✓
                      </span>
                    ) : s.active ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-emerald-700 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                        {s.num}
                      </span>
                    ) : (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 text-slate-400 text-xs">
                        {s.num}
                      </span>
                    )}

                    <span
                      className={`text-xs ${
                        s.active
                          ? 'font-bold text-emerald-900 dark:text-emerald-400'
                          : s.completed
                          ? 'text-slate-700 dark:text-slate-200 font-medium'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {t(s.labelKey as any)}
                    </span>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Right Main Verification Form Card */}
          <main className="lg:col-span-8">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white text-start">{t('title')}</h1>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 text-start">{t('subtitle')}</p>

              {/* Tabs */}
              <div className="mt-6 flex gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                    activeTab === 'upload'
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {t('tabUpload')}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('email')}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                    activeTab === 'email'
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {t('tabEmail')}
                </button>
              </div>

              {/* Drag and Drop Box */}
              <div className="mt-6 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40 p-8 text-center transition hover:border-slate-400 dark:hover:border-slate-600">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mb-3">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{t('dropzoneTitle')}</p>
                <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-400 max-w-sm">{t('dropzoneSubtitle')}</p>

                <button
                  type="button"
                  onClick={() => setHasFile(true)}
                  className="mt-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-sm"
                >
                  {t('chooseFile')}
                </button>
              </div>

              {/* Uploaded File Preview Badge */}
              {hasFile && (
                <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="text-slate-400">📄</span>
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{t('sampleFileName')}</span>
                  </div>
                  <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                    ✓ {t('uploadedBadge')}
                  </span>
                </div>
              )}

              {/* Disclaimer */}
              <p className="mt-6 text-[11px] leading-relaxed text-slate-400 dark:text-slate-400 text-start">
                • {t('disclaimer')}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
                <Link
                  href="/register"
                  className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                >
                  ← {t('back')}
                </Link>

                <button
                  type="button"
                  onClick={handleSaveAndContinue}
                  className="rounded-lg bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-white shadow-sm"
                >
                  {t('saveContinue')}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
