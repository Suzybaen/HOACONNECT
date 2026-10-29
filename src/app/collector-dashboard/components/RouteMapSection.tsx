'use client';
import React, { useMemo, useState } from 'react';
import { Home, Navigation, Trash2 } from 'lucide-react';
import { useCommunity } from '@/contexts/CommunityContext';

export default function RouteMapSection() {
  const { households, confirmations } = useCommunity();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const readyStops = useMemo(() => confirmations
    .filter((item) => item.response === 'ready')
    .map((confirmation) => ({
      confirmation,
      household: households.find((household) => household.id === confirmation.householdId),
    }))
    .filter((item): item is { confirmation: typeof confirmations[number]; household: typeof households[number] } => Boolean(item.household)), [confirmations, households]);
  const pending = readyStops.filter((item) => !item.confirmation.collected);
  const collected = readyStops.filter((item) => item.confirmation.collected);
  const selected = readyStops.find((item) => item.household.id === selectedId) || pending[0] || readyStops[0];

  return (
    <div className="bg-white rounded-2xl shadow-card border border-border overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Navigation size={16} className="text-primary-700" />
          <h3 className="text-sm font-semibold text-foreground">Static Collection Map</h3>
          <span className="text-xs text-muted-foreground">Ready households only</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{readyStops.length} total</span>
          <span>{pending.length} pending</span>
          <span>{collected.length} collected</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_260px]">
        <div className="relative h-[420px] bg-slate-100 overflow-hidden">
          <svg width="100%" height="100%" className="absolute inset-0 opacity-25">
            <defs>
              <pattern id="collector-grid" width="64" height="64" patternUnits="userSpaceOnUse">
                <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#64748b" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#collector-grid)" />
          </svg>
          <svg className="absolute inset-0 w-full h-full">
            <polyline
              points={pending.map((item) => `${item.household.lat}%,${item.household.lng}%`).join(' ')}
              fill="none"
              stroke="#0f766e"
              strokeWidth="3"
              strokeDasharray="7,5"
              opacity="0.65"
            />
            <path d="M12 18 H86 M18 78 H88 M10 18 V78 M88 18 V78 M35 10 V88 M62 10 V88" fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.35" />
          </svg>

          {readyStops.map(({ household, confirmation }) => {
            const isSelected = household.id === selected?.household.id;
            return (
              <button
                key={confirmation.id}
                onClick={() => setSelectedId(household.id)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md flex items-center justify-center transition-all ${
                  isSelected ? 'w-9 h-9 z-20 scale-110' : 'w-6 h-6 z-10 hover:scale-110'
                } ${confirmation.collected ? 'bg-emerald-500' : 'bg-primary-700'}`}
                style={{ left: `${household.lat}%`, top: `${household.lng}%` }}
                title={`${household.block} ${household.lot} - ${household.owner}`}
              >
                {isSelected ? <Home size={15} className="text-white" /> : <span className="sr-only">{household.owner}</span>}
              </button>
            );
          })}

          <div className="absolute left-[14%] top-[44%] w-9 h-9 rounded-full bg-amber-500 border-2 border-white shadow-lg flex items-center justify-center">
            <Navigation size={16} className="text-white" />
          </div>
          <div className="absolute top-3 left-3 px-3 py-2 bg-white/95 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600">
            Collector start point
          </div>
        </div>

        <div className="border-l border-border p-4 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <Trash2 size={15} className="text-primary-700" />
            <h4 className="text-sm font-semibold text-foreground">Selected Stop</h4>
          </div>
          {selected ? (
            <div className="space-y-3">
              <div className="rounded-xl border border-border p-3">
                <p className="text-sm font-bold text-foreground">{selected.household.block} - {selected.household.lot}</p>
                <p className="text-xs text-muted-foreground mt-1">{selected.household.owner}</p>
                <p className="text-xs text-muted-foreground mt-1">{selected.household.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-muted/40 p-2">
                  <p className="text-muted-foreground">Zone</p>
                  <p className="font-semibold text-foreground">Zone {selected.household.zone}</p>
                </div>
                <div className="rounded-lg bg-muted/40 p-2">
                  <p className="text-muted-foreground">Confirmed</p>
                  <p className="font-semibold text-foreground">{selected.confirmation.confirmedAt}</p>
                </div>
              </div>
              <p className={`text-xs font-semibold rounded-full px-2 py-1 inline-flex ${
                selected.confirmation.collected ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
              }`}>
                {selected.confirmation.collected ? 'Collected' : 'Ready for collection'}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No ready households yet.</p>
          )}
        </div>
      </div>

      <div className="px-5 py-3 border-t border-border">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-muted-foreground">Route Progress</span>
          <span className="text-xs font-bold text-foreground font-mono">{collected.length} / {readyStops.length} stops</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary-700 rounded-full transition-all duration-500"
            style={{ width: `${readyStops.length ? (collected.length / readyStops.length) * 100 : 0}%` }} />
        </div>
      </div>
    </div>
  );
}
