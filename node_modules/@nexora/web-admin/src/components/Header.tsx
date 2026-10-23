import React from 'react';
import { Search, Bell, Shield, Radio, Activity, RefreshCw } from 'lucide-react';
import { MOCK_USERS } from '@nexora/shared';

interface HeaderProps {
  currentTabName: string;
  onRefresh?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTabName, onRefresh }) => {
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
          onMouseEnter={(e) => (e.currentTarget.style.color = '#22D3EE')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
        >
          <RefreshCw size={15} />
          <span>Sync</span>
        </button>

        {/* User profile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          paddingLeft: '14px',
          borderLeft: '1px solid #1E293B',
        }}>
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
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#F8FAFC' }}>
              {currentUser.name}
            </div>
            <div style={{ fontSize: '11px', color: '#8B5CF6', fontWeight: 600 }}>
              SUPERADMIN
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
