import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Smartphone,
  Tv,
  Download,
  Wifi,
  Volume2,
  ChevronRight,
  LogOut,
  Sparkles,
  QrCode,
  CheckCircle,
} from 'lucide-react';
import { MOCK_USERS, MOCK_DEVICES } from '@nexora/shared';

export const ProfileSettingsScreen: React.FC = () => {
  const user = MOCK_USERS[0];
  const [streamQuality, setStreamQuality] = useState('4K HDR Max');
  const [downloadWifiOnly, setDownloadWifiOnly] = useState(true);
  const [activationCode, setActivationCode] = useState('');
  const [activationStatus, setActivationStatus] = useState<'idle' | 'linking' | 'success'>('idle');

  const handlePairDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activationCode) return;

    setActivationStatus('linking');
    setTimeout(() => {
      setActivationStatus('success');
      setActivationCode('');
      setTimeout(() => setActivationStatus('idle'), 3500);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '16px', paddingBottom: '34px' }}>
      {/* User Card */}
      <div style={{
        backgroundColor: '#151515',
        border: '1px solid #303030',
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
          border: '2px solid #E50914',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <img src={user.avatarUrl} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF' }}>{user.name}</div>
          <div style={{ fontSize: '12px', color: '#B3B3B3' }}>{user.email}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
            <span className="badge badge-red" style={{ fontSize: '10px' }}>
              {user.planName}
            </span>
            <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>Active</span>
          </div>
        </div>
      </div>

      {/* Account & Device Activation UI (Link Android TV / Google TV) */}
      <div style={{
        backgroundColor: '#151515',
        border: '1px solid #303030',
        borderRadius: '16px',
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #E50914 0%, #7F0000 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(229, 9, 20, 0.4)',
          }}>
            <Tv size={18} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
              Activate a TV / Device
            </div>
            <div style={{ fontSize: '11px', color: '#B3B3B3' }}>
              Pair your Android TV or Google TV with your account
            </div>
          </div>
        </div>

        <form onSubmit={handlePairDevice} style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <input
            type="text"
            maxLength={7}
            placeholder="e.g. NX-8492"
            value={activationCode}
            onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
            style={{
              flex: 1,
              backgroundColor: '#050505',
              border: '1px solid #303030',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#FF2B36',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '1px',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={activationStatus === 'linking'}
            style={{
              background: 'linear-gradient(135deg, #E50914 0%, #7F0000 100%)',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 15px rgba(229, 9, 20, 0.4)',
            }}
          >
            {activationStatus === 'linking' ? 'Pairing...' : 'Link TV'}
          </button>
        </form>

        {activationStatus === 'success' && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '12px',
            color: '#34D399',
            fontWeight: 600,
          }}>
            <CheckCircle size={16} />
            <span>Success! TV paired. You can now stream in 4K HDR.</span>
          </div>
        )}
      </div>

      {/* Subscription & Devices */}
      <div style={{
        backgroundColor: '#151515',
        border: '1px solid #303030',
        borderRadius: '14px',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #303030', fontSize: '13px', fontWeight: 700, color: '#FF2B36', letterSpacing: '0.04em' }}>
          SUBSCRIPTION & CONCURRENCY
        </div>
        <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>Simultaneous Stream Screens</div>
            <div style={{ fontSize: '11px', color: '#B3B3B3' }}>2 of 5 active devices currently in use</div>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#FF2B36' }}>2/5 Screens</span>
        </div>
        <div style={{ padding: '14px 16px', borderTop: '1px solid #303030', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>Renewal Date</div>
            <div style={{ fontSize: '11px', color: '#B3B3B3' }}>Renews automatically on Nov 15, 2026</div>
          </div>
          <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 600 }}>$21.99/mo</span>
        </div>
      </div>

      {/* Playback & Download Preferences */}
      <div style={{
        backgroundColor: '#151515',
        border: '1px solid #303030',
        borderRadius: '14px',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #303030', fontSize: '13px', fontWeight: 700, color: '#E50914', letterSpacing: '0.04em' }}>
          PLAYBACK & STREAMING SETTINGS
        </div>

        <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>Default Mobile Cellular Quality</div>
            <div style={{ fontSize: '11px', color: '#B3B3B3' }}>Optimizes bitrate on 5G/LTE</div>
          </div>
          <select
            value={streamQuality}
            onChange={(e) => setStreamQuality(e.target.value)}
            style={{
              backgroundColor: '#050505',
              border: '1px solid #303030',
              borderRadius: '6px',
              padding: '6px 12px',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            <option value="4K HDR Max">4K HDR (Highest)</option>
            <option value="1080p FHD">1080p FHD (Balanced)</option>
            <option value="Data Saver">Data Saver (720p)</option>
          </select>
        </div>

        <div style={{ padding: '14px 16px', borderTop: '1px solid #303030', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>Download via Wi-Fi Only</div>
            <div style={{ fontSize: '11px', color: '#B3B3B3' }}>Prevents cellular data usage for offline caching</div>
          </div>
          <input
            type="checkbox"
            checked={downloadWifiOnly}
            onChange={(e) => setDownloadWifiOnly(e.target.checked)}
            style={{ width: '18px', height: '18px', accentColor: '#E50914' }}
          />
        </div>
      </div>

      {/* App Version Info */}
      <div style={{ textAlign: 'center', fontSize: '11px', color: '#B3B3B3' }}>
        NEXORA Mobile Universal Build v2.4.0 (Android & iOS)
      </div>
    </div>
  );
};
