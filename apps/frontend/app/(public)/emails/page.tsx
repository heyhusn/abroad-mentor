'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function EmailTemplatesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-start mb-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            TRANSACTIONAL EMAILS
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Email templates
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            600px preview using single-column markup. Plain-text versions sent alongside.
          </p>
        </div>

        {/* 2x2 Grid of 600px Email Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-start">
          {/* TEMPLATE 1: Booking accepted */}
          <div className="space-y-2">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block truncate">
              Booking accepted · Subject: &quot;Ayesha accepted: pay to confirm your time&quot;
            </span>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-sm space-y-4">
              {/* Email Brand Header */}
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#046a55] text-white text-[10px] font-bold">
                  ✓
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Study Abroad Mentor
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold tracking-wider text-amber-600 dark:text-amber-400 uppercase">
                  ACTION NEEDED
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  Ayesha accepted your request
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Pay now to confirm your session. We hold your payment until the session is done.
                </p>
              </div>

              {/* Data Card */}
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3.5 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Service:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">60-min video call</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">When:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Tue 20 Oct · 21:00 PKT</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-700/60 pt-2 font-bold">
                  <span className="text-slate-800 dark:text-white">Total:</span>
                  <span className="text-emerald-700 dark:text-emerald-400">PKR 5,250</span>
                </div>
              </div>

              <Link
                href="/payment"
                className="w-full inline-block text-center rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 py-2.5 text-xs font-bold text-white shadow-xs transition"
              >
                Pay PKR 5,250
              </Link>

              <p className="text-[10px] text-slate-400 text-center">
                Free cancellation until Mon 19 Oct, 21:00 PKT.
              </p>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 text-[10px] text-slate-400">
                You&apos;re getting this because you requested a booking on Study Abroad Mentor. View bookings anytime in your account.
              </div>
            </div>
          </div>

          {/* TEMPLATE 2: Payment held / Booking Confirmed */}
          <div className="space-y-2">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block truncate">
              Payment held · Subject: &quot;Your session is booked for Tue 20 Oct, 21:00 PKT&quot;
            </span>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#046a55] text-white text-[10px] font-bold">
                  ✓
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Study Abroad Mentor
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
                  BOOKING CONFIRMED
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  Your session is booked
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Your PKR 5,250 is held safely until you confirm the session is completed.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3.5 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Mentor:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Ayesha M. · TU Berlin</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">When:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Tue 20 Oct · 21:00 PKT (18:00 Berlin)</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-700/60 pt-2">
                  <span className="text-slate-400">Booking:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">#4812</span>
                </div>
              </div>

              <Link
                href="/bookings/4812"
                className="w-full inline-block text-center rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 py-2.5 text-xs font-bold text-white shadow-xs transition"
              >
                View booking
              </Link>

              <p className="text-[10px] text-slate-400 text-center">
                Free cancellation until Mon 19 Oct, 21:00 PKT.
              </p>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 text-[10px] text-slate-400">
                You&apos;re receiving this confirmation for your session on Study Abroad Mentor.
              </div>
            </div>
          </div>

          {/* TEMPLATE 3: 1-hour session reminder */}
          <div className="space-y-2">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block truncate">
              Reminder (24 hours left) · Subject: &quot;Your session starts in 1 hour&quot;
            </span>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#046a55] text-white text-[10px] font-bold">
                  ✓
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Study Abroad Mentor
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                  REMINDER
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  Your session starts in 1 hour
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Join from your booking page a few minutes early to check your camera and mic.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3.5 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">When:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Today · 21:00 PKT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Where to meet:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Video call on platform</span>
                </div>
              </div>

              <Link
                href="/bookings/4812"
                className="w-full inline-block text-center rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 py-2.5 text-xs font-bold text-white shadow-xs transition"
              >
                Go to the lobby
              </Link>

              <p className="text-[10px] text-slate-400 text-center">
                Technical problems on the day? You can reschedule for free from the call.
              </p>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 text-[10px] text-slate-400">
                You&apos;re receiving this because you have an upcoming mentorship call scheduled.
              </div>
            </div>
          </div>

          {/* TEMPLATE 4: Mentor weekly payout */}
          <div className="space-y-2">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block truncate">
              Mentor payout · Subject: &quot;Your weekly payout is on its way&quot;
            </span>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#046a55] text-white text-[10px] font-bold">
                  ✓
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Study Abroad Mentor
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold tracking-wider text-teal-600 dark:text-teal-400 uppercase">
                  PAYOUT
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  Your weekly payout is on its way
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Thanks for helping Sara clarify her studies this week!
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3.5 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Amount:</span>
                  <span className="font-extrabold text-emerald-700 dark:text-emerald-400">PKR 12,750</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sessions:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">3 confirmed</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-700/60 pt-2">
                  <span className="text-slate-400">To:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Meezan Bank ····4410</span>
                </div>
              </div>

              <Link
                href="/mentor/dashboard"
                className="w-full inline-block text-center rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 py-2.5 text-xs font-bold text-white shadow-xs transition"
              >
                See earnings
              </Link>

              <p className="text-[10px] text-slate-400 text-center">
                Bank transfers take 1-2 working days to show in your account.
              </p>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 text-[10px] text-slate-400">
                You&apos;re receiving this statement as a registered mentor on Study Abroad Mentor.
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
