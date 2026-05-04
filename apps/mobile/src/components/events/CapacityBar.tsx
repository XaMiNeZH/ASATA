import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';

interface CapacityBarProps {
  total: number;
  filled: number;
  showText?: boolean;
  height?: number;
}

export function CapacityBar({ total, filled, showText = true, height = 6 }: CapacityBarProps) {
  const ratio = total > 0 ? Math.min(1, Math.max(0, filled / total)) : 0;
  const pct = Math.round(ratio * 100);
  const isFull = filled >= total;

  const progress = useRef(new Animated.Value(0)).current;
  const animatedWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', `${pct}%`],
  });

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [progress, pct]);

  const fillColor = isFull ? Colors.statusComplet : Colors.primary;

  return (
    <View style={styles.container}>
      {showText && (
        <View style={styles.labelRow}>
          <Text style={styles.fraction}>
            <Text style={styles.filledNum}>{filled}</Text>
            <Text style={styles.sep}>/{total}</Text>
            <Text style={styles.label}> inscrits</Text>
          </Text>
          <Text style={[styles.pctText, isFull && styles.pctFull]}>
            {isFull ? 'Complet' : `${pct}%`}
          </Text>
        </View>
      )}
      <View style={[styles.track, { height }]}>
        <Animated.View
          style={[
            styles.fill,
            { height, backgroundColor: fillColor, width: animatedWidth },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  fraction: {
    fontSize: 12,
    color: Colors.subtle,
    fontWeight: '500',
  },
  filledNum: {
    color: Colors.body,
    fontWeight: '600',
  },
  sep: {
    color: Colors.subtle,
  },
  label: {
    color: Colors.subtle,
  },
  pctText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.subtle,
  },
  pctFull: {
    color: Colors.statusComplet,
  },
  track: {
    borderRadius: 999,
    backgroundColor: Colors.primaryPale,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 999,
  },
});
