'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CollectorLayout from './components/CollectorLayout';
import CollectorKPIs from './components/CollectorKPIs';
import RouteMapSection from './components/RouteMapSection';
import ConfirmedHouseholdsList from './components/ConfirmedHouseholdsList';
import UrgentPickupRequests from './components/UrgentPickupRequests';
import { useCommunity } from '@/contexts/CommunityContext';

export default function CollectorDashboardPage() {
  return (
    <CollectorLayout>
      <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading collector section...</div>}>
        <CollectorSectionRouter />
      </Suspense>
    </CollectorLayout>
  );
}

function CollectorSectionRouter() {
  const section = useSearchParams().get('section') || 'dashboard';

  if (section === 'map') {
    return <SectionShell><RouteMapSection /></SectionShell>;
  }
  if (section === 'households') {
    return <SectionShell><ConfirmedHouseholdsList /></SectionShell>;
  }
  if (section === 'urgent') {
    return <SectionShell><UrgentPickupRequests /></SectionShell>;
  }
  if (section === 'completed') {
    return <CompletedSection />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-5 space-y-5">
      <CollectorKPIs />
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        <div className="xl:col-span-3"><RouteMapSection /></div>
        <div className="xl:col-span-2"><UrgentPickupRequests /></div>
      </div>
      <ConfirmedHouseholdsList />
    </div>
  );
}

function CompletedSection() {
  const { confirmations, households } = useCommunity();
  const completed = confirmations.filter((item) => item.response === 'ready' && item.collected);
  return (
    <SectionShell>
      <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Completed Collections</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Collected households for the active route.</p>
        </div>
        <div className="divide-y divide-border">
          {completed.map((confirmation) => {
            const household = households.find((item) => item.id === confirmation.householdId);
            if (!household) return null;
            return (
              <div key={confirmation.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{household.block} - {household.lot}</p>
                  <p className="text-xs text-muted-foreground">{household.owner} - {household.address}</p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full px-2 py-1">Collected</span>
              </div>
            );
          })}
          {completed.length === 0 && (
            <div className="p-8 text-center text-sm text-muted-foreground">No completed collections yet.</div>
          )}
        </div>
      </div>
    </SectionShell>
  );
}

function SectionShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-5">
      {children}
    </div>
  );
}
