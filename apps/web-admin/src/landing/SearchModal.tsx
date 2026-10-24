import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Play,
  Bookmark,
  Check,
  Star,
  Film,
  Tv,
  Flame,
  Sparkles,
  TrendingUp,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { MOCK_CONTENT, MOCK_CHANNELS, ContentItem, Channel } from '@nexora/shared';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayMovie: (item: ContentItem) => void;
  onPlayChannel?: (channel: Channel) => void;
  isInWatchlist?: (id: string) => boolean;
  onToggleWatchlist?: (id: string) => void;
}

const QUICK_FILTERS = [
  'All',
  'Movies',
  'Series',
  'Live TV',
  'Sci-Fi',
  'Action',
  'Cyberpunk',
  'Sports',
];

const TRENDING_SEARCHES = [
  'Aethelgard 2088',
  'Neon Syndicate',
  'Monaco Grand Prix',
  'Cyberpunk Neo-Seoul',
  'Tears of Steel',
  'Dolby Atmos 4K',
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onPlayMovie,
  onPlayChannel,
  isInWatchlist,
  onToggleWatchlist,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
    } else {
      setSearchQuery('');
      setActiveFilter('All');
    }
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Combined Search & Filter Results
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    // 1. Filter Movies / Series
    let contentResults = MOCK_CONTENT.filter((item) => {
      // Type filter
      if (activeFilter === 'Movies' && item.type !== 'movie') return false;
      if (activeFilter === 'Series' && item.type !== 'series') return false;
      if (activeFilter === 'Sports' && item.type !== 'sports') return false;
      if (activeFilter === 'Live TV') return false;
      if (
        ['Sci-Fi', 'Action', 'Cyberpunk'].includes(activeFilter) &&
        !item.genres?.some((g) => g.toLowerCase().includes(activeFilter.toLowerCase()))
      ) {
        return false;
      }

      // Query match
      if (!q) return true;
      const titleMatch = item.title.toLowerCase().includes(q);
      const synopsisMatch = item.synopsis?.toLowerCase().includes(q);
      const genreMatch = item.genres?.some((g) => g.toLowerCase().includes(q));
      const castMatch = item.cast?.some((c) => c.toLowerCase().includes(q));
      const directorMatch = item.director?.toLowerCase().includes(q);

      return titleMatch || synopsisMatch || genreMatch || castMatch || directorMatch;
    });

    // 2. Filter Live TV Channels
    let channelResults: Channel[] = [];
    if (activeFilter === 'All' || activeFilter === 'Live TV' || activeFilter === 'Sports') {
      channelResults = MOCK_CHANNELS.filter((ch) => {
        if (!q && activeFilter !== 'Live TV') return false;
        if (!q && activeFilter === 'Live TV') return true;
        const nameMatch = ch.name.toLowerCase().includes(q);
        const catMatch = ch.category.toLowerCase().includes(q);
        const progMatch = ch.currentProgram?.title.toLowerCase().includes(q);
        return nameMatch || catMatch || progMatch;
      });
    }

    return {
      content: contentResults,
      channels: channelResults,
      totalCount: contentResults.length + channelResults.length,
    };
  }, [searchQuery, activeFilter]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999999,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '40px 16px 24px',
        }}
      >
        {/* Dark Backdrop Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(3, 2, 6, 0.88)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        />

        {/* Search Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '780px',
            height: '82vh',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#0a0710',
            border: '1.5px solid rgba(225, 29, 72, 0.45)',
            borderRadius: '24px',
            boxShadow:
              '0 30px 100px rgba(0, 0, 0, 0.95), 0 0 50px rgba(225, 29, 72, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
            zIndex: 10,
            overflow: 'hidden',
          }}
        >
          {/* Search Header Bar & Input */}
          <div
            style={{
              flexShrink: 0,
              padding: '20px 24px 16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'linear-gradient(180deg, rgba(225, 29, 72, 0.12) 0%, rgba(10, 7, 16, 0.8) 100%)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(18, 12, 26, 0.85)',
                border: '1.5px solid rgba(225, 29, 72, 0.4)',
                borderRadius: '16px',
                padding: '12px 18px',
                boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.6), 0 0 25px rgba(225, 29, 72, 0.15)',
              }}
            >
              <Search size={22} color="#fda4af" style={{ marginRight: '14px', flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, TV shows, actors, genres, or channels..."
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <X size={18} />
                </button>
              )}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#94a3b8',
                  marginLeft: '8px',
                }}
              >
                <span>ESC</span>
              </div>
            </div>

            {/* Quick Filter Chips */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                marginTop: '14px',
                paddingBottom: '4px',
              }}
            >
              {QUICK_FILTERS.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 800,
                      backgroundColor: isActive ? '#e11d48' : 'rgba(255, 255, 255, 0.06)',
                      border: isActive ? '1px solid #fda4af' : '1px solid rgba(255, 255, 255, 0.1)',
                      color: isActive ? '#ffffff' : '#cbd5e1',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Content Body (Scrollable) */}
          <div
            data-lenis-prevent="true"
            className="modal-custom-scrollbar"
            onWheel={(e) => e.stopPropagation()}
            style={{
              padding: '20px 24px 32px',
              overflowY: 'auto',
              flex: '1 1 0%',
              minHeight: 0,
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* If No Query: Show Trending Searches & Quick Suggestions */}
            {!searchQuery && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <TrendingUp size={16} color="#fda4af" />
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 900,
                      color: '#fda4af',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Trending Searches
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {TRENDING_SEARCHES.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setSearchQuery(term)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(225, 29, 72, 0.12)',
                        border: '1px solid rgba(225, 29, 72, 0.35)',
                        color: '#f1f5f9',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(225, 29, 72, 0.25)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(225, 29, 72, 0.12)';
                      }}
                    >
                      <span>{term}</span>
                    </button>
                  ))}
                </div>

                {/* Popular Top 4K Picks */}
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 900,
                    color: '#94a3b8',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '12px',
                  }}
                >
                  Featured 4K HDR Titles
                </span>
              </div>
            )}

            {/* Results Counter if query typed */}
            {searchQuery && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                  Found <strong style={{ color: '#ffffff' }}>{searchResults.totalCount}</strong> results for "{searchQuery}"
                </span>
                <span style={{ fontSize: '11px', color: '#fda4af', fontWeight: 800 }}>
                  FILTER: {activeFilter.toUpperCase()}
                </span>
              </div>
            )}

            {/* Movies & Series Results List */}
            {searchResults.content.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {searchResults.content.map((item) => {
                  const inWatchlist = isInWatchlist?.(item.id) || false;
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '16px',
                        backgroundColor: 'rgba(16, 12, 22, 0.85)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(225, 29, 72, 0.14)';
                        e.currentTarget.style.borderColor = 'rgba(225, 29, 72, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(16, 12, 22, 0.85)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      }}
                    >
                      {/* Left Side: Thumbnail & Info */}
                      <div
                        onClick={() => {
                          onPlayMovie(item);
                          onClose();
                        }}
                        style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, cursor: 'pointer' }}
                      >
                        <div
                          style={{
                            width: '56px',
                            height: '76px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            flexShrink: 0,
                            position: 'relative',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          <img
                            src={item.posterUrl}
                            alt={item.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              backgroundColor: 'rgba(0, 0, 0, 0.75)',
                              textAlign: 'center',
                              fontSize: '9px',
                              fontWeight: 900,
                              color: '#fda4af',
                              padding: '1px 0',
                            }}
                          >
                            {item.quality || '4K'}
                          </div>
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
                              {item.title}
                            </h4>
                            <span
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '3px',
                                color: '#f59e0b',
                                fontSize: '11px',
                                fontWeight: 800,
                              }}
                            >
                              <Star size={11} fill="#f59e0b" color="#f59e0b" />
                              <span>{item.rating}</span>
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                            <span style={{ fontSize: '12px', color: '#fda4af', fontWeight: 700 }}>
                              {item.genres?.[0] || item.type}
                            </span>
                            <span style={{ fontSize: '12px', color: '#71717a' }}>•</span>
                            <span style={{ fontSize: '12px', color: '#94a3b8' }}>{item.releaseYear}</span>
                            <span style={{ fontSize: '12px', color: '#71717a' }}>•</span>
                            <span style={{ fontSize: '12px', color: '#94a3b8' }}>{item.duration}</span>
                          </div>

                          <p
                            style={{
                              margin: '4px 0 0',
                              fontSize: '12px',
                              color: '#71717a',
                              maxWidth: '440px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.synopsis}
                          </p>
                        </div>
                      </div>

                      {/* Right Side: Action Buttons */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {onToggleWatchlist && (
                          <button
                            type="button"
                            onClick={() => onToggleWatchlist(item.id)}
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '10px',
                              backgroundColor: inWatchlist ? 'rgba(225, 29, 72, 0.3)' : 'rgba(255, 255, 255, 0.06)',
                              border: inWatchlist ? '1px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.12)',
                              color: inWatchlist ? '#fda4af' : '#94a3b8',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.15s',
                            }}
                            title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                          >
                            {inWatchlist ? <Check size={16} /> : <Bookmark size={16} />}
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            onPlayMovie(item);
                            onClose();
                          }}
                          className="btn-radiant"
                          style={{
                            padding: '8px 16px',
                            borderRadius: '10px',
                            fontSize: '12.5px',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'pointer',
                          }}
                        >
                          <Play size={13} fill="#050507" color="#050507" />
                          <span>Watch 4K</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Live TV Channels Results */}
            {searchResults.channels.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 900,
                    color: '#fda4af',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '10px',
                  }}
                >
                  Live TV Channels ({searchResults.channels.length})
                </span>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {searchResults.channels.map((ch) => (
                    <div
                      key={ch.id}
                      onClick={() => {
                        if (onPlayChannel) onPlayChannel(ch);
                        onClose();
                      }}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '14px',
                        backgroundColor: 'rgba(16, 12, 22, 0.85)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(225, 29, 72, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(16, 12, 22, 0.85)';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: '#ef4444',
                            boxShadow: '0 0 8px #ef4444',
                          }}
                        />
                        <div>
                          <h5 style={{ margin: 0, fontSize: '13.5px', fontWeight: 800, color: '#ffffff' }}>
                            {ch.name}
                          </h5>
                          <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                            CH {ch.channelNumber} • {ch.category}
                          </span>
                        </div>
                      </div>
                      <span style={{ color: '#fda4af', fontSize: '11px', fontWeight: 800 }}>LIVE 4K</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Zero Results State */}
            {searchResults.totalCount === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <Film size={40} color="#71717a" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: '0 0 6px' }}>
                  No matches found for "{searchQuery}"
                </h4>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 16px' }}>
                  Try searching for "Aethelgard", "Cyberpunk", "Formula", or change the filter chip.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('All');
                  }}
                  style={{
                    backgroundColor: 'rgba(225, 29, 72, 0.2)',
                    border: '1px solid rgba(225, 29, 72, 0.45)',
                    color: '#ffffff',
                    padding: '8px 18px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;
