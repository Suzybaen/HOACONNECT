'use client';

import React from 'react';
import { MockAuthProvider } from '@/contexts/MockAuthContext';
import { CommunityProvider } from '@/contexts/CommunityContext';
import { Toaster } from 'sonner';
import ServiceWorkerRegistrar from '@/components/ui/ServiceWorkerRegistrar';

export function ClientTemplate({ children }: { children: React.ReactNode }) {
  return (
    <MockAuthProvider>
      <CommunityProvider>
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
      </CommunityProvider>
    </MockAuthProvider>
  );
}
