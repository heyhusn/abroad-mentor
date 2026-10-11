'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Salam! I am your AI Study Abroad Assistant. I can help answer initial questions regarding university eligibility, German uni-assist rules, UK CAS requirements, or match you with a verified Pakistani mentor.',
    },
  ]);
  const [query, setQuery] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setQuery('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Great question regarding: "${userText}". Most German public universities require a minimum CGPA of 2.7-3.0 (German scale ~2.5), an IELTS of 6.5, and a valid VPD from uni-assist. We strongly recommend speaking with Ayesha M. (TU Berlin) who navigated this exact path from FAST Lahore.`,
        },
      ]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-start mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            AI Assistant
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Ask our study abroad advisor
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Get instant answers on country checklists, deadlines, and requirements.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col h-[520px] overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-start">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-lg rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#046a55] dark:bg-emerald-600 text-white rounded-br-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-xs border border-slate-200/50 dark:border-slate-700/50'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Suggestion Pills */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 flex flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={() => setQuery('How does uni-assist VPD work for Germany?')}
              className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1 text-[11px] text-slate-700 dark:text-slate-300 hover:border-emerald-600"
            >
              How does uni-assist VPD work?
            </button>
            <button
              type="button"
              onClick={() => setQuery('What is the minimum IELTS for TU Berlin?')}
              className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1 text-[11px] text-slate-700 dark:text-slate-300 hover:border-emerald-600"
            >
              Minimum IELTS for TU Berlin?
            </button>
            <Link
              href="/mentors/ayesha-m"
              className="rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300"
            >
              Talk to Ayesha M. →
            </Link>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSend}
            className="border-t border-slate-200 dark:border-slate-800 p-3 sm:p-4 bg-white dark:bg-slate-900 flex items-center gap-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about studying abroad..."
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition"
            />
            <button
              type="submit"
              className="rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition"
            >
              Ask
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
