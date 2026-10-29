'use client';
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts';

// TODO: Replace with GET /api/analytics/collection-participation?weeks=4
const data = [
  { day: 'Apr 7', rate: 81.2, confirmed: 202, total: 248 },
  { day: 'Apr 11', rate: 76.6, confirmed: 190, total: 248 },
  { day: 'Apr 14', rate: 88.3, confirmed: 219, total: 248 },
  { day: 'Apr 18', rate: 69.4, confirmed: 172, total: 248 },
  { day: 'Apr 21', rate: 84.7, confirmed: 210, total: 248 },
  { day: 'Apr 25', rate: 91.1, confirmed: 226, total: 248 },
  { day: 'Apr 28', rate: 73.2, confirmed: 182, total: 248 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; payload: { confirmed: number; total: number } }>; label?: string }) => {
  if (!active || !payload || !payload[0]) return null;
  return (
    <div className="bg-white border border-border rounded-xl p-3 shadow-modal text-xs">
      <p className="font-semibold text-foreground mb-1.5">{label}</p>
      <p className="text-muted-foreground">{payload[0].payload.confirmed} of {payload[0].payload.total} households</p>
      <p className="font-mono font-bold text-primary-700 mt-1">{payload[0].value}% participation</p>
    </div>
  );
};

export default function CollectionParticipationChart() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-border">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground">Collection Participation</h3>
        <p className="text-xs text-muted-foreground mt-0.5">% households confirmed · Last 7 collection days</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barSize={22}>
          <CartesianGrid stroke="hsl(214 16% 88%)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(215 14% 48%)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: 'hsl(215 14% 48%)' }} axisLine={false} tickLine={false} domain={[50, 100]} tickFormatter={(v) => `${v}%`} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="rate" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.rate >= 85 ? '#0f766e' : entry.rate >= 75 ? '#14b8a6' : '#f59e0b'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-primary-700" />
          <span className="text-xs text-muted-foreground">≥85% Good</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
          <span className="text-xs text-muted-foreground">75–84% Fair</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="text-xs text-muted-foreground">&lt;75% Low</span>
        </div>
      </div>
    </div>
  );
}