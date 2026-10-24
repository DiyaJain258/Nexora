import React, { useState } from 'react';
import { Tag, Plus, Trash2, Edit2, Check, Tv, Film, Compass } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  type: 'livetv' | 'vod' | 'both';
  count: number;
  priority: number;
  color: string;
}

export const CategoriesView: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([
    { id: 'cat-1', name: 'Live Sports', slug: 'sports', type: 'both', count: 42, priority: 1, color: '#EF4444' },
    { id: 'cat-2', name: 'Cinema & Blockbusters', slug: 'movies', type: 'both', count: 184, priority: 2, color: '#8B5CF6' },
    { id: 'cat-3', name: 'Cyberpunk & Sci-Fi', slug: 'sci-fi', type: 'vod', count: 96, priority: 3, color: '#22D3EE' },
    { id: 'cat-4', name: '24/7 Global News', slug: 'news', type: 'livetv', count: 18, priority: 4, color: '#10B981' },
    { id: 'cat-5', name: 'Kids & Family Animation', slug: 'kids', type: 'both', count: 120, priority: 5, color: '#F59E0B' },
    { id: 'cat-6', name: 'Ultra Documentaries 4K', slug: 'documentary', type: 'both', count: 64, priority: 6, color: '#06B6D4' },
    { id: 'cat-7', name: 'Electronic & Synthwave Music', slug: 'music', type: 'livetv', count: 12, priority: 7, color: '#EC4899' },
  ]);

  const [newCatName, setNewCatName] = useState('');
  const [newCatType, setNewCatType] = useState<'livetv' | 'vod' | 'both'>('both');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;

    const newCat: CategoryItem = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/\s+/g, '-'),
      type: newCatType,
      count: 0,
      priority: categories.length + 1,
      color: '#8B5CF6',
    };

    setCategories([...categories, newCat]);
    setNewCatName('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Create bar */}
      <form
        onSubmit={handleAdd}
        style={{
          backgroundColor: '#111827',
          border: '1px solid #1E293B',
          borderRadius: '14px',
          padding: '16px 20px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: '220px' }}>
          <input
            type="text"
            placeholder="New Category or Genre Name (e.g. Psychological Thriller)..."
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#070912',
              border: '1px solid #1E293B',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#F8FAFC',
            }}
          />
        </div>

        <div>
          <select
            value={newCatType}
            onChange={(e) => setNewCatType(e.target.value as any)}
            style={{
              backgroundColor: '#070912',
              border: '1px solid #1E293B',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#F8FAFC',
            }}
          >
            <option value="both">Live TV & VOD</option>
            <option value="livetv">Live TV Only</option>
            <option value="vod">VOD Catalog Only</option>
          </select>
        </div>

        <button type="submit" className="btn-primary">
          <Plus size={16} />
          <span>Create Category</span>
        </button>
      </form>

      {/* Categories Table */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid #1E293B',
        borderRadius: '14px',
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#0B1020', borderBottom: '1px solid #1E293B', color: '#94A3B8' }}>
              <th style={{ padding: '14px 18px' }}>Priority</th>
              <th style={{ padding: '14px 18px' }}>Category Name</th>
              <th style={{ padding: '14px 18px' }}>Slug / Key</th>
              <th style={{ padding: '14px 18px' }}>Platform Scope</th>
              <th style={{ padding: '14px 18px' }}>Assigned Items</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid #1E293B' }}>
                <td style={{ padding: '14px 18px', color: '#94A3B8', fontWeight: 600 }}>#{c.priority}</td>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: c.color }} />
                    <span style={{ fontWeight: 600, color: '#F8FAFC' }}>{c.name}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 18px', color: '#64748B', fontFamily: 'JetBrains Mono, monospace' }}>
                  {c.slug}
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span className="badge badge-cyan" style={{ textTransform: 'uppercase' }}>
                    {c.type}
                  </span>
                </td>
                <td style={{ padding: '14px 18px', color: '#22D3EE', fontWeight: 600 }}>
                  {c.count} items
                </td>
                <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                  <button
                    onClick={() => setCategories(categories.filter((x) => x.id !== c.id))}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
