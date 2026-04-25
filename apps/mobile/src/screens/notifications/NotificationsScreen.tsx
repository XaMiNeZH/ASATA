import { Pressable, SectionList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      <SafeAreaView style={styles.screen}>
        <ErrorMessage message={error} onRetry={retry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          disabled={!unread.length}
          onPress={() => void markAllRead()}
          style={styles.markReadButton}
        >
          <Text style={[styles.markReadText, !unread.length && styles.markReadTextDisabled]}>
            Tout marquer comme lu
          </Text>
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
    </SafeAreaView>
  );
}
