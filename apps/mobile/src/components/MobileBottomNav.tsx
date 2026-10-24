import React from 'react';
import { Sparkles, Home, Tv, Film, Bookmark, User } from 'lucide-react';

export type MobileTab = 'landing' | 'home' | 'livetv' | 'movies' | 'series' | 'mylist' | 'profile';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'landing', label: 'Landing', icon: Sparkles },
    { id: 'home', label: 'Stream', icon: Home },
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
      backgroundColor: 'rgba(10, 10, 10, 0.96)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '4px 4px 10px',
    }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as MobileTab)}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              border: 'none',
              background: 'transparent',
              color: isActive ? '#FFFFFF' : '#6B7280',
              fontSize: '10px',
              fontWeight: isActive ? 800 : 500,
              cursor: 'pointer',
              padding: '6px 12px',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {/* Thin Crimson Active Micro-Line State */}
            {isActive && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  width: '24px',
                  height: '2px',
                  backgroundColor: '#FF0D2E',
                  borderRadius: '999px',
                  boxShadow: '0 0 10px #FF0D2E, 0 0 20px #FF0D2E',
                }}
              />
            )}
            <Icon size={20} color={isActive ? '#FF0D2E' : '#6B7280'} />
            <span style={{ color: isActive ? '#FFFFFF' : '#6B7280' }}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
