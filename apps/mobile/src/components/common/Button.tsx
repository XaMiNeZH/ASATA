import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '../../constants/colors';
import { FontSize, FontWeight } from '../../constants/typography';

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
  const variantStyle = styles[variant];
  const textStyle = variant === 'ghost' || variant === 'secondary' ? styles.textDark : styles.textLight;
  const finalTextStyle = variant === 'dangerOutline' ? styles.textDanger : textStyle;

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
        isDisabled && styles.noShadow,
        variant === 'ghost' && styles.noShadow,
        variant === 'secondary' && styles.noShadow,
        variant === 'dangerOutline' && styles.noShadow,
        pressed && !isDisabled && styles.pressed,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={finalTextStyle.color} />
      ) : (
        <Text style={[styles.text, size === 'small' && styles.smallText, finalTextStyle]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  small: {
    height: 40,
    borderRadius: 9999,
    paddingHorizontal: 14,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: 'transparent',
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
    opacity: 0.5,
  },
  noShadow: {
    shadowOpacity: 0,
    elevation: 0,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.98 }],
  },
  text: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semiBold,
  },
  smallText: {
    fontSize: FontSize.sm,
  },
  textLight: {
    color: Colors.surface,
  },
  textDark: {
    color: Colors.primary,
  },
  textDanger: {
    color: Colors.danger,
  },
});
