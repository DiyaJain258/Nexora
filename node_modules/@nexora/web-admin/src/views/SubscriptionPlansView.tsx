import React, { useState } from 'react';
import { CreditCard, Check, Zap, Sparkles, Plus, Edit2 } from 'lucide-react';
import { SubscriptionPlan, MOCK_SUBSCRIPTION_PLANS } from '@nexora/shared';

export const SubscriptionPlansView: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>(MOCK_SUBSCRIPTION_PLANS);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top billing toggle */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        backgroundColor: '#151515',
        border: '1px solid #303030',
        borderRadius: '14px',
        padding: '16px 20px',
        gap: '16px',
      }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#FFFFFF' }}>
            Subscription Tiers & Monetization Matrix
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#B3B3B3' }}>
            Configure maximum streams, bitrate caps, and VIP features
          </p>
        </div>

        <div style={{
          display: 'flex',
          backgroundColor: '#050505',
          padding: '4px',
          borderRadius: '10px',
          border: '1px solid #303030',
        }}>
          <button
            onClick={() => setBillingCycle('monthly')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: billingCycle === 'monthly' ? '#E50914' : 'transparent',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: billingCycle === 'yearly' ? '#E50914' : 'transparent',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Yearly (Save 20%)
          </button>
        </div>
      </div>

      {/* Plans Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
      }}>
        {plans.map((plan) => {
          const isVip = plan.id === 'plan-vip';
          const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;

          return (
            <div
              key={plan.id}
              style={{
                backgroundColor: '#151515',
                border: isVip ? '2px solid #E50914' : '1px solid #303030',
                borderRadius: '16px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: isVip ? '0 10px 30px rgba(229, 9, 20, 0.25)' : 'none',
              }}
            >
              {plan.badge && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '20px',
                  background: 'linear-gradient(135deg, #E50914 0%, #7F0000 100%)',
                  color: '#FFFFFF',
                  padding: '3px 12px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 800,
                  boxShadow: '0 4px 12px rgba(229, 9, 20, 0.4)',
                  border: '1px solid #E50914',
                }}>
                  {plan.badge}
                </div>
              )}

              <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                {plan.name}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '16px' }}>
                <span style={{ fontSize: '32px', fontWeight: 900, color: '#E50914' }}>
                  {plan.currency}{price}
                </span>
                <span style={{ fontSize: '13px', color: '#B3B3B3' }}>
                  /{billingCycle === 'monthly' ? 'month' : 'year'}
                </span>
              </div>

              <div style={{
                backgroundColor: '#0D0D0D',
                padding: '12px 14px',
                borderRadius: '10px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                border: '1px solid #303030',
              }}>
                <div>
                  <div style={{ color: '#B3B3B3' }}>Max Screens</div>
                  <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{plan.maxStreams} Devices</div>
                </div>
                <div>
                  <div style={{ color: '#B3B3B3' }}>Resolution</div>
                  <div style={{ fontWeight: 700, color: '#E50914' }}>{plan.resolution}</div>
                </div>
                <div>
                  <div style={{ color: '#B3B3B3' }}>Subscribers</div>
                  <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{plan.subscriberCount?.toLocaleString()}</div>
                </div>
              </div>

              {/* Feature Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, marginBottom: '24px' }}>
                {plan.features.map((feat) => (
                  <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#FFFFFF' }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(229, 9, 20, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Check size={12} color="#E50914" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                className={isVip ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => alert(`Plan "${plan.name}" settings opened for tier configuration.`)}
              >
                <span>Edit Plan Config</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
