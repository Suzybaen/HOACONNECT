'use client';
import React, { useState } from 'react';
import HomeownerLayout from '@/app/homeowner-dashboard/components/HomeownerLayout';
import Badge from '@/components/ui/Badge';
import { useCommunity } from '@/contexts/CommunityContext';
import {
  Megaphone, AlertCircle, CreditCard, Info, Bell, Search,
  Pin, ChevronDown, ChevronUp, Calendar, User, Filter
} from 'lucide-react';

type AnnouncementCategory = 'urgent' | 'billing' | 'general';

interface Announcement {
  id: string;
  category: AnnouncementCategory;
  title: string;
  body: string;
  author: string;
  date: string;
  pinned: boolean;
  read: boolean;
}

const allAnnouncements: Announcement[] = [
  {
    id: 'ann-001',
    category: 'urgent',
    title: 'Water Interruption — April 29, 2026',
    body: 'MAYNILAD will conduct pipe maintenance along Ilang-Ilang Street. Water supply will be interrupted from 8:00 AM to 5:00 PM on April 29. Please store enough water in advance. Affected areas include Block 1–4 along the main road.',
    author: 'HOA Admin',
    date: 'April 27, 2026',
    pinned: true,
    read: false,
  },
  {
    id: 'ann-002',
    category: 'billing',
    title: 'May 2026 HOA Dues — Due May 5',
    body: 'A reminder that monthly HOA dues of ₱210 per household are due by May 5, 2026. Late payments will incur a ₱50 penalty per month. You may pay via GCash (09XX-XXX-XXXX) or at the HOA office Monday–Friday, 8 AM–5 PM.',
    author: 'HOA Treasurer',
    date: 'April 25, 2026',
    pinned: false,
    read: false,
  },
  {
    id: 'ann-003',
    category: 'general',
    title: 'Community Clean-Up Drive — May 3',
    body: 'Join your neighbors for our monthly clean-up drive this Saturday, May 3 at 7:00 AM. Meet at the covered court. Bring gloves and wear comfortable clothes. Snacks and refreshments will be provided. Attendance will be recorded.',
    author: 'HOA President',
    date: 'April 24, 2026',
    pinned: false,
    read: true,
  },
  {
    id: 'ann-004',
    category: 'general',
    title: 'Updated Waste Collection Schedule — May',
    body: 'Please note that waste collection for Block 3 and Block 4 will move to Tuesdays and Fridays starting May 1, 2026. All other blocks remain on the same Monday/Thursday schedule. Please update your reminders accordingly.',
    author: 'HOA Admin',
    date: 'April 22, 2026',
    pinned: false,
    read: true,
  },
  {
    id: 'ann-005',
    category: 'urgent',
    title: 'Stray Dog Sighting — Block 2 Area',
    body: 'A stray dog has been spotted near Block 2 and Block 3. Please keep children indoors and avoid approaching the animal. The barangay animal control unit has been notified and will respond within 24 hours.',
    author: 'HOA Security',
    date: 'April 20, 2026',
    pinned: false,
    read: true,
  },
  {
    id: 'ann-006',
    category: 'billing',
    title: 'April 2026 Dues — Final Notice',
    body: 'This is a final notice for households with unpaid April 2026 HOA dues. Please settle your balance of ₱210 (plus ₱50 late fee) by April 30 to avoid further penalties. Contact the HOA office for payment arrangements.',
    author: 'HOA Treasurer',
    date: 'April 18, 2026',
    pinned: false,
    read: true,
  },
];

const categoryConfig = {
  urgent: { icon: AlertCircle, label: 'Urgent', bg: 'bg-red-100', text: 'text-red-600' },
  billing: { icon: CreditCard, label: 'Billing', bg: 'bg-violet-100', text: 'text-violet-600' },
  general: { icon: Info, label: 'General', bg: 'bg-slate-100', text: 'text-slate-600' },
};

