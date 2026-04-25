import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { Colors } from '../../constants/colors';
import { useAuthStore } from '../../store/auth.store';
import type { ProfileStackParamList } from '../../types';
import { styles } from './ProfileScreen.styles';

type ProfileNavigation = NativeStackNavigationProp<ProfileStackParamList, 'Profile'>;

export function ProfileScreen() {
  const navigation = useNavigation<ProfileNavigation>();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  if (!user) {
    return (
      <SafeAreaView style={styles.screen}>
        <EmptyState icon="user" title="Profil indisponible" subtitle="Reconnectez-vous pour voir votre profil." />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <View style={styles.avatarRing}>
          <Avatar name={user.nom} photo={user.profil.photo} />
        </View>
        <Text style={styles.name}>{user.nom}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{user.role}</Text>
        </View>
      </SafeAreaView>
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Participations</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Annonces vues</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Feather name="calendar" size={18} color={Colors.primary} />
            <View style={styles.infoCopy}>
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>{user.profil.age ?? 'Non renseigne'}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Feather name="phone" size={18} color={Colors.primary} />
            <View style={styles.infoCopy}>
              <Text style={styles.infoLabel}>Telephone</Text>
              <Text style={styles.infoValue}>{user.profil.telephone ?? 'Non renseigne'}</Text>
            </View>
          </View>
          <View style={[styles.infoRow, styles.infoRowLast]}>
            <Feather name="map-pin" size={18} color={Colors.primary} />
            <View style={styles.infoCopy}>
              <Text style={styles.infoLabel}>Adresse</Text>
              <Text style={styles.infoValue}>{user.profil.adresse ?? 'Non renseignee'}</Text>
            </View>
          </View>
        </View>
        <Button label="Modifier le profil" onPress={() => navigation.navigate('EditProfile')} variant="secondary" />
        <Button label="Se deconnecter" onPress={() => void logout()} variant="ghost" />
      </ScrollView>
    </View>
  );
}
