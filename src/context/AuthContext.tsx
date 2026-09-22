import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { INITIAL_ADMIN_USERS } from '../data/initialData';
import { fetchUsers, saveUser, logActivity } from '../firebase/dbService';
import { auth } from '../firebase/config';
import { onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth';

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  role: UserRole;
  login: (email: string, password?: string, roleOverride?: UserRole) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, phone: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  switchRoleQuick: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('dremshop_active_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  useEffect(() => {
    if (auth) {
      const unsub = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const allUsers = await fetchUsers();
          const match = allUsers.find(u => u.uid === user.uid || u.email === user.email);
          if (match) {
            setCurrentUser(match);
            localStorage.setItem('dremshop_active_user', JSON.stringify(match));
          } else {
            const newUser: UserProfile = {
              uid: user.uid,
              email: user.email || 'customer@example.com',
              displayName: user.displayName || 'Customer',
              role: 'customer',
              isActive: true,
              createdAt: new Date().toISOString(),
              purchasedBooks: []
            };
            await saveUser(newUser);
            setCurrentUser(newUser);
            localStorage.setItem('dremshop_active_user', JSON.stringify(newUser));
          }
        }
      });
      return () => unsub();
    }
  }, []);

  const login = async (email: string, password?: string, roleOverride?: UserRole): Promise<{ success: boolean; message?: string }> => {
    const allUsers = await fetchUsers();
    let found = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!found) {
      // Check seeded admin defaults
      const seeded = INITIAL_ADMIN_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (seeded) {
        found = seeded;
      }
    }

    if (!found) {
      // Auto-register demo account or customer login
      const newUser: UserProfile = {
        uid: `usr-${Date.now()}`,
        email: email,
        displayName: email.split('@')[0],
        role: roleOverride || (email.includes('admin') ? 'super_admin' : 'customer'),
        isActive: true,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        purchasedBooks: []
      };
      await saveUser(newUser);
      found = newUser;
    }

    if (!found.isActive) {
      return { success: false, message: 'Your account is deactivated. Please contact Super Admin.' };
    }

    found.lastLogin = new Date().toISOString();
    await saveUser(found);
    setCurrentUser(found);
    localStorage.setItem('dremshop_active_user', JSON.stringify(found));

    logActivity('USER_LOGIN', `${found.displayName} (${found.role}) logged in.`, {
      name: found.displayName,
      email: found.email,
      role: found.role
    });

    return { success: true };
  };

  const register = async (name: string, email: string, phone: string): Promise<{ success: boolean; message?: string }> => {
    const allUsers = await fetchUsers();
    const existing = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, message: 'This email is already registered.' };
    }

    const newUser: UserProfile = {
      uid: `usr-${Date.now()}`,
      displayName: name,
      email: email,
      phone: phone,
      role: 'customer',
      isActive: true,
      createdAt: new Date().toISOString(),
      purchasedBooks: []
    };

    await saveUser(newUser);
    setCurrentUser(newUser);
    localStorage.setItem('dremshop_active_user', JSON.stringify(newUser));

    logActivity('USER_REGISTER', `New customer registered: ${name} (${email})`, {
      name,
      email,
      role: 'customer'
    });

    return { success: true };
  };

  const logout = async () => {
    if (currentUser) {
      logActivity('USER_LOGOUT', `${currentUser.displayName} signed out.`, {
        name: currentUser.displayName,
        email: currentUser.email,
        role: currentUser.role
      });
    }
    if (auth) {
      try {
        await fbSignOut(auth);
      } catch {
        // ignore
      }
    }
    setCurrentUser(null);
    localStorage.removeItem('dremshop_active_user');
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    localStorage.setItem('dremshop_active_user', JSON.stringify(updated));
    await saveUser(updated);
  };

  const switchRoleQuick = (role: UserRole) => {
    if (!currentUser) return;
    const updated = { ...currentUser, role };
    setCurrentUser(updated);
    localStorage.setItem('dremshop_active_user', JSON.stringify(updated));
    saveUser(updated);
  };

  const role = currentUser?.role || 'customer';
  const isAdmin = role === 'super_admin' || role === 'manager' || role === 'editor';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin,
        role,
        login,
        register,
        logout,
        updateProfile,
        switchRoleQuick
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
