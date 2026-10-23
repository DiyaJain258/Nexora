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
      backgroundColor: 'rgba(7, 9, 18, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      padding: '12px 16px 8px',
    }}>
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Sparkles size={16} color="#FFFFFF" />
          </div>
          <span style={{
            fontSize: '18px',
            fontWeight: 800,
            letterSpacing: '1px',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #22D3EE 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            NEXORA
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => alert('Chromecast / AirPlay scan initialized... Discovered Living Room Apple TV 4K')}
            style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
          >
            <Cast size={19} />
          </button>
          <button
            onClick={onSearchClick}
            style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
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
              border: '2px solid #8B5CF6',
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
                border: isActive ? '1px solid #8B5CF6' : '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: isActive ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                color: isActive ? '#22D3EE' : '#94A3B8',
                fontSize: '12px',
                fontWeight: isActive ? 700 : 500,
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
