// ============================================================
// DBMS Learning Hub – Root Layout
// ============================================================
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/theme/ThemeProvider';
import AppShell from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: {
    default: 'DBMS Learning Hub – Master Database Management Systems Interactively',
    template: '%s | DBMS Learning Hub',
  },
  description:
    'Interactive educational platform for learning Database Management Systems (DBMS). Module 1: Introduction to DBMS with visualizations, quizzes, playground, and viva practice.',
  keywords: [
    'DBMS',
    'Database Management System',
    'Database',
    'SQL',
    'MySQL',
    'Learn DBMS',
    'DBMS Tutorial',
    'Computer Science',
    'Education',
  ],
  authors: [{ name: 'DBMS Learning Hub' }],
  openGraph: {
    title: 'DBMS Learning Hub',
    description: 'Master Database Management Systems Interactively',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
