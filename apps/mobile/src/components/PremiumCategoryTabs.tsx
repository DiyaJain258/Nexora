import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export type CategoryTab = 'All' | 'Sports' | 'Movies' | 'Live TV' | 'Drama' | 'TV Show' | 'Webseries';

interface PremiumCategoryTabsProps {
  categories?: CategoryTab[];
  activeCategory: CategoryTab;
  onSelectCategory: (cat: CategoryTab) => void;
}

const DEFAULT_CATEGORIES: CategoryTab[] = [
  'All',
  'Sports',
  'Movies',
  'Live TV',
  'Drama',
  'TV Show',
  'Webseries',
];

export const PremiumCategoryTabs: React.FC<PremiumCategoryTabsProps> = ({
  categories = DEFAULT_CATEGORIES,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <TouchableOpacity
              key={cat}
              activeOpacity={0.75}
              onPress={() => onSelectCategory(cat)}
              style={styles.tabItem}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {cat}
              </Text>
              {isActive && <View style={styles.activeUnderline} />}
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
    paddingBottom: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 22,
    alignItems: 'center',
  },
  tabItem: {
    paddingBottom: 8,
    alignItems: 'center',
    position: 'relative',
  },
  tabText: {
    color: '#8E8E93',
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  activeUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#E50914',
    borderRadius: 2,
  },
});
