'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/context/LocaleContext';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const { isUrdu, toggleLocale } = useLocale();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-white shadow-sm">
              <svg
                className="h-5 w-5"
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
            <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
              {t('brand')}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/mentors"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              {t('findMentors')}
            </Link>
            <Link
              href="/country-guides"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              {t('countryGuides')}
            </Link>
            <Link
              href="/assistant"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              {t('aiAssistant')}
            </Link>
            <Link
              href="/become-mentor"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              {t('becomeMentor')}
            </Link>
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Language Toggle switch */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
            <span className={isUrdu ? 'font-semibold text-emerald-800 dark:text-emerald-400' : ''}>
              {t('langUrdu')}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isUrdu}
              onClick={toggleLocale}
              title={isUrdu ? 'Switch to English' : 'Switch to Urdu (text remains in English)'}
              className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-1"
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-slate-900 shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5 ${
                  isUrdu ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
            <span className={!isUrdu ? 'font-semibold text-emerald-800 dark:text-emerald-400' : ''}>
              {t('langEn')}
            </span>
          </div>

          <Link
            href="/login"
            className="hidden text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors hover:text-slate-900 dark:hover:text-white sm:inline-block"
          >
            {t('signIn')}
          </Link>

          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
          >
            {t('getStarted')}
          </Link>
        </div>
      </div>
    </header>
  );
}
