import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    gap: Spacing.gutter,
    paddingHorizontal: Spacing.container,
    paddingTop: Spacing.xl,
    paddingBottom: 132,
  },
  heading: {
    gap: Spacing.xs,
  },
  eyebrow: {
    color: Colors.onPrimaryContainer,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 3,
  },
  title: {
    color: Colors.primaryDark,
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 38,
  },
  photoButton: {
    alignSelf: 'center',
    marginTop: Spacing.xl,
  },
  photoPlaceholder: {
    width: 128,
    height: 128,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: Colors.surface,
    backgroundColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  photoInitials: {
    color: Colors.surface,
    fontSize: 32,
    fontWeight: '700',
  },
  cameraBadge: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.surface,
    backgroundColor: Colors.skyBlue,
  },
  photoCaption: {
    color: Colors.secondary,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  actionBar: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.container,
    paddingTop: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 8,
  },
});
