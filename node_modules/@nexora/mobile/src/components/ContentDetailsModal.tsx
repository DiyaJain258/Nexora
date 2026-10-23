import React, { useState } from 'react';
import {
  X,
  Play,
  Plus,
  Check,
  Star,
  Film,
  Layers,
  Volume2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ContentItem } from '@nexora/shared';

interface ContentDetailsModalProps {
  item: ContentItem | null;
  onClose: () => void;
  onPlay: (item: ContentItem) => void;
  isFavorite: boolean;
  onToggleFavorite: (item: ContentItem) => void;
}

export const ContentDetailsModal: React.FC<ContentDetailsModalProps> = ({
  item,
  onClose,
  onPlay,
  isFavorite,
  onToggleFavorite,
}) => {
  const [selectedSeason, setSelectedSeason] = useState(1);

  if (!item) return null;

  const mockEpisodes = [
    { ep: 1, title: 'The Genesis Rift', dur: '54m', desc: 'A catastrophic anomaly breaches orbital quarantine.' },
    { ep: 2, title: 'Echoes of the Syndicate', dur: '48m', desc: 'Rogue teams descend into the sub-levels to intercept the uplink.' },
    { ep: 3, title: 'Quantum Horizon', dur: '51m', desc: 'An unexpected transmission reveals a secret lunar base.' },
  ];

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(5, 5, 5, 0.98)',
      backdropFilter: 'blur(16px)',
      zIndex: 50,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Hero Backdrop */}
      <div style={{ position: 'relative', width: '100%', height: '240px', flexShrink: 0 }}>
        <img
          src={item.backdropUrl}
          alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(5, 5, 5, 0.2) 0%, rgba(5, 5, 5, 0.8) 60%, #050505 100%)',
        }} />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            border: '1px solid #303030',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>

        {/* Floating Quick Badges */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '16px',
          right: '16px',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}>
          <span style={{
            backgroundColor: '#E50914',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 800,
            padding: '3px 8px',
            borderRadius: '4px',
          }}>
            {item.quality}
          </span>
          <span style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#E50914',
            fontSize: '11px',
            fontWeight: 800,
            padding: '3px 8px',
            borderRadius: '4px',
          }}>
            {item.matchScore}% MATCH
          </span>
          <span style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#FFFFFF',
            fontSize: '11px',
            padding: '3px 8px',
            borderRadius: '4px',
          }}>
            {item.ageRating}
          </span>
          <span style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#B3B3B3',
            fontSize: '11px',
            padding: '3px 8px',
            borderRadius: '4px',
          }}>
            {item.releaseYear}
          </span>
        </div>
      </div>

      {/* Details Content */}
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 6px 0', color: '#FFFFFF' }}>
            {item.title}
          </h2>
          <div style={{ fontSize: '13px', color: '#B3B3B3' }}>
            {item.duration || `${item.seasonsCount || 1} Seasons`} • {item.genres.join(' • ')}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => onPlay(item)}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #E50914 0%, #7F0000 100%)',
              border: '1px solid #E50914',
              borderRadius: '10px',
              padding: '12px',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(229, 9, 20, 0.4)',
            }}
          >
            <Play size={18} fill="#FFFFFF" />
            <span>Play Now</span>
          </button>

          <button
            onClick={() => onToggleFavorite(item)}
            style={{
              padding: '12px 18px',
              backgroundColor: isFavorite ? 'rgba(229, 9, 20, 0.25)' : '#1C1C1C',
              border: isFavorite ? '1px solid #E50914' : '1px solid #303030',
              borderRadius: '10px',
              color: isFavorite ? '#FF2B36' : '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 700,
              fontSize: '13px',
            }}
          >
            {isFavorite ? <Check size={16} /> : <Plus size={16} />}
            <span>{isFavorite ? 'In My List' : 'My List'}</span>
          </button>
        </div>

        {/* Synopsis */}
        <p style={{ fontSize: '13px', color: '#B3B3B3', lineHeight: '1.6', margin: 0 }}>
          {item.synopsis}
        </p>

        {/* Audio & Cast Specs */}
        <div style={{
          backgroundColor: '#151515',
          border: '1px solid #303030',
          borderRadius: '12px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontSize: '12px',
        }}>
          {item.cast && (
            <div>
              <span style={{ color: '#737373' }}>Starring: </span>
              <span style={{ color: '#FFFFFF' }}>{item.cast.join(', ')}</span>
            </div>
          )}
          {item.director && (
            <div>
              <span style={{ color: '#737373' }}>Director: </span>
              <span style={{ color: '#FFFFFF' }}>{item.director}</span>
            </div>
          )}
          <div>
            <span style={{ color: '#737373' }}>Audio Streams: </span>
            <span style={{ color: '#E50914', fontWeight: 600 }}>Dolby Atmos 7.1, 5.1 Surround, Stereo Master</span>
          </div>
        </div>

        {/* Series Episodes Browser */}
        {item.type === 'series' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                Episodes
              </h3>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(Number(e.target.value))}
                style={{
                  backgroundColor: '#0D0D0D',
                  border: '1px solid #303030',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  color: '#FF2B36',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                {[1, 2, 3].map((s) => (
                  <option key={s} value={s}>Season {s}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {mockEpisodes.map((ep) => (
                <div
                  key={ep.ep}
                  onClick={() => onPlay(item)}
                  style={{
                    backgroundColor: '#151515',
                    border: '1px solid #303030',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>
                      E{ep.ep}. {ep.title}
                    </div>
                    <div style={{ fontSize: '11px', color: '#B3B3B3' }}>{ep.desc}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', color: '#737373' }}>{ep.dur}</span>
                    <Play size={14} color="#E50914" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
