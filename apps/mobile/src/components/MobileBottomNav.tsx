import React from 'react';
import { Home, Tv, Film, Compass, Bookmark, User } from 'lucide-react';

export type MobileTab = 'home' | 'livetv' | 'movies' | 'series' | 'mylist' | 'profile';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'livetv', label: 'Live TV', icon: Tv },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'mylist', label: 'My List', icon: Bookmark },
    { id: 'profile', label: 'Settings', icon: User },
  ];

  return (
    <nav style={{
      position: 'sticky',
      bottom: 0,
      zIndex: 30,
      backgroundColor: 'rgba(11, 16, 32, 0.95)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '8px 4px 14px',
    }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as MobileTab)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              border: 'none',
              background: 'transparent',
              color: isActive ? '#22D3EE' : '#64748B',
              fontSize: '10px',
              fontWeight: isActive ? 700 : 500,
              cursor: 'pointer',
              padding: '4px 10px',
              transition: 'all 0.15s ease',
            }}
          >
            <Icon size={20} color={isActive ? '#22D3EE' : '#64748B'} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
