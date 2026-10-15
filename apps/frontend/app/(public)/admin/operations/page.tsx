'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

type AdminTab =
  | 'verification'
  | 'payments'
  | 'payouts'
  | 'disputes'
  | 'moderation'
  | 'fact_cards'
  | 'metrics'
  | 'platform';

export default function AdminOperationsPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('metrics');
  const [timeRange, setTimeRange] = useState('Last 30 days');
  const [is2FaEnabled, setIs2FaEnabled] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const enabled =
        localStorage.getItem('admin_2fa_enabled') === 'true' ||
        sessionStorage.getItem('admin_2fa_enabled') === 'true';
      setIs2FaEnabled(enabled);
    }
  }, []);

  // Platform kill switches (from Screen 9)
  const [platformSwitches, setPlatformSwitches] = useState({
    pauseBookings: false,
    manualMarkPaid: true,
    aiAssistant: true,
    newSignups: true,
  });

  // Disputes list (actual 1 dispute)
  const [disputesList, setDisputesList] = useState([
    {
      id: 'd1',
      bookingId: 'Booking #4812',
      reason: 'Mentor No-Show',
      details: 'Student Sara Khan reported mentor did not attend call on Fri 23 Oct. Escrow holds PKR 5,250.',
      amount: 'PKR 5,250',
    },
  ]);

  // Screen 5: Verification states
  const [verificationList, setVerificationList] = useState([
    {
      id: 'v1',
      name: 'Maryam K.',
      uni: 'University of Münster',
      docType: 'Enrolment certificate',
      submitted: '4h ago',
      status: 'Waiting for review',
      docName: 'Enrolment_letter_2026.pdf',
      docMatch: true,
      expiry: '31 March 2027',
    },
    {
      id: 'v2',
      name: 'Hamza A.',
      uni: 'TU Munich (TUM)',
      docType: 'Degree certificate',
      submitted: '1d ago',
      status: 'Waiting for review',
      docName: 'TUM_Degree_Certified.pdf',
      docMatch: true,
      expiry: 'Permanent',
    },
    {
      id: 'v3',
      name: 'Ahmed N.',
      uni: 'University of Birmingham',
      docType: 'CAS confirmation / Visa',
      submitted: 'Yesterday',
      status: 'Waiting for review',
      docName: 'UKVI_BRP_Visa.pdf',
      docMatch: true,
      expiry: '15 Jan 2027',
    },
  ]);
  const [selectedVerification, setSelectedVerification] = useState(verificationList[0]);

  // Screen 6: Moderation states
  const [flaggedPosts, setFlaggedPosts] = useState([
    {
      id: 'm1',
      channel: 'Pakistan ➔ Germany',
      excerpt: '"Pay me fee by WhatsApp: +92 300 1234567 for guaranteed visa"',
      reason: 'Off-platform payment solicitation',
      severity: 'High severity',
    },
    {
      id: 'm2',
      channel: 'Visa waitlists & timelines',
      excerpt: '"My agent has a backdoor connection with the embassy in Islamabad"',
      reason: 'Fraudulent claims',
      severity: 'Medium',
    },
    {
      id: 'm3',
      channel: 'Housing in Berlin',
      excerpt: '"Deposit 3 months rent in Western Union before viewing flat"',
      reason: 'Scam warning',
      severity: 'High severity',
    },
  ]);

  // Screen 7: Fact cards states
  const [factCards] = useState([
    {
      id: 'fc1',
      title: 'German blocked account monthly requirement',
      value: '€992 / month (€11,904 / year total)',
      source: 'auswaertiges-amt.de',
      status: 'Verified Oct 2026',
    },
    {
      id: 'fc2',
      title: 'uni-assist VPD initial application fee',
      value: '€75 first course, €30 each additional',
      source: 'uni-assist.de',
      status: 'Verified Oct 2026',
    },
  ]);

  // Screen 10: Confirm refund modal state
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundAmount] = useState('PKR 5,250');
  const [refundRecipient] = useState('Sara Khan (Booking #4812)');
  const [refundApproved, setRefundApproved] = useState(false);

  // Dynamic Funnel Metrics strictly tracking real interaction counts
  const [funnelCounts, setFunnelCounts] = useState({
    visited: 1,
    signedUp: 1,
    bookingReq: 0,
    paid: 0,
    confirmed: 0,
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasRegistered =
        localStorage.getItem('registered_name') ||
        sessionStorage.getItem('registered_name') ||
        localStorage.getItem('registered_email');
      const visited = Math.max(1, parseInt(localStorage.getItem('metrics_visited_directory') || '1', 10));
      const signedUp = hasRegistered ? 1 : 0;
      const bookingReq = parseInt(localStorage.getItem('metrics_booking_requests') || '0', 10);
      const paid = parseInt(localStorage.getItem('metrics_paid') || '0', 10);
      const confirmed = parseInt(localStorage.getItem('metrics_sessions_confirmed') || '0', 10);

      setFunnelCounts({
        visited,
        signedUp,
        bookingReq,
        paid,
        confirmed,
      });
    }
  }, []);

  const maxVal = Math.max(funnelCounts.visited, 1);
  const funnelStages = [
    {
      label: 'Visited the directory',
      value: String(funnelCounts.visited),
      pctWidth: Math.round((funnelCounts.visited / maxVal) * 100),
      prevPct: null,
    },
    {
      label: 'Signed up',
      value: String(funnelCounts.signedUp),
      pctWidth: Math.round((funnelCounts.signedUp / maxVal) * 100),
      prevPct: funnelCounts.visited > 0 ? `${Math.round((funnelCounts.signedUp / funnelCounts.visited) * 100)}% of prev.` : null,
    },
    {
      label: 'Sent a booking request',
      value: String(funnelCounts.bookingReq),
      pctWidth: Math.round((funnelCounts.bookingReq / maxVal) * 100),
      prevPct: funnelCounts.signedUp > 0 ? `${Math.round((funnelCounts.bookingReq / funnelCounts.signedUp) * 100)}% of prev.` : '0% of prev.',
    },
    {
      label: 'Paid',
      value: String(funnelCounts.paid),
      pctWidth: Math.round((funnelCounts.paid / maxVal) * 100),
      prevPct: funnelCounts.bookingReq > 0 ? `${Math.round((funnelCounts.paid / funnelCounts.bookingReq) * 100)}% of prev.` : '0% of prev.',
    },
    {
      label: 'Confirmed the session',
      value: String(funnelCounts.confirmed),
      pctWidth: Math.round((funnelCounts.confirmed / maxVal) * 100),
      prevPct: funnelCounts.paid > 0 ? `${Math.round((funnelCounts.confirmed / funnelCounts.paid) * 100)}% of prev.` : '0% of prev.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* Admin Left Sidebar matching Figma design */}
      <aside className="w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] flex flex-col justify-between min-h-screen text-start p-4 select-none">
        <div className="space-y-6">
          {/* Brand header */}
          <Link href="/" className="flex items-center gap-2.5 px-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-700 text-white shadow-xs">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </span>
            <span className="text-xs font-bold tracking-tight text-slate-900 dark:text-white">
              Study Abroad Mentor
            </span>
          </Link>

          {/* Top Admin Section */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab('metrics')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'metrics' || activeTab === 'platform' || activeTab === 'verification'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span>🛡️</span>
                <span>Operations</span>
              </div>
              <span className="flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                {verificationList.length + disputesList.length + flaggedPosts.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('disputes')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition ${
                activeTab === 'disputes'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 font-semibold text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span>⚖️</span>
                <span>Cases &amp; disputes</span>
              </div>
              <span className="flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                {disputesList.length}
              </span>
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              <div className="flex items-center gap-2.5">
                <span>📥</span>
                <span>Support inbox</span>
              </div>
              <span className="text-[10px] text-slate-400">0</span>
            </button>
          </div>

          {/* Group: PEOPLE */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">PEOPLE</p>
            <div className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 cursor-pointer">
              <span>👥</span>
              <span>Users</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 cursor-pointer">
              <span>🔑</span>
              <span>Team &amp; roles</span>
            </div>
          </div>

          {/* Group: MONEY */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">MONEY</p>
            <div className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 cursor-pointer">
              <span>💳</span>
              <span>Finance &amp; reports</span>
            </div>
          </div>

          {/* Group: GROWTH */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">GROWTH</p>
            <div className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 cursor-pointer">
              <span>🌱</span>
              <span>Mentor sourcing</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 cursor-pointer">
              <span>🎯</span>
              <span>Lead review</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 cursor-pointer">
              <span>📢</span>
              <span>Outreach</span>
            </div>
          </div>

          {/* Group: COMPLIANCE */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">COMPLIANCE</p>
            <div className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 cursor-pointer">
              <span>⏱</span>
              <span>Audit log</span>
            </div>
            <Link
              href="/communities"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5"
            >
              <span>🏛</span>
              <span>Communities</span>
            </Link>
          </div>
        </div>

        {/* Staff User Footer (Husnain A. · Admin 2FA on) */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 px-2 py-1.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
              HA
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                Husnain A.
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {is2FaEnabled ? 'Admin · 2FA on' : 'Admin · 2FA pending'}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Operations Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Admin</span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              type="button"
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Notifications"
            >
              🔔
            </button>
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Exit admin"
            >
              Exit ↗
            </Link>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 p-6 sm:p-10 max-w-6xl w-full mx-auto space-y-6 text-start">
          {/* Heading with 2-step verification badge */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Operations</h1>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Every action here is logged with your name and the time.
              </p>
            </div>

            {is2FaEnabled && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-medium text-emerald-800 dark:text-emerald-300">
                <span>✓</span>
                <span>2-step verification on</span>
              </span>
            )}
          </div>

          {/* Sub-tabs row matching Figma Screen 8 & 9 exactly */}
          <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold pb-1">
            {[
              { id: 'verification', label: `Verification (${verificationList.length})` },
              { id: 'payments', label: 'Payments' },
              { id: 'payouts', label: 'Payouts' },
              { id: 'disputes', label: `Disputes (${disputesList.length})` },
              { id: 'moderation', label: `Moderation (${flaggedPosts.length})` },
              { id: 'fact_cards', label: `Fact cards (${factCards.length})` },
              { id: 'metrics', label: 'Metrics' },
              { id: 'platform', label: 'Platform' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`pb-3 transition relative ${
                  activeTab === tab.id
                    ? 'text-emerald-800 dark:text-emerald-400 font-bold border-b-2 border-emerald-700 dark:border-emerald-500 -mb-[1px]'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB: METRICS (Figma Screen 8) */}
          {activeTab === 'metrics' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Booking funnel &middot; last 30 days
                </h2>

                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                  <option>Last 90 days</option>
                  <option>All time</option>
                </select>
              </div>

              {/* Metrics Card matching Figma Screen 8 */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="space-y-5">
                  {funnelStages.map((stage) => (
                    <div key={stage.label} className="grid grid-cols-12 items-center gap-4 text-xs">
                      {/* Left stage title */}
                      <div className="col-span-3 text-slate-700 dark:text-slate-300 font-medium">
                        {stage.label}
                      </div>

                      {/* Bar indicator */}
                      <div className="col-span-6 bg-slate-100 dark:bg-slate-800 rounded-full h-7 overflow-hidden flex items-center p-0.5">
                        <div
                          className="bg-emerald-700 dark:bg-emerald-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(stage.pctWidth, 3)}%` }}
                        />
                      </div>

                      {/* Value and prev % conversion */}
                      <div className="col-span-3 flex items-center gap-3">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          {stage.value}
                        </span>
                        {stage.prevPct && (
                          <span className="text-[11px] text-slate-400">
                            {stage.prevPct}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-slate-400 dark:text-slate-500 text-start">
                Sample numbers. Events are first-party only, with no cookies.
              </p>
            </div>
          )}

          {/* TAB: PLATFORM / KILL SWITCHES (Figma Screen 9) */}
          {activeTab === 'platform' && (
            <div className="space-y-6">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Kill switches
              </h2>

              <div className="space-y-3">
                {/* Switch 1: Pause new bookings */}
                <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Pause new bookings</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Shows a banner on the directory. Booked sessions go ahead.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={platformSwitches.pauseBookings}
                    onClick={() =>
                      setPlatformSwitches((prev) => ({
                        ...prev,
                        pauseBookings: !prev.pauseBookings,
                      }))
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      platformSwitches.pauseBookings
                        ? 'bg-emerald-600'
                        : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        platformSwitches.pauseBookings ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Switch 2: Manual 'mark paid' fallback */}
                <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Manual &apos;mark paid&apos; fallback</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Use when the Safepay webhook is down.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={platformSwitches.manualMarkPaid}
                    onClick={() =>
                      setPlatformSwitches((prev) => ({
                        ...prev,
                        manualMarkPaid: !prev.manualMarkPaid,
                      }))
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      platformSwitches.manualMarkPaid
                        ? 'bg-emerald-600'
                        : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        platformSwitches.manualMarkPaid ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Switch 3: AI assistant */}
                <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">AI assistant</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Turn off if answers look wrong or costs spike.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={platformSwitches.aiAssistant}
                    onClick={() =>
                      setPlatformSwitches((prev) => ({
                        ...prev,
                        aiAssistant: !prev.aiAssistant,
                      }))
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      platformSwitches.aiAssistant
                        ? 'bg-emerald-600'
                        : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        platformSwitches.aiAssistant ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Switch 4: New sign-ups */}
                <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">New sign-ups</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Turn off to stop spam waves.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={platformSwitches.newSignups}
                    onClick={() =>
                      setPlatformSwitches((prev) => ({
                        ...prev,
                        newSignups: !prev.newSignups,
                      }))
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      platformSwitches.newSignups
                        ? 'bg-emerald-600'
                        : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        platformSwitches.newSignups ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 dark:text-slate-500 text-start">
                Every switch change is logged and both admins get an email.
              </p>
            </div>
          )}

          {/* TAB: VERIFICATION (Figma Screen 5) */}
          {activeTab === 'verification' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 font-bold text-xs text-slate-500 uppercase">
                  Pending Mentor Credential Documents
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {verificationList.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedVerification(item)}
                      className={`p-4 flex items-center justify-between cursor-pointer transition ${
                        selectedVerification.id === item.id
                          ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-emerald-600'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                        <p className="text-[11px] text-slate-500">{item.uni}</p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                          {item.docType}
                        </span>
                        <span className="block text-[10px] text-slate-400 mt-1">{item.submitted}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Document Inspector
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                    {selectedVerification.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {selectedVerification.name}
                  </h4>
                  <p className="text-xs text-slate-500">{selectedVerification.uni}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Document:</span>
                    <span className="font-semibold">{selectedVerification.docName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Name match:</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓ 100% match</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Enrolment valid until:</span>
                    <span className="font-semibold">{selectedVerification.expiry}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setVerificationList((prev) => prev.filter((v) => v.id !== selectedVerification.id));
                      alert('Verification approved! Mentor is now active.');
                    }}
                    className="flex-1 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs"
                  >
                    ✓ Approve enrolment
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Requesting document re-upload from mentor.')}
                    className="px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-50"
                  >
                    Request re-upload
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: DISPUTES & REFUNDS */}
          {activeTab === 'disputes' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">Booking #4812</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                      Mentor No-Show
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Student Sara Khan reported mentor did not attend call on Fri 23 Oct. Escrow holds PKR 5,250.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowRefundModal(true)}
                  className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs whitespace-nowrap"
                >
                  Review refund →
                </button>
              </div>
            </div>
          )}

          {/* TAB: MODERATION */}
          {activeTab === 'moderation' && (
            <div className="space-y-3">
              {flaggedPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{post.channel}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                        {post.severity}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200 mt-1 italic">
                      {post.excerpt}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Reason: {post.reason}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFlaggedPosts((prev) => prev.filter((p) => p.id !== post.id))}
                    className="px-3.5 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-50 whitespace-nowrap"
                  >
                    Delete post
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB: FACT CARDS */}
          {activeTab === 'fact_cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {factCards.map((fc) => (
                <div key={fc.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">{fc.title}</span>
                    <span className="text-emerald-600 font-semibold">{fc.status}</span>
                  </div>
                  <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 p-2.5 rounded-xl">
                    {fc.value}
                  </p>
                  <p className="text-[11px] text-slate-400">Source: {fc.source}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB: PAYMENTS & PAYOUTS FALLBACK */}
          {(activeTab === 'payments' || activeTab === 'payouts') && (
            <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-2">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Safepay Escrow Gateway Active
              </p>
              <p className="text-xs text-slate-500">
                All mentor disbursements are scheduled automatically every Tuesday.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* SCREEN 10: CONFIRM REFUND MODAL */}
      {showRefundModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-2xl text-start space-y-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Approve a 100% refund?
            </h3>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Refund amount:</span>
                <span className="font-bold text-slate-900 dark:text-white">{refundAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Beneficiary:</span>
                <span className="font-bold text-slate-900 dark:text-white">{refundRecipient}</span>
              </div>
            </div>

            {refundApproved ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-xs text-emerald-800 dark:text-emerald-300 font-bold">
                ✓ Refund of PKR 5,250 dispatched to Sara&apos;s original payment method.
              </div>
            ) : (
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRefundModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRefundApproved(true);
                    setTimeout(() => setShowRefundModal(false), 1400);
                  }}
                  className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition"
                >
                  Confirm refund
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
