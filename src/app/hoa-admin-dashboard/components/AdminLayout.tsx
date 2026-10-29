'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard, CreditCard, Trash2, FileText, Megaphone,
  Users, BarChart3, Settings, LogOut, Bell, Menu, X, Shield
} from 'lucide-react';
import { ROLE_REDIRECTS, useMockAuth } from '@/contexts/MockAuthContext';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { key: 'dashboard', href: '/hoa-admin-dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: null },
      { key: 'analytics', href: '/hoa-admin-dashboard?section=analytics', icon: BarChart3, label: 'Analytics', badge: null },
    ],
  },
  {
    label: 'Management',
    items: [
      { key: 'payments', href: '/hoa-admin-dashboard?section=payments', icon: CreditCard, label: 'Payments', badge: '12' },
      { key: 'waste', href: '/hoa-admin-dashboard?section=waste', icon: Trash2, label: 'Waste Collection', badge: null },
      { key: 'reports', href: '/hoa-admin-dashboard?section=reports', icon: FileText, label: 'Reports', badge: '5' },
      { key: 'announcements', href: '/hoa-admin-dashboard?section=announcements', icon: Megaphone, label: 'Announcements', badge: null },
      { key: 'households', href: '/hoa-admin-dashboard?section=households', icon: Users, label: 'Households', badge: null },
      { key: 'billing', href: '/admin/billing', icon: Settings, label: 'Billing', badge: null },
    ],
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, signOut } = useMockAuth();

  React.useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    if (user.role !== 'admin') {
      router.replace(ROLE_REDIRECTS[user.role]);
    }
  }, [loading, router, user]);

  React.useEffect(() => {
    if (pathname !== '/hoa-admin-dashboard') {
      setActiveSection('billing');
      return;
    }
    const params = new URLSearchParams(window.location.search);
    setActiveSection(params.get('section') || 'dashboard');
  }, [pathname]);

  const handleSignOut = () => {
    signOut();
    router.replace('/login');
  };

  if (loading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 rounded-full border-4 border-primary-700 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-40 flex flex-col bg-white border-r border-border transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'}
          lg:translate-x-0 lg:w-64 lg:static lg:h-screen`}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <AppLogo size={32} />
            <div>
              <span className="font-semibold text-sm text-primary-700 tracking-tight block">HOAConnect</span>
              <span className="text-[10px] text-muted-foreground font-medium">Admin Panel</span>
            </div>
          </div>
          <button className="ml-auto p-1 rounded-md lg:hidden text-muted-foreground hover:bg-muted" onClick={() => setSidebarOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-border bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-semibold">
              <Shield size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">HOA Admin · Sampaguita Homes</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto scrollbar-thin">
          {navGroups.map((group) => (
            <div key={`group-${group.label}`}>
              <p className="px-2 mb-1.5 text-[10px] font-600 uppercase tracking-widest text-muted-foreground">{group.label}</p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = item.key === activeSection;
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setActiveSection(item.key)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive ? 'bg-primary-700/10 text-primary-700' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <item.icon size={17} />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] font-semibold bg-red-500 text-white rounded-full min-w-4 h-4 flex items-center justify-center px-1">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="px-3 py-3 border-t border-border space-y-0.5">
          <Link href="/admin/billing" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Settings size={17} />
            <span>Settings</span>
          </Link>
          <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <LogOut size={17} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 bg-white border-b border-border">
          <div className="flex items-center gap-3 px-4 sm:px-6 h-14">
            <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted lg:hidden transition-colors" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="flex-1">
              <h1 className="text-base font-semibold text-foreground">Admin {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Sampaguita Homes Subdivision · April 27, 2026</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors relative">
                <Bell size={19} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
              </button>
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                <Shield size={14} className="text-white" />
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
