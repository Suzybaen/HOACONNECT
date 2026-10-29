'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useMockAuth } from '@/contexts/MockAuthContext';
import DashboardLayout from './DashboardLayout';

interface ProtectedDashboardProps {
  children: ReactNode;
}

export default function ProtectedDashboard({ children }: ProtectedDashboardProps) {
  const router = useRouter();
  const { user, loading } = useMockAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  // Always return the layout to maintain consistent hook calls
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
