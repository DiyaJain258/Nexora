import React, { useState } from 'react';
import {
  Play,
  Plus,
  Check,
  Star,
  Film,
  Sparkles,
  Info,
  Clock,
  Volume2,
  Tv,
  ChevronRight,
  Flame,
  Zap,
} from 'lucide-react';
import {
  ContentItem,
  Channel,
  ContinueWatchingItem,
  MOCK_CONTENT,
  MOCK_CHANNELS,
  MOCK_CONTINUE_WATCHING,
} from '@nexora/shared';

interface HomeScreenProps {
  onSelectItem: (item: ContentItem) => void;
  onSelectChannel: (channel: Channel) => void;
  onPlayItem: (item: ContentItem | Channel) => void;
  favorites: string[];
  onToggleFavorite: (item: ContentItem) => void;
}

// Curated Top Rated Films with explicit 2:3 cinematic aspect ratio posters
const TOP_RATED_FILMS = [
  {
    id: 'tr-01',
    title: 'Interstellar',
    year: '2014',
    rating: '9.4',
    quality: '4K IMAX',
    genre: 'Sci-Fi',
    posterUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=85',
    backdropUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1600&auto=format&fit=crop&q=85',
    duration: '2h 49m',
    director: 'Christopher Nolan',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
  },
  {
    id: 'tr-02',
    title: 'Dune: Part Two',
    year: '2024',
    rating: '9.3',
    quality: '4K HDR10+',
    genre: 'Epic Sci-Fi',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=85',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=85',
    duration: '2h 46m',
    director: 'Denis Villeneuve',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators.',
  },
  {
    id: 'tr-03',
    title: 'Oppenheimer',
    year: '2023',
    rating: '9.2',
    quality: 'IMAX 70MM',
    genre: 'Drama',
    posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=85',
    backdropUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600&auto=format&fit=crop&q=85',
    duration: '3h 00m',
    director: 'Christopher Nolan',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the Manhattan Project.',
  },
  {
    id: 'tr-04',
    title: 'Blade Runner 2049',
    year: '2017',
    rating: '9.1',
    quality: '4K DOLBY',
    genre: 'Cyberpunk',
    posterUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=85',
    backdropUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&auto=format&fit=crop&q=85',
    duration: '2h 44m',
    director: 'Denis Villeneuve',
    description: 'Young Blade Runner K unearths a long-buried secret that leads him to former runner Rick Deckard.',
  },
  {
    id: 'tr-05',
    title: 'The Dark Knight',
    year: '2008',
    rating: '9.5',
    quality: '4K REMASTER',
    genre: 'Action',
    posterUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=85',
    backdropUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1600&auto=format&fit=crop&q=85',
    duration: '2h 32m',
    director: 'Christopher Nolan',
    description: 'When the menace known as the Joker wreaks havoc and chaos on Gotham, Batman must accept his greatest test.',
  },
  {
    id: 'tr-06',
    title: 'Inception',
    year: '2010',
    rating: '9.3',
    quality: '4K HDR',
    genre: 'Mind-Bender',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=85',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=85',
    duration: '2h 28m',
    director: 'Christopher Nolan',
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.',
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectItem,
  onSelectChannel,
  onPlayItem,
  favorites,
  onToggleFavorite,
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredMovieId, setHoveredMovieId] = useState<string | null>(null);
  const [isHeroWatchlisted, setIsHeroWatchlisted] = useState(false);

  // Hero Blockbuster Movie: Interstellar
  const heroMovie = TOP_RATED_FILMS[0];

  const categories = ['All', 'Movies', 'Series', 'Live TV', 'Sci-Fi', 'Action', '4K Cinema'];

  return (
    <div
      style={{
        backgroundColor: 'transparent',
        color: '#FFFFFF',
        minHeight: '100%',
        paddingBottom: '40px',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflowX: 'hidden',
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. CATEGORY PILLS FILTER RAIL
      ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          padding: '14px 16px 10px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                flexShrink: 0,
                padding: '6px 16px',
                borderRadius: '999px',
                border: isActive ? '1px solid #FF0D2E' : '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: isActive ? 'rgba(255, 13, 46, 0.16)' : 'rgba(255, 255, 255, 0.04)',
                color: isActive ? '#FFFFFF' : '#9CA3AF',
                fontSize: '12px',
                fontWeight: isActive ? 800 : 600,
                cursor: 'pointer',
                boxShadow: isActive ? '0 0 14px rgba(255, 13, 46, 0.45)' : 'none',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. EXPANSIVE HERO BLOCKBUSTER MOVIE SECTION: 'INTERSTELLAR'
             - Expansive wide aspect card (border-radius: 20px)
             - Active dynamic ambient glow underneath banner (blur: 24px, opacity: 0.3)
      ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '8px 16px 20px', position: 'relative' }}>
        {/* Dynamic Ambient Glow Effect that adapts to cover art */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '24px',
            right: '24px',
            bottom: '10px',
            backgroundImage: `url("${heroMovie.backdropUrl}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(24px)',
            WebkitFilter: 'blur(24px)',
            opacity: 0.3,
            borderRadius: '24px',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Expansive Wide Aspect Card */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            borderRadius: '20px',
            overflow: 'hidden',
            aspectRatio: '16 / 10',
            minHeight: '290px',
            backgroundColor: '#121214',
            border: '1px solid rgba(255, 13, 46, 0.35)',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 13, 46, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '20px 18px',
            background: `
              linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.65) 55%, #0A0A0A 100%),
              linear-gradient(90deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.5) 55%, transparent 100%),
              url("${heroMovie.backdropUrl}") center/cover no-repeat
            `,
          }}
        >
          {/* Top Tag Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                backgroundColor: '#FF0D2E',
                color: '#FFFFFF',
                fontSize: '9px',
                fontWeight: 900,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '3px 8px',
                borderRadius: '4px',
                boxShadow: '0 0 12px rgba(255, 13, 46, 0.6)',
              }}
            >
              NEXORA 4K ORIGINAL
            </span>

            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)',
                color: '#F3F4F6',
                fontSize: '10px',
                fontWeight: 800,
                padding: '3px 7px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              IMAX ENHANCED
            </span>

            <span
              style={{
                backgroundColor: 'rgba(255, 13, 46, 0.15)',
                color: '#FF0D2E',
                fontSize: '10px',
                fontWeight: 800,
                padding: '3px 7px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 13, 46, 0.3)',
              }}
            >
              DOLBY ATMOS
            </span>
          </div>

          {/* Blockbuster Title */}
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#FFFFFF',
              margin: '0 0 6px 0',
              letterSpacing: '-0.5px',
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.9)',
            }}
          >
            {heroMovie.title}
          </h1>

          {/* Clean Metadata Line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              fontSize: '11px',
              color: '#D1D5DB',
              marginBottom: '10px',
              fontWeight: 600,
            }}
          >
            <span style={{ color: '#FF0D2E', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Star size={12} fill="#FF0D2E" color="#FF0D2E" /> {heroMovie.rating}
            </span>
            <span>•</span>
            <span>{heroMovie.year}</span>
            <span>•</span>
            <span>{heroMovie.duration}</span>
            <span>•</span>
            <span style={{ color: '#9CA3AF' }}>Dir. {heroMovie.director}</span>
          </div>

          {/* Synopsis */}
          <p
            style={{
              fontSize: '12px',
              lineHeight: 1.5,
              color: '#9CA3AF',
              margin: '0 0 16px 0',
              maxWidth: '480px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {heroMovie.description}
          </p>

          {/* Hero Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => onPlayItem(MOCK_CONTENT[0])}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: '#FF0D2E',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '999px',
                padding: '11px 22px',
                fontSize: '13px',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 0 24px rgba(255, 13, 46, 0.65)',
                transition: 'transform 0.15s ease',
              }}
            >
              <Play size={14} fill="#FFFFFF" color="#FFFFFF" />
              <span>Watch Now</span>
            </button>

            <button
              onClick={() => setIsHeroWatchlisted(!isHeroWatchlisted)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                borderRadius: '999px',
                padding: '11px 18px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
              }}
            >
              {isHeroWatchlisted ? <Check size={14} color="#4ade80" /> : <Plus size={14} />}
              <span>{isHeroWatchlisted ? 'Watchlisted' : 'Watchlist'}</span>
            </button>

            <button
              onClick={() => onSelectItem(MOCK_CONTENT[0])}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#D1D5DB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Info size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. HORIZONTALLY SCROLLABLE 'TOP RATED FILMS'
             - 2:3 cinematic aspect ratio cards
             - Tight padding (6px - 8px)
             - Clean typography
      ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '8px 16px 24px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 900,
                color: '#FF0D2E',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: '2px',
              }}
            >
              CINEMATIC MASTERWORKS
            </div>
            <h2 style={{ fontSize: '19px', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
              Top Rated Films
            </h2>
          </div>

          <button
            onClick={() => setActiveCategory('Movies')}
            style={{
              background: 'none',
              border: 'none',
              color: '#FF0D2E',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            <span>See all</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* 2:3 Cinematic Aspect Ratio Cards Container */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '12px',
            scrollbarWidth: 'none',
          }}
        >
          {TOP_RATED_FILMS.map((film) => {
            const isHovered = hoveredMovieId === film.id;
            return (
              <div
                key={film.id}
                onClick={() => onSelectItem(MOCK_CONTENT[0])}
                onMouseEnter={() => setHoveredMovieId(film.id)}
                onMouseLeave={() => setHoveredMovieId(null)}
                style={{
                  width: '136px',
                  flexShrink: 0,
                  cursor: 'pointer',
                  transform: isHovered ? 'scale(1.04) translateY(-3px)' : 'none',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {/* 2:3 Poster Frame */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '2 / 3',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#161618',
                    border: isHovered
                      ? '1.5px solid #FF0D2E'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: isHovered
                      ? '0 12px 28px rgba(0, 0, 0, 0.8), 0 0 18px rgba(255, 13, 46, 0.45)'
                      : '0 6px 16px rgba(0, 0, 0, 0.6)',
                    marginBottom: '8px',
                  }}
                >
                  <img
                    src={film.posterUrl}
                    alt={film.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  {/* Top Quality Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '6px',
                      left: '6px',
                      backgroundColor: 'rgba(10, 10, 10, 0.85)',
                      backdropFilter: 'blur(6px)',
                      color: '#FF0D2E',
                      fontSize: '8px',
                      fontWeight: 900,
                      padding: '2px 5px',
                      borderRadius: '3px',
                      border: '1px solid rgba(255, 13, 46, 0.35)',
                    }}
                  >
                    {film.quality}
                  </div>

                  {/* Bottom Rating Pill */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '6px',
                      right: '6px',
                      backgroundColor: 'rgba(10, 10, 10, 0.85)',
                      backdropFilter: 'blur(6px)',
                      color: '#FFFFFF',
                      fontSize: '9px',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                    }}
                  >
                    <Star size={10} fill="#FF0D2E" color="#FF0D2E" />
                    <span>{film.rating}</span>
                  </div>
                </div>

                {/* Clean Typography Section with Tight Padding */}
                <div style={{ padding: '0 2px' }}>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      lineHeight: 1.25,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginBottom: '2px',
                    }}
                  >
                    {film.title}
                  </div>
                  <div
                    style={{
                      fontSize: '10px',
                      color: '#6B7280',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>{film.year}</span>
                    <span>•</span>
                    <span style={{ color: '#9CA3AF' }}>{film.genre}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. CONTINUE WATCHING WITH NEON CRIMSON PROGRESS BAR
      ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '0 16px 24px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
            Continue Watching
          </h2>
          <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>3 in progress</span>
        </div>

        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '6px' }}>
          {MOCK_CONTINUE_WATCHING.map((cw) => {
            const matched = MOCK_CONTENT.find((c) => c.id === cw.contentId) || MOCK_CONTENT[0];
            return (
              <div
                key={cw.id}
                onClick={() => onPlayItem(matched)}
                style={{
                  width: '210px',
                  flexShrink: 0,
                  borderRadius: '14px',
                  overflow: 'hidden',
                  backgroundColor: '#121214',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.6)',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ position: 'relative', height: '115px' }}>
                  <img
                    src={matched.backdropUrl}
                    alt={matched.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        backgroundColor: '#FF0D2E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 16px rgba(255, 13, 46, 0.7)',
                      }}
                    >
                      <Play size={14} fill="#FFFFFF" color="#FFFFFF" />
                    </div>
                  </div>

                  {/* Neon Crimson Progress Bar */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    <div
                      style={{
                        width: `${cw.progressPercentage}%`,
                        height: '100%',
                        backgroundColor: '#FF0D2E',
                        boxShadow: '0 0 8px #FF0D2E',
                      }}
                    />
                  </div>
                </div>

                <div style={{ padding: '10px 12px' }}>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {matched.title}
                  </div>
                  <div style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '2px' }}>
                    {cw.progressPercentage}% watched • 4K HDR
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. LIVE NOW PREMIERES WITH PULSE INDICATOR
      ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '0 16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#FF0D2E',
                boxShadow: '0 0 8px #FF0D2E',
              }}
            />
            <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
              Live Channels & Sports
            </h2>
          </div>
          <button
            onClick={() => onSelectChannel(MOCK_CHANNELS[0])}
            style={{
              background: 'none',
              border: 'none',
              color: '#FF0D2E',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            All Channels →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {[
            {
              id: 'ch-live-1',
              name: 'ESPN 4K UHD',
              category: 'Live Football',
              color: '#1e3a8a',
            },
            {
              id: 'ch-live-2',
              name: 'Sky Cinema',
              category: 'Blockbuster',
              color: '#701a75',
            },
            {
              id: 'ch-live-3',
              name: 'Eurosport 1',
              category: 'F1 Grand Prix',
              color: '#065f46',
            },
          ].map((ch, idx) => (
            <div
              key={ch.id}
              onClick={() => onSelectChannel(MOCK_CHANNELS[idx] || MOCK_CHANNELS[0])}
              style={{
                borderRadius: '12px',
                height: '100px',
                backgroundColor: '#121214',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.5)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: '#FF0D2E',
                  }}
                />
                <span style={{ fontSize: '9px', fontWeight: 900, color: '#FF0D2E' }}>LIVE</span>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 900, color: '#FFFFFF' }}>{ch.name}</div>
                <div style={{ fontSize: '9px', color: '#9CA3AF' }}>{ch.category}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
