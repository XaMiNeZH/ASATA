import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';

import { AppHeader } from '../../components/common/AppHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EventCard } from '../../components/events/EventCard';
import { Colors } from '../../constants/colors';
import { NotificationItem } from '../../components/notifications/NotificationItem';
import { useEvents } from '../../hooks/useEvents';
import { useNotifications } from '../../hooks/useNotifications';
import { useAuthStore } from '../../store/auth.store';
import { useNotificationsStore } from '../../store/notifications.store';
import type { HomeStackParamList, MainTabParamList } from '../../types';
import { styles } from './HomeScreen.styles';

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
      <View style={styles.screen}>
        <ErrorMessage
          message={eventsState.error ?? notificationsState.error ?? 'Chargement impossible.'}
          onRetry={() => {
            void eventsState.retry();
            void notificationsState.retry();
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <AppHeader
        title={`Bonjour, ${user?.nom?.split(' ')[0] ?? 'Membre'}`}
        unreadCount={unreadCount}
        onBellPress={() => navigation.navigate('Notifications')}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.networkCard}>
          <View>
            <Text style={styles.eyebrow}>ÉTAT DU RÉSEAU</Text>
            <Text style={styles.networkTitle}>Élite Performance Hub</Text>
            <View style={styles.networkStats}>
              <View>
                <Text style={styles.statLabel}>Membres actifs</Text>
                <Text style={styles.statValue}>1,284</Text>
              </View>
              <View style={styles.statDivider} />
              <View>
                <Text style={styles.statLabel}>Nouveaux events</Text>
                <Text style={styles.statValue}>12</Text>
              </View>
            </View>
          </View>
          <Feather name="bar-chart-2" size={72} color={Colors.whiteOverlay10} />
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Prochains événements</Text>
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
                    variant="feature"
                    onPress={() =>
                      tabNavigation?.navigate('Activites', { screen: 'EventDetail', params: { eventId: item.id } })
                    }
                  />
                </View>
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.eventList}
            />
          ) : (
            <EmptyState icon="calendar" title="Aucun evenement" subtitle="Les prochaines activites apparaitront ici." />
          )}
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.notificationTitle}>
              <Text style={styles.sectionTitle}>Notifications</Text>
              {unreadCount > 0 ? <Text style={styles.count}>{unreadCount}</Text> : null}
            </View>
            <Pressable style={styles.linkButton} onPress={() => navigation.navigate('Notifications')}>
              <Text style={styles.link}>Marquer lu</Text>
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
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activité du réseau</Text>
          <View style={styles.activityGrid}>
            <View style={styles.activityCard}>
              <Feather name="trending-up" size={22} color={Colors.skyBlue} />
              <Text style={styles.activityValue}>+12%</Text>
              <Text style={styles.activityLabel}>Engagement</Text>
            </View>
            <View style={styles.activityCard}>
              <Feather name="check-circle" size={22} color={Colors.success} />
              <Text style={styles.activityValue}>18/20</Text>
              <Text style={styles.activityLabel}>Objectifs</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
