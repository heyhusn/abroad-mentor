'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { waitlistSchema } from '@/lib/validations/waitlist';

export default function WaitlistForm() {
  const t = useTranslations('Hero');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const validation = waitlistSchema.safeParse({ email });
    if (!validation.success) {
      setStatus('error');
      setErrorMessage(t('waitlistInvalidEmail'));
      return;
    }

    setStatus('submitting');
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMessage(t('waitlistInvalidEmail'));
    }
  };

  return (
    <div className="w-full max-w-md">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-start">
        {t('waitlistLabel')}
      </p>

      {status === 'success' ? (
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/60 p-3 text-sm font-medium text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-start">
          ✓ {t('waitlistSuccess')}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder={t('waitlistPlaceholder')}
              disabled={status === 'submitting'}
              aria-label={t('waitlistLabel')}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 disabled:opacity-60"
            />
            {status === 'error' && errorMessage && (
              <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 text-start">{errorMessage}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 disabled:opacity-60"
          >
            {status === 'submitting' ? t('waitlistSubmitting') : t('waitlistButton')}
          </button>
        </form>
      )}
    </div>
  );
}
