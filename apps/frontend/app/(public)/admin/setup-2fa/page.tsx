'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

export default function AdminSetup2FaPage() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [copiedKey, setCopiedKey] = useState(false);
  const secretKey = 'KZ4T 7QWM 2LXP 9RDA';
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(secretKey.replace(/\s+/g, ''));
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors duration-200">
      {/* Top Header */}
      <header className="p-6 flex items-center justify-between max-w-5xl w-full mx-auto">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-700 text-white shadow-xs">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </span>
          <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
            Study Abroad Mentor
          </span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Centered Card matching Figma Screen 4 */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-sm text-start space-y-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              REQUIRED FOR ADMIN ACCESS
            </p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Set up 2-step verification
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              Admin pages control money and private documents, so they need a code from an authenticator app every time you sign in.
            </p>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-3.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-800 dark:bg-emerald-700 text-white text-xs font-bold mt-0.5">
                1
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Install an authenticator app
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Google Authenticator, Microsoft Authenticator or 1Password all work.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-emerald-700 text-emerald-800 dark:text-emerald-400 text-xs font-bold mt-0.5">
                2
              </span>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      Scan this QR code
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Can't scan? Enter this key in the app instead:
                    </p>
                    <div className="mt-2.5 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wider hover:bg-slate-100 dark:hover:bg-slate-700/60 transition"
                      >
                        <span>{secretKey}</span>
                        <span className="text-[10px] text-slate-400">
                          {copiedKey ? '✓' : '📋'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* QR Box Visual */}
                  <div className="h-24 w-24 shrink-0 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="h-full w-full fill-slate-900 dark:fill-white">
                      {/* Top-left position block */}
                      <rect x="5" y="5" width="38" height="38" rx="6" fill="none" stroke="currentColor" strokeWidth="9" />
                      <rect x="17" y="17" width="14" height="14" rx="2" />
                      {/* Top-right position block */}
                      <rect x="57" y="5" width="38" height="38" rx="6" fill="none" stroke="currentColor" strokeWidth="9" />
                      <rect x="69" y="17" width="14" height="14" rx="2" />
                      {/* Bottom-left position block */}
                      <rect x="5" y="57" width="38" height="38" rx="6" fill="none" stroke="currentColor" strokeWidth="9" />
                      <rect x="17" y="69" width="14" height="14" rx="2" />
                      {/* Stylized QR bits */}
                      <rect x="57" y="57" width="16" height="16" rx="2" />
                      <rect x="79" y="57" width="16" height="16" rx="2" />
                      <rect x="57" y="79" width="16" height="16" rx="2" />
                      <rect x="79" y="79" width="16" height="16" rx="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 text-slate-400 text-xs mt-0.5">
                3
              </span>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Enter the 6-digit code from the app
                </p>
                <div className="mt-3 grid grid-cols-6 gap-2 max-w-sm">
                  {digits.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        inputRefs.current[i] = el;
                      }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      className="h-12 text-center text-lg font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lost your phone later notice */}
          <div className="rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/40 p-4">
            <div className="flex items-start gap-2.5">
              <span className="text-amber-700 dark:text-amber-400 text-sm mt-0.5">✦</span>
              <div>
                <p className="text-xs font-bold text-amber-950 dark:text-amber-200">
                  Lost your phone later?
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-amber-900 dark:text-amber-300">
                  The other admin can reset your 2-step verification. There are no SMS or email codes.
                </p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
            <Link
              href="/admin/login"
              className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </Link>

            <button
              type="button"
              onClick={() => router.push('/admin/login')}
              className="rounded-lg bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              Turn on and continue
            </button>
          </div>
        </div>
      </main>

      <footer className="p-6 text-center text-[11px] text-slate-400 dark:text-slate-500">
        Staff portal &middot; Encrypted with AES-256
      </footer>
    </div>
  );
}
