import React from 'react';
import {
  Users,
  Activity,
  Tv,
  HardDrive,
  TrendingUp,
  Cpu,
  Server,
  AlertCircle,
  PlayCircle,
  ShieldCheck,
} from 'lucide-react';
import { MOCK_ADMIN_METRICS, MOCK_CHANNELS } from '@nexora/shared';

export const DashboardView: React.FC = () => {
  const edgeNodes = [
    { name: 'EU-Central (FRA-01)', ip: '185.190.140.12', cpu: 38, ram: 54, load: '142 Gbps', status: 'optimal' },
    { name: 'UK-South (LON-02)', ip: '141.101.90.4', cpu: 46, ram: 61, load: '118 Gbps', status: 'optimal' },
    { name: 'US-East (NYC-01)', ip: '198.51.100.22', cpu: 52, ram: 68, load: '135 Gbps', status: 'optimal' },
    { name: 'APAC-South (SGP-01)', ip: '103.28.248.88', cpu: 32, ram: 48, load: '56 Gbps', status: 'optimal' },
    { name: 'APAC-East (NRT-01)', ip: '133.130.40.15', cpu: 29, ram: 42, load: '31.6 Gbps', status: 'optimal' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <style>{`
        @keyframes dashFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dash-card-hover {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s, border-color 0.25s;
        }
        .dash-card-hover:hover {
          transform: translateY(-3px);
          border-color: rgba(184, 29, 74, 0.45) !important;
          box-shadow: 0 16px 36px rgba(139, 0, 50, 0.28) !important;
        }
        .dash-stream-row {
          transition: background-color 0.2s, border-color 0.2s, transform 0.15s;
        }
        .dash-stream-row:hover {
          background-color: rgba(139, 0, 50, 0.18) !important;
          border-color: rgba(184, 29, 74, 0.45) !important;
          transform: translateX(3px);
        }
      `}</style>

      {/* Top Banner Alert / Notice */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(139, 0, 50, 0.28) 0%, rgba(14, 9, 18, 0.95) 100%)',
        border: '1px solid rgba(184, 29, 74, 0.38)',
        borderRadius: '16px',
        padding: '18px 22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 8px 30px rgba(139, 0, 50, 0.22)',
        animation: 'dashFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: 'rgba(139, 0, 50, 0.35)',
            border: '1px solid rgba(184, 29, 74, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(139, 0, 50, 0.4)',
          }}>
            <ShieldCheck size={24} color="#fda4af" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '15px', color: '#F8FAFC', letterSpacing: '-0.2px' }}>
              All 148 Live Origin Streams Transcoding in 4K HDR & FHD 60FPS
            </div>
            <div style={{ fontSize: '12.5px', color: '#A1A1AA', marginTop: '2px' }}>
              Global Edge CDN caching efficiency at <span style={{ color: '#fda4af', fontWeight: 700 }}>98.4%</span>. Zero packet degradation recorded in last 24h.
            </div>
          </div>
        </div>
        <span className="badge badge-violet" style={{ fontSize: '11px', padding: '5px 12px', letterSpacing: '0.8px' }}>
          Cluster Healthy 4K
        </span>
      </div>

      {/* Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '18px',
      }}>
        {/* Metric 1 */}
        <div
          className="dash-card-hover"
          style={{
            backgroundColor: 'rgba(14, 9, 18, 0.85)',
            border: '1px solid rgba(184, 29, 74, 0.22)',
            borderRadius: '16px',
            padding: '22px',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(16px)',
            animation: 'dashFadeUp 0.6s 0.08s cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '13px', color: '#A1A1AA', fontWeight: 600 }}>Active Viewers</span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'rgba(139, 0, 50, 0.25)',
              border: '1px solid rgba(184, 29, 74, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Users size={18} color="#fda4af" />
            </div>
          </div>
          <div style={{ fontSize: '30px', fontWeight: 900, color: '#FFFFFF', marginBottom: '4px', letterSpacing: '-0.5px' }}>
            {MOCK_ADMIN_METRICS.activeViewers.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: '#34D399', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <TrendingUp size={14} /> +12.4% vs last hour
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #8b0032, #b81d4a, #fda4af)' }} />
        </div>

        {/* Metric 2 */}
        <div
          className="dash-card-hover"
          style={{
            backgroundColor: 'rgba(14, 9, 18, 0.85)',
            border: '1px solid rgba(184, 29, 74, 0.22)',
            borderRadius: '16px',
            padding: '22px',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(16px)',
            animation: 'dashFadeUp 0.6s 0.14s cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '13px', color: '#A1A1AA', fontWeight: 600 }}>Total Bandwidth</span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'rgba(139, 0, 50, 0.25)',
              border: '1px solid rgba(184, 29, 74, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Activity size={18} color="#fda4af" />
            </div>
          </div>
          <div style={{ fontSize: '30px', fontWeight: 900, color: '#FFFFFF', marginBottom: '4px', letterSpacing: '-0.5px' }}>
            {MOCK_ADMIN_METRICS.totalBandwidthGbps} <span style={{ fontSize: '16px', color: '#fda4af', fontWeight: 700 }}>Gbps</span>
          </div>
          <div style={{ fontSize: '12px', color: '#A1A1AA', fontWeight: 600 }}>
            Peak cluster capacity: <span style={{ color: '#F8FAFC' }}>1.2 Tbps</span>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #b81d4a, #fda4af)' }} />
        </div>

        {/* Metric 3 */}
        <div
          className="dash-card-hover"
          style={{
            backgroundColor: 'rgba(14, 9, 18, 0.85)',
            border: '1px solid rgba(184, 29, 74, 0.22)',
            borderRadius: '16px',
            padding: '22px',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(16px)',
            animation: 'dashFadeUp 0.6s 0.2s cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '13px', color: '#A1A1AA', fontWeight: 600 }}>Live Channels</span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'rgba(139, 0, 50, 0.25)',
              border: '1px solid rgba(184, 29, 74, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Tv size={18} color="#fda4af" />
            </div>
          </div>
          <div style={{ fontSize: '30px', fontWeight: 900, color: '#FFFFFF', marginBottom: '4px', letterSpacing: '-0.5px' }}>
            {MOCK_ADMIN_METRICS.activeLiveChannels}
          </div>
          <div style={{ fontSize: '12px', color: '#34D399', fontWeight: 600 }}>
            100% Online &amp; Synchronized
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #8b0032, #b81d4a)' }} />
        </div>

        {/* Metric 4 */}
        <div
          className="dash-card-hover"
          style={{
            backgroundColor: 'rgba(14, 9, 18, 0.85)',
            border: '1px solid rgba(184, 29, 74, 0.22)',
            borderRadius: '16px',
            padding: '22px',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(16px)',
            animation: 'dashFadeUp 0.6s 0.26s cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '13px', color: '#A1A1AA', fontWeight: 600 }}>Active Subscribers</span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'rgba(139, 0, 50, 0.25)',
              border: '1px solid rgba(184, 29, 74, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <HardDrive size={18} color="#fda4af" />
            </div>
          </div>
          <div style={{ fontSize: '30px', fontWeight: 900, color: '#FFFFFF', marginBottom: '4px', letterSpacing: '-0.5px' }}>
            {MOCK_ADMIN_METRICS.activeSubscribers.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: '#fda4af', fontWeight: 600 }}>
            Churn rate {MOCK_ADMIN_METRICS.churnRatePercent}% (Lowest recorded)
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #b81d4a, #8b0032)' }} />
        </div>
      </div>

      {/* Grid: Live Channels Overview & Edge Transcoding Cluster */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))',
        gap: '24px',
      }}>
        {/* Top Live Streams Now */}
        <div style={{
          backgroundColor: 'rgba(14, 9, 18, 0.85)',
          border: '1px solid rgba(184, 29, 74, 0.22)',
          borderRadius: '18px',
          padding: '24px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.65)',
          animation: 'dashFadeUp 0.6s 0.32s cubic-bezier(0.16, 1, 0.3, 1) both',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', margin: 0, letterSpacing: '-0.3px' }}>
                Top Airing Live Streams
              </h3>
              <p style={{ fontSize: '12px', color: '#A1A1AA', margin: '4px 0 0 0' }}>
                Real-time active audience on origin transcoders
              </p>
            </div>
            <span className="badge badge-violet" style={{ border: '1px solid rgba(184, 29, 74, 0.45)' }}>
              Live Transcoding
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {MOCK_CHANNELS.slice(0, 4).map((ch) => (
              <div
                key={ch.id}
                className="dash-stream-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  backgroundColor: '#070509',
                  borderRadius: '12px',
                  border: '1px solid rgba(184, 29, 74, 0.16)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img
                    src={ch.logo}
                    alt={ch.name}
                    style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover', border: '1px solid rgba(184, 29, 74, 0.3)' }}
                  />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
                      {ch.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#fda4af', fontWeight: 600 }}>
                      {ch.currentProgram?.title || 'Program stream'}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: 'rgba(139, 0, 50, 0.28)',
                      color: '#fda4af',
                      border: '1px solid rgba(184, 29, 74, 0.45)',
                      fontWeight: 700,
                    }}
                  >
                    {ch.resolution} • {ch.fps}fps
                  </span>
                  <div style={{ fontSize: '11px', color: '#A1A1AA', marginTop: '4px', fontWeight: 600 }}>
                    {(ch.bitrateKbps || 0) / 1000} Mbps
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global CDN & Edge Node Telemetry */}
        <div style={{
          backgroundColor: 'rgba(14, 9, 18, 0.85)',
          border: '1px solid rgba(184, 29, 74, 0.22)',
          borderRadius: '18px',
          padding: '24px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.65)',
          animation: 'dashFadeUp 0.6s 0.38s cubic-bezier(0.16, 1, 0.3, 1) both',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', margin: 0, letterSpacing: '-0.3px' }}>
                Edge Transcoding &amp; CDN Clusters
              </h3>
              <p style={{ fontSize: '12px', color: '#A1A1AA', margin: '4px 0 0 0' }}>
                Hardware NVENC / QuickSync load per datacenter
              </p>
            </div>
            <Server size={20} color="#fda4af" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {edgeNodes.map((node) => (
              <div
                key={node.name}
                className="dash-stream-row"
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#070509',
                  borderRadius: '12px',
                  border: '1px solid rgba(184, 29, 74, 0.16)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFFFFF' }}>{node.name}</span>
                    <span style={{ fontSize: '11px', color: '#71717A', marginLeft: '8px' }}>{node.ip}</span>
                  </div>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#fda4af' }}>{node.load}</span>
                </div>

                {/* Progress bars for CPU & RAM */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '11px', color: '#A1A1AA', fontWeight: 600 }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>CPU</span>
                    <div style={{ flex: 1, height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${node.cpu}%`, height: '100%', background: 'linear-gradient(90deg, #8b0032, #b81d4a)' }} />
                    </div>
                    <span style={{ color: '#F8FAFC' }}>{node.cpu}%</span>
                  </div>

                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>RAM</span>
                    <div style={{ flex: 1, height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${node.ram}%`, height: '100%', background: 'linear-gradient(90deg, #b81d4a, #fda4af)' }} />
                    </div>
                    <span style={{ color: '#F8FAFC' }}>{node.ram}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

