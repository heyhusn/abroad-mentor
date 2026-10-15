'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/StudentSidebar';
import ThemeToggle from '@/components/ThemeToggle';

interface Room {
  id: string;
  title: string;
  district: string;
  city: string;
  type: string; // 'Single room, shared kitchen', 'Studio', 'Private 1-bedroom'
  rentEur: number;
  rentPkr: string;
  discountedRentEur: number;
  availableFrom: string;
  verified: boolean;
  transitMins: number;
  campusName: string;
}

export default function HousingAgentPage() {
  const [selectedCity, setSelectedCity] = useState('Berlin');
  const [targetCampus, setTargetCampus] = useState('TU Berlin (Charlottenburg)');
  const [moveInDate, setMoveInDate] = useState('01/10/2027');
  const [budgetEur, setBudgetEur] = useState('Up to €450');

  // Modal state (Screen 9: Request a room)
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [moveInInput, setMoveInInput] = useState('1 Oct 2027');
  const [stayDuration, setStayDuration] = useState('12 months');
  const [requestMessage, setRequestMessage] = useState(
    "Hi, I'm starting an MSc at TU Berlin in October 2027 and would love to rent this room. I have a blocked account confirmation and clean police check ready."
  );
  const [requestSuccess, setRequestSuccess] = useState(false);

  const rooms: Room[] = [
    {
      id: 'r1',
      title: 'Single room, shared kitchen',
      district: 'Charlottenburg, Berlin (Zone A)',
      city: 'Berlin',
      type: 'Single student room',
      rentEur: 390,
      rentPkr: 'PKR 117,000',
      discountedRentEur: 370,
      availableFrom: '01/10/2027',
      verified: true,
      transitMins: 12,
      campusName: 'TU Berlin campus',
    },
    {
      id: 'r2',
      title: 'Room in 2-person WG',
      district: 'Moabit, Berlin (Zone A)',
      city: 'Berlin',
      type: 'Shared apartment (WG)',
      rentEur: 420,
      rentPkr: 'PKR 126,000',
      discountedRentEur: 400,
      availableFrom: '15/09/2027',
      verified: true,
      transitMins: 18,
      campusName: 'TU Berlin campus',
    },
    {
      id: 'r3',
      title: 'Furnished studio with kitchenette',
      district: 'Wedding, Berlin',
      city: 'Berlin',
      type: 'Private studio',
      rentEur: 520,
      rentPkr: 'PKR 156,000',
      discountedRentEur: 495,
      availableFrom: '01/10/2027',
      verified: true,
      transitMins: 22,
      campusName: 'TU Berlin campus',
    },
    {
      id: 'r4',
      title: 'Single room near Tiergarten',
      district: 'Tiergarten, Berlin',
      city: 'Berlin',
      type: 'Student house',
      rentEur: 410,
      rentPkr: 'PKR 123,000',
      discountedRentEur: 390,
      availableFrom: '01/10/2027',
      verified: true,
      transitMins: 15,
      campusName: 'TU Berlin campus',
    },
    {
      id: 'r5',
      title: 'Room in 3-person WG',
      district: 'Wilmersdorf, Berlin',
      city: 'Berlin',
      type: 'Shared apartment',
      rentEur: 395,
      rentPkr: 'PKR 118,500',
      discountedRentEur: 375,
      availableFrom: '01/10/2027',
      verified: true,
      transitMins: 16,
      campusName: 'TU Berlin campus',
    },
    {
      id: 'r6',
      title: 'Furnished 1-room studio near U-Bahn',
      district: 'Spandau, Berlin',
      city: 'Berlin',
      type: 'Private studio',
      rentEur: 460,
      rentPkr: 'PKR 138,000',
      discountedRentEur: 440,
      availableFrom: '01/10/2027',
      verified: true,
      transitMins: 25,
      campusName: 'TU Berlin campus',
    },
  ];

  const openRequest = (room: Room) => {
    setSelectedRoom(room);
    setShowRequestModal(true);
    setRequestSuccess(false);
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSuccess(true);
    setTimeout(() => {
      setShowRequestModal(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      <StudentSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 dark:text-white">Housing agent</span>
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

        {/* Content Area */}
        <main className="flex-1 p-6 sm:p-10 max-w-6xl w-full mx-auto space-y-6 text-start">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Find a place before you land
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Verified housing partners with scam-free guarantee. Valid for city registration (Anmeldung). Never send money outside our verified escrow.
            </p>
          </div>

          {/* Search Bar */}
          <div className="p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            <div className="lg:col-span-3 space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">City:</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-800 dark:text-slate-200 outline-none"
              >
                <option>Berlin</option>
                <option>Munich</option>
                <option>Aachen</option>
                <option>Manchester</option>
                <option>London</option>
              </select>
            </div>

            <div className="lg:col-span-4 space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Target Campus:</label>
              <input
                type="text"
                value={targetCampus}
                onChange={(e) => setTargetCampus(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-800 dark:text-slate-200 outline-none"
              />
            </div>

            <div className="lg:col-span-2 space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Move-in date:</label>
              <input
                type="text"
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-800 dark:text-slate-200 outline-none"
              />
            </div>

            <div className="lg:col-span-2 space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Budget / month:</label>
              <select
                value={budgetEur}
                onChange={(e) => setBudgetEur(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-800 dark:text-slate-200 outline-none"
              >
                <option>Up to €400</option>
                <option>Up to €450</option>
                <option>Up to €600</option>
              </select>
            </div>

            <div className="lg:col-span-1 pt-4 lg:pt-0">
              <button
                type="button"
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition"
              >
                Search
              </button>
            </div>
          </div>

          {/* Alert / Notice */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <span className="text-lg">🛡️</span>
              <div>
                <p className="font-bold text-emerald-900 dark:text-emerald-300">
                  Anmeldung Guaranteed · Scam Protection
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  All listings provide a valid Wohnungsgeberbestätigung (landlord confirmation) required for your visa and address registration.
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold">
                All
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-400">
                Dorms
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-400">
                Shared flat
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-400">
                Studios
              </span>
            </div>
          </div>

          {/* Rooms Grid (Screen 8) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden flex flex-col justify-between"
              >
                {/* Image Placeholder with Tag */}
                <div className="h-44 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-850 p-4 flex flex-col justify-between relative">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 text-[10px] font-bold backdrop-blur-xs">
                      {room.type}
                    </span>
                    <span className="h-6 w-6 rounded-full bg-white/80 dark:bg-slate-900/80 flex items-center justify-center text-xs text-slate-600 dark:text-slate-300">
                      ♡
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 px-2.5 py-1 rounded-xl w-fit backdrop-blur-xs">
                    <span>📍 {room.transitMins}m to {room.campusName}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-4 text-start">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {room.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {room.district}
                    </p>
                  </div>

                  {/* Pricing and Available */}
                  <div className="flex items-baseline justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-slate-900 dark:text-white">
                          €{room.discountedRentEur}
                        </span>
                        <span className="text-xs text-slate-400 line-through">€{room.rentEur}</span>
                        <span className="text-xs text-slate-500">/ month</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold block">
                        With 5% student discount
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Available</span>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {room.availableFrom}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => openRequest(room)}
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition"
                    >
                      Request room
                    </button>
                    <button
                      type="button"
                      onClick={() => alert('Room saved to favorites')}
                      className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Warning Alert */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-[11px] text-amber-900 dark:text-amber-200 text-start flex items-center gap-2.5">
            <span>⚠️</span>
            <span>
              <strong>Never pay a deposit before you view a room or contract.</strong> Always make payments through our escrow or official Studentenwerk portals.
            </span>
          </div>
        </main>
      </div>

      {/* SCREEN 9: REQUEST A ROOM MODAL */}
      {showRequestModal && selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-2xl text-start space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Request this room
              </h3>
              <button
                type="button"
                onClick={() => setShowRequestModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            {/* Room summary banner */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <span className="text-2xl">🏠</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {selectedRoom.title}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {selectedRoom.district}
                </p>
              </div>
            </div>

            {requestSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
                <p className="font-bold">✓ Booking request sent!</p>
                <p className="text-[11px]">The landlord will reply within 24 hours. Your payment details remain securely protected.</p>
              </div>
            ) : (
              <form onSubmit={handleSendRequest} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      Move-in
                    </label>
                    <input
                      type="text"
                      value={moveInInput}
                      onChange={(e) => setMoveInInput(e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-800 dark:text-slate-200 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      Stay for
                    </label>
                    <select
                      value={stayDuration}
                      onChange={(e) => setStayDuration(e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-800 dark:text-slate-200 outline-none"
                    >
                      <option>6 months</option>
                      <option>12 months</option>
                      <option>24 months</option>
                    </select>
                  </div>
                </div>

                {/* Message to landlord */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Message to landlord
                  </label>
                  <textarea
                    rows={3}
                    value={requestMessage}
                    onChange={(e) => setRequestMessage(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <p className="text-[10px] text-slate-400">
                    Contact details are hidden until the host accepts.
                  </p>
                </div>

                {/* Price summary */}
                <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-600 dark:text-slate-400">Rent</span>
                    <p className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400">
                      With 5% student discount
                    </p>
                  </div>
                  <span className="text-base font-black text-slate-900 dark:text-white">
                    €{selectedRoom.discountedRentEur} / month
                  </span>
                </div>

                {/* No payment now banner */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
                  <p className="font-bold text-slate-700 dark:text-slate-300">🛡️ No payment now</p>
                  <p>You will only pay after the landlord accepts and signs the tenancy agreement and Wohnungsgeberbestätigung.</p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowRequestModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition"
                  >
                    Send request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
