import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Tv,
  Volume2,
  Subtitles,
  Activity,
  Layers,
  CornerUpLeft,
  Sliders,
  Radio,
} from 'lucide-react';
import { Channel, ContentItem, MOCK_CHANNELS } from '@nexora/shared';

interface TvPlayerViewProps {
  item: Channel | ContentItem;
  onClose: () => void;
  onSwitchChannel: (channel: Channel) => void;
}

export const TvPlayerView: React.FC<TvPlayerViewProps> = ({
  item,
  onClose,
  onSwitchChannel,
}) => {
  const [showOsd, setShowOsd] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [activeChannelIndex, setActiveChannelIndex] = useState(0);

  const isChannel = 'channelNumber' in item;
  const channel = isChannel ? (item as Channel) : null;
  const title = isChannel ? (item as Channel).name : (item as ContentItem).title;
  const currentProgram = isChannel ? (item as Channel).currentProgram?.title : (item as ContentItem).synopsis;
  const poster = (item as any).backdropUrl || (item as any).logo;

  // Auto-hide OSD after 6 seconds of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOsd(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, [showOsd]);

  return (
    <div
      onClick={() => setShowOsd(true)}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      {/* 4K Stream Video Simulated Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src={poster}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
        }} />
      </div>

      {/* Top OSD Bar */}
      {showOsd && (
        <div style={{
          position: 'relative',
          zIndex: 10,
          padding: '28px 48px',
          background: 'linear-gradient(180deg, rgba(7, 9, 18, 0.95) 0%, rgba(7, 9, 18, 0) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={onClose}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CornerUpLeft size={20} />
            </button>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {channel && (
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#8B5CF6' }}>
                    CH {channel.channelNumber}
                  </span>
                )}
                <span className="badge badge-danger">
                  <span className="live-dot" /> LIVE 4K
                </span>
                <span className="badge badge-cyan">HEVC 60FPS</span>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#F8FAFC', margin: '4px 0 0 0' }}>
                {title} {currentProgram ? `— ${currentProgram}` : ''}
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setShowStats(!showStats)}
              style={{
                backgroundColor: showStats ? 'rgba(34, 211, 238, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                border: showStats ? '1px solid #22D3EE' : '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '8px 14px',
                color: showStats ? '#22D3EE' : '#F8FAFC',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Activity size={16} />
              <span>Stream Telemetry</span>
            </button>
          </div>
        </div>
      )}

      {/* Stream Telemetry / Stats for Nerds (Android TV Media3 Spec) */}
      {showStats && (
        <div style={{
          position: 'absolute',
          top: '110px',
          right: '48px',
          zIndex: 20,
          backgroundColor: 'rgba(11, 16, 32, 0.92)',
          backdropFilter: 'blur(16px)',
          border: '1px solid #22D3EE',
          borderRadius: '16px',
          padding: '20px',
          width: '340px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#22D3EE', marginBottom: '4px' }}>
            MEDIA3 EXOPLAYER TELEMETRY
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94A3B8' }}>Resolution:</span>
            <span style={{ color: '#F8FAFC', fontWeight: 700 }}>3840 x 2160 (4K UHD)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94A3B8' }}>Frame Rate:</span>
            <span style={{ color: '#F8FAFC', fontWeight: 700 }}>59.940 FPS</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94A3B8' }}>Video Codec:</span>
            <span style={{ color: '#8B5CF6', fontWeight: 700 }}>HEVC / Main 10 HDR10</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94A3B8' }}>Audio Passthrough:</span>
            <span style={{ color: '#22D3EE', fontWeight: 700 }}>Dolby Atmos (E-AC-3 JOC)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94A3B8' }}>Current Bitrate:</span>
            <span style={{ color: '#10B981', fontWeight: 700 }}>18,480 Kbps</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94A3B8' }}>Buffer Health:</span>
            <span style={{ color: '#10B981', fontWeight: 700 }}>16.4 Seconds</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94A3B8' }}>Edge POP CDN:</span>
            <span style={{ color: '#F8FAFC' }}>FRA-01 (Frankfurt Core)</span>
          </div>
        </div>
      )}

      {/* Bottom OSD Bar & Quick Channel Zapper */}
      {showOsd && (
        <div style={{
          position: 'relative',
          zIndex: 10,
          padding: '24px 48px',
          background: 'linear-gradient(0deg, rgba(7, 9, 18, 0.98) 0%, rgba(7, 9, 18, 0) 100%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {/* Quick Channel Zapper Row */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#94A3B8', marginBottom: '10px' }}>
              QUICK CHANNEL ZAPPER (USE LEFT / RIGHT REMOTE ARROWS)
            </div>

            <div style={{ display: 'flex', gap: '14px', overflowX: 'auto', scrollbarWidth: 'none' }}>
              {MOCK_CHANNELS.map((ch, idx) => {
                const isActiveChannel = ch.id === item.id;
                return (
                  <div
                    key={ch.id}
                    onClick={() => onSwitchChannel(ch)}
                    style={{
                      width: '180px',
                      flexShrink: 0,
                      backgroundColor: isActiveChannel ? 'rgba(34, 211, 238, 0.2)' : 'rgba(17, 24, 39, 0.8)',
                      border: isActiveChannel ? '2px solid #22D3EE' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <img src={ch.logo} alt={ch.name} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontSize: '11px', color: '#8B5CF6', fontWeight: 800 }}>CH {ch.channelNumber}</div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {ch.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
