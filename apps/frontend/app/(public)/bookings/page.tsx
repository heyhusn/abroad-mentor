'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/StudentSidebar';
import ThemeToggle from '@/components/ThemeToggle';

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState<'action' | 'upcoming' | 'past'>('action');
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const notifications = [
    {
      id: 'n1',
      title: 'Your session starts in 1 hour',
      desc: '60-min video call with Ayesha M. (21:00 PKT)',
      time: '10m ago',
      unread: true,
      icon: '📹',
      link: '/bookings/4812',
    },
    {
      id: 'n2',
      title: 'Usman K. accepted your request',
      desc: 'Pay by 21 Oct, 18:00 PKT to keep the time slot',
      time: '2h ago',
      unread: true,
      icon: '✓',
      link: '/payment',
    },
    {
      id: 'n3',
      title: 'New message from Ayesha M.',
      desc: '"I read the shortlist. Saarland has deadlines..."',
      time: '1d ago',
      unread: false,
      icon: '💬',
      link: '/messages',
    },
    {
      id: 'n4',
      title: 'Checklist updated',
      desc: 'New visa requirements for Germany added',
      time: 'Yesterday',
      unread: false,
      icon: '📋',
      link: '/country-guides',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* Shared Student Sidebar */}
      <StudentSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 dark:text-white">
              My bookings
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Notification Bell Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                aria-label="Notifications"
              >
                <span className="text-base">🔔</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900" />
                )}
              </button>

              {/* NOTIFICATIONS PANEL (Screen 2: My bookings · notifications open) */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl z-50 text-start overflow-hidden">
                  <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                        Notifications
                      </h3>
                      {unreadCount > 0 && (
                        <span className="rounded-full bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setUnreadCount(0)}
                      className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-[380px] overflow-y-auto">
                    {notifications.map((n) => (
                      <Link
                        key={n.id}
                        href={n.link}
                        onClick={() => setShowNotifications(false)}
                        className={`p-3.5 flex items-start gap-3 transition block hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                          n.unread ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''
                        }`}
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-xs">
                          {n.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {n.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                            {n.desc}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {n.time}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Settings</span>
                    <button
                      type="button"
                      onClick={() => setShowNotifications(false)}
                      className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar Pill */}
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                SK
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 sm:p-8 max-w-6xl w-full mx-auto space-y-6 text-start">
          {/* Header Row: Title & Find a mentor Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Good evening, Sara
              </h1>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Times are shown in Pakistan time (PKT)
              </p>
            </div>

            <Link
              href="/mentors"
              className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition"
            >
              <span>🔍</span>
              <span>Find a mentor</span>
            </Link>
          </div>

          {/* Urgent / Today Booking Hero Card */}
          <div className="rounded-2xl border-2 border-emerald-600/40 dark:border-emerald-500/40 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-sm font-bold text-emerald-800 dark:text-emerald-300">
                  AM
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
                      Happens today
                    </span>
                    <span className="text-xs text-slate-400">· Booking ID #4812</span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                    60-min video call with Ayesha M.
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Today 21:00 PKT (18:00 Berlin) · Link activates 10 min prior
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/bookings/4812"
                  className="rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  View details
                </Link>
                <Link
                  href="/bookings/4812"
                  className="rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 px-5 py-2 text-xs font-bold text-white shadow-xs transition"
                >
                  Join session →
                </Link>
              </div>
            </div>
          </div>

          {/* Bookings Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            {[
              { id: 'action', label: 'Needs your action (1)' },
              { id: 'upcoming', label: 'Upcoming (2)' },
              { id: 'past', label: 'Past' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Bookings List Cards */}
          <div className="space-y-3">
            {/* Booking 1: Usman K. (Needs Action: Accepted, Pay Now) */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 font-bold text-xs">
                  UK
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Usman K. · University of Manchester
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Credibility essay review · PKR 3,500
                  </p>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-1">
                    Sat 24 Oct · 16:00 PKT
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="text-start sm:text-right">
                  <span className="inline-block rounded-full bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 dark:text-amber-400">
                    Accepted: pay now
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Holds time slot until 21 Oct, 18:00
                  </p>
                </div>

                <Link
                  href="/payment"
                  className="rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-xs transition text-center"
                >
                  Pay PKR 3,750
                </Link>
              </div>
            </div>

            {/* Booking 2: Ali R. (Awaiting Reply) */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
                  AR
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Ali R. · RWTH Aachen
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    30-min video call · PKR 2,500
                  </p>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-1">
                    Sun 18 Oct · 20:00 PKT
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="text-start sm:text-right">
                  <span className="inline-block rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                    Awaiting reply
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Sent yesterday (expires in 2 days)
                  </p>
                </div>

                <Link
                  href="/bookings/4812"
                  className="rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition text-center"
                >
                  Details &amp; times
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Readiness & AI Assistant Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {/* Widget 1: Germany Checklist */}
            <Link
              href="/country-guides"
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-emerald-600/40 transition block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>🇩🇪</span>
                  <span>Germany checklist</span>
                </span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold group-hover:translate-x-0.5 transition">
                  →
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                4 of 12 steps done · Next: motivation letter and CV review
              </p>
            </Link>

            {/* Widget 2: Ask the AI Assistant */}
            <Link
              href="/assistant"
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-emerald-600/40 transition block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>✨</span>
                  <span>Ask the AI assistant</span>
                </span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold group-hover:translate-x-0.5 transition">
                  →
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Instant answers with verified official sources between mentorship calls
              </p>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
