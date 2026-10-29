'use client';
import React, { useState } from 'react';
import { FileText, AlertTriangle, Truck, Phone, ChevronRight } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type ReportForm = {
  category: string;
  description: string;
  anonymous: boolean;
};

export default function QuickActions() {
  const [reportOpen, setReportOpen] = useState(false);
  const [urgentOpen, setUrgentOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReportForm>({
    defaultValues: { category: '', description: '', anonymous: false },
  });

  const onSubmitReport = async (data: ReportForm) => {
    setSubmitting(true);
    // TODO: POST /api/reports { householdId, ...data, timestamp }
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setReportOpen(false);
    reset();
    toast.success(`Report submitted${data.anonymous ? ' anonymously' : ''}. Reference: #RPT-${Math.floor(1000 + Math.random() * 9000)}`, { duration: 4000 });
  };

  const onSubmitUrgent = async () => {
    setSubmitting(true);
    // TODO: POST /api/urgent-pickup { householdId, timestamp, paymentRequired: true }
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setUrgentOpen(false);
    toast.success('Urgent pickup request submitted! Please complete payment to confirm.', { duration: 4000 });
  };

  const actions = [
    {
      key: 'qa-report',
      icon: FileText,
      label: 'Submit a Report',
      description: 'Missed collection, complaints, concerns',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      onClick: () => setReportOpen(true),
    },
    {
      key: 'qa-urgent',
      icon: Truck,
      label: 'Urgent Pickup',
      description: 'Missed collection? Request special pickup',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      onClick: () => setUrgentOpen(true),
    },
    {
      key: 'qa-contact',
      icon: Phone,
      label: 'Contact HOA Office',
      description: 'Mon–Fri 8:00 AM–5:00 PM',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      onClick: () => toast.info('HOA Office: (02) 8-555-4321', { duration: 4000 }),
    },
  ];

  return (
    <>
      <div className="bg-white rounded-2xl p-5 shadow-card border border-border">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={16} className="text-primary-700" />
          <span className="text-sm font-semibold text-foreground">Quick Actions</span>
        </div>
        <div className="space-y-2">
          {actions.map((action) => (
            <button
              key={action.key}
              onClick={action.onClick}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group text-left"
            >
              <div className={`p-2 rounded-lg ${action.bg}`}>
                <action.icon size={16} className={action.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{action.label}</p>
                <p className="text-xs text-muted-foreground truncate">{action.description}</p>
              </div>
              <ChevronRight size={15} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>

      {/* Report modal */}
      <Modal isOpen={reportOpen} onClose={() => { setReportOpen(false); reset(); }} title="Submit a Report or Concern">
        <form onSubmit={handleSubmit(onSubmitReport)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="category">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              {...register('category', { required: 'Please select a category' })}
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary-700 transition-colors"
            >
              <option value="">Select a category...</option>
              <option value="missed-collection">Missed Trash Collection</option>
              <option value="noise-complaint">Noise Complaint</option>
              <option value="road-damage">Road / Infrastructure Damage</option>
              <option value="security-concern">Security Concern</option>
              <option value="neighbor-dispute">Neighbor Dispute</option>
              <option value="other">Other</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="description">
              Description <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-muted-foreground mb-1.5">Provide as much detail as possible to help the HOA resolve your concern.</p>
            <textarea
              id="description"
              {...register('description', { required: 'Description is required', minLength: { value: 20, message: 'Please provide at least 20 characters' } })}
              rows={4}
              placeholder="Describe the issue in detail..."
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary-700 transition-colors resize-none"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <input
              type="checkbox"
              id="anonymous"
              {...register('anonymous')}
              className="mt-0.5 rounded border-input accent-primary-700"
            />
            <div>
              <label htmlFor="anonymous" className="text-sm font-medium text-foreground cursor-pointer">Submit Anonymously</label>
              <p className="text-xs text-muted-foreground mt-0.5">Your name and household details will not be shared with the HOA office.</p>
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={() => { setReportOpen(false); reset(); }}
              className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 rounded-lg bg-primary-700 text-white text-sm font-semibold hover:bg-primary-800 active:scale-95 transition-all duration-150 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Submitting...
                </>
              ) : 'Submit Report'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Urgent pickup modal */}
      <Modal isOpen={urgentOpen} onClose={() => setUrgentOpen(false)} title="Request Urgent Pickup">
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-1">Additional Fee Required</p>
                <p className="text-sm text-amber-700">Urgent pickups outside the regular schedule require an additional fee of <span className="font-bold">₱50</span> per request.</p>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Household</span>
              <span className="font-medium">Block 4, Lot 12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Requested Date</span>
              <span className="font-medium">April 28, 2026</span>
            </div>
            <div className="flex justify-between font-semibold border-t border-border pt-2 mt-1">
              <span>Urgent Pickup Fee</span>
              <span className="text-amber-600 font-mono">₱50.00</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Payment must be completed via GCash before the request is approved. Collector will be dispatched within 2–4 hours of payment confirmation.</p>
          <div className="flex gap-3">
            <button
              onClick={() => setUrgentOpen(false)}
              className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSubmitUrgent}
              disabled={submitting}
              className="flex-1 py-2.5 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 active:scale-95 transition-all duration-150 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Requesting...
                </>
              ) : 'Request + Pay ₱50'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}