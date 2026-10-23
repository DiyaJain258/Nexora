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
      backgroundColor: 'rgba(7, 9, 18, 0.96)',
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
          background: 'linear-gradient(180deg, rgba(7, 9, 18, 0.2) 0%, rgba(7, 9, 18, 0.8) 60%, #070912 100%)',
        }} />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
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
            background: 'linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)',
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
            color: '#22D3EE',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: '4px',
          }}>
            {item.matchScore}% MATCH
          </span>
          <span style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#F8FAFC',
            fontSize: '11px',
            padding: '3px 8px',
            borderRadius: '4px',
          }}>
            {item.ageRating}
          </span>
          <span style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#94A3B8',
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
          <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 6px 0', color: '#F8FAFC' }}>
            {item.title}
          </h2>
          <div style={{ fontSize: '13px', color: '#94A3B8' }}>
            {item.duration || `${item.seasonsCount || 1} Seasons`} • {item.genres.join(' • ')}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => onPlay(item)}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)',
              border: 'none',
              borderRadius: '10px',
              padding: '12px',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
            }}
          >
            <Play size={18} fill="#FFFFFF" />
            <span>Play Now</span>
          </button>

          <button
            onClick={() => onToggleFavorite(item)}
            style={{
              padding: '12px 18px',
              backgroundColor: isFavorite ? 'rgba(34, 211, 238, 0.2)' : 'rgba(255, 255, 255, 0.08)',
              border: isFavorite ? '1px solid #22D3EE' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              color: isFavorite ? '#22D3EE' : '#F8FAFC',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              fontSize: '13px',
            }}
          >
            {isFavorite ? <Check size={16} /> : <Plus size={16} />}
            <span>{isFavorite ? 'In My List' : 'My List'}</span>
          </button>
        </div>

        {/* Synopsis */}
        <p style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: '1.6', margin: 0 }}>
          {item.synopsis}
        </p>

        {/* Audio & Cast Specs */}
        <div style={{
          backgroundColor: '#0B1020',
          border: '1px solid #1E293B',
          borderRadius: '12px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontSize: '12px',
        }}>
          {item.cast && (
            <div>
              <span style={{ color: '#64748B' }}>Starring: </span>
              <span style={{ color: '#F8FAFC' }}>{item.cast.join(', ')}</span>
            </div>
          )}
          {item.director && (
            <div>
              <span style={{ color: '#64748B' }}>Director: </span>
              <span style={{ color: '#F8FAFC' }}>{item.director}</span>
            </div>
          )}
          <div>
            <span style={{ color: '#64748B' }}>Audio Streams: </span>
            <span style={{ color: '#22D3EE' }}>Dolby Atmos 7.1, 5.1 Surround, Stereo Master</span>
          </div>
        </div>

        {/* Series Episodes Browser */}
        {item.type === 'series' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#F8FAFC' }}>
                Episodes
              </h3>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(Number(e.target.value))}
                style={{
                  backgroundColor: '#0B1020',
                  border: '1px solid #1E293B',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  color: '#22D3EE',
                  fontSize: '12px',
                  fontWeight: 600,
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
                    backgroundColor: '#111827',
                    border: '1px solid #1E293B',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#F8FAFC' }}>
                      E{ep.ep}. {ep.title}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>{ep.desc}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>{ep.dur}</span>
                    <Play size={14} color="#8B5CF6" />
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
