import type { ComponentProps } from 'react';
import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import type { Notification } from '../../types';
import { formatRelative } from '../../utils/date';

type FeatherName = ComponentProps<typeof Feather>['name'];

interface NotificationItemProps {
  notification: Notification;
  onPress: () => void;
}

const iconByType: Record<Notification['type'], FeatherName> = {
  event_confirmation: 'check',
  event_cancelled: 'x',
  reminder: 'clock',
  announcement: 'bell',
};

export function NotificationItem({ notification, onPress }: NotificationItemProps) {
  const iconTone = iconToneByType[notification.type];

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        notification.lu ? styles.read : styles.unread,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.iconCircle, iconTone]}>
        <Feather name={iconByType[notification.type]} size={16} color={Colors.surface} />
      </View>
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={[styles.message, !notification.lu && styles.messageUnread]}>{notification.message}</Text>
          {!notification.lu ? <View style={styles.dot} /> : null}
        </View>
        <Text style={styles.date}>{formatRelative(notification.dateEnvoi)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
  },
  unread: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  read: {
    backgroundColor: '#F9F9F9',
  },
  pressed: {
    opacity: 0.82,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: Spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  message: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    lineHeight: 19,
  },
  messageUnread: {
    color: Colors.textPrimary,
    fontWeight: FontWeight.medium,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginTop: 6,
  },
  date: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
});

const iconToneByType = StyleSheet.create({
  event_confirmation: { backgroundColor: Colors.success },
  event_cancelled: { backgroundColor: Colors.danger },
  reminder: { backgroundColor: '#F59E0B' },
  announcement: { backgroundColor: Colors.primary },
});
