import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';

interface CapacityBarProps {
  total: number;
  filled: number;
  showText?: boolean;
}

export function CapacityBar({ total, filled, showText = true }: CapacityBarProps) {
  const ratio = total > 0 ? Math.min(1, Math.max(0, filled / total)) : 0;
  const progress = useRef(new Animated.Value(0)).current;
  const animatedWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', `${Math.round(ratio * 100)}%`],
  });
  const animatedFillStyle = { width: animatedWidth };
  const fillTone = ratio >= 0.9 ? styles.fillDanger : ratio >= 0.7 ? styles.fillWarning : styles.fillSuccess;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [progress, ratio]);

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, fillTone, animatedFillStyle]} />
      </View>
      {showText ? (
        <Text style={[styles.text, ratio >= 0.9 && styles.textDanger]}>
          {filled} / {total} places
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.xs,
  },
  track: {
    height: 6,
    borderRadius: 999,
    backgroundColor: Colors.border,
    overflow: 'hidden',
  },
  fill: {
    height: 6,
    borderRadius: 999,
  },
  fillSuccess: {
    backgroundColor: Colors.success,
  },
  fillWarning: {
    backgroundColor: '#F59E0B',
  },
  fillDanger: {
    backgroundColor: Colors.danger,
  },
  text: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
  textDanger: {
    color: Colors.danger,
  },
});
