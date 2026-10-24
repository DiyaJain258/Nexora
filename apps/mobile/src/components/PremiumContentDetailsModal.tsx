import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import { ContentItem } from '@nexora/shared';

const { width } = Dimensions.get('window');

interface PremiumContentDetailsModalProps {
  item: ContentItem | null;
  visible: boolean;
  onClose: () => void;
  onPlay: (item: ContentItem) => void;
  onSelectRelated: (item: ContentItem) => void;
  relatedItems: ContentItem[];
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const PremiumContentDetailsModal: React.FC<PremiumContentDetailsModalProps> = ({
  item,
  visible,
  onClose,
  onPlay,
  onSelectRelated,
  relatedItems,
  isFavorite,
  onToggleFavorite,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);

  if (!item) return null;

  const synopsisText = item.synopsis ||
    `${item.title} is an acclaimed cinematic production following an extraordinary story with rich emotional dynamics, gripping sequences, and cutting-edge 4K HDR Dolby Atmos master audio presentation.`;

  const displayedSynopsis = !isExpanded && synopsisText.length > 140
    ? synopsisText.slice(0, 140) + '...'
    : synopsisText;

  const handleReviewPress = () => {
    setShowReviewPrompt(true);
    setTimeout(() => {
      setShowReviewPrompt(false);
    }, 2800);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Floating Circular Top-Left Back Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClose}
          style={styles.backButton}
        >
          <Text style={styles.backButtonIcon}>←</Text>
        </TouchableOpacity>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Full-Bleed Cinematic Backdrop */}
          <View style={styles.backdropBox}>
            <Image
              source={{ uri: item.backdropUrl || item.posterUrl }}
              style={styles.backdropImage}
              resizeMode="cover"
            />
            {/* Cinematic Gradient Fade into Deep Pitch Black */}
            <View style={styles.bottomGradient} />
          </View>

          {/* Details Content Container */}
          <View style={styles.detailsBody}>
            {/* Title & 4k Ultra Badge Row */}
            <View style={styles.titleRow}>
              <Text style={styles.titleText}>{item.title}</Text>
              <View style={styles.ultraBadge}>
                <Text style={styles.ultraBadgeText}>4k Ultra</Text>
              </View>
            </View>

            {/* Metadata Line */}
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{item.releaseYear}</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>▶ {item.genres[0] || 'Drama'}</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>⏱ {item.duration || '1:45:00'}</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaRating}>★ {item.rating} Ratings</Text>
            </View>

            {/* Full-Width Burgundy / Red Play CTA Button */}
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => onPlay(item)}
              style={styles.playButton}
            >
              <Text style={styles.playButtonText}>Play Free Now</Text>
            </TouchableOpacity>

            {/* Synopsis Paragraph with Read More */}
            <View style={styles.synopsisBox}>
              <Text style={styles.synopsisText}>
                {displayedSynopsis}{' '}
                {synopsisText.length > 140 && (
                  <Text
                    style={styles.readMoreText}
                    onPress={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? 'Show Less' : 'Read More'}
                  </Text>
                )}
              </Text>
            </View>

            {/* Action Row: Like, Review, Save */}
            <View style={styles.actionRow}>
              {/* Like */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsLiked(!isLiked)}
                style={styles.actionItem}
              >
                <Text style={[styles.actionIcon, isLiked && { color: '#E50914' }]}>
                  {isLiked ? '❤️' : '👍'}
                </Text>
                <Text style={[styles.actionLabel, isLiked && { color: '#FFFFFF' }]}>
                  {isLiked ? 'Liked' : 'Like'}
                </Text>
              </TouchableOpacity>

              {/* Review */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleReviewPress}
                style={styles.actionItem}
              >
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.actionLabel}>Review</Text>
              </TouchableOpacity>

              {/* Save / Watchlist */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onToggleFavorite(item.id)}
                style={styles.actionItem}
              >
                <Text style={[styles.actionIcon, isFavorite && { color: '#E50914' }]}>
                  {isFavorite ? '🔖' : '🔖'}
                </Text>
                <Text style={[styles.actionLabel, isFavorite && { color: '#FFFFFF' }]}>
                  {isFavorite ? 'Saved' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Feedback notification for review */}
            {showReviewPrompt && (
              <View style={styles.reviewToast}>
                <Text style={styles.reviewToastText}>★ Rated 5 Stars! Thank you for reviewing.</Text>
              </View>
            )}

            {/* Related Titles Section */}
            <View style={styles.relatedHeaderRow}>
              <Text style={styles.relatedTitle}>Related</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.relatedViewAll}>View All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedScroll}
            >
              {relatedItems.slice(0, 6).map((rel) => (
                <TouchableOpacity
                  key={rel.id}
                  activeOpacity={0.88}
                  onPress={() => onSelectRelated(rel)}
                  style={styles.relatedCard}
                >
                  <View style={styles.relatedImageBox}>
                    <Image
                      source={{ uri: rel.posterUrl }}
                      style={styles.relatedImage}
                      resizeMode="cover"
                    />
                  </View>
                  <Text style={styles.relatedCardTitle} numberOfLines={1}>
                    {rel.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={{ height: 40 }} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07080B',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 52 : 36,
    left: 18,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  backButtonIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginTop: -2,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  backdropBox: {
    width: '100%',
    height: 330,
    position: 'relative',
    backgroundColor: '#12141C',
  },
  backdropImage: {
    width: '100%',
    height: '100%',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'transparent',
    borderBottomWidth: 120,
    borderBottomColor: '#07080B',
    opacity: 0.96,
  },
  detailsBody: {
    paddingHorizontal: 20,
    marginTop: -30,
    zIndex: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 6,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  ultraBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  ultraBadgeText: {
    color: '#E5E7EB',
    fontSize: 11,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  metaText: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '500',
  },
  metaDot: {
    color: '#6B7280',
    fontSize: 13,
  },
  metaRating: {
    color: '#FBBF24',
    fontSize: 13,
    fontWeight: '700',
  },
  playButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#E50914',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  synopsisBox: {
    marginBottom: 20,
  },
  synopsisText: {
    color: '#9CA3AF',
    fontSize: 13.5,
    lineHeight: 20,
  },
  readMoreText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 20,
  },
  actionItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 16,
  },
  actionIcon: {
    fontSize: 20,
    color: '#D1D5DB',
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  reviewToast: {
    backgroundColor: 'rgba(153, 0, 36, 0.9)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 14,
  },
  reviewToastText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  relatedHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  relatedTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  relatedViewAll: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '500',
  },
  relatedScroll: {
    gap: 12,
    paddingRight: 20,
  },
  relatedCard: {
    width: 115,
  },
  relatedImageBox: {
    width: 115,
    height: 165,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#161922',
    position: 'relative',
    marginBottom: 6,
  },
  relatedImage: {
    width: '100%',
    height: '100%',
  },
  relatedCardTitle: {
    color: '#E5E7EB',
    fontSize: 12,
    fontWeight: '600',
  },
});
