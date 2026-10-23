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

const { width, height } = Dimensions.get('window');

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<BottomTabType>('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
      return (
        <View style={styles.paddingSection}>
          <SectionHeader
            title={`All Titles (${MOCK_CONTENT.length})`}
            badge="CATALOG"
          />
          <View style={styles.moviesGrid}>
            {MOCK_CONTENT.map((m) => (
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
        <View style={styles.paddingSection}>
          {/* User Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileAvatarBox}>
              <Text style={styles.profileAvatarText}>D</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.profileName}>{MOCK_USERS[0].name}</Text>
              <Text style={styles.profileEmail}>{MOCK_USERS[0].email}</Text>
              <View style={styles.profilePlanBadge}>
                <Text style={styles.profilePlanText}>PREMIUM 4K ULTRA</Text>
              </View>
            </View>
          </View>

          {/* Android / Google TV Device Activation */}
          <View style={styles.settingsSection}>
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

          {/* Settings Options */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>App Preferences</Text>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Streaming Quality</Text>
              <Text style={styles.settingValue}>Auto (Up to 4K HDR)</Text>
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Audio Passthrough</Text>
              <Text style={styles.settingValue}>Dolby Atmos (Enabled)</Text>
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>App Version</Text>
              <Text style={styles.settingValue}>v1.0.0 (Expo SDK 57)</Text>
            </View>
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
      <View>
        {/* Auto-Animated 3D Featured Carousel */}
        <FeaturedContentCarousel
          items={MOCK_CONTENT}
          onPlay={(item) => setPlayingItem(item)}
          onDetails={(item) => setSelectedItem(item)}
          onToggleFavorite={toggleFavorite}
          favoriteIds={favoriteIds}
        />

        {/* Rail 1: Continue Watching with 3D Depth */}
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

        {/* Rail 2: Live TV Channels Spotlight (Matches Web HomeScreen Rail!) */}
        <SectionHeader
          title="Live TV Channels"
          badge="EPG ACTIVE"
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
              activeOpacity={0.85}
              style={styles.liveChannelCard}
              onPress={() => setPlayingItem(ch)}
            >
              <View style={styles.liveChannelHeader}>
                <Image source={{ uri: ch.logo }} style={styles.liveChannelLogo} />
                <View style={styles.liveResBadge}>
                  <Text style={styles.liveResBadgeText}>{ch.resolution}</Text>
                </View>
              </View>
              <Text style={styles.liveChannelName} numberOfLines={1}>
                {ch.name}
              </Text>
              <Text style={styles.liveChannelProgram} numberOfLines={1}>
                {ch.currentProgram?.title || 'Continuous Stream'}
              </Text>
            </TouchableOpacity>
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
        />

        {/* Category Filter Pills (Hidden during search) */}
        {!isSearchOpen && (
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
    backgroundColor: '#050505',
  },
  // Splash Screen
  splashContainer: {
    flex: 1,
    backgroundColor: '#050505',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  splashLogoBox: {
    width: 84,
    height: 84,
    borderRadius: 24,
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#E50914',
    shadowOpacity: 0.8,
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
    color: '#B3B3B3',
    marginTop: 6,
    fontWeight: '600',
  },
  splashProgressBarTrack: {
    width: 160,
    height: 4,
    backgroundColor: '#151515',
    borderColor: '#303030',
    borderWidth: 1,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 40,
  },
  splashProgressBarFill: {
    width: '75%',
    height: '100%',
    backgroundColor: '#E50914',
  },
  splashStatus: {
    fontSize: 10,
    color: '#737373',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginTop: 12,
  },

  // Category Bar
  categoryBar: {
    paddingVertical: 10,
    backgroundColor: '#050505',
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  categoryScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#303030',
  },
  categoryPillActive: {
    backgroundColor: '#E50914',
    borderColor: '#E50914',
    shadowColor: '#E50914',
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#B3B3B3',
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
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
    backgroundColor: '#050505',
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

  // Live Channel Spotlight
  liveChannelCard: {
    width: 140,
    borderRadius: 10,
    backgroundColor: '#151515',
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#303030',
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
    borderRadius: 6,
    backgroundColor: '#0D0D0D',
  },
  liveResBadge: {
    backgroundColor: 'rgba(229, 9, 20, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(229, 9, 20, 0.4)',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  liveResBadgeText: {
    color: '#FF2B36',
    fontSize: 9,
    fontWeight: '800',
  },
  liveChannelName: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  liveChannelProgram: {
    color: '#FF2B36',
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
    backgroundColor: '#E50914',
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
    color: '#FF2B36',
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
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E50914',
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 4,
  },

  // Live TV View
  liveHeroCard: {
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#262626',
  },
  liveHeroBg: {
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  liveHeroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(5, 5, 5, 0.8)',
  },
  liveHeroTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 6,
  },
  liveHeroProgram: {
    color: '#B3B3B3',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 10,
  },
  liveHeroButton: {
    backgroundColor: '#E50914',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeRed: {
    backgroundColor: '#E50914',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  badgeRedText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151515',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#262626',
    gap: 12,
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
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#262626',
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
    backgroundColor: '#E50914',
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: 'rgba(21, 21, 21, 0.92)',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#383838',
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
    color: '#8A8A8A',
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
    backgroundColor: '#303030',
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
});
