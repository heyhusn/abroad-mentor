import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import WaitlistForm from './WaitlistForm';
import MentorCardPreview from './MentorCardPreview';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 pb-16 pt-12 md:pb-24 md:pt-16 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7">
            {/* Beta Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/60 px-3 py-1 text-xs font-medium text-sky-800 dark:text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-600 dark:bg-sky-400" />
              <span>{t('betaBadge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl text-start leading-[1.15]">
              {t('titlePrefix')}{' '}
              <span className="relative inline-block underline decoration-amber-500 decoration-4 underline-offset-4">
                {t('titleHighlight')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg text-start">
              {t('subtitle')}
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/mentors"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
              >
                <span>{t('findMentorCta')}</span>
                <span className="text-emerald-200">→</span>
              </Link>

              <Link
                href="/mentor/apply"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
              >
                {t('becomeMentorCta')}
              </Link>
            </div>

            {/* Waitlist Form Section */}
            <div className="mt-10 border-t border-slate-100 dark:border-slate-800 pt-6">
              <WaitlistForm />
            </div>
          </div>

          {/* Right Column: Mentor Preview Card */}
          <div className="lg:col-span-5">
            <MentorCardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
