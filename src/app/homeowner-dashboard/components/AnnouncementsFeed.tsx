'use client';
import React, { useState } from 'react';
import { Megaphone, AlertCircle, Info, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Icon from '@/components/ui/AppIcon';


const announcements = [
  {
    id: 'ann-001',
    category: 'urgent' as const,
    title: 'Water Interruption — April 29, 2026',
    body: 'MAYNILAD will conduct pipe maintenance along Ilang-Ilang Street. Water supply will be interrupted from 8:00 AM to 5:00 PM. Please store water in advance.',
    author: 'HOA Admin',
    date: 'April 27, 2026',
    pinned: true,
  },
  {
    id: 'ann-002',
    category: 'billing' as const,
    title: 'May 2026 HOA Dues — Due May 5',
    body: 'A reminder that monthly HOA dues of ₱210 per household are due by May 5, 2026. Late payments will incur a ₱50 penalty. Pay via GCash or at the HOA office.',
    author: 'HOA Treasurer',
    date: 'April 25, 2026',
    pinned: false,
  },
  {
    id: 'ann-003',
    category: 'general' as const,
    title: 'Community Clean-Up Drive — May 3',
    body: 'Join your neighbors for our monthly clean-up drive this Saturday, May 3 at 7:00 AM. Meet at the covered court. Bring gloves and wear comfortable clothes. Snacks will be provided.',
    author: 'HOA President',
    date: 'April 24, 2026',
    pinned: false,
  },
  {
    id: 'ann-004',
    category: 'general' as const,
    title: 'Updated Waste Collection Schedule — May',
    body: 'Please note that waste collection for Block 3 and Block 4 will move to Tuesdays and Fridays starting May 1. All other blocks remain on the same schedule.',
    author: 'HOA Admin',
    date: 'April 22, 2026',
    pinned: false,
  },
];

const categoryIcon = {
  urgent: AlertCircle,
  billing: CreditCard,
  general: Info,
};

const categoryLabel = {
  urgent: 'Urgent',
  billing: 'Billing',
  general: 'General',
};

export default function AnnouncementsFeed() {
  const [expanded, setExpanded] = useState<string | null>('ann-001');

  return (
    <div className="bg-white rounded-2xl shadow-card border border-border overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Megaphone size={16} className="text-primary-700" />
          <span className="text-sm font-semibold text-foreground">Announcements</span>
          <span className="text-xs font-semibold bg-primary-700 text-white rounded-full px-1.5 py-0.5">{announcements.length}</span>
        </div>
        <div className="flex gap-2">
          {(['urgent', 'billing', 'general'] as const).map((cat) => (
            <Badge key={`filter-${cat}`} variant={cat} size="sm">{categoryLabel[cat]}</Badge>
          ))}
        </div>
      </div>

      <div className="divide-y divide-border">
        {announcements.map((ann) => {
          const Icon = categoryIcon[ann.category];
          const isExpanded = expanded === ann.id;
          return (
            <div key={ann.id} className={`transition-colors ${ann.pinned ? 'bg-red-50/30' : 'bg-white'}`}>
              <button
                onClick={() => setExpanded(isExpanded ? null : ann.id)}
                className="w-full text-left px-5 py-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 p-1.5 rounded-full flex-shrink-0 ${
                    ann.category === 'urgent' ? 'bg-red-100 text-red-600' :
                    ann.category === 'billing' ? 'bg-violet-100 text-violet-600' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon size={13} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <Badge variant={ann.category} size="sm">{categoryLabel[ann.category]}</Badge>
                      {ann.pinned && (
                        <span className="text-[10px] font-semibold text-red-600 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-full">📌 Pinned</span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-foreground leading-snug">{ann.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{ann.author} · {ann.date}</p>
                    {isExpanded && (
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed animate-fade-in">{ann.body}</p>
                    )}
                  </div>
                  <div className="ml-2 text-muted-foreground flex-shrink-0">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}