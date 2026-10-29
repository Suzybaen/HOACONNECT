import React from 'react';

type BadgeVariant = 'paid' | 'unpaid' | 'overdue' | 'pending' | 'in-progress' | 'resolved' | 'urgent' | 'general' | 'billing' | 'confirmed' | 'missed' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeVariant, string> = {
  paid: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  unpaid: 'bg-amber-50 text-amber-700 border border-amber-200',
  overdue: 'bg-red-50 text-red-700 border border-red-200',
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  'in-progress': 'bg-blue-50 text-blue-700 border border-blue-200',
  resolved: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  urgent: 'bg-red-50 text-red-700 border border-red-200',
  general: 'bg-slate-50 text-slate-600 border border-slate-200',
  billing: 'bg-violet-50 text-violet-700 border border-violet-200',
  confirmed: 'bg-teal-50 text-teal-700 border border-teal-200',
  missed: 'bg-red-50 text-red-700 border border-red-200',
  default: 'bg-slate-50 text-slate-600 border border-slate-200',
};

export default function Badge({ variant = 'default', children, className = '', size = 'sm' }: BadgeProps) {
  const sizeStyles = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';
  return (
    <span className={`inline-flex items-center gap-1 font-medium rounded-full ${sizeStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}