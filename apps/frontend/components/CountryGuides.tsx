import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function CountryGuides() {
  const t = useTranslations('CountryGuides');

  return (
    <section className="bg-white dark:bg-slate-950 py-12 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Germany Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
                  <span>🇵🇰</span>
                  <span className="text-slate-300 dark:text-slate-600">→</span>
                  <span>🇩🇪</span>
                  <span className="ms-1">Germany</span>
                </div>
                <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 font-medium text-slate-600 dark:text-slate-300">
                  {t('germanyTag')}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white text-start">
                {t('germanyTitle')}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 text-start">
                {t('germanyDesc')}
              </p>
            </div>

            <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-4 text-start">
              <Link
                href="/guides/germany"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-400 transition hover:text-emerald-950 dark:hover:text-emerald-300"
              >
                <span>{t('germanyLink')}</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* UK Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
                  <span>🇵🇰</span>
                  <span className="text-slate-300 dark:text-slate-600">→</span>
                  <span>🇬🇧</span>
                  <span className="ms-1">United Kingdom</span>
                </div>
                <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 font-medium text-slate-600 dark:text-slate-300">
                  {t('ukTag')}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white text-start">
                {t('ukTitle')}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 text-start">
                {t('ukDesc')}
              </p>
            </div>

            <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-4 text-start">
              <Link
                href="/guides/uk"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-400 transition hover:text-emerald-950 dark:hover:text-emerald-300"
              >
                <span>{t('ukLink')}</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
