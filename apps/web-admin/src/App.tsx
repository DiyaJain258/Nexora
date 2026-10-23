import React, { useState, useEffect } from 'react';
import { Sidebar, AdminTab } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './views/DashboardView';
import { LiveChannelsView } from './views/LiveChannelsView';
import { ContentManagerView } from './views/ContentManagerView';
import { SeasonsEpisodesView } from './views/SeasonsEpisodesView';
import { CategoriesView } from './views/CategoriesView';
import { EpgScheduleView } from './views/EpgScheduleView';
import { UsersDevicesView } from './views/UsersDevicesView';
import { DeviceActivationAdminView } from './views/DeviceActivationAdminView';
import { SubscriptionPlansView } from './views/SubscriptionPlansView';
import { NotificationsView } from './views/NotificationsView';
import { RolesPermissionsView } from './views/RolesPermissionsView';
import { ReportsSettingsView } from './views/ReportsSettingsView';
import { AdminLoginView } from './views/AdminLoginView';
import { LandingPageView } from './views/LandingPageView';

type AppViewMode = 'landing' | 'admin-login' | 'admin-dashboard';

export const App: React.FC = () => {
  // Determine initial view from URL hash or path
  const getInitialView = (): AppViewMode => {
    if (window.location.hash.startsWith('#/admin/login')) return 'admin-login';
    if (window.location.hash.startsWith('#/admin')) return 'admin-dashboard';
    return 'landing';
  };

  const [viewMode, setViewState] = useState<AppViewMode>(getInitialView);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const setViewMode = (mode: AppViewMode) => {
    setViewState(mode);
    if (mode === 'landing') {
      window.location.hash = '#/';
    } else if (mode === 'admin-login') {
      window.location.hash = '#/admin/login';
    } else if (mode === 'admin-dashboard') {
      window.location.hash = '#/admin';
    }
  };

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      setViewState(getInitialView());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const tabTitles: Record<AdminTab, string> = {
    'dashboard': 'Platform Operations & Streaming Analytics',
    'live-channels': 'Live TV Channel Management & Ingest',
    'movies-series': 'VOD Catalog: Movies, Series & Sports',
    'seasons-episodes': 'Seasons & Episodic Asset Manager',
    'categories-genres': 'Categories, Genres & Tag Hierarchy',
    'epg-schedules': 'Electronic Program Guide (EPG) Schedules',
    'users-devices': 'Subscribers & Multi-Device Sessions',
    'device-activations': 'TV Device Activation & Handshake Tokens',
    'subscription-plans': 'Subscription Tiers & Monetization',
    'notifications': 'Emergency & Push Notifications Broadcast',
    'roles-permissions': 'Roles & Granular Access Control (RBAC)',
    'reports-settings': 'System Reports & Infrastructure Settings',
  };

  const renderActiveAdminView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'live-channels':
        return <LiveChannelsView />;
      case 'movies-series':
        return <ContentManagerView />;
      case 'seasons-episodes':
        return <SeasonsEpisodesView />;
      case 'categories-genres':
        return <CategoriesView />;
      case 'epg-schedules':
        return <EpgScheduleView />;
      case 'users-devices':
        return <UsersDevicesView />;
      case 'device-activations':
        return <DeviceActivationAdminView />;
      case 'subscription-plans':
        return <SubscriptionPlansView />;
      case 'notifications':
        return <NotificationsView />;
      case 'roles-permissions':
        return <RolesPermissionsView />;
      case 'reports-settings':
        return <ReportsSettingsView />;
      default:
        return <DashboardView />;
    }
  };

  // 1. PUBLIC 3D LANDING PAGE VIEW (Default at /)
  if (viewMode === 'landing') {
    return (
      <LandingPageView
        onNavigateToAdmin={() => {
          if (isLoggedIn) {
            setViewMode('admin-dashboard');
          } else {
            setViewMode('admin-login');
          }
        }}
      />
    );
  }

  // 2. ADMIN LOGIN GATEWAY VIEW
  if (viewMode === 'admin-login' || !isLoggedIn) {
    return (
      <AdminLoginView
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setViewMode('admin-dashboard');
        }}
        onBackToLanding={() => setViewMode('landing')}
      />
    );
  }

  // 3. ADMIN OPERATIONS CONSOLE DASHBOARD VIEW
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#070912' }}>
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header
          currentTabName={tabTitles[activeTab]}
          onLogout={() => {
            setIsLoggedIn(false);
            setViewMode('admin-login');
          }}
          onOpenSettings={() => setActiveTab('reports-settings')}
          onBackToLanding={() => setViewMode('landing')}
        />

        <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
          {renderActiveAdminView()}
        </main>
      </div>
    </div>
  );
};

export default App;
