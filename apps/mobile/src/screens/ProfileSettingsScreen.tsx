import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Smartphone,
  Download,
  Wifi,
  Volume2,
  ChevronRight,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { MOCK_USERS, MOCK_DEVICES } from '@nexora/shared';

export const ProfileSettingsScreen: React.FC = () => {
  const user = MOCK_USERS[0];
  const [streamQuality, setStreamQuality] = useState('4K HDR Max');
  const [downloadWifiOnly, setDownloadWifiOnly] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '16px', paddingBottom: '34px' }}>
      {/* User Card */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid #1E293B',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          border: '2px solid #8B5CF6',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <img src={user.avatarUrl} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '17px', fontWeight: 800, color: '#F8FAFC' }}>{user.name}</div>
          <div style={{ fontSize: '12px', color: '#94A3B8' }}>{user.email}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
            <span className="badge badge-cyan" style={{ fontSize: '10px' }}>
              {user.planName}
            </span>
            <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>Active</span>
          </div>
        </div>
      </div>

      {/* Subscription & Devices */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid #1E293B',
        borderRadius: '14px',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #1E293B', fontSize: '13px', fontWeight: 700, color: '#22D3EE' }}>
          SUBSCRIPTION & CONCURRENCY
        </div>
        <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#F8FAFC' }}>Simultaneous Stream Screens</div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>2 of 5 active devices currently in use</div>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#8B5CF6' }}>2/5 Screens</span>
        </div>
        <div style={{ padding: '14px 16px', borderTop: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#F8FAFC' }}>Renewal Date</div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>Renews automatically on Nov 15, 2026</div>
          </div>
          <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 600 }}>$21.99/mo</span>
        </div>
      </div>

      {/* Playback & Download Preferences */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid #1E293B',
        borderRadius: '14px',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #1E293B', fontSize: '13px', fontWeight: 700, color: '#8B5CF6' }}>
          PLAYBACK & STREAMING SETTINGS
        </div>

        <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#F8FAFC' }}>Default Mobile Cellular Quality</div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>Optimizes bitrate on 5G/LTE</div>
          </div>
          <select
            value={streamQuality}
            onChange={(e) => setStreamQuality(e.target.value)}
            style={{
              backgroundColor: '#070912',
              border: '1px solid #1E293B',
              borderRadius: '6px',
              padding: '6px 10px',
              color: '#22D3EE',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            <option value="4K HDR Max">4K HDR (Highest)</option>
            <option value="1080p FHD">1080p FHD (Balanced)</option>
            <option value="Data Saver">Data Saver (720p)</option>
          </select>
        </div>

        <div style={{ padding: '14px 16px', borderTop: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#F8FAFC' }}>Download via Wi-Fi Only</div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>Prevents cellular data usage for offline caching</div>
          </div>
          <input
            type="checkbox"
            checked={downloadWifiOnly}
            onChange={(e) => setDownloadWifiOnly(e.target.checked)}
            style={{ width: '18px', height: '18px', accentColor: '#8B5CF6' }}
          />
        </div>
      </div>

      {/* App Version Info */}
      <div style={{ textAlign: 'center', fontSize: '11px', color: '#64748B' }}>
        NEXORA Mobile Universal Build v2.4.0 (Android & iOS)
      </div>
    </div>
  );
};
