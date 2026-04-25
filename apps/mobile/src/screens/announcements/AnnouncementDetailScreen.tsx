import { useEffect, useState } from 'react';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Colors } from '../../constants/colors';
import { getAnnouncementById } from '../../services/announcements.service';
import type { AnnouncementsStackParamList, Annonce } from '../../types';
import { formatDate } from '../../utils/date';
import { styles } from './AnnouncementDetailScreen.styles';

type AnnouncementDetailRoute = RouteProp<AnnouncementsStackParamList, 'AnnouncementDetail'>;
type AnnouncementDetailNavigation = NativeStackNavigationProp<AnnouncementsStackParamList, 'AnnouncementDetail'>;

export function AnnouncementDetailScreen() {
  const route = useRoute<AnnouncementDetailRoute>();
  const navigation = useNavigation<AnnouncementDetailNavigation>();
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
    <View style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <View style={styles.headerTop}>
          <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="chevron-left" size={26} color={Colors.surface} />
          </Pressable>
        </View>
        <Text numberOfLines={3} style={styles.headerTitle}>
          {announcement.titre}
        </Text>
      </SafeAreaView>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.date}>{formatDate(announcement.datePublication)}</Text>
          <Text style={styles.body}>{announcement.contenu}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
