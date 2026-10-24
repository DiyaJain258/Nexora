import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const POSTERS = [
  'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80',
];

export const NativeCinematicBackground: React.FC = () => {
  return (
    <View style={styles.container} pointerEvents="none">
      {/* Tilted Collage Wall */}
      <View style={styles.gridWall}>
        {POSTERS.map((uri, idx) => (
          <View key={idx} style={styles.posterItem}>
            <Image source={{ uri }} style={styles.posterImage} resizeMode="cover" />
          </View>
        ))}
      </View>

      {/* Dark Multi-layer Vignette & Fog Overlays */}
      <View style={styles.darkOverlayTop} />
      <View style={styles.darkOverlayMiddle} />
      <View style={styles.darkOverlayBottom} />

      {/* Ambient Crimson Glow at Bottom */}
      <View style={styles.redAmbientGlow} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#07080B',
    overflow: 'hidden',
    zIndex: 0,
  },
  gridWall: {
    position: 'absolute',
    top: -60,
    left: -40,
    right: -40,
    bottom: -60,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    opacity: 0.08,
    transform: [{ scale: 1.12 }, { rotate: '-2.5deg' }],
  },
  posterItem: {
    width: (width + 80) / 4 - 8,
    height: 140,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#12131A',
  },
  posterImage: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  darkOverlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 160,
    backgroundColor: '#07080B',
    opacity: 0.85,
  },
  darkOverlayMiddle: {
    position: 'absolute',
    top: 160,
    left: 0,
    right: 0,
    bottom: 180,
    backgroundColor: '#07080B',
    opacity: 0.75,
  },
  darkOverlayBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 220,
    backgroundColor: '#07080B',
  },
  redAmbientGlow: {
    position: 'absolute',
    bottom: -80,
    left: width * 0.15,
    width: width * 0.7,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(128, 0, 32, 0.22)',
    transform: [{ scaleX: 1.5 }],
  },
});
