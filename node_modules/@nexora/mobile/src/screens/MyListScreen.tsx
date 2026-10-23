import React from 'react';
import { Bookmark, Play, Trash2, Film, Tv } from 'lucide-react';
import { ContentItem, MOCK_CONTENT } from '@nexora/shared';

interface MyListScreenProps {
  favoriteIds: string[];
  onSelectItem: (item: ContentItem) => void;
  onRemoveFavorite: (item: ContentItem) => void;
}

export const MyListScreen: React.FC<MyListScreenProps> = ({
  favoriteIds,
  onSelectItem,
  onRemoveFavorite,
}) => {
  const favoriteItems = MOCK_CONTENT.filter(
    (c) => favoriteIds.includes(c.id) || c.id === 'vod-01' || c.id === 'vod-02'
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', paddingBottom: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Bookmark size={20} color="#22D3EE" />
        <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#F8FAFC' }}>
          My Saved Watchlist
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {favoriteItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            style={{
              backgroundColor: '#111827',
              border: '1px solid #1E293B',
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
                src={item.posterUrl}
                alt={item.title}
                style={{ width: '48px', height: '68px', borderRadius: '8px', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#F8FAFC' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                  {item.duration || `${item.seasonsCount || 1} Seasons`} • {item.genres[0]}
                </div>
                <span className="badge badge-cyan" style={{ fontSize: '9px', padding: '1px 5px', marginTop: '6px' }}>
                  {item.quality}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFavorite(item);
                }}
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  padding: '8px',
                  color: '#EF4444',
                  cursor: 'pointer',
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
