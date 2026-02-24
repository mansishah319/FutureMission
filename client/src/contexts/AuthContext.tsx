import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'superAdmin' | 'admin' | 'gameMaster' | 'participant';

export interface User {
  id: string;
  employeeId: string;
  name: string;
  nameAr: string;
  email: string;
  role: UserRole;
  department: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (employeeId: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const mockUsers: Record<UserRole, User> = {
  superAdmin: {
    id: 'sa-001',
    employeeId: 'SA001',
    name: 'Ahmed Al Mansouri',
    nameAr: 'أحمد المنصوري',
    email: 'ahmed.mansouri@dubaipolice.gov.ae',
    role: 'superAdmin',
    department: 'Strategic Foresight Division',
  },
  admin: {
    id: 'ad-001',
    employeeId: 'AD001',
    name: 'Fatima Al Hashimi',
    nameAr: 'فاطمة الهاشمي',
    email: 'fatima.hashimi@dubaipolice.gov.ae',
    role: 'admin',
    department: 'Strategic Foresight Division',
  },
  gameMaster: {
    id: 'gm-001',
    employeeId: 'GM001',
    name: 'Khalid Al Rashid',
    nameAr: 'خالد الراشد',
    email: 'khalid.rashid@dubaipolice.gov.ae',
    role: 'gameMaster',
    department: 'Future Intelligence Unit',
  },
  participant: {
    id: 'u3',
    employeeId: 'PT001',
    name: 'Fatima Al Hashimi',
    nameAr: 'فاطمة الهاشمي',
    email: 'fatima.hashimi@dubaipolice.gov.ae',
    role: 'participant',
    department: 'Security Operations',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sfg-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (employeeId: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock authentication - in production, this would validate against backend
    if (employeeId && password) {
      const mockUser = mockUsers[role];
      setUser(mockUser);
      localStorage.setItem('sfg-user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sfg-user');
  };

  const switchRole = (role: UserRole) => {
    const mockUser = mockUsers[role];
    setUser(mockUser);
    localStorage.setItem('sfg-user', JSON.stringify(mockUser));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      switchRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
