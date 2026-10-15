import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import CountryGuides from '@/components/CountryGuides';
import MentorBanner from '@/components/MentorBanner';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Study Abroad Mentor | Guided by Someone Who\'s Done It',
  description:
    '1-on-1 mentorship sessions with verified Pakistani students in Germany and the UK. Honest university application guidance with Safepay escrow protection.',
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <CountryGuides />
        <MentorBanner />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
