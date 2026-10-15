'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BookSessionDetailsPage() {
  const t = useTranslations('BookingDetails');
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Form states - Empty by default, text provided as placeholders per user instruction
  const [goal, setGoal] = useState('');
  const [degree, setDegree] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAttachedFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/payment');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/mentors" className="hover:underline">Mentors</Link>
          <span>/</span>
          <Link href="/mentors/ayesha-m" className="hover:underline">Ayesha M.</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800 dark:text-white">Booking details</span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Form: Prep Questions & Goals */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm text-start">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Prepare for your session with Ayesha M.
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Help your mentor prepare so you get the most out of your time together.
              </p>

              <form onSubmit={handleProceed} className="mt-6 space-y-6">
                {/* 1. Goal / Topic textarea (Placeholder only, empty by default) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="goal">
                    What is the primary topic you want to cover?
                  </label>
                  <textarea
                    id="goal"
                    rows={4}
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="Reviewing my TU Berlin uni-assist application, blocked account choices, and finding student accommodation."
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 p-3.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition"
                  />
                </div>

                {/* 2. Targeted degree / intake (Placeholder only, empty by default) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="degree">
                    What degree/program are you targeting?
                  </label>
                  <input
                    id="degree"
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="MSc Computer Science / Winter 2027"
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition"
                  />
                </div>

                {/* 3. Document attachment dropzone with REAL file selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Optional: Attach your draft SOP, CV or module handbook
                  </label>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.docx,.doc,.txt"
                    className="hidden"
                  />

                  {/* Clickable drag-and-drop box */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition ${
                      isDragging
                        ? 'border-emerald-600 bg-emerald-50/50 dark:border-emerald-500 dark:bg-emerald-950/40'
                        : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 hover:border-emerald-600 dark:hover:border-emerald-500'
                    }`}
                  >
                    <span className="text-2xl mb-1.5 text-slate-400">📎</span>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Drag your document here or click to browse (PDF only, up to 10MB)
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="mt-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 underline underline-offset-2 hover:text-emerald-800"
                    >
                      Browse files
                    </button>
                  </div>

                  {/* Attached file chip - ONLY renders when user has chosen a file */}
                  {attachedFile && (
                    <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 p-3 text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <span>📄</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                          {attachedFile.name}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          ({(attachedFile.size / 1024).toFixed(0)} KB)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]">
                          ✓ Attached
                        </span>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          title="Remove attached file"
                          className="h-5 w-5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 py-3 text-sm font-bold text-white shadow-sm transition"
                  >
                    Proceed to secure payment →
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Summary Card */}
          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm text-start space-y-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                Session Summary
              </h2>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 font-bold text-emerald-800 dark:text-emerald-300">
                  AM
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Ayesha M.</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">MSc CS · TU Berlin</p>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Date</span>
                  <span className="font-semibold text-slate-800 dark:text-white">Tuesday, 24 October</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Time</span>
                  <span className="font-semibold text-slate-800 dark:text-white">20:00 PKT (17:00 Berlin)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Duration</span>
                  <span className="font-semibold text-slate-800 dark:text-white">45 minutes video call</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-2 text-sm">
                  <span className="font-bold text-slate-900 dark:text-white">Total</span>
                  <span className="font-extrabold text-emerald-700 dark:text-emerald-400">PKR 3,000</span>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                🔒 Safe payments: We hold your PKR 3,000 in escrow and pay the mentor weekly after you confirm your call.
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
