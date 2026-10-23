import React from 'react';
import { Tv, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateToAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToAdmin }) => {
  return (
    <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: '#050507', padding: '40px 0 28px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '36px', marginBottom: '32px' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #e11d48 0%, #881337 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Tv size={20} color="#ffffff" strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: '20px', fontWeight: 900, color: '#f8fafc' }}>NEXORA</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, maxWidth: '340px', marginBottom: '20px' }}>
              Next-generation 4K IPTV and Live TV broadcasting platform. Engineered for ultra-low latency streaming on Android TV, Apple TV, Mobile, and Web.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '13px', fontWeight: 600 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 10px #10b981' }} />
              <span>All Global CDN Transcoding Clusters Operational</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '18px' }}>
              Applications
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={onNavigateToAdmin}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: 0,
                }}
              >
                <span>Admin Operations Portal (Same Port)</span>
              </button>
              <a href="http://localhost:5175" target="_blank" rel="noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Smart TV / Android TV App (:5175)</span>
                <ExternalLink size={12} />
              </a>
              <a href="http://localhost:5174" target="_blank" rel="noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Android & iOS Mobile App (:5174)</span>
                <ExternalLink size={12} />
              </a>
              <span style={{ color: '#64748b', fontSize: '14px' }}>Apple TV 4K (TestFlight)</span>
              <span style={{ color: '#64748b', fontSize: '14px' }}>Amazon Fire TV Stick APK</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '18px' }}>
              Quick Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#features" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Live Channels Guide</a>
              <a href="#activation" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>TV Code Activation</a>
              <a href="#pricing" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Subscription Pricing</a>
              <a href="#faq" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Setup Documentation</a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '18px' }}>
              Compliance & Security
            </h4>
            <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6, marginBottom: '12px' }}>
              Authorized broadcast streams are delivered via encrypted CDN nodes. All trademarks and channel rights belong to their respective licensed content providers.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '12px' }}>
              <ShieldCheck size={16} color="#fda4af" />
              <span>PCI-DSS & SSL Encrypted Ingestion</span>
            </div>
          </div>

        </div>

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            © {new Date().getFullYear()} NEXORA Streaming Technologies. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#64748b' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span>•</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            <span>•</span>
            <span style={{ cursor: 'pointer' }}>Broadcast Agreement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
