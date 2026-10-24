import React, { useState } from 'react';
import {
  Globe,
  ChevronDown,
  Eye,
  EyeOff,
  ArrowRight,
  Tv,
  Monitor,
  Shield,
  Layers,
  Sparkles,
  Check,
} from 'lucide-react';

interface SignInScreenProps {
  onSuccessLogin?: () => void;
  onOpenActivation?: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  onSuccessLogin,
  onOpenActivation,
}) => {
  const [activeTab, setActiveTab] = useState<'sub' | 'adm'>('sub');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState<{ title: string; msg: string } | null>(null);

  const showToast = (title: string, msg: string) => {
    setToast({ title, msg });
    setTimeout(() => setToast(null), 3200);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Error', 'Please enter your email or phone number.');
      return;
    }
    if (!password) {
      showToast('Error', 'Please enter your password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      showToast('Success 🎬', 'Welcome back! Redirecting to stream feed...');

      setTimeout(() => {
        setIsSuccess(false);
        if (onSuccessLogin) onSuccessLogin();
      }, 1500);
    }, 1200);
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 20px 24px',
        color: '#FFFFFF',
        fontFamily: "'Montserrat', system-ui, sans-serif",
      }}
    >
      {/* ── TOP NAV ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: '24px',
            fontWeight: 900,
            letterSpacing: '4px',
            background: 'linear-gradient(135deg, #E50914, #ff4d4d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 16px rgba(229,9,20,0.5))',
          }}
        >
          NEXORA
        </div>

        <button
          onClick={() => showToast('Language', 'English (UK) selected')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '4px',
            padding: '5px 10px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#FFFFFF',
            cursor: 'pointer',
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Globe size={13} />
          <span>English</span>
          <ChevronDown size={13} />
        </button>
      </div>

      {/* ── HERO TEXT ── */}
      <div style={{ textAlign: 'center', marginBottom: '22px', zIndex: 10 }}>
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 900,
            lineHeight: 1.15,
            color: '#FFFFFF',
            margin: '0 0 8px 0',
            textShadow: '0 4px 20px rgba(0,0,0,0.9)',
          }}
        >
          Unlimited Movies,
          <br />
          Shows <span style={{ color: '#E50914' }}>& More.</span>
        </h1>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.85)',
            marginBottom: '4px',
          }}
        >
          Stream anywhere. Cancel anytime.
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
          4K Ultra HD · Dolby Audio · 1,400+ Live Channels
        </div>
      </div>

      {/* ── SIGN-IN CARD ── */}
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          margin: '0 auto',
          backgroundColor: 'rgba(12, 12, 15, 0.82)',
          borderRadius: '12px',
          padding: '24px 20px',
          backdropFilter: 'blur(24px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.9), 0 0 60px rgba(229,9,20,0.08)',
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.3px' }}>
          Sign In
        </div>

        {/* Tabs: Subscriber / Admin Console */}
        <div
          style={{
            display: 'flex',
            borderBottom: '2px solid rgba(255,255,255,0.08)',
            marginBottom: '18px',
          }}
        >
          <button
            onClick={() => setActiveTab('sub')}
            style={{
              flex: 1,
              padding: '8px 0',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'sub' ? '2px solid #E50914' : '2px solid transparent',
              color: activeTab === 'sub' ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              marginBottom: '-2px',
              transition: 'all 0.2s',
            }}
          >
            Subscriber
          </button>
          <button
            onClick={() => setActiveTab('adm')}
            style={{
              flex: 1,
              padding: '8px 0',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'adm' ? '2px solid #E50914' : '2px solid transparent',
              color: activeTab === 'adm' ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              marginBottom: '-2px',
              transition: 'all 0.2s',
            }}
          >
            Admin Console
          </button>
        </div>

        {/* Input Fields */}
        <form onSubmit={handleSignIn}>
          <div style={{ marginBottom: '12px', position: 'relative' }}>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={activeTab === 'adm' ? 'Admin email' : 'Email or phone number'}
              style={{
                width: '100%',
                padding: '14px 14px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: '6px',
                color: '#FFFFFF',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <div style={{ marginBottom: '16px', position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{
                width: '100%',
                padding: '14px 40px 14px 14px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: '6px',
                color: '#FFFFFF',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
              }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '13px',
              backgroundColor: isSuccess ? '#16a34a' : '#E50914',
              border: 'none',
              borderRadius: '6px',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: isSuccess
                ? '0 4px 20px rgba(22,163,74,0.5)'
                : '0 4px 24px rgba(229,9,20,0.55)',
              transition: 'all 0.2s',
            }}
          >
            {isLoading ? (
              <span>Signing in…</span>
            ) : isSuccess ? (
              <>
                <Check size={16} />
                <span>Welcome Back!</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        {/* OR Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '16px 0',
          }}
        >
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>or</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
        </div>

        {/* Use Activation Code Button */}
        <button
          onClick={() => {
            if (onOpenActivation) onOpenActivation();
            else showToast('Activation Code', 'Enter 6-digit PIN on TV');
          }}
          style={{
            width: '100%',
            padding: '11px',
            backgroundColor: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '6px',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Tv size={14} color="#E50914" />
          <span>Use TV Activation Code</span>
        </button>

        {/* Card Footer */}
        <div
          style={{
            marginTop: '16px',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.5)',
            textAlign: 'center',
          }}
        >
          New to NEXORA?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              showToast('Sign Up', 'Redirecting to pass plans...');
            }}
            style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 700 }}
          >
            Sign up now.
          </a>
          {' · '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              showToast('Support', 'Opening 24/7 help desk...');
            }}
            style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}
          >
            Need help?
          </a>
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
          marginTop: '24px',
          zIndex: 10,
        }}
      >
        {[
          { icon: Tv, num: '1,400+', label: 'Channels' },
          { icon: Monitor, num: '4K', label: 'Ultra HD' },
          { icon: Layers, num: '5', label: 'Screens' },
          { icon: Globe, num: '190+', label: 'Countries' },
        ].map((feat, i) => {
          const Icon = feat.icon;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                fontSize: '10px',
                color: 'rgba(255,255,255,0.5)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={14} color="#E50914" />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>{feat.num}</div>
              <div>{feat.label}</div>
            </div>
          );
        })}
      </div>

      {/* ── FOOTER LINKS ── */}
      <footer
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '14px',
          flexWrap: 'wrap',
          marginTop: '20px',
          fontSize: '10px',
          color: 'rgba(255,255,255,0.35)',
          zIndex: 10,
        }}
      >
        <span>FAQ</span>
        <span>Help Centre</span>
        <span>Terms of Use</span>
        <span>Privacy</span>
        <span>Contact Us</span>
      </footer>

      {/* ── TOAST NOTIFICATION ── */}
      {toast && (
        <div
          style={{
            position: 'absolute',
            top: '70px',
            right: '16px',
            left: '16px',
            backgroundColor: 'rgba(20,20,20,0.96)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderLeft: '4px solid #E50914',
            borderRadius: '8px',
            padding: '12px 14px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
            backdropFilter: 'blur(16px)',
            zIndex: 100,
          }}
        >
          <div style={{ fontWeight: 800, fontSize: '12px', color: '#FFFFFF', marginBottom: '2px' }}>
            {toast.title}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px' }}>{toast.msg}</div>
        </div>
      )}
    </div>
  );
};
