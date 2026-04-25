import { Image, StyleSheet, Text, View } from 'react-native';

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

export function Avatar({ name, photo }: AvatarProps) {
  if (photo) {
    return <Image source={{ uri: photo }} style={styles.avatar} />;
  }

  return (
    <View style={styles.avatar}>
      <Text style={styles.initials}>{getInitials(name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryPale,
  },
  initials: {
    color: Colors.primaryDark,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
});
