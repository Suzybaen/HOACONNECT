'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminLayout from './components/AdminLayout';
import AdminKPIBento from './components/AdminKPIBento';
import PaymentTrendChart from './components/PaymentTrendChart';
import CollectionParticipationChart from './components/CollectionParticipationChart';
import HouseholdPaymentTable from './components/HouseholdPaymentTable';
import AnnouncementComposer from './components/AnnouncementComposer';
import ReportsPanel from './components/ReportsPanel';
import { useCommunity, type HouseholdStatus, type PaymentStatus } from '@/contexts/CommunityContext';
import { Bell, CreditCard, Home, Mail, MapPin, Phone, Plus, Trash2, Users } from 'lucide-react';
import { toast } from 'sonner';

export default function HOAAdminDashboardPage() {
  return (
    <AdminLayout>
      <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading admin section...</div>}>
        <AdminSectionRouter />
      </Suspense>
    </AdminLayout>
  );
}

function AdminSectionRouter() {
  const section = useSearchParams().get('section') || 'dashboard';

  if (section === 'analytics') return <AnalyticsSection />;
  if (section === 'payments') return <PaymentsSection />;
  if (section === 'waste') return <WasteSection />;
  if (section === 'reports') return <ReportsSection />;
  if (section === 'announcements') return <AnnouncementsSection />;
  if (section === 'households') return <HouseholdsSection />;

  return <DashboardSection />;
}

function DashboardSection() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-6 space-y-6">
      <AdminKPIBento />
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3"><PaymentTrendChart /></div>
        <div className="xl:col-span-2"><CollectionParticipationChart /></div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2"><HouseholdPaymentTable /></div>
        <div className="xl:col-span-1 space-y-6">
          <AnnouncementComposer />
          <ReportsPanel />
        </div>
      </div>
    </div>
  );
}

function AnalyticsSection() {
  const { households, confirmations } = useCommunity();
  const occupied = households.filter((item) => item.status === 'occupied').length;
  const ready = confirmations.filter((item) => item.response === 'ready').length;
  const collected = confirmations.filter((item) => item.response === 'ready' && item.collected).length;
  return (
    <div className="max-w-screen-2xl mx-auto p-6 space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        <Metric label="Occupancy Rate" value={`${Math.round((occupied / households.length) * 100)}%`} />
        <Metric label="Collection Readiness" value={`${ready} homes`} />
        <Metric label="Collected Today" value={`${collected}/${ready}`} />
        <Metric label="Payment Health" value={`${households.filter((h) => h.paymentStatus === 'paid').length}/${households.length}`} />
      </div>
      <div className="grid xl:grid-cols-2 gap-6">
        <PaymentTrendChart />
        <CollectionParticipationChart />
      </div>
    </div>
  );
}

function PaymentsSection() {
  return (
    <div className="max-w-screen-2xl mx-auto p-6 space-y-6">
      <SectionHeader icon={CreditCard} title="Payments" subtitle="Monitor dues, balances, overdue accounts, and reminders." />
      <HouseholdPaymentTable />
    </div>
  );
}

