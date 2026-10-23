import React from 'react';
import {
  Home,
  Tv,
  Film,
  Layers,
  Activity,
  Smile,
  Search,
  Settings,
  Sparkles,
} from 'lucide-react';

export type TvTab =
  | 'home'
  | 'epg'
  | 'movies'
  | 'series'
  | 'sports'
  | 'kids'
  | 'search'
  | 'settings';

interface TvSidebarDockProps {
  activeTab: TvTab;
  onTabChange: (tab: TvTab) => void;
  isDockFocused: boolean;
  focusedMenuIndex: number;
}

export const TvSidebarDock: React.FC<TvSidebarDockProps> = ({
  activeTab,
  onTabChange,
  isDockFocused,
  focusedMenuIndex,
}) => {
  const menuItems: { id: TvTab; label: string; icon: any }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'epg', label: 'Live TV Guide', icon: Tv },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'series', label: 'Series', icon: Layers },
    { id: 'sports', label: 'Sports Arena', icon: Activity },
    { id: 'kids', label: 'Kids Zone', icon: Smile },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div
      style={{
        width: isDockFocused ? '240px' : '76px',
        height: '100vh',
        backgroundColor: 'rgba(11, 16, 32, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 40,
        transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
        boxShadow: isDockFocused ? '10px 0 30px rgba(0,0,0,0.8)' : 'none',
      }}
    >
      {/* Brand Icon */}
      <div style={{
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: '14px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)',
        }}>
          <Sparkles size={18} color="#FFFFFF" />
        </div>
        {isDockFocused && (
          <div style={{
            fontSize: '18px',
            fontWeight: 800,
            letterSpacing: '1px',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #22D3EE 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            whiteSpace: 'nowrap',
          }}>
            NEXORA TV
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div style={{ flex: 1, padding: '16px 10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isSelected = activeTab === item.id;
          const isHighlighted = isDockFocused && focusedMenuIndex === index;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: 'none',
                background: isHighlighted
                  ? 'linear-gradient(90deg, rgba(139, 92, 246, 0.35) 0%, rgba(34, 211, 238, 0.15) 100%)'
                  : isSelected
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'transparent',
                color: isHighlighted ? '#22D3EE' : isSelected ? '#F8FAFC' : '#94A3B8',
                borderLeft: isHighlighted ? '4px solid #22D3EE' : isSelected ? '4px solid #8B5CF6' : '4px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease',
              }}
            >
              <Icon size={22} color={isHighlighted ? '#22D3EE' : isSelected ? '#8B5CF6' : '#94A3B8'} style={{ flexShrink: 0 }} />
              {isDockFocused && (
                <span style={{ fontSize: '14px', fontWeight: isHighlighted || isSelected ? 700 : 500, whiteSpace: 'nowrap' }}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 10-foot TV hint */}
      {isDockFocused && (
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '11px', color: '#64748B' }}>
          <div>Android TV 14 / Google TV</div>
          <div style={{ color: '#22D3EE', marginTop: '2px' }}>Press Right to Enter UI</div>
        </div>
      )}
    </div>
  );
};
