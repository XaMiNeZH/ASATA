import { Pressable, SectionList, Text, View } from 'react-native';

import { AppHeader } from '../../components/common/AppHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { NotificationItem } from '../../components/notifications/NotificationItem';
import { useNotifications } from '../../hooks/useNotifications';
import { useAuthStore } from '../../store/auth.store';
import type { Notification } from '../../types';
import { styles } from './NotificationsScreen.styles';

interface NotificationSection {
  title: string;
  data: Notification[];
}

export function NotificationsScreen() {
  const user = useAuthStore((state) => state.user);
  const { notifications, isLoading, error, retry, markRead, markAllRead } = useNotifications(user?.id);
  const unread = notifications.filter((item) => !item.lu);
  const read = notifications.filter((item) => item.lu);
  const sections: NotificationSection[] = [
    { title: 'Non lues', data: unread },
    { title: 'Lues', data: read },
  ].filter((section) => section.data.length > 0);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <View style={styles.screen}>
        <ErrorMessage message={error} onRetry={retry} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <AppHeader title="ASATA CONNECT" />
      <View style={styles.heading}>
        <View>
          <Text style={styles.screenTitle}>Notifications</Text>
          <View style={styles.underline} />
        </View>
        <Pressable accessibilityRole="button" disabled={!unread.length} onPress={() => void markAllRead()}>
          <Text style={[styles.markReadText, !unread.length && styles.markReadTextDisabled]}>Tout lire</Text>
        </Pressable>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => <Text style={styles.sectionTitle}>{section.title}</Text>}
        renderItem={({ item }) => <NotificationItem notification={item} onPress={() => void markRead(item.id)} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        SectionSeparatorComponent={() => <View style={styles.sectionGap} />}
        ListEmptyComponent={<EmptyState icon="bell" title="Aucune notification" subtitle="Vous etes a jour." />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
