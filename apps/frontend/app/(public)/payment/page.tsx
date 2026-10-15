'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PaymentPage() {
  const router = useRouter();

  // State switcher to preview Screens 8, 9, 10, 11, 12 per Figma prototype
  const [viewState, setViewState] = useState<'checkout' | 'processing' | 'received' | 'failed' | 'cancelled'>('checkout');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'jazzcash' | 'easypaisa'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('123');
  const [nameOnCard, setNameOnCard] = useState('Sara Khan');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setViewState('processing');

    if (typeof window !== 'undefined') {
      const paid = parseInt(localStorage.getItem('metrics_paid') || '0', 10);
      localStorage.setItem('metrics_paid', String(paid + 1));
      const confirmed = parseInt(localStorage.getItem('metrics_sessions_confirmed') || '0', 10);
      localStorage.setItem('metrics_sessions_confirmed', String(confirmed + 1));
    }

    setTimeout(() => {
      setViewState('received');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Prototype State Switcher Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-xs">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
            Figma Prototype Screens:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'checkout', label: '8 · Checkout' },
              { id: 'processing', label: '12 · Processing' },
              { id: 'received', label: '9 · Payment received' },
              { id: 'failed', label: '10 · Payment failed' },
              { id: 'cancelled', label: '11 · Payment cancelled' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setViewState(st.id as any)}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                  viewState === st.id
                    ? 'bg-[#046a55] text-white shadow-xs'
                    : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* SCREEN 12: PROCESSING PAYMENT */}
        {viewState === 'processing' && (
          <div className="mx-auto max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 animate-spin">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            </div>
            <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
              Confirming your payment...
            </h2>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Please wait while Safepay verifies your transaction with your bank. Do not refresh or close this page.
            </p>
          </div>
        )}

        {/* SCREEN 9: PAYMENT RECEIVED (Figma Screen 9) */}
        {viewState === 'received' && (
          <div className="mx-auto max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 sm:p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-2xl font-bold">
              ✓
            </div>
            <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
              Payment received
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Your session is confirmed with Ayesha M. for <strong>Tue 20 Oct at 21:00 PKT</strong>.
            </p>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => router.push('/booking/confirmed')}
                className="w-full sm:w-auto rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 px-8 py-3 text-sm font-bold text-white shadow-xs transition"
              >
                Go to my bookings →
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 10: PAYMENT FAILED (Figma Screen 10) */}
        {viewState === 'failed' && (
          <div className="mx-auto max-w-lg rounded-3xl border border-rose-200 dark:border-rose-900/60 bg-white dark:bg-slate-900 p-10 sm:p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 text-2xl font-bold">
              ✕
            </div>
            <h2 className="mt-5 text-xl font-bold text-rose-700 dark:text-rose-400">
              Your payment didn&apos;t go through
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
              Your bank declined the transaction. Check card details, ensure online/international payments are enabled on your card, or try JazzCash / Easypaisa.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setViewState('checkout')}
                className="w-full sm:w-auto rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 px-6 py-2.5 text-xs font-bold text-white shadow-xs"
              >
                Try again
              </button>
              <button
                type="button"
                onClick={() => {
                  setPaymentMethod('jazzcash');
                  setViewState('checkout');
                }}
                className="w-full sm:w-auto rounded-xl border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Use JazzCash / Easypaisa
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 11: PAYMENT CANCELLED (Figma Screen 11) */}
        {viewState === 'cancelled' && (
          <div className="mx-auto max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 sm:p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-2xl">
              ⏱️
            </div>
            <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
              Payment cancelled
            </h2>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
              You cancelled the payment. No money was deducted. Your time slot is reserved for another 15 minutes if you wish to complete booking.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setViewState('checkout')}
                className="w-full sm:w-auto rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 px-6 py-2.5 text-xs font-bold text-white shadow-xs"
              >
                Resume payment
              </button>
              <Link
                href="/booking/confirmed"
                className="w-full sm:w-auto rounded-xl border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-center"
              >
                My bookings
              </Link>
            </div>
          </div>
        )}

        {/* SCREEN 8: CHECKOUT (Figma Screen 8) */}
        {viewState === 'checkout' && (
          <div className="space-y-6">
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-[10px]">✓</span>
                <span>Request sent</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">───</span>
              <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-[10px]">✓</span>
                <span>Accepted</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">───</span>
              <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-bold">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white text-[10px]">3</span>
                <span>Make payment</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">───</span>
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-[10px]">4</span>
                <span>Session</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
              {/* Left Column: Accepted banner & Payment Form */}
              <div className="lg:col-span-7 space-y-6 text-start">
                {/* Accepted Banner */}
                <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/90 dark:bg-emerald-950/50 p-4 flex items-start gap-3">
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold text-base mt-0.5">✓</span>
                  <div>
                    <h3 className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                      Ayesha has accepted your request!
                    </h3>
                    <p className="mt-0.5 text-xs text-emerald-800 dark:text-emerald-300">
                      Tue 20 Oct · 21:00 PKT (18:00 Berlin)
                    </p>
                  </div>
                </div>

                {/* Session Box */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        60-min video call with Ayesha M.
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                        Tue 20 Oct · 21:00 PKT
                      </p>
                    </div>
                    <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                      PKR 5,000
                    </span>
                  </div>
                </div>

                {/* Payment Methods Card */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                    Pay with Safepay
                  </h3>

                  <div className="space-y-2 mb-5">
                    {[
                      { id: 'card', label: 'Debit or credit card', badge: 'Visa / MC' },
                      { id: 'jazzcash', label: 'JazzCash Wallet', badge: 'Direct' },
                      { id: 'easypaisa', label: 'Easypaisa Wallet', badge: 'Direct' },
                    ].map((m) => (
                      <label
                        key={m.id}
                        className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 transition ${
                          paymentMethod === m.id
                            ? 'border-emerald-600 bg-emerald-50/50 dark:border-emerald-500 dark:bg-emerald-950/40'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="method"
                            checked={paymentMethod === m.id}
                            onChange={() => setPaymentMethod(m.id as any)}
                            className="accent-emerald-600"
                          />
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                            {m.label}
                          </span>
                        </div>
                        <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] text-slate-500">
                          {m.badge}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Card Form */}
                  <form onSubmit={handlePay} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Card number
                      </label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          required
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          CVC
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          required
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Name on card
                      </label>
                      <input
                        type="text"
                        required
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 py-3 text-xs font-bold text-white shadow-xs transition"
                    >
                      Pay PKR 5,250 &amp; confirm booking →
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Summary Card */}
              <aside className="lg:col-span-5">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs text-start space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                    Order Summary
                  </h3>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">60-min video call</span>
                      <span className="font-semibold text-slate-800 dark:text-white">PKR 5,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Platform service fee (5%)</span>
                      <span className="font-semibold text-slate-800 dark:text-white">PKR 250</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-2.5 text-sm font-bold">
                      <span>Total Due:</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">PKR 5,250</span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3.5 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                    🔒 <strong>Safepay Escrow protection:</strong> Payment is held safely by our platform until you confirm your session was held.
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
