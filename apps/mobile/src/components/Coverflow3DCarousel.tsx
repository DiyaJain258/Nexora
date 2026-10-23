import React, { useRef, useState, useEffect } from 'react';
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

// Swiper EffectCoverflow dimensions
const CARD_WIDTH = Math.min(width * 0.62, 240);
const CARD_HEIGHT = CARD_WIDTH * 1.48;
// Overlap spacing for 3D depth (like Swiper coverflow)
const CARD_MARGIN = 6;
const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN * 2;
const SPACER = (width - SNAP_INTERVAL) / 2;

interface Coverflow3DCarouselProps {
  items: ContentItem[];
  onPlay: (item: ContentItem) => void;
  onDetails: (item: ContentItem) => void;
  autoplay?: boolean;
}

export const Coverflow3DCarousel: React.FC<Coverflow3DCarouselProps> = ({
  items,
  onPlay,
  onDetails,
  autoplay = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<any>(null);

  // Autoplay
  useEffect(() => {
    if (!autoplay || items.length <= 1) return;
    const interval = setInterval(() => {
      const nextIdx = (activeIndex + 1) % items.length;
      scrollToIndex(nextIdx);
    }, 3800);
    return () => clearInterval(interval);
  }, [activeIndex, autoplay, items.length]);

  const scrollToIndex = (index: number) => {
    const clamped = Math.max(0, Math.min(index, items.length - 1));
    setActiveIndex(clamped);
    scrollViewRef.current?.scrollTo({
      x: clamped * SNAP_INTERVAL,
      animated: true,
    });
  };

  const handlePrev = () => {
    scrollToIndex(activeIndex - 1);
  };

  const handleNext = () => {
    scrollToIndex(activeIndex + 1);
  };

  return (
    <View style={styles.container}>
      {/* 3D Coverflow Scroll Viewport */}
      <View style={styles.carouselContainer}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToOffsets={items.map((_, i) => i * SNAP_INTERVAL)}
          snapToAlignment="start"
          disableIntervalMomentum={true}
          decelerationRate="fast"
          bounces={false}
          contentContainerStyle={{
            paddingHorizontal: SPACER,
            alignItems: 'center',
            paddingVertical: 18,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: true,
            }
          )}
          onMomentumScrollEnd={(event: any) => {
            const offsetX = event.nativeEvent.contentOffset.x;
            const idx = Math.round(offsetX / SNAP_INTERVAL);
            if (idx >= 0 && idx < items.length) {
              setActiveIndex(idx);
            }
          }}
          scrollEventThrottle={16}
        >
          {items.map((item, index) => {
            const inputRange = [
              (index - 1) * SNAP_INTERVAL,
              index * SNAP_INTERVAL,
              (index + 1) * SNAP_INTERVAL,
            ];

            // 1. Swiper Coverflow rotate: 40deg
            const rotateY = scrollX.interpolate({
              inputRange,
              outputRange: ['40deg', '0deg', '-40deg'],
              extrapolate: 'clamp',
            });

            // 2. Swiper Coverflow depth: 100 (scale: 0.82 -> 1.06 -> 0.82)
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.82, 1.08, 0.82],
              extrapolate: 'clamp',
            });

            // 3. Horizontal stretch/pull translation
            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [24, 0, -24],
              extrapolate: 'clamp',
            });

            // 4. Swiper slideShadows: true (dark 3D shadow over side slides)
            const slideShadowOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.65, 0.0, 0.65],
              extrapolate: 'clamp',
            });

            // 5. Red neon glow border for center active slide
            const glowOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
              extrapolate: 'clamp',
            });

            // Dynamic Z-Index so active center card is always above neighbors
            const distFromActive = Math.abs(index - activeIndex);
            const zIndex = 50 - distFromActive * 5;

            return (
              <View
                key={item.id}
                style={[
                  styles.cardWrapper,
                  { zIndex },
                ]}
              >
                <Animated.View
                  style={{
                    transform: [
                      { perspective: 900 },
                      { translateX },
                      { scale },
                      { rotateY },
                    ],
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.92}
                    onPress={() => onDetails(item)}
                    style={styles.cardTouch}
                  >
                  {/* Poster Image */}
                  <Image
                    source={{ uri: item.posterUrl }}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />

                  {/* Dark Vignette Base Overlay */}
                  <View style={styles.cardBaseGradient} />

                  {/* Swiper slideShadows simulation: dark shadow overlay on tilted cards */}
                  <Animated.View
                    pointerEvents="none"
                    style={[
                      styles.slideShadowOverlay,
                      { opacity: slideShadowOpacity },
                    ]}
                  />

                  {/* Active Slide Glowing Red Neon Border */}
                  <Animated.View
                    pointerEvents="none"
                    style={[
                      styles.glowBorder,
                      { opacity: glowOpacity },
                    ]}
                  />

                  {/* Top Badges */}
                  <View style={styles.topBadgesRow}>
                    <View style={styles.badgeTop10}>
                      <Text style={styles.badgeTop10Text}>TOP 10</Text>
                    </View>
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingStar}>★</Text>
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                  </View>

                  {/* Bottom Info Bar */}
                  <View style={styles.cardBottom}>
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <View style={styles.metaRow}>
                      <Text style={styles.matchScore}>{item.matchScore}% Match</Text>
                      <Text style={styles.qualityText}>{item.quality || '4K HDR'}</Text>
                    </View>

                    {/* Quick Play Action Button */}
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => onPlay(item)}
                      style={styles.playBarButton}
                    >
                      <Text style={styles.playBarIcon}>▶</Text>
                      <Text style={styles.playBarText}>Watch Now</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </View>
          );
        })}
        </Animated.ScrollView>

        {/* Swiper Navigation Chevrons: Left & Right */}
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={handlePrev}
          disabled={activeIndex === 0}
          style={[
            styles.navChevronBtn,
            styles.navChevronLeft,
            activeIndex === 0 && { opacity: 0.35 },
          ]}
        >
          <Text style={styles.navChevronText}>‹</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={handleNext}
          disabled={activeIndex >= items.length - 1}
          style={[
            styles.navChevronBtn,
            styles.navChevronRight,
            activeIndex >= items.length - 1 && { opacity: 0.35 },
          ]}
        >
          <Text style={styles.navChevronText}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Swiper Pagination Bullets */}
      <View style={styles.paginationRow}>
        {items.map((_, idx) => {
          const isActive = idx === activeIndex;
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => scrollToIndex(idx)}
              activeOpacity={0.7}
              style={[
                styles.bullet,
                isActive && styles.bulletActive,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    backgroundColor: '#050505',
    alignItems: 'center',
    position: 'relative',
  },
  carouselContainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginHorizontal: CARD_MARGIN,
    borderRadius: 20,
    backgroundColor: '#151515',
    // 3D Shadow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.75,
    shadowRadius: 16,
    elevation: 8,
  },
  cardTouch: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#262626',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardBaseGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 5, 5, 0.22)',
  },
  slideShadowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    zIndex: 2,
  },
  glowBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E50914',
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.95,
    shadowRadius: 18,
    elevation: 12,
    zIndex: 3,
  },
  topBadgesRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 4,
  },
  badgeTop10: {
    backgroundColor: '#E50914',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    shadowColor: '#E50914',
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 4,
  },
  badgeTop10Text: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(5, 5, 5, 0.88)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.4)',
  },
  ratingStar: {
    color: '#FBBF24',
    fontSize: 10,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  cardBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(5, 5, 5, 0.94)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(48, 48, 48, 0.6)',
    zIndex: 4,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 3,
    marginBottom: 8,
  },
  matchScore: {
    color: '#E50914',
    fontSize: 10,
    fontWeight: '800',
  },
  qualityText: {
    color: '#8A8A8A',
    fontSize: 10,
    fontWeight: '600',
  },
  playBarButton: {
    height: 32,
    borderRadius: 7,
    backgroundColor: '#E50914',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#FF2B36',
  },
  playBarIcon: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  playBarText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  // Navigation Chevrons
  navChevronBtn: {
    position: 'absolute',
    top: '44%',
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(21, 21, 21, 0.92)',
    borderWidth: 1,
    borderColor: '#383838',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    shadowColor: '#000000',
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 8,
  },
  navChevronLeft: {
    left: 10,
  },
  navChevronRight: {
    right: 10,
  },
  navChevronText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 26,
  },
  // Pagination Bullets
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 10,
    marginBottom: 6,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#303030',
  },
  bulletActive: {
    width: 20,
    backgroundColor: '#E50914',
    shadowColor: '#E50914',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 4,
  },
});
