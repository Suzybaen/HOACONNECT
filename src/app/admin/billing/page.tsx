'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CreditCard, Download, AlertCircle } from 'lucide-react';
import AdminLayout from '@/app/hoa-admin-dashboard/components/AdminLayout';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
}

export default function BillingPage() {
  const [invoices] = useState<Invoice[]>([
    {
      id: 'inv_001',
      date: '2026-05-01',
      amount: 3999,
      status: 'paid',
      description: 'Professional Plan - Monthly',
    },
    {
      id: 'inv_002',
      date: '2026-04-01',
      amount: 3999,
      status: 'paid',
      description: 'Professional Plan - Monthly',
    },
    {
      id: 'inv_003',
      date: '2026-03-01',
      amount: 3999,
      status: 'paid',
      description: 'Professional Plan - Monthly',
    },
  ]);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Billing & Subscription</h1>
            <p className="text-slate-600 mt-2">Manage your subscription plan and billing information</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Current Subscription</h2>
                <p className="text-slate-600 mt-1">Professional Plan</p>
              </div>
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                Active
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Monthly Cost</p>
                <p className="text-2xl font-bold text-slate-900">PHP 3,999</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Renewal Date</p>
                <p className="text-2xl font-bold text-slate-900">Jun 1, 2026</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Households</p>
                <p className="text-2xl font-bold text-slate-900">175 / 250</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/admin/change-plan" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Change Plan
              </Link>
              <button className="px-6 py-2 border border-red-300 text-red-700 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                Cancel Subscription
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </h2>
              </div>
              <button className="text-blue-600 font-semibold hover:text-blue-700">Edit</button>
            </div>

            <div className="bg-gradient-to-r from-slate-100 to-slate-50 rounded-lg p-6 border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <span className="font-bold text-slate-900">Visa</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Visa ending in 4242</p>
                  <p className="text-sm text-slate-600">Expires 12/2026</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Usage & Limits</h2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-slate-900">Households</p>
                  <p className="text-sm text-slate-600">175 / 250</p>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-slate-900">API Requests (this month)</p>
                  <p className="text-sm text-slate-600">8,234 / 10,000</p>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-slate-900">Storage</p>
                  <p className="text-sm text-slate-600">2.1 GB / 10 GB</p>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-violet-600 h-2 rounded-full" style={{ width: '21%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Billing History</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4 px-4 text-slate-600">{new Date(invoice.date).toLocaleDateString()}</td>
                      <td className="py-4 px-4 text-slate-900">{invoice.description}</td>
                      <td className="py-4 px-4 font-semibold text-slate-900">PHP {invoice.amount.toLocaleString('en-PH')}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            invoice.status === 'paid'
                              ? 'bg-emerald-100 text-emerald-700'
                              : invoice.status === 'pending'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900">Tax ID on File</p>
              <p className="text-sm text-blue-800">Your tax information is securely stored and used for billing purposes only.</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
