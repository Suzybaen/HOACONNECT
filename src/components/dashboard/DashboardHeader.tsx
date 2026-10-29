'use client';

import Link from 'next/link';
import { useMockAuth, MockUser } from '@/contexts/MockAuthContext';
import { Bell, Settings, User, LogOut } from 'lucide-react';

interface DashboardHeaderProps {
  user: MockUser;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const { signOut } = useMockAuth();

  const handleSignOut = () => {
    signOut();
    window.location.href = '/login';
  };

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
      {/* Left: Breadcrumb/Info */}
      <div>
        <h2 className="text-sm text-slate-600">Welcome back,</h2>
        <p className="text-lg font-bold text-slate-900">{user.name}</p>
        {user.block && <p className="text-xs text-slate-500">{user.block}, {user.lot}</p>}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Settings */}
        <Link href="/admin/billing" className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
        </Link>

        {/* User Menu */}
        <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">{user.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user.role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
            {user.name.charAt(0)}
          </div>
          <button
            onClick={handleSignOut}
            className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
