'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LangToggle from '@/components/LangToggle';
import ThemeToggle from '@/components/ThemeToggle';
import { z } from 'zod';

const registerSchema = z.object({
  fullName: z.string().trim().min(1, 'Please enter your full name'),
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(1, 'Please enter a password'),
});

type Role = 'guidance' | 'mentor';

export default function RegisterPage() {
  const t = useTranslations('Register');
  const router = useRouter();

  const [role, setRole] = useState<Role>('guidance');
  const [fullName, setFullName] = useState('Sara Khan');
  const [email, setEmail] = useState('sara.k@example.com');
  const [password, setPassword] = useState('password1234');
  const [ageChecked, setAgeChecked] = useState(true); // Pre-checked as in design
  const [termsChecked, setTermsChecked] = useState(true); // Pre-checked as in design
  const [loading, setLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorBanner(null);

    const result = registerSchema.safeParse({ fullName, email, password });
    if (!result.success) {
      setErrorBanner(result.error.errors[0]?.message || 'Please check your information');
      return;
    }

    if (!ageChecked || !termsChecked) {
      setErrorBanner('Please confirm you are 18 or older and agree to the terms');
      return;
    }

    setLoading(true);
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('registered_role', role);
        sessionStorage.setItem('registered_email', email);
        sessionStorage.setItem('registered_name', fullName);
      }
      // Navigate directly to email verification screen
      router.push('/verify-email');
      // Fallback navigation in case Next router client cache stalls
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.location.pathname.includes('/register')) {
          window.location.href = '/verify-email';
        }
      }, 300);
    } catch {
      window.location.href = '/verify-email';
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Top bar with Theme and Lang toggles */}
      <div className="flex items-center justify-between mb-4">
        <ThemeToggle />
        <LangToggle />
      </div>

      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('title')}</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t('subtitle')}</p>

      {/* Error banner if any */}
      {errorBanner && (
        <div className="mt-4 rounded-lg border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-700 dark:text-rose-300">
          ⚠️ {errorBanner}
        </div>
      )}

      {/* Role selector */}
      <div className="mt-5">
        <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">{t('iWantTo')}</p>
        <div className="grid grid-cols-2 gap-3">
          {(['guidance', 'mentor'] as Role[]).map((r) => (
            <label
              key={r}
              className={`flex cursor-pointer items-start gap-2.5 rounded-xl border-2 p-3 transition ${
                role === r
                  ? 'border-emerald-600 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/50'
                  : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <input
                type="radio"
                name="role"
                value={r}
                checked={role === r}
                onChange={() => setRole(r)}
                className="mt-0.5 h-4 w-4 accent-emerald-600"
              />
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                  {r === 'guidance' ? t('roleGuidanceTitle') : t('roleMentorTitle')}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {r === 'guidance' ? t('roleGuidanceDesc') : t('roleMentorDesc')}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {/* Google button */}
        <button
          type="button"
          onClick={() => router.push('/verify-email')}
          className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm transition hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span>{t('signUpWithGoogle')}</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          <span className="text-xs text-slate-400 dark:text-slate-500">{t('orWithEmail')}</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full name */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="fullName">
              {t('fullNameLabel')}
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t('fullNamePlaceholder')}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="reg-email">
              {t('emailLabel')}
            </label>
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder')}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="reg-password">
              {t('passwordLabel')}
            </label>
            <input
              id="reg-password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
            <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">{t('passwordCaption')}</p>
          </div>

          {/* Checkboxes */}
          <div className="space-y-2.5">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={ageChecked}
                onChange={(e) => setAgeChecked(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 rounded accent-emerald-600"
              />
              <span className="text-[11px] text-slate-600 dark:text-slate-400">{t('ageCheckbox')}</span>
            </label>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 rounded accent-emerald-600"
              />
              <span className="text-[11px] text-slate-600 dark:text-slate-400">
                {t('termsCheckboxPrefix')}{' '}
                <Link href="/terms" className="text-emerald-700 dark:text-emerald-400 underline underline-offset-2">
                  {t('termsLink')}
                </Link>{' '}
                {t('and')}{' '}
                <Link href="/privacy" className="text-emerald-700 dark:text-emerald-400 underline underline-offset-2">
                  {t('privacyLink')}
                </Link>
                {t('termsCheckboxSuffix')}
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:opacity-60"
          >
            {loading ? t('creatingAccountButton') : t('createAccountButton')}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          {t('alreadyHaveAccount')}{' '}
          <Link href="/login" className="font-medium text-emerald-700 dark:text-emerald-400 hover:underline">
            {t('signInLink')}
          </Link>
        </p>
      </div>
    </div>
  );
}
