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
  activeTab?: string;
  onToggleMode?: () => void;
}

export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  onSearchPress,
  isSearchActive,
  onBrandPress,
  onAvatarPress,
  activeTab = 'landing',
  onToggleMode,
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
      {/* NEXORA Brand Logo + Mode Pill */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
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

        <View style={styles.vipBadge}>
          <View style={styles.vipDot} />
          <Text style={styles.vipBadgeText}>4K VIP</Text>
        </View>
      </View>

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
    backgroundColor: '#050508',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#800020',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#800020',
    shadowOpacity: 0.95,
    shadowRadius: 10,
    elevation: 6,
  },
  logoBadgeText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  brandText: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: '#FFFFFF',
  },
  brandAccent: {
    color: '#B3002D',
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
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
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
    backgroundColor: '#800020',
    shadowColor: '#800020',
    shadowRadius: 4,
    shadowOpacity: 0.9,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  actionButtonActive: {
    borderColor: '#800020',
    backgroundColor: 'rgba(128, 0, 32, 0.35)',
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
    borderColor: '#800020',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#800020',
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0a0a12',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  vipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: 'rgba(128, 0, 32, 0.35)',
    borderWidth: 1,
    borderColor: '#800020',
  },
  vipDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#FF4D6D',
    shadowColor: '#FF4D6D',
    shadowOpacity: 0.9,
    shadowRadius: 4,
  },
  vipBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.6,
    color: '#FFFFFF',
  },
});
