import React, { useState, useEffect } from 'react';
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
  // Rails definitions
  const continueWatching = MOCK_CONTINUE_WATCHING;
  const liveChannels = MOCK_CHANNELS;
  const trendingMovies = MOCK_CONTENT.filter((c) => c.type === 'movie');
  const popularSeries = MOCK_CONTENT.filter((c) => c.type === 'series');

  // Currently focused item dynamically determines hero backdrop!
  let currentHeroItem: any = MOCK_CONTENT[0];
  if (focusedRailIndex === 0) {
    currentHeroItem = continueWatching[focusedItemIndex] || currentHeroItem;
  } else if (focusedRailIndex === 1) {
    currentHeroItem = liveChannels[focusedItemIndex] || currentHeroItem;
  } else if (focusedRailIndex === 2) {
    currentHeroItem = trendingMovies[focusedItemIndex] || currentHeroItem;
  } else if (focusedRailIndex === 3) {
    currentHeroItem = popularSeries[focusedItemIndex] || currentHeroItem;
  }

  const backdrop = currentHeroItem?.backdropUrl || currentHeroItem?.logo || MOCK_CONTENT[0].backdropUrl;
  const title = currentHeroItem?.title || currentHeroItem?.name;
  const synopsis = currentHeroItem?.synopsis || currentHeroItem?.currentProgram?.description || 'Immersive 4K HDR entertainment experience on NEXORA TV.';

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 10-Foot Cinematic Dynamic Backdrop */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        transition: 'background-image 0.4s ease-in-out',
      }}>
        <img
          src={backdrop}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.45,
            filter: 'brightness(0.65) contrast(1.15)',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(7, 9, 18, 0.2) 0%, rgba(7, 9, 18, 0.75) 50%, #070912 100%)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #070912 0%, rgba(7, 9, 18, 0.85) 35%, rgba(7, 9, 18, 0.2) 100%)',
        }} />
      </div>

      {/* Main 10-Foot Stage Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '36px 48px 60px 48px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Dynamic Hero Showcase */}
        <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '220px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: '4px',
            }}>
              4K HDR • 60 FPS
            </span>
            {currentHeroItem?.matchScore && (
              <span style={{
                backgroundColor: 'rgba(34, 211, 238, 0.2)',
                color: '#22D3EE',
                fontSize: '12px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '4px',
              }}>
                {currentHeroItem.matchScore}% MATCH
              </span>
            )}
            {currentHeroItem?.rating && (
              <span style={{ color: '#FBBF24', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={14} fill="#FBBF24" color="#FBBF24" /> {currentHeroItem.rating}
              </span>
            )}
            <span style={{ color: '#94A3B8', fontSize: '13px' }}>
              Dolby Atmos 7.1 • Subtitles Available
            </span>
          </div>

          <h1 style={{
            fontSize: '44px',
            fontWeight: 900,
            color: '#F8FAFC',
            margin: 0,
            lineHeight: 1.1,
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          }}>
            {title}
          </h1>

          <p style={{
            fontSize: '15px',
            color: '#CBD5E1',
            lineHeight: 1.5,
            margin: 0,
            maxWidth: '650px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {synopsis}
          </p>

          {/* Quick TV Control Help Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '4px', fontSize: '12px', color: '#94A3B8' }}>
            <span>Press <b style={{ color: '#22D3EE' }}>[OK]</b> to Watch</span>
            <span>•</span>
            <span>Press <b style={{ color: '#8B5CF6' }}>[Left]</b> for TV Menu</span>
            <span>•</span>
            <span>Press <b style={{ color: '#F8FAFC' }}>[Up/Down]</b> to Change Rows</span>
          </div>
        </div>

        {/* Rails Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* RAIL 0: Continue Watching */}
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#F8FAFC', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="#22D3EE" />
              <span>Resume Watching</span>
            </div>

            <div style={{ display: 'flex', gap: '20px', overflowX: 'hidden' }}>
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
                      backgroundColor: '#111827',
                      border: isFocused ? '2px solid #22D3EE' : '1px solid #1E293B',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <div style={{ position: 'relative', height: '140px', backgroundColor: '#0B1020' }}>
                      <img src={cw.backdropUrl} alt={cw.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '5px',
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      }}>
                        <div style={{ width: `${cw.progressPercentage}%`, height: '100%', background: 'linear-gradient(90deg, #8B5CF6, #22D3EE)' }} />
                      </div>
                    </div>
                    <div style={{ padding: '12px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {cw.title}
                      </div>
                      <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                        {cw.subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RAIL 1: Live TV Channels */}
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#F8FAFC', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="live-dot" />
              <span>Live TV Channels & Satellite Feeds</span>
            </div>

            <div style={{ display: 'flex', gap: '20px', overflowX: 'hidden' }}>
              {liveChannels.map((ch, idx) => {
                const isFocused = focusedRailIndex === 1 && focusedItemIndex === idx;
                return (
                  <div
                    key={ch.id}
                    onClick={() => onTuneChannel(ch)}
                    className={isFocused ? 'tv-focused' : ''}
                    style={{
                      width: '220px',
                      flexShrink: 0,
                      backgroundColor: '#111827',
                      border: isFocused ? '2px solid #22D3EE' : '1px solid #1E293B',
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
                      <span className="badge badge-cyan">{ch.resolution}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#8B5CF6', fontWeight: 800 }}>CH {ch.channelNumber}</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {ch.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#22D3EE', marginTop: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {ch.currentProgram?.title || 'Live Transmission'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RAIL 2: Trending Movies */}
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#F8FAFC', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={18} color="#EF4444" />
              <span>Trending 4K Blockbusters</span>
            </div>

            <div style={{ display: 'flex', gap: '20px', overflowX: 'hidden' }}>
              {trendingMovies.map((m, idx) => {
                const isFocused = focusedRailIndex === 2 && focusedItemIndex === idx;
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
                      height: '250px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      backgroundColor: '#111827',
                      border: isFocused ? '2px solid #22D3EE' : '1px solid #1E293B',
                    }}>
                      <img src={m.posterUrl} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#FBBF24',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}>
                        <Star size={12} fill="#FBBF24" color="#FBBF24" /> {m.rating}
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC', marginTop: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {m.title}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>{m.releaseYear} • {m.genres[0]}</div>
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
