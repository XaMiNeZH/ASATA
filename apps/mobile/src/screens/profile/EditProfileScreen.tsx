import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../components/common/AppHeader';
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
  const nameParts = user?.nom.split(' ') ?? [];
  const [firstName, setFirstName] = useState(nameParts[0] ?? '');
  const [lastName, setLastName] = useState(nameParts.slice(1).join(' ') ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [telephone, setTelephone] = useState(user?.profil.telephone ?? '');
  const [bio, setBio] = useState(user?.profil.adresse ?? '');
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
        adresse: bio || undefined,
        photo,
      });
      updateUser({ nom: `${firstName} ${lastName}`.trim() || user.nom, profil });
      navigation.goBack();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Enregistrement impossible.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.screen}>
      <AppHeader title="ASATA CONNECT" />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        <View style={styles.heading}>
          <Text style={styles.eyebrow}>Account Settings</Text>
          <Text style={styles.title}>Modifier le profil</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={() => void pickPhoto()} style={styles.photoButton}>
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoInitials}>{user?.nom ? user.nom.slice(0, 2).toUpperCase() : 'AS'}</Text>
          </View>
          <View style={styles.cameraBadge}>
            <Feather name="camera" size={17} color={Colors.surface} />
          </View>
        </Pressable>
        <Text style={styles.photoCaption}>Changer la photo de profil</Text>
        <Input label="Prénom" value={firstName} onChangeText={setFirstName} placeholder="Jean" />
        <Input label="Nom" value={lastName} onChangeText={setLastName} placeholder="Dupont" />
        <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="jean.dupont@asata.com" />
        <Input label="Numéro de téléphone" value={telephone} onChangeText={setTelephone} keyboardType="phone-pad" />
        <Input
          label="Bio"
          value={bio}
          onChangeText={setBio}
          placeholder="Passionné par le sport de haut niveau et le management associatif."
          multiline
        />
        {error ? <ErrorMessage message={error} /> : null}
      </ScrollView>
      <SafeAreaView edges={['bottom']} style={styles.actionBar}>
        <Button label="Enregistrer" onPress={saveProfile} isLoading={isSaving} variant="primary" />
      </SafeAreaView>
    </View>
  );
}
