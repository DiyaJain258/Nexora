import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { ContinueWatchingItem } from '@nexora/shared';
import { ShineBorder } from './ShineBorder';

interface ContinueWatchingCardProps {
  item: ContinueWatchingItem;
  onPress: (item: ContinueWatchingItem) => void;
  width?: number;
}

export const ContinueWatchingCard: React.FC<ContinueWatchingCardProps> = ({
  item,
  onPress,
  width = 240,
}) => {
  const scaleAnim = useRef(new Animated.Value(1.0)).current;
  const playPulseAnim = useRef(new Animated.Value(1.0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1.05,
        useNativeDriver: true,
        friction: 5,
        tension: 100,
      }),
      Animated.spring(playPulseAnim, {
        toValue: 1.25,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
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
      Animated.spring(playPulseAnim, {
        toValue: 1.0,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const remainingMin = Math.max(
    10,
    Math.round(
      ((item.durationSeconds - item.timestampSeconds) / 60) || 45
    )
  );

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => onPress(item)}
      style={[styles.wrapper, { width }]}
    >
      <Animated.View
        style={{
          transform: [{ perspective: 800 }, { scale: scaleAnim }],
        }}
      >
        <View style={[styles.container, { width }]}>
        {/* Animated Shine Border */}
        <ShineBorder borderRadius={14} borderWidth={1.5} duration={7} />

        {/* Landscape Backdrop Image */}
        <View style={styles.imageBox}>
          <Image
            source={{ uri: item.backdropUrl || item.posterUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.darkGradient} />

          {/* Red Glow Outline on Touch */}
          <Animated.View
            pointerEvents="none"
            style={[styles.glowBorder, { opacity: glowAnim }]}
          />

          {/* Center Play Button Overlay */}
          <Animated.View
            style={[
              styles.playButtonCircle,
              { transform: [{ scale: playPulseAnim }] },
            ]}
          >
            <Text style={styles.playIcon}>▶</Text>
          </Animated.View>

          {/* Remaining Time Badge */}
          <View style={styles.timeBadge}>
            <Text style={styles.timeBadgeText}>{remainingMin}m remaining</Text>
          </View>
        </View>

        {/* Animated Red Progress Bar */}
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.min(100, Math.max(10, item.progressPercentage))}%` },
            ]}
          />
        </View>

        {/* Card Info Footer */}
        <View style={styles.infoFooter}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.subtext} numberOfLines={1}>
            {item.subtitle || (item.type === 'movie' ? 'Feature Film' : 'Continuous Stream')}
          </Text>
        </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 14,
    marginBottom: 6,
  },
  container: {
    borderRadius: 12,
    backgroundColor: '#151515',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#262626',
    // 3D Shadow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  imageBox: {
    height: 135,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D0D0D',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  darkGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 5, 5, 0.4)',
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
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
  },
  playButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(229, 9, 20, 0.95)',
    borderWidth: 2,
    borderColor: '#FF2B36',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
  },
  playIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    marginLeft: 3,
  },
  timeBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(5, 5, 5, 0.85)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#303030',
  },
  timeBadgeText: {
    color: '#E5E5E5',
    fontSize: 10,
    fontWeight: '700',
  },
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: '#262626',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E50914',
  },
  infoFooter: {
    padding: 10,
    backgroundColor: '#151515',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  subtext: {
    color: '#8A8A8A',
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
});
