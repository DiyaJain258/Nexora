import React, { useState } from 'react';
import { Search, Bell, Shield, Radio, Activity, RefreshCw, ChevronDown, ExternalLink, Settings, LogOut } from 'lucide-react';
import { MOCK_USERS } from '@nexora/shared';

interface HeaderProps {
  currentTabName: string;
  onRefresh?: () => void;
  onLogout?: () => void;
  onOpenSettings?: () => void;
  onBackToLanding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTabName, onRefresh, onLogout, onOpenSettings, onBackToLanding }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const currentUser = MOCK_USERS[0]; // Alexander Vance (superadmin)

  return (
    <header style={{
      height: '70px',
      backgroundColor: '#0B1020',
      borderBottom: '1px solid #1E293B',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      {/* Title & Path */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: 700,
          color: '#F8FAFC',
          margin: 0,
        }}>
          {currentTabName}
        </h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '12px',
          color: '#34D399',
          fontWeight: 600,
        }}>
          <Radio size={14} className="live-dot" />
          <span>CDN LIVE</span>
        </div>
      </div>

      {/* Action items */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        {/* Search */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Search size={16} color="#64748B" style={{ position: 'absolute', left: '12px' }} />
          <input
            type="text"
            placeholder="Search channels, streams, users..."
            style={{
              backgroundColor: '#070912',
              border: '1px solid #1E293B',
              borderRadius: '8px',
              padding: '8px 14px 8px 36px',
              color: '#F8FAFC',
              fontSize: '13px',
              width: '260px',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#8B5CF6')}
            onBlur={(e) => (e.target.style.borderColor = '#1E293B')}
          />
        </div>

        {/* View Live Site / Landing Page Quick Button */}
        <button
          onClick={onBackToLanding}
          title="Open Public Landing Page"
          style={{
            background: 'rgba(225, 29, 72, 0.15)',
            border: '1px solid rgba(225, 29, 72, 0.4)',
            borderRadius: '8px',
            padding: '8px 12px',
            color: '#fda4af',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 600,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(225, 29, 72, 0.25)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(225, 29, 72, 0.15)')}
        >
          <span>Live Site</span>
        </button>

        {/* Refresh button */}
        <button
          onClick={onRefresh}
          title="Refresh stream metrics"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid #1E293B',
            borderRadius: '8px',
            padding: '8px 12px',
            color: '#94A3B8',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
        >
          <RefreshCw size={15} />
          <span>Sync</span>
        </button>

        {/* User profile with Interactive Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 10px',
              borderRadius: '10px',
              background: isProfileOpen ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              border: '1px solid',
              borderColor: isProfileOpen ? '#8B5CF6' : 'transparent',
              cursor: 'pointer',
              color: 'inherit',
              transition: 'all 0.2s',
            }}
          >
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #8B5CF6',
              }}
            />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#F8FAFC' }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: '11px', color: '#8B5CF6', fontWeight: 700 }}>
                SUPERADMIN
              </div>
            </div>
            <ChevronDown size={14} color="#94A3B8" style={{ transform: isProfileOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div
              style={{
                position: 'absolute',
                top: '52px',
                right: 0,
                width: '260px',
                backgroundColor: '#0F172A',
                border: '1px solid #1E293B',
                borderRadius: '14px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
                padding: '12px',
                zIndex: 50,
              }}
            >
              {/* User Details */}
              <div style={{ padding: '8px 10px 12px', borderBottom: '1px solid #1E293B', marginBottom: '8px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#F8FAFC' }}>{currentUser.name}</div>
                <div style={{ fontSize: '12px', color: '#94A3B8' }}>{currentUser.email}</div>
                <span style={{ display: 'inline-block', marginTop: '6px', fontSize: '10px', fontWeight: 800, color: '#fda4af', backgroundColor: 'rgba(225, 29, 72, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                  Super Administrator
                </span>
              </div>

              {/* Navigation Options */}
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  if (onBackToLanding) onBackToLanding();
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  color: '#CBD5E1',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '13px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <ExternalLink size={16} color="#fda4af" />
                <span>View Public Landing Page</span>
              </button>

              {onOpenSettings && (
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    onOpenSettings();
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    color: '#CBD5E1',
                    background: 'transparent',
                    border: 'none',
                    fontSize: '13px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Settings size={16} color="#8B5CF6" />
                  <span>System Settings</span>
                </button>
              )}

              <div style={{ height: '1px', backgroundColor: '#1E293B', margin: '8px 0' }} />

              {/* Log Out Button */}
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  if (onLogout) onLogout();
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  color: '#EF4444',
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.16)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.08)')}
              >
                <LogOut size={16} />
                <span>Sign Out / Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
