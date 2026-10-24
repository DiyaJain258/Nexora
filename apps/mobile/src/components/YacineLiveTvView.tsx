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
import { ShineBorder } from './ShineBorder';

const { width } = Dimensions.get('window');

// Top category channels matching Image 1
const LIVE_CHANNELS = [
  {
    id: 'ch-cat-01',
    name: 'Sports',
    channelNo: 'Channel 01',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300&auto=format&fit=crop&q=80',
    category: 'Sports',
  },
  {
    id: 'ch-cat-02',
    name: 'News',
    channelNo: 'Channel 02',
    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=300&auto=format&fit=crop&q=80',
    category: 'News',
  },
  {
    id: 'ch-cat-03',
    name: 'Entertainment',
    channelNo: 'Channel 03',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300&auto=format&fit=crop&q=80',
    category: 'Entertainment',
  },
  {
    id: 'ch-cat-04',
    name: 'General',
    channelNo: 'Channel 04',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&auto=format&fit=crop&q=80',
    category: 'General',
  },
];

// Sports live feeds matching Image 1
const SPORTS_FEEDS = [
  {
    id: 'sp-live-01',
    title: 'Football Live',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&auto=format&fit=crop&q=80',
    match: 'UEFA Champions: Real Madrid vs Bayern',
  },
  {
    id: 'sp-live-02',
    title: 'Basketball Live',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&auto=format&fit=crop&q=80',
    match: 'NBA Finals: Lakers vs Celtics',
  },
  {
    id: 'sp-live-03',
    title: 'Tennis Live',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&auto=format&fit=crop&q=80',
    match: 'Wimbledon Grand Slam Championship',
  },
  {
    id: 'sp-live-04',
    title: 'Cricket Live',
    image: 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?w=400&auto=format&fit=crop&q=80',
    match: 'T20 World Cup Final Live 4K',
  },
];

// News live feeds matching Image 1
const NEWS_FEEDS = [
  {
    id: 'news-live-01',
    title: 'World News',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=80',
    match: 'Global Summit & Geopolitics 24/7',
  },
  {
    id: 'news-live-02',
    title: 'Business News',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=80',
    match: 'Market Wall Street & Crypto Pulse',
  },
  {
    id: 'news-live-03',
    title: 'Local News',
    image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=400&auto=format&fit=crop&q=80',
    match: 'Regional Weather & Breaking Bulletins',
  },
];

// Entertainment live feeds matching Image 1
const ENTERTAINMENT_FEEDS = [
  {
    id: 'ent-live-01',
    title: 'Movies',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=80',
    match: '24/7 Hollywood 4K Premieres',
  },
  {
    id: 'ent-live-02',
    title: 'TV Shows',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&auto=format&fit=crop&q=80',
    match: 'Prime Time Drama Marathon',
  },
  {
    id: 'ent-live-03',
    title: 'Music',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80',
    match: 'Live Festival Concerts Dolby Atmos',
  },
];

interface YacineLiveTvViewProps {
  onPlayChannel: (channelOrItem: any) => void;
  onSearchPress?: () => void;
  onMenuPress?: () => void;
}

