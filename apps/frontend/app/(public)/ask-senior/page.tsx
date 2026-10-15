'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AskSeniorPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const defaultQuestion =
    "I have a BS in Computer Science from FAST Lahore with a CGPA around 3.1. Is it worth applying to TU Berlin's MSc Computer Science, or should I focus on Saarland and RWTH? Which part of my application matters most for TU Berlin?";

  const [question, setQuestion] = useState(defaultQuestion);
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
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/payment');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Top Back Link */}
        <div className="mb-6 text-start">
          <Link
            href="/mentors/ayesha-m"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
          >
            <span>←</span>
            <span>Ayesha&apos;s profile</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-start mb-8">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            ASK A SENIOR
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Ask Ayesha one question in writing
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Good for a single, specific question. Ayesha replies in writing within 3 days, or you get a full refund.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Question Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs text-start space-y-6">
              {/* Question Textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2" htmlFor="question">
                  Your question
                </label>
                <textarea
                  id="question"
                  rows={6}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  maxLength={1000}
                  placeholder="Be specific: your degree, CGPA range and the programmes you mean."
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 p-3.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition leading-relaxed"
                />
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Be specific: your degree, CGPA range and the programmes you mean.</span>
                  <span>{question.length} / 1,000</span>
                </div>
              </div>

              {/* Attach a document */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Attach a document
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Optional · PDF, up to 5 MB
                  </span>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.doc"
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`flex items-center justify-center gap-2 rounded-xl border border-dashed p-4 text-center cursor-pointer transition ${
                    isDragging
                      ? 'border-emerald-600 bg-emerald-50/50 dark:border-emerald-500 dark:bg-emerald-950/40'
                      : 'border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40 hover:border-emerald-600 dark:hover:border-emerald-500'
                  }`}
                >
                  <span className="text-slate-500 text-sm">⇪</span>
                  <span className="text-xs text-slate-600 dark:text-slate-300">
                    Drop a CV or SOP draft, or{' '}
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold underline underline-offset-2">
                      choose a file
                    </span>
                  </span>
                </div>

                {attachedFile && (
                  <div className="mt-2.5 flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 p-2.5 text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <span>📄</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                        {attachedFile.name}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        ({(attachedFile.size / 1024).toFixed(0)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="h-5 w-5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center text-xs"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* What mentors can't answer (Compliance notice) */}
              <div className="rounded-xl border border-blue-100 dark:border-blue-900/50 bg-blue-50/60 dark:bg-blue-950/30 p-4 flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 text-sm mt-0.5 font-bold">ⓘ</span>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    What mentors can&apos;t answer
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    Questions about your visa chances, filling in visa forms, or what to do after a visa refusal. Ayesha will point you to official sources instead.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Escrow Sidebar */}
          <aside className="lg:col-span-5 space-y-4">
            {/* Mentor Info Mini-Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex items-center gap-3.5 text-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                AM
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Ayesha M.
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  MSc Computer Science · TU Berlin
                </p>
              </div>
            </div>

            {/* Pricing & Checkout Box */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs text-start space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Written answer</span>
                  <span className="font-semibold text-slate-900 dark:text-white">PKR 1,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Service fee (5%)</span>
                  <span className="font-semibold text-slate-900 dark:text-white">PKR 60</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-sm">
                  <span className="font-bold text-slate-900 dark:text-white">Total</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">PKR 1,260</span>
                </div>
              </div>

              {/* Escrow badge */}
              <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-3.5 flex items-start gap-2.5">
                <span className="text-emerald-700 dark:text-emerald-400 text-xs mt-0.5">🛡️</span>
                <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                  We hold your payment until you confirm the session. If the mentor doesn&apos;t show, you get a full refund.
                </p>
              </div>

              {/* Submit / Pay CTA */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 py-3 text-xs font-bold text-white shadow-xs transition"
              >
                Pay PKR 1,260 and send
              </button>

              <p className="text-center text-[11px] text-slate-400 leading-snug">
                Answered within 3 days, or a full refund. You can ask one follow-up for free.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
