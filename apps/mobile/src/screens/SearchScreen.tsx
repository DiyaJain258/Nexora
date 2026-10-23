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
        <Search size={18} color="#8B5CF6" style={{ position: 'absolute', left: '12px' }} />
        <input
          type="text"
          autoFocus
          placeholder="Search movies, series, channels..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            backgroundColor: '#111827',
            border: '1px solid #1E293B',
            borderRadius: '10px',
            padding: '12px 38px 12px 38px',
            color: '#F8FAFC',
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
              color: '#94A3B8',
              cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Results */}
      <div>
        <div style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '12px' }}>
          {query ? `Search results for "${query}"` : 'Top Searched Titles & Live Channels'}
        </div>

        {/* Live Channels Matches */}
        {filteredChannels.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#22D3EE', marginBottom: '8px' }}>
              LIVE CHANNELS ({filteredChannels.length})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredChannels.map((ch) => (
                <div
                  key={ch.id}
                  onClick={() => onPlayChannel(ch)}
                  style={{
                    backgroundColor: '#111827',
                    border: '1px solid #1E293B',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={ch.logo} alt={ch.name} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#F8FAFC' }}>{ch.name}</div>
                      <div style={{ fontSize: '11px', color: '#22D3EE' }}>{ch.currentProgram?.title || ch.category}</div>
                    </div>
                  </div>
                  <Play size={16} color="#8B5CF6" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VOD Matches */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#8B5CF6', marginBottom: '8px' }}>
            MOVIES & SERIES ({filteredVOD.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredVOD.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                style={{
                  backgroundColor: '#111827',
                  border: '1px solid #1E293B',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  style={{ width: '48px', height: '68px', borderRadius: '6px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#F8FAFC' }}>{item.title}</div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                    {item.releaseYear} • {item.genres.join(', ')}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <Star size={11} fill="#FBBF24" color="#FBBF24" />
                    <span style={{ fontSize: '11px', color: '#FBBF24', fontWeight: 700 }}>{item.rating}</span>
                    <span className="badge badge-cyan" style={{ fontSize: '9px', padding: '1px 5px', marginLeft: '6px' }}>{item.quality}</span>
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
