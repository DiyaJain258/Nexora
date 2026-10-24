import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';

interface NetflixRankNumberProps {
  rank: number;
  size?: number;
}

export const NetflixRankNumber: React.FC<NetflixRankNumberProps> = ({
  rank,
  size = 130,
}) => {
  const rankStr = `${rank}`;
  const isDoubleDigit = rank >= 10;

  // On Web, use CSS text stroke for the exact pixel-perfect Netflix hollow stroke look
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { height: size + 10, width: isDoubleDigit ? size * 0.8 : size * 0.58 }]}>
        <Text
          style={[
            styles.baseText,
            {
              fontSize: size,
              lineHeight: size + 4,
              WebkitTextStroke: '3.5px rgba(255, 255, 255, 0.45)',
              WebkitTextFillColor: '#07080B',
              color: '#07080B',
              textShadow: '0 0 12px rgba(128, 0, 32, 0.35)',
            } as any,
          ]}
        >
          {rankStr}
        </Text>
      </View>
    );
  }

  // On Native (iOS & Android): Multi-layer outline projection
  const strokeColor = 'rgba(255, 255, 255, 0.48)';
  const strokeWidth = 2;

  return (
    <View style={[styles.container, { height: size + 10, width: isDoubleDigit ? size * 0.8 : size * 0.58 }]}>
      {/* 4 cardinal outline offsets */}
      <Text
        style={[
          styles.baseText,
          styles.outlineText,
          {
            fontSize: size,
            lineHeight: size + 4,
            color: strokeColor,
            transform: [{ translateX: -strokeWidth }, { translateY: 0 }],
          },
        ]}
      >
        {rankStr}
      </Text>
      <Text
        style={[
          styles.baseText,
          styles.outlineText,
          {
            fontSize: size,
            lineHeight: size + 4,
            color: strokeColor,
            transform: [{ translateX: strokeWidth }, { translateY: 0 }],
          },
        ]}
      >
        {rankStr}
      </Text>
      <Text
        style={[
          styles.baseText,
          styles.outlineText,
          {
            fontSize: size,
            lineHeight: size + 4,
            color: strokeColor,
            transform: [{ translateX: 0 }, { translateY: -strokeWidth }],
          },
        ]}
      >
        {rankStr}
      </Text>
      <Text
        style={[
          styles.baseText,
          styles.outlineText,
          {
            fontSize: size,
            lineHeight: size + 4,
            color: strokeColor,
            transform: [{ translateX: 0 }, { translateY: strokeWidth }],
          },
        ]}
      >
        {rankStr}
      </Text>

      {/* Dark Inner Core */}
      <Text
        style={[
          styles.baseText,
          {
            fontSize: size,
            lineHeight: size + 4,
            color: '#07080B',
            textShadowColor: 'rgba(128, 0, 32, 0.5)',
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 8,
          },
        ]}
      >
        {rankStr}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  baseText: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-black',
    fontWeight: '900',
    letterSpacing: -6,
    textAlign: 'center',
  },
  outlineText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
