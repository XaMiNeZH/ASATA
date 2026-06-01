import { useEffect, useState } from 'react';
import type { ComponentProps } from 'react';
import { Feather } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../components/common/AppHeader';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Colors } from '../../constants/colors';
import { getEvents } from '../../services/events.service';
import { getAdminStats } from '../../services/admin.service';
import type { AdminStackParamList, AdminStats, Evenement } from '../../types';
import { formatDate } from '../../utils/date';
import { styles } from './AdminDashboardScreen.styles';

type AdminDashboardNavigation = NativeStackNavigationProp<AdminStackParamList, 'AdminDashboard'>;
type FeatherName = ComponentProps<typeof Feather>['name'];

const statIcons: FeatherName[] = ['users', 'calendar', 'clock', 'check-circle'];

export function AdminDashboardScreen() {
  const navigation = useNavigation<AdminDashboardNavigation>();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentEvents, setRecentEvents] = useState<Evenement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const [statsData, eventsData] = await Promise.all([getAdminStats(), getEvents()]);
      setStats(statsData);
      setRecentEvents(eventsData.slice(0, 3));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Erreur de chargement.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (error || !stats) {
      return (
        <View style={styles.state}>
          <ErrorMessage message={error ?? 'Erreur de chargement.'} onRetry={() => void load()} />
        </View>
      );
    }

    const statCards = [
      { label: 'Total membres', value: stats.totalMembers, route: 'AdminMembers' as const },
      { label: 'Total événements', value: stats.totalEvents, route: 'AdminEvents' as const },
      { label: 'À venir', value: stats.upcomingEvents, route: 'AdminEvents' as const },
      { label: 'Participations', value: stats.totalParticipations, route: 'AdminEvents' as const },
    ];

    return (
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Admin Dashboard</Text>
          <Text style={styles.heroText}>Pilotez les membres, événements et annonces ASATA depuis un espace central.</Text>
        </View>
        <View style={styles.statsGrid}>
          {statCards.map((item, index) => (
            <View key={item.label} style={styles.statWrapper}>
              <Card onPress={() => navigation.navigate(item.route)}>
                <View style={styles.statCard}>
                  <Feather name={statIcons[index]} size={28} color={Colors.skyBlue} />
                  <Text style={styles.statValue}>{item.value}</Text>
                  <Text style={styles.statLabel}>{item.label}</Text>
                </View>
              </Card>
            </View>
          ))}
        </View>
        <View style={styles.quickActions}>
          <Button label="Nouvel Événement" variant="primary" onPress={() => navigation.navigate('AdminEventForm', {})} />
          <Button
            label="Nouvelle Annonce"
            variant="primary"
            onPress={() => navigation.navigate('AdminAnnouncementForm', {})}
          />
        </View>
        <View style={styles.managementRow}>
          <Pressable style={styles.manageButton} onPress={() => navigation.navigate('AdminEvents')}>
            <Feather name="calendar" size={18} color={Colors.primary} />
            <Text style={styles.manageText}>Événements</Text>
          </Pressable>
          <Pressable style={styles.manageButton} onPress={() => navigation.navigate('AdminAnnouncements')}>
            <Feather name="volume-2" size={18} color={Colors.primary} />
            <Text style={styles.manageText}>Annonces</Text>
          </Pressable>
          <Pressable style={styles.manageButton} onPress={() => navigation.navigate('AdminMembers')}>
            <Feather name="users" size={18} color={Colors.primary} />
            <Text style={styles.manageText}>Membres</Text>
          </Pressable>
        </View>
        <Text style={styles.sectionTitle}>Événements récents</Text>
        {recentEvents.length === 0 ? (
          <EmptyState icon="calendar" title="Aucun événement" subtitle="Les prochains événements apparaitront ici." />
        ) : (
          recentEvents.map((event) => (
            <Card key={event.id} onPress={() => navigation.navigate('AdminEvents')}>
              <View style={styles.eventRow}>
                <View style={styles.eventIcon}>
                  <Feather name="calendar" size={20} color={Colors.surface} />
                </View>
                <View style={styles.eventBody}>
                  <Text numberOfLines={1} style={styles.eventTitle}>
                    {event.titre}
                  </Text>
                  <Text numberOfLines={1} style={styles.eventMeta}>
                    {formatDate(event.date)} · {event.lieu}
                  </Text>
                </View>
                <Feather name="chevron-right" size={20} color={Colors.border} />
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.screen}>
      <AppHeader title="Admin Dashboard" />
      {renderContent()}
    </SafeAreaView>
  );
}
