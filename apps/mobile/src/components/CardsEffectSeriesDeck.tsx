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
const CARD_WIDTH = Math.min(width * 0.76, 280);
const CARD_HEIGHT = CARD_WIDTH * 1.45;

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
  const pan = useRef(new Animated.ValueXY()).current;
  const cardScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (items && items.length > 0) {
      setDeck(items);
    }
  }, [items]);

  // Swipe gesture handler
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 10,
      onPanResponderMove: (_, gesture) => {
        pan.setValue({ x: gesture.dx, y: gesture.dy * 0.4 });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 100) {
          swipeOut('right');
        } else if (gesture.dx < -100) {
          swipeOut('left');
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            tension: 50,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const swipeOut = (direction: 'left' | 'right') => {
    const toX = direction === 'right' ? width + 80 : -width - 80;
    Animated.timing(pan, {
      toValue: { x: toX, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      pan.setValue({ x: 0, y: 0 });
      // Cycle first card to end
      setDeck((prev) => {
        if (prev.length <= 1) return prev;
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    });
  };

  const handleNext = () => {
    swipeOut('left');
  };

  const handlePrev = () => {
    // Take last card and bring it to front with smooth entrance
    setDeck((prev) => {
      if (prev.length <= 1) return prev;
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, prev.length - 1);
      return [last, ...rest];
    });
    pan.setValue({ x: -width * 0.6, y: 0 });
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      friction: 6,
      tension: 60,
      useNativeDriver: false,
    }).start();
  };

  if (!deck.length) return null;

  const topCard = deck[0];
  const isFavorite = favoriteIds.includes(topCard.id);

  // Rotation based on horizontal pan
  const rotateZ = pan.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['-16deg', '0deg', '16deg'],
  });

  return (
    <View style={styles.deckSection}>
      {/* 3D Stack Viewport */}
      <View style={styles.deckViewport}>
        {/* Render bottom cards first (reverse stack for proper zIndex) */}
        {deck.slice(0, 4).reverse().map((item, reverseIndex) => {
          const index = 3 - reverseIndex; // 0 is top, 1 is middle, 2 is bottom, 3 is furthest
          if (index === 0) {
            // Front / Top Interactive Card
            return (
              <Animated.View
                key={item.id}
                {...panResponder.panHandlers}
                style={[
                  styles.card,
                  styles.topCard,
                  {
                    transform: [
                      { translateX: pan.x },
                      { translateY: pan.y },
                      { rotateZ },
                    ],
                  },
                ]}
              >
                <Image
                  source={{ uri: item.posterUrl }}
                  style={styles.cardPoster}
                  resizeMode="cover"
                />

                {/* Dark Vignette Overlay */}
                <View style={styles.cardGradient} />

                {/* Red Focus Highlight Border */}
                <View style={styles.topCardRedBorder} />

                {/* Top Badges */}
                <View style={styles.topBadgesRow}>
                  <View style={styles.badgeSeries}>
                    <Text style={styles.badgeSeriesText}>NEXORA SERIES</Text>
                  </View>
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingStar}>★</Text>
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>

                {/* Card Content Footer */}
                <View style={styles.cardFooter}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.cardMeta}>
                    {item.seasonsCount ? `${item.seasonsCount} Seasons` : item.duration} •{' '}
                    {item.genres ? item.genres[0] : 'Sci-Fi'} • {item.quality || '4K HDR'}
                  </Text>

                  {/* Actions inside card */}
                  <View style={styles.cardButtonsRow}>
                    <TouchableOpacity
                      activeOpacity={0.88}
                      onPress={() => onPlay(item)}
                      style={styles.watchBtn}
                    >
                      <Text style={styles.watchBtnIcon}>▶</Text>
                      <Text style={styles.watchBtnText}>Watch Now</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => onDetails(item)}
                      style={styles.detailsBtn}
                    >
                      <Text style={styles.detailsBtnText}>Details</Text>
                    </TouchableOpacity>

                    {onToggleFavorite && (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => onToggleFavorite(item.id)}
                        style={[
                          styles.favBtn,
                          isFavorite && styles.favBtnActive,
                        ]}
                      >
                        <Text style={styles.favBtnText}>
                          {isFavorite ? '✓' : '+'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </Animated.View>
            );
          }

          // Stacked cards behind (0-based: index 1, 2, 3)
          const scale = 1 - index * 0.06;
          const translateY = index * 14;
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
              <View style={styles.stackedCardOverlay} />
            </View>
          );
        })}
      </View>

      {/* Navigation Controls: Previous / Next & Hint */}
      <View style={styles.controlsRow}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={handlePrev}
          style={styles.navArrowBtn}
        >
          <Text style={styles.navArrowText}>‹</Text>
        </TouchableOpacity>

        <View style={styles.stackIndicator}>
          <Text style={styles.stackIndicatorText}>
            SWIPE CARD OR TAP ARROWS
          </Text>
          <View style={styles.dotPillsRow}>
            {deck.slice(0, 5).map((d, i) => (
              <View
                key={d.id}
                style={[
                  styles.indicatorDot,
                  i === 0 && styles.indicatorDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.75}
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
    paddingVertical: 18,
    backgroundColor: '#050505',
  },
  deckViewport: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT + 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 22,
    position: 'absolute',
    backgroundColor: '#151515',
    overflow: 'hidden',
  },
  topCard: {
    zIndex: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(128, 0, 32, 0.7)',
    shadowColor: '#800020',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 18,
    elevation: 12,
  },
  topCardRedBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#800020',
    opacity: 0.9,
    pointerEvents: 'none',
  },
  stackedCard: {
    borderWidth: 1,
    borderColor: '#303030',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  stackedCardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 5, 5, 0.45)',
  },
  cardPoster: {
    width: '100%',
    height: '100%',
  },
  cardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 5, 5, 0.35)',
  },
  topBadgesRow: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  badgeSeries: {
    backgroundColor: 'rgba(128, 0, 32, 0.3)',
    borderWidth: 1,
    borderColor: '#800020',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    shadowColor: '#800020',
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
  badgeSeriesText: {
    color: '#FF6685',
    fontWeight: '800',
    fontSize: 10,
    letterSpacing: 0.8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(5, 5, 5, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.4)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
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
  cardFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 14,
    backgroundColor: 'rgba(5, 5, 5, 0.92)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(48, 48, 48, 0.6)',
    zIndex: 2,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  cardMeta: {
    color: '#B3B3B3',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 3,
    marginBottom: 10,
  },
  cardButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  watchBtn: {
    flex: 1.4,
    height: 38,
    backgroundColor: '#800020',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#990024',
    shadowColor: '#800020',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  watchBtnIcon: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  watchBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  detailsBtn: {
    flex: 1,
    height: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  favBtn: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favBtnActive: {
    backgroundColor: 'rgba(128, 0, 32, 0.35)',
    borderColor: '#800020',
  },
  favBtnText: {
    color: '#FF4D6D',
    fontSize: 16,
    fontWeight: '700',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: CARD_WIDTH + 48,
    marginTop: 10,
  },
  navArrowBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
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
  stackIndicatorText: {
    color: '#A1A1AA',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  dotPillsRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 6,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#303030',
  },
  indicatorDotActive: {
    width: 16,
    backgroundColor: '#800020',
    shadowColor: '#800020',
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 3,
  },
});
