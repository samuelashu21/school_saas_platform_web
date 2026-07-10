'use client';

import Navbar from '@/app/(components)/Navbar';
import Sidebar from '@/app/(components)/Sidebar';
import StoreProvider, { useAppSelector } from './redux';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const AUTH_PATHS = ['/login', '/signup'];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = AUTH_PATHS.includes(pathname);

  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const token = useAppSelector((state) => state.global.token);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (!isAuthPage && !token) {
      router.push('/login');
    }
    if (isAuthPage && token) {
      router.push('/dashboard');
    }
  }, [token, isAuthPage, router]);

  if (isAuthPage) {
    return <div className={`${isDarkMode ? 'dark bg-gray-900 text-white' : 'light bg-white text-gray-900'} min-h-screen w-full`}>{children}</div>;
  }

  // Prevent flashing unauthenticated content while redirect executes
  if (!token) return null;

  return (
    <div
      className={`${
        isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'light bg-gray-50 text-gray-900'
      } flex w-full min-h-screen transition-colors duration-200`}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full min-h-screen py-7 px-9 transition-[padding] duration-300 ease-in-out ${
          isDarkMode ? 'bg-gray-900/40' : 'bg-gray-50'
        } ${
          isSidebarCollapsed ? 'md:pl-24' : 'md:pl-72'
        }`}
      >
        <Navbar />
        <div className="flex-grow mt-6">
          {children}
        </div>
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;