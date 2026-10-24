import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Channel } from '@nexora/shared';
import { Navbar } from '../landing/Navbar';
import { NetflixHeroBillboard } from '../landing/NetflixHeroBillboard';
import { PlatformLampShowcase } from '../landing/PlatformLampShowcase';
import { LiveChannelsMarquee } from '../landing/LiveChannelsMarquee';
import { GlassConsoleSection } from '../landing/GlassConsoleSection';
import { Skiper16StickyCards } from '../landing/Skiper16StickyCards';
import { Skiper17StickyCards } from '../landing/Skiper17StickyCards';
import { MovieShowcaseSection } from '../landing/MovieShowcaseSection';
import { DeviceShowcase3D } from '../landing/DeviceShowcase3D';
import { ActivationGuide } from '../landing/ActivationGuide';
import { PricingSection } from '../landing/PricingSection';
import { FaqSection } from '../landing/FaqSection';
import { Footer } from '../landing/Footer';
import { LivePlayerModal } from '../landing/LivePlayerModal';
import { ActivationModal } from '../landing/ActivationModal';
import { AuthModal } from '../landing/AuthModal';
import '../landing/landing.css';

interface LandingPageViewProps {
  onNavigateToAdmin: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({ onNavigateToAdmin }) => {
  const [selectedChannelForPlayer, setSelectedChannelForPlayer] = useState<Channel | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isActivationOpen, setIsActivationOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<'subscriber' | 'admin'>('subscriber');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false,
    });

    (window as any).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      (window as any).__lenis = null;
      lenis.destroy();
    };
  }, []);

  const handleTuneChannel = (channel: Channel) => {
    setSelectedChannelForPlayer(channel);
    setIsPlayerOpen(true);
  };

  const handlePlayMovie = (movie: any) => {
    setSelectedChannelForPlayer({
      id: movie.id,
      channelNumber: 900,
      name: movie.title,
      streamUrl: movie.streamUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      logo: movie.posterUrl,
      category: 'Movies',
      resolution: '4K',
      fps: 60,
      bitrateKbps: 18500,
      epgId: `epg-${movie.id}`,
      status: 'active',
      currentProgram: {
        id: `epg-prog-${movie.id}`,
        channelId: movie.id,
        title: movie.title,
        description: movie.synopsis || 'Blockbuster 4K Feature Film with Dolby Atmos 7.1',
        category: 'Cinema',
        startTime: 'NOW',
        endTime: '2h 15m',
        progressPercent: 35,
        isLiveNow: true,
      },
    });
    setIsPlayerOpen(true);
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

      <MovieShowcaseSection onPlayMovie={handlePlayMovie} />

      <Skiper17StickyCards onPlayMovie={handlePlayMovie} />

      <DeviceShowcase3D />

      <ActivationGuide />

      <PricingSection />

      <FaqSection />

      <Footer onNavigateToAdmin={onNavigateToAdmin} />

      {isPlayerOpen && (
        <LivePlayerModal
          channel={selectedChannelForPlayer}
          onClose={() => {
            setIsPlayerOpen(false);
            setSelectedChannelForPlayer(null);
          }}
        />
      )}

      {isActivationOpen && (
        <ActivationModal onClose={() => setIsActivationOpen(false)} />
      )}

      {isAuthOpen && (
        <AuthModal
          defaultTab={authDefaultTab}
          onClose={() => setIsAuthOpen(false)}
          onNavigateToAdmin={onNavigateToAdmin}
        />
      )}
    </div>
  );
};

export default LandingPageView;
