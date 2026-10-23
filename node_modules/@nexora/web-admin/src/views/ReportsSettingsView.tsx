import React, { useState } from 'react';
import { Sliders, HardDrive, Shield, Server, Download, Check } from 'lucide-react';

export const ReportsSettingsView: React.FC = () => {
  const [segmentLength, setSegmentLength] = useState(4);
  const [llHlsEnabled, setLlHlsEnabled] = useState(true);
  const [tokenDrm, setTokenDrm] = useState(true);
  const [activeCodec, setActiveCodec] = useState('HEVC / H.265');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Transcoder & Origin Pipeline Settings */}
      <div style={{
        backgroundColor: '#151515',
        border: '1px solid #303030',
        borderRadius: '16px',
        padding: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <Server size={20} color="#E50914" />
          <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#FFFFFF' }}>
            Live Stream Transcoding & Origin Engine
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '13px', color: '#B3B3B3', fontWeight: 700 }}>
              HLS Video Segment Length
            </label>
            <select
              value={segmentLength}
              onChange={(e) => setSegmentLength(Number(e.target.value))}
              style={{
                width: '100%',
                backgroundColor: '#050505',
                border: '1px solid #303030',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#FFFFFF',
                marginTop: '6px',
              }}
            >
              <option value={2}>2 Seconds (Ultra Low Latency - eSports / Sports)</option>
              <option value={4}>4 Seconds (Recommended - Optimal stability)</option>
              <option value={6}>6 Seconds (Standard broadcast)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '13px', color: '#B3B3B3', fontWeight: 700 }}>
              Hardware Encoding Architecture
            </label>
            <select
              value={activeCodec}
              onChange={(e) => setActiveCodec(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#050505',
                border: '1px solid #303030',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#FFFFFF',
                marginTop: '6px',
              }}
            >
              <option value="HEVC / H.265">HEVC / H.265 (4K 60FPS NVENC Acceleration)</option>
              <option value="AV1 NextGen">AV1 NextGen (Highest compression efficiency)</option>
              <option value="AVC / H.264">AVC / H.264 (Maximum legacy hardware compatibility)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '13px', color: '#B3B3B3', fontWeight: 700 }}>
              Low-Latency HLS (LL-HLS)
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
              <input
                type="checkbox"
                id="llhls"
                checked={llHlsEnabled}
                onChange={(e) => setLlHlsEnabled(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#E50914' }}
              />
              <label htmlFor="llhls" style={{ fontSize: '13px', color: '#FFFFFF' }}>
                Enable chunked transfer under 1.5s live delay
              </label>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', color: '#B3B3B3', fontWeight: 700 }}>
              AES-128 & Tokenized Stream Security
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
              <input
                type="checkbox"
                id="tokenDrm"
                checked={tokenDrm}
                onChange={(e) => setTokenDrm(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#E50914' }}
              />
              <label htmlFor="tokenDrm" style={{ fontSize: '13px', color: '#FFFFFF' }}>
                Enforce HMAC token rotation every 60 seconds
              </label>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px' }}>
          {isSaved && (
            <span style={{ fontSize: '13px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Check size={16} /> Transcoder config propagated to all 32 edge clusters!
            </span>
          )}
          <button className="btn-primary" onClick={handleSave}>
            Apply & Reload Transcoders
          </button>
        </div>
      </div>

      {/* Reports & Data Export */}
      <div style={{
        backgroundColor: '#151515',
        border: '1px solid #303030',
        borderRadius: '16px',
        padding: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <HardDrive size={20} color="#E50914" />
          <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#FFFFFF' }}>
            System Reports & Audit Export
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div style={{ backgroundColor: '#0D0D0D', border: '1px solid #303030', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#FFFFFF' }}>Bandwidth Usage & CDN Cost</h4>
            <p style={{ margin: '0 0 14px 0', fontSize: '12px', color: '#B3B3B3' }}>
              Complete breakdown of egress per edge POP and transcode hours.
            </p>
            <button
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => alert('Exporting Bandwidth_Report_October_2026.csv')}
            >
              <Download size={14} /> Download CSV
            </button>
          </div>

          <div style={{ backgroundColor: '#0D0D0D', border: '1px solid #303030', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#FFFFFF' }}>Channel Quality of Experience</h4>
            <p style={{ margin: '0 0 14px 0', fontSize: '12px', color: '#B3B3B3' }}>
              Buffer ratios, bitrates, audio frame sync, and device error metrics.
            </p>
            <button
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => alert('Exporting QoE_Report_Last30Days.csv')}
            >
              <Download size={14} /> Download CSV
            </button>
          </div>

          <div style={{ backgroundColor: '#0D0D0D', border: '1px solid #303030', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#FFFFFF' }}>Subscriber & Revenue Audit</h4>
            <p style={{ margin: '0 0 14px 0', fontSize: '12px', color: '#B3B3B3' }}>
              Plan conversions, renewal metrics, churn rate, and device concurrency.
            </p>
            <button
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => alert('Exporting Revenue_Subscribers_Audit_2026.csv')}
            >
              <Download size={14} /> Download CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
