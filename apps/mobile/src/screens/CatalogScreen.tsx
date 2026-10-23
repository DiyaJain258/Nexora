import React, { useState } from 'react';
import { Star, Play, Filter, Search } from 'lucide-react';
import { ContentItem, MOCK_CONTENT } from '@nexora/shared';

interface CatalogScreenProps {
  title: string;
  typeFilter?: 'movie' | 'series' | 'sports' | 'kids';
  onSelectItem: (item: ContentItem) => void;
  onPlayItem: (item: ContentItem) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  title,
  typeFilter,
  onSelectItem,
  onPlayItem,
}) => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const items = typeFilter
    ? MOCK_CONTENT.filter((c) => c.type === typeFilter)
    : MOCK_CONTENT;

  const genres = ['All', 'Sci-Fi', 'Action', 'Drama', 'Cyberpunk', 'Kids', 'Animation'];

  const filteredItems = items.filter((item) => {
    if (selectedGenre === 'All') return true;
    return item.genres.some((g) => g.toLowerCase().includes(selectedGenre.toLowerCase()));
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', paddingBottom: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#F8FAFC' }}>
          {title}
        </h2>
        <span style={{ fontSize: '12px', color: '#64748B' }}>{filteredItems.length} titles</span>
      </div>

      {/* Genre Pills */}
      <div style={{
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGenre(g)}
            style={{
              flexShrink: 0,
              padding: '5px 12px',
              borderRadius: '6px',
              border: selectedGenre === g ? '1px solid #8B5CF6' : '1px solid #1E293B',
              backgroundColor: selectedGenre === g ? 'rgba(139, 92, 246, 0.2)' : '#111827',
              color: selectedGenre === g ? '#22D3EE' : '#94A3B8',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {g}
          </button>
        ))}
      </div>

      {/* 2-Column Poster Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '14px',
      }}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            style={{
              backgroundColor: '#111827',
              border: '1px solid #1E293B',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '220px', backgroundColor: '#0B1020' }}>
              <img
                src={item.posterUrl}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span className="badge badge-cyan" style={{ position: 'absolute', top: '8px', left: '8px', fontSize: '9px', padding: '1px 6px' }}>
                {item.quality}
              </span>
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: 700,
                color: '#FBBF24',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
              }}>
                <Star size={10} fill="#FBBF24" color="#FBBF24" /> {item.rating}
              </div>
            </div>

            <div style={{ padding: '10px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                {item.releaseYear} • {item.genres[0]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
