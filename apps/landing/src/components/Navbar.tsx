import React from 'react';
import { Tv, Sparkles, KeyRound, ExternalLink, PlaySquare } from 'lucide-react';

interface NavbarProps {
  onOpenActivation: () => void;
  onOpenLiveDemo: () => void;
  onOpenSignIn: (defaultTab?: 'subscriber' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenActivation, onOpenLiveDemo, onOpenSignIn }) => {
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)',
          }}
        >
          <Tv size={22} color="#05070e" strokeWidth={2.5} />
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
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                color: '#38bdf8',
                padding: '2px 6px',
                borderRadius: '6px',
                border: '1px solid rgba(56, 189, 248, 0.3)',
              }}
            >
              PRO
            </span>
          </div>
          <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            4K Stream Platform
          </span>
        </div>
      </div>

      {/* Nav Links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        <a href="#features" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}>
          Features
        </a>
        <a href="#channels" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}>
          Live Channels
        </a>
        <a href="#devices" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}>
          Devices
        </a>
        <a href="#activation" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}>
          TV Activation
        </a>
        <a href="#pricing" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}>
          Pricing
        </a>
        <a href="#faq" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}>
          FAQ
        </a>
      </nav>

      {/* Action CTA Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={onOpenLiveDemo}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#f8fafc',
            borderRadius: '10px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s',
          }}
        >
          <PlaySquare size={15} color="#38bdf8" />
          <span>Live Demo</span>
        </button>

        <button
          onClick={onOpenActivation}
          style={{
            background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(56, 189, 248, 0.15) 100%)',
            border: '1px solid rgba(0, 242, 254, 0.4)',
            color: '#00f2fe',
            borderRadius: '10px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s',
          }}
        >
          <KeyRound size={15} />
          <span>Enter TV Code</span>
        </button>

        <button
          onClick={() => onOpenSignIn('subscriber')}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#F8FAFC',
            borderRadius: '10px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#00F2FE')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)')}
        >
          <span>Sign In</span>
        </button>

        <a
          href="http://localhost:5173"
          style={{
            background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
            color: '#05070e',
            borderRadius: '10px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.3)',
          }}
        >
          <span>Admin Portal</span>
          <ExternalLink size={13} />
        </a>
      </div>
    </header>
  );
};
