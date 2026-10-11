'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Message {
  id: string;
  sender: 'user' | 'mentor' | 'system';
  text: string;
  timestamp: string;
}

export default function MessageMentorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'system',
      text: 'Booking request sent for 60-min video call (Tue 20 Oct · 21:00 PKT). You will only be charged after Ayesha accepts.',
      timestamp: 'Today at 09:30 AM',
    },
    {
      id: 'm2',
      sender: 'mentor',
      text: 'Salam Sara! Thanks for requesting a session. I see you are preparing for TU Berlin MSc CS. I completed my BS at FAST Lahore and moved to Berlin in 2024 through uni-assist. How can I best help you prepare before our session?',
      timestamp: 'Today at 09:45 AM',
    },
    {
      id: 'm3',
      sender: 'user',
      text: 'Salam Ayesha! Thank you for the quick reply! I wanted to ask if I should upload my module handbook directly to uni-assist or wait for university instructions?',
      timestamp: 'Today at 09:50 AM',
    },
    {
      id: 'm4',
      sender: 'mentor',
      text: 'Great question! For TU Berlin MSc CS, the module description (Modulhandbuch) must be attached with your VPD application on uni-assist. We will walk through the exact portal layout during our video call!',
      timestamp: 'Today at 09:52 AM',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');

    // Simulate mentor typing and reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const mentorReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'mentor',
        text: "Got it! I've noted that down for our session on Tuesday. Feel free to send over any draft documents you'd like me to review beforehand.",
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, mentorReply]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      <Navbar />

      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-6 sm:px-6 flex flex-col">
        {/* Top Breadcrumb & Back */}
        <div className="mb-4 flex items-center justify-between text-xs">
          <Link
            href="/mentors/ayesha-m"
            className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium"
          >
            <span>←</span>
            <span>Back to Ayesha&apos;s profile</span>
          </Link>

          <Link
            href="/payment"
            className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
          >
            View booking status →
          </Link>
        </div>

        {/* Chat Container */}
        <div className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 p-4 sm:px-6 flex items-center justify-between bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                  AM
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
              </div>

              <div className="text-start">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                    Ayesha M.
                  </h2>
                  <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                    ✓ Verified
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  MSc Computer Science · TU Berlin · <span className="text-emerald-600 dark:text-emerald-400 font-medium">Online</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/ask-senior"
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-600/40 bg-emerald-50 dark:bg-emerald-950/60 dark:border-emerald-700 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition"
              >
                <span>✍️</span>
                <span>Ask in writing (PKR 1,260)</span>
              </Link>
              <Link
                href="/payment"
                className="hidden sm:inline-flex rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition"
              >
                Checkout (PKR 5,000)
              </Link>
            </div>
          </div>

          {/* Escrow Safety Banner */}
          <div className="bg-amber-50/70 dark:bg-amber-950/30 border-b border-amber-200/60 dark:border-amber-900/40 px-4 py-2 text-center text-[11px] text-amber-800 dark:text-amber-300">
            🛡️ <strong>Safety Notice:</strong> Keep all messages on Study Abroad Mentor to keep your session protected by Safepay escrow. Never share WhatsApp numbers or personal payments.
          </div>

          {/* Ask question quick prompt banner */}
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border-b border-slate-100 dark:border-slate-800 px-4 py-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-600 dark:text-slate-400">
              💡 Need a guaranteed 24-hr written evaluation of your CGPA, SOP or university shortlist?
            </span>
            <Link
              href="/ask-senior"
              className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline shrink-0 ms-2"
            >
              Ask Ayesha in writing →
            </Link>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[500px]">
            {messages.map((msg) => {
              if (msg.sender === 'system') {
                return (
                  <div key={msg.id} className="text-center my-3">
                    <div className="inline-block rounded-xl border border-emerald-200/80 dark:border-emerald-800/60 bg-emerald-50/70 dark:bg-emerald-950/40 px-4 py-2 text-xs text-emerald-900 dark:text-emerald-300">
                      ℹ️ {msg.text}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">{msg.timestamp}</div>
                  </div>
                );
              }

              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-md rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-[#046a55] dark:bg-emerald-600 text-white rounded-br-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.timestamp} {isUser && '· ✓ Delivered'}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                  AM
                </div>
                <span>Ayesha is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-slate-200 dark:border-slate-800 p-3 sm:p-4 bg-white dark:bg-slate-900 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message to Ayesha..."
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
