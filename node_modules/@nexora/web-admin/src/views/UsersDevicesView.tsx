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
      return <Tv size={16} color="#22D3EE" />;
    }
    if (type === 'android-mobile' || type === 'ios-mobile') {
      return <Smartphone size={16} color="#8B5CF6" />;
    }
    return <Laptop size={16} color="#FBBF24" />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Tab Switcher & Search */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        backgroundColor: '#111827',
        border: '1px solid #1E293B',
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
              fontWeight: 600,
              border: activeTab === 'users' ? '1px solid #8B5CF6' : '1px solid #1E293B',
              backgroundColor: activeTab === 'users' ? 'rgba(139, 92, 246, 0.2)' : '#070912',
              color: activeTab === 'users' ? '#22D3EE' : '#94A3B8',
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
              fontWeight: 600,
              border: activeTab === 'devices' ? '1px solid #8B5CF6' : '1px solid #1E293B',
              backgroundColor: activeTab === 'devices' ? 'rgba(139, 92, 246, 0.2)' : '#070912',
              color: activeTab === 'devices' ? '#22D3EE' : '#94A3B8',
              cursor: 'pointer',
            }}
          >
            Active Device Sessions ({devices.length})
          </button>
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={16} color="#64748B" style={{ position: 'absolute', left: '12px' }} />
          <input
            type="text"
            placeholder="Search accounts or devices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              backgroundColor: '#070912',
              border: '1px solid #1E293B',
              borderRadius: '8px',
              padding: '8px 14px 8px 36px',
              color: '#F8FAFC',
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
          backgroundColor: '#111827',
          border: '1px solid #1E293B',
          borderRadius: '14px',
          overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#0B1020', borderBottom: '1px solid #1E293B', color: '#94A3B8' }}>
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
                <tr key={u.id} style={{ borderBottom: '1px solid #1E293B' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={u.avatarUrl}
                        alt={u.name}
                        style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: '#F8FAFC' }}>{u.name}</div>
                        <div style={{ fontSize: '11px', color: '#94A3B8' }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span className={`badge ${u.role === 'superadmin' ? 'badge-cyan' : u.role === 'admin' ? 'badge-violet' : 'badge-warning'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', color: '#F8FAFC' }}>
                    {u.planName}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, color: '#22D3EE' }}>{u.activeScreens}</span>
                      <span style={{ color: '#64748B' }}>/ {u.maxScreens} max</span>
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
                        backgroundColor: u.status === 'active' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        border: u.status === 'active' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        color: u.status === 'active' ? '#EF4444' : '#10B981',
                        fontSize: '12px',
                        cursor: 'pointer',
                        fontWeight: 600,
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
          backgroundColor: '#111827',
          border: '1px solid #1E293B',
          borderRadius: '14px',
          overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#0B1020', borderBottom: '1px solid #1E293B', color: '#94A3B8' }}>
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
                <tr key={d.id} style={{ borderBottom: '1px solid #1E293B' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {getDeviceIcon(d.deviceType)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#F8FAFC' }}>{d.deviceName}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>{d.clientVersion}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px', color: '#F8FAFC', fontWeight: 500 }}>
                    {d.userName}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ color: '#94A3B8' }}>{d.location}</div>
                    <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'JetBrains Mono' }}>{d.ipAddress}</div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    {d.activeStreamTitle ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="live-dot" />
                        <span style={{ color: '#22D3EE', fontWeight: 500 }}>{d.activeStreamTitle}</span>
                      </div>
                    ) : (
                      <span style={{ color: '#64748B' }}>Idle / In Menu</span>
                    )}
                  </td>
                  <td style={{ padding: '14px 18px', color: '#94A3B8' }}>
                    {d.lastActive}
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleRevokeDevice(d.id)}
                      style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        color: '#EF4444',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 600,
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
