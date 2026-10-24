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
    backgroundColor: '#800020',
    shadowColor: '#800020',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  badgeBox: {
    backgroundColor: 'rgba(128, 0, 32, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(128, 0, 32, 0.55)',
    paddingHorizontal: 7,
    paddingVertical: 1.5,
    borderRadius: 4,
  },
  badgeText: {
    color: '#FF6685',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    color: '#A1A1AA',
    fontSize: 12,
    fontWeight: '600',
  },
  seeAllArrow: {
    color: '#B3002D',
    fontSize: 16,
    fontWeight: '700',
    marginTop: -1,
  },
});
