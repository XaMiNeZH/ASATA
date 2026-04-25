import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { useAuthStore } from '../../store/auth.store';
import type { ProfileStackParamList } from '../../types';

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
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card>
          <View style={styles.identity}>
            <Avatar name={user.nom} photo={user.profil.photo} />
            <View style={styles.identityText}>
              <Text style={styles.name}>{user.nom}</Text>
              <Text style={styles.email}>{user.email}</Text>
              <View style={styles.badges}>
                <Badge label={user.role} status={user.role} />
                {user.statut ? <Badge label={user.statut} status={user.statut} /> : null}
              </View>
            </View>
          </View>
        </Card>
        <Card>
          <View style={styles.details}>
            <Text style={styles.sectionTitle}>Profil</Text>
            <Text style={styles.detail}>Age: {user.profil.age ?? 'Non renseigne'}</Text>
            <Text style={styles.detail}>Telephone: {user.profil.telephone ?? 'Non renseigne'}</Text>
            <Text style={styles.detail}>Adresse: {user.profil.adresse ?? 'Non renseignee'}</Text>
          </View>
        </Card>
        <Button label="Modifier le profil" onPress={() => navigation.navigate('EditProfile')} variant="primary" />
        <Button label="Se deconnecter" onPress={() => void logout()} variant="ghost" />
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
  identity: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'center',
  },
  identityText: {
    flex: 1,
    gap: Spacing.xs,
  },
  name: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  email: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  details: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    color: Colors.primaryDark,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  detail: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
  },
});
