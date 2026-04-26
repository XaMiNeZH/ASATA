import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';

interface CardProps {
  children: ReactNode;
  onPress?: () => void;
}

export function Card({ children, onPress }: CardProps) {
  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.card, styles.touchable, pressed && styles.pressed]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  touchable: {
    minHeight: 44,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.98 }],
  },
});
