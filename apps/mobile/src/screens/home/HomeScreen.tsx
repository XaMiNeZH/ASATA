import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../../components/common/AppHeader';
import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EventCard } from '../../components/events/EventCard';
import { Colors } from '../../constants/colors';
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

  const upcomingEvents = eventsState.events
    .filter((e) => e.statut === 'planifie' || e.statut === 'en_cours')
    .slice(0, 4);

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

  const firstName = user?.nom?.split(' ')[0] ?? 'Membre';

  return (
    <View style={styles.screen}>
      <AppHeader
        showLogo
        unreadCount={unreadCount}
        onBellPress={() => navigation.navigate('Notifications')}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Bonjour, {firstName} 👋</Text>
          <Text style={styles.greetingSub}>Découvrez les prochains événements</Text>
        </View>

        {/* Quick stats */}
        <View style={styles.statsRow}>
          <Card padding={14} radius={16} style={styles.statCard}>
            <View style={styles.statInner}>
              <View style={styles.statIcon}>
                <Feather name="check-square" size={18} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.statNum}>{eventsState.events.filter((e) => e.statut === 'planifie').length}</Text>
                <Text style={styles.statLabel}>Mes inscriptions</Text>
              </View>
            </View>
          </Card>
          <Card padding={14} radius={16} style={styles.statCard}>
            <View style={styles.statInner}>
              <View style={styles.statIcon}>
                <Feather name="zap" size={18} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.statNum}>{eventsState.events.length}</Text>
                <Text style={styles.statLabel}>Événements dispo.</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Upcoming events — horizontal scroll */}
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Événements à venir</Text>
            <Pressable
              onPress={() => tabNavigation?.navigate('Activites', { screen: 'Events' })}
            >
              <Text style={styles.seeAll}>Tout voir</Text>
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
                      tabNavigation?.navigate('Activites', {
                        screen: 'EventDetail',
                        params: { eventId: item.id },
                      })
                    }
                  />
                </View>
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.eventList}
            />
          ) : (
            <EmptyState
              icon="calendar"
              title="Aucun événement"
              subtitle="Les prochaines activités apparaîtront ici."
            />
          )}
        </View>

        {/* Announcements preview */}
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dernières annonces</Text>
            <Pressable
              onPress={() => tabNavigation?.navigate('Annonces', { screen: 'Announcements' })}
            >
              <Text style={styles.seeAll}>Tout voir</Text>
            </Pressable>
          </View>
          <View style={styles.announcementsCol}>
            {[
              { titre: "Félicitations à notre équipe de ski !", date: "2 mai 2026" },
              { titre: "Inscription ouverte : Marathon de l'Atlas", date: "28 avril 2026" },
            ].map((item, i) => (
              <Card key={i} padding={14} radius={16}>
                <View style={styles.announcementRow}>
                  <View style={styles.announcementIcon}>
                    <Feather name="volume-2" size={18} color={Colors.primary} />
                  </View>
                  <View style={styles.announcementBody}>
                    <Text numberOfLines={2} style={styles.announcementTitle}>{item.titre}</Text>
                    <Text style={styles.announcementDate}>{item.date}</Text>
                  </View>
                  <Feather name="chevron-right" size={16} color={Colors.subtle} />
                </View>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryGhost,
  },
  content: {
    paddingBottom: 96,
    gap: 20,
    paddingTop: 4,
  },

  // Greeting
  greeting: {
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 4,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primaryDark,
    letterSpacing: -0.5,
    lineHeight: 30,
  },
  greetingSub: {
    fontSize: 14,
    color: Colors.subtle,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
  },
  statCard: {
    flex: 1,
  },
  statInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.primaryPale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNum: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primaryDark,
    letterSpacing: -0.5,
    lineHeight: 22,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.subtle,
    marginTop: 2,
    fontWeight: '500',
  },

  // Section
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.primaryDark,
    letterSpacing: -0.3,
  },
  seeAll: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },

  // Events list
  eventList: {
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
  eventItem: {
    marginRight: 14,
  },

  // Announcements
  announcementsCol: {
    paddingHorizontal: 20,
    gap: 10,
  },
  announcementRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  announcementIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.primaryPale,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  announcementBody: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  announcementTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.body,
    letterSpacing: -0.1,
    lineHeight: 19,
  },
  announcementDate: {
    fontSize: 11,
    color: Colors.subtle,
    marginTop: 2,
  },
});
