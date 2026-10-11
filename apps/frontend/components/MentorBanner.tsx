import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function MentorBanner() {
  const t = useTranslations('MentorBanner');

  return (
    <section className="py-8 bg-white dark:bg-slate-950 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-emerald-200/70 dark:border-emerald-800/60 bg-emerald-50/60 dark:bg-emerald-950/30 p-6 sm:p-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 text-start">
              {t('kicker')}
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl text-start">
              {t('title')}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm text-start">
              {t('subtitle')}
            </p>
          </div>

          <Link
            href="/mentor/apply"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
          >
            <span>{t('cta')}</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
