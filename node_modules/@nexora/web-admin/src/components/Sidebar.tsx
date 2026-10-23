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
  QrCode,
  ShieldCheck,
} from 'lucide-react';

export type AdminTab =
  | 'dashboard'
  | 'live-channels'
  | 'movies-series'
  | 'seasons-episodes'
  | 'categories-genres'
  | 'epg-schedules'
  | 'users-devices'
  | 'device-activations'
  | 'subscription-plans'
  | 'notifications'
  | 'roles-permissions'
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
    { id: 'device-activations', label: 'TV Device Activations', icon: QrCode, badge: 'New' },
    { id: 'subscription-plans', label: 'Subscription Plans', icon: CreditCard },
    { id: 'notifications', label: 'Push Notifications', icon: Bell },
    { id: 'roles-permissions', label: 'Roles & Permissions', icon: ShieldCheck },
    { id: 'reports-settings', label: 'Reports & Settings', icon: Sliders },
  ];

  return (
    <aside style={{
      width: '280px',
      height: '100vh',
      backgroundColor: '#0D0D0D',
      borderRight: '1px solid #303030',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'sticky',
      top: 0,
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid #303030',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #E50914 0%, #7F0000 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(229, 9, 20, 0.45)',
          border: '1px solid #E50914',
        }}>
          <Sparkles size={22} color="#FFFFFF" />
        </div>
        <div>
          <div style={{
            fontSize: '22px',
            fontWeight: 900,
            letterSpacing: '1.5px',
            color: '#E50914',
          }}>
            NEXORA
          </div>
          <div style={{ fontSize: '11px', color: '#B3B3B3', letterSpacing: '0.5px' }}>
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
          fontWeight: 800,
          color: '#737373',
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
                borderRadius: '8px',
                border: 'none',
                background: isActive ? 'linear-gradient(90deg, rgba(229, 9, 20, 0.18) 0%, rgba(229, 9, 20, 0.05) 100%)' : 'transparent',
                color: isActive ? '#FFFFFF' : '#B3B3B3',
                borderLeft: isActive ? '4px solid #E50914' : '4px solid transparent',
                fontSize: '14px',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.color = '#FFFFFF';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#B3B3B3';
                }
              }}
            >
              <Icon size={18} color={isActive ? '#E50914' : '#B3B3B3'} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  fontSize: '10px',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  backgroundColor: isActive ? 'rgba(229, 9, 20, 0.25)' : 'rgba(255, 255, 255, 0.06)',
                  color: isActive ? '#FF2B36' : '#B3B3B3',
                  fontWeight: 700,
                  border: isActive ? '1px solid rgba(229, 9, 20, 0.4)' : '1px solid #303030',
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
        borderTop: '1px solid #303030',
        backgroundColor: '#050505',
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
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#FFFFFF' }}>
              Cluster Status
            </span>
          </div>
          <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>99.98%</span>
        </div>
        <div style={{ fontSize: '11px', color: '#737373' }}>
          Edge Node: FRA-04 • 482.6 Gbps
        </div>
      </div>
    </aside>
  );
};
