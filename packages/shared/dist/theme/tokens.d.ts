export declare const NexoraTheme: {
    readonly colors: {
        readonly background: "#050505";
        readonly secondaryBackground: "#0D0D0D";
        readonly surface: "#151515";
        readonly card: "#151515";
        readonly cardHover: "#1C1C1C";
        readonly elevated: "#1C1C1C";
        readonly red: "#E50914";
        readonly redHover: "#FF2B36";
        readonly redDark: "#7F0000";
        readonly text: "#FFFFFF";
        readonly textSecondary: "#B3B3B3";
        readonly textMuted: "#737373";
        readonly border: "#303030";
        readonly borderActive: "#E50914";
        readonly danger: "#E50914";
        readonly success: "#10B981";
        readonly warning: "#F59E0B";
        readonly liveRed: "#E50914";
    };
    readonly gradients: {
        readonly primary: "linear-gradient(135deg, #E50914 0%, #7F0000 100%)";
        readonly primaryHover: "linear-gradient(135deg, #FF2B36 0%, #990000 100%)";
        readonly cardGloss: "linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%)";
        readonly heroDarkOverlay: "linear-gradient(180deg, rgba(5, 5, 5, 0.1) 0%, rgba(5, 5, 5, 0.75) 55%, #050505 100%)";
        readonly heroSideOverlay: "linear-gradient(90deg, #050505 0%, rgba(5, 5, 5, 0.9) 35%, rgba(5, 5, 5, 0) 100%)";
        readonly badgeGlow: "0 0 15px rgba(229, 9, 20, 0.4)";
        readonly tvFocusGlow: "0 0 0 3px #E50914, 0 0 24px rgba(229, 9, 20, 0.65)";
    };
    readonly radii: {
        readonly sm: "6px";
        readonly md: "10px";
        readonly lg: "16px";
        readonly xl: "24px";
        readonly full: "9999px";
    };
    readonly shadows: {
        readonly card: "0 8px 24px -4px rgba(0, 0, 0, 0.7)";
        readonly cardHover: "0 16px 32px -4px rgba(229, 9, 20, 0.3)";
        readonly modal: "0 25px 50px -12px rgba(0, 0, 0, 0.95)";
        readonly tvFocus: "0 0 0 3px #E50914, 0 10px 30px rgba(229, 9, 20, 0.5)";
    };
    readonly typography: {
        readonly fontFamily: "'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    };
};
export type ThemeType = typeof NexoraTheme;
