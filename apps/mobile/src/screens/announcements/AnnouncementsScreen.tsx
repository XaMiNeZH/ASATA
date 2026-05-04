import { useEffect, useState } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Colors } from '../../constants/colors';
import { getAnnouncements } from '../../services/announcements.service';
import type { AnnouncementsStackParamList, Annonce } from '../../types';
import { formatDate } from '../../utils/date';

type AnnouncementsNavigation = NativeStackNavigationProp<AnnouncementsStackParamList, 'Announcements'>;

export function AnnouncementsScreen() {
  const navigation = useNavigation<AnnouncementsNavigation>();
  const insets = useSafeAreaInsets();

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

  useEffect(() => { void loadAnnouncements(); }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    return (
      <View style={styles.screen}>
        <ErrorMessage message={error} onRetry={() => void loadAnnouncements()} />
      </View>
    );
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Annonces</Text>
        <Text style={styles.screenSub}>Actualités du club et communiqués</Text>
      </View>

      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Card
            padding={14}
            radius={18}
            onPress={() => navigation.navigate('AnnouncementDetail', { annonceId: item.id })}
          >
            <View style={styles.itemRow}>
              {/* Icon */}
              <View style={[styles.itemIcon, index === 0 && styles.itemIconPrimary]}>
                <Feather
                  name="volume-2"
                  size={20}
                  color={index === 0 ? '#fff' : Colors.primary}
                />
              </View>

              {/* Body */}
              <View style={styles.itemBody}>
                <View style={styles.metaRow}>
                  {index === 0 && (
                    <Text style={styles.newBadge}>Nouveau</Text>
                  )}
                  <Text style={styles.date}>{formatDate(item.datePublication)}</Text>
                </View>
                <Text numberOfLines={2} style={styles.itemTitle}>{item.titre}</Text>
                <Text
                  numberOfLines={2}
                  style={styles.excerpt}
                >
                  {item.contenu}
                </Text>
              </View>

              <Feather name="chevron-right" size={18} color={Colors.subtle} style={styles.chevron} />
            </View>
          </Card>
        )}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListEmptyComponent={
          <EmptyState
            icon="volume-2"
            title="Aucune annonce"
            subtitle="Les annonces apparaîtront ici."
          />
        }
        refreshing={isRefreshing}
        onRefresh={() => void loadAnnouncements(true)}
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
  header: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairline,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.primaryDark,
    letterSpacing: -0.5,
  },
  screenSub: {
    fontSize: 13,
    color: Colors.subtle,
    marginTop: 4,
  },

  // List
  list: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 96,
  },
  sep: {
    height: 12,
  },

  // Item
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  itemIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primaryPale,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  itemIconPrimary: {
    backgroundColor: Colors.primary,
  },
  itemBody: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  newBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    backgroundColor: Colors.primaryPale,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  date: {
    fontSize: 11,
    color: Colors.subtle,
    fontWeight: '500',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.body,
    letterSpacing: -0.2,
    lineHeight: 20,
  },
  excerpt: {
    fontSize: 13,
    color: Colors.subtle,
    lineHeight: 18,
  },
  chevron: {
    marginTop: 2,
    flexShrink: 0,
  },
});
