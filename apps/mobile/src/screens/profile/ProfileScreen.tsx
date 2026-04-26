import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';

import { AppHeader } from '../../components/common/AppHeader';
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
      <View style={styles.screen}>
        <EmptyState icon="user" title="Profil indisponible" subtitle="Reconnectez-vous pour voir votre profil." />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <AppHeader title="ASATA CONNECT" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.avatarRing}>
          <Avatar name={user.nom} photo={user.profil.photo} />
          <View style={styles.onlineDot} />
          </View>
          <Text style={styles.name}>{user.nom}</Text>
          <View style={styles.badgeRow}>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{user.role}</Text>
            </View>
            <View style={styles.activeBadge}>
              <View style={styles.activeDot} />
              <Text style={styles.activeText}>Actif</Text>
            </View>
          </View>
        </View>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>ÉVÉNEMENTS</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>BADGES</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>85</Text>
            <Text style={styles.statLabel}>POINTS</Text>
          </View>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>INFORMATIONS PERSONNELLES</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Feather name="mail" size={22} color={Colors.skyBlue} />
            </View>
            <View style={styles.infoCopy}>
              <Text style={styles.infoLabel}>E-mail</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Feather name="phone" size={22} color={Colors.skyBlue} />
            </View>
            <View style={styles.infoCopy}>
              <Text style={styles.infoLabel}>Téléphone</Text>
              <Text style={styles.infoValue}>{user.profil.telephone ?? 'Non renseigné'}</Text>
            </View>
          </View>
          <View style={[styles.infoRow, styles.infoRowLast]}>
            <View style={styles.infoIcon}>
              <Feather name="map-pin" size={22} color={Colors.skyBlue} />
            </View>
            <View style={styles.infoCopy}>
              <Text style={styles.infoLabel}>Localisation</Text>
              <Text style={styles.infoValue}>{user.profil.adresse ?? 'Asni, Marrakech'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>COMPTE & SÉCURITÉ</Text>
          <View style={styles.securityRow}>
            <View style={styles.securityLeft}>
              <Feather name="lock" size={24} color={Colors.textSecondary} />
              <Text style={styles.securityText}>Changer le mot de passe</Text>
            </View>
            <Feather name="chevron-right" size={24} color={Colors.skyBlue} />
          </View>
          <View style={[styles.securityRow, styles.infoRowLast]}>
            <View style={styles.securityLeft}>
              <Feather name="shield" size={24} color={Colors.textSecondary} />
              <Text style={styles.securityText}>Confidentialité</Text>
            </View>
            <Feather name="chevron-right" size={24} color={Colors.skyBlue} />
          </View>
        </View>
        <Button label="Modifier le profil" onPress={() => navigation.navigate('EditProfile')} variant="secondary" />
        <Button label="Déconnexion" onPress={() => void logout()} variant="ghost" />
      </ScrollView>
    </View>
  );
}
