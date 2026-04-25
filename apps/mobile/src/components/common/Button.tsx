import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '../../constants/colors';
import { FontSize, FontWeight } from '../../constants/typography';

interface ButtonProps {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
}

export function Button({ label, onPress, isLoading = false, disabled = false, variant }: ButtonProps) {
  const isDisabled = disabled || isLoading;
  const variantStyle = styles[variant];
  const textStyle = variant === 'ghost' || variant === 'secondary' ? styles.textDark : styles.textLight;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variantStyle,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
      ]}
    >
      {isLoading ? <ActivityIndicator color={textStyle.color} /> : <Text style={[styles.text, textStyle]}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.primaryPale,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
  },
  danger: {
    backgroundColor: Colors.danger,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.55,
  },
  pressed: {
    opacity: 0.82,
  },
  text: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  textLight: {
    color: Colors.surface,
  },
  textDark: {
    color: Colors.primaryDark,
  },
});
