import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';

interface AnimatedHeaderProps {
  onSearchPress: () => void;
  isSearchActive: boolean;
  onBrandPress: () => void;
  onAvatarPress: () => void;
}

export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  onSearchPress,
  isSearchActive,
  onBrandPress,
  onAvatarPress,
}) => {
  const searchScale = useRef(new Animated.Value(1)).current;

  const handleSearchPress = () => {
    Animated.sequence([
      Animated.timing(searchScale, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(searchScale, {
        toValue: 1.0,
        friction: 4,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();
    onSearchPress();
  };

  return (
    <View style={styles.headerContainer}>
      {/* NEXORA Brand Logo */}
      <TouchableOpacity activeOpacity={0.8} onPress={onBrandPress}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeText}>N</Text>
          </View>
          <Text style={styles.brandText}>
            NEX<Text style={styles.brandAccent}>ORA</Text>
          </Text>
        </View>
      </TouchableOpacity>

      {/* Header Right Actions */}
      <View style={styles.actionsRow}>
        {/* Cast / TV Broadcast Stream indicator */}
        <View style={styles.castBox}>
          <Text style={styles.castIcon}>📺</Text>
          <View style={styles.livePulseDot} />
        </View>

        {/* Animated Search Button */}
        <Animated.View style={{ transform: [{ scale: searchScale }] }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSearchPress}
            style={[
              styles.actionButton,
              isSearchActive && styles.actionButtonActive,
            ]}
          >
            <Text style={styles.actionIcon}>
              {isSearchActive ? '✕' : '🔍'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* User Avatar with Glowing Red Ring */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onAvatarPress}
          style={styles.avatarButton}
        >
          <View style={styles.avatarInner}>
            <Text style={styles.avatarInitial}>D</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#050505',
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E50914',
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
  logoBadgeText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
  },
  brandText: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#FFFFFF',
  },
  brandAccent: {
    color: '#E50914',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  castBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#2B2B2B',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  castIcon: {
    fontSize: 14,
  },
  livePulseDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E50914',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#151515',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#303030',
  },
  actionButtonActive: {
    borderColor: '#E50914',
    backgroundColor: 'rgba(229, 9, 20, 0.2)',
  },
  actionIcon: {
    fontSize: 13,
    color: '#FFFFFF',
  },
  avatarButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E50914',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
});
