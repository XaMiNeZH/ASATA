import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { Colors } from '../../constants/colors';
import { useAuthStore } from '../../store/auth.store';
import type { ProfileStackParamList } from '../../types';

type ProfileNavigation = NativeStackNavigationProp<ProfileStackParamList, 'Profile'>;

const ROLE_LABELS: Record<string, string> = {
  membre: 'Membre', coach: 'Coach', administrateur: 'Administrateur',
};

function ProfileRow({
  icon,
  label,
  value,
  chevron = false,
  onPress,
}: {
  icon: string;
  label: string;
  value?: string;
  chevron?: boolean;
  onPress?: () => void;
}) {
  const Inner = (
    <View style={styles.profileRow}>
      <View style={styles.profileRowIcon}>
        <Feather name={icon as any} size={18} color={Colors.primary} />
      </View>
      <View style={styles.profileRowBody}>
        <Text style={styles.profileRowLabel}>{label}</Text>
        {value ? <Text numberOfLines={1} style={styles.profileRowValue}>{value}</Text> : null}
      </View>
      {chevron && <Feather name="chevron-right" size={16} color={Colors.subtle} />}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [pressed && { opacity: 0.7 }]}>
        {Inner}
      </Pressable>
    );
  }
  return Inner;
}

export function ProfileScreen() {
  const navigation = useNavigation<ProfileNavigation>();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const insets = useSafeAreaInsets();

  if (!user) {
    return (
      <View style={styles.screen}>
        <EmptyState
          icon="user"
          title="Profil indisponible"
          subtitle="Reconnectez-vous pour voir votre profil."
        />
      </View>
    );
  }

  const initials = user.nom
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const roleLabel = ROLE_LABELS[user.role] ?? user.role;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Profile hero */}
        <View style={styles.hero}>
          <View style={styles.heroTopRow}>
            <Text style={styles.heroTitle}>Profil</Text>
            <Pressable style={styles.bellBtn}>
              <Feather name="bell" size={19} color={Colors.primary} />
            </Pressable>
          </View>

          <View style={styles.avatarRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <View style={styles.avatarMeta}>
              <Text style={styles.userName}>{user.nom}</Text>
              <View style={styles.rolePill}>
                <Feather name="check-circle" size={12} color={Colors.primary} />
                <Text style={styles.rolePillText}>{roleLabel}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats */}
        <Card padding={0} radius={18}>
          <View style={styles.statsRow}>
            <View style={styles.statBlock}>
              <Text style={styles.statNum}>3</Text>
              <Text style={styles.statLabel}>Inscriptions</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBlock}>
              <Text style={styles.statNum}>2</Text>
              <Text style={styles.statLabel}>Événements passés</Text>
            </View>
          </View>
        </Card>

        {/* Edit profile button */}
        <Pressable
          style={styles.editBtn}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Feather name="edit-2" size={16} color={Colors.primary} />
          <Text style={styles.editBtnText}>Modifier mon profil</Text>
        </Pressable>

        {/* My info */}
        <View>
          <Text style={styles.sectionLabel}>Mes informations</Text>
          <Card padding={0} radius={18}>
            <ProfileRow icon="mail"    label="Email"      value={user.email} />
            <View style={styles.rowDivider} />
            <ProfileRow icon="phone"   label="Téléphone"  value={user.profil.telephone ?? 'Non renseigné'} />
            <View style={styles.rowDivider} />
            <ProfileRow icon="map-pin" label="Adresse"    value={user.profil.adresse ?? 'Asni, Al Haouz'} />
          </Card>
        </View>

        {/* Preferences */}
        <View>
          <Text style={styles.sectionLabel}>Préférences</Text>
          <Card padding={0} radius={18}>
            <ProfileRow icon="bell"   label="Notifications" value="Activées"       chevron />
            <View style={styles.rowDivider} />
            <ProfileRow icon="lock"   label="Confidentialité"                       chevron />
          </Card>
        </View>

        {/* Logout */}
        <View style={styles.logoutRow}>
          <Pressable
            style={styles.logoutBtn}
            onPress={() => void logout()}
          >
            <Feather name="log-out" size={15} color={Colors.danger} />
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryGhost,
  },
  content: {
    paddingBottom: 96,
    gap: 14,
  },

  // Hero
  hero: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairline,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.primaryDark,
    letterSpacing: -0.5,
  },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.primaryGhost,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  avatarMeta: {
    flex: 1,
    gap: 6,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primaryDark,
    letterSpacing: -0.3,
  },
  rolePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 3,
    backgroundColor: Colors.primaryPale,
    borderRadius: 999,
  },
  rolePillText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryDark,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
  },
  statBlock: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.hairline,
    marginVertical: 10,
  },
  statNum: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primaryDark,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.subtle,
    fontWeight: '500',
    marginTop: 2,
  },

  // Edit button
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
  },
  editBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
  },

  // Section label
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.subtle,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    paddingHorizontal: 24,
    paddingBottom: 8,
  },

  // Profile rows
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  profileRowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: Colors.primaryPale,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  profileRowBody: {
    flex: 1,
    minWidth: 0,
  },
  profileRowLabel: {
    fontSize: 11,
    color: Colors.subtle,
    fontWeight: '500',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  profileRowValue: {
    fontSize: 14,
    color: Colors.body,
    fontWeight: '500',
    marginTop: 2,
  },
  rowDivider: {
    height: 1,
    backgroundColor: Colors.hairline,
    marginLeft: 60,
  },

  // Logout
  logoutRow: {
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 4,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.danger,
  },
});
