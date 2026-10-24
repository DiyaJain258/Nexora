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
      backgroundColor: '#060408',
      borderBottom: '1px solid rgba(184, 29, 74, 0.16)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      backdropFilter: 'blur(16px)',
    }}>
      {/* Title & Path */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: 800,
          color: '#F8FAFC',
          margin: 0,
          letterSpacing: '-0.3px',
        }}>
          {currentTabName}
        </h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.28)',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '12px',
          color: '#34D399',
          fontWeight: 700,
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
          <Search size={16} color="#71717A" style={{ position: 'absolute', left: '12px' }} />
          <input
            type="text"
            placeholder="Search channels, streams, users..."
            style={{
              backgroundColor: '#0c0811',
              border: '1px solid rgba(184, 29, 74, 0.22)',
              borderRadius: '8px',
              padding: '8px 14px 8px 36px',
              color: '#F8FAFC',
              fontSize: '13px',
              width: '260px',
              outline: 'none',
              transition: 'all 0.2s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#b81d4a';
              e.target.style.boxShadow = '0 0 0 2px rgba(184, 29, 74, 0.25)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(184, 29, 74, 0.22)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* View Live Site / Landing Page Quick Button */}
        <button
          onClick={onBackToLanding}
          title="Open Public Landing Page"
          style={{
            background: 'rgba(139, 0, 50, 0.22)',
            border: '1px solid rgba(184, 29, 74, 0.45)',
            borderRadius: '8px',
            padding: '8px 14px',
            color: '#fda4af',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 700,
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 2px 10px rgba(139, 0, 50, 0.25)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(139, 0, 50, 0.38)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(139, 0, 50, 0.22)';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <ExternalLink size={14} />
          <span>Live Site</span>
        </button>

        {/* Refresh button */}
        <button
          onClick={onRefresh}
          title="Refresh stream metrics"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(184, 29, 74, 0.18)',
            borderRadius: '8px',
            padding: '8px 12px',
            color: '#A1A1AA',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 600,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.borderColor = '#b81d4a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#A1A1AA';
            e.currentTarget.style.borderColor = 'rgba(184, 29, 74, 0.18)';
          }}
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
              padding: '6px 12px',
              borderRadius: '10px',
              background: isProfileOpen ? 'rgba(139, 0, 50, 0.2)' : 'transparent',
              border: '1px solid',
              borderColor: isProfileOpen ? '#b81d4a' : 'transparent',
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
                border: '2px solid #b81d4a',
                boxShadow: '0 0 10px rgba(184, 29, 74, 0.4)',
              }}
            />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC' }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: '11px', color: '#fda4af', fontWeight: 800, letterSpacing: '0.4px' }}>
                SUPERADMIN
              </div>
            </div>
            <ChevronDown size={14} color="#A1A1AA" style={{ transform: isProfileOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div
              style={{
                position: 'absolute',
                top: '52px',
                right: 0,
                width: '270px',
                backgroundColor: '#0a070e',
                border: '1px solid rgba(184, 29, 74, 0.28)',
                borderRadius: '14px',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.9), 0 0 30px rgba(139, 0, 50, 0.25)',
                padding: '14px',
                zIndex: 50,
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* User Details */}
              <div style={{ padding: '8px 10px 12px', borderBottom: '1px solid rgba(184, 29, 74, 0.18)', marginBottom: '8px' }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#F8FAFC' }}>{currentUser.name}</div>
                <div style={{ fontSize: '12px', color: '#A1A1AA' }}>{currentUser.email}</div>
                <span style={{ display: 'inline-block', marginTop: '6px', fontSize: '10px', fontWeight: 800, color: '#fda4af', backgroundColor: 'rgba(139, 0, 50, 0.25)', border: '1px solid rgba(184, 29, 74, 0.4)', padding: '2px 8px', borderRadius: '4px' }}>
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
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(139, 0, 50, 0.14)')}
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
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(139, 0, 50, 0.14)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Settings size={16} color="#fda4af" />
                  <span>System Settings</span>
                </button>
              )}

              <div style={{ height: '1px', backgroundColor: 'rgba(184, 29, 74, 0.18)', margin: '8px 0' }} />

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
                  color: '#fda4af',
                  background: 'rgba(139, 0, 50, 0.2)',
                  border: '1px solid rgba(184, 29, 74, 0.35)',
                  fontSize: '13px',
                  fontWeight: 700,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(139, 0, 50, 0.35)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(139, 0, 50, 0.2)')}
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
