import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tv, KeyRound, PlaySquare, Menu, X, ChevronRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenActivation: () => void;
  onOpenLiveDemo: () => void;
  onOpenSignIn: (defaultTab?: 'subscriber' | 'admin') => void;
  onNavigateToAdmin?: () => void;
}

const NAV_ITEMS = [
  { label: 'Smart OS', href: '#experience' },
  { label: 'Channels', href: '#channels' },
  { label: '4K Vault', href: '#vault' },
  { label: 'Cinema', href: '#cinema' },
  { label: 'Devices', href: '#devices' },
  { label: 'TV Activation', href: '#activation' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenActivation,
  onOpenLiveDemo,
  onOpenSignIn,
  onNavigateToAdmin,
}) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isManualNavigatingRef = useRef(false);
  const navigatingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync active section based on current scroll position (Scroll Spy)
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace('#', ''));

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // If user clicked a nav tab and page is smoothly gliding, freeze scroll spy to avoid jumping
      if (isManualNavigatingRef.current) return;

      // If user is near top (Hero section), no nav item is active
      if (scrollY < 260) {
        setActiveSection('');
        return;
      }

      // Check if user reached bottom of page (FAQ section)
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 120) {
        setActiveSection('#faq');
        return;
      }

      const scrollFocusY = scrollY + 160;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + scrollY;
          if (scrollFocusY >= top) {
            setActiveSection(`#${id}`);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (navigatingTimerRef.current) clearTimeout(navigatingTimerRef.current);
    };
  }, []);

  // Smooth scroll handler with custom offset and Lenis integration for butter-smooth gliding
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      isManualNavigatingRef.current = true;
      setActiveSection(href);
      if (window.history.pushState) {
        window.history.pushState(null, '', href);
      }

      if (navigatingTimerRef.current) {
        clearTimeout(navigatingTimerRef.current);
      }

      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(element, {
          offset: -76,
          duration: 0.95,
        });
      } else {
        const navbarHeight = 76;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }

      // Release navigation lock once smooth scrolling finishes
      navigatingTimerRef.current = setTimeout(() => {
        isManualNavigatingRef.current = false;
      }, 1000);
    }
  };

  const handleLogoClick = () => {
    isManualNavigatingRef.current = true;
    setActiveSection('');
    if (window.history.pushState) {
      window.history.pushState(null, '', window.location.pathname);
    }

    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.95 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (navigatingTimerRef.current) clearTimeout(navigatingTimerRef.current);
    navigatingTimerRef.current = setTimeout(() => {
      isManualNavigatingRef.current = false;
    }, 1000);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: isScrolled ? '12px 32px' : '15px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: isScrolled ? 'rgba(5, 5, 8, 0.88)' : 'rgba(5, 5, 8, 0.72)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: isScrolled
          ? '0 12px 35px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
          : '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        transition: 'padding 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease',
      }}
    >
      {/* Brand Logo */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        onClick={handleLogoClick}
        title="NEXORA 4K Stream Platform"
      >
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #e11d48 0%, #881337 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(225, 29, 72, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <Tv size={22} color="#ffffff" strokeWidth={2.5} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.5px', color: '#f8fafc' }}>
              NEXORA
            </span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 800,
                backgroundColor: 'rgba(225, 29, 72, 0.22)',
                color: '#fda4af',
                padding: '2px 7px',
                borderRadius: '6px',
                border: '1px solid rgba(225, 29, 72, 0.45)',
                boxShadow: '0 0 12px rgba(225, 29, 72, 0.25)',
              }}
            >
              PRO
            </span>
          </div>
          <span style={{ fontSize: '10px', color: '#a1a1aa', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            4K Stream Platform
          </span>
        </div>
      </motion.div>

      {/* Floating Animated Nav Capsule (Desktop & Wide Tablet) */}
      <nav
        className="desktop-nav-capsule"
        style={{
          alignItems: 'center',
          gap: '2px',
          padding: '4px 6px',
          backgroundColor: 'rgba(15, 15, 22, 0.65)',
          borderRadius: '999px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 8px 24px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.href;
          const isHovered = hoveredSection === item.href;

          return (
            <button
              key={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              onMouseEnter={() => setHoveredSection(item.href)}
              onMouseLeave={() => setHoveredSection(null)}
              style={{
                position: 'relative',
                padding: '7px 15px',
                fontSize: '13px',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#ffffff' : isHovered ? '#ffffff' : '#a1a1aa',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                outline: 'none',
              }}
            >
              {/* Active Animated Sliding Capsule Indicator */}
              {isActive && (
                <motion.span
                  layoutId="activeNavPill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '999px',
                    background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.26) 0%, rgba(136, 19, 55, 0.4) 100%)',
                    border: '1px solid rgba(225, 29, 72, 0.55)',
                    boxShadow: '0 0 18px rgba(225, 29, 72, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.22)',
                    zIndex: 0,
                  }}
                />
              )}

              {/* Hover Light-Up Capsule when not active */}
              {!isActive && isHovered && (
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    zIndex: 0,
                    transition: 'all 0.15s ease',
                  }}
                />
              )}

              {/* Micro Ruby Indicator Dot on Active Item */}
              {isActive && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: '#fda4af',
                    marginRight: '6px',
                    boxShadow: '0 0 8px #fda4af',
                  }}
                />
              )}

              <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Action CTA Buttons (Desktop) */}
      <div className="desktop-nav-actions" style={{ alignItems: 'center', gap: '10px' }}>
        <motion.button
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenLiveDemo}
          className="nav-btn-livedemo"
          title="Watch live streams"
        >
          <span className="nav-live-dot" />
          <PlaySquare size={15} color="#fda4af" />
          <span>Live Demo</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenActivation}
          className="nav-btn-activation"
          title="Pair your Smart TV"
        >
          <KeyRound size={15} color="#fda4af" />
          <span>Enter TV Code</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onOpenSignIn('subscriber')}
          className="nav-btn-signin"
          title="Subscriber Sign In"
        >
          <span>Sign In</span>
        </motion.button>
      </div>

      {/* Mobile Right Controls: Sign In + Hamburger Menu Toggle */}
      <div className="mobile-nav-toggle-group" style={{ display: 'none', alignItems: 'center', gap: '8px' }}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onOpenSignIn('subscriber')}
          className="nav-btn-signin"
          style={{ padding: '6px 12px', fontSize: '12px' }}
        >
          <span>Sign In</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-hamburger-btn"
          aria-label="Toggle menu"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          {isMobileMenuOpen ? <X size={20} color="#fda4af" /> : <Menu size={20} color="#ffffff" />}
        </motion.button>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'rgba(7, 5, 10, 0.96)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderBottom: '1px solid rgba(184, 29, 74, 0.35)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
              padding: '18px 20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              overflow: 'hidden',
              zIndex: 100,
            }}
          >
            {/* Nav Links Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    backgroundColor: activeSection === item.href ? 'rgba(139, 0, 50, 0.3)' : 'rgba(255, 255, 255, 0.04)',
                    border: activeSection === item.href ? '1px solid rgba(184, 29, 74, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    color: activeSection === item.href ? '#fda4af' : '#e2e8f0',
                    fontSize: '13px',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <span>{item.label}</span>
                  <ChevronRight size={13} color={activeSection === item.href ? '#fda4af' : '#71717a'} />
                </button>
              ))}
            </div>

            {/* Mobile Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenLiveDemo();
                }}
                className="nav-btn-livedemo"
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              >
                <span className="nav-live-dot" />
                <PlaySquare size={16} color="#fda4af" />
                <span>Launch Live 4K Demo</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenActivation();
                }}
                className="nav-btn-activation"
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              >
                <KeyRound size={16} color="#fda4af" />
                <span>Enter TV Code (Instant Pairing)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
