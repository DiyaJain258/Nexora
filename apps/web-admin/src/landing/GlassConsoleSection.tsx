import React from 'react';
import { GlassConsolePreview } from './GlassConsolePreview';
import { Sparkles } from 'lucide-react';

interface GlassConsoleSectionProps {
  onPlayMovie?: (movie: any) => void;
}

export const GlassConsoleSection: React.FC<GlassConsoleSectionProps> = ({ onPlayMovie }) => {
  return (
    <section
      id="experience"
      style={{
        padding: '48px 0 36px',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 30%, rgba(35, 10, 20, 0.35) 0%, rgba(5, 5, 7, 1) 70%)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              backgroundColor: 'rgba(225, 29, 72, 0.12)',
              border: '1px solid rgba(225, 29, 72, 0.35)',
              marginBottom: '16px',
            }}
          >
            <Sparkles size={14} color="#e11d48" />
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#fda4af', letterSpacing: '1px', textTransform: 'uppercase' }}>
              NEXT-GEN LEANBACK OS • 10-FOOT DESIGN SYSTEM
            </span>
          </div>

          <h2 style={{ fontSize: '42px', fontWeight: 900, color: '#f8fafc', letterSpacing: '-1.5px', marginBottom: '14px' }}>
            The World’s Most <span className="gradient-text">Fluid Streaming Interface</span>
          </h2>

          <p style={{ color: '#a1a1aa', fontSize: '16px', maxWidth: '640px', margin: '0 auto' }}>
            Designed with ultra-deep frosted glass, zero-lag zapping, and instant Continue Watching sync across every device in your home.
          </p>
        </div>

        {/* Live Interactive Glass Console Replica */}
        <GlassConsolePreview onPlayMovie={onPlayMovie} />

      </div>
    </section>
  );
};

export default GlassConsoleSection;
