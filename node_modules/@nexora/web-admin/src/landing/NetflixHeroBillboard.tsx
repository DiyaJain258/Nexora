import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Zap, Star, Volume2, VolumeX, ChevronLeft, ChevronRight, Activity, Sparkles, CheckCircle2, Film } from 'lucide-react';
import { SparklesCore } from '@/components/ui/sparkles';
import { MovieTrailerModal, MovieTrailerItem } from './MovieTrailerModal';

interface NetflixHeroBillboardProps {
  onOpenLiveDemo: () => void;
  onOpenActivation: () => void;
  onNavigateToAdmin: () => void;
}

const HERO_MOVIES: MovieTrailerItem[] = [
  {
    id: 'hero-01',
    title: 'Dune: Prophecy • Part Two',
    tagline: '#1 TRENDING STREAM TODAY • 4K UHD',
    rating: '9.4',
    quality: 'IMAX 4K HDR',
    genres: ['Sci-Fi', 'Adventure', 'Action'],
    duration: '2h 46m',
    releaseYear: 2026,
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking vengeance against the conspirators who destroyed his family, confronting choices between the love of his life and the fate of the known universe.',
    backdropUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&auto=format&fit=crop&q=85',
    accentColor: '#e11d48',
  },
  {
    id: 'hero-02',
    title: 'Gladiator II: Bloodline of Rome',
    tagline: 'GLOBAL CINEMA PREMIERE • 4K 60FPS',
    rating: '9.2',
    quality: 'DOLBY VISION • ATMOS',
    genres: ['Action', 'Drama', 'Epic'],
    duration: '2h 30m',
    releaseYear: 2026,
    synopsis: 'Years after witnessing the heroic sacrifice of Maximus, Lucius must enter the Colosseum after his home is conquered by tyrannical Emperors who lead Rome with an iron fist.',
    backdropUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&auto=format&fit=crop&q=85',
    accentColor: '#be123c',
  },
  {
    id: 'hero-03',
    title: 'UEFA Champions League Final: Munich',
    tagline: 'LIVE STADIUM BROADCAST • LOW LATENCY',
    rating: '9.9',
    quality: '4K 60FPS • HEVC 10-BIT',
    genres: ['Live Sports', 'Football', 'UEFA'],
    duration: 'Live 120m',
    releaseYear: 2026,
    synopsis: 'Real Madrid vs Manchester City in the greatest European football clash. Ultra-low latency LL-HLS 4K 60fps broadcast with Dolby Atmos stadium crowd audio and zero buffering.',
    backdropUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1920&auto=format&fit=crop&q=80',
    accentColor: '#e11d48',
  },
  {
    id: 'hero-04',
    title: 'Cyberpunk: Neon Syndicate 2099',
    tagline: 'ORIGINAL SERIES • COMPLETE SEASON 3',
    rating: '8.9',
    quality: '4K HDR10+ • DOLBY ATMOS',
    genres: ['Cyberpunk', 'Action', 'Sci-Fi'],
    duration: '10 Episodes',
    releaseYear: 2026,
    synopsis: 'In the sprawling subterranean corridors of New Hong Kong, a renegade augmented operative unravels a rogue sentient AI conspiracy threatening global satellite networks.',
    backdropUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&auto=format&fit=crop&q=85',
    accentColor: '#fda4af',
  },
  {
    id: 'hero-05',
    title: 'Interstellar: Deep Astral Crossing',
    tagline: 'CRITICS CHOICE • MASTER 4K EDITION',
    rating: '9.5',
    quality: 'IMAX 70MM 4K UHD',
    genres: ['Sci-Fi', 'Mystery', 'Space Drama'],
    duration: '2h 49m',
    releaseYear: 2026,
    synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival, exploring gargantuan ocean planets and temporal gravity distortions.',
    backdropUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1920&auto=format&fit=crop&q=85',
    accentColor: '#ffffff',
  },
];

