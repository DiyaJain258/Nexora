import React from 'react';
import { Search, Bell, Cast, Sparkles } from 'lucide-react';

interface MobileHeaderProps {
  onSearchClick: () => void;
  onProfileClick: () => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: string[];
  activeTab?: string;
  onToggleMode?: (tab: 'landing' | 'home') => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  onSearchClick,
  onProfileClick,
  activeCategory,
  onSelectCategory,
  categories,
  activeTab = 'landing',
  onToggleMode,
}) => {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 20,
      backgroundColor: 'rgba(7, 9, 18, 0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '10px 16px 8px',
    }}>
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: activeTab === 'landing' ? '4px' : '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '7px',
              background: 'linear-gradient(135deg, #E50914 0%, #B81D24 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(229, 9, 20, 0.45)',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: '15px',
            }}>
              N
            </div>
            <span style={{
              fontSize: '18px',
              fontWeight: 900,
              letterSpacing: '1px',
              color: '#FFFFFF',
            }}>
              NEX<span style={{ color: '#E50914' }}>ORA</span>
            </span>
          </div>

          {/* Dual Experience Mode Switcher */}
          {onToggleMode && (
            <div style={{
              display: 'flex',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '999px',
              padding: '2px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <button
                onClick={() => onToggleMode('landing')}
                style={{
                  border: 'none',
                  borderRadius: '999px',
                  padding: '3px 9px',
                  fontSize: '10px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'landing' ? '#E50914' : 'transparent',
                  color: activeTab === 'landing' ? '#ffffff' : '#94a3b8',
                }}
              >
                🌟 LANDING
              </button>
              <button
                onClick={() => onToggleMode('home')}
                style={{
                  border: 'none',
                  borderRadius: '999px',
                  padding: '3px 9px',
                  fontSize: '10px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  backgroundColor: activeTab !== 'landing' ? '#E50914' : 'transparent',
                  color: activeTab !== 'landing' ? '#ffffff' : '#94a3b8',
                }}
              >
                🎬 STREAM
              </button>
            </div>
          )}
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

      {/* Category Pills Slider - Only in Streaming Mode */}
      {activeTab !== 'landing' && (
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
      )}
    </div>
  );
};
