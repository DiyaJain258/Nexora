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
      showToast('Success 🎬', activeTab === 'adm' ? 'Welcome Back Superadmin! Loading Admin Operations Console…' : 'Welcome to NEXORA! Opening Operations Console…');

      setTimeout(() => {
        onLoginSuccess();
      }, 700);
    }, 900);
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
          background-color: #040306;
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

        /* Desktop: strictly locked to 100vh when viewport allows */
        @media (min-width: 992px) and (min-height: 720px) {
          .netflix-login-root {
            overflow: hidden;
          }
        }

        /* Buttons & Interactions */
        .btn-signin-netflix {
          position: relative;
          overflow: hidden;
          transition: background 0.25s, transform 0.15s, box-shadow 0.25s;
        }
        .btn-signin-netflix::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          transition: left 0.55s ease;
        }
        .btn-signin-netflix:hover::before {
          left: 100%;
        }

        /* Top Navbar */
        .netflix-login-nav {
          position: relative;
          z-index: 50;
          padding: 18px 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(to bottom, rgba(4, 3, 6, 0.92) 0%, transparent 100%);
          flex-shrink: 0;
        }
        .netflix-brand-logo {
          font-size: 30px;
          font-weight: 900;
          letter-spacing: 4px;
          background: linear-gradient(135deg, #ffffff 0%, #fda4af 40%, #b81d4a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 25px rgba(184, 29, 74, 0.65));
          transition: transform 0.2s;
        }
        .netflix-nav-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          color: #ffffff;
          cursor: pointer;
          backdrop-filter: blur(10px);
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
          padding: 0 52px;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          gap: 64px;
          flex: 1;
        }
        @media (max-width: 1180px) {
          .netflix-login-content {
            gap: 40px;
            padding: 0 32px;
          }
        }
        @media (max-width: 991px) {
          .netflix-login-content {
            flex-direction: column;
            justify-content: center;
            padding: 24px 20px;
            gap: 30px;
            margin: auto 0;
            flex: none;
          }
        }
        @media (max-width: 540px) {
          .netflix-login-content {
            padding: 14px 14px 24px;
            gap: 20px;
          }
        }

        /* Left Hero Column */
        .netflix-login-hero {
          flex: 1.15;
          max-width: 580px;
          animation: heroEntry 0.8s 0.15s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .netflix-hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 16px;
          border-radius: 999px;
          background-color: rgba(139, 0, 50, 0.25);
          border: 1px solid rgba(184, 29, 74, 0.45);
          margin-bottom: 18px;
          backdrop-filter: blur(12px);
          box-shadow: 0 0 20px rgba(139, 0, 50, 0.3);
        }
        .netflix-login-title {
          font-size: clamp(36px, 3.8vw, 50px);
          font-weight: 900;
          line-height: 1.1;
          text-shadow: 0 4px 28px rgba(0, 0, 0, 0.9);
          margin-bottom: 16px;
          letter-spacing: -1px;
        }
        .netflix-login-sub {
          font-size: 18px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.92);
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
          margin-bottom: 8px;
        }
        .netflix-login-specs {
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.65);
          letter-spacing: 0.3px;
          margin-bottom: 28px;
          line-height: 1.5;
        }
        .netflix-login-hero-badges {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          max-width: 500px;
        }
        .netflix-badge-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background-color: rgba(139, 0, 50, 0.12);
          border: 1px solid rgba(184, 29, 74, 0.22);
          border-radius: 12px;
          backdrop-filter: blur(14px);
          transition: transform 0.2s, background-color 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .netflix-badge-item:hover {
          transform: translateY(-3px);
          background-color: rgba(139, 0, 50, 0.22);
          border-color: rgba(184, 29, 74, 0.45);
          box-shadow: 0 10px 25px rgba(139, 0, 50, 0.25);
        }
        .netflix-badge-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background-color: rgba(139, 0, 50, 0.28);
          border: 1px solid rgba(184, 29, 74, 0.45);
          box-shadow: 0 0 15px rgba(139, 0, 50, 0.35);
        }
        .netflix-badge-title {
          font-size: 15px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
        }
        .netflix-badge-sub {
          font-size: 11.5px;
          color: rgba(255, 255, 255, 0.65);
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
            padding: 8px 10px !important;
          }
          .netflix-badge-icon {
            width: 30px !important;
            height: 30px !important;
          }
          .netflix-badge-title {
            font-size: 13px !important;
          }
          .netflix-badge-sub {
            font-size: 10.5px !important;
          }
        }

        /* Right Column (Spacious Luxury Sign-In Card) */
        .netflix-login-card {
          width: 100%;
          max-width: 480px;
          background: rgba(8, 5, 11, 0.92);
          border-radius: 20px;
          padding: 36px 40px 32px;
          backdrop-filter: blur(32px) saturate(1.6);
          -webkit-backdrop-filter: blur(32px) saturate(1.6);
          border: 1px solid rgba(184, 29, 74, 0.28);
          box-shadow: 0 32px 90px rgba(0, 0, 0, 0.92), 0 0 90px rgba(139, 0, 50, 0.28);
          animation: cardEntry 0.8s 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
          flex-shrink: 0;
        }
        .netflix-card-title {
          font-size: 26px;
          font-weight: 800;
          margin-bottom: 18px;
          letter-spacing: -0.3px;
          color: #ffffff;
        }
        .netflix-input-elem {
          width: 100%;
          padding: 20px 16px 8px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(184, 29, 74, 0.25);
          border-radius: 8px;
          color: #ffffff;
          font-size: 14.5px;
          outline: none;
          transition: all 0.2s;
        }
        .netflix-input-elem:focus {
          border-color: #b81d4a !important;
          background-color: rgba(139, 0, 50, 0.12) !important;
          box-shadow: 0 0 0 3px rgba(184, 29, 74, 0.35) !important;
        }
        .netflix-btn-submit {
          width: 100%;
          padding: 15px;
          border: 1px solid rgba(184, 29, 74, 0.45);
          border-radius: 8px;
          color: #ffffff;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #8b0032 0%, #58031c 100%);
          box-shadow: 0 6px 28px rgba(139, 0, 50, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.25);
        }
        .netflix-btn-submit:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #a0153e 0%, #6d0624 100%);
          box-shadow: 0 10px 36px rgba(184, 29, 74, 0.7);
        }
        .netflix-btn-activation {
          width: 100%;
          padding: 12px;
          background: rgba(139, 0, 50, 0.12);
          border: 1px solid rgba(184, 29, 74, 0.28);
          border-radius: 8px;
          color: #ffffff;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          backdrop-filter: blur(8px);
          transition: all 0.2s;
        }
        .netflix-btn-activation:hover {
          background-color: rgba(139, 0, 50, 0.24);
          border-color: rgba(184, 29, 74, 0.45);
          color: #ffffff;
        }

        @media (max-width: 991px) {
          .netflix-login-card {
            max-width: 460px;
            margin: 0 auto;
          }
        }
        @media (max-width: 540px) {
          .netflix-login-card {
            max-width: 100%;
            padding: 22px 18px 20px;
            border-radius: 16px;
          }
          .netflix-card-title {
            font-size: 21px !important;
            margin-bottom: 14px !important;
          }
          .netflix-input-elem {
            font-size: 15px !important;
            padding: 16px 14px 6px !important;
          }
          .netflix-btn-submit {
            padding: 13px !important;
            font-size: 14px !important;
          }
          .netflix-btn-activation {
            padding: 11px !important;
            font-size: 12.5px !important;
          }
        }

        /* Footer */
        .netflix-login-footer {
          position: relative;
          z-index: 10;
          padding: 16px 48px;
          background: linear-gradient(to top, rgba(4, 3, 6, 0.9) 0%, transparent 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 26px;
          flex-wrap: wrap;
          flex-shrink: 0;
        }
        .netflix-footer-link {
          font-size: 11.5px;
          color: rgba(255, 255, 255, 0.45);
          text-decoration: none;
          transition: color 0.2s;
        }
        .netflix-footer-link:hover {
          color: #fda4af;
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
                filter: 'brightness(0.42) saturate(1.2)',
              }}
            />
          ))}
        </div>

        {/* Deep Black & Burgundy vignette gradient overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(to bottom,
                rgba(4, 3, 6, 0.84) 0%,
                rgba(4, 3, 6, 0.32) 25%,
                rgba(4, 3, 6, 0.42) 65%,
                rgba(4, 3, 6, 0.98) 100%
              ),
              linear-gradient(to right,
                rgba(4, 3, 6, 0.85) 0%,
                transparent 35%,
                transparent 65%,
                rgba(4, 3, 6, 0.85) 100%
              )
            `,
          }}
        />

        {/* Burgundy ambient glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(139, 0, 50, 0.28) 0%, transparent 70%)',
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
              border: '1px solid rgba(184, 29, 74, 0.3)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(139, 0, 50, 0.25)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)')}
          >
            <ArrowLeft size={13} color="#fda4af" />
            <span className="netflix-nav-back-text">Back to Home</span>
          </button>

          <button
            onClick={() => showToast('Language', 'English (UK) selected')}
            className="netflix-nav-btn"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.25)',
              background: 'rgba(8, 5, 11, 0.55)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#fda4af')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)')}
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
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#b81d4a', boxShadow: '0 0 10px #b81d4a' }} />
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#fda4af', letterSpacing: '1px', textTransform: 'uppercase' }}>
              4K STREAMING OPERATIONS CONSOLE
            </span>
          </div>

          <h1 className="netflix-login-title">
            Unlimited Movies,<br />
            Shows <span style={{ color: '#b81d4a', textShadow: '0 0 30px rgba(184, 29, 74, 0.65)' }}>&amp; More.</span>
          </h1>

          <div className="netflix-login-sub">
            Stream anywhere. Cancel anytime.
          </div>

          <div className="netflix-login-specs">
            4K Ultra HD · Dolby Audio 7.1 · 1,400+ Live Channels · Instant Smart TV 1-Tap Pairing
          </div>

          {/* 4 Feature Badges in 2x2 Grid */}
          <div className="netflix-login-hero-badges">
            <div className="netflix-badge-item">
              <div className="netflix-badge-icon">
                <Tv size={17} color="#fda4af" />
              </div>
              <div>
                <div className="netflix-badge-title">1,400+</div>
                <div className="netflix-badge-sub">Live Channels</div>
              </div>
            </div>

            <div className="netflix-badge-item">
              <div className="netflix-badge-icon">
                <Monitor size={17} color="#fda4af" />
              </div>
              <div>
                <div className="netflix-badge-title">4K UHD</div>
                <div className="netflix-badge-sub">Cinema HDR</div>
              </div>
            </div>

            <div className="netflix-badge-item">
              <div className="netflix-badge-icon">
                <ShieldCheck size={17} color="#fda4af" />
              </div>
              <div>
                <div className="netflix-badge-title">5 Screens</div>
                <div className="netflix-badge-sub">Simultaneous</div>
              </div>
            </div>

            <div className="netflix-badge-item">
              <div className="netflix-badge-icon">
                <Globe size={17} color="#fda4af" />
              </div>
              <div>
                <div className="netflix-badge-title">190+</div>
                <div className="netflix-badge-sub">Global CDN</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Spacious Luxury Sign-In Card */}
        <div className="netflix-login-card">
          <div className="netflix-card-title">
            Sign In
          </div>

          {/* Tabs: Subscriber vs Admin Console */}
          <div style={{ display: 'flex', borderBottom: '2px solid rgba(184, 29, 74, 0.2)', marginBottom: '22px' }}>
            <button
              onClick={() => handleTabSwitch('sub')}
              type="button"
              style={{
                flex: 1,
                padding: '10px 0',
                background: 'transparent',
                border: 'none',
                color: activeTab === 'sub' ? '#ffffff' : 'rgba(255, 255, 255, 0.55)',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.03em',
                borderBottom: activeTab === 'sub' ? '2px solid #b81d4a' : '2px solid transparent',
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
                padding: '10px 0',
                background: 'transparent',
                border: 'none',
                color: activeTab === 'adm' ? '#ffffff' : 'rgba(255, 255, 255, 0.55)',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.03em',
                borderBottom: activeTab === 'adm' ? '2px solid #b81d4a' : '2px solid transparent',
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
                marginBottom: '14px',
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
              />
              <label
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: email ? '7px' : '50%',
                  transform: email ? 'none' : 'translateY(-50%)',
                  fontSize: email ? '10.5px' : '13.5px',
                  color: email ? '#fda4af' : 'rgba(255, 255, 255, 0.55)',
                  pointerEvents: 'none',
                  transition: 'all 0.18s ease',
                  fontWeight: 600,
                  letterSpacing: email ? '0.05em' : 'normal',
                }}
              >
                {activeTab === 'adm' ? 'Admin Superuser Email' : 'Email or phone number'}
              </label>
            </div>

            {/* Password Field with Eye Toggle */}
            <div
              style={{
                marginBottom: '18px',
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
                  paddingRight: '44px',
                }}
              />
              <label
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: password ? '7px' : '50%',
                  transform: password ? 'none' : 'translateY(-50%)',
                  fontSize: password ? '10.5px' : '13.5px',
                  color: password ? '#fda4af' : 'rgba(255, 255, 255, 0.55)',
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
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(255, 255, 255, 0.65)',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {pwdVisible ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            {/* Burgundy Sign In Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="btn-signin-netflix netflix-btn-submit"
              style={{
                background: success ? '#16a34a' : 'linear-gradient(135deg, #8b0032 0%, #58031c 100%)',
                cursor: loading || success ? 'not-allowed' : 'pointer',
                boxShadow: success
                  ? '0 4px 20px rgba(22, 163, 74, 0.5)'
                  : '0 6px 28px rgba(139, 0, 50, 0.55)',
              }}
            >
              {loading ? (
                <>
                  <svg
                    style={{ animation: 'spin 0.75s linear infinite' }}
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  <span>Authenticating…</span>
                </>
              ) : success ? (
                <>
                  <Check size={17} strokeWidth={2.5} />
                  <span>Welcome Back Superadmin!</span>
                </>
              ) : (
                <>
                  <span>{activeTab === 'adm' ? 'Sign In to Admin Operations' : 'Sign In'}</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(184, 29, 74, 0.2)' }} />
            <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase' }}>or</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(184, 29, 74, 0.2)' }} />
          </div>

          {/* Activation Code Button */}
          <button
            type="button"
            onClick={() => showToast('Activation Code', 'Use 6-digit code: NX-8849 to link your Smart TV')}
            className="netflix-btn-activation"
          >
            <Tv size={15} color="#fda4af" />
            <span>Use Activation Code</span>
          </button>

          {/* Card Footer Links */}
          <div style={{ marginTop: '18px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center' }}>
            New to NEXORA?{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                showToast('Register', 'Instant 4K 14-day pass generated for your account!');
              }}
              style={{ color: '#fda4af', textDecoration: 'none', fontWeight: 700 }}
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
          top: '72px',
          right: '24px',
          zIndex: 200,
          backgroundColor: 'rgba(12, 7, 16, 0.95)',
          border: '1px solid rgba(184, 29, 74, 0.35)',
          borderLeft: '4px solid #b81d4a',
          borderRadius: '10px',
          padding: '14px 20px',
          fontSize: '12.5px',
          color: '#ffffff',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.85), 0 0 30px rgba(139, 0, 50, 0.3)',
          backdropFilter: 'blur(20px)',
          transform: toast.show ? 'translateX(0)' : 'translateX(120%)',
          opacity: toast.show ? 1 : 0,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          minWidth: '260px',
        }}
      >
        <div style={{ fontWeight: 800, marginBottom: '3px', color: '#fda4af' }}>{toast.title}</div>
        <div style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '11.5px' }}>{toast.msg}</div>
      </div>
    </div>
  );
};

export default AdminLoginView;
