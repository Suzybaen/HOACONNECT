'use client';
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { toast } from 'sonner';

type ReportStatus = 'pending' | 'in-progress' | 'resolved';
type ReportPriority = 'high' | 'medium' | 'low';

interface ReportItem {
  id: string;
  ref: string;
  category: string;
  submitter: string;
  date: string;
  status: ReportStatus;
  priority: ReportPriority;
}

const reports: ReportItem[] = [
  { id: 'rpt-001', ref: 'RPT-0051', category: 'Missed Collection', submitter: 'Anonymous', date: 'Apr 27', status: 'pending' as const, priority: 'high' },
  { id: 'rpt-002', ref: 'RPT-0050', category: 'Road Damage', submitter: 'Bernardo Soriano', date: 'Apr 26', status: 'in-progress' as const, priority: 'medium' },
  { id: 'rpt-003', ref: 'RPT-0049', category: 'Noise Complaint', submitter: 'Anonymous', date: 'Apr 25', status: 'pending' as const, priority: 'low' },
  { id: 'rpt-004', ref: 'RPT-0048', category: 'Security Concern', submitter: 'Lorna Castillo', date: 'Apr 24', status: 'in-progress' as const, priority: 'high' },
  { id: 'rpt-005', ref: 'RPT-0047', category: 'Missed Collection', submitter: 'Anonymous', date: 'Apr 23', status: 'pending' as const, priority: 'medium' },
];

const statusOptions: ReportStatus[] = ['pending', 'in-progress', 'resolved'];

export default function ReportsPanel() {
  const [items, setItems] = useState(reports);

  const updateStatus = (id: string, newStatus: ReportStatus) => {
    setItems((prev) => prev.map((r) => r.id === id ? { ...r, status: newStatus } : r));
    // TODO: PATCH /api/reports/:id { status: newStatus }
    toast.success(`Report status updated to "${newStatus}".`, { duration: 2500 });
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-border overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-primary-700" />
          <h3 className="text-sm font-semibold text-foreground">Pending Reports</h3>
          <span className="text-xs font-semibold bg-red-500 text-white rounded-full px-1.5 py-0.5">
            {items.filter((r) => r.status === 'pending').length}
          </span>
        </div>
        <button className="text-xs text-primary-700 font-medium hover:underline">View All</button>
      </div>

      <div className="divide-y divide-border">
        {items.map((r) => (
          <div key={r.id} className="px-5 py-3.5 hover:bg-muted/20 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-mono font-semibold text-muted-foreground">{r.ref}</span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    r.priority === 'high' ? 'bg-red-100 text-red-700' :
                    r.priority === 'medium'? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                  }`}>{r.priority}</span>
                </div>
                <p className="text-sm font-medium text-foreground">{r.category}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {r.submitter === 'Anonymous' ? '🕵️ Anonymous' : r.submitter} · {r.date}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <Badge variant={r.status}>
                  {r.status === 'pending' ? 'Pending' : r.status === 'in-progress' ? 'In Progress' : 'Resolved'}
                </Badge>
                <select
                  value={r.status}
                  onChange={(e) => updateStatus(r.id, e.target.value as ReportStatus)}
                  className="text-[11px] px-2 py-1 rounded border border-input bg-white text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 cursor-pointer"
                >
                  {statusOptions.map((s) => (
                    <option key={`opt-${r.id}-${s}`} value={s}>
                      {s === 'pending' ? 'Pending' : s === 'in-progress' ? 'In Progress' : 'Resolved'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
