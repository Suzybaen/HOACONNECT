'use client';
import React, { useState } from 'react';
import HomeownerLayout from '@/app/homeowner-dashboard/components/HomeownerLayout';
import Badge from '@/components/ui/Badge';
import {
  FileText, Plus, AlertTriangle, Trash2, MessageSquare, Shield,
  ChevronDown, ChevronUp, Eye, EyeOff, Send, Clock, CheckCircle2,
  Loader2, Filter, Search, X
} from 'lucide-react';
import { toast } from 'sonner';

type ReportCategory = 'Missed Collection' | 'Noise Complaint' | 'Road Damage' | 'Security Concern' | 'Community Concern' | 'Other';
type ReportStatus = 'pending' | 'in-progress' | 'resolved';
type ReportPriority = 'high' | 'medium' | 'low';

interface Report {
  id: string;
  ref: string;
  category: ReportCategory;
  description: string;
  date: string;
  status: ReportStatus;
  priority: ReportPriority;
  anonymous: boolean;
  response?: string;
}

const initialReports: Report[] = [
  {
    id: 'r-001',
    ref: 'RPT-0042',
    category: 'Missed Collection',
    description: 'Trash was not collected on Monday April 21 despite confirming readiness the night before.',
    date: 'April 21, 2026',
    status: 'resolved',
    priority: 'high',
    anonymous: false,
    response: 'We apologize for the inconvenience. The collector was rerouted due to road flooding. A special pickup was arranged on April 22.',
  },
  {
    id: 'r-002',
    ref: 'RPT-0048',
    category: 'Noise Complaint',
    description: 'Loud music from Block 3 Lot 7 every Friday and Saturday night past 11 PM.',
    date: 'April 24, 2026',
    status: 'in-progress',
    priority: 'medium',
    anonymous: true,
  },
  {
    id: 'r-003',
    ref: 'RPT-0051',
    category: 'Road Damage',
    description: 'Large pothole near the main gate entrance causing damage to vehicles.',
    date: 'April 27, 2026',
    status: 'pending',
    priority: 'high',
    anonymous: false,
  },
];

const categoryOptions: ReportCategory[] = [
  'Missed Collection', 'Noise Complaint', 'Road Damage', 'Security Concern', 'Community Concern', 'Other'
];

const categoryIcon: Record<ReportCategory, React.ElementType> = {
  'Missed Collection': Trash2,
  'Noise Complaint': MessageSquare,
  'Road Damage': AlertTriangle,
  'Security Concern': Shield,
  'Community Concern': MessageSquare,
  'Other': FileText,
};

