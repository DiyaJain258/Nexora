export type ContentType = 'movie' | 'series' | 'live' | 'sports' | 'kids';

export interface ContentItem {
  id: string;
  title: string;
  originalTitle?: string;
  type: ContentType;
  backdropUrl: string;
  posterUrl: string;
  rating: number; // e.g. 8.9
  releaseYear: number;
  duration?: string; // e.g. '2h 14m' or '3 Seasons'
  ageRating: 'ALL' | 'PG-13' | '16+' | '18+';
  synopsis: string;
  genres: string[];
  streamUrl: string;
  trailerUrl?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  isLive?: boolean;
  matchScore: number; // e.g. 98% match
  seasonsCount?: number;
  quality: '4K HDR' | 'FHD' | 'HD';
  audioTracks?: string[];
  subtitles?: string[];
  cast?: string[];
  director?: string;
}

export interface Episode {
  id: string;
  seriesId: string;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  synopsis: string;
  duration: string;
  thumbnailUrl: string;
  streamUrl: string;
  airDate: string;
}

export interface Season {
  id: string;
  seriesId: string;
  seasonNumber: number;
  title: string;
  episodeCount: number;
  episodes: Episode[];
}

export interface EpgProgram {
  id: string;
  channelId: string;
  title: string;
  description: string;
  category: string;
  startTime: string; // ISO or '14:00'
  endTime: string;   // ISO or '15:30'
  progressPercent: number; // 0 - 100
  rating?: string;
  isLiveNow: boolean;
}

export interface Channel {
  id: string;
  channelNumber: number;
  name: string;
  logo: string;
  category: 'Sports' | 'News' | 'Entertainment' | 'Movies' | 'Documentary' | 'Kids' | 'Music';
  streamUrl: string;
  backupStreamUrl?: string;
  resolution: '4K' | '1080p' | '720p';
  fps?: number;
  bitrateKbps?: number;
  isFavorite?: boolean;
  epgId: string;
  currentProgram?: EpgProgram;
  nextProgram?: EpgProgram;
  epgSchedule?: EpgProgram[];
  status: 'active' | 'degraded' | 'offline';
}

export interface ContinueWatchingItem {
  id: string;
  contentId: string;
  title: string;
  subtitle?: string; // e.g. 'S2 : E4'
  posterUrl: string;
  backdropUrl: string;
  type: ContentType;
  timestampSeconds: number;
  durationSeconds: number;
  progressPercentage: number;
  lastWatched: string;
  streamUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'superadmin' | 'admin' | 'subscriber' | 'guest';
  planId: string;
  planName: string;
  createdAt: string;
  status: 'active' | 'suspended' | 'expired';
  maxScreens: number;
  activeScreens: number;
}

export interface DeviceSession {
  id: string;
  userId: string;
  userName: string;
  deviceName: string;
  deviceType: 'android-tv' | 'apple-tv' | 'android-mobile' | 'ios-mobile' | 'web' | 'fire-tv';
  ipAddress: string;
  location: string;
  clientVersion: string;
  lastActive: string;
  isCurrent: boolean;
  activeStreamTitle?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  badge?: string;
  priceMonthly: number;
  priceYearly: number;
  currency: string;
  maxStreams: number;
  resolution: 'HD' | 'FHD' | '4K HDR + Dolby Atmos';
  downloadSupported: boolean;
  features: string[];
  subscriberCount?: number;
  isPopular?: boolean;
}

export interface AdminMetrics {
  activeViewers: number;
  peakConcurrentToday: number;
  totalBandwidthGbps: number;
  activeLiveChannels: number;
  totalVodAssets: number;
  systemHealthPercent: number;
  monthlyRevenueUsd: number;
  churnRatePercent: number;
  activeSubscribers: number;
  transcodingNodesOnline: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  targetPlatform: 'all' | 'tv' | 'mobile' | 'web';
  type: 'system' | 'promotion' | 'maintenance' | 'breaking_news';
  sentAt: string;
  deliveredCount: number;
  readCount: number;
  status: 'sent' | 'scheduled' | 'draft';
}

export interface StreamStats {
  bitrateMbps: number;
  resolution: string;
  fps: number;
  bufferHealthSeconds: number;
  droppedFrames: number;
  audioCodec: string;
  videoCodec: string;
  cdnNode: string;
  latencyMs: number;
}
