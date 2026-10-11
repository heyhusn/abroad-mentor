'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LangToggle from '@/components/LangToggle';
import ThemeToggle from '@/components/ThemeToggle';

export default function ForgotPasswordPage() {
  const t = useTranslations('ForgotPassword');
  const router = useRouter();
  const [email, setEmail] = useState('sara.k@example.com');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    router.push('/forgot-password-sent');
  };

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

      {/* Reset icon */}
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('title')}</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{t('subtitle')}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="email">
            {t('emailLabel')}
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('emailPlaceholder')}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:opacity-60"
        >
          {loading ? t('sendingResetLink') : t('sendResetLink')}
        </button>
      </form>

      {/* Google signup notice */}
      <p className="mt-6 text-center text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        {t('googlePrompt')}{' '}
        <Link href="/login" className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
          {t('googleLink')}
        </Link>{' '}
        {t('googlePromptSuffix')}
      </p>
    </div>
  );
}
