'use client';

import React from 'react';
import { MockAuthProvider } from '@/contexts/MockAuthContext';
import { Toaster } from 'sonner';
import ServiceWorkerRegistrar from '@/components/ui/ServiceWorkerRegistrar';

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MockAuthProvider>
      <ServiceWorkerRegistrar />
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '16px',
          },
        }}
      />
    </MockAuthProvider>
  );
}
