import { useState } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EventCard } from '../../components/events/EventCard';
import { useEvents } from '../../hooks/useEvents';
import type { EventStatus, EventsStackParamList } from '../../types';
import { styles } from './EventsScreen.styles';

type EventsNavigation = NativeStackNavigationProp<EventsStackParamList, 'Events'>;
type FilterKey = 'all' | 'upcoming' | 'finished' | 'cancelled';

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'upcoming', label: 'A venir' },
  { key: 'finished', label: 'Termines' },
  { key: 'cancelled', label: 'Annules' },
];

const statusByFilter: Partial<Record<FilterKey, EventStatus>> = {
  upcoming: 'planifie',
  finished: 'termine',
  cancelled: 'annule',
};

export function EventsScreen() {
  const navigation = useNavigation<EventsNavigation>();
  const { events, isLoading, isRefreshing, error, refresh, retry } = useEvents();
  const [filter, setFilter] = useState<FilterKey>('all');
  const filteredEvents =
    filter === 'all' ? events : events.filter((event) => event.statut === statusByFilter[filter]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.screen}>
        <ErrorMessage message={error} onRetry={retry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filters}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((item) => (
          <Pressable
            key={item.key}
            style={[styles.chip, filter === item.key && styles.chipActive]}
            onPress={() => setFilter(item.key)}
          >
            <Text style={[styles.chipText, filter === item.key && styles.chipTextActive]}>{item.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard event={item} onPress={() => navigation.navigate('EventDetail', { eventId: item.id })} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<EmptyState icon="calendar" title="Aucun evenement" subtitle="Changez le filtre." />}
        refreshing={isRefreshing}
        onRefresh={() => {
          void refresh();
        }}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}
