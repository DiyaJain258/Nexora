import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';

export type BottomTabType = 'landing' | 'home' | 'search' | 'livetv' | 'movies' | 'series' | 'mylist' | 'account';

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
  { id: 'livetv', label: 'Live TV', icon: '📺' },
  { id: 'movies', label: 'Movies', icon: '🎬' },
  { id: 'series', label: 'Series', icon: '🎞️' },
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
          toValue: 1.2,
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

      {/* Label */}
      <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
        {tab.label}
      </Text>

      {/* Red indicator dot */}
      {isActive && <View style={styles.activeDot} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dockContainer: {
    backgroundColor: '#07080B',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: Platform.OS === 'ios' ? 18 : 6,
  },
  surface: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(7, 8, 11, 0.98)',
  },
  tabItem: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: 4,
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.45,
    marginBottom: 2,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    color: '#8E8E93',
    fontSize: 10.5,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#E50914',
    fontWeight: '800',
  },
  activeDot: {
    position: 'absolute',
    top: 0,
    width: 18,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: '#E50914',
  },
});
