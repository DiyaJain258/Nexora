import React, { useState } from 'react';
import { MobileHeader } from './components/MobileHeader';
import { MobileBottomNav, MobileTab } from './components/MobileBottomNav';
import { LandingScreen } from './screens/LandingScreen';
import { HomeScreen } from './screens/HomeScreen';
import { LiveTvScreen } from './screens/LiveTvScreen';
import { CatalogScreen } from './screens/CatalogScreen';
import { SearchScreen } from './screens/SearchScreen';
import { MyListScreen } from './screens/MyListScreen';
import { ProfileSettingsScreen } from './screens/ProfileSettingsScreen';
import { SignInScreen } from './screens/SignInScreen';
import { CinematicBackground } from './components/CinematicBackground';
import { ContentDetailsModal } from './components/ContentDetailsModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { ContentItem, Channel } from '@nexora/shared';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MobileTab>('landing');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [playingItem, setPlayingItem] = useState<ContentItem | Channel | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['vod-01', 'vod-02']);

  const categories = ['All', 'Live TV', 'Movies', 'Series', 'Sports', 'Kids'];

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'All') setActiveTab('home');
    else if (cat === 'Live TV') setActiveTab('livetv');
    else if (cat === 'Movies') setActiveTab('movies');
  };

  const toggleFavorite = (item: ContentItem) => {
    if (favoriteIds.includes(item.id)) {
      setFavoriteIds(favoriteIds.filter((id) => id !== item.id));
    } else {
      setFavoriteIds([...favoriteIds, item.id]);
    }
  };

  const renderScreen = () => {
    if (isSearchOpen) {
      return (
        <SearchScreen
          onSelectItem={(item) => setSelectedItem(item)}
          onPlayChannel={(ch) => setPlayingItem(ch)}
        />
      );
    }

    if (activeCategory === 'Sports') {
      return (
        <CatalogScreen
          title="Live Sports & Championships"
          typeFilter="sports"
          onSelectItem={(item) => setSelectedItem(item)}
          onPlayItem={(item) => setPlayingItem(item)}
        />
      );
    }

    if (activeCategory === 'Kids') {
      return (
        <CatalogScreen
          title="Kids Wonderland & Animation"
          typeFilter="kids"
          onSelectItem={(item) => setSelectedItem(item)}
          onPlayItem={(item) => setPlayingItem(item)}
        />
      );
    }

    switch (activeTab) {
      case 'landing':
        return (
          <LandingScreen
            onOpenLiveDemo={(channel) => setPlayingItem(channel || null)}
            onOpenActivation={() => setActiveTab('profile')}
            onSwitchToStreaming={() => {
              setActiveTab('home');
              setActiveCategory('All');
            }}
          />
        );
      case 'home':
        return (
          <HomeScreen
            onSelectItem={(item) => setSelectedItem(item)}
            onSelectChannel={(ch) => setPlayingItem(ch)}
            onPlayItem={(item) => setPlayingItem(item)}
            favorites={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />
        );
      case 'livetv':
        return (
          <LiveTvScreen
            onPlayChannel={(ch) => setPlayingItem(ch)}
            favorites={favoriteIds}
            onToggleFavorite={(id) => {}}
          />
        );
      case 'movies':
        return (
          <CatalogScreen
            title="Movies & Blockbusters"
            typeFilter="movie"
            onSelectItem={(item) => setSelectedItem(item)}
            onPlayItem={(item) => setPlayingItem(item)}
          />
        );
      case 'mylist':
        return (
          <MyListScreen
            favoriteIds={favoriteIds}
            onSelectItem={(item) => setSelectedItem(item)}
            onRemoveFavorite={toggleFavorite}
          />
        );
      case 'profile':
        return isAuthenticated ? (
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setIsAuthenticated(false)}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255, 13, 46, 0.4)',
                  color: '#FF0D2E',
                  borderRadius: '999px',
                  padding: '5px 14px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Log Out to Sign In
              </button>
            </div>
            <ProfileSettingsScreen />
          </div>
        ) : (
          <SignInScreen
            onSuccessLogin={() => {
              setIsAuthenticated(true);
              setActiveTab('home');
            }}
            onOpenActivation={() => setActiveTab('landing')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div id="mobile-simulator-frame">
      {/* ── CINEMATIC POSTER BACKGROUND WALL (UNDERNEATH ALL CARDS) ── */}
      <CinematicBackground />

      {/* Top Mobile Status Header */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <MobileHeader
          onSearchClick={() => setIsSearchOpen(!isSearchOpen)}
          onProfileClick={() => {
            setIsSearchOpen(false);
            setActiveTab('profile');
          }}
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
          categories={categories}
          activeTab={activeTab}
          onToggleMode={(mode) => {
            setActiveTab(mode);
            if (mode === 'home') setActiveCategory('All');
          }}
        />
      </div>

      {/* Screen Body with Cards floating over the background */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 2 }}>
        {renderScreen()}

        {/* Content Details Overlay Modal */}
        <ContentDetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onPlay={(item) => {
            setSelectedItem(null);
            setPlayingItem(item);
          }}
          isFavorite={selectedItem ? favoriteIds.includes(selectedItem.id) : false}
          onToggleFavorite={toggleFavorite}
        />

        {/* Video Player Fullscreen Modal */}
        <VideoPlayerModal
          item={playingItem}
          onClose={() => setPlayingItem(null)}
        />
      </div>

      {/* Bottom Nav */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <MobileBottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            setIsSearchOpen(false);
            setActiveTab(tab);
            if (tab === 'home') setActiveCategory('All');
            else if (tab === 'livetv') setActiveCategory('Live TV');
            else if (tab === 'movies') setActiveCategory('Movies');
          }}
        />
      </div>
    </div>
  );
};

export default App;
