import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Modal,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// 3-Column Posters exactly matching Image 2
const COLUMN_1_POSTERS = [
  {
    id: 'c1-1',
    uri: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&auto=format&fit=crop&q=85',
    title: 'Hari ini\nakan kita ceritakan\nnanti',
    type: 'cursive',
    hasNBadge: true,
  },
  {
    id: 'c1-2',
    uri: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=85',
    title: 'KULIAH UMUM',
    roman: 'II',
    type: 'roman',
    hasNBadge: true,
  },
  {
    id: 'c1-3',
    uri: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&auto=format&fit=crop&q=85',
    title: 'KESATRIA RAJAWALI',
    type: 'rajawali',
    hasNBadge: true,
  },
];

const COLUMN_2_POSTERS = [
  {
    id: 'c2-1',
    uri: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=85',
    title: 'Cinta Sekolah mata',
    type: 'yellowCursive',
    hasNBadge: false,
  },
  {
    id: 'c2-2',
    uri: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=85',
    title: 'KING\nOF\nISLAND',
    type: 'yellowBlock',
    hasNBadge: true,
  },
  {
    id: 'c2-3',
    uri: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&auto=format&fit=crop&q=85',
    title: 'KESATRIA RAJAWALI',
    type: 'rajawali',
    hasNBadge: true,
  },
];

const COLUMN_3_POSTERS = [
  {
    id: 'c3-1',
    uri: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&auto=format&fit=crop&q=85',
    title: 'KITA AKAN BERCERITA',
    subtitle: 'Esok hari',
    type: 'cerita',
    hasNBadge: true,
  },
  {
    id: 'c3-2',
    uri: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=400&auto=format&fit=crop&q=85',
    title: 'KULIAH UMUM',
    roman: 'III',
    type: 'roman',
    hasNBadge: true,
  },
  {
    id: 'c3-3',
    uri: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&auto=format&fit=crop&q=85',
    title: 'KESATRIA RAJAWALI',
    type: 'rajawali',
    hasNBadge: true,
  },
];

