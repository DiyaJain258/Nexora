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

  const marqueeChannels = [...filteredChannels, ...filteredChannels, ...filteredChannels];

  return (
    <section id="channels" style={{ padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#fda4af', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
              UNLIMITED BROADCAST CATALOG
            </div>
            <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#f8fafc', letterSpacing: '-1px' }}>
              1,400+ Live Channels & <span className="gradient-text">24/7 Premium Streams</span>
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.label)}
                  style={{
                    backgroundColor: isActive ? 'rgba(225, 29, 72, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                    border: `1px solid ${isActive ? 'rgba(225, 29, 72, 0.45)' : 'rgba(255, 255, 255, 0.08)'}`,
                    color: isActive ? '#ffffff' : '#a1a1aa',
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
                  <Icon size={14} color={isActive ? '#fda4af' : '#71717a'} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

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
                    style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'contain', backgroundColor: '#18181b', padding: '4px' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#f8fafc' }}>{channel.name}</h4>
                    <span style={{ fontSize: '11px', color: '#71717a' }}>CH {channel.channelNumber} • {channel.category}</span>
                  </div>
                </div>

                <span
                  style={{
                    backgroundColor: 'rgba(225, 29, 72, 0.15)',
                    color: '#fb7185',
                    border: '1px solid rgba(225, 29, 72, 0.35)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#e11d48' }} />
                  LIVE
                </span>
              </div>

              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)', marginBottom: '14px' }}>
                <span style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase', fontWeight: 700 }}>Now Playing</span>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#f4f4f5', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {channel.currentProgram?.title || 'Live Broadcast Stream'}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff' }}>{channel.resolution} 60fps</span>
                <span style={{ fontSize: '12px', color: '#fda4af', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                  <Play size={13} fill="#fda4af" />
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
