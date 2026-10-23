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
      backgroundColor: '#0D0D0D',
      borderBottom: '1px solid #303030',
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
          fontWeight: 800,
          color: '#FFFFFF',
          margin: 0,
        }}>
          {currentTabName}
        </h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'rgba(229, 9, 20, 0.12)',
          border: '1px solid rgba(229, 9, 20, 0.35)',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '12px',
          color: '#FF2B36',
          fontWeight: 700,
        }}>
          <Radio size={14} className="live-dot" />
          <span>ORIGIN LIVE</span>
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
          <Search size={16} color="#737373" style={{ position: 'absolute', left: '12px' }} />
          <input
            type="text"
            placeholder="Search channels, streams, users..."
            style={{
              backgroundColor: '#050505',
              border: '1px solid #303030',
              borderRadius: '8px',
              padding: '8px 14px 8px 36px',
              color: '#FFFFFF',
              fontSize: '13px',
              width: '260px',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#E50914')}
            onBlur={(e) => (e.target.style.borderColor = '#303030')}
          />
        </div>

        {/* Refresh button */}
        <button
          onClick={onRefresh}
          title="Refresh stream metrics"
          style={{
            background: '#1C1C1C',
            border: '1px solid #303030',
            borderRadius: '8px',
            padding: '8px 12px',
            color: '#B3B3B3',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 600,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.borderColor = '#E50914';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#B3B3B3';
            e.currentTarget.style.borderColor = '#303030';
          }}
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
          borderLeft: '1px solid #303030',
        }}>
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #E50914',
            }}
          />
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>
              {currentUser.name}
            </div>
            <div style={{ fontSize: '11px', color: '#E50914', fontWeight: 800 }}>
              SUPERADMIN
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
