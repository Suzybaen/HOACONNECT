'use client';
import React from 'react';
import { CheckCircle2, MapPin, Percent, Clock, AlertTriangle } from 'lucide-react';

// Bento plan: 4 cards → grid-cols-2 lg:grid-cols-4
// confirmed (hero, spans 2 on mobile), total stops, completion %, ETA
const kpis = [
  {
    id: 'ckpi-confirmed',
    label: 'Confirmed Households',
    value: '182',
    sub: 'of 248 total · 73.2%',
    icon: CheckCircle2,
    color: 'bg-teal-50 border-teal-100',
    iconColor: 'text-teal-700 bg-teal-100',
    hero: true,
    trend: '+12 since 6 AM',
    trendUp: true,
  },
  {
    id: 'ckpi-collected',
    label: 'Collected So Far',
    value: '47',
    sub: '135 remaining stops',
    icon: MapPin,
    color: 'bg-emerald-50 border-emerald-100',
    iconColor: 'text-emerald-700 bg-emerald-100',
    hero: false,
    trend: '25.8% done',
    trendUp: true,
  },
  {
    id: 'ckpi-completion',
    label: 'Route Completion',
    value: '25.8%',
    sub: 'Est. finish: 10:45 AM',
    icon: Percent,
    color: 'bg-blue-50 border-blue-100',
    iconColor: 'text-blue-700 bg-blue-100',
    hero: false,
    trend: 'On schedule',
    trendUp: true,
  },
  {
    id: 'ckpi-urgent',
    label: 'Urgent Requests',
    value: '3',
    sub: '2 pending payment · 1 approved',
    icon: AlertTriangle,
    color: 'bg-red-50 border-red-100',
    iconColor: 'text-red-600 bg-red-100',
    hero: false,
    trend: 'Needs attention',
    trendUp: false,
  },
];

export default function CollectorKPIs() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-foreground">Today's Overview</h2>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock size={13} />
          <span>Live · Updated 7:42 AM</span>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis?.map((kpi) => (
          <div
            key={kpi?.id}
            className={`rounded-2xl p-5 border shadow-card transition-shadow hover:shadow-card-hover ${kpi?.color}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-xl ${kpi?.iconColor}`}>
                <kpi.icon size={18} />
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                kpi?.trendUp ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}>
                {kpi?.trend}
              </span>
            </div>
            <p className="text-[11px] font-600 uppercase tracking-wider text-muted-foreground mb-1">{kpi?.label}</p>
            <p className="text-2xl font-bold text-foreground tabular-nums font-mono">{kpi?.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{kpi?.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}