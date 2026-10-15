'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

export default function SessionLobbyPage() {
  const router = useRouter();
  const [micMuted, setMicMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [joinAudioOnly, setJoinAudioOnly] = useState(false);
  const [selectedMic, setSelectedMic] = useState('Default - MacBook Pro Mic');
  const [selectedCam, setSelectedCam] = useState('FaceTime HD Camera');
  const [selectedSpeaker, setSelectedSpeaker] = useState('Default - MacBook Pro Speakers');

  const handleJoin = () => {
    router.push('/session/room');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Top Header */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <Link
            href="/bookings"
            className="font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            ← My bookings
          </Link>
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

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 sm:p-10 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Video Preview and Controls */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative w-full aspect-video rounded-3xl bg-slate-900 overflow-hidden shadow-2xl flex flex-col items-center justify-center border border-slate-800">
              {/* Camera Off Avatar or Active Video */}
              {cameraOff || joinAudioOnly ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="h-24 w-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-2xl font-bold text-slate-200 shadow-inner">
                    SK
                  </div>
                  <span className="text-xs text-slate-400">Camera is turned off</span>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-[#0F172A] flex flex-col items-center justify-center relative">
                  <div className="h-28 w-28 rounded-full bg-slate-800/80 border-2 border-slate-700 flex items-center justify-center text-3xl font-bold text-slate-200">
                    SK
                  </div>
                  <p className="text-xs text-slate-400 mt-3 font-medium">This is how you will appear</p>
                </div>
              )}

              {/* Status pill inside preview */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2 text-[11px] text-white">
                <span className={`h-2 w-2 rounded-full ${micMuted ? 'bg-red-500' : 'bg-emerald-500 animate-pulse'}`} />
                <span>{micMuted ? 'Mic Muted' : 'Mic Working'}</span>
              </div>

              {/* In-preview Quick Toggles */}
              <div className="absolute bottom-5 inset-x-0 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setMicMuted(!micMuted)}
                  className={`h-11 w-11 rounded-full flex items-center justify-center backdrop-blur-md transition shadow-md ${
                    micMuted
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-white/20 text-white hover:bg-white/30 border border-white/20'
                  }`}
                  title={micMuted ? 'Unmute Mic' : 'Mute Mic'}
                >
                  <span className="text-base">{micMuted ? '🔇' : '🎤'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCameraOff(!cameraOff)}
                  className={`h-11 w-11 rounded-full flex items-center justify-center backdrop-blur-md transition shadow-md ${
                    cameraOff
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-white/20 text-white hover:bg-white/30 border border-white/20'
                  }`}
                  title={cameraOff ? 'Turn Video On' : 'Turn Video Off'}
                >
                  <span className="text-base">{cameraOff ? '🚫' : '📹'}</span>
                </button>
              </div>
            </div>

            {/* Device Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1 text-start">
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Microphone</label>
                <select
                  value={selectedMic}
                  onChange={(e) => setSelectedMic(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-600 transition"
                >
                  <option>Default - Built-in Microphone</option>
                  <option>External USB Microphone</option>
                  <option>Bluetooth Headset</option>
                </select>
              </div>

              <div className="space-y-1 text-start">
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Camera</label>
                <select
                  value={selectedCam}
                  onChange={(e) => setSelectedCam(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-600 transition"
                >
                  <option>Default HD Camera (Built-in)</option>
                  <option>External USB Webcam (1080p)</option>
                </select>
              </div>

              <div className="space-y-1 text-start">
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Speakers</label>
                <select
                  value={selectedSpeaker}
                  onChange={(e) => setSelectedSpeaker(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-600 transition"
                >
                  <option>Default - Built-in Speakers</option>
                  <option>Headphones (3.5mm / Bluetooth)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Column: Session Info & Join Button */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm text-start space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-ping" />
                Session ready to join
              </div>
              <h1 className="mt-3 text-xl font-black text-slate-900 dark:text-white">
                60-min video call with Ayesha M.
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Today · 21:00 - 22:00 PKT (18:00 Berlin)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300">
                <span>✓</span>
                <span>Mentor agenda ready for review</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-4">
                TU Berlin Master’s application checklist, SOP evaluation, and blocked account timelines.
              </p>
            </div>

            {/* Audio only toggle */}
            <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
              <input
                type="checkbox"
                checked={joinAudioOnly}
                onChange={(e) => setJoinAudioOnly(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Join with audio only</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Save bandwidth. You can turn on video during the session anytime.
                </p>
              </div>
            </label>

            {/* Join CTA */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleJoin}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors"
              >
                Join session
              </button>
              <p className="text-[10px] text-center text-slate-400 dark:text-slate-500">
                🔒 Protected &amp; recorded safely inside the Study Abroad Mentor secure room.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
