import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { KeyRound, Tv, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const ActivationGuide: React.FC = () => {
  const [activationCode, setActivationCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleTestActivation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activationCode.trim() || activationCode.length < 4) {
      setStatus('error');
      return;
    }

    setStatus('success');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#be123c', '#e11d48', '#ffffff', '#fda4af'],
    });
  };

  return (
    <section id="activation" style={{ padding: '44px 0', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#fda4af', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
            ZERO FRICTION ONBOARDING
          </div>
          <h2 style={{ fontSize: '40px', fontWeight: 900, color: '#f8fafc', letterSpacing: '-1px', marginBottom: '16px' }}>
            Instant TV Activation in <span className="gradient-text">3 Simple Steps</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            No tedious passwords to type with your TV remote. Simply link your screen via a secure one-time activation code.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px', marginBottom: '24px' }}>
          
          <div className="glass-card" style={{ padding: '32px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Tv size={24} color="#ffffff" />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase' }}>Step 01</span>
            <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#f8fafc', marginTop: '6px', marginBottom: '10px' }}>
              Install on Smart TV
            </h4>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
              Download NEXORA on your Android TV, Google TV, Apple TV, or Firestick from Google Play Store or APK sideload.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '32px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: 'rgba(225, 29, 72, 0.15)', border: '1px solid rgba(225, 29, 72, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <KeyRound size={24} color="#fda4af" />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#fda4af', textTransform: 'uppercase' }}>Step 02</span>
            <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#f8fafc', marginTop: '6px', marginBottom: '10px' }}>
              Get 6-Digit Code
            </h4>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
              Launch the app. Your TV screen will display an instant unique pairing code (e.g., <code>NEX-8821</code>) and QR code.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '32px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Sparkles size={24} color="#ffffff" />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase' }}>Step 03</span>
            <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#f8fafc', marginTop: '6px', marginBottom: '10px' }}>
              Stream Instantly
            </h4>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
              Enter the code below or scan the QR code from your phone. Your TV account will activate within 3 seconds!
            </p>
          </div>

        </div>

        <div
          className="glass-card"
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            padding: '36px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%), rgba(10, 10, 14, 0.85)',
          }}
        >
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
            Test Your TV Activation Code
          </h3>
          <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '24px' }}>
            Try entering a demo code like <code style={{ color: '#fda4af', fontWeight: 700 }}>NEX-7742</code> to experience instant simulated pairing.
          </p>

          <form onSubmit={handleTestActivation} style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <input
              type="text"
              placeholder="e.g. NEX-7742"
              value={activationCode}
              onChange={(e) => {
                setActivationCode(e.target.value.toUpperCase());
                setStatus('idle');
              }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#f8fafc',
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '2px',
                textAlign: 'center',
                padding: '14px 20px',
                borderRadius: '12px',
                width: '240px',
                outline: 'none',
              }}
            />
            <button type="submit" className="btn-radiant" style={{ padding: '14px 28px' }}>
              <span>Pair Device</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {status === 'success' && (
            <div style={{ marginTop: '20px', padding: '12px', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} />
              <span style={{ fontSize: '14px', fontWeight: 700 }}>
                Device Successfully Paired! Living Room Android TV 4K is ready to stream.
              </span>
            </div>
          )}

          {status === 'error' && (
            <div style={{ marginTop: '20px', padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', color: '#ef4444', fontSize: '14px', fontWeight: 600 }}>
              Please enter at least 4 alphanumeric characters (e.g. NEX-7742).
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
