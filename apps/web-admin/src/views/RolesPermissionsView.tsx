import React, { useState } from 'react';
import { Shield, Users, Check, X, Plus, Key } from 'lucide-react';
import { MOCK_ROLE_PERMISSIONS } from '@nexora/shared';

export const RolesPermissionsView: React.FC = () => {
  const [roles, setRoles] = useState(MOCK_ROLE_PERMISSIONS);

  const permissionLabels: Record<string, string> = {
    manageVod: 'Manage VOD Movies & Series',
    manageLiveChannels: 'Manage Live TV Channels',
    manageEpg: 'Edit Linear EPG Schedules',
    manageUsers: 'Manage Subscribers & Accounts',
    manageDevices: 'Revoke Device Sessions',
    manageBilling: 'Edit Subscription Plans',
    broadcastNotifications: 'Send Push Notifications',
    systemSettings: 'Transcoder & CDN Infrastructure',
  };

  const togglePermission = (roleId: string, permKey: string) => {
    setRoles(
      roles.map((r) => {
        if (r.id === roleId) {
          return {
            ...r,
            permissions: {
              ...r.permissions,
              [permKey]: !(r.permissions as any)[permKey],
            },
          };
        }
        return r;
      })
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner */}
      <div style={{
        backgroundColor: '#151515',
        border: '1px solid #303030',
        borderRadius: '16px',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: 'rgba(229, 9, 20, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #E50914',
          }}>
            <Shield size={22} color="#E50914" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#FFFFFF' }}>
              Roles & Granular Access Control (RBAC)
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#B3B3B3' }}>
              Define administrative privileges for operators, content managers, and support staff
            </p>
          </div>
        </div>

        <button
          className="btn-primary"
          onClick={() => alert('New Custom Role Creator opened')}
        >
          <Plus size={16} />
          <span>Create New Role</span>
        </button>
      </div>

      {/* Roles Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {roles.map((role) => (
          <div
            key={role.id}
            style={{
              backgroundColor: '#151515',
              border: '1px solid #303030',
              borderRadius: '16px',
              padding: '22px 24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Key size={18} color="#E50914" />
                  <h4 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#FFFFFF' }}>
                    {role.roleName}
                  </h4>
                  <span className="badge badge-red">{role.usersCount} Operators Assigned</span>
                </div>
                <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#B3B3B3' }}>
                  {role.description}
                </p>
              </div>
            </div>

            {/* Permission Checkbox Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '12px',
              backgroundColor: '#0D0D0D',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #303030',
            }}>
              {Object.entries(role.permissions).map(([key, val]) => (
                <label
                  key={key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '13px',
                    color: val ? '#FFFFFF' : '#737373',
                    cursor: 'pointer',
                    userSelect: 'none',
                    fontWeight: val ? 600 : 400,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={val}
                    onChange={() => togglePermission(role.id, key)}
                    style={{ width: '16px', height: '16px', accentColor: '#E50914' }}
                  />
                  <span>{permissionLabels[key] || key}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
