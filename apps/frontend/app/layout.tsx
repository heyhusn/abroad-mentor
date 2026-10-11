import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { LocaleProvider } from '@/context/LocaleContext';
import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';

export const metadata: Metadata = {
  title: "Study Abroad Mentor | Guided by Someone Who's Done It",
  description:
    '1-on-1 mentorship sessions with verified Pakistani students in Germany and the UK.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased transition-colors duration-200">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <LocaleProvider>
              {children}
            </LocaleProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
