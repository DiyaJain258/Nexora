import React from 'react';
import { Play, Plus, Check, Star, Radio, Flame, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, EffectCards, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
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
      {/* Featured Spotlight Hero with Cinematic Red Ambient Glow */}
      <div style={{ position: 'relative', width: '100%', height: '380px', overflow: 'hidden' }}>
        <style>{`
          @keyframes redAmbientPulse {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.85; transform: scale(1.08); }
          }
          @keyframes buttonShimmerSweep {
            0% { transform: translateX(-150%) rotate(25deg); }
            40% { transform: translateX(250%) rotate(25deg); }
            100% { transform: translateX(250%) rotate(25deg); }
          }
          @keyframes buttonPulseRing {
            0% { transform: scale(1); opacity: 0.7; }
            100% { transform: scale(1.18); opacity: 0; }
          }
          @keyframes beaconBlink {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.4); }
          }
        `}</style>

        {/* Ambient Red Glow Layer */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120%',
          height: '240px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.45) 0%, rgba(127, 0, 0, 0.25) 50%, transparent 80%)',
          filter: 'blur(32px)',
          animation: 'redAmbientPulse 4.5s ease-in-out infinite',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        <img
          src={featured.backdropUrl}
          alt={featured.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75, position: 'relative', zIndex: 2 }}
        />
        {/* Dark overlays */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(5, 5, 5, 0.3) 0%, rgba(5, 5, 5, 0.75) 60%, #050505 100%)',
          zIndex: 3,
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
          zIndex: 4,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              background: 'linear-gradient(135deg, #E50914 0%, #7F0000 100%)',
              color: '#FFFFFF',
              fontSize: '10px',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '4px',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 0 10px rgba(229, 9, 20, 0.6)',
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                animation: 'beaconBlink 1.6s infinite ease-in-out',
              }} />
              FEATURED PREMIERE
            </span>
            <span style={{
              backgroundColor: '#151515',
              border: '1px solid #303030',
              color: '#FFFFFF',
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
            color: '#FFFFFF',
            lineHeight: 1.2,
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}>
            {featured.title}
          </h1>

          <div style={{ fontSize: '12px', color: '#B3B3B3' }}>
            {featured.genres.join(' • ')} • {featured.duration}
          </div>

          {/* Hero Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              {/* Radiating beacon pulse */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '8px',
                border: '2px solid #E50914',
                animation: 'buttonPulseRing 2s cubic-bezier(0.24, 0, 0.38, 1) infinite',
                pointerEvents: 'none',
              }} />

              <button
                onClick={() => onPlayItem(featured)}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #E50914 0%, #7F0000 100%)',
                  border: '1px solid #FF2B36',
                  borderRadius: '8px',
                  padding: '11px',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(229, 9, 20, 0.7)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Light shimmer bar */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  bottom: '-50%',
                  width: '28px',
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  animation: 'buttonShimmerSweep 3s infinite ease-in-out',
                  pointerEvents: 'none',
                }} />

                <Play size={16} fill="#FFFFFF" />
                <span>Watch Now</span>
              </button>
            </div>

            <button
              onClick={() => onSelectItem(featured)}
              style={{
                padding: '11px 16px',
                backgroundColor: '#151515',
                border: '1px solid #303030',
                borderRadius: '8px',
                color: '#FFFFFF',
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
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={16} color="#E50914" />
            <span>Continue Watching</span>
          </div>
          <span style={{ fontSize: '11px', color: '#B3B3B3' }}>3 in progress</span>
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
                backgroundColor: '#151515',
                border: '1px solid #303030',
              }}
            >
              <div style={{ position: 'relative', height: '100px', backgroundColor: '#0D0D0D' }}>
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
                  backgroundColor: 'rgba(0,0,0,0.4)',
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#E50914',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 12px rgba(229, 9, 20, 0.6)',
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
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}>
                  <div style={{
                    width: `${cw.progressPercentage}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #7F0000, #E50914)',
                  }} />
                </div>
              </div>

              <div style={{ padding: '8px 10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {cw.title}
                </div>
                <div style={{ fontSize: '10px', color: '#B3B3B3', marginTop: '2px' }}>
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
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="live-dot" />
            <span>Live TV Channels</span>
          </div>
          <span style={{ fontSize: '11px', color: '#FF2B36', fontWeight: 600 }}>EPG Active</span>
        </div>

        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
          {MOCK_CHANNELS.map((ch) => (
            <div
              key={ch.id}
              onClick={() => onSelectChannel(ch)}
              style={{
                width: '140px',
                flexShrink: 0,
                backgroundColor: '#151515',
                border: '1px solid #303030',
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
                <span className="badge badge-red" style={{ fontSize: '9px', padding: '1px 5px' }}>
                  {ch.resolution}
                </span>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {ch.name}
              </div>
              <div style={{ fontSize: '10px', color: '#FF2B36', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {ch.currentProgram?.title || 'Continuous Stream'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Movies Rail — Swiper 3D EffectCoverflow (Skiper 49) */}
      <div style={{ padding: '0 16px', position: 'relative' }}>
        <style>{`
          .coverflow-swiper-container {
            width: 100%;
            padding-top: 14px;
            padding-bottom: 24px;
          }
          .coverflow-swiper-container .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 220px;
            height: 320px;
            border-radius: 18px;
            transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
          }
          .coverflow-swiper-container .swiper-slide-active {
            box-shadow: 0 0 30px rgba(229, 9, 20, 0.7), 0 14px 40px rgba(0, 0, 0, 0.95);
            transform: scale(1.05);
          }
          .swiper-pagination-bullet {
            background-color: #666666 !important;
            opacity: 0.5 !important;
            width: 7px !important;
            height: 7px !important;
            transition: all 0.25s ease !important;
          }
          .swiper-pagination-bullet-active {
            background-color: #E50914 !important;
            opacity: 1 !important;
            width: 22px !important;
            border-radius: 4px !important;
            box-shadow: 0 0 10px rgba(229, 9, 20, 0.8) !important;
          }
          .swiper-button-disabled {
            opacity: 0.25 !important;
            cursor: not-allowed !important;
          }
        `}</style>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Flame size={16} color="#E50914" />
            <span>Trending 4K Blockbusters</span>
          </div>
          <span className="badge badge-red" style={{ fontSize: '10px', padding: '2px 7px', fontWeight: 700 }}>
            3D COVERFLOW
          </span>
        </div>

        <div style={{ position: 'relative', width: '100%' }}>
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            coverflowEffect={{
              rotate: 40,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
              el: '.blockbuster-pagination',
            }}
            navigation={{
              nextEl: '.blockbuster-nav-next',
              prevEl: '.blockbuster-nav-prev',
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="coverflow-swiper-container"
          >
            {movies.map((m) => (
              <SwiperSlide key={m.id}>
                <div
                  onClick={() => onSelectItem(m)}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#151515',
                    border: '1.5px solid #2B2B2B',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={m.posterUrl}
                    alt={m.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Dark Vignette Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(5,5,5,0.15) 0%, rgba(5,5,5,0.4) 55%, rgba(5,5,5,0.98) 100%)',
                    }}
                  />

                  {/* Top Badges */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      right: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      zIndex: 3,
                    }}
                  >
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #E50914 0%, #7F0000 100%)',
                        color: '#FFFFFF',
                        fontSize: '9px',
                        fontWeight: 800,
                        padding: '3px 7px',
                        borderRadius: '4px',
                        letterSpacing: '0.04em',
                        boxShadow: '0 0 10px rgba(229, 9, 20, 0.6)',
                      }}
                    >
                      TOP 10
                    </span>
                    <div
                      style={{
                        backgroundColor: 'rgba(5, 5, 5, 0.88)',
                        border: '1px solid #333333',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 700,
                        color: '#FBBF24',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <Star size={10} fill="#FBBF24" color="#FBBF24" />
                      {m.rating}
                    </div>
                  </div>

                  {/* Card Bottom Info & Watch Now Button */}
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', zIndex: 3 }}>
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textShadow: '0 2px 6px rgba(0,0,0,0.9)',
                      }}
                    >
                      {m.title}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '10px',
                        color: '#B3B3B3',
                        marginTop: '3px',
                        marginBottom: '8px',
                      }}
                    >
                      <span style={{ color: '#FF2B36', fontWeight: 700 }}>{m.matchScore}% Match</span>
                      <span>•</span>
                      <span>{m.quality || '4K HDR'}</span>
                      <span>•</span>
                      <span>{m.releaseYear}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayItem(m);
                      }}
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #E50914 0%, #7F0000 100%)',
                        border: '1px solid #FF2B36',
                        borderRadius: '7px',
                        padding: '8px 0',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '11px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 12px rgba(229, 9, 20, 0.55)',
                      }}
                    >
                      <Play size={12} fill="#FFFFFF" />
                      <span>Watch Full Movie</span>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Chevrons */}
          <button
            className="blockbuster-nav-prev"
            style={{
              position: 'absolute',
              top: '48%',
              left: '4px',
              transform: 'translateY(-50%)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(15, 15, 15, 0.88)',
              border: '1px solid rgba(229, 9, 20, 0.4)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.7)',
            }}
          >
            <ChevronLeft size={20} color="#FFFFFF" />
          </button>
          <button
            className="blockbuster-nav-next"
            style={{
              position: 'absolute',
              top: '48%',
              right: '4px',
              transform: 'translateY(-50%)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(15, 15, 15, 0.88)',
              border: '1px solid rgba(229, 9, 20, 0.4)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.7)',
            }}
          >
            <ChevronRight size={20} color="#FFFFFF" />
          </button>

          {/* Pagination Dots */}
          <div
            className="blockbuster-pagination"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px',
              marginTop: '4px',
            }}
          />
        </div>
      </div>

      {/* Popular Series Rail — Swiper 3D EffectCards (Skiper 48) with 8 Dummy Series Cards */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} color="#E50914" />
              <span>Binge-Worthy Series 3D Deck</span>
            </div>
            <div style={{ fontSize: '11px', color: '#B3B3B3', marginTop: '2px' }}>
              Swipe cards left/right ({series.length} Series Titles)
            </div>
          </div>
          <span className="badge badge-red" style={{ fontSize: '10px', padding: '2px 7px', fontWeight: 700 }}>
            3D CARDS DECK
          </span>
        </div>

        {/* 3D Cards Stack Swiper */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', paddingBottom: '16px' }}>
          <Swiper
            effect="cards"
            grabCursor={true}
            modules={[EffectCards, Navigation, Pagination]}
            className="series-cards-swiper"
            style={{
              width: '260px',
              height: '370px',
              padding: '10px 0 20px 0',
            }}
            pagination={{
              clickable: true,
              el: '.series-deck-pagination',
            }}
            navigation={{
              nextEl: '.series-deck-next',
              prevEl: '.series-deck-prev',
            }}
          >
            {series.map((s) => (
              <SwiperSlide
                key={s.id}
                style={{
                  borderRadius: '18px',
                  backgroundColor: '#151515',
                  border: '1.5px solid #333333',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.85)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  onClick={() => onSelectItem(s)}
                  style={{ width: '100%', height: '100%', position: 'relative', cursor: 'pointer' }}
                >
                  <img
                    src={s.posterUrl}
                    alt={s.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Dark Vignette Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.4) 45%, rgba(5,5,5,0.98) 100%)',
                    }}
                  />

                  {/* Top Badges */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      right: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      zIndex: 3,
                    }}
                  >
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #E50914 0%, #7F0000 100%)',
                        color: '#FFFFFF',
                        fontSize: '9px',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: '4px',
                        letterSpacing: '0.04em',
                      }}
                    >
                      NEXORA SERIES
                    </span>
                    <div
                      style={{
                        backgroundColor: 'rgba(5, 5, 5, 0.88)',
                        border: '1px solid #333333',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 700,
                        color: '#FBBF24',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <Star size={10} fill="#FBBF24" color="#FBBF24" />
                      {s.rating}
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div style={{ position: 'absolute', bottom: '14px', left: '14px', right: '14px', zIndex: 3 }}>
                    <div
                      style={{
                        fontSize: '15px',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        marginBottom: '4px',
                        textShadow: '0 2px 6px rgba(0,0,0,0.9)',
                      }}
                    >
                      {s.title}
                    </div>
                    <div style={{ fontSize: '11px', color: '#B3B3B3', marginBottom: '10px' }}>
                      {s.seasonsCount ? `${s.seasonsCount} Seasons` : s.duration} • {s.genres ? s.genres[0] : 'Drama'} • {s.quality || '4K HDR'}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayItem(s);
                      }}
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #E50914 0%, #7F0000 100%)',
                        border: '1px solid #FF2B36',
                        borderRadius: '8px',
                        padding: '9px 0',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        boxShadow: '0 3px 14px rgba(229, 9, 20, 0.55)',
                      }}
                    >
                      <Play size={13} fill="#FFFFFF" />
                      <span>Watch S1 E1</span>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Series Deck Navigation Controls & Pagination */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '10px' }}>
            <button
              className="series-deck-prev"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#151515',
                border: '1px solid #333333',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <div className="series-deck-pagination" style={{ display: 'flex', gap: '5px' }} />
            <button
              className="series-deck-next"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#151515',
                border: '1px solid #333333',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* All Series Quick Browse Row */}
        <div style={{ marginTop: '8px', marginBottom: '8px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#B3B3B3', marginBottom: '8px' }}>
            Quick Catalog ({series.length} Available)
          </div>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
            {series.map((s) => (
              <div
                key={s.id}
                onClick={() => onSelectItem(s)}
                style={{
                  width: '110px',
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              >
                <div style={{ position: 'relative', width: '110px', height: '155px', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#151515', border: '1px solid #303030' }}>
                  <img
                    src={s.posterUrl}
                    alt={s.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span className="badge badge-red" style={{ position: 'absolute', bottom: '6px', left: '6px', fontSize: '9px', padding: '1px 5px' }}>
                    {s.seasonsCount ? `${s.seasonsCount}S` : s.duration}
                  </span>
                </div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#FFFFFF', marginTop: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {s.title}
                </div>
                <div style={{ fontSize: '10px', color: '#FF2B36', fontWeight: 600 }}>{s.matchScore}% Match</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
