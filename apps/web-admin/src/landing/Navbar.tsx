import React from 'react';
import { Tv, Sparkles, KeyRound, ExternalLink, PlaySquare, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenActivation: () => void;
  onOpenLiveDemo: () => void;
  onOpenSignIn: (defaultTab?: 'subscriber' | 'admin') => void;
  onNavigateToAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenActivation,
  onOpenLiveDemo,
  onOpenSignIn,
  onNavigateToAdmin,
}) => {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(5, 7, 14, 0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #e11d48 0%, #881337 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 22px rgba(225, 29, 72, 0.45)',
          }}
        >
          <Tv size={22} color="#ffffff" strokeWidth={2.5} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.5px', color: '#f8fafc' }}>
              NEXORA
            </span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 800,
                backgroundColor: 'rgba(225, 29, 72, 0.18)',
                color: '#fda4af',
                padding: '2px 7px',
                borderRadius: '6px',
                border: '1px solid rgba(225, 29, 72, 0.4)',
              }}
            >
              PRO
            </span>
          </div>
          <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            4K Stream Platform
          </span>
        </div>
      </div>

      {/* Nav Links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        <a href="#experience" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}>
          Smart OS
        </a>
        <a href="#channels" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}>
          Channels
        </a>
        <a href="#vault" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}>
          4K Vault
        </a>
        <a href="#cinema" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}>
          Cinema
        </a>
        <a href="#devices" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}>
          Devices
        </a>
        <a href="#activation" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}>
          TV Activation
        </a>
        <a href="#pricing" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}>
          Pricing
        </a>
        <a href="#faq" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}>
          FAQ
        </a>
      </nav>

      {/* Action CTA Buttons */}
      {/* Action CTA Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        
        {/* 1. Live Demo with Radar Pulse & Smoked Glass */}
        <button
          onClick={onOpenLiveDemo}
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(225, 29, 72, 0.08) 100%)',
            border: '1px solid rgba(225, 29, 72, 0.4)',
            color: '#ffffff',
            borderRadius: '11px',
            padding: '9px 16px',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 16px rgba(225, 29, 72, 0.18)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(225, 29, 72, 0.22)';
            e.currentTarget.style.borderColor = '#fda4af';
            e.currentTarget.style.boxShadow = '0 0 28px rgba(225, 29, 72, 0.55), 0 0 10px #ffffff';
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(225, 29, 72, 0.08) 100%)';
            e.currentTarget.style.borderColor = 'rgba(225, 29, 72, 0.4)';
            e.currentTarget.style.boxShadow = '0 0 16px rgba(225, 29, 72, 0.18)';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <span className="live-beacon-dot" />
          <span style={{ letterSpacing: '0.3px' }}>Live Demo</span>
          <span
            style={{
              fontSize: '9px',
              fontWeight: 900,
              backgroundColor: 'rgba(225, 29, 72, 0.3)',
              color: '#fda4af',
              padding: '1px 5px',
              borderRadius: '4px',
              border: '1px solid rgba(225, 29, 72, 0.5)',
            }}
          >
            4K
          </span>
        </button>

        {/* 2. Enter TV Code with Velvet Burgundy Gradient & Continuous Shimmer Sweep */}
        <button
          onClick={onOpenActivation}
          className="btn-shimmer-wrap"
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #e11d48 0%, #be123c 60%, #9f1239 100%)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            color: '#ffffff',
            borderRadius: '11px',
            padding: '9px 18px',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 22px rgba(225, 29, 72, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(225, 29, 72, 0.75), 0 0 14px #ffffff';
            e.currentTarget.style.borderColor = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 22px rgba(225, 29, 72, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.4)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
          }}
        >
          <div className="btn-shimmer-sweep" />
          <KeyRound size={15} color="#ffffff" className="key-animate-icon" strokeWidth={2.5} />
          <span style={{ letterSpacing: '0.2px' }}>Enter TV Code</span>
        </button>

        {/* 3. Sign In Frosted Titanium Glass Pill */}
        <button
          onClick={() => onOpenSignIn('subscriber')}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#f8fafc',
            borderRadius: '11px',
            padding: '9px 16px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)';
            e.currentTarget.style.borderColor = '#ffffff';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <span>Sign In</span>
        </button>

        {/* 4. Diamond Radiant Sheen Admin Portal Switch with Pulsing Aura */}
        <button
          onClick={onNavigateToAdmin}
          className="admin-aura-btn btn-shimmer-wrap"
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 45%, #e2e8f0 100%)',
            color: '#09090b',
            border: '1px solid #ffffff',
            borderRadius: '11px',
            padding: '9px 18px',
            fontSize: '13px',
            fontWeight: 900,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            letterSpacing: '-0.2px',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 0 35px rgba(255, 255, 255, 0.95), 0 0 25px #e11d48';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
          }}
        >
          <div className="btn-shimmer-sweep" />
          <ShieldCheck size={16} color="#e11d48" strokeWidth={2.6} />
          <span>Admin Portal</span>
        </button>
      </div>
    </header>
  );
};
