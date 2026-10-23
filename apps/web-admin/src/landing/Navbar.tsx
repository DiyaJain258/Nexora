import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tv, KeyRound, PlaySquare, ShieldCheck, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenActivation: () => void;
  onOpenLiveDemo: () => void;
  onOpenSignIn: (defaultTab?: 'subscriber' | 'admin') => void;
  onNavigateToAdmin: () => void;
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

  // Sync active section based on current scroll position (Scroll Spy)
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace('#', ''));

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // If user is near top (Hero section), no nav item is active
      if (scrollY < 260) {
        setActiveSection('');
        return;
      }

      const viewportMiddle = scrollY + window.innerHeight * 0.35;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (viewportMiddle >= top) {
            setActiveSection(`#${id}`);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler with custom offset so title is never covered by fixed navbar
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const navbarHeight = 78;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setActiveSection(href);
      if (window.history.pushState) {
        window.history.pushState(null, '', href);
      }
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('');
    if (window.history.pushState) {
      window.history.pushState(null, '', window.location.pathname);
    }
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

      {/* Floating Animated Nav Capsule */}
      <nav
        style={{
          display: 'flex',
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
                <motion.span
                  layoutId="hoverNavPill"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.07)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    zIndex: 0,
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

      {/* Action CTA Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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

        {/* Direct Internal Switch to Admin Portal on Same Port */}
        <motion.button
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNavigateToAdmin}
          className="nav-btn-admin"
          title="Open Admin Operations Console"
        >
          <ShieldCheck size={15} color="#050507" strokeWidth={2.4} />
          <span>Admin Portal</span>
        </motion.button>
      </div>
    </header>
  );
};

export default Navbar;
