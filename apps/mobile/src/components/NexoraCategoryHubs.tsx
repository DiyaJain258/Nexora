import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SectionHeader } from './SectionHeader';
import { ShineBorder } from './ShineBorder';

const { width } = Dimensions.get('window');

interface CategoryHubProps {
  onPlay: (item: any) => void;
  onDetails: (item: any) => void;
}

// 1. DRAMA HUB VIEW (K-Dramas, Romance, Crime, Period Epics)
export const NexoraDramaHubView: React.FC<CategoryHubProps> = ({ onPlay, onDetails }) => {
  const cardWidth = (width - 48) / 3;
  const cardHeight = cardWidth * 1.5;

  const dramaHero = {
    id: 'drama-hero',
    title: 'The Autumn Vow',
    rating: '9.7',
    genre: 'K-Drama • Romance • Drama',
    desc: 'An intense, emotionally gripping story of love, betrayal, and redemption spanning two elite families across Seoul and Jeju.',
    uri: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=85',
  };

  const kdramas = [
    { id: 'kd-1', title: 'Winter Blossom', rating: '9.6', uri: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=85' },
    { id: 'kd-2', title: 'Echoes of Love', rating: '9.4', uri: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=85' },
    { id: 'kd-3', title: 'The Silent Empress', rating: '9.5', uri: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=85' },
    { id: 'kd-4', title: 'Seoul Nights', rating: '9.2', uri: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=85' },
  ];

  const crimeDramas = [
    { id: 'cd-1', title: 'Undercover Crime', rating: '9.3', uri: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=85' },
    { id: 'cd-2', title: 'The Blacklist Case', rating: '9.1', uri: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&auto=format&fit=crop&q=85' },
    { id: 'cd-3', title: 'District 9 Police', rating: '9.0', uri: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=85' },
  ];

  return (
    <ScrollView style={styles.hubContainer} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Featured Drama Hero */}
      <View style={styles.hubHeroBox}>
        <Image source={{ uri: dramaHero.uri }} style={styles.hubHeroImg} resizeMode="cover" />
        <View style={styles.heroDarkGrad} />
        <View style={styles.heroContentBox}>
          <Text style={styles.heroTag}>★ TOP RATED DRAMA SERIES</Text>
          <Text style={styles.heroTitleText}>{dramaHero.title}</Text>
          <Text style={styles.heroMetaText}>{dramaHero.genre} • ★ {dramaHero.rating}</Text>
          <View style={styles.heroBtnRow}>
            <TouchableOpacity style={styles.whitePlayBtn} onPress={() => onPlay(dramaHero)}>
              <Text style={styles.whitePlayBtnText}>▶ Play Episode 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.glassListBtn} onPress={() => onDetails(dramaHero)}>
              <Text style={styles.glassListBtnText}>+ Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Trending K-Dramas Rail */}
      <View style={styles.sectionMargin}>
        <SectionHeader title="Trending K-Dramas & Romances" badge="POPULAR" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.railRow}>
          {kdramas.map((item) => (
            <TouchableOpacity key={item.id} style={[styles.cardItem, { width: cardWidth }]} onPress={() => onDetails(item)}>
              <View style={[styles.cardImgBox, { height: cardHeight }]}>
                <Image source={{ uri: item.uri }} style={styles.fullImg} resizeMode="cover" />
                <View style={styles.badgeRating}><Text style={styles.ratingText}>★ {item.rating}</Text></View>
              </View>
              <Text style={styles.cardTitleText} numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Gripping Crime & Thriller Dramas */}
      <View style={styles.sectionMargin}>
        <SectionHeader title="Gripping Crime & Investigation Dramas" badge="THRILLER" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.railRow}>
          {crimeDramas.map((item) => (
            <TouchableOpacity key={item.id} style={[styles.cardItem, { width: cardWidth }]} onPress={() => onDetails(item)}>
              <View style={[styles.cardImgBox, { height: cardHeight }]}>
                <Image source={{ uri: item.uri }} style={styles.fullImg} resizeMode="cover" />
                <View style={styles.badgeRating}><Text style={styles.ratingText}>★ {item.rating}</Text></View>
              </View>
              <Text style={styles.cardTitleText} numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

// 2. WEBSERIES HUB VIEW (Originals, Mini-Series, Dark Fiction)
export const NexoraWebseriesHubView: React.FC<CategoryHubProps> = ({ onPlay, onDetails }) => {
  const cardWidth = (width - 48) / 3;
  const cardHeight = cardWidth * 1.5;

  const webseriesHero = {
    id: 'web-hero',
    title: 'NEXORA: THE SYNDICATE',
    rating: '9.8',
    genre: 'NEXORA ORIGINAL • Cyberpunk • Thriller',
    uri: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=85',
  };

  const originals = [
    { id: 'wo-1', title: 'Mirage City', rating: '9.5', uri: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=400&auto=format&fit=crop&q=85' },
    { id: 'wo-2', title: 'Dark Dynasty', rating: '9.4', uri: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=85' },
    { id: 'wo-3', title: 'Neon Shadows', rating: '9.3', uri: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=85' },
  ];

  return (
    <ScrollView style={styles.hubContainer} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Featured Webseries Hero */}
      <View style={styles.hubHeroBox}>
        <Image source={{ uri: webseriesHero.uri }} style={styles.hubHeroImg} resizeMode="cover" />
        <View style={styles.heroDarkGrad} />
        <View style={styles.heroContentBox}>
          <Text style={styles.heroTag}>★ EXCLUSIVE WEBSERIES ORIGINAL</Text>
          <Text style={styles.heroTitleText}>{webseriesHero.title}</Text>
          <Text style={styles.heroMetaText}>{webseriesHero.genre} • ★ {webseriesHero.rating}</Text>
          <View style={styles.heroBtnRow}>
            <TouchableOpacity style={styles.whitePlayBtn} onPress={() => onPlay(webseriesHero)}>
              <Text style={styles.whitePlayBtnText}>▶ Stream Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.glassListBtn} onPress={() => onDetails(webseriesHero)}>
              <Text style={styles.glassListBtnText}>+ Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Nexora Originals Rail */}
      <View style={styles.sectionMargin}>
        <SectionHeader title="Exclusive Binge-Worthy Webseries" badge="ORIGINALS" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.railRow}>
          {originals.map((item) => (
            <TouchableOpacity key={item.id} style={[styles.cardItem, { width: cardWidth }]} onPress={() => onDetails(item)}>
              <View style={[styles.cardImgBox, { height: cardHeight }]}>
                <Image source={{ uri: item.uri }} style={styles.fullImg} resizeMode="cover" />
                <View style={styles.badgeRating}><Text style={styles.ratingText}>★ {item.rating}</Text></View>
              </View>
              <Text style={styles.cardTitleText} numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

// 3. KIDS & ANIMATION HUB VIEW
export const NexoraKidsHubView: React.FC<CategoryHubProps> = ({ onPlay, onDetails }) => {
  const cardWidth = (width - 48) / 3;
  const cardHeight = cardWidth * 1.5;

  const kidsList = [
    { id: 'kid-1', title: 'ToonVerse Galaxy', rating: '9.2', uri: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=85' },
    { id: 'kid-2', title: 'Adventures of Simba', rating: '9.5', uri: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=85' },
    { id: 'kid-3', title: 'Dragon Kingdom', rating: '9.0', uri: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=85' },
  ];

  return (
    <ScrollView style={styles.hubContainer} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.sectionMargin}>
        <SectionHeader title="Kids & Family Spotlight" badge="ALL AGES" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.railRow}>
          {kidsList.map((item) => (
            <TouchableOpacity key={item.id} style={[styles.cardItem, { width: cardWidth }]} onPress={() => onDetails(item)}>
              <View style={[styles.cardImgBox, { height: cardHeight }]}>
                <Image source={{ uri: item.uri }} style={styles.fullImg} resizeMode="cover" />
                <View style={styles.badgeRating}><Text style={styles.ratingText}>★ {item.rating}</Text></View>
              </View>
              <Text style={styles.cardTitleText} numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  hubContainer: {
    flex: 1,
    backgroundColor: '#07080B',
  },
  hubHeroBox: {
    width: width - 32,
    height: 380,
    marginHorizontal: 16,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
    backgroundColor: '#12121A',
  },
  hubHeroImg: {
    width: '100%',
    height: '100%',
  },
  heroDarkGrad: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 220,
    backgroundColor: 'rgba(7, 8, 11, 0.9)',
  },
  heroContentBox: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    alignItems: 'center',
  },
  heroTag: {
    color: '#E50914',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  heroTitleText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 4,
  },
  heroMetaText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 14,
  },
  heroBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  whitePlayBtn: {
    flex: 1,
    height: 42,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whitePlayBtnText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '800',
  },
  glassListBtn: {
    flex: 1,
    height: 42,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassListBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionMargin: {
    marginBottom: 24,
  },
  railRow: {
    paddingHorizontal: 16,
    gap: 12,
  },
  cardItem: {
    gap: 6,
  },
  cardImgBox: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#16161E',
    position: 'relative',
  },
  fullImg: {
    width: '100%',
    height: '100%',
  },
  badgeRating: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 10,
    fontWeight: '800',
  },
  cardTitleText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
