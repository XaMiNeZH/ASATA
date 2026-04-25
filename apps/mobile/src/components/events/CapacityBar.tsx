import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';

interface CapacityBarProps {
  total: number;
  filled: number;
}

export function CapacityBar({ total, filled }: CapacityBarProps) {
  const bucket = Math.min(10, Math.max(0, Math.round((filled / total) * 10)));

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View style={[styles.fill, widthBuckets[bucket]]} />
      </View>
      <Text style={styles.text}>
        {filled} / {total} places
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.xs,
  },
  track: {
    height: 8,
    borderRadius: 999,
    backgroundColor: Colors.primaryPale,
    overflow: 'hidden',
  },
  fill: {
    height: 8,
    borderRadius: 999,
    backgroundColor: Colors.primary,
  },
  text: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
});

const widthStyles = StyleSheet.create({
  width0: { width: '0%' },
  width1: { width: '10%' },
  width2: { width: '20%' },
  width3: { width: '30%' },
  width4: { width: '40%' },
  width5: { width: '50%' },
  width6: { width: '60%' },
  width7: { width: '70%' },
  width8: { width: '80%' },
  width9: { width: '90%' },
  width10: { width: '100%' },
});

const widthBuckets = [
  widthStyles.width0,
  widthStyles.width1,
  widthStyles.width2,
  widthStyles.width3,
  widthStyles.width4,
  widthStyles.width5,
  widthStyles.width6,
  widthStyles.width7,
  widthStyles.width8,
  widthStyles.width9,
  widthStyles.width10,
];
