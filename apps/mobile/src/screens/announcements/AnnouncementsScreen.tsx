import { useEffect, useState } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, Text, View } from 'react-native';

import { AppHeader } from '../../components/common/AppHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { getAnnouncements } from '../../services/announcements.service';
import type { AnnouncementsStackParamList, Annonce } from '../../types';
import { formatDate } from '../../utils/date';
import { styles } from './AnnouncementsScreen.styles';

type AnnouncementsNavigation = NativeStackNavigationProp<AnnouncementsStackParamList, 'Announcements'>;

const categories = ['Priority', 'General', 'Training', 'Urgent'];

export function AnnouncementsScreen() {
  const navigation = useNavigation<AnnouncementsNavigation>();
  const [announcements, setAnnouncements] = useState<Annonce[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAnnouncements = async (refreshing = false): Promise<void> => {
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
    void loadAnnouncements();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <View style={styles.screen}>
        <ErrorMessage message={error} onRetry={() => void loadAnnouncements()} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <AppHeader title="ANNONCES" />
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.heroCopy}>
            <Text style={styles.screenTitle}>Latest Updates</Text>
            <Text style={styles.screenSubtitle}>Stay informed about the newest developments in the association.</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('AnnouncementDetail', { annonceId: item.id })}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          >
            <View style={styles.cardContent}>
              <View style={styles.metaRow}>
                <Text style={[styles.category, index % categories.length === 3 && styles.categoryUrgent]}>
                  {categories[index % categories.length]}
                </Text>
                <Text style={styles.date}>{formatDate(item.datePublication)}</Text>
              </View>
              <Text numberOfLines={2} style={styles.title}>
                {item.titre}
              </Text>
              <Text numberOfLines={2} style={styles.preview}>
                {item.contenu}
              </Text>
              <Text style={styles.readLink}>Read full announcement ›</Text>
            </View>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<EmptyState icon="bell" title="Aucune annonce" subtitle="Les annonces apparaitront ici." />}
        refreshing={isRefreshing}
        onRefresh={() => void loadAnnouncements(true)}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
