import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';

interface AppHeaderProps {
  title: string;
  onBack?: () => void;
  onBellPress?: () => void;
  unreadCount?: number;
}

export function AppHeader({ title, onBack, onBellPress, unreadCount = 0 }: AppHeaderProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.bar}>
        <View style={styles.left}>
          <Pressable accessibilityRole="button" onPress={onBack} style={styles.iconButton}>
            <Feather name={onBack ? 'arrow-left' : 'menu'} size={26} color={Colors.surface} />
          </Pressable>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>
        <View style={styles.right}>
          {onBellPress ? (
            <Pressable accessibilityRole="button" onPress={onBellPress} style={styles.bellButton}>
              <Feather name="bell" size={24} color={Colors.surface} />
              {unreadCount > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{Math.min(unreadCount, 9)}</Text>
                </View>
              ) : null}
            </Pressable>
          ) : null}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AS</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.primary,
  },
  bar: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.container,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  left: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    color: Colors.surface,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    letterSpacing: 0,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  bellButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.skyBlue,
  },
  badgeText: {
    color: Colors.surface,
    fontSize: FontSize.micro,
    fontWeight: FontWeight.bold,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.whiteOverlay20,
    backgroundColor: Colors.slate,
  },
  avatarText: {
    color: Colors.surface,
    fontSize: FontSize.tab,
    fontWeight: FontWeight.bold,
  },
});
