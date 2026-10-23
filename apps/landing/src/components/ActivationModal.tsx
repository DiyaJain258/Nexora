import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Tv, KeyRound, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

interface ActivationModalProps {
  onClose: () => void;
}

export const ActivationModal: React.FC<ActivationModalProps> = ({ onClose }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || code.length < 4) {
      setError('Please enter a valid 6-character TV activation code (e.g., NEX-8821)');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate instant pairing with local state
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#00f2fe', '#38bdf8', '#8a2be2', '#f59e0b'],
      });
    }, 800);
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
        backgroundColor: 'rgba(3, 7, 18, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
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
          maxWidth: '540px',
          backgroundColor: '#0a0e1c',
          border: '1px solid rgba(0, 242, 254, 0.35)',
          padding: '36px',
          boxShadow: '0 25px 70px -15px rgba(0, 242, 254, 0.3)',
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

        {!success ? (
          <div>
            <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(56, 189, 248, 0.2) 100%)', border: '1px solid rgba(0, 242, 254, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <KeyRound size={26} color="#00f2fe" />
            </div>

            <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#f8fafc', marginBottom: '8px' }}>
              Activate TV Application
            </h3>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '28px' }}>
              Open NEXORA on your Android TV, Apple TV, or Firestick, and type the 6-character code displayed on your TV screen.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>
                  TV Activation Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. NEX-8821"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    setError('');
                  }}
                  autoFocus
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: error ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    padding: '16px',
                    fontSize: '22px',
                    fontWeight: 800,
                    letterSpacing: '3px',
                    color: '#00f2fe',
                    textAlign: 'center',
                    outline: 'none',
                  }}
                />
              </div>

              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '13px', marginBottom: '16px' }}>
                  <AlertCircle size={15} />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-radiant"
                style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '15px' }}
              >
                {loading ? (
                  <span>Verifying Device...</span>
                ) : (
                  <>
                    <span>Confirm & Activate TV</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', marginTop: '24px', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '12px' }}>
              <Tv size={16} color="#38bdf8" />
              <span>Compatible with all Android TV 9+, Google TV & Apple TV builds</span>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#f8fafc', marginBottom: '8px' }}>
              TV Successfully Activated!
            </h3>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '28px' }}>
              Code <strong style={{ color: '#00f2fe' }}>{code}</strong> is now paired with your account. Your television screen will refresh and unlock full 4K streaming access immediately.
            </p>

            <button
              onClick={onClose}
              className="btn-radiant"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Done & Start Streaming</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
