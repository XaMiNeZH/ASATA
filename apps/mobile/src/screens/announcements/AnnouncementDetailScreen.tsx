import { useEffect, useState } from 'react';
import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { getAnnouncementById } from '../../services/announcements.service';
import type { AnnouncementsStackParamList, Annonce } from '../../types';
import { formatDate } from '../../utils/date';

type AnnouncementDetailRoute = RouteProp<AnnouncementsStackParamList, 'AnnouncementDetail'>;

export function AnnouncementDetailScreen() {
  const route = useRoute<AnnouncementDetailRoute>();
  const [announcement, setAnnouncement] = useState<Annonce | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAnnouncement = async (): Promise<void> => {
    setError(null);
    setIsLoading(true);
    try {
      setAnnouncement(await getAnnouncementById(route.params.annonceId));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Impossible de charger cette annonce.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadAnnouncement();
  }, [route.params.annonceId]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!announcement || error) {
    return (
      <SafeAreaView style={styles.screen}>
        <ErrorMessage message={error ?? 'Annonce introuvable.'} onRetry={loadAnnouncement} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{announcement.titre}</Text>
        <Text style={styles.date}>{formatDate(announcement.datePublication)}</Text>
        <Text style={styles.body}>{announcement.contenu}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
  },
  content: {
    gap: Spacing.md,
    paddingVertical: Spacing.md,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
  },
  date: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
  },
  body: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    lineHeight: 23,
  },
});
