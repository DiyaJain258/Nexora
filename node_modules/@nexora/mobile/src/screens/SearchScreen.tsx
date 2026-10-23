import React, { useState } from 'react';
import { Search, X, Star, Play } from 'lucide-react';
import { ContentItem, Channel, MOCK_CONTENT, MOCK_CHANNELS } from '@nexora/shared';

interface SearchScreenProps {
  onSelectItem: (item: ContentItem) => void;
  onPlayChannel: (channel: Channel) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ onSelectItem, onPlayChannel }) => {
  const [query, setQuery] = useState('');

  const filteredVOD = MOCK_CONTENT.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.genres.some((g) => g.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredChannels = MOCK_CHANNELS.filter(
    (ch) =>
      ch.name.toLowerCase().includes(query.toLowerCase()) ||
      ch.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', paddingBottom: '30px' }}>
      {/* Search Input Bar */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}>
        <Search size={18} color="#E50914" style={{ position: 'absolute', left: '12px' }} />
        <input
          type="text"
          autoFocus
          placeholder="Search movies, series, channels..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            backgroundColor: '#151515',
            border: '1px solid #303030',
            borderRadius: '10px',
            padding: '12px 38px 12px 38px',
            color: '#FFFFFF',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{
              position: 'absolute',
              right: '12px',
              background: 'none',
              border: 'none',
              color: '#B3B3B3',
              cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Results */}
      <div>
        <div style={{ fontSize: '13px', color: '#B3B3B3', marginBottom: '12px' }}>
          {query ? `Search results for "${query}"` : 'Top Searched Titles & Live Channels'}
        </div>

        {/* Live Channels Matches */}
        {filteredChannels.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#FF2B36', marginBottom: '8px', letterSpacing: '0.04em' }}>
              LIVE CHANNELS ({filteredChannels.length})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredChannels.map((ch) => (
                <div
                  key={ch.id}
                  onClick={() => onPlayChannel(ch)}
                  style={{
                    backgroundColor: '#151515',
                    border: '1px solid #303030',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={ch.logo} alt={ch.name} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>{ch.name}</div>
                      <div style={{ fontSize: '11px', color: '#FF2B36' }}>{ch.currentProgram?.title || ch.category}</div>
                    </div>
                  </div>
                  <Play size={16} color="#E50914" fill="#E50914" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VOD Matches */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#E50914', marginBottom: '8px', letterSpacing: '0.04em' }}>
            MOVIES & SERIES ({filteredVOD.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredVOD.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                style={{
                  backgroundColor: '#151515',
                  border: '1px solid #303030',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  style={{ width: '48px', height: '68px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #303030' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>{item.title}</div>
                  <div style={{ fontSize: '11px', color: '#B3B3B3', marginTop: '2px' }}>
                    {item.releaseYear} • {item.genres.join(', ')}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <Star size={11} fill="#FBBF24" color="#FBBF24" />
                      <span style={{ fontSize: '11px', color: '#FBBF24', fontWeight: 700 }}>{item.rating}</span>
                    </div>
                    <span className="badge badge-red" style={{ fontSize: '9px', padding: '1px 5px' }}>{item.quality}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
