import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'manager' | 'admin';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (values: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock login - replace with actual API call
    console.log('Logging in with:', email, password);
    setUser({
      id: '1',
      name: 'Test User',
      email,
      role: 'owner', // Mock role for now
    });
  };

  const signup = async (values: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    // Mock signup - replace with actual API call
    console.log('Signing up with:', values);
    setUser({
      id: '2',
      name: values.name,
      email: values.email,
      role: values.role as 'owner' | 'manager' | 'admin',
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
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