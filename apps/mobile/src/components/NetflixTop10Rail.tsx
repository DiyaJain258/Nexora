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
import { NetflixRankNumber } from './NetflixRankNumber';
import { ShineBorder } from './ShineBorder';

interface NetflixTop10RailProps {
  title?: string;
  badge?: string;
  items: ContentItem[];
  onSelect: (item: ContentItem) => void;
  onSeeAll?: () => void;
}

export const NetflixTop10Rail: React.FC<NetflixTop10RailProps> = ({
  title = 'Top 10 Movies in India Today',
  badge = '#1 TRENDING',
  items,
  onSelect,
  onSeeAll,
}) => {
  const top10List = items.slice(0, 10);

  return (
    <View style={styles.section}>
      {/* Section Header with Netflix typography */}
      <View style={styles.headerRow}>
        <View style={styles.titleWrap}>
          <View style={styles.badgeRow}>
            <View style={styles.badgePill}>
              <Text style={styles.badgePillText}>{badge}</Text>
            </View>
            <Text style={styles.tagline}>MOST WATCHED TODAY</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>

        {onSeeAll && (
          <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7} style={styles.seeAllBtn}>
            <Text style={styles.seeAllText}>See all ›</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Horizontal Scroll Rail with Giant Hollow Outlined Rank Numbers */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {top10List.map((item, index) => {
          const rank = index + 1;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.88}
              onPress={() => onSelect(item)}
              style={styles.cardItem}
            >
              {/* Giant Netflix Hollow Outlined Number */}
              <View style={styles.numberContainer}>
                <NetflixRankNumber rank={rank} size={132} />
              </View>

              {/* Elevated Overlapping Poster Card with ShineBorder */}
              <View style={styles.posterContainer}>
                <View style={styles.posterBox}>
                  <Image
                    source={{ uri: item.posterUrl }}
                    style={styles.posterImage}
                    resizeMode="cover"
                  />

                  {/* Dark Vignette Bottom Gradient */}
                  <View style={styles.vignette} />

                  {/* MagicUI Shine Border */}
                  <ShineBorder borderRadius={12} borderWidth={1.5} duration={6 + (index % 3)} />

                  {/* Top Badges */}
                  <View style={styles.posterBadges}>
                    <View style={styles.rankPill}>
                      <Text style={styles.rankPillText}>TOP 10</Text>
                    </View>
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingStar}>★</Text>
                      <Text style={styles.ratingScore}>{item.rating}</Text>
                    </View>
                  </View>

                  {/* Bottom Quality Pill */}
                  <View style={styles.qualityPill}>
                    <Text style={styles.qualityText}>{item.quality || '4K HDR'}</Text>
                  </View>
                </View>

                {/* Subtitle / Title below poster */}
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.itemMatch}>
                  {item.matchScore || 98}% Match • {item.genres ? item.genres[0] : 'Action'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 14,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  titleWrap: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  badgePill: {
    backgroundColor: 'rgba(128, 0, 32, 0.45)',
    borderWidth: 1,
    borderColor: '#800020',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
  },
  badgePillText: {
    color: '#FF6685',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  tagline: {
    color: '#A1A1AA',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  seeAllBtn: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  seeAllText: {
    color: '#FF4D6D',
    fontSize: 13,
    fontWeight: '700',
  },
  scrollContent: {
    paddingLeft: 12,
    paddingRight: 20,
    paddingVertical: 8,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 10,
    position: 'relative',
  },
  numberContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1,
    marginBottom: 28,
  },
  posterContainer: {
    marginLeft: -26,
    zIndex: 2,
    width: 128,
  },
  posterBox: {
    width: 128,
    height: 182,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#121216',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
    position: 'relative',
  },
  posterImage: {
    width: '100%',
    height: '100%',
  },
  vignette: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 65,
    backgroundColor: 'rgba(7, 8, 11, 0.65)',
  },
  posterBadges: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 5,
  },
  rankPill: {
    backgroundColor: '#800020',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#990024',
    shadowColor: '#800020',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
  rankPillText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(7, 8, 11, 0.85)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.35)',
  },
  ratingStar: {
    color: '#FBBF24',
    fontSize: 9,
    fontWeight: '900',
  },
  ratingScore: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  qualityPill: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(7, 8, 11, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
    zIndex: 5,
  },
  qualityText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
  },
  itemTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 7,
    letterSpacing: 0.2,
  },
  itemMatch: {
    color: '#FF4D6D',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
});
