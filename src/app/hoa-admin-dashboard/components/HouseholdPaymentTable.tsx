'use client';
import React, { useState } from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { toast } from 'sonner';

// TODO: Replace with GET /api/households?page=1&pageSize=10&status=all
const households = [
  { id: 'hh-001', block: 'Block 1', lot: 'Lot 3', owner: 'Lorna Castillo', phone: '09171234567', status: 'paid' as const, month: 'April 2026', date: 'Apr 2', ref: 'GCH-20260402-1123' },
  { id: 'hh-002', block: 'Block 1', lot: 'Lot 7', owner: 'Eduardo Villanueva', phone: '09281234567', status: 'overdue' as const, month: 'March 2026', date: '—', ref: '—' },
  { id: 'hh-003', block: 'Block 2', lot: 'Lot 1', owner: 'Carmelita Ramos', phone: '09191234567', status: 'paid' as const, month: 'April 2026', date: 'Apr 4', ref: 'GCH-20260404-2234' },
  { id: 'hh-004', block: 'Block 2', lot: 'Lot 5', owner: 'Rodrigo Dela Cruz', phone: '09361234567', status: 'unpaid' as const, month: 'April 2026', date: '—', ref: '—' },
  { id: 'hh-005', block: 'Block 3', lot: 'Lot 2', owner: 'Natividad Bautista', phone: '09171234568', status: 'paid' as const, month: 'April 2026', date: 'Apr 1', ref: 'GCH-20260401-3345' },
  { id: 'hh-006', block: 'Block 3', lot: 'Lot 8', owner: 'Bernardo Soriano', phone: '09221234567', status: 'overdue' as const, month: 'February 2026', date: '—', ref: '—' },
  { id: 'hh-007', block: 'Block 4', lot: 'Lot 4', owner: 'Felicitas Mendoza', phone: '09451234567', status: 'paid' as const, month: 'April 2026', date: 'Apr 3', ref: 'GCH-20260403-4456' },
  { id: 'hh-008', block: 'Block 4', lot: 'Lot 12', owner: 'Maria Reyes', phone: '09171234569', status: 'unpaid' as const, month: 'May 2026', date: '—', ref: '—' },
  { id: 'hh-009', block: 'Block 5', lot: 'Lot 6', owner: 'Angelito Pascual', phone: '09321234567', status: 'paid' as const, month: 'April 2026', date: 'Apr 5', ref: 'GCH-20260405-5567' },
  { id: 'hh-010', block: 'Block 5', lot: 'Lot 9', owner: 'Rosario Ferrer', phone: '09181234567', status: 'overdue' as const, month: 'January 2026', date: '—', ref: '—' },
];

type SortField = 'block' | 'owner' | 'status';

export default function HouseholdPaymentTable() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'unpaid' | 'overdue'>('all');
  const [sortField, setSortField] = useState<SortField>('block');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 7;

  const filtered = households
    .filter((h) => {
      const q = search.toLowerCase();
      const matchSearch = h.owner.toLowerCase().includes(q) || h.block.toLowerCase().includes(q) || h.lot.toLowerCase().includes(q);
      const matchStatus = filterStatus === 'all' || h.status === filterStatus;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      const av = a[sortField];
      const bv = b[sortField];
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const handleBulkRemind = () => {
    toast.success(`Payment reminder sent to ${selected.length} household(s).`, { duration: 3000 });
    setSelected([]);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronUp size={12} className="text-muted-foreground/40" />;
    return sortDir === 'asc' ? <ChevronUp size={12} className="text-primary-700" /> : <ChevronDown size={12} className="text-primary-700" />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-border overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Household Payment Status</h3>
          <span className="text-xs text-muted-foreground">{filtered.length} households</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="relative flex-1 min-w-40">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, block, lot..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-8 pr-3 py-2 text-sm border border-input rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary-700 transition-colors"
            />
          </div>
          <div className="flex gap-1.5">
            {(['all', 'paid', 'unpaid', 'overdue'] as const).map((s) => (
              <button
                key={`filter-${s}`}
                onClick={() => { setFilterStatus(s); setPage(1); }}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  filterStatus === s
                    ? 'bg-primary-700 text-white' :'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bulk action bar */}
      {selected.length > 0 && (
        <div className="px-5 py-2.5 bg-primary-700/5 border-b border-primary-700/10 flex items-center justify-between animate-slide-up">
          <span className="text-xs font-medium text-primary-700">{selected.length} selected</span>
          <div className="flex gap-2">
            <button
              onClick={handleBulkRemind}
              className="px-3 py-1.5 text-xs font-semibold bg-primary-700 text-white rounded-lg hover:bg-primary-800 active:scale-95 transition-all"
            >
              Send Payment Reminder
            </button>
            <button
              onClick={() => setSelected([])}
              className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  className="rounded border-input accent-primary-700"
                  checked={selected.length === paginated.length && paginated.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) setSelected(paginated.map((h) => h.id));
                    else setSelected([]);
                  }}
                />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-600 text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
                onClick={() => toggleSort('block')}
              >
                <div className="flex items-center gap-1">Block/Lot <SortIcon field="block" /></div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-600 text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
                onClick={() => toggleSort('owner')}
              >
                <div className="flex items-center gap-1">Owner <SortIcon field="owner" /></div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-600 text-muted-foreground uppercase tracking-wider">Phone</th>
              <th
                className="px-4 py-3 text-left text-xs font-600 text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
                onClick={() => toggleSort('status')}
              >
                <div className="flex items-center gap-1">Status <SortIcon field="status" /></div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-600 text-muted-foreground uppercase tracking-wider">Billing Period</th>
              <th className="px-4 py-3 text-left text-xs font-600 text-muted-foreground uppercase tracking-wider">Date Paid</th>
              <th className="px-4 py-3 text-left text-xs font-600 text-muted-foreground uppercase tracking-wider">Reference</th>
              <th className="px-4 py-3 text-xs font-600 text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.map((h, i) => (
              <tr
                key={h.id}
                className={`hover:bg-muted/30 transition-colors ${i % 2 === 0 ? '' : 'bg-muted/10'} ${selected.includes(h.id) ? 'bg-primary-700/5' : ''}`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="rounded border-input accent-primary-700"
                    checked={selected.includes(h.id)}
                    onChange={() => toggleSelect(h.id)}
                  />
                </td>
                <td className="px-4 py-3">
                  <span className="font-medium text-foreground">{h.block}</span>
                  <span className="text-muted-foreground"> · {h.lot}</span>
                </td>
                <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{h.owner}</td>
                <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{h.phone}</td>
                <td className="px-4 py-3">
                  <Badge variant={h.status}>
                    {h.status === 'paid' ? '✓ Paid' : h.status === 'overdue' ? '⚠ Overdue' : '○ Unpaid'}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{h.month}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{h.date}</td>
                <td className="px-4 py-3 text-muted-foreground font-mono text-xs truncate max-w-28">{h.ref}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toast.info(`Reminder sent to ${h.owner}`, { duration: 2500 })}
                    className="px-2.5 py-1.5 text-xs font-medium text-primary-700 bg-primary-700/5 hover:bg-primary-700/10 rounded-lg transition-colors"
                  >
                    Remind
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-5 py-3 border-t border-border flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Showing {Math.min((page - 1) * pageSize + 1, filtered.length)}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={`page-${i + 1}`}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 text-xs font-medium rounded-lg transition-colors ${
                page === i + 1
                  ? 'bg-primary-700 text-white' :'text-muted-foreground hover:bg-muted border border-border'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}