import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Activity, Volume2, Star, Play, Sparkles } from 'lucide-react';
import { MOCK_CONTENT } from '@nexora/shared';

export const Hero3DDisplay: React.FC<{ onOpenLiveDemo?: () => void }> = ({ onOpenLiveDemo }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Curated showcase items with vibrant cinematic artwork
  const featuredSlides = [
    {
      title: 'Aethelgard: Chrono Rift',
      category: '4K CINEMA PREMIERE',
      badge: '4K HDR • 60 FPS',
      subtext: 'Sci-Fi Blockbuster • Rating 9.3/10',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80',
      glowColor: 'rgba(225, 29, 72, 0.45)',
      bitrate: '19.4 Mbps HEVC',
    },
    {
      title: 'Neon Syndicate: Cyber City',
      category: 'ORIGINAL SERIES • SEASON 3',
      badge: 'DOLBY VISION • ATMOS',
      subtext: 'Cyberpunk Action • Rating 8.9/10',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80',
      glowColor: 'rgba(159, 18, 57, 0.45)',
      bitrate: '18.8 Mbps HEVC',
    },
    {
      title: 'UEFA Champions League 4K',
      category: 'LIVE SPORTS BROADCAST',
      badge: 'LIVE STADIUM FEED',
      subtext: 'Real Madrid vs Manchester City',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
      glowColor: 'rgba(244, 63, 94, 0.4)',
      bitrate: '21.0 Mbps 60FPS',
    },
    {
      title: 'Apex Grand Prix 2026',
      category: 'LIVE MOTORSPORT 60FPS',
      badge: 'MULTI-ANGLE ONBOARD',
      subtext: 'Monaco Rain Grand Prix',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&auto=format&fit=crop&q=80',
      glowColor: 'rgba(245, 158, 11, 0.45)',
      bitrate: '22.4 Mbps 60FPS',
    },
  ];

  // Rotate featured movie slides automatically every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featuredSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredSlides.length]);

  // Smooth 3D mouse parallax tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const current = featuredSlides[activeSlide];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '30px 10px',
      }}
    >
      {/* Dynamic Ambilight Glow matched to active movie theme color */}
      <motion.div
        animate={{
          background: `radial-gradient(circle, ${current.glowColor} 0%, rgba(10, 15, 29, 0) 70%)`,
        }}
        transition={{ duration: 1.2 }}
        style={{
          position: 'absolute',
          width: '540px',
          height: '380px',
          borderRadius: '50%',
          filter: 'blur(65px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Floating 3D Television Container with Spring Physics */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
          position: 'relative',
          zIndex: 1,
        }}
        whileHover={{ scale: 1.02 }}
        onClick={onOpenLiveDemo}
      >
        {/* TV Outer Cyber-Bezel Frame */}
        <div
          style={{
            width: '580px',
            backgroundColor: '#0A0F1E',
            border: '2px solid rgba(255, 255, 255, 0.14)',
            borderRadius: '24px',
            padding: '12px',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            position: 'relative',
          }}
        >
          {/* TV Screen Display Window */}
          <div
            style={{
              position: 'relative',
              height: '340px',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#03050D',
              boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.9)',
            }}
          >
            {/* Animated Movie Slides */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              >
                <img
                  src={current.image}
                  alt={current.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.15) brightness(0.9)',
                  }}
                  onError={(e) => {
                    // Graceful fallback to solid gradient if remote image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, rgba(3, 5, 13, 0.5) 0%, transparent 45%, rgba(3, 5, 13, 0.92) 100%)',
                  }}
                />

                {/* Top HUD Badges */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '18px',
                    right: '18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        backgroundColor: '#ef4444',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 900,
                        padding: '3px 8px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        boxShadow: '0 0 12px rgba(239, 68, 68, 0.6)',
                      }}
                    >
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ffffff' }} />
                      ON AIR
                    </span>
                    <span
                      style={{
                        backgroundColor: 'rgba(20, 20, 26, 0.85)',
                        backdropFilter: 'blur(8px)',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '3px 10px',
                        borderRadius: '6px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      {current.badge}
                    </span>
                  </div>

                  <div
                    style={{
                      backgroundColor: 'rgba(20, 20, 26, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: '#f8fafc',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <Activity size={12} color="#ffffff" />
                    <span>{current.bitrate}</span>
                  </div>
                </div>

                {/* Bottom Movie Title & Sound Equalizer */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '18px',
                    left: '18px',
                    right: '18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '11px', color: '#fda4af', fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                      {current.category}
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', marginTop: '4px', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                      {current.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '2px' }}>
                      {current.subtext}
                    </p>
                  </div>

                  {/* Dolby Atmos Audio Waveform */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'rgba(20, 20, 26, 0.85)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                    }}
                  >
                    <Volume2 size={14} color="#ffffff" />
                    <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '14px' }}>
                      <span className="eq-bar" />
                      <span className="eq-bar" />
                      <span className="eq-bar" />
                      <span className="eq-bar" />
                    </div>
                    <span style={{ fontSize: '10px', color: '#cbd5e1', fontWeight: 800 }}>Dolby Atmos</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Navigation Dots */}
            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '6px',
                zIndex: 10,
              }}
            >
              {featuredSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSlide(idx);
                  }}
                  style={{
                    width: activeSlide === idx ? '22px' : '6px',
                    height: '6px',
                    borderRadius: '4px',
                    backgroundColor: activeSlide === idx ? '#e11d48' : 'rgba(255, 255, 255, 0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>

          {/* TV Stand Base */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '6px' }}>
            <div style={{ width: '40px', height: '16px', backgroundColor: '#27272a', borderRadius: '2px' }} />
            <div style={{ width: '160px', height: '8px', backgroundColor: '#18181b', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
          </div>
        </div>

        {/* Floating Telemetry Pill Top Right */}
        <div
          style={{
            position: 'absolute',
            top: '-18px',
            right: '-16px',
            backgroundColor: 'rgba(18, 18, 24, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(225, 29, 72, 0.45)',
            padding: '8px 16px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.75)',
            pointerEvents: 'none',
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e11d48', boxShadow: '0 0 10px #e11d48' }} />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#f8fafc' }}>4K 60FPS HEVC Stream</div>
            <div style={{ fontSize: '10px', color: '#a1a1aa' }}>Zero Packet Loss • Low Latency</div>
          </div>
        </div>

        {/* Floating Quality Pill Bottom Left */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '-20px',
            backgroundColor: 'rgba(12, 17, 33, 0.9)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(138, 43, 226, 0.4)',
            padding: '8px 16px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 12px 30px rgba(138, 43, 226, 0.25)',
            pointerEvents: 'none',
          }}
        >
          <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: 'rgba(138, 43, 226, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star size={14} color="#c084fc" />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#f8fafc' }}>Ultra Cinema Mode</div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>Bitstream 7.1 Surround</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
