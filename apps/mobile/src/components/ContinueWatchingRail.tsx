import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ContinueWatchingItem } from '@nexora/shared';

interface ContinueWatchingRailProps {
  items: ContinueWatchingItem[];
  onSelect: (item: ContinueWatchingItem) => void;
  onViewAll?: () => void;
}

export const ContinueWatchingRail: React.FC<ContinueWatchingRailProps> = ({
  items,
  onSelect,
  onViewAll,
}) => {
  if (!items || items.length === 0) return null;

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Continue Watching</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onViewAll}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Cards Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {items.map((item) => {
          const progressPercent = Math.min(
            100,
            Math.max(
              15,
              Math.round((item.timestampSeconds / (item.durationSeconds || 1)) * 100)
            )
          );

          const timeRemaining = `${Math.floor(item.timestampSeconds / 3600)}:${String(
            Math.floor((item.timestampSeconds % 3600) / 60)
          ).padStart(2, '0')}:${String(item.timestampSeconds % 60).padStart(2, '0')}`;

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.88}
              onPress={() => onSelect(item)}
              style={styles.cardItem}
            >
              {/* Landscape Thumbnail Box */}
              <View style={styles.thumbnailBox}>
                <Image
                  source={{ uri: item.backdropUrl || item.posterUrl }}
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />

                {/* Ambient dark gradient */}
                <View style={styles.cardGradient} />

                {/* Timestamp overlay */}
                <View style={styles.timestampBadge}>
                  <Text style={styles.timestampText}>{timeRemaining}</Text>
                </View>

                {/* Bottom Scrubber Progress Bar */}
                <View style={styles.scrubberTrack}>
                  <View
                    style={[styles.scrubberFill, { width: `${progressPercent}%` }]}
                  />
                </View>
              </View>

              {/* Title Below Thumbnail */}
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  viewAllText: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 14,
  },
  cardItem: {
    width: 200,
  },
  thumbnailBox: {
    width: 200,
    height: 115,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#161922',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  thumbnailImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  cardGradient: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  timestampBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  timestampText: {
    color: '#D1D5DB',
    fontSize: 10,
    fontWeight: '700',
  },
  scrubberTrack: {
    height: 3.5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginHorizontal: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  scrubberFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '700',
    marginTop: 8,
  },
});
