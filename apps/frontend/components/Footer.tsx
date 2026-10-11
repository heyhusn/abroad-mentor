import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-10 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-700 text-white">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
              {t('brand')}
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/country-guides" className="transition hover:text-slate-900 dark:hover:text-white">
              {t('countryGuides')}
            </Link>
            <Link href="/how-payments-work" className="transition hover:text-slate-900 dark:hover:text-white">
              {t('howPaymentsWork')}
            </Link>
            <Link href="/help" className="transition hover:text-slate-900 dark:hover:text-white">
              {t('helpCentre')}
            </Link>
            <Link href="/terms" className="transition hover:text-slate-900 dark:hover:text-white">
              {t('terms')}
            </Link>
            <Link href="/privacy" className="transition hover:text-slate-900 dark:hover:text-white">
              {t('privacy')}
            </Link>
            <Link href="/status" className="transition hover:text-slate-900 dark:hover:text-white">
              {t('status')}
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {t('copyright')}
          </p>
        </div>

        {/* Legal Disclaimer Note */}
        <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
          <p className="text-center text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
