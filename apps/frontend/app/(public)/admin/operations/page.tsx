'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

type AdminTab = 'verification' | 'disputes' | 'moderation' | 'fact_cards' | 'metrics' | 'kill_switches';

export default function AdminOperationsPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('verification');

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
  ]);

  // Screen 7: Fact cards states
  const [factCards, setFactCards] = useState([
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

  // Screen 9: Kill switches states
  const [killSwitches, setKillSwitches] = useState({
    newBookings: true,
    aiAssistant: true,
    safepayPayouts: true,
    communityPosting: true,
  });

  // Screen 10: Confirm refund modal state
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundAmount] = useState('PKR 5,250');
  const [refundRecipient] = useState('Sara Khan (Booking #4812)');
  const [refundReason] = useState('Mentor missed call without prior notice');
  const [refundApproved, setRefundApproved] = useState(false);

  const approveVerification = (id: string) => {
    setVerificationList((prev) => prev.filter((v) => v.id !== id));
    alert('Mentor verification badge approved & activated!');
  };

  const removeModeratedPost = (id: string) => {
    setFlaggedPosts((prev) => prev.filter((p) => p.id !== id));
    alert('Post permanently removed and user issued a warning.');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* Admin Sidebar */}
      <aside className="w-60 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] flex flex-col justify-between min-h-screen text-start p-4">
        <div>
          <div className="flex items-center gap-2.5 mb-6">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-700 text-white font-bold text-xs">
              M
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              Study Abroad Mentor · Staff
            </span>
          </div>

          <div className="space-y-1 text-xs font-semibold">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold flex items-center gap-2">
              <span>🛡️</span>
              <span>Operations</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('disputes')}
              className="w-full text-left p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span>⚖️</span>
                <span>Disputes</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold">
                1
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('kill_switches')}
              className="w-full text-left p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <span>🚨</span>
              <span>Kill switches</span>
            </button>
          </div>
        </div>

        {/* Staff User Footer */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center text-xs font-bold">
            AD
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold truncate">Staff Admin</p>
            <p className="text-[10px] text-emerald-600 font-bold">✓ 2FA Active</p>
          </div>
        </div>
      </aside>

      {/* Main Operations Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-900 dark:text-white">Operations</span>
            <span className="text-[11px] text-slate-400">Every action is cryptographically logged</span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-10 max-w-6xl w-full mx-auto space-y-6 text-start">
          {/* Operations Tabs Navigation */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-xs font-bold">
            {[
              { id: 'verification', label: `Verifications (${verificationList.length})` },
              { id: 'disputes', label: 'Disputes & refunds (1)' },
              { id: 'moderation', label: `Moderation (${flaggedPosts.length})` },
              { id: 'fact_cards', label: 'Fact cards (2)' },
              { id: 'metrics', label: 'Metrics' },
              { id: 'kill_switches', label: 'Kill switches' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`px-3.5 py-1.5 rounded-xl transition ${
                  activeTab === tab.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: SCREEN 5 ADMIN VERIFICATION */}
          {activeTab === 'verification' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Queue List */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
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

              {/* Review Inspector Card */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Document Inspector
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                    {selectedVerification.status}
                  </span>
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    {selectedVerification.name}
                  </h2>
                  <p className="text-xs text-slate-500">{selectedVerification.uni}</p>
                </div>

                {/* PDF preview box */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-2">
                  <span className="text-3xl">📄</span>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {selectedVerification.docName}
                  </p>
                  <button
                    type="button"
                    onClick={() => alert(`Opening ${selectedVerification.docName} in secure viewer`)}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                  >
                    Open secure file ↗
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                    <span>✓</span>
                    <span>Name matches applicant profile</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                    <span>✓</span>
                    <span>University and degree program confirmed</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-2">
                    <span className="text-slate-500">Validity period:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{selectedVerification.expiry}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => approveVerification(selectedVerification.id)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition"
                  >
                    Approve &amp; verify
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Requesting clearer re-upload from mentor')}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition"
                  >
                    Ask for more
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SCREEN 10 ADMIN DISPUTES & CONFIRM REFUND */}
          {activeTab === 'disputes' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Escrow Dispute #4812
                  </h2>
                  <p className="text-xs text-slate-500">
                    Filed by Sara Khan · Mentorship call with Ayesha Tariq
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-xs">
                  Escrow Held · PKR 5,250
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <p className="font-bold">Student reason: {refundReason}</p>
                <p className="text-[11px]">Server telemetry log confirms: Student was in the room for 18 minutes; Mentor presence not recorded.</p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRefundModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition"
                >
                  Approve 100% refund (PKR 5,250)
                </button>
                <button
                  type="button"
                  onClick={() => alert('Split decision flow')}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
                >
                  Custom resolution
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SCREEN 6 ADMIN MODERATION */}
          {activeTab === 'moderation' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="font-bold text-xs text-slate-500 uppercase">
                  Flagged by rule-based filter / user reports
                </span>
                <span className="text-xs text-slate-400">Total queued: {flaggedPosts.length}</span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {flaggedPosts.map((post) => (
                  <div key={post.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{post.channel}</span>
                      <p className="font-bold text-slate-900 dark:text-white italic">{post.excerpt}</p>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300">
                        {post.reason} · {post.severity}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => removeModeratedPost(post.id)}
                        className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition"
                      >
                        Remove post &amp; warn user
                      </button>
                      <button
                        type="button"
                        onClick={() => alert('Post dismissed as false positive')}
                        className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SCREEN 7 ADMIN FACT CARDS */}
          {activeTab === 'fact_cards' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Primary Source Fact Cards
                </h2>
                <button
                  type="button"
                  onClick={() => alert('Add new verified fact card')}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                >
                  + Add fact card
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {factCards.map((fc) => (
                  <div key={fc.id} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{fc.title}</span>
                      <span className="text-[10px] font-bold text-emerald-600">{fc.status}</span>
                    </div>
                    <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 p-2.5 rounded-xl">
                      {fc.value}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Source: {fc.source}</span>
                      <button type="button" onClick={() => alert('Edit card')} className="font-bold text-emerald-700 hover:underline">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SCREEN 9 ADMIN KILL SWITCHES */}
          {activeTab === 'kill_switches' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Emergency Kill Switches</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Instant feature halts. When disabled, users see maintenance callouts without data loss.
                </p>
              </div>

              <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {[
                  { key: 'newBookings', label: 'New session bookings', desc: 'Allow students to schedule new mentor calls' },
                  { key: 'aiAssistant', label: 'AI Study Abroad Assistant', desc: 'Allow students to query automated advice' },
                  { key: 'safepayPayouts', label: 'Safepay escrow payouts', desc: 'Release escrow funds to mentor bank accounts' },
                  { key: 'communityPosting', label: 'Community discussions', desc: 'Allow new posts and comments' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between pt-3">
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{item.label}</p>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setKillSwitches((prev: any) => ({
                          ...prev,
                          [item.key]: !prev[item.key],
                        }))
                      }
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                        (killSwitches as any)[item.key]
                          ? 'bg-emerald-600 justify-end'
                          : 'bg-red-600 justify-start'
                      }`}
                    >
                      <span className="bg-white w-4 h-4 rounded-full shadow-md" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* SCREEN 10: CONFIRM REFUND MODAL */}
      {showRefundModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-2xl text-start space-y-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Approve a 100% refund?
            </h3>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Refund amount:</span>
                <span className="font-bold text-slate-900 dark:text-white">{refundAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Beneficiary:</span>
                <span className="font-bold text-slate-900 dark:text-white">{refundRecipient}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2">
                <span className="text-slate-500">Payment gateway:</span>
                <span className="font-bold text-emerald-700">Safepay Direct Escrow</span>
              </div>
            </div>

            {refundApproved ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-xs text-emerald-800 dark:text-emerald-300 font-bold">
                ✓ Refund of PKR 5,250 dispatched to Sara's original payment method.
              </div>
            ) : (
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRefundModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRefundApproved(true);
                    setTimeout(() => setShowRefundModal(false), 1400);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition"
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
