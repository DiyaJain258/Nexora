import React, { useState } from 'react';
import { Tv, Globe, ChevronDown, Eye, EyeOff, ArrowRight, ArrowLeft, Check, ShieldCheck, Monitor } from 'lucide-react';

interface AdminLoginViewProps {
  onLoginSuccess: () => void;
  onBackToLanding?: () => void;
  defaultTab?: 'sub' | 'adm';
}

const CINEMATIC_POSTERS = [
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1460881680858-30d870d7b53c?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&auto=format&fit=crop&q=80',
];

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onLoginSuccess,
  onBackToLanding,
  defaultTab = 'adm',
}) => {
  const [activeTab, setActiveTab] = useState<'sub' | 'adm'>(defaultTab);
  const [email, setEmail] = useState('alexander@nexora.tv');
  const [password, setPassword] = useState('superadmin2026');
  const [pwdVisible, setPwdVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shakingField, setShakingField] = useState<'email' | 'password' | null>(null);
  const [toast, setToast] = useState<{ title: string; msg: string; show: boolean }>({
    title: '',
    msg: '',
    show: false,
  });

  const showToast = (title: string, msg: string) => {
    setToast({ title, msg, show: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3200);
  };

  const handleTabSwitch = (t: 'sub' | 'adm') => {
    setActiveTab(t);
    if (t === 'adm') {
      setEmail('alexander@nexora.tv');
      setPassword('superadmin2026');
    } else {
      setEmail('subscriber@nexora.tv');
      setPassword('stream4kpass');
    }
  };

  const handleSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email.trim()) {
      setShakingField('email');
      showToast('Error', 'Please enter your email address.');
      setTimeout(() => setShakingField(null), 500);
      return;
    }
    if (!password) {
      setShakingField('password');
      showToast('Error', 'Please enter your password.');
      setTimeout(() => setShakingField(null), 500);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      showToast('Success 🎬', activeTab === 'adm' ? 'Welcome Back! Loading Admin Operations Console…' : 'Welcome to NEXORA 4K! Redirecting to Player…');

      setTimeout(() => {
        if (activeTab === 'adm') {
          onLoginSuccess();
        } else {
          if (onBackToLanding) {
            onBackToLanding();
          } else {
            window.location.hash = '#/';
          }
        }
      }, 1000);
    }, 1200);
  };

  const handleBack = () => {
    if (onBackToLanding) {
      onBackToLanding();
    } else {
      window.location.hash = '#/';
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        inset: 0,
        backgroundColor: '#050507',
        color: '#ffffff',
        fontFamily: "'Montserrat', sans-serif",
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        userSelect: 'none',
      }}
    >
      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1.08) rotate(-2deg); }
          to { transform: scale(1.15) rotate(-2deg); }
        }
        @keyframes heroEntry {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardEntry {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .btn-signin-netflix {
          position: relative;
          overflow: hidden;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .btn-signin-netflix::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transition: left 0.5s ease;
        }
        .btn-signin-netflix:hover::before {
          left: 100%;
        }
      `}</style>

      {/* ── CINEMATIC POSTER WALL ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* 7x3 Collage Grid */}
        <div
          style={{
            position: 'absolute',
            inset: '-5%',
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            gap: '4px',
            transform: 'scale(1.08) rotate(-2deg)',
            animation: 'slowZoom 25s ease-in-out infinite alternate',
          }}
        >
          {CINEMATIC_POSTERS.map((src, i) => (
            <div
              key={i}
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.5) saturate(1.25)',
              }}
            />
          ))}
        </div>

        {/* Gradient overlays — Netflix style */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(to bottom,
                rgba(5, 5, 8, 0.78) 0%,
                rgba(5, 5, 8, 0.28) 25%,
                rgba(5, 5, 8, 0.38) 65%,
                rgba(5, 5, 8, 0.96) 100%
              ),
              linear-gradient(to right,
                rgba(5, 5, 8, 0.78) 0%,
                transparent 35%,
                transparent 65%,
                rgba(5, 5, 8, 0.78) 100%
              )
            `,
          }}
        />

        {/* Red vignette glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(229, 9, 20, 0.16) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── TOP NAVBAR ── */}
      <nav
        style={{
          position: 'relative',
          zIndex: 50,
          padding: '16px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(to bottom, rgba(5, 5, 8, 0.85) 0%, transparent 100%)',
          flexShrink: 0,
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={handleBack}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          title="Return to NEXORA"
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: 900,
              letterSpacing: '4px',
              background: 'linear-gradient(135deg, #e50914, #ff4d4d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(229, 9, 20, 0.55))',
            }}
          >
            NEXORA
          </div>
        </div>

        {/* Nav Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '6px',
              padding: '7px 14px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#ffffff',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)')}
          >
            <ArrowLeft size={13} />
            <span>Back to Home</span>
          </button>

          <button
            onClick={() => showToast('Language', 'English (UK) selected')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '6px',
              padding: '7px 14px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#ffffff',
              cursor: 'pointer',
              background: 'rgba(5, 5, 8, 0.45)',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)')}
          >
            <Globe size={13} />
            <span>English</span>
            <ChevronDown size={13} />
          </button>
        </div>
      </nav>

      {/* ── CENTER: SPACIOUS SIDE-BY-SIDE LAYOUT ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
          width: '100%',
          maxWidth: '1220px',
          margin: '0 auto',
          gap: '56px',
          flex: 1,
        }}
      >
        {/* LEFT COLUMN: Hero Title, Brand Messaging & 4 Feature Badges */}
        <div
          style={{
            flex: 1.1,
            maxWidth: '540px',
            animation: 'heroEntry 0.8s 0.15s cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          {/* Top Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(229, 9, 20, 0.16)',
              border: '1px solid rgba(229, 9, 20, 0.4)',
              marginBottom: '16px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#e50914', boxShadow: '0 0 8px #e50914' }} />
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#fda4af', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
              4K STREAMING PLATFORM
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(34px, 3.6vw, 48px)',
              fontWeight: 900,
              lineHeight: 1.1,
              textShadow: '0 4px 24px rgba(0, 0, 0, 0.85)',
              marginBottom: '14px',
              letterSpacing: '-1px',
            }}
          >
            Unlimited Movies,<br />
            Shows <span style={{ color: '#e50914' }}>&amp; More.</span>
          </h1>

          <div
            style={{
              fontSize: '17px',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.9)',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
              marginBottom: '8px',
            }}
          >
            Stream anywhere. Cancel anytime.
          </div>

          <div
            style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.6)',
              letterSpacing: '0.3px',
              marginBottom: '26px',
              lineHeight: 1.5,
            }}
          >
            4K Ultra HD · Dolby Audio 7.1 · 1,400+ Live Channels · Instant Smart TV 1-Tap Pairing
          </div>

          {/* 4 Feature Badges in 2x2 Grid on Left */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              maxWidth: '460px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(229, 9, 20, 0.16)',
                  border: '1px solid rgba(229, 9, 20, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Tv size={16} color="#fda4af" />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>1,400+</div>
                <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)' }}>Live Channels</div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Monitor size={16} color="#ffffff" />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>4K UHD</div>
                <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)' }}>Cinema HDR</div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(229, 9, 20, 0.16)',
                  border: '1px solid rgba(229, 9, 20, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={16} color="#fda4af" />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>5 Screens</div>
                <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)' }}>Simultaneous</div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Globe size={16} color="#ffffff" />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>190+</div>
                <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)' }}>Global CDN</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Spacious, Proportioned Sign-In Card */}
        <div
          style={{
            width: '100%',
            maxWidth: '410px',
            background: 'rgba(5, 5, 8, 0.88)',
            borderRadius: '16px',
            padding: '28px 32px 24px',
            backdropFilter: 'blur(28px) saturate(1.5)',
            WebkitBackdropFilter: 'blur(28px) saturate(1.5)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 32px 80px rgba(0, 0, 0, 0.85), 0 0 80px rgba(229, 9, 20, 0.12)',
            animation: 'cardEntry 0.8s 0.25s cubic-bezier(0.16, 1, 0.3, 1) both',
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.3px', color: '#ffffff' }}>
            Sign In
          </div>

          {/* Tabs: Subscriber vs Admin Console */}
          <div style={{ display: 'flex', borderBottom: '2px solid rgba(255, 255, 255, 0.1)', marginBottom: '18px' }}>
            <button
              onClick={() => handleTabSwitch('sub')}
              type="button"
              style={{
                flex: 1,
                padding: '8px 0',
                background: 'transparent',
                border: 'none',
                color: activeTab === 'sub' ? '#ffffff' : 'rgba(255, 255, 255, 0.55)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.03em',
                borderBottom: activeTab === 'sub' ? '2px solid #e50914' : '2px solid transparent',
                marginBottom: '-2px',
                transition: 'all 0.2s',
              }}
            >
              Subscriber
            </button>
            <button
              onClick={() => handleTabSwitch('adm')}
              type="button"
              style={{
                flex: 1,
                padding: '8px 0',
                background: 'transparent',
                border: 'none',
                color: activeTab === 'adm' ? '#ffffff' : 'rgba(255, 255, 255, 0.55)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.03em',
                borderBottom: activeTab === 'adm' ? '2px solid #e50914' : '2px solid transparent',
                marginBottom: '-2px',
                transition: 'all 0.2s',
              }}
            >
              Admin Console
            </button>
          </div>

          <form onSubmit={handleSignIn}>
            {/* Email Field with Floating Label */}
            <div
              style={{
                marginBottom: '12px',
                position: 'relative',
                animation: shakingField === 'email' ? 'shake 0.4s ease' : 'none',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                style={{
                  width: '100%',
                  padding: '18px 14px 6px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(229, 9, 20, 0.3)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <label
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: email ? '6px' : '50%',
                  transform: email ? 'none' : 'translateY(-50%)',
                  fontSize: email ? '10px' : '13px',
                  color: 'rgba(255, 255, 255, 0.55)',
                  pointerEvents: 'none',
                  transition: 'all 0.18s ease',
                  fontWeight: 600,
                  letterSpacing: email ? '0.05em' : 'normal',
                }}
              >
                {activeTab === 'adm' ? 'Admin Email' : 'Email or phone number'}
              </label>
            </div>

            {/* Password Field with Eye Toggle */}
            <div
              style={{
                marginBottom: '16px',
                position: 'relative',
                animation: shakingField === 'password' ? 'shake 0.4s ease' : 'none',
              }}
            >
              <input
                type={pwdVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                style={{
                  width: '100%',
                  padding: '18px 42px 6px 14px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(229, 9, 20, 0.3)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <label
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: password ? '6px' : '50%',
                  transform: password ? 'none' : 'translateY(-50%)',
                  fontSize: password ? '10px' : '13px',
                  color: 'rgba(255, 255, 255, 0.55)',
                  pointerEvents: 'none',
                  transition: 'all 0.18s ease',
                  fontWeight: 600,
                  letterSpacing: password ? '0.05em' : 'normal',
                }}
              >
                Password
              </label>

              <button
                type="button"
                onClick={() => setPwdVisible(!pwdVisible)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(255, 255, 255, 0.55)',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {pwdVisible ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Red Sign In Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="btn-signin-netflix"
              style={{
                width: '100%',
                padding: '14px',
                background: success ? '#16a34a' : 'linear-gradient(135deg, #e50914 0%, #b20710 100%)',
                border: 'none',
                borderRadius: '6px',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 700,
                cursor: loading || success ? 'not-allowed' : 'pointer',
                letterSpacing: '0.04em',
                boxShadow: success
                  ? '0 4px 20px rgba(22, 163, 74, 0.5)'
                  : '0 4px 20px rgba(229, 9, 20, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {loading ? (
                <>
                  <svg
                    style={{ animation: 'spin 0.75s linear infinite' }}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  <span>Signing in…</span>
                </>
              ) : success ? (
                <>
                  <Check size={16} strokeWidth={2.5} />
                  <span>Welcome Back!</span>
                </>
              ) : (
                <>
                  <span>{activeTab === 'adm' ? 'Sign In as Superadmin' : 'Sign In'}</span>
                  <ArrowRight size={15} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '14px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
            <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)' }}>or</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
          </div>

          {/* Activation Code Button */}
          <button
            type="button"
            onClick={() => showToast('Activation Code', 'Use 6-digit code: NX-8849 to link your Smart TV')}
            style={{
              width: '100%',
              padding: '11px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              backdropFilter: 'blur(6px)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)')}
          >
            <Tv size={14} color="#fda4af" />
            <span>Use Activation Code</span>
          </button>

          {/* Card Footer Links */}
          <div style={{ marginTop: '16px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', textAlign: 'center' }}>
            New to NEXORA?{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                showToast('Register', 'Instant 4K 14-day pass generated for your account!');
              }}
              style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 700 }}
            >
              Sign up now.
            </a>
            &nbsp;·&nbsp;{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                showToast('Support', '24/7 Priority Support is available on WhatsApp & Telegram.');
              }}
              style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 700 }}
            >
              Need help?
            </a>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '14px 48px',
          background: 'linear-gradient(to top, rgba(5, 5, 8, 0.85) 0%, transparent 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          flexWrap: 'wrap',
          flexShrink: 0,
        }}
      >
        {['FAQ', 'Help Centre', 'Terms of Use', 'Privacy', 'Cookie Preferences', 'Corporate Info', 'Contact Us'].map((txt) => (
          <a
            key={txt}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              showToast(txt, `Opening ${txt} documentation…`);
            }}
            style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)')}
          >
            {txt}
          </a>
        ))}
      </footer>

      {/* ── INTERACTIVE TOAST ── */}
      <div
        style={{
          position: 'fixed',
          top: '68px',
          right: '24px',
          zIndex: 200,
          backgroundColor: 'rgba(15, 15, 22, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderLeft: '4px solid #e50914',
          borderRadius: '8px',
          padding: '12px 18px',
          fontSize: '12px',
          color: '#ffffff',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(16px)',
          transform: toast.show ? 'translateX(0)' : 'translateX(120%)',
          opacity: toast.show ? 1 : 0,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          minWidth: '240px',
        }}
      >
        <div style={{ fontWeight: 800, marginBottom: '2px', color: '#fda4af' }}>{toast.title}</div>
        <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '11px' }}>{toast.msg}</div>
      </div>
    </div>
  );
};

export default AdminLoginView;
