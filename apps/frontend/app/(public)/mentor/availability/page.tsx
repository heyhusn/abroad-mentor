'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function AvailabilityPricingPage() {
  const [mentorName, setMentorName] = useState('Sara Khan');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored =
        sessionStorage.getItem('registered_name') ||
        localStorage.getItem('registered_name') ||
        localStorage.getItem('user_name');
      if (stored && stored.trim()) {
        setMentorName(stored.trim());
      }
    }
  }, []);

  const [selectedDays, setSelectedDays] = useState<string[]>(['Mon', 'Wed', 'Fri', 'Sat']);
  const [services, setServices] = useState([
    { id: 's1', name: '30-min intro call', time: '30 min', price: 3150, active: true },
    { id: 's2', name: '60-min video call & profile review', time: '60 min', price: 5250, active: true },
    { id: 's3', name: 'SOP & motivation letter review (written)', time: '3 days', price: 4200, active: true },
    { id: 's4', name: 'Visa & blocked account guidance', time: '45 min', price: 3800, active: true },
  ]);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = ['18:00', '19:00', '20:00', '21:00', '22:00'];

  // Slot grid state
  const [activeSlots, setActiveSlots] = useState<{ [key: string]: boolean }>({
    'Mon-20:00': true,
    'Mon-21:00': true,
    'Wed-19:00': true,
    'Wed-20:00': true,
    'Fri-20:00': true,
    'Fri-21:00': true,
    'Sat-18:00': true,
    'Sat-19:00': true,
  });

  const toggleSlot = (key: string) => {
    setActiveSlots((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* Mentor Sidebar */}
      <aside className="w-60 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] flex flex-col justify-between min-h-screen text-start p-4">
        <div>
          <div className="flex items-center gap-2.5 mb-6">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-700 text-white font-bold text-xs">
              M
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              Study Abroad Mentor
            </span>
          </div>

          <div className="space-y-1 text-xs font-semibold">
            <Link
              href="/mentor/dashboard"
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 block"
            >
              <span>📊</span>
              <span>Overview</span>
            </Link>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold flex items-center gap-2">
              <span>📅</span>
              <span>Availability &amp; prices</span>
            </div>
            <Link
              href="/messages"
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 block"
            >
              <span>💬</span>
              <span>Messages</span>
            </Link>
            <Link
              href="/mentor/dashboard/action-needed"
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 block"
            >
              <span>⚡</span>
              <span>Requests</span>
            </Link>
          </div>
        </div>

        {/* Mentor Profile Footer */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
            {mentorName.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold truncate">{mentorName}</p>
            <p className="text-[10px] text-slate-400">Mentor &middot; Active workspace</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white">
            Availability and prices
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-10 max-w-5xl w-full mx-auto space-y-8 text-start">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Availability and prices
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Your weekly schedule is shown to students in Pakistan Time (PKT).
              </p>
            </div>

            <button
              type="button"
              onClick={() => alert('Schedule saved!')}
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition"
            >
              Save changes
            </button>
          </div>

          {/* Weekly Time Grid */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Weekly hours (PKT)
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-center text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="py-2.5 px-3 text-left font-bold text-slate-400">Time</th>
                    {days.map((d) => (
                      <th key={d} className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-300">
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {hours.map((h) => (
                    <tr key={h}>
                      <td className="py-3 px-3 text-left font-mono font-bold text-slate-500">
                        {h}
                      </td>
                      {days.map((d) => {
                        const key = `${d}-${h}`;
                        const isAvailable = activeSlots[key];
                        return (
                          <td key={d} className="py-2 px-1">
                            <button
                              type="button"
                              onClick={() => toggleSlot(key)}
                              className={`w-full py-2 rounded-xl text-[11px] font-bold transition ${
                                isAvailable
                                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-400 hover:bg-slate-100'
                              }`}
                            >
                              {isAvailable ? 'Open' : '-'}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Services & Pricing Table */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Your services
              </h2>
              <button
                type="button"
                onClick={() => alert('Add service flow')}
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                + Add service
              </button>
            </div>

            <div className="space-y-3">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{srv.name}</p>
                    <p className="text-[11px] text-slate-400">Typical duration: {srv.time}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      PKR {srv.price.toLocaleString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => alert(`Edit ${srv.name}`)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Payout note */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <p className="font-bold text-emerald-900 dark:text-emerald-300">💡 100% Payout Protection</p>
              <p>Payment is guaranteed in escrow before any session begins and paid to your Pakistani bank within 48 hours of completion.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
