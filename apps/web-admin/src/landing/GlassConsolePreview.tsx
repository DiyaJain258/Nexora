import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Search,
  Bookmark,
  Settings,
  FolderMinus,
  Play,
  Star,
  ChevronRight,
  Flame,
  Clock,
  Sparkles,
} from 'lucide-react';

interface GlassConsolePreviewProps {
  onPlayMovie?: (movie: any) => void;
}

export const GlassConsolePreview: React.FC<GlassConsolePreviewProps> = ({ onPlayMovie }) => {
  const [activeTab, setActiveTab] = useState<'Home' | 'Movies' | 'TV Shows' | 'Trending' | 'My List'>('Home');
  const [activeSidebar, setActiveSidebar] = useState<'home' | 'search' | 'library' | 'settings'>('home');

  const trendingCards = [
    {
      id: 'vod-10',
      title: 'AURORA',
      badge: '4K HDR',
      genre: 'Sci-Fi • Thriller',
      matchScore: '98% Match',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'vod-11',
      title: 'VOID',
      badge: '4K HDR',
      genre: 'Sci-Fi • Thriller',
      matchScore: '95% Match',
      image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'vod-12',
      title: 'THE SILENT CITY',
      badge: '4K HDR',
      genre: 'Sci-Fi • Thriller',
      matchScore: '96% Match',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'vod-13',
      title: 'QUANTUM LEAP',
      badge: '4K HDR',
      genre: 'Sci-Fi • Thriller',
      matchScore: '98% Match',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=80',
    },
  ];

  const continueWatching = [
    {
      id: 'cw-cosmos',
      title: 'COSMOS',
      progress: 75,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'cw-interstellar',
      title: 'INTERSTELLAR ODYSSEY',
      progress: 42,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'cw-ona',
      title: 'ONA',
      progress: 20,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1020px',
        margin: '0 auto',
      }}
    >
      {/* Outer Velvet Burgundy & Platinum Ambient Flare (Replaces Blue) */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-15%',
          right: '-15%',
          bottom: '-15%',
          background: 'radial-gradient(circle at 75% 20%, rgba(225, 29, 72, 0.18) 0%, rgba(136, 19, 55, 0.08) 40%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Main Frosted Glass Tablet Console - Platinum & Deep Noir */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'rgba(12, 12, 16, 0.78)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '1.5px solid rgba(255, 255, 255, 0.16)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.85), 0 0 50px rgba(225, 29, 72, 0.18), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
          borderRadius: '32px',
          overflow: 'hidden',
        }}
        className="glass-console-wrapper"
      >
        {/* Left Vertical Slim Glass Sidebar */}
        <aside
          className="glass-console-sidebar"
          style={{
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(8, 8, 12, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 0',
          }}
        >
          {/* User Profile Avatar with Burgundy Ring */}
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(225, 29, 72, 0.15)',
              border: '2px solid #e11d48',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(225, 29, 72, 0.45)',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 900, color: '#ffffff' }}>S</span>
          </div>

          {/* Navigation Icons Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center' }}>
            <button
              onClick={() => setActiveSidebar('home')}
              style={{
                background: 'transparent',
                border: 'none',
                color: activeSidebar === 'home' ? '#ffffff' : '#71717a',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                transition: 'color 0.2s',
              }}
            >
              <Home size={20} />
              <span style={{ fontSize: '10px', fontWeight: 700 }}>Home</span>
              {activeSidebar === 'home' && (
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#e11d48', boxShadow: '0 0 8px #e11d48' }} />
              )}
            </button>

            <button
              onClick={() => setActiveSidebar('search')}
              style={{
                background: 'transparent',
                border: 'none',
                color: activeSidebar === 'search' ? '#ffffff' : '#71717a',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                transition: 'color 0.2s',
              }}
            >
              <Search size={20} />
              <span style={{ fontSize: '10px', fontWeight: 700 }}>Search</span>
            </button>

            <button
              onClick={() => setActiveSidebar('library')}
              style={{
                background: 'transparent',
                border: 'none',
                color: activeSidebar === 'library' ? '#ffffff' : '#71717a',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                transition: 'color 0.2s',
              }}
            >
              <FolderMinus size={20} />
              <span style={{ fontSize: '10px', fontWeight: 700 }}>Library</span>
            </button>

            <button
              onClick={() => setActiveSidebar('settings')}
              style={{
                background: 'transparent',
                border: 'none',
                color: activeSidebar === 'settings' ? '#ffffff' : '#71717a',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                transition: 'color 0.2s',
              }}
            >
              <Settings size={20} />
              <span style={{ fontSize: '10px', fontWeight: 700 }}>Settings</span>
            </button>
          </div>

          {/* Bottom Switch Profile Icon */}
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#71717a',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 700 }}>S•</span>
          </div>
        </aside>

        {/* Right Main Streaming Stage */}
        <main style={{ padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* Top Featured Hero Banner (ECHOES OF TOMORROW) */}
          <div
            onClick={() =>
              onPlayMovie &&
              onPlayMovie({
                id: 'echoes-of-tomorrow',
                title: 'Echoes of Tomorrow',
                posterUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
                genres: ['Sci-Fi', 'Thriller'],
                resolution: '4K HDR',
              })
            }
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              height: '175px',
              backgroundColor: '#0a0a0f',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '24px 28px',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.7)',
              cursor: 'pointer',
            }}
          >
            {/* Metallic Liquid Wave Art */}
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
              alt="Echoes of Tomorrow"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.65,
                filter: 'brightness(0.7) contrast(1.15)',
              }}
            />

            {/* Dark Vignette Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, rgba(8, 8, 12, 0.95) 0%, rgba(8, 8, 12, 0.45) 60%, transparent 100%)',
              }}
            />

            {/* Top Right Quick Actions */}
            <div
              style={{
                position: 'absolute',
                top: '18px',
                right: '20px',
                display: 'flex',
                gap: '10px',
                zIndex: 2,
              }}
            >
              <button
                type="button"
                style={{
                  background: 'rgba(20, 20, 26, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '6px',
                  color: '#cbd5e1',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Search size={15} />
              </button>
              <button
                type="button"
                style={{
                  background: 'rgba(225, 29, 72, 0.18)',
                  border: '1px solid rgba(225, 29, 72, 0.4)',
                  borderRadius: '8px',
                  padding: '6px',
                  color: '#fda4af',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Bookmark size={15} fill="#fda4af" />
              </button>
            </div>

            {/* Title & Metadata */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#fda4af',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                Featured Premiere
              </span>
              <h2
                style={{
                  fontSize: '28px',
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '-0.5px',
                  margin: '4px 0 0',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
                }}
              >
                ECHOES OF TOMORROW
              </h2>
            </div>
          </div>

          {/* Category Filter Pills (Home, Movies, TV Shows, Trending, My List) */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {(['Home', 'Movies', 'TV Shows', 'Trending', 'My List'] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    backgroundColor: isActive ? '#be123c' : 'rgba(255, 255, 255, 0.04)',
                    color: isActive ? '#ffffff' : '#a1a1aa',
                    border: isActive ? '1px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: isActive ? '0 0 18px rgba(225, 29, 72, 0.45)' : 'none',
                    borderRadius: '999px',
                    padding: '7px 20px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Trending Now Shelf */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
              }}
            >
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#f8fafc' }}>Trending Now</span>
              <span style={{ fontSize: '12px', color: '#71717a', cursor: 'pointer', fontWeight: 600 }}>See All</span>
            </div>

            {/* 4 Trending Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
              {trendingCards.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => onPlayMovie && onPlayMovie(movie)}
                  style={{
                    position: 'relative',
                    height: '190px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: '#0a0a0f',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6)',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 14px 30px rgba(225, 29, 72, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.6)';
                  }}
                >
                  {/* Poster Art */}
                  <img
                    src={movie.image}
                    alt={movie.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.85)',
                    }}
                  />

                  {/* Gradient Shadow */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(5, 5, 8, 0.25) 0%, transparent 40%, rgba(5, 5, 8, 0.96) 100%)',
                    }}
                  />

                  {/* Top Quality Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      right: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 800,
                        backgroundColor: 'rgba(10, 10, 14, 0.85)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        color: '#ffffff',
                      }}
                    >
                      {movie.badge}
                    </span>

                    <Bookmark size={12} color="#fda4af" />
                  </div>

                  {/* Bottom Movie Details */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      right: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                    }}
                  >
                    <h5
                      style={{
                        fontSize: '13px',
                        fontWeight: 900,
                        color: '#ffffff',
                        margin: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {movie.title}
                    </h5>
                    <span style={{ fontSize: '10px', color: '#a1a1aa' }}>{movie.genre}</span>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '4px',
                      }}
                    >
                      <span style={{ fontSize: '10px', fontWeight: 800, color: '#fda4af' }}>
                        {movie.matchScore}
                      </span>

                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 0 12px rgba(255, 255, 255, 0.5)',
                        }}
                      >
                        <Play size={10} fill="#050507" color="#050507" style={{ marginLeft: '1px' }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Watching Shelf */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc' }}>Continue Watching</span>
              <span style={{ fontSize: '12px', color: '#71717a', cursor: 'pointer', fontWeight: 600 }}>See All</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 0.8fr', gap: '14px' }}>
              {continueWatching.map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    onPlayMovie &&
                    onPlayMovie({
                      id: item.id,
                      title: item.title,
                      posterUrl: item.image,
                      resolution: '4K HDR',
                    })
                  }
                  style={{
                    position: 'relative',
                    height: '76px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    backgroundColor: '#0a0a0f',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.45,
                    }}
                  />
                  <span
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      fontSize: '12px',
                      fontWeight: 900,
                      letterSpacing: '1px',
                      color: '#ffffff',
                    }}
                  >
                    {item.title}
                  </span>

                  {/* Progress Line Bar at Bottom (Burgundy Gradient) */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <div
                      style={{
                        width: `${item.progress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #be123c 0%, #fb7185 100%)',
                        boxShadow: '0 0 8px #e11d48',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </motion.div>
    </div>
  );
};

export default GlassConsolePreview;
