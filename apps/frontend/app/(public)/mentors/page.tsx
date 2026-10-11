'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MentorsPage() {
  // Hero search states
  const [searchQuery, setSearchQuery] = useState('');
  const [heroDestination, setHeroDestination] = useState('both');

  // Left sidebar filter states
  const [destinationFilter, setDestinationFilter] = useState<'both' | 'germany' | 'uk'>('both');
  const [helpWith, setHelpWith] = useState({
    programmes: false,
    sop: true, // checked by default per Figma prototype
    visas: false,
    scholarships: false,
    housing: false,
  });
  const [priceFilter, setPriceFilter] = useState<'any' | 'under3k' | '3kto5k' | 'over5k'>('any');
  const [mentorFilter, setMentorFilter] = useState({
    femaleOnly: false,
    freeIntro: false,
    verifiedOnly: true, // checked by default per Figma prototype
  });
  const [sortBy, setSortBy] = useState('best_match');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      {/* Hero Section */}
      <section className="border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0B1120] py-10 sm:py-14 transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading, Subtitle, Search box, Trust indicators */}
            <div className="lg:col-span-7">
              {/* Top Country Route Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1 shadow-2xs">
                  <span className="text-xs">🇵🇰</span>
                  <svg className="w-3.5 h-2.5 text-slate-400" viewBox="0 0 16 12" fill="none">
                    <path
                      d="M1 6C4 2 8 10 12 6M12 6L9 3M12 6L9 9"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="2 2"
                    />
                  </svg>
                  <span className="text-xs">🇩🇪</span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Germany</span>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1 shadow-2xs">
                  <span className="text-xs">🇵🇰</span>
                  <svg className="w-3.5 h-2.5 text-slate-400" viewBox="0 0 16 12" fill="none">
                    <path
                      d="M1 6C4 2 8 10 12 6M12 6L9 3M12 6L9 9"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="2 2"
                    />
                  </svg>
                  <span className="text-xs">🇬🇧</span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">United Kingdom</span>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-start">
                Study abroad, guided by<br />
                someone who&apos;s{' '}
                <span className="underline decoration-[#f97316] decoration-4 underline-offset-8">
                  done it.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-xl text-start">
                Book a 1 - on - 1 video call with a verified Pakistani student in Germany or the UK. Shortlists, SOPs, visas, your first month. We hold your payment until the session is done.
              </p>

              {/* Hero Search Box */}
              <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sm:p-3.5 shadow-sm max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:items-end">
                  {/* University or programme */}
                  <div className="sm:col-span-5 text-start">
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      University or programme
                    </label>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g. TU Munich, MSc Data Science"
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition"
                    />
                  </div>

                  {/* Destination */}
                  <div className="sm:col-span-4 text-start">
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Destination
                    </label>
                    <div className="relative">
                      <select
                        value={heroDestination}
                        onChange={(e) => {
                          setHeroDestination(e.target.value);
                          if (e.target.value === 'germany') setDestinationFilter('germany');
                          else if (e.target.value === 'uk') setDestinationFilter('uk');
                          else setDestinationFilter('both');
                        }}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition appearance-none pr-8 cursor-pointer"
                      >
                        <option value="both">Germany and UK</option>
                        <option value="germany">Germany</option>
                        <option value="uk">United Kingdom</option>
                      </select>
                      <span className="pointer-events-none absolute right-2.5 top-2.5 text-slate-400 text-xs">▼</span>
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="sm:col-span-3">
                    <button
                      type="button"
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#046a55] hover:bg-[#035947] dark:bg-emerald-600 dark:hover:bg-emerald-500 py-2.5 px-3 text-xs font-bold text-white shadow-xs transition"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <span>Search mentors</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Trust Indicators Row */}
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Enrolment checked by our team</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-700 dark:text-emerald-400 text-xs">🛡️</span>
                  <span>Payment held until your session</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>Times shown in Pakistan time</span>
                </div>
              </div>
            </div>

            {/* Right Column: FLIGHT PATH ARC MAP GRAPHIC */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-[420px] h-[220px] sm:h-[250px]">
                <svg
                  viewBox="0 0 420 240"
                  className="w-full h-full overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Subtle soft aura */}
                  <defs>
                    <radialGradient id="mapGlow" cx="60%" cy="40%" r="55%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="260" cy="110" r="120" fill="url(#mapGlow)" />

                  {/* Flight Trajectory Curved Arc */}
                  {/* Starting in bottom-left Pakistan, arching high through UK, landing in Germany */}
                  <path
                    d="M 60 175 C 120 75, 230 25, 290 50 C 315 60, 345 70, 375 88"
                    className="stroke-slate-300 dark:stroke-slate-700"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    fill="none"
                  />

                  {/* 1. Origin: Pakistan (Lahore · Karachi · Islamabad) */}
                  <circle cx="60" cy="175" r="5" className="fill-slate-700 dark:fill-slate-300" />
                  <circle cx="60" cy="175" r="9" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" />
                  <text
                    x="60"
                    y="204"
                    textAnchor="middle"
                    className="fill-slate-600 dark:fill-slate-400 text-[11px] font-medium"
                  >
                    Lahore · Karachi · Islamabad
                  </text>

                  {/* 2. Destination: United Kingdom (Peak, Blue dot) */}
                  <circle cx="290" cy="50" r="5" fill="#2563eb" />
                  <circle cx="290" cy="50" r="9" stroke="#93c5fd" strokeWidth="1.5" className="opacity-80" />
                  <text
                    x="290"
                    y="32"
                    textAnchor="middle"
                    className="fill-slate-800 dark:fill-slate-200 text-[11px] font-semibold"
                  >
                    United Kingdom
                  </text>

                  {/* 3. Destination: Germany (Right, Green dot) */}
                  <circle cx="375" cy="88" r="5" fill="#16a34a" />
                  <circle cx="375" cy="88" r="9" stroke="#86efac" strokeWidth="1.5" className="opacity-80" />
                  <text
                    x="392"
                    y="92"
                    textAnchor="start"
                    className="fill-slate-800 dark:fill-slate-200 text-[11px] font-semibold"
                  >
                    Germany
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Verified Mentors with Filter Sidebar */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Section Header: Title + Subtitle and Sort by */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div className="text-start">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Verified mentors
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              1 mentor available from PKR 3,000
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <label htmlFor="sort-select" className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Sort by
            </label>
            <div className="relative">
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-600 cursor-pointer pr-7"
              >
                <option value="best_match">Best match</option>
                <option value="rating">Highest rated</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
              <span className="pointer-events-none absolute right-2 top-2 text-slate-400 text-[10px]">▼</span>
            </div>
          </div>
        </div>

        {/* Content Layout: Filters Sidebar + Mentors Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Filters Sidebar */}
          <aside className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-6 text-start">
              {/* Destination Radio Group */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-2.5">
                  Destination
                </h3>
                <div className="space-y-2">
                  {[
                    { id: 'both', label: 'Germany and UK' },
                    { id: 'germany', label: 'Germany' },
                    { id: 'uk', label: 'United Kingdom' },
                  ].map((dest) => (
                    <label key={dest.id} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                      <input
                        type="radio"
                        name="destinationFilter"
                        checked={destinationFilter === dest.id}
                        onChange={() => setDestinationFilter(dest.id as any)}
                        className="accent-emerald-600 h-3.5 w-3.5"
                      />
                      <span>{dest.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Help with Checkbox Group */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-2.5">
                  Help with
                </h3>
                <div className="space-y-2">
                  {[
                    { key: 'programmes', label: 'Choosing programmes' },
                    { key: 'sop', label: 'SOP and CV review' },
                    { key: 'visas', label: 'Visa documents' },
                    { key: 'scholarships', label: 'Scholarships' },
                    { key: 'housing', label: 'Housing and first month' },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(helpWith as any)[item.key]}
                        onChange={(e) =>
                          setHelpWith((prev) => ({
                            ...prev,
                            [item.key]: e.target.checked,
                          }))
                        }
                        className="accent-emerald-600 h-3.5 w-3.5 rounded"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price per session Radio Group */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-2.5">
                  Price per session
                </h3>
                <div className="space-y-2">
                  {[
                    { id: 'any', label: 'Any price' },
                    { id: 'under3k', label: 'Under PKR 3,000' },
                    { id: '3kto5k', label: 'PKR 3,000 – 5,000' },
                    { id: 'over5k', label: 'Over PKR 5,000' },
                  ].map((price) => (
                    <label key={price.id} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                      <input
                        type="radio"
                        name="priceFilter"
                        checked={priceFilter === price.id}
                        onChange={() => setPriceFilter(price.id as any)}
                        className="accent-emerald-600 h-3.5 w-3.5"
                      />
                      <span>{price.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mentor Checkbox Group */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-2.5">
                  Mentor
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={mentorFilter.femaleOnly}
                      onChange={(e) =>
                        setMentorFilter((prev) => ({ ...prev, femaleOnly: e.target.checked }))
                      }
                      className="accent-emerald-600 h-3.5 w-3.5 rounded"
                    />
                    <span>Female mentors only</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={mentorFilter.freeIntro}
                      onChange={(e) =>
                        setMentorFilter((prev) => ({ ...prev, freeIntro: e.target.checked }))
                      }
                      className="accent-emerald-600 h-3.5 w-3.5 rounded"
                    />
                    <span>Offers free intro call</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={mentorFilter.verifiedOnly}
                      onChange={(e) =>
                        setMentorFilter((prev) => ({ ...prev, verifiedOnly: e.target.checked }))
                      }
                      className="accent-emerald-600 h-3.5 w-3.5 rounded"
                    />
                    <span>Verified mentors only</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Mentors Grid: EXACTLY AYESHA M. ONLY */}
          <main className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Mentor Card: Ayesha M. */}
              <Link
                href="/mentors/ayesha-m"
                className="group block rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:border-emerald-600/50 dark:hover:border-emerald-500/50 hover:shadow-md transition duration-200"
              >
                {/* Header: Avatar, Name, Degree */}
                <div className="flex items-start gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-sm font-bold">
                    AM
                  </div>
                  <div className="flex-1 min-w-0 text-start">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
                      Ayesha M.
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      MSc Computer Science · TU Berlin
                    </p>
                  </div>
                </div>

                {/* Badges row */}
                <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                    ✓ Verified
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                    <span>🇵🇰</span>
                    <span className="text-slate-400 text-[10px]">⤳</span>
                    <span>🇩🇪</span>
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                    ★ Top mentor
                  </span>
                </div>

                {/* Bio text */}
                <p className="mt-3.5 text-xs text-slate-600 dark:text-slate-300 text-start leading-relaxed">
                  Applied through uni-assist from Lahore. Shortlists, SOPs and the first month in Berlin.
                </p>

                {/* Price and Rating footer */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4">
                  <div className="text-start">
                    <span className="text-[11px] text-slate-400">From</span>
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                      PKR 3,000
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                    <span>★ 4.9</span>
                    <span className="text-slate-400 font-normal">(27)</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Bottom Disclaimer */}
            <div className="mt-12 text-center">
              <p className="text-xs text-slate-400 dark:text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Mentors share their own experience. We never promise admission or a visa; always check official university and embassy pages.
              </p>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
