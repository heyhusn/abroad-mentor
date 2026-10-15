'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

export default function AdminSetup2FaPage() {
  const router = useRouter();
  const [copiedKey, setCopiedKey] = useState(false);
  const secretKey = 'JBSWY3DPEHPK3PXP';

  const handleCopy = () => {
    navigator.clipboard.writeText(secretKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors duration-200">
      <header className="p-6 flex items-center justify-between max-w-5xl w-full mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-700 text-white font-bold text-xs">
            M
          </span>
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            Study Abroad Mentor · Staff Admin
          </span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-xl text-start space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Security step 2</span>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Setup 2-step verification
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Protect operations and payments with hardware or authenticator app confirmation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-3">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              1. Scan this QR code with your authenticator
            </p>
            <div className="flex items-center gap-4">
              <div className="h-28 w-28 bg-white border border-slate-200 rounded-xl p-2 flex items-center justify-center">
                <span className="text-5xl">📱</span>
              </div>
              <div className="text-xs text-slate-500 space-y-1">
                <p>Or enter code manually:</p>
                <code className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-[11px] font-mono text-slate-800 dark:text-slate-200 block">
                  {secretKey}
                </code>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
                >
                  {copiedKey ? '✓ Copied' : 'Copy code'}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              2. Enter the 6-digit code to verify:
            </p>
            <div className="grid grid-cols-6 gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  className="h-11 text-center text-base font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-600"
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              href="/admin/login"
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
            >
              Cancel
            </Link>
            <button
              type="button"
              onClick={() => router.push('/admin/operations')}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition"
            >
              Activate and continue
            </button>
          </div>
        </div>
      </main>

      <footer className="p-6 text-center text-[10px] text-slate-400">
        Staff portal. Encrypted with AES-256.
      </footer>
    </div>
  );
}
