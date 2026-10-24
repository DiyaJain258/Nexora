import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';

export type BottomTabType = 'landing' | 'home' | 'livetv' | 'movies' | 'mylist' | 'account';

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
  { id: 'home', label: 'Home', icon: '🎬' },
  { id: 'movies', label: 'Movies', icon: '🍿' },
  { id: 'livetv', label: 'Live TV', icon: '📡' },
  { id: 'mylist', label: 'My List', icon: '🔖' },
  { id: 'account', label: 'TV Pair', icon: '🔗' },
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
  const indicatorOpacity = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    if (isActive) {
      Animated.parallel([
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
        ]),
        Animated.timing(indicatorOpacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(indicatorOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [isActive]);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={styles.tabItem}
    >
      {/* Top Active Red Indicator Bar */}
      <Animated.View style={{ opacity: indicatorOpacity }}>
        <View style={styles.activeIndicator} />
      </Animated.View>

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

      {/* Tab Label */}
      <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
        {tab.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dockContainer: {
    backgroundColor: '#07080B',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.09)',
    paddingBottom: Platform.OS === 'ios' ? 18 : 6,
  },
  surface: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 6,
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
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 24,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: '#800020',
    shadowColor: '#800020',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
  tabIcon: {
    fontSize: 19,
    opacity: 0.55,
    marginBottom: 3,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#71717A',
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});
