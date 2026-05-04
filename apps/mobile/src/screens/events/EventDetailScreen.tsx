import { useEffect, useState } from 'react';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { CapacityBar } from '../../components/events/CapacityBar';
import { Colors } from '../../constants/colors';
import { getEventById, isUserRegistered } from '../../services/events.service';
import { cancelParticipation, getUserParticipations, registerForEvent } from '../../services/participations.service';
import { useAuthStore } from '../../store/auth.store';
import type { Evenement, EventsStackParamList } from '../../types';
import { formatDate } from '../../utils/date';

type EventDetailRoute = RouteProp<EventsStackParamList, 'EventDetail'>;
type EventDetailNavigation = NativeStackNavigationProp<EventsStackParamList, 'EventDetail'>;

const SPORT_ICONS: Record<string, string> = {
  ski: 'wind', football: 'circle', athletisme: 'zap',
  natation: 'droplet', yoga: 'sun',
};

const STATUS_LABELS: Record<string, string> = {
  planifie: 'Planifié', en_cours: 'En cours', termine: 'Terminé', annule: 'Annulé',
};

function DetailRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <View style={styles.detailIconBox}>
        <Feather name={icon as any} size={18} color={Colors.primary} />
      </View>
      <View style={styles.detailText}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

export function EventDetailScreen() {
  const route = useRoute<EventDetailRoute>();
  const navigation = useNavigation<EventDetailNavigation>();
  const user = useAuthStore((state) => state.user);
  const insets = useSafeAreaInsets();

  const [event, setEvent] = useState<Evenement | null>(null);
  const [participationId, setParticipationId] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const loadEvent = async (): Promise<void> => {
    if (!user) { setError('Utilisateur introuvable.'); setIsLoading(false); return; }
    setError(null); setIsLoading(true);
    try {
      const [eventData, registered, participations] = await Promise.all([
        getEventById(route.params.eventId),
        isUserRegistered(route.params.eventId, user.id),
        getUserParticipations(user.id),
      ]);
      const participation = participations.find(
        (p) => p.evenementId === route.params.eventId && p.statut !== 'annule',
      );
      setEvent(eventData);
      setIsRegistered(registered);
      setParticipationId(participation?.id ?? null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Impossible de charger cet événement.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (): Promise<void> => {
    if (!user || !event) return;
    setIsSubmitting(true); setError(null); setMessage(null);
    try {
      const participation = await registerForEvent(event.id, user.id);
      setEvent({ ...event, inscrits: event.inscrits + 1 });
      setParticipationId(participation.id);
      setIsRegistered(true);
      setMessage('Inscription confirmée.');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Inscription impossible.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmCancel = async (): Promise<void> => {
    if (!participationId || !event) return;
    setIsSubmitting(true); setError(null); setMessage(null);
    try {
      await cancelParticipation(participationId);
      setEvent({ ...event, inscrits: Math.max(0, event.inscrits - 1) });
      setParticipationId(null);
      setIsRegistered(false);
      setMessage('Participation annulée.');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Annulation impossible.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = (): void => {
    Alert.alert("Confirmer l'annulation", 'Voulez-vous vraiment annuler votre participation ?', [
      { text: 'Non', style: 'cancel' },
      { text: 'Oui, annuler', style: 'destructive', onPress: () => void confirmCancel() },
    ]);
  };

  useEffect(() => { void loadEvent(); }, [route.params.eventId, user?.id]);

  if (isLoading) return <LoadingSpinner />;

  if (!event) {
    return (
      <View style={styles.screen}>
        <ErrorMessage message={error ?? 'Événement introuvable.'} onRetry={loadEvent} />
      </View>
    );
  }

  const isFull = event.inscrits >= event.capacite;
  const isCancelled = event.statut === 'annule';
  const statusKey = event.statut === 'planifie' && isFull ? 'complet' : event.statut;
  const statusLabel = statusKey === 'complet' ? 'Complet' : STATUS_LABELS[event.statut] ?? event.statut;
  const sportIconName = SPORT_ICONS[event.sport ?? ''] ?? 'zap';
  const remainingPlaces = event.capacite - event.inscrits;

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        {/* Blue gradient hero */}
        <View style={styles.hero}>
          {/* Back + share */}
          <View style={[styles.heroNav, { paddingTop: insets.top + 12 }]}>
            <Pressable style={styles.heroBtn} onPress={() => navigation.goBack()}>
              <Feather name="chevron-left" size={22} color="#fff" strokeWidth={2.5} />
            </Pressable>
            <Pressable style={styles.heroBtn}>
              <Feather name="share-2" size={18} color="#fff" />
            </Pressable>
          </View>
          {/* Sport icon */}
          <View style={styles.heroCenter}>
            <View style={styles.heroIconBox}>
              <Feather name={sportIconName as any} size={32} color="#fff" />
            </View>
            <Text style={styles.heroSportLabel}>
              {event.sport ?? 'Sport'}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title + status */}
          <View style={styles.titleBlock}>
            <Badge label={statusLabel} status={statusKey as any} />
            <Text style={styles.title}>{event.titre}</Text>
          </View>

          {/* Details card */}
          <Card padding={16} radius={18}>
            <DetailRow icon="calendar" label="Date" value={formatDate(event.date)} />
            <View style={styles.divider} />
            <DetailRow icon="map-pin" label="Lieu" value={event.lieu} />
            <View style={styles.divider} />
            <View style={styles.capacityBlock}>
              <View style={styles.capacityHeader}>
                <View style={styles.detailIconBox}>
                  <Feather name="users" size={18} color={Colors.primary} />
                </View>
                <Text style={styles.detailLabel}>Capacité</Text>
              </View>
              <CapacityBar total={event.capacite} filled={event.inscrits} height={8} />
            </View>
          </Card>

          {/* Description */}
          <Card padding={16} radius={18}>
            <Text style={styles.sectionLabel}>Description</Text>
            <Text style={styles.description}>{event.description}</Text>
          </Card>

          {/* Messages */}
          {message && (
            <View style={styles.successBox}>
              <Feather name="check-circle" size={16} color={Colors.statusEnCours} />
              <Text style={styles.successText}>{message}</Text>
            </View>
          )}
          {error && <ErrorMessage message={error} />}
        </View>
      </ScrollView>

      {/* Sticky CTA */}
      <View style={[styles.cta, { paddingBottom: insets.bottom + 14 }]}>
        {isCancelled ? (
          <View style={styles.cancelledBanner}>
            <Text style={styles.cancelledText}>Événement annulé</Text>
          </View>
        ) : isRegistered ? (
          <Button
            label="Se désinscrire"
            onPress={handleCancel}
            isLoading={isSubmitting}
            variant="dangerOutline"
          />
        ) : isFull ? (
          <Button label="Complet — aucune place disponible" onPress={() => {}} disabled variant="secondary" />
        ) : (
          <Button
            label={`S'inscrire · ${remainingPlaces} place${remainingPlaces !== 1 ? 's' : ''} restante${remainingPlaces !== 1 ? 's' : ''}`}
            onPress={handleRegister}
            isLoading={isSubmitting}
            variant="primary"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryGhost,
  },

  // Hero
  hero: {
    height: 240,
    backgroundColor: Colors.primary,
    position: 'relative',
    overflow: 'hidden',
    // Subtle diagonal stripe overlay handled via additional view below
  },
  heroNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 2,
  },
  heroBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  heroCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  heroIconBox: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.32)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSportLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'capitalize',
  },

  // Content
  content: {
    padding: 20,
    gap: 14,
  },
  titleBlock: {
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primaryDark,
    letterSpacing: -0.4,
    lineHeight: 28,
  },

  // Detail rows
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailIconBox: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: Colors.primaryPale,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: Colors.subtle,
    fontWeight: '500',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 14,
    color: Colors.body,
    fontWeight: '600',
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.hairline,
    marginVertical: 12,
  },

  // Capacity block
  capacityBlock: {
    gap: 10,
  },
  capacityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  // Description
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primaryDark,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.body,
    lineHeight: 22,
  },

  // Messages
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.statusEnCoursBg,
    borderRadius: 12,
    padding: 12,
  },
  successText: {
    fontSize: 13,
    color: Colors.statusEnCours,
    fontWeight: '500',
    flex: 1,
  },

  // Sticky CTA
  cta: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.hairline,
    paddingHorizontal: 20,
    paddingTop: 14,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 8,
  },
  cancelledBanner: {
    height: 52,
    borderRadius: 999,
    backgroundColor: Colors.statusTermineBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelledText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.statusTermine,
  },
});
