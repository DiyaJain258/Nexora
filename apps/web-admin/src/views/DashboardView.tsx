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
      {/* Top Banner Alert / Notice */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.15) 0%, rgba(34, 211, 238, 0.12) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.35)',
        borderRadius: '14px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'rgba(34, 211, 238, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <ShieldCheck size={22} color="#22D3EE" />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '14px', color: '#F8FAFC' }}>
              All 148 Live Origin Streams Transcoding in 4K HDR & FHD 60FPS
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>
              Global Edge CDN caching efficiency at 98.4%. Zero packet degradation recorded in last 24h.
            </div>
          </div>
        </div>
        <span className="badge badge-cyan">Cluster Healthy</span>
      </div>

      {/* Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}>
        {/* Metric 1 */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1E293B',
          borderRadius: '14px',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 500 }}>Active Viewers</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} color="#8B5CF6" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#F8FAFC', marginBottom: '4px' }}>
            {MOCK_ADMIN_METRICS.activeViewers.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={14} /> +12.4% vs last hour
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #8B5CF6, #22D3EE)' }} />
        </div>

        {/* Metric 2 */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1E293B',
          borderRadius: '14px',
          padding: '20px',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 500 }}>Total Bandwidth</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(34, 211, 238, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={18} color="#22D3EE" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#F8FAFC', marginBottom: '4px' }}>
            {MOCK_ADMIN_METRICS.totalBandwidthGbps} <span style={{ fontSize: '16px', color: '#94A3B8' }}>Gbps</span>
          </div>
          <div style={{ fontSize: '12px', color: '#22D3EE' }}>
            Peak capacity 1.2 Tbps
          </div>
        </div>

        {/* Metric 3 */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1E293B',
          borderRadius: '14px',
          padding: '20px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 500 }}>Live Channels</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Tv size={18} color="#10B981" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#F8FAFC', marginBottom: '4px' }}>
            {MOCK_ADMIN_METRICS.activeLiveChannels}
          </div>
          <div style={{ fontSize: '12px', color: '#10B981' }}>
            100% Online & Synchronized
          </div>
        </div>

        {/* Metric 4 */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1E293B',
          borderRadius: '14px',
          padding: '20px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 500 }}>Active Subscribers</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HardDrive size={18} color="#F59E0B" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#F8FAFC', marginBottom: '4px' }}>
            {MOCK_ADMIN_METRICS.activeSubscribers.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: '#F59E0B' }}>
            Churn rate {MOCK_ADMIN_METRICS.churnRatePercent}% (Lowest)
          </div>
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
          backgroundColor: '#111827',
          border: '1px solid #1E293B',
          borderRadius: '16px',
          padding: '22px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#F8FAFC', margin: 0 }}>
                Top Airing Live Streams
              </h3>
              <p style={{ fontSize: '12px', color: '#94A3B8', margin: '4px 0 0 0' }}>
                Real-time active audience on origin transcoders
              </p>
            </div>
            <span className="badge badge-violet">Live Transcoding</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {MOCK_CHANNELS.slice(0, 4).map((ch) => (
              <div
                key={ch.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  backgroundColor: '#0B1020',
                  borderRadius: '10px',
                  border: '1px solid #1E293B',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={ch.logo}
                    alt={ch.name}
                    style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#F8FAFC' }}>
                      {ch.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#22D3EE' }}>
                      {ch.currentProgram?.title || 'Program stream'}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className={`badge ${ch.resolution === '4K' ? 'badge-cyan' : 'badge-violet'}`}>
                    {ch.resolution} • {ch.fps}fps
                  </span>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
                    {(ch.bitrateKbps || 0) / 1000} Mbps
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global CDN & Edge Node Telemetry */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1E293B',
          borderRadius: '16px',
          padding: '22px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#F8FAFC', margin: 0 }}>
                Edge Transcoding & CDN Clusters
              </h3>
              <p style={{ fontSize: '12px', color: '#94A3B8', margin: '4px 0 0 0' }}>
                Hardware NVENC / QuickSync load per datacenter
              </p>
            </div>
            <Server size={18} color="#22D3EE" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {edgeNodes.map((node) => (
              <div
                key={node.name}
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#0B1020',
                  borderRadius: '10px',
                  border: '1px solid #1E293B',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#F8FAFC' }}>{node.name}</span>
                    <span style={{ fontSize: '11px', color: '#64748B', marginLeft: '8px' }}>{node.ip}</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#22D3EE' }}>{node.load}</span>
                </div>

                {/* Progress bars for CPU & RAM */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '11px', color: '#94A3B8' }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>CPU</span>
                    <div style={{ flex: 1, height: '6px', backgroundColor: '#1E293B', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${node.cpu}%`, height: '100%', backgroundColor: '#8B5CF6' }} />
                    </div>
                    <span>{node.cpu}%</span>
                  </div>

                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>RAM</span>
                    <div style={{ flex: 1, height: '6px', backgroundColor: '#1E293B', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${node.ram}%`, height: '100%', backgroundColor: '#22D3EE' }} />
                    </div>
                    <span>{node.ram}%</span>
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
