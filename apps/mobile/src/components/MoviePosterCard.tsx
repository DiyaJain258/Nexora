import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { ContentItem } from '@nexora/shared';

interface MoviePosterCardProps {
  item: ContentItem;
  onPress: (item: ContentItem) => void;
  badgeType?: 'TOP 10' | '4K' | 'NEW' | 'ORIGINAL';
  width?: number;
  height?: number;
}

export const MoviePosterCard: React.FC<MoviePosterCardProps> = ({
  item,
  onPress,
  badgeType = item.rating >= 9.0 ? 'TOP 10' : item.quality === '4K HDR' ? '4K' : undefined,
  width = 135,
  height = 195,
}) => {
  const scaleAnim = useRef(new Animated.Value(1.0)).current;
  const rotateXAnim = useRef(new Animated.Value(0)).current;
  const rotateYAnim = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1.06,
        useNativeDriver: true,
        friction: 6,
        tension: 100,
      }),
      Animated.timing(rotateXAnim, {
        toValue: 1, // Slight 3D tilt backwards
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(rotateYAnim, {
        toValue: 1, // Slight 3D perspective angle
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(glowOpacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1.0,
        useNativeDriver: true,
        friction: 5,
        tension: 80,
      }),
      Animated.timing(rotateXAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(rotateYAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(glowOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const rotateX = rotateXAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-4deg'],
  });

  const rotateY = rotateYAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '3deg'],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => onPress(item)}
      style={[styles.wrapper, { width }]}
    >
      <Animated.View
        style={[
          styles.cardContainer,
          {
            width,
            height,
            transform: [
              { perspective: 800 },
              { scale: scaleAnim },
              { rotateX },
              { rotateY },
            ],
          },
        ]}
      >
        {/* Poster Image */}
        <Image
          source={{ uri: item.posterUrl }}
          style={styles.posterImage}
          resizeMode="cover"
        />

        {/* 3D Gradient Vignette */}
        <View style={styles.gradientOverlay} />

        {/* Dynamic Red Glow Border Overlay on Press */}
        <Animated.View
          pointerEvents="none"
          style={[styles.glowBorder, { opacity: glowOpacity }]}
        />

        {/* Top Badges */}
        <View style={styles.topBadgesRow}>
          {badgeType && (
            <View
              style={[
                styles.badgePill,
                badgeType === 'TOP 10' ? styles.badgeTop10 : styles.badgeDark,
              ]}
            >
              <Text style={styles.badgeText}>{badgeType}</Text>
            </View>
          )}

          <View style={styles.ratingBadge}>
            <Text style={styles.ratingStar}>★</Text>
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>

        {/* Bottom Metadata & Title */}
        <View style={styles.cardFooter}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.metaRow}>
            <Text style={styles.matchScore}>{item.matchScore}% Match</Text>
            <Text style={styles.year}>{item.releaseYear}</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 12,
    marginBottom: 8,
  },
  cardContainer: {
    borderRadius: 12,
    backgroundColor: '#151515',
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#262626',
    // 3D Shadow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  posterImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 5, 5, 0.25)',
  },
  glowBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E50914',
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 8,
  },
  topBadgesRow: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  badgePill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeTop10: {
    backgroundColor: '#E50914',
    shadowColor: '#E50914',
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeDark: {
    backgroundColor: 'rgba(21, 21, 21, 0.9)',
    borderWidth: 1,
    borderColor: '#383838',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(5, 5, 5, 0.85)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  ratingStar: {
    color: '#FBBF24',
    fontSize: 9,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  cardFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: 'rgba(5, 5, 5, 0.88)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(48, 48, 48, 0.4)',
    zIndex: 2,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 3,
  },
  matchScore: {
    color: '#E50914',
    fontSize: 10,
    fontWeight: '800',
  },
  year: {
    color: '#8A8A8A',
    fontSize: 10,
    fontWeight: '600',
  },
});
