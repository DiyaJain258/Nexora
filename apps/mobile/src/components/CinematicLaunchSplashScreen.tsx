import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Platform,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

// 7 Curved Ribbon Movie Panels matching Image 1
const CURVED_PANELS = [
  {
    id: 'p-1',
    uri: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=360&auto=format&fit=crop&q=85', // Crown / Queen
    rotate: '-14deg',
    translateY: 8,
    scale: 0.88,
  },
  {
    id: 'p-2',
    uri: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=360&auto=format&fit=crop&q=85', // Red hooded mask / Money Heist
    rotate: '-9deg',
    translateY: 4,
    scale: 0.94,
  },
  {
    id: 'p-3',
    uri: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=360&auto=format&fit=crop&q=85', // Fantasy Dragon / Knight
    rotate: '-4deg',
    translateY: 1,
    scale: 0.98,
  },
  {
    id: 'p-4', // Center Hero: John Wick / Red Neon Action
    uri: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=360&auto=format&fit=crop&q=85',
    rotate: '0deg',
    translateY: -2,
    scale: 1.05,
    isHero: true,
  },
  {
    id: 'p-5',
    uri: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=360&auto=format&fit=crop&q=85', // Astronaut Space
    rotate: '4deg',
    translateY: 1,
    scale: 0.98,
  },
  {
    id: 'p-6',
    uri: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=360&auto=format&fit=crop&q=85', // Lion / Epic Portrait
    rotate: '9deg',
    translateY: 4,
    scale: 0.94,
  },
  {
    id: 'p-7',
    uri: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=360&auto=format&fit=crop&q=85', // Cyber Dark Hero
    rotate: '14deg',
    translateY: 8,
    scale: 0.88,
  },
];

interface CinematicLaunchSplashScreenProps {
  onFinish?: () => void;
  duration?: number;
}