export default function AnnouncementsPage() {
  const { announcements: communityAnnouncements } = useCommunity();
  const [readIds, setReadIds] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>('ann-001');
  const [filterCategory, setFilterCategory] = useState<AnnouncementCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const announcements: Announcement[] = communityAnnouncements.map((announcement) => ({
    ...announcement,
    read: announcement.read || readIds.includes(announcement.id),
  }));

  const unreadCount = announcements.filter((a) => !a.read).length;

  const markRead = (id: string) => {
    setReadIds((prev) => prev.includes(id) ? prev : [...prev, id]);
  };

  const markAllRead = () => {
    setReadIds(announcements.map((a) => a.id));
  };

  const handleExpand = (id: string) => {
    const isExpanding = expandedId !== id;
    setExpandedId(isExpanding ? id : null);
    if (isExpanding) markRead(id);
  };

  const filtered = announcements.filter((a) => {
    const matchCat = filterCategory === 'all' || a.category === filterCategory;
    const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const pinned = filtered.filter((a) => a.pinned);
  const regular = filtered.filter((a) => !a.pinned);

  return (
    <HomeownerLayout>
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">Announcements</h2>
              {unreadCount > 0 && (
                <span className="text-xs font-bold bg-red-500 text-white rounded-full px-2 py-0.5">{unreadCount} new</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">Stay updated with HOA notices and alerts</p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs font-semibold text-primary-700 hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Category stats */}
        <div className="grid grid-cols-3 gap-3">
          {(['urgent', 'billing', 'general'] as AnnouncementCategory[]).map((cat) => {
            const cfg = categoryConfig[cat];
            const count = announcements.filter((a) => a.category === cat).length;
            const unread = announcements.filter((a) => a.category === cat && !a.read).length;
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(filterCategory === cat ? 'all' : cat)}
                className={`rounded-xl border p-3 text-left transition-all ${
                  filterCategory === cat
                    ? 'border-primary-700 bg-primary-700/5 ring-1 ring-primary-700/20' :'border-border bg-white hover:bg-muted/30'
                }`}
              >
                <div className={`inline-flex p-1.5 rounded-lg ${cfg.bg} ${cfg.text} mb-2`}>
                  <cfg.icon size={13} />
                </div>
                <p className="text-lg font-bold text-foreground tabular-nums">{count}</p>
                <p className="text-xs text-muted-foreground font-medium">{cfg.label}</p>
                {unread > 0 && (
                  <p className="text-[10px] font-semibold text-primary-700 mt-0.5">{unread} unread</p>
                )}
              </button>
            );
          })}
        </div>

        {/* Search & filter */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search announcements…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-xl border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary-700 transition"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Filter size={13} className="text-muted-foreground" />
            {(['all', 'urgent', 'billing', 'general'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilterCategory(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filterCategory === f
                    ? 'bg-primary-700 text-white' :'bg-white border border-border text-muted-foreground hover:bg-muted'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Pinned */}
        {pinned.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Pin size={12} className="text-red-500" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pinned</span>
            </div>
            {pinned.map((ann) => <AnnouncementCard key={ann.id} ann={ann} expanded={expandedId === ann.id} onToggle={() => handleExpand(ann.id)} />)}
          </div>
        )}

        {/* Regular */}
        {regular.length > 0 && (
          <div className="space-y-2">
            {pinned.length > 0 && (
              <div className="flex items-center gap-2">
                <Bell size={12} className="text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">All Announcements</span>
              </div>
            )}
            {regular.map((ann) => <AnnouncementCard key={ann.id} ann={ann} expanded={expandedId === ann.id} onToggle={() => handleExpand(ann.id)} />)}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-border p-10 text-center">
            <Megaphone size={32} className="mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">No announcements found</p>
          </div>
        )}
      </div>
    </HomeownerLayout>
  );
}

function AnnouncementCard({ ann, expanded, onToggle }: { ann: Announcement; expanded: boolean; onToggle: () => void }) {
  const cfg = categoryConfig[ann.category];
  const CatIcon = cfg.icon;

  return (
    <div className={`bg-white rounded-2xl border shadow-card overflow-hidden transition-all ${
      ann.pinned ? 'border-red-200' : 'border-border'
    } ${!ann.read ? 'ring-1 ring-primary-700/20' : ''}`}>
      <button onClick={onToggle} className="w-full text-left px-5 py-4 hover:bg-muted/20 transition-colors">
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 p-2 rounded-xl flex-shrink-0 ${cfg.bg} ${cfg.text}`}>
            <CatIcon size={14} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Badge variant={ann.category}>{cfg.label}</Badge>
              {ann.pinned && (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-red-600 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-full">
                  <Pin size={9} /> Pinned
                </span>
              )}
              {!ann.read && (
                <span className="w-2 h-2 rounded-full bg-primary-700 flex-shrink-0" />
              )}
            </div>
            <p className="text-sm font-semibold text-foreground leading-snug">{ann.title}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <User size={10} /> {ann.author}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Calendar size={10} /> {ann.date}
              </span>
            </div>
          </div>
          <div className="text-muted-foreground flex-shrink-0 mt-1">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
      </button>
      {expanded && (
        <div className="px-5 pb-4 border-t border-border animate-fade-in">
          <p className="text-sm text-muted-foreground leading-relaxed pt-3">{ann.body}</p>
        </div>
      )}
    </div>
  );
}
