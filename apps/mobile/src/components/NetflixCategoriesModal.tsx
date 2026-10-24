import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  targetCategory: string;
  color: string;
}

const CATEGORY_LIST: CategoryItem[] = [
  { id: 'cat-movies', name: 'Movies', icon: '🍿', targetCategory: 'Movies', color: '#E50914' },
  { id: 'cat-shows', name: 'TV Shows & Series', icon: '📺', targetCategory: 'TV Show', color: '#800020' },
  { id: 'cat-sports', name: 'Sports Live Center', icon: '🏆', targetCategory: 'Sports', color: '#B91C1C' },
  { id: 'cat-livetv', name: 'Live TV Channels', icon: '📡', targetCategory: 'Live TV', color: '#DC2626' },
  { id: 'cat-drama', name: 'Drama & K-Drama', icon: '🎭', targetCategory: 'Drama', color: '#9333EA' },
  { id: 'cat-web', name: 'Original Webseries', icon: '⚡', targetCategory: 'Webseries', color: '#EA580C' },
  { id: 'cat-kids', name: 'Kids & Family', icon: '👶', targetCategory: 'Kids', color: '#16A34A' },
  { id: 'cat-action', name: 'Action & Adventure', icon: '💥', targetCategory: 'Movies', color: '#E50914' },
  { id: 'cat-scifi', name: 'Sci-Fi & Cyberpunk', icon: '🛸', targetCategory: 'Movies', color: '#0284C7' },
  { id: 'cat-horror', name: 'Horror & Suspense', icon: '👻', targetCategory: 'Movies', color: '#7E22CE' },
  { id: 'cat-comedy', name: 'Comedy & Standup', icon: '😂', targetCategory: 'TV Show', color: '#CA8A04' },
  { id: 'cat-crime', name: 'Crime & Investigation', icon: '🕵️', targetCategory: 'Drama', color: '#475569' },
  { id: 'cat-doc', name: 'Documentaries', icon: '📜', targetCategory: 'Movies', color: '#0D9488' },
];

interface NetflixCategoriesModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCategory: (categoryName: string) => void;
}

export const NetflixCategoriesModal: React.FC<NetflixCategoriesModalProps> = ({
  visible,
  onClose,
  onSelectCategory,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Categories</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onClose}
              style={styles.closeBtn}
            >
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Subtitle */}
          <Text style={styles.sheetSubtitle}>
            Choose a genre or category to explore curated 4K entertainment
          </Text>

          {/* Grid of Categories */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.gridContent}
          >
            {CATEGORY_LIST.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                activeOpacity={0.78}
                onPress={() => {
                  onSelectCategory(cat.targetCategory);
                  onClose();
                }}
                style={styles.categoryCard}
              >
                <View
                  style={[
                    styles.iconBubble,
                    { backgroundColor: `${cat.color}25`, borderColor: `${cat.color}50` },
                  ]}
                >
                  <Text style={styles.iconText}>{cat.icon}</Text>
                </View>
                <Text style={styles.categoryName}>{cat.name}</Text>
                <Text style={styles.chevronArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.82)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#0F1017',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    height: height * 0.76,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sheetTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sheetSubtitle: {
    color: '#9CA3AF',
    fontSize: 13,
    marginBottom: 18,
  },
  gridContent: {
    paddingBottom: 40,
    gap: 10,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
  },
  iconBubble: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginRight: 14,
  },
  iconText: {
    fontSize: 18,
  },
  categoryName: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  chevronArrow: {
    color: '#6B7280',
    fontSize: 22,
    fontWeight: '700',
  },
});
