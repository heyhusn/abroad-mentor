'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/StudentSidebar';
import ThemeToggle from '@/components/ThemeToggle';

interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

export default function StudentMessagesPage() {
  const [activeConvId, setActiveConvId] = useState('c1');
  const [search, setSearch] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const conversations: Conversation[] = [
    {
      id: 'c1',
      name: 'Ayesha M.',
      initials: 'AM',
      avatarBg: 'bg-emerald-100 dark:bg-emerald-950',
      avatarText: 'text-emerald-800 dark:text-emerald-300',
      role: 'MSc Computer Science · TU Berlin · 2nd year',
      lastMessage: 'Great question! For TU Berlin MSc CS, the module description...',
      time: '09:52 AM',
      unread: false,
    },
    {
      id: 'c2',
      name: 'Usman K.',
      initials: 'UK',
      avatarBg: 'bg-orange-100 dark:bg-orange-950',
      avatarText: 'text-orange-800 dark:text-orange-300',
      role: 'MSc Finance · University of Manchester',
      lastMessage: 'I received your essay draft. Reviewing by tonight!',
      time: 'Yesterday',
      unread: true,
    },
    {
      id: 'c3',
      name: 'Ali R.',
      initials: 'AR',
      avatarBg: 'bg-slate-100 dark:bg-slate-800',
      avatarText: 'text-slate-700 dark:text-slate-300',
      role: 'BSc Mechanical · RWTH Aachen',
      lastMessage: 'Awaiting session time confirmation for Sunday...',
      time: '2d ago',
      unread: false,
    },
  ];

  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({
    c1: [
      {
        id: '1',
        sender: 'mentor',
        text: 'Salam Sara! I reviewed your notes about TU Berlin MSc CS. I completed my BS at FAST Lahore and moved to Berlin in 2024 through uni-assist. How can I best help you prepare before our session?',
        time: '09:45 AM',
      },
      {
        id: '2',
        sender: 'user',
        text: 'Salam Ayesha! Thank you for the quick reply! I wanted to ask if I should upload my module handbook directly to uni-assist or wait for university instructions?',
        time: '09:50 AM',
      },
      {
        id: '3',
        sender: 'mentor',
        text: 'Great question! For TU Berlin MSc CS, the module description (Modulhandbuch) must be attached with your VPD application on uni-assist. We will walk through the exact portal layout during our video call!',
        time: '09:52 AM',
      },
    ],
    c2: [
      {
        id: '201',
        sender: 'user',
        text: 'Hi Usman, here is my drafted credibility interview essay for Manchester.',
        time: 'Yesterday',
      },
      {
        id: '202',
        sender: 'mentor',
        text: 'I received your essay draft. Reviewing by tonight!',
        time: 'Yesterday',
      },
    ],
    c3: [
      {
        id: '301',
        sender: 'user',
        text: 'Hello Ali, let me know if Sunday 20:00 works for Aachen questions.',
        time: '2d ago',
      },
      {
        id: '302',
        sender: 'mentor',
        text: 'Awaiting session time confirmation for Sunday...',
        time: '2d ago',
      },
    ],
  });

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];
  const currentThread = chatMessages[activeConvId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, activeConvId, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage.trim(),
      time: 'Just now',
    };

    setChatMessages((prev) => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), newMsg],
    }));
    setInputMessage('');

    // Simulate mentor reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'mentor',
        text: `Got your message! I've added this to our agenda for the upcoming call. Looking forward to speaking!`,
        time: 'Just now',
      };
      setChatMessages((prev) => ({
        ...prev,
        [activeConvId]: [...(prev[activeConvId] || []), replyMsg],
      }));
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      <StudentSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 dark:text-white">Messages</span>
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

        {/* Main Messenger Grid: Left List & Right Chat (Screen 6) */}
        <div className="flex-1 flex min-h-0 bg-white dark:bg-[#0d1527]">
          {/* Middle Column: Conversations List */}
          <aside className="w-80 shrink-0 border-r border-slate-200 dark:border-slate-800 flex flex-col text-start">
            {/* Search */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search messages..."
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2 ps-9 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
                <span className="absolute left-3 top-2.5 text-xs text-slate-400">🔍</span>
              </div>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
              {conversations
                .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
                .map((conv) => {
                  const isActive = conv.id === activeConvId;
                  return (
                    <button
                      key={conv.id}
                      type="button"
                      onClick={() => setActiveConvId(conv.id)}
                      className={`w-full p-4 flex items-start gap-3 transition text-left ${
                        isActive
                          ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-emerald-600 dark:border-emerald-500'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-xs ${conv.avatarBg} ${conv.avatarText}`}
                      >
                        {conv.initials}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {conv.name}
                          </span>
                          <span className="text-[10px] text-slate-400">{conv.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {conv.lastMessage}
                        </p>
                      </div>
                    </button>
                  );
                })}
            </div>
          </aside>

          {/* Right Column: Chat Window */}
          <main className="flex-1 flex flex-col min-w-0 bg-slate-50/50 dark:bg-[#0B1120]">
            {/* Chat Header */}
            <div className="h-16 px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] flex items-center justify-between">
              <div className="flex items-center gap-3 text-start">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold text-xs ${activeConv.avatarBg} ${activeConv.avatarText}`}
                >
                  {activeConv.initials}
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 dark:text-white">
                    {activeConv.name}
                  </h2>
                  <p className="text-[10px] text-slate-400">{activeConv.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/bookings/4812"
                  className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Booking
                </Link>
                <Link
                  href="/ask-senior"
                  className="rounded-lg bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-xs"
                >
                  Ask question
                </Link>
              </div>
            </div>

            {/* Platform Policy Warning Card */}
            <div className="p-3 bg-rose-50/80 dark:bg-rose-950/30 border-b border-rose-200/60 dark:border-rose-900/40 text-start">
              <div className="max-w-2xl mx-auto flex items-start gap-2.5 text-[11px] text-rose-800 dark:text-rose-300">
                <span className="text-xs">⚠️</span>
                <p className="leading-relaxed">
                  <strong>Policy Reminder:</strong> Outside contact (WhatsApp/phone) and outside payments are strictly prohibited. Keep all communication here to keep your session protected by Safepay escrow.
                </p>
              </div>
            </div>

            {/* Messages Scroll Thread */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 text-start">
              {currentThread.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-lg rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                        isUser
                          ? 'bg-[#046a55] dark:bg-emerald-600 text-white rounded-br-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200/60 dark:border-slate-700/60 rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                      {msg.time} {isUser && '· ✓ Delivered'}
                    </span>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                  <span>{activeConv.name} is typing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Composer */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] flex items-center gap-2"
            >
              <button
                type="button"
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Attach file"
              >
                📎
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Write a message..."
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition disabled:opacity-40"
              >
                Send
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
