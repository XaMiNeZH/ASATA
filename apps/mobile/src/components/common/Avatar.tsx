import type { ImageSourcePropType } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';

import { AsataImages } from '../../constants/asataImages';
import { Colors } from '../../constants/colors';
import { FontSize, FontWeight } from '../../constants/typography';

interface AvatarProps {
  name: string;
  photo?: string | null;
  useLogoFallback?: boolean;
}

const getInitials = (name: string): string =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

const getPhotoSource = (photo?: string | null): ImageSourcePropType | undefined => {
  const uri = photo?.trim();

  if (uri && /^(https?:|file:|content:|data:image\/)/i.test(uri)) {
    return { uri };
  }

  return undefined;
};

export function Avatar({ name, photo, useLogoFallback = false }: AvatarProps) {
  const source = getPhotoSource(photo) ?? (useLogoFallback ? AsataImages.logo : undefined);

  return (
    <View style={styles.avatar}>
      {source ? (
        <Image source={source} style={styles.image} resizeMode="cover" />
      ) : (
        <Text style={styles.initials}>{getInitials(name)}</Text>
      )}
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
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    color: Colors.surface,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
});
