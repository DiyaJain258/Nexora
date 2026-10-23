import React, { useState } from 'react';
import { MOCK_CHANNELS, Channel } from '@nexora/shared';
import { Radio, Play, Flame, Film, Trophy, Newspaper, Activity, Users, Volume2 } from 'lucide-react';

interface LiveChannelsMarqueeProps {
  onTuneChannel: (channel: Channel) => void;
}

const CHANNEL_PREVIEW_BACKDROPS: Record<string, string> = {
  Sports: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
  Movies: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
  News: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=80',
  Entertainment: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
  Documentary: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
};

export const LiveChannelsMarquee: React.FC<LiveChannelsMarqueeProps> = ({ onTuneChannel }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredChannelId, setHoveredChannelId] = useState<string | null>(null);

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
    <section id="channels" style={{ padding: '44px 0', position: 'relative', overflow: 'hidden', backgroundColor: '#050507' }}>
      
      {/* Background Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.12) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 24px', marginBottom: '20px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 14px',
                borderRadius: '999px',
                backgroundColor: 'rgba(225, 29, 72, 0.15)',
                border: '1px solid rgba(225, 29, 72, 0.4)',
                marginBottom: '12px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#e11d48', boxShadow: '0 0 8px #e11d48' }} />
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#fda4af', letterSpacing: '1px', textTransform: 'uppercase' }}>
                UNLIMITED BROADCAST CATALOG • 4K 60FPS
              </span>
            </div>
            <h2 style={{ fontSize: '42px', fontWeight: 900, color: '#f8fafc', letterSpacing: '-1.5px', margin: 0 }}>
              1,400+ Live Channels & <span className="gradient-text">24/7 Premium Streams</span>
            </h2>
            <p style={{ color: '#a1a1aa', fontSize: '15px', marginTop: '8px', maxWidth: '620px' }}>
              Sub-second channel zapping with synchronized Dolby Atmos crowd audio and interactive broadcast telemetry.
            </p>
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
                    backgroundColor: isActive ? 'rgba(225, 29, 72, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    border: `1.5px solid ${isActive ? '#e11d48' : 'rgba(255, 255, 255, 0.09)'}`,
                    color: isActive ? '#ffffff' : '#a1a1aa',
                    padding: '9px 18px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isActive ? '0 0 20px rgba(225, 29, 72, 0.35)' : 'none',
                  }}
                >
                  <Icon size={15} color={isActive ? '#fda4af' : '#71717a'} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3D Kinetic Streaming Marquee Ribbon */}
      <div style={{ width: '100%', overflow: 'hidden', padding: '24px 0', position: 'relative' }}>
        
        {/* Left & Right Edge Fade Dimmer */}
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '120px', background: 'linear-gradient(90deg, #050507 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '120px', background: 'linear-gradient(270deg, #050507 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }} />

        <div className="animate-marquee" style={{ gap: '24px', display: 'flex', perspective: '1200px' }}>
          {marqueeChannels.map((channel, idx) => {
            const isHovered = hoveredChannelId === `${channel.id}-${idx}`;
            const previewBackdrop = CHANNEL_PREVIEW_BACKDROPS[channel.category] || CHANNEL_PREVIEW_BACKDROPS['Sports'];
            const viewerCount = (95 + ((idx * 37) % 180)).toFixed(1);

            return (
              <div
                key={`${channel.id}-${idx}`}
                onClick={() => onTuneChannel(channel)}
                onMouseEnter={() => setHoveredChannelId(`${channel.id}-${idx}`)}
                onMouseLeave={() => setHoveredChannelId(null)}
                style={{
                  width: '320px',
                  height: '240px',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  backgroundColor: '#0a0a10',
                  border: isHovered ? '1.5px solid #ffffff' : '1px solid rgba(225, 29, 72, 0.3)',
                  boxShadow: isHovered
                    ? '0 24px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(225, 29, 72, 0.5), 0 0 15px #ffffff'
                    : '0 14px 40px rgba(0, 0, 0, 0.75), 0 0 20px rgba(225, 29, 72, 0.15)',
                  transform: isHovered ? 'translateY(-10px) scale(1.04) rotateY(-2deg)' : 'translateY(0) scale(1.0)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '20px',
                }}
              >
                {/* 3D Realistic Broadcast Background Scene */}
                <img
                  src={previewBackdrop}
                  alt={channel.name}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: isHovered ? 'brightness(0.55) contrast(1.2)' : 'brightness(0.35) contrast(1.1)',
                    transform: isHovered ? 'scale(1.08)' : 'scale(1.0)',
                    transition: 'all 0.5s ease',
                  }}
                />

                {/* Ambient Dark Gradient Wash */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(5, 5, 8, 0.45) 0%, rgba(5, 5, 8, 0.7) 45%, rgba(5, 5, 8, 0.96) 100%)',
                    zIndex: 1,
                  }}
                />

                {/* Top Channel Header Row */}
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(10, 10, 14, 0.92)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.6)',
                      }}
                    >
                      <img
                        src={channel.logo}
                        alt={channel.name}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                        {channel.name}
                      </h4>
                      <span style={{ fontSize: '11px', color: '#fda4af', fontWeight: 700 }}>
                        CH {channel.channelNumber} • {channel.category}
                      </span>
                    </div>
                  </div>

                  {/* Pulsing Live On-Air Pill */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(225, 29, 72, 0.25)',
                      border: '1px solid #e11d48',
                      boxShadow: '0 0 14px rgba(225, 29, 72, 0.4)',
                    }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#e11d48', boxShadow: '0 0 8px #e11d48', animation: 'pulse 1.2s infinite' }} />
                    <span style={{ fontSize: '10px', fontWeight: 900, color: '#ffffff', letterSpacing: '0.5px' }}>LIVE</span>
                  </div>
                </div>

                {/* Center Audio Equalizer & Live Telemetry */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    backgroundColor: 'rgba(5, 5, 8, 0.7)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      NOW BROADCASTING
                    </span>

                    {/* Animated 4-Bar Sound Equalizer */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '14px' }}>
                      <span style={{ width: '3px', height: isHovered ? '14px' : '8px', backgroundColor: '#e11d48', borderRadius: '1px', transition: 'height 0.2s ease' }} />
                      <span style={{ width: '3px', height: isHovered ? '8px' : '12px', backgroundColor: '#fda4af', borderRadius: '1px', transition: 'height 0.2s ease' }} />
                      <span style={{ width: '3px', height: isHovered ? '13px' : '6px', backgroundColor: '#ffffff', borderRadius: '1px', transition: 'height 0.2s ease' }} />
                      <span style={{ width: '3px', height: isHovered ? '10px' : '14px', backgroundColor: '#e11d48', borderRadius: '1px', transition: 'height 0.2s ease' }} />
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: '13px',
                      fontWeight: 800,
                      color: '#ffffff',
                      margin: 0,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {channel.currentProgram?.title || 'Championship Match • 4K 60FPS Live'}
                  </p>
                </div>

                {/* Bottom Footer Details */}
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 900,
                        backgroundColor: '#ffffff',
                        color: '#050507',
                        padding: '2px 7px',
                        borderRadius: '4px',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {channel.resolution}
                    </span>
                    <span style={{ fontSize: '11px', color: '#d4d4d8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={12} color="#fda4af" />
                      <span>{viewerCount}k</span>
                    </span>
                  </div>

                  {/* Tune Channel Action Button */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: isHovered ? '#ffffff' : '#fda4af',
                      backgroundColor: isHovered ? '#e11d48' : 'rgba(225, 29, 72, 0.15)',
                      border: isHovered ? '1px solid #ffffff' : '1px solid rgba(225, 29, 72, 0.35)',
                      padding: '5px 12px',
                      borderRadius: '8px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Play size={12} fill={isHovered ? '#ffffff' : '#fda4af'} />
                    <span>{isHovered ? 'Tune Feed' : 'Preview'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

