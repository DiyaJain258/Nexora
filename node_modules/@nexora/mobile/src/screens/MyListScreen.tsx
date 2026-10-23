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
        <Bookmark size={20} color="#E50914" />
        <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
          My Saved Watchlist
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {favoriteItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            style={{
              backgroundColor: '#151515',
              border: '1px solid #303030',
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
                src={item.posterUrl}
                alt={item.title}
                style={{ width: '48px', height: '68px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #303030' }}
              />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '11px', color: '#B3B3B3', marginTop: '2px' }}>
                  {item.duration || `${item.seasonsCount || 1} Seasons`} • {item.genres[0]}
                </div>
                <span className="badge badge-red" style={{ fontSize: '9px', padding: '1px 6px', marginTop: '6px' }}>
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
                  background: 'rgba(229, 9, 20, 0.15)',
                  border: '1px solid rgba(229, 9, 20, 0.3)',
                  borderRadius: '8px',
                  padding: '8px',
                  color: '#FF2B36',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
