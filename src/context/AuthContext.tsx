import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Простая заглушка: любой email и пароль (кроме пустых) подходят
    if (email && password && email.includes('@')) {
      const newUser = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email: email,
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (name && email && password && email.includes('@')) {
      const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}