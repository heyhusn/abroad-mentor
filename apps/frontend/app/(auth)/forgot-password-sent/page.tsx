'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LangToggle from '@/components/LangToggle';
import ThemeToggle from '@/components/ThemeToggle';

export default function ForgotPasswordSentPage() {
  const t = useTranslations('ForgotPasswordSent');

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

      {/* Mint icon box with envelope */}
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('title')}</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {t('subtitlePrefix')}{' '}
        <span className="font-semibold text-slate-800 dark:text-slate-200">{t('email')}</span>
        {t('subtitleSuffix')}
      </p>

      {/* Prototype CTA: open reset link */}
      <div className="mt-6">
        <Link
          href="/reset-password"
          className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
        >
          {t('openLinkButton')}
        </Link>
      </div>

      {/* Resend footer */}
      <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
        {t('noEmailPrefix')}{' '}
        <Link href="/forgot-password" className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
          {t('sendAgain')}
        </Link>
      </p>
    </div>
  );
}
