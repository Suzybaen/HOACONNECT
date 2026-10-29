'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { WifiOff, RefreshCw, Home, Trash2, CreditCard, FileText } from 'lucide-react';

export default function OfflinePage() {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      window.location?.reload();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50/40 flex flex-col items-center justify-center px-4">
      {/* Icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl bg-teal-100 flex items-center justify-center shadow-card">
          <WifiOff size={40} className="text-primary-700" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center">
          <span className="text-white text-xs font-bold">!</span>
        </div>
      </div>
      {/* Text */}
      <h1 className="text-2xl font-bold text-foreground mb-2 text-center">You&apos;re Offline</h1>
      <p className="text-muted-foreground text-sm text-center max-w-xs mb-8 leading-relaxed">
        No internet connection detected. Some features may be limited, but cached pages are still available.
      </p>
      {/* Retry button */}
      <button
        onClick={handleRetry}
        disabled={retrying}
        className="flex items-center gap-2 px-6 py-3 bg-primary-700 text-white rounded-xl font-semibold text-sm hover:bg-primary-800 active:scale-95 transition-all duration-150 disabled:opacity-60 mb-8 shadow-card"
      >
        <RefreshCw size={16} className={retrying ? 'animate-spin' : ''} />
        {retrying ? 'Checking connection…' : 'Try Again'}
      </button>
      {/* Cached pages */}
      <div className="w-full max-w-sm">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 text-center">
          Available Offline
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { href: '/homeowner-dashboard', icon: Home, label: 'My Dashboard', color: 'bg-teal-50 border-teal-100 text-primary-700' },
            { href: '/payment-history', icon: CreditCard, label: 'Payment History', color: 'bg-blue-50 border-blue-100 text-blue-700' },
            { href: '/reports', icon: FileText, label: 'My Reports', color: 'bg-purple-50 border-purple-100 text-purple-700' },
            { href: '/announcements', icon: Trash2, label: 'Announcements', color: 'bg-amber-50 border-amber-100 text-amber-700' },
          ]?.map((item) => (
            <Link
              key={item?.href}
              href={item?.href}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${item?.color} hover:shadow-card transition-shadow`}
            >
              <item.icon size={22} />
              <span className="text-xs font-medium text-center leading-tight">{item?.label}</span>
            </Link>
          ))}
        </div>
      </div>
      {/* Footer note */}
      <p className="mt-10 text-xs text-muted-foreground text-center">
        HOAConnect · Cached data may not reflect the latest updates
      </p>
    </div>
  );
}