export const CinematicLaunchSplashScreen: React.FC<CinematicLaunchSplashScreenProps> = ({
  onFinish,
  duration = 2600,
}) => {
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    const stepTime = duration / 20;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(interval);
          setTimeout(() => {
            onFinish?.();
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, [duration, onFinish]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Background Ambience: Night Penthouse City View & Red Neon Glow */}
      <View style={styles.backgroundLayer} pointerEvents="none">
        {/* Penthouse window city skyline on top-right */}
        <View style={styles.cityWindowBox}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=500&auto=format&fit=crop&q=85',
            }}
            style={styles.cityWindowImg}
            resizeMode="cover"
          />
          <View style={styles.cityWindowOverlay} />
        </View>

        {/* Glossy floor reflection */}
        <View style={styles.floorReflection} />

        {/* Ambient Red Glow in Center */}
        <View style={styles.ambientRedGlow} />
      </View>

      {/* Foreground Container */}
      <SafeAreaView style={styles.safeContainer} edges={['top', 'bottom']}>
        {/* 1. TOP HEADER: NEXORA Logo + Cast + Download + Search */}
        <View style={styles.topHeader}>
          <View style={styles.logoRow}>
            <Text style={styles.logoWhite}>NEX</Text>
            <View style={styles.playIconBox}>
              <View style={styles.playTriangle} />
            </View>
            <Text style={styles.logoRed}>RA</Text>
          </View>

          <View style={styles.headerIconsGroup}>
            {/* Cast Icon */}
            <TouchableOpacity activeOpacity={0.7} style={styles.headerIconBtn}>
              <Text style={styles.headerIconSymbol}>⎚</Text>
            </TouchableOpacity>

            {/* Download Icon */}
            <TouchableOpacity activeOpacity={0.7} style={styles.headerIconBtn}>
              <Text style={styles.headerIconSymbol}>⤓</Text>
            </TouchableOpacity>

            {/* Search Icon */}
            <TouchableOpacity activeOpacity={0.7} style={styles.headerIconBtn}>
              <Text style={styles.headerIconSymbol}>🔍</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. TAGLINE & HEADLINE: Your World of Entertainment */}
        <View style={styles.taglineSection}>
          <Text style={styles.miniTagline}>STREAM  •  WATCH  •  ENJOY</Text>
          <Text style={styles.headingWhite}>Your World of</Text>
          <Text style={styles.headingRed}>Entertainment</Text>
        </View>

        {/* 3. 3D CURVED PANORAMIC FILMSTRIP RIBBON */}
        <View style={styles.curvedRibbonContainer}>
          <View style={styles.curvedTrack}>
            {CURVED_PANELS.map((p) => {
              const panelWidth = width * 0.22;
              const panelHeight = panelWidth * 1.5;
              return (
                <View
                  key={p.id}
                  style={[
                    styles.curvedPanel,
                    {
                      width: panelWidth,
                      height: panelHeight,
                      transform: [
                        { rotateZ: p.rotate },
                        { translateY: p.translateY },
                        { scale: p.scale },
                      ],
                    },
                    p.isHero && styles.heroCurvedPanel,
                  ]}
                >
                  <Image source={{ uri: p.uri }} style={styles.panelImg} resizeMode="cover" />
                  <View style={styles.panelNeonBorder} />
                  {p.isHero && <View style={styles.heroRedAura} />}
                </View>
              );
            })}
          </View>

          {/* Table & Popcorn & Sofa lounge accessories overlaying bottom */}
          <View style={styles.loungeOverlay} pointerEvents="none">
            {/* Left Sofa Silhouette */}
            <View style={styles.sofaSilhouette} />
            {/* Center Floor Glow */}
            <View style={styles.centerFloorNeonRim} />
          </View>
        </View>

        {/* 4. CENTER BRANDING & LOADER */}
        <View style={styles.brandLoaderSection}>
          {/* Glowing Red NX Monogram */}
          <View style={styles.monogramBox}>
            <View style={styles.monogramInner}>
              <Text style={styles.monogramText}>NX</Text>
            </View>
          </View>

          {/* NEXORA Wordmark */}
          <View style={styles.wordmarkRow}>
            <Text style={styles.wordmarkWhite}>NEX</Text>
            <View style={styles.wordmarkPlayBox}>
              <View style={styles.wordmarkPlayTriangle} />
            </View>
            <Text style={styles.wordmarkRed}>RA</Text>
          </View>

          <Text style={styles.wordmarkSub}>IPTV & 4K STREAMING</Text>

          {/* Red Progress Bar */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>

          <Text style={styles.progressStatusText}>INITIALIZING 3D CINEMATIC ENGINE...</Text>
        </View>

        {/* 5. QUICK FEATURE PILLS: Live TV | Movies | Series | 4K Quality */}
        <View style={styles.featurePillsRow}>
          {/* Live TV */}
          <View style={styles.pillItem}>
            <Text style={styles.pillIcon}>📺</Text>
            <Text style={styles.pillLabel}>LIVE TV</Text>
          </View>

          <View style={styles.pillDivider} />

          {/* Movies */}
          <View style={styles.pillItem}>
            <Text style={styles.pillIcon}>🎬</Text>
            <Text style={styles.pillLabel}>MOVIES</Text>
          </View>

          <View style={styles.pillDivider} />

          {/* Series */}
          <View style={styles.pillItem}>
            <Text style={styles.pillIcon}>▶️</Text>
            <Text style={styles.pillLabel}>SERIES</Text>
          </View>

          <View style={styles.pillDivider} />

          {/* 4K Quality */}
          <View style={styles.pillItem}>
            <View style={styles.pill4KBadge}>
              <Text style={styles.pill4KText}>4K</Text>
            </View>
            <Text style={styles.pillLabel}>4K QUALITY</Text>
          </View>
        </View>

        {/* 6. FOOTER: MORE THAN JUST STREAMING + Neon Curves */}
        <View style={styles.footerSection}>
          <View style={styles.footerLineRow}>
            <View style={styles.footerAccentLine} />
            <Text style={styles.footerText}>MORE THAN JUST STREAMING</Text>
            <View style={styles.footerAccentLine} />
          </View>

          {/* Bottom Neon Red Wave Curve */}
          <View style={styles.bottomNeonWaveContainer}>
            <View style={styles.bottomNeonWaveGlow} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05070E',
    position: 'relative',
  },
  backgroundLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  cityWindowBox: {
    position: 'absolute',
    top: 60,
    right: 0,
    width: width * 0.38,
    height: height * 0.32,
    borderLeftWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  cityWindowImg: {
    width: '100%',
    height: '100%',
    opacity: 0.35,
  },
  cityWindowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 7, 14, 0.55)',
  },
  floorReflection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.45,
    backgroundColor: 'rgba(3, 4, 8, 0.95)',
  },
  ambientRedGlow: {
    position: 'absolute',
    top: height * 0.42,
    alignSelf: 'center',
    width: 280,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(229, 9, 20, 0.12)',
  },
  safeContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 12 : 6,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWhite: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 2,
  },
  playIconBox: {
    width: 22,
    height: 22,
    borderRadius: 11,
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
    borderLeftWidth: 7,
    borderRightWidth: 0,
    borderBottomWidth: 4.5,
    borderTopWidth: 4.5,
    borderLeftColor: '#000000',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: 2,
  },
  logoRed: {
    color: '#E50914',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 2,
  },
  headerIconsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerIconBtn: {
    padding: 4,
  },
  headerIconSymbol: {
    color: '#FFFFFF',
    fontSize: 18,
    opacity: 0.9,
  },
  taglineSection: {
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 4,
  },
  miniTagline: {
    color: '#9E9E9E',
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  headingWhite: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
  },
  headingRed: {
    color: '#E50914',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 36,
    textShadowColor: 'rgba(229, 9, 20, 0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
  },
  curvedRibbonContainer: {
    width: '100%',
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  curvedTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 1.35,
    marginLeft: -width * 0.175,
    gap: -6,
  },
  curvedPanel: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#121218',
    borderWidth: 1,
    borderColor: 'rgba(229, 9, 20, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 8,
  },
  heroCurvedPanel: {
    borderColor: '#E50914',
    borderWidth: 1.5,
    zIndex: 10,
    shadowColor: '#E50914',
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 12,
  },
  panelImg: {
    width: '100%',
    height: '100%',
  },
  panelNeonBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(229, 9, 20, 0.85)',
  },
  heroRedAura: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: 'rgba(229, 9, 20, 0.5)',
  },
  loungeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  sofaSilhouette: {
    width: 60,
    height: 18,
    backgroundColor: 'rgba(10, 10, 15, 0.8)',
    borderTopRightRadius: 10,
  },
  centerFloorNeonRim: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: width * 0.65,
    height: 2,
    backgroundColor: 'rgba(229, 9, 20, 0.6)',
  },
  brandLoaderSection: {
    alignItems: 'center',
    marginVertical: 4,
  },
  monogramBox: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: '#8B0000',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(229, 9, 20, 0.85)',
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 10,
    marginBottom: 10,
  },
  monogramInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  monogramText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  wordmarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wordmarkWhite: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#FFFFFF',
  },
  wordmarkPlayBox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 1,
  },
  wordmarkPlayTriangle: {
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
  wordmarkRed: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#E50914',
  },
  wordmarkSub: {
    fontSize: 9.5,
    letterSpacing: 3,
    color: '#9CA3AF',
    marginTop: 4,
    fontWeight: '700',
  },
  progressTrack: {
    width: 175,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E50914',
    borderRadius: 2,
  },
  progressStatusText: {
    fontSize: 8.5,
    color: '#71717A',
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  featurePillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(18, 18, 24, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    marginHorizontal: 18,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  pillItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  pillIcon: {
    fontSize: 18,
  },
  pill4KBadge: {
    backgroundColor: '#E50914',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  pill4KText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  pillLabel: {
    color: '#BDBDBD',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  pillDivider: {
    width: 1,
    height: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  footerSection: {
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 10 : 16,
  },
  footerLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerAccentLine: {
    width: 28,
    height: 1.5,
    backgroundColor: '#8B0000',
  },
  footerText: {
    color: '#71717A',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 2,
  },
  bottomNeonWaveContainer: {
    width: width * 0.85,
    height: 8,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNeonWaveGlow: {
    width: '100%',
    height: 1.5,
    backgroundColor: '#E50914',
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
});
