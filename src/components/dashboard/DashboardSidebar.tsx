'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserRole } from '@/contexts/MockAuthContext';
import {
  LayoutDashboard,
  FileText,
  Users,
  CreditCard,
  Map,
  Bell,
  Truck,
  TrendingUp,
  Settings,
  LogOut,
} from 'lucide-react';
import { useMockAuth } from '@/contexts/MockAuthContext';

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
}

interface RoleNavigation {
  homeowner: NavItem[];
  admin: NavItem[];
  collector: NavItem[];
}

const navigationItems: RoleNavigation = {
  homeowner: [
    { href: '/homeowner-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/announcements', icon: Bell, label: 'Announcements' },
    { href: '/payment-history', icon: CreditCard, label: 'Payments' },
    { href: '/reports', icon: FileText, label: 'Reports' },
  ],
  admin: [
    { href: '/hoa-admin-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/hoa-admin-dashboard/households', icon: Users, label: 'Households' },
    { href: '/hoa-admin-dashboard/payments', icon: CreditCard, label: 'Payments' },
    { href: '/hoa-admin-dashboard/announcements', icon: Bell, label: 'Announcements' },
    { href: '/hoa-admin-dashboard/reports', icon: TrendingUp, label: 'Reports' },
    { href: '/admin/billing', icon: CreditCard, label: 'Billing' },
  ],
  collector: [
    { href: '/collector-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/collector-dashboard/route-map', icon: Map, label: 'Collection Route' },
    { href: '/collector-dashboard/households', icon: Truck, label: 'Collections' },
    { href: '/collector-dashboard/reports', icon: FileText, label: 'Reports' },
  ],
};

interface DashboardSidebarProps {
  role: UserRole;
}

export default function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { signOut } = useMockAuth();
  const navItems = navigationItems[role];

  return (
    <aside className="w-64 bg-slate-900 text-white shadow-lg flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold">🏘️ HOA Connect</h1>
        <p className="text-sm text-slate-400 mt-1">Philippines</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        {role === 'admin' && (
          <Link
            href="/admin/billing"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </Link>
        )}
        <button
          onClick={() => {
            signOut();
            window.location.href = '/login';
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-600/20 hover:text-red-300 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
