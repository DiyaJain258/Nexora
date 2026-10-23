import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Maximize2,
  Volume2,
  VolumeX,
  Settings,
  Subtitles,
  Radio,
  Sliders,
} from 'lucide-react';
import { ContentItem, Channel } from '@nexora/shared';

interface VideoPlayerModalProps {
  item: ContentItem | Channel | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ item, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(35);
  const [selectedQuality, setSelectedQuality] = useState('4K HDR');
  const [showSettings, setShowSettings] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState('English [CC]');

  if (!item) return null;

  const isLive = 'channelNumber' in item || ('isLive' in item && item.isLive);
  const title = item.name || (item as ContentItem).title;
  const poster = (item as any).backdropUrl || (item as any).logo;

  // Simulate video playback progress
  useEffect(() => {
    if (!isPlaying || isLive) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 99 ? 0 : prev + 0.2));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, isLive]);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#000000',
      zIndex: 60,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden',
    }}>
      {/* Video Background Simulation */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
        <img
          src={poster}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.6,
            filter: 'brightness(0.7) contrast(1.1)',
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)',
        }} />
      </div>

      {/* Top HUD */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
      }}>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', flex: 1, padding: '0 12px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {title}
          </div>
          {isLive ? (
            <div style={{ fontSize: '11px', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <span className="live-dot" /> LIVE STREAM • 60 FPS
            </div>
          ) : (
            <div style={{ fontSize: '11px', color: '#22D3EE' }}>
              Dolby Vision • Dolby Atmos
            </div>
          )}
        </div>

        <button
          onClick={() => setShowSettings(!showSettings)}
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Settings size={18} />
        </button>
      </div>

      {/* Settings Flyout */}
      {showSettings && (
        <div style={{
          position: 'absolute',
          top: '64px',
          right: '16px',
          zIndex: 20,
          backgroundColor: '#111827',
          border: '1px solid #1E293B',
          borderRadius: '12px',
          padding: '14px',
          width: '200px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.8)',
        }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8', marginBottom: '8px' }}>
            STREAM QUALITY
          </div>
          {['4K HDR', '1080p FHD', '720p HD', 'Auto Adaptive'].map((q) => (
            <button
              key={q}
              onClick={() => { setSelectedQuality(q); setShowSettings(false); }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '6px 8px',
                border: 'none',
                background: selectedQuality === q ? 'rgba(34, 211, 238, 0.15)' : 'transparent',
                color: selectedQuality === q ? '#22D3EE' : '#F8FAFC',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer',
                fontWeight: selectedQuality === q ? 700 : 400,
              }}
            >
              {q}
            </button>
          ))}

          <div style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8', margin: '12px 0 8px 0' }}>
            SUBTITLES
          </div>
          {['English [CC]', 'Spanish', 'Off'].map((s) => (
            <button
              key={s}
              onClick={() => { setSelectedSubtitle(s); setShowSettings(false); }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '6px 8px',
                border: 'none',
                background: selectedSubtitle === s ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                color: selectedSubtitle === s ? '#8B5CF6' : '#F8FAFC',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Center Controls */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
      }}>
        {!isLive && (
          <button
            onClick={() => setProgress(Math.max(0, progress - 5))}
            style={{
              background: 'none',
              border: 'none',
              color: '#F8FAFC',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            <RotateCcw size={28} />
            <span style={{ fontSize: '10px' }}>10s</span>
          </button>
        )}

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)',
            border: 'none',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)',
          }}
        >
          {isPlaying ? <Pause size={30} fill="#FFFFFF" /> : <Play size={30} fill="#FFFFFF" style={{ marginLeft: '4px' }} />}
        </button>

        {!isLive && (
          <button
            onClick={() => setProgress(Math.min(99, progress + 5))}
            style={{
              background: 'none',
              border: 'none',
              color: '#F8FAFC',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            <RotateCw size={28} />
            <span style={{ fontSize: '10px' }}>10s</span>
          </button>
        )}
      </div>

      {/* Bottom HUD / Timeline Scrub Bar */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '20px 16px',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 100%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        {!isLive ? (
          <>
            {/* Scrubber track */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                setProgress(pos * 100);
              }}
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
                position: 'relative',
                cursor: 'pointer',
              }}
            >
              {/* Buffer Bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${Math.min(100, progress + 25)}%`,
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.35)',
                borderRadius: '4px',
              }} />
              {/* Progress Bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #8B5CF6, #22D3EE)',
                borderRadius: '4px',
              }} />
              {/* Thumb */}
              <div style={{
                position: 'absolute',
                top: '-4px',
                left: `calc(${progress}% - 7px)`,
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 0 10px #22D3EE',
              }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8' }}>
              <span>42:15</span>
              <span>Remaining 1:15:45</span>
            </div>
          </>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            padding: '8px 12px',
            borderRadius: '8px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="live-dot" />
              <span style={{ fontSize: '12px', color: '#F8FAFC', fontWeight: 600 }}>Real-Time Direct HLS Feed</span>
            </div>
            <span style={{ fontSize: '11px', color: '#22D3EE' }}>Latency: 1.2s</span>
          </div>
        )}

        {/* Bottom bar quick icons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setIsMuted(!isMuted)}
              style={{ background: 'none', border: 'none', color: '#F8FAFC', cursor: 'pointer', padding: 0 }}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <span style={{
              fontSize: '11px',
              padding: '2px 6px',
              borderRadius: '4px',
              backgroundColor: 'rgba(34, 211, 238, 0.2)',
              color: '#22D3EE',
              fontWeight: 700,
            }}>
              {selectedQuality}
            </span>
          </div>

          <button
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen?.();
              } else {
                document.documentElement.requestFullscreen?.();
              }
            }}
            style={{ background: 'none', border: 'none', color: '#F8FAFC', cursor: 'pointer', padding: 0 }}
          >
            <Maximize2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
