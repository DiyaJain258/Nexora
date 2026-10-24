import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Star, Sparkles, Film, ArrowDown, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

export interface Skiper17CardData {
  id: string;
  title: string;
  tagline: string;
  synopsis: string;
  rating: number;
  year: number;
  quality: string;
  image: string;
  badge: string;
  accentColor: string;
  movie?: any;
}

interface Skiper17StickyCardsProps {
  onPlayMovie?: (movie: any) => void;
  className?: string;
}

const DEFAULT_SKI_CARDS: Skiper17CardData[] = [
  {
    id: 'orig-01',
    title: 'Aethelgard: The Chrono Rift',
    tagline: 'QUANTUM CHRONOLOGY • PARALLEL TIMELINES',
    synopsis: 'When a fracture in the quantum continuum collapses orbital station Aegis, Dr. Lyra Vance must navigate five parallel timelines simultaneously to avert universal entropy.',
    rating: 9.3,
    year: 2026,
    quality: '4K HDR • DOLBY ATMOS 7.1',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=85',
    badge: 'NEXORA ORIGINAL • WORLD PREMIERE',
    accentColor: '#e11d48',
    movie: {
      id: 'orig-01',
      title: 'Aethelgard: The Chrono Rift',
      posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
      genres: ['Sci-Fi', 'Action'],
      resolution: '4K HDR',
    },
  },
  {
    id: 'orig-02',
    title: 'Neon Syndicate: Cyber Dynasty',
    tagline: 'RAIN-DRENCHED NEO-SEOUL • NEURAL HACKERS',
    synopsis: 'Underground cyber-mercenaries fight through holographic skyscrapers and black-market neural cartels in a dystopian metropolis.',
    rating: 8.9,
    year: 2026,
    quality: 'IMAX ENHANCED • 60 FPS',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600&auto=format&fit=crop&q=85',
    badge: 'SERIES FINALE • 4K ULTRA',
    accentColor: '#be123c',
    movie: {
      id: 'orig-02',
      title: 'Neon Syndicate: Cyber Dynasty',
      posterUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
      genres: ['Cyberpunk', 'Crime'],
      resolution: '4K UHD',
    },
  },
  {
    id: 'orig-03',
    title: 'Echoes of Tomorrow: Collapse',
    tagline: 'DEEP SPACE EXPEDITION • TIME DILATION',
    synopsis: 'An interstellar exploration crew dislodges an ancient cosmic frequency, causing centuries of future civilization to bleed into the present day.',
    rating: 9.6,
    year: 2026,
    quality: '4K REMASTER • UNCOMPRESSED AUDIO',
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1600&auto=format&fit=crop&q=85',
    badge: 'CRITICS CHOICE 2026',
    accentColor: '#f43f5e',
    movie: {
      id: 'orig-03',
      title: 'Echoes of Tomorrow',
      posterUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      genres: ['Sci-Fi', 'Mystery'],
      resolution: '4K HDR',
    },
  },
  {
    id: 'orig-04',
    title: 'AURORA: Solar Awakening',
    tagline: 'SUPERSTORM PHENOMENON • NEURAL EVOLUTION',
    synopsis: 'A geomagnetic superstorm triggers a bioluminescent atmospheric wave across the Arctic circle, altering human perception and consciousness.',
    rating: 9.2,
    year: 2026,
    quality: 'DOLBY VISION • 19.8 MBPS',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600&auto=format&fit=crop&q=85',
    badge: 'TRENDING #1 WORLDWIDE',
    accentColor: '#fda4af',
    movie: {
      id: 'orig-04',
      title: 'AURORA: Solar Awakening',
      posterUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&auto=format&fit=crop&q=80',
      genres: ['Sci-Fi', 'Thriller'],
      resolution: '4K UHD',
    },
  },
  {
    id: 'orig-05',
    title: 'VOID: The Silent Horizon',
    tagline: 'EVENT HORIZON INFILTRATION • TIMELESS ANOMALY',
    synopsis: 'A lone recon astronaut falls past the accretion ring of a silent micro-singularity where spatial dimensions fold infinitely backwards.',
    rating: 9.4,
    year: 2026,
    quality: '4K UHD • DOLBY ATMOS 7.1',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=85',
    badge: 'FLAGSHIP EXCLUSIVE',
    accentColor: '#ffffff',
    movie: {
      id: 'orig-05',
      title: 'VOID: The Silent Horizon',
      posterUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80',
      genres: ['Sci-Fi', 'Cosmic Drama'],
      resolution: '4K UHD',
    },
  },
];

