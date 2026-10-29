'use client';
import React, { useState } from 'react';
import { CreditCard, CheckCircle2, AlertCircle, Clock, ChevronRight, Receipt } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { toast } from 'sonner';

const paymentHistory = [
  { id: 'pay-001', month: 'April 2026', amount: 210, status: 'paid' as const, date: 'Apr 3, 2026', ref: 'GCH-20260403-8821' },
  { id: 'pay-002', month: 'March 2026', amount: 210, status: 'paid' as const, date: 'Mar 5, 2026', ref: 'GCH-20260305-7743' },
  { id: 'pay-003', month: 'February 2026', amount: 210, status: 'paid' as const, date: 'Feb 4, 2026', ref: 'GCH-20260204-6612' },
  { id: 'pay-004', month: 'January 2026', amount: 210, status: 'paid' as const, date: 'Jan 6, 2026', ref: 'GCH-20260106-5521' },
  { id: 'pay-005', month: 'December 2025', amount: 210, status: 'paid' as const, date: 'Dec 3, 2025', ref: 'GCH-20251203-4432' },
];

type PaymentStatus = 'paid' | 'unpaid' | 'overdue';

interface CurrentMonthPayment {
  month: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
}

const currentMonth: CurrentMonthPayment = { month: 'May 2026', amount: 210, dueDate: 'May 5, 2026', status: 'unpaid' };

export default function PaymentStatusCard() {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [paying, setPaying] = useState(false);

  const handlePay = async () => {
    setPaying(true);
    // TODO: Redirect to GCash payment gateway with householdId, amount, month
    await new Promise((r) => setTimeout(r, 1500));
    setPaying(false);
    setPayModalOpen(false);
    toast.success('Payment initiated via GCash. Reference will be sent to your mobile.', { duration: 4000 });
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-5 shadow-card border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CreditCard size={16} className="text-primary-700" />
            <span className="text-sm font-semibold text-foreground">HOA Dues</span>
          </div>
          <Badge variant={currentMonth.status}>{currentMonth.status === 'unpaid' ? 'Unpaid' : currentMonth.status === 'overdue' ? 'Overdue' : 'Paid'}</Badge>
        </div>

        {/* Current month */}
        <div className={`rounded-xl p-4 mb-4 ${
          currentMonth.status === 'paid' ? 'bg-emerald-50 border border-emerald-100' :
          currentMonth.status === 'overdue'? 'bg-red-50 border border-red-100' : 'bg-amber-50 border border-amber-100'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs text-muted-foreground font-medium">{currentMonth.month}</p>
              <p className="text-2xl font-bold text-foreground tabular-nums font-mono mt-0.5">₱{currentMonth.amount.toLocaleString()}</p>
            </div>
            {currentMonth.status === 'paid' ? (
              <CheckCircle2 size={28} className="text-emerald-600" />
            ) : currentMonth.status === 'overdue' ? (
              <AlertCircle size={28} className="text-red-600" />
            ) : (
              <Clock size={28} className="text-amber-600" />
            )}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {currentMonth.status === 'paid' ? 'Paid on time ✓' : `Due: ${currentMonth.dueDate}`}
            </p>
            {currentMonth.status !== 'paid' && (
              <button
                onClick={() => setPayModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-700 text-white text-xs font-semibold rounded-lg hover:bg-primary-800 active:scale-95 transition-all duration-150"
              >
                <CreditCard size={12} />
                Pay via GCash
              </button>
            )}
          </div>
        </div>

        {/* History shortcut */}
        <button
          onClick={() => setHistoryOpen(true)}
          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
        >
          <div className="flex items-center gap-2">
            <Receipt size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">Payment History</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">5 records</span>
            <ChevronRight size={14} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>
      </div>

      {/* Payment history modal */}
      <Modal isOpen={historyOpen} onClose={() => setHistoryOpen(false)} title="Payment History" size="lg">
        <div className="space-y-2 max-h-72 overflow-y-auto scrollbar-thin pr-1">
          {paymentHistory.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/40 hover:bg-muted transition-colors">
              <div>
                <p className="text-sm font-medium text-foreground">{p.month}</p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">{p.ref}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground tabular-nums font-mono">₱{p.amount}</p>
                <p className="text-xs text-muted-foreground">{p.date}</p>
              </div>
              <Badge variant={p.status} className="ml-3">Paid</Badge>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
          <p className="text-xs text-emerald-700 font-medium">✓ All 5 months paid on time — excellent standing!</p>
        </div>
      </Modal>

      {/* GCash payment modal */}
      <Modal isOpen={payModalOpen} onClose={() => setPayModalOpen(false)} title="Pay HOA Dues via GCash">
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">GCash Payment</p>
                <p className="text-xs text-muted-foreground">Secure mobile payment</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Billing Period</span>
                <span className="font-medium">{currentMonth.month}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Household</span>
                <span className="font-medium">Block 4, Lot 12</span>
              </div>
              <div className="flex justify-between text-sm font-semibold border-t border-blue-200 pt-2 mt-2">
                <span>Total Amount</span>
                <span className="text-blue-700 font-mono">₱{currentMonth.amount}</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">You will be redirected to GCash to complete payment. A confirmation will be sent to your registered mobile number.</p>
          <div className="flex gap-3">
            <button
              onClick={() => setPayModalOpen(false)}
              className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePay}
              disabled={paying}
              className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-150 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {paying ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Processing...
                </>
              ) : 'Pay ₱210 via GCash'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
