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
      backgroundColor: '#0B1020',
      borderRight: '1px solid #1E293B',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'sticky',
      top: 0,
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid #1E293B',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.45)',
        }}>
          <Sparkles size={22} color="#FFFFFF" />
        </div>
        <div>
          <div style={{
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '1px',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #22D3EE 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            NEXORA
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8', letterSpacing: '0.5px' }}>
            ADMIN CONSOLE v2.4
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
          color: '#64748B',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          padding: '8px 12px 4px',
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
                background: isActive ? 'linear-gradient(90deg, rgba(139, 92, 246, 0.18) 0%, rgba(34, 211, 238, 0.08) 100%)' : 'transparent',
                color: isActive ? '#22D3EE' : '#94A3B8',
                borderLeft: isActive ? '3px solid #22D3EE' : '3px solid transparent',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.color = '#F8FAFC';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#94A3B8';
                }
              }}
            >
              <Icon size={18} color={isActive ? '#22D3EE' : '#94A3B8'} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  fontSize: '10px',
                  padding: '2px 7px',
                  borderRadius: '20px',
                  backgroundColor: isActive ? 'rgba(34, 211, 238, 0.2)' : 'rgba(139, 92, 246, 0.15)',
                  color: isActive ? '#22D3EE' : '#A78BFA',
                  fontWeight: 600,
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
        borderTop: '1px solid #1E293B',
        backgroundColor: '#070912',
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
              boxShadow: '0 0 8px #10B981',
            }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#F8FAFC' }}>
              Cluster Status
            </span>
          </div>
          <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>99.98%</span>
        </div>
        <div style={{ fontSize: '11px', color: '#64748B' }}>
          Edge Node: FRA-04 • 482.6 Gbps
        </div>
      </div>
    </aside>
  );
};
