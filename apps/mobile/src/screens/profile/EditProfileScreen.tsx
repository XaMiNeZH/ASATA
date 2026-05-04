import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '../../components/common/Button';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Input } from '../../components/common/Input';
import { Colors } from '../../constants/colors';
import { updateProfil } from '../../services/auth.service';
import { useAuthStore } from '../../store/auth.store';
import type { ProfileStackParamList } from '../../types';

type EditProfileNavigation = NativeStackNavigationProp<ProfileStackParamList, 'EditProfile'>;

export function EditProfileScreen() {
  const navigation = useNavigation<EditProfileNavigation>();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);

  const nameParts = user?.nom.split(' ') ?? [];
  const [firstName, setFirstName] = useState(nameParts[0] ?? '');
  const [lastName, setLastName] = useState(nameParts.slice(1).join(' ') ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [telephone, setTelephone] = useState(user?.profil.telephone ?? '');
  const [adresse, setAdresse] = useState(user?.profil.adresse ?? '');
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
      setError(caught instanceof Error ? caught.message : 'Sélection de photo impossible.');
    }
  };

  const saveProfile = async (): Promise<void> => {
    if (!user) { setError('Utilisateur introuvable.'); return; }
    setIsSaving(true);
    setError(null);
    try {
      const profil = await updateProfil(user.id, {
        telephone: telephone || undefined,
        adresse: adresse || undefined,
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

  const initials = user?.nom
    ? user.nom.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : 'AS';

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={22} color={Colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>Modifier le profil</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar picker */}
        <View style={styles.avatarSection}>
          <Pressable onPress={() => void pickPhoto()} style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <View style={styles.cameraBadge}>
              <Feather name="camera" size={14} color="#fff" />
            </View>
          </Pressable>
          <Text style={styles.avatarCaption}>Changer la photo de profil</Text>
        </View>

        {/* Section: Informations personnelles */}
        <Text style={styles.sectionLabel}>Informations personnelles</Text>
        <View style={styles.fieldsCard}>
          <Input
            label="Prénom"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Jean"
          />
          <Input
            label="Nom"
            value={lastName}
            onChangeText={setLastName}
            placeholder="Dupont"
          />
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="jean.dupont@example.com"
          />
        </View>

        {/* Section: Coordonnées */}
        <Text style={styles.sectionLabel}>Coordonnées</Text>
        <View style={styles.fieldsCard}>
          <Input
            label="Téléphone"
            value={telephone}
            onChangeText={setTelephone}
            keyboardType="phone-pad"
            placeholder="+212 6XX XXX XXX"
            optional
          />
          <Input
            label="Adresse"
            value={adresse}
            onChangeText={setAdresse}
            placeholder="Asni, Al Haouz"
            optional
          />
        </View>

        {error ? <ErrorMessage message={error} /> : null}
      </ScrollView>

      {/* Sticky save button */}
      <View style={[styles.actionBar, { paddingBottom: insets.bottom + 12 }]}>
        <Button label="Enregistrer les modifications" onPress={saveProfile} isLoading={isSaving} />
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairline,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.primaryGhost,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.primaryDark,
    letterSpacing: -0.3,
  },

  // Content
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    gap: 8,
  },

  // Avatar
  avatarSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 5,
  },
  avatarText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  avatarCaption: {
    fontSize: 13,
    color: Colors.subtle,
    fontWeight: '500',
  },

  // Sections
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.subtle,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    paddingHorizontal: 4,
    paddingBottom: 6,
    marginTop: 8,
  },
  fieldsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.hairline,
    padding: 16,
    gap: 14,
    marginBottom: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 1,
  },

  // Action bar
  actionBar: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.hairline,
  },
});
