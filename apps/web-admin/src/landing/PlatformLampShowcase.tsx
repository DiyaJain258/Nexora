import React from 'react';
import { motion } from 'framer-motion';
import { LampContainer } from '@/components/ui/lamp';
import { SparklesCore } from '@/components/ui/sparkles';
import { Zap, Tv, ShieldCheck, Play, ArrowRight } from 'lucide-react';

interface PlatformLampShowcaseProps {
  onOpenLiveDemo: () => void;
  onOpenActivation: () => void;
}

export const PlatformLampShowcase: React.FC<PlatformLampShowcaseProps> = ({
  onOpenLiveDemo,
  onOpenActivation,
}) => {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#050507' }}>
      <LampContainer glowColor="#e11d48">
        <motion.div
          initial={{ opacity: 0.5, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '920px',
            margin: '0 auto',
            padding: '0 20px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'rgba(225, 29, 72, 0.15)',
              border: '1px solid rgba(225, 29, 72, 0.4)',
              boxShadow: '0 0 25px rgba(225, 29, 72, 0.25)',
              marginBottom: '14px',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e11d48', boxShadow: '0 0 10px #e11d48' }} />
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#ffffff', letterSpacing: '1px', textTransform: 'uppercase' }}>
              REVOLUTIONARY STREAMING ARCHITECTURE
            </span>
          </div>

          <h2
            style={{
              fontSize: '44px',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-1.5px',
              color: '#ffffff',
              marginBottom: '14px',
            }}
          >
            The Ultimate 4K IPTV & <br />
            <span className="gradient-text">Unified Smart TV Platform</span>
          </h2>

          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.6,
              color: '#a1a1aa',
              maxWidth: '680px',
              marginBottom: '24px',
            }}
          >
            Experience instant 0.4-second channel zapping, 4K 60FPS HEVC 10-bit cinema feeds, and synchronization across all your living room screens without contracts or cumbersome passwords.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '12px' }}>
            <button
              onClick={onOpenActivation}
              className="btn-radiant"
              style={{ padding: '14px 28px', fontSize: '14px', fontWeight: 800 }}
            >
              <Zap size={16} />
              <span>Get Instant TV Pairing Pass</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={onOpenLiveDemo}
              className="btn-secondary-glass"
              style={{ padding: '14px 24px', fontSize: '14px' }}
            >
              <Play size={16} fill="#ffffff" color="#ffffff" />
              <span>Launch 4K Live Broadcast</span>
            </button>
          </div>

          {/* Sparkles Particle Bed underneath */}
          <div style={{ width: '100%', maxWidth: '640px', height: '60px', position: 'relative', marginTop: '10px' }}>
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1.4}
              particleDensity={100}
              className="w-full h-full"
              particleColor="#fda4af"
            />
          </div>
        </motion.div>
      </LampContainer>
    </section>
  );
};