function WasteSection() {
  const { wasteSchedules, confirmations, households } = useCommunity();
  const readyConfirmations = confirmations.filter((item) => item.response === 'ready');
  return (
    <div className="max-w-screen-2xl mx-auto p-6 space-y-6">
      <SectionHeader icon={Trash2} title="Waste Collection" subtitle="HOA-wide schedule and live homeowner readiness confirmations." />
      <div className="grid md:grid-cols-3 gap-4">
        <Metric label="Schedules Published" value={wasteSchedules.length} />
        <Metric label="Ready for Pickup" value={readyConfirmations.length} />
        <Metric label="Collection Completion" value={`${readyConfirmations.filter((item) => item.collected).length}/${readyConfirmations.length}`} />
      </div>
      <div className="grid xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Published Schedule</h3>
          </div>
          <div className="divide-y divide-border">
            {wasteSchedules.map((schedule) => (
              <div key={schedule.id} className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{schedule.day}, {schedule.date}</p>
                    <p className="text-xs text-muted-foreground">{schedule.type}</p>
                  </div>
                  <span className="text-xs font-semibold rounded-full bg-primary-700/10 text-primary-700 px-2 py-1">Zone {schedule.zone}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{schedule.blocks.join(', ')} - {schedule.time}</p>
                <p className="text-xs text-muted-foreground mt-1">{schedule.notes}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Ready Households</h3>
          </div>
          <div className="divide-y divide-border max-h-[520px] overflow-y-auto">
            {readyConfirmations.map((confirmation) => {
              const household = households.find((item) => item.id === confirmation.householdId);
              if (!household) return null;
              return (
                <div key={confirmation.id} className="p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{household.block} - {household.lot}</p>
                    <p className="text-xs text-muted-foreground">{household.owner} - {household.address}</p>
                  </div>
                  <span className={`text-xs font-semibold rounded-full px-2 py-1 ${confirmation.collected ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {confirmation.collected ? 'Collected' : 'Pending'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportsSection() {
  return (
    <div className="max-w-screen-lg mx-auto p-6 space-y-6">
      <SectionHeader icon={Bell} title="Reports" subtitle="Track homeowner reports, complaints, priorities, and resolution status." />
      <ReportsPanel />
    </div>
  );
}

function AnnouncementsSection() {
  const { announcements } = useCommunity();
  return (
    <div className="max-w-screen-lg mx-auto p-6 space-y-6">
      <SectionHeader icon={Bell} title="Announcements" subtitle="Post notices that become visible to every household account." />
      <AnnouncementComposer />
      <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Visible to Homeowners</h3>
        </div>
        <div className="divide-y divide-border">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="p-4">
              <p className="text-sm font-semibold text-foreground">{announcement.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{announcement.date} - {announcement.category}</p>
              <p className="text-sm text-muted-foreground mt-2">{announcement.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HouseholdsSection() {
  const { households, addHousehold } = useCommunity();
  const [form, setForm] = useState({
    owner: '',
    email: '',
    phone: '',
    block: 'Block 1',
    lot: '',
    address: '',
    zone: 'A' as 'A' | 'B' | 'C',
    status: 'occupied' as HouseholdStatus,
    paymentStatus: 'unpaid' as PaymentStatus,
    balance: 210,
  });

  const vacant = households.filter((item) => item.status === 'vacant').length;
  const occupied = households.filter((item) => item.status === 'occupied').length;
  const overdue = households.filter((item) => item.paymentStatus === 'overdue').length;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    addHousehold(form);
    setForm({ ...form, owner: '', email: '', phone: '', lot: '', address: '' });
    toast.success('Household account registered for the app.');
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-6 space-y-6">
      <SectionHeader icon={Users} title="Households" subtitle="Register households, review occupancy, and monitor account readiness." />
      <div className="grid md:grid-cols-4 gap-4">
        <Metric label="Total Households" value={households.length} />
        <Metric label="Occupied" value={occupied} />
        <Metric label="Vacant" value={vacant} />
        <Metric label="Overdue Accounts" value={overdue} />
      </div>
      <div className="grid xl:grid-cols-[1fr_380px] gap-6">
        <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">All Household Accounts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left text-xs uppercase text-muted-foreground">Home</th>
                  <th className="px-4 py-3 text-left text-xs uppercase text-muted-foreground">Owner</th>
                  <th className="px-4 py-3 text-left text-xs uppercase text-muted-foreground">Contact</th>
                  <th className="px-4 py-3 text-left text-xs uppercase text-muted-foreground">Zone</th>
                  <th className="px-4 py-3 text-left text-xs uppercase text-muted-foreground">Occupancy</th>
                  <th className="px-4 py-3 text-left text-xs uppercase text-muted-foreground">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {households.map((household) => (
                  <tr key={household.id} className="hover:bg-muted/20">
                    <td className="px-4 py-3 font-semibold text-foreground">{household.block} - {household.lot}</td>
                    <td className="px-4 py-3">{household.owner}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <div className="flex items-center gap-1"><Mail size={12} /> {household.email}</div>
                      <div className="flex items-center gap-1 mt-1"><Phone size={12} /> {household.phone}</div>
                    </td>
                    <td className="px-4 py-3">Zone {household.zone}</td>
                    <td className="px-4 py-3 capitalize">{household.status}</td>
                    <td className="px-4 py-3 capitalize">{household.paymentStatus} - PHP {household.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <form onSubmit={submit} className="bg-white rounded-2xl border border-border shadow-card p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Plus size={16} className="text-primary-700" />
            <h3 className="text-sm font-semibold text-foreground">Register Household</h3>
          </div>
          <input required value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} placeholder="Owner full name" className="w-full px-3 py-2 rounded-lg border border-input text-sm" />
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email for app login" className="w-full px-3 py-2 rounded-lg border border-input text-sm" />
          <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Mobile number" className="w-full px-3 py-2 rounded-lg border border-input text-sm" />
          <div className="grid grid-cols-2 gap-2">
            <select value={form.block} onChange={(e) => setForm({ ...form, block: e.target.value })} className="px-3 py-2 rounded-lg border border-input text-sm">
              {['Block 1', 'Block 2', 'Block 3', 'Block 4', 'Block 5'].map((block) => <option key={block}>{block}</option>)}
            </select>
            <input required value={form.lot} onChange={(e) => setForm({ ...form, lot: e.target.value })} placeholder="Lot" className="px-3 py-2 rounded-lg border border-input text-sm" />
          </div>
          <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Street address" className="w-full px-3 py-2 rounded-lg border border-input text-sm" />
          <div className="grid grid-cols-2 gap-2">
            <select value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value as 'A' | 'B' | 'C' })} className="px-3 py-2 rounded-lg border border-input text-sm">
              {['A', 'B', 'C'].map((zone) => <option key={zone} value={zone}>Zone {zone}</option>)}
            </select>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as HouseholdStatus })} className="px-3 py-2 rounded-lg border border-input text-sm">
              <option value="occupied">Occupied</option>
              <option value="vacant">Vacant</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button className="w-full py-2.5 rounded-lg bg-primary-700 text-white text-sm font-semibold hover:bg-primary-800">
            Register Account
          </button>
        </form>
      </div>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-xl bg-primary-700/10 text-primary-700"><Icon size={18} /></div>
      <div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-card p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
    </div>
  );
}
