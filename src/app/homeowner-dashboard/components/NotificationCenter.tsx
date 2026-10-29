'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Bell, AlertCircle, CreditCard, Megaphone, X, CheckCheck, Trash2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

type NotifType = 'urgent' | 'billing' | 'general';

interface Notification {
  id: string;
  type: NotifType;
  icon: React.ElementType;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  href?: string;
}

const initialNotifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'urgent',
    icon: AlertCircle,
    title: 'Trash collection TOMORROW',
    body: 'Monday April 28 — Please have your bins ready by 6:00 AM.',
    time: '2 hours ago',
    unread: true,
    href: '/homeowner-dashboard',
  },
  {
    id: 'notif-002',
    type: 'billing',
    icon: CreditCard,
    title: 'May HOA dues reminder',
    body: 'Your ₱210 monthly dues for May 2026 are due on May 5.',
    time: '1 day ago',
    unread: true,
    href: '/homeowner-dashboard',
  },
  {
    id: 'notif-003',
    type: 'general',
    icon: Megaphone,
    title: 'Subdivision clean-up drive',
    body: 'Join us this Saturday May 3 at 7:00 AM at the covered court.',
    time: '2 days ago',
    unread: false,
    href: '/announcements',
  },
  {
    id: 'notif-004',
    type: 'general',
    icon: Bell,
    title: 'Your report has been resolved',
    body: 'Report #RPT-0042 (Missed collection) has been marked resolved.',
    time: '3 days ago',
    unread: false,
    href: '/reports',
  },
  {
    id: 'notif-005',
    type: 'urgent',
    icon: AlertCircle,
    title: 'Water interruption notice',
    body: 'Water supply interrupted April 29, 8 AM–5 PM. Store water in advance.',
    time: '4 days ago',
    unread: false,
    href: '/announcements',
  },
];

const typeConfig: Record<NotifType, { bg: string; text: string; label: string; dot: string }> = {
  urgent: { bg: 'bg-red-100', text: 'text-red-600', label: 'Urgent', dot: 'bg-red-500' },
  billing: { bg: 'bg-violet-100', text: 'text-violet-600', label: 'Billing', dot: 'bg-violet-500' },
  general: { bg: 'bg-slate-100', text: 'text-slate-600', label: 'General', dot: 'bg-slate-400' },
};

interface NotificationCenterProps {
  onClose: () => void;
}

export default function NotificationCenter({ onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<NotifType | 'all'>('all');
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const filtered = activeFilter === 'all'
    ? notifications
    : notifications.filter((n) => n.type === activeFilter);

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, unread: false } : n));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const dismiss = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-[340px] bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-border z-50 animate-fade-in overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-white">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary-700/10">
            <Bell size={13} className="text-primary-700" />
          </div>
          <span className="text-sm font-semibold text-foreground">Notifications</span>
          {unreadCount > 0 && (
            <span className="text-[10px] font-bold bg-red-500 text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              title="Mark all as read"
              className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-primary-700 transition-colors"
            >
              <CheckCheck size={14} />
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              title="Clear all"
              className="p-1.5 rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
            aria-label="Close notifications"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-muted/30 overflow-x-auto scrollbar-thin">
        {(['all', 'urgent', 'billing', 'general'] as const).map((f) => {
          const count = f === 'all'
            ? notifications.filter((n) => n.unread).length
            : notifications.filter((n) => n.type === f && n.unread).length;
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
                activeFilter === f
                  ? 'bg-primary-700 text-white' :'text-muted-foreground hover:bg-muted'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {count > 0 && (
                <span className={`text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center ${
                  activeFilter === f ? 'bg-white/30 text-white' : 'bg-red-500 text-white'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Notification list */}
      <div className="divide-y divide-border max-h-[340px] overflow-y-auto scrollbar-thin">
        {filtered.length === 0 ? (
          <div className="py-10 text-center">
            <Bell size={24} className="mx-auto text-muted-foreground/30 mb-2" />
            <p className="text-xs text-muted-foreground">No notifications</p>
          </div>
        ) : (
          filtered.map((n) => {
            const cfg = typeConfig[n.type];
            return (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`group relative px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer ${
                  n.unread ? 'bg-teal-50/50' : 'bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Type indicator dot */}
                  <div className="relative flex-shrink-0 mt-0.5">
                    <div className={`p-1.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                      <n.icon size={12} />
                    </div>
                    {n.unread && (
                      <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${cfg.dot} border border-white`} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-xs font-semibold leading-snug ${n.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {n.title}
                      </p>
                      <button
                        onClick={(e) => dismiss(n.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-muted-foreground hover:text-red-500 transition-all flex-shrink-0"
                      >
                        <X size={11} />
                      </button>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">{n.body}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[10px] text-muted-foreground">{n.time}</span>
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                        {cfg.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-border bg-muted/20 flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">
          {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
        </span>
        <Link
          href="/announcements"
          onClick={onClose}
          className="flex items-center gap-1 text-[11px] font-semibold text-primary-700 hover:underline"
        >
          View all announcements <ChevronRight size={11} />
        </Link>
      </div>
    </div>
  );
}