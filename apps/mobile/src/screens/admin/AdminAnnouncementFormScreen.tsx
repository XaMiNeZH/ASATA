import { useCallback, useEffect, useState } from 'react';
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../components/common/AppHeader';
import { Button } from '../../components/common/Button';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Input } from '../../components/common/Input';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Colors } from '../../constants/colors';
import { createAnnouncement, updateAnnouncement } from '../../services/admin.service';
import { getAnnouncementById } from '../../services/announcements.service';
import type { AdminStackParamList, CreateAnnouncementPayload } from '../../types';
import { styles } from './AdminAnnouncementFormScreen.styles';

type AdminAnnouncementFormRoute = RouteProp<AdminStackParamList, 'AdminAnnouncementForm'>;
type AdminAnnouncementFormNavigation = NativeStackNavigationProp<
  AdminStackParamList,
  'AdminAnnouncementForm'
>;

const switchTrack = {
  false: Colors.surfaceContainerHighest,
  true: Colors.secondaryContainer,
};

export function AdminAnnouncementFormScreen() {
  const route = useRoute<AdminAnnouncementFormRoute>();
  const navigation = useNavigation<AdminAnnouncementFormNavigation>();
  const annonceId = route.params?.annonceId;
  const isEdit = Boolean(annonceId);

  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const [visible, setVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAnnouncement = useCallback(async (): Promise<void> => {
    if (!annonceId) {
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const announcement = await getAnnouncementById(annonceId);
      setTitre(announcement.titre);
      setContenu(announcement.contenu);
      setVisible(announcement.visible);
    } catch {
      setError("Impossible de charger l'annonce.");
    } finally {
      setIsLoading(false);
    }
  }, [annonceId]);

  useEffect(() => {
    if (annonceId) {
      void loadAnnouncement();
    }
  }, [annonceId, loadAnnouncement]);

  const validate = (): boolean => {
    if (!titre.trim()) {
      setError('Le titre est requis.');
      return false;
    }
    if (!contenu.trim()) {
      setError('Le contenu est requis.');
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
      const payload: CreateAnnouncementPayload = {
        titre: titre.trim(),
        contenu: contenu.trim(),
        visible,
      };
      if (annonceId) {
        await updateAnnouncement(annonceId, payload);
      } else {
        await createAnnouncement(payload);
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
      <AppHeader title={isEdit ? 'Modifier Annonce' : 'Nouvelle Annonce'} onBack={() => navigation.goBack()} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {error ? <ErrorMessage message={error} onRetry={annonceId ? () => void loadAnnouncement() : undefined} /> : null}
          <Input label="Titre" value={titre} onChangeText={setTitre} placeholder="Titre de l'annonce" />
          <Input label="Contenu" value={contenu} onChangeText={setContenu} multiline placeholder="Contenu" />
          <View style={styles.switchRow}>
            <View style={styles.switchText}>
              <Text style={styles.label}>Visible</Text>
              <Text style={styles.helpText}>Publier cette annonce dans l'application mobile.</Text>
            </View>
            <Switch
              value={visible}
              onValueChange={setVisible}
              trackColor={switchTrack}
              thumbColor={visible ? Colors.primary : Colors.surfaceContainerHighest}
            />
          </View>
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
