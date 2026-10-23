import React, { useState } from 'react';
import { Tv, KeyRound, ShieldCheck, ArrowRight, ArrowLeft, ExternalLink, Lock } from 'lucide-react';
import { MOCK_CONTENT } from '@nexora/shared';

interface AdminLoginViewProps {
  onLoginSuccess: () => void;
  onBackToLanding?: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({ onLoginSuccess, onBackToLanding }) => {
  const [email, setEmail] = useState('alexander@nexora.tv');
  const [password, setPassword] = useState('superadmin2026');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 600);
  };

  const handleBackToLanding = () => {
    if (onBackToLanding) {
      onBackToLanding();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#03050d',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
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
          opacity: 0.16,
          filter: 'blur(3px) grayscale(15%)',
          pointerEvents: 'none',
          transform: 'rotate(-4deg) scale(1.08)',
        }}
      >
        {MOCK_CONTENT.concat(MOCK_CONTENT).slice(0, 18).map((item, idx) => (
          <div key={idx} style={{ height: '260px', borderRadius: '14px', overflow: 'hidden' }}>
            <img src={item.posterUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      {/* Radial Dark Vignette Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(3, 5, 13, 0.75) 0%, rgba(3, 5, 13, 0.98) 90%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Header Navigation Bar with Direct Back Button */}
      <header
        style={{
          padding: '20px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(5, 7, 14, 0.75)',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <button
          onClick={handleBackToLanding}
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: '10px',
            padding: '10px 18px',
            color: '#F8FAFC',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(225, 29, 72, 0.15)';
            e.currentTarget.style.borderColor = '#e11d48';
            e.currentTarget.style.color = '#fda4af';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
            e.currentTarget.style.color = '#F8FAFC';
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Landing Page</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e11d48', boxShadow: '0 0 10px #e11d48' }} />
          <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 600 }}>NEXORA v2.4 Security Gateway</span>
        </div>
      </header>

      {/* Main Login Form Area */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', zIndex: 10 }}>
        
        <div
          className="glass-card"
          style={{
            width: '100%',
            maxWidth: '460px',
            backgroundColor: '#0d0d12',
            border: '1px solid rgba(225, 29, 72, 0.4)',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95), 0 0 40px rgba(225, 29, 72, 0.2)',
            position: 'relative',
          }}
        >
          {/* Brand Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #e11d48 0%, #881337 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 0 25px rgba(225, 29, 72, 0.4)',
              }}
            >
              <Tv size={28} color="#ffffff" strokeWidth={2.5} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
              NEXORA ADMIN CONSOLE
            </h2>
            <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '6px' }}>
              Broadcaster Operations & Streaming Infrastructure
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '8px' }}>
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '12px',
                  padding: '13px 16px',
                  color: '#F8FAFC',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '8px' }}>
                Access Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '12px',
                  padding: '13px 16px',
                  color: '#F8FAFC',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-radiant"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '15px',
                fontSize: '15px',
              }}
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In as Superadmin</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Box */}
          <div style={{ marginTop: '24px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
              Mock Demonstration Access
            </span>
            <div style={{ fontSize: '12px', color: '#fda4af', fontWeight: 600, marginTop: '4px' }}>
              Pre-filled with Superadmin Credentials
            </div>
          </div>

          {/* Bottom Back Button */}
          <div style={{ marginTop: '24px', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '16px' }}>
            <button
              onClick={handleBackToLanding}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94A3B8',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fda4af')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
            >
              <ArrowLeft size={14} />
              <span>Return to Public Landing Page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
