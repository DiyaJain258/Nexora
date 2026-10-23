import React, { useState } from 'react';
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

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

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

  const renderActiveView = () => {
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

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#070912' }}>
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header currentTabName={tabTitles[activeTab]} />

        <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default App;
