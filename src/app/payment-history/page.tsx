'use client';
import React, { useState } from 'react';
import HomeownerLayout from '@/app/homeowner-dashboard/components/HomeownerLayout';
import { CreditCard, CheckCircle2, AlertCircle, Clock, Download, Search, TrendingUp, Calendar, Receipt, ChevronDown, ChevronUp } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { toast } from 'sonner';

interface PaymentRecord {
  id: string;
  month: string;
  year: number;
  amount: number;
  status: 'paid' | 'unpaid' | 'overdue';
  date: string | null;
  ref: string | null;
  method: string | null;
  dueDate: string;
}

const allPayments: PaymentRecord[] = [
  { id: 'pay-001', month: 'May', year: 2026, amount: 210, status: 'unpaid', date: null, ref: null, method: null, dueDate: 'May 5, 2026' },
  { id: 'pay-002', month: 'April', year: 2026, amount: 210, status: 'paid', date: 'Apr 3, 2026', ref: 'GCH-20260403-8821', method: 'GCash', dueDate: 'Apr 5, 2026' },
  { id: 'pay-003', month: 'March', year: 2026, amount: 210, status: 'paid', date: 'Mar 5, 2026', ref: 'GCH-20260305-7743', method: 'GCash', dueDate: 'Mar 5, 2026' },
  { id: 'pay-004', month: 'February', year: 2026, amount: 210, status: 'paid', date: 'Feb 4, 2026', ref: 'GCH-20260204-6612', method: 'GCash', dueDate: 'Feb 5, 2026' },
  { id: 'pay-005', month: 'January', year: 2026, amount: 210, status: 'paid', date: 'Jan 6, 2026', ref: 'GCH-20260106-5521', method: 'GCash', dueDate: 'Jan 5, 2026' },
  { id: 'pay-006', month: 'December', year: 2025, amount: 210, status: 'paid', date: 'Dec 3, 2025', ref: 'GCH-20251203-4432', method: 'GCash', dueDate: 'Dec 5, 2025' },
  { id: 'pay-007', month: 'November', year: 2025, amount: 210, status: 'paid', date: 'Nov 4, 2025', ref: 'GCH-20251104-3321', method: 'GCash', dueDate: 'Nov 5, 2025' },
  { id: 'pay-008', month: 'October', year: 2025, amount: 210, status: 'paid', date: 'Oct 7, 2025', ref: 'GCH-20251007-2210', method: 'GCash', dueDate: 'Oct 5, 2025' },
  { id: 'pay-009', month: 'September', year: 2025, amount: 210, status: 'paid', date: 'Sep 5, 2025', ref: 'GCH-20250905-1109', method: 'GCash', dueDate: 'Sep 5, 2025' },
  { id: 'pay-010', month: 'August', year: 2025, amount: 210, status: 'overdue', date: null, ref: null, method: null, dueDate: 'Aug 5, 2025' },
  { id: 'pay-011', month: 'July', year: 2025, amount: 210, status: 'paid', date: 'Jul 4, 2025', ref: 'GCH-20250704-0098', method: 'GCash', dueDate: 'Jul 5, 2025' },
  { id: 'pay-012', month: 'June', year: 2025, amount: 210, status: 'paid', date: 'Jun 3, 2025', ref: 'GCH-20250603-9987', method: 'GCash', dueDate: 'Jun 5, 2025' },
];

