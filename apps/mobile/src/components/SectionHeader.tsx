import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface SectionHeaderProps {
  title: string;
  badge?: string;
  onSeeAll?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  badge,
  onSeeAll,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.redPill} />
        <Text style={styles.title}>{title}</Text>
        {badge && (
          <View style={styles.badgeBox}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>

      {onSeeAll && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onSeeAll}
          style={styles.seeAllBtn}
        >
          <Text style={styles.seeAllText}>See All</Text>
          <Text style={styles.seeAllArrow}>›</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  redPill: {
    width: 3.5,
    height: 16,
    borderRadius: 2,
    backgroundColor: '#E50914',
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  badgeBox: {
    backgroundColor: 'rgba(229, 9, 20, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(229, 9, 20, 0.4)',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
  },
  badgeText: {
    color: '#FF2B36',
    fontSize: 9,
    fontWeight: '800',
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    color: '#B3B3B3',
    fontSize: 12,
    fontWeight: '600',
  },
  seeAllArrow: {
    color: '#E50914',
    fontSize: 16,
    fontWeight: '700',
    marginTop: -1,
  },
});
