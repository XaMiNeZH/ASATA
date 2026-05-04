import { useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Colors } from '../../constants/colors';
import { useParticipations } from '../../hooks/useParticipations';
import { useAuthStore } from '../../store/auth.store';
import type { Participation } from '../../types';
import { formatDate } from '../../utils/date';

type TabKey = 'upcoming' | 'past' | 'cancelled';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'upcoming',  label: 'À venir' },
  { key: 'past',      label: 'Passées' },
  { key: 'cancelled', label: 'Annulées' },
];

const STATUS_LABELS: Record<string, string> = {
  confirme: 'Confirmé', en_attente: 'En attente', annule: 'Annulé',
};

const SPORT_ICONS: Record<string, string> = {
  ski: 'wind', football: 'circle', athletisme: 'zap', natation: 'droplet', yoga: 'sun',
};

function isPast(p: Participation): boolean {
  if (!p.evenement) return false;
  return p.evenement.statut === 'termine' || Date.parse(p.evenement.date) < Date.now();
}

export function ParticipationsScreen() {
  const user = useAuthStore((state) => state.user);
  const { participations, isLoading, error, retry, cancelById } = useParticipations(user?.id);
  const insets = useSafeAreaInsets();

  const [tab, setTab] = useState<TabKey>('upcoming');
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleCancel = (id: string): void => {
    Alert.alert("Confirmer l'annulation", 'Voulez-vous vraiment annuler votre participation ?', [
      { text: 'Non', style: 'cancel' },
      {
        text: 'Oui, annuler', style: 'destructive',
        onPress: () => void doCancel(id),
      },
    ]);
  };

  const doCancel = async (id: string): Promise<void> => {
    setCancellingId(id); setActionError(null); setMessage(null);
    try {
      await cancelById(id);
      setMessage('Participation annulée.');
    } catch (caught) {
      setActionError(caught instanceof Error ? caught.message : 'Annulation impossible.');
    } finally {
      setCancellingId(null);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    return (
      <View style={styles.screen}>
        <ErrorMessage message={error} onRetry={retry} />
      </View>
    );
  }

  const byTab: Record<TabKey, Participation[]> = {
    upcoming:  participations.filter((p) => p.statut !== 'annule' && !isPast(p)),
    past:      participations.filter((p) => isPast(p) && p.statut !== 'annule'),
    cancelled: participations.filter((p) => p.statut === 'annule'),
  };

  const items = byTab[tab];

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Mes inscriptions</Text>
        <Text style={styles.screenSub}>{participations.length} inscriptions au total</Text>

        {/* Segmented tabs */}
        <View style={styles.tabBar}>
          {TABS.map((t) => {
            const active = t.key === tab;
            return (
              <Pressable
                key={t.key}
                style={[styles.tabItem, active && styles.tabItemActive]}
                onPress={() => setTab(t.key)}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>{t.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Feedback */}
      {message && (
        <View style={styles.successBox}>
          <Feather name="check-circle" size={15} color={Colors.statusEnCours} />
          <Text style={styles.successText}>{message}</Text>
        </View>
      )}
      {actionError && <ErrorMessage message={actionError} />}

      {/* List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const sportIcon = (SPORT_ICONS[item.evenement?.sport ?? ''] ?? 'zap') as any;
          const canCancel = item.statut === 'confirme' && !isPast(item);
          const enrolledDate = item.dateInscription
            ? formatDate(item.dateInscription)
            : `${index + 1} mai`;

          return (
            <Card padding={14} radius={18}>
              <View style={styles.itemRow}>
                <View style={styles.itemIcon}>
                  <Feather name={sportIcon} size={22} color={Colors.primary} />
                </View>
                <View style={styles.itemBody}>
                  <View style={styles.itemTopRow}>
                    <Text numberOfLines={2} style={styles.itemTitle}>
                      {item.evenement?.titre ?? 'Événement'}
                    </Text>
                    <Badge
                      label={STATUS_LABELS[item.statut] ?? item.statut}
                      status={item.statut as any}
                      size="sm"
                    />
                  </View>
                  <View style={styles.metaRow}>
                    <Feather name="calendar" size={12} color={Colors.subtle} />
                    <Text style={styles.metaText}>
                      {item.evenement ? formatDate(item.evenement.date) : '—'}
                    </Text>
                    <Feather name="map-pin" size={12} color={Colors.subtle} />
                    <Text numberOfLines={1} style={styles.metaText}>
                      {item.evenement?.lieu ?? '—'}
                    </Text>
                  </View>
                  <View style={styles.footerRow}>
                    <Text style={styles.enrolledDate}>Inscrit le {enrolledDate}</Text>
                    {canCancel && (
                      <Pressable
                        onPress={() => handleCancel(item.id)}
                        disabled={cancellingId === item.id}
                      >
                        <Text style={styles.cancelLink}>
                          {cancellingId === item.id ? 'Annulation…' : 'Annuler →'}
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </View>
            </Card>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListEmptyComponent={
          <EmptyState
            icon="check-circle"
            title="Aucune participation"
            subtitle="Vos inscriptions apparaîtront ici."
          />
        }
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
    paddingBottom: 0,
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
    marginBottom: 14,
  },

  // Segmented tab bar
  tabBar: {
    flexDirection: 'row',
    gap: 4,
    padding: 4,
    backgroundColor: Colors.primaryGhost,
    borderRadius: 12,
    marginBottom: 14,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 9,
  },
  tabItemActive: {
    backgroundColor: Colors.surface,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.subtle,
  },
  tabTextActive: {
    color: Colors.primaryDark,
  },

  // Feedback
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.statusEnCoursBg,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 10,
    padding: 10,
  },
  successText: {
    fontSize: 13,
    color: Colors.statusEnCours,
    fontWeight: '500',
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

  // Item card
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  itemIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primaryGhost,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  itemBody: {
    flex: 1,
    minWidth: 0,
    gap: 6,
  },
  itemTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  itemTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.body,
    letterSpacing: -0.1,
    lineHeight: 19,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  metaText: {
    fontSize: 12,
    color: Colors.subtle,
    flexShrink: 1,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primaryGhost,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 4,
  },
  enrolledDate: {
    fontSize: 11,
    color: Colors.subtle,
    fontWeight: '500',
  },
  cancelLink: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '700',
  },
});
