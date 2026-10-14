'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function StudentSidebar() {
  const pathname = usePathname();

  const isBookingsActive = pathname.startsWith('/bookings') || pathname === '/student/bookings';
  const isMessagesActive = pathname.startsWith('/messages');
  const isMentorsActive = pathname.startsWith('/mentors');

  return (
    <aside className="w-60 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] flex flex-col justify-between min-h-screen text-start transition-colors duration-200">
      <div>
        {/* Brand / Logo */}
        <div className="h-16 flex items-center px-5 border-b border-slate-100 dark:border-slate-800/80">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#046a55] dark:bg-emerald-600 text-white shadow-xs">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </span>
            <span className="text-xs font-bold tracking-tight text-slate-900 dark:text-white">
              Study Abroad Mentor
            </span>
          </Link>
        </div>

        {/* Navigation list */}
        <div className="px-3 py-4 space-y-6">
          {/* Main Items */}
          <div className="space-y-1">
            <Link
              href="/bookings"
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition ${
                isBookingsActive
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium'
              }`}
            >
              <span>📅</span>
              <span>My bookings</span>
            </Link>

            <Link
              href="/mentors"
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition ${
                isMentorsActive
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium'
              }`}
            >
              <span>🔍</span>
              <span>Find mentors</span>
            </Link>

            <Link
              href="/messages"
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition ${
                isMessagesActive
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <span>💬</span>
                <span>Messages</span>
              </div>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                1
              </span>
            </Link>
          </div>

          {/* Section: AI TOOLS */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              AI Tools
            </div>

            <Link
              href="/assistant"
              className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs transition ${
                pathname === '/assistant'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium'
              }`}
            >
              <span>✨</span>
              <span>AI Assistant</span>
            </Link>

            <Link
              href="/checklist"
              className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs transition ${
                pathname === '/checklist'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium'
              }`}
            >
              <span>📋</span>
              <span>Checklist &amp; roadmap</span>
            </Link>

            <Link
              href="/scholarships"
              className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs transition ${
                pathname === '/scholarships'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium'
              }`}
            >
              <span>🎓</span>
              <span>Scholarships</span>
            </Link>

            <Link
              href="/professor-finder"
              className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs transition ${
                pathname === '/professor-finder'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium'
              }`}
            >
              <span>🔬</span>
              <span>Professor finder</span>
            </Link>

            <Link
              href="/housing"
              className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs transition ${
                pathname === '/housing'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium'
              }`}
            >
              <span>🏠</span>
              <span>Housing</span>
            </Link>
          </div>

          {/* Section: COMMUNITY */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              Community
            </div>

            <Link
              href="/communities"
              className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs transition ${
                pathname === '/communities'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium'
              }`}
            >
              <span>👥</span>
              <span>Communities</span>
            </Link>

            <Link
              href="/admits-rejects"
              className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs transition ${
                pathname === '/admits-rejects'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium'
              }`}
            >
              <span>📊</span>
              <span>Admits &amp; rejects</span>
            </Link>
          </div>

          {/* Section: ACCOUNT */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              Account
            </div>

            <Link
              href="/bookings"
              className="flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium"
            >
              <span>🔔</span>
              <span>Notifications</span>
            </Link>

            <Link
              href="/payment"
              className="flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium"
            >
              <span>💳</span>
              <span>Payments &amp; receipts</span>
            </Link>

            <Link
              href="/ask-senior"
              className="flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium"
            >
              <span>❓</span>
              <span>Help &amp; support</span>
            </Link>

            <Link
              href="/emails"
              className="flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium"
            >
              <span>✉️</span>
              <span>Email templates</span>
            </Link>
          </div>
        </div>
      </div>

      {/* User profile footer */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-slate-50/70 dark:bg-slate-800/40">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-xs font-bold text-emerald-800 dark:text-emerald-300">
            SK
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
              Sara K.
            </p>
            <p className="text-[10px] text-slate-400 truncate">Student</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
