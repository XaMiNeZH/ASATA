import { useEffect, useState } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../components/common/AppHeader';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Input } from '../../components/common/Input';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { getMembers } from '../../services/admin.service';
import type { AdminStackParamList, UserRole, UserStatus, UserWithProfil } from '../../types';
import { styles } from './AdminMembersScreen.styles';

type AdminMembersNavigation = NativeStackNavigationProp<AdminStackParamList, 'AdminMembers'>;

const roleLabels: Record<UserRole, string> = {
  membre: 'Membre',
  coach: 'Coach',
  administrateur: 'Admin',
};

const statusLabels: Record<UserStatus, string> = {
  actif: 'Actif',
  inactif: 'Inactif',
  suspendu: 'Suspendu',
};

const getInitials = (name: string): string => {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

  return initials || 'AS';
};

export function AdminMembersScreen() {
  const navigation = useNavigation<AdminMembersNavigation>();
  const [members, setMembers] = useState<UserWithProfil[]>([]);
  const [filtered, setFiltered] = useState<UserWithProfil[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async (refreshing = false): Promise<void> => {
    setError(null);
    refreshing ? setIsRefreshing(true) : setIsLoading(true);
    try {
      const data = await getMembers();
      setMembers(data);
      setFiltered(data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Impossible de charger les membres.');
    } finally {
      refreshing ? setIsRefreshing(false) : setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(members.filter((member) => member.nom.toLowerCase().includes(q) || member.email.toLowerCase().includes(q)));
  }, [search, members]);

  const renderMember = ({ item }: { item: UserWithProfil }) => {
    const status = item.statut ?? 'actif';

    return (
      <Card>
        <View style={styles.cardContent}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(item.nom)}</Text>
          </View>
          <View style={styles.memberBody}>
            <Text numberOfLines={1} style={styles.name}>
              {item.nom}
            </Text>
            <Text numberOfLines={1} style={styles.email}>
              {item.email}
            </Text>
            <View style={styles.badges}>
              <Badge label={roleLabels[item.role]} status={item.role} />
              <Badge label={statusLabels[status]} status={status} />
            </View>
          </View>
        </View>
      </Card>
    );
  };

  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;
    if (error) {
      return (
        <View style={styles.state}>
          <ErrorMessage message={error} onRetry={() => void load()} />
        </View>
      );
    }

    return (
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderMember}
        ListHeaderComponent={
          <View style={styles.search}>
            <Input label="Recherche" value={search} onChangeText={setSearch} placeholder="Nom ou email" leftIcon="search" />
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<EmptyState icon="users" title="Aucun membre" subtitle="Aucun membre ne correspond à la recherche." />}
        refreshing={isRefreshing}
        onRefresh={() => void load(true)}
        contentContainerStyle={styles.listContent}
      />
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.screen}>
      <AppHeader title="Répertoire des Membres" onBack={() => navigation.goBack()} />
      {renderContent()}
    </SafeAreaView>
  );
}
