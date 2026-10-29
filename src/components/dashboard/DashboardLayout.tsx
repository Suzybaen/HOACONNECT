'use client';

import { ReactNode } from 'react';
import { useMockAuth } from '@/contexts/MockAuthContext';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useMockAuth();

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <DashboardSidebar role={user?.role || 'homeowner'} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {user && <DashboardHeader user={user} />}

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
