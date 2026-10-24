import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  Modal,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// 3-Column Posters matching the reference image layout
const COLUMN_1_POSTERS = [
  {
    id: 'c1-1',
    uri: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&auto=format&fit=crop&q=85',
    title: 'Hari ini\nakan kita ceritakan\nnanti',
    hasNBadge: true,
  },
  {
    id: 'c1-2',
    uri: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&auto=format&fit=crop&q=85',
    title: 'KULIAH UMUM\nII',
    hasNBadge: true,
    isRoman: true,
  },
  {
    id: 'c1-3',
    uri: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=85',
    title: 'DUNE: PART TWO',
    hasNBadge: true,
  },
];

const COLUMN_2_POSTERS = [
  {
    id: 'c2-1',
    uri: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=85',
    title: 'Cinta Sekolah mata',
    subtitleStyle: 'yellowCursive',
    hasNBadge: false,
  },
  {
    id: 'c2-2',
    uri: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=85',
    title: 'KING\nOF\nISLAND',
    subtitleStyle: 'yellowBlock',
    hasNBadge: true,
  },
  {
    id: 'c2-3',
    uri: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=85',
    title: 'KESATRIA RAJAWALI',
    subtitleStyle: 'subtleWhite',
    hasNBadge: false,
  },
];

const COLUMN_3_POSTERS = [
  {
    id: 'c3-1',
    uri: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&auto=format&fit=crop&q=85',
    title: 'KITA AKAN BERCERITA\nEsok hari',
    hasNBadge: true,
  },
  {
    id: 'c3-2',
    uri: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=85',
    title: 'KULIAH UMUM\nIII',
    hasNBadge: true,
    isRoman: true,
  },
  {
    id: 'c3-3',
    uri: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=85',
    title: 'CYBERPUNK 2099',
    hasNBadge: true,
  },
];

// 4 Slides for the Onboarding Carousel
const ONBOARDING_SLIDES = [
  {
    id: 'slide-1',
    title: 'Unlimited movies,\nTV show & more',
    subtitle: 'Watch anywhere. Cancel anytime.',
  },
  {
    id: 'slide-2',
    title: 'Download and\nwatch offline',
    subtitle: 'Always have something to watch.',
  },
  {
    id: 'slide-3',
    title: 'No annoying\ncontracts',
    subtitle: 'Join today, cancel anytime.',
  },
  {
    id: 'slide-4',
    title: 'Watch on\nany device',
    subtitle: 'Stream on phone, tablet, laptop & TV.',
  },
];

interface NetflixWelcomeLandingScreenProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export const NetflixWelcomeLandingScreen: React.FC<NetflixWelcomeLandingScreenProps> = ({
  onGetStarted,
  onSignIn,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    if (index !== activeSlide && index >= 0 && index < ONBOARDING_SLIDES.length) {
      setActiveSlide(index);
    }
  };

  const colWidth = (width - 12) / 3;

  return (
    <View style={styles.container}>
      {/* 1. Background: 3 Vertical Columns of Movie Posters */}
      <View style={styles.posterGridWrapper} pointerEvents="none">
        <View style={styles.gridRow}>
          {/* Column 1 */}
          <View style={[styles.column, { width: colWidth }]}>
            {COLUMN_1_POSTERS.map((item) => (
              <View key={item.id} style={styles.posterCard}>
                <Image source={{ uri: item.uri }} style={styles.posterImg} resizeMode="cover" />
                {item.hasNBadge && <Text style={styles.redNBadge}>N</Text>}
                <View style={styles.posterTextOverlay}>
                  <Text style={styles.posterScriptText}>{item.title}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Column 2 */}
          <View style={[styles.column, { width: colWidth, marginTop: -15 }]}>
            {COLUMN_2_POSTERS.map((item) => (
              <View key={item.id} style={styles.posterCard}>
                <Image source={{ uri: item.uri }} style={styles.posterImg} resizeMode="cover" />
                {item.hasNBadge && <Text style={styles.redNBadge}>N</Text>}
                <View style={styles.posterTextOverlay}>
                  {item.subtitleStyle === 'yellowBlock' ? (
                    <Text style={styles.posterYellowBlock}>{item.title}</Text>
                  ) : item.subtitleStyle === 'yellowCursive' ? (
                    <Text style={styles.posterYellowCursive}>{item.title}</Text>
                  ) : (
                    <Text style={styles.posterSubtleText}>{item.title}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Column 3 */}
          <View style={[styles.column, { width: colWidth }]}>
            {COLUMN_3_POSTERS.map((item) => (
              <View key={item.id} style={styles.posterCard}>
                <Image source={{ uri: item.uri }} style={styles.posterImg} resizeMode="cover" />
                {item.hasNBadge && <Text style={styles.redNBadge}>N</Text>}
                <View style={styles.posterTextOverlay}>
                  <Text style={styles.posterScriptText}>{item.title}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Dark Cinematic Vignette Overlay so text remains ultra-legible */}
        <View style={styles.darkGradientOverlay} />
      </View>

      {/* 2. SafeArea Container for Interactive Foreground */}
      <SafeAreaView style={styles.safeContainer} edges={['top', 'bottom']}>
        {/* Top Header */}
        <View style={styles.topHeader}>
          {/* Logo */}
          <View style={styles.logoRow}>
            <Text style={styles.logoRed}>NEX</Text>
            <View style={styles.playIconBox}>
              <View style={styles.playTriangle} />
            </View>
            <Text style={styles.logoRed}>RA</Text>
          </View>

          {/* Right Action Buttons */}
          <View style={styles.headerRightGroup}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowPrivacyModal(true)}
              style={styles.headerTextBtn}
            >
              <Text style={styles.headerTextBtnLabel}>PRIVACY</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onSignIn}
              style={styles.headerTextBtn}
            >
              <Text style={styles.headerTextBtnLabel}>SIGN IN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowMenuModal(true)}
              style={styles.menuDotsBtn}
            >
              <Text style={styles.menuDotsIcon}>⋮</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Middle Spacer */}
        <View style={{ flex: 1 }} />

        {/* 3. Swipeable Onboarding Carousel */}
        <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={ONBOARDING_SLIDES}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.slideCard, { width }]}>
                <Text style={styles.slideTitle}>{item.title}</Text>
                <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
              </View>
            )}
          />

          {/* Pagination Dots ● ○ ○ ○ */}
          <View style={styles.paginationRow}>
            {ONBOARDING_SLIDES.map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.dot,
                  idx === activeSlide ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* 4. Bottom Full-Width "GET STARTED" Red CTA Button */}
        <View style={styles.bottomCtaWrapper}>
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={onGetStarted}
            style={styles.getStartedButton}
          >
            <Text style={styles.getStartedText}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Privacy Policy Modal */}
      <Modal
        visible={showPrivacyModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPrivacyModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Privacy & Terms</Text>
            <Text style={styles.modalContent}>
              NEXORA respects your privacy. We use standard end-to-end encryption to secure
              your watch history, recommendations, and credentials. You can delete your profile
              and downloaded data anytime in your account settings.
            </Text>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowPrivacyModal(false)}
            >
              <Text style={styles.modalCloseBtnText}>GOT IT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 3-Dots Quick Menu Modal */}
      <Modal
        visible={showMenuModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenuModal(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setShowMenuModal(false)}
        >
          <View style={styles.menuDropdown}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setShowMenuModal(false);
                onSignIn();
              }}
            >
              <Text style={styles.menuItemText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setShowMenuModal(false);
                onGetStarted();
              }}
            >
              <Text style={styles.menuItemText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setShowMenuModal(false);
                setShowPrivacyModal(true);
              }}
            >
              <Text style={styles.menuItemText}>Help & FAQ</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  posterGridWrapper: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: -30,
  },
  column: {
    flexDirection: 'column',
    gap: 8,
  },
  posterCard: {
    width: '100%',
    height: height * 0.28,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#121216',
    position: 'relative',
  },
  posterImg: {
    width: '100%',
    height: '100%',
    opacity: 0.72,
  },
  redNBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    fontSize: 22,
    fontWeight: '900',
    color: '#E50914',
    textShadowColor: 'rgba(0,0,0,0.85)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  posterTextOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 6,
    right: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterScriptText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.95)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
    fontStyle: 'italic',
  },
  posterYellowBlock: {
    color: '#FFDE00',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.95)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    lineHeight: 18,
  },
  posterYellowCursive: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.95)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
    fontStyle: 'italic',
  },
  posterSubtleText: {
    color: '#B0B0B0',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.95)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  darkGradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.6)',
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
    zIndex: 10,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoRed: {
    color: '#E50914',
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: 2,
  },
  playIconBox: {
    width: 20,
    height: 20,
    borderRadius: 10,
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
    borderLeftWidth: 8,
    borderRightWidth: 0,
    borderBottomWidth: 5,
    borderTopWidth: 5,
    borderLeftColor: '#000000',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: 2,
  },
  headerRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTextBtn: {
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  headerTextBtnLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  menuDotsBtn: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  menuDotsIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  carouselContainer: {
    paddingBottom: 22,
  },
  slideCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  slideTitle: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
    marginBottom: 14,
  },
  slideSubtitle: {
    color: '#E0E0E0',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22,
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 26,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 8,
    backgroundColor: '#FFFFFF',
  },
  dotInactive: {
    width: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  bottomCtaWrapper: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 8 : 16,
  },
  getStartedButton: {
    backgroundColor: '#E50914',
    height: 52,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalBox: {
    backgroundColor: '#16161C',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 380,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  modalContent: {
    color: '#CCCCCC',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 20,
  },
  modalCloseBtn: {
    backgroundColor: '#E50914',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  modalCloseBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1,
  },
  menuDropdown: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#181820',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    paddingVertical: 6,
    width: 170,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 12,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
