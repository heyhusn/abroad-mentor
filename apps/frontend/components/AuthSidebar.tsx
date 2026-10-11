import React from 'react';
import { useTranslations } from 'next-intl';

/**
 * AuthSidebar — the green right-panel shared by all auth screens.
 * In Light Mode: Deep forest emerald background (bg-emerald-800) with white text.
 * In Dark Mode: Vibrant bright emerald/mint background (dark:bg-emerald-500) with dark contrast text, exactly as shown in the Figma screenshot!
 */
export default function AuthSidebar() {
  const t = useTranslations('AuthSidebar');

  const bullets = [
    {
      icon: (
        <svg className="h-4 w-4 text-emerald-300 dark:text-emerald-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      ),
      text: t('bullet1'),
    },
    {
      icon: (
        <svg className="h-4 w-4 text-emerald-300 dark:text-emerald-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      text: t('bullet2'),
    },
    {
      icon: (
        <svg className="h-4 w-4 text-emerald-300 dark:text-emerald-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      text: t('bullet3'),
    },
  ];

  return (
    <aside className="hidden lg:flex lg:w-[46%] flex-col justify-between bg-emerald-800 dark:bg-emerald-500 p-10 relative overflow-hidden transition-colors duration-200">
      {/* Decorative dashed curve */}
      <svg
        className="absolute top-0 start-0 w-full h-48 opacity-30 dark:opacity-40 pointer-events-none"
        viewBox="0 0 400 200"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M-10 60 Q100 -20 200 80 T 420 60"
          stroke="currentColor"
          className="text-white dark:text-emerald-950"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          fill="none"
        />
        <circle cx="200" cy="80" r="5" fill="currentColor" className="text-white dark:text-emerald-950" fillOpacity="0.6" />
      </svg>

      {/* Brand */}
      <div className="relative z-10 flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 dark:bg-emerald-950/20 text-white dark:text-emerald-950">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </span>
        <span className="text-sm font-bold text-white dark:text-emerald-950">{t('brand')}</span>
      </div>

      {/* Main copy */}
      <div className="relative z-10 mt-auto">
        <h2 className="text-2xl font-extrabold leading-snug text-white dark:text-emerald-950 sm:text-3xl">
          {t('tagline')}
        </h2>

        <ul className="mt-6 space-y-3">
          {bullets.map((b) => (
            <li key={b.text} className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0">{b.icon}</span>
              <span className="text-sm font-medium text-emerald-100 dark:text-emerald-950/90">{b.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom disclaimer */}
      <p className="relative z-10 mt-8 text-[11px] leading-relaxed text-emerald-200/80 dark:text-emerald-950/70 font-medium">
        {t('disclaimer')}
      </p>
    </aside>
  );
}
