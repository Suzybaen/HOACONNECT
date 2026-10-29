'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type HouseholdStatus = 'occupied' | 'vacant' | 'inactive';
export type PaymentStatus = 'paid' | 'unpaid' | 'overdue';
export type AnnouncementCategory = 'urgent' | 'billing' | 'general';
export type WasteResponse = 'ready' | 'pass';

export interface Household {
  id: string;
  block: string;
  lot: string;
  owner: string;
  email: string;
  phone: string;
  address: string;
  zone: 'A' | 'B' | 'C';
  status: HouseholdStatus;
  paymentStatus: PaymentStatus;
  balance: number;
  lat: number;
  lng: number;
}

export interface WasteSchedule {
  id: string;
  date: string;
  day: string;
  time: string;
  zone: 'A' | 'B' | 'C' | 'All';
  blocks: string[];
  type: string;
  notes: string;
}

export interface WasteConfirmation {
  id: string;
  householdId: string;
  scheduleId: string;
  response: WasteResponse;
  confirmedAt: string;
  collected: boolean;
}

export interface CommunityAnnouncement {
  id: string;
  category: AnnouncementCategory;
  title: string;
  body: string;
  author: string;
  date: string;
  pinned: boolean;
  read: boolean;
}

interface CommunityContextType {
  households: Household[];
  wasteSchedules: WasteSchedule[];
  confirmations: WasteConfirmation[];
  announcements: CommunityAnnouncement[];
  addHousehold: (household: Omit<Household, 'id' | 'lat' | 'lng'>) => void;
  postAnnouncement: (announcement: Pick<CommunityAnnouncement, 'category' | 'title' | 'body'>) => void;
  setWasteResponse: (householdId: string, scheduleId: string, response: WasteResponse) => void;
  clearWasteResponse: (householdId: string, scheduleId: string) => void;
  markCollected: (confirmationId: string) => void;
}

const STORAGE_KEY = 'hoaconnect_community_store_v1';

const initialHouseholds: Household[] = [
  { id: 'hw-001', block: 'Block 1', lot: 'Lot 3', owner: 'Lorna Castillo', email: 'lorna@example.com', phone: '09171234567', address: '3 Sampaguita St.', zone: 'A', status: 'occupied', paymentStatus: 'paid', balance: 0, lat: 18, lng: 22 },
  { id: 'hw-002', block: 'Block 1', lot: 'Lot 7', owner: 'Carmelita Ramos', email: 'carmelita@example.com', phone: '09281234567', address: '7 Sampaguita St.', zone: 'A', status: 'occupied', paymentStatus: 'paid', balance: 0, lat: 25, lng: 18 },
  { id: 'hw-003', block: 'Block 1', lot: 'Lot 11', owner: 'Felicitas Mendoza', email: 'felicitas@example.com', phone: '09191234567', address: '11 Sampaguita St.', zone: 'A', status: 'occupied', paymentStatus: 'unpaid', balance: 210, lat: 30, lng: 25 },
  { id: 'hw-004', block: 'Block 2', lot: 'Lot 1', owner: 'Rodrigo Dela Cruz', email: 'rodrigo@example.com', phone: '09361234567', address: '1 Ilang-Ilang St.', zone: 'A', status: 'occupied', paymentStatus: 'paid', balance: 0, lat: 42, lng: 20 },
  { id: 'hw-005', block: 'Block 2', lot: 'Lot 5', owner: 'Eduardo Villanueva', email: 'eduardo@example.com', phone: '09451234567', address: '5 Ilang-Ilang St.', zone: 'A', status: 'occupied', paymentStatus: 'unpaid', balance: 210, lat: 48, lng: 28 },
  { id: 'hw-006', block: 'Block 2', lot: 'Lot 9', owner: 'Bernardo Soriano', email: 'bernardo@example.com', phone: '09221234567', address: '9 Ilang-Ilang St.', zone: 'A', status: 'vacant', paymentStatus: 'paid', balance: 0, lat: 55, lng: 22 },
  { id: 'hw-007', block: 'Block 3', lot: 'Lot 2', owner: 'Natividad Bautista', email: 'natividad@example.com', phone: '09171234568', address: '2 Rosal St.', zone: 'B', status: 'occupied', paymentStatus: 'paid', balance: 0, lat: 62, lng: 35 },
  { id: 'hw-008', block: 'Block 3', lot: 'Lot 6', owner: 'Angelito Pascual', email: 'angelito@example.com', phone: '09321234567', address: '6 Rosal St.', zone: 'B', status: 'occupied', paymentStatus: 'overdue', balance: 470, lat: 68, lng: 28 },
  { id: 'hw-009', block: 'Block 3', lot: 'Lot 10', owner: 'Rosario Ferrer', email: 'rosario@example.com', phone: '09181234567', address: '10 Rosal St.', zone: 'B', status: 'occupied', paymentStatus: 'overdue', balance: 470, lat: 75, lng: 38 },
  { id: 'hw-010', block: 'Block 4', lot: 'Lot 4', owner: 'Ricardo Santos', email: 'ricardo@example.com', phone: '09174561234', address: '4 Dama de Noche St.', zone: 'B', status: 'occupied', paymentStatus: 'paid', balance: 0, lat: 38, lng: 52 },
  { id: 'hw-011', block: 'Block 4', lot: 'Lot 8', owner: 'Leonora Cruz', email: 'leonora@example.com', phone: '09991234567', address: '8 Dama de Noche St.', zone: 'B', status: 'inactive', paymentStatus: 'unpaid', balance: 210, lat: 45, lng: 58 },
  { id: 'hw-012', block: 'Block 4', lot: 'Lot 12', owner: 'Maria Reyes', email: 'homeowner@hoaconnect.ph', phone: '09170000012', address: '12 Dama de Noche St.', zone: 'B', status: 'occupied', paymentStatus: 'unpaid', balance: 210, lat: 52, lng: 50 },
  { id: 'hw-013', block: 'Block 5', lot: 'Lot 3', owner: 'Pedro Aquino', email: 'pedro@example.com', phone: '09170000013', address: '3 Gumamela St.', zone: 'C', status: 'occupied', paymentStatus: 'paid', balance: 0, lat: 22, lng: 65 },
  { id: 'hw-014', block: 'Block 5', lot: 'Lot 7', owner: 'Gloria Castillo', email: 'gloria@example.com', phone: '09170000014', address: '7 Gumamela St.', zone: 'C', status: 'vacant', paymentStatus: 'paid', balance: 0, lat: 30, lng: 72 },
  { id: 'hw-015', block: 'Block 5', lot: 'Lot 11', owner: 'Victor Lim', email: 'victor@example.com', phone: '09170000015', address: '11 Gumamela St.', zone: 'C', status: 'occupied', paymentStatus: 'paid', balance: 0, lat: 60, lng: 65 },
];

