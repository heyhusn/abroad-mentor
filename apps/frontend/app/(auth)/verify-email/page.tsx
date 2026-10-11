'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LangToggle from '@/components/LangToggle';
import ThemeToggle from '@/components/ThemeToggle';

export default function VerifyEmailPage() {
  const t = useTranslations('VerifyEmail');
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(['4', '8', '2', '', '', '']);
  const [countdown, setCountdown] = useState(42);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setVerified(true);

    const role = typeof window !== 'undefined' ? sessionStorage.getItem('registered_role') : null;
    const targetUrl = role === 'mentor' ? '/mentor/apply' : '/student/onboarding';

    setTimeout(() => {
      router.push(targetUrl);
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.location.pathname.includes('/verify-email')) {
          window.location.href = targetUrl;
        }
      }, 300);
    }, 500);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Top navigation */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/register"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <span>←</span>
          <span>{t('back')}</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LangToggle />
        </div>
      </div>

      {/* Envelope icon */}
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
        <span className="font-semibold text-slate-800 dark:text-slate-200">{t('subtitleEmail')}</span>
        {t('subtitleSuffix')}
      </p>

      {verified ? (
        <div className="mt-6 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 p-4 text-center text-sm font-semibold text-emerald-800 dark:text-emerald-300">
          ✓ Email verified! Loading onboarding...
        </div>
      ) : (
        <form onSubmit={handleVerify} className="mt-6 space-y-6">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2.5">
              {t('codeLabel')}
            </label>

            {/* 6-digit input boxes */}
            <div className="flex items-center justify-between gap-2">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  aria-label={`Digit ${index + 1}`}
                  className="h-12 w-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-center text-lg font-bold text-slate-900 dark:text-white shadow-sm transition focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 sm:w-12"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:opacity-60"
          >
            {loading ? t('verifyingButton') : t('verifyButton')}
          </button>
        </form>
      )}

      {/* Footer resend and change email */}
      <div className="mt-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <p>
          {t('didntGetIt')}{' '}
          <span className="font-medium text-slate-700 dark:text-slate-200">
            {countdown > 0 ? `0:${countdown.toString().padStart(2, '0')}` : '0:00'}
          </span>
        </p>

        <Link
          href="/register"
          className="font-medium text-emerald-700 dark:text-emerald-400 hover:underline"
        >
          {t('changeEmail')}
        </Link>
      </div>
    </div>
  );
}
