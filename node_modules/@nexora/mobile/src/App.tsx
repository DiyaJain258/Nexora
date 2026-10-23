import React, { useState } from 'react';
import { MobileHeader } from './components/MobileHeader';
import { MobileBottomNav, MobileTab } from './components/MobileBottomNav';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';
import { LiveTvScreen } from './screens/LiveTvScreen';
import { CatalogScreen } from './screens/CatalogScreen';
import { SearchScreen } from './screens/SearchScreen';
import { MyListScreen } from './screens/MyListScreen';
import { ProfileSettingsScreen } from './screens/ProfileSettingsScreen';
import { ContentDetailsModal } from './components/ContentDetailsModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { ContentItem, Channel } from '@nexora/shared';

export const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<MobileTab>('home');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

    if (activeCategory === 'Series') {
      return (
        <CatalogScreen
          title="Binge-Worthy TV Series"
          typeFilter="series"
          onSelectItem={(item) => setSelectedItem(item)}
          onPlayItem={(item) => setPlayingItem(item)}
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
        return <ProfileSettingsScreen />;
      default:
        return null;
    }
  };

  return (
    <div id="mobile-simulator-frame">
      {/* Animated Splash Screen */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Top Mobile Status Header */}
      <MobileHeader
        onSearchClick={() => setIsSearchOpen(!isSearchOpen)}
        onProfileClick={() => {
          setIsSearchOpen(false);
          setActiveTab('profile');
        }}
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
        categories={categories}
      />

      {/* Screen Body */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
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
  );
};

export default App;
