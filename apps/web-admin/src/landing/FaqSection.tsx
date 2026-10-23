import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck, Zap, Server, Headphones } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Which Smart TVs and streaming boxes are compatible with NEXORA?',
      a: 'NEXORA is natively optimized for Android TV (Sony, TCL, Philips, Hisense), Google TV, Apple TV 4K, Amazon Fire TV Stick, Xiaomi Mi Box, Nvidia Shield TV, and Samsung/LG via web player or casting.',
    },
    {
      q: 'How does the 6-Digit instant TV activation code work?',
      a: 'When you open the NEXORA app on your TV, a 6-digit pairing code is displayed on screen. Simply open the NEXORA website on your smartphone or PC, type the code, and your TV account instantly unlocks without typing your email or password with a remote control.',
    },
    {
      q: 'What internet speed is recommended for 4K 60FPS streaming?',
      a: 'Our adaptive bitrate LL-HLS engine works smoothly on connections as low as 15 Mbps for 1080p Full HD, and 35 Mbps+ for 4K HDR 60FPS with Dolby Atmos bitstream audio.',
    },
    {
      q: 'Can I stream on multiple devices at the same time?',
      a: 'Yes! Depending on your chosen subscription tier (Standard, Pro, or Family VIP), you can stream concurrently on 2, 4, or up to 5 screens simultaneously in different rooms or on the go.',
    },
    {
      q: 'Is there a contract or cancellation fee?',
      a: 'No contracts, zero cancellation fees. You can cancel, upgrade, or downgrade your plan anytime with a single click from your subscriber portal.',
    },
  ];

  return (
    <section id="faq" style={{ padding: '40px 0 28px', position: 'relative' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#fda4af', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#f8fafc', letterSpacing: '-1px', marginBottom: '14px' }}>
            Got Questions? <span className="gradient-text">We Have Answers</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: isOpen ? '1px solid rgba(225, 29, 72, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '22px 28px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#f8fafc',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span>{faq.q}</span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={20} color={isOpen ? '#fda4af' : '#a1a1aa'} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 28px 22px 28px', color: '#94a3b8', fontSize: '15px', lineHeight: 1.6, borderTop: '1px solid rgba(255, 255, 255, 0.04)', paddingTop: '16px' }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', textAlign: 'center' }}>
          <div className="glass-card" style={{ padding: '20px' }}>
            <Server size={24} color="#fda4af" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#f8fafc' }}>99.98%</div>
            <div style={{ fontSize: '12px', color: '#71717a' }}>Network Uptime</div>
          </div>

          <div className="glass-card" style={{ padding: '20px' }}>
            <Zap size={24} color="#ffffff" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#f8fafc' }}>0.4s</div>
            <div style={{ fontSize: '12px', color: '#71717a' }}>Zap Latency</div>
          </div>

          <div className="glass-card" style={{ padding: '20px' }}>
            <ShieldCheck size={24} color="#e11d48" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#f8fafc' }}>AES-128</div>
            <div style={{ fontSize: '12px', color: '#71717a' }}>Stream Encryption</div>
          </div>

          <div className="glass-card" style={{ padding: '20px' }}>
            <Headphones size={24} color="#f59e0b" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#f8fafc' }}>24/7 VIP</div>
            <div style={{ fontSize: '12px', color: '#71717a' }}>Live Support</div>
          </div>
        </div>

      </div>
    </section>
  );
};
