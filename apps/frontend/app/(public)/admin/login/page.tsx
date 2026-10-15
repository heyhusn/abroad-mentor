'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

export default function AdminLoginPage() {
  const router = useRouter();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    // Auto advance
    if (value && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/admin/operations');
    }, 600);
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
        <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-xl text-center space-y-6">
          <div className="h-12 w-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xl font-bold mx-auto">
            🔐
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              Enter your authenticator code
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Open Google Authenticator or 1Password and enter the 6-digit code.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-2">
              {digits.map((digit, idx) => (
                <input
                  key={idx}
                  id={`digit-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  className="w-10 h-12 text-center text-lg font-black rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-600"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </form>

          <div className="text-xs text-slate-400 space-y-1">
            <p>Lost your device?</p>
            <Link href="/admin/setup-2fa" className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
              Setup 2-step verification again
            </Link>
          </div>
        </div>
      </main>

      <footer className="p-6 text-center text-[10px] text-slate-400">
        Staff portal. All activities are cryptographically signed and logged.
      </footer>
    </div>
  );
}
