import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Zap, Star, Volume2, VolumeX, ChevronLeft, ChevronRight, Activity, Sparkles, CheckCircle2, Film } from 'lucide-react';
import { SparklesCore } from '../components/ui/sparkles';
import { MovieTrailerModal, MovieTrailerItem } from './MovieTrailerModal';

interface NetflixHeroBillboardProps {
  onOpenLiveDemo: () => void;
  onOpenActivation?: () => void;
  onNavigateToAdmin: () => void;
  onPlayMovie?: (movie: any) => void;
}

const HERO_MOVIES: (MovieTrailerItem & { videoUrl: string })[] = [
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
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&auto=format&fit=crop&q=85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
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
    backdropUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920&auto=format&fit=crop&q=85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
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
    backdropUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1920&auto=format&fit=crop&q=85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
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
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
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
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&auto=format&fit=crop&q=85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    accentColor: '#ffffff',
  },
];

export const NetflixHeroBillboard: React.FC<NetflixHeroBillboardProps> = ({
  onOpenLiveDemo,
  onOpenActivation,
  onNavigateToAdmin,
  onPlayMovie,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const [selectedTrailerMovie, setSelectedTrailerMovie] = useState<MovieTrailerItem | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [timerProgress, setTimerProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Sync video audio mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Auto-slide every 7 seconds with animated progress
  useEffect(() => {
    setTimerProgress(0);
    const progressInterval = setInterval(() => {
      setTimerProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => (idx + 1) % HERO_MOVIES.length);
          return 0;
        }
        return prev + 1.6;
      });
    }, 110);

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

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isPlayingVideo) {
        videoRef.current.pause();
        setIsPlayingVideo(false);
      } else {
        videoRef.current.play();
        setIsPlayingVideo(true);
      }
    }
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
      }}
    >
      {/* Background Cinematic Movie Live Video & Backdrop with Smooth Crossfade */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMovie.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
            }}
          >
            {/* Live 4K Streaming Video Player playing directly on the hero */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              poster={currentMovie.backdropUrl}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 25%',
                filter: 'brightness(0.9) contrast(1.15) saturate(1.1)',
                transform: 'scale(1.02)',
              }}
            >
              <source src={currentMovie.videoUrl} type="video/mp4" />
            </video>

            {/* Cinematic Gradient Vignettes: Soft on Right so Video is clearly visible, Dark on Left for typography */}
            {/* Top Navbar Dimmer */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '160px',
                background: 'linear-gradient(180deg, #050507 0%, rgba(5, 5, 7, 0.7) 40%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Left Text Shadow Gradient (Soft feathering ensures video on the right shines bright) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, #050507 0%, rgba(5, 5, 7, 0.88) 36%, rgba(5, 5, 7, 0.3) 65%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Bottom Deep Fade into next section */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '240px',
                background: 'linear-gradient(0deg, #050507 0%, rgba(5, 5, 7, 0.8) 45%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

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
        className="hero-billboard-content"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1380px',
          margin: '0 auto',
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ maxWidth: '820px', paddingTop: '10px' }}>
          
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
              padding: '5px 14px',
              backgroundColor: 'rgba(225, 29, 72, 0.18)',
              border: '1px solid rgba(225, 29, 72, 0.45)',
              borderRadius: '8px',
              marginBottom: '14px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 25px rgba(225, 29, 72, 0.25)',
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#e11d48', boxShadow: '0 0 10px #e11d48' }} />
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#ffffff', letterSpacing: '1px', textTransform: 'uppercase' }}>
              {currentMovie.tagline}
            </span>
          </motion.div>

          {/* Netflix Movie Title */}
          <motion.h1
            key={`title-${currentMovie.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="hero-billboard-title"
            style={{
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#ffffff',
              letterSpacing: '-1px',
              marginBottom: '14px',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.95)',
            }}
          >
            {currentMovie.title}
          </motion.h1>

          {/* Movie Metadata Strip */}
          <motion.div
            key={`meta-${currentMovie.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '16px',
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#d4d4d8',
              maxWidth: '680px',
              marginBottom: '24px',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.85)',
            }}
          >
            {currentMovie.synopsis}
          </motion.p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '24px' }}>
            
            {/* Primary Watch in 4K HDR Button */}
            <button
              type="button"
              onClick={() => {
                if (onPlayMovie) {
                  onPlayMovie(currentMovie);
                } else {
                  handleOpenTrailer(currentMovie);
                }
              }}
              className="btn-radiant"
              style={{
                padding: '14px 28px',
                fontSize: '14px',
                fontWeight: 900,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <Play size={18} color="#050507" fill="#050507" />
              <span>Watch in 4K HDR</span>
            </button>

            {/* Watch Trailer Button */}
            <button
              type="button"
              onClick={() => handleOpenTrailer(currentMovie)}
              className="btn-primary-glow"
              style={{
                padding: '14px 24px',
                fontSize: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <Film size={16} />
              <span>Watch Trailer</span>
            </button>

            {/* Live TV Channels Quick Demo */}
            <button
              onClick={onOpenLiveDemo}
              className="btn-secondary-glass"
              style={{
                padding: '14px 22px',
                fontSize: '14px',
              }}
            >
              <Activity size={16} color="#fda4af" />
              <span>1,420+ Live Channels</span>
            </button>

          </div>

          {/* Value Highlights Pill Bar */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <CheckCircle2 size={15} color="#fda4af" />
              <span style={{ fontSize: '12px', color: '#e4e4e7', fontWeight: 600 }}>0.4s Instant Channel Tuning</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <CheckCircle2 size={15} color="#ffffff" />
              <span style={{ fontSize: '12px', color: '#e4e4e7', fontWeight: 600 }}>Zero Buffering LL-HLS</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <CheckCircle2 size={15} color="#fda4af" />
              <span style={{ fontSize: '12px', color: '#e4e4e7', fontWeight: 600 }}>Smart TV 1-Tap Pairing</span>
            </div>
          </div>

        </div>

        {/* Unified Bottom Strip: Flex layout with ZERO overlap */}
        <div
          className="hero-billboard-bottom-strip"
          style={{
            marginTop: 'auto',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            width: '100%',
          }}
        >
          {/* Left: Slide Timer Indicator Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#71717a' }}>
              0{currentIndex + 1} / 0{HERO_MOVIES.length}
            </span>
            <div style={{ width: '60px', height: '3px', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: '2px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${timerProgress}%`,
                  height: '100%',
                  backgroundColor: '#e11d48',
                  boxShadow: '0 0 8px #e11d48',
                  transition: 'width 0.11s linear',
                }}
              />
            </div>
          </div>

          {/* Center: Movie Thumbnails Strip */}
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '2px', flex: 1, minWidth: 0, justifyContent: 'flex-start' }}>
            {HERO_MOVIES.map((movie, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={movie.id}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    position: 'relative',
                    width: '130px',
                    height: '70px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: isActive ? '2px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: isActive ? '0 0 16px rgba(225, 29, 72, 0.5), 0 0 8px #ffffff' : 'none',
                    transform: isActive ? 'scale(1.04)' : 'scale(1.0)',
                    transition: 'all 0.25s ease',
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
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                        backgroundColor: '#e11d48',
                        padding: '2px 5px',
                        borderRadius: '4px',
                        boxShadow: '0 0 8px #e11d48',
                      }}
                    >
                      <Play size={7} fill="#ffffff" color="#ffffff" />
                      <span style={{ fontSize: '7px', fontWeight: 900, color: '#ffffff' }}>LIVE</span>
                    </div>
                  )}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '5px',
                      left: '7px',
                      right: '7px',
                      fontSize: '9px',
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

          {/* Right: Controls & Live Feed Badge (Unified Flex Items - NEVER overlaps) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Prev & Next Slide Buttons */}
            <button
              onClick={handlePrev}
              title="Previous Movie"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              title="Next Movie"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={16} />
            </button>

            {/* Pause / Play Ambient Video */}
            <button
              onClick={toggleVideoPlayback}
              title={isPlayingVideo ? 'Pause Video' : 'Play Video'}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(10, 10, 16, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#ffffff',
                transition: 'all 0.2s',
              }}
            >
              {isPlayingVideo ? <Pause size={15} /> : <Play size={15} fill="#ffffff" />}
            </button>

            {/* Sound Mute/Unmute */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: isMuted ? 'rgba(10, 10, 16, 0.9)' : '#e11d48',
                border: `1px solid ${isMuted ? 'rgba(255, 255, 255, 0.25)' : '#ffffff'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#ffffff',
                boxShadow: isMuted ? 'none' : '0 0 16px rgba(225, 29, 72, 0.8)',
                transition: 'all 0.2s',
              }}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            {/* 4K Live Broadcast Pill */}
            <div
              style={{
                padding: '6px 12px',
                backgroundColor: 'rgba(10, 10, 16, 0.92)',
                border: '1px solid rgba(225, 29, 72, 0.4)',
                borderLeft: '3px solid #e11d48',
                borderRadius: '6px',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#e11d48', animation: 'pulse 1.2s infinite' }} />
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#ffffff', letterSpacing: '0.5px' }}>4K LIVE</span>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Trailer Modal */}
      <MovieTrailerModal
        movie={selectedTrailerMovie}
        isOpen={isTrailerModalOpen}
        onClose={() => setIsTrailerModalOpen(false)}
        onActivatePass={onOpenActivation}
        onPlayMovie={onPlayMovie}
      />
    </div>
  );
};
