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
  event_confirmation: 'calendar',
  event_cancelled: 'x',
  reminder: 'clock',
  announcement: 'volume-2',
};

const titleByType: Record<Notification['type'], string> = {
  event_confirmation: 'Nouvel Événement',
  event_cancelled: 'Événement annulé',
  reminder: 'Rappel de Cotisation',
  announcement: 'Annonce Importante',
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
      <View style={[styles.iconBox, iconTone]}>
        <Feather name={iconByType[notification.type]} size={22} color={notification.lu ? Colors.textMuted : Colors.primary} />
      </View>
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={[styles.title, notification.lu && styles.titleRead]}>{titleByType[notification.type]}</Text>
          <Text style={[styles.date, !notification.lu && styles.dateUnread]}>{formatRelative(notification.dateEnvoi)}</Text>
        </View>
        <Text style={[styles.message, notification.lu && styles.messageRead]}>{notification.message}</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  read: {
    backgroundColor: Colors.surfaceContainerLow,
    opacity: 0.75,
  },
  pressed: {
    opacity: 0.82,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
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
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  title: {
    flex: 1,
    color: Colors.primaryDark,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semiBold,
  },
  titleRead: {
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  message: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    lineHeight: 22,
  },
  messageRead: {
    color: Colors.textMuted,
  },
  date: {
    color: Colors.textMuted,
    fontSize: FontSize.tab,
    fontWeight: FontWeight.medium,
    textTransform: 'uppercase',
  },
  dateUnread: {
    color: Colors.skyBlue,
  },
});

const iconToneByType = StyleSheet.create({
  event_confirmation: { backgroundColor: Colors.secondaryContainer },
  event_cancelled: { backgroundColor: Colors.errorContainer },
  reminder: { backgroundColor: Colors.surfaceContainer },
  announcement: { backgroundColor: Colors.secondaryContainer },
});
