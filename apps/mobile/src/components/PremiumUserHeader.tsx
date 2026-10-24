import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';

interface PremiumUserHeaderProps {
  userName?: string;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

export const PremiumUserHeader: React.FC<PremiumUserHeaderProps> = ({
  userName = 'Venkatesh M',
  onNotificationPress,
  onProfilePress,
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

  return (
    <View style={styles.container}>
      {/* Left: Hello + User Name */}
      <TouchableOpacity activeOpacity={0.8} onPress={onProfilePress}>
        <Text style={styles.greetingText}>Hello</Text>
        <Text style={styles.userNameText}>{userName}</Text>
      </TouchableOpacity>

      {/* Right: Frosted Circular Notification Bell */}
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={handleBell}
        style={styles.bellButton}
      >
        <Text style={styles.bellIcon}>🔔</Text>
        {hasUnread && <View style={styles.redDot} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 12 : 16,
    paddingBottom: 10,
    backgroundColor: '#07080B',
  },
  greetingText: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  userNameText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellIcon: {
    fontSize: 18,
  },
  redDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E50914',
    borderWidth: 1.5,
    borderColor: '#07080B',
  },
});
