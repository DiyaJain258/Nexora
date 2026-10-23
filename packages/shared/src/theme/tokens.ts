export const NexoraTheme = {
  colors: {
    background: '#070912',
    secondaryBackground: '#0B1020',
    surface: '#0F172A',
    card: '#111827',
    cardHover: '#1E293B',
    violet: '#8B5CF6',
    violetLight: '#A78BFA',
    violetDark: '#6D28D9',
    cyan: '#22D3EE',
    cyanLight: '#67E8F9',
    cyanDark: '#0891B2',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    border: '#1E293B',
    borderActive: '#8B5CF6',
    danger: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    liveRed: '#EF4444',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)',
    primaryHover: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
    cardGloss: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
    heroDarkOverlay: 'linear-gradient(180deg, rgba(7, 9, 18, 0.1) 0%, rgba(7, 9, 18, 0.8) 70%, #070912 100%)',
    heroSideOverlay: 'linear-gradient(90deg, #070912 0%, rgba(7, 9, 18, 0.8) 40%, rgba(7, 9, 18, 0) 100%)',
    badgeGlow: '0 0 15px rgba(139, 92, 246, 0.4)',
    tvFocusGlow: '0 0 0 3px #22D3EE, 0 0 20px rgba(34, 211, 238, 0.6)',
  },
  radii: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  shadows: {
    card: '0 8px 24px -4px rgba(0, 0, 0, 0.6)',
    cardHover: '0 16px 32px -4px rgba(139, 92, 246, 0.25)',
    modal: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
    tvFocus: '0 0 0 3px #22D3EE, 0 10px 30px rgba(34, 211, 238, 0.4)',
  },
  typography: {
    fontFamily: "'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  }
} as const;

export type ThemeType = typeof NexoraTheme;
