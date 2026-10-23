import React, { useState } from 'react';
import { Play, Plus, Star, Radio, Sparkles, Tv, Flame, Info } from 'lucide-react';
import {
  ContentItem,
  Channel,
  MOCK_CONTENT,
  MOCK_CHANNELS,
  MOCK_CONTINUE_WATCHING,
} from '@nexora/shared';

interface TvHomeViewProps {
  focusedRailIndex: number;
  focusedItemIndex: number;
  onPlayItem: (item: any) => void;
  onOpenDetails: (item: ContentItem) => void;
  onTuneChannel: (channel: Channel) => void;
}

export const TvHomeView: React.FC<TvHomeViewProps> = ({
  focusedRailIndex,
  focusedItemIndex,
  onPlayItem,
  onOpenDetails,
  onTuneChannel,
}) => {
  const trendingMovies = MOCK_CONTENT.filter((c) => c.type === 'movie');
  const popularSeries = MOCK_CONTENT.filter((c) => c.type === 'series');
  const liveChannels = MOCK_CHANNELS;
  const continueWatching = MOCK_CONTINUE_WATCHING;

  // Active hero selection dynamically follows focused card
  let activeHero: any = MOCK_CONTENT[0];
  if (focusedRailIndex === 0) {
    activeHero = continueWatching[focusedItemIndex] || activeHero;
  } else if (focusedRailIndex === 1) {
    activeHero = trendingMovies[focusedItemIndex] || activeHero;
  } else if (focusedRailIndex === 2) {
    activeHero = liveChannels[focusedItemIndex] || activeHero;
  } else if (focusedRailIndex === 3) {
    activeHero = popularSeries[focusedItemIndex] || activeHero;
  }

  const backdrop = activeHero?.backdropUrl || activeHero?.logo || MOCK_CONTENT[0].backdropUrl;
  const title = activeHero?.title || activeHero?.name || 'Aethelgard: The Chrono Rift';
  const synopsis = activeHero?.synopsis || activeHero?.currentProgram?.description || 'Science teacher Ryland Grace wakes up on a spaceship light years from home with no recollection of who he is or how he got there.';
  const rating = activeHero?.rating || 8.9;
  const releaseYear = activeHero?.releaseYear || 2026;
  const typeTag = (activeHero?.type || 'movie').toUpperCase();

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 10-Foot Cinematic Background with Rich Gradients */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <img
          src={backdrop}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.45,
            filter: 'brightness(0.7) contrast(1.15)',
          }}
        />
        {/* Soft bottom vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(5, 5, 5, 0.1) 0%, rgba(5, 5, 5, 0.6) 45%, #050505 85%, #050505 100%)',
        }} />
        {/* Left text shadow overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #050505 0%, rgba(5, 5, 5, 0.95) 35%, rgba(5, 5, 5, 0.2) 100%)',
        }} />
      </div>

      {/* Main 10-Foot Stage Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '40px 60px 80px 60px',
        display: 'flex',
        flexDirection: 'column',
        gap: '36px',
      }}>
        {/* Cinematic Hero Spotlight */}
        <div style={{ maxWidth: '780px', display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '20px' }}>
          {/* Metadata Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              backgroundColor: '#E50914',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '6px',
              letterSpacing: '0.5px',
            }}>
              {typeTag}
            </span>
            <span style={{ fontSize: '13px', color: '#B3B3B3', fontWeight: 600 }}>
              {releaseYear}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FBBF24', fontSize: '13px', fontWeight: 700 }}>
              <Star size={14} fill="#FBBF24" color="#FBBF24" />
              <span>{rating}</span>
            </div>
            <span style={{
              backgroundColor: 'rgba(229, 9, 20, 0.15)',
              border: '1px solid rgba(229, 9, 20, 0.3)',
              color: '#FF2B36',
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '6px',
            }}>
              4K HDR • 60 FPS
            </span>
          </div>

          {/* Large Hero Title */}
          <h1 style={{
            fontSize: '52px',
            fontWeight: 900,
            color: '#FFFFFF',
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: '-1px',
            textTransform: 'uppercase',
            textShadow: '0 6px 30px rgba(0,0,0,0.9)',
          }}>
            {title}
          </h1>

          {/* Hero Synopsis */}
          <p style={{
            fontSize: '15px',
            color: '#B3B3B3',
            lineHeight: '1.6',
            margin: 0,
            maxWidth: '680px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {synopsis}
          </p>

          {/* Play & More Info Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '8px' }}>
            <button
              onClick={() => onPlayItem(activeHero)}
              style={{
                backgroundColor: '#E50914',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 30px',
                fontSize: '15px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(229, 9, 20, 0.55)',
                transition: 'transform 0.15s ease',
              }}
            >
              <Play size={18} fill="#FFFFFF" />
              <span>Play Now</span>
            </button>

            <button
              onClick={() => onOpenDetails(activeHero)}
              style={{
                backgroundColor: '#151515',
                color: '#FFFFFF',
                border: '1px solid #303030',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '15px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <Info size={18} />
              <span>More Info</span>
            </button>
          </div>
        </div>

        {/* Rails Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* RAIL 0: Trending This Week */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '3px', height: '16px', backgroundColor: '#E50914', borderRadius: '2px' }} />
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#B3B3B3', letterSpacing: '1px' }}>
                  TRENDING
                </span>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginLeft: '6px' }}>
                  Trending Blockbusters & Releases
                </span>
                <span style={{ fontSize: '12px', color: '#E50914', fontWeight: 600, marginLeft: '6px' }}>
                  All
                </span>
              </div>

              {/* Pagination Dots indicator */}
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <span style={{ width: '12px', height: '4px', borderRadius: '2px', backgroundColor: '#E50914' }} />
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#303030' }} />
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#303030' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', overflowX: 'hidden' }}>
              {trendingMovies.map((m, idx) => {
                const isFocused = focusedRailIndex === 1 && focusedItemIndex === idx;
                return (
                  <div
                    key={m.id}
                    onClick={() => onOpenDetails(m)}
                    className={isFocused ? 'tv-focused' : ''}
                    style={{
                      width: '180px',
                      flexShrink: 0,
                      cursor: 'pointer',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <div style={{
                      position: 'relative',
                      width: '180px',
                      height: '260px',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      backgroundColor: '#151515',
                      border: isFocused ? '3px solid #E50914' : '1px solid #303030',
                      boxShadow: isFocused ? '0 12px 30px rgba(229, 9, 20, 0.5)' : '0 6px 18px rgba(0,0,0,0.6)',
                    }}>
                      <img src={m.posterUrl} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        backgroundColor: 'rgba(5, 5, 5, 0.85)',
                        border: '1px solid #303030',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#FBBF24',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}>
                        <Star size={11} fill="#FBBF24" color="#FBBF24" /> {m.rating}
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', marginTop: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {m.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RAIL 1: Continue Watching */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '3px', height: '16px', backgroundColor: '#E50914', borderRadius: '2px' }} />
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#B3B3B3', letterSpacing: '1px' }}>
                  RESUME
                </span>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginLeft: '6px' }}>
                  Continue Watching
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', overflowX: 'hidden' }}>
              {continueWatching.map((cw, idx) => {
                const isFocused = focusedRailIndex === 0 && focusedItemIndex === idx;
                return (
                  <div
                    key={cw.id}
                    onClick={() => onPlayItem(cw)}
                    className={isFocused ? 'tv-focused' : ''}
                    style={{
                      width: '260px',
                      flexShrink: 0,
                      backgroundColor: '#151515',
                      border: isFocused ? '3px solid #E50914' : '1px solid #303030',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <div style={{ position: 'relative', height: '140px', backgroundColor: '#0D0D0D' }}>
                      <img src={cw.backdropUrl} alt={cw.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '5px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      }}>
                        <div style={{ width: `${cw.progressPercentage}%`, height: '100%', background: 'linear-gradient(90deg, #7F0000, #E50914)' }} />
                      </div>
                    </div>
                    <div style={{ padding: '12px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {cw.title}
                      </div>
                      <div style={{ fontSize: '11px', color: '#B3B3B3', marginTop: '2px' }}>
                        {cw.subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RAIL 2: Live Channels */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="live-dot" />
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#E50914', letterSpacing: '1px' }}>
                  ON AIR
                </span>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginLeft: '6px' }}>
                  Live TV Channels & Broadcast Feeds
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', overflowX: 'hidden' }}>
              {liveChannels.map((ch, idx) => {
                const isFocused = focusedRailIndex === 2 && focusedItemIndex === idx;
                return (
                  <div
                    key={ch.id}
                    onClick={() => onTuneChannel(ch)}
                    className={isFocused ? 'tv-focused' : ''}
                    style={{
                      width: '220px',
                      flexShrink: 0,
                      backgroundColor: '#151515',
                      border: isFocused ? '3px solid #E50914' : '1px solid #303030',
                      borderRadius: '14px',
                      padding: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <img src={ch.logo} alt={ch.name} style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }} />
                      <span className="badge badge-red">{ch.resolution}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#E50914', fontWeight: 800 }}>CH {ch.channelNumber}</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {ch.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#FF2B36', marginTop: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {ch.currentProgram?.title || 'Live Transmission'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
