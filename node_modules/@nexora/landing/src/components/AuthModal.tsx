import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Tv, ShieldCheck, ArrowRight, UserCheck, KeyRound, ExternalLink, ArrowLeft } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  defaultTab?: 'subscriber' | 'admin';
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, defaultTab = 'subscriber' }) => {
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
        colors: ['#00f2fe', '#38bdf8', '#8a2be2'],
      });
    }, 700);
  };

  const handleLaunchAdmin = () => {
    window.location.href = 'http://localhost:5173';
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: 'rgba(3, 5, 13, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: '#0a0e1c',
          border: '1px solid rgba(0, 242, 254, 0.35)',
          padding: '36px',
          boxShadow: '0 25px 70px -15px rgba(0, 242, 254, 0.35)',
          position: 'relative',
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
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '6px',
            cursor: 'pointer',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={18} />
        </button>

        {/* Brand Icon & Heading */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
            }}
          >
            <Tv size={24} color="#05070e" strokeWidth={2.5} />
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#f8fafc', margin: 0 }}>
            Sign In to NEXORA
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
            Choose your account portal to continue
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
            borderRadius: '12px',
            marginBottom: '28px',
          }}
        >
          <button
            onClick={() => {
              setTab('subscriber');
              setSubscriberSuccess(false);
            }}
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: tab === 'subscriber' ? '#00f2fe' : 'transparent',
              color: tab === 'subscriber' ? '#05070e' : '#94a3b8',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Subscriber Portal
          </button>
          <button
            onClick={() => setTab('admin')}
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: tab === 'admin' ? '#00f2fe' : 'transparent',
              color: tab === 'admin' ? '#05070e' : '#94a3b8',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
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
                <div style={{ marginBottom: '16px' }}>
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
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      color: '#f8fafc',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '22px' }}>
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
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px',
                      padding: '12px 14px',
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
                  style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                >
                  {loading ? (
                    <span>Verifying Subscriber...</span>
                  ) : (
                    <>
                      <span>Sign In & Stream</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <UserCheck size={28} />
                </div>
                <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#f8fafc', marginBottom: '6px' }}>
                  Welcome back, Subscriber!
                </h4>
                <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>
                  Your subscription status is Active (4K Ultra Tier). All living room screens unlocked.
                </p>
                <button
                  onClick={onClose}
                  className="btn-radiant"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Continue to Streaming</span>
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
                backgroundColor: 'rgba(138, 43, 226, 0.12)',
                border: '1px solid rgba(138, 43, 226, 0.3)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px',
              }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(138, 43, 226, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <ShieldCheck size={24} color="#c084fc" />
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc', marginBottom: '6px' }}>
                Broadcaster & Ops Management
              </h4>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5 }}>
                Directly manage 148 live channels, EPG schedules, subscribers, multi-device sessions, and edge CDN nodes.
              </p>
            </div>

            <button
              onClick={handleLaunchAdmin}
              className="btn-radiant"
              style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '15px' }}
            >
              <span>Launch Admin Console</span>
              <ExternalLink size={16} />
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
