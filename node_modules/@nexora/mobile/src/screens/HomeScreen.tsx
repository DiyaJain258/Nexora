import React from 'react';
import { Play, Plus, Check, Star, Radio, Flame, Sparkles, ChevronRight } from 'lucide-react';
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

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectItem,
  onSelectChannel,
  onPlayItem,
  favorites,
  onToggleFavorite,
}) => {
  const featured = MOCK_CONTENT[0]; // Aethelgard: The Chrono Rift
  const movies = MOCK_CONTENT.filter((c) => c.type === 'movie');
  const series = MOCK_CONTENT.filter((c) => c.type === 'series');
  const sports = MOCK_CONTENT.filter((c) => c.type === 'sports');
  const kids = MOCK_CONTENT.filter((c) => c.type === 'kids');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', paddingBottom: '24px' }}>
      {/* Featured Spotlight Hero */}
      <div style={{ position: 'relative', width: '100%', height: '380px' }}>
        <img
          src={featured.backdropUrl}
          alt={featured.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Dark overlays */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(7, 9, 18, 0.1) 0%, rgba(7, 9, 18, 0.7) 60%, #070912 100%)',
        }} />

        {/* Hero Meta & CTAs */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          right: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)',
              color: '#FFFFFF',
              fontSize: '10px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '4px',
            }}>
              FEATURED PREMIERE
            </span>
            <span style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: '#22D3EE',
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '4px',
            }}>
              {featured.quality}
            </span>
            <span style={{ color: '#FBBF24', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
              <Star size={12} fill="#FBBF24" color="#FBBF24" /> {featured.rating}
            </span>
          </div>

          <h1 style={{
            fontSize: '24px',
            fontWeight: 800,
            margin: 0,
            color: '#F8FAFC',
            lineHeight: 1.2,
          }}>
            {featured.title}
          </h1>

          <div style={{ fontSize: '12px', color: '#CBD5E1' }}>
            {featured.genres.join(' • ')} • {featured.duration}
          </div>

          {/* Hero Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <button
              onClick={() => onPlayItem(featured)}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)',
                border: 'none',
                borderRadius: '8px',
                padding: '10px',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              <Play size={16} fill="#FFFFFF" />
              <span>Watch Now</span>
            </button>

            <button
              onClick={() => onSelectItem(featured)}
              style={{
                padding: '10px 14px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#F8FAFC',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Details
            </button>
          </div>
        </div>
      </div>

      {/* Continue Watching Rail */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={16} color="#22D3EE" />
            <span>Continue Watching</span>
          </div>
          <span style={{ fontSize: '11px', color: '#64748B' }}>3 in progress</span>
        </div>

        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
          {MOCK_CONTINUE_WATCHING.map((cw) => (
            <div
              key={cw.id}
              onClick={() => onPlayItem({ title: cw.title, backdropUrl: cw.backdropUrl, streamUrl: cw.streamUrl } as any)}
              style={{
                width: '180px',
                flexShrink: 0,
                cursor: 'pointer',
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: '#111827',
                border: '1px solid #1E293B',
              }}
            >
              <div style={{ position: 'relative', height: '100px', backgroundColor: '#0B1020' }}>
                <img
                  src={cw.backdropUrl}
                  alt={cw.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(139, 92, 246, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Play size={14} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: '2px' }} />
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                }}>
                  <div style={{
                    width: `${cw.progressPercentage}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #8B5CF6, #22D3EE)',
                  }} />
                </div>
              </div>

              <div style={{ padding: '8px 10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {cw.title}
                </div>
                <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>
                  {cw.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Live Channels Rail */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="live-dot" />
            <span>Live TV Channels</span>
          </div>
          <span style={{ fontSize: '11px', color: '#22D3EE', fontWeight: 600 }}>EPG Active</span>
        </div>

        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
          {MOCK_CHANNELS.map((ch) => (
            <div
              key={ch.id}
              onClick={() => onSelectChannel(ch)}
              style={{
                width: '140px',
                flexShrink: 0,
                backgroundColor: '#111827',
                border: '1px solid #1E293B',
                borderRadius: '10px',
                padding: '10px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <img
                  src={ch.logo}
                  alt={ch.name}
                  style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }}
                />
                <span className="badge badge-cyan" style={{ fontSize: '9px', padding: '1px 5px' }}>
                  {ch.resolution}
                </span>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {ch.name}
              </div>
              <div style={{ fontSize: '10px', color: '#22D3EE', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {ch.currentProgram?.title || 'Continuous Stream'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Movies Rail */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Flame size={16} color="#EF4444" />
            <span>Trending Movies & Blockbusters</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
          {movies.map((m) => (
            <div
              key={m.id}
              onClick={() => onSelectItem(m)}
              style={{
                width: '120px',
                flexShrink: 0,
                cursor: 'pointer',
              }}
            >
              <div style={{ position: 'relative', width: '120px', height: '170px', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#111827' }}>
                <img
                  src={m.posterUrl}
                  alt={m.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                  padding: '2px 5px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#FBBF24',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                }}>
                  <Star size={10} fill="#FBBF24" color="#FBBF24" />
                  {m.rating}
                </div>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#F8FAFC', marginTop: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {m.title}
              </div>
              <div style={{ fontSize: '10px', color: '#94A3B8' }}>{m.quality} • {m.releaseYear}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Series Rail */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#F8FAFC' }}>
            Binge-Worthy Series
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
          {series.map((s) => (
            <div
              key={s.id}
              onClick={() => onSelectItem(s)}
              style={{
                width: '120px',
                flexShrink: 0,
                cursor: 'pointer',
              }}
            >
              <div style={{ position: 'relative', width: '120px', height: '170px', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#111827' }}>
                <img
                  src={s.posterUrl}
                  alt={s.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="badge badge-violet" style={{ position: 'absolute', bottom: '6px', left: '6px', fontSize: '9px', padding: '1px 5px' }}>
                  {s.duration}
                </span>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#F8FAFC', marginTop: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {s.title}
              </div>
              <div style={{ fontSize: '10px', color: '#22D3EE' }}>{s.matchScore}% Match</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
