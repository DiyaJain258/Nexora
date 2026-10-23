import React, { useState } from 'react';
import { X, Volume2, VolumeX, Maximize2, Radio, Activity, ShieldCheck, Film } from 'lucide-react';
import { Channel, MOCK_CHANNELS } from '@nexora/shared';

interface LivePlayerModalProps {
  channel: Channel | null;
  onClose: () => void;
}

export const LivePlayerModal: React.FC<LivePlayerModalProps> = ({ channel, onClose }) => {
  const currentChannel = channel || MOCK_CHANNELS[0];
  const [selectedChannel, setSelectedChannel] = useState<Channel>(currentChannel);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: 'rgba(3, 7, 18, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '1080px',
          backgroundColor: '#070a14',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          overflow: 'hidden',
          boxShadow: '0 25px 70px -15px rgba(0, 242, 254, 0.3)',
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444', boxShadow: '0 0 10px #ef4444' }} />
            <div>
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#f8fafc' }}>
                {selectedChannel.name} • 4K Live Broadcast
              </span>
              <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '10px' }}>
                CH {selectedChannel.channelNumber} • {selectedChannel.category}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '6px',
              cursor: 'pointer',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Screen Area */}
        <div style={{ position: 'relative', width: '100%', height: '520px', backgroundColor: '#020408' }}>
          {/* Simulated 4K Stream Video Background */}
          <img
            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1600&auto=format&fit=crop&q=80"
            alt="Live Stream"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
          />

          {/* HUD Top Left Stats Overlay */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              backgroundColor: 'rgba(10, 15, 28, 0.85)',
              backdropFilter: 'blur(10px)',
              padding: '10px 16px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={14} color="#00f2fe" />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#00f2fe' }}>18.4 Mbps</span>
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>3840x2160 @ 60fps</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Buffer: 14.2s</div>
            <div style={{ fontSize: '12px', color: '#c084fc', fontWeight: 600 }}>Dolby Atmos</div>
          </div>

          {/* HUD Bottom Player Controls Bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '20px',
              background: 'linear-gradient(to top, rgba(5, 7, 14, 0.95) 0%, transparent 100%)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => setIsMuted(!isMuted)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f8fafc',
                  cursor: 'pointer',
                }}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc' }}>
                  {selectedChannel.currentProgram?.title || 'Live Streaming'}
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                  {selectedChannel.currentProgram?.startTime} - {selectedChannel.currentProgram?.endTime}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ backgroundColor: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(0, 242, 254, 0.3)' }}>
                LOW LATENCY LL-HLS
              </span>
            </div>
          </div>
        </div>

        {/* Channel Switching Rail at Bottom */}
        <div style={{ padding: '16px 24px', backgroundColor: '#090d1a', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', gap: '12px', overflowX: 'auto' }}>
          {MOCK_CHANNELS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setSelectedChannel(ch)}
              style={{
                backgroundColor: selectedChannel.id === ch.id ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${selectedChannel.id === ch.id ? '#00f2fe' : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: '8px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                color: '#f8fafc',
                flexShrink: 0,
              }}
            >
              <img src={ch.logo} alt={ch.name} style={{ width: '22px', height: '22px', borderRadius: '4px', objectFit: 'contain' }} />
              <span style={{ fontSize: '12px', fontWeight: 700 }}>{ch.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
