import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { ContentItem } from '@nexora/shared';

const { width } = Dimensions.get('window');

interface ContinueWatchingItem {
  id: string;
  title: string;
  subtitle: string;
  progress: number; // 0 to 1
  posterUrl: string;
}

const CONTINUE_WATCHING_DATA: ContinueWatchingItem[] = [
  {
    id: 'cw-01',
    title: 'THE LAST HORIZON',
    subtitle: 'S1 E3 • 42m',
    progress: 0.82,
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=85',
  },
  {
    id: 'cw-02',
    title: 'THE SILENT FOREST',
    subtitle: 'S1 E5 • 37m',
    progress: 0.42,
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=85',
  },
  {
    id: 'cw-03',
    title: 'BEYOND TOMORROW',
    subtitle: 'S1 E2 • 48m',
    progress: 0.7,
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=85',
  },
  {
    id: 'cw-04',
    title: 'CYBER CITY 2099',
    subtitle: 'S2 E4 • 51m',
    progress: 0.6,
    posterUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=85',
  },
];

interface NexoraMoviesHubViewProps {
  onPlayContent: (item: any) => void;
  onOpenDetails: (item: any) => void;
  onSearchPress: () => void;
  onCastPress?: () => void;
  onDownloadPress?: () => void;
}

export const NexoraMoviesHubView: React.FC<NexoraMoviesHubViewProps> = ({
  onPlayContent,
  onOpenDetails,
  onSearchPress,
  onCastPress,
  onDownloadPress,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'shows' | 'movies' | 'categories'>('movies');
  const [isInMyList, setIsInMyList] = useState(false);

  const heroItem = {
    id: 'hero-shadow-realm',
    title: 'SHADOW REALM',
    type: 'series',
    description: 'When dark apocalyptic storm clouds envelop Raven Hollow, four teenagers must navigate a terrifying alternate dimension to save their town.',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=85',
    releaseYear: 2026,
    rating: 9.6,
    genres: ['Sci-Fi', 'Horror', 'Mystery'],
    duration: 'Season 1',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  };

  const cardWidth = (width - 48) / 3;
  const cardHeight = cardWidth * 1.5;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 110 }}
    >
      {/* 1. TOP HEADER: NEXORA Logo + Cast + Download + Search */}
      <View style={styles.topHeader}>
        {/* NEXORA Red Logo */}
        <View style={styles.logoRow}>
          <Text style={styles.logoRed}>NEX</Text>
          <View style={styles.playIconBox}>
            <View style={styles.playTriangle} />
          </View>
          <Text style={styles.logoRed}>RA</Text>
        </View>

        {/* Right Action Icons */}
        <View style={styles.headerRightActions}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onCastPress}
            style={styles.iconButton}
          >
            <Text style={styles.iconSymbol}>⎚</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onDownloadPress}
            style={styles.iconButton}
          >
            <Text style={styles.iconSymbol}>⤓</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onSearchPress}
            style={styles.iconButton}
          >
            <Text style={styles.iconSymbol}>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. SECTION TITLE: For Movies */}
      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>
          {selectedFilter === 'shows' ? 'For Shows' : 'For Movies'}
        </Text>
      </View>

      {/* 3. FILTER PILLS: Shows | Movies | Categories ∨ */}
      <View style={styles.pillsRow}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => setSelectedFilter('shows')}
          style={[
            styles.filterPill,
            selectedFilter === 'shows' && styles.filterPillActive,
          ]}
        >
          <Text
            style={[
              styles.filterPillText,
              selectedFilter === 'shows' && styles.filterPillTextActive,
            ]}
          >
            Shows
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => setSelectedFilter('movies')}
          style={[
            styles.filterPill,
            selectedFilter === 'movies' && styles.filterPillActive,
          ]}
        >
          <Text
            style={[
              styles.filterPillText,
              selectedFilter === 'movies' && styles.filterPillTextActive,
            ]}
          >
            Movies
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => setSelectedFilter('categories')}
          style={[
            styles.filterPill,
            selectedFilter === 'categories' && styles.filterPillActive,
          ]}
        >
          <Text
            style={[
              styles.filterPillText,
              selectedFilter === 'categories' && styles.filterPillTextActive,
            ]}
          >
            Categories ∨
          </Text>
        </TouchableOpacity>
      </View>

      {/* 4. GIANT FEATURED HERO BILLBOARD (SHADOW REALM) */}
      <View style={styles.heroCardContainer}>
        <View style={styles.heroPosterWrapper}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=85',
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          {/* Crimson Red Vignette & Shadow Gradients */}
          <View style={styles.heroDarkOverlay} />
          <View style={styles.heroRedAuraOverlay} />

          {/* Hero Content Overlay */}
          <View style={styles.heroContent}>
            {/* NEXORA Red Logo Badge */}
            <View style={styles.heroBrandRow}>
              <Text style={styles.heroBrandRed}>NEXORA</Text>
            </View>

            {/* Title: SHADOW REALM */}
            <Text style={styles.heroTitle}>SHADOW REALM</Text>

            {/* Subtitle / Broadcast Date */}
            <Text style={styles.heroBroadcast}>Season 1 Coming November 26</Text>
            <Text style={styles.heroBroadcastTime}>8:00 PM EST</Text>

            {/* Action Buttons: Play + My List */}
            <View style={styles.heroActionButtonsRow}>
              {/* Play Button */}
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={() => onPlayContent(heroItem)}
                style={styles.heroPlayButton}
              >
                <Text style={styles.heroPlayIcon}>▶</Text>
                <Text style={styles.heroPlayText}>Play</Text>
              </TouchableOpacity>

              {/* My List Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setIsInMyList(!isInMyList)}
                style={styles.heroListButton}
              >
                <Text style={styles.heroListIcon}>{isInMyList ? '✓' : '+'}</Text>
                <Text style={styles.heroListText}>
                  {isInMyList ? 'In List' : 'My List'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* 5. CONTINUE WATCHING ON NEXORA RAIL */}
      <View style={styles.railSection}>
        {/* Rail Header with Right Arrow */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.railHeaderRow}
          onPress={() => {}}
        >
          <Text style={styles.railTitle}>Continue Watching on Nexora</Text>
          <Text style={styles.railChevron}>›</Text>
        </TouchableOpacity>

        {/* 3 Portrait Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsRowContent}
        >
          {CONTINUE_WATCHING_DATA.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              onPress={() => onPlayContent(item)}
              style={[styles.continueCard, { width: cardWidth }]}
            >
              {/* Card Poster with Play Button */}
              <View style={[styles.cardPosterBox, { height: cardHeight }]}>
                <Image
                  source={{ uri: item.posterUrl }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />

                {/* Circular Play Button in Top-Right */}
                <View style={styles.cardPlayCircle}>
                  <Text style={styles.cardPlayTriangle}>▶</Text>
                </View>

                {/* Bottom Red Progress Scrubber Line */}
                <View style={styles.cardProgressTrack}>
                  <View
                    style={[
                      styles.cardProgressFill,
                      { width: `${item.progress * 100}%` },
                    ]}
                  />
                </View>
              </View>

              {/* Title & Subtitle Below Card */}
              <View style={styles.cardInfoBox}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.cardSubtitle} numberOfLines={1}>
                  {item.subtitle}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 6. TOP TRENDING ON NEXORA */}
      <View style={styles.railSection}>
        <View style={styles.railHeaderRow}>
          <Text style={styles.railTitle}>Trending Movies</Text>
          <Text style={styles.railChevron}>›</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsRowContent}
        >
          {[
            {
              id: 'tr-1',
              title: 'INTERSTELLAR',
              rating: '★ 9.4',
              uri: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=400&auto=format&fit=crop&q=85',
            },
            {
              id: 'tr-2',
              title: 'BLADE RUNNER 2049',
              rating: '★ 9.2',
              uri: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=85',
            },
            {
              id: 'tr-3',
              title: 'OPPENHEIMER',
              rating: '★ 9.3',
              uri: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=85',
            },
            {
              id: 'tr-4',
              title: 'THE DARK KNIGHT',
              rating: '★ 9.5',
              uri: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&auto=format&fit=crop&q=85',
            },
          ].map((m) => (
            <TouchableOpacity
              key={m.id}
              activeOpacity={0.85}
              onPress={() => onOpenDetails(m)}
              style={[styles.continueCard, { width: cardWidth }]}
            >
              <View style={[styles.cardPosterBox, { height: cardHeight }]}>
                <Image source={{ uri: m.uri }} style={styles.cardImage} resizeMode="cover" />
              </View>
              <View style={styles.cardInfoBox}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {m.title}
                </Text>
                <Text style={styles.cardSubtitle}>{m.rating}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 14 : 8,
    paddingBottom: 10,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoRed: {
    color: '#E50914',
    fontSize: 26,
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
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  iconButton: {
    padding: 4,
  },
  iconSymbol: {
    color: '#FFFFFF',
    fontSize: 20,
    opacity: 0.9,
  },
  titleSection: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 10,
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  pillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 16,
  },
  filterPill: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    backgroundColor: 'rgba(20, 20, 25, 0.7)',
  },
  filterPillActive: {
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  filterPillText: {
    color: '#CCCCCC',
    fontSize: 13,
    fontWeight: '600',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  heroCardContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  heroPosterWrapper: {
    width: '100%',
    height: 440,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#101015',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroDarkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 0, 0, 0.25)',
  },
  heroRedAuraOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 250,
    backgroundColor: 'rgba(5, 5, 8, 0.88)',
  },
  heroContent: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 18,
    alignItems: 'center',
  },
  heroBrandRow: {
    marginBottom: 4,
  },
  heroBrandRed: {
    color: '#E50914',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0,0,0,0.95)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    fontFamily: Platform.OS === 'ios' ? 'Cinzel' : 'serif',
    marginBottom: 6,
  },
  heroBroadcast: {
    color: '#E5E5E5',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroBroadcastTime: {
    color: '#CCCCCC',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroActionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  heroPlayButton: {
    flex: 1,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  heroPlayIcon: {
    color: '#000000',
    fontSize: 15,
  },
  heroPlayText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '800',
  },
  heroListButton: {
    flex: 1,
    height: 44,
    backgroundColor: 'rgba(40, 40, 48, 0.75)',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  heroListIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  heroListText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  railSection: {
    marginBottom: 24,
  },
  railHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  railTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  railChevron: {
    color: '#9CA3AF',
    fontSize: 22,
    fontWeight: '700',
  },
  cardsRowContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  continueCard: {
    gap: 6,
  },
  cardPosterBox: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#16161E',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardPlayCircle: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPlayTriangle: {
    color: '#FFFFFF',
    fontSize: 10,
    marginLeft: 1.5,
  },
  cardProgressTrack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3.5,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  cardProgressFill: {
    height: '100%',
    backgroundColor: '#E50914',
  },
  cardInfoBox: {
    paddingHorizontal: 2,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardSubtitle: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 1,
  },
});
