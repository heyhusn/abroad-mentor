'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/StudentSidebar';
import ThemeToggle from '@/components/ThemeToggle';

interface ChecklistItem {
  id: string;
  category: 'prepare' | 'docs' | 'apply' | 'visa' | 'arrive';
  title: string;
  desc: string;
  source: string;
  sourceUrl: string;
  verified: string;
  completed: boolean;
}

export default function ChecklistRoadmapPage() {
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportingItem, setReportingItem] = useState<ChecklistItem | null>(null);
  const [reportType, setReportType] = useState('Outdated requirements');
  const [reportNotes, setReportNotes] = useState('');
  const [reportLink, setReportLink] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Filter & item state
  const [items, setItems] = useState<ChecklistItem[]>([
    // Category 1: Prepare (Nov - Dec 2026)
    {
      id: 'c1',
      category: 'prepare',
      title: 'Shortlist 6 to 8 programmes',
      desc: 'Check entry requirements and whether a bachelor module evaluation is required.',
      source: 'daad.de',
      sourceUrl: 'https://www.daad.de',
      verified: 'Verified Oct 2026',
      completed: true,
    },
    {
      id: 'c2',
      category: 'prepare',
      title: 'Check language requirements',
      desc: 'Most English-taught Master’s ask for IELTS 6.5 or TOEFL 90+.',
      source: 'University pages',
      sourceUrl: '#',
      verified: 'Verified Oct 2026',
      completed: true,
    },
    {
      id: 'c3',
      category: 'prepare',
      title: 'Write your first CV draft',
      desc: 'German format is a reverse-chronological tabular CV without photo.',
      source: 'daad.de',
      sourceUrl: 'https://www.daad.de',
      verified: 'Verified Oct 2026',
      completed: false,
    },

    // Category 2: Documents and tests (Jan - March 2027)
    {
      id: 'c4',
      category: 'docs',
      title: 'Take IELTS',
      desc: 'Allow at least 2 weeks for test results and additional score reports.',
      source: 'ielts.org',
      sourceUrl: 'https://www.ielts.org',
      verified: 'Verified Sep 2026',
      completed: true,
    },
    {
      id: 'c5',
      category: 'docs',
      title: 'Get certified copies and translations',
      desc: 'Degree and transcripts from HEC/matric/inter boards, attested.',
      source: 'pakistan.diplo.de',
      sourceUrl: 'https://pakistan.diplo.de',
      verified: 'Verified Oct 2026',
      completed: true,
    },
    {
      id: 'c6',
      category: 'docs',
      title: 'Write your motivation letter and CV',
      desc: 'Tailor each letter to the programme and faculty research priorities.',
      source: 'University pages',
      sourceUrl: '#',
      verified: 'Verified Oct 2026',
      completed: false,
    },

    // Category 3: Apply (April - July 2027)
    {
      id: 'c7',
      category: 'apply',
      title: 'Create uni-assist account and submit',
      desc: 'Many winter semester deadlines fall on 15 July.',
      source: 'uni-assist.de',
      sourceUrl: 'https://www.uni-assist.de',
      verified: 'Verified Oct 2026',
      completed: false,
    },
    {
      id: 'c8',
      category: 'apply',
      title: 'Pay the uni-assist fee',
      desc: '€75 for first application, €30 for each additional.',
      source: 'uni-assist.de',
      sourceUrl: 'https://www.uni-assist.de',
      verified: 'Verified Oct 2026',
      completed: false,
    },

    // Category 4: Visa and money (July - September 2027)
    {
      id: 'c9',
      category: 'visa',
      title: 'Open a blocked account',
      desc: 'Official monthly requirement €992/month (€11,904/year total deposit).',
      source: 'auswaertiges-amt.de',
      sourceUrl: 'https://www.auswaertiges-amt.de',
      verified: 'Law review Oct 2026',
      completed: false,
    },
    {
      id: 'c10',
      category: 'visa',
      title: 'Get health insurance for your visa',
      desc: 'Travel health first, then statutory student health insurance upon arrival.',
      source: 'German Missions in Pakistan',
      sourceUrl: '#',
      verified: 'Verified Oct 2026',
      completed: false,
    },
    {
      id: 'c11',
      category: 'visa',
      title: 'Book your student visa appointment',
      desc: 'Check waitlist early via Islamabad or Karachi Consulate.',
      source: 'German Missions in Pakistan',
      sourceUrl: '#',
      verified: 'Verified Oct 2026',
      completed: false,
    },

    // Category 5: Arrive (September - October 2027)
    {
      id: 'c12',
      category: 'arrive',
      title: 'Find a place to live',
      desc: 'Studentenwerk/Studierendenwerk dorms or WG-Gesucht apartments.',
      source: 'studentenwerke.de',
      sourceUrl: 'https://www.studentenwerke.de',
      verified: 'Verified Oct 2026',
      completed: false,
    },
    {
      id: 'c13',
      category: 'arrive',
      title: 'Register your address (Anmeldung)',
      desc: 'Usually within 2 weeks of moving in at the local Bürgeramt.',
      source: 'City service portal',
      sourceUrl: '#',
      verified: 'Verified Oct 2026',
      completed: false,
    },
  ]);

  const toggleComplete = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = items.filter((i) => i.completed).length;
  const totalCount = items.length;

  const openReport = (item: ChecklistItem) => {
    setReportingItem(item);
    setShowReportModal(true);
    setReportSubmitted(false);
  };

  const submitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setShowReportModal(false);
      setReportNotes('');
    }, 1200);
  };

  const categories = [
    { key: 'prepare', title: 'Prepare', period: 'Nov – Dec 2026' },
    { key: 'docs', title: 'Documents and tests', period: 'Jan – March 2027' },
    { key: 'apply', title: 'Apply', period: 'April – July 2027' },
    { key: 'visa', title: 'Visa and money', period: 'July – September 2027' },
    { key: 'arrive', title: 'Arrive', period: 'September – October 2027' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      <StudentSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 dark:text-white">
              Checklist &amp; roadmap
            </span>
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
        <main className="flex-1 p-6 sm:p-10 max-w-5xl w-full mx-auto space-y-8 text-start">
          {/* Header Title Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-1">
                <span>🇩🇪</span>
                <span>Germany · Masters · Autumn 2027</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Your roadmap to Germany
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Built by AI from our verified fact cards and your plan. Each step links to the official page. Mentors review your plan.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert('Roadmap link copied to clipboard!')}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition"
              >
                🔗 Share with my mentor
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition"
              >
                📥 Export PDF
              </button>
            </div>
          </div>

          {/* Progress Card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {completedCount} of {totalCount} steps done
                </span>
                <span className="text-xs text-slate-400">· Next: Motivation letter and CV</span>
              </div>
              <div className="w-64 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono">
                uni-assist winter window opens: 15 May 2027
              </span>
              <Link
                href="/mentors"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition"
              >
                Get help from a mentor
              </Link>
            </div>
          </div>

          {/* Checklist Categories List */}
          <div className="space-y-8">
            {categories.map((cat) => {
              const catItems = items.filter((i) => i.category === cat.key);
              const catDone = catItems.filter((i) => i.completed).length;

              return (
                <div key={cat.key} className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                    <div className="flex items-baseline gap-3">
                      <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                        {cat.title}
                      </h2>
                      <span className="text-[11px] text-slate-400 font-mono">{cat.period}</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {catDone} / {catItems.length}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {catItems.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 rounded-2xl border transition flex items-start gap-3.5 ${
                          item.completed
                            ? 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 opacity-80'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
                        }`}
                      >
                        {/* Checkbox */}
                        <button
                          type="button"
                          onClick={() => toggleComplete(item.id)}
                          className={`mt-0.5 h-5 w-5 rounded-md border flex items-center justify-center transition ${
                            item.completed
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-300 dark:border-slate-700 hover:border-emerald-600'
                          }`}
                        >
                          {item.completed && <span className="text-xs font-bold">✓</span>}
                        </button>

                        {/* Title & Desc */}
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-xs sm:text-[13px] font-bold ${
                              item.completed
                                ? 'line-through text-slate-400 dark:text-slate-500'
                                : 'text-slate-900 dark:text-white'
                            }`}
                          >
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>

                        {/* Source Tag & Report Action */}
                        <div className="shrink-0 flex flex-col items-end gap-1 text-[11px]">
                          <a
                            href={item.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            <span>{item.source}</span>
                            <span className="text-[9px]">↗</span>
                          </a>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                            <span>{item.verified}</span>
                            <span>·</span>
                            <button
                              type="button"
                              onClick={() => openReport(item)}
                              className="hover:underline text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                              Report wrong info
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* SCREEN 5: REPORT WRONG INFO MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-2xl text-start space-y-5">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Report wrong information
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Our team checks every report against the official source, usually within 2 working days.
              </p>
            </div>

            {reportSubmitted ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <span>✓</span>
                <span>Thank you! Your report has been submitted to fact-checkers.</span>
              </div>
            ) : (
              <form onSubmit={submitReport} className="space-y-4">
                {/* Which fact card */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Which step?
                  </label>
                  <input
                    type="text"
                    disabled
                    value={reportingItem?.title || 'Open a blocked account'}
                    className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/60 p-2.5 text-slate-600 dark:text-slate-400 outline-none"
                  />
                </div>

                {/* What is wrong radio */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    What is wrong?
                  </label>
                  <div className="space-y-1.5 text-xs">
                    {[
                      'The requirement date is out of date',
                      'The fee or dead line is wrong',
                      'A step is missing',
                      'Something else',
                    ].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                        <input
                          type="radio"
                          name="reportType"
                          value={opt}
                          checked={reportType === opt}
                          onChange={(e) => setReportType(e.target.value)}
                          className="h-3.5 w-3.5 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Details
                  </label>
                  <textarea
                    rows={3}
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    placeholder="Tell us what the official page says now..."
                    className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                {/* Link to official source */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Link to official source (optional)
                  </label>
                  <input
                    type="url"
                    value={reportLink}
                    onChange={(e) => setReportLink(e.target.value)}
                    placeholder="https://"
                    className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition"
                  >
                    Send report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
