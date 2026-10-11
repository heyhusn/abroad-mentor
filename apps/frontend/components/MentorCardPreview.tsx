import React from 'react';
import { useTranslations } from 'next-intl';

export default function MentorCardPreview() {
  const t = useTranslations('Hero');

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Mentor Profile Card */}
      <div className="relative z-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xl shadow-slate-100 dark:shadow-none transition-colors duration-200">
        <div className="flex items-start gap-4">
          {/* Avatar Initials */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-950 text-sm font-semibold text-teal-800 dark:text-teal-300">
            AM
          </div>

          <div className="flex-1">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white text-start">
              {t('mentorName')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-start">{t('mentorDegree')}</p>

            {/* Badges */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {t('mentorVerified')}
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs text-slate-600 dark:text-slate-300">
                <span>🇵🇰</span>
                <span className="text-[10px] text-slate-400">→</span>
                <span>🇩🇪</span>
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300">
                <svg className="h-3 w-3 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {t('mentorTopBadge')}
              </span>
            </div>
          </div>
        </div>

        {/* Bio quote */}
        <p className="mt-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300 text-start">
          {t('mentorBio')}
        </p>

        {/* Card Footer: Price & Rating */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
          <div>
            <span className="text-xs text-slate-400 me-1.5">{t('mentorPriceLabel')}</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{t('mentorPriceAmount')}</span>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <svg className="h-3.5 w-3.5 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{t('mentorRating')}</span>
            <span className="text-slate-400">{t('mentorReviewCount')}</span>
          </div>
        </div>
      </div>

      {/* Dotted connector curve */}
      <div className="hidden lg:block absolute -bottom-6 start-12 w-28 h-8 border-b-2 border-s-2 border-dashed border-emerald-300 dark:border-emerald-700 rounded-es-2xl pointer-events-none" />

      {/* Floating Trust / Safepay Escrow Card */}
      <div className="mt-4 rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/90 dark:bg-emerald-950/60 p-3.5 shadow-sm transition-colors duration-200">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
            <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <div>
            <h4 className="text-xs font-semibold text-emerald-900 dark:text-emerald-300 text-start">
              {t('trustTitle')}
            </h4>
            <p className="mt-0.5 text-xs text-emerald-800 dark:text-emerald-400 text-start">
              {t('trustDescription')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
