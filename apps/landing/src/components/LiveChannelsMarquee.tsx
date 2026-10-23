import React, { useState } from 'react';
import { MOCK_CHANNELS, Channel } from '@nexora/shared';
import { Radio, Play, Flame, Film, Trophy, Newspaper } from 'lucide-react';

interface LiveChannelsMarqueeProps {
  onTuneChannel: (channel: Channel) => void;
}

export const LiveChannelsMarquee: React.FC<LiveChannelsMarqueeProps> = ({ onTuneChannel }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { label: 'All', icon: Radio },
    { label: 'Sports', icon: Trophy },
    { label: 'Movies', icon: Film },
    { label: 'News', icon: Newspaper },
    { label: 'Entertainment', icon: Flame },
  ];

  const filteredChannels = selectedCategory === 'All'
    ? MOCK_CHANNELS
    : MOCK_CHANNELS.filter((ch) => ch.category.toLowerCase() === selectedCategory.toLowerCase());

  // Duplicate for smooth seamless infinite marquee
  const marqueeChannels = [...filteredChannels, ...filteredChannels, ...filteredChannels];

  return (
    <section id="channels" style={{ padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#00f2fe', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
              UNLIMITED BROADCAST CATALOG
            </div>
            <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#f8fafc', letterSpacing: '-1px' }}>
              1,400+ Live Channels & <span className="gradient-text">24/7 Premium Streams</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.label)}
                  style={{
                    backgroundColor: isActive ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    border: `1px solid ${isActive ? 'rgba(0, 242, 254, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
                    color: isActive ? '#00f2fe' : '#94a3b8',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon size={14} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Horizontal Marquee */}
      <div style={{ width: '100%', overflow: 'hidden', padding: '16px 0' }}>
        <div className="animate-marquee" style={{ gap: '20px' }}>
          {marqueeChannels.map((channel, idx) => (
            <div
              key={`${channel.id}-${idx}`}
              onClick={() => onTuneChannel(channel)}
              className="glass-card"
              style={{
                width: '280px',
                padding: '20px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={channel.logo}
                    alt={channel.name}
                    style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'contain', backgroundColor: '#0f172a', padding: '4px' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#f8fafc' }}>{channel.name}</h4>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>CH {channel.channelNumber} • {channel.category}</span>
                  </div>
                </div>

                <span
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    color: '#ef4444',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                  LIVE
                </span>
              </div>

              {/* Current Program Info */}
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.04)', marginBottom: '14px' }}>
                <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Now Playing</span>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {channel.currentProgram?.title || 'Live Broadcast Stream'}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#38bdf8' }}>{channel.resolution} 60fps</span>
                <span style={{ fontSize: '12px', color: '#00f2fe', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                  <Play size={13} fill="#00f2fe" />
                  <span>Preview</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
