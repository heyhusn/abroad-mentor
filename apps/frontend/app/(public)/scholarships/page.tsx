'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/StudentSidebar';
import ThemeToggle from '@/components/ThemeToggle';

interface Scholarship {
  id: string;
  name: string;
  country: 'germany' | 'uk' | 'both';
  type: string; // e.g. 'Fully funded', 'Tuition discount'
  typeColor: string;
  whyFit: string;
  details: string;
  sourceUrl: string;
  verified: string;
  addedToChecklist: boolean;
}

export default function ScholarshipFinderPage() {
  const [filterCountry, setFilterCountry] = useState<'all' | 'germany' | 'uk'>('all');
  const [scholarships, setScholarships] = useState<Scholarship[]>([
    {
      id: 's1',
      name: 'DAAD Scholarships for Development-Related Postgraduate Courses (EPOS)',
      country: 'germany',
      type: 'Fully funded',
      typeColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300',
      whyFit: 'For graduates from developing countries with 2+ years of professional experience in related field.',
      details: 'Deadline varies by course (often Autumn). Monthly stipend €934 + health insurance + travel allowance.',
      sourceUrl: 'https://www.daad.de',
      verified: 'Verified Oct 2026',
      addedToChecklist: false,
    },
    {
      id: 's2',
      name: 'Deutschlandstipendium',
      country: 'germany',
      type: '€300 / month',
      typeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300',
      whyFit: 'Awarded by universities without regard to personal or parent income based on outstanding academic merit.',
      details: 'Apply through your university once enrolled or during admission round.',
      sourceUrl: 'https://www.deutschlandstipendium.de',
      verified: 'Verified Oct 2026',
      addedToChecklist: true,
    },
    {
      id: 's3',
      name: 'Chevening Scholarships',
      country: 'uk',
      type: 'Fully funded',
      typeColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300',
      whyFit: 'UK government global scholarship for Pakistani leaders. Covers full tuition, flight, and monthly living.',
      details: 'Applications usually open in August. Minimum 2 years work experience.',
      sourceUrl: 'https://www.chevening.org',
      verified: 'Verified Aug 2026',
      addedToChecklist: false,
    },
    {
      id: 's4',
      name: 'Commonwealth Master’s Scholarships',
      country: 'uk',
      type: 'Fully funded',
      typeColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300',
      whyFit: 'Funded by the UK Foreign, Commonwealth & Development Office for Pakistani students from lower/middle-income backgrounds.',
      details: 'Check the HEC Pakistan portal for nomination window.',
      sourceUrl: 'https://cscuk.fcdo.gov.uk',
      verified: 'Verified Sep 2026',
      addedToChecklist: false,
    },
    {
      id: 's5',
      name: 'University International Merit Award',
      country: 'uk',
      type: 'Tuition discount',
      typeColor: 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300',
      whyFit: 'Many UK universities offer automatic discounts (£2,000 - £5,000) for international students with high grades.',
      details: 'Usually assessed automatically with your application.',
      sourceUrl: '#',
      verified: 'Verified Oct 2026',
      addedToChecklist: false,
    },
  ]);

  const toggleChecklist = (id: string) => {
    setScholarships((prev) =>
      prev.map((s) => (s.id === id ? { ...s, addedToChecklist: !s.addedToChecklist } : s))
    );
  };

  const filtered = scholarships.filter((s) => {
    if (filterCountry === 'all') return true;
    return s.country === filterCountry;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      <StudentSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 dark:text-white">Scholarships</span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                SK
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 sm:p-10 max-w-5xl w-full mx-auto space-y-6 text-start">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Scholarships that fit your profile
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Matched by AI from official scholarship pages, refreshed every week. Always read the official page: amounts and deadlines change.
            </p>
          </div>

          {/* Country Filter Chips */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setFilterCountry('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                filterCountry === 'all'
                  ? 'bg-emerald-800 text-white'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilterCountry('germany')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                filterCountry === 'germany'
                  ? 'bg-emerald-800 text-white'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              <span>🇩🇪</span> Germany
            </button>
            <button
              type="button"
              onClick={() => setFilterCountry('uk')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                filterCountry === 'uk'
                  ? 'bg-emerald-800 text-white'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              <span>🇬🇧</span> United Kingdom
            </button>
          </div>

          {/* Scholarships Cards List */}
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-6"
              >
                <div className="space-y-3 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xl">{item.country === 'germany' ? '🇩🇪' : '🇬🇧'}</span>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {item.name}
                    </h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${item.typeColor}`}>
                      {item.type}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200">Why it fits: </strong>
                      {item.whyFit}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400">{item.details}</p>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span>{item.verified}</span>
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="shrink-0 flex flex-col gap-2 w-full sm:w-44">
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold text-center shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    <span>Official page</span>
                    <span className="text-[10px]">↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => toggleChecklist(item.id)}
                    className={`w-full py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      item.addedToChecklist
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.addedToChecklist ? '✓ Added to checklist' : '+ Add to checklist'}</span>
                  </button>

                  <Link
                    href="/mentors"
                    className="w-full py-1.5 px-3 rounded-xl text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-center hover:bg-slate-50 dark:hover:bg-slate-800/60 transition"
                  >
                    Ask a past holder
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
