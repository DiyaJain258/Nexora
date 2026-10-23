import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { ContentItem } from '@nexora/shared';

const { width } = Dimensions.get('window');

interface FeaturedContentCarouselProps {
  items: ContentItem[];
  onPlay: (item: ContentItem) => void;
  onDetails: (item: ContentItem) => void;
  onToggleFavorite: (id: string) => void;
  favoriteIds: string[];
}

export const FeaturedContentCarousel: React.FC<FeaturedContentCarouselProps> = ({
  items,
  onPlay,
  onDetails,
  onToggleFavorite,
  favoriteIds,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredList = items.slice(0, 5); // Top 5 featured titles
  const currentItem = featuredList[currentIndex] || items[0];

  // Animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const ambientGlowAnim = useRef(new Animated.Value(0.4)).current;
  const buttonPulseAnim = useRef(new Animated.Value(1)).current;
  const beaconRingScale = useRef(new Animated.Value(1)).current;
  const beaconRingOpacity = useRef(new Animated.Value(0.7)).current;
  const shimmerAnim = useRef(new Animated.Value(-120)).current;
  const beaconDotPulse = useRef(new Animated.Value(1)).current;

  // Auto rotation timer
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5500);

    return () => clearInterval(timer);
  }, [currentIndex, featuredList.length]);

  // Breathing & Ambient Animations
  useEffect(() => {
    const ambientLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(ambientGlowAnim, {
          toValue: 0.85,
          duration: 2400,
          useNativeDriver: true,
        }),
        Animated.timing(ambientGlowAnim, {
          toValue: 0.35,
          duration: 2400,
          useNativeDriver: true,
        }),
      ])
    );

    const buttonLoop = Animated.loop(
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

    const shimmerLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 240,
          duration: 1100,
          useNativeDriver: true,
        }),
        Animated.delay(1800),
        Animated.timing(shimmerAnim, {
          toValue: -120,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    const beaconDotLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(beaconDotPulse, {
          toValue: 1.4,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(beaconDotPulse, {
          toValue: 1.0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    ambientLoop.start();
    buttonLoop.start();
    beaconRingLoop.start();
    shimmerLoop.start();
    beaconDotLoop.start();

    return () => {
      ambientLoop.stop();
      buttonLoop.stop();
      beaconRingLoop.stop();
      shimmerLoop.stop();
      beaconDotLoop.stop();
    };
  }, []);

  const switchIndex = (nextIdx: number) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.06,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentIndex(nextIdx);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1.0,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1.0,
          friction: 6,
          tension: 70,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const goToNext = () => {
    const next = (currentIndex + 1) % featuredList.length;
    switchIndex(next);
  };

  const goToPrev = () => {
    const prev = (currentIndex - 1 + featuredList.length) % featuredList.length;
    switchIndex(prev);
  };

  const isFavorite = favoriteIds.includes(currentItem.id);

  return (
    <View style={styles.container}>
      {/* 1. Ambient Red Cinematic Spotlight Halo */}
      <Animated.View
        style={[
          styles.ambientGlowLayer,
          {
            opacity: ambientGlowAnim,
          },
        ]}
      >
        <View style={styles.ambientOuter} />
        <View style={styles.ambientCore} />
      </Animated.View>

      {/* 2. Hero Backdrop Image with Scale & Fade Transitions */}
      <Animated.Image
        source={{ uri: currentItem.backdropUrl || currentItem.posterUrl }}
        style={[
          styles.backdropImage,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
        resizeMode="cover"
      />

      {/* 3. Gradient Voids & Neon Edge */}
      <View style={styles.gradientTop} />
      <View style={styles.gradientBottom} />
      <View style={styles.redNeonDivider} />

      {/* 4. Overlay Content Container */}
      <Animated.View style={[styles.heroOverlay, { opacity: fadeAnim }]}>
        {/* Badges Row */}
        <View style={styles.badgesRow}>
          <View style={styles.badgeRed}>
            <View style={styles.beaconDotWrapper}>
              <Animated.View
                style={[
                  styles.beaconDotPulse,
                  { transform: [{ scale: beaconDotPulse }] },
                ]}
              />
              <View style={styles.beaconDotCore} />
            </View>
            <Text style={styles.badgeRedText}>FEATURED PREMIERE</Text>
          </View>

          <View style={styles.badgeDark}>
            <Text style={styles.badgeDarkText}>{currentItem.quality || '4K HDR'}</Text>
          </View>

          <View style={styles.ratingBox}>
            <Text style={styles.ratingStar}>★</Text>
            <Text style={styles.ratingText}>{currentItem.rating}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.heroTitle} numberOfLines={2}>
          {currentItem.title}
        </Text>

        {/* Metadata */}
        <Text style={styles.heroMeta} numberOfLines={1}>
          {currentItem.genres ? currentItem.genres.join(' • ') : 'Action • Sci-Fi'} •{' '}
          {currentItem.duration || '2h 15m'} • {currentItem.releaseYear || '2026'}
        </Text>

        {/* Buttons Row */}
        <View style={styles.buttonsRow}>
          {/* Watch Now Button with Radiating Ring & Shimmer */}
          <View style={styles.watchNowWrapper}>
            <Animated.View
              pointerEvents="none"
              style={[
                styles.radiatingRing,
                {
                  transform: [{ scale: beaconRingScale }],
                  opacity: beaconRingOpacity,
                },
              ]}
            />
            <View style={{ width: '100%' }}>
              <Animated.View
                style={{
                  transform: [{ scale: buttonPulseAnim }],
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={() => onPlay(currentItem)}
                  style={styles.primaryButton}
                >
                  <View style={styles.buttonTopSheen} />
                  <Animated.View
                    pointerEvents="none"
                    style={[
                      styles.shimmerLight,
                      {
                        transform: [
                          { translateX: shimmerAnim },
                          { rotate: '25deg' },
                        ],
                      },
                    ]}
                  />
                  <View style={styles.buttonInnerRow}>
                    <View style={styles.playIconBox}>
                      <Text style={styles.playIconText}>▶</Text>
                    </View>
                    <Text style={styles.primaryButtonText}>Watch Now</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>

          {/* Details Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onDetails(currentItem)}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonIcon}>ⓘ</Text>
            <Text style={styles.secondaryButtonText}>Details</Text>
          </TouchableOpacity>

          {/* + My List Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onToggleFavorite(currentItem.id)}
            style={[
              styles.iconActionButton,
              isFavorite && styles.iconActionButtonActive,
            ]}
          >
            <Text style={styles.iconActionText}>
              {isFavorite ? '✓' : '+'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Carousel Pagination Dots */}
        <View style={styles.paginationRow}>
          {featuredList.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => switchIndex(idx)}
                style={[
                  styles.paginationDot,
                  isActive && styles.paginationDotActive,
                ]}
              />
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 380,
    width: '100%',
    position: 'relative',
    backgroundColor: '#050505',
    overflow: 'hidden',
  },
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
  ambientOuter: {
    position: 'absolute',
    width: width * 1.2,
    height: 300,
    borderRadius: width,
    backgroundColor: 'rgba(127, 0, 0, 0.35)',
    bottom: 20,
  },
  ambientCore: {
    position: 'absolute',
    width: width * 0.75,
    height: 190,
    borderRadius: width,
    backgroundColor: 'rgba(229, 9, 20, 0.42)',
    bottom: 35,
  },
  backdropImage: {
    width: '100%',
    height: '100%',
    opacity: 0.75,
    zIndex: 2,
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(5, 5, 5, 0.45)',
    zIndex: 3,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 220,
    backgroundColor: 'rgba(5, 5, 5, 0.88)',
    zIndex: 3,
  },
  redNeonDivider: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#E50914',
    opacity: 0.9,
    zIndex: 4,
    shadowColor: '#E50914',
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 5,
  },
  badgesRow: {
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
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 4,
  },
  beaconDotWrapper: {
    width: 10,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  beaconDotPulse: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  beaconDotCore: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
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
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(21, 21, 21, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingStar: {
    color: '#FBBF24',
    fontSize: 11,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  heroTitle: {
    fontSize: 25,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  heroMeta: {
    fontSize: 12,
    color: '#B3B3B3',
    marginBottom: 14,
    fontWeight: '500',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  watchNowWrapper: {
    flex: 1.5,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radiatingRing: {
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
  primaryButton: {
    height: 44,
    borderRadius: 10,
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#FF2B36',
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.85,
    shadowRadius: 14,
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
  shimmerLight: {
    position: 'absolute',
    top: -20,
    bottom: -20,
    width: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    zIndex: 1,
  },
  buttonInnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    zIndex: 2,
  },
  playIconBox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIconText: {
    color: '#E50914',
    fontSize: 10,
    fontWeight: '900',
    marginLeft: 1,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  secondaryButton: {
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
  secondaryButtonIcon: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  iconActionButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: 'rgba(21, 21, 21, 0.92)',
    borderWidth: 1,
    borderColor: '#303030',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconActionButtonActive: {
    borderColor: '#E50914',
    backgroundColor: 'rgba(229, 9, 20, 0.2)',
  },
  iconActionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#383838',
  },
  paginationDotActive: {
    width: 20,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E50914',
    shadowColor: '#E50914',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
});
