'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LangToggle from '@/components/LangToggle';
import ThemeToggle from '@/components/ThemeToggle';

export default function ResetPasswordPage() {
  const t = useTranslations('ResetPassword');
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLongEnough = newPassword.length >= 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLongEnough) {
      setError(t('ruleLength'));
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    router.push('/password-changed');
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

      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('title')}</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t('subtitle')}</p>

      {error && (
        <div className="mt-4 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 p-3 text-xs text-rose-700 dark:text-rose-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* New password */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="newPassword">
            {t('newPasswordLabel')}
          </label>
          <input
            id="newPassword"
            type="password"
            required
            placeholder="••••••••••••"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (error) setError(null);
            }}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />

          {/* Strength bar */}
          <div className="mt-2 h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                newPassword.length === 0
                  ? 'w-0'
                  : newPassword.length < 6
                  ? 'w-1/3 bg-amber-500'
                  : newPassword.length < 10
                  ? 'w-2/3 bg-emerald-500'
                  : 'w-full bg-emerald-600'
              }`}
            />
          </div>

          {/* Rules checklist */}
          <ul className="mt-2.5 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
            <li className={`flex items-center gap-1.5 ${isLongEnough ? 'text-emerald-700 dark:text-emerald-400 font-medium' : ''}`}>
              <span>{isLongEnough ? '✓' : '•'}</span>
              <span>{t('ruleLength')}</span>
            </li>
            <li className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
              <span>✓</span>
              <span>{t('ruleUnique')}</span>
            </li>
          </ul>
        </div>

        {/* Confirm new password */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="confirmPassword">
            {t('confirmPasswordLabel')}
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            placeholder="••••••••••••"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (error) setError(null);
            }}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !isLongEnough}
          className="w-full rounded-lg bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:opacity-60"
        >
          {loading ? t('savingPasswordButton') : t('savePasswordButton')}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
        {t('staySignedInNotice')}
      </p>
    </div>
  );
}
