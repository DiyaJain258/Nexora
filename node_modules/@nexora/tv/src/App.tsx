import React, { useState } from 'react';
import { TvSidebarDock, TvTab } from './components/TvSidebarDock';
import { TvRemoteControl } from './components/TvRemoteControl';
import { TvHomeView } from './views/TvHomeView';
import { TvEpgGridView } from './views/TvEpgGridView';
import { TvPlayerView } from './views/TvPlayerView';
import { Channel, ContentItem, MOCK_CHANNELS, MOCK_CONTENT } from '@nexora/shared';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TvTab>('home');
  const [isDockFocused, setIsDockFocused] = useState(false);
  const [focusedMenuIndex, setFocusedMenuIndex] = useState(0);

  // Focus coordinates on Home Screen
  const [focusedRailIndex, setFocusedRailIndex] = useState(1); // 0: continue, 1: live channels, 2: movies
  const [focusedItemIndex, setFocusedItemIndex] = useState(0);

  // EPG focus coordinates
  const [focusedChannelIndex, setFocusedChannelIndex] = useState(0);
  const [focusedProgramIndex, setFocusedProgramIndex] = useState(0);

  // Player state
  const [playingItem, setPlayingItem] = useState<Channel | ContentItem | null>(null);

  const menuKeys: TvTab[] = ['home', 'epg', 'movies', 'series', 'sports', 'kids', 'search', 'settings'];

  // Handle D-Pad Directions from Remote or Keyboard
  const handleDirection = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (playingItem) return;

    if (isDockFocused) {
      if (direction === 'up') {
        setFocusedMenuIndex((prev) => Math.max(0, prev - 1));
      } else if (direction === 'down') {
        setFocusedMenuIndex((prev) => Math.min(menuKeys.length - 1, prev + 1));
      } else if (direction === 'right') {
        setIsDockFocused(false);
      }
      return;
    }

    if (activeTab === 'home') {
      if (direction === 'left') {
        if (focusedItemIndex > 0) {
          setFocusedItemIndex(focusedItemIndex - 1);
        } else {
          setIsDockFocused(true);
        }
      } else if (direction === 'right') {
        setFocusedItemIndex(focusedItemIndex + 1);
      } else if (direction === 'up') {
        setFocusedRailIndex((prev) => Math.max(0, prev - 1));
        setFocusedItemIndex(0);
      } else if (direction === 'down') {
        setFocusedRailIndex((prev) => Math.min(2, prev + 1));
        setFocusedItemIndex(0);
      }
    } else if (activeTab === 'epg') {
      if (direction === 'left') {
        if (focusedProgramIndex > 0) {
          setFocusedProgramIndex(focusedProgramIndex - 1);
        } else {
          setIsDockFocused(true);
        }
      } else if (direction === 'right') {
        setFocusedProgramIndex(Math.min(1, focusedProgramIndex + 1));
      } else if (direction === 'up') {
        setFocusedChannelIndex((prev) => Math.max(0, prev - 1));
      } else if (direction === 'down') {
        setFocusedChannelIndex((prev) => Math.min(MOCK_CHANNELS.length - 1, prev + 1));
      }
    }
  };

  const handleSelect = () => {
    if (isDockFocused) {
      const selected = menuKeys[focusedMenuIndex];
      setActiveTab(selected);
      setIsDockFocused(false);
      return;
    }

    if (activeTab === 'home') {
      if (focusedRailIndex === 1) {
        setPlayingItem(MOCK_CHANNELS[focusedItemIndex] || MOCK_CHANNELS[0]);
      } else if (focusedRailIndex === 0) {
        setPlayingItem(MOCK_CONTENT[0]);
      } else {
        setPlayingItem(MOCK_CONTENT[focusedItemIndex] || MOCK_CONTENT[0]);
      }
    } else if (activeTab === 'epg') {
      setPlayingItem(MOCK_CHANNELS[focusedChannelIndex]);
    }
  };

  const handleBack = () => {
    if (playingItem) {
      setPlayingItem(null);
      return;
    }
    if (!isDockFocused) {
      setIsDockFocused(true);
    }
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#070912', overflow: 'hidden' }}>
      {/* 10-Foot Collapsible Side Dock */}
      <TvSidebarDock
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setIsDockFocused(false);
        }}
        isDockFocused={isDockFocused}
        focusedMenuIndex={focusedMenuIndex}
      />

      {/* Main TV Screen Content */}
      <div style={{
        marginLeft: isDockFocused ? '240px' : '76px',
        flex: 1,
        height: '100vh',
        overflowY: 'auto',
        transition: 'margin-left 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {activeTab === 'home' && (
          <TvHomeView
            focusedRailIndex={focusedRailIndex}
            focusedItemIndex={focusedItemIndex}
            onPlayItem={(item) => setPlayingItem(item)}
            onOpenDetails={(item) => setPlayingItem(item)}
            onTuneChannel={(ch) => setPlayingItem(ch)}
          />
        )}

        {activeTab === 'epg' && (
          <TvEpgGridView
            focusedChannelIndex={focusedChannelIndex}
            focusedProgramIndex={focusedProgramIndex}
            onTuneChannel={(ch) => setPlayingItem(ch)}
          />
        )}

        {(activeTab === 'movies' || activeTab === 'series' || activeTab === 'sports' || activeTab === 'kids' || activeTab === 'search' || activeTab === 'settings') && (
          <div style={{ padding: '48px', color: '#F8FAFC' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 900, textTransform: 'capitalize' }}>{activeTab} 10-Foot Showcase</h1>
            <p style={{ color: '#94A3B8', fontSize: '16px' }}>
              Full remote-navigated grid optimized for Android TV and Google TV Leanback UI.
            </p>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '32px' }}>
              {MOCK_CONTENT.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setPlayingItem(item)}
                  className="tv-focused"
                  style={{
                    width: '200px',
                    height: '280px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    backgroundColor: '#111827',
                    border: '1px solid #1E293B',
                    cursor: 'pointer',
                  }}
                >
                  <img src={item.posterUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Video Player */}
      {playingItem && (
        <TvPlayerView
          item={playingItem}
          onClose={() => setPlayingItem(null)}
          onSwitchChannel={(ch) => setPlayingItem(ch)}
        />
      )}

      {/* On-screen TV Remote Control Simulator */}
      <TvRemoteControl
        onDirection={handleDirection}
        onSelect={handleSelect}
        onBack={handleBack}
        onHome={() => {
          setActiveTab('home');
          setIsDockFocused(false);
          setPlayingItem(null);
        }}
        onTogglePlay={() => {}}
        onToggleInfo={() => {}}
      />
    </div>
  );
};

export default App;