// Carousel Slides
const ONBOARDING_SLIDES = [
  {
    id: 'slide-1',
    title: 'Unlimited\nmovies, TV\nshow & more',
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
  const posterHeight = Math.max(height * 0.26, 190);

  const renderPosterCard = (item: any) => {
    return (
      <View key={item.id} style={[styles.posterCard, { height: posterHeight }]}>
        <Image source={{ uri: item.uri }} style={styles.posterImg} resizeMode="cover" />

        {/* Red 'N' / Nexora Badge in top-left like Image 2 */}
        {item.hasNBadge && (
          <Text style={styles.redNBadge}>N</Text>
        )}

        {/* Dynamic Titles */}
        {item.type === 'cursive' && (
          <View style={styles.posterTextOverlay}>
            <Text style={styles.posterCursive}>{item.title}</Text>
          </View>
        )}

        {item.type === 'yellowCursive' && (
          <View style={styles.posterTextOverlay}>
            <Text style={styles.posterYellowCursive}>{item.title}</Text>
          </View>
        )}

        {item.type === 'yellowBlock' && (
          <View style={styles.posterCenterOverlay}>
            <Text style={styles.posterYellowBlock}>KING</Text>
            <Text style={styles.posterOfScript}>Of</Text>
            <Text style={styles.posterYellowBlock}>ISLAND</Text>
          </View>
        )}

        {item.type === 'cerita' && (
          <View style={styles.posterTextOverlay}>
            <Text style={styles.ceritaBlock}>{item.title}</Text>
            <Text style={styles.ceritaScript}>{item.subtitle}</Text>
          </View>
        )}

        {item.type === 'roman' && (
          <View style={styles.posterCenterOverlay}>
            <Text style={styles.romanBackground}>{item.roman}</Text>
            <Text style={styles.romanTitle}>{item.title}</Text>
          </View>
        )}

        {item.type === 'rajawali' && (
          <View style={styles.posterTextOverlay}>
            <Text style={styles.rajawaliText}>{item.title}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 1. BACKGROUND POSTER WALL (Absolutely positioned behind everything) */}
      <View style={styles.posterGridWrapper} pointerEvents="none">
        <View style={styles.gridRow}>
          {/* Column 1 */}
          <View style={[styles.column, { width: colWidth }]}>
            {COLUMN_1_POSTERS.map((item) => renderPosterCard(item))}
          </View>

          {/* Column 2 (staggered slightly) */}
          <View style={[styles.column, { width: colWidth, marginTop: -18 }]}>
            {COLUMN_2_POSTERS.map((item) => renderPosterCard(item))}
          </View>

          {/* Column 3 */}
          <View style={[styles.column, { width: colWidth }]}>
            {COLUMN_3_POSTERS.map((item) => renderPosterCard(item))}
          </View>
        </View>

        {/* Soft, light vignette overlay (subtle so posters stay vibrant & clearly visible) */}
        <View style={styles.darkGradientOverlay} />
      </View>

      {/* 2. FOREGROUND INTERACTIVE CONTENT (Fixed to screen bounds) */}
      <SafeAreaView style={styles.safeContainer} edges={['top', 'bottom']}>
        {/* Top Header: NEXORA Logo on Left, PRIVACY + SIGN IN + Dots on Right */}
        <View style={styles.topHeader}>
          {/* NEXORA Logo (Red Netflix font style, NOT Netflix text) */}
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

        {/* Middle Spacer to keep top and bottom apart */}
        <View style={styles.middleSpacer} />

        {/* Bottom Section: Carousel + Dots + GET STARTED */}
        <View style={styles.bottomSection}>
          {/* Swipeable Carousel */}
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

          {/* Carousel Dots ● ○ ○ ○ */}
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

          {/* Big Full-Width Red Button: GET STARTED */}
          <View style={styles.ctaWrapper}>
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={onGetStarted}
              style={styles.getStartedButton}
            >
              <Text style={styles.getStartedText}>GET STARTED</Text>
            </TouchableOpacity>
          </View>
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
    position: 'relative',
  },
  posterGridWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    zIndex: 1,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: -20,
  },
  column: {
    flexDirection: 'column',
    gap: 6,
  },
  posterCard: {
    width: '100%',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#121216',
    position: 'relative',
  },
  posterImg: {
    width: '100%',
    height: '100%',
    opacity: 1,
  },
  redNBadge: {
    position: 'absolute',
    top: 6,
    left: 8,
    fontSize: 22,
    fontWeight: '900',
    color: '#E50914',
    textShadowColor: 'rgba(0,0,0,0.95)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    zIndex: 5,
  },
  posterTextOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 6,
    right: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterCenterOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterCursive: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.95)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
    fontStyle: 'italic',
  },
  posterYellowCursive: {
    color: '#FFDE00',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.95)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
    fontStyle: 'italic',
  },
  posterYellowBlock: {
    color: '#FFDE00',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.95)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    lineHeight: 18,
  },
  posterOfScript: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    fontStyle: 'italic',
    marginVertical: -2,
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  ceritaBlock: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.95)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  ceritaScript: {
    color: '#2DD4BF',
    fontSize: 11,
    fontWeight: '800',
    fontStyle: 'italic',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.95)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  romanBackground: {
    position: 'absolute',
    fontSize: 56,
    fontWeight: '900',
    color: 'transparent',
    borderColor: '#E50914',
    borderWidth: 0,
    textShadowColor: '#E50914',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
    letterSpacing: 2,
    opacity: 0.7,
  },
  romanTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.95)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  rajawaliText: {
    color: '#A855F7',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.95)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  darkGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.22)',
  },
  safeContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    justifyContent: 'space-between',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 14 : 6,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoRed: {
    color: '#E50914',
    fontSize: 28,
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
    fontSize: 13,
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
  middleSpacer: {
    flex: 1,
  },
  bottomSection: {
    paddingBottom: Platform.OS === 'ios' ? 22 : 30,
  },
  slideCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  slideTitle: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0,0,0,0.95)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
    marginBottom: 10,
  },
  slideSubtitle: {
    color: '#E5E5E5',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22,
    textShadowColor: 'rgba(0,0,0,0.95)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 16,
    gap: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
  },
  dotInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.38)',
  },
  ctaWrapper: {
    paddingHorizontal: 16,
  },
  getStartedButton: {
    backgroundColor: '#E50914',
    height: 52,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
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
