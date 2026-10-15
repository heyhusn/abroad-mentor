'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

type RoomState = 'live' | 'waiting' | 'reconnecting';

export default function LiveVideoRoomPage() {
  const router = useRouter();

  // State switching for Figma prototype screens 2, 3, 4
  const [roomState, setRoomState] = useState<RoomState>('live');

  // Interactive controls
  const [micMuted, setMicMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);

  // Popups (Screen 5 & Screen 6)
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showAiConsentModal, setShowAiConsentModal] = useState(false);
  const [aiNotesActive, setAiNotesActive] = useState(false);

  // Chat message state
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'mentor',
      senderName: 'Ayesha M.',
      text: "Here's the official uni-assist page we talked about: uni-assist.de/tools/check-university-admission/",
      time: '21:12',
    },
    {
      id: 'm2',
      sender: 'user',
      senderName: 'You',
      text: 'Thanks! Saving it.',
      time: '21:14',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Call timer simulation
  const [seconds, setSeconds] = useState(768); // 12m 48s elapsed
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} / 60:00`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        senderName: 'You',
        text: chatInput.trim(),
        time: 'Now',
      },
    ]);
    setChatInput('');
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* Top Bar inside Video Room */}
      <header className="h-14 border-b border-slate-800/80 bg-slate-900/95 px-4 sm:px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white">Live · 60-min video call with Ayesha M.</span>
            <span className="text-xs text-slate-400 font-mono bg-slate-800/80 px-2 py-0.5 rounded-md">
              {formatTimer(seconds)}
            </span>
          </div>

          {/* Screen Switcher for Prototype Verification */}
          <div className="hidden lg:flex items-center gap-1.5 ml-4 pl-4 border-l border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Preview States:</span>
            <button
              type="button"
              onClick={() => setRoomState('live')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                roomState === 'live' ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              2. Live room
            </button>
            <button
              type="button"
              onClick={() => setRoomState('waiting')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                roomState === 'waiting' ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              3. Waiting mentor
            </button>
            <button
              type="button"
              onClick={() => setRoomState('reconnecting')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                roomState === 'reconnecting' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              4. Reconnecting
            </button>
            <button
              type="button"
              onClick={() => setShowAiConsentModal(true)}
              className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-900/60 text-indigo-300 hover:bg-indigo-800 border border-indigo-700/50"
            >
              6. AI notes prompt
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {aiNotesActive && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-0.5 rounded-full">
              <span>✨</span>
              <span>AI Notes active</span>
            </span>
          )}

          <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-2 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Good connection</span>
          </div>

          <button
            type="button"
            className="text-[11px] text-slate-400 hover:text-slate-200 border border-slate-800 rounded-lg px-2 py-1"
          >
            Technical problem?
          </button>
        </div>
      </header>

      {/* Main Video Body (Columns: Stage + Chat Sidebar) */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Main Video Stage */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 relative bg-[#090D16]">
          {/* STATE 2: LIVE ROOM */}
          {roomState === 'live' && (
            <div className="relative w-full h-full max-w-5xl rounded-3xl bg-slate-900 overflow-hidden flex items-center justify-center border border-slate-800 shadow-2xl">
              {/* Mentor Video Feed */}
              <div className="flex flex-col items-center gap-3">
                <div className="h-32 w-32 rounded-full bg-emerald-900/50 border-2 border-emerald-600/60 flex items-center justify-center text-4xl font-bold text-emerald-300 shadow-lg">
                  AM
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-white">Ayesha Tariq</p>
                  <p className="text-xs text-slate-400">MSc Computer Science · TU Berlin</p>
                </div>
              </div>

              {/* Mentor Name Tag */}
              <div className="absolute bottom-5 left-5 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-xs font-semibold text-white flex items-center gap-2">
                <span>Ayesha M. · Berlin, 18:12</span>
              </div>

              {/* Student Picture-in-Picture Feed */}
              <div className="absolute bottom-5 right-5 w-44 h-28 sm:w-52 sm:h-32 rounded-2xl bg-slate-950/90 border-2 border-slate-700/80 shadow-2xl overflow-hidden flex flex-col items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-200">
                  SK
                </div>
                <span className="text-[10px] text-slate-400 mt-1">You (Sara K.)</span>
                {micMuted && (
                  <span className="absolute top-2 right-2 text-xs bg-red-600/80 p-1 rounded-full">
                    🔇
                  </span>
                )}
              </div>
            </div>
          )}

          {/* STATE 3: WAITING FOR MENTOR */}
          {roomState === 'waiting' && (
            <div className="relative w-full h-full max-w-5xl rounded-3xl bg-slate-900 overflow-hidden flex flex-col items-center justify-center border border-slate-800 shadow-2xl p-6 text-center">
              <div className="h-20 w-20 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-2xl mb-4">
                <span className="animate-spin text-emerald-400 text-3xl">◌</span>
              </div>
              <h2 className="text-xl font-bold text-white">Waiting for Ayesha to join...</h2>
              <p className="text-xs text-slate-400 max-w-md mt-2 leading-relaxed">
                The session was scheduled for 21:00 PKT. Mentors typically arrive within 2-3 minutes. If they do not arrive within 10 minutes, you can reschedule or receive a full automatic refund.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setChatOpen(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition"
                >
                  Send her a message
                </button>
              </div>

              {/* Student Self-view */}
              <div className="absolute bottom-5 right-5 w-44 h-28 sm:w-52 sm:h-32 rounded-2xl bg-slate-950/90 border border-slate-700 shadow-xl overflow-hidden flex flex-col items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-200">
                  SK
                </div>
                <span className="text-[10px] text-slate-400 mt-1">You (Connected)</span>
              </div>
            </div>
          )}

          {/* STATE 4: ROOM RECONNECTING */}
          {roomState === 'reconnecting' && (
            <div className="relative w-full h-full max-w-5xl rounded-3xl bg-slate-900 overflow-hidden flex flex-col items-center justify-center border border-slate-800 shadow-2xl p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-amber-950/60 border border-amber-600/50 flex items-center justify-center text-2xl mb-4">
                <span className="animate-pulse text-amber-400 text-2xl">⚠️</span>
              </div>
              <h2 className="text-xl font-bold text-white">Reconnecting...</h2>
              <p className="text-xs text-slate-400 max-w-md mt-2 leading-relaxed">
                You lost connection. Attempting to restore video feed and audio stream. Please check your internet connection.
              </p>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setRoomState('live')}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-2 mx-auto"
                >
                  <span>🔄</span>
                  <span>Try to reconnect now</span>
                </button>
              </div>

              {/* Student Self-view */}
              <div className="absolute bottom-5 right-5 w-44 h-28 sm:w-52 sm:h-32 rounded-2xl bg-slate-950/90 border border-slate-700 shadow-xl overflow-hidden flex flex-col items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-200">
                  SK
                </div>
                <span className="text-[10px] text-amber-400 mt-1">Reconnecting audio...</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: In-Call Chat Panel */}
        {chatOpen && (
          <aside className="w-80 sm:w-88 border-l border-slate-800 bg-slate-900 flex flex-col z-10 text-start">
            <div className="h-14 border-b border-slate-800 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">In-call Chat</span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                  {messages.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {/* Chat Messages List */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1">
                    <span className="font-semibold text-slate-300">{m.senderName}</span>
                    <span>·</span>
                    <span>{m.time}</span>
                  </div>
                  <div
                    className={`p-3 rounded-2xl max-w-[90%] leading-relaxed break-words text-xs ${
                      m.sender === 'user'
                        ? 'bg-emerald-700 text-white rounded-br-xs'
                        : 'bg-slate-800 text-slate-100 rounded-bl-xs border border-slate-700/80'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 flex items-center gap-2 bg-slate-900/90">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Message Ayesha..."
                className="flex-1 bg-slate-800 text-xs rounded-xl px-3 py-2.5 text-white placeholder-slate-500 border border-slate-700 outline-none focus:border-emerald-600 transition"
              />
              <button
                type="submit"
                className="h-9 w-9 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shrink-0 transition"
              >
                ➤
              </button>
            </form>
          </aside>
        )}
      </div>

      {/* Floating Bottom Control Bar */}
      <footer className="h-20 border-t border-slate-800 bg-slate-900/95 px-6 flex items-center justify-between z-20">
        <div className="text-[11px] text-slate-400 hidden sm:block">
          Study Abroad Mentor · Encrypted Call
        </div>

        {/* Center Meeting Controls */}
        <div className="flex items-center gap-3 mx-auto">
          {/* Mute */}
          <button
            type="button"
            onClick={() => setMicMuted(!micMuted)}
            className={`h-12 w-12 rounded-full flex items-center justify-center transition shadow-lg ${
              micMuted
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
            }`}
            title={micMuted ? 'Unmute' : 'Mute'}
          >
            <span className="text-lg">{micMuted ? '🔇' : '🎤'}</span>
          </button>

          {/* Camera */}
          <button
            type="button"
            onClick={() => setCamOff(!camOff)}
            className={`h-12 w-12 rounded-full flex items-center justify-center transition shadow-lg ${
              camOff
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
            }`}
            title={camOff ? 'Turn video on' : 'Turn video off'}
          >
            <span className="text-lg">{camOff ? '🚫' : '📹'}</span>
          </button>

          {/* Screen Share */}
          <button
            type="button"
            onClick={() => setScreenSharing(!screenSharing)}
            className={`h-12 w-12 rounded-full flex items-center justify-center transition shadow-lg ${
              screenSharing
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
            }`}
            title={screenSharing ? 'Stop sharing' : 'Share screen'}
          >
            <span className="text-lg">🖥️</span>
          </button>

          {/* Raise Hand */}
          <button
            type="button"
            onClick={() => setHandRaised(!handRaised)}
            className={`h-12 w-12 rounded-full flex items-center justify-center transition shadow-lg ${
              handRaised
                ? 'bg-amber-500 text-white hover:bg-amber-600'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
            }`}
            title={handRaised ? 'Lower hand' : 'Raise hand'}
          >
            <span className="text-lg">✋</span>
          </button>

          {/* Chat Toggle */}
          <button
            type="button"
            onClick={() => setChatOpen(!chatOpen)}
            className={`h-12 w-12 rounded-full flex items-center justify-center transition shadow-lg ${
              chatOpen
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
            }`}
            title="Toggle chat"
          >
            <span className="text-lg">💬</span>
          </button>

          {/* Leave Call (Red Button) */}
          <button
            type="button"
            onClick={() => setShowLeaveModal(true)}
            className="h-12 px-5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition ml-2"
          >
            <span>📞</span>
            <span>Leave</span>
          </button>
        </div>

        <div className="w-20 hidden sm:block" />
      </footer>

      {/* POPUP 5: LEAVE SESSION MODAL */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-2xl text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center text-2xl mx-auto">
              📞
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Leave the session?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              You still have 47 minutes remaining. If you leave now, you can rejoin anytime before 22:00 PKT from your bookings dashboard.
            </p>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowLeaveModal(false);
                  router.push('/session/confirm');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition"
              >
                Leave for now / Rejoin later
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowLeaveModal(false);
                  router.push('/session/confirm');
                }}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition shadow-md"
              >
                End the session &amp; proceed to review
              </button>

              <button
                type="button"
                onClick={() => setShowLeaveModal(false)}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Stay in the call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP 6: AI NOTES CONSENT MODAL */}
      {showAiConsentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl text-start space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xl font-bold">
                ✨
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Ayesha wants to turn on AI session notes
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Smart summary &amp; action items generator
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              If you both agree, the call audio will be transcribed and turned into a written summary with action items for your checklist.
            </p>

            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-600">✓</span>
                <span>Only you and Ayesha can see the summary</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-600">✓</span>
                <span>Audio recording is deleted as soon as summary is generated</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-600">✓</span>
                <span>You can say no. The call continues normally without recording</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAiConsentModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Not now
              </button>

              <button
                type="button"
                onClick={() => {
                  setAiNotesActive(true);
                  setShowAiConsentModal(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md"
              >
                <span>✓</span>
                <span>Allow recording</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
