'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LangToggle from '@/components/LangToggle';
import ThemeToggle from '@/components/ThemeToggle';

export default function PasswordChangedPage() {
  const t = useTranslations('PasswordChanged');

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Top navigation */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <span>←</span>
          <span>{t('backToSignIn')}</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LangToggle />
        </div>
      </div>

      {/* Success Card matching design */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center shadow-sm">
        {/* Checkmark circle */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{t('title')}</h1>
        <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {t('subtitle')}
        </p>

        <div className="mt-6">
          <Link
            href="/student/onboarding"
            className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
          >
            {t('bookingsButton')}
          </Link>
        </div>
      </div>
    </div>
  );
}