export const Skiper17StickyCards: React.FC<Skiper17StickyCardsProps> = ({
  onPlayMovie,
  className,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const totalCards = cardElements.length;

      if (totalCards < 2) return;

      // Card 0 starts at position 0%, full scale, no rotation
      gsap.set(cardElements[0], { y: '0%', scale: 1, rotation: 0, opacity: 1, zIndex: 1 });

      // Subsequent cards start tucked 100% below the view
      for (let i = 1; i < totalCards; i++) {
        gsap.set(cardElements[i], {
          y: '100%',
          scale: 1,
          rotation: 0,
          opacity: 1,
          zIndex: i + 1,
        });
      }

      // ScrollTrigger timeline that pins the sticky card deck
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * (totalCards - 0.5)}`,
          pin: true,
          scrub: 0.65,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        const position = i;

        if (!currentCard || !nextCard) continue;

        // Animate current card: scale down, rotate slightly, dim into depth
        scrollTimeline.to(
          currentCard,
          {
            scale: 0.88,
            rotation: i % 2 === 0 ? 3.5 : -3.5,
            y: '-6%',
            filter: 'brightness(0.65)',
            duration: 1,
            ease: 'power1.inOut',
          },
          position,
        );

        // Animate next card: slide up into view over previous card
        scrollTimeline.to(
          nextCard,
          {
            y: '0%',
            duration: 1,
            ease: 'power1.inOut',
          },
          position,
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
      };
    },
    { scope: container },
  );

  return (
    <section
      id="originals"
      ref={container}
      className={cn('relative w-full overflow-hidden bg-[#040306]', className)}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px 16px 48px',
      }}
    >
      {/* Background Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '720px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184, 29, 74, 0.22) 0%, rgba(139, 0, 50, 0.12) 45%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px', zIndex: 10, maxWidth: '780px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '999px',
            backgroundColor: 'rgba(184, 29, 74, 0.16)',
            border: '1px solid rgba(184, 29, 74, 0.45)',
            marginBottom: '10px',
            boxShadow: '0 0 20px rgba(184, 29, 74, 0.25)',
          }}
        >
          <Sparkles size={13} color="#fda4af" />
          <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#fda4af', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
            SKIPER 17 • PINNED 3D PARALLAX DECK
          </span>
        </div>

        <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', fontWeight: 900, color: '#ffffff', letterSpacing: '-1px', margin: '0 0 8px', lineHeight: 1.15 }}>
          Exclusive <span className="gradient-text">NEXORA 4K Sagas</span>
        </h2>
        <p style={{ color: '#a1a1aa', fontSize: '14.5px', maxWidth: '580px', margin: '0 auto', lineHeight: 1.5 }}>
          Scroll down to trigger the GSAP 3D card rotation & pinned depth transition. Each flagship saga reveals with cinematic scale.
        </p>
      </div>

      {/* GSAP Sticky Card Stage */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: '100%',
          maxWidth: '920px',
          height: 'clamp(420px, 62vh, 520px)',
          position: 'relative',
          perspective: '1200px',
          zIndex: 5,
        }}
      >
        {DEFAULT_SKI_CARDS.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '26px',
              overflow: 'hidden',
              backgroundColor: '#0a0710',
              border: `1.5px solid ${card.accentColor}`,
              boxShadow: `0 35px 85px rgba(0, 0, 0, 0.95), 0 0 45px ${card.accentColor}33`,
              transformOrigin: 'center center',
              willChange: 'transform, opacity, filter',
            }}
          >
            {/* Cinematic Poster Image */}
            <img
              src={card.image}
              alt={card.title}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.72) contrast(1.15)',
              }}
            />

            {/* Gradient Atmospheric Overlays */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(5, 5, 8, 0.3) 0%, rgba(5, 5, 8, 0.45) 45%, rgba(5, 5, 8, 0.96) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, rgba(5, 5, 8, 0.88) 0%, rgba(5, 5, 8, 0.45) 55%, transparent 100%)',
              }}
            />

            {/* Top Info Strip */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '24px',
                right: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 2,
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(8, 5, 12, 0.88)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                }}
              >
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: card.accentColor, boxShadow: `0 0 10px ${card.accentColor}` }} />
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#ffffff', letterSpacing: '0.8px' }}>
                  {card.badge}
                </span>
                <span style={{ color: '#71717a' }}>•</span>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#fda4af' }}>
                  {card.quality}
                </span>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(8, 5, 12, 0.88)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(251, 191, 36, 0.35)',
                  color: '#fbbf24',
                  fontSize: '12px',
                  fontWeight: 900,
                }}
              >
                <Star size={13} fill="#fbbf24" color="#fbbf24" />
                <span>{card.rating} / 10</span>
              </div>
            </div>

            {/* Bottom Content Metadata */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '20px',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ maxWidth: '580px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 900,
                      color: card.accentColor,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {card.tagline}
                  </span>
                  <span style={{ color: '#71717a' }}>•</span>
                  <span style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 700 }}>
                    {card.year} • DOLBY ATMOS 7.1
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: 'clamp(24px, 4vw, 34px)',
                    fontWeight: 900,
                    color: '#ffffff',
                    margin: '4px 0 10px',
                    lineHeight: 1.15,
                    letterSpacing: '-0.5px',
                    textShadow: '0 2px 14px rgba(0,0,0,0.9)',
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    fontSize: '13.5px',
                    color: '#cbd5e1',
                    lineHeight: 1.5,
                    margin: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {card.synopsis}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onPlayMovie && onPlayMovie(card.movie || card)}
                className="btn-radiant"
                style={{
                  padding: '14px 26px',
                  borderRadius: '14px',
                  fontSize: '13.5px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexShrink: 0,
                  boxShadow: '0 4px 25px rgba(255, 255, 255, 0.35)',
                }}
              >
                <Play size={15} fill="#050507" color="#050507" />
                <span>Stream in 4K UHD</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '20px',
          color: '#71717a',
          fontSize: '12px',
          zIndex: 10,
        }}
      >
        <ArrowDown size={14} className="animate-bounce" color="#b81d4a" />
        <span>Keep scrolling to reveal next 3D saga</span>
      </div>
    </section>
  );
};

export default Skiper17StickyCards;
