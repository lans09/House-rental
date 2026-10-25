'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { HouseOneStore, MemberRecord } from '@/lib/admin-store';

interface AuthContextValue {
  user: MemberRecord | null;
  isAuthenticated: boolean;
  signIn: (member: MemberRecord) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ACTIVE_SESSION_KEY = 'houseone_session_v2';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MemberRecord | null>(null);

  const syncLegacyKeys = (member: MemberRecord | null) => {
    if (typeof window === 'undefined') return;
    if (member) {
      window.localStorage.setItem('rentora_user_authenticated', 'true');
      window.localStorage.setItem(
        'rentora_user_name',
        `${member.firstName} ${member.lastName}`.trim()
      );
      window.localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(member));
    } else {
      window.localStorage.removeItem('rentora_user_authenticated');
      window.localStorage.removeItem('rentora_user_name');
      window.localStorage.removeItem(ACTIVE_SESSION_KEY);
    }
  };

  const loadSession = () => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(ACTIVE_SESSION_KEY);
      if (!raw) {
        setUser(null);
        return;
      }
      const parsed = JSON.parse(raw) as MemberRecord;
      const latest =
        HouseOneStore.getMembers().find(
          (m) => m.id === parsed.id || m.email.toLowerCase() === parsed.email.toLowerCase()
        ) || parsed;
      setUser(latest);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    loadSession();
    const onStoreChange = () => loadSession();
    window.addEventListener('houseone-store-updated', onStoreChange);
    return () => window.removeEventListener('houseone-store-updated', onStoreChange);
  }, []);

  const signIn = (member: MemberRecord) => {
    const saved = HouseOneStore.addOrUpdateMember(member);
    setUser(saved);
    syncLegacyKeys(saved);
  };

  const signOut = () => {
    setUser(null);
    syncLegacyKeys(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
