'use client';
import React, { useMemo, useState } from 'react';
import { Search, CheckCircle2, Circle, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { useCommunity } from '@/contexts/CommunityContext';

export default function ConfirmedHouseholdsList() {
  const { households, confirmations, markCollected } = useCommunity();
  const [search, setSearch] = useState('');
  const [filterZone, setFilterZone] = useState<'all' | 'A' | 'B' | 'C'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'collected' | 'pending'>('all');

  const items = useMemo(() => confirmations
    .filter((confirmation) => confirmation.response === 'ready')
    .map((confirmation) => ({
      confirmation,
      household: households.find((household) => household.id === confirmation.householdId),
    }))
    .filter((item): item is { confirmation: typeof confirmations[number]; household: typeof households[number] } => Boolean(item.household)), [confirmations, households]);

  const filtered = items.filter(({ confirmation, household }) => {
    const q = search.toLowerCase();
    const matchSearch = household.owner.toLowerCase().includes(q) || household.block.toLowerCase().includes(q) || household.address.toLowerCase().includes(q);
    const matchZone = filterZone === 'all' || household.zone === filterZone;
    const matchStatus = filterStatus === 'all' || (filterStatus === 'collected' ? confirmation.collected : !confirmation.collected);
    return matchSearch && matchZone && matchStatus;
  });

  const collectedCount = items.filter(({ confirmation }) => confirmation.collected).length;

  const handleCollected = (id: string) => {
    markCollected(id);
    toast.success('Household marked as collected.', { duration: 2000 });
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Confirmed Households With Trash Ready</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {collectedCount} collected - {items.length - collectedCount} remaining
            </p>
          </div>
          <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full">
            <span className="text-xs font-semibold text-emerald-700">{collectedCount}/{items.length} done</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="relative flex-1 min-w-40">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, block, address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm border border-input rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary-700 transition-colors"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {(['all', 'A', 'B', 'C'] as const).map((z) => (
              <button
                key={`zone-${z}`}
                onClick={() => setFilterZone(z)}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  filterZone === z ? 'bg-primary-700 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {z === 'all' ? 'All Zones' : `Zone ${z}`}
              </button>
            ))}
            {(['all', 'collected', 'pending'] as const).map((s) => (
              <button
                key={`cstatus-${s}`}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  filterStatus === s ? 'bg-primary-700 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              <th className="px-4 py-3 text-left text-xs font-600 text-muted-foreground uppercase tracking-wider">Block/Lot</th>
              <th className="px-4 py-3 text-left text-xs font-600 text-muted-foreground uppercase tracking-wider">Homeowner</th>
              <th className="px-4 py-3 text-left text-xs font-600 text-muted-foreground uppercase tracking-wider">Address</th>
              <th className="px-4 py-3 text-left text-xs font-600 text-muted-foreground uppercase tracking-wider">Zone</th>
              <th className="px-4 py-3 text-left text-xs font-600 text-muted-foreground uppercase tracking-wider">Confirmed At</th>
              <th className="px-4 py-3 text-left text-xs font-600 text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-xs font-600 text-muted-foreground uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map(({ confirmation, household }, i) => (
              <tr key={confirmation.id} className={`transition-colors hover:bg-muted/30 ${confirmation.collected ? 'opacity-60' : ''} ${i % 2 === 0 ? '' : 'bg-muted/10'}`}>
                <td className="px-4 py-3">
                  <span className="font-medium text-foreground">{household.block}</span>
                  <span className="text-muted-foreground"> - {household.lot}</span>
                </td>
                <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{household.owner}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs">
                  <div className="flex items-center gap-1">
                    <MapPin size={11} />
                    {household.address}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">Zone {household.zone}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs font-mono">{confirmation.confirmedAt}</td>
                <td className="px-4 py-3">
                  {confirmation.collected ? (
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <CheckCircle2 size={15} />
                      <span className="text-xs font-medium">Collected</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Circle size={15} />
                      <span className="text-xs font-medium">Pending</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  {!confirmation.collected ? (
                    <button
                      onClick={() => handleCollected(confirmation.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 active:scale-95 transition-all duration-150"
                    >
                      <CheckCircle2 size={13} />
                      Mark Collected
                    </button>
                  ) : (
                    <span className="text-xs text-muted-foreground">Done</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
