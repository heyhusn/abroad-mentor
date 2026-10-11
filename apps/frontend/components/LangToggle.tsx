'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';

/**
 * LangToggle — appears top-right on every auth page.
 * Visually switches between اردو and EN.
 * The actual page copy never changes (always English from en.json).
 */
export default function LangToggle() {
  const { isUrdu, toggleLocale } = useLocale();

  return (
    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
      <span className={!isUrdu ? 'text-slate-800 font-semibold' : ''}>EN</span>
      <button
        type="button"
        role="switch"
        aria-checked={isUrdu}
        onClick={toggleLocale}
        title={isUrdu ? 'Switch to English' : 'اردو پر سوئچ کریں'}
        className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-slate-300 bg-slate-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-1"
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 mt-0.5 ${
            isUrdu ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </button>
      <span className={isUrdu ? 'text-slate-800 font-semibold' : ''}>اردو</span>
    </div>
  );
}