export const YacineLiveTvView: React.FC<YacineLiveTvViewProps> = ({
  onPlayChannel,
  onSearchPress,
  onMenuPress,
}) => {
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  return (
    <View style={styles.container}>
      {/* Top Header matching Image 1 */}
      <View style={styles.header}>
        {/* Left Hamburger Menu */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onMenuPress}
          style={styles.headerIconButton}
        >
          <Text style={styles.hamburgerIcon}>☰</Text>
        </TouchableOpacity>

        {/* Center Brand Logo: NEXORA with Red TV Badge */}
        <View style={styles.brandRow}>
          <Text style={styles.brandTitle}>NEXORA</Text>
          <View style={styles.tvBadge}>
            <Text style={styles.tvBadgeText}>TV</Text>
          </View>
        </View>

        {/* Right Search Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onSearchPress}
          style={styles.headerIconButton}
        >
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollBody}
      >
        {/* Sweeping Red Accent Curve Banner on Top */}
        <View style={styles.sweepingRedAccent} />

        {/* Hero Billboard Banner matching Image 1 */}
        <TouchableOpacity
          activeOpacity={0.92}
          onPress={() => onPlayChannel(SPORTS_FEEDS[0])}
          style={styles.heroBannerContainer}
        >
          <View style={styles.heroCard}>
            {/* Background Stadium & Football Image */}
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=85',
              }}
              style={styles.heroImage}
              resizeMode="cover"
            />

            {/* Dark Gradient Overlay */}
            <View style={styles.heroGradient} />

            {/* Top Right Live Pill */}
            <View style={styles.heroLivePill}>
              <Text style={styles.heroLivePillText}>((•)) LIVE</Text>
            </View>

            {/* Left Content Overlay */}
            <View style={styles.heroTextOverlay}>
              <View style={styles.heroTitleRow}>
                <View style={styles.heroDot} />
                <Text style={styles.heroTitle}>LIVE TV</Text>
              </View>
              <Text style={styles.heroSubtitle}>
                Watch Your Favorite Channels{'\n'}Live Anytime, Anywhere
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Hero Pagination Dots */}
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Section 1: Live Channels (Square cards with red bottom line) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Live Channels</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>See All ›</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.channelsScroll}
        >
          {LIVE_CHANNELS.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.88}
              onPress={() => onPlayChannel(item)}
              style={styles.channelCard}
            >
              {/* Thumbnail Container */}
              <View style={styles.channelThumbBox}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.channelThumb}
                  resizeMode="cover"
                />
                <View style={styles.liveTagBadge}>
                  <Text style={styles.liveTagText}>LIVE</Text>
                </View>
              </View>

              {/* Title & Channel No */}
              <View style={styles.channelInfoBox}>
                <Text style={styles.channelName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.channelNumber}>{item.channelNo}</Text>
                {/* Red bottom accent line matching Image 1 */}
                <View style={styles.redUnderline} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section 2: Sports Rail matching Image 1 */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWithIcon}>
            <Text style={styles.sectionIcon}>⚽</Text>
            <Text style={styles.sectionTitle}>Sports</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>See All ›</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.landscapeScroll}
        >
          {SPORTS_FEEDS.map((feed) => (
            <TouchableOpacity
              key={feed.id}
              activeOpacity={0.88}
              onPress={() => onPlayChannel(feed)}
              style={styles.landscapeCard}
            >
              <Image
                source={{ uri: feed.image }}
                style={styles.landscapeImage}
                resizeMode="cover"
              />
              <View style={styles.landscapeDarkFade} />

              <View style={styles.landscapeLiveBadge}>
                <Text style={styles.liveTagText}>LIVE</Text>
              </View>

              <Text style={styles.landscapeTitle} numberOfLines={1}>
                {feed.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section 3: News Rail matching Image 1 */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWithIcon}>
            <Text style={styles.sectionIcon}>📰</Text>
            <Text style={styles.sectionTitle}>News</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>See All ›</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.landscapeScroll}
        >
          {NEWS_FEEDS.map((feed) => (
            <TouchableOpacity
              key={feed.id}
              activeOpacity={0.88}
              onPress={() => onPlayChannel(feed)}
              style={styles.landscapeCard}
            >
              <Image
                source={{ uri: feed.image }}
                style={styles.landscapeImage}
                resizeMode="cover"
              />
              <View style={styles.landscapeDarkFade} />

              <View style={styles.landscapeLiveBadge}>
                <Text style={styles.liveTagText}>LIVE</Text>
              </View>

              <Text style={styles.landscapeTitle} numberOfLines={1}>
                {feed.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section 4: Entertainment Rail matching Image 1 */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWithIcon}>
            <Text style={[styles.sectionIcon, { color: '#E50914' }]}>⭐</Text>
            <Text style={styles.sectionTitle}>Entertainment</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>See All ›</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.landscapeScroll}
        >
          {ENTERTAINMENT_FEEDS.map((feed) => (
            <TouchableOpacity
              key={feed.id}
              activeOpacity={0.88}
              onPress={() => onPlayChannel(feed)}
              style={styles.landscapeCard}
            >
              <Image
                source={{ uri: feed.image }}
                style={styles.landscapeImage}
                resizeMode="cover"
              />
              <View style={styles.landscapeDarkFade} />

              <View style={styles.landscapeLiveBadge}>
                <Text style={styles.liveTagText}>LIVE</Text>
              </View>

              <Text style={styles.landscapeTitle} numberOfLines={1}>
                {feed.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07080B',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 12 : 16,
    paddingBottom: 12,
    backgroundColor: '#07080B',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    zIndex: 10,
  },
  headerIconButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hamburgerIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  searchIcon: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  tvBadge: {
    backgroundColor: '#E50914',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  tvBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  scrollBody: {
    paddingBottom: 32,
  },
  sweepingRedAccent: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    height: 40,
    borderTopWidth: 2,
    borderTopColor: '#E50914',
    opacity: 0.35,
    borderRadius: 20,
  },
  heroBannerContainer: {
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#12141C',
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 8,
  },
  heroCard: {
    width: '100%',
    height: 180,
    position: 'relative',
    justifyContent: 'flex-end',
    borderRadius: 14,
    overflow: 'hidden',
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(7, 8, 11, 0.45)',
  },
  heroLivePill: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: '#E50914',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  heroLivePillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  heroTextOverlay: {
    padding: 16,
    zIndex: 10,
  },
  heroTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  heroDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E50914',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  heroSubtitle: {
    color: '#D1D5DB',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
    marginBottom: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4B5563',
  },
  dotActive: {
    backgroundColor: '#E50914',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionIcon: {
    fontSize: 18,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  seeAllText: {
    color: '#E50914',
    fontSize: 13,
    fontWeight: '700',
  },
  channelsScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  channelCard: {
    width: 105,
    backgroundColor: '#151720',
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
  },
  channelThumbBox: {
    width: '100%',
    height: 85,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1E2230',
  },
  channelThumb: {
    width: '100%',
    height: '100%',
  },
  liveTagBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#E50914',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  liveTagText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '900',
  },
  channelInfoBox: {
    marginTop: 8,
    alignItems: 'flex-start',
  },
  channelName: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
  },
  channelNumber: {
    color: '#9CA3AF',
    fontSize: 10.5,
    marginTop: 2,
  },
  redUnderline: {
    width: 28,
    height: 2.5,
    backgroundColor: '#E50914',
    borderRadius: 2,
    marginTop: 6,
  },
  landscapeScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  landscapeCard: {
    width: 145,
    height: 85,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#151720',
    justifyContent: 'flex-end',
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  landscapeImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  landscapeDarkFade: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.42)',
  },
  landscapeLiveBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#E50914',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  landscapeTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    zIndex: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
