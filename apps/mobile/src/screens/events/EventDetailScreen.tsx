import { useEffect, useState } from 'react';
import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { CapacityBar } from '../../components/events/CapacityBar';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { getEventById, isUserRegistered } from '../../services/events.service';
import { cancelParticipation, getUserParticipations, registerForEvent } from '../../services/participations.service';
import { useAuthStore } from '../../store/auth.store';
import type { Evenement, EventsStackParamList } from '../../types';
import { formatDate } from '../../utils/date';

const placeholderEvent = require('../../../assets/images/placeholder-event.png');

type EventDetailRoute = RouteProp<EventsStackParamList, 'EventDetail'>;

export function EventDetailScreen() {
  const route = useRoute<EventDetailRoute>();
  const user = useAuthStore((state) => state.user);
  const [event, setEvent] = useState<Evenement | null>(null);
  const [participationId, setParticipationId] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const loadEvent = async (): Promise<void> => {
    if (!user) {
      setError('Utilisateur introuvable.');
      setIsLoading(false);
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      const [eventData, registered, participations] = await Promise.all([
        getEventById(route.params.eventId),
        isUserRegistered(route.params.eventId, user.id),
        getUserParticipations(user.id),
      ]);
      const participation = participations.find(
        (item) => item.evenementId === route.params.eventId && item.statut !== 'annule',
      );
      setEvent(eventData);
      setIsRegistered(registered);
      setParticipationId(participation?.id ?? null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Impossible de charger cet evenement.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (): Promise<void> => {
    if (!user || !event) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      const participation = await registerForEvent(event.id, user.id);
      setEvent({ ...event, inscrits: event.inscrits + 1 });
      setParticipationId(participation.id);
      setIsRegistered(true);
      setMessage('Inscription confirmée ✓');
    } catch (caught) {
      if (caught instanceof Error && caught.message === 'Événement complet') {
        setError('Cet événement est complet.');
      } else {
        setError('Inscription impossible. Veuillez réessayer.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmCancel = async (): Promise<void> => {
    if (!participationId || !event) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setMessage(null);
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

  useEffect(() => {
    void loadEvent();
  }, [route.params.eventId, user?.id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!event || error) {
    return (
      <SafeAreaView style={styles.screen}>
        <ErrorMessage message={error ?? 'Événement introuvable.'} onRetry={loadEvent} />
      </SafeAreaView>
    );
  }

  const isFull = event.inscrits >= event.capacite;
  const isCancelled = event.statut === 'annule';

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={event.coverImage ? { uri: event.coverImage } : placeholderEvent} style={styles.cover} />
        <View style={styles.header}>
          <Badge label={event.statut.replace('_', ' ')} status={event.statut} />
          <Text style={styles.title}>{event.titre}</Text>
          <Text style={styles.meta}>{formatDate(event.date)}</Text>
          <Text style={styles.meta}>{event.lieu}</Text>
        </View>
        <Text style={styles.description}>{event.description}</Text>
        <CapacityBar total={event.capacite} filled={event.inscrits} />
        {message ? <Text style={styles.success}>{message}</Text> : null}
        {error ? <ErrorMessage message={error} /> : null}
        {isCancelled ? <Text style={styles.cancelled}>Événement annulé</Text> : null}
        {!isCancelled && isRegistered ? (
          <Button label="Se désinscrire" onPress={handleCancel} isLoading={isSubmitting} variant="danger" />
        ) : null}
        {!isCancelled && !isRegistered && isFull ? (
          <Button label="Complet" onPress={handleRegister} disabled variant="secondary" />
        ) : null}
        {!isCancelled && !isRegistered && !isFull ? (
          <Button label="S'inscrire" onPress={handleRegister} isLoading={isSubmitting} variant="primary" />
        ) : null}
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
  cover: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    backgroundColor: Colors.primaryPale,
  },
  header: { gap: Spacing.sm },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
  },
  meta: { color: Colors.textSecondary, fontSize: FontSize.md },
  description: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    lineHeight: 22,
  },
  success: { color: Colors.success, fontSize: FontSize.md, fontWeight: FontWeight.bold },
  cancelled: { color: Colors.danger, fontSize: FontSize.md, fontWeight: FontWeight.bold },
});
