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
        backgroundColor: '#111827',
        border: '1px solid #1E293B',
        borderRadius: '14px',
        padding: '16px 20px',
        gap: '16px',
      }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#F8FAFC' }}>
            Subscription Tiers & Monetization Matrix
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94A3B8' }}>
            Configure maximum streams, bitrate caps, and VIP features
          </p>
        </div>

        <div style={{
          display: 'flex',
          backgroundColor: '#070912',
          padding: '4px',
          borderRadius: '10px',
          border: '1px solid #1E293B',
        }}>
          <button
            onClick={() => setBillingCycle('monthly')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: billingCycle === 'monthly' ? '#8B5CF6' : 'transparent',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 600,
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
              backgroundColor: billingCycle === 'yearly' ? '#8B5CF6' : 'transparent',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 600,
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
                backgroundColor: '#111827',
                border: isVip ? '2px solid #8B5CF6' : '1px solid #1E293B',
                borderRadius: '16px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: isVip ? '0 10px 30px rgba(139, 92, 246, 0.2)' : 'none',
              }}
            >
              {plan.badge && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '20px',
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)',
                  color: '#FFFFFF',
                  padding: '3px 12px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)',
                }}>
                  {plan.badge}
                </div>
              )}

              <div style={{ fontSize: '18px', fontWeight: 800, color: '#F8FAFC', marginBottom: '8px' }}>
                {plan.name}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '16px' }}>
                <span style={{ fontSize: '32px', fontWeight: 800, color: '#22D3EE' }}>
                  {plan.currency}{price}
                </span>
                <span style={{ fontSize: '13px', color: '#94A3B8' }}>
                  /{billingCycle === 'monthly' ? 'month' : 'year'}
                </span>
              </div>

              <div style={{
                backgroundColor: '#0B1020',
                padding: '12px 14px',
                borderRadius: '10px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
              }}>
                <div>
                  <div style={{ color: '#94A3B8' }}>Max Screens</div>
                  <div style={{ fontWeight: 700, color: '#F8FAFC' }}>{plan.maxStreams} Devices</div>
                </div>
                <div>
                  <div style={{ color: '#94A3B8' }}>Resolution</div>
                  <div style={{ fontWeight: 700, color: '#8B5CF6' }}>{plan.resolution}</div>
                </div>
                <div>
                  <div style={{ color: '#94A3B8' }}>Subscribers</div>
                  <div style={{ fontWeight: 700, color: '#22D3EE' }}>{plan.subscriberCount?.toLocaleString()}</div>
                </div>
              </div>

              {/* Feature Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, marginBottom: '24px' }}>
                {plan.features.map((feat) => (
                  <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#F8FAFC' }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(34, 211, 238, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Check size={12} color="#22D3EE" />
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
