import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_CONTENT, ContentItem } from '@nexora/shared';
import { Play, Star, Film, Flame, Trophy, Sparkles, LayoutGrid, Eye } from 'lucide-react';
import { Skiper49Coverflow } from '../components/ui/Skiper49Coverflow';
import { Skiper30ParallaxGallery } from './Skiper30ParallaxGallery';

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

        {/* Skiper 30 Multi-Column Parallax Gallery for Original Serials & TV Shows */}
        <Skiper30ParallaxGallery onPlayMovie={onPlayMovie} />

      </div>
    </section>
  );
};

