import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import {
  MOCK_CHANNELS,
  MOCK_CONTENT,
  MOCK_SUBSCRIPTION_PLANS,
  Channel,
  ContentItem,
} from '@nexora/shared';

const { width } = Dimensions.get('window');

interface LandingShowcaseViewProps {
  onOpenLiveDemo: (channel?: Channel) => void;
  onOpenActivation: () => void;
  onSwitchToStreaming: () => void;
}

export const LandingShowcaseView: React.FC<LandingShowcaseViewProps> = ({
  onOpenLiveDemo,
  onOpenActivation,
  onSwitchToStreaming,
}) => {
  // Hero slides data
  const heroSlides = [
    {
      id: 'slide-01',
      title: 'Interstellar: Beyond the Horizon',
      tag: 'NEXORA EXCLUSIVE PREMIERE',
      meta: '16+ • 2h 45m • 2024 • Sci-Fi • Adventure • 4K HDR • ★ 9.3',
      description:
        'Humanity ventures into the uncharted Andromeda rift in search of habitable worlds beyond the dying solar system. An epic voyage through cosmic wormholes.',
      backdropUrl:
        'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200&auto=format&fit=crop&q=80',
      thumbUrl:
        'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 'slide-02',
      title: 'Aethelgard: The Chrono Rift',
      tag: 'ORIGINAL BLOCKBUSTER',
      meta: '16+ • 2h 28m • 2026 • Sci-Fi • Action • 4K HDR • ★ 9.4',
      description:
        'When a fracture in the quantum continuum collapses orbital station Aegis, lead chronologist Dr. Lyra Vance must navigate five parallel timelines simultaneously.',
      backdropUrl:
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
      thumbUrl:
        'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 'slide-03',
      title: 'Apex Champions League: Final 2026',
      tag: 'LIVE 4K SPORTING EVENT',
      meta: 'ALL • Live • 2026 • Sports • Football • 4K 60FPS • ★ 9.8',
      description:
        'Real Madrid battles Manchester City in the most anticipated European clash of the decade with immersive Dolby Atmos 7.1 spatial stadium audio.',
      backdropUrl:
        'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
      thumbUrl:
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 'slide-04',
      title: 'Neon Syndicate: Cyber Dynasty',
      tag: 'EXCLUSIVE TV SERIES',
      meta: '18+ • 3 Seasons • 2025 • Cyberpunk • Crime • 4K HDR • ★ 8.9',
      description:
        'In a rain-drenched Neo-Seoul run by megacorporations, an underground cabal of rogue cyber-mercenaries wages a shadow war against neural cartels.',
      backdropUrl:
        'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80',
      thumbUrl:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&auto=format&fit=crop&q=80',
    },
  ];

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlide = heroSlides[activeSlideIndex];

  // Originals & Premieres
  const originals = [
    {
      id: 'orig-01',
      title: 'Aethelgard: The Chrono Rift',
      badge: 'TOP PREMIERE',
      genres: 'Sci-Fi • Action • Mind-Bender',
      rating: '9.4',
      synopsis:
        'Five timelines collide as orbital station Aegis breaks the barrier of space-time.',
      image:
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'orig-02',
      title: 'Shadowblade: Chronicles of Kyoto',
      badge: 'ORIGINAL SERIES',
      genres: 'Action • Martial Arts • History',
      rating: '9.1',
      synopsis:
        'An ancient ronin brotherhood fights for honor in the neon-shadowed alleys of feudal neo-Kyoto.',
      image:
        'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'orig-03',
      title: 'CyberPulse VCT Finals: The Grand Showcase',
      badge: 'LIVE ESPORTS',
      genres: 'eSports • Gaming • Competitive',
      rating: '9.6',
      synopsis:
        'Fnatic vs Sentinels in the thrilling Valorant World Championship grand finals.',
      image:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'orig-04',
      title: 'Apex Champions League: Road to Munich',
      badge: 'EXCLUSIVE DOCUMENTARY',
      genres: 'Sports • Football • Documentary',
      rating: '8.9',
      synopsis:
        'Behind-the-scenes access to the locker rooms of the world’s most elite football clubs.',
      image:
        'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'orig-05',
      title: 'Interstellar: Beyond the Horizon',
      badge: '4K BLOCKBUSTER',
      genres: 'Sci-Fi • Space • Mystery',
      rating: '9.3',
      synopsis:
        'The deep-space probe discovers a gateway at the edge of the solar system.',
      image:
        'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&auto=format&fit=crop&q=80',
    },
  ];

  // State
  const [selectedChannelCategory, setSelectedChannelCategory] = useState('All');
  const [coverflowIndex, setCoverflowIndex] = useState(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [activationCode, setActivationCode] = useState('');
  const [activationStatus, setActivationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Equalizer animations
  const eqBar1 = useRef(new Animated.Value(6)).current;
  const eqBar2 = useRef(new Animated.Value(14)).current;
  const eqBar3 = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    const eqLoop = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(eqBar1, { toValue: 18, duration: 320, useNativeDriver: false }),
          Animated.timing(eqBar1, { toValue: 4, duration: 420, useNativeDriver: false }),
        ]),
        Animated.sequence([
          Animated.timing(eqBar2, { toValue: 6, duration: 280, useNativeDriver: false }),
          Animated.timing(eqBar2, { toValue: 22, duration: 380, useNativeDriver: false }),
        ]),
        Animated.sequence([
          Animated.timing(eqBar3, { toValue: 20, duration: 350, useNativeDriver: false }),
          Animated.timing(eqBar3, { toValue: 8, duration: 320, useNativeDriver: false }),
        ]),
      ])
    );
    eqLoop.start();
    return () => eqLoop.stop();
  }, []);

  const channelCategories = ['All', 'Sports', 'Movies', 'News', 'Kids'];
  const filteredChannels =
    selectedChannelCategory === 'All'
      ? MOCK_CHANNELS
      : MOCK_CHANNELS.filter(
          (c) => c.category.toLowerCase() === selectedChannelCategory.toLowerCase()
        );

  const movies = MOCK_CONTENT.filter((c) => c.type === 'movie');
  const series = MOCK_CONTENT.filter((c) => c.type === 'series');

  const handlePairSubmit = () => {
    if (!activationCode.trim() || activationCode.length < 4) {
      setActivationStatus('error');
      return;
    }
    setActivationStatus('success');
    setTimeout(() => {
      setActivationStatus('idle');
      setActivationCode('');
    }, 4000);
  };

  const faqs = [
    {
      q: 'How does Smart TV activation work?',
      a: 'Install the NEXORA app on your Samsung Tizen, LG webOS, Android TV, Apple TV, or Fire TV. Open the app to view your 6-digit PIN code on screen, enter it here, and your 4K stream unlocks immediately with zero passwords.',
    },
    {
      q: 'What internet speed is needed for 4K 60FPS?',
      a: 'Our next-generation LL-HLS compression delivers flawless 4K HDR streams at just 25 Mbps, and 1080p Full HD streams at 10 Mbps with zero buffering.',
    },
    {
      q: 'Can I watch on multiple devices at once?',
      a: 'Yes! The VIP 4K Ultra plan supports up to 4 simultaneous screens across Smart TVs, iPhones, Android phones, and tablets with cloud sync.',
    },
    {
      q: 'Are there any hidden fees or hardware boxes required?',
      a: 'Zero satellite dishes, zero coaxial cables, and zero proprietary hardware boxes required. Stream everything over your existing Wi-Fi or cellular network.',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ======================================================== */}
      {/* 1. TOP CINEMATIC SPOTLIGHT HERO (AS IN WEB SCREENSHOT) */}
      {/* ======================================================== */}
      <View style={styles.topSpotlightContainer}>
        <Image source={{ uri: activeSlide.backdropUrl }} style={styles.spotlightBackdrop} />
        <View style={styles.spotlightDarkGradient} />

        {/* Hero Info Overlay */}
        <View style={styles.spotlightContent}>
          <View style={styles.premiereTag}>
            <View style={styles.premiereTagDot} />
            <Text style={styles.premiereTagText}>{activeSlide.tag}</Text>
          </View>

          <Text style={styles.spotlightTitle}>{activeSlide.title}</Text>
          <Text style={styles.spotlightMeta}>{activeSlide.meta}</Text>
          <Text style={styles.spotlightDesc} numberOfLines={2}>
            {activeSlide.description}
          </Text>

          {/* Hero Action Buttons */}
          <View style={styles.spotlightButtonsRow}>
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => onOpenLiveDemo(MOCK_CHANNELS[0])}
              style={styles.btnStartWatching}
            >
              <Text style={styles.btnStartWatchingText}>▶ Start Watching</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onOpenActivation}
              style={styles.btnHeroGlass}
            >
              <Text style={styles.btnHeroGlassText}>Trailer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onSwitchToStreaming}
              style={styles.btnHeroGlass}
            >
              <Text style={styles.btnHeroGlassText}>Details</Text>
            </TouchableOpacity>
          </View>

          {/* 4 Thumbnail Switcher Slides */}
          <View style={styles.thumbsRailRow}>
            {heroSlides.map((slide, idx) => {
              const isSelected = activeSlideIndex === idx;
              return (
                <TouchableOpacity
                  key={slide.id}
                  activeOpacity={0.85}
                  onPress={() => setActiveSlideIndex(idx)}
                  style={[
                    styles.thumbBox,
                    isSelected && styles.thumbBoxActive,
                  ]}
                >
                  <Image source={{ uri: slide.thumbUrl }} style={styles.thumbImage} />
                  {isSelected && <View style={styles.thumbIndicatorLine} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {/* ======================================================== */}
      {/* 2. CRIMSON AMBIENT AURA & PLATFORM HEADLINE (WEB HERO)   */}
      {/* ======================================================== */}
      <View style={styles.platformHeroSection}>
        {/* Ambient Crimson Glow Aura */}
        <View style={styles.crimsonAuraGlow} />

        <View style={styles.engineBadgePill}>
          <Text style={styles.engineBadgeText}>● ULTRA-LOW LATENCY STREAMING ENGINE</Text>
        </View>

        <Text style={styles.platformMainTitle}>
          The Ultimate 4K IPTV &{'\n'}
          <Text style={styles.crimsonGlowText}>Unified Smart TV Platform</Text>
        </Text>

        <Text style={styles.platformSubtitle}>
          Stream 1,420+ live HD/4K channels, 50,000+ VOD blockbusters, and premium series on
          any Smart TV or mobile device with zero buffering.
        </Text>

        <View style={styles.platformCtaRow}>
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={onOpenActivation}
            style={styles.btnCrimsonPrimary}
          >
            <Text style={styles.btnCrimsonPrimaryText}>Start Free 7-Day Trial →</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onOpenActivation}
            style={styles.btnGlassPair}
          >
            <Text style={styles.btnGlassPairText}>Activate Smart TV</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ======================================================== */}
      {/* 3. SMART TV 3D SHOWCASE (FLUID STREAMING INTERFACE)      */}
      {/* ======================================================== */}
      <View style={styles.sectionBlock}>
        <View style={styles.sectionHeaderCentered}>
          <Text style={styles.subTagRed}>SMART TV REVOLUTION</Text>
          <Text style={styles.sectionMainTitle}>The World's Most Fluid Streaming Interface</Text>
          <Text style={styles.sectionMutedSub}>
            Engineered for 85" 4K OLED Displays, Apple TV 4K, and Android TV.
          </Text>
        </View>

        {/* TV Mockup Frame */}
        <View style={styles.tvFrameContainer}>
          <View style={styles.tvBezel}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&auto=format&fit=crop&q=80',
              }}
              style={styles.tvScreenImage}
            />
            <View style={styles.tvScreenDarkOverlay} />

            {/* Simulated TV Interface Elements */}
            <View style={styles.tvUiOverlay}>
              <View style={styles.tvUiTop}>
                <View style={styles.tvLiveDotBadge}>
                  <Text style={styles.tvLiveDotText}>● LIVE 4K HDR</Text>
                </View>
                <Text style={styles.tvDolbyText}>Dolby Atmos 7.1</Text>
              </View>

              <View style={styles.tvUiBottom}>
                <Text style={styles.tvMatchTitle}>UEFA Champions League • Madrid vs Man City</Text>
                <View style={styles.eqRow}>
                  <Animated.View style={[styles.eqBar, { height: eqBar1 }]} />
                  <Animated.View style={[styles.eqBar, { height: eqBar2 }]} />
                  <Animated.View style={[styles.eqBar, { height: eqBar3 }]} />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.tvStand} />
        </View>
      </View>

      {/* ======================================================== */}
      {/* 4. 1,420+ LIVE CHANNELS & 24/7 PREMIUM STREAMS           */}
      {/* ======================================================== */}
      <View style={styles.sectionBlock}>
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.subTagRed}>INSTANT CHANNEL TUNING</Text>
            <Text style={styles.sectionMainTitle}>1,420+ Live Channels & Streams</Text>
          </View>
          <TouchableOpacity onPress={() => onOpenLiveDemo()}>
            <Text style={styles.viewAllRedText}>View All ›</Text>
          </TouchableOpacity>
        </View>

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryPillsScroll}
        >
          {channelCategories.map((cat) => {
            const isActive = selectedChannelCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                activeOpacity={0.8}
                onPress={() => setSelectedChannelCategory(cat)}
                style={[styles.categoryPill, isActive && styles.categoryPillActive]}
              >
                <Text
                  style={[styles.categoryPillText, isActive && styles.categoryPillTextActive]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Live Channel Cards Grid */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.channelCardsScroll}
        >
          {filteredChannels.slice(0, 6).map((ch) => (
            <TouchableOpacity
              key={ch.id}
              activeOpacity={0.88}
              onPress={() => onOpenLiveDemo(ch)}
              style={styles.liveChannelCard}
            >
              <View style={styles.liveChannelTop}>
                <Image source={{ uri: ch.logo }} style={styles.liveChannelLogo} />
                <View style={styles.liveResTag}>
                  <Text style={styles.liveResTagText}>{ch.resolution}</Text>
                </View>
              </View>

              <Text style={styles.liveChannelTitle} numberOfLines={1}>
                {ch.name}
              </Text>
              <Text style={styles.liveChannelSub} numberOfLines={1}>
                {ch.currentProgram?.title || 'Continuous Broadcast'}
              </Text>

              {/* Progress Bar */}
              <View style={styles.epgProgressBar}>
                <View
                  style={[
                    styles.epgProgressFill,
                    { width: `${ch.currentProgram?.progressPercent || 40}%` },
                  ]}
                />
              </View>

              <View style={styles.liveCardFooter}>
                <Text style={styles.liveNowText}>● LIVE</Text>
                <Text style={styles.tunePlayIcon}>▶</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ======================================================== */}
      {/* 5. NEXORA ORIGINALS & PREMIERES (STACKED WIDESCREEN)    */}
      {/* ======================================================== */}
      <View style={styles.sectionBlock}>
        <View style={styles.sectionHeaderCentered}>
          <Text style={styles.subTagRed}>CINEMATIC MASTERPIECES</Text>
          <Text style={styles.sectionMainTitle}>NEXORA Originals & Premieres</Text>
          <Text style={styles.sectionMutedSub}>
            Ultra 4K HDR master prints with Dolby Atmos 7.1 lossless spatial audio.
          </Text>
        </View>

        <View style={styles.originalsStack}>
          {originals.map((item) => (
            <View key={item.id} style={styles.originalCard}>
              <Image source={{ uri: item.image }} style={styles.originalBackdrop} />
              <View style={styles.originalGradient} />

              <View style={styles.originalCardContent}>
                <View style={styles.originalBadgeGroup}>
                  <View style={styles.originalBadgePill}>
                    <Text style={styles.originalBadgeText}>{item.badge}</Text>
                  </View>
                  <Text style={styles.originalRatingText}>★ {item.rating}</Text>
                </View>

                <Text style={styles.originalCardTitle}>{item.title}</Text>
                <Text style={styles.originalCardGenres}>{item.genres}</Text>
                <Text style={styles.originalCardDesc} numberOfLines={2}>
                  {item.synopsis}
                </Text>

                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={onSwitchToStreaming}
                  style={styles.btnWatch4k}
                >
                  <Text style={styles.btnWatch4kText}>▶ Watch in 4K HDR</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* ======================================================== */}
      {/* 6. BLOCKBUSTER VOD & 4K CINEMA (3D COVERFLOW)            */}
      {/* ======================================================== */}
      <View style={styles.sectionBlock}>
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.subTagRed}>TOP RATED FILMS</Text>
            <Text style={styles.sectionMainTitle}>Blockbuster VOD & 4K Cinema</Text>
          </View>
          <TouchableOpacity onPress={onSwitchToStreaming}>
            <Text style={styles.viewAllRedText}>All Cinema ›</Text>
          </TouchableOpacity>
        </View>

        {/* 3D Coverflow Visual Cards */}
        <View style={styles.coverflowContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.coverflowScroll}
          >
            {movies.map((m, idx) => {
              const isCenter = idx === coverflowIndex;
              return (
                <TouchableOpacity
                  key={m.id}
                  activeOpacity={0.88}
                  onPress={() => setCoverflowIndex(idx)}
                  style={[
                    styles.coverflowCard,
                    isCenter && styles.coverflowCardActive,
                  ]}
                >
                  <Image source={{ uri: m.posterUrl }} style={styles.coverflowPoster} />
                  {isCenter && (
                    <View style={styles.coverflowActiveBorder}>
                      <View style={styles.coverflowCenterInfo}>
                        <Text style={styles.coverflowCenterTitle} numberOfLines={1}>
                          {m.title}
                        </Text>
                        <Text style={styles.coverflowCenterMeta}>★ {m.rating} • {m.quality}</Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* ======================================================== */}
      {/* 7. BINGE-WORTHY TV SERIES                                */}
      {/* ======================================================== */}
      <View style={styles.sectionBlock}>
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.subTagRed}>ENDLESS BINGE</Text>
            <Text style={styles.sectionMainTitle}>Binge-Worthy TV Series</Text>
          </View>
          <TouchableOpacity onPress={onSwitchToStreaming}>
            <Text style={styles.viewAllRedText}>View All ›</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.seriesRailScroll}
        >
          {series.map((s) => (
            <TouchableOpacity
              key={s.id}
              activeOpacity={0.88}
              onPress={onSwitchToStreaming}
              style={styles.seriesCard}
            >
              <Image source={{ uri: s.posterUrl }} style={styles.seriesPoster} />
              <View style={styles.seriesSeasonBadge}>
                <Text style={styles.seriesSeasonText}>
                  {s.seasonsCount ? `${s.seasonsCount}S` : '3S'}
                </Text>
              </View>
              <Text style={styles.seriesTitle} numberOfLines={1}>
                {s.title}
              </Text>
              <Text style={styles.seriesMatch}>{s.matchScore}% Match</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ======================================================== */}
      {/* 8. STREAM EVERYWHERE (MULTI-DEVICE COMPATIBILITY)       */}
      {/* ======================================================== */}
      <View style={styles.sectionBlock}>
        <View style={styles.sectionHeaderCentered}>
          <Text style={styles.subTagRed}>UNIVERSAL SYNCHRONIZATION</Text>
          <Text style={styles.sectionMainTitle}>Stream Everywhere on Any Screen</Text>
          <Text style={styles.sectionMutedSub}>
            One subscription. Zero restrictions across all your smart devices.
          </Text>
        </View>

        <View style={styles.devicesGrid}>
          {[
            {
              title: 'Samsung & LG Smart TVs',
              desc: 'Native Tizen & webOS apps with 4K 60FPS HDR playback.',
              icon: '📺',
            },
            {
              title: 'Android TV & Google TV',
              desc: 'Optimized remote control D-Pad navigation and EPG guide.',
              icon: '📡',
            },
            {
              title: 'Apple TV 4K & FireStick',
              desc: 'Hardware HEVC decoding with Dolby Atmos spatial audio.',
              icon: '⚡',
            },
            {
              title: 'iOS & Android Mobile',
              desc: 'Seamless mobile streaming with background playback.',
              icon: '📱',
            },
          ].map((item, idx) => (
            <View key={idx} style={styles.deviceCard}>
              <Text style={styles.deviceIconText}>{item.icon}</Text>
              <Text style={styles.deviceTitle}>{item.title}</Text>
              <Text style={styles.deviceDesc}>{item.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ======================================================== */}
      {/* 9. 3-STEP SMART TV ACTIVATION (ZERO PASSWORDS)           */}
      {/* ======================================================== */}
      <View style={styles.sectionBlock}>
        <View style={styles.activationCardFrame}>
          <Text style={styles.subTagRed}>ZERO PASSWORDS REQUIRED</Text>
          <Text style={styles.activationTitle}>3-Step Smart TV Activation</Text>
          <Text style={styles.activationDesc}>
            Launch NEXORA on your Smart TV, copy the 6-digit PIN code displayed on screen, and
            pair below.
          </Text>

          <View style={styles.stepsRow}>
            <View style={styles.stepItem}>
              <View style={styles.stepNumCircle}>
                <Text style={styles.stepNumText}>1</Text>
              </View>
              <Text style={styles.stepLabel}>Install App on TV</Text>
            </View>
            <View style={styles.stepDivider} />
            <View style={styles.stepItem}>
              <View style={styles.stepNumCircle}>
                <Text style={styles.stepNumText}>2</Text>
              </View>
              <Text style={styles.stepLabel}>Get 6-Digit PIN</Text>
            </View>
            <View style={styles.stepDivider} />
            <View style={styles.stepItem}>
              <View style={styles.stepNumCircle}>
                <Text style={styles.stepNumText}>3</Text>
              </View>
              <Text style={styles.stepLabel}>Stream in 4K</Text>
            </View>
          </View>

          {/* Interactive Code Input */}
          <View style={styles.pinInputRow}>
            <TextInput
              style={styles.pinInput}
              placeholder="e.g. 748-291"
              placeholderTextColor="#555566"
              value={activationCode}
              onChangeText={(t) => setActivationCode(t.toUpperCase())}
              maxLength={8}
            />
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handlePairSubmit}
              style={styles.btnVerifyPin}
            >
              <Text style={styles.btnVerifyPinText}>Pair Device</Text>
            </TouchableOpacity>
          </View>

          {activationStatus === 'success' && (
            <View style={styles.activationSuccessAlert}>
              <Text style={styles.activationSuccessText}>
                ✓ Smart TV Paired Successfully! 4K Streams Unlocked.
              </Text>
            </View>
          )}

          {activationStatus === 'error' && (
            <View style={styles.activationErrorAlert}>
              <Text style={styles.activationErrorText}>
                Please enter a valid 6-digit TV PIN code.
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* ======================================================== */}
      {/* 10. CHOOSE THE PERFECT PLAN (PRICING MATRIX)             */}
      {/* ======================================================== */}
      <View style={styles.sectionBlock}>
        <View style={styles.sectionHeaderCentered}>
          <Text style={styles.subTagRed}>TRANSPARENT PRICING</Text>
          <Text style={styles.sectionMainTitle}>Choose Your Streaming Plan</Text>
          <Text style={styles.sectionMutedSub}>
            Cancel anytime with 1-click. Instant activation on all devices.
          </Text>

          {/* Monthly / Yearly Switch */}
          <View style={styles.billingToggleTrack}>
            <TouchableOpacity
              onPress={() => setBillingCycle('monthly')}
              style={[
                styles.billingToggleBtn,
                billingCycle === 'monthly' && styles.billingToggleBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.billingToggleText,
                  billingCycle === 'monthly' && styles.billingToggleTextActive,
                ]}
              >
                Monthly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setBillingCycle('yearly')}
              style={[
                styles.billingToggleBtn,
                billingCycle === 'yearly' && styles.billingToggleBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.billingToggleText,
                  billingCycle === 'yearly' && styles.billingToggleTextActive,
                ]}
              >
                Yearly (-20% OFF)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pricing Cards */}
        <View style={styles.pricingCardsStack}>
          {MOCK_SUBSCRIPTION_PLANS.map((plan) => {
            const isPopular = plan.id === 'plan-02';
            const price =
              billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;

            return (
              <View
                key={plan.id}
                style={[
                  styles.planCard,
                  isPopular && styles.planCardPopular,
                ]}
              >
                {isPopular && (
                  <View style={styles.popularTagPill}>
                    <Text style={styles.popularTagText}>MOST POPULAR</Text>
                  </View>
                )}

                <Text style={styles.planName}>{plan.name}</Text>
                <View style={styles.priceRow}>
                  <Text style={[styles.priceNumber, isPopular && { color: '#E50914' }]}>
                    ${price}
                  </Text>
                  <Text style={styles.priceCycle}>
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </Text>
                </View>

                <Text style={styles.planResText}>
                  {plan.resolution} • Up to {plan.maxStreams} screens
                </Text>

                <View style={styles.planFeaturesList}>
                  {plan.features.map((f, i) => (
                    <Text key={i} style={styles.planFeatureLine}>
                      ✓ {f}
                    </Text>
                  ))}
                </View>

                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={onOpenActivation}
                  style={[
                    styles.btnPlanCta,
                    isPopular ? styles.btnPlanCtaPopular : styles.btnPlanCtaGlass,
                  ]}
                >
                  <Text
                    style={[
                      styles.btnPlanCtaText,
                      isPopular ? { color: '#FFFFFF' } : { color: '#CBD5E1' },
                    ]}
                  >
                    Start 7-Day Free Trial
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>

      {/* ======================================================== */}
      {/* 11. FAQ ACCORDION                                         */}
      {/* ======================================================== */}
      <View style={styles.sectionBlock}>
        <View style={styles.sectionHeaderCentered}>
          <Text style={styles.subTagRed}>QUESTIONS & ANSWERS</Text>
          <Text style={styles.sectionMainTitle}>Got Questions? We've Got Answers</Text>
        </View>

        <View style={styles.faqStack}>
          {faqs.map((faq, idx) => {
            const isExpanded = expandedFaqIndex === idx;
            return (
              <View key={idx} style={styles.faqCard}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                  style={styles.faqQuestionRow}
                >
                  <Text style={styles.faqQuestionText}>{faq.q}</Text>
                  <Text style={styles.faqChevron}>{isExpanded ? '−' : '+'}</Text>
                </TouchableOpacity>
                {isExpanded && (
                  <View style={styles.faqAnswerBox}>
                    <Text style={styles.faqAnswerText}>{faq.a}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>

      {/* ======================================================== */}
      {/* 12. BRAND FOOTER (MATCHING WEB SCREENSHOT)              */}
      {/* ======================================================== */}
      <View style={styles.footerContainer}>
        <View style={styles.footerBrandRow}>
          <View style={styles.footerLogoBadge}>
            <Text style={styles.footerLogoText}>N</Text>
          </View>
          <Text style={styles.footerBrandText}>
            NEX<Text style={{ color: '#E50914' }}>ORA</Text>
          </Text>
        </View>

        <Text style={styles.footerStatusLive}>
          ● All 24 Global Edge Video Clusters Operational
        </Text>

        <Text style={styles.footerCopyright}>
          © 2026 NEXORA TV Systems. All 4K HDR live streams encrypted with AES-128.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050508',
  },

  // 1. Top Cinema Spotlight Hero
  topSpotlightContainer: {
    position: 'relative',
    height: 480,
    width: '100%',
    backgroundColor: '#000000',
  },
  spotlightBackdrop: {
    width: '100%',
    height: '100%',
    opacity: 0.65,
  },
  spotlightDarkGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 5, 8, 0.45)',
  },
  spotlightContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  premiereTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(229, 9, 20, 0.25)',
    borderWidth: 1,
    borderColor: '#E50914',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
    gap: 6,
  },
  premiereTagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E50914',
  },
  premiereTagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  spotlightTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  spotlightMeta: {
    color: '#E50914',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
  },
  spotlightDesc: {
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 14,
  },
  spotlightButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  btnStartWatching: {
    flex: 1.4,
    height: 38,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  btnStartWatchingText: {
    color: '#050508',
    fontWeight: '900',
    fontSize: 13,
  },
  btnHeroGlass: {
    flex: 1,
    height: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnHeroGlassText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  thumbsRailRow: {
    flexDirection: 'row',
    gap: 8,
  },
  thumbBox: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    position: 'relative',
  },
  thumbBoxActive: {
    borderColor: '#E50914',
    borderWidth: 2,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  thumbIndicatorLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#E50914',
  },

  // 2. Crimson Ambient Aura & Platform Hero
  platformHeroSection: {
    paddingVertical: 36,
    paddingHorizontal: 20,
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    backgroundColor: '#050508',
  },
  crimsonAuraGlow: {
    position: 'absolute',
    top: 0,
    left: '20%',
    width: '60%',
    height: 80,
    backgroundColor: 'rgba(229, 9, 20, 0.25)',
    borderRadius: 60,
    opacity: 0.8,
  },
  engineBadgePill: {
    backgroundColor: 'rgba(229, 9, 20, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(229, 9, 20, 0.45)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 14,
  },
  engineBadgeText: {
    color: '#FF4D4D',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  platformMainTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  crimsonGlowText: {
    color: '#E50914',
  },
  platformSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  platformCtaRow: {
    width: '100%',
    gap: 10,
  },
  btnCrimsonPrimary: {
    backgroundColor: '#E50914',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E50914',
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 6,
  },
  btnCrimsonPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  btnGlassPair: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(229, 9, 20, 0.4)',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGlassPairText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },

  // Common Section Blocks
  sectionBlock: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  sectionHeaderCentered: {
    alignItems: 'center',
    marginBottom: 18,
    textAlign: 'center',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  subTagRed: {
    color: '#E50914',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  sectionMainTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  sectionMutedSub: {
    color: '#8A8A8A',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
  viewAllRedText: {
    color: '#E50914',
    fontSize: 12,
    fontWeight: '800',
  },

  // 3. Smart TV Mockup
  tvFrameContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  tvBezel: {
    width: width - 40,
    height: 190,
    backgroundColor: '#0A0A10',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(229, 9, 20, 0.35)',
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#E50914',
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  tvScreenImage: {
    width: '100%',
    height: '100%',
  },
  tvScreenDarkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 5, 8, 0.35)',
  },
  tvUiOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    justifyContent: 'space-between',
  },
  tvUiTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tvLiveDotBadge: {
    backgroundColor: '#E50914',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tvLiveDotText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  tvDolbyText: {
    color: '#E2E8F0',
    fontSize: 10,
    fontWeight: '700',
  },
  tvUiBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  tvMatchTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    flex: 1,
  },
  eqRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    height: 18,
  },
  eqBar: {
    width: 3,
    backgroundColor: '#E50914',
    borderRadius: 2,
  },
  tvStand: {
    width: 70,
    height: 6,
    backgroundColor: '#262630',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginTop: 2,
  },

  // 4. Live Channels
  categoryPillsScroll: {
    gap: 8,
    paddingBottom: 12,
  },
  categoryPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryPillActive: {
    backgroundColor: '#E50914',
    borderColor: '#E50914',
  },
  categoryPillText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  channelCardsScroll: {
    gap: 10,
  },
  liveChannelCard: {
    width: 155,
    backgroundColor: 'rgba(15, 15, 22, 0.85)',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  liveChannelTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  liveChannelLogo: {
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: '#000000',
  },
  liveResTag: {
    backgroundColor: 'rgba(229, 9, 20, 0.2)',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  liveResTagText: {
    color: '#FF4D4D',
    fontSize: 8,
    fontWeight: '900',
  },
  liveChannelTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  liveChannelSub: {
    color: '#8A8A8A',
    fontSize: 10,
    marginTop: 2,
    marginBottom: 8,
  },
  epgProgressBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 1.5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  epgProgressFill: {
    height: '100%',
    backgroundColor: '#E50914',
  },
  liveCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveNowText: {
    color: '#E50914',
    fontSize: 9,
    fontWeight: '900',
  },
  tunePlayIcon: {
    color: '#E50914',
    fontSize: 11,
    fontWeight: '900',
  },

  // 5. Originals Stack
  originalsStack: {
    gap: 14,
  },
  originalCard: {
    height: 180,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0E0E16',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  originalBackdrop: {
    width: '100%',
    height: '100%',
  },
  originalGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 5, 8, 0.65)',
  },
  originalCardContent: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
  originalBadgeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  originalBadgePill: {
    backgroundColor: '#E50914',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  originalBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
  originalRatingText: {
    color: '#FBBF24',
    fontSize: 11,
    fontWeight: '800',
  },
  originalCardTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  originalCardGenres: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 2,
  },
  originalCardDesc: {
    color: '#CBD5E1',
    fontSize: 11,
    lineHeight: 16,
    marginVertical: 6,
  },
  btnWatch4k: {
    backgroundColor: '#E50914',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  btnWatch4kText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },

  // 6. Coverflow
  coverflowContainer: {
    paddingVertical: 8,
  },
  coverflowScroll: {
    gap: 12,
    paddingHorizontal: 4,
  },
  coverflowCard: {
    width: 140,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#151520',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  coverflowCardActive: {
    borderColor: '#E50914',
    borderWidth: 2,
    shadowColor: '#E50914',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
  },
  coverflowPoster: {
    width: '100%',
    height: '100%',
  },
  coverflowActiveBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: 'rgba(5, 5, 8, 0.85)',
  },
  coverflowCenterInfo: {},
  coverflowCenterTitle: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  coverflowCenterMeta: {
    color: '#FF4D4D',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
  },

  // 7. TV Series
  seriesRailScroll: {
    gap: 10,
  },
  seriesCard: {
    width: 110,
    position: 'relative',
  },
  seriesPoster: {
    width: 110,
    height: 155,
    borderRadius: 10,
    backgroundColor: '#151520',
  },
  seriesSeasonBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#E50914',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  seriesSeasonText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  seriesTitle: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 6,
  },
  seriesMatch: {
    color: '#E50914',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 1,
  },

  // 8. Multi-Device Grid
  devicesGrid: {
    gap: 10,
  },
  deviceCard: {
    backgroundColor: 'rgba(15, 15, 22, 0.8)',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  deviceIconText: {
    fontSize: 22,
    marginBottom: 6,
  },
  deviceTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  deviceDesc: {
    color: '#94A3B8',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },

  // 9. 3-Step Smart TV Activation
  activationCardFrame: {
    backgroundColor: 'rgba(15, 15, 22, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(229, 9, 20, 0.4)',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#E50914',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  activationTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 4,
  },
  activationDesc: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
    marginVertical: 10,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 14,
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  stepNumCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  stepNumText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 12,
  },
  stepLabel: {
    color: '#CBD5E1',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  stepDivider: {
    width: 20,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginTop: -16,
  },
  pinInputRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  pinInput: {
    flex: 1,
    height: 44,
    backgroundColor: '#050508',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    color: '#E50914',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
  },
  btnVerifyPin: {
    backgroundColor: '#E50914',
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnVerifyPinText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
  },
  activationSuccessAlert: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderWidth: 1,
    borderColor: '#22C55E',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  activationSuccessText: {
    color: '#22C55E',
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },
  activationErrorAlert: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  activationErrorText: {
    color: '#EF4444',
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },

  // 10. Pricing Plans
  billingToggleTrack: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 20,
    padding: 3,
    marginTop: 12,
  },
  billingToggleBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
  },
  billingToggleBtnActive: {
    backgroundColor: '#E50914',
  },
  billingToggleText: {
    color: '#8A8A8A',
    fontSize: 11,
    fontWeight: '700',
  },
  billingToggleTextActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  pricingCardsStack: {
    gap: 14,
    marginTop: 12,
  },
  planCard: {
    backgroundColor: 'rgba(15, 15, 22, 0.85)',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    position: 'relative',
  },
  planCardPopular: {
    borderColor: '#E50914',
    borderWidth: 2,
    shadowColor: '#E50914',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  popularTagPill: {
    position: 'absolute',
    top: -10,
    right: 14,
    backgroundColor: '#E50914',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  popularTagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  planName: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
    marginVertical: 4,
  },
  priceNumber: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  priceCycle: {
    color: '#8A8A8A',
    fontSize: 12,
  },
  planResText: {
    color: '#94A3B8',
    fontSize: 11,
    marginBottom: 10,
  },
  planFeaturesList: {
    gap: 4,
    marginBottom: 14,
  },
  planFeatureLine: {
    color: '#CBD5E1',
    fontSize: 11,
    lineHeight: 16,
  },
  btnPlanCta: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPlanCtaPopular: {
    backgroundColor: '#E50914',
  },
  btnPlanCtaGlass: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  btnPlanCtaText: {
    fontWeight: '900',
    fontSize: 13,
  },

  // 11. FAQ Accordion
  faqStack: {
    gap: 8,
  },
  faqCard: {
    backgroundColor: 'rgba(15, 15, 22, 0.85)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  faqQuestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  faqQuestionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
    paddingRight: 10,
  },
  faqChevron: {
    color: '#E50914',
    fontSize: 18,
    fontWeight: '800',
  },
  faqAnswerBox: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: 8,
  },
  faqAnswerText: {
    color: '#94A3B8',
    fontSize: 11,
    lineHeight: 18,
  },

  // 12. Footer
  footerContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: '#030306',
  },
  footerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  footerLogoBadge: {
    width: 24,
    height: 24,
    borderRadius: 5,
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLogoText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
  },
  footerBrandText: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#FFFFFF',
  },
  footerStatusLive: {
    color: '#22C55E',
    fontSize: 11,
    fontWeight: '700',
    marginVertical: 6,
  },
  footerCopyright: {
    color: '#666677',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
  },
});
