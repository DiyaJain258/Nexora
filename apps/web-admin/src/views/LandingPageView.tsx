import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Channel, MOCK_CHANNELS } from '@nexora/shared';
import { Navbar } from '../landing/Navbar';
import { NetflixHeroBillboard } from '../landing/NetflixHeroBillboard';
import { PlatformLampShowcase } from '../landing/PlatformLampShowcase';
import { GlassConsoleSection } from '../landing/GlassConsoleSection';
import { LiveChannelsMarquee } from '../landing/LiveChannelsMarquee';
import { Skiper16StickyCards } from '../landing/Skiper16StickyCards';
import { MovieShowcaseSection } from '../landing/MovieShowcaseSection';
import { DeviceShowcase3D } from '../landing/DeviceShowcase3D';
import { ActivationGuide } from '../landing/ActivationGuide';
import { PricingSection } from '../landing/PricingSection';
import { FaqSection } from '../landing/FaqSection';
import { Footer } from '../landing/Footer';
import { LivePlayerModal } from '../landing/LivePlayerModal';
import { ActivationModal } from '../landing/ActivationModal';
import { AuthModal } from '../landing/AuthModal';
import { SubscriberProfileModal } from '../landing/SubscriberProfileModal';
import { SearchModal } from '../landing/SearchModal';
import { OttVideoPlayerModal } from '../landing/OttVideoPlayerModal';
import { SubscriptionPaywallModal } from '../landing/SubscriptionPaywallModal';
import { SubscriptionPlan } from '@nexora/shared';
import { useWatchlist } from '../hooks/useWatchlist';
import { UserSession } from '../views/AdminLoginView';
import '../landing/landing.css';

