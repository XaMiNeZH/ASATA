import { useEffect, useState } from 'react';
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
import { deleteAnnouncement } from '../../services/admin.service';
import { getAnnouncements } from '../../services/announcements.service';
import type { AdminStackParamList, Annonce } from '../../types';
import { formatDate } from '../../utils/date';
import { styles } from './AdminAnnouncementsScreen.styles';

type AdminAnnouncementsNavigation = NativeStackNavigationProp<AdminStackParamList, 'AdminAnnouncements'>;

const getPreview = (content: string): string =>
  content.length > 60 ? `${content.slice(0, 60).trim()}...` : content;

export function AdminAnnouncementsScreen() {
  const navigation = useNavigation<AdminAnnouncementsNavigation>();
  const [announcements, setAnnouncements] = useState<Annonce[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async (refreshing = false): Promise<void> => {
    setError(null);
    refreshing ? setIsRefreshing(true) : setIsLoading(true);
    try {
      setAnnouncements(await getAnnouncements());
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Impossible de charger les annonces.');
    } finally {
      refreshing ? setIsRefreshing(false) : setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleDelete = (announcement: Annonce): void => {
    Alert.alert('Supprimer l’annonce', `Supprimer "${announcement.titre}" ?`, [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          setDeletingId(announcement.id);
          try {
            await deleteAnnouncement(announcement.id);
            await load(true);
          } catch (caught) {
            Alert.alert('Erreur', caught instanceof Error ? caught.message : 'Suppression impossible.');
          } finally {
            setDeletingId(null);
          }
        },
      },
    ]);
  };

  const renderAnnouncement = ({ item }: { item: Annonce }) => (
    <Card>
      <View style={styles.cardContent}>
        <View style={styles.metaRow}>
          <Badge label={item.visible ? 'Visible' : 'Cachée'} status={item.visible ? 'actif' : 'inactif'} />
          <Text style={styles.date}>{formatDate(item.datePublication)}</Text>
        </View>
        <Text numberOfLines={2} style={styles.title}>
          {item.titre}
        </Text>
        <Text numberOfLines={2} style={styles.preview}>
          {getPreview(item.contenu)}
        </Text>
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('AdminAnnouncementForm', { annonceId: item.id })}
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
    if (isLoading) return <LoadingSpinner />;
    if (error) {
      return (
        <View style={styles.state}>
          <ErrorMessage message={error} onRetry={() => void load()} />
        </View>
      );
    }

    return (
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        renderItem={renderAnnouncement}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<EmptyState icon="bell" title="Aucune annonce" subtitle="Créez la première annonce." />}
        refreshing={isRefreshing}
        onRefresh={() => void load(true)}
        contentContainerStyle={styles.listContent}
      />
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.screen}>
      <AppHeader title="Gestion des Annonces" onBack={() => navigation.goBack()} />
      {renderContent()}
      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.navigate('AdminAnnouncementForm', {})}
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
      >
        <Feather name="plus" size={30} color={Colors.surface} />
      </Pressable>
    </SafeAreaView>
  );
}
