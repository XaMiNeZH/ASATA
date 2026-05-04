import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';

import { Colors } from '../../constants/colors';

interface AppHeaderProps {
  title?: string;
  onBack?: () => void;
  onBellPress?: () => void;
  unreadCount?: number;
  /** When true, shows ASATA logo + wordmark instead of a text title */
  showLogo?: boolean;
}

function MountainLogo({ size = 28 }: { size?: number }) {
  return (
    <View style={[styles.logoBox, { width: size, height: size, borderRadius: size * 0.32 }]}>
      <Svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
        <Path d="M3 19h18l-5-9-3 4-3-6-7 11Z" fill="#fff" opacity={0.95} />
        <Circle cx={16} cy={6} r={1.6} fill="#fff" opacity={0.9} />
      </Svg>
    </View>
  );
}

export function AppHeader({
  title,
  onBack,
  onBellPress,
  unreadCount = 0,
  showLogo = false,
}: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <View style={styles.bar}>
        {/* Left — back button or logo */}
        <View style={styles.left}>
          {onBack ? (
            <Pressable
              accessibilityRole="button"
              onPress={onBack}
              style={styles.iconButton}
            >
              <Feather name="chevron-left" size={22} color={Colors.primary} strokeWidth={2.4} />
            </Pressable>
          ) : showLogo || !title ? (
            <View style={styles.brand}>
              <MountainLogo size={32} />
              <View>
                <Text style={styles.brandName}>ASATA</Text>
                <Text style={styles.brandSub}>Atlas · Toubkal · Asni</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.pageTitle}>{title}</Text>
          )}
        </View>

        {/* Right — bell */}
        {onBellPress && (
          <Pressable
            accessibilityRole="button"
            onPress={onBellPress}
            style={styles.bellButton}
          >
            <Feather name="bell" size={19} color={Colors.primary} />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{Math.min(unreadCount, 9)}</Text>
              </View>
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairline,
  },
  bar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBox: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  brandName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primaryDark,
    letterSpacing: -0.2,
  },
  brandSub: {
    fontSize: 10,
    color: Colors.subtle,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.body,
    letterSpacing: -0.2,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.primaryGhost,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.primaryGhost,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.surface,
    paddingHorizontal: 2,
  },
  badgeText: {
    color: Colors.surface,
    fontSize: 9,
    fontWeight: '700',
  },
});
