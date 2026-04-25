import { useEffect, useState } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { getAnnouncements } from '../../services/announcements.service';
import type { AnnouncementsStackParamList, Annonce } from '../../types';
import { formatDate } from '../../utils/date';

type AnnouncementsNavigation = NativeStackNavigationProp<AnnouncementsStackParamList, 'Announcements'>;

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
      <SafeAreaView style={styles.screen}>
        <ErrorMessage message={error} onRetry={() => void loadAnnouncements()} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card onPress={() => navigation.navigate('AnnouncementDetail', { annonceId: item.id })}>
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.titre}</Text>
              <Text style={styles.date}>{formatDate(item.datePublication)}</Text>
              <Text style={styles.preview}>{item.contenu}</Text>
            </View>
          </Card>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<EmptyState icon="bell" title="Aucune annonce" subtitle="Les annonces apparaitront ici." />}
        refreshing={isRefreshing}
        onRefresh={() => void loadAnnouncements(true)}
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
  listContent: {
    paddingVertical: Spacing.md,
  },
  cardContent: {
    gap: Spacing.sm,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
  date: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
  },
  preview: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
  },
  separator: {
    height: Spacing.md,
  },
});
