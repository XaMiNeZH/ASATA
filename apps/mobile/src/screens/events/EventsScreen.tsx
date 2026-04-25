import { useState } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EventCard } from '../../components/events/EventCard';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { useEvents } from '../../hooks/useEvents';
import type { EventStatus, EventsStackParamList } from '../../types';

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
      <View style={styles.filters}>
        {filters.map((item) => (
          <Pressable
            key={item.key}
            style={[styles.chip, filter === item.key && styles.chipActive]}
            onPress={() => setFilter(item.key)}
          >
            <Text style={[styles.chipText, filter === item.key && styles.chipTextActive]}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
  },
  filters: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
  },
  chip: {
    minHeight: 44,
    justifyContent: 'center',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.surface,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  chipTextActive: {
    color: Colors.surface,
  },
  listContent: {
    paddingBottom: Spacing.xl,
  },
  separator: {
    height: Spacing.md,
  },
});
