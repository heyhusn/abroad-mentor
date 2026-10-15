'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CountryGuidesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-start max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Destination Guides
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Country guides for Pakistani students
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Everything you need to know about admission deadlines, blocked accounts, visas, and university requirements in Germany and the UK.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-start">
          {/* Germany Guide */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xs space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🇩🇪</span>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Studying in Germany
                </h2>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                  Zero tuition fees at most public universities
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Applications run mostly April to July for Winter semester. Key requirements include uni-assist VPD, blocked accounts (~€11,904), and German student visas from the Islamabad / Karachi consulates.
            </p>

            <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                <span>uni-assist and VPD verification guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                <span>Fintiba &amp; Expatrio blocked account setup</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                <span>English-taught MSc programs shortlist</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/mentors"
                className="inline-flex items-center gap-2 rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition"
              >
                Find Germany mentors →
              </Link>
            </div>
          </div>

          {/* UK Guide */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xs space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🇬🇧</span>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Studying in the UK
                </h2>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                  Graduate Route 2-year post-study work visa
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              UCAS and direct postgraduate applications, CAS statement issuance, UK student visa credibility interviews, and scholarships like Chevening and Commonwealth.
            </p>

            <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                <span>UCAS &amp; direct university applications</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                <span>CAS letter and credibility interview prep</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                <span>Graduate Route visa transition</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/mentors"
                className="inline-flex items-center gap-2 rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition"
              >
                Find UK mentors →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
