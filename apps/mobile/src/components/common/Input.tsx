import { useState } from 'react';
import type { ComponentProps } from 'react';
import { Feather } from '@expo/vector-icons';
import type { KeyboardTypeOptions } from 'react-native';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '../../constants/colors';

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
  optional?: boolean;
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
  optional = false,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {optional && <Text style={styles.optional}>  ·  optionnel</Text>}
      </Text>
      <View
        style={[
          styles.field,
          multiline && styles.fieldMultiline,
          isFocused && styles.fieldFocused,
          error ? styles.fieldError : null,
        ]}
      >
        {leftIcon && (
          <Feather
            name={leftIcon}
            size={18}
            color={isFocused ? Colors.primary : Colors.subtle}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={Colors.subtle}
          multiline={multiline}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[styles.input, multiline && styles.multiline]}
        />
        {rightIcon && (
          <Pressable
            accessibilityRole="button"
            disabled={!onRightIconPress}
            onPress={onRightIconPress}
            style={styles.rightIcon}
          >
            <Feather
              name={rightIcon}
              size={19}
              color={rightIconColor ?? Colors.subtle}
            />
          </Pressable>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.body,
  },
  optional: {
    fontSize: 12,
    color: Colors.subtle,
    fontWeight: '400',
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.hairline,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
  },
  fieldFocused: {
    borderColor: Colors.primary,
  },
  fieldError: {
    borderColor: Colors.danger,
  },
  fieldMultiline: {
    height: undefined,
    minHeight: 56,
    alignItems: 'flex-start',
    paddingTop: 14,
    paddingBottom: 14,
  },
  leftIcon: {
    marginRight: 10,
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
    color: Colors.body,
    fontSize: 15,
    fontWeight: '400',
    padding: 0,
  },
  multiline: {
    minHeight: 48,
    textAlignVertical: 'top',
  },
  error: {
    color: Colors.danger,
    fontSize: 12,
    marginTop: 2,
  },
});