interface LandingPageViewProps {
  onNavigateToAdmin: () => void;
  userSession?: UserSession | null;
  onLogout?: () => void;
  onLoginSuccess?: (session: UserSession) => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onNavigateToAdmin,
  userSession,
  onLogout,
  onLoginSuccess,
}) => {
  const [selectedChannelForPlayer, setSelectedChannelForPlayer] = useState<Channel | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isActivationOpen, setIsActivationOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSubscriberModalOpen, setIsSubscriberModalOpen] = useState(false);
  const [subscriberModalInitialTab, setSubscriberModalInitialTab] = useState<
    'overview' | 'devices' | 'settings' | 'watchlist'
  >('overview');
  const [authDefaultTab, setAuthDefaultTab] = useState<'subscriber' | 'admin'>('subscriber');

  // Search & OTT Video Player Modal States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOttPlayerOpen, setIsOttPlayerOpen] = useState(false);
  const [selectedMovieForOtt, setSelectedMovieForOtt] = useState<any | null>(null);

  // Subscription Paywall State for unauthenticated viewers
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [pendingMovieForAuth, setPendingMovieForAuth] = useState<any | null>(null);

  // Persistent Watchlist Hook
  const { watchlist, toggleWatchlist, isInWatchlist, removeFromWatchlist, count: watchlistCount } = useWatchlist();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
      anchors: true,
      autoResize: true,
    });

    (window as any).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Global smooth anchor scroll with navbar offset
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      const href = target?.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -76,
            duration: 1.1,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      (window as any).__lenis = null;
      lenis.destroy();
    };
  }, []);

  // Pause Lenis background scrolling when any modal is open
  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (!lenis) return;
    const isAnyModalOpen =
      isSearchOpen ||
      isSubscriberModalOpen ||
      isAuthOpen ||
      isPlayerOpen ||
      isOttPlayerOpen ||
      isActivationOpen ||
      isPaywallOpen;

    if (isAnyModalOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [
    isSearchOpen,
    isSubscriberModalOpen,
    isAuthOpen,
    isPlayerOpen,
    isOttPlayerOpen,
    isActivationOpen,
    isPaywallOpen,
  ]);

  const handleTuneChannel = (channel: Channel) => {
    setSelectedChannelForPlayer(channel);
    setIsPlayerOpen(true);
  };

  const handlePlayMovie = (movie: any) => {
    // If user is not logged in: gate with Subscription Paywall modal
    if (!userSession) {
      setPendingMovieForAuth(movie);
      setIsPaywallOpen(true);
      return;
    }

    // If logged in: stream immediately in 4K Cinema Player
    setSelectedMovieForOtt(movie);
    setIsOttPlayerOpen(true);
  };

  const handleSelectPaywallPlan = (plan: SubscriptionPlan, newSession: UserSession) => {
    setIsPaywallOpen(false);
    if (onLoginSuccess) {
      onLoginSuccess(newSession);
    }
    // Automatically launch the movie they intended to watch
    if (pendingMovieForAuth) {
      setSelectedMovieForOtt(pendingMovieForAuth);
      setIsOttPlayerOpen(true);
      setPendingMovieForAuth(null);
    }
  };

  const handleOpenSignInFromPaywall = () => {
    setIsPaywallOpen(false);
    setAuthDefaultTab('subscriber');
    setIsAuthOpen(true);
  };

  const handleWatchTeaser = (movie: any) => {
    // Allows watching trailer / teaser preview without login
    setSelectedMovieForOtt(movie);
    setIsOttPlayerOpen(true);
  };

  return (
    <div className="cinematic-bg" style={{ minHeight: '100vh', backgroundColor: '#050507', color: '#f8fafc' }}>
      <Navbar
        onOpenActivation={() => setIsActivationOpen(true)}
        onOpenLiveDemo={() => setIsPlayerOpen(true)}
        onOpenSignIn={(tab = 'subscriber') => {
          setAuthDefaultTab(tab);
          setIsAuthOpen(true);
        }}
        onNavigateToAdmin={onNavigateToAdmin}
        userSession={userSession}
        onOpenSubscriberProfile={() => {
          setSubscriberModalInitialTab('overview');
          setIsSubscriberModalOpen(true);
        }}
        onLogout={onLogout}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Grand Netflix-Style Cinematic Billboard Slider with Big Auto-Slides and Trailer Modal */}
      <NetflixHeroBillboard
        onOpenActivation={() => setIsActivationOpen(true)}
        onOpenLiveDemo={() => setIsPlayerOpen(true)}
        onNavigateToAdmin={onNavigateToAdmin}
      />

      {/* Aceternity Lamp & Sparkles Spotlight Transition */}
      <PlatformLampShowcase
        onOpenActivation={() => setIsActivationOpen(true)}
        onOpenLiveDemo={() => setIsPlayerOpen(true)}
      />

      <GlassConsoleSection onPlayMovie={handlePlayMovie} />

      <LiveChannelsMarquee onTuneChannel={handleTuneChannel} />

      <Skiper16StickyCards onPlayMovie={handlePlayMovie} />

      <MovieShowcaseSection
        onPlayMovie={handlePlayMovie}
        isInWatchlist={isInWatchlist}
        onToggleWatchlist={toggleWatchlist}
        watchlistCount={watchlistCount}
      />

      <DeviceShowcase3D />

      <ActivationGuide />

      <PricingSection />

      <FaqSection />

      <Footer onNavigateToAdmin={onNavigateToAdmin} />

      {/* Instant Search Modal (Ctrl + K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onPlayMovie={handlePlayMovie}
        onPlayChannel={handleTuneChannel}
        isInWatchlist={isInWatchlist}
        onToggleWatchlist={toggleWatchlist}
      />

      {/* Full-Screen 4K OTT Cinema Video Player Modal */}
      <OttVideoPlayerModal
        isOpen={isOttPlayerOpen}
        onClose={() => {
          setIsOttPlayerOpen(false);
          setSelectedMovieForOtt(null);
        }}
        item={selectedMovieForOtt}
        isInWatchlist={selectedMovieForOtt ? isInWatchlist(selectedMovieForOtt.id) : false}
        onToggleWatchlist={toggleWatchlist}
      />

      {/* Live TV Channels Player Modal */}
      {isPlayerOpen && (
        <LivePlayerModal
          channel={selectedChannelForPlayer}
          onClose={() => {
            setIsPlayerOpen(false);
            setSelectedChannelForPlayer(null);
          }}
        />
      )}

      {/* 6-Digit Smart TV Activation Modal */}
      {isActivationOpen && (
        <ActivationModal
          onClose={() => setIsActivationOpen(false)}
          onOpenSubscriberDevices={() => {
            setIsActivationOpen(false);
            setSubscriberModalInitialTab('devices');
            setIsSubscriberModalOpen(true);
          }}
        />
      )}

      {/* Auth Gateway Modal */}
      {isAuthOpen && (
        <AuthModal
          defaultTab={authDefaultTab}
          onClose={() => setIsAuthOpen(false)}
          onNavigateToAdmin={onNavigateToAdmin}
          onLoginSuccess={(session) => {
            if (onLoginSuccess) {
              onLoginSuccess(session);
            }
            if (pendingMovieForAuth) {
              setSelectedMovieForOtt(pendingMovieForAuth);
              setIsOttPlayerOpen(true);
              setPendingMovieForAuth(null);
            }
          }}
        />
      )}

      {/* OTT Subscription Paywall Modal for Guests */}
      <SubscriptionPaywallModal
        isOpen={isPaywallOpen}
        onClose={() => {
          setIsPaywallOpen(false);
          setPendingMovieForAuth(null);
        }}
        pendingMovie={pendingMovieForAuth}
        onSelectPlan={handleSelectPaywallPlan}
        onOpenSignIn={handleOpenSignInFromPaywall}
        onWatchTeaser={handleWatchTeaser}
      />

      {/* Subscriber Member Center / TV Devices, Account & Watchlist Modal */}
      <SubscriberProfileModal
        isOpen={isSubscriberModalOpen}
        onClose={() => {
          setIsSubscriberModalOpen(false);
          setSubscriberModalInitialTab('overview');
        }}
        session={
          userSession || {
            id: 'sub-vip-01',
            name: 'VIP Member',
            email: 'subscriber@nexora.tv',
            role: 'subscriber',
            plan: 'Platinum 4K UHD VIP',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
          }
        }
        defaultTab={subscriberModalInitialTab}
        onOpenActivation={() => {
          setIsSubscriberModalOpen(false);
          setIsActivationOpen(true);
        }}
        onLogout={() => {
          setIsSubscriberModalOpen(false);
          if (onLogout) onLogout();
        }}
        onBrowseMovies={() => {
          const el = document.getElementById('cinema');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        watchlistIds={watchlist}
        onRemoveFromWatchlist={removeFromWatchlist}
        onPlayMovie={handlePlayMovie}
      />
    </div>
  );
};

export default LandingPageView;

