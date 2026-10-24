import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { ContentItem } from '@nexora/shared';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.82;
const CARD_HEIGHT = 185;
const CARD_SPACING = 14;

interface PremiumBillboardCarouselProps {
  items: ContentItem[];
  onSelect: (item: ContentItem) => void;
  onPlay: (item: ContentItem) => void;
}

export const PremiumBillboardCarousel: React.FC<PremiumBillboardCarouselProps> = ({
  items,
  onSelect,
  onPlay,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const displayItems = items.slice(0, 5);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / (CARD_WIDTH + CARD_SPACING));
    if (index >= 0 && index < displayItems.length && index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleDotPress = (index: number) => {
    setActiveIndex(index);
    scrollRef.current?.scrollTo({
      x: index * (CARD_WIDTH + CARD_SPACING),
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {displayItems.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.92}
              onPress={() => onSelect(item)}
              style={styles.cardWrapper}
            >
              <View style={styles.card}>
                <Image
                  source={{ uri: item.backdropUrl || item.posterUrl }}
                  style={styles.backdropImage}
                  resizeMode="cover"
                />

                {/* Subtle Cinematic Vignette */}
                <View style={styles.vignetteOverlay} />

                {/* Center / Bottom Badge & Title */}
                <View style={styles.cardContent}>
                  <View style={styles.topBadgeRow}>
                    <View style={styles.qualityPill}>
                      <Text style={styles.qualityText}>4K ULTRA</Text>
                    </View>
                    <View style={styles.matchPill}>
                      <Text style={styles.matchText}>{item.matchScore}% Match</Text>
                    </View>
                  </View>

                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.genreMeta} numberOfLines={1}>
                    {item.releaseYear} • {item.genres.slice(0, 2).join(' / ')} • ★ {item.rating}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Pill & Dots Indicator Under Billboard */}
      <View style={styles.indicatorRow}>
        {displayItems.map((_, i) => {
          const isActive = i === activeIndex;
          return (
            <TouchableOpacity
              key={i}
              onPress={() => handleDotPress(i)}
              hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
              style={[
                styles.dot,
                isActive ? styles.dotActive : styles.dotInactive,
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
    marginVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: CARD_SPACING,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 18,
    shadowColor: '#800020',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#12141C',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  backdropImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  vignetteOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(7, 8, 11, 0.42)',
  },
  cardContent: {
    padding: 16,
    zIndex: 10,
  },
  topBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  qualityPill: {
    backgroundColor: 'rgba(153, 0, 36, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  qualityText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  matchPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  matchText: {
    color: '#4ADE80',
    fontSize: 10,
    fontWeight: '700',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  genreMeta: {
    color: '#D1D5DB',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 22,
    backgroundColor: '#FFFFFF',
  },
  dotInactive: {
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
  },
});
