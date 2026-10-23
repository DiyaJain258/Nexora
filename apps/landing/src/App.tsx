import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Channel } from '@nexora/shared';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LiveChannelsMarquee } from './components/LiveChannelsMarquee';
import { DeviceShowcase3D } from './components/DeviceShowcase3D';
import { ActivationGuide } from './components/ActivationGuide';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { LivePlayerModal } from './components/LivePlayerModal';
import { ActivationModal } from './components/ActivationModal';
import { AuthModal } from './components/AuthModal';
import './styles/landing.css';

export const App: React.FC = () => {
  const [selectedChannelForPlayer, setSelectedChannelForPlayer] = useState<Channel | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isActivationOpen, setIsActivationOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<'subscriber' | 'admin'>('subscriber');

  // Initialize Lenis Smooth Inertia Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleTuneChannel = (channel: Channel) => {
    setSelectedChannelForPlayer(channel);
    setIsPlayerOpen(true);
  };

  return (
    <div className="cinematic-bg" style={{ minHeight: '100vh', backgroundColor: '#03050d', color: '#f8fafc' }}>
      {/* Dynamic Glass Top Navbar */}
      <Navbar
        onOpenActivation={() => setIsActivationOpen(true)}
        onOpenLiveDemo={() => setIsPlayerOpen(true)}
        onOpenSignIn={(tab = 'subscriber') => {
          setAuthDefaultTab(tab);
          setIsAuthOpen(true);
        }}
      />

      {/* Hero Section with Interactive 3D Canvas */}
      <HeroSection
        onOpenActivation={() => setIsActivationOpen(true)}
        onOpenLiveDemo={() => setIsPlayerOpen(true)}
      />

      {/* Infinite Scrolling Live Channels & VOD Marquee */}
      <LiveChannelsMarquee onTuneChannel={handleTuneChannel} />

      {/* 3D Multi-Device Compatibility Showcase */}
      <DeviceShowcase3D />

      {/* 3-Step Instant TV Activation Workflow */}
      <ActivationGuide />

      {/* Subscription Pricing Matrix */}
      <PricingSection />

      {/* FAQ & Global SLA Trust Badges */}
      <FaqSection />

      {/* Footer */}
      <Footer />

      {/* Live 4K Player Preview Modal */}
      {isPlayerOpen && (
        <LivePlayerModal
          channel={selectedChannelForPlayer}
          onClose={() => {
            setIsPlayerOpen(false);
            setSelectedChannelForPlayer(null);
          }}
        />
      )}

      {/* TV Activation Modal */}
      {isActivationOpen && (
        <ActivationModal onClose={() => setIsActivationOpen(false)} />
      )}

      {/* Sign In / Auth Modal */}
      {isAuthOpen && (
        <AuthModal
          defaultTab={authDefaultTab}
          onClose={() => setIsAuthOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
