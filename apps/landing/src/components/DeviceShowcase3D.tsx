import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tv, Smartphone, Monitor, Gamepad2, Cast, Layers, CheckCircle2 } from 'lucide-react';

export const DeviceShowcase3D: React.FC = () => {
  const [activeDevice, setActiveDevice] = useState<'tv' | 'mobile' | 'web'>('tv');

  const devices = [
    {
      id: 'tv' as const,
      label: 'Smart TV & Android TV',
      icon: Tv,
      tag: '10-Foot Leanback UI',
      features: [
        'Android TV & Google TV Native Leanback remote navigation',
        'Direct hardware HEVC & AV1 4K 60FPS video decoder',
        'Dolby Atmos 7.1 bitstream audio passthrough to soundbars',
        'Electronic Program Guide (EPG) grid with Now & Next',
      ],
      spec: 'Android TV 9.0+ • Google TV • Apple TV 4K • Fire TV Stick 4K Max',
    },
    {
      id: 'mobile' as const,
      label: 'Android & iPhone',
      icon: Smartphone,
      tag: 'Touch-First Cinematic',
      features: [
        'Smooth touch gesture volume and brightness swiping',
        'Background audio playback & Picture-in-Picture (PiP)',
        'Continue Watching sync across mobile and living room TV',
        'Direct AirPlay 2 & Google Chromecast casting in 1-tap',
      ],
      spec: 'iOS 16+ • Android 11+ • iPadOS • Foldable Phone layout support',
    },
    {
      id: 'web' as const,
      label: 'Web Player & Mac / PC',
      icon: Monitor,
      tag: 'Browser Ultra Low Latency',
      features: [
        'Universal HTML5 HLS & DASH player with MSE acceleration',
        'Multi-screen split view for watching 4 live games at once',
        'Keyboard shortcuts: Space (pause), J/L (seek), M (mute)',
        'Admin management portal integration with analytics',
      ],
      spec: 'Chrome • Safari • Firefox • Edge • Linux / macOS / Windows',
    },
  ];

  const current = devices.find((d) => d.id === activeDevice) || devices[0];

  return (
    <section id="devices" style={{ padding: '80px 0', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#00f2fe', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
            CROSS-PLATFORM ARCHITECTURE
          </div>
          <h2 style={{ fontSize: '40px', fontWeight: 900, color: '#f8fafc', letterSpacing: '-1px', marginBottom: '16px' }}>
            Stream Everywhere on <span className="gradient-text">Your Favorite Screen</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '640px', margin: '0 auto' }}>
            One single subscription powers your living room big screen, your mobile device on the go, and your desktop browser with instant synchronized state.
          </p>

          {/* Device Tabs */}
          <div style={{ display: 'inline-flex', gap: '8px', padding: '6px', backgroundColor: 'rgba(15, 23, 42, 0.7)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', marginTop: '32px' }}>
            {devices.map((d) => {
              const Icon = d.icon;
              const isActive = activeDevice === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveDevice(d.id)}
                  style={{
                    backgroundColor: isActive ? '#00f2fe' : 'transparent',
                    color: isActive ? '#05070e' : '#94a3b8',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '10px 22px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.25s',
                  }}
                >
                  <Icon size={16} />
                  <span>{d.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Device Display Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="glass-card"
            style={{ padding: '48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}
          >
            {/* Left: Feature List */}
            <div>
              <span
                style={{
                  backgroundColor: 'rgba(0, 242, 254, 0.12)',
                  color: '#00f2fe',
                  border: '1px solid rgba(0, 242, 254, 0.3)',
                  padding: '4px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                }}
              >
                {current.tag}
              </span>

              <h3 style={{ fontSize: '32px', fontWeight: 900, color: '#f8fafc', marginTop: '16px', marginBottom: '24px' }}>
                Engineered for {current.label}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                {current.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <CheckCircle2 size={20} color="#00f2fe" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.5 }}>{feat}</span>
                  </div>
                ))}
              </div>

              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Supported Systems</span>
                <p style={{ fontSize: '13px', color: '#38bdf8', fontWeight: 600, marginTop: '4px' }}>{current.spec}</p>
              </div>
            </div>

            {/* Right: Realistic Device Mockup Graphic */}
            <div
              style={{
                backgroundColor: '#0a0e1a',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '24px',
                position: 'relative',
                boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.8)',
                overflow: 'hidden',
              }}
            >
              {/* Screen Top Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                </div>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>NEXORA Client OS • Live Engine</span>
              </div>

              {/* Simulated UI Screen Backdrop */}
              <div
                style={{
                  height: '240px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '20px',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80"
                  alt="Cinema background"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
                />

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <span style={{ backgroundColor: '#00f2fe', color: '#05070e', fontSize: '10px', fontWeight: 900, padding: '2px 8px', borderRadius: '4px' }}>
                    NOW PLAYING • 4K
                  </span>
                  <h4 style={{ fontSize: '20px', fontWeight: 900, color: '#f8fafc', marginTop: '6px' }}>
                    UEFA Champions League Finals Live
                  </h4>
                  <p style={{ fontSize: '12px', color: '#94a3b8' }}>Real Madrid vs Manchester City • 1080p 60fps 8.5 Mbps</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
