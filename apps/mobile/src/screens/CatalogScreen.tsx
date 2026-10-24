import React, { useState } from 'react';
import {
  Play,
  Plus,
  Check,
  Star,
  Search,
  ChevronRight,
  Flame,
  Sparkles,
  Bookmark,
  Film,
} from 'lucide-react';
import { ContentItem, MOCK_CONTENT } from '@nexora/shared';

interface CatalogScreenProps {
  title?: string;
  typeFilter?: 'movie' | 'series' | 'sports' | 'kids';
  onSelectItem: (item: ContentItem) => void;
  onPlayItem: (item: ContentItem) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  title = 'Movies',
  typeFilter = 'movie',
  onSelectItem,
  onPlayItem,
}) => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [isFavorite, setIsFavorite] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const allMovies = typeFilter
    ? MOCK_CONTENT.filter((c) => c.type === typeFilter)
    : MOCK_CONTENT.filter((c) => c.type === 'movie');

  const genres = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Thriller', 'Animation', 'All'];

  const filteredMovies =
    selectedGenre === 'All'
      ? allMovies
      : allMovies.filter((m) =>
          m.genres.some((g) => g.toLowerCase().includes(selectedGenre.toLowerCase()))
        );

  // Trending Now 3 prominent items matching screenshot 1
  const trendingNow = [
    {
      id: 'trend-1',
      title: 'Neon Harbor',
      category: 'Cyberpunk • Action',
      rating: '9.3',
      bgGrad: 'linear-gradient(180deg, #1e3a8a 0%, #0f172a 100%)',
      img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'trend-2',
      title: 'Red Sands',
      category: 'Sci-Fi • Odyssey',
      rating: '9.6',
      bgGrad: 'linear-gradient(180deg, #8B0000 0%, #2e0808 100%)',
      img: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'trend-3',
      title: 'Deep Forest',
      category: 'Mystery • Thriller',
      rating: '9.1',
      bgGrad: 'linear-gradient(180deg, #064e3b 0%, #022c22 100%)',
      img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '16px',
        paddingBottom: '36px',
        backgroundColor: '#050508',
        color: '#FFFFFF',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER: "Movies" + Search Icon (MATCHING SCREENSHOT 1)
      ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '4px',
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 900,
            color: '#FFFFFF',
            margin: 0,
            letterSpacing: '-0.5px',
          }}
        >
          {title}
        </h1>

        <button
          onClick={() => alert('Search 4K Movies activated...')}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <Search size={18} />
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. FEATURED HERO CARD (MATCHING SCREENSHOT 1)
      ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          borderRadius: '24px',
          overflow: 'hidden',
          position: 'relative',
          height: '270px',
          backgroundColor: '#120a14',
          border: '1px solid rgba(139, 0, 0, 0.45)',
          boxShadow: '0 16px 36px rgba(0, 0, 0, 0.7), 0 0 30px rgba(139, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '20px',
          background: `
            linear-gradient(180deg, rgba(5,5,8,0.1) 0%, rgba(5,5,8,0.7) 60%, #050508 100%),
            radial-gradient(ellipse 90% 80% at 80% 20%, rgba(139, 0, 0, 0.65), transparent 70%),
            url("https://images.unsplash.com/photo-1534447677768-be436bb09401?w=900&auto=format&fit=crop&q=85") center/cover no-repeat
          `,
          transform: 'translateZ(0)',
        }}
      >
        {/* Pre-title tag */}
        <div
          style={{
            fontSize: '12px',
            fontWeight: 800,
            color: '#ff9999',
            marginBottom: '4px',
            letterSpacing: '0.3px',
          }}
        >
          Featured • Thriller
        </div>

        {/* Big Title */}
        <h2
          style={{
            fontSize: '26px',
            fontWeight: 900,
            color: '#FFFFFF',
            margin: '0 0 16px 0',
            letterSpacing: '-0.4px',
            textShadow: '0 2px 10px rgba(0,0,0,0.85)',
          }}
        >
          Last Signal
        </h2>

        {/* Two Action Buttons: Play + My List (Screenshot 1) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => onPlayItem(allMovies[0])}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: '#8B0000',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '999px',
              padding: '11px 26px',
              fontSize: '14px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(139, 0, 0, 0.6)',
              transition: 'transform 0.15s ease',
            }}
          >
            <Play size={15} fill="#FFFFFF" color="#FFFFFF" />
            <span>Play</span>
          </button>

          <button
            onClick={() => setIsFavorite(!isFavorite)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#FFFFFF',
              borderRadius: '999px',
              padding: '11px 20px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
            }}
          >
            {isFavorite ? <Check size={15} color="#4ade80" /> : <Plus size={15} />}
            <span>My list</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. TRENDING NOW SECTION (MATCHING SCREENSHOT 1)
      ───────────────────────────────────────────────────────────── */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
            Trending now
          </h3>
          <button
            onClick={() => setSelectedGenre('All')}
            style={{
              background: 'none',
              border: 'none',
              color: '#8B0000',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            See all
          </button>
        </div>

        {/* 3 Large Rounded Posters (Screenshot 1) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
          }}
        >
          {trendingNow.map((item) => {
            const isHover = hoveredCard === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(allMovies[0])}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  borderRadius: '16px',
                  height: '175px',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  border: isHover ? '1px solid #8B0000' : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: isHover
                    ? '0 12px 28px rgba(0, 0, 0, 0.8), 0 0 18px rgba(139, 0, 0, 0.4)'
                    : '0 6px 16px rgba(0, 0, 0, 0.5)',
                  transform: isHover ? 'translateY(-4px) scale(1.03)' : 'none',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '12px 10px',
                  background: `
                    linear-gradient(180deg, transparent 40%, rgba(5,5,8,0.95) 100%),
                    ${item.bgGrad}
                  `,
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.55,
                  }}
                />
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 900,
                      color: '#FFFFFF',
                      lineHeight: 1.2,
                    }}
                  >
                    {item.title}
                  </div>
                  <div style={{ fontSize: '9px', color: '#a1a1aa', marginTop: '2px' }}>
                    ★ {item.rating}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. BROWSE BY GENRE (MATCHING SCREENSHOT 1)
      ───────────────────────────────────────────────────────────── */}
      <div>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 900,
            color: '#FFFFFF',
            margin: '0 0 12px 0',
          }}
        >
          Browse by genre
        </h3>

        {/* Genre Pill Chips (Screenshot 1) */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'none',
          }}
        >
          {genres.map((g) => {
            const isActive = selectedGenre.toLowerCase() === g.toLowerCase();
            return (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                style={{
                  flexShrink: 0,
                  border: isActive ? '1px solid #8B0000' : '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '999px',
                  padding: '8px 18px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  backgroundColor: isActive ? '#8B0000' : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? '#FFFFFF' : '#a1a1aa',
                  boxShadow: isActive ? '0 0 14px rgba(139, 0, 0, 0.45)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. 3D MOVIES GRID (BURGUNDY & BLACK LUXURY)
      ───────────────────────────────────────────────────────────── */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>
            {selectedGenre === 'All' ? 'All Blockbusters' : `${selectedGenre} Titles`}
          </span>
          <span style={{ fontSize: '11px', color: '#71717a' }}>{filteredMovies.length} movies</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
          }}
        >
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onSelectItem(movie)}
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ position: 'relative', height: '220px' }}>
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    backgroundColor: '#8B0000',
                    color: '#FFFFFF',
                    fontSize: '9px',
                    fontWeight: 900,
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  {movie.quality}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: 'rgba(5, 5, 8, 0.85)',
                    color: '#facc15',
                    fontSize: '9px',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  ★ {movie.rating}
                </div>
              </div>

              <div style={{ padding: '10px' }}>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: '2px',
                  }}
                >
                  {movie.title}
                </div>
                <div style={{ fontSize: '11px', color: '#71717a' }}>
                  {movie.releaseYear} • {movie.genres[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
