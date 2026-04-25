import { SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { NotificationItem } from '../../components/notifications/NotificationItem';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { useNotifications } from '../../hooks/useNotifications';
import { useAuthStore } from '../../store/auth.store';
import type { Notification } from '../../types';

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
        <Text style={styles.title}>Notifications</Text>
        <Button label="Tout marquer comme lu" onPress={() => void markAllRead()} variant="ghost" disabled={!unread.length} />
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  listContent: {
    paddingBottom: Spacing.xl,
  },
  sectionTitle: {
    color: Colors.primaryDark,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.sm,
  },
  separator: {
    height: Spacing.sm,
  },
  sectionGap: {
    height: Spacing.lg,
  },
});
