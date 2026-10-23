import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { ContentItem } from '@nexora/shared';

const { width } = Dimensions.get('window');

interface CinematicHeroBannerProps {
  item: ContentItem;
  onPlay: (item: ContentItem) => void;
  onDetails: (item: ContentItem) => void;
}

export const CinematicHeroBanner: React.FC<CinematicHeroBannerProps> = ({
  item,
  onPlay,
  onDetails,
}) => {
  // 1. Ambient Background Glow Animation
  const ambientGlowAnim = useRef(new Animated.Value(0.4)).current;
  const ambientScaleAnim = useRef(new Animated.Value(1.0)).current;

  // 2. Play Button Pulse & Beacon Ring
  const buttonPulseAnim = useRef(new Animated.Value(1.0)).current;
  const beaconRingScale = useRef(new Animated.Value(1.0)).current;
  const beaconRingOpacity = useRef(new Animated.Value(0.7)).current;

  // 3. Shimmer Reflection Sweep
  const shimmerAnim = useRef(new Animated.Value(-120)).current;

  // 4. Live Badge Pulse
  const badgePulseAnim = useRef(new Animated.Value(1.0)).current;

  // 5. Button Press Feedback
  const pressScaleAnim = useRef(new Animated.Value(1.0)).current;

  useEffect(() => {
    // Ambient Background Breathing Glow (Smooth loop)
    const ambientLoop = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(ambientGlowAnim, {
            toValue: 0.85,
            duration: 2200,
            useNativeDriver: true,
          }),
          Animated.timing(ambientGlowAnim, {
            toValue: 0.35,
            duration: 2200,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(ambientScaleAnim, {
            toValue: 1.08,
            duration: 2400,
            useNativeDriver: true,
          }),
          Animated.timing(ambientScaleAnim, {
            toValue: 1.0,
            duration: 2400,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    // Play Button Breathing Scale Loop
    const buttonPulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(buttonPulseAnim, {
          toValue: 1.035,
          duration: 1100,
          useNativeDriver: true,
        }),
        Animated.timing(buttonPulseAnim, {
          toValue: 1.0,
          duration: 1100,
          useNativeDriver: true,
        }),
      ])
    );

    // Play Button Radiating Beacon Ring Loop
    const beaconRingLoop = Animated.loop(
      Animated.parallel([
        Animated.timing(beaconRingScale, {
          toValue: 1.25,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(beaconRingOpacity, {
            toValue: 0.5,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(beaconRingOpacity, {
            toValue: 0.0,
            duration: 1400,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    // Shimmer Reflection Sweep across button (glides every 2.8s)
    const shimmerLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 220,
          duration: 1100,
          useNativeDriver: true,
        }),
        Animated.delay(1700),
        Animated.timing(shimmerAnim, {
          toValue: -120,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    // Live Badge Pulse
    const badgePulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(badgePulseAnim, {
          toValue: 1.4,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(badgePulseAnim, {
          toValue: 1.0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    ambientLoop.start();
    buttonPulseLoop.start();
    beaconRingLoop.start();
    shimmerLoop.start();
    badgePulseLoop.start();

    return () => {
      ambientLoop.stop();
      buttonPulseLoop.stop();
      beaconRingLoop.stop();
      shimmerLoop.stop();
      badgePulseLoop.stop();
    };
  }, []);

  const handlePressIn = () => {
    Animated.spring(pressScaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressScaleAnim, {
      toValue: 1.0,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* 1. Cinematic Red Ambient Spotlight Glow Layers */}
      <Animated.View
        style={[
          styles.ambientGlowLayer,
          {
            opacity: ambientGlowAnim,
            transform: [{ scale: ambientScaleAnim }],
          },
        ]}
      >
        <View style={styles.ambientAuraOuter} />
        <View style={styles.ambientAuraCore} />
      </Animated.View>

      {/* 2. Hero Backdrop Image with Red-Black Atmospheric Vignette */}
      <Image
        source={{ uri: item.backdropUrl }}
        style={styles.heroBackdrop}
        resizeMode="cover"
      />

      {/* 3. Dark Cinematic Gradient Overlays */}
      <View style={styles.gradientTopFade} />
      <View style={styles.gradientBottomFade} />
      <View style={styles.cinematicRedGlowEdge} />

      {/* 4. Overlay Content Details */}
      <View style={styles.heroOverlay}>
        {/* Badges & Live Indicator Row */}
        <View style={styles.heroBadgesRow}>
          <View style={styles.badgeRed}>
            <View style={styles.badgeBeaconWrapper}>
              <Animated.View
                style={[
                  styles.badgeBeaconDotPulse,
                  { transform: [{ scale: badgePulseAnim }] },
                ]}
              />
              <View style={styles.badgeBeaconDotCore} />
            </View>
            <Text style={styles.badgeRedText}>FEATURED PREMIERE</Text>
          </View>

          <View style={styles.badgeDark}>
            <Text style={styles.badgeDarkText}>{item.quality || '4K HDR'}</Text>
          </View>

          <View style={styles.ratingBadge}>
            <Text style={styles.heroRatingStar}>★</Text>
            <Text style={styles.heroRatingText}>{item.rating}</Text>
          </View>
        </View>

        {/* Hero Title */}
        <Text style={styles.heroTitle} numberOfLines={2}>
          {item.title}
        </Text>

        {/* Genres & Meta */}
        <Text style={styles.heroMeta} numberOfLines={1}>
          {item.genres ? item.genres.join(' • ') : 'Action • Sci-Fi'} • {item.duration || '2h 18m'} • {item.releaseYear || '2026'}
        </Text>

        {/* Hero Action Buttons */}
        <View style={styles.heroButtonsRow}>
          {/* Animated Glowing Play Button with Shimmer */}
          <View style={styles.playButtonWrapper}>
            {/* Outer Radiating Red Beacon Ring */}
            <Animated.View
              pointerEvents="none"
              style={[
                styles.radiatingBeaconRing,
                {
                  transform: [{ scale: beaconRingScale }],
                  opacity: beaconRingOpacity,
                },
              ]}
            />

            {/* Pulsing Button Body */}
            <Animated.View
              style={[
                styles.pulsingButtonContainer,
                {
                  transform: [
                    { scale: buttonPulseAnim },
                    { scale: pressScaleAnim },
                  ],
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.88}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={() => onPlay(item)}
                style={styles.heroPrimaryButton}
              >
                {/* Red Neon Internal Gradient Highlight */}
                <View style={styles.buttonTopSheen} />

                {/* Shimmer Light Reflection Sweep */}
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.shimmerStreak,
                    {
                      transform: [
                        { translateX: shimmerAnim },
                        { rotate: '25deg' },
                      ],
                    },
                  ]}
                />

                <View style={styles.buttonContentRow}>
                  <View style={styles.playIconCircle}>
                    <Text style={styles.playIconChar}>▶</Text>
                  </View>
                  <Text style={styles.heroPrimaryButtonText}>Watch Now</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Details Secondary Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.heroSecondaryButton}
            onPress={() => onDetails(item)}
          >
            <Text style={styles.heroSecondaryButtonIcon}>ⓘ</Text>
            <Text style={styles.heroSecondaryButtonText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 360,
    width: '100%',
    position: 'relative',
    backgroundColor: '#050505',
    overflow: 'hidden',
  },
  // Ambient Red Spotlight Glow
  ambientGlowLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  ambientAuraOuter: {
    position: 'absolute',
    width: width * 1.15,
    height: 280,
    borderRadius: width,
    backgroundColor: 'rgba(127, 0, 0, 0.38)',
    bottom: 20,
  },
  ambientAuraCore: {
    position: 'absolute',
    width: width * 0.7,
    height: 180,
    borderRadius: width,
    backgroundColor: 'rgba(229, 9, 20, 0.45)',
    bottom: 40,
  },
  heroBackdrop: {
    width: '100%',
    height: '100%',
    opacity: 0.72,
    zIndex: 2,
  },
  // Vignette and Dark Gradient Overlays
  gradientTopFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: 'rgba(5, 5, 5, 0.45)',
    zIndex: 3,
  },
  gradientBottomFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'rgba(5, 5, 5, 0.88)',
    zIndex: 3,
  },
  cinematicRedGlowEdge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#E50914',
    opacity: 0.85,
    zIndex: 4,
    shadowColor: '#E50914',
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
  // Overlay Content
  heroOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 5,
  },
  heroBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  badgeRed: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(229, 9, 20, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FF2B36',
    shadowColor: '#E50914',
    shadowOpacity: 0.65,
    shadowRadius: 6,
    elevation: 4,
  },
  badgeBeaconWrapper: {
    width: 10,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  badgeBeaconDotPulse: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  badgeBeaconDotCore: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  badgeRedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  badgeDark: {
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#303030',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeDarkText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(21, 21, 21, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.35)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  heroRatingStar: {
    color: '#FBBF24',
    fontSize: 11,
  },
  heroRatingText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  heroMeta: {
    fontSize: 12,
    color: '#B3B3B3',
    marginBottom: 14,
    fontWeight: '500',
  },
  heroButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  // Play Button & Shimmer FX
  playButtonWrapper: {
    flex: 1.4,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radiatingBeaconRing: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    backgroundColor: 'rgba(229, 9, 20, 0.45)',
    borderWidth: 1.5,
    borderColor: '#FF2B36',
  },
  pulsingButtonContainer: {
    width: '100%',
  },
  heroPrimaryButton: {
    height: 44,
    borderRadius: 10,
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#FF2B36',
    // Glow shadow
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonTopSheen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  shimmerStreak: {
    position: 'absolute',
    top: -20,
    bottom: -20,
    width: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    zIndex: 1,
  },
  buttonContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    zIndex: 2,
  },
  playIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIconChar: {
    color: '#E50914',
    fontSize: 10,
    fontWeight: '900',
    marginLeft: 1,
  },
  heroPrimaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  // Secondary Button
  heroSecondaryButton: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(21, 21, 21, 0.92)',
    borderWidth: 1,
    borderColor: '#303030',
    borderRadius: 10,
  },
  heroSecondaryButtonIcon: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  heroSecondaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
