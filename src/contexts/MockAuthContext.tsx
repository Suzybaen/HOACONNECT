'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from '@/lib/i18n';

export type UserRole = 'homeowner' | 'admin' | 'collector';

export interface MockUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  block?: string;
  lot?: string;
}

interface MockAuthContextType {
  user: MockUser | null;
  loading: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  signIn: (email: string, password: string, role: UserRole, remember: boolean) => Promise<void>;
  signOut: () => void;
}

export const MockAuthContext = createContext<MockAuthContextType>({
  user: null,
  loading: true,
  language: 'en',
  setLanguage: () => {},
  signIn: async () => {},
  signOut: () => {},
});

export const useMockAuth = () => useContext(MockAuthContext);

const MOCK_USERS: Record<UserRole, MockUser> = {
  homeowner: {
    id: 'hw-001',
    email: 'homeowner@hoaconnect.ph',
    name: 'Maria Reyes',
    role: 'homeowner',
    block: 'Block 4',
    lot: 'Lot 12',
  },
  admin: {
    id: 'adm-001',
    email: 'admin@hoaconnect.ph',
    name: 'Jose Santos',
    role: 'admin',
  },
  collector: {
    id: 'col-001',
    email: 'collector@hoaconnect.ph',
    name: 'Pedro Cruz',
    role: 'collector',
  },
};

const ROLE_REDIRECTS: Record<UserRole, string> = {
  homeowner: '/homeowner-dashboard',
  admin: '/hoa-admin-dashboard',
  collector: '/collector-dashboard',
};

export { ROLE_REDIRECTS };

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Restore session from localStorage
    try {
      const stored = localStorage.getItem('hoaconnect_user') || sessionStorage.getItem('hoaconnect_user');
      const storedLang = localStorage.getItem('hoaconnect_lang') as Language | null;
      if (stored) setUser(JSON.parse(stored));
      if (storedLang) setLanguageState(storedLang);
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try { localStorage.setItem('hoaconnect_lang', lang); } catch {}
  };

  const signIn = async (email: string, password: string, role: UserRole, remember: boolean) => {
    // Mock validation — any email + "password123" works
    if (!email || !password) throw new Error('required');
    if (password !== 'password123') throw new Error('invalid');

    const mockUser: MockUser = {
      ...MOCK_USERS[role],
      email,
    };

    setUser(mockUser);
    if (remember) {
      try {
        localStorage.setItem('hoaconnect_user', JSON.stringify(mockUser));
        sessionStorage.removeItem('hoaconnect_user');
      } catch {}
    } else {
      try {
        sessionStorage.setItem('hoaconnect_user', JSON.stringify(mockUser));
        localStorage.removeItem('hoaconnect_user');
      } catch {}
    }
  };

  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem('hoaconnect_user');
      sessionStorage.removeItem('hoaconnect_user');
    } catch {}
  };

  return (
    <MockAuthContext.Provider value={{ user, loading, language, setLanguage, signIn, signOut }}>
      {children}
    </MockAuthContext.Provider>
  );
}
