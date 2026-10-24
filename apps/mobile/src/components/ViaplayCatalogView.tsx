import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { ContentItem } from '@nexora/shared';
import { NetflixTop10Rail } from './NetflixTop10Rail';

const { width } = Dimensions.get('window');

interface ViaplayCatalogViewProps {
  movies: ContentItem[];
  onPlay: (item: ContentItem) => void;
  onDetails: (item: ContentItem) => void;
  onToggleFavorite: (id: string) => void;
  favoriteIds: string[];
}

export const ViaplayCatalogView: React.FC<ViaplayCatalogViewProps> = ({
  movies,
  onPlay,
  onDetails,
  onToggleFavorite,
  favoriteIds,
}) => {
  const [activeFilterTab, setActiveFilterTab] = useState('Populärast');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [displayCount, setDisplayCount] = useState(12);
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  // Featured Hero Slide items (for 3D Fanned cascade deck)
  const heroItems = movies.slice(0, 5);
  const currentHero = heroItems[heroSlideIdx] || movies[0];

  const filterTabs = [
    { id: 'Populärast', label: 'Populärast' },
    { id: 'Högsta betyg', label: 'Högsta betyg' },
    { id: 'Nyheter', label: 'Nyheter' },
    { id: '4K VIP', label: '4K VIP' },
    { id: 'Sista chansen', label: 'Sista chansen' },
    { id: 'A-Ö', label: 'A-Ö' },
  ];

  const genres = [
    'All',
    'Action',
    'Sci-Fi',
    'Thriller',
    'Drama',
    'Comedy',
    'Mind-Bender',
    'Crime',
    'Adventure',
  ];

  // Filtering logic based on genre & sort tab
  let filtered = [...movies];
  if (selectedGenre !== 'All') {
    filtered = filtered.filter(
      (m) => m.genres && m.genres.some((g) => g.toLowerCase().includes(selectedGenre.toLowerCase()))
    );
  }

  if (activeFilterTab === 'Högsta betyg') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (activeFilterTab === 'Nyheter') {
    filtered.sort((a, b) => b.releaseYear - a.releaseYear);
  } else if (activeFilterTab === 'A-Ö') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (activeFilterTab === '4K VIP') {
    filtered = filtered.filter((m) => m.quality === '4K HDR');
  }

  const displayedMovies = filtered.slice(0, displayCount);

  // Responsive Grid Card sizing
  const isTablet = width >= 600;
  const numColumns = isTablet ? 4 : 3;
  const gap = 10;
  const paddingH = 16;
  const cardWidth = (width - paddingH * 2 - gap * (numColumns - 1)) / numColumns;
  const cardHeight = cardWidth * 1.48;

  const handleHeroNext = () => {
    setHeroSlideIdx((prev) => (prev + 1) % heroItems.length);
  };

  const handleHeroPrev = () => {
    setHeroSlideIdx((prev) => (prev - 1 + heroItems.length) % heroItems.length);
  };

  return (
    <View style={styles.container}>
      {/* ─────────────────────────────────────────────────────────────
          1. VIAPLAY-STYLE HERO: "KOMMER SNART" WITH 3D FANNED DECK
      ───────────────────────────────────────────────────────────── */}
      <View style={styles.heroSection}>
        {/* Subtle background ambient blur from current poster */}
        <Image
          source={{ uri: currentHero.backdropUrl || currentHero.posterUrl }}
          style={styles.heroBgImage}
          resizeMode="cover"
        />
        <View style={styles.heroBgVignette} />

        <View style={styles.heroContentRow}>
          {/* Left Text & CTA */}
          <View style={styles.heroTextColumn}>
            <View style={styles.heroBadgeRow}>
              <View style={styles.heroBadgeRed}>
                <Text style={styles.heroBadgeRedText}>KOMMER SNART</Text>
              </View>
              <Text style={styles.heroPremiereDate}>PREMIÄR 2026</Text>
            </View>

            <Text style={styles.heroHeadline} numberOfLines={2}>
              {currentHero.title}
            </Text>

            <Text style={styles.heroDescription} numberOfLines={3}>
              {currentHero.synopsis ||
                'Det är snart dags för premiär av årets största blockbuster filmer i ultra-klar 4K HDR och Dolby Atmos surround ljud.'}
            </Text>

            <View style={styles.heroButtonsRow}>
              <TouchableOpacity
                style={styles.heroPrimaryBtn}
                activeOpacity={0.85}
                onPress={() => onPlay(currentHero)}
              >
                <Text style={styles.heroPrimaryBtnText}>Mer film ▶</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.heroListBtn}
                activeOpacity={0.8}
                onPress={() => onToggleFavorite(currentHero.id)}
              >
                <Text style={styles.heroListBtnText}>
                  {favoriteIds.includes(currentHero.id) ? '✓ I listan' : '+ Min lista'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Right: 3D Fanned / Cascading Overlapping Poster Deck (Viaplay Signature) */}
          <View style={styles.fannedDeckContainer}>
            {/* Card 1 (Back left) */}
            <View style={[styles.fannedCard, styles.fannedCard1]}>
              <Image
                source={{
                  uri: heroItems[(heroSlideIdx + 2) % heroItems.length]?.posterUrl,
                }}
                style={styles.fannedPoster}
                resizeMode="cover"
              />
              <View style={styles.fannedDimmer} />
            </View>

            {/* Card 2 (Mid left) */}
            <View style={[styles.fannedCard, styles.fannedCard2]}>
              <Image
                source={{
                  uri: heroItems[(heroSlideIdx + 1) % heroItems.length]?.posterUrl,
                }}
                style={styles.fannedPoster}
                resizeMode="cover"
              />
              <View style={styles.fannedDimmer} />
            </View>

            {/* Card 3 (Front primary) with ShineBorder */}
            <TouchableOpacity
              activeOpacity={0.92}
              onPress={() => onDetails(currentHero)}
              style={[styles.fannedCard, styles.fannedCardFront]}
            >
              <Image
                source={{ uri: currentHero.posterUrl }}
                style={styles.fannedPoster}
                resizeMode="cover"
              />
              {/* Viaplay Diagonal Red Corner Ribbon */}
              <View style={styles.cornerRibbonBox}>
                <View style={styles.cornerRibbonStrip}>
                  <Text style={styles.cornerRibbonText}>NYHET</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Slider Dots & Controls (Viaplay arrows & bullet indicators) */}
        <View style={styles.heroControlsRow}>
          <TouchableOpacity onPress={handleHeroPrev} style={styles.heroArrowBtn}>
            <Text style={styles.heroArrowText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.heroDotsRow}>
            {heroItems.map((_, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setHeroSlideIdx(idx)}
                style={[
                  styles.heroDot,
                  idx === heroSlideIdx && styles.heroDotActive,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity onPress={handleHeroNext} style={styles.heroArrowBtn}>
            <Text style={styles.heroArrowText}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ─────────────────────────────────────────────────────────────
          2. NETFLIX SIGNATURE TOP 10 RANKING RAIL (1, 2, 3...)
      ───────────────────────────────────────────────────────────── */}
      <NetflixTop10Rail
        title="Top 10 Filmer Idag"
        badge="TOPP 10"
        items={movies}
        onSelect={(item) => onDetails(item)}
      />

      {/* ─────────────────────────────────────────────────────────────
          3. VIAPLAY SUB-NAV & FILTER BAR:
             - Header: "Film" with genre pills
             - Filter tabs: Populärast, Högsta betyg, Nyheter, etc.
      ───────────────────────────────────────────────────────────── */}
      <View style={styles.subnavSection}>
        {/* Title & View Toggle */}
        <View style={styles.subnavHeader}>
          <View style={styles.titleWithCount}>
            <Text style={styles.sectionHeading}>Film</Text>
            <View style={styles.genreDropdownPill}>
              <Text style={styles.genreDropdownText}>
                {selectedGenre === 'All' ? 'Samtliga' : selectedGenre} ▾
              </Text>
            </View>
          </View>

          <View style={styles.viewToggleGroup}>
            <TouchableOpacity
              onPress={() => setViewMode('grid')}
              style={[
                styles.viewToggleBtn,
                viewMode === 'grid' && styles.viewToggleBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.viewToggleText,
                  viewMode === 'grid' && styles.viewToggleTextActive,
                ]}
              >
                Grid
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setViewMode('compact')}
              style={[
                styles.viewToggleBtn,
                viewMode === 'compact' && styles.viewToggleBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.viewToggleText,
                  viewMode === 'compact' && styles.viewToggleTextActive,
                ]}
              >
                Kompakt
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Secondary Viaplay Filter Tab Bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterTabsScroll}
        >
          {filterTabs.map((tab) => {
            const isActive = activeFilterTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveFilterTab(tab.id)}
                activeOpacity={0.8}
                style={[
                  styles.filterTabPill,
                  isActive && styles.filterTabPillActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterTabLabel,
                    isActive && styles.filterTabLabelActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Genre Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genreScroll}
        >
          {genres.map((g) => {
            const isActive = selectedGenre.toLowerCase() === g.toLowerCase();
            return (
              <TouchableOpacity
                key={g}
                onPress={() => setSelectedGenre(g)}
                activeOpacity={0.8}
                style={[
                  styles.genreChip,
                  isActive && styles.genreChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.genreChipText,
                    isActive && styles.genreChipTextActive,
                  ]}
                >
                  {g === 'All' ? 'Alla Genrer' : g}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* ─────────────────────────────────────────────────────────────
          4. VIAPLAY DENSE MULTI-COLUMN MOVIE POSTERS GRID
             - Diagonal Red Corner Ribbon ("NYHET" / "4K")
             - Movie Title, Genre, Release Year
             - ShineBorder on every card
      ───────────────────────────────────────────────────────────── */}
      <View style={styles.gridSection}>
        <View style={styles.gridContainer}>
          {displayedMovies.map((movie, index) => {
            const isNew = index % 3 === 0;
            const isTopRated = movie.rating >= 9.2;
            const ribbonText = isTopRated ? 'TOP 10' : isNew ? 'NYHET' : '4K';

            return (
              <TouchableOpacity
                key={movie.id}
                activeOpacity={0.88}
                onPress={() => onDetails(movie)}
                style={[styles.movieGridCard, { width: cardWidth }]}
              >
                {/* Poster Box */}
                <View style={[styles.posterBox, { height: cardHeight }]}>
                  <Image
                    source={{ uri: movie.posterUrl }}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />

                  {/* Viaplay Diagonal Red Corner Ribbon */}
                  <View style={styles.cornerRibbonBox}>
                    <View
                      style={[
                        styles.cornerRibbonStrip,
                        isTopRated && { backgroundColor: '#800020' },
                      ]}
                    >
                      <Text style={styles.cornerRibbonText}>{ribbonText}</Text>
                    </View>
                  </View>

                  {/* Rating Badge Top Right */}
                  <View style={styles.gridRatingBadge}>
                    <Text style={styles.gridRatingStar}>★</Text>
                    <Text style={styles.gridRatingScore}>{movie.rating}</Text>
                  </View>

                  {/* Bottom Vignette */}
                  <View style={styles.gridPosterVignette} />
                </View>

                {/* Info below poster (Matching Viaplay typography) */}
                <View style={styles.cardInfoWrap}>
                  <Text style={styles.movieTitle} numberOfLines={1}>
                    {movie.title}
                  </Text>
                  <Text style={styles.movieGenre} numberOfLines={1}>
                    {movie.genres ? movie.genres[0] : 'Action'}
                  </Text>
                  <Text style={styles.movieYear}>
                    {movie.releaseYear || '2026'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ─────────────────────────────────────────────────────────────
            5. BOTTOM PAGINATION: "VISAR 18 AV 1561" & "VISA FLER"
        ───────────────────────────────────────────────────────────── */}
        <View style={styles.loadMoreBox}>
          <Text style={styles.counterText}>
            Visar {displayedMovies.length} av {filtered.length} titlar
          </Text>

          {displayedMovies.length < filtered.length && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setDisplayCount((prev) => prev + 9)}
              style={styles.loadMoreBtn}
            >
              <Text style={styles.loadMoreBtnText}>Visa fler ▾</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#07080B',
    paddingBottom: 24,
  },
  // 1. Viaplay Hero Section
  heroSection: {
    position: 'relative',
    marginHorizontal: 14,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#120a10',
    borderWidth: 1,
    borderColor: 'rgba(128, 0, 32, 0.4)',
    padding: 16,
    shadowColor: '#800020',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  heroBgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.22,
  },
  heroBgVignette: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(7, 8, 11, 0.75)',
  },
  heroContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  heroTextColumn: {
    flex: 1.1,
    paddingRight: 10,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  heroBadgeRed: {
    backgroundColor: '#800020',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#990024',
  },
  heroBadgeRedText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  heroPremiereDate: {
    color: '#FF6685',
    fontSize: 10,
    fontWeight: '800',
  },
  heroHeadline: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  heroDescription: {
    color: '#D4D4D8',
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 14,
  },
  heroButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroPrimaryBtn: {
    backgroundColor: '#800020',
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#990024',
    shadowColor: '#800020',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
  },
  heroPrimaryBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  heroListBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  heroListBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  // 3D Fanned / Cascading Overlapping Poster Deck
  fannedDeckContainer: {
    width: 140,
    height: 180,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fannedCard: {
    position: 'absolute',
    width: 105,
    height: 155,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#181A20',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 6,
  },
  fannedPoster: {
    width: '100%',
    height: '100%',
  },
  fannedDimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(7, 8, 11, 0.45)',
  },
  fannedCard1: {
    left: -10,
    top: 2,
    transform: [{ scale: 0.8 }, { rotateZ: '-8deg' }],
    zIndex: 1,
    opacity: 0.7,
  },
  fannedCard2: {
    left: 8,
    top: 6,
    transform: [{ scale: 0.9 }, { rotateZ: '-4deg' }],
    zIndex: 2,
    opacity: 0.88,
  },
  fannedCardFront: {
    left: 28,
    top: 10,
    transform: [{ scale: 1.0 }, { rotateZ: '0deg' }],
    zIndex: 3,
    borderColor: 'rgba(128, 0, 32, 0.8)',
    shadowColor: '#800020',
    shadowOpacity: 0.9,
    shadowRadius: 14,
    elevation: 10,
  },
  // Viaplay Diagonal Red Corner Ribbon
  cornerRibbonBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 44,
    height: 44,
    overflow: 'hidden',
    zIndex: 15,
  },
  cornerRibbonStrip: {
    position: 'absolute',
    top: 6,
    left: -16,
    width: 60,
    height: 16,
    backgroundColor: '#990024',
    transform: [{ rotate: '-45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 3,
  },
  cornerRibbonText: {
    color: '#FFFFFF',
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  heroControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 14,
    zIndex: 2,
  },
  heroArrowBtn: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  heroArrowText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 22,
  },
  heroDotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3F3F46',
  },
  heroDotActive: {
    width: 18,
    backgroundColor: '#800020',
    shadowColor: '#800020',
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 3,
  },
  // 3. Subnav & Filters
  subnavSection: {
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 12,
  },
  subnavHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titleWithCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionHeading: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  genreDropdownPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
  },
  genreDropdownText: {
    color: '#D4D4D8',
    fontSize: 11,
    fontWeight: '700',
  },
  viewToggleGroup: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 6,
    padding: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  viewToggleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  viewToggleBtnActive: {
    backgroundColor: '#800020',
  },
  viewToggleText: {
    color: '#A1A1AA',
    fontSize: 10,
    fontWeight: '700',
  },
  viewToggleTextActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  filterTabsScroll: {
    flexDirection: 'row',
    gap: 6,
    paddingBottom: 8,
  },
  filterTabPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  filterTabPillActive: {
    backgroundColor: '#800020',
    borderColor: '#990024',
    shadowColor: '#800020',
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 3,
  },
  filterTabLabel: {
    color: '#A1A1AA',
    fontSize: 11,
    fontWeight: '700',
  },
  filterTabLabelActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  genreScroll: {
    flexDirection: 'row',
    gap: 6,
    paddingTop: 4,
    paddingBottom: 6,
  },
  genreChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  genreChipActive: {
    backgroundColor: 'rgba(128, 0, 32, 0.35)',
    borderColor: '#800020',
  },
  genreChipText: {
    color: '#A1A1AA',
    fontSize: 10,
    fontWeight: '700',
  },
  genreChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  // 4. Grid Section
  gridSection: {
    paddingHorizontal: 16,
    marginTop: 6,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  movieGridCard: {
    marginBottom: 14,
  },
  posterBox: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#121216',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  gridRatingBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(7, 8, 11, 0.85)',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 4,
    zIndex: 10,
  },
  gridRatingStar: {
    color: '#FBBF24',
    fontSize: 8,
    fontWeight: '900',
  },
  gridRatingScore: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
  gridPosterVignette: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'rgba(7, 8, 11, 0.45)',
  },
  cardInfoWrap: {
    marginTop: 6,
  },
  movieTitle: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  movieGenre: {
    color: '#A1A1AA',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1,
  },
  movieYear: {
    color: '#71717A',
    fontSize: 9,
    fontWeight: '600',
    marginTop: 1,
  },
  // 5. Load More Box
  loadMoreBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    paddingVertical: 14,
  },
  counterText: {
    color: '#71717A',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 10,
  },
  loadMoreBtn: {
    backgroundColor: 'rgba(18, 18, 24, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(128, 0, 32, 0.4)',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 3,
  },
  loadMoreBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
