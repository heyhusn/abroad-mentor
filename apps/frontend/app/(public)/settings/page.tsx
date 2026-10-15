'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/StudentSidebar';
import ThemeToggle from '@/components/ThemeToggle';

export default function SettingsPage() {
  // Navigation active tab
  const [activeSection, setActiveSection] = useState<'profile' | 'security' | 'notifications' | 'display' | 'parent' | 'privacy'>('profile');

  // Profile states
  const [fullName, setFullName] = useState('Sara Khan');
  const [city, setCity] = useState('Lahore');
  const [degree, setDegree] = useState('Masters in Computer Science');
  const [destination, setDestination] = useState('Germany');
  const [intake, setIntake] = useState('Autumn 2027');

  // Sign in and security
  const [email] = useState('sara.khan@gmail.com');
  const [lastPasswordChange] = useState('3 months ago');
  const [googleConnected, setGoogleConnected] = useState(true);

  // Notification toggles
  const [sessionReminders, setSessionReminders] = useState(true);
  const [newMessages, setNewMessages] = useState(true);
  const [bookingUpdates, setBookingUpdates] = useState(true);
  const [checklistDeadlines, setChecklistDeadlines] = useState(true);
  const [whatsappReminders, setWhatsappReminders] = useState(false);

  // Language & display
  const [lang, setLang] = useState('English');
  const [timezone, setTimezone] = useState('Pakistan (PKT, UTC+5)');
  const [themePreference, setThemePreference] = useState<'match_device' | 'light' | 'dark'>('match_device');

  // Parent access state
  const [parentLinked, setParentLinked] = useState(true);
  const [parentName] = useState('Rashid Khan');
  const [parentRelation] = useState('Father · rashid.khan@gmail.com');

  // Delete modal state (Screen 2)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [accountDeleted, setAccountDeleted] = useState(false);

  const handleDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteConfirmText.trim().toUpperCase() !== 'DELETE') return;
    setAccountDeleted(true);
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      <StudentSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 dark:text-white">Settings</span>
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
        <main className="flex-1 p-6 sm:p-10 max-w-5xl w-full mx-auto space-y-6 text-start">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Settings
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Quick Anchor Nav */}
            <div className="lg:col-span-3 space-y-1 bg-white dark:bg-slate-900 p-3 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveSection('profile')}
                className={`w-full p-2.5 rounded-xl text-left transition ${
                  activeSection === 'profile'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                Profile
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('security')}
                className={`w-full p-2.5 rounded-xl text-left transition ${
                  activeSection === 'security'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                Sign-in and security
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('notifications')}
                className={`w-full p-2.5 rounded-xl text-left transition ${
                  activeSection === 'notifications'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                Notifications
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('display')}
                className={`w-full p-2.5 rounded-xl text-left transition ${
                  activeSection === 'display'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                Language and display
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('parent')}
                className={`w-full p-2.5 rounded-xl text-left transition flex items-center justify-between ${
                  activeSection === 'parent'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>Parent access</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500">
                  Read-only
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('privacy')}
                className={`w-full p-2.5 rounded-xl text-left transition ${
                  activeSection === 'privacy'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                Privacy and data
              </button>
            </div>

            {/* Right Column: Settings Sections */}
            <div className="lg:col-span-9 space-y-6">
              {/* 1. Profile Section */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Profile
                </h2>

                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-white font-bold text-lg">
                    SK
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => alert('Photo upload dialog')}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition"
                    >
                      Upload photo
                    </button>
                    <p className="text-[11px] text-slate-400 mt-1">Optional. Mentors see your photo only when you book.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Full name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                {/* Study plan banner */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Study plan:</span>
                    <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                      {degree} · {destination} · {intake}
                    </p>
                  </div>
                  <Link
                    href="/student/onboarding"
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    Edit plan
                  </Link>
                </div>
              </div>

              {/* 2. Sign-in and security */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Sign-in and security
                  </h2>
                  <button
                    type="button"
                    onClick={() => alert('Active devices: Chrome on Windows 11 (This session)')}
                    className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  >
                    Devices and activity
                  </button>
                </div>

                <div className="space-y-4 text-xs divide-y divide-slate-100 dark:divide-slate-800">
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">Email</p>
                      <p className="text-slate-500">{email} · Verified</p>
                    </div>
                    <button type="button" onClick={() => alert('Change email flow')} className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
                      Change
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">Password</p>
                      <p className="text-slate-500">Last changed {lastPasswordChange}</p>
                    </div>
                    <Link href="/reset-password" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
                      Change password
                    </Link>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">Google</p>
                      <p className="text-slate-500">
                        {googleConnected ? 'Connected as sara.khan@gmail.com' : 'Not connected'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setGoogleConnected(!googleConnected)}
                      className="text-slate-500 hover:text-red-600 font-bold hover:underline"
                    >
                      {googleConnected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Notifications */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Notifications
                </h2>

                <div className="space-y-3 text-xs">
                  {[
                    { label: 'Session reminders', desc: 'Email 10 min and 1 hour before', state: sessionReminders, setState: setSessionReminders },
                    { label: 'New messages', desc: 'Email when a mentor replies', state: newMessages, setState: setNewMessages },
                    { label: 'Booking updates', desc: 'Accepted, paid, cancelled or rescheduled', state: bookingUpdates, setState: setBookingUpdates },
                    { label: 'Checklist deadlines', desc: '2-weekly email if dates are close to deadlines', state: checklistDeadlines, setState: setChecklistDeadlines },
                    { label: 'WhatsApp reminders', desc: 'Coming after launch', state: whatsappReminders, setState: setWhatsappReminders, disabled: true },
                  ].map((n, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5">
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200">{n.label}</p>
                        <p className="text-[11px] text-slate-500">{n.desc}</p>
                      </div>
                      <button
                        type="button"
                        disabled={n.disabled}
                        onClick={() => n.setState(!n.state)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                          n.state ? 'bg-emerald-600 justify-end' : 'bg-slate-200 dark:bg-slate-700 justify-start'
                        } ${n.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <span className="bg-white w-4 h-4 rounded-full shadow-md" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Language and display */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Language and display
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-xs">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Language</label>
                    <select
                      value={lang}
                      onChange={(e) => setLang(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-800 dark:text-slate-200 outline-none"
                    >
                      <option>English</option>
                      <option>Urdu (اردو)</option>
                    </select>
                  </div>
                  <div className="space-y-1 text-xs">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Timezone</label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-800 dark:text-slate-200 outline-none"
                    >
                      <option>Pakistan (PKT, UTC+5)</option>
                      <option>Germany (CET, UTC+1)</option>
                      <option>United Kingdom (GMT, UTC+0)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Theme</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setThemePreference('match_device')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                        themePreference === 'match_device'
                          ? 'bg-emerald-800 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Match device
                    </button>
                    <button
                      type="button"
                      onClick={() => setThemePreference('light')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                        themePreference === 'light'
                          ? 'bg-emerald-800 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Light
                    </button>
                    <button
                      type="button"
                      onClick={() => setThemePreference('dark')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                        themePreference === 'dark'
                          ? 'bg-emerald-800 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Dark
                    </button>
                  </div>
                </div>
              </div>

              {/* 5. Parent access */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Parent access
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Let a parent or sponsor see your bookings, payment receipts, and visa status. They can't message mentors, book or cancel.
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500">
                    Read-only
                  </span>
                </div>

                {parentLinked ? (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{parentName}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                          Linked
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{parentRelation}</p>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <Link href="/parent-view" className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline">
                        View
                      </Link>
                      <button
                        type="button"
                        onClick={() => setParentLinked(false)}
                        className="text-red-600 font-bold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setParentLinked(true)}
                    className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                  >
                    + Invite a parent or sponsor
                  </button>
                )}
              </div>

              {/* 6. Privacy and data */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Privacy and data
                </h2>

                <div className="space-y-4 text-xs divide-y divide-slate-100 dark:divide-slate-800">
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">Download your data</p>
                      <p className="text-slate-500">Bookings, messages, and roadmap as a zip file</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert('Data archive download requested')}
                      className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
                    >
                      Request download
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <p className="font-bold text-red-600">Delete account</p>
                      <p className="text-slate-500">Permanently remove your profile, messages, and history</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowDeleteModal(true)}
                      className="px-3 py-1.5 rounded-xl border border-red-300 dark:border-red-900/60 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 font-bold transition"
                    >
                      Delete account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* SCREEN 2: DELETE ACCOUNT POP-UP MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-2xl text-start space-y-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-950 text-red-600 text-lg font-bold">
                ⚠️
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Delete your account?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  You cannot undo this. Your profile, messages, scheduled reviews and roadmap will be deleted in 30 days.
                </p>
              </div>
            </div>

            {/* Warning Callout */}
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <p className="font-bold">⚠️ You have an upcoming session</p>
              <p className="text-[11px]">
                Your booking with Ayesha on Fri 23 Oct will be cancelled automatically (refund of PKR 5,250).
              </p>
            </div>

            {accountDeleted ? (
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-xs text-red-800 dark:text-red-300">
                ✓ Account scheduled for deletion. Logging out...
              </div>
            ) : (
              <form onSubmit={handleDeleteAccount} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Type DELETE to confirm:
                  </label>
                  <input
                    type="text"
                    required
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder="DELETE"
                    className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500 uppercase tracking-wider"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                  >
                    Keep my account
                  </button>
                  <button
                    type="submit"
                    disabled={deleteConfirmText.trim().toUpperCase() !== 'DELETE'}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white text-xs font-bold shadow-xs transition"
                  >
                    Delete account
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
