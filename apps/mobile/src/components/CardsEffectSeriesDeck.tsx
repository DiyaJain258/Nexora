import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  Platform,
} from 'react-native';
import { ContentItem } from '@nexora/shared';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(width * 0.82, 310);
const CARD_HEIGHT = CARD_WIDTH * 1.48;

interface CardsEffectSeriesDeckProps {
  items: ContentItem[];
  onPlay: (item: ContentItem) => void;
  onDetails: (item: ContentItem) => void;
  onToggleFavorite?: (id: string) => void;
  favoriteIds?: string[];
}

export const CardsEffectSeriesDeck: React.FC<CardsEffectSeriesDeckProps> = ({
  items,
  onPlay,
  onDetails,
  onToggleFavorite,
  favoriteIds = [],
}) => {
  const [deck, setDeck] = useState<ContentItem[]>(items);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const idleBreath = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (items && items.length > 0) {
      setDeck(items);
      setCurrentIndex(0);
    }
  }, [items]);

  // Subtle breathing idle animation for premium feel
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(idleBreath, {
          toValue: 1.018,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(idleBreath, {
          toValue: 1.0,
          duration: 2200,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [idleBreath]);

  const swipeOut = (direction: 'left' | 'right') => {
    if (isSwiping) return;
    setIsSwiping(true);
    const toX = direction === 'right' ? width + 100 : -width - 100;
    const toY = direction === 'right' ? 30 : -30;

    Animated.timing(pan, {
      toValue: { x: toX, y: toY },
      duration: 240,
      useNativeDriver: true,
    }).start(() => {
      pan.setValue({ x: 0, y: 0 });
      setDeck((prev) => {
        if (prev.length <= 1) return prev;
        const [first, ...rest] = prev;
        return [...rest, first];
      });
      setCurrentIndex((prev) => (prev + 1) % (items.length || 1));
      setIsSwiping(false);
    });
  };

  const handleNext = () => {
    swipeOut('left');
  };

  const handlePrev = () => {
    if (isSwiping) return;
    setIsSwiping(true);
    setDeck((prev) => {
      if (prev.length <= 1) return prev;
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, prev.length - 1);
      return [last, ...rest];
    });
    setCurrentIndex((prev) => (prev - 1 + (items.length || 1)) % (items.length || 1));

    pan.setValue({ x: -width * 0.7, y: 15 });
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      friction: 6,
      tension: 65,
      useNativeDriver: true,
    }).start(() => {
      setIsSwiping(false);
    });
  };

  const jumpToIndex = (targetIdx: number) => {
    if (isSwiping || targetIdx === currentIndex || !items.length) return;
    setIsSwiping(true);
    const forward = targetIdx > currentIndex;
    Animated.timing(pan, {
      toValue: { x: forward ? -width * 0.4 : width * 0.4, y: 0 },
      duration: 160,
      useNativeDriver: true,
    }).start(() => {
      const reordered = [...items.slice(targetIdx), ...items.slice(0, targetIdx)];
      setDeck(reordered);
      setCurrentIndex(targetIdx);
      pan.setValue({ x: forward ? width * 0.4 : -width * 0.4, y: 0 });
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        friction: 6,
        tension: 65,
        useNativeDriver: true,
      }).start(() => {
        setIsSwiping(false);
      });
    });
  };

  // Pan Responder for fluid gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 6 || Math.abs(gesture.dy) > 6,
      onPanResponderGrant: () => {
        pan.setOffset({ x: 0, y: 0 });
      },
      onPanResponderMove: (_, gesture) => {
        pan.setValue({ x: gesture.dx, y: gesture.dy * 0.35 });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 85 || gesture.vx > 0.5) {
          swipeOut('right');
        } else if (gesture.dx < -85 || gesture.vx < -0.5) {
          swipeOut('left');
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            tension: 60,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!deck || deck.length === 0) return null;

  const topCard = deck[0];
  const isFavorite = favoriteIds.includes(topCard.id);

  // Interpolations for realistic 3D Card movements
  const rotateZ = pan.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['-16deg', '0deg', '16deg'],
    extrapolate: 'clamp',
  });

  const likeStampOpacity = pan.x.interpolate({
    inputRange: [20, 80],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const passStampOpacity = pan.x.interpolate({
    inputRange: [-80, -20],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Scale of the card immediately behind top card as top card moves
  const behindCardScale = pan.x.interpolate({
    inputRange: [-width * 0.5, 0, width * 0.5],
    outputRange: [1.0, 0.94, 1.0],
    extrapolate: 'clamp',
  });

  const behindCardTranslateY = pan.x.interpolate({
    inputRange: [-width * 0.5, 0, width * 0.5],
    outputRange: [0, -16, 0],
    extrapolate: 'clamp',
  });

  // Visible stack count up to 4 items
  const visibleCardsCount = Math.min(deck.length, 4);
  const visibleCards = deck.slice(0, visibleCardsCount);

  return (
    <View style={styles.deckSection}>
      {/* 3D Stack Viewport */}
      <View style={styles.deckViewport}>
        {/* Render stacked cards behind first (index 3 -> 1) */}
        {visibleCards
          .map((item, idx) => ({ item, index: idx }))
          .slice(1) // exclude index 0 (top card)
          .reverse() // render furthest first
          .map(({ item, index }) => {
            const isImmediateBehind = index === 1;

            if (isImmediateBehind) {
              return (
                <Animated.View
                  key={item.id}
                  style={[
                    styles.card,
                    styles.stackedCard,
                    {
                      transform: [
                        { scale: behindCardScale },
                        { translateY: behindCardTranslateY },
                        { rotateZ: '-2deg' },
                      ],
                      opacity: 0.92,
                      zIndex: 20,
                    },
                  ]}
                >
                  <Image
                    source={{ uri: item.posterUrl }}
                    style={styles.cardPoster}
                    resizeMode="cover"
                  />
                  <View style={styles.stackedCardDimmer} />
                  <View style={styles.stackedBorderAccent} />
                </Animated.View>
              );
            }

            // Further cards (index 2 and 3)
            const scale = 1 - index * 0.06;
            const translateY = -index * 14;
            const rotateAngle = index % 2 === 0 ? '2.5deg' : '-2deg';
            const opacity = 1 - index * 0.22;

            return (
              <View
                key={item.id}
                style={[
                  styles.card,
                  styles.stackedCard,
                  {
                    transform: [
                      { scale },
                      { translateY },
                      { rotateZ: rotateAngle },
                    ],
                    opacity,
                    zIndex: 10 - index,
                  },
                ]}
              >
                <Image
                  source={{ uri: item.posterUrl }}
                  style={styles.cardPoster}
                  resizeMode="cover"
                />
                <View style={styles.stackedCardDimmer} />
                <View style={styles.stackedBorderAccent} />
              </View>
            );
          })}

        {/* ─────────────────────────────────────────────────────────────
            FRONT INTERACTIVE TOP CARD (Index 0)
        ───────────────────────────────────────────────────────────── */}
        <Animated.View
          key={topCard.id}
          {...panResponder.panHandlers}
          style={[
            styles.card,
            styles.topCard,
            {
              transform: [
                { translateX: pan.x },
                { translateY: pan.y },
                { rotateZ },
                { scale: idleBreath },
              ],
            },
          ]}
        >
          {/* Main Cover Image */}
          <Image
            source={{ uri: topCard.posterUrl }}
            style={styles.cardPoster}
            resizeMode="cover"
          />

          {/* Top Vignette for Badges */}
          <View style={styles.topVignette} />

          {/* Deep Cinematic Bottom Gradient for Rich Text Legibility */}
          <View style={styles.bottomVignetteBase} />
          <View style={styles.bottomVignetteCore} />

          {/* Glowing Burgundy Focus Border */}
          <View style={styles.topCardGlowBorder} />

          {/* Floating Gesture Indicators (Like / Next) */}
          <Animated.View
            pointerEvents="none"
            style={[styles.stampContainer, styles.stampLike, { opacity: likeStampOpacity }]}
          >
            <Text style={styles.stampLikeText}>WATCH NOW ▶</Text>
          </Animated.View>

          <Animated.View
            pointerEvents="none"
            style={[styles.stampContainer, styles.stampPass, { opacity: passStampOpacity }]}
          >
            <Text style={styles.stampPassText}>NEXT ❯</Text>
          </Animated.View>

          {/* Top Header Badges */}
          <View style={styles.topBadgesRow}>
            <View style={styles.badgeSeries}>
              <View style={styles.redDot} />
              <Text style={styles.badgeSeriesText}>NEXORA ORIGINAL</Text>
            </View>

            <View style={styles.topRightBadges}>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingStar}>★</Text>
                <Text style={styles.ratingText}>{topCard.rating}</Text>
              </View>

              <View style={styles.qualityPill}>
                <Text style={styles.qualityPillText}>{topCard.quality || '4K HDR'}</Text>
              </View>
            </View>
          </View>

          {/* Netflix Signature Bottom Content Block */}
          <View style={styles.cardFooter}>
            {/* Trending Rank Pill */}
            <View style={styles.trendingPill}>
              <Text style={styles.trendingPillIcon}>🔥</Text>
              <Text style={styles.trendingPillText}>#1 IN SERIES TODAY</Text>
            </View>

            {/* Title */}
            <Text style={styles.cardTitle} numberOfLines={1}>
              {topCard.title}
            </Text>

            {/* Meta Tags */}
            <View style={styles.cardMetaRow}>
              <Text style={styles.matchScore}>{topCard.matchScore || 98}% Match</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.cardMetaText}>
                {topCard.seasonsCount ? `${topCard.seasonsCount} Seasons` : topCard.duration}
              </Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.cardMetaText}>
                {topCard.genres ? topCard.genres[0] : 'Sci-Fi'}
              </Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.cardMetaText}>{topCard.releaseYear || '2026'}</Text>
            </View>

            {/* Synopsis Preview */}
            <Text style={styles.synopsisText} numberOfLines={2}>
              {topCard.synopsis ||
                'Stream this award-winning cinematic saga in ultra-high bitrate 4K HDR and spatial audio.'}
            </Text>

            {/* Premium CTA Buttons */}
            <View style={styles.cardButtonsRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => onPlay(topCard)}
                style={styles.watchBtn}
              >
                <Text style={styles.watchBtnIcon}>▶</Text>
                <Text style={styles.watchBtnText}>Watch Now</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onDetails(topCard)}
                style={styles.detailsBtn}
              >
                <Text style={styles.detailsBtnText}>Details</Text>
              </TouchableOpacity>

              {onToggleFavorite && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => onToggleFavorite(topCard.id)}
                  style={[styles.favBtn, isFavorite && styles.favBtnActive]}
                >
                  <Text style={[styles.favBtnText, isFavorite && styles.favBtnTextActive]}>
                    {isFavorite ? '✓' : '+'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Navigation Controls: Previous / Next & Interactive Hint */}
      <View style={styles.controlsRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handlePrev}
          style={styles.navArrowBtn}
        >
          <Text style={styles.navArrowText}>‹</Text>
        </TouchableOpacity>

        <View style={styles.stackIndicator}>
          <View style={styles.indicatorHintRow}>
            <Text style={styles.sparkleIcon}>✦</Text>
            <Text style={styles.stackIndicatorText}>SWIPE CARD OR TAP ARROWS</Text>
            <Text style={styles.sparkleIcon}>✦</Text>
          </View>

          {/* Animated Indicator Dots */}
          <View style={styles.dotPillsRow}>
            {items.map((item, i) => {
              const isActive = i === currentIndex;
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.7}
                  onPress={() => jumpToIndex(i)}
                  style={[
                    styles.indicatorDot,
                    isActive && styles.indicatorDotActive,
                  ]}
                />
              );
            })}
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleNext}
          style={styles.navArrowBtn}
        >
          <Text style={styles.navArrowText}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deckSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    backgroundColor: '#07080B',
  },
  deckViewport: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT + 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 8,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 22,
    position: 'absolute',
    backgroundColor: '#121216',
    overflow: 'hidden',
  },
  topCard: {
    zIndex: 40,
    borderWidth: 1.5,
    borderColor: 'rgba(128, 0, 32, 0.75)',
    shadowColor: '#800020',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.85,
    shadowRadius: 22,
    elevation: 16,
  },
  topCardGlowBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#990024',
    pointerEvents: 'none',
  },
  stackedCard: {
    borderWidth: 1,
    borderColor: 'rgba(128, 0, 32, 0.35)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 14,
    elevation: 8,
  },
  stackedCardDimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(7, 8, 11, 0.55)',
  },
  stackedBorderAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardPoster: {
    width: '100%',
    height: '100%',
  },
  topVignette: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: 'rgba(7, 8, 11, 0.65)',
  },
  bottomVignetteBase: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 250,
    backgroundColor: 'rgba(7, 8, 11, 0.75)',
  },
  bottomVignetteCore: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 180,
    backgroundColor: 'rgba(7, 8, 11, 0.96)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 0, 32, 0.4)',
  },
  topBadgesRow: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 5,
  },
  badgeSeries: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(128, 0, 32, 0.85)',
    borderWidth: 1,
    borderColor: '#990024',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    shadowColor: '#800020',
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 6,
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  badgeSeriesText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 10,
    letterSpacing: 0.8,
  },
  topRightBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(7, 8, 11, 0.88)',
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.45)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 7,
  },
  ratingStar: {
    color: '#FBBF24',
    fontSize: 11,
    fontWeight: '900',
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  qualityPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  qualityPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  stampContainer: {
    position: 'absolute',
    top: 50,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 2,
    zIndex: 10,
  },
  stampLike: {
    right: 20,
    backgroundColor: 'rgba(128, 0, 32, 0.88)',
    borderColor: '#FF4D6D',
    transform: [{ rotate: '12deg' }],
  },
  stampLikeText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 1,
  },
  stampPass: {
    left: 20,
    backgroundColor: 'rgba(25, 25, 30, 0.9)',
    borderColor: '#71717A',
    transform: [{ rotate: '-12deg' }],
  },
  stampPassText: {
    color: '#E4E4E7',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 1,
  },
  cardFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 14,
    zIndex: 5,
  },
  trendingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 5,
  },
  trendingPillIcon: {
    fontSize: 12,
  },
  trendingPillText: {
    color: '#FF6685',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
    marginBottom: 6,
  },
  matchScore: {
    color: '#FF4D6D',
    fontSize: 11,
    fontWeight: '900',
  },
  metaDot: {
    color: '#71717A',
    fontSize: 10,
  },
  cardMetaText: {
    color: '#D4D4D8',
    fontSize: 11,
    fontWeight: '700',
  },
  synopsisText: {
    color: '#A1A1AA',
    fontSize: 11,
    lineHeight: 15,
    marginBottom: 12,
  },
  cardButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  watchBtn: {
    flex: 1.5,
    height: 40,
    backgroundColor: '#800020',
    borderRadius: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderWidth: 1,
    borderColor: '#990024',
    shadowColor: '#800020',
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 6,
  },
  watchBtnIcon: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  watchBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  detailsBtn: {
    flex: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  favBtn: {
    width: 40,
    height: 40,
    borderRadius: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favBtnActive: {
    backgroundColor: 'rgba(128, 0, 32, 0.45)',
    borderColor: '#800020',
  },
  favBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
  },
  favBtnTextActive: {
    color: '#FF4D6D',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: CARD_WIDTH + 48,
    marginTop: 12,
  },
  navArrowBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(18, 18, 24, 0.92)',
    borderWidth: 1.5,
    borderColor: 'rgba(128, 0, 32, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  navArrowText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 28,
  },
  stackIndicator: {
    alignItems: 'center',
  },
  indicatorHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sparkleIcon: {
    color: '#FF4D6D',
    fontSize: 10,
  },
  stackIndicatorText: {
    color: '#D4D4D8',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  dotPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 7,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#27272A',
  },
  indicatorDotActive: {
    width: 22,
    backgroundColor: '#800020',
    shadowColor: '#800020',
    shadowOpacity: 0.95,
    shadowRadius: 6,
    elevation: 4,
  },
});
