import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    role: null, // 'customer' | 'vendor' | 'admin'
    user: null,
  });

  function login(role) {
    const mockUsers = {
      customer: { name: 'Jane Doe', email: 'jane.doe@example.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop' },
      vendor:   { name: 'TechVision Co.', email: 'contact@techvision.com', avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=80&h=80&fit=crop' },
      admin:    { name: 'Platform Admin', email: 'admin@simplystore.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop' },
    };
    setAuth({ role, user: mockUsers[role] });
  }

  function logout() {
    setAuth({ role: null, user: null });
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
