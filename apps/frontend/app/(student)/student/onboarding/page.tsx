'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LangToggle from '@/components/LangToggle';
import ThemeToggle from '@/components/ThemeToggle';

export default function StudentOnboardingPage() {
  const t = useTranslations('StudentOnboarding');
  const router = useRouter();

  const [country, setCountry] = useState<'germany' | 'uk' | 'notsure'>('germany');
  const [level, setLevel] = useState<'bachelors' | 'masters' | 'phd' | 'notsure'>('masters');
  const [startTerm, setStartTerm] = useState<'april' | 'sept' | 'later' | 'notsure'>('sept');

  const handleContinue = () => {
    router.push('/mentors');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top minimal header */}
      <header className="border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-200">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
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

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LangToggle />
            <Link
              href="/mentors"
              className="text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {t('skip')}
            </Link>
          </div>
        </div>
      </header>

      {/* Main onboarding form container */}
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
          {t('step')}
        </span>

        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl text-start">
          {t('title')}
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 text-start">
          {t('subtitle')}
        </p>

        <div className="mt-10 space-y-8">
          {/* 1. Country Selection */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 text-start">
              {t('countryLabel')}
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: 'germany', labelKey: 'countryGermany' },
                { id: 'uk', labelKey: 'countryUk' },
                { id: 'notsure', labelKey: 'countryNotSure' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCountry(item.id as any)}
                  className={`rounded-full px-5 py-2.5 text-xs font-medium transition ${
                    country === item.id
                      ? 'bg-emerald-700 text-white shadow-sm dark:bg-emerald-600'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {t(item.labelKey as any)}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Level Selection */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 text-start">
              {t('levelLabel')}
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: 'bachelors', labelKey: 'levelBachelors' },
                { id: 'masters', labelKey: 'levelMasters' },
                { id: 'phd', labelKey: 'levelPhd' },
                { id: 'notsure', labelKey: 'levelNotSure' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLevel(item.id as any)}
                  className={`rounded-full px-5 py-2.5 text-xs font-medium transition ${
                    level === item.id
                      ? 'bg-emerald-700 text-white shadow-sm dark:bg-emerald-600'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {t(item.labelKey as any)}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Start Term Selection */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 text-start">
              {t('startLabel')}
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: 'april', labelKey: 'startApril' },
                { id: 'sept', labelKey: 'startSept' },
                { id: 'later', labelKey: 'startLater' },
                { id: 'notsure', labelKey: 'startNotSure' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStartTerm(item.id as any)}
                  className={`rounded-full px-5 py-2.5 text-xs font-medium transition ${
                    startTerm === item.id
                      ? 'bg-emerald-700 text-white shadow-sm dark:bg-emerald-600'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {t(item.labelKey as any)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Continue button at bottom right */}
        <div className="mt-12 flex justify-end border-t border-slate-100 dark:border-slate-800 pt-6">
          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
          >
            <span>{t('continueButton')}</span>
            <span>→</span>
          </button>
        </div>
      </main>
    </div>
  );
}
