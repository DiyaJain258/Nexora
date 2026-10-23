import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish?: () => void;
  duration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, duration = 1800 }) => {
  const [progress, setProgress] = useState(15);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 15;
      });
    }, duration / 7);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onFinish?.();
      }, 400);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeTimer);
    };
  }, [duration, onFinish]);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 100,
      backgroundColor: '#050505',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.4s ease-out',
      pointerEvents: fadeOut ? 'none' : 'auto',
    }}>
      {/* Brand Monogram */}
      <div style={{
        width: '84px',
        height: '84px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, #E50914 0%, #7F0000 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 35px rgba(229, 9, 20, 0.65), 0 10px 20px rgba(0,0,0,0.8)',
        marginBottom: '20px',
      }}>
        <span style={{ fontSize: '32px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-1px' }}>
          NX
        </span>
      </div>

      {/* Brand Wordmark */}
      <div style={{
        fontSize: '28px',
        fontWeight: 900,
        letterSpacing: '3px',
        color: '#FFFFFF',
        textTransform: 'uppercase',
      }}>
        NEX<span style={{ color: '#E50914' }}>ORA</span>
      </div>

      <div style={{
        fontSize: '11px',
        letterSpacing: '4px',
        color: '#B3B3B3',
        marginTop: '6px',
        textTransform: 'uppercase',
        fontWeight: 600,
      }}>
        IPTV & 4K STREAMING
      </div>

      {/* Loading Progress Indicator */}
      <div style={{
        width: '160px',
        height: '4px',
        backgroundColor: '#151515',
        border: '1px solid #303030',
        borderRadius: '2px',
        overflow: 'hidden',
        marginTop: '40px',
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #7F0000, #E50914, #FF2B36)',
          transition: 'width 0.2s ease',
        }} />
      </div>

      <div style={{
        fontSize: '10px',
        color: '#737373',
        fontFamily: 'monospace',
        marginTop: '12px',
        letterSpacing: '0.5px',
      }}>
        CONNECTING SECURE STREAM CORE...
      </div>

      <div style={{
        position: 'absolute',
        bottom: '36px',
        fontSize: '11px',
        color: '#525252',
        fontWeight: 500,
      }}>
        Android & iOS Universal Build • 4K HDR Certified
      </div>
    </div>
  );
};
