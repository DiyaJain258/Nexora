export declare const NexoraTheme: {
    readonly colors: {
        readonly background: "#070912";
        readonly secondaryBackground: "#0B1020";
        readonly surface: "#0F172A";
        readonly card: "#111827";
        readonly cardHover: "#1E293B";
        readonly violet: "#8B5CF6";
        readonly violetLight: "#A78BFA";
        readonly violetDark: "#6D28D9";
        readonly cyan: "#22D3EE";
        readonly cyanLight: "#67E8F9";
        readonly cyanDark: "#0891B2";
        readonly text: "#F8FAFC";
        readonly textSecondary: "#94A3B8";
        readonly textMuted: "#64748B";
        readonly border: "#1E293B";
        readonly borderActive: "#8B5CF6";
        readonly danger: "#EF4444";
        readonly success: "#10B981";
        readonly warning: "#F59E0B";
        readonly liveRed: "#EF4444";
    };
    readonly gradients: {
        readonly primary: "linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)";
        readonly primaryHover: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)";
        readonly cardGloss: "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)";
        readonly heroDarkOverlay: "linear-gradient(180deg, rgba(7, 9, 18, 0.1) 0%, rgba(7, 9, 18, 0.8) 70%, #070912 100%)";
        readonly heroSideOverlay: "linear-gradient(90deg, #070912 0%, rgba(7, 9, 18, 0.8) 40%, rgba(7, 9, 18, 0) 100%)";
        readonly badgeGlow: "0 0 15px rgba(139, 92, 246, 0.4)";
        readonly tvFocusGlow: "0 0 0 3px #22D3EE, 0 0 20px rgba(34, 211, 238, 0.6)";
    };
    readonly radii: {
        readonly sm: "6px";
        readonly md: "10px";
        readonly lg: "16px";
        readonly xl: "24px";
        readonly full: "9999px";
    };
    readonly shadows: {
        readonly card: "0 8px 24px -4px rgba(0, 0, 0, 0.6)";
        readonly cardHover: "0 16px 32px -4px rgba(139, 92, 246, 0.25)";
        readonly modal: "0 25px 50px -12px rgba(0, 0, 0, 0.8)";
        readonly tvFocus: "0 0 0 3px #22D3EE, 0 10px 30px rgba(34, 211, 238, 0.4)";
    };
    readonly typography: {
        readonly fontFamily: "'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    };
};
export type ThemeType = typeof NexoraTheme;
