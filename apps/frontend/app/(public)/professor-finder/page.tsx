'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/StudentSidebar';
import ThemeToggle from '@/components/ThemeToggle';

interface Professor {
  id: string;
  name: string;
  university: string;
  city: string;
  country: string;
  focusArea: string;
  recentPaper: string;
  matchScore: string;
  activeLab: boolean;
  email: string;
}

export default function ProfessorFinderPage() {
  const [researchTopic, setResearchTopic] = useState('Distributed systems, fault tolerance, consensus protocols in edge networks');
  const [targetCountry, setTargetCountry] = useState('Germany');
  const [selectedProf, setSelectedProf] = useState<Professor | null>(null);

  // Email draft state
  const [draftSubject, setDraftSubject] = useState('Prospective MSc thesis research / Student assistant enquiry - Sara K.');
  const [draftBody, setDraftBody] = useState(
    `Dear Prof. Dr. Schmidt,\n\nI am a prospective MSc Computer Science student applying for Autumn 2027. I have closely followed your lab's recent work on Byzantine fault-tolerant consensus in distributed edge clusters.\n\nDuring my undergraduate work at FAST Lahore, I built an evaluation prototype measuring leader-election latency under adversarial node drops. I would love to explore thesis research opportunities or student assistant (HiWi) positions in your chair.\n\nAttached are my academic transcript and tabular CV for your review.\n\nSincerely,\nSara K.`
  );
  const [copied, setCopied] = useState(false);

  const professors: Professor[] = [
    {
      id: 'p1',
      name: 'Prof. Dr. Klaus Schmidt',
      university: 'TU Berlin',
      city: 'Berlin',
      country: 'Germany',
      focusArea: 'Distributed Systems & Operating Systems Chair',
      recentPaper: 'Adaptive Quorum Sizing for Latency-Sensitive Edge Byzantine Networks (2025)',
      matchScore: '97% match',
      activeLab: true,
      email: 'schmidt@tu-berlin.de',
    },
    {
      id: 'p2',
      name: 'Prof. Dr. Elena Fischer',
      university: 'RWTH Aachen University',
      city: 'Aachen',
      country: 'Germany',
      focusArea: 'Communication Systems & Distributed Computing',
      recentPaper: 'Fault-tolerant Consensus in Asynchronous Peer-to-Peer Storage (2024)',
      matchScore: '92% match',
      activeLab: true,
      email: 'fischer@comsys.rwth-aachen.de',
    },
    {
      id: 'p3',
      name: 'Dr. James H. Crawford',
      university: 'University of Manchester',
      city: 'Manchester',
      country: 'United Kingdom',
      focusArea: 'Advanced Computer Systems Group',
      recentPaper: 'Decentralized Coordination in Partitioned Mesh Architectures (2025)',
      matchScore: '89% match',
      activeLab: true,
      email: 'j.crawford@manchester.ac.uk',
    },
  ];

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(`Subject: ${draftSubject}\n\n${draftBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      <StudentSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 dark:text-white">Professor finder</span>
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
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Find professors who match your research
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              AI maps public university lab publications, active chairs, and PhD/HiWi openings. Generates tailored cold-email drafts referencing their recent papers.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-7 space-y-1">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                Your research interests / keywords:
              </label>
              <input
                type="text"
                value={researchTopic}
                onChange={(e) => setResearchTopic(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                Country:
              </label>
              <select
                value={targetCountry}
                onChange={(e) => setTargetCountry(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option>Germany</option>
                <option>United Kingdom</option>
                <option>Both</option>
              </select>
            </div>

            <div className="md:col-span-2 pt-4 md:pt-0">
              <button
                type="button"
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition"
              >
                Find matches
              </button>
            </div>
          </div>

          {/* Two Columns: Matches List & Cold-email Drafter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Professor Matches */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Top recommendations for your topic:</span>
                <span className="font-semibold">{professors.length} professors found</span>
              </div>

              {professors.map((prof) => (
                <div
                  key={prof.id}
                  className={`p-5 rounded-3xl border transition text-start space-y-3 cursor-pointer ${
                    selectedProf?.id === prof.id
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-500'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                  onClick={() => {
                    setSelectedProf(prof);
                    setDraftSubject(`Prospective MSc research / Inquiry regarding ${prof.focusArea} - Sara K.`);
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                        {prof.name}
                      </h2>
                      <p className="text-xs text-emerald-800 dark:text-emerald-400 font-semibold mt-0.5">
                        {prof.university} · {prof.city}, {prof.country}
                      </p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {prof.matchScore}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Chair: </span>
                    {prof.focusArea}
                  </p>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 text-[11px] space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      Recent Publication:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 font-medium italic">
                      "{prof.recentPaper}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <span>✉️</span>
                      <span>Draft email</span>
                    </button>

                    <a
                      href={`mailto:${prof.email}`}
                      className="text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-600"
                    >
                      {prof.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: AI Cold Email Drafter */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Email draft
                </span>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                  ✨ AI generated
                </span>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">To:</label>
                <input
                  type="text"
                  disabled
                  value={selectedProf ? `${selectedProf.name} <${selectedProf.email}>` : 'Prof. Dr. Klaus Schmidt <schmidt@tu-berlin.de>'}
                  className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-2 text-slate-700 dark:text-slate-300 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">Subject:</label>
                <input
                  type="text"
                  value={draftSubject}
                  onChange={(e) => setDraftSubject(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">Body:</label>
                <textarea
                  rows={10}
                  value={draftBody}
                  onChange={(e) => setDraftBody(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-3 text-slate-900 dark:text-slate-100 leading-relaxed outline-none focus:ring-2 focus:ring-emerald-600 font-sans"
                />
              </div>

              {/* Tips Callout */}
              <div className="p-3 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                <p className="font-bold text-emerald-900 dark:text-emerald-300">💡 Mentor tip:</p>
                <p>Keep cold emails under 200 words. German professors prioritize your transcript and specific connection to their papers over general compliments.</p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCopyDraft}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5"
                >
                  <span>{copied ? '✓ Copied' : '📋 Copy email draft'}</span>
                </button>

                <a
                  href={`mailto:${selectedProf?.email || 'schmidt@tu-berlin.de'}?subject=${encodeURIComponent(draftSubject)}&body=${encodeURIComponent(draftBody)}`}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 transition"
                >
                  Open in mail client ↗
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