const statusConfig: Record<ReportStatus, { label: string; icon: React.ElementType; color: string }> = {
  pending: { label: 'Pending', icon: Clock, color: 'text-amber-600' },
  'in-progress': { label: 'In Progress', icon: Loader2, color: 'text-blue-600' },
  resolved: { label: 'Resolved', icon: CheckCircle2, color: 'text-emerald-600' },
};

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<ReportStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    category: '' as ReportCategory | '',
    description: '',
    anonymous: false,
  });

  const filtered = reports.filter((r) => {
    const matchStatus = filterStatus === 'all' || r.status === filterStatus;
    const matchSearch = r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ref.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.category || !form.description.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    const newReport: Report = {
      id: `r-${Date.now()}`,
      ref: `RPT-${String(Math.floor(Math.random() * 900) + 100).padStart(4, '0')}`,
      category: form.category as ReportCategory,
      description: form.description,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'pending',
      priority: 'medium',
      anonymous: form.anonymous,
    };
    setReports((prev) => [newReport, ...prev]);
    setForm({ category: '', description: '', anonymous: false });
    setShowForm(false);
    setSubmitting(false);
    toast.success(`Report ${newReport.ref} submitted successfully.`);
  };

  const stats = {
    total: reports.length,
    pending: reports.filter((r) => r.status === 'pending').length,
    inProgress: reports.filter((r) => r.status === 'in-progress').length,
    resolved: reports.filter((r) => r.status === 'resolved').length,
  };

  return (
    <HomeownerLayout>
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-foreground">My Reports</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Submit and track community concerns</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-700 text-white rounded-xl text-sm font-semibold hover:bg-primary-700/90 transition-colors shadow-sm"
          >
            {showForm ? <X size={15} /> : <Plus size={15} />}
            {showForm ? 'Cancel' : 'New Report'}
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total', value: stats.total, color: 'bg-slate-50 border-slate-200 text-slate-700' },
            { label: 'Pending', value: stats.pending, color: 'bg-amber-50 border-amber-200 text-amber-700' },
            { label: 'In Progress', value: stats.inProgress, color: 'bg-blue-50 border-blue-200 text-blue-700' },
            { label: 'Resolved', value: stats.resolved, color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
          ].map((s) => (
            <div key={s.label} className={`rounded-xl border px-4 py-3 ${s.color}`}>
              <p className="text-2xl font-bold tabular-nums">{s.value}</p>
              <p className="text-xs font-medium mt-0.5 opacity-80">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Submit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-border shadow-card p-5 animate-slide-up">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-primary-700/10">
                <FileText size={15} className="text-primary-700" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Submit a Report</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Category <span className="text-red-500">*</span></label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as ReportCategory }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-input bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary-700 transition"
                  required
                >
                  <option value="">Select a category…</option>
                  {categoryOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Description <span className="text-red-500">*</span></label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={4}
                  placeholder="Describe the issue in detail…"
                  className="w-full px-3 py-2.5 rounded-xl border border-input bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary-700 transition resize-none"
                  required
                />
              </div>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, anonymous: !f.anonymous }))}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-colors ${
                    form.anonymous
                      ? 'bg-slate-800 text-white border-slate-800' :'bg-white text-muted-foreground border-border hover:bg-muted'
                  }`}
                >
                  {form.anonymous ? <EyeOff size={14} /> : <Eye size={14} />}
                  {form.anonymous ? 'Submit Anonymously' : 'Submit with Identity'}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary-700 text-white rounded-xl text-sm font-semibold hover:bg-primary-700/90 disabled:opacity-60 transition-colors"
                >
                  {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  {submitting ? 'Submitting…' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search reports…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-xl border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary-700 transition"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Filter size={13} className="text-muted-foreground" />
            {(['all', 'pending', 'in-progress', 'resolved'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filterStatus === s
                    ? 'bg-primary-700 text-white' :'bg-white border border-border text-muted-foreground hover:bg-muted'
                }`}
              >
                {s === 'all' ? 'All' : s === 'in-progress' ? 'In Progress' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-border p-10 text-center">
              <FileText size={32} className="mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">No reports found</p>
              <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters or submit a new report.</p>
            </div>
          ) : (
            filtered.map((r) => {
              const CatIcon = categoryIcon[r.category];
              const StatusIcon = statusConfig[r.status].icon;
              const isExpanded = expandedId === r.id;
              return (
                <div key={r.id} className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : r.id)}
                    className="w-full text-left px-5 py-4 hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 p-2 rounded-xl flex-shrink-0 ${
                        r.priority === 'high' ? 'bg-red-100 text-red-600' :
                        r.priority === 'medium'? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <CatIcon size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-mono font-semibold text-muted-foreground">{r.ref}</span>
                          <Badge variant={r.status}>{statusConfig[r.status].label}</Badge>
                          {r.anonymous && (
                            <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full">
                              <EyeOff size={9} /> Anonymous
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-foreground">{r.category}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{r.description}</p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <StatusIcon size={11} className={statusConfig[r.status].color} />
                          <span className="text-[11px] text-muted-foreground">{r.date}</span>
                        </div>
                      </div>
                      <div className="text-muted-foreground flex-shrink-0 mt-1">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="px-5 pb-4 border-t border-border animate-fade-in">
                      <div className="pt-3 space-y-3">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Full Description</p>
                          <p className="text-sm text-foreground leading-relaxed">{r.description}</p>
                        </div>
                        {r.response && (
                          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                            <p className="text-xs font-semibold text-emerald-700 mb-1">HOA Response</p>
                            <p className="text-sm text-emerald-800 leading-relaxed">{r.response}</p>
                          </div>
                        )}
                        {!r.response && r.status !== 'resolved' && (
                          <div className="bg-muted/40 rounded-xl p-3">
                            <p className="text-xs text-muted-foreground">Awaiting HOA response…</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </HomeownerLayout>
  );
}
