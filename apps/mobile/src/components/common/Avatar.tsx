import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';
import { FontSize, FontWeight } from '../../constants/typography';

interface AvatarProps {
  name: string;
  photo?: string;
}

const getInitials = (name: string): string =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

export function Avatar({ name }: AvatarProps) {
  return (
    <View style={styles.avatar}>
      <Text style={styles.initials}>{getInitials(name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: Colors.surface,
    backgroundColor: Colors.primary,
  },
  initials: {
    color: Colors.surface,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
});
