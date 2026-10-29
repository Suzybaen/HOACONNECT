'use client';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// TODO: Replace with GET /api/analytics/payment-trends?months=6
const data = [
  { month: 'Nov', collected: 38220, target: 52080, compliance: 73.4 },
  { month: 'Dec', collected: 43470, target: 52080, compliance: 83.5 },
  { month: 'Jan', collected: 40950, target: 52080, compliance: 78.6 },
  { month: 'Feb', collected: 44310, target: 52080, compliance: 85.1 },
  { month: 'Mar', collected: 47250, target: 52080, compliance: 90.7 },
  { month: 'Apr', collected: 45570, target: 52080, compliance: 87.5 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-white border border-border rounded-xl p-3 shadow-modal text-xs">
      <p className="font-semibold text-foreground mb-2">{label} 2026</p>
      {payload.map((p, i) => (
        <div key={`tip-${i}`} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-muted-foreground">{p.name}</span>
          </div>
          <span className="font-mono font-semibold text-foreground">
            {p.name === 'Compliance' ? `${p.value}%` : `₱${p.value.toLocaleString()}`}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function PaymentTrendChart() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-border">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Monthly Payment Collection</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Collected vs. target · Last 6 months</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-600" />
            <span className="text-xs text-muted-foreground">Collected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="text-xs text-muted-foreground">Target</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="gradCollected" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0f766e" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#0f766e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="hsl(214 16% 88%)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(215 14% 48%)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'hsl(215 14% 48%)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="target" name="Target" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#gradTarget)" />
          <Area type="monotone" dataKey="collected" name="Collected" stroke="#0f766e" strokeWidth={2} fill="url(#gradCollected)" dot={{ r: 3, fill: '#0f766e', strokeWidth: 0 }} activeDot={{ r: 5 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}