export const NetflixHeroBillboard: React.FC<NetflixHeroBillboardProps> = ({
  onOpenLiveDemo,
  onOpenActivation,
  onNavigateToAdmin,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const [selectedTrailerMovie, setSelectedTrailerMovie] = useState<MovieTrailerItem | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [timerProgress, setTimerProgress] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide every 6 seconds with animated progress
  useEffect(() => {
    setTimerProgress(0);
    const progressInterval = setInterval(() => {
      setTimerProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => (idx + 1) % HERO_MOVIES.length);
          return 0;
        }
        return prev + 2;
      });
    }, 120);

    return () => clearInterval(progressInterval);
  }, [currentIndex]);

  const currentMovie = HERO_MOVIES[currentIndex];

  const handleOpenTrailer = (movie: MovieTrailerItem) => {
    setSelectedTrailerMovie(movie);
    setIsTrailerModalOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_MOVIES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_MOVIES.length) % HERO_MOVIES.length);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '94vh',
        backgroundColor: '#050507',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      {/* Background Cinematic Movie Artwork with Smooth Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
          }}
        >
          <img
            src={currentMovie.backdropUrl}
            alt={currentMovie.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              filter: 'brightness(0.7) contrast(1.15)',
            }}
          />

          {/* Cinematic Gradient Vignettes for Seamless Legibility */}
          {/* Top Navbar Dimmer */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '240px',
              background: 'linear-gradient(180deg, #050507 0%, rgba(5, 5, 7, 0.7) 50%, transparent 100%)',
            }}
          />

          {/* Left Text Shadow Gradient (Netflix signature look) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, #050507 0%, rgba(5, 5, 7, 0.94) 35%, rgba(5, 5, 7, 0.45) 65%, transparent 100%)',
            }}
          />

          {/* Bottom Deep Fade into next section */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '340px',
              background: 'linear-gradient(0deg, #050507 0%, rgba(5, 5, 7, 0.9) 45%, transparent 100%)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Sparkling Stars Overlay (Aceternity SparklesCore) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', opacity: 0.7 }}>
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={70}
          className="w-full h-full"
          particleColor="#fda4af"
        />
      </div>

      {/* Main Content Area */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1380px',
          margin: '0 auto',
          padding: '140px 32px 50px',
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '820px' }}>
          
          {/* Top Tagline / Category Badge */}
          <motion.div
            key={`badge-${currentMovie.id}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              backgroundColor: 'rgba(225, 29, 72, 0.18)',
              border: '1px solid rgba(225, 29, 72, 0.45)',
              borderRadius: '8px',
              marginBottom: '18px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 25px rgba(225, 29, 72, 0.25)',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e11d48', boxShadow: '0 0 10px #e11d48' }} />
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#ffffff', letterSpacing: '1px', textTransform: 'uppercase' }}>
              {currentMovie.tagline}
            </span>
          </motion.div>

          {/* Huge Netflix Title */}
          <motion.h1
            key={`title-${currentMovie.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: '58px',
              fontWeight: 900,
              lineHeight: 1.05,
              color: '#ffffff',
              letterSpacing: '-1.5px',
              marginBottom: '16px',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.9)',
            }}
          >
            {currentMovie.title}
          </motion.h1>

          {/* Movie Metadata Strip */}
          <motion.div
            key={`meta-${currentMovie.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '3px 9px', borderRadius: '6px' }}>
              <Star size={13} fill="#f59e0b" color="#f59e0b" />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff' }}>{currentMovie.rating}</span>
            </div>

            <span style={{ fontSize: '11px', fontWeight: 800, backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              16+
            </span>

            <span style={{ fontSize: '13px', color: '#fda4af', fontWeight: 700 }}>
              {currentMovie.duration}
            </span>

            <span style={{ color: '#71717a' }}>•</span>

            <span style={{ fontSize: '11px', fontWeight: 900, backgroundColor: '#ffffff', color: '#050507', padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>
              {currentMovie.quality}
            </span>

            <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: 'rgba(225, 29, 72, 0.18)', color: '#fda4af', border: '1px solid rgba(225, 29, 72, 0.4)', padding: '2px 8px', borderRadius: '4px' }}>
              DOLBY ATMOS 7.1
            </span>

            <span style={{ color: '#71717a' }}>•</span>

            <span style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: 600 }}>
              {currentMovie.genres.join(' • ')}
            </span>
          </motion.div>

          {/* Synopsis */}
          <motion.p
            key={`synopsis-${currentMovie.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              fontSize: '16px',
              lineHeight: 1.65,
              color: '#d4d4d8',
              maxWidth: '680px',
              marginBottom: '32px',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
            }}
          >
            {currentMovie.synopsis}
          </motion.p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
            
            {/* Primary Watch Trailer Button (User Explicit Request) */}
            <button
              onClick={() => handleOpenTrailer(currentMovie)}
              className="btn-radiant"
              style={{
                padding: '16px 32px',
                fontSize: '15px',
                fontWeight: 900,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
              }}
            >
              <Play size={20} color="#050507" fill="#050507" />
              <span>Watch 4K Trailer</span>
            </button>

            {/* Stream 4K Live Pass */}
            <button
              onClick={onOpenActivation}
              className="btn-primary-glow"
              style={{
                padding: '16px 28px',
                fontSize: '15px',
              }}
            >
              <Zap size={18} />
              <span>Activate TV Free Pass</span>
            </button>

            {/* Live TV Channels Quick Demo */}
            <button
              onClick={onOpenLiveDemo}
              className="btn-secondary-glass"
              style={{
                padding: '16px 24px',
                fontSize: '15px',
              }}
            >
              <Activity size={18} color="#fda4af" />
              <span>1,420+ Live Channels</span>
            </button>

          </div>

          {/* Value Highlights Pill Bar */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="#fda4af" />
              <span style={{ fontSize: '13px', color: '#e4e4e7', fontWeight: 600 }}>0.4s Instant Channel Tuning</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="#ffffff" />
              <span style={{ fontSize: '13px', color: '#e4e4e7', fontWeight: 600 }}>Zero Buffering LL-HLS</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="#fda4af" />
              <span style={{ fontSize: '13px', color: '#e4e4e7', fontWeight: 600 }}>Smart TV 1-Tap Pairing</span>
            </div>
          </div>

        </div>

        {/* Right Corner: Sound Mute/Unmute & Rating Badge (Netflix Signature) */}
        <div
          style={{
            position: 'absolute',
            right: '32px',
            bottom: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            zIndex: 20,
          }}
        >
          <button
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Unmute Ambient Sound' : 'Mute Ambient Sound'}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(225, 29, 72, 0.25)';
              e.currentTarget.style.borderColor = '#e11d48';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            }}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <div
            style={{
              padding: '6px 14px',
              backgroundColor: 'rgba(5, 5, 7, 0.8)',
              borderLeft: '3px solid #e11d48',
              borderRadius: '0 6px 6px 0',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 900, color: '#ffffff' }}>4K ULTRA HD</span>
          </div>
        </div>

        {/* Bottom Interactive Thumbnail Carousel Strip (Netflix / Prime Video Style) */}
        <div
          style={{
            marginTop: '44px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          {/* Slide Timer Indicator Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#71717a' }}>
              0{currentIndex + 1} / 0{HERO_MOVIES.length}
            </span>
            <div style={{ width: '80px', height: '3px', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: '2px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${timerProgress}%`,
                  height: '100%',
                  backgroundColor: '#e11d48',
                  boxShadow: '0 0 8px #e11d48',
                  transition: 'width 0.12s linear',
                }}
              />
            </div>
          </div>

          {/* Thumbnail Movie Cards Strip */}
          <div style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '4px' }}>
            {HERO_MOVIES.map((movie, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={movie.id}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    position: 'relative',
                    width: '140px',
                    height: '76px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: isActive ? '2px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: isActive ? '0 0 20px rgba(225, 29, 72, 0.4), 0 0 10px #ffffff' : 'none',
                    transform: isActive ? 'scale(1.05)' : 'scale(1.0)',
                    transition: 'all 0.3s ease',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={movie.backdropUrl}
                    alt={movie.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: isActive
                        ? 'linear-gradient(to top, rgba(225, 29, 72, 0.7) 0%, transparent 100%)'
                        : 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0,0,0,0.2) 100%)',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '6px',
                      left: '8px',
                      right: '8px',
                      fontSize: '10px',
                      fontWeight: 800,
                      color: '#ffffff',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {movie.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Next / Prev Navigation Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handlePrev}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

      </div>

      {/* Interactive Trailer Modal */}
      <MovieTrailerModal
        movie={selectedTrailerMovie}
        isOpen={isTrailerModalOpen}
        onClose={() => setIsTrailerModalOpen(false)}
        onActivatePass={onOpenActivation}
      />
    </div>
  );
};
