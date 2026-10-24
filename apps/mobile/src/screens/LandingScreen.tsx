import React, { useState, useEffect } from 'react';
import {
  Zap,
  Play,
  ArrowRight,
  Star,
  CheckCircle,
  Tv,
  Smartphone,
  Tablet,
  Radio,
  Activity,
  Volume2,
  ChevronDown,
  Sparkles,
  Shield,
  Film,
  Monitor,
  Flame,
  Award,
  ChevronLeft,
  ChevronRight,
  Cast,
  Check,
  Globe,
  HelpCircle,
  Clock,
  Layers,
} from 'lucide-react';
import {
  MOCK_CONTENT,
  MOCK_CHANNELS,
  MOCK_SUBSCRIPTION_PLANS,
  Channel,
  ContentItem,
} from '@nexora/shared';

interface LandingScreenProps {
  onOpenLiveDemo: (channel?: Channel) => void;
  onOpenActivation: () => void;
  onSwitchToStreaming: () => void;
}

// 4 Hero spotlight items matching the screenshot
const HERO_SPOTLIGHTS = [
  {
    id: 'spotlight-1',
    title: 'Interstellar: Beyond the Horizon',
    tag: 'NEXORA 4K ORIGINAL MASTER',
    rating: '9.4',
    badge: '4K ULTRA HD HDR10+ • DOLBY ATMOS',
    meta: '2024 • Sci-Fi / IMAX • 2h 49m',
    desc: 'When a mysterious tear in spacetime threatens the outer solar system, an elite crew embarks on the final voyage beyond the known universe.',
    backdrop: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1600&auto=format&fit=crop&q=85',
    thumb: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=300&auto=format&fit=crop&q=80',
    genres: ['Sci-Fi', 'Adventure', 'Mystery'],
  },
  {
    id: 'spotlight-2',
    title: 'CyberPulse 2077: Neon Reckoning',
    tag: 'ACTION BLOCKBUSTER',
    rating: '9.1',
    badge: 'IMAX ENHANCED • 120 FPS',
    meta: '2024 • Cyberpunk Thriller • 2h 18m',
    desc: 'In a dystopian mega-city ruled by rogue neural syndicates, an augmented mercenary uncovers a simulation that controls billions of lives.',
    backdrop: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&auto=format&fit=crop&q=85',
    thumb: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&auto=format&fit=crop&q=80',
    genres: ['Action', 'Cyberpunk', 'Sci-Fi'],
  },
  {
    id: 'spotlight-3',
    title: 'Apex Champions League: Grand Final',
    tag: 'LIVE ULTRA HD SPORTS',
    rating: '9.5',
    badge: '4K 60FPS LIVE • MULTI-CAM',
    meta: 'LIVE • International Championship',
    desc: 'The pinnacle of club football. Witness every tackle, tactical masterpiece, and game-winning goal in uncompressed 4K HDR broadcast with 3D stadium audio.',
    backdrop: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1600&auto=format&fit=crop&q=85',
    thumb: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300&auto=format&fit=crop&q=80',
    genres: ['Sports', 'Football', 'Live Event'],
  },
  {
    id: 'spotlight-4',
    title: 'Shadowblade: Streets of Neo-Tokyo',
    tag: 'NEXORA EXCLUSIVE SERIES',
    rating: '9.3',
    badge: 'DOLBY VISION • ATMOS 7.1',
    meta: 'Season 2 • 10 Episodes • Drama',
    desc: 'An underground assassin syndicate must protect the last cybernetic heir amidst an all-out turf war across rain-drenched Neo-Tokyo.',
    backdrop: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600&auto=format&fit=crop&q=85',
    thumb: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=80',
    genres: ['Action', 'Thriller', 'Drama'],
  },
];

