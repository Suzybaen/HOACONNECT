import React from 'react';
import { ClientTemplate } from '@/app/ClientTemplate';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ClientTemplate>
      {children}
    </ClientTemplate>
  );
}
