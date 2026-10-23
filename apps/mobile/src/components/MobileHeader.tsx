import React from 'react';
import { Search, Bell, Cast, Sparkles } from 'lucide-react';

interface MobileHeaderProps {
  onSearchClick: () => void;
  onProfileClick: () => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: string[];
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  onSearchClick,
  onProfileClick,
  activeCategory,
  onSelectCategory,
  categories,
}) => {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 20,
      backgroundColor: 'rgba(5, 5, 5, 0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid #303030',
      padding: '12px 16px 8px',
    }}>
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #E50914 0%, #7F0000 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #E50914',
          }}>
            <Sparkles size={16} color="#FFFFFF" />
          </div>
          <span style={{
            fontSize: '20px',
            fontWeight: 900,
            letterSpacing: '1.5px',
            color: '#E50914',
          }}>
            NEXORA
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => alert('AirPlay / Cast scan: Discovered Living Room 4K Apple TV')}
            style={{ background: 'none', border: 'none', color: '#B3B3B3', cursor: 'pointer', padding: 0 }}
          >
            <Cast size={19} />
          </button>
          <button
            onClick={onSearchClick}
            style={{ background: 'none', border: 'none', color: '#B3B3B3', cursor: 'pointer', padding: 0 }}
          >
            <Search size={19} />
          </button>
          <button
            onClick={onProfileClick}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: '2px solid #E50914',
              overflow: 'hidden',
            }}>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                alt="Avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '4px',
        scrollbarWidth: 'none',
      }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              style={{
                flexShrink: 0,
                padding: '5px 12px',
                borderRadius: '20px',
                border: isActive ? '1px solid #E50914' : '1px solid #303030',
                backgroundColor: isActive ? 'rgba(229, 9, 20, 0.25)' : '#151515',
                color: isActive ? '#FFFFFF' : '#B3B3B3',
                fontSize: '12px',
                fontWeight: isActive ? 800 : 500,
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
