'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/StudentSidebar';
import ThemeToggle from '@/components/ThemeToggle';

type DemoState = 'normal' | 'declined' | 'daily_limit';

interface CitationSource {
  title: string;
  url: string;
  domain: string;
  verified: string;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text?: string;
  bulletIntro?: string;
  bullets?: string[];
  bulletOutro?: string;
  declineNotice?: {
    heading: string;
    description: string;
    bullets: string[];
    actions: { label: string; href: string }[];
  };
  sources?: CitationSource[];
  time: string;
}

export default function AiAssistantPage() {
  const [demoState, setDemoState] = useState<DemoState>('normal');
  const [queryInput, setQueryInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questionsUsed, setQuestionsUsed] = useState(2);
  const maxQuestions = 5;

  const initialMessages: ChatMessage[] = [
    {
      id: 'm1',
      sender: 'user',
      text: "What documents do I need to apply for a Master's in Germany through uni-assist?",
      time: 'Just now',
    },
    {
      id: 'm2',
      sender: 'ai',
      bulletIntro: "For most Master's programmes that use uni-assist, you will usually need:",
      bullets: [
        "Your Bachelor's degree certificate and full transcript",
        "Officially certified copies, plus translations if they're not in English or German",
        "A language certificate for English-taught courses (usually IELTS 6.5+ or TOEFL 90+)",
        "A copy of your passport (photo and personal info pages)",
        "Anything your programme specifically asks for on top: CV/resume, motivation letter, and module description",
      ],
      bulletOutro:
        'Requirements differ by university, so always check each programme page before you upload. Want me to add these to your checklist?',
      sources: [
        {
          title: 'uni-assist.de',
          url: 'https://www.uni-assist.de/en/tools/check-university-admission/',
          domain: 'uni-assist.de',
          verified: 'Verified Oct 2026',
        },
        {
          title: 'daad.de',
          url: 'https://www.daad.de/en/study-and-research-in-germany/plan-your-studies/',
          domain: 'daad.de',
          verified: 'Official source',
        },
        {
          title: 'bamf.de',
          url: 'https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Studium/studium-node.html',
          domain: 'bamf.de',
          verified: 'Law review Oct 2026',
        },
      ],
      time: 'Just now',
    },
  ];

  const declinedMessage: ChatMessage = {
    id: 'm-decline-q',
    sender: 'user',
    text: 'Will I get my German student visa with a 2.8 CGPA and 6.0 IELTS?',
    time: 'Just now',
  };

  const declinedResponse: ChatMessage = {
    id: 'm-decline-a',
    sender: 'ai',
    declineNotice: {
      heading:
        "I can't predict visa or admission decisions. Only the embassy and universities can make decisions on applications.",
      description: 'Here is what I can help you with instead:',
      bullets: [
        'Check official visa requirements and document checklists',
        'Find programmes whose published requirements match your CGPA and IELTS',
        'Talk to a mentor who applied with a similar profile',
      ],
      actions: [
        { label: 'German Student Visa checklist', href: '/checklist' },
        { label: 'Admit & reject stats', href: '/mentors' },
      ],
    },
    sources: [
      {
        title: 'pakistan.diplo.de',
        url: 'https://pakistan.diplo.de/pk-en/service/05-VisaEinreise',
        domain: 'pakistan.diplo.de',
        verified: 'Official Embassy guidelines',
      },
    ],
    time: 'Just now',
  };

  const getActiveMessages = () => {
    if (demoState === 'declined') {
      return [...initialMessages, declinedMessage, declinedResponse];
    }
    return initialMessages;
  };

  const handleSendQuery = (textToSend?: string) => {
    const text = textToSend || queryInput;
    if (!text.trim()) return;

    if (demoState === 'daily_limit' || questionsUsed >= maxQuestions) {
      return;
    }

    if (text.toLowerCase().includes('visa') || text.toLowerCase().includes('cgpa')) {
      setDemoState('declined');
      setQuestionsUsed((prev) => prev + 1);
      setQueryInput('');
      return;
    }

    setQueryInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setQuestionsUsed((prev) => prev + 1);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      <StudentSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 dark:text-white">AI Assistant</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Prototype State Switcher */}
            <div className="hidden md:flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setDemoState('normal')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  demoState === 'normal'
                    ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                1 · AI assistant
              </button>
              <button
                type="button"
                onClick={() => setDemoState('declined')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  demoState === 'declined'
                    ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                2 · Declines visa odds
              </button>
              <button
                type="button"
                onClick={() => setDemoState('daily_limit')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  demoState === 'daily_limit'
                    ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                3 · Daily limit
              </button>
            </div>

            <ThemeToggle />
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                SK
              </span>
            </div>
          </div>
        </header>

        {/* Main Content: Left Chat Thread & Right Context Card */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0 bg-slate-50 dark:bg-[#0B1120]">
          {/* Main Chat Column */}
          <main className="flex-1 flex flex-col min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {/* Agent Welcome / Safety Banner */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] p-4 mb-6 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-lg">
                  🤖
                </span>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 dark:text-white">Study abroad assistant</h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Answers from verified fact cards and official sources. Guidance only.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDemoState('normal');
                  setQuestionsUsed(0);
                }}
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                + New chat
              </button>
            </div>

            {/* Chat Messages */}
            <div className="space-y-6 flex-1 max-w-3xl w-full mx-auto text-start">
              {getActiveMessages().map((m) => (
                <div key={m.id} className="space-y-3">
                  {m.sender === 'user' ? (
                    <div className="flex justify-end">
                      <div className="bg-[#035343] dark:bg-emerald-800 text-white rounded-2xl rounded-tr-xs px-4 py-3 max-w-xl text-xs sm:text-[13px] leading-relaxed shadow-xs">
                        {m.text}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Standard AI Answer with Bullet points */}
                      {m.bulletIntro && (
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-4">
                          <p className="text-xs sm:text-[13px] font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                            {m.bulletIntro}
                          </p>
                          <ul className="space-y-2 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300">
                            {m.bullets?.map((b, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                          {m.bulletOutro && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                              {m.bulletOutro}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Screen 2 Decline Notice (Visa / Odds rejection) */}
                      {m.declineNotice && (
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-4">
                          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 font-semibold leading-relaxed">
                            {m.declineNotice.heading}
                          </div>

                          <div className="space-y-2">
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                              {m.declineNotice.description}
                            </p>
                            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                              {m.declineNotice.bullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                            {m.declineNotice.actions.map((act, i) => (
                              <Link
                                key={i}
                                href={act.href}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                              >
                                <span>📄</span>
                                <span>{act.label}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Official Sources Cards */}
                      {m.sources && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Sources checked in 1 second:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {m.sources.map((src, idx) => (
                              <a
                                key={idx}
                                href={src.url}
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-emerald-500/80 transition shadow-2xs block"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                                    {src.title}
                                  </span>
                                  <span className="text-xs text-slate-400">↗</span>
                                </div>
                                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block mt-1">
                                  {src.verified}
                                </span>
                              </a>
                            ))}
                          </div>

                          {/* Quick Action Badges */}
                          <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-500 dark:text-slate-400">
                            <Link
                              href="/checklist"
                              className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                            >
                              <span>+</span> Add to my checklist
                            </Link>
                            <span>·</span>
                            <Link
                              href="/mentors"
                              className="font-bold text-slate-700 dark:text-slate-300 hover:underline"
                            >
                              Ask a mentor who did this
                            </Link>
                            <span>·</span>
                            <button
                              type="button"
                              onClick={() => alert('Flagged for review. Thank you!')}
                              className="hover:underline text-slate-400"
                            >
                              🚩 Report
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 w-32 flex items-center justify-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-600 animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="h-2 w-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* SCREEN 3: DAILY LIMIT BANNER OR QUERY INPUT */}
            <div className="max-w-3xl w-full mx-auto mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              {demoState === 'daily_limit' || questionsUsed >= maxQuestions ? (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-2 text-start">
                  <div className="flex items-center gap-2 font-bold">
                    <span>⚡</span>
                    <span>You’ve used today’s 5 AI questions</span>
                  </div>
                  <p className="text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
                    They reset at midnight PKT. For deeper help, a mentor can go through your case in a live session.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/mentors"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition"
                    >
                      Find a mentor
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={() =>
                        handleSendQuery(
                          'How much money do I need to show for the visa?'
                        )
                      }
                      className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-600 transition"
                    >
                      How much money do I need to show for the visa?
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleSendQuery(
                          'Which deadlines apply for an October 2027 start?'
                        )
                      }
                      className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-600 transition"
                    >
                      Which deadlines apply for an October 2027 start?
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleSendQuery('Is IELTS 6.5 enough for most programmes?')
                      }
                      className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-600 transition"
                    >
                      Is IELTS 6.5 enough for most programmes?
                    </button>
                  </div>

                  {/* Input bar */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendQuery();
                    }}
                    className="relative flex items-center"
                  >
                    <input
                      type="text"
                      value={queryInput}
                      onChange={(e) => setQueryInput(e.target.value)}
                      placeholder="Ask about programmes, documents, visas, or money..."
                      className="w-full text-xs sm:text-[13px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-3.5 pl-4 pr-12 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-600 transition shadow-2xs"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 h-9 w-9 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white flex items-center justify-center transition shadow-xs"
                      title="Send question"
                    >
                      ➤
                    </button>
                  </form>

                  <p className="text-[10px] text-center text-slate-400 dark:text-slate-500">
                    Always double-check official portals. We link to primary source fact cards with every answer.
                  </p>
                </div>
              )}
            </div>
          </main>

          {/* Right Rail: Context & Other AI Tools */}
          <aside className="w-full lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] p-6 space-y-6 text-start">
            {/* Student Target Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Answers use your plan:
              </span>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white">
                <span className="text-base">🇵🇰 ➔ 🇩🇪</span>
                <span>Germany</span>
              </div>
              <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                <p>Level: <span className="font-semibold text-slate-700 dark:text-slate-200">Masters</span></p>
                <p>Field: <span className="font-semibold text-slate-700 dark:text-slate-200">Computer Science</span></p>
                <p>Start: <span className="font-semibold text-slate-700 dark:text-slate-200">Autumn 2027</span></p>
              </div>
            </div>

            {/* Other AI Agents Navigation */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Other AI tools:
              </span>
              <div className="space-y-1">
                <Link
                  href="/checklist"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-200 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span>📋</span>
                    <span>Checklist &amp; roadmap</span>
                  </div>
                  <span className="text-slate-400 text-xs">→</span>
                </Link>

                <Link
                  href="/scholarships"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-200 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span>🎓</span>
                    <span>Scholarship finder</span>
                  </div>
                  <span className="text-slate-400 text-xs">→</span>
                </Link>

                <Link
                  href="/professor-finder"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-200 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span>🔬</span>
                    <span>Professor finder</span>
                  </div>
                  <span className="text-slate-400 text-xs">→</span>
                </Link>

                <Link
                  href="/housing"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-200 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span>🏠</span>
                    <span>Housing agent</span>
                  </div>
                  <span className="text-slate-400 text-xs">→</span>
                </Link>
              </div>
            </div>

            {/* Daily Usage Progress Bar */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300">Today</span>
                <span className="text-emerald-700 dark:text-emerald-400">
                  {questionsUsed} / {maxQuestions} questions
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${(questionsUsed / maxQuestions) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400">Resets at midnight PKT</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
