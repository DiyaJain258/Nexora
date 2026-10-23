import React, { useState } from 'react';
import { Calendar, Clock, Plus, RefreshCw, Upload, CheckCircle } from 'lucide-react';
import { MOCK_CHANNELS, EpgProgram } from '@nexora/shared';

export const EpgScheduleView: React.FC = () => {
  const [selectedChannelId, setSelectedChannelId] = useState(MOCK_CHANNELS[0].id);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced'>('idle');

  const channel = MOCK_CHANNELS.find((c) => c.id === selectedChannelId) || MOCK_CHANNELS[0];

  const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const programs: EpgProgram[] = [
    {
      id: 'epg-p1',
      channelId: channel.id,
      title: 'Morning Orbit News Brief',
      description: 'Global geopolitical and economic morning roundup.',
      category: 'News',
      startTime: '10:00',
      endTime: '11:00',
      progressPercent: 100,
      isLiveNow: false,
    },
    {
      id: 'epg-p2',
      channelId: channel.id,
      title: channel.currentProgram?.title || 'Solar Flare 4K',
      description: channel.currentProgram?.description || 'Deep solar observational documentary.',
      category: channel.category,
      startTime: '11:00',
      endTime: '13:30',
      progressPercent: 45,
      isLiveNow: true,
    },
    {
      id: 'epg-p3',
      channelId: channel.id,
      title: channel.nextProgram?.title || 'Hyperion Chronicles',
      description: channel.nextProgram?.description || 'Futuristic expedition through Titan moons.',
      category: channel.category,
      startTime: '13:30',
      endTime: '15:00',
      progressPercent: 0,
      isLiveNow: false,
    },
    {
      id: 'epg-p4',
      channelId: channel.id,
      title: 'Prime Time World Premiere',
      description: 'Exclusive multi-channel live presentation.',
      category: 'Special',
      startTime: '15:00',
      endTime: '17:00',
      progressPercent: 0,
      isLiveNow: false,
    },
  ];

  const handleSyncXmltv = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('synced');
      setTimeout(() => setSyncStatus('idle'), 3000);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top EPG Source Info */}
      <div style={{
        backgroundColor: '#151515',
        border: '1px solid #303030',
        borderRadius: '14px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '11px', color: '#B3B3B3', fontWeight: 700 }}>CHANNEL SCHEDULE</label>
            <select
              value={selectedChannelId}
              onChange={(e) => setSelectedChannelId(e.target.value)}
              style={{
                display: 'block',
                marginTop: '4px',
                backgroundColor: '#050505',
                border: '1px solid #303030',
                borderRadius: '8px',
                padding: '8px 14px',
                color: '#FFFFFF',
                fontWeight: 700,
              }}
            >
              {MOCK_CHANNELS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.channelNumber}. {c.name} ({c.category})
                </option>
              ))}
            </select>
          </div>

          <div style={{ fontSize: '12px', color: '#737373', borderLeft: '1px solid #303030', paddingLeft: '14px' }}>
            <div>XMLTV Source URL: <span style={{ color: '#E50914', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>https://epg.nexora.io/guide.xml</span></div>
            <div>Timezone: UTC+00:00 (Auto-adjust to subscriber device)</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn-secondary"
            onClick={handleSyncXmltv}
            disabled={syncStatus === 'syncing'}
          >
            <RefreshCw size={15} className={syncStatus === 'syncing' ? 'spin' : ''} />
            <span>{syncStatus === 'syncing' ? 'Syncing Feed...' : syncStatus === 'synced' ? 'Guide Updated!' : 'Fetch XMLTV'}</span>
          </button>
        </div>
      </div>

      {/* Visual Timeline Schedule */}
      <div style={{
        backgroundColor: '#151515',
        border: '1px solid #303030',
        borderRadius: '14px',
        padding: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Calendar size={18} color="#E50914" />
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#FFFFFF' }}>
            Interactive EPG Guide for {channel.name}
          </h3>
        </div>

        {/* Time Grid Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          borderBottom: '1px solid #303030',
          paddingBottom: '10px',
          fontSize: '12px',
          color: '#B3B3B3',
          fontWeight: 700,
          textAlign: 'center',
        }}>
          {timeSlots.map((time) => (
            <div key={time}>{time}</div>
          ))}
        </div>

        {/* Schedule Blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
          {programs.map((prog) => (
            <div
              key={prog.id}
              style={{
                backgroundColor: prog.isLiveNow ? 'rgba(229, 9, 20, 0.12)' : '#0D0D0D',
                border: prog.isLiveNow ? '1px solid #E50914' : '1px solid #303030',
                borderRadius: '10px',
                padding: '14px 18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#E50914' }}>
                    {prog.startTime} - {prog.endTime}
                  </span>
                  {prog.isLiveNow && (
                    <span className="badge badge-danger">
                      <span className="live-dot" /> ON AIR NOW
                    </span>
                  )}
                  <span className="badge badge-elevated">{prog.category}</span>
                </div>

                <h4 style={{ margin: '6px 0 2px 0', fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>
                  {prog.title}
                </h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#B3B3B3' }}>
                  {prog.description}
                </p>
              </div>

              {prog.isLiveNow && (
                <div style={{ textAlign: 'right', minWidth: '140px' }}>
                  <div style={{ fontSize: '11px', color: '#B3B3B3', marginBottom: '4px' }}>
                    Broadcast Progress ({prog.progressPercent}%)
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#1C1C1C', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${prog.progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #E50914, #7F0000)' }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
