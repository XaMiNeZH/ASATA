import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '../../constants/colors';

interface ButtonProps {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant: 'primary' | 'secondary' | 'danger' | 'dangerOutline' | 'ghost';
  size?: 'default' | 'small';
}

export function Button({
  label,
  onPress,
  isLoading = false,
  disabled = false,
  variant,
  size = 'default',
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  const variantStyle = {
    primary:      styles.primary,
    secondary:    styles.secondary,
    danger:       styles.danger,
    dangerOutline: styles.dangerOutline,
    ghost:        styles.ghost,
  }[variant];

  const textColor = (() => {
    if (variant === 'primary')       return styles.textWhite;
    if (variant === 'secondary')     return styles.textPrimary;
    if (variant === 'danger')        return styles.textWhite;
    if (variant === 'dangerOutline') return styles.textDanger;
    if (variant === 'ghost')         return styles.textDanger; // logout style
    return styles.textPrimary;
  })();

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        size === 'small' && styles.small,
        variantStyle,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor.color} />
      ) : (
        <Text style={[styles.text, size === 'small' && styles.smallText, textColor]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  small: {
    height: 40,
    paddingHorizontal: 14,
  },
  // Variants
  primary: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 4,
  },
  secondary: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  danger: {
    backgroundColor: Colors.danger,
  },
  dangerOutline: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.danger,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.48,
    shadowOpacity: 0,
    elevation: 0,
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.98 }],
  },
  // Text
  text: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  smallText: {
    fontSize: 13,
  },
  textWhite:   { color: '#FFFFFF' },
  textPrimary: { color: Colors.primary },
  textDanger:  { color: Colors.danger },
});
