import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EventCard } from '../../components/events/EventCard';
import { NotificationItem } from '../../components/notifications/NotificationItem';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { useEvents } from '../../hooks/useEvents';
import { useNotifications } from '../../hooks/useNotifications';
import { useAuthStore } from '../../store/auth.store';
import { useNotificationsStore } from '../../store/notifications.store';
import type { HomeStackParamList, MainTabParamList } from '../../types';

type HomeNavigation = NativeStackNavigationProp<HomeStackParamList, 'Home'>;
type TabNavigation = BottomTabNavigationProp<MainTabParamList>;

export function HomeScreen() {
  const navigation = useNavigation<HomeNavigation>();
  const tabNavigation = navigation.getParent<TabNavigation>();
  const user = useAuthStore((state) => state.user);
  const unreadCount = useNotificationsStore((state) => state.unreadCount);
  const eventsState = useEvents();
  const notificationsState = useNotifications(user?.id);
  const upcomingEvents = eventsState.events.filter((event) => event.statut === 'planifie').slice(0, 3);
  const unreadNotifications = notificationsState.notifications.filter((item) => !item.lu).slice(0, 2);

  if (eventsState.isLoading || notificationsState.isLoading) {
    return <LoadingSpinner />;
  }

  if (eventsState.error || notificationsState.error) {
    return (
      <SafeAreaView style={styles.screen}>
        <ErrorMessage
          message={eventsState.error ?? notificationsState.error ?? 'Chargement impossible.'}
          onRetry={() => {
            void eventsState.retry();
            void notificationsState.retry();
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.greeting}>Bonjour, {user?.nom ?? 'membre'} 👋</Text>
          <Text style={styles.subtitle}>Retrouvez vos activites, annonces et notifications ASATA.</Text>
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Prochains evenements</Text>
          <Pressable style={styles.linkButton} onPress={() => tabNavigation?.navigate('Activites', { screen: 'Events' })}>
            <Text style={styles.link}>Voir tout</Text>
          </Pressable>
        </View>
        {upcomingEvents.length ? (
          <FlatList
            horizontal
            data={upcomingEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.eventItem}>
                <EventCard
                  event={item}
                  onPress={() => tabNavigation?.navigate('Activites', { screen: 'EventDetail', params: { eventId: item.id } })}
                />
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <EmptyState icon="calendar" title="Aucun evenement" subtitle="Les prochaines activites apparaitront ici." />
        )}
        <View style={styles.sectionHeader}>
          <View style={styles.notificationTitle}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <Text style={styles.count}>{unreadCount}</Text>
          </View>
          <Pressable style={styles.linkButton} onPress={() => navigation.navigate('Notifications')}>
            <Text style={styles.link}>Ouvrir</Text>
          </Pressable>
        </View>
        {unreadNotifications.length ? (
          <View style={styles.list}>
            {unreadNotifications.map((item) => (
              <NotificationItem
                key={item.id}
                notification={item}
                onPress={() => {
                  void notificationsState.markRead(item.id);
                }}
              />
            ))}
          </View>
        ) : (
          <EmptyState icon="bell" title="Aucune notification non lue" subtitle="Vous etes a jour." />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
  },
  content: {
    gap: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  hero: {
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
  },
  greeting: {
    color: Colors.primaryDark,
    fontSize: FontSize.display,
    fontWeight: FontWeight.bold,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  linkButton: {
    minHeight: 44,
    justifyContent: 'center',
  },
  link: {
    color: Colors.primary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  eventItem: {
    width: 320,
    marginRight: Spacing.md,
  },
  notificationTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  count: {
    minWidth: 26,
    borderRadius: 13,
    overflow: 'hidden',
    backgroundColor: Colors.primary,
    color: Colors.surface,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    textAlign: 'center',
    paddingVertical: Spacing.xs,
  },
  list: {
    gap: Spacing.sm,
  },
});
