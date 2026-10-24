import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from 'react-native';

interface PremiumUserHeaderProps {
  userName?: string;
  onSearchPress?: () => void;
  searchQuery?: string;
  onSearchChange?: (text: string) => void;
  isSearchActive?: boolean;
  onClearSearch?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  onCastPress?: () => void;
}

export const PremiumUserHeader: React.FC<PremiumUserHeaderProps> = ({
  userName = 'Venkatesh M',
  onSearchPress,
  searchQuery = '',
  onSearchChange,
  isSearchActive = false,
  onClearSearch,
  onNotificationPress,
  onProfilePress,
  onCastPress,
}) => {
  const [hasUnread, setHasUnread] = useState(true);

  const handleBell = () => {
    setHasUnread(false);
    if (onNotificationPress) {
      onNotificationPress();
    } else {
      Alert.alert(
        '🔔 Notifications',
        '• New 4K HDR Release: "Falimy : Malayalam" is now streaming.\n• Watchlist reminder: "Avengers Assemble" remaining: 42m.'
      );
    }
  };

  const handleCast = () => {
    if (onCastPress) {
      onCastPress();
    } else {
      Alert.alert('⎚ Wireless Casting', 'Searching for Smart TVs and Chromecast devices on Wi-Fi...');
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. TOP BRANDING & USER BAR */}
      <View style={styles.topRow}>
        {/* Left: NEXORA Brand Logo + User Greeting */}
        <View style={styles.leftBrandGroup}>
          <View style={styles.logoRow}>
            <Text style={styles.logoRed}>NEX</Text>
            <View style={styles.playIconBox}>
              <View style={styles.playTriangle} />
            </View>
            <Text style={styles.logoRed}>RA</Text>
          </View>
          <Text style={styles.userGreeting}>
            Hello, <Text style={styles.userNameHighlight}>{userName.split(' ')[0]}</Text> 👋
          </Text>
        </View>

        {/* Right: Cast, Notification Bell, User Avatar */}
        <View style={styles.rightActionsGroup}>
          {/* Cast Icon */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleCast}
            style={styles.actionCircleBtn}
          >
            <Text style={styles.actionIconSymbol}>⎚</Text>
          </TouchableOpacity>

          {/* Bell Notification */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleBell}
            style={styles.actionCircleBtn}
          >
            <Text style={styles.bellIconSymbol}>🔔</Text>
            {hasUnread && <View style={styles.redDot} />}
          </TouchableOpacity>

          {/* Profile Avatar Bubble */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onProfilePress}
            style={styles.avatarButton}
          >
            <View style={styles.avatarInner}>
              <Text style={styles.avatarInitial}>
                {userName.charAt(0).toUpperCase()}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. PROMINENT SLEEK GLASSMORPHIC SEARCH BAR */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onSearchPress}
        style={[
          styles.searchBarBox,
          isSearchActive && styles.searchBarBoxFocused,
        ]}
      >
        <Text style={styles.searchIcon}>🔍</Text>

        {isSearchActive && onSearchChange ? (
          <TextInput
            style={styles.searchInput}
            placeholder="Search movies, shows, sports, live TV..."
            placeholderTextColor="#737373"
            value={searchQuery}
            onChangeText={onSearchChange}
            autoFocus
          />
        ) : (
          <Text style={styles.searchPlaceholderText}>
            {searchQuery ? searchQuery : 'Search movies, shows, sports, live TV...'}
          </Text>
        )}

        {isSearchActive && searchQuery.length > 0 && onClearSearch ? (
          <TouchableOpacity onPress={onClearSearch} style={styles.clearBtn}>
            <Text style={styles.clearBtnText}>✕</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.micBadge}>
            <Text style={styles.micIcon}>🎙️</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#07080B',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 8 : 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  leftBrandGroup: {
    flexDirection: 'column',
    gap: 2,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoRed: {
    color: '#E50914',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
  },
  playIconBox: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 1,
  },
  playTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 0,
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderLeftColor: '#000000',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: 1.5,
  },
  userGreeting: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
  },
  userNameHighlight: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  rightActionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionCircleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  actionIconSymbol: {
    color: '#FFFFFF',
    fontSize: 17,
    opacity: 0.9,
  },
  bellIconSymbol: {
    fontSize: 16,
  },
  redDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#E50914',
  },
  avatarButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1E1E26',
    borderWidth: 1.5,
    borderColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 4,
  },
  avatarInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 22,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    gap: 10,
  },
  searchBarBoxFocused: {
    borderColor: '#E50914',
    backgroundColor: 'rgba(20, 20, 26, 0.95)',
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  searchIcon: {
    fontSize: 15,
    opacity: 0.8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '500',
  },
  searchPlaceholderText: {
    flex: 1,
    color: '#8E8E93',
    fontSize: 13,
    fontWeight: '500',
  },
  clearBtn: {
    padding: 6,
  },
  clearBtnText: {
    color: '#A0A0A0',
    fontSize: 13,
    fontWeight: '700',
  },
  micBadge: {
    padding: 4,
  },
  micIcon: {
    fontSize: 14,
    opacity: 0.8,
  },
});