const initialWasteSchedules: WasteSchedule[] = [
  { id: 'sched-001', date: 'May 5, 2026', day: 'Tuesday', time: '6:00 AM - 10:00 AM', zone: 'A', blocks: ['Block 1', 'Block 2'], type: 'Regular biodegradable and residual collection', notes: 'Place bins outside by 5:45 AM.' },
  { id: 'sched-002', date: 'May 6, 2026', day: 'Wednesday', time: '6:00 AM - 10:00 AM', zone: 'B', blocks: ['Block 3', 'Block 4'], type: 'Regular biodegradable and residual collection', notes: 'Truck starts at Rosal St. then Dama de Noche St.' },
  { id: 'sched-003', date: 'May 7, 2026', day: 'Thursday', time: '6:30 AM - 11:00 AM', zone: 'C', blocks: ['Block 5'], type: 'Regular biodegradable and residual collection', notes: 'Vacant lots are inspected for illegal dumping.' },
  { id: 'sched-004', date: 'May 9, 2026', day: 'Saturday', time: '7:00 AM - 12:00 PM', zone: 'All', blocks: ['All Blocks'], type: 'Special clean-up drive and bulky waste', notes: 'Furniture and appliance pickup require confirmation.' },
  { id: 'sched-005', date: 'May 12, 2026', day: 'Tuesday', time: '6:00 AM - 10:00 AM', zone: 'A', blocks: ['Block 1', 'Block 2'], type: 'Recyclables and dry waste', notes: 'Separate plastics, bottles, cardboard, and cans.' },
  { id: 'sched-006', date: 'May 13, 2026', day: 'Wednesday', time: '6:00 AM - 10:00 AM', zone: 'B', blocks: ['Block 3', 'Block 4'], type: 'Recyclables and dry waste', notes: 'Collectors will skip mixed wet waste bags.' },
  { id: 'sched-007', date: 'May 14, 2026', day: 'Thursday', time: '6:30 AM - 11:00 AM', zone: 'C', blocks: ['Block 5'], type: 'Recyclables and dry waste', notes: 'Tie cartons and cardboard together.' },
];

const initialConfirmations: WasteConfirmation[] = [
  { id: 'conf-001', householdId: 'hw-001', scheduleId: 'sched-001', response: 'ready', confirmedAt: '5:58 AM', collected: true },
  { id: 'conf-002', householdId: 'hw-002', scheduleId: 'sched-001', response: 'ready', confirmedAt: '6:02 AM', collected: true },
  { id: 'conf-003', householdId: 'hw-003', scheduleId: 'sched-001', response: 'ready', confirmedAt: '6:15 AM', collected: false },
  { id: 'conf-004', householdId: 'hw-004', scheduleId: 'sched-001', response: 'ready', confirmedAt: '6:08 AM', collected: true },
  { id: 'conf-005', householdId: 'hw-005', scheduleId: 'sched-001', response: 'ready', confirmedAt: '6:20 AM', collected: false },
  { id: 'conf-006', householdId: 'hw-007', scheduleId: 'sched-002', response: 'ready', confirmedAt: '6:30 AM', collected: false },
  { id: 'conf-007', householdId: 'hw-008', scheduleId: 'sched-002', response: 'ready', confirmedAt: '6:33 AM', collected: false },
  { id: 'conf-008', householdId: 'hw-009', scheduleId: 'sched-002', response: 'ready', confirmedAt: '6:40 AM', collected: false },
  { id: 'conf-009', householdId: 'hw-012', scheduleId: 'sched-002', response: 'ready', confirmedAt: '6:50 AM', collected: false },
];

