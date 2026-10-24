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
                border: isActive ? '1px solid #8B5CF6' : '1px solid #1E293B',
                backgroundColor: isActive ? 'rgba(139, 92, 246, 0.25)' : '#111827',
                color: isActive ? '#22D3EE' : '#94A3B8',
                fontSize: '12px',
                fontWeight: 600,
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
            <div style={{ fontSize: '11px', color: '#22D3EE', fontWeight: 700 }}>
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
                background: 'linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 14px',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
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
                  backgroundColor: isSelected ? 'rgba(139, 92, 246, 0.15)' : '#111827',
                  border: isSelected ? '1px solid #8B5CF6' : '1px solid #1E293B',
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
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#8B5CF6' }}>
                        #{ch.channelNumber}
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC' }}>
                        {ch.name}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#22D3EE', marginTop: '2px' }}>
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
                    background: 'rgba(34, 211, 238, 0.15)',
                    border: '1px solid rgba(34, 211, 238, 0.3)',
                    borderRadius: '8px',
                    padding: '8px',
                    color: '#22D3EE',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Play size={16} fill="#22D3EE" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
