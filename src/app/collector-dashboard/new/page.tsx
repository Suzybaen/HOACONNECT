'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useMockAuth } from '@/contexts/MockAuthContext';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Navigation,
  Users,
  DollarSign,
  Phone,
} from 'lucide-react';

interface CollectionTarget {
  id: string;
  block: string;
  lot: string;
  householder: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  days_overdue?: number;
  phone: string;
}

export default function CollectorDashboardPage() {
  const router = useRouter();
  const { user, loading } = useMockAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  const [stats] = useState({
    totalAssigned: 42,
    collectedToday: 8,
    totalCollected: 127500,
    targetToday: 100000,
    completionRate: 32,
  });

  const [collectingHouseholds] = useState<CollectionTarget[]>([
    {
      id: 'col_001',
      block: 'Block 1',
      lot: 'Lot 5',
      householder: 'Antonio Reyes',
      amount: 5500,
      dueDate: '2026-05-15',
      status: 'pending',
      phone: '0917-123-4567',
    },
    {
      id: 'col_002',
      block: 'Block 1',
      lot: 'Lot 8',
      householder: 'Maria Santos',
      amount: 5500,
      dueDate: '2026-04-15',
      status: 'overdue',
      days_overdue: 20,
      phone: '0918-234-5678',
    },
    {
      id: 'col_003',
      block: 'Block 1',
      lot: 'Lot 12',
      householder: 'Juan Garcia',
      amount: 5500,
      dueDate: '2026-05-10',
      status: 'pending',
      phone: '0919-345-6789',
    },
    {
      id: 'col_004',
      block: 'Block 2',
      lot: 'Lot 3',
      householder: 'Rosa Cruz',
      amount: 5500,
      dueDate: '2026-05-15',
      status: 'paid',
      phone: '0920-456-7890',
    },
  ]);

  const pendingPayments = collectingHouseholds.filter((c) => c.status !== 'paid');
  const totalAmountToCollect = pendingPayments.reduce((sum, c) => sum + c.amount, 0);

  // Show loading state while authentication check is in progress
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Loading...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Show nothing while redirecting
  if (!user) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header KPIs */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">Assigned Today</h3>
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.totalAssigned}</p>
            <p className="text-xs text-slate-500 mt-2">households</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">Collected Today</h3>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.collectedToday}</p>
            <p className="text-xs text-slate-500 mt-2">{stats.completionRate}% of target</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">Total Collected</h3>
              <DollarSign className="w-5 h-5 text-violet-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">₱{(stats.totalCollected / 1000).toFixed(0)}K</p>
            <p className="text-xs text-slate-500 mt-2">this week</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">Daily Target</h3>
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">₱{(stats.targetToday / 1000).toFixed(0)}K</p>
            <p className="text-xs text-slate-500 mt-2">to reach today</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">Outstanding</h3>
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">₱{(totalAmountToCollect / 1000).toFixed(0)}K</p>
            <p className="text-xs text-slate-500 mt-2">pending</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Collection List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-transparent">
                <h2 className="text-lg font-bold text-slate-900">Collection Schedule</h2>
                <button
                  onClick={() => router.push('/collector-dashboard/route-map')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1"
                >
                  <Navigation className="w-4 h-4" />
                  View Map
                </button>
              </div>
              <div className="divide-y divide-slate-200 max-h-[600px] overflow-y-auto">
                {collectingHouseholds.map((household, idx) => (
                  <div
                    key={household.id}
                    className="px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer group"
                    onClick={() => alert(`Opening details for ${household.householder}...`)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Stop Number */}
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1 group-hover:bg-blue-200">
                          {idx + 1}
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 group-hover:text-blue-600">
                            {household.householder}
                          </p>
                          <p className="text-sm text-slate-600 mt-1">
                            {household.block}, {household.lot}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-slate-500">₱{household.amount.toLocaleString('en-PH')}</span>
                            <span className="text-xs text-slate-400">Due: {household.dueDate}</span>
                            {household.days_overdue && (
                              <span className="text-xs text-red-600 font-semibold">{household.days_overdue} days overdue</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                            household.status === 'paid'
                              ? 'bg-emerald-100 text-emerald-700'
                              : household.status === 'overdue'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {household.status === 'paid' ? '✓ Paid' : household.status === 'overdue' ? 'Overdue' : 'Pending'}
                        </span>

                        {household.status !== 'paid' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              alert(`Calling ${household.householder} at ${household.phone}...`);
                            }}
                            className="p-2 hover:bg-slate-100 rounded transition-colors"
                            title="Call household"
                          >
                            <Phone className="w-4 h-4 text-slate-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/collector-dashboard/route-map')}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                View Map
              </button>
              <button
                onClick={() => alert('Recording payment...')}
                className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                Record Payment
              </button>
              <button
                onClick={() => router.push('/collector-dashboard/households')}
                className="flex items-center justify-center gap-2 bg-slate-100 text-slate-900 py-3 px-4 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
              >
                <Users className="w-4 h-4" />
                All Households
              </button>
            </div>
          </div>

          {/* Daily Progress */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-transparent">
                <h2 className="text-lg font-bold text-slate-900">Today's Progress</h2>
              </div>
              <div className="p-6 space-y-6">
                {/* Collections Made */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-slate-600">Collections Completed</p>
                    <p className="text-sm font-bold text-slate-900">{stats.collectedToday}/{stats.totalAssigned}</p>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-3 rounded-full transition-all"
                      style={{ width: `${(stats.collectedToday / stats.totalAssigned) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Collection Target */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-slate-600">Collection Target</p>
                    <p className="text-sm font-bold text-slate-900">
                      ₱{(stats.totalCollected / 1000).toFixed(0)}K / ₱{(stats.targetToday / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${(stats.totalCollected / stats.targetToday) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Summary */}
                <div className="border-t border-slate-200 pt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">Pending Payments</p>
                    <p className="font-bold text-slate-900">{pendingPayments.length}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">Total Outstanding</p>
                    <p className="font-bold text-slate-900">₱{(totalAmountToCollect / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">Overdue Count</p>
                    <p className="font-bold text-red-600">{collectingHouseholds.filter((c) => c.status === 'overdue').length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-blue-900">Today's Performance</h3>
              </div>
              <p className="text-sm text-blue-800 mb-4">
                You're doing great! You've completed {stats.completionRate}% of your target for today. Keep it up!
              </p>
              <button
                onClick={() => router.push('/collector-dashboard/reports')}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded font-semibold hover:bg-blue-700 transition-colors text-sm"
              >
                View Weekly Report
              </button>
            </div>
          </div>
        </div>

        {/* Route Optimization Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-900">📍 Route Optimization Tip</p>
            <p className="text-sm text-blue-800 mt-1">
              Click "View Map" to see the optimal collection route for today. This will help you complete your collection more efficiently.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
