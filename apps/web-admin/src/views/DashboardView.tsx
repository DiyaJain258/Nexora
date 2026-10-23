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
        background: 'linear-gradient(90deg, rgba(229, 9, 20, 0.15) 0%, rgba(127, 0, 0, 0.2) 100%)',
        border: '1px solid rgba(229, 9, 20, 0.4)',
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
            backgroundColor: 'rgba(229, 9, 20, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #E50914',
          }}>
            <ShieldCheck size={22} color="#E50914" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#FFFFFF' }}>
              All 148 Live Origin Streams Transcoding in 4K HDR & FHD 60FPS
            </div>
            <div style={{ fontSize: '12px', color: '#B3B3B3' }}>
              Global Edge CDN caching efficiency at 98.4%. Zero packet degradation recorded in last 24h.
            </div>
          </div>
        </div>
        <span className="badge badge-red">Cluster Healthy</span>
      </div>

      {/* Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}>
        {/* Metric 1 */}
        <div style={{
          backgroundColor: '#151515',
          border: '1px solid #303030',
          borderRadius: '14px',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: '#B3B3B3', fontWeight: 600 }}>Active Viewers</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(229, 9, 20, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} color="#E50914" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#FFFFFF', marginBottom: '4px' }}>
            {MOCK_ADMIN_METRICS.activeViewers.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <TrendingUp size={14} /> +12.4% vs last hour
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #E50914, #7F0000)' }} />
        </div>

        {/* Metric 2 */}
        <div style={{
          backgroundColor: '#151515',
          border: '1px solid #303030',
          borderRadius: '14px',
          padding: '20px',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: '#B3B3B3', fontWeight: 600 }}>Total Bandwidth</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(229, 9, 20, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={18} color="#E50914" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#FFFFFF', marginBottom: '4px' }}>
            {MOCK_ADMIN_METRICS.totalBandwidthGbps} <span style={{ fontSize: '16px', color: '#B3B3B3' }}>Gbps</span>
          </div>
          <div style={{ fontSize: '12px', color: '#E50914', fontWeight: 600 }}>
            Peak capacity 1.2 Tbps
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', backgroundColor: '#303030' }} />
        </div>

        {/* Metric 3 */}
        <div style={{
          backgroundColor: '#151515',
          border: '1px solid #303030',
          borderRadius: '14px',
          padding: '20px',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: '#B3B3B3', fontWeight: 600 }}>Live Channels</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(229, 9, 20, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Tv size={18} color="#E50914" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#FFFFFF', marginBottom: '4px' }}>
            {MOCK_ADMIN_METRICS.activeLiveChannels}
          </div>
          <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 600 }}>
            100% Online & Synchronized
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', backgroundColor: '#303030' }} />
        </div>

        {/* Metric 4 */}
        <div style={{
          backgroundColor: '#151515',
          border: '1px solid #303030',
          borderRadius: '14px',
          padding: '20px',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: '#B3B3B3', fontWeight: 600 }}>Active Subscribers</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(229, 9, 20, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HardDrive size={18} color="#E50914" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#FFFFFF', marginBottom: '4px' }}>
            {MOCK_ADMIN_METRICS.activeSubscribers.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 600 }}>
            Churn rate {MOCK_ADMIN_METRICS.churnRatePercent}% (Lowest)
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', backgroundColor: '#303030' }} />
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
          backgroundColor: '#151515',
          border: '1px solid #303030',
          borderRadius: '16px',
          padding: '22px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                Top Airing Live Streams
              </h3>
              <p style={{ fontSize: '12px', color: '#B3B3B3', margin: '4px 0 0 0' }}>
                Real-time active audience on origin transcoders
              </p>
            </div>
            <span className="badge badge-red">Live Transcoding</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {MOCK_CHANNELS.slice(0, 4).map((ch) => (
              <div
                key={ch.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  backgroundColor: '#0D0D0D',
                  borderRadius: '10px',
                  border: '1px solid #303030',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={ch.logo}
                    alt={ch.name}
                    style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
                      {ch.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#E50914', fontWeight: 600 }}>
                      {ch.currentProgram?.title || 'Program stream'}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-red">
                    {ch.resolution} • {ch.fps}fps
                  </span>
                  <div style={{ fontSize: '11px', color: '#B3B3B3', marginTop: '4px' }}>
                    {(ch.bitrateKbps || 0) / 1000} Mbps
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global CDN & Edge Node Telemetry */}
        <div style={{
          backgroundColor: '#151515',
          border: '1px solid #303030',
          borderRadius: '16px',
          padding: '22px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                Edge Transcoding & CDN Clusters
              </h3>
              <p style={{ fontSize: '12px', color: '#B3B3B3', margin: '4px 0 0 0' }}>
                Hardware NVENC / QuickSync load per datacenter
              </p>
            </div>
            <Server size={18} color="#E50914" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {edgeNodes.map((node) => (
              <div
                key={node.name}
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#0D0D0D',
                  borderRadius: '10px',
                  border: '1px solid #303030',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>{node.name}</span>
                    <span style={{ fontSize: '11px', color: '#737373', marginLeft: '8px' }}>{node.ip}</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#E50914' }}>{node.load}</span>
                </div>

                {/* Progress bars for CPU & RAM */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '11px', color: '#B3B3B3' }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>CPU</span>
                    <div style={{ flex: 1, height: '6px', backgroundColor: '#1C1C1C', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${node.cpu}%`, height: '100%', backgroundColor: '#E50914' }} />
                    </div>
                    <span>{node.cpu}%</span>
                  </div>

                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>RAM</span>
                    <div style={{ flex: 1, height: '6px', backgroundColor: '#1C1C1C', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${node.ram}%`, height: '100%', backgroundColor: '#7F0000' }} />
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
