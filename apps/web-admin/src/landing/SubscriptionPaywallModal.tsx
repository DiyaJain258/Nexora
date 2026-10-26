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
  ArrowLeft,
  ShieldCheck,
  Play,
  KeyRound,
  CreditCard,
  Smartphone,
  CheckCircle2,
  BadgePercent,
  Flame,
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
  const [step, setStep] = useState<'plans' | 'checkout'>('plans');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-vip');
  const [activating, setActivating] = useState(false);

  // Checkout Form Details
  const [subscriberName, setSubscriberName] = useState('VIP Member');
  const [subscriberEmail, setSubscriberEmail] = useState('vip.subscriber@nexora.tv');
  const [paymentMethod, setPaymentMethod] = useState<'instant-pass' | 'card' | 'wallet'>('instant-pass');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  if (!isOpen) return null;

  const currentPlan =
    MOCK_SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlanId) || MOCK_SUBSCRIPTION_PLANS[2];

  const handleProceedToCheckout = (plan?: SubscriptionPlan) => {
    if (plan) {
      setSelectedPlanId(plan.id);
    }
    setStep('checkout');
  };

  const handleCompleteActivation = () => {
    setActivating(true);

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#be123c', '#e11d48', '#ffffff', '#fda4af', '#10b981', '#fbbf24'],
    });

    const newSession: UserSession = {
      role: 'subscriber',
      name: subscriberName.trim() || 'VIP Member',
      email: subscriberEmail.trim() || 'subscriber@nexora.tv',
      plan: currentPlan.name,
      activeScreens: 1,
      maxScreens: currentPlan.maxStreams,
    };

    setTimeout(() => {
      setActivating(false);
      onSelectPlan(currentPlan, newSession);
    }, 700);
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
            backgroundColor: 'rgba(3, 2, 6, 0.93)',
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
            maxWidth: step === 'plans' ? '960px' : '880px',
            maxHeight: '92vh',
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            backgroundColor: '#0a0710',
            border: '1.5px solid rgba(225, 29, 72, 0.45)',
            borderRadius: '26px',
            boxShadow:
              '0 30px 100px rgba(0, 0, 0, 0.95), 0 0 70px rgba(225, 29, 72, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
            zIndex: 10,
            transition: 'max-width 0.3s ease',
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            type="button"
            title="Close"
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
              padding: '32px 36px 26px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'linear-gradient(180deg, rgba(225, 29, 72, 0.16) 0%, rgba(10, 7, 16, 0.95) 100%)',
              overflow: 'hidden',
            }}
          >
            {/* Ambient Background Image if Movie Backdrop available */}
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
              {step === 'plans' ? (
                <>
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
                      Step 1 of 2 • Select 4K Membership Tier
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

                  <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6, margin: '0 auto 20px' }}>
                    {pendingMovie ? (
                      <>
                        To stream <strong style={{ color: '#fda4af' }}>"{pendingMovie.title}"</strong> in IMAX 4K
                        HDR with Dolby Atmos, choose a subscription tier below.
                      </>
                    ) : (
                      <>
                        Get unlimited access to over 10,000+ 4K HDR blockbusters, original series, and 120+ live broadcast
                        channels.
                      </>
                    )}
                  </p>

                  {/* Monthly / Annual Toggle: Clickable labels and button */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '12px',
                      backgroundColor: 'rgba(18, 12, 26, 0.85)',
                      padding: '6px 16px',
                      borderRadius: '999px',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                    }}
                  >
                    <span
                      onClick={() => setBillingCycle('monthly')}
                      style={{
                        fontSize: '13px',
                        fontWeight: billingCycle === 'monthly' ? 900 : 600,
                        color: billingCycle === 'monthly' ? '#ffffff' : '#94a3b8',
                        cursor: 'pointer',
                        transition: 'color 0.15s ease',
                      }}
                    >
                      Monthly
                    </span>
                    <button
                      type="button"
                      onClick={() => setBillingCycle((prev) => (prev === 'monthly' ? 'yearly' : 'monthly'))}
                      title="Toggle Billing Cycle"
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
                      onClick={() => setBillingCycle('yearly')}
                      style={{
                        fontSize: '13px',
                        fontWeight: billingCycle === 'yearly' ? 900 : 600,
                        color: billingCycle === 'yearly' ? '#ffffff' : '#94a3b8',
                        cursor: 'pointer',
                        transition: 'color 0.15s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      Annual{' '}
                      <span
                        style={{
                          backgroundColor: 'rgba(225, 29, 72, 0.25)',
                          border: '1px solid rgba(225, 29, 72, 0.45)',
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
                </>
              ) : (
                /* Step 2 Header */
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <button
                      type="button"
                      onClick={() => setStep('plans')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        padding: '6px 14px',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)')}
                    >
                      <ArrowLeft size={14} />
                      <span>Back to Plans</span>
                    </button>

                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid rgba(16, 185, 129, 0.35)',
                        padding: '4px 12px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: 800,
                        color: '#34d399',
                      }}
                    >
                      <Sparkles size={13} />
                      <span>Step 2 of 2 • Confirm & Instant Activation</span>
                    </div>
                  </div>

                  <h2
                    style={{
                      fontSize: '26px',
                      fontWeight: 900,
                      color: '#f8fafc',
                      letterSpacing: '-0.5px',
                      margin: '0 0 8px',
                    }}
                  >
                    Confirm Your {currentPlan.name}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0 }}>
                    Instant 1-Click activation • 7-Day Free VIP Trial • Cancel anytime with zero fees
                  </p>
                </>
              )}
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div style={{ padding: '28px 36px' }}>
            {step === 'plans' ? (
              /* STEP 1: PLANS SELECTION GRID */
              <>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
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
                          backgroundColor: isSelected ? 'rgba(24, 16, 36, 0.98)' : 'rgba(14, 10, 20, 0.75)',
                          border: isSelected
                            ? '2px solid #e11d48'
                            : isVip
                            ? '1.5px solid rgba(225, 29, 72, 0.45)'
                            : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '18px',
                          padding: '24px 22px',
                          cursor: 'pointer',
                          transition: 'all 0.22s ease',
                          transform: isSelected ? 'translateY(-2px)' : 'none',
                          boxShadow: isSelected
                            ? '0 16px 40px rgba(225, 29, 72, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
                            : 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                      >
                        {/* Top Badge */}
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
                          {/* Plan Title & Icon */}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#ffffff' }}>
                              {plan.name}
                            </h4>
                            {isVip ? (
                              <Crown size={19} color="#fda4af" />
                            ) : (
                              <Sparkles size={17} color={isSelected ? '#fda4af' : '#71717a'} />
                            )}
                          </div>

                          {/* Price */}
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '14px' }}>
                            <span style={{ fontSize: '32px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px' }}>
                              ${price}
                            </span>
                            <span style={{ fontSize: '12.5px', color: '#94a3b8' }}>/ month</span>
                          </div>

                          {/* Resolution & Screens Tags */}
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: 800,
                                backgroundColor: isSelected ? 'rgba(225, 29, 72, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                                color: isSelected ? '#fda4af' : '#cbd5e1',
                                border: isSelected ? '1px solid rgba(225, 29, 72, 0.45)' : '1px solid rgba(255, 255, 255, 0.1)',
                                padding: '3px 8px',
                                borderRadius: '6px',
                              }}
                            >
                              {plan.resolution}
                            </span>
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: 800,
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                color: '#e2e8f0',
                                padding: '3px 8px',
                                borderRadius: '6px',
                              }}
                            >
                              {plan.maxStreams} {plan.maxStreams === 1 ? 'Screen' : 'Screens'}
                            </span>
                          </div>

                          {/* Features List */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '22px' }}>
                            {plan.features.slice(0, 4).map((f, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                <Check
                                  size={14}
                                  color="#10b981"
                                  strokeWidth={3}
                                  style={{ marginTop: '3px', flexShrink: 0 }}
                                />
                                <span style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.4 }}>
                                  {f}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* PLAN ACTION BUTTON: High Contrast & Jet Black Font When Active */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProceedToCheckout(plan);
                          }}
                          style={{
                            width: '100%',
                            padding: '13px 18px',
                            borderRadius: '12px',
                            backgroundColor: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.08)',
                            border: isSelected ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.16)',
                            /* CRITICAL FIX: Font text is JET BLACK (#050507) when button is white */
                            color: isSelected ? '#050507' : '#ffffff',
                            fontSize: '13.5px',
                            fontWeight: 900,
                            letterSpacing: '0.2px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: isSelected ? '0 4px 20px rgba(255, 255, 255, 0.35)' : 'none',
                            transition: 'all 0.18s ease',
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)';
                            } else {
                              e.currentTarget.style.transform = 'scale(1.02)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                            } else {
                              e.currentTarget.style.transform = 'scale(1.0)';
                            }
                          }}
                        >
                          <span>{isSelected ? 'Start Streaming' : `Select ${plan.name}`}</span>
                          <ArrowRight
                            size={16}
                            color={isSelected ? '#050507' : '#ffffff'}
                            strokeWidth={2.5}
                          />
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
                      onOpenSignIn();
                    }}
                    style={{
                      backgroundColor: 'rgba(225, 29, 72, 0.2)',
                      border: '1.5px solid rgba(225, 29, 72, 0.45)',
                      color: '#ffffff',
                      padding: '10px 20px',
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
              </>
            ) : (
              /* STEP 2: INSTANT CHECKOUT & ACTIVATION FLOW */
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
                
                {/* Left Column: Plan & Order Summary */}
                <div
                  style={{
                    backgroundColor: 'rgba(18, 12, 26, 0.85)',
                    border: '1px solid rgba(225, 29, 72, 0.35)',
                    borderRadius: '18px',
                    padding: '24px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: '#e11d48',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Crown size={22} color="#ffffff" />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#ffffff' }}>
                        {currentPlan.name}
                      </h4>
                      <span style={{ fontSize: '12px', color: '#fda4af', fontWeight: 700 }}>
                        {billingCycle === 'yearly' ? 'Annual Pass (Save 20%)' : 'Monthly Flexible Pass'}
                      </span>
                    </div>
                  </div>

                  {/* Immediate Movie Unlock Banner */}
                  {pendingMovie && (
                    <div
                      style={{
                        padding: '12px 14px',
                        backgroundColor: 'rgba(225, 29, 72, 0.12)',
                        border: '1px dashed rgba(225, 29, 72, 0.4)',
                        borderRadius: '12px',
                        marginBottom: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      {pendingMovie.posterUrl && (
                        <img
                          src={pendingMovie.posterUrl}
                          alt={pendingMovie.title}
                          style={{ width: '42px', height: '54px', objectFit: 'cover', borderRadius: '6px' }}
                        />
                      )}
                      <div>
                        <span style={{ fontSize: '11px', color: '#fda4af', fontWeight: 800, textTransform: 'uppercase' }}>
                          IMMEDIATE UNLOCK ON ACTIVATION:
                        </span>
                        <div style={{ fontSize: '14px', fontWeight: 900, color: '#ffffff' }}>
                          {pendingMovie.title}
                        </div>
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                          IMAX 4K HDR • Dolby Atmos 7.1
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Pricing Breakdown */}
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#cbd5e1' }}>
                      <span>Subscription Tier Price</span>
                      <span>
                        ${billingCycle === 'yearly' ? currentPlan.priceYearly.toFixed(2) : currentPlan.priceMonthly.toFixed(2)}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#34d399' }}>
                      <span>7-Day VIP Free Trial Discount</span>
                      <span>-100% OFF</span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        paddingTop: '10px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                        fontSize: '15px',
                        fontWeight: 900,
                        color: '#ffffff',
                      }}
                    >
                      <span>Due Today:</span>
                      <span style={{ fontSize: '24px', color: '#34d399' }}>$0.00</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#71717a', lineHeight: 1.4 }}>
                      First 7 days completely free. Billed at{' '}
                      ${billingCycle === 'yearly' ? `${currentPlan.priceYearly}/yr` : `${currentPlan.priceMonthly}/mo`}{' '}
                      only after trial ends. Cancel anytime with 1-click.
                    </span>
                  </div>

                  {/* Included Perks Summary */}
                  <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#cbd5e1' }}>
                      <CheckCircle2 size={14} color="#34d399" />
                      <span>{currentPlan.resolution} Cinema Quality</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#cbd5e1' }}>
                      <CheckCircle2 size={14} color="#34d399" />
                      <span>{currentPlan.maxStreams} Simultaneous Device Screens</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#cbd5e1' }}>
                      <CheckCircle2 size={14} color="#34d399" />
                      <span>Zero Ads • LL-HLS Instant Zapping</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Subscriber Details & Instant Activation Payment */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Subscriber Name & Email */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#e2e8f0', marginBottom: '6px' }}>
                      Subscriber Name
                    </label>
                    <input
                      type="text"
                      value={subscriberName}
                      onChange={(e) => setSubscriberName(e.target.value)}
                      placeholder="e.g. Harsh Jain"
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '10px',
                        padding: '10px 14px',
                        color: '#ffffff',
                        fontSize: '13.5px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#e2e8f0', marginBottom: '6px' }}>
                      Subscriber Email
                    </label>
                    <input
                      type="email"
                      value={subscriberEmail}
                      onChange={(e) => setSubscriberEmail(e.target.value)}
                      placeholder="e.g. member@nexora.tv"
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '10px',
                        padding: '10px 14px',
                        color: '#ffffff',
                        fontSize: '13.5px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Payment Method Tabs */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#e2e8f0', marginBottom: '8px' }}>
                      Select Activation / Payment Method
                    </label>
                    
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('instant-pass')}
                        style={{
                          flex: 1,
                          padding: '10px 8px',
                          borderRadius: '10px',
                          backgroundColor: paymentMethod === 'instant-pass' ? 'rgba(225, 29, 72, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                          border: paymentMethod === 'instant-pass' ? '1.5px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#ffffff',
                          fontSize: '12px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                      >
                        <Zap size={14} color="#fda4af" />
                        <span>Instant 1-Click</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        style={{
                          flex: 1,
                          padding: '10px 8px',
                          borderRadius: '10px',
                          backgroundColor: paymentMethod === 'card' ? 'rgba(225, 29, 72, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                          border: paymentMethod === 'card' ? '1.5px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#ffffff',
                          fontSize: '12px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                      >
                        <CreditCard size={14} />
                        <span>Credit Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('wallet')}
                        style={{
                          flex: 1,
                          padding: '10px 8px',
                          borderRadius: '10px',
                          backgroundColor: paymentMethod === 'wallet' ? 'rgba(225, 29, 72, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                          border: paymentMethod === 'wallet' ? '1.5px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#ffffff',
                          fontSize: '12px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                      >
                        <Smartphone size={14} />
                        <span>Google / UPI</span>
                      </button>
                    </div>

                    {/* Method Specific Form */}
                    {paymentMethod === 'instant-pass' && (
                      <div
                        style={{
                          padding: '12px 14px',
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          borderRadius: '10px',
                          fontSize: '12px',
                          color: '#6ee7b7',
                          lineHeight: 1.5,
                        }}
                      >
                        ⚡ <strong>Zero Friction Demo Pass Active:</strong> No payment details required. Click the button below to start streaming immediately in 4K UHD!
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="Card Number"
                          style={{
                            width: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '8px',
                            padding: '9px 12px',
                            color: '#ffffff',
                            fontSize: '13px',
                            outline: 'none',
                          }}
                        />
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            style={{
                              flex: 1,
                              backgroundColor: 'rgba(255, 255, 255, 0.06)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              borderRadius: '8px',
                              padding: '9px 12px',
                              color: '#ffffff',
                              fontSize: '13px',
                              outline: 'none',
                            }}
                          />
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="CVC"
                            style={{
                              flex: 1,
                              backgroundColor: 'rgba(255, 255, 255, 0.06)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              borderRadius: '8px',
                              padding: '9px 12px',
                              color: '#ffffff',
                              fontSize: '13px',
                              outline: 'none',
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'wallet' && (
                      <div
                        style={{
                          padding: '12px 14px',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '10px',
                          fontSize: '12px',
                          color: '#cbd5e1',
                          lineHeight: 1.5,
                        }}
                      >
                        📱 Seamless 1-Tap authentication via <strong>Google Pay, Apple Pay or UPI</strong> supported upon confirmation.
                      </div>
                    )}
                  </div>

                  {/* Trust & Guarantee */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: '#94a3b8' }}>
                    <ShieldCheck size={16} color="#34d399" />
                    <span>256-Bit Encrypted Security • Instant 4K Playback</span>
                  </div>

                  {/* FINAL CHECKOUT ACTIVATION BUTTON: Radiant White with Bold Black Text */}
                  <button
                    type="button"
                    disabled={activating}
                    onClick={handleCompleteActivation}
                    style={{
                      width: '100%',
                      padding: '15px 24px',
                      borderRadius: '14px',
                      backgroundColor: '#ffffff',
                      border: 'none',
                      /* CRITICAL: Font text is JET BLACK (#050507) */
                      color: '#050507',
                      fontSize: '15px',
                      fontWeight: 900,
                      letterSpacing: '0.3px',
                      cursor: activating ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 8px 30px rgba(255, 255, 255, 0.45)',
                      transition: 'all 0.2s ease',
                      marginTop: '6px',
                    }}
                    onMouseEnter={(e) => {
                      if (!activating) e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
                    }}
                    onMouseLeave={(e) => {
                      if (!activating) e.currentTarget.style.transform = 'none';
                    }}
                  >
                    {activating ? (
                      <>
                        <Sparkles size={18} color="#050507" className="animate-spin" />
                        <span>Activating 4K VIP Pass...</span>
                      </>
                    ) : (
                      <>
                        <span>Activate & Stream in 4K Now ($0.00)</span>
                        <ArrowRight size={18} color="#050507" strokeWidth={2.8} />
                      </>
                    )}
                  </button>

                </div>

              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SubscriptionPaywallModal;
