'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  Home, Trash2, CreditCard, Megaphone, FileText,
  Bell, Menu, X, LogOut, Settings,
  LayoutDashboard
} from 'lucide-react';
import NotificationCenter from '@/app/homeowner-dashboard/components/NotificationCenter';
import { ROLE_REDIRECTS, useMockAuth } from '@/contexts/MockAuthContext';

const navItems = [
  { key: 'nav-home', href: '/homeowner-dashboard', icon: Home, label: 'Dashboard', badge: null },
  { key: 'nav-waste', href: '/homeowner-dashboard', icon: Trash2, label: 'Waste Schedule', badge: null },
  { key: 'nav-payments', href: '/payment-history', icon: CreditCard, label: 'Payments', badge: '1' },
  { key: 'nav-announcements', href: '/announcements', icon: Megaphone, label: 'Announcements', badge: '3' },
  { key: 'nav-reports', href: '/reports', icon: FileText, label: 'My Reports', badge: null },
];

interface HomeownerLayoutProps {
  children: React.ReactNode;
}

export default function HomeownerLayout({ children }: HomeownerLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, signOut } = useMockAuth();

  React.useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    if (user.role !== 'homeowner') {
      router.replace(ROLE_REDIRECTS[user.role]);
    }
  }, [loading, router, user]);

  const handleSignOut = () => {
    signOut();
    router.replace('/login');
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'HW';

  if (loading || !user || user.role !== 'homeowner') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 rounded-full border-4 border-primary-700 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 flex flex-col bg-white border-r border-border transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'}
          lg:translate-x-0 lg:w-64 lg:static lg:h-screen`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <AppLogo size={32} />
            <span className="font-semibold text-base text-primary-700 tracking-tight">HOAConnect</span>
          </div>
          <button
            className="ml-auto p-1 rounded-md lg:hidden text-muted-foreground hover:bg-muted"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        {/* User info */}
        <div className="px-4 py-3 border-b border-border bg-teal-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-primary-700 flex items-center justify-center text-white text-sm font-semibold shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user?.name || 'Homeowner'}</p>
              <p className="text-xs text-muted-foreground">{user?.block && user?.lot ? `${user.block}, ${user.lot} · ` : ''}Homeowner</p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-thin">
          <p className="px-2 mb-2 text-[10px] font-600 uppercase tracking-widest text-muted-foreground">Menu</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group ${
                  isActive ? 'bg-primary-700/10 text-primary-700' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <item.icon size={17} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center ${
                    isActive ? 'bg-primary-700 text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

        </nav>

        {/* Bottom */}
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

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white border-b border-border">
          <div className="flex items-center gap-3 px-4 sm:px-6 h-14">
            <button
              className="p-2 rounded-lg text-muted-foreground hover:bg-muted lg:hidden transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <div className="flex-1">
              <h1 className="text-base font-semibold text-foreground">My Dashboard</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {user?.block && user?.lot ? `${user.block}, ${user.lot} — ` : ''}Sampaguita Homes Subdivision
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Notification bell */}
              <div className="relative">
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors relative"
                  aria-label="Notifications"
                >
                  <Bell size={19} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
                </button>
                {notifOpen && <NotificationCenter onClose={() => setNotifOpen(false)} />}
              </div>
              <div className="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center text-white text-xs font-semibold">
                {initials}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto pb-16 lg:pb-0">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-border">
          <div className="flex">
            {[
              { key: 'bot-home', icon: LayoutDashboard, label: 'Home', href: '/homeowner-dashboard' },
              { key: 'bot-trash', icon: Trash2, label: 'Waste', href: '/homeowner-dashboard' },
              { key: 'bot-pay', icon: CreditCard, label: 'Payments', href: '/payment-history' },
              { key: 'bot-report', icon: FileText, label: 'Reports', href: '/reports' },
            ].map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`flex-1 flex flex-col items-center gap-1 py-3 min-h-[56px] ${
                    isActive ? 'text-primary-700' : 'text-muted-foreground'
                  }`}
                >
                  <item.icon size={22} />
                  <span className="text-[11px] font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
