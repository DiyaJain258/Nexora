import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Play, Star, Sparkles, Film, ArrowDown } from 'lucide-react';
import { ContentItem } from '@nexora/shared';

interface StickyCardProps {
  i: number;
  item: {
    title: string;
    tagline: string;
    synopsis: string;
    rating: number;
    year: number;
    quality: string;
    src: string;
    accentColor: string;
    movie: any;
  };
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  onPlayMovie?: (movie: any) => void;
}

const StickyCard_001: React.FC<StickyCardProps> = ({
  i,
  item,
  progress,
  range,
  targetScale,
  onPlayMovie,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex items-center justify-center"
      style={{
        position: 'sticky',
        top: '12vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '40px',
      }}
    >
      <motion.div
        style={{
          scale,
          top: `calc(${i * 24}px)`,
          width: '92%',
          maxWidth: '920px',
          height: '460px',
          borderRadius: '28px',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#070a14',
          border: `1.5px solid ${item.accentColor}`,
          boxShadow: `0 25px 70px rgba(0, 0, 0, 0.85), 0 0 35px ${item.accentColor}33`,
          transformOrigin: 'top center',
        }}
        whileHover={{ scale: 1.01 }}
      >
        {/* Full Cinematic Backdrop Image */}
        <img
          src={item.src}
          alt={item.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.72) contrast(1.1)',
          }}
        />

        {/* Ambient Gradient Lighting */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(3, 5, 13, 0.2) 0%, rgba(3, 5, 13, 0.7) 50%, rgba(3, 5, 13, 0.96) 100%)',
          }}
        />

        {/* Card Number & Top Quality Indicator */}
        <div
          style={{
            position: 'absolute',
            top: '24px',
            left: '28px',
            right: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(10, 10, 14, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 900, color: '#fda4af' }}>
              VAULT COLLECTION #0{i + 1}
            </span>
            <span style={{ color: '#71717a' }}>•</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>
              {item.quality}
            </span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(5, 7, 14, 0.8)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(251, 191, 36, 0.35)',
              color: '#fbbf24',
              fontSize: '13px',
              fontWeight: 800,
            }}
          >
            <Star size={14} fill="#fbbf24" color="#fbbf24" />
            <span>{item.rating} / 10</span>
          </div>
        </div>

        {/* Bottom Content Metadata Panel */}
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            left: '28px',
            right: '28px',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '24px',
          }}
        >
          <div style={{ maxWidth: '580px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 800,
                color: item.accentColor,
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              {item.tagline}
            </span>
            <h3
              style={{
                fontSize: '32px',
                fontWeight: 900,
                color: '#ffffff',
                margin: '6px 0 10px',
                lineHeight: 1.15,
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: '#cbd5e1',
                lineHeight: 1.5,
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {item.synopsis}
            </p>
          </div>

          <button
            onClick={() => onPlayMovie && onPlayMovie(item.movie)}
            style={{
              padding: '14px 26px',
              borderRadius: '16px',
              background: `linear-gradient(135deg, ${item.accentColor} 0%, #be123c 100%)`,
              color: '#ffffff',
              border: 'none',
              fontSize: '14px',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: `0 0 25px ${item.accentColor}66`,
              flexShrink: 0,
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1.0)';
            }}
          >
            <Play size={16} fill="#ffffff" color="#ffffff" />
            <span>Stream in 4K UHD</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const Skiper16StickyCards: React.FC<{ onPlayMovie?: (movie: any) => void }> = ({ onPlayMovie }) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const showcaseVault = [
    {
      title: 'Echoes of Tomorrow: Timeline Collapse',
      tagline: 'PREMIERE ULTRA CINEMA • TIME DILATION',
      synopsis: 'A deep-space expedition accidentally dislodges an ancient cosmic frequency, causing past, present, and future timelines to overlap across human civilization.',
      rating: 9.6,
      year: 2026,
      quality: '4K HDR • DOLBY ATMOS',
      src: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
      accentColor: '#e11d48',
      movie: {
        id: 'vault-01',
        title: 'Echoes of Tomorrow',
        posterUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        genres: ['Sci-Fi', 'Thriller'],
        resolution: '4K UHD',
      },
    },
    {
      title: 'Dune: Prophecy of Arrakis',
      tagline: 'DESERT WARFARE • THE SPICE GUILD',
      synopsis: 'Paul Atreides unites the desert tribes of Arrakis across the golden dunes to wage holy vengeance against the interstellar imperial armada.',
      rating: 9.5,
      year: 2026,
      quality: 'IMAX ENHANCED • 60 FPS',
      src: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1600&auto=format&fit=crop&q=80',
      accentColor: '#d97706',
      movie: {
        id: 'vault-02',
        title: 'Dune: Prophecy of Arrakis',
        posterUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=80',
        genres: ['Epic', 'Sci-Fi'],
        resolution: '4K UHD',
      },
    },
    {
      title: 'Galactic Chronicles: The Mandalorians',
      tagline: 'OUTER RIM CONFLICT • BESKAR ARMOR',
      synopsis: 'A lone Mandalorian gunslinger journeys beyond uncharted star sectors, guarding an ancient lineage against remnants of the dark imperial fleet.',
      rating: 9.4,
      year: 2026,
      quality: '4K HDR • DOLBY VISION',
      src: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&auto=format&fit=crop&q=80',
      accentColor: '#f43f5e',
      movie: {
        id: 'vault-03',
        title: 'The Mandalorians: Outer Rim',
        posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
        genres: ['Space Opera', 'Action'],
        resolution: '4K UHD',
      },
    },
    {
      title: 'Neon Syndicate: Cyber Dynasty 2099',
      tagline: 'RAIN-DRENCHED NEO-SEOUL • NEURAL CYBERNETICS',
      synopsis: 'Underground cyber-mercenaries fight through holographic skyscrapers and black-market neural cartels in a dystopian metropolis.',
      rating: 9.1,
      year: 2026,
      quality: '4K HEVC • 19.4 MBPS',
      src: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&auto=format&fit=crop&q=80',
      accentColor: '#be123c',
      movie: {
        id: 'vault-04',
        title: 'Neon Syndicate: Cyber Dynasty',
        posterUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
        genres: ['Cyberpunk', 'Action'],
        resolution: '4K UHD',
      },
    },
    {
      title: 'Interstellar: Beyond Event Horizon',
      tagline: 'WORMHOLE EXPEDITION • TIME PARADOX',
      synopsis: 'A fearless astronaut squadron ventures past gargantuan black holes searching for a sanctuary world to preserve the last remnants of Earth.',
      rating: 9.7,
      year: 2026,
      quality: '4K REMASTER • DOLBY ATMOS 7.1',
      src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80',
      accentColor: '#e2e8f0',
      movie: {
        id: 'vault-05',
        title: 'Interstellar: Beyond Event Horizon',
        posterUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80',
        genres: ['Sci-Fi', 'Cosmic Drama'],
        resolution: '4K UHD',
      },
    },
  ];

  return (
    <section
      id="vault"
      ref={container}
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '30vh',
        paddingTop: '80px',
        backgroundColor: '#050507',
      }}
    >
      {/* Section Headline */}
      <div style={{ textAlign: 'center', marginBottom: '60px', padding: '0 24px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '999px',
            backgroundColor: 'rgba(225, 29, 72, 0.12)',
            border: '1px solid rgba(225, 29, 72, 0.35)',
            marginBottom: '14px',
          }}
        >
          <Sparkles size={14} color="#e11d48" />
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#fda4af', letterSpacing: '1px', textTransform: 'uppercase' }}>
            SKIPER 16 • STICKY STACKING CINEMA VAULT
          </span>
        </div>
        <h2 style={{ fontSize: '42px', fontWeight: 900, color: '#f8fafc', letterSpacing: '-1.5px', margin: '0 0 12px' }}>
          Scroll to Unlock <span className="gradient-text">Legendary 4K Sagas</span>
        </h2>
        <p style={{ color: '#a1a1aa', fontSize: '16px', maxWidth: '620px', margin: '0 auto' }}>
          Experience sticky card-stacking depth transitions. Each blockbuster scales smoothly as you scroll deeper into the catalog.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '20px', color: '#71717a', fontSize: '12px' }}>
          <ArrowDown size={14} className="animate-bounce" color="#e11d48" />
          <span>Keep scrolling down to stack cards</span>
        </div>
      </div>

      {/* Sticky Stack Container */}
      <div style={{ position: 'relative', width: '100%' }}>
        {showcaseVault.map((item, i) => {
          const targetScale = Math.max(0.75, 1 - (showcaseVault.length - i - 1) * 0.05);
          return (
            <StickyCard_001
              key={`vault_${i}`}
              i={i}
              item={item}
              progress={scrollYProgress}
              range={[i * 0.18, 1]}
              targetScale={targetScale}
              onPlayMovie={onPlayMovie}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Skiper16StickyCards;
