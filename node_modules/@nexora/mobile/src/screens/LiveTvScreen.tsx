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
                padding: '6px 14px',
                borderRadius: '8px',
                border: isActive ? '1px solid #E50914' : '1px solid #303030',
                backgroundColor: isActive ? 'rgba(229, 9, 20, 0.2)' : '#151515',
                color: isActive ? '#FF2B36' : '#B3B3B3',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
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
        backgroundColor: '#151515',
        border: '1px solid #303030',
      }}>
        <img
          src={selectedChannel.logo}
          alt={selectedChannel.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(5, 5, 5, 0.2) 0%, rgba(5, 5, 5, 0.95) 100%)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge badge-red">
              <span className="live-dot" /> LIVE TRANSMISSION
            </span>
            <span className="badge badge-elevated">{selectedChannel.resolution} • {selectedChannel.fps}fps</span>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#FF2B36', fontWeight: 700 }}>
              CH. {selectedChannel.channelNumber} • {selectedChannel.name}
            </div>
            <h3 style={{ margin: '4px 0', fontSize: '16px', fontWeight: 800, color: '#FFFFFF' }}>
              {selectedChannel.currentProgram?.title || selectedChannel.name}
            </h3>
            <p style={{ margin: 0, fontSize: '11px', color: '#B3B3B3' }}>
              {selectedChannel.currentProgram?.description}
            </p>

            <button
              onClick={() => onPlayChannel(selectedChannel)}
              style={{
                marginTop: '10px',
                background: 'linear-gradient(135deg, #E50914 0%, #7F0000 100%)',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(229, 9, 20, 0.4)',
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
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
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
                  backgroundColor: isSelected ? 'rgba(229, 9, 20, 0.12)' : '#151515',
                  border: isSelected ? '1px solid #E50914' : '1px solid #303030',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
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
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#E50914' }}>
                        #{ch.channelNumber}
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>
                        {ch.name}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#FF2B36', marginTop: '2px' }}>
                      {ch.currentProgram?.title || 'Continuous Airing'}
                    </div>
                    <div style={{ fontSize: '10px', color: '#B3B3B3' }}>
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
                    background: 'rgba(229, 9, 20, 0.15)',
                    border: '1px solid rgba(229, 9, 20, 0.4)',
                    borderRadius: '8px',
                    padding: '8px',
                    color: '#FF2B36',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Play size={16} fill="#FF2B36" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
