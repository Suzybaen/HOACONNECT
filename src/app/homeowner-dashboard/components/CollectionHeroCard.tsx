'use client';
import React, { useState } from 'react';
import { Trash2, CheckCircle2, XCircle, Clock, AlertTriangle, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { useCommunity } from '@/contexts/CommunityContext';
import { useMockAuth } from '@/contexts/MockAuthContext';

type ConfirmStatus = 'idle' | 'confirmed' | 'declined';

export default function CollectionHeroCard() {
  const { user } = useMockAuth();
  const { wasteSchedules, confirmations, setWasteResponse, clearWasteResponse } = useCommunity();
  const [loading, setLoading] = useState<'confirm' | 'decline' | null>(null);

  const nextSchedule = wasteSchedules.find((schedule) => schedule.zone === 'B') || wasteSchedules[0];
  const householdId = user?.id || 'hw-012';
  const currentConfirmation = confirmations.find((item) => item.householdId === householdId && item.scheduleId === nextSchedule.id);
  const status: ConfirmStatus = currentConfirmation?.response === 'ready'
    ? 'confirmed'
    : currentConfirmation?.response === 'pass'
      ? 'declined'
      : 'idle';

  const handleConfirm = async () => {
    setLoading('confirm');
    await new Promise((r) => setTimeout(r, 600));
    setWasteResponse(householdId, nextSchedule.id, 'ready');
    setLoading(null);
    toast.success('Trash confirmed. Collector has been notified.', { duration: 3000 });
  };

  const handleDecline = async () => {
    setLoading('decline');
    await new Promise((r) => setTimeout(r, 600));
    setWasteResponse(householdId, nextSchedule.id, 'pass');
    setLoading(null);
    toast.info('Collectors will pass your household this week.', { duration: 3000 });
  };

  const handleReset = () => {
    clearWasteResponse(householdId, nextSchedule.id);
    toast('Status reset. You can confirm again.', { duration: 2000 });
  };

  return (
    <div className={`rounded-2xl p-5 sm:p-6 shadow-card transition-all duration-300 ${
      status === 'confirmed' ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white'
        : status === 'declined' ? 'bg-gradient-to-br from-slate-600 to-slate-700 text-white' : 'bg-gradient-to-br from-primary-700 to-teal-600 text-white'
    }`}>
      <div className="flex items-start justify-between mb-4 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trash2 size={18} className="opacity-90" />
            <span className="text-sm font-medium opacity-90">Waste Collection</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">{nextSchedule.day}, {nextSchedule.date}</h2>
          <div className="flex items-center gap-1.5 mt-1">
            <Clock size={13} className="opacity-75" />
            <span className="text-sm opacity-75">{nextSchedule.time}</span>
          </div>
        </div>
        <div className="px-3 py-1.5 rounded-full text-xs font-semibold border bg-white/20 border-white/30 text-white">
          Next Collection
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-5 p-3 rounded-xl bg-white/10 border border-white/15">
        <div>
          <p className="text-xs opacity-70 mb-0.5">Block</p>
          <p className="text-sm font-bold">{user?.block || 'Block 4'}</p>
        </div>
        <div>
          <p className="text-xs opacity-70 mb-0.5">Lot</p>
          <p className="text-sm font-bold">{user?.lot || 'Lot 12'}</p>
        </div>
        <div>
          <p className="text-xs opacity-70 mb-0.5">Zone</p>
          <p className="text-sm font-bold">Zone B</p>
        </div>
        <div>
          <p className="text-xs opacity-70 mb-0.5">ETA</p>
          <p className="text-sm font-bold">~7:30 AM</p>
        </div>
      </div>

      {status === 'idle' && (
        <div className="space-y-3">
          <p className="text-sm opacity-80 font-medium">Will you have trash ready for this collection?</p>
          <div className="flex gap-3">
            <button
              onClick={handleConfirm}
              disabled={loading !== null}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-emerald-700 font-semibold text-sm hover:bg-emerald-50 active:scale-95 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              <CheckCircle2 size={17} />
              {loading === 'confirm' ? 'Confirming...' : 'Trash Ready'}
            </button>
            <button
              onClick={handleDecline}
              disabled={loading !== null}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/20 text-white font-semibold text-sm hover:bg-white/30 active:scale-95 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed border border-white/30"
            >
              <XCircle size={17} />
              {loading === 'decline' ? 'Saving...' : 'Pass This Week'}
            </button>
          </div>
        </div>
      )}

      {status === 'confirmed' && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <CheckCircle2 size={22} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-white">Trash Ready Confirmed</p>
              <p className="text-sm text-white/75">Collector notified - {currentConfirmation?.confirmedAt}</p>
            </div>
          </div>
          <button onClick={handleReset} className="p-2 rounded-lg bg-white/15 hover:bg-white/25 transition-colors" aria-label="Reset confirmation">
            <RotateCcw size={16} className="text-white" />
          </button>
        </div>
      )}

      {status === 'declined' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <XCircle size={22} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Passing This Week</p>
                <p className="text-sm text-white/75">Collectors will skip your stop for this schedule.</p>
              </div>
            </div>
            <button onClick={handleReset} className="p-2 rounded-lg bg-white/15 hover:bg-white/25 transition-colors" aria-label="Reset confirmation">
              <RotateCcw size={16} className="text-white" />
            </button>
          </div>
          <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/20 border border-amber-400/30">
            <AlertTriangle size={14} className="text-amber-200 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-100">Changed your mind? Reset and mark trash ready before collection starts.</p>
          </div>
        </div>
      )}
    </div>
  );
}
