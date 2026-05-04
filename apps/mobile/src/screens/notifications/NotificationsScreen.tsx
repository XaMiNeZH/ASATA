import { Feather } from '@expo/vector-icons';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Colors } from '../../constants/colors';
import { useNotifications } from '../../hooks/useNotifications';
import { useAuthStore } from '../../store/auth.store';
import type { Notification } from '../../types';

type NotificationType = Notification['type'];

const ICON_CONFIG: Record<NotificationType, { icon: string; bg: string; fg: string }> = {
  event_confirmation: { icon: 'check-circle', bg: Colors.statusEnCoursBg, fg: Colors.statusEnCours },
  event_cancelled:    { icon: 'x-circle',     bg: Colors.statusAnnuleBg,  fg: Colors.statusAnnule },
  announcement:       { icon: 'volume-2',     bg: Colors.primaryPale,     fg: Colors.primary },
  reminder:           { icon: 'bell',         bg: Colors.primaryPale,     fg: Colors.primary },
};

const TYPE_TITLES: Record<NotificationType, string> = {
  event_confirmation: 'Inscription confirmée',
  event_cancelled:    'Événement annulé',
  announcement:       'Annonce',
  reminder:           'Rappel',
};

function formatRelativeTime(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return "À l'instant";
  if (h < 24) return `Il y a ${h}h`;
  const d = Math.floor(h / 24);
  if (d === 1) return 'Hier';
  return `Il y a ${d} j`;
}

export function NotificationsScreen() {
  const user = useAuthStore((state) => state.user);
  const { notifications, isLoading, error, retry, markRead, markAllRead } = useNotifications(user?.id);
  const insets = useSafeAreaInsets();

  const unreadCount = notifications.filter((n) => !n.lu).length;

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    return (
      <View style={styles.screen}>
        <ErrorMessage message={error} onRetry={retry} />
      </View>
    );
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Pressable style={styles.backButton}>
            <Feather name="chevron-left" size={22} color={Colors.primary} />
          </Pressable>
          <Pressable
            disabled={!unreadCount}
            onPress={() => void markAllRead()}
          >
            <Text style={[styles.markAllText, !unreadCount && styles.markAllDisabled]}>
              Tout marquer comme lu
            </Text>
          </Pressable>
        </View>
        <Text style={styles.screenTitle}>Notifications</Text>
        {unreadCount > 0 && (
          <Text style={styles.screenSub}>{unreadCount} non lue{unreadCount !== 1 ? 's' : ''}</Text>
        )}
      </View>

      {/* List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const cfg = ICON_CONFIG[item.type] ?? ICON_CONFIG.reminder;
          const title = TYPE_TITLES[item.type] ?? 'Notification';
          return (
            <Pressable
              style={[styles.notifRow, !item.lu && styles.notifRowUnread]}
              onPress={() => void markRead(item.id)}
            >
              {/* Unread dot */}
              {!item.lu && <View style={styles.unreadDot} />}
              {/* Icon */}
              <View style={[styles.notifIcon, { backgroundColor: cfg.bg }]}>
                <Feather name={cfg.icon as any} size={19} color={cfg.fg} />
              </View>
              {/* Body */}
              <View style={styles.notifBody}>
                <View style={styles.notifTopRow}>
                  <Text style={styles.notifTitle} numberOfLines={1}>{title}</Text>
                  <Text style={styles.notifTime}>
                    {item.dateEnvoi ? formatRelativeTime(item.dateEnvoi) : ''}
                  </Text>
                </View>
                <Text style={styles.notifMsg} numberOfLines={2}>{item.message}</Text>
              </View>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListEmptyComponent={
          <EmptyState
            icon="bell"
            title="Aucune notification"
            subtitle="Vous êtes à jour."
          />
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.surface,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairline,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.primaryGhost,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markAllText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '700',
  },
  markAllDisabled: {
    opacity: 0.4,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.primaryDark,
    letterSpacing: -0.5,
  },
  screenSub: {
    fontSize: 13,
    color: Colors.subtle,
    marginTop: 2,
  },

  // List
  list: {
    paddingBottom: 96,
  },
  sep: {
    height: 1,
    backgroundColor: Colors.hairline,
  },

  // Notification row
  notifRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: Colors.surface,
    position: 'relative',
  },
  notifRowUnread: {
    backgroundColor: Colors.primaryGhost,
  },
  unreadDot: {
    position: 'absolute',
    left: 8,
    top: '50%',
    marginTop: -3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  notifIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  notifBody: {
    flex: 1,
    minWidth: 0,
    gap: 3,
  },
  notifTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.body,
    letterSpacing: -0.1,
    flex: 1,
  },
  notifTime: {
    fontSize: 11,
    color: Colors.subtle,
    fontWeight: '500',
    flexShrink: 0,
  },
  notifMsg: {
    fontSize: 13,
    color: Colors.subtle,
    lineHeight: 19,
  },
});
