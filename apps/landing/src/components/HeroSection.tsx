import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, ShieldCheck, Zap, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { HeroScene3D } from './3d/HeroScene3D';

interface HeroSectionProps {
  onOpenLiveDemo: () => void;
  onOpenActivation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenLiveDemo, onOpenActivation }) => {
  return (
    <section
      style={{
        paddingTop: '130px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '0 28px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '48px', alignItems: 'center' }}>
          
          {/* Left Column: Headline, Trust & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top Engine Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '999px',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                boxShadow: '0 0 25px rgba(0, 242, 254, 0.15)',
                marginBottom: '24px',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00f2fe', boxShadow: '0 0 12px #00f2fe' }} />
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.6px' }}>
                NEXORA v2.4 ULTRA BROADCAST
              </span>
              <span style={{ color: '#475569', fontSize: '12px' }}>•</span>
              <span style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: 600 }}>1,420+ Live Streams Active</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: '62px',
                lineHeight: 1.08,
                fontWeight: 900,
                letterSpacing: '-2px',
                marginBottom: '22px',
              }}
            >
              Next-Gen <span className="hero-gradient-text">4K Live TV</span> & <span className="accent-glow-text">Cinema Platform</span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: '18px',
                lineHeight: 1.65,
                color: '#94a3b8',
                marginBottom: '36px',
                maxWidth: '580px',
              }}
            >
              Broadcast live sports, premium cinema, and global television channels with ultra-low latency LL-HLS, Dolby Atmos 7.1 sound, and instant 1-tap activation on your Smart TV.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '18px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
              <button
                onClick={onOpenActivation}
                className="btn-primary-glow"
                style={{ fontSize: '15px' }}
              >
                <Zap size={18} />
                <span>Activate TV Free Pass</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onOpenLiveDemo}
                className="btn-secondary-glass"
                style={{ fontSize: '15px' }}
              >
                <Play size={18} color="#00f2fe" fill="#00f2fe" />
                <span>Watch 4K Live Demo</span>
              </button>
            </div>

            {/* Social Proof & Rating Pile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} color="#f59e0b" fill="#f59e0b" />
                ))}
              </div>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>
                4.9/5 Rating <span style={{ color: '#64748b', fontWeight: 500 }}>(124,000+ Active Subscribers)</span>
              </span>
            </div>

            {/* Key Technical Highlights */}
            <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={18} color="#00f2fe" />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>0.4s Zapping</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Instant channel tuning</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={18} color="#38bdf8" />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>4K 60fps HDR</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>HEVC Main 10 & AV1</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={18} color="#818cf8" />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>Multi-Screen</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Up to 5 devices synced</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D TV Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            <HeroScene3D />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
