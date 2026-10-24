import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Play, Star, Sparkles, Film, ArrowDown } from 'lucide-react';
import { ContentItem } from '@nexora/shared';

export interface SerialItem {
  id: string;
  title: string;
  tag: string;
  badgeColor: string;
  poster: string;
  rating: string;
  episodes: string;
  genres: string[];
  year: number;
}

interface ColumnProps {
  serials: SerialItem[];
  y: MotionValue<number>;
  topOffset: string;
  onPlayMovie: (item: any) => void;
}

const ParallaxColumn: React.FC<ColumnProps> = ({ serials, y, topOffset, onPlayMovie }) => {
  return (
    <motion.div
      className="parallax-serial-column"
      style={{
        y,
        top: topOffset,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        flex: 1,
        minWidth: '240px',
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {serials.map((serial) => (
        <motion.div
          key={serial.id}
          whileHover={{ scale: 1.025, y: -4 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          onClick={() =>
            onPlayMovie({
              id: serial.id,
              title: serial.title,
              posterUrl: serial.poster,
              genres: serial.genres,
              resolution: '4K UHD',
            })
          }
          style={{
            position: 'relative',
            height: '420px',
            borderRadius: '22px',
            overflow: 'hidden',
            backgroundColor: '#0c0811',
            border: `1.5px solid ${serial.badgeColor}33`,
            boxShadow: `0 18px 45px rgba(0, 0, 0, 0.75), 0 0 30px ${serial.badgeColor}22`,
            cursor: 'pointer',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = serial.badgeColor;
            e.currentTarget.style.boxShadow = `0 24px 60px rgba(0, 0, 0, 0.95), 0 0 35px ${serial.badgeColor}55`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `${serial.badgeColor}33`;
            e.currentTarget.style.boxShadow = `0 18px 45px rgba(0, 0, 0, 0.75), 0 0 30px ${serial.badgeColor}22`;
          }}
        >
          {/* Card Poster Image */}
          <img
            src={serial.poster}
            alt={serial.title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.85) contrast(1.1)',
              transition: 'transform 0.4s ease',
            }}
          />

          {/* Cinematic Vignette Gradients */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(5, 5, 8, 0.35) 0%, rgba(5, 5, 8, 0.1) 40%, rgba(5, 5, 8, 0.96) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Top Info Bar */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              right: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontSize: '10.5px',
                fontWeight: 900,
                backgroundColor: 'rgba(5, 4, 8, 0.88)',
                backdropFilter: 'blur(12px)',
                color: serial.badgeColor,
                border: `1px solid ${serial.badgeColor}66`,
                padding: '4px 10px',
                borderRadius: '8px',
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              }}
            >
              {serial.tag}
            </span>

            <span
              style={{
                fontSize: '11px',
                fontWeight: 900,
                color: '#fbbf24',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: 'rgba(5, 4, 8, 0.88)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                padding: '4px 10px',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              }}
            >
              <Star size={12} fill="#fbbf24" color="#fbbf24" />
              <span>{serial.rating}</span>
            </span>
          </div>

          {/* Bottom Metadata & CTA */}
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              left: '18px',
              right: '18px',
              zIndex: 2,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', color: '#fda4af', fontWeight: 800 }}>
                {serial.episodes}
              </span>
              <span style={{ color: '#71717a' }}>•</span>
              <span style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 600 }}>
                {serial.year} • 4K HDR
              </span>
            </div>

            <h4
              style={{
                fontSize: '18px',
                fontWeight: 900,
                color: '#ffffff',
                margin: '0 0 12px',
                lineHeight: 1.25,
                letterSpacing: '-0.3px',
                textShadow: '0 2px 10px rgba(0,0,0,0.9)',
              }}
            >
              {serial.title}
            </h4>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPlayMovie({
                  id: serial.id,
                  title: serial.title,
                  posterUrl: serial.poster,
                  genres: serial.genres,
                  resolution: '4K UHD',
                });
              }}
              style={{
                width: '100%',
                padding: '10px 14px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                borderRadius: '12px',
                fontSize: '12.5px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 18px rgba(0,0,0,0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = serial.badgeColor;
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = serial.badgeColor;
                e.currentTarget.style.boxShadow = `0 6px 22px ${serial.badgeColor}80`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.4)';
              }}
            >
              <Play size={13} fill="currentColor" color="currentColor" />
              <span>Watch Series Now</span>
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export const Skiper30ParallaxGallery: React.FC<{
  onPlayMovie: (item: any) => void;
}> = ({ onPlayMovie }) => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 800 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start'],
  });

  const { height } = dimension;

  // Asymmetric vertical parallax speeds with zero input lag (driven directly by Lenis scroll)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 1.15]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 1.85]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 0.8]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 1.55]);

  useEffect(() => {
    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 12 Curated 4K Original Series Across 4 Asymmetric Parallax Columns
  const column1: SerialItem[] = [
    {
      id: 'serial-01',
      title: 'The Mandalorians: Outer Rim',
      tag: 'SEASON 4 • NEW',
      badgeColor: '#f59e0b',
      poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
      rating: '9.4',
      episodes: '32 Episodes',
      genres: ['Space Opera', 'Action'],
      year: 2026,
    },
    {
      id: 'serial-05',
      title: 'Altered Matrix: Neo Tokyo',
      tag: 'SEASON 2 • ULTRA HD',
      badgeColor: '#06b6d4',
      poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      rating: '9.2',
      episodes: '16 Episodes',
      genres: ['Cyberpunk', 'Sci-Fi'],
      year: 2025,
    },
    {
      id: 'serial-09',
      title: 'The Crimson Horizon',
      tag: 'SEASON 1 • PREMIERE',
      badgeColor: '#e11d48',
      poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
      rating: '9.3',
      episodes: '12 Episodes',
      genres: ['Thriller', 'Drama'],
      year: 2026,
    },
  ];

  const column2: SerialItem[] = [
    {
      id: 'serial-02',
      title: 'Neon Syndicate: Cyber Dynasty',
      tag: 'SEASON 3 • 4K HDR',
      badgeColor: '#e11d48',
      poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
      rating: '8.9',
      episodes: '24 Episodes',
      genres: ['Cyberpunk', 'Crime Drama'],
      year: 2025,
    },
    {
      id: 'serial-06',
      title: 'Chrono-Rift: Timeline Zero',
      tag: 'COMPLETE SAGA',
      badgeColor: '#8b5cf6',
      poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
      rating: '9.5',
      episodes: '28 Episodes',
      genres: ['Sci-Fi', 'Mystery'],
      year: 2026,
    },
    {
      id: 'serial-10',
      title: 'Valkyrie: Orbital Defense',
      tag: 'SEASON 2 • DOLBY VISION',
      badgeColor: '#10b981',
      poster: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
      rating: '9.1',
      episodes: '18 Episodes',
      genres: ['Action', 'Sci-Fi'],
      year: 2025,
    },
  ];

  const column3: SerialItem[] = [
    {
      id: 'serial-03',
      title: 'Dark Orbit: Station 9',
      tag: 'COMPLETE SERIES',
      badgeColor: '#a855f7',
      poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
      rating: '9.0',
      episodes: '10 Episodes',
      genres: ['Sci-Fi Horror', 'Drama'],
      year: 2026,
    },
    {
      id: 'serial-07',
      title: 'Shadows of Manhattan 1948',
      tag: 'SEASON 1 • NOIR',
      badgeColor: '#f59e0b',
      poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
      rating: '9.3',
      episodes: '14 Episodes',
      genres: ['Noir', 'Mystery'],
      year: 2025,
    },
    {
      id: 'serial-11',
      title: 'Solaris Exodus',
      tag: 'NEW RELEASE',
      badgeColor: '#ec4899',
      poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      rating: '9.4',
      episodes: '22 Episodes',
      genres: ['Epic', 'Drama'],
      year: 2026,
    },
  ];

  const column4: SerialItem[] = [
    {
      id: 'serial-04',
      title: 'Starborne: Astral Explorers',
      tag: 'SEASON 2 • KIDS & FAMILY',
      badgeColor: '#38bdf8',
      poster: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      rating: '8.7',
      episodes: '20 Episodes',
      genres: ['Kids', 'Animation'],
      year: 2025,
    },
    {
      id: 'serial-08',
      title: 'Dune: Desert Sovereigns',
      tag: 'SEASON 3 • IMAX 4K',
      badgeColor: '#d97706',
      poster: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=80',
      rating: '9.6',
      episodes: '26 Episodes',
      genres: ['Sci-Fi', 'Adventure'],
      year: 2026,
    },
    {
      id: 'serial-12',
      title: 'Arcadia Protocol',
      tag: 'FINALE SEASON',
      badgeColor: '#a855f7',
      poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
      rating: '9.2',
      episodes: '16 Episodes',
      genres: ['Thriller', 'Crime'],
      year: 2025,
    },
  ];

  return (
    <div style={{ marginTop: '72px', borderTop: '1px solid rgba(184, 29, 74, 0.16)', paddingTop: '48px' }}>
      {/* Header with Title & Badge */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(225, 29, 72, 0.12)',
              border: '1px solid rgba(225, 29, 72, 0.35)',
              marginBottom: '10px',
            }}
          >
            <Sparkles size={13} color="#e11d48" />
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#fda4af',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              SKIPER 30 • MULTI-COLUMN PARALLAX GALLERY
            </span>
          </div>

          <h3
            style={{
              fontSize: '34px',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.8px',
              margin: '0 0 6px',
            }}
          >
            Original Serials & <span className="gradient-text">TV Shows</span>
          </h3>

          <p style={{ color: '#a1a1aa', fontSize: '14.5px', maxWidth: '640px', margin: 0 }}>
            Scroll down to experience multi-column asymmetric parallax motion. Parallel storylines glide across each other at independent velocities.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
          <span
            style={{
              fontSize: '13px',
              color: '#fda4af',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>4 Seasons Available in 4K HDR • Dolby Atmos</span>
          </span>
          <span style={{ fontSize: '12px', color: '#71717a', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowDown size={13} className="animate-bounce" color="#b81d4a" />
            <span>Scroll vertically to engage parallax columns</span>
          </span>
        </div>
      </div>

      {/* Skiper30 Parallax Stage Container */}
      <div
        ref={gallery}
        className="skiper30-parallax-gallery-container"
        style={{
          position: 'relative',
          height: '1100px',
          borderRadius: '28px',
          overflow: 'hidden',
          backgroundColor: '#050308',
          border: '1px solid rgba(184, 29, 74, 0.22)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          display: 'flex',
          gap: '24px',
          padding: '24px',
        }}
      >
        {/* Top Smooth Vignette Fade Overlay (Zero-overhead GPU compositor) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '90px',
            background: 'linear-gradient(180deg, #050308 0%, rgba(5, 3, 8, 0.8) 50%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* Bottom Smooth Vignette Fade Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '90px',
            background: 'linear-gradient(0deg, #050308 0%, rgba(5, 3, 8, 0.8) 50%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* Ambient Glow Atmosphere Behind Columns (Pure GPU Radial Falloff, Zero Blur Overhead) */}
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '8%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 0, 50, 0.22) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '8%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(184, 29, 74, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* 4 Asymmetric Parallax Columns */}
        <ParallaxColumn serials={column1} y={y1} topOffset="-32%" onPlayMovie={onPlayMovie} />
        <ParallaxColumn serials={column2} y={y2} topOffset="-68%" onPlayMovie={onPlayMovie} />
        <ParallaxColumn serials={column3} y={y3} topOffset="-26%" onPlayMovie={onPlayMovie} />
        <ParallaxColumn serials={column4} y={y4} topOffset="-54%" onPlayMovie={onPlayMovie} />
      </div>
    </div>
  );
};

export default Skiper30ParallaxGallery;
