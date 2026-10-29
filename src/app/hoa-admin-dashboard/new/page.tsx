'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useMockAuth } from '@/contexts/MockAuthContext';
import { useRouter } from 'next/navigation';
import {
  Users,
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  PieChart,
  BarChart3,
  FileText,
  Settings,
  Download,
  Plus,
} from 'lucide-react';

interface KPI {
  label: string;
  value: string | number;
  unit: string;
  icon: React.ElementType;
  color: string;
  change?: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, loading } = useMockAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  const [stats] = useState({
    totalHouseholds: 245,
    totalCollected: 1347500,
    collectionRate: 92.5,
    outstandingDues: 112750,
    monthlyTarget: 1450000,
  });

  const [recentPayments] = useState([
    { id: 1, household: 'Maria Reyes - Blk 4, Lot 12', amount: 5500, date: '2026-05-05', status: 'completed' },
    { id: 2, household: 'Juan Santos - Blk 2, Lot 8', amount: 5500, date: '2026-05-04', status: 'completed' },
    { id: 3, household: 'Rosa Garcia - Blk 6, Lot 15', amount: 5500, date: '2026-05-03', status: 'completed' },
  ]);

  const [pendingApprovals] = useState([
    { id: 1, type: 'Member Registration', requester: 'John Doe', date: '2026-05-02' },
    { id: 2, type: 'New Announcement', requester: 'Board Secretary', date: '2026-05-01' },
  ]);

  const kpis: KPI[] = [
    {
      label: 'Total Households',
      value: stats.totalHouseholds,
      unit: 'active',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      label: 'Monthly Collected',
      value: `₱${(stats.totalCollected / 1000).toFixed(0)}K`,
      unit: 'this month',
      icon: CreditCard,
      color: 'text-emerald-600',
      change: '+12%',
    },
    {
      label: 'Collection Rate',
      value: `${stats.collectionRate}%`,
      unit: 'of target',
      icon: TrendingUp,
      color: 'text-violet-600',
    },
    {
      label: 'Outstanding',
      value: `₱${(stats.outstandingDues / 1000).toFixed(0)}K`,
      unit: 'to collect',
      icon: AlertCircle,
      color: 'text-red-600',
    },
  ];

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
        {/* KPIs */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <div key={i} className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-slate-600">{kpi.label}</h3>
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <p className="text-3xl font-bold text-slate-900">{kpi.value}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-slate-500">{kpi.unit}</p>
                  {kpi.change && <p className="text-xs text-emerald-600 font-semibold">{kpi.change}</p>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Collections */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-transparent">
                <h2 className="text-lg font-bold text-slate-900">Recent Collections</h2>
                <button
                  onClick={() => router.push('/hoa-admin-dashboard/payments')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                >
                  View All →
                </button>
              </div>
              <div className="divide-y divide-slate-200">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="px-6 py-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{payment.household}</p>
                      <p className="text-xs text-slate-500 mt-1">{payment.date}</p>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <p className="font-bold text-slate-900">₱{payment.amount.toLocaleString('en-PH')}</p>
                      <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                        ✓ Completed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/hoa-admin-dashboard/announcements')}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Announcement
              </button>
              <button
                onClick={() => router.push('/hoa-admin-dashboard/households')}
                className="flex items-center justify-center gap-2 bg-slate-100 text-slate-900 py-3 px-4 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
              >
                <Users className="w-4 h-4" />
                Manage Households
              </button>
              <button
                onClick={() => router.push('/hoa-admin-dashboard/reports')}
                className="flex items-center justify-center gap-2 bg-slate-100 text-slate-900 py-3 px-4 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                Generate Report
              </button>
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-amber-50 to-transparent flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Pending Approvals</h2>
              <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {pendingApprovals.length}
              </span>
            </div>
            <div className="flex-1 divide-y divide-slate-200 overflow-y-auto">
              {pendingApprovals.map((approval) => (
                <div
                  key={approval.id}
                  onClick={() => alert(`Reviewing: ${approval.type}`)}
                  className="px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 group-hover:text-blue-600">{approval.type}</p>
                      <p className="text-xs text-slate-500 mt-1">From: {approval.requester}</p>
                      <p className="text-xs text-slate-400 mt-1">Date: {approval.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => alert('Opening approvals dashboard...')}
                className="text-blue-600 hover:text-blue-700 text-sm font-semibold w-full text-left"
              >
                Review all →
              </button>
            </div>
          </div>
        </div>

        {/* Collections Summary */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">This Month's Summary</h2>
            <button
              onClick={() => router.push('/hoa-admin-dashboard/reports')}
              className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Detailed Report
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-l-4 border-emerald-500 pl-4">
              <p className="text-sm text-slate-600 mb-1">Target</p>
              <p className="text-2xl font-bold text-slate-900">₱{(stats.monthlyTarget / 1000).toFixed(0)}K</p>
              <p className="text-xs text-slate-500 mt-2">Collection goal this month</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-slate-600 mb-1">Collected</p>
              <p className="text-2xl font-bold text-slate-900">₱{(stats.totalCollected / 1000).toFixed(0)}K</p>
              <p className="text-xs text-emerald-600 mt-2">92.5% of target</p>
            </div>
            <div className="border-l-4 border-amber-500 pl-4">
              <p className="text-sm text-slate-600 mb-1">Outstanding</p>
              <p className="text-2xl font-bold text-slate-900">₱{(stats.outstandingDues / 1000).toFixed(0)}K</p>
              <p className="text-xs text-red-600 mt-2">Still to collect</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/admin/billing')}
            className="bg-violet-50 border border-violet-200 rounded-lg p-4 hover:border-violet-300 hover:shadow-md transition-all text-left"
          >
            <CreditCard className="w-6 h-6 text-violet-600 mb-2" />
            <p className="font-semibold text-slate-900">Subscription & Billing</p>
            <p className="text-sm text-slate-500 mt-1">Manage your HOA Connect plan</p>
          </button>
          <button
            onClick={() => router.push('/hoa-admin-dashboard/announcements')}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all text-left"
          >
            <FileText className="w-6 h-6 text-blue-600 mb-2" />
            <p className="font-semibold text-slate-900">Announcements</p>
            <p className="text-sm text-slate-500 mt-1">Send messages to community</p>
          </button>
          <button
            onClick={() => router.push('/hoa-admin-dashboard/reports')}
            className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 hover:border-emerald-300 hover:shadow-md transition-all text-left"
          >
            <PieChart className="w-6 h-6 text-emerald-600 mb-2" />
            <p className="font-semibold text-slate-900">Financial Reports</p>
            <p className="text-sm text-slate-500 mt-1">View collection analytics</p>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
