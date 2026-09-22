/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StoreProvider, useStore } from './context/StoreContext';
import { UserWebsite } from './pages/UserWebsite';
import { AdminLayout } from './admin/AdminLayout';
import { AdminLogin } from './admin/AdminLogin';

const MainRouter: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();
  const { adsterraConfig } = useStore();
  const [route, setRoute] = useState<string>(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle Adsterra Popunder Ad trigger when enabled
  useEffect(() => {
    const popunderCode = adsterraConfig?.popunder?.scriptCode || adsterraConfig?.popunderScript;
    const isEnabled = Boolean(adsterraConfig?.popunder?.enabled || adsterraConfig?.popunderEnabled);

    if (isEnabled && popunderCode) {
      const handleFirstClick = () => {
        try {
          const match = popunderCode.match(/src=['"]([^'"]+)['"]/);
          if (match && match[1]) {
            const script = document.createElement('script');
            script.src = match[1];
            script.async = true;
            document.body.appendChild(script);
          }
        } catch (e) {
          console.debug('Popunder trigger:', e);
        }
      };

      window.addEventListener('click', handleFirstClick, { once: true });
      return () => window.removeEventListener('click', handleFirstClick);
    }
  }, [adsterraConfig]);

  const isAdminRoute = route.startsWith('#/admin') || window.location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    if (!currentUser || !isAdmin) {
      return <AdminLogin onSuccess={() => setRoute('#/admin')} />;
    }
    return <AdminLayout />;
  }

  return <UserWebsite />;
};

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <MainRouter />
      </StoreProvider>
    </AuthProvider>
  );
}
