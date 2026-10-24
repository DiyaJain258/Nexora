import React, { useState } from 'react';
import { Play, Radio, Calendar, Star, Clock, ChevronRight, Check } from 'lucide-react';
import { Channel, MOCK_CHANNELS } from '@nexora/shared';

interface LiveTvScreenProps {
  onPlayChannel: (channel: Channel) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const LiveTvScreen: React.FC<LiveTvScreenProps> = ({
  onPlayChannel,
  favorites,
  onToggleFavorite,
}) => {
  const [channels] = useState<Channel[]>(MOCK_CHANNELS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedChannel, setSelectedChannel] = useState<Channel>(MOCK_CHANNELS[0]);

  const categories = ['All', 'Movies', 'Sports', 'News', 'Documentary', 'Kids', 'Music'];

  const filteredChannels = channels.filter((c) =>
    selectedCategory === 'All' ? true : c.category === selectedCategory
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', paddingBottom: '30px' }}>
      {/* Category Pills */}
      <div style={{
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        paddingBottom: '2px',
      }}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                flexShrink: 0,
                padding: '6px 12px',
                borderRadius: '8px',
                border: isActive ? '1px solid #800020' : '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: isActive ? 'rgba(128, 0, 32, 0.45)' : 'rgba(255, 255, 255, 0.05)',
                color: isActive ? '#FFFFFF' : '#A1A1AA',
                fontSize: '12px',
                fontWeight: isActive ? 800 : 600,
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Live Preview Card */}
      <div style={{
        position: 'relative',
        height: '190px',
        borderRadius: '14px',
        overflow: 'hidden',
        backgroundColor: '#111827',
        border: '1px solid #1E293B',
      }}>
        <img
          src={selectedChannel.logo}
          alt={selectedChannel.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(7, 9, 18, 0.2) 0%, rgba(7, 9, 18, 0.9) 100%)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge badge-danger">
              <span className="live-dot" /> LIVE TRANSMISSION
            </span>
            <span className="badge badge-cyan">{selectedChannel.resolution} • {selectedChannel.fps}fps</span>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#FF6685', fontWeight: 700 }}>
              CH. {selectedChannel.channelNumber} • {selectedChannel.name}
            </div>
            <h3 style={{ margin: '4px 0', fontSize: '16px', fontWeight: 800, color: '#F8FAFC' }}>
              {selectedChannel.currentProgram?.title || selectedChannel.name}
            </h3>
            <p style={{ margin: 0, fontSize: '11px', color: '#94A3B8' }}>
              {selectedChannel.currentProgram?.description}
            </p>

            <button
              onClick={() => onPlayChannel(selectedChannel)}
              style={{
                marginTop: '10px',
                background: '#800020',
                border: '1px solid #990024',
                borderRadius: '8px',
                padding: '8px 16px',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: '0 0 14px rgba(128, 0, 32, 0.6)',
              }}
            >
              <Play size={14} fill="#FFFFFF" />
              <span>Watch Fullscreen</span>
            </button>
          </div>
        </div>
      </div>

      {/* Channels & EPG List */}
      <div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#F8FAFC', marginBottom: '10px' }}>
          Electronic Program Guide ({filteredChannels.length} Channels)
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filteredChannels.map((ch) => {
            const isSelected = selectedChannel.id === ch.id;
            return (
              <div
                key={ch.id}
                onClick={() => setSelectedChannel(ch)}
                style={{
                  backgroundColor: isSelected ? 'rgba(128, 0, 32, 0.25)' : '#0F0F12',
                  border: isSelected ? '1px solid #800020' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={ch.logo}
                    alt={ch.name}
                    style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#B3002D' }}>
                        #{ch.channelNumber}
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC' }}>
                        {ch.name}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#FF6685', marginTop: '2px' }}>
                      {ch.currentProgram?.title || 'Continuous Airing'}
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748B' }}>
                      {ch.currentProgram ? `${ch.currentProgram.startTime} - ${ch.currentProgram.endTime}` : '24/7'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayChannel(ch);
                  }}
                  style={{
                    background: 'rgba(128, 0, 32, 0.3)',
                    border: '1px solid #800020',
                    borderRadius: '8px',
                    padding: '8px',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Play size={16} fill="#FFFFFF" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
