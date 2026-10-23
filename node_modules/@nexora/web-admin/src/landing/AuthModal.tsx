import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Tv, ShieldCheck, ArrowRight, UserCheck, KeyRound, ExternalLink, ArrowLeft, Film, Play } from 'lucide-react';
import { MOCK_CONTENT } from '@nexora/shared';

interface AuthModalProps {
  onClose: () => void;
  defaultTab?: 'subscriber' | 'admin';
  onNavigateToAdmin: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, defaultTab = 'subscriber', onNavigateToAdmin }) => {
  const [tab, setTab] = useState<'subscriber' | 'admin'>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscriberSuccess, setSubscriberSuccess] = useState(false);

  const handleSubscriberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscriberSuccess(true);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#be123c', '#e11d48', '#ffffff', '#fda4af'],
      });
    }, 700);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999, // Guaranteed above all 3D canvas and page elements
        backgroundColor: 'rgba(5, 5, 7, 0.92)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        overflow: 'hidden',
      }}
    >
      {/* Background Animated Movie Posters Mosaic Grid */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          right: '-10%',
          bottom: '-10%',
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '16px',
          opacity: 0.12,
          filter: 'blur(2px) grayscale(40%)',
          pointerEvents: 'none',
          transform: 'rotate(-4deg) scale(1.08)',
        }}
      >
        {MOCK_CONTENT.concat(MOCK_CONTENT).slice(0, 18).map((item, idx) => (
          <div key={idx} style={{ height: '240px', borderRadius: '12px', overflow: 'hidden' }}>
            <img src={item.posterUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      {/* Radial Gradient Vignette over Poster Grid */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(5, 5, 7, 0.75) 0%, rgba(5, 5, 7, 0.98) 85%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Glassmorphic Modal Window */}
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: '#0d0d12',
          border: '1px solid rgba(225, 29, 72, 0.4)',
          borderRadius: '24px',
          padding: '38px',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95), 0 0 40px rgba(225, 29, 72, 0.2)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '10px',
            padding: '8px',
            cursor: 'pointer',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(225, 29, 72, 0.2)';
            e.currentTarget.style.color = '#fda4af';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.color = '#94a3b8';
          }}
        >
          <X size={18} />
        </button>

        {/* Brand Icon & Heading */}
        <div style={{ textAlign: 'center', marginBottom: '26px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #e11d48 0%, #881337 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
              boxShadow: '0 0 25px rgba(225, 29, 72, 0.4)',
            }}
          >
            <Tv size={26} color="#ffffff" strokeWidth={2.5} />
          </div>
          <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#f8fafc', margin: 0, letterSpacing: '-0.5px' }}>
            Sign In to <span className="gradient-text">NEXORA</span>
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '6px' }}>
            Stream 1,400+ Live Channels & 4K Blockbusters
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            padding: '4px',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '28px',
          }}
        >
          <button
            onClick={() => {
              setTab('subscriber');
              setSubscriberSuccess(false);
            }}
            style={{
              padding: '11px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: tab === 'subscriber' ? '#ffffff' : 'transparent',
              color: tab === 'subscriber' ? '#050507' : '#94a3b8',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: tab === 'subscriber' ? '0 4px 14px rgba(255, 255, 255, 0.25)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            Subscriber Portal
          </button>
          <button
            onClick={() => setTab('admin')}
            style={{
              padding: '11px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: tab === 'admin' ? '#ffffff' : 'transparent',
              color: tab === 'admin' ? '#050507' : '#94a3b8',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: tab === 'admin' ? '0 4px 14px rgba(255, 255, 255, 0.25)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            Admin Console
          </button>
        </div>

        {/* Subscriber Tab Content */}
        {tab === 'subscriber' && (
          <div>
            {!subscriberSuccess ? (
              <form onSubmit={handleSubscriberSubmit}>
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Subscriber Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      borderRadius: '12px',
                      padding: '13px 16px',
                      color: '#f8fafc',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      borderRadius: '12px',
                      padding: '13px 16px',
                      color: '#f8fafc',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-radiant"
                  style={{ width: '100%', justifyContent: 'center', padding: '15px' }}
                >
                  {loading ? (
                    <span>Verifying Subscriber...</span>
                  ) : (
                    <>
                      <span>Sign In & Stream Now</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{ width: '58px', height: '58px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <UserCheck size={32} />
                </div>
                <h4 style={{ fontSize: '22px', fontWeight: 900, color: '#f8fafc', marginBottom: '6px' }}>
                  Welcome back, Subscriber!
                </h4>
                <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>
                  Your subscription status is Active (4K Ultra Tier). All living room screens unlocked.
                </p>
                <button
                  onClick={onClose}
                  className="btn-radiant"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Continue to 4K Streaming</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Admin Console Tab Content */}
        {tab === 'admin' && (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                backgroundColor: 'rgba(225, 29, 72, 0.1)',
                border: '1px solid rgba(225, 29, 72, 0.3)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px',
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(225, 29, 72, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <ShieldCheck size={26} color="#fda4af" />
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc', marginBottom: '6px' }}>
                Broadcaster & Ops Management
              </h4>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5 }}>
                Directly manage 148 live channels, EPG schedules, subscribers, multi-device sessions, and edge CDN nodes.
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onNavigateToAdmin();
              }}
              className="btn-radiant"
              style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '15px' }}
            >
              <span>Launch Admin Console</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Modal Bottom: Back to Landing Link */}
        <div style={{ marginTop: '24px', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '16px' }}>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ArrowLeft size={14} />
            <span>Cancel and stay on Landing Page</span>
          </button>
        </div>
      </div>
    </div>
  );
};
