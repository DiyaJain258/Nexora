import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Platform,
} from 'react-native';
import { ShineBorder } from './ShineBorder';

const { width } = Dimensions.get('window');

interface SportMatch {
  id: string;
  title: string;
  league: string;
  time: string;
  isLive: boolean;
  score?: string;
  channel: string;
  thumbnail: string;
  stadium: string;
}

const DUMMY_MATCHES: SportMatch[] = [
  {
    id: 'match-01',
    title: 'NBA Playoff: Lakers vs Denver, Game 2',
    league: 'NBA Western Conference Finals',
    time: '13:55',
    isLive: true,
    score: 'DEN 108 - 103 LAL (Q4 02:14)',
    channel: 'ESPN HD',
    thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&auto=format&fit=crop&q=80',
    stadium: 'Ball Arena, Denver',
  },
  {
    id: 'match-02',
    title: 'UEFA Champions: Real Madrid vs Bayern',
    league: 'Champions League Semi-Final',
    time: '16:30',
    isLive: false,
    score: 'Upcoming',
    channel: 'Apex Sports 1',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&auto=format&fit=crop&q=80',
    stadium: 'Santiago Bernabéu, Madrid',
  },
  {
    id: 'match-03',
    title: 'T20 Championship: India vs Australia',
    league: 'ICC World Cup Final',
    time: '19:00',
    isLive: false,
    score: 'Upcoming',
    channel: 'Star Sports 4K',
    thumbnail: 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?w=500&auto=format&fit=crop&q=80',
    stadium: 'Melbourne Cricket Ground',
  },
  {
    id: 'match-04',
    title: 'Wimbledon Men Singles: Alcaraz vs Djokovic',
    league: 'Grand Slam Championship Final',
    time: '21:15',
    isLive: false,
    score: 'Upcoming',
    channel: 'Tennis Channel HD',
    thumbnail: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=500&auto=format&fit=crop&q=80',
    stadium: 'Centre Court, London',
  },
  {
    id: 'match-05',
    title: 'Formula 1 Monaco GP: Main Race Live',
    league: 'FIA Formula One World Championship',
    time: '23:00',
    isLive: false,
    score: 'Upcoming',
    channel: 'Sky Sports F1',
    thumbnail: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&auto=format&fit=crop&q=80',
    stadium: 'Circuit de Monaco, Monte Carlo',
  },
];

