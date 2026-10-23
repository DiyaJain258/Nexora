import React, { useState } from 'react';
import { Layers, Plus, Play, Trash2, Clock, Calendar } from 'lucide-react';
import { Episode, MOCK_CONTENT } from '@nexora/shared';

export const SeasonsEpisodesView: React.FC = () => {
  const seriesList = MOCK_CONTENT.filter((c) => c.type === 'series');
  const [selectedSeriesId, setSelectedSeriesId] = useState(seriesList[0]?.id || 'vod-02');
  const [selectedSeason, setSelectedSeason] = useState(1);

  const initialEpisodes: Episode[] = [
    {
      id: 'ep-01',
      seriesId: 'vod-02',
      seasonNumber: 1,
      episodeNumber: 1,
      title: 'Neon Awakening',
      synopsis: 'A clandestine cyber-hacker encounters a rogue AI fragment embedded in an underground neural port.',
      duration: '54m',
      thumbnailUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
      streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      airDate: '2025-10-12',
    },
    {
      id: 'ep-02',
      seriesId: 'vod-02',
      seasonNumber: 1,
      episodeNumber: 2,
      title: 'The Glitch Protocol',
      synopsis: 'Corporation hit squads sweep the lower district as the syndicate tries to decrypt the biometric key.',
      duration: '48m',
      thumbnailUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
      streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      airDate: '2025-10-19',
    },
    {
      id: 'ep-03',
      seriesId: 'vod-02',
      seasonNumber: 1,
      episodeNumber: 3,
      title: 'Zero Latency',
      synopsis: 'A high-speed maglev pursuit tests the boundaries of synthetic pilot neural implants.',
      duration: '51m',
      thumbnailUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80',
      streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      airDate: '2025-10-26',
    },
  ];

  const [episodes, setEpisodes] = useState<Episode[]>(initialEpisodes);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newEpTitle, setNewEpTitle] = useState('');
  const [newEpDuration, setNewEpDuration] = useState('45m');

  const handleAddEpisode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEpTitle) return;

    const ep: Episode = {
      id: `ep-${Date.now()}`,
      seriesId: selectedSeriesId,
      seasonNumber: selectedSeason,
      episodeNumber: episodes.length + 1,
      title: newEpTitle,
      synopsis: 'Freshly uploaded high-bitrate master episode asset.',
      duration: newEpDuration,
      thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      airDate: new Date().toISOString().split('T')[0],
    };

    setEpisodes([...episodes, ep]);
    setNewEpTitle('');
    setIsAddOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Series & Season Selection */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#111827',
        border: '1px solid #1E293B',
        borderRadius: '14px',
        padding: '16px 20px',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>SELECT SERIES</label>
            <select
              value={selectedSeriesId}
              onChange={(e) => setSelectedSeriesId(e.target.value)}
              style={{
                display: 'block',
                marginTop: '4px',
                backgroundColor: '#070912',
                border: '1px solid #1E293B',
                borderRadius: '8px',
                padding: '8px 14px',
                color: '#F8FAFC',
                fontWeight: 600,
              }}
            >
              {seriesList.map((s) => (
                <option key={s.id} value={s.id}>{s.title} ({s.seasonsCount || 1} Seasons)</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>SEASON</label>
            <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
              {[1, 2, 3].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSeason(s)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    border: selectedSeason === s ? '1px solid #8B5CF6' : '1px solid #1E293B',
                    backgroundColor: selectedSeason === s ? 'rgba(139, 92, 246, 0.2)' : '#070912',
                    color: selectedSeason === s ? '#22D3EE' : '#94A3B8',
                    cursor: 'pointer',
                  }}
                >
                  Season {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button className="btn-primary" onClick={() => setIsAddOpen(true)}>
          <Plus size={16} />
          <span>Upload Episode</span>
        </button>
      </div>

      {/* Episodes List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {episodes.map((ep) => (
          <div
            key={ep.id}
            style={{
              backgroundColor: '#111827',
              border: '1px solid #1E293B',
              borderRadius: '14px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                position: 'relative',
                width: '120px',
                height: '68px',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#0B1020',
              }}>
                <img
                  src={ep.thumbnailUrl}
                  alt={ep.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: '4px',
                  right: '4px',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  fontSize: '10px',
                  color: '#FFFFFF',
                  padding: '2px 5px',
                  borderRadius: '4px',
                  fontWeight: 600,
                }}>
                  {ep.duration}
                </span>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#8B5CF6', fontWeight: 700 }}>
                    E{ep.episodeNumber}
                  </span>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#F8FAFC' }}>
                    {ep.title}
                  </h4>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94A3B8', maxWidth: '600px' }}>
                  {ep.synopsis}
                </p>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '6px' }}>
                  Air Date: {ep.airDate} • HLS Master Ready
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setEpisodes(episodes.filter((e) => e.id !== ep.id))}
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#EF4444',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isAddOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(7, 9, 18, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px',
        }}>
          <form
            onSubmit={handleAddEpisode}
            style={{
              backgroundColor: '#111827',
              border: '1px solid #1E293B',
              borderRadius: '16px',
              padding: '24px',
              width: '100%',
              maxWidth: '460px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <h3 style={{ margin: 0, color: '#F8FAFC' }}>Add Episode to Season {selectedSeason}</h3>
            <div>
              <label style={{ fontSize: '12px', color: '#94A3B8' }}>Episode Title</label>
              <input
                type="text"
                required
                value={newEpTitle}
                onChange={(e) => setNewEpTitle(e.target.value)}
                placeholder="e.g. Sub-orbital Infiltration"
                style={{
                  width: '100%',
                  marginTop: '6px',
                  backgroundColor: '#070912',
                  border: '1px solid #1E293B',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#F8FAFC',
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#94A3B8' }}>Runtime Duration</label>
              <input
                type="text"
                value={newEpDuration}
                onChange={(e) => setNewEpDuration(e.target.value)}
                placeholder="e.g. 52m"
                style={{
                  width: '100%',
                  marginTop: '6px',
                  backgroundColor: '#070912',
                  border: '1px solid #1E293B',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#F8FAFC',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="button" className="btn-secondary" onClick={() => setIsAddOpen(false)}>Cancel</button>
              <button type="submit" className="btn-primary">Add Episode</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
