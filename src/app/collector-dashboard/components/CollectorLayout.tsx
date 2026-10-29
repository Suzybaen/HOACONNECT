'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard, MapPin, List, AlertTriangle, CheckSquare,
  Bell, Menu, X, LogOut, Settings, Truck
} from 'lucide-react';
import { ROLE_REDIRECTS, useMockAuth } from '@/contexts/MockAuthContext';

const navItems = [
  { key: 'dashboard', href: '/collector-dashboard', icon: LayoutDashboard, label: 'Today\'s Route', badge: null },
  { key: 'households', href: '/collector-dashboard?section=households', icon: List, label: 'Household List', badge: null },
  { key: 'urgent', href: '/collector-dashboard?section=urgent', icon: AlertTriangle, label: 'Urgent Requests', badge: '3' },
  { key: 'completed', href: '/collector-dashboard?section=completed', icon: CheckSquare, label: 'Completed', badge: null },
  { key: 'map', href: '/collector-dashboard?section=map', icon: MapPin, label: 'Route Map', badge: null },
];

interface CollectorLayoutProps {
  children: React.ReactNode;
}

export default function CollectorLayout({ children }: CollectorLayoutProps) {
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
    if (user.role !== 'collector') {
      router.replace(ROLE_REDIRECTS[user.role]);
    }
  }, [loading, router, user]);

  React.useEffect(() => {
    if (pathname !== '/collector-dashboard') return;
    const params = new URLSearchParams(window.location.search);
    setActiveSection(params.get('section') || 'dashboard');
  }, [pathname]);

  const handleSignOut = () => {
    signOut();
    router.replace('/login');
  };

  if (loading || !user || user.role !== 'collector') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 rounded-full border-4 border-amber-600 border-t-transparent animate-spin" />
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
              <span className="text-[10px] text-muted-foreground font-medium">Collector Portal</span>
            </div>
          </div>
          <button className="ml-auto p-1 rounded-md lg:hidden text-muted-foreground hover:bg-muted" onClick={() => setSidebarOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-border bg-amber-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white text-xs font-semibold">
              <Truck size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">Collector · Zone A &amp; B</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500" title="On duty" />
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-thin">
          <p className="px-2 mb-2 text-[10px] font-600 uppercase tracking-widest text-muted-foreground">Today's Work</p>
          {navItems.map((item) => {
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
                  <span className={`text-[10px] font-semibold rounded-full min-w-4 h-4 flex items-center justify-center px-1 ${
                    item.key === 'cnav-urgent' ? 'bg-red-500 text-white' : 'bg-primary-700 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-3 border-t border-border space-y-0.5">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Settings size={17} />
            <span>Settings</span>
          </button>
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
              <h1 className="text-base font-semibold text-foreground">Collector Dashboard</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Monday, April 28, 2026 · Zone A &amp; B Route</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-emerald-700">On Duty</span>
              </div>
              <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors relative">
                <Bell size={19} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
              </button>
              <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center">
                <Truck size={14} className="text-white" />
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
