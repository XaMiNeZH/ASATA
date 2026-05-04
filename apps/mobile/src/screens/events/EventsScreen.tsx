import { useState } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppHeader } from '../../components/common/AppHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EventCard } from '../../components/events/EventCard';
import { Colors } from '../../constants/colors';
import { useEvents } from '../../hooks/useEvents';
import type { EventStatus, EventsStackParamList } from '../../types';

type EventsNavigation = NativeStackNavigationProp<EventsStackParamList, 'Events'>;
type FilterKey = 'all' | 'planifie' | 'en_cours' | 'termine' | 'annule';

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all',      label: 'Tous' },
  { key: 'planifie', label: 'Planifié' },
  { key: 'en_cours', label: 'En cours' },
  { key: 'termine',  label: 'Terminé' },
  { key: 'annule',   label: 'Annulé' },
];

export function EventsScreen() {
  const navigation = useNavigation<EventsNavigation>();
  const { events, isLoading, isRefreshing, error, refresh, retry } = useEvents();
  const [filter, setFilter] = useState<FilterKey>('all');
  const [search, setSearch] = useState('');

  const filtered = events
    .filter((e) => filter === 'all' || e.statut === (filter as EventStatus))
    .filter((e) => !search || e.titre.toLowerCase().includes(search.toLowerCase()));

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <View style={styles.screen}>
        <ErrorMessage message={error} onRetry={retry} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Header block */}
      <View style={styles.headerBlock}>
        <View style={styles.titleRow}>
          <Text style={styles.screenTitle}>Activités</Text>
          <Pressable style={styles.filterIconBtn}>
            <Feather name="sliders" size={18} color={Colors.primary} />
          </Pressable>
        </View>

        {/* Search bar */}
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color={Colors.subtle} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Rechercher un événement…"
            placeholderTextColor={Colors.subtle}
            style={styles.searchInput}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <Feather name="x" size={16} color={Colors.subtle} />
            </Pressable>
          )}
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chips}
          contentContainerStyle={styles.chipsContent}
        >
          {filters.map((f) => {
            const active = f.key === filter;
            return (
              <Pressable
                key={f.key}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setFilter(f.key)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {f.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListHeaderComponent={
          <Text style={styles.countLabel}>
            {filtered.length} événement{filtered.length !== 1 ? 's' : ''} · triés par date
          </Text>
        }
        ListEmptyComponent={
          <EmptyState
            icon="calendar"
            title="Aucun événement"
            subtitle="Changez le filtre ou la recherche."
          />
        }
        refreshing={isRefreshing}
        onRefresh={() => void refresh()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryGhost,
  },

  // Header
  headerBlock: {
    backgroundColor: Colors.surface,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairline,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 12,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.primaryDark,
    letterSpacing: -0.5,
  },
  filterIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.primaryGhost,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: Colors.primaryGhost,
    borderWidth: 1.5,
    borderColor: Colors.hairline,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.body,
    padding: 0,
  },

  // Filter chips
  chips: {
    maxHeight: 40,
  },
  chipsContent: {
    paddingHorizontal: 20,
    gap: 8,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.hairline,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.body,
  },
  chipTextActive: {
    color: '#fff',
  },

  // List
  list: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 96,
    gap: 0,
  },
  sep: {
    height: 12,
  },
  countLabel: {
    fontSize: 12,
    color: Colors.subtle,
    fontWeight: '500',
    paddingHorizontal: 4,
    marginBottom: 10,
  },
});
