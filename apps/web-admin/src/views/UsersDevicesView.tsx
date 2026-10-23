import React, { useState } from 'react';
import {
  Users,
  Tv,
  Smartphone,
  Laptop,
  Shield,
  Trash2,
  CheckCircle,
  AlertOctagon,
  Search,
} from 'lucide-react';
import { User, DeviceSession, MOCK_USERS, MOCK_DEVICES } from '@nexora/shared';

export const UsersDevicesView: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [devices, setDevices] = useState<DeviceSession[]>(MOCK_DEVICES);
  const [activeTab, setActiveTab] = useState<'users' | 'devices'>('users');
  const [searchQuery, setSearchQuery] = useState('');

  const handleRevokeDevice = (id: string) => {
    if (confirm('Revoke this device token? The subscriber will be immediately disconnected.')) {
      setDevices(devices.filter((d) => d.id !== id));
    }
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((u) => {
        if (u.id === userId) {
          const next = u.status === 'active' ? 'suspended' : 'active';
          return { ...u, status: next };
        }
        return u;
      })
    );
  };

  const getDeviceIcon = (type: DeviceSession['deviceType']) => {
    if (type === 'android-tv' || type === 'apple-tv' || type === 'fire-tv') {
      return <Tv size={16} color="#E50914" />;
    }
    if (type === 'android-mobile' || type === 'ios-mobile') {
      return <Smartphone size={16} color="#FF2B36" />;
    }
    return <Laptop size={16} color="#B3B3B3" />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Tab Switcher & Search */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        backgroundColor: '#151515',
        border: '1px solid #303030',
        borderRadius: '14px',
        padding: '16px 20px',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('users')}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              border: activeTab === 'users' ? '1px solid #E50914' : '1px solid #303030',
              backgroundColor: activeTab === 'users' ? 'rgba(229, 9, 20, 0.2)' : '#050505',
              color: activeTab === 'users' ? '#FF2B36' : '#B3B3B3',
              cursor: 'pointer',
            }}
          >
            Subscribers & Admins ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('devices')}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              border: activeTab === 'devices' ? '1px solid #E50914' : '1px solid #303030',
              backgroundColor: activeTab === 'devices' ? 'rgba(229, 9, 20, 0.2)' : '#050505',
              color: activeTab === 'devices' ? '#FF2B36' : '#B3B3B3',
              cursor: 'pointer',
            }}
          >
            Active Device Sessions ({devices.length})
          </button>
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={16} color="#737373" style={{ position: 'absolute', left: '12px' }} />
          <input
            type="text"
            placeholder="Search accounts or devices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              backgroundColor: '#050505',
              border: '1px solid #303030',
              borderRadius: '8px',
              padding: '8px 14px 8px 36px',
              color: '#FFFFFF',
              fontSize: '13px',
              width: '260px',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Users Table */}
      {activeTab === 'users' && (
        <div style={{
          backgroundColor: '#151515',
          border: '1px solid #303030',
          borderRadius: '14px',
          overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#0D0D0D', borderBottom: '1px solid #303030', color: '#B3B3B3' }}>
                <th style={{ padding: '14px 18px' }}>User Details</th>
                <th style={{ padding: '14px 18px' }}>Role</th>
                <th style={{ padding: '14px 18px' }}>Subscription Plan</th>
                <th style={{ padding: '14px 18px' }}>Screen Concurrency</th>
                <th style={{ padding: '14px 18px' }}>Status</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid #303030' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={u.avatarUrl}
                        alt={u.name}
                        style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{u.name}</div>
                        <div style={{ fontSize: '11px', color: '#B3B3B3' }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span className="badge badge-red">
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', color: '#FFFFFF' }}>
                    {u.planName}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 800, color: '#E50914' }}>{u.activeScreens}</span>
                      <span style={{ color: '#737373' }}>/ {u.maxScreens} max</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    {u.status === 'active' ? (
                      <span className="badge badge-success">Active</span>
                    ) : (
                      <span className="badge badge-danger">Suspended</span>
                    )}
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      style={{
                        backgroundColor: u.status === 'active' ? 'rgba(229, 9, 20, 0.15)' : 'rgba(16, 185, 129, 0.1)',
                        border: u.status === 'active' ? '1px solid rgba(229, 9, 20, 0.4)' : '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        color: u.status === 'active' ? '#FF2B36' : '#10B981',
                        fontSize: '12px',
                        cursor: 'pointer',
                        fontWeight: 700,
                      }}
                    >
                      {u.status === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Devices Table */}
      {activeTab === 'devices' && (
        <div style={{
          backgroundColor: '#151515',
          border: '1px solid #303030',
          borderRadius: '14px',
          overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#0D0D0D', borderBottom: '1px solid #303030', color: '#B3B3B3' }}>
                <th style={{ padding: '14px 18px' }}>Hardware / Device</th>
                <th style={{ padding: '14px 18px' }}>Account Holder</th>
                <th style={{ padding: '14px 18px' }}>Network & Geolocation</th>
                <th style={{ padding: '14px 18px' }}>Active Transmission</th>
                <th style={{ padding: '14px 18px' }}>Last Heartbeat</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((d) => (
                <tr key={d.id} style={{ borderBottom: '1px solid #303030' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: '#1C1C1C',
                        border: '1px solid #303030',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {getDeviceIcon(d.deviceType)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{d.deviceName}</div>
                        <div style={{ fontSize: '11px', color: '#737373' }}>{d.clientVersion}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px', color: '#FFFFFF', fontWeight: 600 }}>
                    {d.userName}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ color: '#B3B3B3' }}>{d.location}</div>
                    <div style={{ fontSize: '11px', color: '#737373', fontFamily: 'JetBrains Mono' }}>{d.ipAddress}</div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    {d.activeStreamTitle ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="live-dot" />
                        <span style={{ color: '#FF2B36', fontWeight: 600 }}>{d.activeStreamTitle}</span>
                      </div>
                    ) : (
                      <span style={{ color: '#737373' }}>Idle / In Menu</span>
                    )}
                  </td>
                  <td style={{ padding: '14px 18px', color: '#B3B3B3' }}>
                    {d.lastActive}
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleRevokeDevice(d.id)}
                      style={{
                        backgroundColor: 'rgba(229, 9, 20, 0.15)',
                        border: '1px solid rgba(229, 9, 20, 0.4)',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        color: '#FF2B36',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 700,
                      }}
                    >
                      Revoke & Kick
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
