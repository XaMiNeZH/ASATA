import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import type { Notification } from '../../types';
import { formatRelative } from '../../utils/date';

interface NotificationItemProps {
  notification: Notification;
  onPress: () => void;
}

export function NotificationItem({ notification, onPress }: NotificationItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.container, !notification.lu && styles.unread, pressed && styles.pressed]}
    >
      <View style={styles.header}>
        <Text style={[styles.message, !notification.lu && styles.messageUnread]}>{notification.message}</Text>
        {!notification.lu ? <View style={styles.dot} /> : null}
      </View>
      <Text style={styles.date}>{formatRelative(notification.dateEnvoi)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 64,
    gap: Spacing.xs,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
  },
  unread: {
    borderColor: Colors.primaryLight,
    backgroundColor: Colors.primaryGhost,
  },
  pressed: {
    opacity: 0.82,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  message: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: FontSize.md,
  },
  messageUnread: {
    color: Colors.textPrimary,
    fontWeight: FontWeight.bold,
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
    fontSize: FontSize.sm,
  },
});
