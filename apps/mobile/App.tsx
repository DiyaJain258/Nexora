import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  MOCK_CONTENT,
  MOCK_CHANNELS,
  MOCK_CONTINUE_WATCHING,
  MOCK_USERS,
  ContentItem,
  Channel,
} from '@nexora/shared';

import { AnimatedHeader } from './src/components/AnimatedHeader';
import { FeaturedContentCarousel } from './src/components/FeaturedContentCarousel';
import { MoviePosterCard } from './src/components/MoviePosterCard';
import { ContinueWatchingCard } from './src/components/ContinueWatchingCard';
import { SectionHeader } from './src/components/SectionHeader';
import { CardsEffectSeriesDeck } from './src/components/CardsEffectSeriesDeck';
import { Coverflow3DCarousel } from './src/components/Coverflow3DCarousel';
import {
  AnimatedBottomNavigation,
  BottomTabType,
} from './src/components/AnimatedBottomNavigation';
import { LandingShowcaseView } from './src/components/LandingShowcaseView';
import { NativeCinematicBackground } from './src/components/NativeCinematicBackground';
import { NativeSignInCard } from './src/components/NativeSignInCard';
import { ShineBorder } from './src/components/ShineBorder';
import { NetflixTop10Rail } from './src/components/NetflixTop10Rail';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<BottomTabType>('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovieGenre, setSelectedMovieGenre] = useState('All');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [playingItem, setPlayingItem] = useState<any>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['vod-01', 'vod-02']);
  const [activationCode, setActivationCode] = useState('');
  const [activationSuccess, setActivationSuccess] = useState(false);
  const [progress, setProgress] = useState(42);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedAudio, setSelectedAudio] = useState('English (Dolby Atmos)');
  const [selectedSub, setSelectedSub] = useState('English [CC]');
  const [showTracksModal, setShowTracksModal] = useState(false);

  // Auto-dismiss splash screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const categories = ['All', 'Live TV', 'Movies', 'Series', 'Sports', 'Kids'];
  const movies = MOCK_CONTENT.filter((c) => c.type === 'movie');
  const series = MOCK_CONTENT.filter((c) => c.type === 'series');
  const sports = MOCK_CONTENT.filter((c) => c.type === 'sports');
  const kids = MOCK_CONTENT.filter((c) => c.type === 'kids');

  const topRatedFilms = [
    {
      id: 'tr-01',
      title: 'Interstellar',
      year: '2014',
      rating: '9.4',
      quality: '4K IMAX',
      genre: 'Sci-Fi',
      posterUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=85',
    },
    {
      id: 'tr-02',
      title: 'Dune: Part Two',
      year: '2024',
      rating: '9.3',
      quality: '4K HDR10+',
      genre: 'Epic Sci-Fi',
      posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=85',
    },
    {
      id: 'tr-03',
      title: 'Oppenheimer',
      year: '2023',
      rating: '9.2',
      quality: 'IMAX 70MM',
      genre: 'Drama',
      posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=85',
    },
    {
      id: 'tr-04',
      title: 'Blade Runner 2049',
      year: '2017',
      rating: '9.1',
      quality: '4K DOLBY',
      genre: 'Cyberpunk',
      posterUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=85',
    },
    {
      id: 'tr-05',
      title: 'The Dark Knight',
      year: '2008',
      rating: '9.5',
      quality: '4K REMASTER',
      genre: 'Action',
      posterUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=85',
    },
    {
      id: 'tr-06',
      title: 'Inception',
      year: '2010',
      rating: '9.3',
      quality: '4K HDR',
      genre: 'Mind-Bender',
      posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=85',
    },
  ];

  const toggleFavorite = (id: string) => {
    if (favoriteIds.includes(id)) {
      setFavoriteIds(favoriteIds.filter((f) => f !== id));
    } else {
      setFavoriteIds([...favoriteIds, id]);
    }
  };

  const handlePairTv = () => {
    if (!activationCode) return;
    setActivationSuccess(true);
    setTimeout(() => {
      setActivationSuccess(false);
      setActivationCode('');
    }, 3500);
  };

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar style="light" />
        <View style={styles.splashLogoBox}>
          <Text style={styles.splashLogoText}>NX</Text>
        </View>
        <Text style={styles.splashBrandTitle}>
          NEX<Text style={{ color: '#E50914' }}>ORA</Text>
        </Text>
        <Text style={styles.splashSubtitle}>IPTV & 4K STREAMING</Text>
        <View style={styles.splashProgressBarTrack}>
          <View style={styles.splashProgressBarFill} />
        </View>
        <Text style={styles.splashStatus}>INITIALIZING 3D CINEMATIC ENGINE...</Text>
      </View>
    );
  }

  const renderMainContent = () => {
    if (isSearchOpen) {
      return (
        <View style={styles.searchSection}>
          <View style={styles.searchInputBox}>
            <Text style={{ fontSize: 16 }}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search 4K movies, series, channels..."
              placeholderTextColor="#737373"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text style={{ color: '#B3B3B3', fontSize: 14 }}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          <SectionHeader
            title={searchQuery ? `Results for "${searchQuery}"` : 'Top Searched 4K Titles'}
            badge="4K HDR"
          />

          {MOCK_CONTENT.filter(
            (c) =>
              c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              c.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()))
          ).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.searchResultItem}
              onPress={() => setSelectedItem(item)}
            >
              <Image source={{ uri: item.posterUrl }} style={styles.searchThumb} />
              <View style={{ flex: 1 }}>
                <Text style={styles.searchItemTitle}>{item.title}</Text>
                <Text style={styles.searchItemMeta}>
                  {item.releaseYear} • {item.genres[0]} • ★ {item.rating}
                </Text>
                <View style={styles.qualityBadge}>
                  <Text style={styles.qualityBadgeText}>{item.quality}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.playIconButton}
                onPress={() => setPlayingItem(item)}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>▶</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    if (activeTab === 'landing') {
      return (
        <LandingShowcaseView
          onOpenLiveDemo={(channel) => setPlayingItem(channel || MOCK_CHANNELS[0])}
          onOpenActivation={() => setActiveTab('account')}
          onSwitchToStreaming={() => {
            setActiveTab('home');
            setSelectedCategory('All');
          }}
        />
      );
    }

    if (activeTab === 'livetv') {
      return (
        <View style={styles.paddingSection}>
          <View style={styles.liveHeroCard}>
            <Image source={{ uri: MOCK_CHANNELS[0].logo }} style={styles.liveHeroBg} />
            <View style={styles.liveHeroOverlay}>
              <View style={styles.badgeRed}>
                <Text style={styles.badgeRedText}>● LIVE TRANSMISSION</Text>
              </View>
              <Text style={styles.liveHeroTitle}>{MOCK_CHANNELS[0].name}</Text>
              <Text style={styles.liveHeroProgram}>
                {MOCK_CHANNELS[0].currentProgram?.title || 'Continuous Airing'}
              </Text>
              <TouchableOpacity
                style={styles.liveHeroButton}
                onPress={() => setPlayingItem(MOCK_CHANNELS[0])}
              >
                <Text style={styles.heroPrimaryButtonText}>▶ Watch Fullscreen 4K</Text>
              </TouchableOpacity>
            </View>
          </View>

          <SectionHeader
            title={`Electronic Program Guide (${MOCK_CHANNELS.length} Channels)`}
            badge="REAL-TIME"
          />

          {MOCK_CHANNELS.map((ch) => (
            <TouchableOpacity
              key={ch.id}
              style={styles.channelRow}
              onPress={() => setPlayingItem(ch)}
            >
              <Image source={{ uri: ch.logo }} style={styles.channelLogo} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={styles.channelNumber}>#{ch.channelNumber}</Text>
                  <Text style={styles.channelName}>{ch.name}</Text>
                  <View style={styles.resBadge}>
                    <Text style={styles.resBadgeText}>{ch.resolution}</Text>
                  </View>
                </View>
                <Text style={styles.channelProgram}>
                  {ch.currentProgram?.title || 'Continuous Live Broadcast'}
                </Text>
                <View style={styles.channelProgressBar}>
                  <View
                    style={[
                      styles.channelProgressFill,
                      { width: `${ch.currentProgram?.progressPercent || 35}%` },
                    ]}
                  />
                </View>
              </View>
              <View style={styles.channelPlayIcon}>
                <Text style={{ color: '#E50914', fontSize: 14 }}>▶</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    if (activeTab === 'movies') {
      const movieGenres = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Thriller', 'Animation', 'All'];
      const filteredMoviesList =
        selectedMovieGenre === 'All'
          ? movies
          : movies.filter((m) =>
              m.genres.some((g) => g.toLowerCase().includes(selectedMovieGenre.toLowerCase()))
            );

      const trendingMovies = [
        {
          id: 'trend-1',
          title: 'Neon Harbor',
          category: 'Action • Cyberpunk',
          rating: '9.3',
          bgColor: '#4A0404',
          image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80',
        },
        {
          id: 'trend-2',
          title: 'Red Sands',
          category: 'Sci-Fi • Odyssey',
          rating: '9.6',
          bgColor: '#6B0014',
          image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=500&auto=format&fit=crop&q=80',
        },
        {
          id: 'trend-3',
          title: 'Deep Forest',
          category: 'Mystery • Thriller',
          rating: '9.1',
          bgColor: '#2E000B',
          image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
        },
      ];

      return (
        <View style={styles.paddingSection}>
          {/* Header Row: Movies + Search (Screenshot 1) */}
          <View style={styles.moviesHeaderRow}>
            <Text style={styles.moviesHeaderTitle}>Movies</Text>
            <TouchableOpacity
              style={styles.moviesHeaderSearchBtn}
              onPress={() => setIsSearchOpen(true)}
            >
              <Text style={{ fontSize: 16 }}>🔍</Text>
            </TouchableOpacity>
          </View>

          {/* Featured Hero Card (Screenshot 1) */}
          <View style={styles.moviesHeroCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=900&auto=format&fit=crop&q=85' }}
              style={styles.moviesHeroBg}
            />
            <View style={styles.moviesHeroOverlay}>
              <Text style={styles.moviesHeroTag}>Featured • Thriller</Text>
              <Text style={styles.moviesHeroTitle}>Last Signal</Text>
              <View style={styles.moviesHeroBtnsRow}>
                <TouchableOpacity
                  style={styles.moviesPlayBtn}
                  onPress={() => setPlayingItem(movies[0])}
                >
                  <Text style={styles.moviesPlayBtnText}>▶  Play</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.moviesListBtn}
                  onPress={() => toggleFavorite(movies[0].id)}
                >
                  <Text style={styles.moviesListBtnText}>
                    {favoriteIds.includes(movies[0].id) ? '✓ In list' : '+ My list'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <ShineBorder borderRadius={22} borderWidth={1.5} duration={8} />
          </View>

          {/* Netflix Signature Top 10 Movies Rail with Giant 1, 2, 3... Outlined Numbers */}
          <NetflixTop10Rail
            title="Top 10 Movies Today"
            badge="#1 TRENDING"
            items={movies}
            onSelect={(item) => setSelectedItem(item)}
            onSeeAll={() => setSelectedMovieGenre('All')}
          />

          {/* Browse by genre Section (Screenshot 1) */}
          <Text style={[styles.moviesSectionTitle, { marginTop: 20, marginBottom: 10 }]}>
            Browse by genre
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 18 }}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {movieGenres.map((g) => {
                const isActive = selectedMovieGenre === g;
                return (
                  <TouchableOpacity
                    key={g}
                    style={[
                      styles.genrePill,
                      isActive && styles.genrePillActive,
                    ]}
                    onPress={() => setSelectedMovieGenre(g)}
                  >
                    <Text
                      style={[
                        styles.genrePillText,
                        isActive && styles.genrePillTextActive,
                      ]}
                    >
                      {g}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          {/* Filtered Movies Grid */}
          <View style={styles.moviesGridHeader}>
            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '800' }}>
              {selectedMovieGenre === 'All' ? 'All Blockbusters' : `${selectedMovieGenre} Titles`}
            </Text>
            <Text style={{ color: '#71717a', fontSize: 12 }}>
              {filteredMoviesList.length} movies
            </Text>
          </View>
          <View style={styles.moviesGrid}>
            {filteredMoviesList.map((m) => (
              <MoviePosterCard
                key={m.id}
                item={m}
                width={(width - 44) / 2}
                height={240}
                onPress={(item) => setSelectedItem(item)}
              />
            ))}
          </View>
        </View>
      );
    }

    if (activeTab === 'mylist') {
      return (
        <View style={styles.paddingSection}>
          <SectionHeader
            title={`My Watchlist (${favoriteIds.length})`}
            badge="SAVED"
          />
          {favoriteIds.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={{ fontSize: 48, marginBottom: 12 }}>🔖</Text>
              <Text style={styles.emptyTitle}>Your List is Empty</Text>
              <Text style={styles.emptySub}>
                Explore trending movies and series to add them to your personal watchlist.
              </Text>
            </View>
          ) : (
            <View style={styles.moviesGrid}>
              {MOCK_CONTENT.filter((c) => favoriteIds.includes(c.id)).map((item) => (
                <MoviePosterCard
                  key={item.id}
                  item={item}
                  width={(width - 44) / 2}
                  height={240}
                  onPress={(i) => setSelectedItem(i)}
                />
              ))}
            </View>
          )}
        </View>
      );
    }

    if (activeTab === 'account') {
      return (
        <View style={{ paddingBottom: 32 }}>
          {/* Netflix-style Sign In Card */}
          <NativeSignInCard
            onSignInSuccess={() => {
              setActiveTab('home');
            }}
          />

          {/* Android / Google TV Device Activation */}
          <View style={[styles.settingsSection, { marginHorizontal: 16, marginTop: 16 }]}>
            <Text style={styles.sectionTitle}>📺 Pair with Android TV / Google TV</Text>
            <Text style={styles.settingsDesc}>
              Enter the 6-digit activation code displayed on your TV screen to link your account.
            </Text>

            <View style={styles.pairingBox}>
              <TextInput
                style={styles.pairingInput}
                placeholder="NX-8492"
                placeholderTextColor="#666666"
                value={activationCode}
                onChangeText={setActivationCode}
                maxLength={7}
                autoCapitalize="characters"
              />
              <TouchableOpacity style={styles.pairingButton} onPress={handlePairTv}>
                <Text style={styles.pairingButtonText}>Link TV</Text>
              </TouchableOpacity>
            </View>

            {activationSuccess && (
              <View style={styles.successBox}>
                <Text style={styles.successText}>✓ TV Paired Successfully! Enjoy 4K HDR.</Text>
              </View>
            )}
          </View>
        </View>
      );
    }

    // Default: activeTab === 'home'
    if (selectedCategory === 'Series') {
      return (
        <View style={{ paddingBottom: 24 }}>
          <View style={styles.seriesDeckHeaderBox}>
            <View style={styles.seriesDeckTagRow}>
              <View style={styles.badgeRed}>
                <Text style={styles.badgeRedText}>SWIPER 3D EFFECT CARDS</Text>
              </View>
              <Text style={styles.seriesDeckSubtitle}>Swipe cards left/right or tap arrows</Text>
            </View>
            <Text style={styles.seriesDeckTitle}>NEXORA Series 3D Deck</Text>
          </View>

          {/* 3D Stacked Cards Deck */}
          <CardsEffectSeriesDeck
            items={series}
            onPlay={(item) => setPlayingItem(item)}
            onDetails={(item) => setSelectedItem(item)}
            onToggleFavorite={toggleFavorite}
            favoriteIds={favoriteIds}
          />

          <SectionHeader
            title="All Binge-Worthy Series"
            badge={`${series.length} TITLES`}
          />
          <View style={[styles.moviesGrid, { paddingHorizontal: 16 }]}>
            {series.map((s) => (
              <MoviePosterCard
                key={s.id}
                item={s}
                width={(width - 44) / 2}
                height={240}
                onPress={(item) => setSelectedItem(item)}
              />
            ))}
          </View>
        </View>
      );
    }

    if (selectedCategory === 'Sports') {
      return (
        <View style={styles.paddingSection}>
          <SectionHeader
            title={`Live & Apex Sports (${sports.length})`}
            badge="4K 60FPS"
          />
          <View style={styles.moviesGrid}>
            {sports.map((sp) => (
              <MoviePosterCard
                key={sp.id}
                item={sp}
                width={(width - 44) / 2}
                height={240}
                badgeType="4K"
                onPress={(item) => setSelectedItem(item)}
              />
            ))}
          </View>
        </View>
      );
    }

    if (selectedCategory === 'Kids') {
      return (
        <View style={styles.paddingSection}>
          <SectionHeader
            title={`Kids & Family Spotlight (${kids.length})`}
            badge="ALL AGES"
          />
          <View style={styles.moviesGrid}>
            {kids.map((k) => (
              <MoviePosterCard
                key={k.id}
                item={k}
                width={(width - 44) / 2}
                height={240}
                onPress={(item) => setSelectedItem(item)}
              />
            ))}
          </View>
        </View>
      );
    }

    return (
      <View style={{ backgroundColor: '#07080B' }}>
        {/* Animated Hero Carousel with ambient red glow, auto-rotation & crossfade */}
        <FeaturedContentCarousel
          items={movies}
          onPlay={(item) => setPlayingItem(item)}
          onDetails={(item) => setSelectedItem(item)}
          onToggleFavorite={toggleFavorite}
          favoriteIds={favoriteIds}
        />

        {/* Netflix Signature Top 10 in India Today Rail */}
        <NetflixTop10Rail
          title="Top 10 in India Today"
          badge="#1 TRENDING"
          items={movies}
          onSelect={(item) => setSelectedItem(item)}
          onSeeAll={() => setActiveTab('movies')}
        />

        {/* Live TV Channels Rail */}
        <SectionHeader
          title="Live TV Channels"
          badge="● LIVE NOW"
          onSeeAll={() => setActiveTab('livetv')}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.railScroll}
        >
          {MOCK_CHANNELS.map((ch) => (
            <TouchableOpacity
              key={ch.id}
              activeOpacity={0.88}
              onPress={() => setPlayingItem(ch)}
              style={styles.liveChannelCard}
            >
              <ShineBorder borderRadius={12} borderWidth={1.5} duration={8} />
              <View style={styles.liveChannelHeader}>
                <Image source={{ uri: ch.logo }} style={styles.liveChannelLogo} resizeMode="contain" />
                <View style={styles.liveResBadge}>
                  <Text style={styles.liveResBadgeText}>● LIVE</Text>
                </View>
              </View>
              <Text style={styles.liveChannelName} numberOfLines={1}>{ch.name}</Text>
              <Text style={styles.liveChannelProgram} numberOfLines={1}>
                {ch.currentProgram?.title || 'Continuous Airing'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Horizontally Scrollable Container for 'Top Rated Films' (2:3 Aspect Ratio) */}
        <View style={styles.topRatedSectionHeader}>
          <View>
            <Text style={styles.topRatedPreTitle}>CINEMATIC MASTERWORKS</Text>
            <Text style={styles.topRatedSectionTitle}>Top Rated Films</Text>
          </View>
          <TouchableOpacity onPress={() => setActiveTab('movies')}>
            <Text style={styles.topRatedSeeAll}>See all ›</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topRatedScroll}
        >
          {topRatedFilms.map((film) => (
            <TouchableOpacity
              key={film.id}
              style={styles.topRatedCard}
              activeOpacity={0.88}
              onPress={() => setSelectedItem(MOCK_CONTENT[0])}
            >
              <View style={styles.topRatedPosterBox}>
                <Image source={{ uri: film.posterUrl }} style={styles.topRatedPoster} />
                <ShineBorder borderRadius={10} borderWidth={1.5} duration={6} />
                <View style={styles.topRatedQualityBadge}>
                  <Text style={styles.topRatedQualityText}>{film.quality}</Text>
                </View>
                <View style={styles.topRatedRatingBadge}>
                  <Text style={styles.topRatedRatingText}>★ {film.rating}</Text>
                </View>
              </View>
              <Text style={styles.topRatedTitle} numberOfLines={1}>
                {film.title}
              </Text>
              <Text style={styles.topRatedMeta}>
                {film.year} • {film.genre}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Continue Watching Rail */}
        <SectionHeader
          title="Continue Watching"
          badge="3 IN PROGRESS"
          onSeeAll={() => setActiveTab('mylist')}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.railScroll}
        >
          {MOCK_CONTINUE_WATCHING.map((item) => (
            <ContinueWatchingCard
              key={item.id}
              item={item}
              onPress={(cw) => {
                const matched = MOCK_CONTENT.find((c) => c.id === cw.contentId);
                setPlayingItem(matched || cw);
              }}
            />
          ))}
        </ScrollView>

        {/* Rail 3: Trending 4K Blockbusters - 3D Coverflow Effect */}
        <SectionHeader
          title="Trending 4K Blockbusters"
          badge="3D COVERFLOW"
          onSeeAll={() => setActiveTab('movies')}
        />
        <Coverflow3DCarousel
          items={movies}
          onPlay={(item) => setPlayingItem(item)}
          onDetails={(item) => setSelectedItem(item)}
        />

        {/* Rail 4: NEXORA Binge-Worthy Series with 3D Cards Stack Deck */}
        <SectionHeader
          title="Binge-Worthy Series 3D Deck"
          badge="3D CARDS DECK"
          onSeeAll={() => setSelectedCategory('Series')}
        />
        <CardsEffectSeriesDeck
          items={series}
          onPlay={(item) => setPlayingItem(item)}
          onDetails={(item) => setSelectedItem(item)}
          onToggleFavorite={toggleFavorite}
          favoriteIds={favoriteIds}
        />

        {/* Rail 5: Quick Series Catalog (Horizontal browse matching Web) */}
        <SectionHeader
          title={`Quick Catalog (${series.length} Available)`}
          badge="SERIES"
          onSeeAll={() => setSelectedCategory('Series')}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.railScroll}
        >
          {series.map((s) => (
            <TouchableOpacity
              key={s.id}
              activeOpacity={0.88}
              onPress={() => setSelectedItem(s)}
              style={styles.quickCatalogItem}
            >
              <View style={styles.quickCatalogPosterBox}>
                <Image source={{ uri: s.posterUrl }} style={styles.quickCatalogPoster} />
                <ShineBorder borderRadius={10} borderWidth={1.5} duration={7} />
                <View style={styles.quickCatalogBadge}>
                  <Text style={styles.quickCatalogBadgeText}>
                    {s.seasonsCount ? `${s.seasonsCount}S` : s.duration}
                  </Text>
                </View>
              </View>
              <Text style={styles.quickCatalogTitle} numberOfLines={1}>
                {s.title}
              </Text>
              <Text style={styles.quickCatalogMatch}>{s.matchScore}% Match</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Rail 6: Apex Sports Ultra */}
        <SectionHeader
          title="Apex Sports Ultra"
          badge="4K 60FPS"
          onSeeAll={() => setSelectedCategory('Sports')}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.railScroll}
        >
          {sports.map((sp) => (
            <MoviePosterCard
              key={sp.id}
              item={sp}
              badgeType="4K"
              onPress={(item) => setSelectedItem(item)}
            />
          ))}
        </ScrollView>

        <View style={{ height: 24 }} />
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />

        {/* Cinematic Backdrop Layer with 7x3 Tilted Posters & Fog */}
        <NativeCinematicBackground />

        {/* Top Animated Header */}
        <AnimatedHeader
          isSearchActive={isSearchOpen}
          onSearchPress={() => setIsSearchOpen(!isSearchOpen)}
          onBrandPress={() => {
            setActiveTab('home');
            setSelectedCategory('All');
            setIsSearchOpen(false);
          }}
          onAvatarPress={() => {
            setActiveTab('account');
            setIsSearchOpen(false);
          }}
          activeTab={activeTab}
          onToggleMode={() => {
            setActiveTab(activeTab === 'landing' ? 'home' : 'landing');
          }}
        />

        {/* Category Filter Pills (Shown only during OTT Streaming mode) */}
        {!isSearchOpen && activeTab !== 'landing' && (
          <View style={styles.categoryBar}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.categoryPill, isSelected && styles.categoryPillActive]}
                    onPress={() => {
                      setSelectedCategory(cat);
                      if (cat === 'Live TV') setActiveTab('livetv');
                      else if (cat === 'Movies') setActiveTab('movies');
                      else setActiveTab('home');
                    }}
                  >
                    <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* Main Screen Body */}
        <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
          {renderMainContent()}
        </ScrollView>

      {/* 3D Cinematic Content Details Modal */}
      {selectedItem && (
        <Modal visible={!!selectedItem} transparent animationType="slide">
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setSelectedItem(null)}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>✕</Text>
              </TouchableOpacity>

              <Image source={{ uri: selectedItem.backdropUrl }} style={styles.modalCover} />
              <View style={styles.modalCoverGradient} />

              <View style={styles.modalBody}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <View style={styles.badgeRed}>
                    <Text style={styles.badgeRedText}>4K HDR</Text>
                  </View>
                  <Text style={{ color: '#FBBF24', fontWeight: 'bold' }}>
                    ★ {selectedItem.rating}
                  </Text>
                  <Text style={{ color: '#B3B3B3', fontSize: 12 }}>
                    {selectedItem.releaseYear} • {selectedItem.duration}
                  </Text>
                </View>

                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                <Text style={styles.modalSynopsis}>{selectedItem.synopsis}</Text>

                <View style={styles.modalMetaRow}>
                  <Text style={styles.modalMetaLabel}>Genres: </Text>
                  <Text style={styles.modalMetaValue}>
                    {selectedItem.genres.join(', ')}
                  </Text>
                </View>

                <View style={styles.modalButtonsRow}>
                  <TouchableOpacity
                    style={styles.modalPrimaryBtn}
                    onPress={() => {
                      const item = selectedItem;
                      setSelectedItem(null);
                      setPlayingItem(item);
                    }}
                  >
                    <Text style={styles.heroPrimaryButtonText}>▶ Play Now</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalFavBtn}
                    onPress={() => toggleFavorite(selectedItem.id)}
                  >
                    <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>
                      {favoriteIds.includes(selectedItem.id) ? '✓ In Watchlist' : '+ Watchlist'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Fullscreen Video Player Modal */}
      {playingItem && (
        <Modal visible={!!playingItem} transparent animationType="fade">
          <View style={styles.playerContainer}>
            {/* Player Header */}
            <View style={styles.playerHeader}>
              <TouchableOpacity
                onPress={() => setPlayingItem(null)}
                style={styles.playerCloseBtn}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>✕</Text>
              </TouchableOpacity>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={styles.playerTitle}>
                  {playingItem.title || playingItem.name}
                </Text>
                <Text style={styles.playerSub}>
                  4K Ultra HD • Dolby Atmos 5.1 • 60 FPS
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowTracksModal(!showTracksModal)}
                style={styles.playerCloseBtn}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 14 }}>⚙</Text>
              </TouchableOpacity>
            </View>

            {/* Simulated 4K Video Surface Backdrop */}
            <View style={styles.playerVideoSurface}>
              <Image
                source={{
                  uri:
                    playingItem.backdropUrl ||
                    playingItem.posterUrl ||
                    playingItem.logo,
                }}
                style={styles.playerVideoImage}
                resizeMode="cover"
              />
              <View style={styles.playerVideoDarkFade} />
            </View>

            {/* Player Center Transport Controls */}
            <View style={styles.playerCenterControls}>
              <TouchableOpacity
                onPress={() => setProgress(Math.max(0, progress - 10))}
                style={styles.playerSkipBtn}
              >
                <Text style={styles.playerSkipText}>⏪ 10s</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsPlaying(!isPlaying)}
                style={styles.playerBigPlayBtn}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 28 }}>
                  {isPlaying ? '⏸' : '▶'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setProgress(Math.min(100, progress + 10))}
                style={styles.playerSkipBtn}
              >
                <Text style={styles.playerSkipText}>⏩ 10s</Text>
              </TouchableOpacity>
            </View>

            {/* Audio & Subtitle Selector Tray */}
            {showTracksModal && (
              <View style={styles.tracksTray}>
                <Text style={styles.tracksTrayTitle}>Audio & Subtitles</Text>
                <View style={styles.tracksRow}>
                  <Text style={styles.tracksLabel}>Audio: </Text>
                  <Text style={styles.tracksVal}>{selectedAudio}</Text>
                </View>
                <View style={styles.tracksRow}>
                  <Text style={styles.tracksLabel}>Subtitles: </Text>
                  <Text style={styles.tracksVal}>{selectedSub}</Text>
                </View>
              </View>
            )}

            {/* Player Footer with Scrubber */}
            <View style={styles.playerFooter}>
              <View style={styles.playerScrubTrack}>
                <View
                  style={[styles.playerScrubFill, { width: `${progress}%` }]}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}
              >
                <Text style={styles.playerTimeText}>
                  {Math.floor(progress * 1.4)}:15
                </Text>
                <Text style={styles.playerTimeText}>
                  Remaining {100 - progress}:45 (4K)
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Animated 3D Bottom Navigation Dock */}
      <AnimatedBottomNavigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setIsSearchOpen(false);
          setActiveTab(tab);
          if (tab === 'home') setSelectedCategory('All');
        }}
      />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  // Splash Screen
  splashContainer: {
    flex: 1,
    backgroundColor: '#03050d',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  splashLogoBox: {
    width: 84,
    height: 84,
    borderRadius: 24,
    backgroundColor: '#800020',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#800020',
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 8,
  },
  splashLogoText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  splashBrandTitle: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 3,
    color: '#FFFFFF',
  },
  splashSubtitle: {
    fontSize: 11,
    letterSpacing: 4,
    color: '#FF6685',
    marginTop: 6,
    fontWeight: '700',
  },
  splashProgressBarTrack: {
    width: 160,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 40,
  },
  splashProgressBarFill: {
    width: '75%',
    height: '100%',
    backgroundColor: '#800020',
  },
  splashStatus: {
    fontSize: 10,
    color: '#A1A1AA',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginTop: 12,
  },

  // Category Bar
  categoryBar: {
    paddingVertical: 10,
    backgroundColor: 'rgba(7, 8, 11, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  categoryScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  categoryPillActive: {
    backgroundColor: 'rgba(128, 0, 32, 0.45)',
    borderColor: '#800020',
    shadowColor: '#800020',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#A1A1AA',
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  // Series 3D Deck Header
  seriesDeckHeaderBox: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
  seriesDeckTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  seriesDeckSubtitle: {
    color: '#8A8A8A',
    fontSize: 11,
    fontWeight: '600',
  },
  seriesDeckTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.3,
  },

  // Scroll Body
  scrollBody: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  railScroll: {
    paddingHorizontal: 16,
    paddingBottom: 6,
  },
  paddingSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },

  // Netflix-style Top 10 Today Rail
  top10Scroll: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  top10Item: {
    width: 140,
    height: 185,
    marginRight: 14,
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'relative',
  },
  top10RankText: {
    position: 'absolute',
    bottom: -10,
    left: -2,
    fontSize: 90,
    fontWeight: '900',
    color: '#07080B',
    textShadowColor: '#E50914',
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 2,
    zIndex: 2,
    letterSpacing: -4,
  },
  top10PosterBox: {
    width: 112,
    height: 168,
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: 28,
    backgroundColor: '#181A20',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },
  top10Poster: {
    width: '100%',
    height: '100%',
  },
  top10Badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#E50914',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  top10BadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  // Live Channel Spotlight
  liveChannelCard: {
    width: 140,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'rgba(12, 17, 33, 0.75)',
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },
  liveChannelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  liveChannelLogo: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#0a0f1d',
  },
  liveResBadge: {
    backgroundColor: 'rgba(128, 0, 32, 0.35)',
    borderWidth: 1,
    borderColor: '#800020',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  liveResBadgeText: {
    color: '#FF6685',
    fontSize: 9,
    fontWeight: '800',
  },
  liveChannelName: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  liveChannelProgram: {
    color: '#D4D4D8',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },

  // Quick Series Catalog
  quickCatalogItem: {
    width: 110,
    marginRight: 10,
  },
  quickCatalogPosterBox: {
    width: 110,
    height: 155,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#303030',
    position: 'relative',
  },
  quickCatalogPoster: {
    width: '100%',
    height: '100%',
  },
  quickCatalogBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(128, 0, 32, 0.5)',
    borderWidth: 1,
    borderColor: '#800020',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 3,
  },
  quickCatalogBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  quickCatalogTitle: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6,
  },
  quickCatalogMatch: {
    color: '#FF4D6D',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },

  // Search
  searchSection: {
    padding: 16,
  },
  searchInputBox: {
    height: 48,
    backgroundColor: '#151515',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#303030',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151515',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#262626',
    gap: 12,
  },
  searchThumb: {
    width: 60,
    height: 80,
    borderRadius: 6,
  },
  searchItemTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  searchItemMeta: {
    color: '#8A8A8A',
    fontSize: 11,
    marginTop: 4,
  },
  qualityBadge: {
    backgroundColor: '#262626',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 6,
  },
  qualityBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  playIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#800020',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#800020',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
  },

  // Live TV View
  liveHeroCard: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#12080C',
    borderWidth: 1,
    borderColor: 'rgba(128, 0, 32, 0.5)',
    shadowColor: '#800020',
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  liveHeroBg: {
    width: '100%',
    height: '100%',
    opacity: 0.45,
  },
  liveHeroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(7, 8, 11, 0.88)',
  },
  liveHeroTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 6,
  },
  liveHeroProgram: {
    color: '#D4D4D8',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 10,
  },
  liveHeroButton: {
    backgroundColor: '#800020',
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#990024',
    shadowColor: '#800020',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  badgeRed: {
    backgroundColor: 'rgba(128, 0, 32, 0.4)',
    borderWidth: 1,
    borderColor: '#800020',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  badgeRedText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 14, 18, 0.95)',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 3,
  },
  channelLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#0D0D0D',
  },
  channelNumber: {
    color: '#E50914',
    fontWeight: '800',
    fontSize: 12,
  },
  channelName: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  resBadge: {
    backgroundColor: '#2B2B2B',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 3,
  },
  resBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  channelProgram: {
    color: '#8A8A8A',
    fontSize: 11,
    marginTop: 3,
  },
  channelProgressBar: {
    height: 3,
    backgroundColor: '#262626',
    borderRadius: 1.5,
    marginTop: 6,
    overflow: 'hidden',
  },
  channelProgressFill: {
    height: '100%',
    backgroundColor: '#E50914',
  },
  channelPlayIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(128, 0, 32, 0.3)',
    borderWidth: 1,
    borderColor: '#800020',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Movies Grid
  moviesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  emptySub: {
    color: '#8A8A8A',
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 40,
  },

  // Account / Profile
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151515',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#262626',
    gap: 14,
  },
  profileAvatarBox: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E50914',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  profileAvatarText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  profileEmail: {
    color: '#8A8A8A',
    fontSize: 12,
    marginTop: 2,
  },
  profilePlanBadge: {
    backgroundColor: 'rgba(229, 9, 20, 0.2)',
    borderWidth: 1,
    borderColor: '#E50914',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  profilePlanText: {
    color: '#FF2B36',
    fontSize: 9,
    fontWeight: '800',
  },
  settingsSection: {
    backgroundColor: '#151515',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#262626',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 6,
  },
  settingsDesc: {
    color: '#8A8A8A',
    fontSize: 12,
    marginBottom: 14,
    lineHeight: 18,
  },
  pairingBox: {
    flexDirection: 'row',
    gap: 10,
  },
  pairingInput: {
    flex: 1,
    height: 44,
    backgroundColor: '#0D0D0D',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#383838',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 3,
    textAlign: 'center',
  },
  pairingButton: {
    backgroundColor: '#800020',
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#800020',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#990024',
  },
  pairingButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  successBox: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderWidth: 1,
    borderColor: '#22C55E',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  successText: {
    color: '#22C55E',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
  },
  settingLabel: {
    color: '#CCCCCC',
    fontSize: 13,
  },
  settingValue: {
    color: '#8A8A8A',
    fontSize: 13,
    fontWeight: '600',
  },

  // Content Details Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#151515',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    maxHeight: height * 0.85,
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCover: {
    width: '100%',
    height: 220,
  },
  modalCoverGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 220,
    backgroundColor: 'rgba(5, 5, 5, 0.35)',
  },
  modalBody: {
    padding: 20,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 8,
    marginBottom: 6,
  },
  modalSynopsis: {
    color: '#B3B3B3',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
  },
  modalMetaRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  modalMetaLabel: {
    color: '#8A8A8A',
    fontSize: 12,
    fontWeight: '600',
  },
  modalMetaValue: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  modalPrimaryBtn: {
    flex: 1,
    height: 44,
    backgroundColor: '#E50914',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E50914',
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 6,
  },
  modalFavBtn: {
    paddingHorizontal: 20,
    height: 44,
    backgroundColor: '#262626',
    borderWidth: 1,
    borderColor: '#383838',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPrimaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },

  // Fullscreen Video Player
  playerContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'space-between',
    paddingVertical: Platform.OS === 'ios' ? 44 : 20,
    paddingHorizontal: 20,
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  playerCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  playerSub: {
    color: '#8A8A8A',
    fontSize: 11,
    marginTop: 2,
  },
  playerVideoSurface: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  playerVideoImage: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  playerVideoDarkFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  playerCenterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 36,
    zIndex: 10,
  },
  playerSkipBtn: {
    padding: 10,
  },
  playerSkipText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  playerBigPlayBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E50914',
    shadowOpacity: 0.9,
    shadowRadius: 18,
    elevation: 10,
  },
  tracksTray: {
    backgroundColor: 'rgba(12, 17, 33, 0.95)',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 10,
  },
  tracksTrayTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
  },
  tracksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  tracksLabel: {
    color: '#94a3b8',
    fontSize: 12,
  },
  tracksVal: {
    color: '#E50914',
    fontSize: 12,
    fontWeight: '700',
  },
  playerFooter: {
    zIndex: 10,
  },
  playerScrubTrack: {
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 2.5,
    overflow: 'hidden',
  },
  playerScrubFill: {
    height: '100%',
    backgroundColor: '#E50914',
  },
  playerTimeText: {
    color: '#8A8A8A',
    fontSize: 12,
    fontWeight: '600',
  },

  // ─────────────────────────────────────────────────────────────
  // MOVIES TAB STYLES (MATCHING USER SCREENSHOT 1)
  // ─────────────────────────────────────────────────────────────
  moviesHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingTop: 4,
  },
  moviesHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  moviesHeaderSearchBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moviesHeroCard: {
    height: 250,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#120a14',
    borderWidth: 1,
    borderColor: 'rgba(139, 0, 0, 0.45)',
    shadowColor: '#8B0000',
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 8,
    marginBottom: 20,
  },
  moviesHeroBg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  moviesHeroOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 18,
    backgroundColor: 'rgba(5, 5, 8, 0.55)',
  },
  moviesHeroTag: {
    color: '#ff9999',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
  },
  moviesHeroTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.4,
    marginBottom: 14,
  },
  moviesHeroBtnsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  moviesPlayBtn: {
    backgroundColor: '#8B0000',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8B0000',
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 6,
  },
  moviesPlayBtnText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
  },
  moviesListBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moviesListBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  moviesSectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  moviesSectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  moviesSectionSeeAll: {
    color: '#8B0000',
    fontSize: 12,
    fontWeight: '800',
  },
  trendingCardsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  trendingCard: {
    flex: 1,
    height: 165,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 6,
  },
  trendingCardBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  trendingCardGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: 'rgba(5, 5, 8, 0.4)',
  },
  trendingCardTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 15,
  },
  trendingCardMeta: {
    color: '#a1a1aa',
    fontSize: 9,
    marginTop: 2,
    fontWeight: '700',
  },
  genrePill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  genrePillActive: {
    backgroundColor: '#8B0000',
    borderColor: '#8B0000',
    shadowColor: '#8B0000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
  },
  genrePillText: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '700',
  },
  genrePillTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  moviesGridHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // FRONT PAGE / HOME STYLES (MATCHING USER SCREENSHOT 2)
  // ─────────────────────────────────────────────────────────────
  homeWelcomeBox: {
    paddingHorizontal: 16,
    paddingTop: 10,
    marginBottom: 16,
  },
  homeWelcomeSub: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  homeWelcomeTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 28,
    letterSpacing: -0.4,
  },
  homeLiveCard: {
    marginHorizontal: 16,
    height: 230,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0c0d14',
    borderWidth: 1,
    borderColor: 'rgba(139, 0, 0, 0.4)',
    shadowColor: '#8B0000',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
    marginBottom: 14,
  },
  homeLiveBg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  homeLiveOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
    backgroundColor: 'rgba(5, 5, 8, 0.5)',
  },
  homeLiveBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  badgeLivePulse: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#8B0000',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  badgeLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  badgeLiveText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  badgeDarkPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeDarkText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  homeLiveSub: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  homeLiveTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 12,
  },
  homeLiveBtnsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  homeWatchNowBtn: {
    backgroundColor: '#8B0000',
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8B0000',
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 6,
  },
  homeWatchNowBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  homeAddBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeAddBtnText: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 22,
    fontWeight: '600',
  },
  homeTvBanner: {
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(139, 0, 0, 0.4)',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
    shadowColor: '#8B0000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  homeTvBannerIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#8B0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeTvBannerTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  homeTvBannerSub: {
    color: '#a1a1aa',
    fontSize: 11,
  },
  homeSectionHeaderRow: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  homeSectionTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
  homeSectionSeeAll: {
    color: '#8B0000',
    fontSize: 12,
    fontWeight: '800',
  },
  homeLiveCardsRow: {
    marginHorizontal: 16,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  homeLiveChannelCard: {
    flex: 1,
    height: 110,
    borderRadius: 14,
    padding: 10,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  homeChannelLiveDotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  homeChannelLiveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#8B0000',
  },
  homeChannelLiveTag: {
    color: '#ff8080',
    fontSize: 9,
    fontWeight: '900',
  },
  homeChannelName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  homeChannelProgram: {
    color: '#cbd5e1',
    fontSize: 9,
  },

  // ─────────────────────────────────────────────────────────────
  // HIGH-FIDELITY OTT STREAM FEED STYLES (#0A0A0A & #FF0D2E)
  // ─────────────────────────────────────────────────────────────
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryChipActive: {
    backgroundColor: 'rgba(255, 13, 46, 0.18)',
    borderColor: '#FF0D2E',
    shadowColor: '#FF0D2E',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
  },
  categoryChipText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '700',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },

  // Expansive Hero Blockbuster Movie Section: 'Interstellar'
  heroOuterWrapper: {
    paddingHorizontal: 16,
    marginBottom: 20,
    position: 'relative',
  },
  heroAmbientGlowBox: {
    position: 'absolute',
    top: 12,
    left: 20,
    right: 20,
    bottom: -6,
    borderRadius: 24,
    overflow: 'hidden',
    opacity: 0.3,
  },
  heroAmbientGlowImage: {
    width: '100%',
    height: '100%',
  },
  heroWideCard: {
    minHeight: 280,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#121214',
    borderWidth: 1,
    borderColor: 'rgba(255, 13, 46, 0.35)',
    shadowColor: '#FF0D2E',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  heroWideBg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroWideOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 18,
    backgroundColor: 'rgba(10, 10, 10, 0.55)',
  },
  heroTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  badgeNeonCrimson: {
    backgroundColor: '#FF0D2E',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    shadowColor: '#FF0D2E',
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 4,
  },
  badgeNeonCrimsonText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  badgeGlassDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  badgeGlassDarkText: {
    color: '#F3F4F6',
    fontSize: 9,
    fontWeight: '800',
  },
  badgeGlassNeon: {
    backgroundColor: 'rgba(255, 13, 46, 0.15)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 13, 46, 0.3)',
  },
  badgeGlassNeonText: {
    color: '#FF0D2E',
    fontSize: 9,
    fontWeight: '800',
  },
  heroBlockbusterTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  heroMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  heroRatingText: {
    color: '#FF0D2E',
    fontSize: 12,
    fontWeight: '900',
  },
  heroMetaDot: {
    color: '#6B7280',
    fontSize: 11,
  },
  heroMetaItem: {
    color: '#D1D5DB',
    fontSize: 11,
    fontWeight: '600',
  },
  heroSynopsis: {
    color: '#9CA3AF',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 14,
  },
  heroActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  heroNeonPlayBtn: {
    backgroundColor: '#FF0D2E',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF0D2E',
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 6,
  },
  heroNeonPlayBtnText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
  },
  heroWatchlistBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroWatchlistBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  heroInfoBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Horizontally Scrollable 'Top Rated Films' (2:3 Aspect Ratio)
  topRatedSectionHeader: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  topRatedPreTitle: {
    color: '#FF0D2E',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 2,
  },
  topRatedSectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
  },
  topRatedSeeAll: {
    color: '#FF0D2E',
    fontSize: 12,
    fontWeight: '800',
  },
  topRatedScroll: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 16,
  },
  topRatedCard: {
    width: 136,
  },
  topRatedPosterBox: {
    width: 136,
    height: 204, // 2:3 aspect ratio
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#161618',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 6,
  },
  topRatedPoster: {
    width: '100%',
    height: '100%',
  },
  topRatedQualityBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(10, 10, 10, 0.85)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 13, 46, 0.35)',
  },
  topRatedQualityText: {
    color: '#FF0D2E',
    fontSize: 8,
    fontWeight: '900',
  },
  topRatedRatingBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(10, 10, 10, 0.85)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  topRatedRatingText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  topRatedTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 2,
  },
  topRatedMeta: {
    color: '#6B7280',
    fontSize: 10,
    fontWeight: '600',
  },
});
