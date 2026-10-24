import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Platform,
  ViewStyle,
  StyleProp,
} from 'react-native';

export interface ShineBorderProps {
  /**
   * Width of the border in pixels
   * @default 1.5
   */
  borderWidth?: number;
  /**
   * Duration of the animation in seconds
   * @default 8
   */
  duration?: number;
  /**
   * Color of the border, can be a single color or an array of colors
   * @default ['#800020', '#FF0D2E', '#FFFFFF']
   */
  shineColor?: string | string[];
  /**
   * Corner radius in pixels
   * @default 16
   */
  borderRadius?: number;
  /**
   * Optional custom style
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Optional children if used as wrapper
   */
  children?: React.ReactNode;
}

// Inject CSS keyframes for web platforms once
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const styleId = 'nexora-shine-border-keyframes';
  if (!document.getElementById(styleId)) {
    const styleTag = document.createElement('style');
    styleTag.id = styleId;
    styleTag.innerHTML = `
      @keyframes nexoraShine {
        0% { background-position: 0% 0%; }
        50% { background-position: 100% 100%; }
        100% { background-position: 0% 0%; }
      }
    `;
    document.head.appendChild(styleTag);
  }
}

export const ShineBorder: React.FC<ShineBorderProps> = ({
  borderWidth = 1.5,
  duration = 8,
  shineColor = ['#800020', '#FF0D2E', '#FFFFFF'],
  borderRadius = 16,
  style,
  children,
}) => {
  const colorArray = Array.isArray(shineColor) ? shineColor : [shineColor];
  const primaryShine = colorArray[1] || colorArray[0] || '#FF0D2E';
  const accentShine = colorArray[2] || '#FFFFFF';

  // Native animated values for perimeter traveling shine beam
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS !== 'web') {
      const loop = Animated.loop(
        Animated.timing(animValue, {
          toValue: 1,
          duration: duration * 1000,
          useNativeDriver: true,
        })
      );
      loop.start();
      return () => loop.stop();
    }
  }, [animValue, duration]);

  // Web Implementation using CSS radial-gradient and mask (MagicUI standard)
  if (Platform.OS === 'web') {
    const shineColorStr = colorArray.join(', ');
    const webStyle: any = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius,
      padding: borderWidth,
      backgroundImage: `radial-gradient(transparent, transparent, ${shineColorStr}, transparent, transparent)`,
      backgroundSize: '300% 300%',
      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      animation: `nexoraShine ${duration}s infinite linear`,
      pointerEvents: 'none',
      zIndex: 25,
      ...StyleSheet.flatten(style || {}),
    };

    if (children) {
      return (
        <View style={[{ position: 'relative', borderRadius, overflow: 'hidden' }, style]}>
          <View style={webStyle} />
          {children}
        </View>
      );
    }

    return <View pointerEvents="none" style={webStyle} />;
  }

  // Native (iOS & Android) Implementation:
  // Traveling perimeter beam + ambient glowing perimeter border
  const beamTranslateX = animValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-80, 220, -80],
  });

  const beamOpacity = animValue.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0.4, 0.95, 0.4, 0.95, 0.4],
  });

  const content = (
    <>
      {/* Base subtle Burgundy perimeter outline */}
      <View
        pointerEvents="none"
        style={[
          styles.nativeBaseBorder,
          {
            borderRadius,
            borderWidth,
            borderColor: 'rgba(128, 0, 32, 0.45)',
          },
        ]}
      />

      {/* Top Animated Traveling Beam */}
      <View
        pointerEvents="none"
        style={[styles.beamTrackHorizontal, { top: 0, height: borderWidth, borderRadius }]}
      >
        <Animated.View
          style={[
            styles.beamHorizontal,
            {
              backgroundColor: accentShine,
              shadowColor: primaryShine,
              opacity: beamOpacity,
              transform: [{ translateX: beamTranslateX }],
            },
          ]}
        />
      </View>

      {/* Bottom Animated Traveling Beam (opposite direction) */}
      <View
        pointerEvents="none"
        style={[styles.beamTrackHorizontal, { bottom: 0, height: borderWidth, borderRadius }]}
      >
        <Animated.View
          style={[
            styles.beamHorizontal,
            {
              backgroundColor: primaryShine,
              shadowColor: accentShine,
              opacity: beamOpacity,
              transform: [
                {
                  translateX: animValue.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [220, -80, 220],
                  }),
                },
              ],
            },
          ]}
        />
      </View>

      {/* Pulsing Corner Glints */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.cornerGlint,
          {
            top: 2,
            right: 2,
            backgroundColor: accentShine,
            shadowColor: primaryShine,
            opacity: beamOpacity,
          },
        ]}
      />
      <Animated.View
        pointerEvents="none"
        style={[
          styles.cornerGlint,
          {
            bottom: 2,
            left: 2,
            backgroundColor: primaryShine,
            shadowColor: accentShine,
            opacity: beamOpacity,
          },
        ]}
      />
    </>
  );

  if (children) {
    return (
      <View style={[{ position: 'relative', borderRadius, overflow: 'hidden' }, style]}>
        {content}
        {children}
      </View>
    );
  }

  return (
    <View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        { borderRadius, overflow: 'hidden', zIndex: 25 },
        style,
      ]}
    >
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  nativeBaseBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  beamTrackHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  beamHorizontal: {
    width: 90,
    height: '100%',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.95,
    shadowRadius: 8,
    elevation: 4,
  },
  cornerGlint: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 2.5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
});
