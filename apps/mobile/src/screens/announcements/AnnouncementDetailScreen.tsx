import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { AppHeader } from '../../components/common/AppHeader';
import { Button } from '../../components/common/Button';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Colors } from '../../constants/colors';
import { getAnnouncementById } from '../../services/announcements.service';
import type { AnnouncementsStackParamList, Annonce } from '../../types';
import { formatDate } from '../../utils/date';
import { styles } from './AnnouncementDetailScreen.styles';

type AnnouncementDetailRoute = RouteProp<AnnouncementsStackParamList, 'AnnouncementDetail'>;
type AnnouncementDetailNavigation = NativeStackNavigationProp<AnnouncementsStackParamList, 'AnnouncementDetail'>;

const noop = (): void => undefined;

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
      <View style={styles.screen}>
        <ErrorMessage message={error ?? 'Annonce introuvable.'} onRetry={loadAnnouncement} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <AppHeader title="Announcement Detail" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroImage}>
          <Feather name="monitor" size={48} color={Colors.whiteOverlay60} />
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>IMPORTANT UPDATE</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.dateRow}>
            <Feather name="calendar" size={18} color={Colors.secondary} />
            <Text style={styles.date}>{formatDate(announcement.datePublication)}</Text>
          </View>
          <Text style={styles.title}>{announcement.titre}</Text>
          <Text style={styles.body}>{announcement.contenu}</Text>
          <View style={styles.quoteBox}>
            <Text style={styles.quote}>
              "Cette annonce marque une étape importante pour la communauté ASATA Connect."
            </Text>
          </View>
          <View style={styles.bulletList}>
            <View style={styles.bulletRow}>
              <Feather name="check-circle" size={18} color={Colors.skyBlue} />
              <Text style={styles.bulletText}>Accès complet aux informations membres.</Text>
            </View>
            <View style={styles.bulletRow}>
              <Feather name="check-circle" size={18} color={Colors.skyBlue} />
              <Text style={styles.bulletText}>Suivi simplifié depuis l'application.</Text>
            </View>
            <View style={styles.bulletRow}>
              <Feather name="check-circle" size={18} color={Colors.skyBlue} />
              <Text style={styles.bulletText}>Mises à jour synchronisées avec les prochains événements.</Text>
            </View>
          </View>
          <View style={styles.actions}>
            <Button label="Register for Summit" onPress={noop} variant="primary" />
            <Button label="Download Schedule (PDF)" onPress={noop} variant="secondary" />
          </View>
        </View>
        <Text style={styles.relatedTitle}>RELATED ANNOUNCEMENTS</Text>
        <Pressable accessibilityRole="button" style={styles.relatedCard}>
          <View style={styles.relatedThumb} />
          <View style={styles.relatedCopy}>
            <Text style={styles.relatedMeta}>PREVIOUS</Text>
            <Text numberOfLines={1} style={styles.relatedText}>
              New Performance Metrics Guidelines
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color={Colors.secondary} />
        </Pressable>
      </ScrollView>
    </View>
  );
}
