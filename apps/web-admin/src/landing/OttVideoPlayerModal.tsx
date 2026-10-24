import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Settings,
  Sparkles,
  Bookmark,
  Check,
  Star,
  Film,
  Zap,
  Subtitles,
  AudioWaveform,
  ShieldCheck,
} from 'lucide-react';
import { ContentItem } from '@nexora/shared';

interface OttVideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ContentItem | any | null;
  isInWatchlist?: boolean;
  onToggleWatchlist?: (id: string) => void;
}

const DEFAULT_VIDEO_URL =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';

export const OttVideoPlayerModal: React.FC<OttVideoPlayerModalProps> = ({
  isOpen,
  onClose,
  item,
  isInWatchlist = false,
  onToggleWatchlist,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(148 * 60); // fallback ~2h 28m
  const [bufferedPercent, setBufferedPercent] = useState<number>(35);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [selectedQuality, setSelectedQuality] = useState<string>('4K UHD (2160p)');
  const [showQualityMenu, setShowQualityMenu] = useState<boolean>(false);
  const [selectedAudio, setSelectedAudio] = useState<string>('English [Dolby Atmos 7.1]');
  const [selectedSubtitles, setSelectedSubtitles] = useState<string>('English CC');
  const [showAudioMenu, setShowAudioMenu] = useState<boolean>(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPositionPercent, setHoverPositionPercent] = useState<number>(0);
  const [centerPlayFeedback, setCenterPlayFeedback] = useState<'play' | 'pause' | null>(null);

  const qualityOptions = [
    { label: '4K UHD (2160p)', desc: 'HDR10+ • 18.5 Mbps', badge: 'ULTRA' },
    { label: '1080p FHD', desc: 'Full HD • 8.2 Mbps', badge: 'HD' },
    { label: '720p HD', desc: 'Fast Stream • 4.5 Mbps', badge: 'SD' },
    { label: 'Auto Adaptive', desc: 'Smart CDN Switcher', badge: 'AUTO' },
  ];

  const audioOptions = [
    'English [Dolby Atmos 7.1]',
    'Hindi [Dolby Digital 5.1]',
    'Spanish [Dolby 5.1]',
    'French [5.1 Passthrough]',
  ];

  const subtitleOptions = ['English CC', 'Hindi', 'Spanish', 'Off'];

  // Handle Play/Pause
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      setCenterPlayFeedback('play');
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setCenterPlayFeedback('pause');
    }
    setTimeout(() => setCenterPlayFeedback(null), 600);
  }, []);

  // Format seconds to HH:MM:SS or MM:SS
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) secs = 0;
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    if (h > 0) {
      return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    }
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Skip time (+/- seconds)
  const handleSkip = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(
      0,
      Math.min(videoRef.current.duration || duration, videoRef.current.currentTime + seconds)
    );
  };

  // Toggle Mute
  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.volume = volume || 0.5;
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // Volume Change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  // Scrub Timeline Seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = percent * (videoRef.current?.duration || duration);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  // Hover Timeline for timestamp preview
  const handleTimelineHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const hoverX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, hoverX / rect.width));
    setHoverPositionPercent(percent * 100);
    setHoverTime(percent * (videoRef.current?.duration || duration));
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Mouse Move / Inactivity Controls Visibility
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
        setShowQualityMenu(false);
        setShowAudioMenu(false);
      }
    }, 3200);
  };

  // Keyboard Shortcuts Listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.code) {
        case 'Space':
        case 'KeyK':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleSkip(-10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleSkip(10);
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'Escape':
          e.preventDefault();
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          } else {
            onClose();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, togglePlay, onClose]);

  // Video Events
  useEffect(() => {
    if (!isOpen) return;

    const v = videoRef.current;
    if (!v) return;

    const onTimeUpdate = () => {
      setCurrentTime(v.currentTime);
      if (v.buffered.length > 0 && v.duration) {
        const bufferedEnd = v.buffered.end(v.buffered.length - 1);
        setBufferedPercent((bufferedEnd / v.duration) * 100);
      }
    };

    const onLoadedMetadata = () => {
      if (v.duration && !isNaN(v.duration)) {
        setDuration(v.duration);
      }
      v.play().catch(() => {
        setIsPlaying(false);
      });
    };

    v.addEventListener('timeupdate', onTimeUpdate);
    v.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      v.removeEventListener('timeupdate', onTimeUpdate);
      v.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const videoSource = item.streamUrl || item.trailerUrl || DEFAULT_VIDEO_URL;
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <AnimatePresence>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999999,
          backgroundColor: '#000000',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          userSelect: 'none',
        }}
      >
        {/* Cinema Ambient Burgundy Backlight */}
        <div
          style={{
            position: 'absolute',
            inset: '-10%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(225, 29, 72, 0.18) 0%, rgba(136, 19, 55, 0.08) 50%, transparent 80%)',
            pointerEvents: 'none',
            zIndex: 1,
            filter: 'blur(60px)',
          }}
        />

        {/* Video Element */}
        <video
          ref={videoRef}
          src={videoSource}
          poster={item.backdropUrl || item.posterUrl}
          autoPlay
          playsInline
          onClick={togglePlay}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            cursor: showControls ? 'default' : 'none',
            position: 'relative',
            zIndex: 2,
          }}
        />

        {/* Big Center Play / Pause Pop Animation on click */}
        <AnimatePresence>
          {centerPlayFeedback && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 20,
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                backgroundColor: 'rgba(225, 29, 72, 0.65)',
                backdropFilter: 'blur(16px)',
                border: '2px solid rgba(255, 255, 255, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 50px rgba(225, 29, 72, 0.8)',
                pointerEvents: 'none',
              }}
            >
              {centerPlayFeedback === 'play' ? (
                <Play size={40} color="#ffffff" fill="#ffffff" style={{ marginLeft: '4px' }} />
              ) : (
                <Pause size={40} color="#ffffff" fill="#ffffff" />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Header Bar Overlay */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : -20 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 30,
            padding: '24px 32px',
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.4) 65%, transparent 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: showControls ? 'auto' : 'none',
          }}
        >
          {/* Movie Title & Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(225, 29, 72, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              title="Close Player (ESC)"
            >
              <X size={20} />
            </button>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                  {item.title}
                </h2>
                <span
                  style={{
                    background: 'rgba(225, 29, 72, 0.3)',
                    color: '#fda4af',
                    border: '1px solid rgba(225, 29, 72, 0.5)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 800,
                  }}
                >
                  {item.quality || '4K HDR'}
                </span>
                <span
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    color: '#f8fafc',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  {item.duration || '2h 28m'}
                </span>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>
                {item.genres?.join(' • ') || 'Sci-Fi • Thriller'} • Director: {item.director || 'NEXORA Studios'}
              </p>
            </div>
          </div>

          {/* Quick Header Actions: Watchlist & Stream Health */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {onToggleWatchlist && (
              <button
                type="button"
                onClick={() => onToggleWatchlist(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  backgroundColor: isInWatchlist ? 'rgba(225, 29, 72, 0.35)' : 'rgba(255, 255, 255, 0.1)',
                  border: isInWatchlist ? '1.5px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {isInWatchlist ? <Check size={16} color="#fda4af" /> : <Bookmark size={16} />}
                <span>{isInWatchlist ? 'In Watchlist' : '+ Add to Watchlist'}</span>
              </button>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRadius: '10px',
                fontSize: '12px',
                color: '#34d399',
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 10px #10b981',
                }}
              />
              <span>18.5 Mbps • 60 FPS</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Controls Bar Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 30,
            padding: '28px 36px 24px',
            background:
              'linear-gradient(0deg, rgba(0, 0, 0, 0.98) 0%, rgba(0, 0, 0, 0.75) 50%, transparent 100%)',
            pointerEvents: showControls ? 'auto' : 'none',
          }}
        >
          {/* Interactive Scrubbing Timeline */}
          <div
            onClick={handleSeek}
            onMouseMove={handleTimelineHover}
            onMouseLeave={(e) => {
              setHoverTime(null);
              e.currentTarget.style.height = '8px';
            }}
            style={{
              position: 'relative',
              height: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.18)',
              borderRadius: '999px',
              cursor: 'pointer',
              marginBottom: '18px',
              transition: 'height 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.height = '12px';
            }}
          >
            {/* Buffered Bar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: `${bufferedPercent}%`,
                backgroundColor: 'rgba(255, 255, 255, 0.35)',
                borderRadius: '999px',
              }}
            />

            {/* Played Progress Bar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: `${progressPercent}%`,
                background: 'linear-gradient(90deg, #be123c 0%, #e11d48 100%)',
                borderRadius: '999px',
                boxShadow: '0 0 16px rgba(225, 29, 72, 0.8)',
              }}
            />

            {/* Scrubber Thumb */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: `${progressPercent}%`,
                transform: 'translate(-50%, -50%)',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: '3px solid #e11d48',
                boxShadow: '0 0 12px #e11d48',
              }}
            />

            {/* Hover Timestamp Preview Tooltip */}
            {hoverTime !== null && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: `${hoverPositionPercent}%`,
                  transform: 'translateX(-50%)',
                  backgroundColor: '#0a0710',
                  border: '1px solid rgba(225, 29, 72, 0.5)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 800,
                  pointerEvents: 'none',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.8)',
                }}
              >
                {formatTime(hoverTime)}
              </div>
            )}
          </div>

          {/* Controls Lower Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Left Controls: Play/Pause, Rewind, Forward, Volume, Time */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Play / Pause Button */}
              <button
                type="button"
                onClick={togglePlay}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1.0)';
                }}
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              >
                {isPlaying ? (
                  <Pause size={26} color="#ffffff" fill="#ffffff" />
                ) : (
                  <Play size={26} color="#ffffff" fill="#ffffff" />
                )}
              </button>

              {/* Rewind 10s */}
              <button
                type="button"
                onClick={() => handleSkip(-10)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#cbd5e1',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
                title="Rewind 10 seconds (Left Arrow)"
              >
                <RotateCcw size={20} />
                <span style={{ fontSize: '11px' }}>10s</span>
              </button>

              {/* Forward 10s */}
              <button
                type="button"
                onClick={() => handleSkip(10)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#cbd5e1',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
                title="Forward 10 seconds (Right Arrow)"
              >
                <RotateCw size={20} />
                <span style={{ fontSize: '11px' }}>10s</span>
              </button>

              {/* Volume & Slider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '6px' }}>
                <button
                  type="button"
                  onClick={toggleMute}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#cbd5e1',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                >
                  {isMuted || volume === 0 ? <VolumeX size={22} /> : <Volume2 size={22} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  style={{
                    width: '76px',
                    accentColor: '#e11d48',
                    cursor: 'pointer',
                  }}
                />
              </div>

              {/* Timestamp Display */}
              <div style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 700, marginLeft: '8px' }}>
                <span>{formatTime(currentTime)}</span>
                <span style={{ color: '#64748b', margin: '0 6px' }}>/</span>
                <span style={{ color: '#94a3b8' }}>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right Controls: Audio/Subtitles, 4K Quality, Fullscreen */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' }}>
              {/* Audio & Subtitles Selector */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowAudioMenu(!showAudioMenu);
                    setShowQualityMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: showAudioMenu ? 'rgba(225, 29, 72, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                    border: showAudioMenu ? '1px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                  title="Audio & Subtitles"
                >
                  <Subtitles size={16} color="#fda4af" />
                  <span>Audio & CC</span>
                </button>

                {/* Audio & Subtitles Dropdown */}
                {showAudioMenu && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '44px',
                      right: 0,
                      width: '260px',
                      backgroundColor: '#0a0710',
                      border: '1.5px solid rgba(225, 29, 72, 0.5)',
                      borderRadius: '16px',
                      padding: '14px',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.95)',
                      zIndex: 50,
                    }}
                  >
                    <div style={{ marginBottom: '12px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 900,
                          color: '#fda4af',
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                        }}
                      >
                        Audio Tracks
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
                        {audioOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setSelectedAudio(opt)}
                            style={{
                              background: selectedAudio === opt ? 'rgba(225, 29, 72, 0.25)' : 'transparent',
                              border: 'none',
                              color: selectedAudio === opt ? '#ffffff' : '#94a3b8',
                              padding: '6px 10px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: 700,
                              textAlign: 'left',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span>{opt}</span>
                            {selectedAudio === opt && <Check size={14} color="#fda4af" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '10px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 900,
                          color: '#fda4af',
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                        }}
                      >
                        Subtitles
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
                        {subtitleOptions.map((sub) => (
                          <button
                            key={sub}
                            type="button"
                            onClick={() => setSelectedSubtitles(sub)}
                            style={{
                              background: selectedSubtitles === sub ? 'rgba(225, 29, 72, 0.25)' : 'transparent',
                              border: 'none',
                              color: selectedSubtitles === sub ? '#ffffff' : '#94a3b8',
                              padding: '6px 10px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: 700,
                              textAlign: 'left',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span>{sub}</span>
                            {selectedSubtitles === sub && <Check size={14} color="#fda4af" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 4K Quality Selector */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowQualityMenu(!showQualityMenu);
                    setShowAudioMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: showQualityMenu ? 'rgba(225, 29, 72, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                    border: showQualityMenu ? '1px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                  title="Streaming Quality"
                >
                  <Sparkles size={15} color="#fda4af" />
                  <span>{selectedQuality.split(' ')[0]}</span>
                </button>

                {/* Quality Menu Dropdown */}
                {showQualityMenu && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '44px',
                      right: 0,
                      width: '240px',
                      backgroundColor: '#0a0710',
                      border: '1.5px solid rgba(225, 29, 72, 0.5)',
                      borderRadius: '16px',
                      padding: '12px',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.95)',
                      zIndex: 50,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 900,
                        color: '#fda4af',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '8px',
                      }}
                    >
                      Resolution & Bitrate
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {qualityOptions.map((q) => (
                        <button
                          key={q.label}
                          type="button"
                          onClick={() => {
                            setSelectedQuality(q.label);
                            setShowQualityMenu(false);
                          }}
                          style={{
                            background: selectedQuality === q.label ? 'rgba(225, 29, 72, 0.25)' : 'transparent',
                            border: 'none',
                            color: '#ffffff',
                            padding: '8px 10px',
                            borderRadius: '8px',
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 800 }}>{q.label}</div>
                            <div style={{ fontSize: '11px', color: '#71717a' }}>{q.desc}</div>
                          </div>
                          {selectedQuality === q.label && <Check size={16} color="#fda4af" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Fullscreen Button */}
              <button
                type="button"
                onClick={toggleFullscreen}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1.0)';
                }}
                title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
              >
                {isFullscreen ? <Minimize2 size={22} /> : <Maximize2 size={22} />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OttVideoPlayerModal;
