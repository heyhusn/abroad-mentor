'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function FaqSection() {
  const t = useTranslations('Faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { qKey: 'q1', aKey: 'a1' },
    { qKey: 'q2', aKey: 'a2' },
    { qKey: 'q3', aKey: 'a3' },
    { qKey: 'q4', aKey: 'a4' },
  ];

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="bg-white dark:bg-slate-950 py-16 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Heading and Help Centre link */}
          <div className="lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 text-start">
              {t('kicker')}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl text-start">
              {t('title')}
            </h2>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 text-start">
              {t('helpCenterPrefix')}{' '}
              <Link
                href="/help"
                className="font-medium text-emerald-800 dark:text-emerald-400 underline underline-offset-2 hover:text-emerald-950 dark:hover:text-emerald-300"
              >
                {t('helpCenterLink')}
              </Link>
            </p>
          </div>

          {/* Right Column: Accordion list */}
          <div className="space-y-3 lg:col-span-8">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.qKey}
                  className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between p-4 text-start transition hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  >
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {t(faq.qKey as any)}
                    </span>
                    <span className="ms-4 shrink-0 text-slate-400 dark:text-slate-500">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 dark:border-slate-800 px-4 pb-4 pt-3 text-start">
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        {t(faq.aKey as any)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
