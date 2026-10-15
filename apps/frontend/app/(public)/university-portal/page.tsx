'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function UniversityPortalPage() {
  const [courses] = useState([
    {
      id: 'c1',
      name: 'MSc Computer Science',
      deadline: '15 July',
      degree: 'Master',
      tuition: '€0 (Public)',
      vpdRequired: 'Yes (via uni-assist)',
      applicantsCount: 412,
    },
    {
      id: 'c2',
      name: 'MSc Data Engineering',
      deadline: '15 July',
      degree: 'Master',
      tuition: '€0 (Public)',
      vpdRequired: 'Yes (via uni-assist)',
      applicantsCount: 298,
    },
    {
      id: 'c3',
      name: 'MSc Environmental Engineering',
      deadline: '31 August',
      degree: 'Master',
      tuition: '€0 (Public)',
      vpdRequired: 'Direct application',
      applicantsCount: 165,
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* University Staff Sidebar */}
      <aside className="w-60 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] flex flex-col justify-between min-h-screen text-start p-4">
        <div>
          <div className="flex items-center gap-2.5 mb-6">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-700 text-white font-bold text-xs">
              U
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              TU Berlin · International
            </span>
          </div>

          <div className="space-y-1 text-xs font-semibold">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold flex items-center gap-2">
              <span>🏛️</span>
              <span>Programmes</span>
            </div>
            <button
              type="button"
              onClick={() => alert('Applicant shortlist analytics')}
              className="w-full text-left p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <span>📊</span>
              <span>Applicant funnel</span>
            </button>
            <button
              type="button"
              onClick={() => alert('Update primary university admissions requirements')}
              className="w-full text-left p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <span>📝</span>
              <span>Fact cards</span>
            </button>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">
            TB
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold truncate">Admissions Team</p>
            <p className="text-[10px] text-slate-400">Official University Portal</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white">
            Programmes &amp; applicant requirements
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-10 max-w-6xl w-full mx-auto space-y-6 text-start">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <span>🇩🇪</span>
                <span>TU Berlin (Technical University of Berlin)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                International student application guidelines
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Published to 1,420 Pakistani prospective applicants. Directly feeds the AI roadmap and fact check badges.
              </p>
            </div>

            <button
              type="button"
              onClick={() => alert('Add course')}
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition shrink-0"
            >
              + Add programme
            </button>
          </div>

          {/* Metrics summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Shortlisted by Pakistani students
              </span>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">412</p>
              <span className="text-[11px] text-emerald-600 font-semibold">+18% this month</span>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Avg. applicant Pakistani CGPA
              </span>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">3.34</p>
              <span className="text-[11px] text-slate-400">German equivalence ~1.9</span>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Verified mentors on campus
              </span>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">38</p>
              <span className="text-[11px] text-emerald-600 font-semibold">Active peer guides</span>
            </div>
          </div>

          {/* Programmes table */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 font-bold text-xs text-slate-500 uppercase">
              Current Autumn 2027 Admissions Catalogue
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-[11px] font-bold uppercase text-slate-400">
                    <th className="py-3.5 px-6">Programme</th>
                    <th className="py-3.5 px-4">Level</th>
                    <th className="py-3.5 px-4">Deadline</th>
                    <th className="py-3.5 px-4">Tuition</th>
                    <th className="py-3.5 px-4">uni-assist / VPD</th>
                    <th className="py-3.5 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                        {course.name}
                      </td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-300">{course.degree}</td>
                      <td className="py-4 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {course.deadline}
                      </td>
                      <td className="py-4 px-4 text-emerald-700 dark:text-emerald-400 font-semibold">
                        {course.tuition}
                      </td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-300">
                        {course.vpdRequired}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          type="button"
                          onClick={() => alert(`Edit requirements for ${course.name}`)}
                          className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
