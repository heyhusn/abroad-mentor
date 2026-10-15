'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/StudentSidebar';
import ThemeToggle from '@/components/ThemeToggle';

interface RecordItem {
  id: string;
  programme: string;
  university: string;
  status: 'Admit' | 'Reject' | 'Waitlist';
  statusColor: string;
  cgpa: string;
  cgpaSystem: string;
  ielts: string;
  workExp: string;
  intake: string;
  verified: boolean;
}

export default function AdmitsRejectsPage() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'Admit' | 'Reject'>('all');
  const [filterCountry, setFilterCountry] = useState('Germany');
  const [filterIntake, setFilterIntake] = useState('Winter 2026');
  const [searchProg, setSearchProg] = useState('');

  // Submit profile modal state
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newProg, setNewProg] = useState('');
  const [newUni, setNewUni] = useState('');
  const [newDecision, setNewDecision] = useState<'Admit' | 'Reject'>('Admit');
  const [newCgpa, setNewCgpa] = useState('3.2');
  const [newIelts, setNewIelts] = useState('7.0');
  const [submitted, setSubmitted] = useState(false);

  const [records, setRecords] = useState<RecordItem[]>([
    {
      id: 'r1',
      programme: 'MSc Computer Science',
      university: 'TU Berlin',
      status: 'Admit',
      statusColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300',
      cgpa: '3.42 / 4.00',
      cgpaSystem: 'FAST-NUCES',
      ielts: '7.5',
      workExp: '1 yr',
      intake: 'Winter 2026',
      verified: true,
    },
    {
      id: 'r2',
      programme: 'MSc Data Science',
      university: 'RWTH Aachen University',
      status: 'Reject',
      statusColor: 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300',
      cgpa: '2.95 / 4.00',
      cgpaSystem: 'NUST',
      ielts: '6.5',
      workExp: 'None',
      intake: 'Winter 2026',
      verified: true,
    },
    {
      id: 'r3',
      programme: 'MSc Automotive Systems',
      university: 'TU Chemnitz',
      status: 'Admit',
      statusColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300',
      cgpa: '3.08 / 4.00',
      cgpaSystem: 'UET Lahore',
      ielts: '6.5',
      workExp: '2 yrs',
      intake: 'Winter 2026',
      verified: true,
    },
    {
      id: 'r4',
      programme: 'MSc Computer Science',
      university: 'Saarland University',
      status: 'Reject',
      statusColor: 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300',
      cgpa: '3.15 / 4.00',
      cgpaSystem: 'COMSATS',
      ielts: '7.0',
      workExp: '6 mos',
      intake: 'Winter 2026',
      verified: true,
    },
    {
      id: 'r5',
      programme: 'MSc Information Systems',
      university: 'University of Münster',
      status: 'Admit',
      statusColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300',
      cgpa: '3.28 / 4.00',
      cgpaSystem: 'GIKI',
      ielts: '7.5',
      workExp: '1.5 yrs',
      intake: 'Winter 2026',
      verified: true,
    },
    {
      id: 'r6',
      programme: 'MSc Artificial Intelligence',
      university: 'University of Edinburgh',
      status: 'Waitlist',
      statusColor: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300',
      cgpa: '3.65 / 4.00',
      cgpaSystem: 'LUMS',
      ielts: '8.0',
      workExp: '2 yrs',
      intake: 'Autumn 2026',
      verified: true,
    },
  ]);

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProg || !newUni) return;

    const newRec: RecordItem = {
      id: Date.now().toString(),
      programme: newProg,
      university: newUni,
      status: newDecision,
      statusColor:
        newDecision === 'Admit'
          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
          : 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300',
      cgpa: `${newCgpa} / 4.00`,
      cgpaSystem: 'Pakistani Univ',
      ielts: newIelts,
      workExp: '1 yr',
      intake: 'Winter 2026',
      verified: false,
    };

    setRecords([newRec, ...records]);
    setSubmitted(true);
    setTimeout(() => {
      setShowSubmitModal(false);
      setNewProg('');
      setNewUni('');
      setSubmitted(false);
    }, 1200);
  };

  const filtered = records.filter((r) => {
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    if (searchProg && !r.programme.toLowerCase().includes(searchProg.toLowerCase()) && !r.university.toLowerCase().includes(searchProg.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      <StudentSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 dark:text-white">Admits &amp; rejects</span>
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
        <main className="flex-1 p-6 sm:p-10 max-w-6xl w-full mx-auto space-y-6 text-start">
          {/* Header Title & Share Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Admits and rejects from Pakistani applicants
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Anonymized profiles shared by candidates and alumni. A "Verified" badge means we have seen the decision letter from the university.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowSubmitModal(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition shrink-0 flex items-center gap-1.5"
            >
              <span>+</span>
              <span>Share your result</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            <div className="lg:col-span-5 space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Programme or University:</label>
              <input
                type="text"
                value={searchProg}
                onChange={(e) => setSearchProg(e.target.value)}
                placeholder="Search Computer Science, TU Berlin..."
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="lg:col-span-3 space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Country:</label>
              <select
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-800 dark:text-slate-200 outline-none"
              >
                <option>Germany</option>
                <option>United Kingdom</option>
                <option>All countries</option>
              </select>
            </div>

            <div className="lg:col-span-4 space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Intake:</label>
              <select
                value={filterIntake}
                onChange={(e) => setFilterIntake(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-800 dark:text-slate-200 outline-none"
              >
                <option>Winter 2026</option>
                <option>Summer 2026</option>
                <option>Winter 2025</option>
              </select>
            </div>
          </div>

          {/* Decision Status Filter Pills */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                filterStatus === 'all'
                  ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              All decisions ({records.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('Admit')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                filterStatus === 'Admit'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-800 dark:text-emerald-300'
              }`}
            >
              <span>✓ Admits only</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('Reject')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                filterStatus === 'Reject'
                  ? 'bg-red-700 text-white'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-red-800 dark:text-red-300'
              }`}
            >
              <span>✕ Rejects only</span>
            </button>
          </div>

          {/* Table Container */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <th className="py-3.5 px-6">Programme &amp; University</th>
                    <th className="py-3.5 px-4">Decision</th>
                    <th className="py-3.5 px-4">Pak CGPA / Scale</th>
                    <th className="py-3.5 px-4">IELTS</th>
                    <th className="py-3.5 px-4">Experience</th>
                    <th className="py-3.5 px-4">Intake</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                      <td className="py-4 px-6">
                        <p className="font-bold text-slate-900 dark:text-white">{item.programme}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.university}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${item.statusColor}`}>
                          <span>{item.status === 'Admit' ? '✓' : item.status === 'Reject' ? '✕' : '⏳'}</span>
                          <span>{item.status}</span>
                        </span>
                        {item.verified && (
                          <span className="block text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                            Verified letter
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-slate-800 dark:text-slate-200">{item.cgpa}</p>
                        <p className="text-[10px] text-slate-400">{item.cgpaSystem}</p>
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {item.ielts}
                      </td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-300">
                        {item.workExp}
                      </td>
                      <td className="py-4 px-4 text-slate-500 dark:text-slate-400 font-mono">
                        {item.intake}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* SUBMIT MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-2xl text-start space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Share your decision
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Help fellow Pakistani applicants understand honest admission odds
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
                ✓ Thank you! Your submission has been added anonymously to the community database.
              </div>
            ) : (
              <form onSubmit={handleAddRecord} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Programme
                  </label>
                  <input
                    type="text"
                    required
                    value={newProg}
                    onChange={(e) => setNewProg(e.target.value)}
                    placeholder="e.g. MSc Data Engineering"
                    className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    University
                  </label>
                  <input
                    type="text"
                    required
                    value={newUni}
                    onChange={(e) => setNewUni(e.target.value)}
                    placeholder="e.g. TU Darmstadt"
                    className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Decision</label>
                    <select
                      value={newDecision}
                      onChange={(e) => setNewDecision(e.target.value as any)}
                      className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white outline-none"
                    >
                      <option value="Admit">Admit</option>
                      <option value="Reject">Reject</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">CGPA (out of 4)</label>
                    <input
                      type="text"
                      value={newCgpa}
                      onChange={(e) => setNewCgpa(e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">IELTS Score</label>
                    <input
                      type="text"
                      value={newIelts}
                      onChange={(e) => setNewIelts(e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white outline-none"
                    />
                  </div>
                </div>

                <p className="text-[10px] text-slate-400">
                  🔒 All entries are completely anonymous. Never include your name or roll number.
                </p>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition"
                  >
                    Save anonymously
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