const SPORTS_CHANNELS = [
  { id: 'ch-espn', name: 'ESPN HD', program: 'NBA Playoff: Lakers vs Denver Game 2', logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=160&auto=format&fit=crop&q=80', active: true },
  { id: 'ch-abc', name: 'ABC Sports', program: 'The warm-up for the NBA showcase', logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=160&auto=format&fit=crop&q=80', active: false },
  { id: 'ch-fox', name: 'FOX Sports 1', program: 'Bundesliga Weekly Wrap & Analysis', logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=160&auto=format&fit=crop&q=80', active: false },
  { id: 'ch-sky', name: 'Sky Sports Main', program: 'Premier League Live Matchday 4K', logo: 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?w=160&auto=format&fit=crop&q=80', active: false },
  { id: 'ch-tnt', name: 'TNT Sports 4K', program: 'Champions League Countdown', logo: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=160&auto=format&fit=crop&q=80', active: false },
];

const DATES = ['21.05', '22.05', '23.05', '24.05', '25.05'];

const QUALITIES = [
  { label: 'Auto (1080p)', res: '1080p', fps: '60fps', bitrate: '9.5 Mbps' },
  { label: '720p HD', res: '720p', fps: '60fps', bitrate: '4.8 Mbps' },
  { label: '1080p Full HD', res: '1080p', fps: '60fps', bitrate: '12.0 Mbps' },
  { label: '4K Ultra HDR', res: '4K', fps: '60fps', bitrate: '24.5 Mbps' },
];

interface PremiumSportsLiveViewProps {
  onBack?: () => void;
  onFullscreenPress?: (match: SportMatch) => void;
}

export const PremiumSportsLiveView: React.FC<PremiumSportsLiveViewProps> = ({
  onBack,
  onFullscreenPress,
}) => {
  const [selectedMatch, setSelectedMatch] = useState<SportMatch>(DUMMY_MATCHES[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedDateIndex, setSelectedDateIndex] = useState(1);
  const [activeSubTab, setActiveSubTab] = useState<'program' | 'channels'>('program');
  const [showQualityModal, setShowQualityModal] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('4K Ultra HDR');
  const [playerProgress, setPlayerProgress] = useState(68);

  return (
    <View style={styles.container}>
      {/* Top Live Video Player matching Image */}
      <View style={styles.playerContainer}>
        {/* Background Match Image */}
        <Image
          source={{ uri: selectedMatch.thumbnail }}
          style={styles.playerImage}
          resizeMode="cover"
        />

        {/* Cinematic Vignette */}
        <View style={styles.playerVignette} />

        {/* Top Control Bar */}
        <View style={styles.playerTopBar}>
          <View style={styles.liveBadgeRow}>
            <View style={styles.redDotLive} />
            <Text style={styles.liveText}>● LIVE</Text>
            <View style={styles.qualityPill}>
              <Text style={styles.qualityPillText}>4K 60FPS</Text>
            </View>
          </View>

          <View style={styles.playerTopRightIcons}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.controlIconBtn}
              onPress={() => setShowQualityModal(true)}
            >
              <Text style={styles.controlIconText}>⚙️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.controlIconBtn}
              onPress={() => onFullscreenPress && onFullscreenPress(selectedMatch)}
            >
              <Text style={styles.controlIconText}>⛶</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Big Match Title / Scoreboard Overlay in Video Player */}
        <View style={styles.scoreboardCenter}>
          <Text style={styles.matchScoreboardTitle}>
            {selectedMatch.title}
          </Text>
          {selectedMatch.score && (
            <View style={styles.scorePill}>
              <Text style={styles.scorePillText}>{selectedMatch.score}</Text>
            </View>
          )}
        </View>

        {/* Center Transport Controls (Rewind 10s, Play/Pause, Fast-forward 10s) */}
        <View style={styles.transportControlsRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setPlayerProgress(Math.max(0, playerProgress - 10))}
            style={styles.skipButton}
          >
            <Text style={styles.skipButtonText}>⏪ 10s</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setIsPlaying(!isPlaying)}
            style={styles.playPauseCircle}
          >
            <Text style={styles.playPauseIcon}>
              {isPlaying ? '⏸' : '▶'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setPlayerProgress(Math.min(100, playerProgress + 10))}
            style={styles.skipButton}
          >
            <Text style={styles.skipButtonText}>10s ⏩</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Scrubber Bar */}
        <View style={styles.playerBottomBar}>
          <View style={styles.scrubberTrack}>
            <View style={[styles.scrubberFill, { width: `${playerProgress}%` }]} />
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>01:18:24</Text>
            <Text style={styles.timeText}>{selectedMatch.channel} • Ultra HD</Text>
          </View>
        </View>
      </View>

      {/* Mode Switcher Buttons: TV Program vs Channels matching Screen 1 */}
      <View style={styles.tabSwitcherRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveSubTab('program')}
          style={[styles.switchTabBtn, activeSubTab === 'program' && styles.switchTabBtnActive]}
        >
          <Text
            style={[
              styles.switchTabBtnText,
              activeSubTab === 'program' && styles.switchTabBtnTextActive,
            ]}
          >
            TV Program / Schedule
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveSubTab('channels')}
          style={[styles.switchTabBtn, activeSubTab === 'channels' && styles.switchTabBtnActive]}
        >
          <Text
            style={[
              styles.switchTabBtnText,
              activeSubTab === 'channels' && styles.switchTabBtnTextActive,
            ]}
          >
            Sports Channels (5)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date Filter Pills Row matching Screen 2 */}
      {activeSubTab === 'program' && (
        <View style={styles.dateFilterContainer}>
          <View style={styles.dateRowHeader}>
            <Text style={styles.currentChannelTitle}>{selectedMatch.channel}</Text>
            <Text style={styles.broadcastStatus}>● Live Transmission</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datesScroll}
          >
            {DATES.map((date, idx) => {
              const isSelected = idx === selectedDateIndex;
              return (
                <TouchableOpacity
                  key={date}
                  activeOpacity={0.8}
                  onPress={() => setSelectedDateIndex(idx)}
                  style={[styles.datePill, isSelected && styles.datePillActive]}
                >
                  <Text style={[styles.dateText, isSelected && styles.dateTextActive]}>
                    {date}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* Scrollable EPG / Channel Feed matching Screen 1 & Screen 2 */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scheduleScroll}
      >
        {activeSubTab === 'program' ? (
          // EPG Program Matches List
          DUMMY_MATCHES.map((match) => {
            const isCurrent = match.id === selectedMatch.id;
            return (
              <TouchableOpacity
                key={match.id}
                activeOpacity={0.88}
                onPress={() => {
                  setSelectedMatch(match);
                  setIsPlaying(true);
                }}
                style={[styles.scheduleCard, isCurrent && styles.scheduleCardActive]}
              >
                {/* Thumbnail */}
                <View style={styles.scheduleThumbBox}>
                  <Image source={{ uri: match.thumbnail }} style={styles.scheduleThumb} />
                  {match.isLive && (
                    <View style={styles.scheduleLiveBadge}>
                      <Text style={styles.scheduleLiveText}>LIVE</Text>
                    </View>
                  )}
                </View>

                {/* Details */}
                <View style={{ flex: 1 }}>
                  <View style={styles.timeAndChannelRow}>
                    <Text style={styles.matchTimeText}>{match.time}</Text>
                    <Text style={styles.matchChannelText}>• {match.channel}</Text>
                  </View>
                  <Text style={styles.scheduleTitle} numberOfLines={2}>
                    {match.title}
                  </Text>
                  <Text style={styles.stadiumText} numberOfLines={1}>
                    📍 {match.stadium}
                  </Text>
                </View>

                {/* Play Indicator Icon */}
                <View style={[styles.miniPlayBtn, isCurrent && styles.miniPlayBtnActive]}>
                  <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                    {isCurrent ? '▶' : '⏱'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          // Sports Channels List matching Screen 1
          SPORTS_CHANNELS.map((ch) => (
            <TouchableOpacity
              key={ch.id}
              activeOpacity={0.88}
              onPress={() => {
                const found = DUMMY_MATCHES.find((m) => m.channel.includes(ch.name.split(' ')[0]));
                if (found) setSelectedMatch(found);
              }}
              style={styles.channelRowCard}
            >
              <Image source={{ uri: ch.logo }} style={styles.channelRowLogo} />
              <View style={{ flex: 1 }}>
                <Text style={styles.channelRowName}>{ch.name}</Text>
                <Text style={styles.channelRowProgram} numberOfLines={1}>
                  {ch.program}
                </Text>
              </View>
              <View style={styles.channelBroadcastBadge}>
                <Text style={styles.channelBroadcastText}>4K LIVE</Text>
              </View>
            </TouchableOpacity>
          ))
        )}

        <View style={{ height: 32 }} />
      </ScrollView>

      {/* Stream Quality Modal matching Screen 3 */}
      <Modal
        visible={showQualityModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowQualityModal(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setShowQualityModal(false)}
        >
          <View style={styles.qualitySheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Stream Quality Settings</Text>
            <Text style={styles.sheetSub}>
              Adaptive bitrate for high-definition sports action
            </Text>

            <View style={styles.qualityList}>
              {QUALITIES.map((q) => {
                const isChosen = q.label === selectedQuality;
                return (
                  <TouchableOpacity
                    key={q.label}
                    activeOpacity={0.8}
                    onPress={() => {
                      setSelectedQuality(q.label);
                      setShowQualityModal(false);
                    }}
                    style={[styles.qualityItem, isChosen && styles.qualityItemActive]}
                  >
                    <View>
                      <Text style={[styles.qualityItemLabel, isChosen && styles.qualityItemLabelActive]}>
                        {q.label}
                      </Text>
                      <Text style={styles.qualityItemMeta}>
                        {q.fps} • {q.bitrate}
                      </Text>
                    </View>
                    {isChosen && <Text style={styles.checkIcon}>✓</Text>}
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={styles.sheetCloseButton}
              onPress={() => setShowQualityModal(false)}
            >
              <Text style={styles.sheetCloseButtonText}>Done</Text>
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
    backgroundColor: '#07080B',
  },
  playerContainer: {
    width: '100%',
    height: 235,
    backgroundColor: '#000000',
    position: 'relative',
    justifyContent: 'space-between',
  },
  playerImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  playerVignette: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(7, 8, 11, 0.48)',
  },
  playerTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    zIndex: 10,
  },
  liveBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  redDotLive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E50914',
  },
  liveText: {
    color: '#E50914',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  qualityPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 4,
  },
  qualityPillText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
  },
  playerTopRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  controlIconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlIconText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  scoreboardCenter: {
    paddingHorizontal: 16,
    alignItems: 'center',
    zIndex: 10,
  },
  matchScoreboardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  scorePill: {
    backgroundColor: 'rgba(229, 9, 20, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 6,
  },
  scorePillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  transportControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    zIndex: 10,
  },
  skipButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  skipButtonText: {
    color: '#D1D5DB',
    fontSize: 11,
    fontWeight: '700',
  },
  playPauseCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  playPauseIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 2,
  },
  playerBottomBar: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    zIndex: 10,
  },
  scrubberTrack: {
    height: 3.5,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  scrubberFill: {
    height: '100%',
    backgroundColor: '#E50914',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  timeText: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '600',
  },
  tabSwitcherRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: '#13151D',
    borderRadius: 10,
    padding: 3,
  },
  switchTabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  switchTabBtnActive: {
    backgroundColor: '#E50914',
  },
  switchTabBtnText: {
    color: '#9CA3AF',
    fontSize: 12.5,
    fontWeight: '700',
  },
  switchTabBtnTextActive: {
    color: '#FFFFFF',
  },
  dateFilterContainer: {
    marginTop: 12,
    paddingHorizontal: 16,
  },
  dateRowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  currentChannelTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  broadcastStatus: {
    color: '#E50914',
    fontSize: 11,
    fontWeight: '700',
  },
  datesScroll: {
    gap: 8,
  },
  datePill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#161922',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  datePillActive: {
    backgroundColor: 'rgba(229, 9, 20, 0.25)',
    borderColor: '#E50914',
  },
  dateText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '700',
  },
  dateTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  scheduleScroll: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 10,
  },
  scheduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12141C',
    borderRadius: 12,
    padding: 10,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  scheduleCardActive: {
    borderColor: '#E50914',
    backgroundColor: '#181A24',
  },
  scheduleThumbBox: {
    width: 90,
    height: 65,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000000',
  },
  scheduleThumb: {
    width: '100%',
    height: '100%',
  },
  scheduleLiveBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: '#E50914',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 4,
  },
  scheduleLiveText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
  timeAndChannelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  matchTimeText: {
    color: '#E50914',
    fontSize: 11,
    fontWeight: '800',
  },
  matchChannelText: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '600',
  },
  scheduleTitle: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
    lineHeight: 16,
  },
  stadiumText: {
    color: '#9CA3AF',
    fontSize: 10.5,
    marginTop: 3,
  },
  miniPlayBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniPlayBtnActive: {
    backgroundColor: '#E50914',
  },
  channelRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12141C',
    borderRadius: 12,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  channelRowLogo: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#1E2230',
  },
  channelRowName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  channelRowProgram: {
    color: '#9CA3AF',
    fontSize: 11.5,
  },
  channelBroadcastBadge: {
    backgroundColor: 'rgba(229, 9, 20, 0.15)',
    borderWidth: 1,
    borderColor: '#E50914',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  channelBroadcastText: {
    color: '#E50914',
    fontSize: 10,
    fontWeight: '800',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  qualitySheet: {
    backgroundColor: '#13151D',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  sheetSub: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 16,
  },
  qualityList: {
    gap: 8,
  },
  qualityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1D27',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  qualityItemActive: {
    borderColor: '#E50914',
    backgroundColor: 'rgba(229, 9, 20, 0.15)',
  },
  qualityItemLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  qualityItemLabelActive: {
    color: '#E50914',
  },
  qualityItemMeta: {
    color: '#9CA3AF',
    fontSize: 11,
    marginTop: 2,
  },
  checkIcon: {
    color: '#E50914',
    fontSize: 16,
    fontWeight: '900',
  },
  sheetCloseButton: {
    backgroundColor: '#E50914',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 18,
  },
  sheetCloseButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
