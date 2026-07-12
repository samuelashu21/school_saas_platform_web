import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import DashboardWrapper from './dashboardWrapper';
import { Toaster } from 'sonner'; // 👈 1. Import Toaster

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EduCore | Student Information Management System',
  description: 'Institutional administrative terminal for managing academic courses, student registries, faculty directories, and performance analytics.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <DashboardWrapper>{children}</DashboardWrapper>
        
        {/* 👈 2. Add Toaster here so it's accessible across all views */}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}