const initialAnnouncements: CommunityAnnouncement[] = [
  { id: 'ann-001', category: 'urgent', title: 'Water Interruption - May 8, 2026', body: 'Pipe maintenance along Ilang-Ilang Street will interrupt water from 8:00 AM to 5:00 PM. Please store enough water in advance.', author: 'HOA Admin', date: 'May 5, 2026', pinned: true, read: false },
  { id: 'ann-002', category: 'billing', title: 'May 2026 HOA Dues Due May 15', body: 'Monthly HOA dues are due by May 15, 2026. Late payments will incur a penalty after the grace period.', author: 'HOA Treasurer', date: 'May 4, 2026', pinned: false, read: false },
  { id: 'ann-003', category: 'general', title: 'Community Clean-Up Drive', body: 'Join the clean-up drive on Saturday, May 9. Meet at the covered court at 7:00 AM.', author: 'HOA President', date: 'May 3, 2026', pinned: false, read: true },
  { id: 'ann-004', category: 'general', title: 'Updated Waste Collection Schedule', body: 'Zone B collection is now every Wednesday for regular waste and the following Wednesday for recyclables.', author: 'HOA Admin', date: 'May 2, 2026', pinned: false, read: true },
];

const CommunityContext = createContext<CommunityContextType | null>(null);

export function CommunityProvider({ children }: { children: React.ReactNode }) {
  const [households, setHouseholds] = useState<Household[]>(initialHouseholds);
  const [confirmations, setConfirmations] = useState<WasteConfirmation[]>(initialConfirmations);
  const [announcements, setAnnouncements] = useState<CommunityAnnouncement[]>(initialAnnouncements);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as Partial<Pick<CommunityContextType, 'households' | 'confirmations' | 'announcements'>>;
      if (parsed.households?.length) setHouseholds(parsed.households);
      if (parsed.confirmations?.length) setConfirmations(parsed.confirmations);
      if (parsed.announcements?.length) setAnnouncements(parsed.announcements);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ households, confirmations, announcements }));
    } catch {}
  }, [announcements, confirmations, households]);

  const addHousehold = (household: Omit<Household, 'id' | 'lat' | 'lng'>) => {
    setHouseholds((prev) => {
      const id = `hw-${String(prev.length + 1).padStart(3, '0')}`;
      const offset = prev.length % 8;
      return [
        ...prev,
        {
          ...household,
          id,
          lat: 20 + offset * 8,
          lng: 22 + (prev.length % 5) * 10,
        },
      ];
    });
  };

  const postAnnouncement = (announcement: Pick<CommunityAnnouncement, 'category' | 'title' | 'body'>) => {
    setAnnouncements((prev) => [
      {
        ...announcement,
        id: `ann-${Date.now()}`,
        author: 'HOA Admin',
        date: 'May 5, 2026',
        pinned: announcement.category === 'urgent',
        read: false,
      },
      ...prev,
    ]);
  };

  const setWasteResponse = (householdId: string, scheduleId: string, response: WasteResponse) => {
    setConfirmations((prev) => {
      const existing = prev.find((item) => item.householdId === householdId && item.scheduleId === scheduleId);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id
            ? { ...item, response, confirmedAt: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }), collected: response === 'ready' ? item.collected : false }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `conf-${Date.now()}`,
          householdId,
          scheduleId,
          response,
          confirmedAt: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          collected: false,
        },
      ];
    });
  };

  const clearWasteResponse = (householdId: string, scheduleId: string) => {
    setConfirmations((prev) => prev.filter((item) => !(item.householdId === householdId && item.scheduleId === scheduleId)));
  };

  const markCollected = (confirmationId: string) => {
    setConfirmations((prev) => prev.map((item) => item.id === confirmationId ? { ...item, collected: true } : item));
  };

  const value = useMemo<CommunityContextType>(() => ({
    households,
    wasteSchedules: initialWasteSchedules,
    confirmations,
    announcements,
    addHousehold,
    postAnnouncement,
    setWasteResponse,
    clearWasteResponse,
    markCollected,
  }), [announcements, confirmations, households]);

  return <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>;
}

export function useCommunity() {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunity must be used within CommunityProvider');
  }
  return context;
}

