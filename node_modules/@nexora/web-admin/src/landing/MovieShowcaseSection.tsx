import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_CONTENT, ContentItem } from '@nexora/shared';
import { Play, Star, Film, Flame, Trophy, Sparkles, LayoutGrid, Eye } from 'lucide-react';
import { Skiper49Coverflow } from '../components/ui/Skiper49Coverflow';

interface MovieShowcaseSectionProps {
  onPlayMovie: (item: ContentItem) => void;
}

export const MovieShowcaseSection: React.FC<MovieShowcaseSectionProps> = ({ onPlayMovie }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'movie' | 'series' | 'sports'>('all');
  const [viewMode, setViewMode] = useState<'coverflow' | 'grid'>('coverflow');

  const filteredMovies = selectedFilter === 'all'
    ? MOCK_CONTENT
    : MOCK_CONTENT.filter((c) => c.type === selectedFilter);

  return (
    <section id="cinema" style={{ padding: '64px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '28px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#fda4af', letterSpacing: '1px', textTransform: 'uppercase' }}>
                4K HDR ON-DEMAND CATALOG
              </span>
              <span style={{ backgroundColor: 'rgba(225, 29, 72, 0.15)', color: '#fda4af', border: '1px solid rgba(225, 29, 72, 0.35)', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>
                15,000+ TITLES
              </span>
            </div>
            <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#f8fafc', letterSpacing: '-1px' }}>
              Blockbuster Movies & <span className="gradient-text">Original Series</span>
            </h2>
            <p style={{ color: '#a1a1aa', fontSize: '15px', marginTop: '6px', maxWidth: '580px' }}>
              Swipe through our 3D cinematic showcase or browse the complete high-definition catalog.
            </p>
          </div>

          {/* View Mode & Filter Switcher */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* View Mode Toggle (3D Coverflow vs Grid) */}
            <div style={{ display: 'flex', backgroundColor: 'rgba(14, 14, 20, 0.85)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.14)' }}>
              <button
                type="button"
                onClick={() => setViewMode('coverflow')}
                style={{
                  backgroundColor: viewMode === 'coverflow' ? '#ffffff' : 'transparent',
                  color: viewMode === 'coverflow' ? '#050507' : '#a1a1aa',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '7px 14px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s',
                }}
              >
                <Eye size={14} />
                <span>3D Coverflow</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                style={{
                  backgroundColor: viewMode === 'grid' ? '#ffffff' : 'transparent',
                  color: viewMode === 'grid' ? '#050507' : '#a1a1aa',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '7px 14px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s',
                }}
              >
                <LayoutGrid size={14} />
                <span>Catalog Grid</span>
              </button>
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '6px', backgroundColor: 'rgba(14, 14, 20, 0.75)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              {[
                { id: 'all', label: 'All', icon: Sparkles },
                { id: 'movie', label: 'Movies', icon: Film },
                { id: 'series', label: 'Series', icon: Flame },
                { id: 'sports', label: 'Sports', icon: Trophy },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = selectedFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedFilter(tab.id as any)}
                    style={{
                      backgroundColor: isActive ? '#be123c' : 'transparent',
                      color: isActive ? '#ffffff' : '#71717a',
                      border: isActive ? '1px solid #e11d48' : 'none',
                      borderRadius: '8px',
                      padding: '7px 12px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Icon size={13} color={isActive ? '#ffffff' : '#71717a'} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3D Coverflow Carousel Mode (Skiper49) */}
        {viewMode === 'coverflow' ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                💡 Drag, swipe, or use arrows to rotate titles in 3D • Click any card to play in 4K
              </span>
            </div>
            <Skiper49Coverflow
              items={filteredMovies}
              onPlayMovie={onPlayMovie}
              autoplay={true}
              loop={true}
              showPagination={true}
              showNavigation={true}
            />
          </div>
        ) : (
          /* Movie Posters Grid Mode */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <AnimatePresence>
              {filteredMovies.slice(0, 8).map((movie) => (
                <motion.div
                  key={movie.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -8 }}
                  onClick={() => onPlayMovie(movie)}
                  style={{
                    backgroundColor: '#0a0f1d',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {/* Poster Artwork */}
                  <div style={{ position: 'relative', height: '360px', overflow: 'hidden' }}>
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1.0)';
                      }}
                    />

                    {/* Gradient bottom shadow */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(180deg, rgba(5, 7, 14, 0.2) 0%, transparent 50%, rgba(5, 7, 14, 0.95) 100%)',
                      }}
                    />

                    {/* Top Badges */}
                    <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ backgroundColor: 'rgba(225, 29, 72, 0.2)', color: '#fda4af', backdropFilter: 'blur(8px)', border: '1px solid rgba(225, 29, 72, 0.4)', padding: '2px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 800 }}>
                        {movie.quality}
                      </span>

                      <span style={{ backgroundColor: 'rgba(10, 10, 14, 0.85)', backdropFilter: 'blur(8px)', color: '#f59e0b', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={12} fill="#f59e0b" color="#f59e0b" />
                        <span>{movie.rating}</span>
                      </span>
                    </div>

                    {/* Floating Play Button on Hover */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 25px rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      <Play size={22} color="#050507" fill="#050507" style={{ marginLeft: '2px' }} />
                    </div>
                  </div>

                  {/* Movie Details Footer */}
                  <div style={{ padding: '16px 18px 20px', backgroundColor: '#0d0d12' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#fda4af', textTransform: 'uppercase' }}>
                        {movie.genres?.[0] || movie.type}
                      </span>
                      <span style={{ fontSize: '11px', color: '#71717a' }}>
                        {movie.releaseYear} • {movie.duration}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#f4f4f5', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {movie.title}
                    </h4>

                    <p style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>
                      {movie.synopsis}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Serials & Web Series Showcase (Inspired by Reference Image 3) */}
        <div style={{ marginTop: '70px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '44px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#f59e0b', letterSpacing: '1px', textTransform: 'uppercase' }}>
                EPIC SAGA COLLECTIONS
              </span>
              <h3 style={{ fontSize: '30px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px', margin: '4px 0 0' }}>
                Original Serials & TV Shows
              </h3>
            </div>
            <span style={{ fontSize: '13px', color: '#fda4af', fontWeight: 700 }}>
              4 Seasons Available in 4K HDR • Dolby Atmos
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '22px' }}>
            {[
              {
                id: 'serial-01',
                title: 'The Mandalorians: Outer Rim',
                tag: 'SEASON 4 • NEW',
                badgeColor: '#f59e0b',
                poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
                rating: '9.4',
                episodes: '32 Episodes',
              },
              {
                id: 'serial-02',
                title: 'Neon Syndicate: Cyber Dynasty',
                tag: 'SEASON 3 • 4K HDR',
                badgeColor: '#e11d48',
                poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
                rating: '8.9',
                episodes: '24 Episodes',
              },
              {
                id: 'serial-03',
                title: 'Dark Orbit: Station 9',
                tag: 'COMPLETE SERIES',
                badgeColor: '#a855f7',
                poster: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80',
                rating: '9.0',
                episodes: '10 Episodes',
              },
              {
                id: 'serial-04',
                title: 'Starborne: Astral Explorers',
                tag: 'SEASON 2 • KIDS & FAMILY',
                badgeColor: '#e2e8f0',
                poster: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
                rating: '8.7',
                episodes: '20 Episodes',
              },
            ].map((serial) => (
              <div
                key={serial.id}
                onClick={() => onPlayMovie({ id: serial.id, title: serial.title, posterUrl: serial.poster, genres: ['Series', '4K'], resolution: '4K UHD' } as any)}
                style={{
                  position: 'relative',
                  height: '380px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#0d0d12',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.7)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 20px 50px rgba(0, 0, 0, 0.9), 0 0 25px ${serial.badgeColor}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.7)';
                }}
              >
                <img
                  src={serial.poster}
                  alt={serial.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(5, 5, 7, 0.1) 0%, transparent 40%, rgba(5, 5, 7, 0.96) 100%)',
                  }}
                />

                {/* Top Tag */}
                <div style={{ position: 'absolute', top: '14px', left: '14px', right: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      backgroundColor: 'rgba(5, 5, 7, 0.85)',
                      color: serial.badgeColor,
                      border: `1px solid ${serial.badgeColor}50`,
                      padding: '3px 9px',
                      borderRadius: '6px',
                    }}
                  >
                    {serial.tag}
                  </span>

                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '3px', backgroundColor: 'rgba(5, 5, 7, 0.85)', padding: '3px 8px', borderRadius: '6px' }}>
                    <Star size={11} fill="#fbbf24" color="#fbbf24" />
                    {serial.rating}
                  </span>
                </div>

                {/* Bottom Details */}
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                  <span style={{ fontSize: '11px', color: '#a1a1aa' }}>{serial.episodes}</span>
                  <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', margin: '4px 0 10px' }}>
                    {serial.title}
                  </h4>
                  <button
                    type="button"
                    style={{
                      width: '100%',
                      padding: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    <Play size={12} fill="#ffffff" color="#ffffff" />
                    <span>Watch Series Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

