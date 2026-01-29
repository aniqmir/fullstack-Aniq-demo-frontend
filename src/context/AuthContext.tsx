'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Role = 'ADMIN' | 'MANAGER' | 'USER';

interface AuthState {
  token: string | null;
  role: Role | null;
  login: (token: string, role: Role) => void;
  logout: () => void;
  isAuthReady: boolean
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');

    if (savedToken && savedRole) {
      setToken(savedToken);
      setRole(savedRole as any);
    }

    setIsAuthReady(true)
  }, []);


  const login = (token: string, role: Role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setToken(token);
    setRole(role);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
