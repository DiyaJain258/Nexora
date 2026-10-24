import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';

export type BottomTabType = 'landing' | 'home' | 'search' | 'livetv' | 'movies' | 'mylist' | 'account';

interface AnimatedBottomNavigationProps {
  activeTab: BottomTabType;
  onTabChange: (tab: BottomTabType) => void;
}

interface TabItemConfig {
  id: BottomTabType;
  label: string;
  icon: string;
}

const TABS: TabItemConfig[] = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'search', label: 'Search', icon: '🔍' },
  { id: 'mylist', label: 'Saved', icon: '🤍' },
  { id: 'account', label: 'Profile', icon: '👤' },
];

export const AnimatedBottomNavigation: React.FC<AnimatedBottomNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <View style={styles.dockContainer}>
      <View style={styles.surface}>
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={isActive}
              onPress={() => onTabChange(tab.id)}
            />
          );
        })}
      </View>
    </View>
  );
};

interface TabButtonProps {
  tab: TabItemConfig;
  isActive: boolean;
  onPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ tab, isActive, onPress }) => {
  const bounceAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isActive) {
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.25,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.spring(bounceAnim, {
          toValue: 1.0,
          friction: 4,
          tension: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isActive]);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={styles.tabItem}
    >
      {/* Animated Icon */}
      <Animated.Text
        style={[
          styles.tabIcon,
          isActive && styles.tabIconActive,
          { transform: [{ scale: bounceAnim }] },
        ]}
      >
        {tab.icon}
      </Animated.Text>

      {/* Tiny active red/burgundy dot */}
      {isActive && <View style={styles.activeDot} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dockContainer: {
    backgroundColor: '#07080B',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
  },
  surface: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(7, 8, 11, 0.98)',
  },
  tabItem: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabIcon: {
    fontSize: 22,
    opacity: 0.45,
  },
  tabIconActive: {
    opacity: 1,
  },
  activeDot: {
    position: 'absolute',
    bottom: 6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E50914',
  },
});
