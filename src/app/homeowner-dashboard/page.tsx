'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeownerLayout from './components/HomeownerLayout';
import { useMockAuth } from '@/contexts/MockAuthContext';
import { useCommunity } from '@/contexts/CommunityContext';
import CollectionHeroCard from './components/CollectionHeroCard';
import UpcomingSchedule from './components/UpcomingSchedule';

import { CreditCard, Bell, FileText, TrendingUp, AlertCircle, CheckCircle2, Clock, Download, Home, DollarSign, Droplet, Trash2, Shield } from 'lucide-react';

interface PaymentDue {
  id: string;
  month: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentType: 'HOA Fee' | 'Rent' | 'Utilities' | 'Maintenance';
  breakdown?: { label: string; amount: number }[];
}

export default function HomeownerDashboardPage() {
  const router = useRouter();
  const { user } = useMockAuth();
  const { announcements } = useCommunity();
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedPayment, setSelectedPayment] = useState<PaymentDue | null>(null);

  const [paymentsDue] = useState<PaymentDue[]>([
    {
      id: 'pay_001',
      month: 'May 2026',
      amount: 5500,
      dueDate: '2026-05-15',
      status: 'pending',
      paymentType: 'HOA Fee',
      breakdown: [
        { label: 'HOA Membership Fee', amount: 2500 },
        { label: 'Rent', amount: 2000 },
        { label: 'Utilities & Maintenance', amount: 1000 },
      ],
    },
    {
      id: 'pay_002',
      month: 'April 2026',
      amount: 5500,
      dueDate: '2026-04-15',
      status: 'paid',
      paymentType: 'HOA Fee',
      breakdown: [
        { label: 'HOA Membership Fee', amount: 2500 },
        { label: 'Rent', amount: 2000 },
        { label: 'Utilities & Maintenance', amount: 1000 },
      ],
    },
    {
      id: 'pay_003',
      month: 'March 2026',
      amount: 5500,
      dueDate: '2026-03-15',
      status: 'paid',
      paymentType: 'HOA Fee',
      breakdown: [
        { label: 'HOA Membership Fee', amount: 2500 },
        { label: 'Rent', amount: 2000 },
        { label: 'Utilities & Maintenance', amount: 1000 },
      ],
    },
  ]);

  const filteredPayments = filterType === 'all' ? paymentsDue : paymentsDue.filter(p => p.paymentType === filterType);

  const totalDue = filteredPayments
    .filter((p) => p.status !== 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPaid = filteredPayments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const handleDownloadReceipt = (payment: PaymentDue) => {
    if (payment.status !== 'paid') {
      alert('Receipt is only available for paid payments.');
      return;
    }
    const receiptContent = `
HOA CONNECT - PAYMENT RECEIPT
=============================
Payment ID: ${payment.id}
Month: ${payment.month}
Date Paid: ${new Date().toLocaleDateString('en-PH')}
Payment Type: ${payment.paymentType}

PAYMENT BREAKDOWN:
${payment.breakdown?.map(b => `${b.label}: ₱${b.amount.toLocaleString('en-PH')}`).join('\n')}

TOTAL AMOUNT: ₱${payment.amount.toLocaleString('en-PH')}
Status: PAID ✓

Thank you for your payment!
    `.trim();
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(receiptContent));
    element.setAttribute('download', `Receipt_${payment.id}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePayNow = (payment: PaymentDue) => {
    alert(`Processing payment of ₱${payment.amount.toLocaleString('en-PH')} for ${payment.month}. Redirecting to payment gateway...`);
  };

  return (
    <HomeownerLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Payment Due */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">Payment Due</h3>
              <CreditCard className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">₱{totalDue.toLocaleString('en-PH')}</p>
            <p className="text-xs text-slate-500 mt-2">Due: May 15, 2026</p>
          </div>

          {/* Amount Paid */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">Amount Paid</h3>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">₱{totalPaid.toLocaleString('en-PH')}</p>
            <p className="text-xs text-slate-500 mt-2">This quarter</p>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">Announcements</h3>
              <Bell className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{announcements.length}</p>
            <p className="text-xs text-slate-500 mt-2">2 unread</p>
          </div>

          {/* Property */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">Your Property</h3>
              <Home className="w-5 h-5 text-violet-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{user?.block}</p>
            <p className="text-xs text-slate-500 mt-2">{user?.lot}</p>
          </div>
        </div>

        <div className="grid xl:grid-cols-5 gap-6 mb-8">
          <div className="xl:col-span-2">
            <CollectionHeroCard />
          </div>
          <div className="xl:col-span-3">
            <UpcomingSchedule />
          </div>
        </div>

        {/* Monthly Fee Breakdown Section */}
        <div className="mb-8 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-transparent">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              Monthly Payment Breakdown
            </h2>
          </div>
          <div className="p-6 grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">HOA Membership Fee</h3>
              </div>
              <p className="text-2xl font-bold text-blue-900">₱2,500</p>
              <p className="text-xs text-blue-700 mt-1">Community management & maintenance</p>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-lg p-4 border border-violet-200">
              <div className="flex items-center gap-3 mb-2">
                <Home className="w-5 h-5 text-violet-600" />
                <h3 className="font-semibold text-violet-900">Rent</h3>
              </div>
              <p className="text-2xl font-bold text-violet-900">₱2,000</p>
              <p className="text-xs text-violet-700 mt-1">Monthly rental/occupancy fee</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
              <div className="flex items-center gap-3 mb-2">
                <Droplet className="w-5 h-5 text-amber-600" />
                <h3 className="font-semibold text-amber-900">Utilities & Maintenance</h3>
              </div>
              <p className="text-2xl font-bold text-amber-900">₱1,000</p>
              <p className="text-xs text-amber-700 mt-1">Water, electricity & repairs</p>
            </div>
          </div>
          <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-transparent border-t border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Monthly Fee</p>
              <p className="text-2xl font-bold text-slate-900">₱5,500</p>
            </div>
            <button
              onClick={() => alert('Make a payment now')}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Make Payment Now
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                  filterType === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Payments
              </button>
              <button
                onClick={() => setFilterType('HOA Fee')}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                  filterType === 'HOA Fee'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                HOA Fee
              </button>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-50 to-transparent">
                <h2 className="text-lg font-bold text-slate-900">Payment History</h2>
                <button
                  onClick={() => router.push('/payment-history')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                >
                  View All →
                </button>
              </div>
              <div className="divide-y divide-slate-200">
                {filteredPayments.map((payment) => (
                  <div key={payment.id}>
                    <div
                      onClick={() => setSelectedPayment(selectedPayment?.id === payment.id ? null : payment)}
                      className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                          {payment.status === 'paid' ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                          ) : payment.status === 'overdue' ? (
                            <AlertCircle className="w-6 h-6 text-red-600" />
                          ) : (
                            <Clock className="w-6 h-6 text-amber-600" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-slate-900">{payment.month}</p>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                              {payment.paymentType}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">Due: {payment.dueDate}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <div>
                          <p className="font-bold text-slate-900">₱{payment.amount.toLocaleString('en-PH')}</p>
                          <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                              payment.status === 'paid'
                                ? 'bg-emerald-100 text-emerald-700'
                                : payment.status === 'overdue'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {payment.status === 'paid' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownloadReceipt(payment);
                              }}
                              className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded hover:bg-slate-200 transition-colors flex items-center gap-1"
                            >
                              <Download className="w-4 h-4" />
                              Receipt
                            </button>
                          )}
                          {payment.status === 'pending' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePayNow(payment);
                              }}
                              className="px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition-colors"
                            >
                              Pay Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Breakdown */}
                    {selectedPayment?.id === payment.id && payment.breakdown && (
                      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                        <h4 className="font-semibold text-slate-900 mb-3">Payment Breakdown:</h4>
                        <div className="space-y-2">
                          {payment.breakdown.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
                              <p className="text-sm text-slate-700">{item.label}</p>
                              <p className="font-semibold text-slate-900">₱{item.amount.toLocaleString('en-PH')}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Announcements Sidebar */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-amber-50 to-transparent">
              <h2 className="text-lg font-bold text-slate-900">Latest News</h2>
            </div>
            <div className="flex-1 divide-y divide-slate-200 overflow-y-auto">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  onClick={() => router.push('/announcements')}
                  className="px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm line-clamp-2 group-hover:text-blue-600">
                        {announcement.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{announcement.date}</p>
                      <span className="inline-block mt-2 text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded-full">
                        {announcement.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => router.push('/announcements')}
                className="text-blue-600 hover:text-blue-700 text-sm font-semibold w-full text-left"
              >
                See all announcements →
              </button>
            </div>
          </div>
        </div>

        {/* Notice Banner */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-900">📢 Maintenance Notice</p>
            <p className="text-sm text-blue-800 mt-1">
              Water pipe maintenance is scheduled for May 10-12. Please prepare extra water supplies. For more details, check the announcements section.
            </p>
          </div>
        </div>
      </div>
    </HomeownerLayout>
  );
}
