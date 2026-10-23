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
    <div className="netflix-login-root">
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

        /* ─── BASE & RESPONSIVE RULES ─── */
        .netflix-login-root {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          background-color: #050507;
          color: #ffffff;
          font-family: 'Montserrat', sans-serif;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          user-select: none;
        }

        /* Desktop: strictly locked to 100vh with no scrollbar when screen height permits */
        @media (min-width: 992px) and (min-height: 720px) {
          .netflix-login-root {
            overflow: hidden;
          }
        }

        /* Buttons & Interactions */
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

        /* Top Navbar */
        .netflix-login-nav {
          position: relative;
          z-index: 50;
          padding: 16px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(to bottom, rgba(5, 5, 8, 0.88) 0%, transparent 100%);
          flex-shrink: 0;
        }
        .netflix-brand-logo {
          font-size: 28px;
          font-weight: 900;
          letter-spacing: 4px;
          background: linear-gradient(135deg, #e50914, #ff4d4d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(229, 9, 20, 0.55));
          transition: transform 0.2s;
        }
        .netflix-nav-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          border-radius: 6px;
          padding: 7px 14px;
          font-size: 12px;
          font-weight: 600;
          color: #ffffff;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: all 0.2s;
        }

        @media (max-width: 991px) {
          .netflix-login-nav {
            padding: 14px 24px;
          }
        }
        @media (max-width: 540px) {
          .netflix-login-nav {
            padding: 12px 16px;
          }
          .netflix-brand-logo {
            font-size: 22px !important;
            letter-spacing: 2.5px !important;
          }
          .netflix-nav-back-text {
            display: none;
          }
          .netflix-nav-btn {
            padding: 6px 10px !important;
            font-size: 11px !important;
          }
        }

        /* Center Layout Container */
        .netflix-login-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          width: 100%;
          max-width: 1220px;
          margin: 0 auto;
          gap: 56px;
          flex: 1;
        }
        @media (max-width: 1100px) {
          .netflix-login-content {
            gap: 36px;
            padding: 0 32px;
          }
        }
        @media (max-width: 991px) {
          .netflix-login-content {
            flex-direction: column;
            justify-content: center;
            padding: 24px 20px;
            gap: 28px;
            margin: auto 0;
            flex: none;
          }
        }
        @media (max-width: 540px) {
          .netflix-login-content {
            padding: 14px 14px 22px;
            gap: 18px;
          }
        }

        /* Left Hero Column */
        .netflix-login-hero {
          flex: 1.1;
          max-width: 540px;
          animation: heroEntry 0.8s 0.15s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .netflix-hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          background-color: rgba(229, 9, 20, 0.16);
          border: 1px solid rgba(229, 9, 20, 0.4);
          margin-bottom: 16px;
          backdrop-filter: blur(10px);
        }
        .netflix-login-title {
          font-size: clamp(34px, 3.6vw, 48px);
          font-weight: 900;
          line-height: 1.1;
          text-shadow: 0 4px 24px rgba(0, 0, 0, 0.85);
          margin-bottom: 14px;
          letter-spacing: -1px;
        }
        .netflix-login-sub {
          font-size: 17px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
          margin-bottom: 8px;
        }
        .netflix-login-specs {
          font-size: 13px;
          color: 'rgba(255, 255, 255, 0.6)';
          letter-spacing: 0.3px;
          margin-bottom: 26px;
          line-height: 1.5;
        }
        .netflix-login-hero-badges {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          max-width: 460px;
        }
        .netflix-badge-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 10px;
          backdrop-filter: blur(10px);
          transition: transform 0.2s, background-color 0.2s;
        }
        .netflix-badge-item:hover {
          transform: translateY(-2px);
          background-color: rgba(255, 255, 255, 0.08);
        }
        .netflix-badge-icon {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .netflix-badge-title {
          font-size: 14px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
        }
        .netflix-badge-sub {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
        }

        @media (max-width: 991px) {
          .netflix-login-hero {
            flex: none;
            max-width: 520px;
            text-align: center;
            margin: 0 auto;
          }
          .netflix-login-hero-badges {
            margin: 0 auto;
            max-width: 480px;
          }
        }
        @media (max-width: 540px) {
          .netflix-login-hero {
            max-width: 100%;
          }
          .netflix-hero-pill {
            padding: 5px 12px !important;
            margin-bottom: 10px !important;
          }
          .netflix-login-title {
            font-size: clamp(23px, 6.4vw, 29px) !important;
            line-height: 1.15 !important;
            margin-bottom: 8px !important;
          }
          .netflix-login-sub {
            font-size: 13.5px !important;
            margin-bottom: 5px !important;
          }
          .netflix-login-specs {
            font-size: 11px !important;
            margin-bottom: 14px !important;
            line-height: 1.4 !important;
          }
          .netflix-login-hero-badges {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
            max-width: 100% !important;
          }
          .netflix-badge-item {
            padding: 7px 10px !important;
          }
          .netflix-badge-icon {
            width: 28px !important;
            height: 28px !important;
          }
          .netflix-badge-title {
            font-size: 12px !important;
          }
          .netflix-badge-sub {
            font-size: 10px !important;
          }
        }

        /* Right Column (Sign-In Card) */
        .netflix-login-card {
          width: 100%;
          max-width: 410px;
          background: rgba(5, 5, 8, 0.88);
          border-radius: 16px;
          padding: 28px 32px 24px;
          backdrop-filter: blur(28px) saturate(1.5);
          -webkit-backdrop-filter: blur(28px) saturate(1.5);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.85), 0 0 80px rgba(229, 9, 20, 0.12);
          animation: cardEntry 0.8s 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
          flex-shrink: 0;
        }
        .netflix-card-title {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 16px;
          letter-spacing: -0.3px;
          color: #ffffff;
        }
        .netflix-input-elem {
          width: 100%;
          padding: 18px 14px 6px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 6px;
          color: #ffffff;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }
        .netflix-btn-submit {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 6px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .netflix-btn-activation {
          width: 100%;
          padding: 11px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 6px;
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          backdrop-filter: blur(6px);
          transition: all 0.2s;
        }

        @media (max-width: 991px) {
          .netflix-login-card {
            max-width: 440px;
            margin: 0 auto;
          }
        }
        @media (max-width: 540px) {
          .netflix-login-card {
            max-width: 100%;
            padding: 20px 16px 18px;
            border-radius: 14px;
          }
          .netflix-card-title {
            font-size: 20px !important;
            margin-bottom: 12px !important;
          }
          .netflix-input-elem {
            font-size: 15px !important;
            padding: 16px 12px 6px !important;
          }
          .netflix-btn-submit {
            padding: 12px !important;
            font-size: 13.5px !important;
          }
          .netflix-btn-activation {
            padding: 10px !important;
            font-size: 12px !important;
          }
        }

        /* Footer */
        .netflix-login-footer {
          position: relative;
          z-index: 10;
          padding: 14px 48px;
          background: linear-gradient(to top, rgba(5, 5, 8, 0.85) 0%, transparent 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
          flex-shrink: 0;
        }
        .netflix-footer-link {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          transition: color 0.2s;
        }
        .netflix-footer-link:hover {
          color: rgba(255, 255, 255, 0.8);
        }
        @media (max-width: 768px) {
          .netflix-login-footer {
            padding: 16px 14px 24px;
            gap: 10px 16px;
          }
          .netflix-footer-link {
            font-size: 10.5px !important;
          }
        }

        /* Background Poster collage */
        .netflix-posters-grid {
          position: absolute;
          inset: -5%;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 4px;
          transform: scale(1.08) rotate(-2deg);
          animation: slowZoom 25s ease-in-out infinite alternate;
        }
        @media (max-width: 768px) {
          .netflix-posters-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(5, 1fr);
          }
        }
      `}</style>

      {/* ── CINEMATIC POSTER WALL ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="netflix-posters-grid">
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
      <nav className="netflix-login-nav">
        {/* Brand Logo */}
        <div
          onClick={handleBack}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          title="Return to NEXORA"
        >
          <div className="netflix-brand-logo">
            NEXORA
          </div>
        </div>

        {/* Nav Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handleBack}
            className="netflix-nav-btn"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)')}
          >
            <ArrowLeft size={13} />
            <span className="netflix-nav-back-text">Back to Home</span>
          </button>

          <button
            onClick={() => showToast('Language', 'English (UK) selected')}
            className="netflix-nav-btn"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(5, 5, 8, 0.45)',
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

      {/* ── CENTER: SPACIOUS SIDE-BY-SIDE / RESPONSIVE LAYOUT ── */}
      <div className="netflix-login-content">
        {/* LEFT COLUMN: Hero Title, Brand Messaging & 4 Feature Badges */}
        <div className="netflix-login-hero">
          {/* Top Pill */}
          <div className="netflix-hero-pill">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#e50914', boxShadow: '0 0 8px #e50914' }} />
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#fda4af', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
              4K STREAMING PLATFORM
            </span>
          </div>

          <h1 className="netflix-login-title">
            Unlimited Movies,<br />
            Shows <span style={{ color: '#e50914' }}>&amp; More.</span>
          </h1>

          <div className="netflix-login-sub">
            Stream anywhere. Cancel anytime.
          </div>

          <div
            className="netflix-login-specs"
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            4K Ultra HD · Dolby Audio 7.1 · 1,400+ Live Channels · Instant Smart TV 1-Tap Pairing
          </div>

          {/* 4 Feature Badges in 2x2 Grid */}
          <div className="netflix-login-hero-badges">
            <div className="netflix-badge-item">
              <div
                className="netflix-badge-icon"
                style={{
                  backgroundColor: 'rgba(229, 9, 20, 0.16)',
                  border: '1px solid rgba(229, 9, 20, 0.35)',
                }}
              >
                <Tv size={16} color="#fda4af" />
              </div>
              <div>
                <div className="netflix-badge-title">1,400+</div>
                <div className="netflix-badge-sub">Live Channels</div>
              </div>
            </div>

            <div className="netflix-badge-item">
              <div
                className="netflix-badge-icon"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                }}
              >
                <Monitor size={16} color="#ffffff" />
              </div>
              <div>
                <div className="netflix-badge-title">4K UHD</div>
                <div className="netflix-badge-sub">Cinema HDR</div>
              </div>
            </div>

            <div className="netflix-badge-item">
              <div
                className="netflix-badge-icon"
                style={{
                  backgroundColor: 'rgba(229, 9, 20, 0.16)',
                  border: '1px solid rgba(229, 9, 20, 0.35)',
                }}
              >
                <ShieldCheck size={16} color="#fda4af" />
              </div>
              <div>
                <div className="netflix-badge-title">5 Screens</div>
                <div className="netflix-badge-sub">Simultaneous</div>
              </div>
            </div>

            <div className="netflix-badge-item">
              <div
                className="netflix-badge-icon"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                }}
              >
                <Globe size={16} color="#ffffff" />
              </div>
              <div>
                <div className="netflix-badge-title">190+</div>
                <div className="netflix-badge-sub">Global CDN</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Spacious Sign-In Card */}
        <div className="netflix-login-card">
          <div className="netflix-card-title">
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
                className="netflix-input-elem"
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
                className="netflix-input-elem"
                style={{
                  paddingRight: '42px',
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
              className="btn-signin-netflix netflix-btn-submit"
              style={{
                background: success ? '#16a34a' : 'linear-gradient(135deg, #e50914 0%, #b20710 100%)',
                cursor: loading || success ? 'not-allowed' : 'pointer',
                boxShadow: success
                  ? '0 4px 20px rgba(22, 163, 74, 0.5)'
                  : '0 4px 20px rgba(229, 9, 20, 0.45)',
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
            className="netflix-btn-activation"
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
      <footer className="netflix-login-footer">
        {['FAQ', 'Help Centre', 'Terms of Use', 'Privacy', 'Cookie Preferences', 'Corporate Info', 'Contact Us'].map((txt) => (
          <a
            key={txt}
            href="#"
            className="netflix-footer-link"
            onClick={(e) => {
              e.preventDefault();
              showToast(txt, `Opening ${txt} documentation…`);
            }}
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
