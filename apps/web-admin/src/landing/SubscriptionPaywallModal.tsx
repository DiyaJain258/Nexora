import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  X,
  Crown,
  Check,
  Zap,
  Film,
  Sparkles,
  Lock,
  Tv,
  ArrowRight,
  ShieldCheck,
  Play,
  KeyRound,
} from 'lucide-react';
import { MOCK_SUBSCRIPTION_PLANS, SubscriptionPlan, ContentItem } from '@nexora/shared';
import { UserSession } from '../views/AdminLoginView';

interface SubscriptionPaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingMovie?: ContentItem | any | null;
  onSelectPlan: (plan: SubscriptionPlan, newSession: UserSession) => void;
  onOpenSignIn: () => void;
  onWatchTeaser?: (movie: any) => void;
}

export const SubscriptionPaywallModal: React.FC<SubscriptionPaywallModalProps> = ({
  isOpen,
  onClose,
  pendingMovie,
  onSelectPlan,
  onOpenSignIn,
  onWatchTeaser,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-vip');
  const [activating, setActivating] = useState(false);

  if (!isOpen) return null;

  const handleChoosePlan = (plan: SubscriptionPlan) => {
    setActivating(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#be123c', '#e11d48', '#ffffff', '#fda4af', '#10b981'],
    });

    const newSession: UserSession = {
      id: `sub-${Date.now()}`,
      name: 'NEXORA VIP Member',
      email: 'subscriber@nexora.tv',
      role: 'subscriber',
      plan: plan.name,
    };

    setTimeout(() => {
      setActivating(false);
      onSelectPlan(plan, newSession);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 16px',
        }}
      >
        {/* Dark Velvet Blur Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(3, 2, 6, 0.92)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
          }}
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          data-lenis-prevent="true"
          className="modal-custom-scrollbar"
          onWheel={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '920px',
            maxHeight: '90vh',
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            backgroundColor: '#0a0710',
            border: '1.5px solid rgba(225, 29, 72, 0.45)',
            borderRadius: '26px',
            boxShadow:
              '0 30px 100px rgba(0, 0, 0, 0.95), 0 0 70px rgba(225, 29, 72, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
            zIndex: 10,
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            type="button"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '10px',
              padding: '7px',
              cursor: 'pointer',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 20,
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
          >
            <X size={18} />
          </button>

          {/* Cinematic Top Header with Movie Backdrop Preview */}
          <div
            style={{
              position: 'relative',
              padding: '36px 36px 28px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'linear-gradient(180deg, rgba(225, 29, 72, 0.16) 0%, rgba(10, 7, 16, 0.95) 100%)',
              overflow: 'hidden',
            }}
          >
            {/* Soft Ambient Background Image if Movie Backdrop available */}
            {pendingMovie?.backdropUrl && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${pendingMovie.backdropUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.18,
                  filter: 'blur(12px)',
                  transform: 'scale(1.1)',
                  pointerEvents: 'none',
                }}
              />
            )}

            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(225, 29, 72, 0.2)',
                  border: '1px solid rgba(225, 29, 72, 0.45)',
                  padding: '5px 14px',
                  borderRadius: '999px',
                  marginBottom: '14px',
                }}
              >
                <Lock size={13} color="#fda4af" />
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 900,
                    color: '#fda4af',
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                  }}
                >
                  Subscription Required • 4K UHD Pass
                </span>
              </div>

              <h2
                style={{
                  fontSize: '28px',
                  fontWeight: 900,
                  color: '#f8fafc',
                  letterSpacing: '-0.5px',
                  margin: '0 0 10px',
                  lineHeight: 1.25,
                }}
              >
                Unlock Unlimited 4K Cinema Streaming
              </h2>

              <p style={{ fontSize: '14.5px', color: '#cbd5e1', lineHeight: 1.6, margin: '0 auto 20px' }}>
                {pendingMovie ? (
                  <>
                    To stream <strong style={{ color: '#fda4af' }}>"{pendingMovie.title}"</strong> in IMAX 4K
                    HDR with Dolby Atmos, choose a subscription tier or sign in to your account.
                  </>
                ) : (
                  <>
                    Get unlimited access to over 10,000+ 4K HDR Hollywood blockbusters, original web series, and 120+ live
                    broadcast channels.
                  </>
                )}
              </p>

              {/* Monthly / Annual Toggle */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: 'rgba(18, 12, 26, 0.85)',
                  padding: '5px 14px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: billingCycle === 'monthly' ? '#ffffff' : '#94a3b8',
                  }}
                >
                  Monthly
                </span>
                <button
                  type="button"
                  onClick={() => setBillingCycle((prev) => (prev === 'monthly' ? 'yearly' : 'monthly'))}
                  style={{
                    width: '46px',
                    height: '24px',
                    borderRadius: '12px',
                    backgroundColor: billingCycle === 'yearly' ? '#e11d48' : '#27272a',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background-color 0.2s',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: billingCycle === 'yearly' ? '24px' : '2px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      transition: 'left 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </button>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: billingCycle === 'yearly' ? '#ffffff' : '#94a3b8',
                  }}
                >
                  Annual{' '}
                  <span
                    style={{
                      backgroundColor: 'rgba(225, 29, 72, 0.2)',
                      color: '#fda4af',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: 900,
                    }}
                  >
                    SAVE 20%
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Plans Grid */}
          <div style={{ padding: '28px 36px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '18px',
                marginBottom: '24px',
              }}
            >
              {MOCK_SUBSCRIPTION_PLANS.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                const isVip = plan.id === 'plan-vip';
                const price =
                  billingCycle === 'yearly'
                    ? (plan.priceYearly / 12).toFixed(2)
                    : plan.priceMonthly.toFixed(2);

                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    style={{
                      position: 'relative',
                      backgroundColor: isSelected ? 'rgba(22, 16, 32, 0.95)' : 'rgba(14, 10, 20, 0.75)',
                      border: isSelected
                        ? '2px solid #e11d48'
                        : isVip
                        ? '1.5px solid rgba(225, 29, 72, 0.45)'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '18px',
                      padding: '22px 20px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected
                        ? '0 12px 36px rgba(225, 29, 72, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        : 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* Badge */}
                    {plan.badge && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '-10px',
                          right: '16px',
                          backgroundColor: '#e11d48',
                          color: '#ffffff',
                          padding: '2px 10px',
                          borderRadius: '999px',
                          fontSize: '10px',
                          fontWeight: 900,
                          letterSpacing: '0.8px',
                          textTransform: 'uppercase',
                          boxShadow: '0 4px 12px rgba(225, 29, 72, 0.5)',
                        }}
                      >
                        {plan.badge}
                      </div>
                    )}

                    <div>
                      {/* Plan Header */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h4 style={{ margin: 0, fontSize: '17px', fontWeight: 900, color: '#ffffff' }}>
                          {plan.name}
                        </h4>
                        {isVip && <Crown size={18} color="#fda4af" />}
                      </div>

                      {/* Price */}
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '14px' }}>
                        <span style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff' }}>
                          ${price}
                        </span>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>/ month</span>
                      </div>

                      {/* Specs Tags */}
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        <span
                          style={{
                            fontSize: '10.5px',
                            fontWeight: 800,
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            color: '#cbd5e1',
                            padding: '3px 8px',
                            borderRadius: '6px',
                          }}
                        >
                          {plan.resolution}
                        </span>
                        <span
                          style={{
                            fontSize: '10.5px',
                            fontWeight: 800,
                            backgroundColor: 'rgba(225, 29, 72, 0.15)',
                            color: '#fda4af',
                            padding: '3px 8px',
                            borderRadius: '6px',
                          }}
                        >
                          {plan.maxStreams} {plan.maxStreams === 1 ? 'Screen' : 'Screens'}
                        </span>
                      </div>

                      {/* Features List */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                        {plan.features.slice(0, 4).map((f, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <Check
                              size={14}
                              color="#10b981"
                              style={{ marginTop: '3px', flexShrink: 0 }}
                            />
                            <span style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.4 }}>
                              {f}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Choose Plan Button */}
                    <button
                      type="button"
                      disabled={activating}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChoosePlan(plan);
                      }}
                      className={isSelected ? 'btn-radiant' : ''}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '12px',
                        backgroundColor: isSelected ? undefined : 'rgba(255, 255, 255, 0.06)',
                        border: isSelected ? undefined : '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#ffffff',
                        fontSize: '13px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>Start Streaming</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Bridge: Already Have An Account Sign In */}
            <div
              style={{
                backgroundColor: 'rgba(18, 14, 26, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '16px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(225, 29, 72, 0.18)',
                    border: '1px solid rgba(225, 29, 72, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <KeyRound size={18} color="#fda4af" />
                </div>
                <div>
                  <h5 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>
                    Already have a NEXORA subscriber account?
                  </h5>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>
                    Sign in to immediately unlock your 4K catalog and personalized watchlist.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSignIn();
                }}
                style={{
                  backgroundColor: 'rgba(225, 29, 72, 0.2)',
                  border: '1.5px solid rgba(225, 29, 72, 0.45)',
                  color: '#ffffff',
                  padding: '9px 18px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e11d48';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(225, 29, 72, 0.2)';
                }}
              >
                <span>Sign In to Your Account</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Bottom Secondary Action: Free Teaser Preview */}
            {pendingMovie && onWatchTeaser && (
              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onWatchTeaser(pendingMovie);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                >
                  <Play size={14} color="#fda4af" />
                  <span>Watch Free 4K Trailer Preview Instead</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SubscriptionPaywallModal;
