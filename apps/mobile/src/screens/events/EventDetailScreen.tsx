import { useEffect, useState } from 'react';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { CapacityBar } from '../../components/events/CapacityBar';
import { Colors } from '../../constants/colors';
import { getEventById, isUserRegistered } from '../../services/events.service';
import { cancelParticipation, getUserParticipations, registerForEvent } from '../../services/participations.service';
import { useAuthStore } from '../../store/auth.store';
import type { Evenement, EventsStackParamList } from '../../types';
import { formatDate } from '../../utils/date';
import { styles } from './EventDetailScreen.styles';

const placeholderEvent = require('../../../assets/images/placeholder-event.png');

type EventDetailRoute = RouteProp<EventsStackParamList, 'EventDetail'>;
type EventDetailNavigation = NativeStackNavigationProp<EventsStackParamList, 'EventDetail'>;

export function EventDetailScreen() {
  const route = useRoute<EventDetailRoute>();
  const navigation = useNavigation<EventDetailNavigation>();
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
      setMessage('Inscription confirmee.');
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

  if (!event) {
    return (
      <SafeAreaView style={styles.screen}>
        <ErrorMessage message={error ?? 'Événement introuvable.'} onRetry={loadEvent} />
      </SafeAreaView>
    );
  }

  const isFull = event.inscrits >= event.capacite;
  const isCancelled = event.statut === 'annule';

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.coverWrap}>
          <Image source={event.coverImage ? { uri: event.coverImage } : placeholderEvent} style={styles.cover} />
          <Text style={styles.watermark}>ASATA</Text>
          <Pressable accessibilityRole="button" style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={24} color={Colors.primary} />
          </Pressable>
        </View>
        <View style={styles.card}>
          <View style={styles.titleRow}>
            <Badge label={event.statut.replace('_', ' ')} status={event.statut} />
            <Text style={styles.title}>{event.titre}</Text>
          </View>
          <View style={styles.metaRow}>
            <Feather name="calendar" size={17} color={Colors.primary} />
            <Text style={styles.meta}>{formatDate(event.date)}</Text>
          </View>
          <View style={styles.metaRow}>
            <Feather name="map-pin" size={17} color={Colors.primary} />
            <Text style={styles.meta}>{event.lieu}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.capacity}>
            <Text style={styles.label}>Places disponibles</Text>
            <CapacityBar total={event.capacite} filled={event.inscrits} />
          </View>
          <Text style={styles.description}>{event.description}</Text>
          {message ? <Text style={styles.success}>{message}</Text> : null}
          {error ? <ErrorMessage message={error} /> : null}
        </View>
      </ScrollView>
      <SafeAreaView edges={['bottom']} style={styles.actionBar}>
        {isCancelled ? (
          <View style={styles.cancelledBanner}>
            <Text style={styles.cancelledText}>Evenement annule</Text>
          </View>
        ) : null}
        {!isCancelled && isRegistered ? (
          <Button label="Se desinscrire" onPress={handleCancel} isLoading={isSubmitting} variant="dangerOutline" />
        ) : null}
        {!isCancelled && !isRegistered && isFull ? (
          <Button label="Complet" onPress={handleRegister} disabled variant="secondary" />
        ) : null}
        {!isCancelled && !isRegistered && !isFull ? (
          <Button label="S'inscrire" onPress={handleRegister} isLoading={isSubmitting} variant="primary" />
        ) : null}
      </SafeAreaView>
    </View>
  );
}
