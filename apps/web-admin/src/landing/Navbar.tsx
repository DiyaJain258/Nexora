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
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={onOpenLiveDemo}
          className="nav-btn-livedemo"
          title="Watch live streams"
        >
          <span className="nav-live-dot" />
          <PlaySquare size={15} color="#fda4af" />
          <span>Live Demo</span>
        </button>

        <button
          onClick={onOpenActivation}
          className="nav-btn-activation"
          title="Pair your Smart TV"
        >
          <KeyRound size={15} color="#fda4af" />
          <span>Enter TV Code</span>
        </button>

        <button
          onClick={() => onOpenSignIn('subscriber')}
          className="nav-btn-signin"
          title="Subscriber Sign In"
        >
          <span>Sign In</span>
        </button>

        {/* Direct Internal Switch to Admin Portal on Same Port */}
        <button
          onClick={onNavigateToAdmin}
          className="nav-btn-admin"
          title="Open Admin Operations Console"
        >
          <ShieldCheck size={15} color="#050507" strokeWidth={2.4} />
          <span>Admin Portal</span>
        </button>
      </div>
    </header>
  );
};
