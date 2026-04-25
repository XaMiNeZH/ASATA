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
    borderRadius: 8,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  touchable: {
    minHeight: 44,
  },
  pressed: {
    opacity: 0.86,
  },
});
