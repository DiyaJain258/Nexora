import React, { useState } from 'react';
import { Bell, Send, CheckCircle, Radio, Smartphone, Tv, Globe } from 'lucide-react';
import { NotificationItem, MOCK_NOTIFICATIONS } from '@nexora/shared';

export const NotificationsView: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetPlatform, setTargetPlatform] = useState<'all' | 'tv' | 'mobile' | 'web'>('all');
  const [notifType, setNotifType] = useState<'system' | 'promotion' | 'maintenance' | 'breaking_news'>('system');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;

    const item: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      targetPlatform,
      type: notifType,
      sentAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      deliveredCount: targetPlatform === 'all' ? 421000 : targetPlatform === 'tv' ? 142000 : 279000,
      readCount: 0,
      status: 'sent',
    };

    setNotifications([item, ...notifications]);
    setTitle('');
    setMessage('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Broadcast Composer */}
      <div style={{
        backgroundColor: '#151515',
        border: '1px solid #303030',
        borderRadius: '16px',
        padding: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Bell size={20} color="#E50914" />
          <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#FFFFFF' }}>
            Broadcast Instant Notification to Subscribers
          </h3>
        </div>

        <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#B3B3B3', fontWeight: 700 }}>Target Device / OS</label>
              <select
                value={targetPlatform}
                onChange={(e) => setTargetPlatform(e.target.value as any)}
                style={{
                  width: '100%',
                  backgroundColor: '#050505',
                  border: '1px solid #303030',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#FFFFFF',
                  marginTop: '6px',
                }}
              >
                <option value="all">All Platforms (Android TV, Mobile, Apple TV, Web)</option>
                <option value="tv">TV Platforms Only (Android TV, Google TV, Fire TV)</option>
                <option value="mobile">Mobile Devices Only (Android & iOS)</option>
                <option value="web">Web Browser Subscribers</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', color: '#B3B3B3', fontWeight: 700 }}>Notification Category</label>
              <select
                value={notifType}
                onChange={(e) => setNotifType(e.target.value as any)}
                style={{
                  width: '100%',
                  backgroundColor: '#050505',
                  border: '1px solid #303030',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#FFFFFF',
                  marginTop: '6px',
                }}
              >
                <option value="system">System Notice</option>
                <option value="maintenance">Maintenance / Infrastructure</option>
                <option value="promotion">Premiere / Match Announcement</option>
                <option value="breaking_news">Emergency / Breaking Alert</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#B3B3B3', fontWeight: 700 }}>Alert Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Live UEFA Champions League Final in 4K HDR Starts in 15 Minutes!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#050505',
                border: '1px solid #303030',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#FFFFFF',
                marginTop: '6px',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#B3B3B3', fontWeight: 700 }}>Message Payload</label>
            <textarea
              rows={3}
              required
              placeholder="Detailed notification content sent to user notification center and TV toast overlay..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#050505',
                border: '1px solid #303030',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#FFFFFF',
                marginTop: '6px',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn-primary">
              <Send size={16} />
              <span>Broadcast Now</span>
            </button>
          </div>
        </form>
      </div>

      {/* Broadcast History */}
      <div style={{
        backgroundColor: '#151515',
        border: '1px solid #303030',
        borderRadius: '16px',
        padding: '20px',
      }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>
          Broadcast History & Delivery Audit
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.map((n) => (
            <div
              key={n.id}
              style={{
                backgroundColor: '#0D0D0D',
                border: '1px solid #303030',
                borderRadius: '10px',
                padding: '14px 18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={`badge ${n.type === 'maintenance' ? 'badge-warning' : 'badge-red'}`}>
                    {n.type}
                  </span>
                  <span className="badge badge-elevated" style={{ textTransform: 'uppercase' }}>
                    {n.targetPlatform}
                  </span>
                  <span style={{ fontSize: '12px', color: '#737373' }}>{n.sentAt}</span>
                </div>
                <h5 style={{ margin: '6px 0 2px 0', fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>{n.title}</h5>
                <p style={{ margin: 0, fontSize: '12px', color: '#B3B3B3' }}>{n.message}</p>
              </div>

              <div style={{ textAlign: 'right', minWidth: '120px' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#10B981' }}>
                  {n.deliveredCount.toLocaleString()} Sent
                </div>
                <div style={{ fontSize: '11px', color: '#737373' }}>
                  Delivery: 99.8%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
