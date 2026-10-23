import React, { useState } from 'react';
import {
  Tv,
  Plus,
  Search,
  Filter,
  Play,
  Edit2,
  Trash2,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ExternalLink,
  X,
  Radio,
} from 'lucide-react';
import { Channel, MOCK_CHANNELS } from '@nexora/shared';

export const LiveChannelsView: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>(MOCK_CHANNELS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [previewChannel, setPreviewChannel] = useState<Channel | null>(null);

  // New channel form state
  const [newChannel, setNewChannel] = useState({
    name: '',
    channelNumber: 109,
    category: 'Sports',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    logo: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=160&auto=format&fit=crop&q=80',
    resolution: '4K' as '4K' | '1080p' | '720p',
    fps: 60,
    bitrateKbps: 18000,
    epgId: 'epg-custom-01',
  });

  const categories = ['All', 'Movies', 'Sports', 'News', 'Documentary', 'Kids', 'Music'];

  const filteredChannels = channels.filter((ch) => {
    const matchesCategory = selectedCategory === 'All' || ch.category === selectedCategory;
    const matchesSearch =
      ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.channelNumber.toString().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleAddChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChannel.name) return;

    const created: Channel = {
      id: `ch-${Date.now()}`,
      channelNumber: Number(newChannel.channelNumber),
      name: newChannel.name,
      logo: newChannel.logo,
      category: newChannel.category as any,
      streamUrl: newChannel.streamUrl,
      resolution: newChannel.resolution,
      fps: Number(newChannel.fps),
      bitrateKbps: Number(newChannel.bitrateKbps),
      isFavorite: false,
      epgId: newChannel.epgId,
      status: 'active',
      currentProgram: {
        id: `prog-${Date.now()}`,
        channelId: `ch-${Date.now()}`,
        title: 'Live Transmission Broadcast',
        description: 'Direct HLS feed from satellite master origin.',
        category: newChannel.category,
        startTime: '12:00',
        endTime: '14:00',
        progressPercent: 15,
        isLiveNow: true,
      },
    };

    setChannels([created, ...channels]);
    setIsAddModalOpen(false);
  };

  const handleDeleteChannel = (id: string) => {
    if (confirm('Are you sure you want to remove this channel from the broadcast roster?')) {
      setChannels(channels.filter((c) => c.id !== id));
    }
  };

  const toggleChannelStatus = (id: string) => {
    setChannels(
      channels.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'active' ? 'degraded' : c.status === 'degraded' ? 'offline' : 'active';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Action Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        backgroundColor: '#151515',
        border: '1px solid #303030',
        borderRadius: '14px',
        padding: '16px 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Search bar */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={16} color="#737373" style={{ position: 'absolute', left: '12px' }} />
            <input
              type="text"
              placeholder="Search by name or number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                backgroundColor: '#050505',
                border: '1px solid #303030',
                borderRadius: '8px',
                padding: '8px 14px 8px 36px',
                color: '#FFFFFF',
                fontSize: '13px',
                width: '240px',
                outline: 'none',
              }}
            />
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    border: active ? '1px solid #E50914' : '1px solid #303030',
                    backgroundColor: active ? 'rgba(229, 9, 20, 0.2)' : '#0D0D0D',
                    color: active ? '#FF2B36' : '#B3B3B3',
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Add Channel Button */}
        <button
          className="btn-primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={16} />
          <span>Add Channel</span>
        </button>
      </div>

      {/* Channels Table */}
      <div style={{
        backgroundColor: '#151515',
        border: '1px solid #303030',
        borderRadius: '14px',
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#0D0D0D', borderBottom: '1px solid #303030', color: '#B3B3B3' }}>
              <th style={{ padding: '14px 18px', fontWeight: 700 }}>CH #</th>
              <th style={{ padding: '14px 18px', fontWeight: 700 }}>Channel Info</th>
              <th style={{ padding: '14px 18px', fontWeight: 700 }}>Current EPG Airing</th>
              <th style={{ padding: '14px 18px', fontWeight: 700 }}>Quality</th>
              <th style={{ padding: '14px 18px', fontWeight: 700 }}>Status</th>
              <th style={{ padding: '14px 18px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredChannels.map((ch) => (
              <tr
                key={ch.id}
                style={{
                  borderBottom: '1px solid #303030',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <td style={{ padding: '14px 18px', fontWeight: 800, color: '#E50914' }}>
                  {ch.channelNumber}
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={ch.logo}
                      alt={ch.name}
                      style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{ch.name}</div>
                      <div style={{ fontSize: '11px', color: '#B3B3B3' }}>{ch.category} • EPG: {ch.epgId}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ color: '#FFFFFF', fontWeight: 600 }}>
                    {ch.currentProgram?.title || 'Continuous broadcast'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#737373' }}>
                    {ch.currentProgram ? `${ch.currentProgram.startTime} - ${ch.currentProgram.endTime} (${ch.currentProgram.progressPercent}%)` : '24/7 stream'}
                  </div>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span className="badge badge-red">
                    {ch.resolution} • {ch.fps} FPS
                  </span>
                  <div style={{ fontSize: '11px', color: '#B3B3B3', marginTop: '3px' }}>
                    {Math.round((ch.bitrateKbps || 0) / 1000)} Mbps
                  </div>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <button
                    onClick={() => toggleChannelStatus(ch.id)}
                    title="Click to toggle status"
                    style={{
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    {ch.status === 'active' && (
                      <span className="badge badge-success">
                        <CheckCircle size={12} /> Active
                      </span>
                    )}
                    {ch.status === 'degraded' && (
                      <span className="badge badge-warning">
                        <AlertTriangle size={12} /> Degraded
                      </span>
                    )}
                    {ch.status === 'offline' && (
                      <span className="badge badge-danger">
                        <XCircle size={12} /> Offline
                      </span>
                    )}
                  </button>
                </td>
                <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <button
                      onClick={() => setPreviewChannel(ch)}
                      title="Preview HLS stream"
                      style={{
                        backgroundColor: 'rgba(229, 9, 20, 0.15)',
                        border: '1px solid rgba(229, 9, 20, 0.4)',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        color: '#FF2B36',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontWeight: 600,
                      }}
                    >
                      <Play size={13} />
                      <span style={{ fontSize: '11px' }}>Preview</span>
                    </button>
                    <button
                      onClick={() => handleDeleteChannel(ch.id)}
                      title="Delete channel"
                      style={{
                        backgroundColor: 'rgba(229, 9, 20, 0.1)',
                        border: '1px solid rgba(229, 9, 20, 0.3)',
                        borderRadius: '6px',
                        padding: '6px 8px',
                        color: '#E50914',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Channel Modal */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(5, 5, 5, 0.88)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px',
        }}>
          <div style={{
            backgroundColor: '#151515',
            border: '1px solid #303030',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '560px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.95)',
          }}>
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid #303030',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#0D0D0D',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Tv size={20} color="#E50914" />
                <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#FFFFFF' }}>
                  Register New Live TV Channel
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#B3B3B3', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddChannel} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#B3B3B3', fontWeight: 700 }}>Channel #</label>
                  <input
                    type="number"
                    required
                    value={newChannel.channelNumber}
                    onChange={(e) => setNewChannel({ ...newChannel, channelNumber: Number(e.target.value) })}
                    style={{
                      width: '100%',
                      backgroundColor: '#050505',
                      border: '1px solid #303030',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      marginTop: '6px',
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#B3B3B3', fontWeight: 700 }}>Channel Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ultra Cinema 4K"
                    value={newChannel.name}
                    onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#050505',
                      border: '1px solid #303030',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      marginTop: '6px',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#B3B3B3', fontWeight: 700 }}>Category</label>
                  <select
                    value={newChannel.category}
                    onChange={(e) => setNewChannel({ ...newChannel, category: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#050505',
                      border: '1px solid #303030',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      marginTop: '6px',
                    }}
                  >
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#B3B3B3', fontWeight: 700 }}>Resolution</label>
                  <select
                    value={newChannel.resolution}
                    onChange={(e) => setNewChannel({ ...newChannel, resolution: e.target.value as any })}
                    style={{
                      width: '100%',
                      backgroundColor: '#050505',
                      border: '1px solid #303030',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      marginTop: '6px',
                    }}
                  >
                    <option value="4K">4K UHD (3840x2160)</option>
                    <option value="1080p">1080p FHD (1920x1080)</option>
                    <option value="720p">720p HD (1280x720)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#B3B3B3', fontWeight: 700 }}>Origin Stream URL (HLS / m3u8)</label>
                <input
                  type="url"
                  required
                  value={newChannel.streamUrl}
                  onChange={(e) => setNewChannel({ ...newChannel, streamUrl: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: '#050505',
                    border: '1px solid #303030',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#FFFFFF',
                    marginTop: '6px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '12px',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Deploy Channel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stream Preview Modal */}
      {previewChannel && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(5, 5, 5, 0.92)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px',
        }}>
          <div style={{
            backgroundColor: '#151515',
            border: '1px solid #303030',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '680px',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #303030',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#0D0D0D',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Radio size={18} color="#E50914" />
                <span style={{ fontWeight: 800, color: '#FFFFFF' }}>
                  Live Monitor: {previewChannel.name} ({previewChannel.resolution})
                </span>
              </div>
              <button
                onClick={() => setPreviewChannel(null)}
                style={{ background: 'none', border: 'none', color: '#B3B3B3', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{
              position: 'relative',
              height: '340px',
              backgroundColor: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img
                src={previewChannel.logo}
                alt={previewChannel.name}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.35,
                }}
              />
              <div style={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                padding: '20px',
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#E50914',
                  color: '#FFFFFF',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 800,
                  marginBottom: '12px',
                }}>
                  <span className="live-dot" style={{ backgroundColor: '#FFFFFF' }} /> LIVE TRANSMISSION
                </div>
                <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#FFFFFF', margin: '0 0 8px 0' }}>
                  {previewChannel.currentProgram?.title || previewChannel.name}
                </h2>
                <div style={{ fontSize: '13px', color: '#FF2B36', fontWeight: 600 }}>
                  HLS Ingestion Endpoint Active • Bitrate: {(previewChannel.bitrateKbps || 0) / 1000} Mbps
                </div>
              </div>
            </div>

            <div style={{
              padding: '14px 20px',
              backgroundColor: '#0D0D0D',
              borderTop: '1px solid #303030',
              fontSize: '12px',
              color: '#B3B3B3',
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <span>Origin: {previewChannel.streamUrl}</span>
              <span style={{ color: '#10B981', fontWeight: 700 }}>Signal Lock: 100%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
