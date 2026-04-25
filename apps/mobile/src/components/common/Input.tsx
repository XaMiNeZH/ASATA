import { useState } from 'react';
import type { ComponentProps } from 'react';
import { Feather } from '@expo/vector-icons';
import type { KeyboardTypeOptions } from 'react-native';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  multiline?: boolean;
  leftIcon?: ComponentProps<typeof Feather>['name'];
  rightIcon?: ComponentProps<typeof Feather>['name'];
  rightIconColor?: string;
  onRightIconPress?: () => void;
}

export function Input({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  placeholder,
  multiline = false,
  leftIcon,
  rightIcon,
  rightIconColor,
  onRightIconPress,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputStateStyle = error ? styles.fieldError : isFocused ? styles.fieldFocused : null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.field, multiline && styles.fieldMultiline, inputStateStyle]}>
        {leftIcon ? <Feather name={leftIcon} size={18} color={Colors.textMuted} style={styles.leftIcon} /> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          multiline={multiline}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[styles.input, multiline && styles.multiline]}
        />
        {rightIcon ? (
          <Pressable
            accessibilityRole="button"
            disabled={!onRightIconPress}
            onPress={onRightIconPress}
            style={styles.rightIcon}
          >
            <Feather name={rightIcon} size={19} color={rightIconColor ?? Colors.textMuted} />
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  field: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
  },
  fieldFocused: {
    borderColor: Colors.primary,
  },
  fieldError: {
    borderColor: Colors.danger,
  },
  fieldMultiline: {
    minHeight: 56,
    alignItems: 'flex-start',
    paddingTop: Spacing.sm,
  },
  leftIcon: {
    marginRight: Spacing.sm,
    marginTop: 1,
  },
  rightIcon: {
    width: 36,
    height: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    minHeight: 44,
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    padding: 0,
  },
  multiline: {
    minHeight: 48,
    textAlignVertical: 'top',
  },
  error: {
    color: Colors.danger,
    fontSize: FontSize.xs,
  },
});
