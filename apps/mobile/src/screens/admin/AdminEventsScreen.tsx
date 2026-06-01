import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Alert, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../components/common/AppHeader';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Colors } from '../../constants/colors';
import { useEvents } from '../../hooks/useEvents';
import { deleteEvent } from '../../services/admin.service';
import type { AdminStackParamList, Evenement, EventStatus } from '../../types';
import { formatDate } from '../../utils/date';
import { styles } from './AdminEventsScreen.styles';

type AdminEventsNavigation = NativeStackNavigationProp<AdminStackParamList, 'AdminEvents'>;

const statusLabels: Record<EventStatus, string> = {
  planifie: 'Planifié',
  en_cours: 'En cours',
  termine: 'Terminé',
  annule: 'Annulé',
};

export function AdminEventsScreen() {
  const navigation = useNavigation<AdminEventsNavigation>();
  const { events, isLoading, isRefreshing, error, refresh, retry } = useEvents();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (event: Evenement): void => {
    Alert.alert(
      "Supprimer l'événement",
      `Voulez-vous vraiment supprimer "${event.titre}" ? Cette action est irréversible.`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            setDeletingId(event.id);
            try {
              await deleteEvent(event.id);
              await refresh();
            } catch (caught) {
              Alert.alert('Erreur', caught instanceof Error ? caught.message : 'Suppression impossible.');
            } finally {
              setDeletingId(null);
            }
          },
        },
      ]
    );
  };

  const renderEvent = ({ item }: { item: Evenement }) => (
    <Card>
      <View style={styles.row}>
        <View style={styles.rowBody}>
          <Text numberOfLines={1} style={styles.title}>
            {item.titre}
          </Text>
          <Text numberOfLines={1} style={styles.meta}>
            {formatDate(item.date)} · {item.lieu}
          </Text>
          <Badge label={statusLabels[item.statut]} status={item.statut} />
        </View>
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('AdminEventForm', { eventId: item.id })}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            <Feather name="edit-2" size={19} color={Colors.primary} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            disabled={deletingId === item.id}
            onPress={() => handleDelete(item)}
            style={({ pressed }) => [styles.iconButton, styles.deleteButton, pressed && styles.pressed]}
          >
            {deletingId === item.id ? (
              <ActivityIndicator size="small" color={Colors.error} />
            ) : (
              <Feather name="trash-2" size={19} color={Colors.error} />
            )}
          </Pressable>
        </View>
      </View>
    </Card>
  );

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return (
        <View style={styles.state}>
          <ErrorMessage message={error} onRetry={retry} />
        </View>
      );
    }

    return (
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<EmptyState icon="calendar" title="Aucun événement" subtitle="Créez le premier événement." />}
        refreshing={isRefreshing}
        onRefresh={() => void refresh()}
        contentContainerStyle={styles.listContent}
      />
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.screen}>
      <AppHeader title="Gestion des Événements" onBack={navigation.goBack} />
      {renderContent()}
      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.navigate('AdminEventForm', {})}
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
      >
        <Feather name="plus" size={30} color={Colors.surface} />
      </Pressable>
    </SafeAreaView>
  );
}
