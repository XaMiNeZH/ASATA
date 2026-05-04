import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Colors } from '../../constants/colors';
import { getAnnouncementById } from '../../services/announcements.service';
import type { AnnouncementsStackParamList, Annonce } from '../../types';
import { formatDate } from '../../utils/date';

type AnnouncementDetailRoute = RouteProp<AnnouncementsStackParamList, 'AnnouncementDetail'>;
type AnnouncementDetailNavigation = NativeStackNavigationProp<AnnouncementsStackParamList, 'AnnouncementDetail'>;

export function AnnouncementDetailScreen() {
  const route = useRoute<AnnouncementDetailRoute>();
  const navigation = useNavigation<AnnouncementDetailNavigation>();
  const insets = useSafeAreaInsets();

  const [announcement, setAnnouncement] = useState<Annonce | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAnnouncement = async (): Promise<void> => {
    setError(null); setIsLoading(true);
    try {
      setAnnouncement(await getAnnouncementById(route.params.annonceId));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Impossible de charger cette annonce.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { void loadAnnouncement(); }, [route.params.annonceId]);

  if (isLoading) return <LoadingSpinner />;
  if (!announcement || error) {
    return (
      <View style={styles.screen}>
        <ErrorMessage message={error ?? 'Annonce introuvable.'} onRetry={loadAnnouncement} />
      </View>
    );
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Back row */}
      <View style={styles.backRow}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={22} color={Colors.primary} strokeWidth={2.4} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Eyebrow */}
        <View style={styles.eyebrow}>
          <Feather name="volume-2" size={12} color={Colors.primary} />
          <Text style={styles.eyebrowText}>Annonce</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{announcement.titre}</Text>

        {/* Meta */}
        <View style={styles.metaRow}>
          <Feather name="calendar" size={13} color={Colors.subtle} />
          <Text style={styles.metaText}>{formatDate(announcement.datePublication)}</Text>
          <View style={styles.metaDot} />
          <Feather name="clock" size={13} color={Colors.subtle} />
          <Text style={styles.metaText}>2 min de lecture</Text>
        </View>

        {/* Photo placeholder */}
        <View style={styles.photoPlaceholder}>
          <View style={styles.photoInner}>
            <Text style={styles.photoLabel}>photo · cérémonie</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Body */}
        <Text style={styles.body}>{announcement.contenu}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.surface,
  },

  // Back
  backRow: {
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 4,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.primaryGhost,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Content
  content: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    gap: 16,
  },

  // Eyebrow
  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.primaryPale,
    borderRadius: 999,
  },
  eyebrowText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryDark,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },

  // Title
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.primaryDark,
    letterSpacing: -0.5,
    lineHeight: 32,
  },

  // Meta
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: Colors.subtle,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.hairline,
  },

  // Photo placeholder
  photoPlaceholder: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.primaryGhost,
    borderWidth: 1,
    borderColor: Colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoInner: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  photoLabel: {
    fontSize: 11,
    color: Colors.primaryDark,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    fontFamily: 'monospace',
  },

  divider: {
    height: 1,
    backgroundColor: Colors.hairline,
  },

  // Body
  body: {
    fontSize: 15,
    color: Colors.body,
    lineHeight: 24,
  },
});
