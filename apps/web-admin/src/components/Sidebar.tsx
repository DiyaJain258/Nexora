import React from 'react';
import {
  LayoutDashboard,
  Tv,
  Film,
  Layers,
  Tag,
  Calendar,
  Users,
  CreditCard,
  Bell,
  Sliders,
  LogOut,
  Sparkles,
} from 'lucide-react';

export type AdminTab =
  | 'dashboard'
  | 'live-channels'
  | 'movies-series'
  | 'seasons-episodes'
  | 'categories-genres'
  | 'epg-schedules'
  | 'users-devices'
  | 'subscription-plans'
  | 'notifications'
  | 'reports-settings';

interface SidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard & Analytics', icon: LayoutDashboard },
    { id: 'live-channels', label: 'Live TV Channels', icon: Tv, badge: '148 Live' },
    { id: 'movies-series', label: 'Movies & Series', icon: Film },
    { id: 'seasons-episodes', label: 'Seasons & Episodes', icon: Layers },
    { id: 'categories-genres', label: 'Categories & Genres', icon: Tag },
    { id: 'epg-schedules', label: 'EPG Schedules', icon: Calendar },
    { id: 'users-devices', label: 'Users & Devices', icon: Users, badge: '421K' },
    { id: 'subscription-plans', label: 'Subscription Plans', icon: CreditCard },
    { id: 'notifications', label: 'Push Notifications', icon: Bell },
    { id: 'reports-settings', label: 'Reports & Settings', icon: Sliders },
  ];

  return (
    <aside style={{
      width: '280px',
      height: '100vh',
      backgroundColor: '#060408',
      borderRight: '1px solid rgba(184, 29, 74, 0.16)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'sticky',
      top: 0,
      zIndex: 20,
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid rgba(184, 29, 74, 0.16)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'linear-gradient(180deg, rgba(139, 0, 50, 0.08) 0%, transparent 100%)',
      }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #8b0032 0%, #b81d4a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 25px rgba(139, 0, 50, 0.55)',
          border: '1px solid rgba(184, 29, 74, 0.4)',
        }}>
          <Sparkles size={22} color="#FFFFFF" />
        </div>
        <div>
          <div style={{
            fontSize: '20px',
            fontWeight: 900,
            letterSpacing: '1.5px',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #fda4af 60%, #b81d4a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            NEXORA
          </div>
          <div style={{ fontSize: '11px', color: '#A1A1AA', letterSpacing: '0.6px', fontWeight: 600 }}>
            ADMIN CONSOLE v2.6
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav style={{
        flex: 1,
        padding: '16px 12px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          color: '#fda4af',
          textTransform: 'uppercase',
          letterSpacing: '1.2px',
          padding: '8px 12px 4px',
          opacity: 0.8,
        }}>
          Management
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id as AdminTab)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '11px 14px',
                borderRadius: '10px',
                border: 'none',
                background: isActive
                  ? 'linear-gradient(90deg, rgba(139, 0, 50, 0.32) 0%, rgba(184, 29, 74, 0.1) 100%)'
                  : 'transparent',
                color: isActive ? '#FFFFFF' : '#A1A1AA',
                borderLeft: isActive ? '3px solid #b81d4a' : '3px solid transparent',
                fontSize: '14px',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isActive ? 'inset 0 0 20px rgba(139, 0, 50, 0.18)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(139, 0, 50, 0.12)';
                  e.currentTarget.style.color = '#FFFFFF';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#A1A1AA';
                }
              }}
            >
              <Icon size={18} color={isActive ? '#fda4af' : '#71717A'} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  fontSize: '10px',
                  padding: '2px 8px',
                  borderRadius: '20px',
                  backgroundColor: isActive ? 'rgba(184, 29, 74, 0.3)' : 'rgba(255, 255, 255, 0.06)',
                  color: isActive ? '#fda4af' : '#71717A',
                  border: isActive ? '1px solid rgba(184, 29, 74, 0.45)' : '1px solid rgba(255, 255, 255, 0.08)',
                  fontWeight: 700,
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Cluster Status Footer */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid rgba(184, 29, 74, 0.16)',
        backgroundColor: '#040306',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 10px #10B981',
            }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#F8FAFC' }}>
              Cluster Status
            </span>
          </div>
          <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>99.98%</span>
        </div>
        <div style={{ fontSize: '11px', color: '#71717A' }}>
          Edge Node: FRA-04 • 482.6 Gbps
        </div>
      </div>
    </aside>
  );
};
