import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Crown,
  Tv,
  Smartphone,
  Monitor,
  ShieldCheck,
  Sparkles,
  LogOut,
  CheckCircle2,
  Copy,
  Check,
  Film,
  Zap,
  Volume2,
  Layers,
  ChevronRight,
  Bookmark,
  Trash2,
  Play,
  Star,
} from 'lucide-react';
import { MOCK_CONTENT, ContentItem } from '@nexora/shared';
import { UserSession } from '../App';

interface SubscriberProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: UserSession | null;
  onLogout: () => void;
  onBrowseMovies?: () => void;
  watchlistIds?: string[];
  onRemoveFromWatchlist?: (id: string) => void;
  onPlayMovie?: (item: ContentItem) => void;
}

export const SubscriberProfileModal: React.FC<SubscriberProfileModalProps> = ({
  isOpen,
  onClose,
  session,
  onLogout,
  onBrowseMovies,
  watchlistIds = [],
  onRemoveFromWatchlist,
  onPlayMovie,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'devices' | 'settings' | 'watchlist'>('overview');
  const [copiedCode, setCopiedCode] = useState(false);
  const tvPairingCode = 'NEX-8821';

  // Watchlisted movie items
  const watchlistedItems = MOCK_CONTENT.filter((item) => watchlistIds.includes(item.id));


  if (!isOpen || !session) return null;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(tvPairingCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const devicesList = [
    {
      id: 'dev-1',
      name: 'Samsung Neo QLED 8K',
      location: 'Living Room TV',
      type: 'tv',
      icon: Tv,
      status: 'Streaming 4K HDR',
      ip: '192.168.1.104',
      isPrimary: true,
    },
    {
      id: 'dev-2',
      name: 'Apple TV 4K (Gen 3)',
      location: 'Master Bedroom',
      type: 'tv',
      icon: Tv,
      status: 'Standby • Ready',
      ip: '192.168.1.118',
      isPrimary: false,
    },
    {
      id: 'dev-3',
      name: 'iPhone 15 Pro Max',
      location: 'Mobile App',
      type: 'mobile',
      icon: Smartphone,
      status: 'Active Now',
      ip: '5G Cellular',
      isPrimary: false,
    },
  ];

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
        }}
      >
        {/* Dark Backdrop with Velvet Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(4, 3, 6, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          data-lenis-prevent="true"
          className="modal-custom-scrollbar"
          onWheel={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '620px',
            maxHeight: '90vh',
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            backgroundColor: '#0a0710',
            border: '1.5px solid rgba(225, 29, 72, 0.4)',
            borderRadius: '26px',
            boxShadow:
              '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 50px rgba(225, 29, 72, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
            color: '#f8fafc',
            zIndex: 10,
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: '24px 28px 18px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background:
                'linear-gradient(180deg, rgba(225, 29, 72, 0.12) 0%, rgba(10, 7, 16, 0.5) 100%)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #e11d48 0%, #881337 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(225, 29, 72, 0.45)',
                  border: '1.5px solid rgba(255, 255, 255, 0.25)',
                }}
              >
                <Crown size={26} color="#ffffff" />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                    {session.name || 'VIP Subscriber'}
                  </h3>
                  <span
                    style={{
                      background: 'rgba(16, 185, 129, 0.18)',
                      color: '#34d399',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#10b981',
                        boxShadow: '0 0 8px #10b981',
                      }}
                    />
                    VIP ACTIVE
                  </span>
                </div>
                <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#a1a1aa' }}>
                  {session.email || 'subscriber@nexora.tv'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(225, 29, 72, 0.2)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.color = '#cbd5e1';
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Sub-Tabs */}
          <div
            style={{
              display: 'flex',
              padding: '8px 24px 0',
              gap: '8px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            {[
              { id: 'overview', label: 'Subscription Plan' },
              { id: 'watchlist', label: `My Watchlist (${watchlistedItems.length})` },
              { id: 'devices', label: 'Linked TVs & Devices' },
              { id: 'settings', label: 'Playback & 4K' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: '10px 16px',
                    fontSize: '13px',
                    fontWeight: 700,
                    background: 'transparent',
                    border: 'none',
                    borderBottom: isActive ? '2px solid #e11d48' : '2px solid transparent',
                    color: isActive ? '#ffffff' : '#71717a',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab 1: Subscription Overview */}
          {activeTab === 'overview' && (
            <div style={{ padding: '24px 28px' }}>
              {/* Active Plan Card */}
              <div
                style={{
                  background:
                    'linear-gradient(135deg, rgba(225, 29, 72, 0.22) 0%, rgba(136, 19, 55, 0.12) 100%), rgba(18, 12, 26, 0.8)',
                  border: '1.5px solid rgba(225, 29, 72, 0.5)',
                  borderRadius: '20px',
                  padding: '22px',
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '14px',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 900,
                        color: '#fda4af',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                      }}
                    >
                      CURRENT SUBSCRIPTION
                    </span>
                    <h4 style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff', margin: '4px 0' }}>
                      {session.plan || 'NEXORA 4K ULTRA VIP'}
                    </h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#e2e8f0' }}>
                      Annual Pass • Renews October 24, 2027
                    </p>
                  </div>

                  <span
                    style={{
                      background: 'rgba(255, 255, 255, 0.12)',
                      backdropFilter: 'blur(10px)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 900,
                    }}
                  >
                    5 SCREENS
                  </span>
                </div>

                {/* Features List */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {[
                    '4K HDR, Dolby Vision & 60FPS',
                    'Dolby Atmos 7.1 TrueHD Passthrough',
                    '1,400+ Live Channels with EPG',
                    '15,000+ Movies & On-Demand Series',
                    'Instant Smart TV 1-Tap Pairing',
                    'Zero-Buffering Global Edge CDN',
                  ].map((feat, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={14} color="#fda4af" />
                      <span style={{ fontSize: '12.5px', color: '#f1f5f9', fontWeight: 600 }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instant Smart TV 6-Digit Pairing Widget */}
              <div
                style={{
                  backgroundColor: 'rgba(16, 12, 22, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '18px',
                  padding: '20px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div>
                    <h5 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
                      Smart TV Instant Pairing Code
                    </h5>
                    <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#94a3b8' }}>
                      Launch NEXORA on your TV and type this code to sign in instantly without password.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#050308',
                    border: '1px solid rgba(225, 29, 72, 0.4)',
                    borderRadius: '12px',
                    padding: '12px 18px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '22px',
                      fontWeight: 900,
                      letterSpacing: '4px',
                      color: '#ffffff',
                    }}
                  >
                    {tvPairingCode}
                  </span>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    style={{
                      background: copiedCode ? '#10b981' : 'rgba(225, 29, 72, 0.25)',
                      color: '#ffffff',
                      border: '1px solid rgba(225, 29, 72, 0.45)',
                      borderRadius: '8px',
                      padding: '6px 14px',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s',
                    }}
                  >
                    {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onBrowseMovies) onBrowseMovies();
                  }}
                  className="btn-primary-glow"
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '12px',
                    fontSize: '13.5px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <Film size={16} />
                  <span>Start Watching 4K Cinema</span>
                </button>

                <button
                  type="button"
                  onClick={onLogout}
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.14)',
                    color: '#f87171',
                    border: '1px solid rgba(239, 68, 68, 0.35)',
                    borderRadius: '12px',
                    padding: '12px 20px',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ef4444';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.14)';
                    e.currentTarget.style.color = '#f87171';
                  }}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Linked Devices */}
          {activeTab === 'devices' && (
            <div style={{ padding: '24px 28px' }}>
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                  Connected Screens ({devicesList.length} / 5 Active)
                </h4>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>
                  Manage where your NEXORA account is streaming in 4K HDR.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {devicesList.map((dev) => {
                  const Icon = dev.icon;
                  return (
                    <div
                      key={dev.id}
                      style={{
                        backgroundColor: 'rgba(16, 12, 22, 0.85)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '12px',
                            backgroundColor: 'rgba(225, 29, 72, 0.18)',
                            border: '1px solid rgba(225, 29, 72, 0.35)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Icon size={20} color="#fda4af" />
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h5 style={{ margin: 0, fontSize: '14.5px', fontWeight: 800, color: '#ffffff' }}>
                              {dev.name}
                            </h5>
                            {dev.isPrimary && (
                              <span
                                style={{
                                  backgroundColor: 'rgba(225, 29, 72, 0.2)',
                                  color: '#fda4af',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  fontSize: '10px',
                                  fontWeight: 800,
                                }}
                              >
                                PRIMARY
                              </span>
                            )}
                          </div>
                          <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#71717a' }}>
                            {dev.location} • {dev.ip}
                          </p>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 800 }}>
                          {dev.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add New TV Box */}
              <div
                style={{
                  marginTop: '18px',
                  padding: '16px 20px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(225, 29, 72, 0.08)',
                  border: '1px dashed rgba(225, 29, 72, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Zap size={18} color="#fda4af" />
                  <span style={{ fontSize: '13px', color: '#e2e8f0', fontWeight: 700 }}>
                    Want to connect another Living Room TV?
                  </span>
                </div>
                <span style={{ fontSize: '12px', color: '#fda4af', fontWeight: 800 }}>
                  Use code: {tvPairingCode}
                </span>
              </div>
            </div>
          )}

          {/* Tab 3: Playback & Settings */}
          {activeTab === 'settings' && (
            <div style={{ padding: '24px 28px' }}>
              <h4 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                4K UHD Playback Preferences
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div
                  style={{
                    backgroundColor: 'rgba(16, 12, 22, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Film size={18} color="#fda4af" />
                    <div>
                      <h5 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>
                        Max Video Streaming Quality
                      </h5>
                      <span style={{ fontSize: '12px', color: '#71717a' }}>4K UHD HEVC @ 60FPS</span>
                    </div>
                  </div>
                  <span style={{ color: '#10b981', fontSize: '12px', fontWeight: 800 }}>ENABLED</span>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(16, 12, 22, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Volume2 size={18} color="#fda4af" />
                    <div>
                      <h5 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>
                        Dolby Atmos 7.1 Passthrough
                      </h5>
                      <span style={{ fontSize: '12px', color: '#71717a' }}>Bitstream output to Soundbar / Receiver</span>
                    </div>
                  </div>
                  <span style={{ color: '#10b981', fontSize: '12px', fontWeight: 800 }}>ACTIVE</span>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(16, 12, 22, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Layers size={18} color="#fda4af" />
                    <div>
                      <h5 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>
                        Subtitles & Audio Tracks
                      </h5>
                      <span style={{ fontSize: '12px', color: '#71717a' }}>Default: English [Original] + CC</span>
                    </div>
                  </div>
                  <span style={{ color: '#fda4af', fontSize: '12px', fontWeight: 800 }}>AUTO</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: My 4K Watchlist */}
          {activeTab === 'watchlist' && (
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                    My Saved 4K Watchlist ({watchlistedItems.length})
                  </h4>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>
                    Titles ready for instant Ultra-HD streaming across all your linked TVs.
                  </p>
                </div>
              </div>

              {watchlistedItems.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {watchlistedItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        backgroundColor: 'rgba(16, 12, 22, 0.85)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '12px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div
                          style={{
                            width: '48px',
                            height: '66px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            position: 'relative',
                            flexShrink: 0,
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                          }}
                        >
                          <img
                            src={item.posterUrl}
                            alt={item.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h5 style={{ margin: 0, fontSize: '14.5px', fontWeight: 800, color: '#ffffff' }}>
                              {item.title}
                            </h5>
                            <span
                              style={{
                                backgroundColor: 'rgba(225, 29, 72, 0.2)',
                                color: '#fda4af',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '10px',
                                fontWeight: 800,
                              }}
                            >
                              {item.quality}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                            <span style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <Star size={11} fill="#f59e0b" color="#f59e0b" />
                              <span>{item.rating}</span>
                            </span>
                            <span style={{ fontSize: '11px', color: '#71717a' }}>•</span>
                            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                              {item.releaseYear} • {item.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {onPlayMovie && (
                          <button
                            type="button"
                            onClick={() => {
                              onPlayMovie(item);
                              onClose();
                            }}
                            className="btn-radiant"
                            style={{
                              padding: '8px 16px',
                              borderRadius: '10px',
                              fontSize: '12.5px',
                              fontWeight: 800,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              cursor: 'pointer',
                            }}
                          >
                            <Play size={13} fill="#050507" color="#050507" />
                            <span>Play in 4K</span>
                          </button>
                        )}

                        {onRemoveFromWatchlist && (
                          <button
                            type="button"
                            onClick={() => onRemoveFromWatchlist(item.id)}
                            style={{
                              width: '34px',
                              height: '34px',
                              borderRadius: '10px',
                              backgroundColor: 'rgba(239, 68, 68, 0.12)',
                              border: '1px solid rgba(239, 68, 68, 0.25)',
                              color: '#f87171',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.15s',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#ef4444';
                              e.currentTarget.style.color = '#ffffff';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.12)';
                              e.currentTarget.style.color = '#f87171';
                            }}
                            title="Remove from Watchlist"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    padding: '36px 20px',
                    textAlign: 'center',
                    backgroundColor: 'rgba(16, 12, 22, 0.6)',
                    borderRadius: '18px',
                    border: '1px dashed rgba(225, 29, 72, 0.35)',
                  }}
                >
                  <Bookmark size={36} color="#fda4af" style={{ margin: '0 auto 12px' }} />
                  <h5 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                    Your Watchlist is empty
                  </h5>
                  <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#94a3b8' }}>
                    Browse our 4K catalog and click the bookmark button on any movie to save it here.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onBrowseMovies) onBrowseMovies();
                    }}
                    className="btn-primary-glow"
                    style={{
                      padding: '10px 20px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    <span>Browse 4K Cinema Catalog</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SubscriberProfileModal;
