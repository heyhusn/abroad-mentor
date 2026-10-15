import React from 'react';
import AuthSidebar from '@/components/AuthSidebar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      {/* Left: form panel */}
      <main className="flex flex-1 flex-col justify-center bg-slate-50 dark:bg-slate-950 px-6 py-12 sm:px-10 lg:px-14 xl:px-20 transition-colors duration-200">
        {children}
      </main>

      {/* Right: green decorative sidebar */}
      <AuthSidebar />
    </div>
  );
}
