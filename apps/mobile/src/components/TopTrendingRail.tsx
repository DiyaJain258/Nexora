import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ContentItem } from '@nexora/shared';
import { ShineBorder } from './ShineBorder';

interface TopTrendingRailProps {
  items: ContentItem[];
  onSelect: (item: ContentItem) => void;
  onViewAll?: () => void;
}

export const TopTrendingRail: React.FC<TopTrendingRailProps> = ({
  items,
  onSelect,
  onViewAll,
}) => {
  if (!items || items.length === 0) return null;

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Top Trending</Text>
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
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.88}
            onPress={() => onSelect(item)}
            style={styles.cardItem}
          >
            <View style={styles.posterBox}>
              <Image
                source={{ uri: item.posterUrl }}
                style={styles.posterImage}
                resizeMode="cover"
              />
              <ShineBorder borderRadius={14} borderWidth={1.5} duration={6} />
              
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>★ {item.rating}</Text>
              </View>
            </View>

            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
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
    gap: 12,
  },
  cardItem: {
    width: 115,
  },
  posterBox: {
    width: 115,
    height: 170,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#161922',
    position: 'relative',
    marginBottom: 6,
  },
  posterImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    color: '#FBBF24',
    fontSize: 10,
    fontWeight: '800',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '600',
  },
});