const statusConfig = {
  paid: { label: 'Paid', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
  unpaid: { label: 'Unpaid', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
  overdue: { label: 'Overdue', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50 border-red-100' },
};

export default function PaymentHistoryPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'unpaid' | 'overdue'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [payingId, setPayingId] = useState<string | null>(null);

  const paidCount = allPayments.filter((p) => p.status === 'paid').length;
  const unpaidCount = allPayments.filter((p) => p.status === 'unpaid').length;
  const overdueCount = allPayments.filter((p) => p.status === 'overdue').length;
  const totalPaid = allPayments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0);

  const filtered = allPayments.filter((p) => {
    const matchSearch = search === '' || `${p.month} ${p.year}`.toLowerCase().includes(search.toLowerCase()) || (p.ref || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handlePay = async (id: string) => {
    setPayingId(id);
    await new Promise((r) => setTimeout(r, 1500));
    setPayingId(null);
    toast.success('Payment initiated via GCash. Reference will be sent to your mobile.', { duration: 4000 });
  };

  return (
    <HomeownerLayout>
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5 pb-24 lg:pb-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Payment History</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Block 4, Lot 12 · Monthly HOA Dues</p>
          </div>
          <button
            onClick={() => toast.info('Statement download coming soon.', { duration: 2500 })}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
          >
            <Download size={15} />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>

        {/* Stats bento */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={14} className="text-primary-700" />
              <span className="text-xs text-muted-foreground font-medium">Total Paid</span>
            </div>
            <p className="text-xl font-bold text-foreground font-mono tabular-nums">₱{totalPaid.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{paidCount} months</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span className="text-xs text-muted-foreground font-medium">On Time</span>
            </div>
            <p className="text-xl font-bold text-emerald-600 font-mono tabular-nums">{paidCount}</p>
            <p className="text-xs text-muted-foreground mt-0.5">payments</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={14} className="text-amber-600" />
              <span className="text-xs text-muted-foreground font-medium">Pending</span>
            </div>
            <p className="text-xl font-bold text-amber-600 font-mono tabular-nums">{unpaidCount}</p>
            <p className="text-xs text-muted-foreground mt-0.5">this month</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={14} className="text-red-600" />
              <span className="text-xs text-muted-foreground font-medium">Overdue</span>
            </div>
            <p className="text-xl font-bold text-red-600 font-mono tabular-nums">{overdueCount}</p>
            <p className="text-xs text-muted-foreground mt-0.5">months</p>
          </div>
        </div>

        {/* Compliance bar */}
        <div className="bg-white rounded-2xl p-4 shadow-card border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">Payment Compliance</span>
            <span className="text-sm font-bold text-primary-700">{Math.round((paidCount / allPayments.length) * 100)}%</span>
          </div>
          <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-700 rounded-full transition-all duration-700"
              style={{ width: `${(paidCount / allPayments.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">{paidCount} of {allPayments.length} months paid · {overdueCount > 0 ? `${overdueCount} overdue` : 'No overdue payments'}</p>
        </div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by month or reference…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-700/20 focus:border-primary-700 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'paid', 'unpaid', 'overdue'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors capitalize ${
                  filterStatus === s
                    ? 'bg-primary-700 text-white border-primary-700' :'bg-white text-muted-foreground border-border hover:bg-muted'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Payment list */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-border shadow-card">
              <Receipt size={32} className="mx-auto text-muted-foreground mb-3" />
              <p className="text-sm font-medium text-muted-foreground">No records found</p>
            </div>
          ) : (
            filtered.map((payment) => {
              const cfg = statusConfig[payment.status];
              const isExpanded = expandedId === payment.id;
              return (
                <div
                  key={payment.id}
                  className="bg-white rounded-2xl border border-border shadow-card overflow-hidden"
                >
                  {/* Row */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : payment.id)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors text-left"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${cfg.bg} flex-shrink-0`}>
                      <cfg.icon size={16} className={cfg.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{payment.month} {payment.year}</p>
                        <Badge variant={payment.status}>{cfg.label}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {payment.status === 'paid' ? `Paid ${payment.date}` : `Due: ${payment.dueDate}`}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 mr-2">
                      <p className="text-sm font-bold text-foreground font-mono tabular-nums">₱{payment.amount}</p>
                      {payment.method && <p className="text-xs text-muted-foreground">{payment.method}</p>}
                    </div>
                    {isExpanded ? (
                      <ChevronUp size={16} className="text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-muted-foreground flex-shrink-0" />
                    )}
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-border/60 pt-3 bg-muted/20">
                      {payment.status === 'paid' ? (
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-white rounded-xl border border-border">
                              <p className="text-xs text-muted-foreground mb-1">Reference No.</p>
                              <p className="text-xs font-mono font-semibold text-foreground">{payment.ref}</p>
                            </div>
                            <div className="p-3 bg-white rounded-xl border border-border">
                              <p className="text-xs text-muted-foreground mb-1">Payment Method</p>
                              <p className="text-xs font-semibold text-foreground">{payment.method}</p>
                            </div>
                            <div className="p-3 bg-white rounded-xl border border-border">
                              <p className="text-xs text-muted-foreground mb-1">Date Paid</p>
                              <p className="text-xs font-semibold text-foreground">{payment.date}</p>
                            </div>
                            <div className="p-3 bg-white rounded-xl border border-border">
                              <p className="text-xs text-muted-foreground mb-1">Amount</p>
                              <p className="text-xs font-semibold font-mono text-foreground">₱{payment.amount}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                            <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0" />
                            <p className="text-xs text-emerald-700 font-medium">Payment confirmed and recorded.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className={`flex items-start gap-2 p-3 rounded-xl border ${cfg.bg}`}>
                            <cfg.icon size={14} className={`${cfg.color} flex-shrink-0 mt-0.5`} />
                            <div>
                              <p className={`text-xs font-semibold ${cfg.color}`}>
                                {payment.status === 'overdue' ? 'Payment Overdue' : 'Payment Due'}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {payment.status === 'overdue'
                                  ? `This payment was due on ${payment.dueDate} and has not been settled.`
                                  : `Please settle your HOA dues before ${payment.dueDate}.`}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handlePay(payment.id)}
                            disabled={payingId === payment.id}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-150 disabled:opacity-60"
                          >
                            {payingId === payment.id ? (
                              <>
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                                </svg>
                                Processing…
                              </>
                            ) : (
                              <>
                                <CreditCard size={15} />
                                Pay ₱{payment.amount} via GCash
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Summary footer */}
        <div className="bg-gradient-to-r from-primary-700 to-primary-800 rounded-2xl p-5 text-white">
          <div className="flex items-center gap-3 mb-3">
            <Calendar size={18} className="opacity-80" />
            <span className="text-sm font-semibold">Annual Summary 2025–2026</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-bold font-mono tabular-nums">₱{totalPaid.toLocaleString()}</p>
              <p className="text-xs opacity-70 mt-0.5">Total Paid</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono tabular-nums">{paidCount}</p>
              <p className="text-xs opacity-70 mt-0.5">Months Paid</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono tabular-nums">{Math.round((paidCount / allPayments.length) * 100)}%</p>
              <p className="text-xs opacity-70 mt-0.5">Compliance</p>
            </div>
          </div>
        </div>

      </div>
    </HomeownerLayout>
  );
}
