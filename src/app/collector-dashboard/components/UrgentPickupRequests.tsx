'use client';
import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, Clock, MapPin } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { toast } from 'sonner';

type PickupPaymentStatus = 'paid' | 'unpaid';
type PickupRequestStatus = 'approved' | 'pending';

interface UrgentPickupRequest {
  id: string;
  ref: string;
  block: string;
  lot: string;
  owner: string;
  address: string;
  requestedAt: string;
  fee: number;
  paymentStatus: PickupPaymentStatus;
  status: PickupRequestStatus;
  notes: string;
}

// TODO: Replace with GET /api/urgent-pickup-requests?status=all
const initialRequests: UrgentPickupRequest[] = [
  {
    id: 'urq-001',
    ref: 'UPR-0018',
    block: 'Block 2',
    lot: 'Lot 5',
    owner: 'Eduardo Villanueva',
    address: '5 Ilang-Ilang St.',
    requestedAt: '7:12 AM',
    fee: 50,
    paymentStatus: 'paid' as const,
    status: 'approved' as const,
    notes: 'Missed Monday collection, bins are full.',
  },
  {
    id: 'urq-002',
    ref: 'UPR-0017',
    block: 'Block 5',
    lot: 'Lot 9',
    owner: 'Rosario Ferrer',
    address: '9 Sampaguita St.',
    requestedAt: '6:55 AM',
    fee: 50,
    paymentStatus: 'unpaid' as const,
    status: 'pending' as const,
    notes: 'Bulk items — sofa and old appliances.',
  },
  {
    id: 'urq-003',
    ref: 'UPR-0016',
    block: 'Block 1',
    lot: 'Lot 14',
    owner: 'Anonymous',
    address: '14 Sampaguita St.',
    requestedAt: '6:30 AM',
    fee: 50,
    paymentStatus: 'unpaid' as const,
    status: 'pending' as const,
    notes: 'Missed last 2 collections.',
  },
];

export default function UrgentPickupRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedReq, setSelectedReq] = useState<UrgentPickupRequest | null>(null);
  const [approving, setApproving] = useState(false);

  const handleApprove = async () => {
    if (!selectedReq) return;
    setApproving(true);
    // TODO: PATCH /api/urgent-pickup-requests/:id { status: 'approved' }
    await new Promise((r) => setTimeout(r, 800));
    setRequests((prev) => prev.map((r) => r.id === selectedReq.id ? { ...r, status: 'approved' as const } : r));
    setApproving(false);
    setSelectedReq(null);
    toast.success(`Urgent pickup approved for ${selectedReq.block} ${selectedReq.lot}.`, { duration: 3000 });
  };

  const handleDecline = async (id: string) => {
    // TODO: PATCH /api/urgent-pickup-requests/:id { status: 'declined' }
    setRequests((prev) => prev.filter((r) => r.id !== id));
    toast.info('Request declined and homeowner notified.', { duration: 2500 });
  };

  const statusColor = (status: string) => {
    if (status === 'approved') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'pending') return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-slate-50 text-slate-600 border-slate-200';
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-card border border-border overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-600" />
            <h3 className="text-sm font-semibold text-foreground">Urgent Pickup Requests</h3>
            <span className="text-xs font-semibold bg-amber-500 text-white rounded-full px-1.5 py-0.5">
              {requests.filter((r) => r.status === 'pending').length}
            </span>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <CheckCircle2 size={28} className="text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">No urgent requests</p>
            <p className="text-xs text-muted-foreground mt-1">All pickup requests have been handled.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {requests.map((req) => (
              <div key={req.id} className={`p-4 ${req.status === 'pending' ? 'bg-amber-50/30' : ''}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-mono font-semibold text-muted-foreground">{req.ref}</span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${statusColor(req.status)}`}>
                        {req.status === 'approved' ? '✓ Approved' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{req.block} · {req.lot}</p>
                    <p className="text-xs text-muted-foreground">{req.owner}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-mono font-bold text-foreground">₱{req.fee}</p>
                    <Badge variant={req.paymentStatus} size="sm" className="mt-1">
                      {req.paymentStatus === 'paid' ? '💳 Paid' : '⏳ Unpaid'}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <MapPin size={11} />
                  <span>{req.address}</span>
                  <span className="mx-1">·</span>
                  <Clock size={11} />
                  <span>Requested {req.requestedAt}</span>
                </div>

                <p className="text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2 mb-3 italic">
                  "{req.notes}"
                </p>

                {req.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedReq(req)}
                      disabled={req.paymentStatus === 'unpaid'}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <CheckCircle2 size={13} />
                      {req.paymentStatus === 'unpaid' ? 'Awaiting Payment' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleDecline(req.id)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 active:scale-95 transition-all"
                    >
                      <XCircle size={13} />
                      Decline
                    </button>
                  </div>
                )}

                {req.status === 'approved' && (
                  <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
                    <CheckCircle2 size={13} />
                    Approved — add to today's route
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm approval modal */}
      <Modal isOpen={!!selectedReq} onClose={() => setSelectedReq(null)} title="Confirm Urgent Pickup Approval" size="sm">
        {selectedReq && (
          <div className="space-y-4">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="text-sm font-semibold text-emerald-800 mb-1">{selectedReq.block} · {selectedReq.lot}</p>
              <p className="text-xs text-emerald-700">{selectedReq.owner} · {selectedReq.address}</p>
              <p className="text-xs text-emerald-600 mt-1.5 font-mono font-semibold">Fee: ₱{selectedReq.fee} — Payment Confirmed ✓</p>
            </div>
            <p className="text-sm text-muted-foreground">This household will be added to your active route. Confirm to proceed.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedReq(null)}
                className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                disabled={approving}
                className="flex-1 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {approving ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    Approving...
                  </>
                ) : 'Approve Pickup'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
