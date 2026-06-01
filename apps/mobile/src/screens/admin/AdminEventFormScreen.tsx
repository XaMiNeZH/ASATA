import { useCallback, useEffect, useState } from 'react';
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../components/common/AppHeader';
import { Button } from '../../components/common/Button';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Input } from '../../components/common/Input';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { createEvent, updateEvent } from '../../services/admin.service';
import { getEventById } from '../../services/events.service';
import type { AdminStackParamList, CreateEventPayload, EventStatus } from '../../types';
import { styles } from './AdminEventFormScreen.styles';

type AdminEventFormRoute = RouteProp<AdminStackParamList, 'AdminEventForm'>;
type AdminEventFormNavigation = NativeStackNavigationProp<AdminStackParamList, 'AdminEventForm'>;

const statusOptions: { value: EventStatus; label: string }[] = [
  { value: 'planifie', label: 'Planifié' },
  { value: 'en_cours', label: 'En cours' },
  { value: 'termine', label: 'Terminé' },
  { value: 'annule', label: 'Annulé' },
];

export function AdminEventFormScreen() {
  const route = useRoute<AdminEventFormRoute>();
  const navigation = useNavigation<AdminEventFormNavigation>();
  const eventId = route.params?.eventId;
  const isEdit = Boolean(eventId);

  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [lieu, setLieu] = useState('');
  const [capacite, setCapacite] = useState('');
  const [statut, setStatut] = useState<EventStatus>('planifie');
  const [coverImage, setCoverImage] = useState('');
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvent = useCallback(async (): Promise<void> => {
    if (!eventId) {
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const event = await getEventById(eventId);
      setTitre(event.titre);
      setDescription(event.description);
      setDate(event.date);
      setLieu(event.lieu);
      setCapacite(String(event.capacite));
      setStatut(event.statut);
      setCoverImage(event.coverImage ?? '');
    } catch {
      setError("Impossible de charger l'événement.");
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    if (eventId) {
      void loadEvent();
    }
  }, [eventId, loadEvent]);

  const validate = (): boolean => {
    if (!titre.trim()) {
      setError('Le titre est requis.');
      return false;
    }
    if (!description.trim()) {
      setError('La description est requise.');
      return false;
    }
    if (!date.trim()) {
      setError('La date est requise.');
      return false;
    }
    if (!lieu.trim()) {
      setError('Le lieu est requis.');
      return false;
    }
    if (!capacite.trim() || Number.isNaN(Number(capacite)) || Number(capacite) < 1) {
      setError('La capacité doit être un nombre positif.');
      return false;
    }
    return true;
  };

  const handleSave = async (): Promise<void> => {
    if (!validate()) {
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      const payload: CreateEventPayload = {
        titre: titre.trim(),
        description: description.trim(),
        date: date.trim(),
        lieu: lieu.trim(),
        capacite: Number(capacite),
        statut,
        coverImage: coverImage.trim() || undefined,
      };
      if (eventId) {
        await updateEvent(eventId, payload);
      } else {
        await createEvent(payload);
      }
      navigation.goBack();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Enregistrement impossible.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.screen}>
      <AppHeader title={isEdit ? 'Modifier Événement' : 'Nouvel Événement'} onBack={() => navigation.goBack()} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {error ? <ErrorMessage message={error} onRetry={eventId ? () => void loadEvent() : undefined} /> : null}
          <Input label="Titre" value={titre} onChangeText={setTitre} placeholder="Titre de l'événement" />
          <Input label="Description" value={description} onChangeText={setDescription} multiline placeholder="Description" />
          <Input label="Date" value={date} onChangeText={setDate} placeholder="2026-06-15T10:00:00.000Z" />
          <Input label="Lieu" value={lieu} onChangeText={setLieu} placeholder="Lieu" />
          <Input label="Capacité" value={capacite} onChangeText={setCapacite} keyboardType="numeric" placeholder="120" />
          <View style={styles.statusGroup}>
            <Text style={styles.label}>Statut</Text>
            <View style={styles.statusRow}>
              {statusOptions.map((item) => (
                <Pressable
                  key={item.value}
                  accessibilityRole="button"
                  onPress={() => setStatut(item.value)}
                  style={[styles.chip, statut === item.value && styles.chipActive]}
                >
                  <Text style={[styles.chipText, statut === item.value && styles.chipTextActive]}>{item.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
          <Input label="CoverImage URL" value={coverImage} onChangeText={setCoverImage} placeholder="https://..." />
          <Button
            label={isEdit ? 'Enregistrer' : 'Créer'}
            variant="primary"
            isLoading={isSaving}
            onPress={() => void handleSave()}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
