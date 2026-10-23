import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { MOCK_SUBSCRIPTION_PLANS, SubscriptionPlan } from '@nexora/shared';
import { Check, Zap } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#be123c', '#e11d48', '#ffffff', '#fda4af'],
    });
    alert(`Thank you for choosing ${plan.name}! In Phase 3, this will connect to secure payment gateway.`);
  };

  return (
    <section id="pricing" style={{ padding: '44px 0', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#fda4af', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
            TRANSPARENT SUBSCRIPTION TIERS
          </div>
          <h2 style={{ fontSize: '40px', fontWeight: 900, color: '#f8fafc', letterSpacing: '-1px', marginBottom: '16px' }}>
            Choose the Perfect Plan for <span className="gradient-text">Your Streaming Setup</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Cancel anytime. All plans include 4K HDR live broadcast, cloud DVR, and zero contract commitment.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginTop: '20px', backgroundColor: 'rgba(10, 10, 14, 0.7)', padding: '6px 14px', borderRadius: '999px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: billingCycle === 'monthly' ? '#f8fafc' : '#71717a' }}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle((prev) => (prev === 'monthly' ? 'yearly' : 'monthly'))}
              style={{
                width: '48px',
                height: '26px',
                borderRadius: '14px',
                backgroundColor: billingCycle === 'yearly' ? '#ffffff' : '#27272a',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background-color 0.2s',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '3px',
                  left: billingCycle === 'yearly' ? '24px' : '3px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#050507',
                  transition: 'left 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </button>
            <span style={{ fontSize: '14px', fontWeight: 600, color: billingCycle === 'yearly' ? '#ffffff' : '#71717a' }}>
              Annual <span style={{ backgroundColor: 'rgba(225, 29, 72, 0.15)', color: '#fda4af', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>SAVE 20%</span>
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', alignItems: 'stretch' }}>
          {MOCK_SUBSCRIPTION_PLANS.map((plan) => {
            const isPopular = plan.isPopular;
            const price = billingCycle === 'yearly' ? (plan.priceYearly / 12).toFixed(2) : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                className="glass-card"
                style={{
                  padding: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  border: isPopular ? '2px solid rgba(225, 29, 72, 0.6)' : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isPopular ? '0 16px 50px -10px rgba(225, 29, 72, 0.3)' : 'none',
                }}
              >
                {isPopular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
                      color: '#ffffff',
                      padding: '4px 16px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 900,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      boxShadow: '0 4px 14px rgba(225, 29, 72, 0.4)',
                    }}
                  >
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#f8fafc', marginBottom: '8px' }}>
                    {plan.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#94a3b8', minHeight: '36px', marginBottom: '24px' }}>
                    {plan.resolution} • Up to {plan.maxStreams} concurrent active devices
                  </p>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '28px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 700, color: '#94a3b8' }}>$</span>
                    <span style={{ fontSize: '48px', fontWeight: 900, color: '#f8fafc', letterSpacing: '-1px' }}>
                      {price}
                    </span>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>/ month</span>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '24px', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {plan.features.map((feat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'rgba(225, 29, 72, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Check size={12} color="#fda4af" strokeWidth={3} />
                        </div>
                        <span style={{ fontSize: '14px', color: '#cbd5e1' }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={isPopular ? 'btn-radiant' : 'btn-glass'}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Zap size={16} />
                  <span>Choose {plan.name}</span>
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
