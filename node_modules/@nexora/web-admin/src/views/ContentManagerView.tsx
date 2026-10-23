import React, { useState } from 'react';
import {
  Film,
  Plus,
  Search,
  Filter,
  Star,
  Trash2,
  Edit,
  Eye,
  X,
  Clapperboard,
  Sparkles,
} from 'lucide-react';
import { ContentItem, MOCK_CONTENT } from '@nexora/shared';

export const ContentManagerView: React.FC = () => {
  const [contentList, setContentList] = useState<ContentItem[]>(MOCK_CONTENT);
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    title: '',
    type: 'movie' as 'movie' | 'series' | 'sports' | 'kids',
    rating: 8.8,
    releaseYear: 2026,
    duration: '2h 10m',
    ageRating: '16+' as 'ALL' | 'PG-13' | '16+' | '18+',
    synopsis: '',
    genres: 'Sci-Fi, Action',
    quality: '4K HDR' as '4K HDR' | 'FHD' | 'HD',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  });

  const filteredContent = contentList.filter((item) => {
    const matchesType = activeTypeFilter === 'all' || item.type === activeTypeFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title) return;

    const created: ContentItem = {
      id: `vod-${Date.now()}`,
      title: newItem.title,
      type: newItem.type,
      rating: Number(newItem.rating),
      releaseYear: Number(newItem.releaseYear),
      duration: newItem.duration,
      ageRating: newItem.ageRating,
      synopsis: newItem.synopsis || 'Premium digital release on NEXORA platform.',
      genres: newItem.genres.split(',').map((g) => g.trim()),
      quality: newItem.quality,
      backdropUrl: newItem.backdropUrl,
      posterUrl: newItem.posterUrl,
      streamUrl: newItem.streamUrl,
      matchScore: 95,
      isFeatured: false,
      isTrending: true,
    };

    setContentList([created, ...contentList]);
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this title from catalog?')) {
      setContentList(contentList.filter((c) => c.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Control Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        backgroundColor: '#111827',
        border: '1px solid #1E293B',
        borderRadius: '14px',
        padding: '16px 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={16} color="#64748B" style={{ position: 'absolute', left: '12px' }} />
            <input
              type="text"
              placeholder="Search movies, series, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                backgroundColor: '#070912',
                border: '1px solid #1E293B',
                borderRadius: '8px',
                padding: '8px 14px 8px 36px',
                color: '#F8FAFC',
                fontSize: '13px',
                width: '240px',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['all', 'movie', 'series', 'sports', 'kids'].map((type) => (
              <button
                key={type}
                onClick={() => setActiveTypeFilter(type)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  border: activeTypeFilter === type ? '1px solid #8B5CF6' : '1px solid #1E293B',
                  backgroundColor: activeTypeFilter === type ? 'rgba(139, 92, 246, 0.2)' : '#070912',
                  color: activeTypeFilter === type ? '#22D3EE' : '#94A3B8',
                  cursor: 'pointer',
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <button className="btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={16} />
          <span>Add New Title</span>
        </button>
      </div>

      {/* Grid of Titles */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
      }}>
        {filteredContent.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#111827',
              border: '1px solid #1E293B',
              borderRadius: '14px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, border-color 0.2s',
            }}
          >
            {/* Backdrop thumbnail */}
            <div style={{ position: 'relative', height: '160px', backgroundColor: '#0B1020' }}>
              <img
                src={item.backdropUrl}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                display: 'flex',
                gap: '6px',
              }}>
                <span className={`badge ${item.quality === '4K HDR' ? 'badge-cyan' : 'badge-violet'}`}>
                  {item.quality}
                </span>
                <span className="badge badge-violet" style={{ textTransform: 'capitalize' }}>
                  {item.type}
                </span>
              </div>

              <div style={{
                position: 'absolute',
                bottom: '8px',
                right: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: 'rgba(7, 9, 18, 0.8)',
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#FBBF24',
              }}>
                <Star size={13} fill="#FBBF24" color="#FBBF24" />
                <span>{item.rating}</span>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 700, color: '#F8FAFC' }}>
                {item.title}
              </h4>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>
                {item.releaseYear} • {item.duration} • <span style={{ color: '#C4B5FD' }}>{item.ageRating}</span>
              </div>

              <p style={{
                fontSize: '12px',
                color: '#64748B',
                lineHeight: '1.5',
                margin: '0 0 12px 0',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {item.synopsis}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '14px' }}>
                {item.genres.map((g) => (
                  <span
                    key={g}
                    style={{
                      fontSize: '11px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      color: '#94A3B8',
                    }}
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Actions Footer */}
              <div style={{
                marginTop: 'auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: '1px solid #1E293B',
              }}>
                <span style={{ fontSize: '11px', color: '#22D3EE', fontWeight: 600 }}>
                  {item.matchScore}% Match
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#EF4444',
                      padding: '6px 8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(7, 9, 18, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px',
        }}>
          <div style={{
            backgroundColor: '#111827',
            border: '1px solid #1E293B',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}>
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid #1E293B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#0B1020',
            }}>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#F8FAFC' }}>
                Add New Movie / Series
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Blade of Titan"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: '#070912',
                    border: '1px solid #1E293B',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#F8FAFC',
                    marginTop: '6px',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>Type</label>
                  <select
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value as any })}
                    style={{
                      width: '100%',
                      backgroundColor: '#070912',
                      border: '1px solid #1E293B',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#F8FAFC',
                      marginTop: '6px',
                    }}
                  >
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                    <option value="sports">Sports</option>
                    <option value="kids">Kids</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>Year</label>
                  <input
                    type="number"
                    value={newItem.releaseYear}
                    onChange={(e) => setNewItem({ ...newItem, releaseYear: Number(e.target.value) })}
                    style={{
                      width: '100%',
                      backgroundColor: '#070912',
                      border: '1px solid #1E293B',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#F8FAFC',
                      marginTop: '6px',
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>Quality</label>
                  <select
                    value={newItem.quality}
                    onChange={(e) => setNewItem({ ...newItem, quality: e.target.value as any })}
                    style={{
                      width: '100%',
                      backgroundColor: '#070912',
                      border: '1px solid #1E293B',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#F8FAFC',
                      marginTop: '6px',
                    }}
                  >
                    <option value="4K HDR">4K HDR</option>
                    <option value="FHD">1080p FHD</option>
                    <option value="HD">720p HD</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>Genres (comma-separated)</label>
                <input
                  type="text"
                  placeholder="Action, Sci-Fi, Thriller"
                  value={newItem.genres}
                  onChange={(e) => setNewItem({ ...newItem, genres: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: '#070912',
                    border: '1px solid #1E293B',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#F8FAFC',
                    marginTop: '6px',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>Synopsis</label>
                <textarea
                  rows={3}
                  value={newItem.synopsis}
                  onChange={(e) => setNewItem({ ...newItem, synopsis: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: '#070912',
                    border: '1px solid #1E293B',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#F8FAFC',
                    marginTop: '6px',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button type="button" className="btn-secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Add Title</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
