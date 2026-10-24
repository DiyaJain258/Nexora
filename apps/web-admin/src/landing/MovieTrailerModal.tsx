import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Activity, Film, Star, CheckCircle } from 'lucide-react';

export interface MovieTrailerItem {
  id: string;
  title: string;
  tagline: string;
  rating: string;
  quality: string;
  genres: string[];
  duration: string;
  releaseYear: number;
  synopsis: string;
  backdropUrl: string;
  trailerVideoUrl?: string; // Optional direct mp4 or fallback video
  accentColor: string;
}

interface MovieTrailerModalProps {
  movie: MovieTrailerItem | null;
  isOpen: boolean;
  onClose: () => void;
  onActivatePass?: () => void;
  onPlayMovie?: (movie: any) => void;
}

export const MovieTrailerModal: React.FC<MovieTrailerModalProps> = ({
  movie,
  isOpen,
  onClose,
  onActivatePass,
  onPlayMovie,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(18);

  useEffect(() => {
    if (!isOpen) {
      setProgress(18);
      setIsPlaying(true);
      return;
    }

    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress((prev) => (prev >= 98 ? 8 : prev + 1.2));
      }
    }, 400);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen || !movie) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999999,
          backgroundColor: 'rgba(5, 5, 7, 0.94)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card"
          style={{
            width: '100%',
            maxWidth: '1040px',
            backgroundColor: '#0a0a0f',
            borderRadius: '24px',
            border: '1px solid rgba(225, 29, 72, 0.45)',
            boxShadow: '0 30px 100px rgba(0, 0, 0, 0.95), 0 0 50px rgba(225, 29, 72, 0.3)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Top Bar */}
          <div
            style={{
              padding: '16px 24px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#0d0d14',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e11d48', boxShadow: '0 0 10px #e11d48' }} />
              <div>
                <span style={{ fontSize: '15px', fontWeight: 900, color: '#f8fafc' }}>
                  {movie.title} • Official 4K Cinema Trailer
                </span>
                <span style={{ fontSize: '11px', color: '#fda4af', marginLeft: '10px', textTransform: 'uppercase', fontWeight: 700 }}>
                  Dolby Vision • Dolby Atmos 7.1
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '6px',
                cursor: 'pointer',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(225, 29, 72, 0.2)';
                e.currentTarget.style.color = '#fda4af';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Cinematic Video Stage */}
          <div style={{ position: 'relative', height: '500px', backgroundColor: '#000000', overflow: 'hidden' }}>
            <img
              src={movie.backdropUrl}
              alt={movie.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: isPlaying ? 'brightness(0.95) contrast(1.1)' : 'brightness(0.65) contrast(1.1) blur(2px)',
                transform: isPlaying ? 'scale(1.04)' : 'scale(1.0)',
                transition: 'transform 8s ease, filter 0.4s ease',
              }}
            />

            {/* Cinematic Gradient Vignette */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(10, 10, 15, 0.95) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Telemetry overlay pill */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                backgroundColor: 'rgba(10, 10, 15, 0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(225, 29, 72, 0.35)',
                borderRadius: '12px',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={14} color="#fda4af" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#fda4af' }}>24.8 Mbps</span>
              </div>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>3840×2160 @ 60fps</span>
              <span style={{ fontSize: '11px', color: '#fda4af', fontWeight: 700 }}>HEVC Main 10</span>
            </div>

            {/* Center Play/Pause Overlay indicator when paused */}
            {!isPlaying && (
              <div
                onClick={() => setIsPlaying(true)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                }}
              >
                <div
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 35px rgba(255, 255, 255, 0.6)',
                  }}
                >
                  <Play size={32} color="#050507" fill="#050507" style={{ marginLeft: '4px' }} />
                </div>
              </div>
            )}

            {/* Bottom Player HUD */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px 28px',
                zIndex: 10,
              }}
            >
              {/* Timeline Scrub Bar */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newProgress = Math.min(100, Math.max(0, (clickX / rect.width) * 100));
                  setProgress(newProgress);
                }}
                style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '3px',
                  marginBottom: '16px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #e11d48, #fda4af)',
                    borderRadius: '3px',
                    boxShadow: '0 0 10px #e11d48',
                    transition: 'width 0.4s linear',
                  }}
                />
              </div>

              {/* Controls & Details Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    {isPlaying ? (
                      <Pause size={18} color="#050507" fill="#050507" />
                    ) : (
                      <Play size={18} color="#050507" fill="#050507" style={{ marginLeft: '2px' }} />
                    )}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '50%',
                      width: '38px',
                      height: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#ffffff',
                    }}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>

                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                      {movie.title}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#a1a1aa', margin: '2px 0 0' }}>
                      {movie.releaseYear} • {movie.duration} • {movie.genres.join(' / ')}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onPlayMovie) {
                        onPlayMovie(movie);
                      } else if (onActivatePass) {
                        onActivatePass();
                      }
                    }}
                    className="btn-primary-glow"
                    style={{ padding: '10px 20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                  >
                    <Play size={14} fill="#ffffff" color="#ffffff" />
                    <span>Stream Full 4K Movie</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Synopsis Area */}
          <div style={{ padding: '22px 28px', backgroundColor: '#0a0a0f', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
            <p style={{ fontSize: '13px', color: '#a1a1aa', lineHeight: 1.6, maxWidth: '75%', margin: 0 }}>
              {movie.synopsis}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '8px 16px', borderRadius: '12px' }}>
              <Star size={16} fill="#f59e0b" color="#f59e0b" />
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>{movie.rating} / 10</span>
              <span style={{ fontSize: '11px', color: '#71717a' }}>IMDb</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