// 5 Stacked Originals matching the user's screenshot
const ORIGINALS_DATA = [
  {
    id: 'orig-1',
    title: 'Aethelgard: The Chrono Rift',
    subtitle: 'NEXORA STUDIOS ORIGINAL • SEASON 1',
    desc: 'When temporal fractures shatter the ancient realm of Aethelgard, three warriors must master forbidden chrono-magic to prevent reality collapse.',
    badge: '4K HDR10+',
    rating: '9.3',
    audio: 'Dolby Atmos 7.1',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=85',
  },
  {
    id: 'orig-2',
    title: 'Shadowblade: Streets of Neo-Tokyo',
    subtitle: 'CYBERPUNK ACTION THRILLER',
    desc: 'An underground assassin syndicate navigates holographic rain, high-speed megacity chases, and neural espionage in 2088.',
    badge: 'IMAX ENHANCED',
    rating: '9.1',
    audio: 'Spatial Audio',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=85',
  },
  {
    id: 'orig-3',
    title: 'CyberPulse VCT Global Championship',
    subtitle: 'ESPORTS PREMIER LEAGUE • 120 FPS',
    desc: 'The best competitive gamers on the planet clash in a high-octane tactical arena with multi-angle player cams and instant replay.',
    badge: '120 FPS LIVE',
    rating: '9.6',
    audio: 'Ultra Low-Latency',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=85',
  },
  {
    id: 'orig-4',
    title: 'Apex Champions League 2024',
    subtitle: 'LIVE ULTRA HD SPORTS TRANSMISSION',
    desc: 'Europe and South America’s finest football titans battle for eternal continental glory in pristine 4K 60fps HDR.',
    badge: '4K 60FPS',
    rating: '9.5',
    audio: 'Stadium Atmosphere',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=85',
  },
  {
    id: 'orig-5',
    title: 'Interstellar: Beyond the Horizon',
    subtitle: 'COSMIC IMAX CINEMATIC EXPERIENCE',
    desc: 'Journey through deep spatial anomalies in uncompressed cinematic bitrates. An epic tribute to human resilience.',
    badge: 'DOLBY VISION',
    rating: '9.4',
    audio: 'Dolby Atmos',
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200&auto=format&fit=crop&q=85',
  },
];

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onOpenLiveDemo,
  onOpenActivation,
  onSwitchToStreaming,
}) => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedChannelCategory, setSelectedChannelCategory] = useState('All');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [activationCode, setActivationCode] = useState('');
  const [activationStatus, setActivationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [coverflowIndex, setCoverflowIndex] = useState(2);
  const [equalizerHeights, setEqualizerHeights] = useState([60, 40, 80, 50, 90]);

  // Dynamic audio equalizer effect for Smart TV live mockup
  useEffect(() => {
    const interval = setInterval(() => {
      setEqualizerHeights([
        Math.floor(Math.random() * 65) + 35,
        Math.floor(Math.random() * 65) + 35,
        Math.floor(Math.random() * 65) + 35,
        Math.floor(Math.random() * 65) + 35,
        Math.floor(Math.random() * 65) + 35,
      ]);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate hero spotlight
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SPOTLIGHTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentHero = HERO_SPOTLIGHTS[heroIndex];

  const channelCategories = ['All', 'Sports', 'Movies', 'News', 'Kids'];
  const filteredChannels =
    selectedChannelCategory === 'All'
      ? MOCK_CHANNELS.slice(0, 8)
      : MOCK_CHANNELS.filter(
          (c) => c.category?.toLowerCase() === selectedChannelCategory.toLowerCase()
        ).slice(0, 8);

  const moviesVOD = MOCK_CONTENT.filter((c) => c.type === 'movie');
  const seriesVOD = MOCK_CONTENT.filter((c) => c.type === 'series');

  const handleVerifyCode = () => {
    if (activationCode.trim().length >= 4) {
      setActivationStatus('success');
      setTimeout(() => {
        setActivationStatus('idle');
        setActivationCode('');
      }, 4000);
    } else {
      setActivationStatus('error');
    }
  };

  const faqs = [
    {
      q: 'How do I activate NEXORA on my Smart TV or FireStick?',
      a: 'Install the NEXORA app from your Samsung Tizen, LG webOS, Android TV, Apple TV, or FireStick App Store. Upon launch, note the 6-digit PIN code on your TV screen and enter it in the TV Activation tool above for instant synchronization without passwords.',
    },
    {
      q: 'Does NEXORA require satellite dish, cable box, or special hardware?',
      a: 'Zero satellite dish, coaxial cables, or proprietary hardware required. Everything streams digitally over your existing home Wi-Fi or cellular connection using our Ultra-Low Latency LL-HLS CDN architecture.',
    },
    {
      q: 'Can I stream simultaneously across multiple mobile and TV devices?',
      a: 'Yes! The VIP 4K Ultra pass supports up to 3 concurrent active streams, while the Family Lifetime pass permits up to 5 concurrent streams with cloud sync of your bookmarks, history, and favorite channels.',
    },
    {
      q: 'What internet speed is recommended for 4K 60fps HDR streams?',
      a: 'For Full HD 1080p channels, a standard 10 Mbps connection is ideal. For pristine 4K UHD 60fps HDR with Dolby Atmos 7.1, we recommend a 25 Mbps stable internet or 5G connection.',
    },
    {
      q: 'How frequently is the VOD movie & series library updated?',
      a: 'Our cloud catalog updates daily with theatrical releases, fresh streaming episodes, and live sporting events in uncompressed bitrates.',
    },
  ];

  return (
    <div
      style={{
        backgroundColor: '#050508',
        color: '#f8fafc',
        minHeight: '100%',
        paddingBottom: '32px',
        overflowX: 'hidden',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. TOP CINEMA SPOTLIGHT HERO & THUMBNAIL SWITCHER
      ───────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '480px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '24px 16px 20px',
          background: `
            linear-gradient(180deg, rgba(5,5,8,0.2) 0%, rgba(5,5,8,0.7) 65%, #050508 100%),
            linear-gradient(90deg, rgba(5,5,8,0.95) 0%, rgba(5,5,8,0.5) 60%, transparent 100%),
            url("${currentHero.backdrop}") center/cover no-repeat
          `,
          boxShadow: 'inset 0 -60px 60px #050508',
          transition: 'background 0.5s ease-in-out',
        }}
      >
        {/* Pre-title tag */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 900,
              letterSpacing: '1px',
              color: '#E50914',
              textTransform: 'uppercase',
              background: 'rgba(229, 9, 20, 0.12)',
              border: '1px solid rgba(229, 9, 20, 0.35)',
              padding: '4px 10px',
              borderRadius: '999px',
            }}
          >
            ★ {currentHero.tag}
          </span>
        </div>

        {/* Hero Title */}
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 900,
            lineHeight: 1.15,
            color: '#FFFFFF',
            margin: '0 0 8px 0',
            letterSpacing: '-0.5px',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}
        >
          {currentHero.title}
        </h1>

        {/* Metadata badges */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            color: '#d4d4d8',
            marginBottom: '10px',
          }}
        >
          <span style={{ color: '#E50914', fontWeight: 800 }}>★ {currentHero.rating}</span>
          <span>•</span>
          <span
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '10px',
            }}
          >
            4K ULTRA HD
          </span>
          <span
            style={{
              backgroundColor: 'rgba(229, 9, 20, 0.25)',
              border: '1px solid rgba(229, 9, 20, 0.5)',
              color: '#ff6b6b',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '10px',
            }}
          >
            DOLBY ATMOS
          </span>
          <span>•</span>
          <span>{currentHero.meta}</span>
        </div>

        {/* Synopsis */}
        <p
          style={{
            fontSize: '12px',
            lineHeight: 1.5,
            color: '#a1a1aa',
            margin: '0 0 16px 0',
            maxWidth: '540px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {currentHero.desc}
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
          <button
            onClick={onSwitchToStreaming}
            style={{
              flex: 1,
              maxWidth: '180px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              backgroundColor: '#FFFFFF',
              color: '#050508',
              border: 'none',
              borderRadius: '999px',
              padding: '11px 18px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(255, 255, 255, 0.25)',
              transition: 'transform 0.15s ease',
            }}
          >
            <Play size={14} color="#E50914" fill="#E50914" />
            <span>Start Watching</span>
          </button>

          <button
            onClick={() => onOpenLiveDemo(MOCK_CHANNELS[0])}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              borderRadius: '999px',
              padding: '11px 16px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Film size={14} />
            <span>Trailer</span>
          </button>

          <button
            onClick={onOpenActivation}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#d4d4d8',
              borderRadius: '999px',
              padding: '11px 14px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Details
          </button>
        </div>

        {/* 4 Thumbnail Switcher Rail */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
            paddingTop: '8px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {HERO_SPOTLIGHTS.map((item, idx) => {
            const isActive = heroIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => setHeroIndex(idx)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    height: '46px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    position: 'relative',
                    border: isActive ? '2px solid #E50914' : '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: isActive ? '0 0 12px rgba(229, 9, 20, 0.5)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <img
                    src={item.thumb}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        backgroundColor: '#E50914',
                      }}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. CRIMSON AMBIENT AURA & HEADLINE
      ───────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          padding: '36px 16px 28px',
          textAlign: 'center',
          background: `
            radial-gradient(ellipse 90% 50% at 50% 10%, rgba(229, 9, 20, 0.25), transparent 75%)
          `,
        }}
      >
        {/* Pre-title badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(229, 9, 20, 0.1)',
            border: '1px solid rgba(229, 9, 20, 0.35)',
            borderRadius: '999px',
            padding: '4px 12px',
            fontSize: '11px',
            fontWeight: 800,
            color: '#E50914',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#E50914',
              boxShadow: '0 0 8px #E50914',
            }}
          />
          The Ultimate 4K IPTV & Smart TV Platform
        </div>

        {/* Big Headline */}
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 900,
            lineHeight: 1.2,
            margin: '0 0 10px 0',
            letterSpacing: '-0.5px',
          }}
        >
          Stream 1,420+ Live Channels
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #E50914 0%, #ff6b6b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Zero Buffering & Instant Zapping
          </span>
        </h2>

        <p
          style={{
            fontSize: '13px',
            color: '#a1a1aa',
            lineHeight: 1.6,
            maxWidth: '520px',
            margin: '0 auto 20px',
          }}
        >
          Engineered with an ultra-low latency LL-HLS broadcast engine, HDR10+ cinema mastering, and
          instant TV screen activation for the whole family.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
            onClick={onSwitchToStreaming}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#E50914',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '999px',
              padding: '12px 22px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(229, 9, 20, 0.45)',
            }}
          >
            <span>Start 7-Day Free Trial</span>
            <ArrowRight size={15} />
          </button>

          <button
            onClick={onOpenActivation}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              borderRadius: '999px',
              padding: '12px 18px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Tv size={15} color="#E50914" />
            <span>Activate Smart TV</span>
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. SMART TV 3D SHOWCASE MOCKUP
      ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '16px 16px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#E50914',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}
          >
            UNIFIED CROSS-PLATFORM INTERFACE
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 6px 0' }}>
            The World's Most Fluid Streaming Interface
          </h3>
          <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>
            Engineered for LG webOS, Samsung Tizen, Apple TV 4K, Android TV, and Fire TV.
          </p>
        </div>

        {/* TV Outer Frame */}
        <div
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            borderRadius: '16px',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 35px rgba(229, 9, 20, 0.25)',
            overflow: 'hidden',
            backgroundColor: '#0c0d14',
            position: 'relative',
          }}
        >
          {/* Top TV status bar */}
          <div
            style={{
              backgroundColor: '#07080c',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '10px',
              color: '#71717a',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#E50914',
                }}
              />
              <span style={{ fontWeight: 800, color: '#f4f4f5' }}>NEXORA TV OS 4.2</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>4K 60FPS</span>
              <span style={{ color: '#22c55e' }}>● 18ms LL-HLS</span>
              <span>10:42 PM</span>
            </div>
          </div>

          {/* TV Screen Content Preview */}
          <div
            style={{
              padding: '14px',
              background: `
                radial-gradient(circle at 80% 20%, rgba(229, 9, 20, 0.2), transparent 50%),
                #0c0d14
              `,
            }}
          >
            {/* Live TV Hero Banner inside mockup */}
            <div
              style={{
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
                height: '140px',
                marginBottom: '12px',
                background: `
                  linear-gradient(180deg, transparent 20%, rgba(5,5,8,0.9) 100%),
                  url("https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80") center/cover no-repeat
                `,
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(229, 9, 20, 0.9)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '9px',
                  fontWeight: 900,
                  color: '#FFFFFF',
                }}
              >
                ● LIVE BROADCAST
              </div>

              {/* Dynamic Equalizer in TV Screen */}
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '3px',
                  height: '16px',
                }}
              >
                {equalizerHeights.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: '3px',
                      height: `${h}%`,
                      backgroundColor: '#E50914',
                      borderRadius: '1px',
                      transition: 'height 0.3s ease',
                    }}
                  />
                ))}
              </div>

              <div style={{ fontSize: '10px', color: '#E50914', fontWeight: 800 }}>#101 ESPN 4K UHD</div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#FFFFFF' }}>
                UEFA Champions League: Semifinal
              </div>
            </div>

            {/* TV Screen Mini Channels Rail */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {MOCK_CHANNELS.slice(0, 4).map((ch) => (
                <div
                  key={ch.id}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '8px 6px',
                    textAlign: 'center',
                  }}
                >
                  <img
                    src={ch.logo}
                    alt={ch.name}
                    style={{ width: '28px', height: '28px', borderRadius: '50%', marginBottom: '4px' }}
                  />
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {ch.name}
                  </div>
                  <div style={{ fontSize: '8px', color: '#E50914', fontWeight: 700 }}>
                    {ch.resolution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TV Stand / Base */}
          <div
            style={{
              height: '8px',
              backgroundColor: '#1f2438',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. 1,420+ LIVE CHANNELS SECTION & CATEGORY FILTER
      ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#E50914',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: '2px',
              }}
            >
              ZERO-BUFFERING LL-HLS BROADCASTS
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 900, margin: 0 }}>
              1,420+ Live Channels
            </h3>
          </div>
          <button
            onClick={() => onOpenLiveDemo(MOCK_CHANNELS[0])}
            style={{
              background: 'none',
              border: 'none',
              color: '#E50914',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            View EPG →
          </button>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px' }}>
          {channelCategories.map((cat) => {
            const isActive = selectedChannelCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedChannelCategory(cat)}
                style={{
                  border: isActive ? '1px solid #E50914' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '999px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  backgroundColor: isActive ? '#E50914' : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#FFFFFF' : '#a1a1aa',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 0 12px rgba(229, 9, 20, 0.35)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Live Channel Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredChannels.map((ch) => (
            <div
              key={ch.id}
              onClick={() => onOpenLiveDemo(ch)}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <img
                src={ch.logo}
                alt={ch.name}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 900,
                      backgroundColor: '#E50914',
                      color: '#FFFFFF',
                      padding: '2px 5px',
                      borderRadius: '3px',
                    }}
                  >
                    LIVE
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
                    #{ch.channelNumber} {ch.name}
                  </span>
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 800,
                      color: '#a1a1aa',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      padding: '2px 5px',
                      borderRadius: '3px',
                      marginLeft: 'auto',
                    }}
                  >
                    {ch.resolution}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: '#71717a',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: '6px',
                  }}
                >
                  {ch.currentProgram?.title || 'Continuous Airing'}
                </div>
                {/* Progress bar */}
                <div
                  style={{
                    height: '3px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${ch.currentProgram?.progressPercent || 45}%`,
                      height: '100%',
                      backgroundColor: '#E50914',
                    }}
                  />
                </div>
              </div>
              <button
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(229, 9, 20, 0.15)',
                  border: '1px solid rgba(229, 9, 20, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Play size={14} color="#E50914" fill="#E50914" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. NEXORA ORIGINALS & PREMIERES (5 STACKED CARDS)
      ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '24px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '18px' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#E50914',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}
          >
            ORIGINAL PRODUCTIONS & EXCLUSIVE PREMIERES
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 6px 0' }}>
            NEXORA Masterworks: Cinematic Excellence
          </h3>
          <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>
            Award-winning epics mastered in 4K HDR10+ and Dolby Atmos 7.1.
          </p>
        </div>

        {/* 5 Stacked Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {ORIGINALS_DATA.map((item) => (
            <div
              key={item.id}
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(229, 9, 20, 0.3)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px rgba(229, 9, 20, 0.1)',
                position: 'relative',
              }}
            >
              {/* Card Banner Image */}
              <div
                style={{
                  height: '160px',
                  position: 'relative',
                  background: `
                    linear-gradient(180deg, transparent 30%, #050508 100%),
                    url("${item.image}") center/cover no-repeat
                  `,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: '#E50914',
                    color: '#FFFFFF',
                    fontSize: '9px',
                    fontWeight: 900,
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {item.badge}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(5, 5, 8, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#facc15',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  ★ {item.rating}
                </div>
              </div>

              {/* Card Text Content */}
              <div style={{ padding: '0 14px 14px 14px' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#E50914', marginBottom: '2px' }}>
                  {item.subtitle}
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 900, color: '#FFFFFF', margin: '0 0 6px 0' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '11px', color: '#a1a1aa', lineHeight: 1.45, margin: '0 0 12px 0' }}>
                  {item.desc}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 600 }}>
                    Audio: {item.audio}
                  </span>
                  <button
                    onClick={onSwitchToStreaming}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      backgroundColor: '#FFFFFF',
                      color: '#050508',
                      border: 'none',
                      borderRadius: '999px',
                      padding: '7px 14px',
                      fontSize: '11px',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    <Play size={11} color="#E50914" fill="#E50914" />
                    <span>Watch in 4K</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. BLOCKBUSTER VOD & 4K CINEMA (COVERFLOW CAROUSEL)
      ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '24px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#E50914',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}
          >
            ON-DEMAND CINEMATIC RELEASES
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 6px 0' }}>
            10,000+ Movies & Series in 4K HDR
          </h3>
          <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>
            Every title available in uncompressed multi-bitrate streaming.
          </p>
        </div>

        {/* 3D Coverflow Container */}
        <div style={{ position: 'relative', margin: '14px 0 20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              overflow: 'hidden',
              padding: '10px 0',
            }}
          >
            {moviesVOD.slice(0, 5).map((movie, idx) => {
              const isCenter = idx === coverflowIndex;
              return (
                <div
                  key={movie.id}
                  onClick={() => setCoverflowIndex(idx)}
                  style={{
                    width: isCenter ? '140px' : '95px',
                    height: isCenter ? '205px' : '145px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    transform: isCenter ? 'scale(1.08)' : 'scale(0.9)',
                    opacity: isCenter ? 1 : 0.6,
                    border: isCenter ? '2px solid #E50914' : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: isCenter
                      ? '0 12px 28px rgba(0, 0, 0, 0.8), 0 0 20px rgba(229, 9, 20, 0.4)'
                      : 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {isCenter && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, transparent 40%, rgba(5,5,8,0.9) 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '8px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '11px',
                          fontWeight: 900,
                          color: '#FFFFFF',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {movie.title}
                      </div>
                      <div style={{ fontSize: '9px', color: '#E50914', fontWeight: 800 }}>
                        ★ {movie.rating} • {movie.quality}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows for Coverflow */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '10px' }}>
            <button
              onClick={() => setCoverflowIndex((prev) => Math.max(0, prev - 1))}
              disabled={coverflowIndex === 0}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: coverflowIndex === 0 ? 'not-allowed' : 'pointer',
                opacity: coverflowIndex === 0 ? 0.3 : 1,
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCoverflowIndex((prev) => Math.min(4, prev + 1))}
              disabled={coverflowIndex === 4}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: coverflowIndex === 4 ? 'not-allowed' : 'pointer',
                opacity: coverflowIndex === 4 ? 0.3 : 1,
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. BINGE-WORTHY TV SERIES RAIL
      ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#E50914',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              CRITICALLY ACCLAIMED DRAMAS
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 900, margin: '2px 0 0 0' }}>
              Binge-Worthy TV Shows
            </h3>
          </div>
          <button
            onClick={onSwitchToStreaming}
            style={{
              background: 'none',
              border: 'none',
              color: '#E50914',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Explore All →
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px' }}>
          {seriesVOD.map((item) => (
            <div
              key={item.id}
              onClick={onSwitchToStreaming}
              style={{
                width: '120px',
                flexShrink: 0,
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  height: '170px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  marginBottom: '6px',
                  position: 'relative',
                }}
              >
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '6px',
                    left: '6px',
                    backgroundColor: 'rgba(5, 5, 8, 0.85)',
                    color: '#E50914',
                    fontSize: '9px',
                    fontWeight: 900,
                    padding: '2px 5px',
                    borderRadius: '3px',
                  }}
                >
                  ★ {item.rating}
                </div>
              </div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.title}
              </div>
              <div style={{ fontSize: '10px', color: '#71717a' }}>{item.releaseYear} • Series</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. MULTI-DEVICE COMPATIBILITY SHOWCASE
      ───────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '28px 16px',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '18px' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#E50914',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}
          >
            STREAM EVERYWHERE
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 6px 0' }}>
            Your Favorite Screen, Fully Unified
          </h3>
          <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>
            One single subscription powers your television, phone, and tablet simultaneously.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {[
            { name: 'Smart TV & Tizen', icon: Tv, desc: 'LG, Samsung, Android TV' },
            { name: 'Apple TV & FireStick', icon: Monitor, desc: 'Dedicated remote 4K app' },
            { name: 'iPhone & Android', icon: Smartphone, desc: 'Offline downloads & sync' },
            { name: 'iPad & Web Browser', icon: Tablet, desc: 'Full screen multi-view' },
          ].map((dev, i) => {
            const Icon = dev.icon;
            return (
              <div
                key={i}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '14px 12px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(229, 9, 20, 0.15)',
                    border: '1px solid rgba(229, 9, 20, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 8px',
                  }}
                >
                  <Icon size={18} color="#E50914" />
                </div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF', marginBottom: '2px' }}>
                  {dev.name}
                </div>
                <div style={{ fontSize: '10px', color: '#71717a' }}>{dev.desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. 3-STEP SMART TV ACTIVATION WITH PIN INPUT
      ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '32px 16px' }}>
        <div
          style={{
            backgroundColor: 'rgba(229, 9, 20, 0.04)',
            border: '1px solid rgba(229, 9, 20, 0.3)',
            borderRadius: '16px',
            padding: '20px 16px',
            boxShadow: '0 0 25px rgba(229, 9, 20, 0.15)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 900,
                color: '#E50914',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              ZERO PASSWORDS REQUIRED
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 900, margin: '0 0 6px 0' }}>
              Connect & Stream on Your TV in 60s
            </h3>
            <p style={{ fontSize: '12px', color: '#a1a1aa', margin: 0 }}>
              Launch NEXORA on your TV, get your 6-digit PIN, and enter it below.
            </p>
          </div>

          {/* 3 Step Indicators */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
            {[
              { num: '1', text: 'Open the NEXORA app on your Smart TV or FireStick' },
              { num: '2', text: 'Locate the 6-digit screen activation PIN code' },
              { num: '3', text: 'Enter PIN below for instant cloud authorization' },
            ].map((step) => (
              <div
                key={step.num}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  padding: '8px 10px',
                  borderRadius: '8px',
                }}
              >
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: '#E50914',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {step.num}
                </div>
                <span style={{ fontSize: '11px', color: '#d4d4d8' }}>{step.text}</span>
              </div>
            ))}
          </div>

          {/* PIN Input & Submit */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="e.g. 782-901"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
              maxLength={7}
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 800,
                letterSpacing: '2px',
                textAlign: 'center',
                outline: 'none',
              }}
            />
            <button
              onClick={handleVerifyCode}
              style={{
                backgroundColor: '#E50914',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 0 15px rgba(229, 9, 20, 0.4)',
              }}
            >
              Verify PIN
            </button>
          </div>

          {activationStatus === 'success' && (
            <div
              style={{
                marginTop: '12px',
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                borderRadius: '8px',
                padding: '10px',
                fontSize: '12px',
                color: '#4ade80',
                textAlign: 'center',
                fontWeight: 700,
              }}
            >
              ✓ Television paired successfully! Enjoy 4K HDR live streaming.
            </div>
          )}

          {activationStatus === 'error' && (
            <div
              style={{
                marginTop: '12px',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '8px',
                padding: '10px',
                fontSize: '12px',
                color: '#f87171',
                textAlign: 'center',
                fontWeight: 700,
              }}
            >
              ✕ Please enter a valid 6-digit screen activation PIN code.
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. SUBSCRIPTION PLANS MATRIX
      ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '24px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#E50914',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}
          >
            PRICING & PASSES
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 6px 0' }}>
            Choose the Perfect Plan for Your Setup
          </h3>
          <p style={{ fontSize: '12px', color: '#71717a', margin: '0 0 14px 0' }}>
            No long-term commitments. Cancel anytime with a single click.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '999px',
              padding: '3px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                border: 'none',
                borderRadius: '999px',
                padding: '6px 14px',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
                backgroundColor: billingCycle === 'monthly' ? '#E50914' : 'transparent',
                color: billingCycle === 'monthly' ? '#FFFFFF' : '#a1a1aa',
                boxShadow: billingCycle === 'monthly' ? '0 0 12px rgba(229, 9, 20, 0.35)' : 'none',
              }}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              style={{
                border: 'none',
                borderRadius: '999px',
                padding: '6px 14px',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
                backgroundColor: billingCycle === 'yearly' ? '#E50914' : 'transparent',
                color: billingCycle === 'yearly' ? '#FFFFFF' : '#a1a1aa',
                boxShadow: billingCycle === 'yearly' ? '0 0 12px rgba(229, 9, 20, 0.35)' : 'none',
              }}
            >
              Yearly (Save 35%)
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            {
              id: 'starter',
              title: 'HD Starter',
              price: billingCycle === 'monthly' ? '$9.99' : '$79.99',
              period: billingCycle === 'monthly' ? '/mo' : '/year',
              popular: false,
              features: [
                '1,420+ Live TV Channels (1080p Full HD)',
                '5,000+ VOD Movies & Series',
                '1 Concurrent TV / Mobile Stream',
                '7-Day Electronic Program Guide (EPG)',
                'Standard Low-Latency CDN',
              ],
            },
            {
              id: 'vip',
              title: 'VIP 4K Ultra',
              price: billingCycle === 'monthly' ? '$14.99' : '$119.99',
              period: billingCycle === 'monthly' ? '/mo' : '/year',
              popular: true,
              features: [
                'All 1,420+ Channels in Pristine 4K 60fps',
                '10,000+ Blockbusters & NEXORA Originals',
                '3 Simultaneous Screens (Living Room + Mobile)',
                'Dolby Atmos 7.1 & Spatial Audio',
                'Ultra Low-Latency LL-HLS Edge CDN',
                'Smart TV Instant PIN Pairing',
              ],
            },
            {
              id: 'max',
              title: 'ULTRA 4K VIP Max',
              price: billingCycle === 'monthly' ? '$21.99' : '$179.99',
              period: billingCycle === 'monthly' ? '/mo' : '/year',
              popular: false,
              features: [
                'Unlimited 4K HDR10+ & IMAX Streams',
                '5 Simultaneous Family Screens',
                'Multi-Screen Sports PIP View (4 Matches)',
                'Priority VIP CDN Routing & No-Throttle',
                'Offline Downloads on Mobile & Tablets',
                '24/7 Dedicated Concierge Support',
              ],
            },
          ].map((plan) => (
            <div
              key={plan.id}
              style={{
                backgroundColor: plan.popular ? 'rgba(229, 9, 20, 0.05)' : 'rgba(255, 255, 255, 0.03)',
                border: plan.popular ? '2px solid #E50914' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '20px 16px',
                position: 'relative',
                boxShadow: plan.popular ? '0 10px 30px rgba(229, 9, 20, 0.25)' : 'none',
              }}
            >
              {plan.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#E50914',
                    color: '#FFFFFF',
                    fontSize: '10px',
                    fontWeight: 900,
                    letterSpacing: '1px',
                    padding: '3px 12px',
                    borderRadius: '999px',
                    boxShadow: '0 0 10px rgba(229, 9, 20, 0.5)',
                  }}
                >
                  MOST POPULAR
                </div>
              )}

              <div style={{ fontSize: '16px', fontWeight: 900, color: '#FFFFFF', marginBottom: '4px' }}>
                {plan.title}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '14px' }}>
                <span
                  style={{
                    fontSize: '28px',
                    fontWeight: 900,
                    color: plan.popular ? '#E50914' : '#FFFFFF',
                  }}
                >
                  {plan.price}
                </span>
                <span style={{ fontSize: '12px', color: '#71717a' }}>{plan.period}</span>
              </div>

              {/* Feature list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                {plan.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#d4d4d8' }}>
                    <CheckCircle size={13} color="#E50914" style={{ flexShrink: 0 }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onSwitchToStreaming}
                style={{
                  width: '100%',
                  backgroundColor: plan.popular ? '#E50914' : '#FFFFFF',
                  color: plan.popular ? '#FFFFFF' : '#050508',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '11px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: plan.popular ? '0 0 15px rgba(229, 9, 20, 0.4)' : 'none',
                }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          11. FAQ ACCORDION
      ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '24px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#E50914',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}
          >
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 6px 0' }}>
            Got Questions? We've Got Answers
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqs.map((faq, idx) => {
            const isExpanded = expandedFaqIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: isExpanded ? '1px solid #E50914' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  transition: 'all 0.15s ease',
                }}
              >
                <button
                  onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: 'none',
                    background: 'transparent',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    color="#E50914"
                    style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0,
                      marginLeft: '8px',
                    }}
                  />
                </button>
                {isExpanded && (
                  <div
                    style={{
                      padding: '0 14px 14px 14px',
                      fontSize: '12px',
                      color: '#a1a1aa',
                      lineHeight: 1.5,
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      paddingTop: '10px',
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          12. BRANDING FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer
        style={{
          marginTop: '32px',
          padding: '24px 16px 20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: '#030407',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '6px',
              backgroundColor: '#E50914',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: '14px',
            }}
          >
            N
          </div>
          <span style={{ fontSize: '16px', fontWeight: 900, letterSpacing: '1px', color: '#FFFFFF' }}>
            NEX<span style={{ color: '#E50914' }}>ORA</span>
          </span>
        </div>

        <p style={{ fontSize: '11px', color: '#71717a', margin: '0 0 12px 0' }}>
          Next-Generation 4K IPTV & Cinematic Unified Smart TV Platform.
        </p>

        {/* Global Edge Nodes Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.25)',
            borderRadius: '999px',
            padding: '4px 12px',
            fontSize: '10px',
            color: '#4ade80',
            fontWeight: 700,
            marginBottom: '16px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
            }}
          />
          All 38 Global LL-HLS Edge Clusters Active
        </div>

        <div style={{ fontSize: '10px', color: '#52525b' }}>
          © 2026 NEXORA Entertainment Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
