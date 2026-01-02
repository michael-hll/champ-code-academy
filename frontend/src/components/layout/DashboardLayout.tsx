import type { ReactNode } from 'react';
import TopNavigation from './TopNavigation';
import Footer from './Footer';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-purple-50 to-pink-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg transition-colors duration-300 flex flex-col">
      <TopNavigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grow w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
