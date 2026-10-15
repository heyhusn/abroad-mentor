'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LangToggle from '@/components/LangToggle';
import ThemeToggle from '@/components/ThemeToggle';

export default function MentorApplicationPage() {
  const t = useTranslations('MentorApplication');
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'upload' | 'email'>('upload');
  const [hasFile, setHasFile] = useState(false);
  const [fileName, setFileName] = useState('');
  const [studentEmailInput, setStudentEmailInput] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Step 1: About you
  const [aboutBio, setAboutBio] = useState('Passionate about guiding students through the application journey.');
  const [cityOfOrigin, setCityOfOrigin] = useState('Lahore, Pakistan');
  const [languages, setLanguages] = useState('English, Urdu, German (B1)');

  // Step 2: Your studies
  const [university, setUniversity] = useState('Technical University of Berlin (TU Berlin)');
  const [degreeProgram, setDegreeProgram] = useState('MSc Computer Science');
  const [startYear, setStartYear] = useState('2024');

  // Step 3: Sessions and prices
  const [videoCallPrice, setVideoCallPrice] = useState('3500');
  const [writtenQPrice, setWrittenQPrice] = useState('1200');
  const [sopReviewPrice, setSopReviewPrice] = useState('5000');

  // Step 5: Payout details
  const [bankName, setBankName] = useState('Meezan Bank');
  const [iban, setIban] = useState('PK64MEZN0001234567890123');
  const [accountTitle, setAccountTitle] = useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName =
        sessionStorage.getItem('registered_name') ||
        localStorage.getItem('registered_name') ||
        localStorage.getItem('user_name') ||
        '';
      if (storedName) {
        setAccountTitle(storedName);
      }
    }
  }, []);

  const steps = [
    { num: 1, label: 'About you' },
    { num: 2, label: 'Your studies' },
    { num: 3, label: 'Sessions and prices' },
    { num: 4, label: 'Verification' },
    { num: 5, label: 'Payout details' },
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      router.push('/mentor/dashboard');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      router.push('/register?role=mentor');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setHasFile(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Navbar */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-700 text-white shadow-sm">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </span>
              <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
                Study Abroad Mentor
              </span>
            </Link>

            <span className="hidden text-xs text-slate-400 sm:inline-block">/</span>
            <span className="hidden text-xs font-medium text-slate-600 dark:text-slate-300 sm:inline-block">
              {t('headerTitle')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LangToggle />
          </div>
        </div>
      </header>

      {/* Main Grid: Left Stepper & Right Form Card */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Stepper Sidebar */}
          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Become a mentor</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Earn in PKR by helping prospective students
              </p>

              <nav className="mt-6 space-y-4">
                {steps.map((s) => {
                  const isDone = s.num < currentStep;
                  const isActive = s.num === currentStep;

                  return (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => setCurrentStep(s.num)}
                      className="flex items-center gap-3 w-full text-left"
                    >
                      {isDone ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 text-xs font-bold">
                          ✓
                        </span>
                      ) : isActive ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-emerald-700 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                          {s.num}
                        </span>
                      ) : (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 text-slate-400 text-xs">
                          {s.num}
                        </span>
                      )}

                      <span
                        className={`text-xs ${
                          isActive
                            ? 'font-bold text-emerald-900 dark:text-emerald-400'
                            : isDone
                            ? 'text-slate-700 dark:text-slate-200 font-medium'
                            : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {s.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Right Main Form Card */}
          <main className="lg:col-span-8">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
              {/* STEP 1: About you */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Tell us about yourself</h1>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      This information helps students learn about your background and application journey.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Origin City &amp; Country
                      </label>
                      <input
                        type="text"
                        value={cityOfOrigin}
                        onChange={(e) => setCityOfOrigin(e.target.value)}
                        placeholder="e.g. Lahore, Pakistan"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Bio &amp; Mentorship Focus
                      </label>
                      <textarea
                        rows={4}
                        value={aboutBio}
                        onChange={(e) => setAboutBio(e.target.value)}
                        placeholder="Share your journey from Pakistan to your university abroad..."
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Languages Spoken
                      </label>
                      <input
                        type="text"
                        value={languages}
                        onChange={(e) => setLanguages(e.target.value)}
                        placeholder="e.g. English, Urdu, German"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Your studies */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Your university &amp; program</h1>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Students look for mentors attending their dream universities.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Current University
                      </label>
                      <input
                        type="text"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        placeholder="e.g. Technical University of Berlin"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Degree &amp; Major
                      </label>
                      <input
                        type="text"
                        value={degreeProgram}
                        onChange={(e) => setDegreeProgram(e.target.value)}
                        placeholder="e.g. MSc Computer Science"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Start Year / Semester
                      </label>
                      <input
                        type="text"
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                        placeholder="e.g. Winter 2024"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Sessions and prices */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Set your session prices</h1>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      You keep 95% of your earnings. Payouts are made directly in PKR to your Pakistani bank.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">60-Min 1-on-1 Video Call</p>
                        <p className="text-[11px] text-slate-400">Profile guidance, SOP review, or visa checklist</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-slate-400">PKR</span>
                        <input
                          type="number"
                          value={videoCallPrice}
                          onChange={(e) => setVideoCallPrice(e.target.value)}
                          className="w-24 rounded-lg border border-slate-300 dark:border-slate-700 px-2.5 py-1 text-xs font-semibold text-slate-900 dark:text-white text-right"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">Written Question (Async)</p>
                        <p className="text-[11px] text-slate-400">Detailed written answer within 48 hours</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-slate-400">PKR</span>
                        <input
                          type="number"
                          value={writtenQPrice}
                          onChange={(e) => setWrittenQPrice(e.target.value)}
                          className="w-24 rounded-lg border border-slate-300 dark:border-slate-700 px-2.5 py-1 text-xs font-semibold text-slate-900 dark:text-white text-right"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">Complete SOP/CV Review</p>
                        <p className="text-[11px] text-slate-400">Annotated edits and line-by-line feedback</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-slate-400">PKR</span>
                        <input
                          type="number"
                          value={sopReviewPrice}
                          onChange={(e) => setSopReviewPrice(e.target.value)}
                          className="w-24 rounded-lg border border-slate-300 dark:border-slate-700 px-2.5 py-1 text-xs font-semibold text-slate-900 dark:text-white text-right"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Verification (Figma Screen 11) */}
              {currentStep === 4 && (
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white text-start">Verify your enrolment</h1>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 text-start">
                    Upload a current enrolment certificate, student card, or offer letter from your university.
                  </p>

                  {/* Tabs */}
                  <div className="mt-6 flex gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('upload')}
                      className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                        activeTab === 'upload'
                          ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      Upload a document
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('email')}
                      className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                        activeTab === 'email'
                          ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      Provide student email
                    </button>
                  </div>

                  {activeTab === 'upload' ? (
                    <div>
                      {/* Drag and Drop Box */}
                      <label className="mt-6 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40 p-8 text-center cursor-pointer transition hover:border-slate-400 dark:hover:border-slate-600">
                        <input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          className="hidden"
                          onChange={handleFileSelect}
                        />
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mb-3">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        </div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          Drag your enrolment certificate here
                        </p>
                        <p className="mt-1 text-[11px] text-slate-400 max-w-sm">
                          PDF, PNG or JPEG, up to 10 MB. Please ensure your name and university name are clear.
                        </p>

                        <span className="mt-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-sm inline-block">
                          Choose a file
                        </span>
                      </label>

                      {/* Uploaded File Preview Badge */}
                      {hasFile && (
                        <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 shadow-sm">
                          <div className="flex items-center gap-2.5">
                            <span className="text-slate-400">📄</span>
                            <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                              {fileName || 'Immatrikulationsbescheinigung.pdf'}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                              ✓ Uploaded just now
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setHasFile(false);
                                setFileName('');
                              }}
                              className="text-xs text-red-500 hover:text-red-700"
                              title="Remove file"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-6 space-y-4">
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        Enter your university-issued email address (e.g. @campus.tu-berlin.de or @ucl.ac.uk) and we will send a 1-click verification link.
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={studentEmailInput}
                          onChange={(e) => setStudentEmailInput(e.target.value)}
                          placeholder="your.name@campus.tu-berlin.de"
                          className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 px-3.5 py-2 text-xs text-slate-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => setEmailSubmitted(true)}
                          className="rounded-lg bg-emerald-700 text-white px-4 py-2 text-xs font-semibold"
                        >
                          Send link
                        </button>
                      </div>
                      {emailSubmitted && (
                        <p className="text-xs text-emerald-700 font-semibold">
                          ✓ Verification link sent to your student email.
                        </p>
                      )}
                    </div>
                  )}

                  <p className="mt-6 text-[11px] leading-relaxed text-slate-400 dark:text-slate-400 text-start">
                    • We check your identity before your profile goes live. Document data is used solely for verification and is never shown publicly.
                  </p>
                </div>
              )}

              {/* STEP 5: Payout details */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Payout details</h1>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Earnings are transferred directly in PKR to your Pakistani bank account or Easypaisa/JazzCash.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="e.g. Meezan Bank / HBL / Standard Chartered"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Account Title (Must match CNIC)
                      </label>
                      <input
                        type="text"
                        value={accountTitle}
                        onChange={(e) => setAccountTitle(e.target.value)}
                        placeholder="e.g. Sara Khan"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        IBAN / Account Number
                      </label>
                      <input
                        type="text"
                        value={iban}
                        onChange={(e) => setIban(e.target.value)}
                        placeholder="PK64MEZN0001234567890123"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                >
                  ← {currentStep === 1 ? 'Back to sign up' : 'Back'}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-lg bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-white shadow-sm"
                >
                  {currentStep === 5 ? 'Submit application →' : 'Save and continue'}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
