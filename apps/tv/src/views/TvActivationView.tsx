import React, { useState } from 'react';
import { Tv, QrCode, Smartphone, CheckCircle, RefreshCw, Sparkles } from 'lucide-react';

interface TvActivationViewProps {
  onActivated?: () => void;
}

export const TvActivationView: React.FC<TvActivationViewProps> = ({ onActivated }) => {
  const [activationCode, setActivationCode] = useState('NX-8492');
  const [isActivated, setIsActivated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSimulatePair = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsActivated(true);
      if (onActivated) {
        setTimeout(onActivated, 1800);
      }
    }, 1200);
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#050505',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Ambience */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(229, 9, 20, 0.15) 0%, rgba(127, 0, 0, 0.05) 50%, rgba(0,0,0,0) 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '920px',
        width: '100%',
        backgroundColor: '#151515',
        border: '1px solid #303030',
        borderRadius: '24px',
        padding: '48px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 30px rgba(229, 9, 20, 0.2)',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '40px',
        alignItems: 'center',
      }}>
        {/* Left Instructions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #E50914 0%, #7F0000 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(229, 9, 20, 0.5)',
            }}>
              <Tv size={24} color="#FFFFFF" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#FFFFFF' }}>
                Activate NEXORA TV
              </h2>
              <p style={{ margin: 0, fontSize: '13px', color: '#B3B3B3' }}>
                Android TV & Google TV 4K Device Pairing
              </p>
            </div>
          </div>

          <p style={{ fontSize: '15px', color: '#B3B3B3', lineHeight: '1.6', margin: 0 }}>
            Connect this television to your NEXORA account to sync your watchlist, 4K profiles, and favorites.
          </p>

          {/* 3 Simple Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(229, 9, 20, 0.15)',
                color: '#FF2B36',
                fontWeight: 800,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                1
              </div>
              <div style={{ fontSize: '14px', color: '#FFFFFF' }}>
                On your phone or computer, go to <span style={{ color: '#FF2B36', fontWeight: 700 }}>nexora.tv/activate</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(229, 9, 20, 0.15)',
                color: '#FF2B36',
                fontWeight: 800,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                2
              </div>
              <div style={{ fontSize: '14px', color: '#FFFFFF' }}>
                Sign in with your NEXORA subscriber credentials
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(229, 9, 20, 0.15)',
                color: '#FF2B36',
                fontWeight: 800,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                3
              </div>
              <div style={{ fontSize: '14px', color: '#FFFFFF' }}>
                Enter the 6-character activation code shown on the right
              </div>
            </div>
          </div>

          <div style={{ marginTop: '12px' }}>
            <button
              onClick={handleSimulatePair}
              disabled={isVerifying || isActivated}
              style={{
                background: isActivated
                  ? 'rgba(16, 185, 129, 0.2)'
                  : 'linear-gradient(135deg, #E50914 0%, #7F0000 100%)',
                border: isActivated ? '1px solid #10B981' : 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: isActivated ? 'none' : '0 4px 15px rgba(229, 9, 20, 0.4)',
              }}
            >
              {isActivated ? (
                <>
                  <CheckCircle size={18} color="#10B981" />
                  <span style={{ color: '#10B981' }}>Device Successfully Paired!</span>
                </>
              ) : isVerifying ? (
                <>
                  <RefreshCw size={18} className="spin" />
                  <span>Checking Cloud Activation Token...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Simulate Pairing Now</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Code Display */}
        <div style={{
          backgroundColor: '#0D0D0D',
          border: '2px solid #E50914',
          borderRadius: '20px',
          padding: '32px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '0 0 30px rgba(229, 9, 20, 0.3)',
        }}>
          <div style={{ fontSize: '12px', color: '#B3B3B3', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
            YOUR ACTIVATION CODE
          </div>

          <div style={{
            fontSize: '44px',
            fontWeight: 900,
            fontFamily: 'JetBrains Mono, monospace',
            color: '#FF2B36',
            letterSpacing: '4px',
            margin: '16px 0',
            textShadow: '0 0 20px rgba(229, 9, 20, 0.65)',
          }}>
            {activationCode}
          </div>

          {/* QR Code Illustration */}
          <div style={{
            width: '130px',
            height: '130px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
          }}>
            <QrCode size={110} color="#050505" />
          </div>

          <div style={{ fontSize: '11px', color: '#B3B3B3' }}>
            Or scan with phone camera to pair instantly
          </div>
          <div style={{ fontSize: '10px', color: '#737373', marginTop: '6px' }}>
            Code refreshes automatically in 14:32
          </div>
        </div>
      </div>
    </div>
  );
};
