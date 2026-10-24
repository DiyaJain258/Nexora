import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, Play, Star, Sparkles } from 'lucide-react';
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { cn } from '../../lib/utils';
import { ContentItem } from '@nexora/shared';

interface Skiper49Props {
  items: ContentItem[];
  className?: string;
  onPlayMovie?: (item: ContentItem) => void;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}

export const Skiper49Coverflow: React.FC<Skiper49Props> = ({
  items,
  className,
  onPlayMovie,
  showPagination = true,
  showNavigation = true,
  loop = true,
  autoplay = true,
  spaceBetween = 10,
}) => {
  const css = `
  .Carousal_003 {
    width: 100%;
    height: 480px;
    padding-top: 30px;
    padding-bottom: 60px !important;
  }
  
  .Carousal_003 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 310px;
    height: 410px;
    border-radius: 20px;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .Carousal_003 .swiper-slide-active {
    box-shadow: 0 0 40px rgba(225, 29, 72, 0.45), 0 25px 50px rgba(0, 0, 0, 0.95);
    border: 1px solid rgba(225, 29, 72, 0.6) !important;
  }

  .swiper-pagination-bullet {
    background-color: rgba(255, 255, 255, 0.25) !important;
    opacity: 0.6;
    transition: all 0.3s;
  }

  .swiper-pagination-bullet-active {
    background-color: #e11d48 !important;
    width: 24px !important;
    border-radius: 6px !important;
    opacity: 1;
    box-shadow: 0 0 12px #e11d48;
  }

  .coverflow-nav-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(10, 10, 16, 0.88);
    border: 1.5px solid rgba(225, 29, 72, 0.5);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.85), 0 0 22px rgba(225, 29, 72, 0.35);
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 30;
  }

  .coverflow-nav-btn:hover {
    background: #e11d48;
    color: #ffffff;
    border-color: #ffffff;
    transform: translateY(-50%) scale(1.12);
    box-shadow: 0 0 30px rgba(225, 29, 72, 0.8), 0 0 15px #ffffff;
  }
`;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
      }}
      className={cn('relative w-full max-w-6xl mx-auto px-4', className)}
    >
      <style>{css}</style>

      {/* Decorative Velvet Burgundy & Platinum Ambilight Backdrop */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          height: '240px',
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.16) 0%, rgba(136, 19, 55, 0.1) 40%, transparent 75%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full relative"
        style={{ zIndex: 1 }}
      >
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 2800,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop}
          coverflowEffect={{
            rotate: 35,
            stretch: 0,
            depth: 140,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: '.swiper-button-next-custom',
                  prevEl: '.swiper-button-prev-custom',
                }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {items.map((movie, index) => (
            <SwiperSlide key={movie.id || index} className="group">
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#0a0a0f',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  cursor: 'pointer',
                }}
                onClick={() => onPlayMovie && onPlayMovie(movie)}
              >
                {/* Poster Image */}
                <img
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={movie.posterUrl}
                  alt={movie.title}
                  loading="lazy"
                />

                {/* Top Floating Badges */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    right: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      background: 'rgba(10, 10, 14, 0.85)',
                      backdropFilter: 'blur(10px)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      padding: '3px 9px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.5px',
                    }}
                  >
                    {movie.quality || '4K HDR'}
                  </span>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'rgba(10, 10, 14, 0.85)',
                      backdropFilter: 'blur(10px)',
                      color: '#fbbf24',
                      padding: '3px 9px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 800,
                      border: '1px solid rgba(251, 191, 36, 0.35)',
                    }}
                  >
                    <Star size={12} fill="#fbbf24" color="#fbbf24" />
                    <span>{movie.rating}</span>
                  </div>
                </div>

                {/* Bottom Gradient Overlay & Metadata */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px 18px 18px',
                    background: 'linear-gradient(to top, rgba(5, 5, 8, 0.98) 0%, rgba(5, 5, 8, 0.75) 60%, transparent 100%)',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {movie.genres?.slice(0, 2).map((g, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '10px',
                          color: '#a1a1aa',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          padding: '2px 7px',
                          borderRadius: '4px',
                          fontWeight: 600,
                        }}
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  <h4
                    style={{
                      fontSize: '17px',
                      fontWeight: 800,
                      color: '#ffffff',
                      margin: 0,
                      lineHeight: 1.25,
                      textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                    }}
                  >
                    {movie.title}
                  </h4>

                  {/* Play Action Button on Center / Hover */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '6px',
                    }}
                  >
                    <span style={{ fontSize: '11px', color: '#71717a', fontWeight: 600 }}>
                      {movie.duration || '2h 15m'} • {movie.releaseYear || '2026'}
                    </span>

                    <button
                      type="button"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#050507',
                        border: 'none',
                        borderRadius: '999px',
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontWeight: 900,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        boxShadow: '0 0 16px rgba(255, 255, 255, 0.35)',
                        cursor: 'pointer',
                      }}
                    >
                      <Play size={12} fill="#050507" color="#050507" />
                      <span>Play 4K</span>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Chevrons inside container */}
        {showNavigation && (
          <>
            <button
              className="swiper-button-prev-custom coverflow-nav-btn"
              style={{
                position: 'absolute',
                top: '46%',
                left: '8px',
                transform: 'translateY(-50%)',
              }}
              aria-label="Previous Slide"
            >
              <ChevronLeftIcon size={22} color="#ffffff" />
            </button>
            <button
              className="swiper-button-next-custom coverflow-nav-btn"
              style={{
                position: 'absolute',
                top: '46%',
                right: '8px',
                transform: 'translateY(-50%)',
              }}
              aria-label="Next Slide"
            >
              <ChevronRightIcon size={22} color="#ffffff" />
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Skiper49Coverflow;
