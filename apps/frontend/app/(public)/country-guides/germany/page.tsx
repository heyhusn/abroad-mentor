'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PublicCountryGuidePage() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      num: 1,
      title: 'Choose programmes',
      desc: 'Search DAAD International Programmes database. Check whether university is non-profit public (free tuition) vs private.',
      linkText: 'daad.de/en/international-programmes',
      linkUrl: 'https://www.daad.de',
      verified: 'Verified Oct 2026',
    },
    {
      num: 2,
      title: 'Prepare your documents',
      desc: 'Check whether your school needs attested transcripts from board or HEC. Language certificate (IELTS or TOEFL) and tabular CV without personal photo.',
      linkText: 'Check our document checklist',
      linkUrl: '/checklist',
      verified: 'Law review Oct 2026',
    },
    {
      num: 3,
      title: 'Apply through uni-assist or direct',
      desc: 'Submit your formal application through uni-assist. VPD fee: €75 first course, €30 each additional.',
      linkText: 'uni-assist.de/tools/check-university-admission/',
      linkUrl: 'https://www.uni-assist.de',
      verified: 'Verified Oct 2026',
    },
    {
      num: 4,
      title: 'Show you can pay for living costs',
      desc: 'Open a German blocked account (Sperrkonto). Official current requirement around €992/month (€11,904/year total deposit) for student visas.',
      linkText: 'auswaertiges-amt.de · Blocked account info',
      linkUrl: 'https://www.auswaertiges-amt.de',
      verified: 'Law review Oct 2026',
    },
    {
      num: 5,
      title: 'Apply for your student visa',
      desc: 'Book your appointment with the German Missions in Pakistan as early as possible, and bring the documents from the official checklist.',
      linkText: 'German Missions in Islamabad & Karachi',
      linkUrl: 'https://pakistan.diplo.de',
      verified: 'Verified Oct 2026',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 text-start">
        {/* Breadcrumb & Country Badge */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1 shadow-2xs text-xs font-semibold">
            <span>🇵🇰 ➔ 🇩🇪</span>
            <span>Germany</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Study in Germany from Pakistan: the step-by-step guide
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Every step is fact-checked against official sources, with the date each fact card was verified. Read the official link with each step.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/checklist"
              className="px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition"
            >
              Get my personalized roadmap
            </Link>
            <Link
              href="/mentors"
              className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              Talk to a mentor in Germany
            </Link>
          </div>
        </div>

        {/* Steps Guide List */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
            5 Critical Steps for Pakistani Students
          </h2>

          <div className="space-y-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black text-sm">
                    {step.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {step.desc}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
                      <a
                        href={step.linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <span>{step.linkText}</span>
                        <span>↗</span>
                      </a>
                      <span className="text-slate-300 dark:text-slate-700">·</span>
                      <span className="text-slate-400 font-medium">{step.verified}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Callout Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-bold text-emerald-950 dark:text-emerald-200">
              Want this as a checklist with your own deadlines?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Our free AI builds your plan and shows stages before and after you land.
            </p>
          </div>

          <Link
            href="/checklist"
            className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs shrink-0 text-center shadow-xs transition"
          >
            Roadmap &amp; document checklist
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
