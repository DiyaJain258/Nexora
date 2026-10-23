import React, { useState } from 'react';
import { QrCode, Tv, Smartphone, CheckCircle, XCircle, Clock, ShieldCheck, RefreshCw } from 'lucide-react';
import { MOCK_ACTIVATION_CODES, MOCK_DEVICES } from '@nexora/shared';

export const DeviceActivationAdminView: React.FC = () => {
  const [activationCodes, setActivationCodes] = useState(MOCK_ACTIVATION_CODES);
  const [devices, setDevices] = useState(MOCK_DEVICES);

  const handleApproveCode = (id: string) => {
    setActivationCodes(
      activationCodes.map((code) => {
        if (code.id === id) {
          return {
            ...code,
            status: 'activated',
            userName: 'Alexander Vance (Superadmin)',
            userId: 'usr-01',
          };
        }
        return code;
      })
    );
  };

  const handleRevokeCode = (id: string) => {
    if (confirm('Revoke and invalidate this activation token?')) {
      setActivationCodes(activationCodes.filter((c) => c.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Overview Banner */}
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
            <QrCode size={22} color="#E50914" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#FFFFFF' }}>
              TV Device Activation & Handshake Tokens
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#B3B3B3' }}>
              Pending 6-digit codes generated on Android TV, Google TV, and Apple TV clients
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-red">
            Active Pairing Gateway: v2.4
          </span>
        </div>
      </div>

      {/* Pending / Recent Activation Requests Table */}
      <div style={{
        backgroundColor: '#151515',
        border: '1px solid #303030',
        borderRadius: '16px',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #303030', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>
            Device Activation Requests
          </h4>
          <span style={{ fontSize: '12px', color: '#E50914', fontWeight: 700 }}>
            {activationCodes.filter((c) => c.status === 'pending').length} Pending Pairing
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#0D0D0D', borderBottom: '1px solid #303030', color: '#B3B3B3' }}>
              <th style={{ padding: '14px 18px' }}>Code</th>
              <th style={{ padding: '14px 18px' }}>Hardware Model</th>
              <th style={{ padding: '14px 18px' }}>Client IP</th>
              <th style={{ padding: '14px 18px' }}>Generated</th>
              <th style={{ padding: '14px 18px' }}>Expires</th>
              <th style={{ padding: '14px 18px' }}>Status</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activationCodes.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #303030' }}>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 900,
                    fontSize: '15px',
                    color: '#FF2B36',
                    backgroundColor: 'rgba(229, 9, 20, 0.1)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(229, 9, 20, 0.35)',
                  }}>
                    {item.code}
                  </span>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Tv size={16} color="#E50914" />
                    <div>
                      <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{item.deviceName}</div>
                      <div style={{ fontSize: '11px', color: '#737373', textTransform: 'uppercase' }}>{item.deviceType}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '14px 18px', fontFamily: 'JetBrains Mono', color: '#B3B3B3' }}>
                  {item.ipAddress}
                </td>
                <td style={{ padding: '14px 18px', color: '#B3B3B3' }}>
                  {item.generatedAt}
                </td>
                <td style={{ padding: '14px 18px', color: '#737373' }}>
                  {item.expiresAt}
                </td>
                <td style={{ padding: '14px 18px' }}>
                  {item.status === 'pending' && (
                    <span className="badge badge-warning">
                      <Clock size={12} /> Pending Entry
                    </span>
                  )}
                  {item.status === 'activated' && (
                    <span className="badge badge-success">
                      <CheckCircle size={12} /> Paired: {item.userName || 'Subscriber'}
                    </span>
                  )}
                  {item.status === 'expired' && (
                    <span className="badge badge-danger">
                      <XCircle size={12} /> Expired
                    </span>
                  )}
                </td>
                <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    {item.status === 'pending' && (
                      <button
                        onClick={() => handleApproveCode(item.id)}
                        style={{
                          backgroundColor: 'rgba(16, 185, 129, 0.15)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          color: '#34D399',
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontSize: '12px',
                        }}
                      >
                        Approve / Link
                      </button>
                    )}
                    <button
                      onClick={() => handleRevokeCode(item.id)}
                      style={{
                        backgroundColor: 'rgba(229, 9, 20, 0.15)',
                        border: '1px solid rgba(229, 9, 20, 0.35)',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        color: '#FF2B36',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}
                    >
                      Revoke
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
