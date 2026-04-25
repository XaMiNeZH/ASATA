import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../components/common/Button';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Input } from '../../components/common/Input';
import { Colors } from '../../constants/colors';
import { updateProfil } from '../../services/auth.service';
import { useAuthStore } from '../../store/auth.store';
import type { ProfileStackParamList } from '../../types';
import { styles } from './EditProfileScreen.styles';

type EditProfileNavigation = NativeStackNavigationProp<ProfileStackParamList, 'EditProfile'>;

export function EditProfileScreen() {
  const navigation = useNavigation<EditProfileNavigation>();
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const [nom, setNom] = useState(user?.nom ?? '');
  const [telephone, setTelephone] = useState(user?.profil.telephone ?? '');
  const [adresse, setAdresse] = useState(user?.profil.adresse ?? '');
  const [age, setAge] = useState(user?.profil.age ? String(user.profil.age) : '');
  const [photo, setPhoto] = useState(user?.profil.photo);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const pickPhoto = async (): Promise<void> => {
    setError(null);
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        setError('Autorisation requise pour choisir une photo.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });
      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Selection de photo impossible.');
    }
  };

  const saveProfile = async (): Promise<void> => {
    if (!user) {
      setError('Utilisateur introuvable.');
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      const profil = await updateProfil(user.id, {
        telephone: telephone || undefined,
        adresse: adresse || undefined,
        age: age ? Number(age) : undefined,
        photo,
      });
      updateUser({ nom: nom.trim() || user.nom, profil });
      navigation.goBack();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Enregistrement impossible.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        <Pressable accessibilityRole="button" onPress={() => void pickPhoto()} style={styles.photoButton}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Feather name="user" size={42} color={Colors.primary} />
            </View>
          )}
          <View style={styles.cameraBadge}>
            <Feather name="camera" size={17} color={Colors.surface} />
          </View>
        </Pressable>
        <Input label="Nom" value={nom} onChangeText={setNom} placeholder="Nom complet" leftIcon="user" />
        <Input label="Telephone" value={telephone} onChangeText={setTelephone} keyboardType="phone-pad" leftIcon="phone" />
        <Input label="Adresse" value={adresse} onChangeText={setAdresse} placeholder="Adresse" leftIcon="map-pin" />
        <Input label="Age" value={age} onChangeText={setAge} keyboardType="numeric" placeholder="Age" leftIcon="calendar" />
        {error ? <ErrorMessage message={error} /> : null}
      </ScrollView>
      <SafeAreaView edges={['bottom']} style={styles.actionBar}>
        <Button label="Enregistrer" onPress={saveProfile} isLoading={isSaving} variant="primary" />
      </SafeAreaView>
    </View>
  );
}
