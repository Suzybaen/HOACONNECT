'use client';
import React from 'react';
import { Users, TrendingUp, Trash2, FileText, AlertCircle, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Bento plan: 6 cards → grid-cols-3 xl:grid-cols-6 on large screens
// Row 1: Total Households (hero, spans 2), Payment Compliance, Today Participation
// Row 2: Pending Reports, Overdue Accounts, Monthly Revenue
// Adjusted: 2-col hero + 2 regular on row 1, 3 regular on row 2

const kpis = [
  {
    id: 'kpi-households',
    label: 'Total Households',
    value: '248',
    sub: '12 new this quarter',
    trend: '+5.1%',
    trendUp: true,
    icon: Users,
    color: 'bg-teal-50 border-teal-100',
    iconColor: 'text-teal-700 bg-teal-100',
    hero: true,
  },
  {
    id: 'kpi-compliance',
    label: 'Payment Compliance',
    value: '87.5%',
    sub: '217 of 248 paid for May',
    trend: '+2.3%',
    trendUp: true,
    icon: TrendingUp,
    color: 'bg-emerald-50 border-emerald-100',
    iconColor: 'text-emerald-700 bg-emerald-100',
    hero: false,
  },
  {
    id: 'kpi-participation',
    label: "Today\'s Participation",
    value: '73.2%',
    sub: '182 of 248 confirmed trash',
    trend: '-4.1%',
    trendUp: false,
    icon: Trash2,
    color: 'bg-amber-50 border-amber-100',
    iconColor: 'text-amber-700 bg-amber-100',
    hero: false,
  },
  {
    id: 'kpi-reports',
    label: 'Pending Reports',
    value: '5',
    sub: '2 urgent, 3 general',
    trend: '+2',
    trendUp: false,
    icon: FileText,
    color: 'bg-red-50 border-red-100',
    iconColor: 'text-red-600 bg-red-100',
    hero: false,
  },
  {
    id: 'kpi-overdue',
    label: 'Overdue Accounts',
    value: '18',
    sub: '₱3,780 outstanding',
    trend: '+3',
    trendUp: false,
    icon: AlertCircle,
    color: 'bg-orange-50 border-orange-100',
    iconColor: 'text-orange-600 bg-orange-100',
    hero: false,
  },
  {
    id: 'kpi-revenue',
    label: 'Collected This Month',
    value: '₱45,570',
    sub: 'April 2026 · target ₱52,080',
    trend: '87.5%',
    trendUp: true,
    icon: DollarSign,
    color: 'bg-violet-50 border-violet-100',
    iconColor: 'text-violet-700 bg-violet-100',
    hero: false,
  },
];

export default function AdminKPIBento() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-foreground">Overview</h2>
        <p className="text-xs text-muted-foreground">Last updated: April 27, 2026 at 2:37 PM</p>
      </div>
      {/* Grid: row1 hero(2col)+2normal, row2 3normal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis?.map((kpi) => (
          <div
            key={kpi?.id}
            className={`rounded-2xl p-5 border shadow-card transition-shadow hover:shadow-card-hover
              ${kpi?.hero ? 'xl:col-span-2' : 'xl:col-span-2'}
              ${kpi?.color}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-xl ${kpi?.iconColor}`}>
                <kpi.icon size={18} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                kpi?.trendUp
                  ? 'bg-emerald-100 text-emerald-700' :'bg-red-100 text-red-700'
              }`}>
                {kpi?.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {kpi?.trend}
              </div>
            </div>
            <p className="text-[11px] font-600 uppercase tracking-wider text-muted-foreground mb-1">{kpi?.label}</p>
            <p className={`font-bold text-foreground tabular-nums font-mono ${kpi?.hero ? 'text-3xl' : 'text-2xl'}`}>{kpi?.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{kpi?.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}